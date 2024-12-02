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
    function findNestedImages(obj: {}) {
      const images: String[] = [];

      function search(obj: any) {
        // Check if the current object is indeed an object
        if (obj !== null && (typeof obj === 'object' || Array.isArray(obj))) {
          // If the object has the key "img", add it to the images array
          if (typeof obj === 'object' && obj.hasOwnProperty('img')) {
            // if images doesnt contain the image src, add it
            if (!images.includes(obj.img.src)) {
              images.push(obj.img.src);
            }
          }
          // Search through all elements in the array
          if (Array.isArray(obj)) {
            obj.forEach((element) => search(element));
          } else {
            // Recursively search through all keys in the object
            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                search(obj[key]);
              }
            }
          }
        }
      }

      search(obj);
      return images;
    }
    const images = findNestedImages(page);
    console.log(images);
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
