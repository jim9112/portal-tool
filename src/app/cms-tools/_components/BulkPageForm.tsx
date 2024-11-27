import { copyCmsPages } from '@/app/actions/cms-copy';
import { useActionState } from 'react';
import Modal from '@/app/components/Modal';

const initialState = {
  message: '',
  error: '',
};
export default function BulkPageForm() {
  const [state, formAction, isPending] = useActionState(
    copyCmsPages,
    initialState
  );
  return (
    <div>
      <form action={formAction} className='flex flex-col items-center gap-2'>
        <div className='flex mb-3 justify-evenly'>
          <div className='form-control'>
            <label className='flex gap-1 cursor-pointer label'>
              <span className='label-text'>Landing Pages</span>
              <input
                type='checkbox'
                name='sitePage'
                id='sitePage'
                className='toggle toggle-accent'
              />
              <span className='label-text'>Website Pages</span>
            </label>
          </div>
        </div>
        <div className='flex justify-center gap-4'>
          <div className='flex flex-col'>
            <label className='text-center label-text' htmlFor='fromPortal'>
              From Portal
            </label>
            <input
              required
              type='text'
              placeholder='Portal Private App Key'
              className='input input-bordered w-full max-w-xs'
              name='fromPortal'
              id='fromPortal'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-center label-text' htmlFor='toPortal'>
              To Portal
            </label>
            <input
              required
              type='text'
              placeholder='Portal Private App Key'
              className='input input-bordered w-full max-w-xs'
              name='toPortal'
              id='toPortal'
            />
          </div>
          <div className='form-control'>
            <label
              className='flex flex-col p-0 cursor-pointer label'
              htmlFor='allDraft'
            >
              <span className='label-text'> Import all as draft </span>
              <input
                className='checkbox mt-3'
                type='checkbox'
                name='allDraft'
                id='allDraft'
              />
            </label>
          </div>
        </div>
        <button disabled={isPending} className='btn btn-primary mt-3'>
          Get pages
        </button>
      </form>
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
