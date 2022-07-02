import { Button } from 'src/Components/Buttons';
import { Image } from 'src/Components/Image';
import { Modal } from 'src/Components/Layout';
import { H3 } from 'src/Components/Typography';

export const DeleteIssueModal = ({
  isOpen,
  onClose,
  handleOnDelete,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  handleOnDelete: () => Promise<void>;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {' '}
      <H3 className='text-center'>
        ¿Are you sure you want to delete this issue?
      </H3>
      <Image
        className='mx-auto mt-8'
        width={512}
        height={388.41}
        src='/static/images/delete.svg'
      />
      <div className='grid gird-cols-1 md:grid-cols-2 gap-8 mt-8'>
        <Button theme='light'>Cancel</Button>
        <Button onClick={handleOnDelete} theme='error'>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
