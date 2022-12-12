import { Alert, AlertTitle } from "@mui/material";

const Error: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>{message}</strong>
    </Alert>
  );
};

export default Error;
