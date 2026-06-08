export interface SmtpConfig {
  host: string;
  port: number;
  /** true for port 465 (implicit TLS), false for 587/25 (STARTTLS) */
  secure: boolean;
  user: string;
  pass: string;
}

export interface EmailPayload {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html?: string;
}
