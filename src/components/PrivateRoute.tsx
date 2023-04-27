import { TUser } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

type Props = {
  role: TUser["role"];
  component: React.Component;
};

const PrivateRoute = (props: Props) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  if (!isAuthenticated || !user || user.role !== props.role) {
    return <Navigate to="/login" />;
  }

  return <div></div>;
};

export default PrivateRoute;
