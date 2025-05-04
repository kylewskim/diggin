import ExtensionList, { ListProps, ListType, ListState } from './extensionList';

// Web 버전이 생기면 여기에 추가해서 내보낼 수 있습니다
// import WebList from './webList';

// 현재는 Extension 버전을 기본으로 내보냅니다
export const List = ExtensionList;

// 타입 내보내기
export type { ListProps, ListType, ListState };

// 각 컴포넌트 별도 내보내기
export { ExtensionList };
// export { WebList }; // 웹 버전이 생기면 추가 
 
 
 
 
 