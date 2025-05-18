import { useNavigate } from 'react-router-dom';
import { Page } from '../Page';
import { Button, ButtonType, GemShape, Icon } from 'ui';
import { staticUrls } from 'core';
import { useSlice } from '../../store/store';
import { P_TO_B } from '../../../constants';
import { colors } from '../../../../../color';
import { send_P_to_B_message } from '../../messaging_integration';

export const ResultPage = () => {
  const navigate = useNavigate();

  const { sessionInformation, gems } = useSlice.use.app();

  const selectedGem = gems.find((gem) => gem.id === sessionInformation?.selectedGemId);

  const goPrev = () => {
    send_P_to_B_message({
      key: P_TO_B.P_TO_B_RESUME_DIGGIN,
    });

    navigate(-1);
  };

  const finishDigging = () => {
    send_P_to_B_message({
      key: P_TO_B.P_TO_B_STOP_DIGGIN,
    });
  };

  const finishAndOpenWebSite = () => {
    send_P_to_B_message({
      key: P_TO_B.P_TO_B_STOP_DIGGIN,
    });

    const existingTab = window.open([staticUrls.web, 'detail', selectedGem?.id].join('/'), 'diggin'); // Check if the tab is already opened

    if (existingTab) {
      existingTab.focus(); // If the tab is already open, focus on it
    }
  };

  return <ResultPageContent onPrev={goPrev} onFinish={finishDigging} onVisitWebsite={finishAndOpenWebSite} />;
};

type Props = {
  onPrev: () => void;
  onFinish: () => void;
  onVisitWebsite: () => void;
};

const ResultPageContent = ({ onPrev, onFinish, onVisitWebsite }: Props) => {
  const { gems, sessionInformation } = useSlice.use.app();

  const selectedGem = gems.find((gem) => gem.id === sessionInformation?.selectedGemId);

  return (
    <Page>
      <Page.Header disabledBottomBorder>
        <Icon iconName="ChevronLeft" color={colors.gray['8.5']} onClick={onPrev} />
      </Page.Header>
      <div className="h-[132px] flex flex-col items-center pt-[12px] space-y-[8px]">
        <div className="flex flex-col items-center text-base">
          <div>You've gathered</div>
          <div className="flex space-x-[4px] items-center">
            <div> {sessionInformation?.numInsights}</div>
            <div> insights</div>
            <GemShape shapeId={selectedGem?.shapeId} fill={selectedGem?.color} stroke={selectedGem?.color} />
            <div>so far!</div>
          </div>
        </div>
        <div className="text-xs text-gray-5">Would you visit the website and check it out?</div>
      </div>
      <div className="flex w-full">
        <Button className="overflow-hidden flex-1 rounded-none" buttonType={ButtonType.black} onClick={onFinish}>
          No, thanks
        </Button>
        <Button
          className="overflow-hidden flex-1 rounded-none text-gray-0"
          style={{
            backgroundColor: selectedGem?.color,
          }}
          onClick={onVisitWebsite}
        >
          Check insights
        </Button>
      </div>
      <div></div>
    </Page>
  );
};
