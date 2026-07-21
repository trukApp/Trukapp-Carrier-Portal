// "use client";

// import React from "react";
// import { Button } from "@mui/material";
// // import EditIcon from "@mui/icons-material/Edit";

// interface Props {
//   row: any;
//   onClick?: (row: any) => void;
// }

// export default function ActionButton({ row, onClick }: Props) {
//   return (
//     <Button
//       variant="contained"
//       // startIcon={<EditIcon />}
//       disableElevation
//       onClick={() => onClick?.(row)}
//       sx={{
//         textTransform: "none",
//         fontWeight: 700,
//         borderRadius: 2,
//         px: 2,
//         whiteSpace: "nowrap",
//         backgroundColor: "#F68B1F",
//         "&:hover": {
//           backgroundColor: "#E67E22",
//         },
//         color: "#fff",
//       }}
//     >
//       View Bid
//     </Button>
//   );
// }

"use client";

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  row: any;
}

export default function ActionButton({ row }: Props) {
  const router = useRouter();
  console.log("row", row);
  const handleViewBid = () => {
    router.push(`/detailed-bid-overview?bid_ID=${row.order_ID}`);
  };

  return (
    <Button
      variant="contained"
      disableElevation
      onClick={handleViewBid}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        borderRadius: 2,
        px: 2,
        whiteSpace: "nowrap",
        backgroundColor: "#F68B1F",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#E67E22",
        },
      }}
    >
      View Bid
    </Button>
  );
}
