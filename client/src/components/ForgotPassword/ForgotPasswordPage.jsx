import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import "./ForgotPasswordPage.css";
import ForgotPasswordImage from "../../Images/ForgotPasswordImage.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import MuiAlert from "@mui/material/Alert";

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

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const SubmitButton = styled(Button)({
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
});

const ForgotPasswordPage = () => {
  const theme = createTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const forgotPass = async (email) => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await axios.post(
        "/renter/user/resetPassword",
        email,
        config
      );
      localStorage.setItem("userEmail", JSON.stringify(data));
      setLoading(false);
      navigate("/resetPasswordVerification");
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
              width: "240px",
              fontWeight: "Bold",
              borderRadius: "30px",
            }}
          >
            FORGOT PASSWORD
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
                src={ForgotPasswordImage}
                alt="ForgotPasswordImage"
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
                  forgotPass(e);
                })}
                noValidate
                sx={{ mt: 3, paddingLeft: "60px", paddingRight: "60px" }}
              >
                {error && (
                  <Alert
                    severity="error"
                    style={{
                      marginBottom: "8px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      textAlign: "center",
                    }}
                    className="alertMessage"
                  >
                    {error}
                  </Alert>
                )}

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

                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <SubmitButton type="submit" variant="contained">
                    Submit
                  </SubmitButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPasswordPage;
