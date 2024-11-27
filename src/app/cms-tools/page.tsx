'use client';
import Tab from '../components/Tab';
import BulkPageForm from './_components/BulkPageForm';
import SinglePagesTab from './_components/SinglePagesTab';
export default function Page() {
  return (
    <div className='container mx-auto font-body pt-20'>
      <h1 className='text-3xl font-heading text-center mb-10'>CMS Tools</h1>

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
