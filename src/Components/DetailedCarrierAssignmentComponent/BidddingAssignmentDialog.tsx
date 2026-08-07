/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Stack,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DirectionsCarFilledRoundedIcon from "@mui/icons-material/DirectionsCarFilledRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import { usePostCarrierAssigningOrderConfirmMutation } from "@/api/apiSlice";
import SnackbarAlert from "../ReusableComponents/SnackbarAlerts";

interface CarrierAssignmentDialogProps {
  open: boolean;
  carrierId: string;
  orderId: string;
  onClose: () => void;
}

interface FormValues {
  vehicle_num: string;
  driver_name: string;
  driver_number: string;
  driver_license: string;
  device_ID: string;
}

const validationSchema = Yup.object({
  vehicle_num: Yup.string().required("Vehicle Number is required"),
  driver_name: Yup.string().required("Driver Name is required"),
  driver_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid mobile number")
    .required("Driver Mobile Number is required"),
  driver_license: Yup.string().required("Driver License Number is required"),
  device_ID: Yup.string().required("Device ID is required"),
});

const BiddingAssignmentDialog: React.FC<CarrierAssignmentDialogProps> = ({
  open,
  carrierId,
  orderId,
  onClose,
}) => {
  const [confirmCarrierAssignment, { isLoading }] =
    usePostCarrierAssigningOrderConfirmMutation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");
  const formik = useFormik<FormValues>({
    initialValues: {
      vehicle_num: "",
      driver_name: "",
      driver_number: "",
      driver_license: "",
      device_ID: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        await confirmCarrierAssignment({
          carrier_ID: carrierId,
          order_ID: orderId,
          vehicle_num: values.vehicle_num,
          driver_data: {
            c_driver_name: values.driver_name,
            c_driver_number: values.driver_number,
            c_driver_license: values.driver_license,
            c_confirmed_through: "Bidding",
          },
          device_ID: values.device_ID,
          confirmed_time: new Date().toISOString(),
        }).unwrap();
        setSnackbarMessage("Bidding assignment confirmed successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        formik.resetForm();
        onClose();
      } catch (error: any) {
        setSnackbarMessage(
          error?.data?.message ?? "Failed to confirm bidding assignment.",
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.log(error);
      }
    },
  });

  const handleClose = () => {
    if (isLoading) return;
    formik.resetForm();
    onClose();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={(_, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }

          handleClose();
        }}
        maxWidth="md"
        fullWidth
        // PaperProps={{
        //   sx: {
        //     borderRadius: 4,
        //     overflow: "hidden",
        //   },
        // }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg,#F68B1F 0%,#F08C24 100%)",
            color: "#fff",
            px: 3,
            py: 2.5,
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack spacing={0.5}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Confirm Bidding Assignment
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.9,
                }}
              >
                Provide vehicle and driver details to confirm this bidding
                assignment.
              </Typography>
            </Stack>

            <IconButton
              onClick={handleClose}
              disabled={isLoading}
              sx={{
                color: "#fff",
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <form onSubmit={formik.handleSubmit}>
          <DialogContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Vehicle Number"
                  name="vehicle_num"
                  value={formik.values.vehicle_num}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.vehicle_num &&
                    Boolean(formik.errors.vehicle_num)
                  }
                  helperText={
                    formik.touched.vehicle_num && formik.errors.vehicle_num
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <DirectionsCarFilledRoundedIcon
                          sx={{
                            mr: 1,
                            color: "#F68B1F",
                          }}
                        />
                      ),
                    },
                  }}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  label="Driver Name"
                  name="driver_name"
                  value={formik.values.driver_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.driver_name &&
                    Boolean(formik.errors.driver_name)
                  }
                  helperText={
                    formik.touched.driver_name && formik.errors.driver_name
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <PersonRoundedIcon
                          sx={{
                            mr: 1,
                            color: "#F68B1F",
                          }}
                        />
                      ),
                    },
                  }}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  label="Driver Mobile Number"
                  name="driver_number"
                  value={formik.values.driver_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.driver_number &&
                    Boolean(formik.errors.driver_number)
                  }
                  helperText={
                    formik.touched.driver_number && formik.errors.driver_number
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <PhoneRoundedIcon
                          sx={{
                            mr: 1,
                            color: "#F68B1F",
                          }}
                        />
                      ),
                    },
                  }}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  label="Driver License Number"
                  name="driver_license"
                  value={formik.values.driver_license}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.driver_license &&
                    Boolean(formik.errors.driver_license)
                  }
                  helperText={
                    formik.touched.driver_license &&
                    formik.errors.driver_license
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <BadgeRoundedIcon
                          sx={{
                            mr: 1,
                            color: "#F68B1F",
                          }}
                        />
                      ),
                    },
                  }}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  label="Device ID"
                  name="device_ID"
                  value={formik.values.device_ID}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.device_ID && Boolean(formik.errors.device_ID)
                  }
                  helperText={
                    formik.touched.device_ID && formik.errors.device_ID
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <MemoryRoundedIcon
                          sx={{
                            mr: 1,
                            color: "#F68B1F",
                          }}
                        />
                      ),
                    },
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                bgcolor: "#F68B1F",

                "&:hover": {
                  bgcolor: "#E67E22",
                },
              }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <DirectionsCarFilledRoundedIcon />
                )
              }
            >
              {isLoading ? "Confirming..." : "Confirm Assignment"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default BiddingAssignmentDialog;
