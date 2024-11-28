'use client';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import Tab from '../components/Tab';
import BulkPageForm from './_components/BulkPageForm';
import SinglePagesTab from './_components/SinglePagesTab';
export default function Page() {
  interface FormEvent extends React.FormEvent<HTMLFormElement> {}
  const [portalKeys, setPortalKeys] = useState({
    fromPortal: '',
    toPortal: '',
  });

  useEffect(() => {
    const keys = localStorage.getItem('portalKeys');
    if (keys) {
      setPortalKeys(JSON.parse(keys));
    }
  }, []);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    localStorage.setItem('portalKeys', JSON.stringify(portalKeys));
  };
  return (
    <div className='container mx-auto font-body pt-20'>
      <h1 className='text-3xl font-heading text-center mb-10'>CMS Tools</h1>
      <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
        <div className='flex justify-center gap-4'>
          <Input
            onChangeCallback={(e) =>
              setPortalKeys({ ...portalKeys, [e.target.name]: e.target.value })
            }
            name='fromPortal'
            label='Starting Portal'
            isRequired={true}
          />
          <Input
            onChangeCallback={(e) =>
              setPortalKeys({ ...portalKeys, [e.target.name]: e.target.value })
            }
            name='toPortal'
            label='Destination Portal'
            isRequired={true}
          />
        </div>
        <div className='flex justify-center mt-4 mb-4'>
          <button className='btn btn-primary' type='submit'>
            Save
          </button>
        </div>
      </form>
      <div role='tablist' className='tabs tabs-lifted'>
        <Tab name='my_tabs_3' label='Bulk Pages Import' defaultChecked>
          <BulkPageForm />
        </Tab>
        <Tab name='my_tabs_3' label='Single Pages Import'>
          <SinglePagesTab />
        </Tab>
      </div>
    </div>
  );
}
