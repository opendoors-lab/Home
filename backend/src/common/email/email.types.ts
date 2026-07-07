export interface SmtpConfig {
  host: string;
  port: number;
  /** true for port 465 (implicit TLS), false for 587/25 (STARTTLS) */
  secure: boolean;
  user: string;
  pass: string;
  /** Optional: force a specific SMTP auth method (provider quirks). */
  authMethod?: 'PLAIN' | 'LOGIN' | 'CRAM-MD5';
  /** Optional: increase timeouts for slow SMTP servers (ms). */
  connectionTimeoutMs?: number;
  greetingTimeoutMs?: number;
  socketTimeoutMs?: number;
}

export interface EmailPayload {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html?: string;
}
