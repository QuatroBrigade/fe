export type CommunityType = {
  id: number;
  name: string;
  parentId: null | CommunityType["id"];
  level: number;
};
