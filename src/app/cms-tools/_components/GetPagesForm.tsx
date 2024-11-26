export default function GetPagesForm() {
  const getPageList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('get page list');
  };

  return (
    <form className='flex justify-evenly items-end' onSubmit={getPageList}>
      <div className='flex flex-col'>
        <label className='text-left label-text' htmlFor='getAllFrom'>
          Get page list from original portal
        </label>
        <input
          required
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
