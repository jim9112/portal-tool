import { useState } from 'react';
import { getAllPages } from '@/app/actions/cms-copy';

export default function useGetAllPages(portalKey: string) {
  const [sitePageList, setSitePageList] = useState([]);
  const [lpPageList, setLpPageList] = useState([]);
  const generatePageList = async () => {
    const siteData = await getAllPages(portalKey, true);
    setSitePageList(siteData.results);
    const lpData = await getAllPages(portalKey, false);
    setLpPageList(lpData.results);
  };
  return {
    sitePageList,
    lpPageList,
    generatePageList,
  };
}
