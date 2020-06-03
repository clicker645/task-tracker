export enum ModelsEnum {
  USER = 'User',
  ITEM = 'Item',
  TOKEN = 'Token',
  DOCUMENT_HISTORY = 'DocumentHistory',
  SHARE = 'Share',
}

export const getModelsArray = () => {
  const data = [];
  for (const [key, model] of Object.keys(ModelsEnum)) {
    data.push(model);
  }
};
