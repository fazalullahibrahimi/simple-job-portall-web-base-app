"use client"

import { useState, useEffect, useContext } from "react"
import {
  Button,
  Chip,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  Modal,
  Container,
  Box,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Divider,
  Checkbox,
} from "@material-ui/core"
import { useParams } from "react-router-dom"
import Rating from "@material-ui/lab/Rating"
import axios from "axios"
import FilterListIcon from "@material-ui/icons/FilterList"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import GetAppIcon from "@material-ui/icons/GetApp"
import PersonIcon from "@material-ui/icons/Person"
import SchoolIcon from "@material-ui/icons/School"
import DescriptionIcon from "@material-ui/icons/Description"
import BuildIcon from "@material-ui/icons/Build"
import CloseIcon from "@material-ui/icons/Close"
import EventIcon from "@material-ui/icons/Event"

import { SetPopupContext } from "../../App"
import apiList, { server } from "../../lib/apiList"

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
  filterButton: {
    marginBottom: theme.spacing(3),
    borderRadius: "30px",
    padding: theme.spacing(1, 3),
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    background: "#fff",
    "&:hover": {
      background: theme.palette.primary.light,
    },
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
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "0 auto",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  applicantName: {
    fontWeight: 700,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
  applicantRating: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  infoSection: {
    marginBottom: theme.spacing(2),
  },
  infoTitle: {
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& svg": {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
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
  actionButton: {
    borderRadius: "8px",
    fontWeight: 600,
    padding: theme.spacing(1, 0),
    margin: theme.spacing(0.5),
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    },
  },
  resumeButton: {
    background: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
  shortlistButton: {
    background: "#DC851F",
    color: "#fff",
    "&:hover": {
      background: "#C77A1C",
    },
  },
  acceptButton: {
    background: "#09BC8A",
    color: "#fff",
    "&:hover": {
      background: "#08A87A",
    },
  },
  rejectButton: {
    background: "#D1345B",
    color: "#fff",
    "&:hover": {
      background: "#C02E51",
    },
  },
  modalPaper: {
    padding: theme.spacing(4),
    borderRadius: "12px",
    outline: "none",
    maxWidth: "500px",
    width: "100%",
  },
  filterPaper: {
    padding: theme.spacing(4),
    borderRadius: "12px",
    outline: "none",
    maxWidth: "600px",
    width: "100%",
  },
  filterTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  filterSection: {
    marginBottom: theme.spacing(3),
  },
  filterSectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  sortContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "8px",
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  applyFilterButton: {
    borderRadius: "8px",
    fontWeight: 600,
    padding: theme.spacing(1, 4),
    marginTop: theme.spacing(2),
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

const FilterPopup = (props) => {
  const classes = useStyles()
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props
  return (
    <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
      <Paper className={classes.filterPaper}>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" className={classes.filterTitle}>
          Filter Applications
        </Typography>

        <Box className={classes.filterSection}>
          <Typography variant="h6" className={classes.filterSectionTitle}>
            Application Status
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box className={classes.sortContainer}>
                <Typography>Rejected</Typography>
                <Checkbox
                  name="rejected"
                  checked={searchOptions.status.rejected}
                  onChange={(event) => {
                    setSearchOptions({
                      ...searchOptions,
                      status: {
                        ...searchOptions.status,
                        [event.target.name]: event.target.checked,
                      },
                    })
                  }}
                  color="primary"
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.sortContainer}>
                <Typography>Applied</Typography>
                <Checkbox
                  name="applied"
                  checked={searchOptions.status.applied}
                  onChange={(event) => {
                    setSearchOptions({
                      ...searchOptions,
                      status: {
                        ...searchOptions.status,
                        [event.target.name]: event.target.checked,
                      },
                    })
                  }}
                  color="primary"
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.sortContainer}>
                <Typography>Shortlisted</Typography>
                <Checkbox
                  name="shortlisted"
                  checked={searchOptions.status.shortlisted}
                  onChange={(event) => {
                    setSearchOptions({
                      ...searchOptions,
                      status: {
                        ...searchOptions.status,
                        [event.target.name]: event.target.checked,
                      },
                    })
                  }}
                  color="primary"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.filterSection}>
          <Typography variant="h6" className={classes.filterSectionTitle}>
            Sort By
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box className={classes.sortContainer}>
                <Typography>Name</Typography>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    name="name"
                    checked={searchOptions.sort["jobApplicant.name"].status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.name": {
                            ...searchOptions.sort["jobApplicant.name"],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    color="primary"
                  />
                  <IconButton
                    disabled={!searchOptions.sort["jobApplicant.name"].status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.name": {
                            ...searchOptions.sort["jobApplicant.name"],
                            desc: !searchOptions.sort["jobApplicant.name"].desc,
                          },
                        },
                      })
                    }}
                  >
                    {searchOptions.sort["jobApplicant.name"].desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className={classes.sortContainer}>
                <Typography>Date Applied</Typography>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    name="dateOfApplication"
                    checked={searchOptions.sort.dateOfApplication.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          dateOfApplication: {
                            ...searchOptions.sort.dateOfApplication,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    color="primary"
                  />
                  <IconButton
                    disabled={!searchOptions.sort.dateOfApplication.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          dateOfApplication: {
                            ...searchOptions.sort.dateOfApplication,
                            desc: !searchOptions.sort.dateOfApplication.desc,
                          },
                        },
                      })
                    }}
                  >
                    {searchOptions.sort.dateOfApplication.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className={classes.sortContainer}>
                <Typography>Rating</Typography>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    name="rating"
                    checked={searchOptions.sort["jobApplicant.rating"].status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.rating": {
                            ...searchOptions.sort[["jobApplicant.rating"]],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    color="primary"
                  />
                  <IconButton
                    disabled={!searchOptions.sort["jobApplicant.rating"].status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.rating": {
                            ...searchOptions.sort["jobApplicant.rating"],
                            desc: !searchOptions.sort["jobApplicant.rating"].desc,
                          },
                        },
                      })
                    }}
                  >
                    {searchOptions.sort["jobApplicant.rating"].desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.applyFilterButton}
            onClick={() => {
              getData()
              handleClose()
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}

const ApplicationTile = (props) => {
  const classes = useStyles()
  const { application, getData } = props
  const setPopup = useContext(SetPopupContext)
  const [open, setOpen] = useState(false)

  const appliedOn = new Date(application.dateOfApplication)

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

  const getResume = () => {
    if (application.jobApplicant.resume && application.jobApplicant.resume !== "") {
      const address = `${server}${application.jobApplicant.resume}`
      console.log(address)
      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" })
          const fileURL = URL.createObjectURL(file)
          window.open(fileURL)
        })
        .catch((error) => {
          console.log(error)
          setPopup({
            open: true,
            severity: "error",
            message: "Error downloading resume",
          })
        })
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "No resume found",
      })
    }
  }

  const updateStatus = (status) => {
    const address = `${apiList.applications}/${application._id}`
    const statusData = {
      status: status,
      dateOfJoining: new Date().toISOString(),
    }
    axios
      .put(address, statusData, {
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
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        })
        console.log(err.response)
      })
  }

  const buttonSet = {
    applied: (
      <>
        <Button
          variant="contained"
          className={`${classes.actionButton} ${classes.shortlistButton}`}
          onClick={() => updateStatus("shortlisted")}
          fullWidth
        >
          Shortlist
        </Button>
        <Button
          variant="contained"
          className={`${classes.actionButton} ${classes.rejectButton}`}
          onClick={() => updateStatus("rejected")}
          fullWidth
        >
          Reject
        </Button>
      </>
    ),
    shortlisted: (
      <>
        <Button
          variant="contained"
          className={`${classes.actionButton} ${classes.acceptButton}`}
          onClick={() => updateStatus("accepted")}
          fullWidth
        >
          Accept
        </Button>
        <Button
          variant="contained"
          className={`${classes.actionButton} ${classes.rejectButton}`}
          onClick={() => updateStatus("rejected")}
          fullWidth
        >
          Reject
        </Button>
      </>
    ),
    rejected: (
      <Box
        className={classes.statusBlock}
        style={{
          background: colorSet["rejected"],
        }}
      >
        Rejected
      </Box>
    ),
    accepted: (
      <Box
        className={classes.statusBlock}
        style={{
          background: colorSet["accepted"],
        }}
      >
        Accepted
      </Box>
    ),
    cancelled: (
      <Box
        className={classes.statusBlock}
        style={{
          background: colorSet["cancelled"],
        }}
      >
        Cancelled
      </Box>
    ),
    finished: (
      <Box
        className={classes.statusBlock}
        style={{
          background: colorSet["finished"],
        }}
      >
        Finished
      </Box>
    ),
  }

  return (
    <Card className={classes.applicationCard}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
            <Avatar
              src={`${server}${application.jobApplicant.profile}`}
              className={classes.avatar}
              alt={application.jobApplicant.name}
            >
              <PersonIcon style={{ fontSize: "3rem" }} />
            </Avatar>
            <Typography variant="h6" className={classes.applicantName}>
              {application.jobApplicant.name}
            </Typography>
            <Box className={classes.applicantRating}>
              <Rating
                value={application.jobApplicant.rating !== -1 ? application.jobApplicant.rating : null}
                readOnly
                size="large"
              />
            </Box>
            <Box
              className={classes.statusBlock}
              style={{
                background: colorSet[application.status],
              }}
            >
              {application.status}
            </Box>
            <Button
              variant="contained"
              className={`${classes.actionButton} ${classes.resumeButton}`}
              onClick={() => getResume()}
              startIcon={<GetAppIcon />}
              fullWidth
            >
              Download Resume
            </Button>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box className={classes.infoSection}>
              <Typography variant="h6" className={classes.infoTitle}>
                <SchoolIcon /> Education
              </Typography>
              <Typography variant="body1">
                {application.jobApplicant.education
                  .map((edu) => {
                    return `${edu.institutionName} (${edu.startYear}-${edu.endYear ? edu.endYear : "Ongoing"})`
                  })
                  .join(", ")}
              </Typography>
            </Box>

            <Divider style={{ margin: "16px 0" }} />

            <Box className={classes.infoSection}>
              <Typography variant="h6" className={classes.infoTitle}>
                <DescriptionIcon /> Statement of Purpose
              </Typography>
              <Typography variant="body1">{application.sop !== "" ? application.sop : "Not Submitted"}</Typography>
            </Box>

            <Divider style={{ margin: "16px 0" }} />

            <Box className={classes.infoSection}>
              <Typography variant="h6" className={classes.infoTitle}>
                <BuildIcon /> Skills
              </Typography>
              <Box>
                {application.jobApplicant.skills.map((skill) => (
                  <Chip key={skill} label={skill} className={classes.skillChip} />
                ))}
              </Box>
            </Box>

            <Divider style={{ margin: "16px 0" }} />

            <Box className={classes.infoSection}>
              <Typography variant="h6" className={classes.infoTitle}>
                <EventIcon /> Applied On
              </Typography>
              <Typography variant="body1">{appliedOn.toLocaleDateString()}</Typography>
            </Box>

            <CardActions style={{ padding: "16px 0 0 0" }}>{buttonSet[application.status]}</CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const JobApplications = (props) => {
  const classes = useStyles()
  const setPopup = useContext(SetPopupContext)
  const [applications, setApplications] = useState([])
  const { jobId } = useParams()
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchOptions, setSearchOptions] = useState({
    status: {
      all: false,
      applied: false,
      shortlisted: false,
    },
    sort: {
      "jobApplicant.name": {
        status: false,
        desc: false,
      },
      dateOfApplication: {
        status: true,
        desc: true,
      },
      "jobApplicant.rating": {
        status: false,
        desc: false,
      },
    },
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    let searchParams = []

    if (searchOptions.status.rejected) {
      searchParams = [...searchParams, `status=rejected`]
    }
    if (searchOptions.status.applied) {
      searchParams = [...searchParams, `status=applied`]
    }
    if (searchOptions.status.shortlisted) {
      searchParams = [...searchParams, `status=shortlisted`]
    }

    let asc = [],
      desc = []

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj]
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`]
        } else {
          asc = [...asc, `asc=${obj}`]
        }
      }
    })
    searchParams = [...searchParams, ...asc, ...desc]
    const queryString = searchParams.join("&")
    console.log(queryString)
    let address = `${apiList.applicants}?jobId=${jobId}`
    if (queryString !== "") {
      address = `${address}&${queryString}`
    }

    console.log(address)

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setApplications(response.data)
      })
      .catch((err) => {
        console.log(err.response)
        setApplications([])
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        })
      })
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h3" component="h1" className={classes.title}>
        Job Applications
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          variant="contained"
          className={classes.filterButton}
          onClick={() => setFilterOpen(true)}
          startIcon={<FilterListIcon />}
        >
          Filter Applications
        </Button>
      </Box>

      {applications.length > 0 ? (
        applications.map((application) => (
          <ApplicationTile key={application._id} application={application} getData={getData} />
        ))
      ) : (
        <Paper className={classes.noApplicationsMessage}>
          <Typography variant="h5">No Applications Found</Typography>
          <Typography variant="body1">There are no applications for this job yet.</Typography>
        </Paper>
      )}

      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={getData}
      />
    </Container>
  )
}

export default JobApplications
