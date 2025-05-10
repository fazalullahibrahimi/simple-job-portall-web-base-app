"use client"

import { useContext, useEffect, useState } from "react"
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
  Avatar,
  Container,
  Box,
  Divider,
  CircularProgress,
  IconButton,
  Chip,
} from "@material-ui/core"
import axios from "axios"
import ChipInput from "material-ui-chip-input"
import EditIcon from "@material-ui/icons/Edit"
import SaveIcon from "@material-ui/icons/Save"
import PersonIcon from "@material-ui/icons/Person"
import PhoneIcon from "@material-ui/icons/Phone"
import BusinessIcon from "@material-ui/icons/Business"
import SchoolIcon from "@material-ui/icons/School"
import BuildIcon from "@material-ui/icons/Build"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"

import { SetPopupContext } from "../../App"
import apiList from "../../lib/apiList"
import { userType } from "../../lib/isAuth"

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "93vh",
    padding: theme.spacing(4),
    background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
  },
  profileCard: {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    background: "#fff",
    padding: 0,
  },
  profileHeader: {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    padding: theme.spacing(6, 4),
    color: "#fff",
    position: "relative",
    textAlign: "center",
  },
  profileAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    backgroundColor: theme.palette.secondary.main,
    fontSize: "3.5rem",
    fontWeight: 700,
    margin: "0 auto",
    marginBottom: theme.spacing(2),
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  profileContent: {
    padding: theme.spacing(4),
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(1),
      fontSize: "1.5rem",
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
  buttonProgress: {
    marginRight: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(4, 0),
  },
  chip: {
    margin: theme.spacing(0.5),
    borderRadius: "8px",
    fontWeight: 500,
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
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
  chipInput: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      padding: theme.spacing(1),
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
  wordCount: {
    textAlign: "right",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
  editButton: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.3)",
    },
  },
}))

const MultifieldInput = (props) => {
  const classes = useStyles()
  const { education, setEducation, isEditing } = props

  const handleRemoveEducation = (index) => {
    if (education.length > 1) {
      const newEducation = [...education]
      newEducation.splice(index, 1)
      setEducation(newEducation)
    }
  }

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        institutionName: "",
        startYear: "",
        endYear: "",
      },
    ])
  }

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education]
    newEducation[index][field] = value
    setEducation(newEducation)
  }

  return (
    <>
      {education.map((edu, index) => (
        <div key={index} className={classes.educationContainer}>
          <div className={classes.educationHeader}>
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              Institution #{index + 1}
            </Typography>
            {isEditing && education.length > 1 && (
              <IconButton size="small" onClick={() => handleRemoveEducation(index)} color="secondary">
                <EditIcon />
              </IconButton>
            )}
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Institution Name"
                value={edu.institutionName}
                onChange={(e) => handleEducationChange(index, "institutionName", e.target.value)}
                variant="outlined"
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Start Year"
                value={edu.startYear}
                onChange={(e) => handleEducationChange(index, "startYear", e.target.value)}
                variant="outlined"
                fullWidth
                type="number"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="End Year"
                value={edu.endYear}
                onChange={(e) => handleEducationChange(index, "endYear", e.target.value)}
                variant="outlined"
                fullWidth
                type="number"
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </div>
      ))}
      {isEditing && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleAddEducation}
          className={classes.addButton}
        >
          Add another institution
        </Button>
      )}
    </>
  )
}

