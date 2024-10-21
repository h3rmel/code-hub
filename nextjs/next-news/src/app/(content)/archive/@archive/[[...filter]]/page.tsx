import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news';
import { INews } from '@/types/news';
import { NewsList } from '@/ui/components/news-list';
import Link from 'next/link';
import { Suspense } from 'react';

async function FilterHeader({ year, month }: { year: string | undefined; month: string | undefined }) {
  const availableYears = await getAvailableNewsYears();
  let periodLinks = availableYears;

  if (year && !month) {
    periodLinks = getAvailableNewsMonths(year);
  }

  if (year && month) {
    periodLinks = [];
  }

  if ((year && !availableYears.includes(year)) || (month && !getAvailableNewsMonths(year ?? '2024').includes(month))) {
    throw new Error('Invalid filter!');
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {periodLinks.map((periodLink) => {
            const href = year ? `/archive/${year}/${periodLink}` : `/archive/${periodLink}`;

            return (
              <li key={periodLink}>
                <Link href={href}>{periodLink}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }: { year: string | undefined; month: string | undefined }) {
  let news: INews[] = [];

  if (year && !month) news = await getNewsForYear(year);
  else if (year && month) news = await getNewsForYearAndMonth(year, month);

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList newsData={news} />;
  }

  return newsContent;
}

export default async function FilteredNewsPage({
  params,
}: {
  params: {
    filter?: string[];
  };
}) {
  const selectedYear = params.filter?.[0];
  const selectedMonth = params.filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading filters...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
