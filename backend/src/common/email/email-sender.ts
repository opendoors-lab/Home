import * as nodemailer from 'nodemailer';
import type { EmailPayload, SmtpConfig } from './email.types';

export class EmailSender {
  /**
   * Sends an email using the provided SMTP configuration and payload.
   */
  static async sendEmail(
    config: SmtpConfig,
    payload: EmailPayload,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const mailOptions = {
      from: payload.from,
      to: payload.to.join(', '),
      subject: payload.subject,
      text: payload.text,
      ...(payload.html ? { html: payload.html } : {}),
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        `Email sent successfully... Message ID: ${info.messageId}`,
      );
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}
