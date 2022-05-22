import { Button } from 'src/Components/Buttons';
import { Form, Input } from 'src/Components/Form';
import { Modal } from 'src/Components/Layout';
import { H3 } from 'src/Components/Typography';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const CreateProjectModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <H3 className='text-center mb-8'>Create a project</H3>
      <Form
        className='grid grid-cols-3 gap-8'
        onSubmit={(data) => console.log(data)}>
        <Input id='name' name='name' placeholder='Project name' requiered />
        <Input
          id='description'
          name='description'
          placeholder='Project description'
          requiered
        />
        <Button type='submit' theme='secondary'>
          Create
        </Button>
      </Form>
    </Modal>
  );
};
