import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import { UserRole } from "types/types";

// Hooks for authentication
export const useCurrentUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};

export const IsAdmin = () => {
  const currentUser = useCurrentUser();
  return currentUser && currentUser.role === UserRole.admin;
};
