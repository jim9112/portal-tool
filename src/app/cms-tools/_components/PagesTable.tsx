import { useState } from 'react';
interface PagesTableProps {
  title: string;
  sitePageList: Array<any>;
}

export default function PagesTable({ title, sitePageList }: PagesTableProps) {
  const copySinglePage = (page: { name: string }) => {
    console.log(page.name);
  };
  return (
    <div className='overflow-x-auto mt-7'>
      <h3 className='text-xl text-center'>{title}</h3>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Page Name</th>
            <th>Page Status</th>
            <th>Url</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sitePageList.length > 0 &&
            sitePageList.map((page, index) => (
              <tr key={page.id}>
                <th>
                  <label>
                    <input type='checkbox' className='checkbox' />
                  </label>
                </th>
                <td>
                  <div className='flex items-center gap-3'>
                    <div>
                      <div className='font-bold'>{page.name}</div>
                    </div>
                  </div>
                </td>
                <td>{page.currentState}</td>
                <td>{page.url}</td>
                <th>
                  <button
                    onClick={() => copySinglePage(page)}
                    className='btn btn-primary btn-xs'
                  >
                    Copy Page
                  </button>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
