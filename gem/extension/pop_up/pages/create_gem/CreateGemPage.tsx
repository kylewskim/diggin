import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollectionName, addDocument, gemConverter, generateRandomInt, getRandomColor } from 'core';
import { Page } from '../Page';
import { Container } from '../home/Container';
import { GemShape, Icon } from 'ui';
import { ShuffleButton } from './components/ShuffleButton';
import { urls } from '../../utils/constants/url';
import { collection } from 'firebase/firestore';
import { useSlice } from '../../store/store';
import { firestore } from '../../firebase';
import { P_TO_B } from '../../../constants';
import { send_P_to_B_message } from '../../messaging_integration';

type GemCreateInformation = {
  shapeId: number;
  shapeColor: string;
  name: string;
};

export const CreateGemPage = () => {
  const navigate = useNavigate();

  const { user } = useSlice.use.authentication();
  const { gems } = useSlice.use.app();

  const [gem, setGem] = useState<GemCreateInformation>({
    shapeId: 1,
    name: '',
    shapeColor: getRandomColor(),
  });

  if (!user) {
    navigate(urls.sign_in);

    return <></>;
  }

  const handleClickHome = () => {
    navigate(urls.home);
  };

  const changeGem = (partial: Partial<GemCreateInformation>) => {
    setGem((prev) => ({
      ...prev,
      ...partial,
    }));
  };

  const handleChangeGemName = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeGem({ name: event.target.value });
  };

  const handleClickStartDiggin = async () => {
    const collectionRef = collection(firestore, CollectionName.User, user.id, CollectionName.Gem).withConverter(
      gemConverter
    );

    const docRef = await addDocument(collectionRef, {
      userId: user.id,
      color: gem.shapeColor,
      title: gem.name,
      shapeId: gem.shapeId,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      elapsedTimeInSeconds: 0,
    });

    send_P_to_B_message({
      key: P_TO_B.P_TO_B_SELECTED_GEM,
      data: {
        gemId: docRef.id,
      },
    });

    navigate(-1);
  };

  const handleClickShuffle = () => {
    changeGem({
      shapeId: generateRandomInt(6),
      shapeColor: getRandomColor(),
    });
  };

  return (
    <Page loading={false}>
      <Page.Header>
        <Icon iconName="ChevronLeft" onClick={handleClickHome} />
        <div className="truncate grow">
          {gems.length //
            ? 'Create new gem, and start diggin'
            : 'Make your first gem, start diggin'}
        </div>
      </Page.Header>
      <Container>
        <div className="flex justify-between items-center"></div>
      </Container>
      <div className="flex items-center justify-center grow flex-col p-[30px] gap-[20px]">
        <div className="w-[160px] h-[160px] p-[10px] flex items-center justify-center">
          <GemShape
            shapeId={gem.shapeId}
            width={160}
            height={160}
            fill={gem.shapeColor}
            stroke={gem.shapeColor}
            className="animate-fade-in"
          />
        </div>
        <ShuffleButton onClick={handleClickShuffle} />
      </div>
      <Container className="h-[76px] py-[12px] flex flex-col gap-[8px]">
        <div className="w-full text-gray-6">Gem name</div>
        <input
          autoFocus
          className="w-full outline-none placeholder-gray-3 text-gray-8.5 text-base "
          onChange={handleChangeGemName}
          placeholder="My Cool Gem"
          style={{ caretColor: gem.shapeColor }}
        />
      </Container>
      <Container
        onClick={gem.name.length > 0 ? handleClickStartDiggin : undefined}
        style={{
          backgroundColor: gem.shapeColor,
          opacity: gem.name.length > 0 ? 1 : 0.5,
          color: 'white',
        }}
        className="justify-center"
      >
        <span>Create Gem</span>
      </Container>
    </Page>
  );
};
