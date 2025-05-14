import { Grid, Typography, Button, Paper, Container, makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import WorkIcon from "@material-ui/icons/Work"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter"
import SearchIcon from "@material-ui/icons/Search"
import PeopleIcon from "@material-ui/icons/People"

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "93vh",
    padding: 0,
    position: "relative",
    overflow: "hidden",
    background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
  },
  heroSection: {
    padding: theme.spacing(10, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    [theme.breakpoints.up("md")]: {
      minHeight: "80vh",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: theme.spacing(10, 8),
    },
  },
  heroContent: {
    textAlign: "center",
    maxWidth: "600px",
    zIndex: 2,
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
      maxWidth: "50%",
    },
  },
  heroImage: {
    width: "100%",
    maxWidth: "500px",
    marginTop: theme.spacing(6),
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
    },
  },
  iconContainer: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    opacity: 0.9,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    marginBottom: theme.spacing(4),
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    [theme.breakpoints.up("md")]: {
      margin: "0",
      marginBottom: theme.spacing(4),
    },
  },
  icon: {
    fontSize: "45px",
    color: "#fff",
  },
  title: {
    fontWeight: 800,
    marginBottom: theme.spacing(3),
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3.75rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "4.5rem",
    },
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(5),
    fontSize: "1.1rem",
    lineHeight: 1.6,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.25rem",
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-start",
    },
  },
  button: {
    padding: "14px 32px",
    fontWeight: 600,
    borderRadius: "30px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    fontSize: "1rem",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    },
  },
  buttonIcon: {
    marginLeft: theme.spacing(1),
  },
  outlineButton: {
    borderWidth: "2px",
    "&:hover": {
      borderWidth: "2px",
    },
  },
  featuresSection: {
    padding: theme.spacing(10, 3),
    background: "#fff",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10, 8),
    },
  },
  featureTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(8),
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  featureCard: {
    padding: theme.spacing(5),
    textAlign: "center",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    transition: "all 0.4s ease",
    background: "#fff",
    "&:hover": {
      transform: "translateY(-15px)",
      boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    },
  },
  featureIcon: {
    fontSize: "60px",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  },
  featureCardTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  featureCardText: {
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
  },
  shape: {
    position: "absolute",
    opacity: 0.05,
    borderRadius: "50%",
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  shape1: {
    width: "400px",
    height: "400px",
    top: "-200px",
    right: "-200px",
  },
  shape2: {
    width: "300px",
    height: "300px",
    bottom: "50px",
    left: "-150px",
  },
  shape3: {
    width: "200px",
    height: "200px",
    bottom: "250px",
    right: "10%",
  },
  errorContainer: {
    minHeight: "93vh",
    padding: "30px",
    background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  errorContent: {
    textAlign: "center",
    maxWidth: "600px",
    padding: theme.spacing(6),
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    position: "relative",
    zIndex: 2,
  },
  errorTitle: {
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    fontSize: "4rem",
    color: theme.palette.error.main,
  },
  errorSubtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
  },
  errorButton: {
    padding: "12px 24px",
    fontWeight: 600,
    borderRadius: "30px",
  },
}))

const Welcome = () => {
  const classes = useStyles()

  return (
    <Container maxWidth={false} disableGutters className={classes.container}>
      {/* Hero Section */}
      <div className={classes.heroSection}>
        <div className={`${classes.shape} ${classes.shape1}`}></div>
        <div className={`${classes.shape} ${classes.shape2}`}></div>
        <div className={`${classes.shape} ${classes.shape3}`}></div>

        <div className={classes.heroContent}>
          <div className={classes.iconContainer}>
            <WorkIcon className={classes.icon} />
          </div>
          <Typography variant="h2" component="h1" className={classes.title}>
            Find Your Dream Career
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Connect with top employers and discover opportunities that match your skills and aspirations. Your perfect
            job is just a click away.
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              component={Link}
              to="/login"
              endIcon={<ArrowForwardIcon className={classes.buttonIcon} />}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={`${classes.button} ${classes.outlineButton}`}
              component={Link}
              to="/signup"
              endIcon={<ArrowForwardIcon className={classes.buttonIcon} />}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <img
       src="/NA_October_10.jpg"
          alt="Job Portal Illustration"
          className={classes.heroImage}
        />
      </div>

      {/* Features Section */}
      <div className={classes.featuresSection}>
        <Typography variant="h3" className={classes.featureTitle}>
          Why Choose Our Platform
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} className={classes.featureCard}>
              <BusinessCenterIcon className={classes.featureIcon} />
              <Typography variant="h5" className={classes.featureCardTitle}>
                Find Perfect Jobs
              </Typography>
              <Typography variant="body1" className={classes.featureCardText}>
                Browse thousands of job listings from top companies and find the perfect match for your skills and
                experience. Our smart matching algorithm helps you discover opportunities you might otherwise miss.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} className={classes.featureCard}>
              <SearchIcon className={classes.featureIcon} />
              <Typography variant="h5" className={classes.featureCardTitle}>
                Advanced Search
              </Typography>
              <Typography variant="body1" className={classes.featureCardText}>
                Use our powerful search and filtering tools to find exactly what you're looking for, saving you time and
                effort. Filter by salary, location, job type, and more to narrow down your perfect position.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} className={classes.featureCard}>
              <PeopleIcon className={classes.featureIcon} />
              <Typography variant="h5" className={classes.featureCardTitle}>
                Connect with Employers
              </Typography>
              <Typography variant="body1" className={classes.featureCardText}>
                Build your professional network and connect directly with hiring managers and recruiters. Our platform
                facilitates meaningful connections that can lead to your next career opportunity.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export const ErrorPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.errorContainer}>
      <div className={`${classes.shape} ${classes.shape1}`}></div>
      <div className={`${classes.shape} ${classes.shape2}`}></div>

      <div className={classes.errorContent}>
        <Typography variant="h2" component="h1" className={classes.errorTitle}>
          Error 404
        </Typography>
        <Typography variant="h6" className={classes.errorSubtitle}>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.errorButton}
          component={Link}
          to="/"
        >
          Go Home
        </Button>
      </div>
    </div>
  )
}

export default Welcome
