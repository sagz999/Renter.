import * as React from "react";
import { Link } from "react-router-dom";
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
import GoogleButton from "react-google-button";
import "./SignInForm.css";
import SignInImage from "../../Images/SignInImage.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

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

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SigInButton = styled(Button)({
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
              width: "100px",
              fontWeight: "Bold",
              borderRadius: "30px",
            }}
          >
            SIGN-IN
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "12px",
          }}
        >
          <LoadingAnimation />
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
              <img className="signuplogo" src={SignInImage} alt="signupImage" />
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
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
                  console.log(e);
                })}
                noValidate
                sx={{ mt: 3, paddingLeft: "60px", paddingRight: "60px" }}
              >
                <TextField
                  name="email"
                  id="email"
                  label="Email Id"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("email", {
                    required: "This field can't be empty",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Enter a valid email",
                    },
                  })}
                  error={errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />

                <TextField
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
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
                  helperText={errors.password ? errors.password.message : ""}
                />

                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <SigInButton type="submit" variant="contained">
                    Sign in
                  </SigInButton>
                  <Grid container spacing={0} sx={{ mt: 2, mb: 2 }}>
                    <Grid item xs={5} sm={5} md={5}>
                      <hr />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2}>
                      <Typography
                        component="h3"
                        variant="h6"
                        sx={{
                          margin: "0",
                        }}
                      >
                        OR
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5}>
                      <hr />
                    </Grid>
                  </Grid>

                  <div className="googlesigninbutton">
                    <GoogleButton label="Sign in with google" />
                  </div>

                  <Link to="/forgotPassword">Forgot password?</Link>
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
