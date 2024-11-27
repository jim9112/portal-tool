'use client';
import { getAllPages } from '../actions/cms-copy';
import { useState } from 'react';
import BulkPageForm from './_components/BulkPageForm';
import GetPagesForm from './_components/GetPagesForm';
import PagesTable from './_components/PagesTable';

export default function Page() {
  const [sitePageList, setSitePageList] = useState([]);
  const [lpPageList, setLpPageList] = useState([]);

  const generatePageList = async (portalToken: string) => {
    const siteData = await getAllPages(portalToken, true);
    setSitePageList(siteData.results);
    const lpData = await getAllPages(portalToken, false);
    setLpPageList(lpData.results);
  };
  const clearResults = () => {
    setSitePageList([]);
    setLpPageList([]);
  };
  return (
    <div className='container mx-auto font-body pt-20'>
      <h1 className='text-3xl font-heading text-center mb-10'>CMS Tools</h1>
      <div role='tablist' className='tabs tabs-lifted'>
        <input
          type='radio'
          name='my_tabs_2'
          role='tab'
          className='tab [--tab-border-color:#A6ADBB] !w-max'
          aria-label='Bulk Pages Import'
          defaultChecked
        />
        <div
          role='tabpanel'
          className='tab-content bg-base-100 border-[#A6ADBB] rounded-box p-6'
        >
          <BulkPageForm />
        </div>

        <input
          type='radio'
          name='my_tabs_2'
          role='tab'
          className='tab [--tab-border-color:#A6ADBB] !w-max'
          aria-label='Single Pages Import'
        />
        <div
          role='tabpanel'
          className='tab-content bg-base-100 border-[#A6ADBB] rounded-box p-6'
        >
          {sitePageList.length > 0 && lpPageList.length > 0 && (
            <div>
              <button className='btn btn-accent' onClick={clearResults}>
                Clear Results
              </button>
            </div>
          )}
          {!sitePageList.length && !lpPageList.length && (
            <GetPagesForm generatePageList={generatePageList} />
          )}
          {sitePageList.length > 0 && (
            <PagesTable title='Website Pages' sitePageList={sitePageList} />
          )}
          {lpPageList.length > 0 && (
            <PagesTable title='Landing Pages' sitePageList={lpPageList} />
          )}
        </div>
      </div>
    </div>
  );
}