const Profile = (props) => {
  const classes = useStyles()
  const setPopup = useContext(SetPopupContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [profileDetails, setProfileDetails] = useState({
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

  const [phone, setPhone] = useState("")

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    setIsLoading(true)
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setProfileDetails(response.data)
        if (response.data.education && response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            })),
          )
        }
        setPhone(response.data.contactNumber ? response.data.contactNumber.replace("+", "") : "")
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err.response.data)
        setPopup({
          open: true,
          severity: "error",
          message: "Error loading profile data",
        })
        setIsLoading(false)
      })
  }

  const handleUpdate = () => {
    setIsLoading(true)
    let updatedDetails = {
      ...profileDetails,
    }

    if (phone !== "") {
      updatedDetails = {
        ...profileDetails,
        contactNumber: `+${phone}`,
      }
    } else {
      updatedDetails = {
        ...profileDetails,
        contactNumber: "",
      }
    }

    // Add education for applicants
    if (userType() === "applicant") {
      updatedDetails.education = education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"]
          }
          return obj
        })
    }

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        })
        getData()
        setIsEditing(false)
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        })
        console.log(err.response)
        setIsLoading(false)
      })
  }

  // Function to get the first letter of the user's name for the avatar
  const getAvatarLetter = () => {
    if (profileDetails.name && profileDetails.name.length > 0) {
      return profileDetails.name.charAt(0).toUpperCase()
    }
    return <PersonIcon />
  }

  const wordCount = profileDetails.bio ? profileDetails.bio.split(/\s+/).filter((word) => word.length > 0).length : 0

  return (
    <Container maxWidth="md" className={classes.container}>
      {isLoading && !profileDetails.name ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Paper elevation={0} className={classes.profileCard}>
          <div className={classes.profileHeader}>
            {!isEditing ? (
              <IconButton className={classes.editButton} onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton className={classes.editButton} onClick={handleUpdate}>
                <SaveIcon />
              </IconButton>
            )}
            <Avatar className={classes.profileAvatar}>{getAvatarLetter()}</Avatar>
            <Typography variant="h4" component="h1" style={{ fontWeight: 700 }}>
              {profileDetails.name}
            </Typography>
          </div>

          <div className={classes.profileContent}>
            <Typography variant="h6" className={classes.sectionTitle}>
              <PersonIcon /> Personal Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  value={profileDetails.name}
                  onChange={(event) => handleInput("name", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            {userType() === "recruiter" && (
              <>
                <Divider className={classes.divider} />

                <Typography variant="h6" className={classes.sectionTitle}>
                  <BusinessIcon /> Company Bio
                </Typography>

                <TextField
                  label="Bio (up to 250 words)"
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                  className={classes.inputBox}
                  value={profileDetails.bio}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0)
                    if (words.length <= 250) {
                      handleInput("bio", e.target.value)
                    }
                  }}
                />
                <Typography className={classes.wordCount}>{wordCount} / 250 words</Typography>
              </>
            )}

            {userType() === "applicant" && (
              <>
                <Divider className={classes.divider} />

                <Typography variant="h6" className={classes.sectionTitle}>
                  <SchoolIcon /> Education
                </Typography>

                <MultifieldInput education={education} setEducation={setEducation} isEditing={isEditing} />

                <Divider className={classes.divider} />

                <Typography variant="h6" className={classes.sectionTitle}>
                  <BuildIcon /> Skills
                </Typography>

                {isEditing ? (
                  <ChipInput
                    className={classes.chipInput}
                    label="Skills"
                    variant="outlined"
                    helperText="Press enter to add skills"
                    value={profileDetails.skills}
                    onAdd={(chip) =>
                      setProfileDetails({
                        ...profileDetails,
                        skills: [...profileDetails.skills, chip],
                      })
                    }
                    onDelete={(chip, index) => {
                      const skills = [...profileDetails.skills]
                      skills.splice(index, 1)
                      setProfileDetails({
                        ...profileDetails,
                        skills: skills,
                      })
                    }}
                    fullWidth
                  />
                ) : (
                  <Box display="flex" flexWrap="wrap" mb={3}>
                    {profileDetails.skills && profileDetails.skills.length > 0 ? (
                      profileDetails.skills.map((skill, index) => (
                        <Chip key={index} label={skill} className={classes.chip} color="primary" variant="outlined" />
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No skills added yet.
                      </Typography>
                    )}
                  </Box>
                )}
              </>
            )}

            <Divider className={classes.divider} />

            <Typography variant="h6" className={classes.sectionTitle}>
              <PhoneIcon /> Contact Information
            </Typography>

            <div className={classes.phoneInput}>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                disabled={!isEditing}
                inputStyle={{ width: "100%" }}
                containerStyle={{ marginBottom: "24px" }}
              />
            </div>

            {isEditing && (
              <Button
                variant="contained"
                color="primary"
                className={classes.submitButton}
                onClick={handleUpdate}
                disabled={isLoading}
                fullWidth
                startIcon={<SaveIcon />}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={24} className={classes.buttonProgress} />
                    Updating Profile...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            )}
          </div>
        </Paper>
      )}
    </Container>
  )
}

export default Profile
