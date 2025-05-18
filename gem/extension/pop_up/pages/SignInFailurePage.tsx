import { Button } from 'ui';
import { Page } from './Page';
import { P_TO_B } from '../../constants';
import { send_P_to_B_message } from '../messaging_integration';

export const SignInFailurePage = () => {
  const handleClick = () => {
    send_P_to_B_message({
      key: P_TO_B.P_TO_B_SIGN_IN_REQUEST,
    });
  };

  return (
    <Page className="h-[384px]">
      <div className="absolute flex flex-col items-center h-full w-full justify-center bg-white">
        <div className="text-sm">Failed to login.</div>
        <div className="text-sm">try log in again to start diggin</div>
        <div className="h-[24px]" />
        <Button onClick={handleClick}>Log in</Button>
      </div>
    </Page>
  );
};
