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

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
};
