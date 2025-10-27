import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendGatedAssetDownloadEmail(lead: {
  name: string;
  email: string;
  company?: string;
  role?: string;
  locale: string;
  assetTitle: string;
  downloadUrl: string;
}) {
  try {
    const isArabic = lead.locale === 'ar';
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'The Samurai';

    const subject = isArabic
      ? `تقريرك جاهز: ${lead.assetTitle}`
      : `Your requested report is ready: ${lead.assetTitle}`;

    const intro = isArabic
      ? 'شكرًا لاهتمامك بمصادرنا. يمكنك تنزيل التقرير من الرابط أدناه:'
      : 'Thanks for your interest in our resources. You can download the report using the link below:';

    const companyLine = lead.company
      ? `<p style="margin: 6px 0;"><strong>${isArabic ? 'الشركة' : 'Company'}:</strong> ${lead.company}</p>`
      : '';
    const roleLine = lead.role
      ? `<p style="margin: 6px 0;"><strong>${isArabic ? 'المنصب' : 'Role'}:</strong> ${lead.role}</p>`
      : '';

    const html = `
      <div dir="${isArabic ? 'rtl' : 'ltr'}" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1a1f71; margin-top: 0;">${isArabic ? 'تقريرك جاهز' : 'Your report is ready'}</h2>
        <p>${isArabic ? 'مرحبًا' : 'Hello'} <strong>${lead.name}</strong>,</p>
        <p>${intro}</p>
        <p style="margin: 18px 0;">
          <a href="${lead.downloadUrl}" style="background: #1a1f71; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            ${isArabic ? 'تنزيل التقرير' : 'Download the report'}
          </a>
        </p>
        <p style="font-size: 0.95rem; color: #555;">
          ${isArabic ? 'إذا لم يعمل الزر، انسخ الرابط التالي في متصفحك:' : 'If the button does not work, copy and paste the following link into your browser:'}
          <br />
          <a href="${lead.downloadUrl}" style="color: #1a1f71;">${lead.downloadUrl}</a>
        </p>
        <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; margin: 18px 0;">
          <p style="margin: 0 0 10px 0;"><strong>${isArabic ? 'تفاصيل الطلب' : 'Request details'}:</strong></p>
          ${companyLine}
          ${roleLine}
        </div>
        <p>${isArabic ? 'نحن هنا إذا احتجت لأي مساعدة إضافية.' : 'We are here if you need any further assistance.'}</p>
        <p style="margin-bottom: 0;">
          ${isArabic ? 'مع أطيب التحيات' : 'Best regards'},<br />
          <strong>${siteName} ${isArabic ? 'فريق' : 'Team'}</strong>
        </p>
      </div>
    `;

    const text = `${isArabic ? 'تقريرك جاهز' : 'Your report is ready'}\n\n${lead.downloadUrl}`;

    return await sendEmail({
      to: lead.email,
      subject,
      html,
      text,
    });
  } catch (error) {
    console.error('Error in sendGatedAssetDownloadEmail:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error,
    };
  }
}

