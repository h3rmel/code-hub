'use server';

// #region Imports

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { IMealFormData } from '@/types/meal';

import { saveMeal } from './meals';

// #endregion

function isInvalidText(text: string) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState: any, formData: FormData): Promise<{ message: string } | void> {
  const meal: IMealFormData = {
    title: formData.get('title')?.toString()!,
    summary: formData.get('summary')?.toString()!,
    instructions: formData.get('instructions')?.toString()!,
    image: formData.get('image') as File,
    creator: formData.get('name')?.toString()!,
    creator_email: formData.get('email')?.toString()!,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return { message: 'Invalid input data!' };
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}
