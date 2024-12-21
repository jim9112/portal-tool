'use client';
import { useEffect, useState } from 'react';
import { PortalKeyContext } from '@/app/cms-tools/_context/PortalKeyContext';
import Input from '@/app/components/Input';
import Tab from '@/app/components/Tab';
import BulkPageForm from '@/app/cms-tools/_components/BulkPageForm';
import SinglePagesTab from '@/app/cms-tools/_components/SinglePagesTab';
import DestinationPagesTab from './_components/DestinationPagesTab';
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
    <PortalKeyContext.Provider value={portalKeys}>
      <div className='container mx-auto font-body pt-20'>
        <h1 className='text-3xl font-heading text-center mb-10'>CMS Tools</h1>
        {!portalKeys.fromPortal ||
          (!portalKeys.toPortal && (
            <p className='text-center mb-4 text-accent'>
              To get started enter the portal keys for both portals and hit
              save.
            </p>
          ))}
        <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
          <div className='flex justify-center gap-4'>
            <Input
              onChangeCallback={(e) =>
                setPortalKeys({
                  ...portalKeys,
                  [e.target.name]: e.target.value,
                })
              }
              name='fromPortal'
              value={portalKeys.fromPortal}
              label='Starting Portal'
              isRequired={true}
            />
            <Input
              onChangeCallback={(e) =>
                setPortalKeys({
                  ...portalKeys,
                  [e.target.name]: e.target.value,
                })
              }
              name='toPortal'
              value={portalKeys.toPortal}
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
        {portalKeys.fromPortal && portalKeys.toPortal && (
          <div role='tablist' className='tabs tabs-lifted'>
            <Tab name='my_tabs_3' label='Bulk Pages Import' defaultChecked>
              <BulkPageForm />
            </Tab>
            <Tab name='my_tabs_3' label='Single Pages Import'>
              <SinglePagesTab />
            </Tab>
            <Tab name='my_tabs_3' label='Manage Images'>
              <p>Manage Images</p>
            </Tab>
            <Tab name='my_tabs_3' label='Destination Portal'>
              <DestinationPagesTab />
            </Tab>
          </div>
        )}
      </div>
    </PortalKeyContext.Provider>
  );
}
