import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [holeName, setHoleName] = useState('');

  const handleHoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoleName(e.target.value);
  };

  const handleCreateHole = () => {
    if (holeName.trim()) {
      // 홀 이름을 저장하고 아이콘 선택 화면으로 이동
      navigate('/select-icon', { state: { holeName } });
    }
  };

  return (
    <div className="w-80 h-96 pt-8 bg-Surface-Main inline-flex flex-col justify-start items-start overflow-hidden font-pretendard">
      <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
        <div className="text-body-lg-md text-center justify-center text-text-primary-light text-base leading-snug">
          What do you diggin?
        </div>
        <div className="self-stretch flex-1 flex flex-col justify-center items-center">
          <div className="w-40 h-40 bg-gray-200 rounded-[100px]" />
        </div>
        <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2">
          <TextField 
            size="lg"
            isDisabled={false}
            error={false}
            placeholder="Write a new hole name"
            value={holeName}
            onChange={handleHoleNameChange}
            className="self-stretch"
          />
          <Button
            variant="primary"
            size="lg"
            disabled={!holeName.trim()} // 홀 이름이 비어있으면 비활성화
            onClick={handleCreateHole}
            className="self-stretch"
          >
            Create a Hole
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 