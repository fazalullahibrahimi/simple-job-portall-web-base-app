"use client"

import { useState, useContext } from "react"
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Tabs,
  Tab,
  Chip,
  IconButton,
  CircularProgress,
  Link as MuiLink,
  InputAdornment,
  Paper,
  Container,
} from "@material-ui/core"
import axios from "axios"
import { Redirect, Link } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import PersonIcon from "@material-ui/icons/Person"
import EmailIcon from "@material-ui/icons/Email"
import LockIcon from "@material-ui/icons/Lock"
import SchoolIcon from "@material-ui/icons/School"
import BuildIcon from "@material-ui/icons/Build"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import BusinessIcon from "@material-ui/icons/Business"
import PhoneIcon from "@material-ui/icons/Phone"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"

import PasswordInput from "../lib/PasswordInput"
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
  signupContainer: {
    display: "flex",
    borderRadius: "16px",
    overflow: "hidden",
    width: "100%",
    maxWidth: "1200px",
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
    [theme.breakpoints.down("md")]: {
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
    flex: "1.2",
    padding: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxHeight: "90vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#c1c1c1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#a8a8a8",
    },
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
    marginBottom: theme.spacing(3),
    fontSize: "1.1rem",
  },
  tabs: {
    marginBottom: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    "& .MuiTab-root": {
      minWidth: "120px",
      fontWeight: 600,
      fontSize: "1rem",
    },
    "& .Mui-selected": {
      color: theme.palette.primary.main,
    },
    "& .MuiTabs-indicator": {
      height: "3px",
      borderRadius: "1.5px",
    },
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
    marginTop: theme.spacing(3),
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
  loginLink: {
    marginTop: theme.spacing(4),
    textAlign: "center",
    fontSize: "1rem",
  },
  buttonProgress: {
    marginRight: theme.spacing(1),
  },
  educationContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "12px",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: theme.palette.background.paper,
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    },
  },
  educationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    borderRadius: "10px",
    padding: "8px 16px",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    },
  },
  skillsContainer: {
    marginBottom: theme.spacing(4),
  },
  skillInput: {
    display: "flex",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  skillChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
    transition: "all 0.3s ease",
    fontWeight: 500,
    "&:hover": {
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
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
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(1),
      fontSize: "1.5rem",
    },
  },
  phoneInput: {
    "& .react-tel-input .form-control": {
      width: "100%",
      height: "56px",
      borderRadius: "12px",
      fontSize: "1rem",
      borderColor: theme.palette.divider,
      "&:hover": {
        borderColor: theme.palette.text.primary,
      },
      "&:focus": {
        borderColor: theme.palette.primary.main,
        boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
      },
    },
  },
  tabPanel: {
    padding: theme.spacing(3, 0),
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.tabPanel}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

