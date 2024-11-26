'use client';
import { copyCmsPages, getAllPages } from '../actions/cms-copy';
import { useActionState } from 'react';
import Modal from '../components/Modal';
import BulkPageForm from './_components/BulkPageForm';
import GetPagesForm from './_components/GetPagesForm';

const initialState = {
  message: '',
  error: '',
};
export default function Page() {
  const [state, formAction, isPending] = useActionState(
    copyCmsPages,
    initialState
  );

  return (
    <div className='container mx-auto font-body pt-20'>
      <h1 className='text-3xl font-heading text-center mb-10'>CMS Tools</h1>
      <div role='tablist' className='tabs tabs-lifted'>
        <input
          type='radio'
          name='my_tabs_2'
          role='tab'
          className='tab'
          aria-label='Bulk Pages Import'
          defaultChecked
        />
        <div
          role='tabpanel'
          className='tab-content bg-base-100 border-base-300 rounded-box p-6'
        >
          <BulkPageForm formAction={formAction} isPending={isPending} />
        </div>

        <input
          type='radio'
          name='my_tabs_2'
          role='tab'
          className='tab'
          aria-label='Single Pages Import'
        />
        <div
          role='tabpanel'
          className='tab-content bg-base-100 border-base-300 rounded-box p-6'
        >
          <GetPagesForm />
        </div>
      </div>

      <div>
        {state?.error && (
          <div className='text-center text-error mt-4'>{state.error}</div>
        )}
        {state?.message && (
          <div className='text-center text-success mt-4'>{state.message}</div>
        )}
      </div>
      {isPending && (
        <Modal>
          <span className='loading loading-spinner loading-lg text-info'></span>
          <p className='text-primary text-lg'>We are working on your request</p>
        </Modal>
      )}
    </div>
  );
}
