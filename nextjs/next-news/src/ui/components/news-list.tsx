import { INews } from '@/types/news';
import Link from 'next/link';

export function NewsList({ newsData }: { newsData: INews[] }) {
  return (
    <ul className="news-list">
      {newsData.map((news: INews) => (
        <li key={news.id}>
          <Link href={`/news/${news.slug}`}>
            <img src={`/images/news/${news.image}`} alt={news.title} />
            <span>{news.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
