"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { PostDto } from "@company/shared";
import { adminApi } from "@/lib/admin-api";
import PostEditor from "@/components/admin/PostEditor";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDto | null>(null);

  useEffect(() => {
    adminApi.getPost(id).then(setPost).catch(console.error);
  }, [id]);

  if (!post) return <p className="text-[var(--color-ink-soft)]">Loading…</p>;
  return <PostEditor post={post} />;
}
