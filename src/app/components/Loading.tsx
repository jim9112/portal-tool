import Modal from './Modal';
interface LoadingProps {
  isPending: boolean;
}

export default function Loading({ isPending }: LoadingProps) {
  return (
    <>
      {isPending && (
        <Modal>
          <span className='loading loading-spinner loading-lg text-info'></span>
          <p className='text-primary text-lg'>We are working on your request</p>
        </Modal>
      )}
    </>
  );
}
