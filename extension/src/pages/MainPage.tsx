import React from 'react';

const MainPage: React.FC = () => {
  return (
    <div className="w-80 h-96 pt-8 bg-Surface-Main inline-flex flex-col justify-start items-start overflow-hidden">
      <div className="self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center">
        <div className="text-center justify-center text-color-text-primary text-base font-medium font-['Pretendard'] leading-snug">
          What do you diggin?
        </div>
        <div className="self-stretch flex-1 flex flex-col justify-center items-center">
          <div className="w-40 h-40 bg-gray-200 rounded-[100px]" />
        </div>
        <div className="self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2">
          <div 
            data-size="lg" 
            data-status="default" 
            className="self-stretch h-12 p-3 bg-color-fill-onsurface rounded-lg inline-flex justify-start items-center gap-2.5"
          >
            <div className="text-center justify-center text-color-text-tertiary text-sm font-normal font-['Pretendard'] leading-none">
              Write a new hole name
            </div>
          </div>
          <div className="self-stretch h-12 min-w-24 px-5 bg-color-fill-disabled rounded-lg inline-flex justify-center items-center gap-2">
            <div className="flex-1 text-center justify-center text-color-text-disabled text-base font-medium font-['Pretendard'] leading-snug">
              Create a Hole
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 