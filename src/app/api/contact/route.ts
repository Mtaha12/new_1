import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { mongoose } from '@/lib/database';
import { sendContactConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  locale: { type: String, default: 'en' },
  status: { type: String, default: 'new', enum: ['new', 'read', 'replied', 'archived'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create model only if it doesn't exist
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// POST - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, subject, message, locale = 'en' } = body;
    
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!phone?.trim()) {
      return NextResponse.json(
        { error: 'Phone is required' },
        { status: 400 }
      );
    }

    if (!subject?.trim()) {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      );
    }

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation - more flexible
    const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (cleanPhone.length < 10 || !phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Phone number must be at least 10 digits' },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    console.log('Creating contact entry in database...', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      messageLength: message.trim().length,
      locale
    });

    // Create contact entry
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      locale,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Contact saved to database with ID:', contact._id);

    // Send emails
    let emailResults: any = {
      confirmation: { success: false, error: 'Not attempted' },
      admin: { success: false, error: 'Not attempted' }
    };

    try {
      // Send confirmation to user
      console.log('Sending confirmation email to:', contact.email);
      const confirmationResult = await sendContactConfirmationEmail({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        locale: contact.locale
      });
      
      emailResults.confirmation = confirmationResult;
      console.log('Confirmation email result:', confirmationResult.success ? '✅ Success' : '❌ Failed');

      if (confirmationResult.success) {
        // Only send admin notification if confirmation email was successful
        console.log('Sending admin notification...');
        const adminResult = await sendAdminNotificationEmail({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          subject: contact.subject,
          message: contact.message,
          locale: contact.locale
        });
        
        emailResults.admin = adminResult;
        console.log('Admin notification result:', adminResult.success ? '✅ Success' : '❌ Failed');
      } else {
        console.warn('Skipping admin notification due to confirmation email failure');
        emailResults.admin = { success: false, error: 'Skipped due to confirmation email failure' };
      }

    } catch (emailError) {
      console.error('Error in email sending process:', emailError);
      emailResults.error = emailError instanceof Error ? emailError.message : 'Unknown email error';
    }

    // Determine overall email success
    const emailSent = emailResults.confirmation.success || emailResults.admin.success;

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        contactId: contact._id,
        emailSent,
        emailResults
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Handle MongoDB duplicate key errors
    if (error instanceof Error && error.message.includes('E11000')) {
      return NextResponse.json(
        { error: 'A contact with this email already exists' },
        { status: 409 }
      );
    }

    // Handle MongoDB validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Invalid data provided' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to submit contact form', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve contact submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // Cap at 100
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));

    await connectDB();

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    console.log('Fetching contacts with query:', { query, limit, skip });

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select('-__v') // Exclude version key
      .lean();

    const total = await Contact.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// PATCH - Update contact status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactId, status } = body;

    if (!contactId) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    if (!status || !['new', 'read', 'replied', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required (new, read, replied, archived)' },
        { status: 400 }
      );
    }

    await connectDB();

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { 
        status, 
        updatedAt: new Date() 
      },
      { 
        new: true,
        runValidators: true 
      }
    ).select('-__v'); // Exclude version key

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    console.log('Contact status updated:', { contactId, status });

    return NextResponse.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

// Optional: DELETE endpoint for cleaning up contacts
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('id');

    if (!contactId) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    console.log('Contact deleted:', contactId);

    return NextResponse.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}