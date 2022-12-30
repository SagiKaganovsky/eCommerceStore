import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { signUpUser } from "../../store/accountSlice";

const Signup: React.FC = () => {
  const { status, errors: validationErrors } = useAppSelector(
    (state) => state.account
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isSubmitted },
  } = useForm({ mode: "all" });

  const submitForm = async (data: FieldValues) => {
    console.log(data);
    await dispatch(signUpUser(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitForm)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register("firstname", {
                  required: "First Name is required",
                })}
                error={!!errors.firstname}
                helperText={errors?.firstname?.message as string}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                autoComplete="family-name"
                {...register("lastname", { required: "Last Name is required" })}
                error={!!errors.lastname}
                helperText={errors?.lastname?.message as string}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                label="Username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long",
                  },
                })}
                error={!!errors.username}
                helperText={errors?.username?.message as string}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
                    message: "Invalid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors?.email?.message as string}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors?.password?.message as string}
              />
            </Grid>
            {isSubmitted && status === "error" && (
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>Validation Errors</AlertTitle>
                  <List>
                    {validationErrors.errors.map((error: any) => {
                      return (
                        <ListItem key={error[0]}>
                          <ListItemText>{error[1]}</ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                </Alert>
              </Grid>
            )}
            {isSubmitted && status === "fulfilled" && (
              <Grid item xs={12}>
                <Alert severity="success">
                  <AlertTitle>Thanks for signing up</AlertTitle>
                </Alert>
              </Grid>
            )}
          </Grid>
          {isSubmitting ? (
            <Bars
              height="35"
              width="505"
              color="#1976d2"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Sign Up
            </Button>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Signup;
