import { useParams } from 'react-router-dom';

export const JoinProjectPage = () => {
  const params = useParams();
  console.log(params);
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      JoinPage
    </div>
  );
};
