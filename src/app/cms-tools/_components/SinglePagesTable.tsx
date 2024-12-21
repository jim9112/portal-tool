import { useState, useContext } from 'react';
import { PortalKeyContext } from '../_context/PortalKeyContext';
import { extractImageUrls } from '@/app/utilities/imageCopy';
import Pagination from '@/app/components/Pagination';
import Modal from '@/app/components/Modal';
import { copyAllFiles } from '@/app/actions/file-copy';
interface PagesTableProps {
  title: string;
  sitePageList: Array<Page>;
  rowCta: (page: Page, sitePage: boolean) => void;
  sitePage?: boolean;
}
interface Page {
  id: string;
  name: string;
  currentState: string;
  url: string;
  layoutSections: {};
}
export default function SinglePagesTable({
  title,
  sitePageList,
  rowCta,
  sitePage = true,
}: PagesTableProps) {
  const portalKeys = useContext(PortalKeyContext);
  const copySinglePage = (page: Page) => {
    rowCta(page, sitePage);
  };
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  // grab a list of image urls from the page layout ***This will be moved***
  const importImages = (page: Page) => {
    const imageList = extractImageUrls(page.layoutSections);
    setImageUrls(imageList);
    setOpenModal(true);
  };
  // download the images from the list of urls ***This will be moved***
  const downloadImages = async (url: string) => {
    const data = await copyAllFiles(url, portalKeys.toPortal);
    console.log(data);
  };
  const [pageNumber, setPageNumber] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='overflow-x-auto mt-7'>
      <h3 className='text-xl text-center'>{title}</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Page Name</th>
            <th>Page Status</th>
            <th>Url</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sitePageList.length > 0 &&
            sitePageList
              .slice(pageNumber * 5 - 5, pageNumber * 5)
              .map((page) => (
                <tr key={page.id}>
                  <th>
                    <div className='flex items-center gap-3'>
                      <div>
                        <div className='font-bold'>{page.name}</div>
                      </div>
                    </div>
                  </th>
                  <td>{page.currentState}</td>
                  <td>{page.url}</td>
                  <td>
                    <button
                      onClick={() => copySinglePage(page)}
                      className='btn btn-primary btn-xs'
                    >
                      Copy Page
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => importImages(page)}
                      className='btn btn-primary btn-xs'
                    >
                      Import Images
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <Pagination
        nodeList={sitePageList}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      {openModal && (
        <Modal>
          <div>
            {imageUrls.map((url, index) => (
              <div className='flex items-center justify-between' key={index}>
                <a href={url} target='_blank'>
                  {url}
                </a>
                <button
                  className='btn btn-secondary btn-xs'
                  onClick={() => downloadImages(url)}
                >
                  Copy Image
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setOpenModal(false)}
            className='btn btn-primary btn-xs'
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}
