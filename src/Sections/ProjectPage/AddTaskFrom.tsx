import { useState } from 'react';
import { ActionLoadingAnimation } from 'src/Components/Animations';
import { Button } from 'src/Components/Buttons';
import { Form, TextArea } from 'src/Components/Form';
import { Image } from 'src/Components/Image';
import { useAlert, useProject } from 'src/Hooks';
import { CreateTask } from 'src/Lib';
import { Bug } from 'src/Models';

interface Props {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  bug: Bug;
}

export const AddTaskFrom = ({ isActive, setIsActive, bug }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { project, setProject } = useProject();
  const { alert } = useAlert();

  const onSubmitHandler = async (data: any) => {
    setIsLoading(true);
    await CreateTask(data, project.id, bug.id, ({ message, status, task }) => {
      if (status === 201) {
        setProject({
          ...project,
          bugs: project.bugs.map((_bug: Bug) => {
            if (_bug.id === bug.id) {
              return { ..._bug, tasks: [..._bug.tasks, task] };
            }
            return _bug;
          }),
        });
        setIsActive(false);
        alert(message, 'success', 2.5);
        return;
      }
      alert(message, 'error', 2.5);
    });
    setIsActive(false);
    setIsLoading(false);
  };

  return (
    <Form
      className={`${
        isActive ? 'flex' : 'hidden'
      } flex-col lg:flex-row items-start lg:items-center gap-4`}
      onSubmit={onSubmitHandler}>
      <TextArea
        className='col-span-5 w-[min(900px,100%)]'
        id='description'
        name='description'
        placeholder='Description'
        requiered
      />
      {isLoading ? (
        <div className='bg-secondary p-4 rounded-md h-full cursor-not-allowed'>
          <ActionLoadingAnimation />
        </div>
      ) : (
        <div>
          <Button className='w-max' type='submit' theme='success'>
            <Image
              width={16}
              height={16}
              src='/static/images/checkmark.svg'
              alt='Edit'
            />
          </Button>
          <Button
            className='w-max ml-2'
            onClick={() => setIsActive(false)}
            theme='error'>
            <Image
              width={16}
              height={16}
              src='/static/images/cancel.svg'
              alt='Edit'
            />
          </Button>
        </div>
      )}
    </Form>
  );
};
