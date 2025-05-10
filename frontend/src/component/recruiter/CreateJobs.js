"use client"

import { useContext, useState } from "react"
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
  Container,
  Box,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core"
import axios from "axios"
import ChipInput from "material-ui-chip-input"
import WorkIcon from "@material-ui/icons/Work"
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import ScheduleIcon from "@material-ui/icons/Schedule"
import GroupIcon from "@material-ui/icons/Group"
import BuildIcon from "@material-ui/icons/Build"
import TitleIcon from "@material-ui/icons/Title"
import EventIcon from "@material-ui/icons/Event"
import AddIcon from "@material-ui/icons/Add"

import { SetPopupContext } from "../../App"
import apiList from "../../lib/apiList"

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "93vh",
    padding: theme.spacing(4),
    background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(1),
    },
  },
  inputField: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  chipInput: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  submitButton: {
    padding: "12px 0",
    fontWeight: 600,
    marginTop: theme.spacing(2),
    borderRadius: "8px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    },
  },
  formSection: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: "8px",
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
  },
  formSectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
    },
  },
}))

const CreateJobs = (props) => {
  const classes = useStyles()
  const setPopup = useContext(SetPopupContext)

  const [loading, setLoading] = useState(false)
  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    salary: 0,
  })

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    })
  }

  const handleUpdate = () => {
    setLoading(true)
    console.log(jobDetails)
    axios
      .post(apiList.jobs, jobDetails, {
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
        setJobDetails({
          title: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        })
        setLoading(false)
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        })
        console.log(err.response)
        setLoading(false)
      })
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h3" component="h1" className={classes.title}>
        Create New Job
      </Typography>

      <Paper className={classes.paper}>
        <Box className={classes.formSection}>
          <Typography variant="h6" className={classes.formSectionTitle}>
            <TitleIcon /> Basic Information
          </Typography>
          <TextField
            label="Job Title"
            value={jobDetails.title}
            onChange={(event) => handleInput("title", event.target.value)}
            variant="outlined"
            fullWidth
            className={classes.inputField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Job Type"
            variant="outlined"
            value={jobDetails.jobType}
            onChange={(event) => {
              handleInput("jobType", event.target.value)
            }}
            fullWidth
            className={classes.inputField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessCenterIcon color="action" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Work From Home">Work From Home</MenuItem>
          </TextField>
        </Box>

        <Box className={classes.formSection}>
          <Typography variant="h6" className={classes.formSectionTitle}>
            <BuildIcon /> Skills & Requirements
          </Typography>
          <ChipInput
            className={classes.chipInput}
            label="Required Skills"
            variant="outlined"
            helperText="Press enter to add skills"
            value={jobDetails.skillsets}
            onAdd={(chip) =>
              setJobDetails({
                ...jobDetails,
                skillsets: [...jobDetails.skillsets, chip],
              })
            }
            onDelete={(chip, index) => {
              const skillsets = jobDetails.skillsets
              skillsets.splice(index, 1)
              setJobDetails({
                ...jobDetails,
                skillsets: skillsets,
              })
            }}
            fullWidth
          />
        </Box>

        <Box className={classes.formSection}>
          <Typography variant="h6" className={classes.formSectionTitle}>
            <MonetizationOnIcon /> Compensation & Duration
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Salary (per month)"
                type="number"
                variant="outlined"
                value={jobDetails.salary}
                onChange={(event) => {
                  handleInput("salary", event.target.value)
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  inputProps: { min: 0 },
                }}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Duration"
                variant="outlined"
                value={jobDetails.duration}
                onChange={(event) => {
                  handleInput("duration", event.target.value)
                }}
                fullWidth
                className={classes.inputField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ScheduleIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value={0}>Flexible</MenuItem>
                <MenuItem value={1}>1 Month</MenuItem>
                <MenuItem value={2}>2 Months</MenuItem>
                <MenuItem value={3}>3 Months</MenuItem>
                <MenuItem value={4}>4 Months</MenuItem>
                <MenuItem value={5}>5 Months</MenuItem>
                <MenuItem value={6}>6 Months</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.formSection}>
          <Typography variant="h6" className={classes.formSectionTitle}>
            <EventIcon /> Application Details
          </Typography>
          <TextField
            label="Application Deadline"
            type="datetime-local"
            value={jobDetails.deadline}
            onChange={(event) => {
              handleInput("deadline", event.target.value)
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            className={classes.inputField}
          />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Maximum Number Of Applicants"
                type="number"
                variant="outlined"
                value={jobDetails.maxApplicants}
                onChange={(event) => {
                  handleInput("maxApplicants", event.target.value)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon color="action" />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1 },
                }}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Positions Available"
                type="number"
                variant="outlined"
                value={jobDetails.maxPositions}
                onChange={(event) => {
                  handleInput("maxPositions", event.target.value)
                }}
                InputProps={{
                  inputProps: { min: 1 },
                }}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
          </Grid>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submitButton}
          onClick={handleUpdate}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
        >
          {loading ? "Creating..." : "Create Job"}
        </Button>
      </Paper>
    </Container>
  )
}

export default CreateJobs
