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

export enum Feature {
  ingredientIndex = "ingredientIndex",
  ingredientManagement = "ingredientManagement",
}

export const featuresByRole = {
  [UserRole.admin]: [Feature.ingredientIndex, Feature.ingredientManagement],
  [UserRole.user]: [Feature.ingredientIndex],
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};
