"use server";

import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { redirect } from "next/navigation";
import { uploadImage } from "../cloudinary";
import { revalidatePath } from "next/cache";

/**
 * @param {object} prevState
 * @param {FormData} formData
 */
export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is missing.");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is missing.");
  }

  if (!image || image.size === 0) {
    errors.push("Image is missing.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "Image upload failed, post was not created. Please try again."
    );
  }

  await storePost({ imageUrl: imageUrl, title, content, userId: 1 });

  revalidatePath("/", "layout");
  redirect("/feed");
}

/**
 *
 * @param {number} postId
 */
export async function togglePostLikeStatus(postId) {
  updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
}
