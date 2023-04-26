export type TProperty = {
  id: string;
  name: string;
  description?: string;
};

export type TIngredient = {
  id: string;
  name: string;
  properties: TProperty[];
};
