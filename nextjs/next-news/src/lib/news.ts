import sql from 'better-sqlite3';

import { INews } from '@/types/news';

const db = sql('src/data/data.db');

export async function getAllNews(): Promise<INews[]> {
  const news = db.prepare('SELECT * FROM news').all();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return news as INews[];
}

export async function getNewsItem(slug: string): Promise<INews> {
  const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return newsItem as INews;
}

export async function getLatestNews(): Promise<INews[]> {
  const latestNews = db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3').all();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return latestNews as INews[];
}

export async function getAvailableNewsYears(): Promise<string[]> {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year: any) => year.year);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return years as string[];
}

export function getAvailableNewsMonths(year: string): string[] {
  return db
    .prepare("SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?")
    .all(year)
    .map((month: any) => month.month);
}

export async function getNewsForYear(year: string): Promise<INews[]> {
  const news = db.prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC").all(year);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return news as INews[];
}

export async function getNewsForYearAndMonth(year: string, month: string): Promise<INews[]> {
  const news = db
    .prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC")
    .all(year, month);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return news as INews[];
}
