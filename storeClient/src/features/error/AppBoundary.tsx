import { Button, Paper } from "@mui/material";
import { AxiosError } from "axios";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import Error from "./Error";

const AppBoundary: React.FC = () => {
  const navigate = useNavigate();
  const error = useRouteError() as any | AxiosError;
  let content = <Error message={`Something went wrong: ${error.message}`} />;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      content = <Error message={"This page doesn't exist!"} />;
    }

    if (error.status === 401) {
      content = <Error message={"You aren't authorized to see this"} />;
    }

    if (error.status === 503) {
      content = <Error message={"Looks like our API is down"} />;
    }

    if (error.status === 418) {
      content = <Error message={"🫖"} />;
    }
  }

  return (
    <>
      <Paper>{content}</Paper>
      <Button onClick={() => navigate("/")}>Home</Button>
    </>
  );
};

export default AppBoundary;
