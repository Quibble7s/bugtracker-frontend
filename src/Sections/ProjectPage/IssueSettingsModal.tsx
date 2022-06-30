import { Modal } from 'src/Components/Layout';
import { H3 } from 'src/Components/Typography';
import { Bug } from 'src/Models';
import { EditIssueForm } from './EditIssueForm';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  issue: Bug;
}

export const IssueSettingsModal = ({ isOpen, onClose, issue }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <H3 className='text-themeGray'>Issue settigs</H3>
      <span className='w-full h-[1px] block bg-themeGray' />
      <div className='mt-16 grid grid-cols-1 md:grid-cols-2'>
        <EditIssueForm issue={issue} />
        <div></div>
      </div>
    </Modal>
  );
};
