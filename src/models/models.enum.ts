export enum ModelsEnum {
  USER = 'User',
  ITEM = 'Item',
  TOKEN = 'Token',
  DOCUMENT_HISTORY = 'DocumentHistory',
  SHARE = 'Share',
}

//export const ModelsArray = ['User', 'Item', 'Token', 'Share'];

export const getModelsArray = () => {
  const data = [];
  for (let [key, model] of Object.keys(ModelsEnum)) {
    data.push(model);
  }
};
