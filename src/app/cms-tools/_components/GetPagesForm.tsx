import { useState } from 'react';

interface GetPagesFormProps {
  generatePageList: (portalKey: string) => void;
}

export default function GetPagesForm({ generatePageList }: GetPagesFormProps) {
  const [portalKey, setPortalKey] = useState('');
  const getPageList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generatePageList(portalKey);
  };
  return (
    <form className='flex justify-evenly items-end' onSubmit={getPageList}>
      <div className='flex flex-col'>
        <label className='text-left label-text' htmlFor='getAllFrom'>
          Get page list from original portal
        </label>
        <input
          required
          onChange={(e) => setPortalKey(e.target.value)}
          type='text'
          placeholder='Portal Private App Key'
          className='input input-bordered w-full max-w-xs'
          name='getAllFrom'
          id='getAllFrom'
        />
      </div>
      <div className='flex justify-center gap-4'>
        <button className='btn btn-primary'>Get Page List</button>
      </div>
    </form>
  );
}
