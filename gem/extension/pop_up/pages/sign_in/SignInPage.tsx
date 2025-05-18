import { Button } from 'ui';
import { Page } from '../Page';
import { P_TO_B } from '../../../constants';
import { send_P_to_B_message } from '../../messaging_integration';

export const SignInPage = () => {
  const handleClick = () => {
    send_P_to_B_message({
      key: P_TO_B.P_TO_B_SIGN_IN_REQUEST,
    });
  };

  console.log('sign in page');

  return (
    <Page className="h-[384px]">
      <div className="absolute flex flex-col items-center h-full w-full justify-center bg-white">
        <div className="text-sm">To start diggin,</div>
        <div className="text-sm">log in or create a new account.</div>
        <div className="h-[24px]" />
        <Button onClick={handleClick}>Log in</Button>
      </div>
    </Page>
  );
};
