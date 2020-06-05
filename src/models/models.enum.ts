export enum ModelsEnum {
  USER = 'User',
  ITEM = 'Item',
  TOKEN = 'Token',
  DOCUMENT_HISTORY = 'DocumentHistory',
  SHARE = 'Share',
}

export const getModelsArray = () => {
  const data = [];
  for (const [, model] of Object.keys(ModelsEnum)) {
    data.push(model);
  }
};
