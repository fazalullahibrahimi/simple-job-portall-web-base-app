"use client"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
  Fade,
  Container,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import MenuIcon from "@material-ui/icons/Menu"
import WorkIcon from "@material-ui/icons/Work"
import AddIcon from "@material-ui/icons/Add"
import BusinessIcon from "@material-ui/icons/Business"
import PeopleIcon from "@material-ui/icons/People"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import HomeIcon from "@material-ui/icons/Home"
import AssignmentIcon from "@material-ui/icons/Assignment"
import axios from "axios"

import isAuth, { userType } from "../lib/isAuth"
import apiList from "../lib/apiList"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 4),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    marginRight: theme.spacing(1),
    fontSize: "2rem",
    color: "#fff",
  },
  title: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  },
  navButtons: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    marginLeft: theme.spacing(1.5),
    borderRadius: "20px",
    padding: "8px 16px",
    textTransform: "none",
    fontWeight: 600,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  buttonOutlined: {
    borderColor: "rgba(255, 255, 255, 0.7)",
    color: "#fff",
    "&:hover": {
      borderColor: "#fff",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  buttonContained: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    fontSize: "1.2rem",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
    color: "#fff",
    fontWeight: 600,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    },
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1.5, 3),
    "& svg": {
      marginRight: theme.spacing(1.5),
      fontSize: "1.2rem",
    },
  },
  menuPaper: {
    marginTop: theme.spacing(1),
    borderRadius: "12px",
    minWidth: "200px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
}))

const Navbar = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null)
  const [userName, setUserName] = useState("")

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl)

  useEffect(() => {
    if (isAuth()) {
      // Fetch user data to get the name
      axios
        .get(apiList.user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUserName(response.data.name)
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }, [])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMobileMenuAnchorEl(null)
  }

  const handleClick = (location) => {
    handleMenuClose()
    history.push(location)
  }

  // Function to get the first letter of the user's name for the avatar
  const getAvatarLetter = () => {
    if (userName && userName.length > 0) {
      return userName.charAt(0).toUpperCase()
    }
    return <PersonIcon />
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      TransitionComponent={Fade}
      classes={{ paper: classes.menuPaper }}
    >
      <MenuItem onClick={() => handleClick("/profile")} className={classes.menuItem}>
        <PersonIcon fontSize="small" />
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleClick("/logout")} className={classes.menuItem}>
        <ExitToAppIcon fontSize="small" />
        Logout
      </MenuItem>
    </Menu>
  )

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
      TransitionComponent={Fade}
      classes={{ paper: classes.menuPaper }}
    >
      {isAuth() ? (
        userType() === "recruiter" ? (
          // Recruiter Menu Items
          <>
            <MenuItem onClick={() => handleClick("/home")} className={classes.menuItem}>
              <HomeIcon fontSize="small" />
              Home
            </MenuItem>
            <MenuItem onClick={() => handleClick("/addjob")} className={classes.menuItem}>
              <AddIcon fontSize="small" />
              Add Jobs
            </MenuItem>
            <MenuItem onClick={() => handleClick("/myjobs")} className={classes.menuItem}>
              <BusinessIcon fontSize="small" />
              My Jobs
            </MenuItem>
     
            <MenuItem onClick={() => handleClick("/profile")} className={classes.menuItem}>
              <PersonIcon fontSize="small" />
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleClick("/logout")} className={classes.menuItem}>
              <ExitToAppIcon fontSize="small" />
              Logout
            </MenuItem>
          </>
        ) : (
          // Applicant Menu Items
          <>
            <MenuItem onClick={() => handleClick("/home")} className={classes.menuItem}>
              <HomeIcon fontSize="small" />
              Home
            </MenuItem>
            <MenuItem onClick={() => handleClick("/applications")} className={classes.menuItem}>
              <AssignmentIcon fontSize="small" />
              Applications
            </MenuItem>
            <MenuItem onClick={() => handleClick("/profile")} className={classes.menuItem}>
              <PersonIcon fontSize="small" />
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleClick("/logout")} className={classes.menuItem}>
              <ExitToAppIcon fontSize="small" />
              Logout
            </MenuItem>
          </>
        )
      ) : (
        // Not Logged In Menu Items
        <>
          <MenuItem onClick={() => handleClick("/login")} className={classes.menuItem}>
            <PersonIcon fontSize="small" />
            Login
          </MenuItem>
          <MenuItem onClick={() => handleClick("/signup")} className={classes.menuItem}>
            <AddIcon fontSize="small" />
            Signup
          </MenuItem>
        </>
      )}
    </Menu>
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Container maxWidth="xl">
          <Toolbar className={classes.toolbar}>
            <div className={classes.logoContainer} onClick={() => handleClick("/")}>
              <WorkIcon className={classes.logo} />
              <Typography variant="h6" className={classes.title}>
                Zubair JobApp
              </Typography>
            </div>

            {isMobile ? (
              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <div className={classes.navButtons}>
                {isAuth() ? (
                  userType() === "recruiter" ? (
                    // Recruiter Desktop Buttons
                    <>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/home")}
                        className={classes.button}
                        startIcon={<HomeIcon className={classes.buttonIcon} />}
                      >
                        Home
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/addjob")}
                        className={classes.button}
                        startIcon={<AddIcon className={classes.buttonIcon} />}
                      >
                        Add Jobs
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/myjobs")}
                        className={classes.button}
                        startIcon={<BusinessIcon className={classes.buttonIcon} />}
                      >
                        My Jobs
                      </Button>
                      {/* <Button
                        color="inherit"
                        onClick={() => handleClick("/employees")}
                        className={classes.button}
                        startIcon={<PeopleIcon className={classes.buttonIcon} />}
                      >
                        Employees
                      </Button> */}
                      <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                        <Avatar className={classes.avatar}>{getAvatarLetter()}</Avatar>
                      </IconButton>
                    </>
                  ) : (
                    // Applicant Desktop Buttons
                    <>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/home")}
                        className={classes.button}
                        startIcon={<HomeIcon className={classes.buttonIcon} />}
                      >
                        Home
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/applications")}
                        className={classes.button}
                        startIcon={<AssignmentIcon className={classes.buttonIcon} />}
                      >
                        Applications
                      </Button>
                      <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                        <Avatar className={classes.avatar}>{getAvatarLetter()}</Avatar>
                      </IconButton>
                    </>
                  )
                ) : (
                  // Not Logged In Desktop Buttons
                  <>
                    <Button
                      color="inherit"
                      variant="outlined"
                      onClick={() => handleClick("/login")}
                      className={`${classes.button} ${classes.buttonOutlined}`}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleClick("/signup")}
                      className={`${classes.button} ${classes.buttonContained}`}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
      <Toolbar /> {/* This empty toolbar creates space below the AppBar */}
    </div>
  )
}

export default Navbar
