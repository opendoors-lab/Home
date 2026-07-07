"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PostDto } from "@company/shared";
import { PERMISSIONS } from "@company/shared";
import { adminApi } from "@/lib/admin-api";
import { useAuth } from "@/contexts/AuthContext";
import TipTapEditor from "./TipTapEditor";

interface PostEditorProps {
  post?: PostDto;
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const { hasPermission } = useAuth();
  const canCreate = hasPermission(PERMISSIONS.CREATE_POST);
  const canSubmit = hasPermission(PERMISSIONS.SUBMIT_POST);
  const canDelete = hasPermission(PERMISSIONS.DELETE_POST);
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "<p></p>");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function saveDraft() {
    setSaving(true);
    setError("");
    try {
      const data = { title, body, excerpt: excerpt || undefined, coverImageUrl: coverImageUrl || undefined };
      if (post) {
        await adminApi.updatePost(post.id, data);
      } else {
        const created = await adminApi.createPost(data);
        router.replace(`/admin/posts/${created.id}/edit`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function submitForReview() {
    if (!post) {
      await saveDraft();
      return;
    }
    setSaving(true);
    try {
      await adminApi.updatePost(post.id, { title, body, excerpt, coverImageUrl });
      await adminApi.submitPost(post.id);
      router.push("/admin/posts/mine");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submit failed");
    } finally {
      setSaving(false);
    }
  }

  async function uploadCover() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const { publicUrl } = await adminApi.uploadImage(file);
      setCoverImageUrl(publicUrl);
    };
    input.click();
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          {post ? "Edit post" : "New post"}
        </h1>
        {post && (
          <span className="rounded-full bg-[var(--color-cream-200)] px-3 py-1 text-xs font-medium text-[var(--color-ink-soft)]">
            {post.status.replace(/_/g, " ")}
          </span>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <label className="text-sm font-medium text-[var(--color-forest)]">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-3 text-lg"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--color-forest)]">Excerpt</label>
        <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">Short summary for blog listings</p>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Optional teaser text…"
          className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--color-forest)]">Cover image</label>
        <div className="mt-2 flex flex-wrap items-start gap-4">
          <button
            type="button"
            onClick={uploadCover}
            className="rounded-lg bg-[var(--color-forest)] px-4 py-2 text-sm text-white"
          >
            Upload cover
          </button>
          {coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverImageUrl}
              alt="Cover preview"
              className="h-24 w-40 rounded-lg border border-[var(--color-line)] object-cover"
            />
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--color-forest)]">Content</label>
        <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">
          Rich text editor — formatting appears on the published blog post
        </p>
        <div className="mt-2">
          <TipTapEditor content={body} onChange={setBody} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {(canCreate || !post) && (
          <button
            type="button"
            disabled={saving || !title}
            onClick={saveDraft}
            className="rounded-xl bg-[var(--color-forest)] px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            Save draft
          </button>
        )}
        {post && canSubmit && (post.status === "DRAFT" || post.status === "REJECTED") && (
          <button
            type="button"
            disabled={saving || !title}
            onClick={submitForReview}
            className="rounded-xl bg-[var(--color-amber)] px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            Submit for review
          </button>
        )}
        {post && canDelete && (
          <button
            type="button"
            disabled={saving}
            onClick={async () => {
              if (!window.confirm("Delete this post permanently?")) return;
              setSaving(true);
              try {
                await adminApi.deletePost(post.id);
                router.push("/admin/posts/mine");
              } catch (e) {
                setError(e instanceof Error ? e.message : "Delete failed");
              } finally {
                setSaving(false);
              }
            }}
            className="rounded-xl border border-red-200 px-5 py-2 text-sm font-medium text-red-700 disabled:opacity-50"
          >
            Delete post
          </button>
        )}
      </div>
    </div>
  );
}
