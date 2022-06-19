import { useState } from 'react';
import { Button, LoadingButton } from 'src/Components/Buttons';
import { Form, Input, Option, Select, TextArea } from 'src/Components/Form';
import { Image } from 'src/Components/Image';
import { Modal } from 'src/Components/Layout';
import { H3 } from 'src/Components/Typography';
import { useAlert, useProject } from 'src/Hooks';
import { CreateIssue } from 'src/Lib';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const CreateIssueModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
    await CreateIssue(project.id, { ...data }, ({ message, status, issue }) => {
      if (status === 201) {
        alert(message, 'success', 2.5);
        setProject({ ...project, bugs: [...project.bugs, issue] });
        onClose();
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      alert(message, 'error', 2.5);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <H3 className='text-themeBlack text-center'>Add an issue</H3>
      <div className='grid grid-cols-1 lg:grid-cols-2 mt-16'>
        <div>
          <Image
            className='mb-8 mx-auto max-w-[200px] md:max-w-[350px] lg:max-w-[420px] lg:mb-0'
            width={512}
            height={512}
            src='/static/images/create-2.svg'
          />
        </div>
        <div>
          <Form
            className='flex flex-col gap-8 my-auto'
            onSubmit={onSubmitHandler}>
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
              <Option value='medium'>Medium</Option>
              <Option value='high'>High</Option>
            </Select>
            <LoadingButton
              isLoading={isLoading}
              type='submit'
              theme='secondary'>
              Create
            </LoadingButton>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
