export enum ModelsEnum {
  USER = 'User',
  ITEM = 'Item',
  DOCUMENT_HISTORY = 'DocumentHistory',
  SHARE = 'Share',
  MESSAGE = 'Message',
  ROOM = 'Room',
}

export const getModelsArray = () => {
  const data = [];
  for (const [, model] of Object.keys(ModelsEnum)) {
    data.push(model);
  }
};
