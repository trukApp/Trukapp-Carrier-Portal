"use client";
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

interface BidPlaceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
  orderId: string;
  remainingTime: string;
  targetAmount: string;
  lowestBid?: number | null;
  startLocation: string;
  endLocation: string;
  bidAmount: string;
  setBidAmount: React.Dispatch<React.SetStateAction<string>>;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <Stack
    direction="row"
    spacing={2}
    sx={{
      height: "100%",
      alignItems: "flex-start",
    }}
  >
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        bgcolor: "#FFF4E8",
        color: "#F68B1F",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>

    <Box sx={{ flex: 1 }}>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          color: "text.secondary",
          fontWeight: 600,
          mb: 0.5,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 17,
          fontWeight: 700,
          lineHeight: 1.35,
          wordBreak: "break-word",
        }}
      >
        {value}
      </Typography>
    </Box>
  </Stack>
);

const RouteInfo = ({
  startLocation,
  endLocation,
}: {
  startLocation: string;
  endLocation: string;
}) => (
  <Stack
    direction="row"
    spacing={1}
    sx={{ alignItems: "center", flexWrap: "wrap" }}
  >
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: 12,
      }}
    >
      {startLocation || "-"}
    </Typography>
    <TrendingFlatIcon
      sx={{
        color: "#F68B1F",
      }}
    />

    <Typography
      sx={{
        fontWeight: 700,
        fontSize: 12,
      }}
    >
      {endLocation || "-"}
    </Typography>
  </Stack>
);

