import { getNewsItem } from '@/lib/news';
import { notFound } from 'next/navigation';

export default async function ImagePage({ params }: { params: { slug: string } }) {
  const newsItem = await getNewsItem(params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
