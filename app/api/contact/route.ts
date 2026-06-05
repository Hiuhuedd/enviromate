import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER || '';
    const smtpPass = (process.env.SMTP_PASS || process.env.EMAIL_PASS || '').replace(/^["']|["']$/g, '');
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailFrom = process.env.SMTP_FROM || `"Enviromate Website" <${smtpUser}>`;

    await transporter.sendMail({
      from: mailFrom,
      to: 'enviromatetechnologies@gmail.com',
      replyTo: email,
      subject: `New Website Enquiry — ${service || 'General'} | ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #5dae3e, #088038); padding: 24px; border-radius: 8px 8px 0 0; margin: -30px -30px 30px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Enquiry from Website</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">Enviromate Technologies Limited</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #181b1d; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; color: #181b1d;"><a href="mailto:${email}" style="color: #5dae3e;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px; vertical-align: top;">Phone</td><td style="padding: 8px 0; color: #181b1d;">${phone}</td></tr>` : ''}
            ${service ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px; vertical-align: top;">Service</td><td style="padding: 8px 0;"><span style="background: #e8f5e0; color: #5dae3e; padding: 3px 10px; border-radius: 20px; font-size: 13px; font-weight: 600;">${service}</span></td></tr>` : ''}
          </table>

          <div style="margin-top: 20px; padding: 16px; background: white; border-left: 3px solid #5dae3e; border-radius: 4px;">
            <p style="color: #666; font-size: 12px; margin: 0 0 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="color: #181b1d; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 24px; color: #999; font-size: 12px; text-align: center;">
            This message was sent via the Enviromate Technologies website contact form.
          </p>
        </div>
      `,
    });

    // Confirmation email to sender
    await transporter.sendMail({
      from: `"Enviromate Technologies" <${smtpUser}>`,
      to: email,
      subject: 'Thank you for contacting Enviromate Technologies',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #5dae3e, #088038); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Enviromate Technologies</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-style: italic;">"Come Home To Quality"</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <p style="color: #181b1d; font-size: 16px;">Dear ${name},</p>
            <p style="color: #475355; line-height: 1.7;">Thank you for reaching out to Enviromate Technologies Limited. We have received your message and a member of our team will get back to you within 24 hours.</p>
            <p style="color: #475355; line-height: 1.7;">In the meantime, feel free to call us directly at <strong style="color: #5dae3e;">+254 720 312 257</strong>.</p>
            <p style="color: #475355;">Best regards,<br/><strong style="color: #181b1d;">The Enviromate Team</strong></p>
          </div>
        </div>
      `,
    });

    // Programmatic WhatsApp notification via CallMeBot (if configured)
    if (process.env.CALLMEBOT_API_KEY && process.env.CALLMEBOT_PHONE) {
      try {
        const waText = `New Web Enquiry:\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Service:* ${service || 'General'}\n*Message:* ${message}`;
        const encodedText = encodeURIComponent(waText);
        const callmebotPhone = process.env.CALLMEBOT_PHONE.replace(/[^\d+]/g, '');
        await fetch(`https://api.callmebot.com/whatsapp.php?phone=${callmebotPhone}&text=${encodedText}&apikey=${process.env.CALLMEBOT_API_KEY}`);
      } catch (e) {
        console.error('CallMeBot notification error:', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
