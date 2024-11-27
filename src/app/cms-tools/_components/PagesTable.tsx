interface PagesTableProps {
  title: string;
  sitePageList: Array<any>;
  triggerCopy: (page: { name: string }, sitePage: boolean) => void;
  sitePage?: boolean;
}

export default function PagesTable({
  title,
  sitePageList,
  triggerCopy,
  sitePage = true,
}: PagesTableProps) {
  const copySinglePage = (page: { name: string }) => {
    triggerCopy(page, sitePage);
  };
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
          </tr>
        </thead>
        <tbody>
          {sitePageList.length > 0 &&
            sitePageList.map((page, index) => (
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
