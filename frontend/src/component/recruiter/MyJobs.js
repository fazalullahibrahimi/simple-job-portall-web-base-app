"use client"

import { useState, useEffect, useContext } from "react"
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  MenuItem,
  Checkbox,
  Container,
  Box,
  Card,
  CardContent,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import Rating from "@material-ui/lab/Rating"
import axios from "axios"
import SearchIcon from "@material-ui/icons/Search"
import FilterListIcon from "@material-ui/icons/FilterList"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import VisibilityIcon from "@material-ui/icons/Visibility"
import CloseIcon from "@material-ui/icons/Close"
import WorkIcon from "@material-ui/icons/Work"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import EventIcon from "@material-ui/icons/Event"
import PeopleIcon from "@material-ui/icons/People"

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
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
  },
  searchField: {
    width: "100%",
    maxWidth: "600px",
    background: "#fff",
    borderRadius: "30px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
    },
  },
  filterButton: {
    marginLeft: theme.spacing(2),
    borderRadius: "50%",
    padding: theme.spacing(1.5),
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    background: "#fff",
    "&:hover": {
      background: theme.palette.primary.light,
    },
  },
  jobCard: {
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
  jobHeader: {
    padding: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  jobTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  jobContent: {
    padding: theme.spacing(3),
  },
  jobDetail: {
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
  actionButton: {
    borderRadius: "8px",
    fontWeight: 600,
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0, 1),
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    },
  },
  viewButton: {
    background: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
  editButton: {
    background: "#FC7A1E",
    color: "#fff",
    "&:hover": {
      background: "#E86A10",
    },
  },
  deleteButton: {
    background: theme.palette.error.main,
    color: "#fff",
    "&:hover": {
      background: theme.palette.error.dark,
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
  filterCheckboxContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(2),
  },
  sortContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "8px",
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  applyFilterButton: {
    borderRadius: "8px",
    fontWeight: 600,
    padding: theme.spacing(1, 4),
    marginTop: theme.spacing(2),
  },
  noJobsMessage: {
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

const JobTile = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { job, getData } = props
  const setPopup = useContext(SetPopupContext)

  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [jobDetails, setJobDetails] = useState(job)

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    })
  }

  const handleClick = (location) => {
    history.push(location)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseUpdate = () => {
    setOpenUpdate(false)
  }

  const handleDelete = () => {
    console.log(job._id)
    axios
      .delete(`${apiList.jobs}/${job._id}`, {
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
        handleClose()
      })
      .catch((err) => {
        console.log(err.response)
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        })
        handleClose()
      })
  }

  const handleJobUpdate = () => {
    axios
      .put(`${apiList.jobs}/${job._id}`, jobDetails, {
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
        handleCloseUpdate()
      })
      .catch((err) => {
        console.log(err.response)
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        })
        handleCloseUpdate()
      })
  }

  const postedOn = new Date(job.dateOfPosting)

  return (
    <Card className={classes.jobCard}>
      <Box className={classes.jobHeader}>
        <Typography variant="h5" className={classes.jobTitle}>
          {job.title}
        </Typography>
        <Rating value={job.rating !== -1 ? job.rating : null} readOnly />
      </Box>
      <CardContent className={classes.jobContent}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box className={classes.jobDetail}>
              <WorkIcon />
              <Typography variant="body1">Role: {job.jobType}</Typography>
            </Box>
            <Box className={classes.jobDetail}>
              <MonetizationOnIcon />
              <Typography variant="body1">Salary: ₹{job.salary} per month</Typography>
            </Box>
            <Box className={classes.jobDetail}>
              <AccessTimeIcon />
              <Typography variant="body1">
                Duration: {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
              </Typography>
            </Box>
            <Box className={classes.jobDetail}>
              <EventIcon />
              <Typography variant="body1">Posted On: {postedOn.toLocaleDateString()}</Typography>
            </Box>
            <Box className={classes.jobDetail}>
              <PeopleIcon />
              <Typography variant="body1">Applicants: {job.maxApplicants}</Typography>
            </Box>
            <Box className={classes.jobDetail}>
              <Typography variant="body1">Positions Available: {job.maxPositions - job.acceptedCandidates}</Typography>
            </Box>
            <Box mt={2}>
              {job.skillsets.map((skill) => (
                <Chip key={skill} label={skill} className={classes.skillChip} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
              <Button
                variant="contained"
                className={`${classes.actionButton} ${classes.viewButton}`}
                onClick={() => handleClick(`/job/applications/${job._id}`)}
                startIcon={<VisibilityIcon />}
                fullWidth
                style={{ marginBottom: "10px" }}
              >
                View Applications
              </Button>
              <Button
                variant="contained"
                className={`${classes.actionButton} ${classes.editButton}`}
                onClick={() => {
                  setOpenUpdate(true)
                }}
                startIcon={<EditIcon />}
                fullWidth
                style={{ marginBottom: "10px" }}
              >
                Update Details
              </Button>
              <Button
                variant="contained"
                className={`${classes.actionButton} ${classes.deleteButton}`}
                onClick={() => {
                  setOpen(true)
                }}
                startIcon={<DeleteIcon />}
                fullWidth
              >
                Delete Job
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      {/* Delete Confirmation Modal */}
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper className={classes.modalPaper}>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className={classes.modalTitle}>
            Are you sure you want to delete this job?
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            This action cannot be undone.
          </Typography>
          <Box className={classes.modalButtons}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.modalButton}
              onClick={() => handleDelete()}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button variant="outlined" color="primary" className={classes.modalButton} onClick={() => handleClose()}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* Update Job Modal */}
      <Modal open={openUpdate} onClose={handleCloseUpdate} className={classes.popupDialog}>
        <Paper className={classes.modalPaper}>
          <IconButton className={classes.closeButton} onClick={handleCloseUpdate}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className={classes.modalTitle}>
            Update Job Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Application Deadline"
                type="datetime-local"
                value={jobDetails.deadline.substr(0, 16)}
                onChange={(event) => {
                  handleInput("deadline", event.target.value)
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Maximum Number Of Applicants"
                type="number"
                variant="outlined"
                value={jobDetails.maxApplicants}
                onChange={(event) => {
                  handleInput("maxApplicants", event.target.value)
                }}
                InputProps={{ inputProps: { min: 1 } }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Positions Available"
                type="number"
                variant="outlined"
                value={jobDetails.maxPositions}
                onChange={(event) => {
                  handleInput("maxPositions", event.target.value)
                }}
                InputProps={{ inputProps: { min: 1 } }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box className={classes.modalButtons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.modalButton}
              onClick={() => handleJobUpdate()}
              startIcon={<EditIcon />}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.modalButton}
              onClick={() => handleCloseUpdate()}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Card>
  )
}

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
          Filter Jobs
        </Typography>

        <Box className={classes.filterSection}>
          <Typography variant="h6" className={classes.filterSectionTitle}>
            Job Type
          </Typography>
          <Box className={classes.filterCheckboxContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  name="fullTime"
                  checked={searchOptions.jobType.fullTime}
                  onChange={(event) => {
                    setSearchOptions({
                      ...searchOptions,
                      jobType: {
                        ...searchOptions.jobType,
                        [event.target.name]: event.target.checked,
                      },
                    })
                  }}
                  color="primary"
                />
              }
              label="Full Time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="partTime"
                  checked={searchOptions.jobType.partTime}
                  onChange={(event) => {
                    setSearchOptions({
                      ...searchOptions,
                      jobType: {
                        ...searchOptions.jobType,
                        [event.target.name]: event.target.checked,
                      },
                    })
                  }}
                  color="primary"
                />
              }
              label="Part Time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="wfh"
                  checked={searchOptions.jobType.wfh}
                  onChange={(event) => {
                    setSearchOptions({
                      ...searchOptions,
                      jobType: {
                        ...searchOptions.jobType,
                        [event.target.name]: event.target.checked,
                      },
                    })
                  }}
                  color="primary"
                />
              }
              label="Work From Home"
            />
          </Box>
        </Box>

        <Box className={classes.filterSection}>
          <Typography variant="h6" className={classes.filterSectionTitle}>
            Salary Range
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => {
              return value * (100000 / 100)
            }}
            marks={[
              { value: 0, label: "₹0" },
              { value: 100, label: "₹100,000" },
            ]}
            value={searchOptions.salary}
            onChange={(event, value) =>
              setSearchOptions({
                ...searchOptions,
                salary: value,
              })
            }
          />
        </Box>

        <Box className={classes.filterSection}>
          <Typography variant="h6" className={classes.filterSectionTitle}>
            Duration
          </Typography>
          <TextField
            select
            label="Duration"
            variant="outlined"
            fullWidth
            value={searchOptions.duration}
            onChange={(event) =>
              setSearchOptions({
                ...searchOptions,
                duration: event.target.value,
              })
            }
          >
            <MenuItem value="0">All</MenuItem>
            <MenuItem value="1">1 Month</MenuItem>
            <MenuItem value="2">2 Months</MenuItem>
            <MenuItem value="3">3 Months</MenuItem>
            <MenuItem value="4">4 Months</MenuItem>
            <MenuItem value="5">5 Months</MenuItem>
            <MenuItem value="6">6 Months</MenuItem>
            <MenuItem value="7">7 Months</MenuItem>
          </TextField>
        </Box>

        <Box className={classes.filterSection}>
          <Typography variant="h6" className={classes.filterSectionTitle}>
            Sort By
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box className={classes.sortContainer}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="salary"
                      checked={searchOptions.sort.salary.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            salary: {
                              ...searchOptions.sort.salary,
                              status: event.target.checked,
                            },
                          },
                        })
                      }
                      color="primary"
                    />
                  }
                  label="Salary"
                />
                <IconButton
                  disabled={!searchOptions.sort.salary.status}
                  onClick={() => {
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        salary: {
                          ...searchOptions.sort.salary,
                          desc: !searchOptions.sort.salary.desc,
                        },
                      },
                    })
                  }}
                >
                  {searchOptions.sort.salary.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className={classes.sortContainer}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="duration"
                      checked={searchOptions.sort.duration.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            duration: {
                              ...searchOptions.sort.duration,
                              status: event.target.checked,
                            },
                          },
                        })
                      }
                      color="primary"
                    />
                  }
                  label="Duration"
                />
                <IconButton
                  disabled={!searchOptions.sort.duration.status}
                  onClick={() => {
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        duration: {
                          ...searchOptions.sort.duration,
                          desc: !searchOptions.sort.duration.desc,
                        },
                      },
                    })
                  }}
                >
                  {searchOptions.sort.duration.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className={classes.sortContainer}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rating"
                      checked={searchOptions.sort.rating.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            rating: {
                              ...searchOptions.sort.rating,
                              status: event.target.checked,
                            },
                          },
                        })
                      }
                      color="primary"
                    />
                  }
                  label="Rating"
                />
                <IconButton
                  disabled={!searchOptions.sort.rating.status}
                  onClick={() => {
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        rating: {
                          ...searchOptions.sort.rating,
                          desc: !searchOptions.sort.rating.desc,
                        },
                      },
                    })
                  }}
                >
                  {searchOptions.sort.rating.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary" className={classes.applyFilterButton} onClick={() => getData()}>
            Apply Filters
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}

