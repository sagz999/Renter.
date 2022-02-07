import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import "./ResetPasswordVerificationPage.css";
import OtpVerificationImage from "../../Images/OtpVerificationImage.svg";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import OTPInput from "otp-input-react";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import MuiAlert from "@mui/material/Alert";
import { useTimer } from "react-timer-hook";

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

const ResetPasswordVerificationPage = () => {
  const navigate = useNavigate();
  const [OTP, setOTP] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);

  const { seconds, start, restart } = useTimer({
    expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 30),
    onExpire: () => console.warn(""),
  });

  React.useEffect(() => {
    // Setting Loading to true for 30 seconds on window onload
    setResendLoading(true);

    setTimeout(() => {
      // Starting the timer To send The OTP
      start();
      setResendLoading(false);
    }, 30000);
  }, []);

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // Disabling resend OTP button on a click on Resend button
  const handleClick = async () => {
    setResendLoading(true);
    setTimeout(() => {
      setResendLoading(false);
    }, 30000);

    // Setting Timer To restart
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);
    restart(time);

    // Send Request to resend OTP
    try {
      setLoading(true);
      setError(false);
      let userEmail = await JSON.parse(localStorage.getItem("userEmail"));

      let { data } = await axios.post(
        "/renter/user/resendOtp",
        { userEmail },
        config
      );
      console.log(data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
      console.log("The error in resending OTP is : ", err);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (OTP.length === 4) {
      setLoading(true);
      setError(false);

      const userEmail = await JSON.parse(localStorage.getItem("userEmail"));

      try {
        const { data } = await axios.post(
          "/renter/user/resetPasswordAuth",
          { userEmail, OTP },
          config
        );
        setLoading(false);
        navigate("/changePassword");
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    } else {
      setLoading(false);

      setError("Enter a valid OTP");
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
              width: "180px",
              fontWeight: "Bold",
              borderRadius: "30px",
            }}
          >
            VERIFICATION
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
                paddingLeft: "90px",
                paddingRight: "90px",
              }}
            >
              <img src={OtpVerificationImage} alt="signupImage" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} className="otpInputBox">
            <Container fixed>
              <Box component="form" onSubmit={handleSubmit} noValidate>
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
                <Typography
                  variant="h6"
                  sx={{ fontSize: "16px", textAlign: "center" }}
                >
                  Enter the OTP send to your email to verify your account.
                  Please don't refresh the page.
                </Typography>

                <OTPInput
                  className="otpInput"
                  value={OTP}
                  onChange={setOTP}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                />

                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <SigInButton type="submit" variant="contained">
                    Verify
                  </SigInButton>
                  <br />

                  <LoadingButton
                    onClick={(e) => {
                      handleClick();
                    }}
                    endIcon={<SendIcon />}
                    loading={resendLoading}
                    loadingPosition="end"
                    variant="contained"
                    style={{
                      marginTop: "25px",
                    }}
                  >
                    {resendLoading
                      ? `Resend OTP in : ${seconds}`
                      : "Resend OTP"}
                  </LoadingButton>
                </Box>
              </Box>
            </Container>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default ResetPasswordVerificationPage;
