import { CollectionName, staticUrls, formatSeconds, formatNumber, DigginState } from 'core';
import { useEffect, useState } from 'react';
import { Button, ButtonType, GemShape, Icon } from 'ui';
import { Container } from './Container';
import { useNavigate } from 'react-router-dom';
import { urls } from '../../utils/constants/url';
import { Page } from '../Page';
import { useUserCollection, useUserCollectionOnce } from '../../hooks/useUserCollection';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { getGreetingMessage } from '../../utils/functions';
import { and, where } from 'firebase/firestore';
import { useSlice } from '../../store/store';
import { P_TO_B } from '../../../constants';
import { colors } from '../../../../../color';
import { send_P_to_B_message } from '../../messaging_integration';

/**
 * - navigation
 * - no UI
 */
export const HomePage = () => {
  const navigate = useNavigate();

  const [gems] = useUserCollectionOnce({ collectionName: CollectionName.Gem });

  useEffect(() => {
    if (!gems) return;

    if (gems.length === 0) navigate(urls.create_gem);
  }, [gems]);

  const openWebSite = () => {
    const existingTab = window.open(staticUrls.web, 'diggin'); // Check if the tab is already opened

    if (existingTab) {
      existingTab.focus(); // If the tab is already open, focus on it
    }
  };

  const changeSelectedGem = (gemId: string) => {
    send_P_to_B_message({
      key: P_TO_B.P_TO_B_SELECTED_GEM,
      data: {
        gemId,
      },
    });
  };

  const goCreateNewGem = () => {
    navigate(urls.create_gem);
  };

  return (
    <HomePageContent
      onStart={() => {
        send_P_to_B_message({
          key: P_TO_B.P_TO_B_START_DIGGIN,
        });
      }}
      onPause={() => {
        send_P_to_B_message({
          key: P_TO_B.P_TO_B_PAUSE_DIGGIN,
        });
      }}
      onResume={() => {
        send_P_to_B_message({
          key: P_TO_B.P_TO_B_RESUME_DIGGIN,
        });
      }}
      onStop={() => {
        send_P_to_B_message({
          key: P_TO_B.P_TO_B_PAUSE_DIGGIN,
        });

        navigate(urls.result);
      }}
      onClickHome={openWebSite}
      onClickGem={changeSelectedGem}
      onClickCreate={goCreateNewGem}
    />
  );
};

type Props = {
  onClickHome: () => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onClickGem: (gemId: string) => void;
  onClickCreate: () => void;
};

/**
 * useSelector
 */
const HomePageContent = ({ onClickHome, onStart, onPause, onResume, onStop, onClickGem, onClickCreate }: Props) => {
  const { user } = useSlice.use.authentication();

  const {
    //
    sessionInformation,
    gems,
  } = useSlice.use.app();

  const [expanded, setExpanded] = useState<boolean>(false);

  const [insights] = useUserCollection({
    collectionName: CollectionName.Insight,
    filter: and(where('gemId', '==', sessionInformation?.selectedGemId ?? '')),
  });

  const selectedGem = gems.find((gem) => gem.id === sessionInformation?.selectedGemId);

  const isOpen = expanded && sessionInformation?.state === DigginState.IDLE;

  useEffect(() => {
    if (sessionInformation?.state !== DigginState.IDLE) return;

    setExpanded(true);
  }, [sessionInformation?.state]);

  if (user === undefined) return <></>;

  const toggle = () => {
    setExpanded((t) => !t);
  };

  return (
    <Page>
      <Page.Header>
        <Icon iconName="Home" color={colors.gray['8.5']} onClick={onClickHome} />
        <span className="grow">{`${getGreetingMessage()}, ${user.nickname}`}</span>
      </Page.Header>
      <Container
        disableTopBorder
        className="justify-between space-x-[8px] border-b border border-gray-1"
        onClick={toggle}
      >
        <span className="text-gray-4">Digging in</span>
        <div className="flex items-center space-x-[8px]">
          {selectedGem && (
            <div className="flex space-x-[8px] items-center">
              <GemShape shapeId={selectedGem.shapeId} stroke={selectedGem.color} fill={selectedGem.color} />
              <span className="max-w-[160px] truncate">{selectedGem.title}</span>
            </div>
          )}
          {sessionInformation?.state === DigginState.IDLE && (
            <Icon size={12} className="fill-gray-0" iconName={expanded ? 'ChevronUpThick' : 'ChevronDown'} />
          )}
        </div>
      </Container>
      <div
        className={twMerge(
          clsx(
            'transition-all duration-300 ease-in-out',
            {
              'max-h-[400px]': isOpen,
              'max-h-[0px]': !isOpen,
            },
            'overflow-y-scroll scrollbar-w-8 scrollbar scrollbar-thumb-gray-2 scrollbar-track-transparent'
          )
        )}
      >
        <Container className={'transition-all text-gray-5 bg-gray-0.5'} disableTopBorder onClick={onClickCreate}>
          <div className="flex space-x-[8px] items-center">
            <Icon iconName="Plus" size={16} />
            <span>Create a new gem...</span>
          </div>
        </Container>
        {[...gems].map(({ id, title, color, shapeId }) => {
          const isSelected = id === selectedGem?.id;

          return (
            <Container key={id} className="bg-gray-0.5" onClick={() => onClickGem(id)}>
              <div className="flex grow space-x-[8px] items-center truncate">
                <GemShape
                  //
                  shapeId={shapeId}
                  fill={isSelected ? color : 'transparent'}
                  stroke={isSelected ? color : colors.gray[3]}
                />
                <span className="truncate">{title}</span>
              </div>
              {isSelected && <Icon iconName="Check" color={color} />}
            </Container>
          );
        })}
      </div>
      {sessionInformation?.state === DigginState.IDLE ? (
        <Button
          disabled={!selectedGem}
          onClick={onStart}
          buttonType={ButtonType.black}
          className="rounded-none"
          style={{ backgroundColor: selectedGem?.color }}
        >
          Start Diggin
        </Button>
      ) : (
        <Container className="bg-gray-0.5">
          <span className="text-gray-4 text-xs">{`${formatNumber((insights ?? []).length)} collected`}</span>
          <div className="flex grow justify-end items-center space-x-[4px] text-xs">
            <span className="animate-fade-in">{formatSeconds(sessionInformation?.elapsedTimeInSeconds ?? 0)}</span>
            {sessionInformation?.state === DigginState.PAUSED ? (
              <Icon iconName="Play" onClick={onResume} />
            ) : (
              <Icon iconName="Pause" onClick={onPause} />
            )}
            <Icon iconName="Stop" onClick={onStop} />
          </div>
        </Container>
      )}
    </Page>
  );
};
