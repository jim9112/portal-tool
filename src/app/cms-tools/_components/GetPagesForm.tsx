import Input from '@/app/components/Input';
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
      <Input
        label='Get page list from original portal'
        name='portalKey'
        placeholder='Portal Private Key'
        onChangeCallback={(e) => setPortalKey(e.target.value)}
      />
      <div className='flex justify-center gap-4'>
        <button className='btn btn-primary'>Get Page List</button>
      </div>
    </form>
  );
}
