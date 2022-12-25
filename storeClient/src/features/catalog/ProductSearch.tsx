import { Clear } from "@mui/icons-material";
import { debounce, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { catalogActions } from "../../store/catalogSlice";

const ProductSearch: React.FC = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(
      catalogActions.setProductParams({
        searchTerm: event.target.value,
        pageNumber: 1,
      })
    );
  });
  const clearSearchTermHandler = () => {
    dispatch(catalogActions.setProductParams({ searchTerm: "" }));
    setSearchTerm("");
  };

  return (
    <TextField
      label="Search products"
      variant="outlined"
      value={searchTerm || ""}
      onChange={(e: any) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e);
      }}
      InputProps={{
        endAdornment: (
          <IconButton
            sx={{ visibility: searchTerm ? "visible" : "hidden" }}
            onClick={clearSearchTermHandler}
          >
            <Clear />
          </IconButton>
        ),
      }}
      sx={{
        m: 2,
        "& .Mui-focused .MuiIconButton-root": { color: "primary.main" },
      }}
    />
  );
};

export default ProductSearch;
