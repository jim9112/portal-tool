import { copyCmsPages } from '@/app/actions/cms-copy';
import { useActionState, useContext } from 'react';
import CheckBox from '@/app/components/CheckBox';
import Loading from '@/app/components/Loading';
import { PortalKeyContext } from '@/app/cms-tools/_context/PortalKeyContext';

const initialState = {
  message: '',
  error: '',
};
interface PortalKeys {
  fromPortal?: string;
  toPortal?: string;
}

export default function BulkPageForm() {
  const portalKeys: PortalKeys = useContext(PortalKeyContext);
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
          <input
            type='text'
            name='fromPortal'
            value={portalKeys.fromPortal}
            hidden
            readOnly
          />
          <input
            type='text'
            name='toPortal'
            value={portalKeys.toPortal}
            hidden
            readOnly
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
