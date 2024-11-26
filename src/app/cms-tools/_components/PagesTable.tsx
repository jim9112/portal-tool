import { useState } from 'react';
interface PagesTableProps {
  sitePageList: Array<any>;
}

export default function PagesTable({ sitePageList }: PagesTableProps) {
  const [allChecked, setAllChecked] = useState(false);
  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input
                  onChange={() => setAllChecked(!allChecked)}
                  type='checkbox'
                  className='checkbox'
                />
              </label>
            </th>
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
                  <button className='btn btn-primary btn-xs'>Copy Page</button>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
