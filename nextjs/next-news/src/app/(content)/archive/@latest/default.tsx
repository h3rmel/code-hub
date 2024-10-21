import { getLatestNews } from '@/lib/news';
import { NewsList } from '@/ui/components/news-list';

export default async function DefaultLatestNewsPage() {
  const latestNews = await getLatestNews();
  return (
    <>
      <h2>Latest News</h2>
      <NewsList newsData={latestNews} />
    </>
  );
}
