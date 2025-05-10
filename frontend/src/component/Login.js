
import { useContext, useState } from "react"
import {
  TextField,
  Button,
  Typography,
  makeStyles,
  CircularProgress,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Paper,
  Container,
} from "@material-ui/core"
import { Link, Redirect } from "react-router-dom"
import axios from "axios"
import EmailIcon from "@material-ui/icons/Email"
import LockIcon from "@material-ui/icons/Lock"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import EmailInput from "../lib/EmailInput"
import { SetPopupContext } from "../App"

import apiList from "../lib/apiList"
import isAuth from "../lib/isAuth"

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    position: "relative",
    overflow: "hidden",
  },
  loginContainer: {
    display: "flex",
    borderRadius: "16px",
    overflow: "hidden",
    width: "100%",
    maxWidth: "1100px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  illustrationContainer: {
    flex: "1",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(6),
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  illustration: {
    width: "100%",
    maxWidth: "450px",
    height: "auto",
    position: "relative",
    zIndex: 2,
    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
  },
  formContainer: {
    flex: "1",
    padding: theme.spacing(8, 6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: theme.spacing(3),
    left: theme.spacing(3),
    color: theme.palette.primary.main,
    background: "rgba(255,255,255,0.9)",
    "&:hover": {
      background: "rgba(255,255,255,1)",
    },
  },
  title: {
    fontWeight: 800,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: "2.5rem",
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    fontSize: "1.1rem",
  },
  inputBox: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
      },
      "&.Mui-focused": {
        boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
      },
    },
  },
  submitButton: {
    padding: "14px",
    marginTop: theme.spacing(2),
    fontWeight: 600,
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    fontSize: "1rem",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    },
  },
  forgotPassword: {
    display: "block",
    textAlign: "right",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
    cursor: "pointer",
    transition: "color 0.3s ease",
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  signupLink: {
    marginTop: theme.spacing(4),
    textAlign: "center",
    fontSize: "1rem",
  },
  buttonProgress: {
    marginRight: theme.spacing(1),
  },
  shape: {
    position: "absolute",
    opacity: 0.1,
    borderRadius: "50%",
    background: "#fff",
  },
  shape1: {
    width: "300px",
    height: "300px",
    top: "-150px",
    right: "-150px",
  },
  shape2: {
    width: "200px",
    height: "200px",
    bottom: "50px",
    left: "-100px",
  },
  inputIcon: {
    color: theme.palette.text.secondary,
  },
}))

const Login = (props) => {
  const classes = useStyles()
  const setPopup = useContext(SetPopupContext)

  const [loggedin, setLoggedin] = useState(isAuth())
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  })

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  })

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    })
  }

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    })
  }

  const handleLogin = () => {
    setIsLoading(true)
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error
    })
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("type", response.data.type)
          setLoggedin(isAuth())
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          })
          console.log(response)
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          })
          console.log(err.response)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      })
      setIsLoading(false)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <Container maxWidth={false} disableGutters className={classes.container}>
      <Button component={Link} to="/" className={classes.backButton} startIcon={<ArrowBackIcon />}>
        Back to Home
      </Button>

      <Paper elevation={0} className={classes.loginContainer}>
        <div className={classes.illustrationContainer}>
          <div className={`${classes.shape} ${classes.shape1}`}></div>
          <div className={`${classes.shape} ${classes.shape2}`}></div>
          <img
            src="https://v0.blob.com/login-illustration.svg"
            alt="Login Illustration"
            className={classes.illustration}
          />
        </div>

        <div className={classes.formContainer}>
          <Typography variant="h3" component="h1" className={classes.title}>
            Welcome Back
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            Enter your credentials to access your account
          </Typography>

          <EmailInput
            label="Email"
            value={loginDetails.email}
            onChange={(event) => handleInput("email", event.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            className={classes.inputBox}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon className={classes.inputIcon} />
                </InputAdornment>
              ),
            }}
          />

          <div>
            <MuiLink
              component="button"
              variant="body2"
              className={classes.forgotPassword}
              onClick={() => {
                // Handle forgot password
              }}
            >
              Forgot your password?
            </MuiLink>

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={loginDetails.password}
              onChange={(event) => handleInput("password", event.target.value)}
              variant="outlined"
              fullWidth
              className={classes.inputBox}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon className={classes.inputIcon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin()}
            className={classes.submitButton}
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? (
              <>
                <CircularProgress size={24} className={classes.buttonProgress} />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          <Typography variant="body1" className={classes.signupLink}>
            Don't have an account?{" "}
            <MuiLink component={Link} to="/signup" color="primary" style={{ fontWeight: 600 }}>
              Sign up
            </MuiLink>
          </Typography>
        </div>
      </Paper>
    </Container>
  )
}

export default Login