const Signup = (props) => {
  const classes = useStyles()
  const setPopup = useContext(SetPopupContext)

  const [loggedin, setLoggedin] = useState(isAuth())
  const [isLoading, setIsLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],
    bio: "",
    contactNumber: "",
  })

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ])

  const [skillInput, setSkillInput] = useState("")

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  })

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    })
  }

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    })
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    setSignupDetails({
      ...signupDetails,
      type: newValue === 0 ? "applicant" : "recruiter",
    })
  }

  const addEducation = () => {
    setEducation([
      ...education,
      {
        institutionName: "",
        startYear: "",
        endYear: "",
      },
    ])
  }

  const removeEducation = (index) => {
    if (education.length > 1) {
      const newEducation = [...education]
      newEducation.splice(index, 1)
      setEducation(newEducation)
    }
  }

  const updateEducation = (index, field, value) => {
    const newEducation = [...education]
    newEducation[index][field] = value
    setEducation(newEducation)
  }

  const addSkill = () => {
    if (skillInput.trim() !== "" && !signupDetails.skills.includes(skillInput.trim())) {
      setSignupDetails({
        ...signupDetails,
        skills: [...signupDetails.skills, skillInput.trim()],
      })
      setSkillInput("")
    }
  }

  const removeSkill = (skill) => {
    setSignupDetails({
      ...signupDetails,
      skills: signupDetails.skills.filter((s) => s !== skill),
    })
  }

  const handleLogin = () => {
    setIsLoading(true)
    const tmpErrorHandler = {}
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        }
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj]
      }
    })

    const updatedDetails = {
      ...signupDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"]
          }
          return obj
        }),
    }

    setSignupDetails(updatedDetails)

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error
    })

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
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
      setInputErrorHandler(tmpErrorHandler)
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      })
      setIsLoading(false)
    }
  }

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <Container maxWidth={false} disableGutters className={classes.container}>
      <Button component={Link} to="/" className={classes.backButton} startIcon={<ArrowBackIcon />}>
        Back to Home
      </Button>

      <Paper elevation={0} className={classes.signupContainer}>
        <div className={classes.illustrationContainer}>
          <div className={`${classes.shape} ${classes.shape1}`}></div>
          <div className={`${classes.shape} ${classes.shape2}`}></div>
          <img
            src="https://v0.blob.com/signup-illustration.svg"
            alt="Signup Illustration"
            className={classes.illustration}
          />
        </div>

        <div className={classes.formContainer}>
          <Typography variant="h3" component="h1" className={classes.title}>
            Create an Account
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            Join our platform to find your dream job or the perfect candidate
          </Typography>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classes.tabs}
            variant="fullWidth"
          >
            <Tab label="Applicant" />
            <Tab label="Recruiter" />
          </Tabs>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                value={signupDetails.name}
                onChange={(event) => handleInput("name", event.target.value)}
                className={classes.inputBox}
                error={inputErrorHandler.name.error}
                helperText={inputErrorHandler.name.message}
                onBlur={(event) => {
                  if (event.target.value === "") {
                    handleInputError("name", true, "Name is required")
                  } else {
                    handleInputError("name", false, "")
                  }
                }}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon className={classes.inputIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <EmailInput
                label="Email"
                value={signupDetails.email}
                onChange={(event) => handleInput("email", event.target.value)}
                inputErrorHandler={inputErrorHandler}
                handleInputError={handleInputError}
                className={classes.inputBox}
                required={true}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className={classes.inputIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordInput
                label="Password"
                value={signupDetails.password}
                onChange={(event) => handleInput("password", event.target.value)}
                className={classes.inputBox}
                error={inputErrorHandler.password.error}
                helperText={inputErrorHandler.password.message}
                onBlur={(event) => {
                  if (event.target.value === "") {
                    handleInputError("password", true, "Password is required")
                  } else {
                    handleInputError("password", false, "")
                  }
                }}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className={classes.inputIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <TabPanel value={tabValue} index={0}>
            {/* Applicant Form */}
            <div>
              {/* Education Section */}
              <Typography variant="h6" className={classes.sectionTitle}>
                <SchoolIcon />
                Education
              </Typography>

              {education.map((edu, index) => (
                <div key={index} className={classes.educationContainer}>
                  <div className={classes.educationHeader}>
                    <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                      Institution #{index + 1}
                    </Typography>
                    {education.length > 1 && (
                      <IconButton size="small" onClick={() => removeEducation(index)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Institution Name"
                        variant="outlined"
                        fullWidth
                        value={edu.institutionName}
                        onChange={(e) => updateEducation(index, "institutionName", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Start Year"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={edu.startYear}
                        onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="End Year"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}

              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addEducation}
                className={classes.addButton}
              >
                Add another institution
              </Button>

              {/* Skills Section */}
              <div className={classes.skillsContainer}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  <BuildIcon />
                  Skills
                </Typography>

                <div className={classes.skillInput}>
                  <TextField
                    label="Add a skill"
                    variant="outlined"
                    fullWidth
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <Button variant="contained" color="primary" onClick={addSkill}>
                    Add
                  </Button>
                </div>

                <div className={classes.skillChips}>
                  {signupDetails.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => removeSkill(skill)}
                      className={classes.chip}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {/* Recruiter Form */}
            <div>
              <Typography variant="h6" className={classes.sectionTitle}>
                <BusinessIcon />
                Company Bio
              </Typography>
              <TextField
                label="Bio (up to 250 words)"
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                className={classes.inputBox}
                value={signupDetails.bio}
                onChange={(e) => {
                  const words = e.target.value.split(/\s+/).filter((word) => word.length > 0)
                  if (words.length <= 250) {
                    handleInput("bio", e.target.value)
                  }
                }}
                helperText={`${signupDetails.bio.split(/\s+/).filter((word) => word.length > 0).length} / 250 words`}
              />

              <Typography variant="h6" className={classes.sectionTitle}>
                <PhoneIcon />
                Contact Number
              </Typography>
              <div className={classes.phoneInput}>
                <PhoneInput
                  country={"in"}
                  value={signupDetails.contactNumber}
                  onChange={(phone) => handleInput("contactNumber", `+${phone}`)}
                  inputStyle={{ width: "100%" }}
                  containerStyle={{ marginBottom: "24px" }}
                />
              </div>
            </div>
          </TabPanel>

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className={classes.submitButton}
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? (
              <>
                <CircularProgress size={24} className={classes.buttonProgress} />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <Typography variant="body1" className={classes.loginLink}>
            Already have an account?{" "}
            <MuiLink component={Link} to="/login" color="primary" style={{ fontWeight: 600 }}>
              Login
            </MuiLink>
          </Typography>
        </div>
      </Paper>
    </Container>
  )
}

export default Signup
