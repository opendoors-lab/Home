import type { RemotePattern } from "next/dist/shared/lib/image-config";

const DEFAULT_API_URL = "http://localhost:9000";

/** Remote patterns for Next/Image — derived from NEXT_PUBLIC_API_URL. */
export function buildUploadRemotePatterns(
  apiUrl = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL,
): RemotePattern[] {
  const patterns: RemotePattern[] = [
    { protocol: "https", hostname: "images.mobimates.com", pathname: "/**" },
  ];

  try {
    const u = new URL(apiUrl);
    const protocol = u.protocol.replace(":", "") as "http" | "https";
    const port = u.port || undefined;

    const addHost = (hostname: string) => {
      patterns.push({
        protocol,
        hostname,
        ...(port ? { port } : {}),
        pathname: "/upload/**",
      });
    };

    addHost(u.hostname);
    if (u.hostname === "localhost") addHost("127.0.0.1");
    if (u.hostname === "127.0.0.1") addHost("localhost");
  } catch {
    patterns.push(
      { protocol: "http", hostname: "localhost", port: "9000", pathname: "/upload/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "9000", pathname: "/upload/**" },
    );
  }

  return patterns;
}

/** True when images should bypass the Next optimizer (local API uploads in dev). */
export function shouldUseUnoptimizedImage(src: string): boolean {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/$/, "");
  return src.startsWith(`${base}/upload/`);
}
