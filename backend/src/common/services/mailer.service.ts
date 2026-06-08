import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailSender } from '../email/email-sender';
import type { EmailPayload, SmtpConfig } from '../email/email.types';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private readonly smtpConfig: SmtpConfig | null;
  private readonly defaultFrom: string;

  constructor(private readonly config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST');
    const port = this.config.get<number>('SMTP_PORT') ?? 587;

    this.defaultFrom =
      this.config.get<string>('MAIL_FROM') ??
      'Company Support <support@company.com>';

    if (host) {
      this.smtpConfig = {
        host,
        port,
        secure:
          this.config.get<string>('SMTP_SECURE') === 'true' || port === 465,
        user: this.config.get<string>('SMTP_USER') ?? '',
        pass: this.config.get<string>('SMTP_PASS') ?? '',
      };
    } else {
      this.smtpConfig = null;
    }
  }

  private async sendMail(to: string, subject: string, text: string, html?: string) {
    const payload: EmailPayload = {
      from: this.defaultFrom,
      to: [to],
      subject,
      text,
      html,
    };

    if (!this.smtpConfig) {
      this.logger.log(
        `[DEV MAIL] Sending message to ${to} | Subject: ${subject}\n${html ?? text}`,
      );
      return;
    }

    this.logger.log(`Sending message to ${to} | Subject: ${subject}`);
    await EmailSender.sendEmail(this.smtpConfig, payload);
    this.logger.log(`Message sent successfully to ${to}`);
  }

  async sendAccountCredentials(
    email: string,
    temporaryPassword: string,
    name?: string,
  ) {
    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    const loginUrl = `${frontendUrl}/admin/login`;
    const subject = 'Your MobiMates admin account';
    const text = `Hello${name ? ` ${name}` : ''},

Your MobiMates admin account is ready.

Email: ${email}
Temporary password: ${temporaryPassword}

Sign in at: ${loginUrl}

You will be asked to choose a new password on first login.`;

    const html = `<p>Hello${name ? ` <strong>${name}</strong>` : ''},</p>
<p>Your MobiMates admin account is ready.</p>
<ul>
  <li><strong>Email:</strong> ${email}</li>
  <li><strong>Temporary password:</strong> <code>${temporaryPassword}</code></li>
</ul>
<p><a href="${loginUrl}">Sign in here</a></p>
<p>You will be asked to choose a new password on first login.</p>`;

    await this.sendMail(email, subject, text, html);
  }

  async sendOwnerStartupWelcome(email: string, ownerPassword: string) {
    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    const loginUrl = `${frontendUrl}/admin/login`;
    const subject = 'MobiMates CMS is ready — Owner login';
    const text = `The MobiMates blog admin backend has started.

Sign in as Owner at: ${loginUrl}

Email: ${email}
Password: ${ownerPassword}

From the admin dashboard you can bootstrap a System Admin, invite users, and manage blog posts.`;

    const html = `<p>The MobiMates blog admin backend has started.</p>
<p><a href="${loginUrl}">Sign in as Owner</a></p>
<ul>
  <li><strong>Email:</strong> ${email}</li>
  <li><strong>Password:</strong> <code>${ownerPassword}</code></li>
</ul>`;

    await this.sendMail(email, subject, text, html);
  }

  async sendMagicLink(email: string, token: string) {
    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    const link = `${frontendUrl}/admin/auth/verify?token=${token}`;
    const text = `Sign in to MobiMates admin (expires in 15 minutes):\n\n${link}`;
    const html = `<p>Click to sign in (expires in 15 minutes):</p><p><a href="${link}">${link}</a></p>`;
    await this.sendMail(email, 'Your sign-in link', text, html);
  }

  async sendRoleAssignmentPending(
    ownerEmail: string,
    userEmail: string,
    roleName: string,
  ) {
    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    const reviewUrl = `${frontendUrl}/admin/role-approvals`;
    const text = `${userEmail} has been assigned the role "${roleName}". Review: ${reviewUrl}`;
    const html = `<p>${userEmail} has been assigned the role <strong>${roleName}</strong>.</p>
       <p><a href="${reviewUrl}">Review in admin</a></p>`;
    await this.sendMail(
      ownerEmail,
      'Role assignment pending approval',
      text,
      html,
    );
  }

  async sendPostRejected(
    authorEmail: string,
    title: string,
    comment: string,
  ) {
    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    const editUrl = `${frontendUrl}/admin/posts/mine`;
    const text = `Your post "${title}" was rejected.\n\nReviewer comment:\n${comment}\n\nEdit and resubmit: ${editUrl}`;
    const html = `<p>Your post <strong>${title}</strong> was rejected.</p>
       <p>Reviewer comment:</p><blockquote>${comment}</blockquote>
       <p><a href="${editUrl}">Edit and resubmit</a></p>`;
    await this.sendMail(authorEmail, `Post rejected: ${title}`, text, html);
  }

  async sendPostPublished(
    authorEmail: string,
    title: string,
    slug: string,
  ) {
    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    const postUrl = `${frontendUrl}/blog/${slug}`;
    const text = `Your post "${title}" is now live.\n\nView: ${postUrl}`;
    const html = `<p>Your post <strong>${title}</strong> is now live.</p>
       <p><a href="${postUrl}">View post</a></p>`;
    await this.sendMail(authorEmail, `Post published: ${title}`, text, html);
  }
}
