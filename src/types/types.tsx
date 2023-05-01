export type TProperty = {
  id: string;
  name: string;
  description?: string;
};

export type TIngredient = {
  id: string;
  name: string;
  properties: Pick<TProperty, "id">[];
  // propertyIds: string[];
};

export enum UserRole {
  user = "user",
  admin = "admin",
}

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};
