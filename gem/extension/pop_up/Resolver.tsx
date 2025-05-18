import { useEffect } from 'react';
import { B_TO_P, Message, P_TO_B } from '../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { urls } from './utils/constants/url';
import { on_message_from_B, send_P_to_B_message } from './messaging_integration';

export const Resolver = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    console.log(`location changed to ${location.pathname}`);

    if (urls.adjustPathName(location.pathname) === urls.root) return;

    send_P_to_B_message({
      key: P_TO_B.P_TO_B_URL_CHANGED,
      data: {
        location: location.pathname,
      },
    });
  }, [location]);

  useEffect(() => {
    on_message_from_B(B_TO_P.B_TO_P_CHANGE_URL, (data) => {
      const typedData = data as {
        location: string;
      };

      navigate(typedData.location);
    });

    send_P_to_B_message({
      key: P_TO_B.P_TO_B_OPEN,
    });
  }, []);

  return children;
};
