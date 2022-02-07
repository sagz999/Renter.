import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
import "./ChangePasswordPage.css";
import ResetPasswordImage from "../../Images/ResetPasswordImage.svg";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import MuiAlert from "@mui/material/Alert";
import { GoogleLogin } from "react-google-login";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Render.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let password = React.useRef({});
  password.current = watch("password", "");

  const SigUnUpButton = styled(Button)({
    color: "#ffc100",
    backgroundColor: "black",
    borderRadius: "30px",
    fontWeight: "900",
    marginTop: 30,
    marginBottom: 2,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "black",
    },
  });

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const changePass = async (formData) => {
    
    try {
      setError(false);
      setLoading(true);
      let userEmail = await JSON.parse(localStorage.getItem("userEmail"));
      let password = formData.password;
      const { data } = await axios.post(
        "/renter/user/changePassword",
        { password, userEmail },
        config
      );
      setLoading(false);
      
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <CssBaseline />
        <div className="title">
          <Typography
            component="h1"
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: 5,
              backgroundColor: "#ffc100",
              width: "210px",
              fontWeight: "Bold",
              borderRadius: "30px",
            }}
          >
            RESET-PASSWORD
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "12px",
          }}
        >
          {loading && <LoadingAnimation />}
        </div>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingLeft: "90px",
                paddingRight: "90px",
              }}
            >
              <img
                className="signuplogo"
                src={ResetPasswordImage}
                alt="signinImage"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} className="inputBox">
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit((e) => {
                  changePass(e);
                })}
                noValidate
                sx={{ mt: 3, paddingLeft: "60px", paddingRight: "60px" }}
              >
                {error && (
                  <Alert
                    severity="error"
                    style={{
                      marginBottom: "12px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      textAlign: "center",
                    }}
                    className="alertMessage"
                  >
                    {error}
                  </Alert>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      id="password"
                      label="New Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      required
                      {...register("password", {
                        required: "This field can't be empty",
                        minLength: {
                          value: 6,
                          message: "Minimun 6 charecters",
                        },
                      })}
                      error={errors.password}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="rePassword"
                      id="rePassword"
                      label="Confirm password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      required
                      {...register("rePassword", {
                        required: "This field can't be empty",
                        validate: (value) =>
                          value === password.current ||
                          "passwords do not match",
                      })}
                      error={errors.rePassword}
                      helperText={
                        errors.rePassword ? errors.rePassword.message : ""
                      }
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <SigUnUpButton type="submit" variant="contained">
                    Submit
                  </SigUnUpButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
