import { Box } from "@mui/material";
import { MutatingDots } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <MutatingDots
        height="100"
        width="100"
        color="#1976d2"
        secondaryColor="#9c27b0"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Box>
  );
};

export default Loader;
