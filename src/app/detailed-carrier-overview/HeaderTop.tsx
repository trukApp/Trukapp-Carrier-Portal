"use client";
import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Order } from "@/types/DetailedBidTypes";
interface HeaderTopProps {
  order: Order;
  onAccept?: () => void;
  onReject?: () => void;
  onBookDock?: () => void;
}

const HeaderTop: React.FC<HeaderTopProps> = ({
  order,
  onAccept,
  onReject,
  onBookDock,
}) => {
  const status = (order?.order_status ?? "").toLowerCase();
  console.log("order: ", order);

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "warning";
      case "carrier confirmed":
        return "success";
      case "carrier rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
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
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
          }}
          spacing={2}
        >
          {/* Left */}
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
                fontWeight: 700,
                mt: 0.5,
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
                sx={{ fontWeight: 600 }}
              />
            </Stack>
          </Box>

          {/* Right */}
          <Stack direction="row" spacing={2}>
            {status === "pending" && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<CancelOutlinedIcon />}
                  onClick={onReject}
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    "&:hover": {
                      borderColor: "#fff",
                      bgcolor: "rgba(255,255,255,0.12)",
                    },
                  }}
                >
                  Reject
                </Button>

                <Button
                  variant="contained"
                  startIcon={<TaskAltIcon />}
                  onClick={onAccept}
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

            {status === "carrier confirmed" && (
              <Button
                variant="contained"
                startIcon={<CalendarMonthOutlinedIcon />}
                onClick={onBookDock}
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
  );
};

export default HeaderTop;
