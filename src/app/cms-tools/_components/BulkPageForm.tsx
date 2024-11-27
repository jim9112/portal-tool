import { copyCmsPages } from '@/app/actions/cms-copy';
import { useActionState } from 'react';
import Input from '@/app/components/Input';
import CheckBox from '@/app/components/CheckBox';
import Loading from '@/app/components/Loading';

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
          <Input
            label='From Portal'
            name='fromPortal'
            placeholder='Portal Private App Key'
          />
          <Input
            label='To Portal'
            name='toPortal'
            placeholder='Portal Private App Key'
          />
          <CheckBox label='Import all as draft' name='allDraft' />
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
      <Loading isPending={isPending} />
    </div>
  );
}
