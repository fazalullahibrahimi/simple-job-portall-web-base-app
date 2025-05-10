"use client"

import { useEffect, useContext } from "react"
import { Redirect } from "react-router-dom"
import { makeStyles, CircularProgress, Typography, Paper } from "@material-ui/core"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

import { SetPopupContext } from "../App"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
  },
  paper: {
    padding: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  icon: {
    fontSize: "4rem",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  progress: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}))

const Logout = (props) => {
  const classes = useStyles()
  const setPopup = useContext(SetPopupContext)

  useEffect(() => {
    // Simulate a delay for better UX
    const timer = setTimeout(() => {
      localStorage.removeItem("token")
      localStorage.removeItem("type")
      setPopup({
        open: true,
        severity: "success",
        message: "Logged out successfully",
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [setPopup])

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <ExitToAppIcon className={classes.icon} />
        <Typography variant="h5" className={classes.title}>
          Logging Out
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Please wait while we securely log you out
        </Typography>
        <CircularProgress className={classes.progress} />
      </Paper>
      <Redirect to="/login" />
    </div>
  )
}

export default Logout
