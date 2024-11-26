import { useState, useActionState } from 'react';
import { getAllPages } from '../../actions/cms-copy';
import GetPagesForm from './GetPagesForm';
import PagesTable from './PagesTable';
import Modal from '@/app/components/Modal';
import Input from '@/app/components/Input';
import CheckBox from '@/app/components/CheckBox';
import { addCmsPages } from '../../actions/cms-copy';
import Loading from '@/app/components/Loading';

const initialState = {
  message: '',
  error: '',
};

export default function SinglePagesTab() {
  const [sitePageList, setSitePageList] = useState([]);
  const [lpPageList, setLpPageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pageData, setPageData] = useState<{ name: string }[]>([]);
  const [sitePage, setSitePage] = useState(true);
  const [state, formAction, isPending] = useActionState(
    addCmsPages,
    initialState
  );
  // grab all landing pages and website pages from portal
  const generatePageList = async (portalToken: string) => {
    const siteData = await getAllPages(portalToken, true);
    setSitePageList(siteData.results);
    const lpData = await getAllPages(portalToken, false);
    setLpPageList(lpData.results);
  };
  // copy button trigger
  const triggerCopy = (page: { name: string }, sitePage: boolean) => {
    setShowModal(true);
    setPageData([page]);
    setSitePage(sitePage);
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
        <PagesTable
          title='Website Pages'
          sitePageList={sitePageList}
          triggerCopy={triggerCopy}
        />
      )}
      {lpPageList.length > 0 && (
        <PagesTable
          title='Landing Pages'
          sitePageList={lpPageList}
          triggerCopy={triggerCopy}
          sitePage={false}
        />
      )}
      <div>
        {state?.error && (
          <div className='text-center text-error mt-4'>{state.error}</div>
        )}
        {state?.message && (
          <div className='text-center text-success mt-4'>{state.message}</div>
        )}
      </div>
      {showModal && (
        <Modal>
          <h3 className='text-xl'>Copy Page to Portal</h3>
          <form action={formAction} onSubmit={() => setShowModal(false)}>
            <div className='flex gap-4'>
              <input
                hidden
                type='text'
                name='sitePage'
                id='sitePage'
                readOnly
                value={sitePage.toString()}
              />
              <input
                hidden
                type='text'
                name='data'
                id='data'
                readOnly
                value={JSON.stringify(pageData)}
              />
              <Input
                label='Destination Portal'
                name='portalKey'
                placeholder='Portal Private Key'
                isRequired={true}
              />
              <CheckBox label='Import all as draft' name='allDraft' />
            </div>
            <div className='flex gap-4 mt-6'>
              <button
                onClick={() => setShowModal(false)}
                className='btn btn-accent'
                type='button'
              >
                Cancel
              </button>
              <button className='btn btn-primary' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Loading isPending={isPending} />
    </>
  );
}
