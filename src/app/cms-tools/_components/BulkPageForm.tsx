interface BulkPageFormProps {
  formAction: (payload: FormData) => void;
  isPending: boolean;
}

export default function BulkPageForm({
  formAction,
  isPending,
}: BulkPageFormProps) {
  return (
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
              className='checkbox checkbox-primary'
              type='checkbox'
              name='allDraft'
              id='allDraft'
            />
          </label>
        </div>
      </div>
      <button disabled={isPending} className='btn btn-outline btn-primary'>
        Get pages
      </button>
    </form>
  );
}
