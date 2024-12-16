import { PostForm } from "@/components/post-form";
import { createPost } from "@/lib/actions/posts";

export default function NewPostPage() {
  return (
    <>
      <PostForm action={createPost} />
    </>
  );
}
