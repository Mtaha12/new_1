import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const { domains, locale } = await request.json();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();
    let yPosition = height - 80;

    // Title
    page.drawText(locale === 'ar' ? 'قائمة التحقق من الامتثال' : 'Compliance Readiness Checklist', {
      x: 50,
      y: yPosition,
      size: 24,
      font: boldFont,
      color: rgb(0.04, 0.05, 0.24)
    });

    yPosition -= 40;

    // Domain mappings
    const domainLabels: Record<string, { en: string; ar: string; items: { en: string[]; ar: string[] } }> = {
      governance: {
        en: 'Governance & Risk',
        ar: 'الحوكمة والمخاطر',
        items: {
          en: ['Policy catalogue updated', 'Risk register reviewed', 'Board briefing scheduled'],
          ar: ['تحديث سجل السياسات', 'مراجعة سجل المخاطر', 'تجهيز إحاطة لمجلس الإدارة']
        }
      },
      operations: {
        en: 'SecOps & Monitoring',
        ar: 'عمليات الأمن والمراقبة',
        items: {
          en: ['SOC runbooks validated', 'SIEM use cases tuned', 'Incident metrics distributed'],
          ar: ['التحقق من صلاحية أدلة تشغيل مركز العمليات', 'ضبط حالات استخدام نظام المعلومات الأمنية', 'نشر مؤشرات الحوادث']
        }
      },
      resilience: {
        en: 'Resilience & Recovery',
        ar: 'المرونة والتعافي',
        items: {
          en: ['Backup integrity tested', 'DR exercises executed', 'Vendor failover rehearsed'],
          ar: ['اختبار سلامة النسخ الاحتياطية', 'تنفيذ تمارين التعافي من الكوارث', 'تدريب على خطط الاستمرارية مع المورّدين']
        }
      },
      people: {
        en: 'People & Third Parties',
        ar: 'الأفراد والأطراف الثالثة',
        items: {
          en: ['Awareness training delivered', 'Third-party reviews completed', 'Privilege audits documented'],
          ar: ['تقديم تدريب التوعية', 'استكمال مراجعات الأطراف الثالثة', 'توثيق تدقيقات الصلاحيات']
        }
      }
    };

    // Selected domains
    for (const domainId of domains) {
      const domain = domainLabels[domainId];
      if (!domain) continue;

      const label = locale === 'ar' ? domain.ar : domain.en;
      const items = locale === 'ar' ? domain.items.ar : domain.items.en;

      page.drawText(label, {
        x: 50,
        y: yPosition,
        size: 16,
        font: boldFont,
        color: rgb(0.04, 0.05, 0.24)
      });

      yPosition -= 25;

      for (const item of items) {
        if (yPosition < 60) {
          const newPage = pdfDoc.addPage([595, 842]);
          yPosition = height - 80;
          newPage.drawText(item, {
            x: 70,
            y: yPosition,
            size: 12,
            font,
            color: rgb(0.2, 0.2, 0.2)
          });
        } else {
          page.drawText(`• ${item}`, {
            x: 70,
            y: yPosition,
            size: 12,
            font,
            color: rgb(0.2, 0.2, 0.2)
          });
        }
        yPosition -= 20;
      }

      yPosition -= 15;
    }

    // Footer
    page.drawText(locale === 'ar' ? '© 2025 The SamurAI. جميع الحقوق محفوظة.' : '© 2025 The SamurAI. All rights reserved.', {
      x: 50,
      y: 30,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5)
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="compliance-checklist.pdf"'
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
