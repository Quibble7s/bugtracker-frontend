import { Member, ProjectRole } from 'src/Models';
import { Image } from '../Image';
import { PXS } from '../Typography';

export const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className='flex gap-4 flex-row items-center'>
      <Image
        width={16}
        height={16}
        src='/static/images/defaultProfilePicture.svg'
      />
      <PXS
        className={`${
          member.role === ProjectRole.admin ? 'text-red-500' : 'text-themeGray'
        }`}>
        {member.user.userName}
      </PXS>
      {member.role === ProjectRole.admin && (
        <PXS className='p-[4px] text-red-500 bg-red-500/40 rounded-md border border-red-500'>
          admin
        </PXS>
      )}
    </div>
  );
};
