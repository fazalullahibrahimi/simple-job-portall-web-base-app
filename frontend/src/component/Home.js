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
  Divider,
  CircularProgress,
} from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import axios from "axios"
import SearchIcon from "@material-ui/icons/Search"
import FilterListIcon from "@material-ui/icons/FilterList"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import WorkIcon from "@material-ui/icons/Work"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import EventIcon from "@material-ui/icons/Event"
import PersonIcon from "@material-ui/icons/Person"
import BuildIcon from "@material-ui/icons/Build"
import CloseIcon from "@material-ui/icons/Close"
import EditIcon from "@material-ui/icons/Edit"

import { SetPopupContext } from "../App"
import apiList from "../lib/apiList"
import { userType } from "../lib/isAuth"

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
  jobTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
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
  applyButton: {
    borderRadius: "8px",
    fontWeight: 600,
    padding: theme.spacing(1.5, 0),
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    background: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
      background: theme.palette.primary.dark,
    },
    "&:disabled": {
      background: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  },
  modalPaper: {
    padding: theme.spacing(4),
    borderRadius: "12px",
    outline: "none",
    maxWidth: "600px",
    width: "100%",
  },
  sopField: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  modalButtons: {
    display: "flex",
    justifyContent: "center",
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
    marginBottom: theme.spacing(2),
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
  wordCount: {
    textAlign: "right",
    color: theme.palette.text.secondary,
    fontSize: "0.8rem",
    marginTop: theme.spacing(0.5),
  },
}))

const JobTile = (props) => {
  const classes = useStyles()
  const { job } = props
  const setPopup = useContext(SetPopupContext)

  const [open, setOpen] = useState(false)
  const [sop, setSop] = useState("")
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setSop("")
  }

  const handleApply = () => {
    setLoading(true)
    console.log(job._id)
    console.log(sop)
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        {
          sop: sop,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        })
        handleClose()
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response)
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        })
        handleClose()
        setLoading(false)
      })
  }

  const deadline = new Date(job.deadline).toLocaleDateString()

  return (
    <Card className={classes.jobCard}>
      <CardContent>
        <Typography variant="h5" className={classes.jobTitle}>
          {job.title}
        </Typography>
        <Box mb={2}>
          <Rating value={job.rating !== -1 ? job.rating : null} readOnly size="small" />
        </Box>

        <Divider style={{ margin: "16px 0" }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box className={classes.infoSection}>
              <Box className={classes.infoItem}>
                <WorkIcon />
                <Typography variant="body1">Role: {job.jobType}</Typography>
              </Box>
              <Box className={classes.infoItem}>
                <MonetizationOnIcon />
                <Typography variant="body1">Salary: ₹{job.salary} per month</Typography>
              </Box>
              <Box className={classes.infoItem}>
                <AccessTimeIcon />
                <Typography variant="body1">
                  Duration: {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
                </Typography>
              </Box>
              <Box className={classes.infoItem}>
                <PersonIcon />
                <Typography variant="body1">Posted By: {job.recruiter.name}</Typography>
              </Box>
              <Box className={classes.infoItem}>
                <EventIcon />
                <Typography variant="body1">Application Deadline: {deadline}</Typography>
              </Box>
            </Box>

            <Box mt={2}>
              <Typography variant="subtitle1" style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <BuildIcon style={{ marginRight: "8px" }} />
                Skills Required:
              </Typography>
              <Box>
                {job.skillsets.map((skill) => (
                  <Chip key={skill} label={skill} className={classes.skillChip} />
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              fullWidth
              className={classes.applyButton}
              onClick={() => {
                setOpen(true)
              }}
              disabled={userType() === "recruiter"}
            >
              Apply Now
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      {/* Apply Job Modal */}
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper className={classes.modalPaper}>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className={classes.filterTitle}>
            Apply for {job.title}
          </Typography>

          <TextField
            label="Statement of Purpose (up to 250 words)"
            multiline
            rows={8}
            variant="outlined"
            fullWidth
            className={classes.sopField}
            value={sop}
            onChange={(event) => {
              const words = event.target.value.split(/\s+/).filter((word) => word.length > 0)
              if (words.length <= 250) {
                setSop(event.target.value)
              }
            }}
          />
          <Typography className={classes.wordCount}>
            {sop.split(/\s+/).filter((word) => word.length > 0).length} / 250 words
          </Typography>

          <Box className={classes.modalButtons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.modalButton}
              onClick={() => handleApply()}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EditIcon />}
            >
              {loading ? "Submitting..." : "Submit Application"}
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
            Salary Range (₹)
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
                <Typography>Salary</Typography>
                <Box display="flex" alignItems="center">
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
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className={classes.sortContainer}>
                <Typography>Duration</Typography>
                <Box display="flex" alignItems="center">
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
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className={classes.sortContainer}>
                <Typography>Rating</Typography>
                <Box display="flex" alignItems="center">
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

const Home = (props) => {
  const classes = useStyles()
  const [jobs, setJobs] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
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
    setLoading(true)
    let searchParams = []
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

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setJobs(
          response.data.filter((obj) => {
            const today = new Date()
            const deadline = new Date(obj.deadline)
            return deadline > today
          }),
        )
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response.data)
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching jobs",
        })
        setLoading(false)
      })
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h3" component="h1" className={classes.title}>
        Available Jobs
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

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : jobs.length > 0 ? (
        jobs.map((job) => <JobTile key={job._id} job={job} />)
      ) : (
        <Paper className={classes.noJobsMessage}>
          <Typography variant="h5">No jobs found</Typography>
          <Typography variant="body1">Try adjusting your search filters or check back later</Typography>
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

export default Home
