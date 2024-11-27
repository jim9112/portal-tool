import { useState } from 'react';
import { getAllPages } from '../../actions/cms-copy';
import GetPagesForm from './GetPagesForm';
import PagesTable from './PagesTable';

export default function SinglePagesTab() {
  const [sitePageList, setSitePageList] = useState([]);
  const [lpPageList, setLpPageList] = useState([]);

  const generatePageList = async (portalToken: string) => {
    const siteData = await getAllPages(portalToken, true);
    setSitePageList(siteData.results);
    const lpData = await getAllPages(portalToken, false);
    setLpPageList(lpData.results);
  };
  const clearResults = () => {
    setSitePageList([]);
    setLpPageList([]);
  };
  return (
    <>
      {sitePageList.length > 0 && lpPageList.length > 0 && (
        <div>
          <button className='btn btn-accent' onClick={clearResults}>
            Clear Results
          </button>
        </div>
      )}
      {!sitePageList.length && !lpPageList.length && (
        <GetPagesForm generatePageList={generatePageList} />
      )}
      {sitePageList.length > 0 && (
        <PagesTable title='Website Pages' sitePageList={sitePageList} />
      )}
      {lpPageList.length > 0 && (
        <PagesTable title='Landing Pages' sitePageList={lpPageList} />
      )}
    </>
  );
}
