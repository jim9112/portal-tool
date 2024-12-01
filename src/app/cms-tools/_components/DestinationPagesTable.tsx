import { useState } from 'react';
interface Page {
  id: string;
  name: string;
  currentState: string;
  url: string;
}

interface DestinationPagesTableProps {
  sitePageList: Page[];
  title: string;
}

export default function DestinationPagesTable({
  sitePageList,
  title,
}: DestinationPagesTableProps) {
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
                </tr>
              ))}
        </tbody>
      </table>
      {Math.ceil(sitePageList.length / 5) > 1 && (
        <div className='flex justify-center mt-4'>
          <div className='join'>
            {[...Array(Math.ceil(sitePageList.length / 5))].map((_, index) => (
              <button
                key={index}
                onClick={() => setPageNumber(index + 1)}
                className={`join-item btn ${
                  index + 1 === pageNumber ? 'btn-active' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
