import { Feature, TUser, featuresByRole } from "types";

export const userHasFeature = (user: TUser, feature: Feature) => {
  return user && user.role && featuresByRole[user.role].includes(feature);
};
