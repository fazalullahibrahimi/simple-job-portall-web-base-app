"use client"

import { useState, useEffect, useContext } from "react"
import {
  Button,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Modal,
  Container,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  CircularProgress,
} from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import axios from "axios"
import StarIcon from "@material-ui/icons/Star"
import WorkIcon from "@material-ui/icons/Work"
import PersonIcon from "@material-ui/icons/Person"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import EventIcon from "@material-ui/icons/Event"
import BuildIcon from "@material-ui/icons/Build"
import CloseIcon from "@material-ui/icons/Close"

import { SetPopupContext } from "../App"
import apiList from "../lib/apiList"

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
  applicationCard: {
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    marginBottom: theme.spacing(3),
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    },
  },
  jobTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  recruiterName: {
    fontWeight: 500,
    marginBottom: theme.spacing(2),
  },
  infoSection: {
    marginBottom: theme.spacing(2),
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& svg": {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
  },
  skillChip: {
    margin: theme.spacing(0.5),
    background: theme.palette.primary.light,
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  statusBlock: {
    padding: theme.spacing(1.5),
    borderRadius: "8px",
    color: "#fff",
    fontWeight: 600,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: theme.spacing(2),
  },
  rateButton: {
    borderRadius: "8px",
    fontWeight: 600,
    padding: theme.spacing(1, 0),
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    background: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
      background: theme.palette.primary.dark,
    },
  },
  modalPaper: {
    padding: theme.spacing(4),
    borderRadius: "12px",
    outline: "none",
    maxWidth: "500px",
    width: "100%",
  },
  modalTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  modalButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    gap: theme.spacing(2),
  },
  modalButton: {
    borderRadius: "8px",
    fontWeight: 600,
    padding: theme.spacing(1, 3),
  },
  noApplicationsMessage: {
    textAlign: "center",
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  popupDialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}))

const ApplicationTile = (props) => {
  const classes = useStyles()
  const { application } = props
  const setPopup = useContext(SetPopupContext)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(application.job.rating || 0)

  const appliedOn = new Date(application.dateOfApplication)
  const joinedOn = application.dateOfJoining ? new Date(application.dateOfJoining) : null

  const fetchRating = () => {
    axios
      .get(`${apiList.rating}?id=${application.job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Rating data received:", response.data)
        setRating(response.data.rating)
      })
      .catch((err) => {
        console.log("Error fetching rating:", err.response?.data || err)
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching rating",
        })
      })
  }

  const changeRating = () => {
    console.log("Submitting rating:", rating, "for job:", application.job._id)

    axios
      .put(
        apiList.rating,
        { rating: rating, jobId: application.job._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((response) => {
        console.log("Rating update response:", response.data)
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        })
        fetchRating()
        setOpen(false)
      })
      .catch((err) => {
        console.log("Error updating rating:", err.response?.data || err)
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error updating rating",
        })
        fetchRating()
        setOpen(false)
      })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  }

  return (
    <Card className={classes.applicationCard}>
      <CardContent>
        <Typography variant="h5" className={classes.jobTitle}>
          {application.job.title}
        </Typography>
        <Typography variant="subtitle1" className={classes.recruiterName}>
          <PersonIcon fontSize="small" style={{ verticalAlign: "middle", marginRight: "4px" }} />
          Posted By: {application.recruiter.name}
        </Typography>

        <Divider style={{ margin: "16px 0" }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box className={classes.infoSection}>
              <Box className={classes.infoItem}>
                <WorkIcon />
                <Typography variant="body1">Role: {application.job.jobType}</Typography>
              </Box>
              <Box className={classes.infoItem}>
                <MonetizationOnIcon />
                <Typography variant="body1">Salary: ₹{application.job.salary} per month</Typography>
              </Box>
              <Box className={classes.infoItem}>
                <AccessTimeIcon />
                <Typography variant="body1">
                  Duration: {application.job.duration !== 0 ? `${application.job.duration} month` : `Flexible`}
                </Typography>
              </Box>
              <Box className={classes.infoItem}>
                <EventIcon />
                <Typography variant="body1">Applied On: {appliedOn.toLocaleDateString()}</Typography>
              </Box>
              {(application.status === "accepted" || application.status === "finished") && joinedOn && (
                <Box className={classes.infoItem}>
                  <EventIcon />
                  <Typography variant="body1">Joined On: {joinedOn.toLocaleDateString()}</Typography>
                </Box>
              )}
            </Box>

            <Box mt={2}>
              <Typography variant="subtitle1" style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <BuildIcon style={{ marginRight: "8px" }} />
                Skills Required:
              </Typography>
              <Box>
                {application.job.skillsets &&
                  application.job.skillsets.map((skill) => (
                    <Chip key={skill} label={skill} className={classes.skillChip} />
                  ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              className={classes.statusBlock}
              style={{
                background: colorSet[application.status] || colorSet.applied,
              }}
            >
              {application.status}
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Job Rating:
              </Typography>
              <Rating value={rating > 0 ? rating : null} readOnly size="large" precision={0.5} />
            </Box>

            {(application.status === "accepted" || application.status === "finished") && (
              <Button
                variant="contained"
                fullWidth
                className={classes.rateButton}
                onClick={() => {
                  fetchRating()
                  setOpen(true)
                }}
                startIcon={<StarIcon />}
              >
                Rate Job
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>

      {/* Rating Modal */}
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper className={classes.modalPaper}>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className={classes.modalTitle}>
            Rate This Job
          </Typography>
          <Box className={classes.ratingContainer}>
            <Typography variant="body1" gutterBottom>
              How would you rate your experience with this job?
            </Typography>
            <Rating
              name="job-rating"
              size="large"
              precision={0.5}
              value={rating > 0 ? rating : null}
              onChange={(event, newValue) => {
                setRating(newValue || 0)
              }}
            />
          </Box>
          <Box className={classes.modalButtons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.modalButton}
              onClick={() => changeRating()}
              startIcon={<StarIcon />}
            >
              Submit Rating
            </Button>
            <Button variant="outlined" color="primary" className={classes.modalButton} onClick={() => handleClose()}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Card>
  )
}

const Applications = (props) => {
  const classes = useStyles()
  const setPopup = useContext(SetPopupContext)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    setLoading(true)
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Applications data:", response.data)
        setApplications(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log("Error fetching applications:", err.response?.data || err)
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching applications",
        })
        setLoading(false)
      })
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h3" component="h1" className={classes.title}>
        My Applications
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : applications.length > 0 ? (
        applications.map((application) => <ApplicationTile key={application._id} application={application} />)
      ) : (
        <Paper className={classes.noApplicationsMessage}>
          <Typography variant="h5">No Applications Found</Typography>
          <Typography variant="body1">You haven't applied to any jobs yet.</Typography>
        </Paper>
      )}
    </Container>
  )
}

export default Applications
