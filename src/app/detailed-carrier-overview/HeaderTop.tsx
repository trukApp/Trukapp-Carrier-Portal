"use client";
import React, { useMemo, useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { CarrierAssignmentData, Order } from "@/types/DetailedBidTypes";
import CarrierAssignmentDialog from "@/Components/DetailedCarrierAssignmentComponent/CarrierAssignmentDialog";
import {
  usePostCarrierRejectigOrderMutation,
  useDockRequestingToPickOrderMutation,
} from "@/api/apiSlice";
import dayjs, { Dayjs } from "dayjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import BiddingAssignmentDialog from "@/Components/DetailedCarrierAssignmentComponent/BidddingAssignmentDialog";
import { Formik, Form } from "formik";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
interface HeaderTopProps {
  order: Order;
  onReject?: () => void;
  onBookDock?: () => void;
  carrierID: string;
  carrierAssignmentData?: CarrierAssignmentData | null;
}

const HeaderTop: React.FC<HeaderTopProps> = ({
  order,
  onReject,
  onBookDock,
  carrierID,
  carrierAssignmentData,
}) => {
  console.log("carrierId: ", carrierID);
  console.log("carrierAssignmentData: ", carrierAssignmentData);
  console.log("order: ", order);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [openBiddingAssignmentDialog, setOpenBiddingAssignmentDialog] =
    useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectOrder, { isLoading: isRejecting }] =
    usePostCarrierRejectigOrderMutation();
  const [openDockDialog, setOpenDockDialog] = useState(false);

  const [requestDockTime, { isLoading: dockRequestLoading }] =
    useDockRequestingToPickOrderMutation();
  const status = useMemo(
    () => (order?.order_status ?? "").toLowerCase(),
    [order?.order_status],
  );

  const handleAccept = () => {
    setOpenAssignmentDialog(true);
  };
  const handleBiddingAccept = () => {
    setOpenBiddingAssignmentDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAssignmentDialog(false);
  };
  const handleCloseBiddingDialog = () => {
    setOpenBiddingAssignmentDialog(false);
  };

  const getStatusColor = () => {
    switch (status) {
      case "carrier assignment":
        return "warning";
      case "carrier confirmed":
        return "success";
      case "carrier rejected":
        return "error";
      case "open bidding":
        return "info";
      default:
        return "default";
    }
  };

  const handleCloseRejectDialog = () => {
    if (isRejecting) return;
    setOpenRejectDialog(false);
  };

  const handleRejectOrder = async () => {
    try {
      await rejectOrder({
        carrier_ID: carrierID,
        order_ID: order.order_ID,
      }).unwrap();

      setOpenRejectDialog(false);

      onReject?.();
    } catch (error) {
      console.error("Failed to reject order", error);
    }
  };

  const handleRequestDockTime = async (values: {
    // assignmentDateTime: Date;
    assignmentDateTime: Dayjs;
  }) => {
    // const date = new Date(values.assignmentDateTime);
    const date = values.assignmentDateTime.toDate();

    const pad = (n: number) => n.toString().padStart(2, "0");

    const formatted =
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
      `T${pad(date.getHours())}:${pad(date.getMinutes())}`;

    try {
      await requestDockTime({
        cas_ID: carrierAssignmentData?.cas_ID,
        order_ID: order.order_ID,
        dock_time_requested: formatted,
      }).unwrap();

      setOpenDockDialog(false);

      onBookDock?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          background: "#fff",
          borderRadius: 3,
          border: "1px solid #F4D3AA",
          overflow: "hidden",
          mb: 3,
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(90deg,#F68B1F 0%,#F08C24 100%)",
            color: "#fff",
            px: 4,
            py: 3,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
            }}
          >
            {/* Left Section */}

            <Box>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.9,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                FREIGHT RFQ
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mt: 0.5,
                  fontWeight: 700,
                }}
              >
                {order?.order_ID}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mt: 1 }}
              >
                <Typography variant="body2">Status:</Typography>
                <Chip
                  size="small"
                  label={order?.order_status ?? "-"}
                  color={getStatusColor()}
                  sx={{
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Box>

            {/* Right Section */}

            <Stack direction="row" spacing={2}>
              {status === "carrier assignment" && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<CancelOutlinedIcon />}
                    // onClick={onReject}
                    onClick={() => setOpenRejectDialog(true)}
                    color="error"
                    sx={{
                      // color: "error",
                      borderColor: "#fff",
                      bgcolor: "#fff",

                      "&:hover": {
                        borderColor: "#fff",
                        bgcolor: "rgba(255,255,255,.12)",
                      },
                    }}
                  >
                    Reject
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<TaskAltIcon />}
                    onClick={handleAccept}
                    sx={{
                      bgcolor: "#2E7D32",

                      "&:hover": {
                        bgcolor: "#1B5E20",
                      },
                    }}
                  >
                    Accept
                  </Button>
                </>
              )}
              {status === "bidding finalised" && (
                <>
                  {/* <Button
                    variant="outlined"
                    startIcon={<CancelOutlinedIcon />}
                    // onClick={onReject}
                    onClick={() => setOpenRejectDialog(true)}
                    color="error"
                    sx={{
                      // color: "error",
                      borderColor: "#fff",
                      bgcolor: "#fff",

                      "&:hover": {
                        borderColor: "#fff",
                        bgcolor: "rgba(255,255,255,.12)",
                      },
                    }}
                  >
                    Reject
                  </Button> */}

                  <Button
                    variant="contained"
                    startIcon={<TaskAltIcon />}
                    onClick={handleBiddingAccept}
                    sx={{
                      bgcolor: "#2E7D32",

                      "&:hover": {
                        bgcolor: "#1B5E20",
                      },
                    }}
                  >
                    Accept
                  </Button>
                </>
              )}

              {status === "carrier confirmed" &&
                carrierAssignmentData?.dock_allocation_status === "Pending" && (
                  <Button
                    variant="contained"
                    startIcon={<CalendarMonthOutlinedIcon />}
                    // onClick={onBookDock}
                    onClick={() => setOpenDockDialog(true)}
                    sx={{
                      bgcolor: "#1565C0",
                      "&:hover": {
                        bgcolor: "#0D47A1",
                      },
                    }}
                  >
                    Book Dock Appointment
                  </Button>
                )}
            </Stack>
          </Stack>
        </Box>
      </Box>

      <CarrierAssignmentDialog
        open={openAssignmentDialog}
        carrierId={carrierID}
        orderId={order.order_ID}
        onClose={handleCloseDialog}
      />
      <BiddingAssignmentDialog
        open={openBiddingAssignmentDialog}
        carrierId={carrierID}
        orderId={order.order_ID}
        onClose={handleCloseBiddingDialog}
      />
      <Dialog
        open={openRejectDialog}
        onClose={handleCloseRejectDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}
        >
          Reject Order
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to reject this carrier assignment?
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontWeight: 600,
            }}
          >
            {order.order_ID}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
          }}
        >
          <Button onClick={handleCloseRejectDialog} disabled={isRejecting}>
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleRejectOrder}
            disabled={isRejecting}
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDockDialog}
        onClose={() => !dockRequestLoading && setOpenDockDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}
        >
          Book Dock Appointment
        </DialogTitle>

        <Formik
          initialValues={{
            // assignmentDateTime: new Date(),
            assignmentDateTime: dayjs(),
          }}
          onSubmit={handleRequestDockTime}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <DialogContent>
                {/* <DateTimePicker
                  label="Select Dock Date & Time"
                  value={values.assignmentDateTime}
                  onChange={(value) =>
                    setFieldValue(
                      "assignmentDateTime",
                      value ? new Date(value) : null,
                    )
                  }
                  minDateTime={new Date()} */}
                {/* <DateTimePicker
                  label="Select Dock Date & Time"
                  value={values.assignmentDateTime}
                  onChange={(value) =>
                    setFieldValue("assignmentDateTime", value)
                  }
                  minDateTime={dayjs()}
                  slots={{
                    textField: TextField,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                    },
                  }}
                /> */}
                <DateTimePicker
                  label="Select Dock Date &Time"
                  value={values.assignmentDateTime}
                  onChange={(value) =>
                    setFieldValue("assignmentDateTime", value)
                  }
                  minDateTime={dayjs()}
                  // enableAccessibleFieldDOMStructure={false}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                />
              </DialogContent>

              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                  onClick={() => setOpenDockDialog(false)}
                  disabled={dockRequestLoading}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={dockRequestLoading}
                >
                  {dockRequestLoading ? "Submitting..." : "Submit"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default HeaderTop;
