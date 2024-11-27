import { useState } from 'react';
import { getAllPages } from '../../actions/cms-copy';
import GetPagesForm from './GetPagesForm';
import PagesTable from './PagesTable';
import Modal from '@/app/components/Modal';
import Input from '@/app/components/Input';

export default function SinglePagesTab() {
  const [sitePageList, setSitePageList] = useState([]);
  const [lpPageList, setLpPageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
      {showModal && (
        <Modal>
          <h2>Test</h2>
          <form action=''>
            <Input
              label='Desination Portal'
              name='portalKey'
              placeholder='Portal Private Key'
            />
          </form>
        </Modal>
      )}
    </>
  );
}
