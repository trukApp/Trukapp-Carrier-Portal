"use client";
import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { Order } from "@/types/DetailedBidTypes";
export interface BidHeaderProps {
  order: Order;
  bidAmount?: string;
  remainingTime?: string;
  existingBid?: {
    bid_amount: string;
    bid_placed_at: string;
    bid_from: string;
  } | null;
  lowestBid?: number | null;
  onPlaceBid?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  bidStatus?: string;
  carrierID?: string;
  isBidFinalised?: boolean;
  finalisedBid?: {
    finalised_bid: string;
    finalised_for: string;
  } | null;
  isFinalisedForCurrentCarrier?: boolean;
}

const HeaderTop = ({
  order,
  bidStatus,
  remainingTime,
  existingBid,
  lowestBid,
  onPlaceBid,
  isBidFinalised,
  finalisedBid,
  isFinalisedForCurrentCarrier,
  bidAmount,
}: BidHeaderProps) => {
  return (
    <Box
      sx={{
        background: "#ffffff",
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
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{ justifyContent: "space-between" }}
          spacing={2}
        >
          {/* Left Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              Freight RFQ
            </Typography>

            <Typography
              sx={{
                fontSize: 34,
                fontWeight: 700,
                mt: 0.5,
                letterSpacing: 1,
              }}
            >
              {order?.order_ID}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "rgba(255,255,255,0.85)",
                fontSize: 15,
              }}
            >
              Transport Request for Quotation
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                mt: 3,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={bidStatus ?? "-"}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.25)",
                  textTransform: "capitalize",
                }}
              />

              <Chip
                label={`RFQ ₹${Number(bidAmount ?? 0).toLocaleString("en-IN")}`}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.25)",
                }}
              />
            </Stack>
          </Box>

          {/* Right Section */}

          <Stack
            spacing={1.5}
            sx={{
              alignItems: {
                xs: "flex-start",
                md: "flex-end",
              },
            }}
          >
            <Chip
              label={bidStatus ?? order?.order_status ?? "-"}
              sx={{
                bgcolor: "#fff",
                color: "#F68B1F",
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            />

            {!isBidFinalised && (
              <>
                <Typography variant="body2">Remaining Time</Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  {remainingTime}
                </Typography>
              </>
            )}

            {/* ===============================
               FINALISED BID UI
            =============================== */}

            {isBidFinalised ? (
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  minWidth: 300,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <EmojiEventsRoundedIcon
                    sx={{
                      color: "#FFE082",
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {isFinalisedForCurrentCarrier
                      ? "Finalised for You"
                      : "Bid Finalised"}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#fff",
                  }}
                >
                  Finalised Carrier :
                  <strong> {finalisedBid?.finalised_for ?? "-"}</strong>
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    color: "#fff",
                  }}
                >
                  Finalised Amount :
                  <strong>
                    {" "}
                    ₹
                    {Number(finalisedBid?.finalised_bid ?? 0).toLocaleString(
                      "en-IN",
                    )}
                  </strong>
                </Typography>

                {existingBid && (
                  <>
                    <Typography
                      sx={{
                        mt: 2,
                        color: "#fff",
                      }}
                    >
                      Your Bid :
                      <strong>
                        {" "}
                        ₹
                        {Number(existingBid.bid_amount).toLocaleString("en-IN")}
                      </strong>
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "rgba(255,255,255,0.85)",
                        mt: 0.5,
                      }}
                    >
                      Placed on{" "}
                      {new Date(existingBid.bid_placed_at).toLocaleString(
                        "en-IN",
                      )}
                    </Typography>
                  </>
                )}
              </Box>
            ) : existingBid ? (
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  minWidth: 260,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      color: "#4CAF50",
                      fontSize: 20,
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    You already bid
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  ₹{Number(existingBid.bid_amount).toLocaleString("en-IN")}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  Placed on{" "}
                  {new Date(existingBid.bid_placed_at).toLocaleString("en-IN")}
                </Typography>
              </Box>
            ) : (
              <Stack
                spacing={1.5}
                sx={{
                  mt: 1,
                  alignItems: {
                    xs: "stretch",
                    md: "flex-end",
                  },
                }}
              >
                {lowestBid !== null && lowestBid !== undefined && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      textAlign: {
                        xs: "left",
                        md: "right",
                      },
                    }}
                  >
                    Lowest Bid:{" "}
                    <strong>₹{lowestBid.toLocaleString("en-IN")}</strong>
                  </Typography>
                )}

                <Button
                  variant="contained"
                  onClick={onPlaceBid}
                  disabled={remainingTime === "Bid Closed"}
                  sx={{
                    bgcolor: "#fff",
                    color: "#F68B1F",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                    "&.Mui-disabled": {
                      bgcolor: "rgba(255,255,255,0.4)",
                      color: "rgba(255,255,255,0.8)",
                    },
                  }}
                >
                  {remainingTime === "Bid Closed"
                    ? "Bidding Closed"
                    : "Place Bid"}
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeaderTop;
