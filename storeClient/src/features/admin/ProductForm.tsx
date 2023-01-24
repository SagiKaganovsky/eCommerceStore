import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Bars } from "react-loader-spinner";
import api from "../../app/api/api";
import AppDropzone from "../../app/components/inputs/AppDropzone";
import AppTextInput from "../../app/components/inputs/AppTextInput";
import AppSelectorList from "../../app/components/selectors/AppSelectorList";
import useProducts from "../../app/hooks/useProducts";
import { Product } from "../../app/models/product";
import { validationProductSchema } from "../../app/utils/validations";
import { useAppDispatch } from "../../store";
import { catalogActions } from "../../store/catalogSlice";

interface Props {
  product?: Product;
  hideProductForm: () => void;
}

const ProductForm: React.FC<Props> = ({ product, hideProductForm }) => {
  const dispatch = useAppDispatch();
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationProductSchema),
  });
  const { brands, types } = useProducts();

  const watchFile = watch("file", null);

  useEffect(() => {
    if (product && !watchFile && !isDirty) {
      reset(product);
    }
    return () => {
      if (watchFile) {
        URL.revokeObjectURL(watchFile.preview);
      }
    };
  }, [product, reset, watchFile, isDirty]);

  const handleSubmitData = async (data: FieldValues) => {
    try {
      let response: Product;
      if (product) {
        response = await api.Admin.updateProduct(data);
      } else {
        response = await api.Admin.createProduct(data);
      }
      dispatch(catalogActions.setProduct(response));
      hideProductForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="name" label="Product name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectorList
              control={control}
              name="brand"
              label="Brand"
              items={brands}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectorList
              control={control}
              name="type"
              label="Type"
              items={types}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              type="number"
              name="price"
              label="Price"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              type="number"
              name="quantityInStock"
              label="Quantity in Stock"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              multiline
              rows={4}
              control={control}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <AppDropzone control={control} name="file" />
              {watchFile ? (
                <img
                  src={watchFile.preview}
                  alt="preview"
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <img
                  src={product?.pictureUrl}
                  alt={product?.name}
                  style={{ maxHeight: 200 }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={hideProductForm}>
            Cancel
          </Button>
          {!isSubmitting ? (
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          ) : (
            <Bars
              height="20"
              width="30"
              color="#1976d2"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </Box>
      </form>
    </Box>
  );
};
export default ProductForm;
