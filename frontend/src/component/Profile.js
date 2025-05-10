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
  Card,
  CardContent,
} from "@material-ui/core"
import axios from "axios"
import ChipInput from "material-ui-chip-input"
import EditIcon from "@material-ui/icons/Edit"
import SaveIcon from "@material-ui/icons/Save"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import SchoolIcon from "@material-ui/icons/School"
import BuildIcon from "@material-ui/icons/Build"
import PersonIcon from "@material-ui/icons/Person"

import { SetPopupContext } from "../App"
import apiList from "../lib/apiList"
import { userType } from "../lib/isAuth"

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    padding: theme.spacing(4),
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    position: "relative",
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
  },
  profileAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    backgroundColor: theme.palette.secondary.main,
    fontSize: "2.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  profileContent: {
    padding: theme.spacing(4),
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
  educationCard: {
    marginBottom: theme.spacing(2),
    borderRadius: "12px",
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
        <Card key={index} className={classes.educationCard}>
          <CardContent>
            <div className={classes.educationHeader}>
              <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                Institution #{index + 1}
              </Typography>
              {isEditing && education.length > 1 && (
                <IconButton size="small" onClick={() => handleRemoveEducation(index)} color="secondary">
                  <DeleteIcon />
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
          </CardContent>
        </Card>
      ))}
      {isEditing && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
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
  })

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ])

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
    const updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"]
          }
          return obj
        }),
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

  return (
    <Container maxWidth="md" className={classes.container}>
      {isLoading && !profileDetails.name ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Paper elevation={0} className={classes.profileCard}>
          <div className={classes.profileHeader}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar className={classes.profileAvatar}>{getAvatarLetter()}</Avatar>
              <Typography variant="h4" component="h1" style={{ fontWeight: 700 }}>
                {profileDetails.name}
              </Typography>
            </Box>
          </div>

          <div className={classes.profileContent}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={() => {
                  if (isEditing) {
                    handleUpdate()
                  } else {
                    setIsEditing(true)
                  }
                }}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </Box>

            <Typography variant="h6" className={classes.sectionTitle}>
              <PersonIcon />
              Personal Information
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

            <Divider className={classes.divider} />

            {userType() === "applicant" && (
              <>
                <Typography variant="h6" className={classes.sectionTitle}>
                  <SchoolIcon />
                  Education
                </Typography>

                <MultifieldInput education={education} setEducation={setEducation} isEditing={isEditing} />

                <Divider className={classes.divider} />

                <Typography variant="h6" className={classes.sectionTitle}>
                  <BuildIcon />
                  Skills
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

            {isEditing && (
              <Button
                variant="contained"
                color="primary"
                className={classes.submitButton}
                onClick={handleUpdate}
                disabled={isLoading}
                fullWidth
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
