import DestinationPagesTable from './DestinationPagesTable';
import useGetAllPages from '../_hooks/useGetAllPages';
interface DestinationPagesTabProps {
  portalKeys: {
    toPortal: string;
  };
}
export default function DestinationPagesTab({
  portalKeys,
}: DestinationPagesTabProps) {
  const { sitePageList, lpPageList, generatePageList } = useGetAllPages(
    portalKeys.toPortal
  );
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
