// #region Imports

import sql from 'better-sqlite3';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';

import { IMeal, IMealFormData } from '@/types/meal';

// #endregion

const database = sql('meals.db');

/**
 * Retrieves a list of meals from the database.
 *
 * @returns A promise that resolves to an array of meals.
 */
export async function getMeals(): Promise<IMeal[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = database.prepare('SELECT * FROM meals').all();

  // throw new Error('Loading meals failed!');

  return data as IMeal[];
}

/**
 * Retrieves a meal from the database based on its slug.
 *
 * @param slug - The slug of the meal to retrieve.
 * @returns The meal object matching the provided slug.
 */
export function getMeal(slug: string): IMeal {
  const data = database.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);

  return data as IMeal;
}

export async function saveMeal(mealData: IMealFormData) {
  // The meal to be added to the database.
  const meal: Omit<IMeal, 'id'> = {
    ...mealData,
    slug: slugify(mealData.title, { lower: true }),
    image: '',
    instructions: xss(mealData.instructions),
  };

  const imageExtension = mealData.image.name.split('.').pop();
  const fileName = `${meal.slug}.${imageExtension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await mealData.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  database
    .prepare(
      `
    INSERT INTO meals
      (
      	title,
        summary,
        instructions,
        creator,
        creator_email,
        image,
        slug
      )
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
    `,
    )
    .run(meal);
}