export async function sendGatedAssetAdminNotification(lead: {
  name: string;
  email: string;
  company?: string;
  role?: string;
  locale: string;
  assetTitle: string;
  downloadUrl: string;
}) {
  try {
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map((email) => email.trim()).filter(Boolean) || [];

    if (adminEmails.length === 0) {
      console.warn('No admin emails configured. Set ADMIN_EMAILS environment variable for gated asset notifications.');
      return {
        success: false,
        error: 'No admin emails configured',
        details: 'Please set the ADMIN_EMAILS environment variable with comma-separated email addresses',
      };
    }

    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'The Samurai';

    const subject = `New gated asset request: ${lead.assetTitle}`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1a1f71; margin-top: 0;">${siteName} · Gated asset lead</h2>
        <p style="margin: 6px 0;"><strong>Name:</strong> ${lead.name}</p>
        <p style="margin: 6px 0;"><strong>Email:</strong> ${lead.email}</p>
        ${lead.company ? `<p style="margin: 6px 0;"><strong>Company:</strong> ${lead.company}</p>` : ''}
        ${lead.role ? `<p style="margin: 6px 0;"><strong>Role:</strong> ${lead.role}</p>` : ''}
        <p style="margin: 6px 0;"><strong>Locale:</strong> ${lead.locale}</p>
        <p style="margin: 6px 0;"><strong>Asset:</strong> ${lead.assetTitle}</p>
        <p style="margin: 12px 0;"><a href="${lead.downloadUrl}" style="color: #1a1f71;">Download link</a></p>
      </div>
    `;

    const textLines = [
      'New gated asset lead received',
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
    ];

    if (lead.company) {
      textLines.push(`Company: ${lead.company}`);
    }
    if (lead.role) {
      textLines.push(`Role: ${lead.role}`);
    }

    textLines.push(`Locale: ${lead.locale}`);
    textLines.push(`Asset: ${lead.assetTitle}`);
    textLines.push(`Download: ${lead.downloadUrl}`);

    const text = textLines.join('\n');

    const results = await Promise.allSettled(
      adminEmails.map((email) =>
        sendEmail({
          to: email,
          subject,
          html,
          text,
        })
      )
    );

    const successes = results.filter((result) => result.status === 'fulfilled' && result.value.success).length;

    if (successes === 0) {
      console.error('Failed to send gated asset admin notification to any recipient', results);
      return {
        success: false,
        error: 'Failed to send admin notification',
        details: results,
      };
    }

    return {
      success: true,
      successCount: successes,
      totalCount: adminEmails.length,
      results,
    };
  } catch (error) {
    console.error('Error in sendGatedAssetAdminNotification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error,
    };
  }
}

// src/lib/email.ts

function createTransporter() {
  // Use Gmail SMTP settings directly like the test file
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = port === 465; // true for 465, false otherwise

  const debug = process.env.SMTP_DEBUG === 'true';

  // Log configuration for debugging
  console.log('SMTP Configuration:', {
    host,
    port,
    secure,
    user: process.env.SMTP_USER,
    hasPassword: !!process.env.SMTP_PASSWORD,
    debug
  });

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    },
    debug: debug,
    logger: debug
  });

  console.log(`SMTP transporter created for ${host}:${port} (secure=${secure})`);
  return transporter;
}

export async function sendEmail(options: EmailOptions) {
  try {
    // Use SMTP_USER as fallback for from email (like the test file)
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
    const fromName = process.env.SMTP_FROM_NAME || process.env.NEXT_PUBLIC_SITE_NAME || 'The Samurai';

    if (!fromEmail) {
      throw new Error('No SMTP from email available. Set SMTP_FROM_EMAIL or SMTP_USER');
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error('SMTP_USER or SMTP_PASSWORD is not set in environment variables');
    }

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      text: options.text || options.subject,
      html: options.html,
    };

    console.log('Sending email to:', options.to);
    console.log('Email subject:', options.subject);
    console.log('From:', `"${fromName}" <${fromEmail}>`);

    // Create transporter dynamically
    const dynamicTransporter = createTransporter();

    // Verify SMTP connection before sending
    try {
      console.log('Verifying SMTP connection...');
      await dynamicTransporter.verify();
      console.log(' SMTP connection verified successfully');
    } catch (verifyErr) {
      console.error(' SMTP verification failed:', verifyErr);
      return {
        success: false,
        error: 'SMTP verification failed',
        details: verifyErr
      };
    }

    const info = await dynamicTransporter.sendMail(mailOptions);
    console.log(' Email sent successfully. Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(' Error sending email to', options.to, ':', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    };
  }
}

export async function sendContactConfirmationEmail(contact: {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
}) {
  try {
    const isArabic = contact.locale === 'ar';
    
    const subject = isArabic 
      ? `شكراً لتواصلك مع ${process.env.NEXT_PUBLIC_SITE_NAME || 'The Samurai'}`
      : `Thank you for contacting ${process.env.NEXT_PUBLIC_SITE_NAME || 'The Samurai'}`;

    // Ensure message is properly escaped for HTML and handle line breaks
    const escapedMessage = contact.message
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');

    const html = `
      <div dir="${isArabic ? 'rtl' : 'ltr'}" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #1a1f71;">
          ${isArabic ? 'شكراً لتواصلك معنا' : 'Thank you for contacting us'}
        </h2>
        <p>
          ${isArabic ? 'عزيزي/عزيزتي' : 'Dear'} <strong>${contact.name}</strong>,
        </p>
        <p>
          ${isArabic 
            ? 'لقد تلقينا رسالتك بنجاح وسيقوم أحد ممثلينا بالرد عليك في أقرب وقت ممكن.'
            : 'We have received your message and one of our representatives will get back to you as soon as possible.'
          }
        </p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #1a1f71;">
          <h3 style="margin-top: 0; color: #1a1f71;">${isArabic ? 'تفاصيل رسالتك' : 'Your Message Details'}</h3>
          <p style="margin: 10px 0;"><strong>${isArabic ? 'الموضوع' : 'Subject'}:</strong> ${contact.subject}</p>
          <div style="background: white; padding: 15px; border-radius: 4px; border: 1px solid #e0e0e0; margin: 10px 0;">
            <p style="margin: 0; white-space: pre-line; line-height: 1.6;">${escapedMessage}</p>
          </div>
        </div>
        <p>
          ${isArabic 
            ? 'شكراً لثقتك بنا.'
            : 'Thank you for your trust in us.'
          }
        </p>
        <p>
          ${isArabic ? 'مع أطيب التحيات' : 'Best regards'},<br>
          <strong>${process.env.NEXT_PUBLIC_SITE_NAME || 'The Samurai Team'}</strong>
        </p>
      </div>
    `;

    const text = `${isArabic ? 'شكراً لتواصلك معنا' : 'Thank you for contacting us'}\n\n` +
      `${isArabic ? 'الموضوع' : 'Subject'}: ${contact.subject}\n\n` +
      `${isArabic ? 'رسالتك' : 'Your Message'}:\n${contact.message}\n\n` +
      `${isArabic ? 'مع أطيب التحيات' : 'Best regards'},\n${process.env.NEXT_PUBLIC_SITE_NAME || 'The Samurai Team'}`;

    return await sendEmail({
      to: contact.email,
      subject,
      html,
      text
    });
  } catch (error) {
    console.error('Error in sendContactConfirmationEmail:', error);
    throw error;
  }
}

export async function sendAdminNotificationEmail(contact: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  locale: string;
}) {
  try {
    const isArabic = contact.locale === 'ar';
    
    const subject = isArabic 
      ? `طلب اتصال جديد: ${contact.subject}`
      : `New Contact Form Submission: ${contact.subject}`;

    // Ensure message is properly escaped for HTML
    const escapedMessage = contact.message
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #1a1f71;">
          ${isArabic ? 'طلب اتصال جديد' : 'New Contact Form Submission'}
        </h2>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>${isArabic ? 'الاسم' : 'Name'}:</strong> ${contact.name}</p>
          <p style="margin: 5px 0;"><strong>${isArabic ? 'البريد الإلكتروني' : 'Email'}:</strong> ${contact.email}</p>
          <p style="margin: 5px 0;"><strong>${isArabic ? 'رقم الجوال' : 'Phone'}:</strong> ${contact.phone}</p>
          <p style="margin: 5px 0;"><strong>${isArabic ? 'الموضوع' : 'Subject'}:</strong> ${contact.subject}</p>
          <p style="margin: 5px 0;"><strong>${isArabic ? 'الرسالة' : 'Message'}:</strong></p>
          <div style="background: white; padding: 10px; border-radius: 4px; border: 1px solid #e0e0e0; margin: 10px 0;">
            <p style="margin: 0; white-space: pre-line; line-height: 1.6;">${escapedMessage}</p>
          </div>
        </div>
        <p style="color: #666; font-size: 0.9em;">
          ${isArabic 
            ? 'يرجى الرد على هذا الطلب في أقرب وقت ممكن.'
            : 'Please respond to this inquiry as soon as possible.'
          }
        </p>
      </div>
    `;

    const text = `New Contact Form Submission\n\n` +
      `Name: ${contact.name}\n` +
      `Email: ${contact.email}\n` +
      `Phone: ${contact.phone}\n` +
      `Subject: ${contact.subject}\n\n` +
      `Message:\n${contact.message}\n\n` +
      `Please respond to this inquiry as soon as possible.`;

    // Send to admin email(s) - can be a single email or comma-separated list
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()).filter(Boolean) || [];
    
    if (adminEmails.length === 0) {
      console.warn('No admin emails configured. Set ADMIN_EMAILS environment variable.');
      return { 
        success: false, 
        error: 'No admin emails configured',
        details: 'Please set the ADMIN_EMAILS environment variable with comma-separated email addresses'
      };
    }

    console.log(`Sending admin notifications to: ${adminEmails.join(', ')}`);
    
    const results = await Promise.allSettled(
      adminEmails.map(email => 
        sendEmail({
          to: email,
          subject,
          html,
          text
        })
      )
    );

    // Log results for each email
    let successCount = 0;
    results.forEach((result, index) => {
      const email = adminEmails[index];
      if (result.status === 'fulfilled') {
        if (result.value.success) {
          console.log(` Email sent to ${email}:`, result.value.messageId);
          successCount++;
        } else {
          console.error(` Failed to send email to ${email}:`, result.value.error);
        }
      } else {
        console.error(` Failed to send email to ${email}:`, result.reason);
      }
    });

    if (successCount === 0) {
      const errors = results
        .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
        .map(r => r.reason);
      
      console.error(' Failed to send admin notification to any email. Errors:', errors);
      return { 
        success: false, 
        error: 'Failed to send admin notification to any recipient',
        details: errors
      };
    }

    console.log(` Successfully sent admin notifications to ${successCount} out of ${adminEmails.length} recipients`);
    return { 
      success: true,
      sentTo: adminEmails,
      successCount,
      totalCount: adminEmails.length,
      results: results.map(r => r.status === 'fulfilled' ? r.value : { error: r.reason })
    };
  } catch (error) {
    console.error(' Error in sendAdminNotificationEmail:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    };
  }
}