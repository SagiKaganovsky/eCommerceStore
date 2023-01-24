import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store";

const RequireAuth: React.FC<{ children: JSX.Element; roles: string[] }> = ({
  children,
  roles,
}) => {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles?.some((role) => user.roles?.includes(role))) {
    toast.error("Not aouthorized to access");
    return <Navigate to="/catalog" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
