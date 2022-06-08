import { Button } from 'src/Components/Buttons';
import { Form, Input, Option, Select, TextArea } from 'src/Components/Form';
import { Modal } from 'src/Components/Layout';
import { H3 } from 'src/Components/Typography';
import { useAlert, useProject } from 'src/Hooks';
import { CreateIssue } from 'src/Lib';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const CreateIssueModal = ({ isOpen, onClose }: Props) => {
  const { alert } = useAlert();
  const { project, setProject } = useProject();
  const defaultPriorityValue = 'select';

  const onSubmitHandler = async (data: any) => {
    if (
      data.priority === undefined ||
      data.priority === null ||
      data.priority === defaultPriorityValue
    ) {
      alert('Please select a priority.', 'error', 2.5);
      return;
    }
    await CreateIssue(project.id, { ...data }, ({ message, status, issue }) => {
      if (status === 201) {
        alert(message, 'success', 2.5);
        setProject({ ...project, bugs: [...project.bugs, issue] });
        onClose();
        return;
      }
      alert(message, 'error', 2.5);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <H3 className='text-themeBlack text-center'>Create an issue</H3>
      <div className='grid grid-cols-1 lg:grid-cols-2 mt-16'>
        <div>
          <Form className='flex flex-col gap-8' onSubmit={onSubmitHandler}>
            <Input
              className=''
              id='name'
              name='name'
              placeholder='Name'
              requiered
            />
            <TextArea
              name='description'
              id='description'
              placeholder='Description'
              requiered
            />
            <Select className='' name='priority' id='priority'>
              <Option value={defaultPriorityValue} selected>
                Select priority*
              </Option>
              <Option value='normal'>Low</Option>
              <Option value='medium'>medium</Option>
              <Option value='high'>High</Option>
            </Select>
            <Button type='submit' className='' theme='secondary'>
              Create
            </Button>
          </Form>
        </div>
        <div></div>
      </div>
    </Modal>
  );
};