const BidPlaceDialog: React.FC<BidPlaceDialogProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  orderId,
  remainingTime,
  targetAmount,
  lowestBid,
  startLocation,
  endLocation,
  bidAmount,
  setBidAmount,
}) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="md"
      fullWidth
      sx={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(90deg,#FFF8EF 0%,#FFFFFF 100%)",
          borderBottom: "1px solid #EAECF0",
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Place Your Bid
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            Order #{orderId}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 3,
        }}
      >
        <Stack spacing={3}>
          {/* Bid Information */}

          <Box
            sx={{
              border: "1px solid #ECECEC",
              borderRadius: 3,
              bgcolor: "#FCFCFD",
              p: 3,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: 16,
              }}
            >
              Bid Information
            </Typography>

            <Grid container spacing={3}>
              {/* Order ID */}

              <Grid size={{ xs: 12, md: 6 }}>
                <InfoItem
                  icon={<LocalShippingOutlinedIcon fontSize="small" />}
                  label="Order ID"
                  value={orderId}
                />
              </Grid>

              {/* Remaining Time */}

              <Grid size={{ xs: 12, md: 6 }}>
                <InfoItem
                  icon={<AccessTimeOutlinedIcon fontSize="small" />}
                  label="Remaining Time"
                  value={
                    <Typography
                      component="span"
                      sx={{
                        color: "#D32F2F",
                        fontWeight: 700,
                        fontSize: 17,
                      }}
                    >
                      {remainingTime}
                    </Typography>
                  }
                />
              </Grid>

              {/* Route */}

              <Grid size={{ xs: 12 }}>
                <InfoItem
                  icon={<LocationOnOutlinedIcon fontSize="small" />}
                  label="Route"
                  value={
                    <RouteInfo
                      startLocation={startLocation}
                      endLocation={endLocation}
                    />
                  }
                />
              </Grid>

              {/* Pricing */}

              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    mt: 1,
                    p: 2.5,
                    border: "1px solid #ECECEC",
                    borderRadius: 2,
                    bgcolor: "#FFFFFF",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem
                        icon={<CurrencyRupeeOutlinedIcon fontSize="small" />}
                        label="Target Bid"
                        value={
                          <Typography
                            sx={{
                              color: "#2E7D32",
                              fontWeight: 700,
                              fontSize: 18,
                            }}
                          >
                            ₹ {Number(targetAmount).toLocaleString("en-IN")}
                          </Typography>
                        }
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem
                        icon={<CurrencyRupeeOutlinedIcon fontSize="small" />}
                        label="Lowest Bid"
                        value={
                          <Typography
                            sx={{
                              color: lowestBid != null ? "#1565C0" : "#667085",
                              fontWeight: 700,
                              fontSize: 18,
                            }}
                          >
                            {lowestBid != null
                              ? `₹ ${lowestBid.toLocaleString("en-IN")}`
                              : "No bids yet"}
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* ---------- PART 2 STARTS HERE ---------- */}
          {/* Bid Amount */}

          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Enter Your Bid Amount
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter your bid amount"
              value={bidAmount}
              disabled={loading}
              type="number"
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  setBidAmount(value);
                }
              }}
              InputProps={{
                startAdornment: (
                  <Typography
                    sx={{
                      mr: 1.5,
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#F68B1F",
                    }}
                  >
                    ₹
                  </Typography>
                ),
                sx: {
                  height: 58,
                  borderRadius: 2,
                  fontSize: 18,
                  fontWeight: 600,
                },
              }}
            />

            {bidAmount && Number(bidAmount) > Number(targetAmount) && (
              <Typography
                sx={{
                  mt: 1,
                  color: "#D32F2F",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Your bid exceeds the target amount. Consider lowering it to
                improve your chances.
              </Typography>
            )}
          </Box>

          <Divider />

          {/* Bid Preview */}

          {bidAmount && (
            <Box
              sx={{
                border: "1px solid #F4D3AA",
                borderRadius: 3,
                bgcolor: "#FFF8F1",
                p: 3,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Bid Preview
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Your Bid
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#F68B1F",
                    }}
                  >
                    ₹ {Number(bidAmount).toLocaleString("en-IN")}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Difference from Target
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 24,
                      fontWeight: 700,
                      color:
                        Number(bidAmount) <= Number(targetAmount)
                          ? "#2E7D32"
                          : "#D32F2F",
                    }}
                  >
                    ₹{" "}
                    {Math.abs(
                      Number(targetAmount) - Number(bidAmount),
                    ).toLocaleString("en-IN")}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  {lowestBid == null ? (
                    <Typography
                      sx={{
                        color: "#667085",
                        fontWeight: 500,
                      }}
                    >
                      No bids have been placed yet.
                    </Typography>
                  ) : Number(bidAmount) < lowestBid ? (
                    <Box
                      sx={{
                        bgcolor: "#ECFDF3",
                        border: "1px solid #ABEFC6",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#027A48",
                          fontWeight: 700,
                        }}
                      >
                        ✅ Congratulations!
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.5,
                          color: "#027A48",
                        }}
                      >
                        Your bid is currently the lowest bid.
                      </Typography>
                    </Box>
                  ) : Number(bidAmount) === lowestBid ? (
                    <Box
                      sx={{
                        bgcolor: "#FFF8E1",
                        border: "1px solid #FFE082",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#B26A00",
                          fontWeight: 700,
                        }}
                      >
                        ⚖ Matching Lowest Bid
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.5,
                          color: "#B26A00",
                        }}
                      >
                        Your bid matches the current lowest bid.
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        bgcolor: "#FEF3F2",
                        border: "1px solid #FECDCA",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#B42318",
                          fontWeight: 700,
                        }}
                      >
                        Another carrier currently has a lower bid.
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.5,
                          color: "#B42318",
                        }}
                      >
                        Lowest bid is ₹ {lowestBid.toLocaleString("en-IN")}.
                        Reduce your bid to become the leading bidder.
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}

          {/* ---------- PART 3 STARTS HERE ---------- */}
          <Divider />

          {/* Action Buttons */}

          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={2}
            sx={{ mt: 1, justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={loading}
              sx={{
                minWidth: 140,
                height: 46,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#D0D5DD",
                color: "#344054",

                "&:hover": {
                  borderColor: "#98A2B3",
                  backgroundColor: "#F9FAFB",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              disableElevation
              disabled={
                loading ||
                !bidAmount ||
                Number(bidAmount) <= 0 ||
                remainingTime === "Bid Closed"
              }
              onClick={onSubmit}
              sx={{
                minWidth: 180,
                height: 46,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 15,
                background: "linear-gradient(90deg,#F68B1F 0%,#FF9F43 100%)",

                boxShadow: "0 8px 20px rgba(246,139,31,.25)",

                "&:hover": {
                  background: "linear-gradient(90deg,#EA7D0B 0%,#F68B1F 100%)",
                },

                "&:disabled": {
                  background: "#E4E7EC",
                  color: "#98A2B3",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <CircularProgress
                    size={18}
                    sx={{
                      color: "#fff",
                    }}
                  />

                  <Typography
                    component="span"
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Placing Bid...
                  </Typography>
                </Stack>
              ) : (
                "Place Bid"
              )}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default BidPlaceDialog;
