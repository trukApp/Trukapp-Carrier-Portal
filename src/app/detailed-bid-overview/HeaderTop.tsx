// "use client";
// import React from "react";
// import { Box, Chip, Stack, Typography } from "@mui/material";
// import { BidHeaderProps } from "@/types/DetailedBidTypes";
// interface HeaderTopProps extends BidHeaderProps {
//   remainingTime: string;
// }

// const HeaderTop: React.FC<HeaderTopProps> = ({
//   order,
//   bidStatus,
//   remainingTime,
// }) => {
//   return (
//     <Box
//       sx={{
//         background: "#ffffff",
//         borderRadius: 3,
//         border: "1px solid #F4D3AA",
//         overflow: "hidden",
//         mb: 3,
//       }}
//     >
//       <Box
//         sx={{
//           background: "linear-gradient(90deg,#F68B1F 0%,#F08C24 100%)",
//           color: "#fff",
//           px: 4,
//           py: 3,
//         }}
//       >
//         <Stack
//           direction={{
//             xs: "column",
//             md: "row",
//           }}
//           sx={{ justifyContent: "space-between" }}
//           spacing={2}
//         >
//           <Box>
//             <Typography
//               variant="caption"
//               sx={{
//                 opacity: 0.9,
//                 // letterSpacing: 1,
//                 fontSize: 16,
//                 fontWeight: 600,
//               }}
//             >
//               FREIGHT RFQ
//             </Typography>

//             <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 16 }}>
//               {order?.order_ID ?? "-"}
//             </Typography>
//           </Box>

//           <Stack
//             alignItems={{
//               xs: "flex-start",
//               md: "flex-end",
//             }}
//             spacing={1}
//           >
//             <Chip
//               label={bidStatus ?? order?.order_status ?? "-"}
//               sx={{
//                 bgcolor: "#fff",
//                 color: "#F68B1F",
//                 fontWeight: 700,
//                 textTransform: "capitalize",
//               }}
//             />

//             <Typography variant="body2">Remaining Time</Typography>

//             <Typography variant="h5" sx={{ fontWeight: 500, fontSize: 15 }}>
//               {remainingTime}
//             </Typography>
//           </Stack>
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default HeaderTop;

"use client";

import React from "react";

import { Box, Button, Chip, Stack, Typography } from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { BidHeaderProps } from "@/types/DetailedBidTypes";

interface HeaderTopProps extends BidHeaderProps {
  remainingTime: string;
  existingBid?: {
    bid_amount: string;
    bid_placed_at: string;
    bid_from: string;
  } | null;
  lowestBid?: number | null;
  onPlaceBid: () => void;
  bidStatus: string;
}

const HeaderTop: React.FC<HeaderTopProps> = ({
  order,
  bidStatus,
  remainingTime,
  existingBid,
  lowestBid,
  onPlaceBid,
}) => {
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
          sx={{
            justifyContent: "space-between",
          }}
          spacing={2}
        >
          {/* Left Section */}

          <Box>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.9,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              FREIGHT RFQ
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              {order?.order_ID ?? "-"}
            </Typography>
          </Box>

          {/* Right Section (updated in Part 2) */}

          <Stack
            spacing={1}
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

            {existingBid ? (
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  minWidth: 240,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
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
