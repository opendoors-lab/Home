import { API_BASE_URL } from "./api";

const FETCH_TIMEOUT_MS = 3_000;

async function fetchPublic<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchLatestPosts(limit = 3) {
  const data = await fetchPublic<
    import("@company/shared").PublicPostSummary[]
  >(`/public/posts/latest?limit=${limit}`, { next: { revalidate: 60 } });
  return data ?? [];
}

export async function fetchPublicPosts(page = 1, pageSize = 12) {
  const data = await fetchPublic<
    import("@company/shared").PaginatedResponse<
      import("@company/shared").PublicPostSummary
    >
  >(`/public/posts?page=${page}&pageSize=${pageSize}`, {
    next: { revalidate: 60 },
  });
  return (
    data ?? {
      items: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    }
  );
}

export async function fetchPostBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/public/posts/${slug}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return (await res.json()) as import("@company/shared").PublicPostDetail;
  } catch {
    return null;
  }
}
