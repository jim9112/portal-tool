import { useState, useActionState } from 'react';
import SinglePagesTable from '@/app/cms-tools/_components/SinglePagesTable';
import Modal from '@/app/components/Modal';
import CheckBox from '@/app/components/CheckBox';
import { addCmsPages } from '@/app/actions/cms-copy';
import Loading from '@/app/components/Loading';
import useGetAllPages from '@/app/cms-tools/_hooks/useGetAllPages';
const initialState = {
  message: '',
  error: '',
};

interface SinglePagesTabProps {
  portalKeys: {
    fromPortal: string;
    toPortal: string;
  };
}

export default function SinglePagesTab({ portalKeys }: SinglePagesTabProps) {
  const { sitePageList, lpPageList, generatePageList } = useGetAllPages(
    portalKeys.fromPortal
  );
  const [showModal, setShowModal] = useState(false);
  const [pageData, setPageData] = useState<{ name: string }[]>([]);
  const [sitePage, setSitePage] = useState(true);
  const [state, formAction, isPending] = useActionState(
    addCmsPages,
    initialState
  );
  // copy button trigger
  const triggerCopy = (page: { name: string }, sitePage: boolean) => {
    setShowModal(true);
    setPageData([page]);
    setSitePage(sitePage);
  };
  return (
    <>
      <div>
        <button className='btn btn-accent' onClick={generatePageList}>
          {!sitePageList.length && !lpPageList.length
            ? 'Get Pages'
            : 'Refresh Pages'}
        </button>
      </div>

      {sitePageList.length > 0 && (
        <SinglePagesTable
          title='Website Pages'
          sitePageList={sitePageList}
          rowCta={triggerCopy}
        />
      )}
      {lpPageList.length > 0 && (
        <SinglePagesTable
          title='Landing Pages'
          sitePageList={lpPageList}
          rowCta={triggerCopy}
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
              <input
                hidden
                type='text'
                name='portalKey'
                readOnly
                value={portalKeys.toPortal}
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
