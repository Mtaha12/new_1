import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import connectDB, { mongoose } from '@/lib/database';
import {
  sendGatedAssetAdminNotification,
  sendGatedAssetDownloadEmail,
} from '@/lib/email';

const gatedAssetLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    role: { type: String },
    locale: { type: String, default: 'en' },
    assetSlug: { type: String, required: true },
    assetTitle: { type: String, required: true },
    downloadUrl: { type: String, required: true },
    emailDeliveryStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    emailDeliveryDetails: { type: mongoose.Schema.Types.Mixed },
    adminNotificationStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    adminNotificationDetails: { type: mongoose.Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

const GatedAssetLead =
  mongoose.models.GatedAssetLead ||
  mongoose.model('GatedAssetLead', gatedAssetLeadSchema);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = body?.name?.trim();
    const email = body?.email?.trim().toLowerCase();
    const company = body?.company?.trim();
    const role = body?.role?.trim();
    const locale = (body?.locale || 'en').toLowerCase();
    const assetSlug = body?.assetSlug?.trim() || 'miercom-2024-security-benchmark';
    const assetTitle = body?.assetTitle?.trim() || 'Gated asset';

    const downloadUrlFromRequest = body?.assetDownloadUrl?.trim();
    const downloadUrlFromEnv =
      process.env.REPORT_DOWNLOAD_URL || process.env.NEXT_PUBLIC_REPORT_DOWNLOAD_URL;

    let downloadUrl = downloadUrlFromRequest || downloadUrlFromEnv;

    if (!downloadUrl) {
      const publicDir = path.join(process.cwd(), 'public');
      const fallbackRelativePath = path.join('reports', `${assetSlug}.pdf`);
      const fallbackAbsolutePath = path.join(publicDir, fallbackRelativePath);

      if (fs.existsSync(fallbackAbsolutePath)) {
        downloadUrl = `/${fallbackRelativePath.replace(/\\/g, '/')}`;
      }
    }

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    if (!downloadUrl) {
      return NextResponse.json(
        { success: false, error: 'Report download link is not configured.' },
        { status: 503 }
      );
    }

    await connectDB();

    const lead = await GatedAssetLead.create({
      name,
      email,
      company: company || undefined,
      role: role || undefined,
      locale,
      assetSlug,
      assetTitle,
      downloadUrl,
    });

    const deliveryResult = await sendGatedAssetDownloadEmail({
      name,
      email,
      company: company || undefined,
      role: role || undefined,
      locale,
      assetTitle,
      downloadUrl,
    });

    const adminResult = await sendGatedAssetAdminNotification({
      name,
      email,
      company: company || undefined,
      role: role || undefined,
      locale,
      assetTitle,
      downloadUrl,
    });

    lead.emailDeliveryStatus = deliveryResult.success ? 'sent' : 'failed';
    lead.emailDeliveryDetails = deliveryResult;
    lead.adminNotificationStatus = adminResult.success ? 'sent' : 'failed';
    lead.adminNotificationDetails = adminResult;
    await lead.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Report delivered successfully.',
        downloadUrl,
        leadId: lead._id,
        delivery: {
          email: deliveryResult,
          admin: adminResult,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Gated asset request error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to process gated asset request.',
      },
      { status: 500 }
    );
  }
}
