import { useState } from 'react';
import DestinationPagesTable from './DestinationPagesTable';
interface DestinationPagesTabProps {
  portalKeys: {
    toPortal: string;
  };
}
import { getAllPages } from '@/app/actions/cms-copy';
export default function DestinationPagesTab({
  portalKeys,
}: DestinationPagesTabProps) {
  const [sitePageList, setSitePageList] = useState([]);
  const [lpPageList, setLpPageList] = useState([]);
  // grab all landing pages and website pages from portal
  const generatePageList = async () => {
    const siteData = await getAllPages(portalKeys.toPortal, true);
    setSitePageList(siteData.results);
    const lpData = await getAllPages(portalKeys.toPortal, false);
    setLpPageList(lpData.results);
  };
  return (
    <div>
      <button className='btn btn-accent' onClick={generatePageList}>
        {!sitePageList.length && !lpPageList.length
          ? 'Get Pages'
          : 'Refresh Pages'}
      </button>
      {sitePageList.length > 0 && (
        <DestinationPagesTable
          title='Website Pages'
          sitePageList={sitePageList}
        />
      )}
      {lpPageList.length > 0 && (
        <DestinationPagesTable
          title='Landing Pages'
          sitePageList={lpPageList}
        />
      )}
    </div>
  );
}
