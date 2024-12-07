import { useState } from 'react';
import Pagination from '@/app/components/Pagination';
interface PagesTableProps {
  title: string;
  sitePageList: Array<any>;
  rowCta: (page: { name: string }, sitePage: boolean) => void;
  sitePage?: boolean;
}

export default function SinglePagesTable({
  title,
  sitePageList,
  rowCta,
  sitePage = true,
}: PagesTableProps) {
  const copySinglePage = (page: { name: string }) => {
    rowCta(page, sitePage);
  };

  const importImages = (page: { name: string }) => {
    function extractImageUrls(layoutSections: any): string[] {
      const imageUrls: string[] = [];

      function searchForImages(obj: any) {
        if (obj && typeof obj === 'object') {
          for (const key in obj) {
            if (key === 'src' && typeof obj[key] === 'string') {
              imageUrls.push(obj[key]);
            } else {
              searchForImages(obj[key]);
            }
          }
        }
      }

      searchForImages(layoutSections);
      return imageUrls;
    }
    const imageUrls = extractImageUrls(page.layoutSections);
    console.log(imageUrls);
  };
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <div className='overflow-x-auto mt-7'>
      <h3 className='text-xl text-center'>{title}</h3>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>Page Name</th>
            <th>Page Status</th>
            <th>Url</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sitePageList.length > 0 &&
            sitePageList
              .slice(pageNumber * 5 - 5, pageNumber * 5)
              .map((page, index) => (
                <tr key={page.id}>
                  <th>
                    <div className='flex items-center gap-3'>
                      <div>
                        <div className='font-bold'>{page.name}</div>
                      </div>
                    </div>
                  </th>
                  <td>{page.currentState}</td>
                  <td>{page.url}</td>
                  <td>
                    <button
                      onClick={() => copySinglePage(page)}
                      className='btn btn-primary btn-xs'
                    >
                      Copy Page
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => importImages(page)}
                      className='btn btn-primary btn-xs'
                    >
                      Import Images
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <Pagination
        nodeList={sitePageList}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
