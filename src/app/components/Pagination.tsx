interface PaginationProps {
  nodeList: any[];
  pageNumber: number;
  setPageNumber: (page: number) => void;
}

export default function Pagination({
  nodeList,
  pageNumber,
  setPageNumber,
}: PaginationProps) {
  return (
    <>
      {Math.ceil(nodeList.length / 5) > 1 && (
        <div className='flex justify-center mt-4'>
          <div className='join'>
            {[...Array(Math.ceil(nodeList.length / 5))].map((_, index) => (
              <button
                key={index}
                onClick={() => setPageNumber(index + 1)}
                className={`join-item btn ${
                  index + 1 === pageNumber ? 'btn-active' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
