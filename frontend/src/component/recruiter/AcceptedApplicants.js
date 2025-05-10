"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core"
import { Checkbox } from "@material-ui/core"

const AcceptedApplicants = () => {
  const [acceptedApplicants, setAcceptedApplicants] = useState([])
  const [selectedApplicants, setSelectedApplicants] = useState([])
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [openRejectionDialog, setOpenRejectionDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    // Fetch accepted applicants from API endpoint
    const fetchAcceptedApplicants = async () => {
      try {
        const response = await fetch("/api/acceptedApplicants") // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json()
          setAcceptedApplicants(data)
        } else {
          console.error("Failed to fetch accepted applicants:", response.status)
        }
      } catch (error) {
        console.error("Error fetching accepted applicants:", error)
      }
    }

    fetchAcceptedApplicants()
  }, [])

  const handleApplicantSelection = (applicantId) => {
    setSelectedApplicants((prevSelected) =>
      prevSelected.includes(applicantId)
        ? prevSelected.filter((id) => id !== applicantId)
        : [...prevSelected, applicantId],
    )
  }

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true)
  }

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false)
  }

  const handleConfirmRejection = async () => {
    // Send rejection request to API
    try {
      const response = await fetch("/api/rejectApplicants", {
        // Replace with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicantIds: selectedApplicants,
          rejectionReason: rejectionReason,
        }),
      })

      if (response.ok) {
        // Update the state to remove rejected applicants
        setAcceptedApplicants((prevApplicants) =>
          prevApplicants.filter((applicant) => !selectedApplicants.includes(applicant.id)),
        )
        setSelectedApplicants([])
        setRejectionReason("")
        handleCloseRejectionDialog()
      } else {
        console.error("Failed to reject applicants:", response.status)
      }
    } catch (error) {
      console.error("Error rejecting applicants:", error)
    }
  }

  const handleOpenRejectionDialog = () => {
    setOpenRejectionDialog(true)
    setOpenConfirmationDialog(false)
  }

  const handleCloseRejectionDialog = () => {
    setOpenRejectionDialog(false)
  }

  const handleRejectionReasonChange = (event) => {
    setRejectionReason(event.target.value)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="accepted applicants table">
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {acceptedApplicants.map((applicant) => (
              <TableRow key={applicant.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedApplicants.includes(applicant.id)}
                    onChange={() => handleApplicantSelection(applicant.id)}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {applicant.name}
                </TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.phone}</TableCell>
                {/* Add more cells as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenConfirmationDialog}
        disabled={selectedApplicants.length === 0}
      >
        Reject Selected Applicants
      </Button>

      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Rejection"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reject the selected applicants?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOpenRejectionDialog} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRejectionDialog} onClose={handleCloseRejectionDialog}>
        <DialogTitle>Rejection Reason</DialogTitle>
        <DialogContent>
          <DialogContentText>Please provide a reason for rejecting the selected applicants:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="rejection-reason"
            label="Rejection Reason"
            type="text"
            fullWidth
            value={rejectionReason}
            onChange={handleRejectionReasonChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectionDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRejection} color="primary">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AcceptedApplicants
