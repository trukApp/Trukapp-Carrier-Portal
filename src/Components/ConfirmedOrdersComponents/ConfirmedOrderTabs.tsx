// "use client";
// import React from "react";
// import { Badge, Box, Tab, Tabs } from "@mui/material";
// import { AssignmentTab } from "@/types/carrierAssignment";
// interface Props {
//   value: AssignmentTab;
//   onChange: (value: AssignmentTab) => void;
//   pendingCount: number;
// }
// export default function ConfirmedOrderTabs({
//   value,
//   onChange,
//   pendingCount,
// }: Props) {
//   const handleChange = (_: React.SyntheticEvent, newValue: AssignmentTab) => {
//     onChange(newValue);
//   };

//   const badgeStyle = {
//     "& .MuiBadge-badge": {
//       backgroundColor: "#F68B1F",
//       color: "#fff",
//       fontWeight: 700,
//       minWidth: 22,
//       height: 22,
//       borderRadius: "50%",
//       fontSize: 11,
//     },
//   };

//   return (
//     <Box
//       sx={{
//         borderBottom: "1px solid #ECECEC",
//         mb: 2,
//       }}
//     >
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         variant="scrollable"
//         scrollButtons="auto"
//         textColor="inherit"
//         sx={{
//           "& .MuiTabs-indicator": {
//             backgroundColor: "#F68B1F",
//             height: 3,
//           },

//           "& .MuiTab-root": {
//             textTransform: "none",
//             fontWeight: 600,
//             fontSize: 15,
//             color: "#616161",
//             minHeight: 54,
//             minWidth: 120,
//           },

//           "& .Mui-selected": {
//             color: "#F68B1F !important",
//             fontWeight: 700,
//           },
//         }}
//       >
//         <Tab value="all" label={<Badge sx={badgeStyle}>All</Badge>} />

//         <Tab
//           value="pending"
//           label={
//             <Badge badgeContent={pendingCount} sx={badgeStyle}>
//               Pending
//             </Badge>
//           }
//         />

//         <Tab
//           value="carrier confirmed"
//           label={<Badge sx={badgeStyle}>Confirmed</Badge>}
//         />

//         <Tab
//           value="carrier rejected"
//           label={<Badge sx={badgeStyle}>Rejected</Badge>}
//         />
//         <Tab
//           value="completed"
//           label={<Badge sx={badgeStyle}>Completed</Badge>}
//         />
//       </Tabs>
//     </Box>
//   );
// }

"use client";

import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { ConfirmedOrderTab } from "@/types/ConfirmedOrders";
// import { ConfirmedOrderTab } from "./types";

interface Props {
  value: ConfirmedOrderTab;
  onChange: (value: ConfirmedOrderTab) => void;
}

export default function ConfirmedOrderTabs({ value, onChange }: Props) {
  const handleChange = (
    _: React.SyntheticEvent,
    newValue: ConfirmedOrderTab,
  ) => {
    onChange(newValue);
  };

  return (
    <Box
      sx={{
        borderBottom: "1px solid #ECECEC",
        mb: 2,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#F68B1F",
            height: 3,
          },

          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
            color: "#616161",
            minHeight: 54,
            minWidth: 180,
          },

          "& .Mui-selected": {
            color: "#F68B1F !important",
            fontWeight: 700,
          },
        }}
      >
        <Tab value="assignments" label="Assignments" />

        <Tab value="finalised-bids" label="Finalised Bids" />
      </Tabs>
    </Box>
  );
}
