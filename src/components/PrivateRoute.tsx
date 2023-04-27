import { TUser, UserRole } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

type Props = {
  role: UserRole;
  component: React.Component;
};

const PrivateRoute = (props: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== props.role) {
    return <Navigate to="/login" />;
  }

  return <div></div>;
};

export default PrivateRoute;