const MyJobs = (props) => {
  const classes = useStyles()
  const [jobs, setJobs] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  })

  const setPopup = useContext(SetPopupContext)
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    let searchParams = [`myjobs=1`]
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`]
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, `jobType=Full%20Time`]
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, `jobType=Part%20Time`]
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`]
    }
    if (searchOptions.salary[0] != 0) {
      searchParams = [...searchParams, `salaryMin=${searchOptions.salary[0] * 1000}`]
    }
    if (searchOptions.salary[1] != 100) {
      searchParams = [...searchParams, `salaryMax=${searchOptions.salary[1] * 1000}`]
    }
    if (searchOptions.duration != "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`]
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
    let address = apiList.jobs
    if (queryString !== "") {
      address = `${address}?${queryString}`
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
        setJobs(response.data)
      })
      .catch((err) => {
        console.log(err.response.data)
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching jobs",
        })
      })
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h3" component="h1" className={classes.title}>
        My Jobs
      </Typography>

      <Box className={classes.searchContainer}>
        <TextField
          label="Search Jobs"
          value={searchOptions.query}
          onChange={(event) =>
            setSearchOptions({
              ...searchOptions,
              query: event.target.value,
            })
          }
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              getData()
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => getData()}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          className={classes.searchField}
          variant="outlined"
        />
        <IconButton className={classes.filterButton} onClick={() => setFilterOpen(true)}>
          <FilterListIcon />
        </IconButton>
      </Box>

      {jobs.length > 0 ? (
        jobs.map((job) => <JobTile key={job._id} job={job} getData={getData} />)
      ) : (
        <Paper className={classes.noJobsMessage}>
          <Typography variant="h5">No jobs found</Typography>
          <Typography variant="body1">Try adjusting your search filters or create a new job</Typography>
        </Paper>
      )}

      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData()
          setFilterOpen(false)
        }}
      />
    </Container>
  )
}

export default MyJobs
