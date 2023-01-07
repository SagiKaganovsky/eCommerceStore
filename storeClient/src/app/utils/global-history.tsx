import { useNavigate, NavigateFunction, useLocation } from "react-router-dom";

export let globalNavigate: NavigateFunction;
export let globalLocation: any;
export const GlobalHistory = () => {
  globalNavigate = useNavigate();
  globalLocation = useLocation();

  return null;
};
