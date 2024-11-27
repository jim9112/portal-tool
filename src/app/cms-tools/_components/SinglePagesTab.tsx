import { useState } from 'react';
import { getAllPages } from '../../actions/cms-copy';
import GetPagesForm from './GetPagesForm';
import PagesTable from './PagesTable';
import Modal from '@/app/components/Modal';
import Input from '@/app/components/Input';
import CheckBox from '@/app/components/CheckBox';

export default function SinglePagesTab() {
  const [sitePageList, setSitePageList] = useState([]);
  const [lpPageList, setLpPageList] = useState([]);
  const [showModal, setShowModal] = useState(true);
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
            <div className='flex gap-4'>
              <Input
                label='Destination Portal'
                name='portalKey'
                placeholder='Portal Private Key'
              />
              <CheckBox label='Import all as draft' name='allDraft' />
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
