// "use client";
// import React from "react";
// import { Box, Stack, Typography } from "@mui/material";
// import { Order } from "@/types/DetailedBidTypes";

// interface HeaderTopProps {
//   order: Order;
// }

// const HeaderTop: React.FC<HeaderTopProps> = ({ order }) => {
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
//           sx={{
//             justifyContent: "space-between",
//           }}
//           spacing={2}
//         >
//           {/* Left Section */}

//           <Box>
//             <Typography
//               variant="caption"
//               sx={{
//                 opacity: 0.9,
//                 fontSize: 16,
//                 fontWeight: 600,
//               }}
//             >
//               FREIGHT RFQ
//             </Typography>

//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 500,
//                 fontSize: 16,
//               }}
//             >
//               {order?.order_ID ?? "-"}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default HeaderTop;

"use client";

import React from "react";

import { Box, Button, Stack, Typography } from "@mui/material";

// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { Order } from "@/types/DetailedBidTypes";

interface HeaderTopProps {
  order: Order;
  onAccept?: () => void;
  onReject?: () => void;
}

const HeaderTop: React.FC<HeaderTopProps> = ({ order, onAccept, onReject }) => {
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
          direction={{ xs: "column", md: "row" }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
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

          {/* Right Section */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<CancelOutlinedIcon />}
              onClick={onReject}
              sx={{
                borderColor: "#fff",
                color: "#fff",
                minWidth: 120,
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
                color: "#fff",
                minWidth: 120,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#1B5E20",
                },
              }}
            >
              Accept
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeaderTop;
