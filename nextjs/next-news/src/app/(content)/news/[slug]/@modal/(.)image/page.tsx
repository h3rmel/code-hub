// #region Imports

import { getNewsItem } from '@/lib/news';
import ModalBackdrop from '@/ui/components/modal-backdrop';
import { notFound } from 'next/navigation';

// #endregion

export default async function InterceptedImagePage({ params }: { params: { slug: string } }) {
  const newsItem = await getNewsItem(params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
