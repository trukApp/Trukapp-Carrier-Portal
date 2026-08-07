// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from "react";
// import { Chip, IconButton, Stack, Typography } from "@mui/material";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// interface Props {
//   locationMap: Record<string, any>;
//   onView: (row: any) => void;
// }

// export default function FinalisedBidColumns({ locationMap, onView }: Props) {
//   return [
//     {
//       field: "order_ID",
//       headerName: "Freight Order",
//       minWidth: 170,
//       flex: 1,
//       renderCell: ({ row }: any) => (
//         <Typography sx={{ fontWeight: 600 }}>{row.order_ID}</Typography>
//       ),
//     },

//     {
//       field: "ordering_party",
//       headerName: "Ordering Party",
//       minWidth: 220,
//       flex: 1,
//       renderCell: ({ row }: any) => (
//         <Typography>
//           {row.ordering_party_name ?? row.ordering_party ?? "-"}
//         </Typography>
//       ),
//     },

//     {
//       field: "departure",
//       headerName: "Departure",
//       minWidth: 220,
//       flex: 1,
//       renderCell: ({ row }: any) => (
//         <Stack spacing={0.5}>
//           <Typography sx={{ fontWeight: 600 }}>
//             {locationMap[row.start_loc_ID]?.location_name ?? "-"}
//           </Typography>

//           <Typography variant="caption" color="text.secondary">
//             {locationMap[row.start_loc_ID]?.state ?? ""}
//           </Typography>
//         </Stack>
//       ),
//     },

//     {
//       field: "destination",
//       headerName: "Destination",
//       minWidth: 220,
//       flex: 1,
//       renderCell: ({ row }: any) => (
//         <Stack spacing={0.5}>
//           <Typography sx={{ fontWeight: 600 }}>
//             {locationMap[row.end_loc_ID]?.location_name ?? "-"}
//           </Typography>

//           <Typography variant="caption" color="text.secondary">
//             {locationMap[row.end_loc_ID]?.state ?? ""}
//           </Typography>
//         </Stack>
//       ),
//     },

//     {
//       field: "vehicle_type",
//       headerName: "Vehicle Type",
//       minWidth: 170,
//       flex: 1,
//       renderCell: ({ row }: any) => (
//         <Typography>{row.vehicle_type ?? row.vehicleType ?? "-"}</Typography>
//       ),
//     },

//     {
//       field: "finalised_bid",
//       headerName: "Bid Amount",
//       minWidth: 160,
//       flex: 1,
//       align: "right",
//       headerAlign: "right",
//       renderCell: ({ row }: any) => {
//         const amount = Number(row.finalised_bid?.finalised_bid ?? 0);

//         return (
//           <Typography sx={{ fontWeight: 700 }} color="success.main">
//             ₹{amount.toLocaleString("en-IN")}
//           </Typography>
//         );
//       },
//     },

//     {
//       field: "bid_status",
//       headerName: "Bid Status",
//       minWidth: 170,
//       flex: 1,
//       renderCell: ({ row }: any) => (
//         <Chip
//           label={row.bid_status}
//           color="success"
//           variant="outlined"
//           sx={{
//             fontWeight: 600,
//           }}
//         />
//       ),
//     },

//     {
//       field: "finalised_for",
//       headerName: "Finalised For",
//       minWidth: 180,
//       flex: 1,
//       renderCell: ({ row }: any) => (
//         <Typography sx={{ fontWeight: 600 }}>
//           {row.finalised_bid?.finalised_for ?? "-"}
//         </Typography>
//       ),
//     },

//     {
//       field: "departure_date",
//       headerName: "Departure Date",
//       minWidth: 180,
//       flex: 1,
//       renderCell: ({ row }: any) => (
//         <Typography>
//           {row.departure_date
//             ? new Date(row.departure_date).toLocaleDateString("en-IN")
//             : "-"}
//         </Typography>
//       ),
//     },

//     {
//       field: "action",
//       headerName: "View",
//       sortable: false,
//       filterable: false,
//       minWidth: 100,
//       renderCell: ({ row }: any) => (
//         <IconButton color="primary" onClick={() => onView(row)}>
//           <VisibilityOutlinedIcon />
//         </IconButton>
//       ),
//     },
//   ];
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Chip, IconButton, Stack, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { GridColDef } from "@mui/x-data-grid";

interface Props {
  locationMap: Record<string, any>;
  onView: (row: any) => void;
}

const formatDate = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);

  if (isNaN(date.getTime())) return "-";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function FinalisedBidColumns({
  locationMap,
  onView,
}: Props): GridColDef[] {
  return [
    {
      field: "order_ID",
      headerName: "Freight Order",
      width: 170,

      renderCell: ({ row }) => (
        <Stack spacing={0.4}>
          <Typography sx={{ fontWeight: 700 }}>{row.order_ID}</Typography>

          <Typography variant="caption" color="text.secondary">
            BID #{row.bid_id}
          </Typography>
        </Stack>
      ),
    },

    {
      field: "pickup",
      headerName: "Pickup",
      flex: 1.2,

      renderCell: ({ row }) => {
        const loc = locationMap[row.start_loc_ID];

        return (
          <Stack spacing={0.3}>
            <Typography sx={{ fontWeight: 600 }}>{loc?.city ?? "-"}</Typography>

            <Typography variant="caption" color="text.secondary">
              {loc?.state}, {loc?.country}
            </Typography>
          </Stack>
        );
      },
    },

    {
      field: "destination",
      headerName: "Destination",
      flex: 1.2,

      renderCell: ({ row }) => {
        const loc = locationMap[row.end_loc_ID];

        return (
          <Stack spacing={0.3}>
            <Typography sx={{ fontWeight: 600 }}>{loc?.city ?? "-"}</Typography>

            <Typography variant="caption" color="text.secondary">
              {loc?.state}, {loc?.country}
            </Typography>
          </Stack>
        );
      },
    },

    {
      field: "packages",
      headerName: "Packages",
      width: 100,

      valueGetter: (_, row) => row.allocated_packages?.length ?? 0,
    },

    {
      field: "stops",
      headerName: "Stops",
      width: 90,

      valueGetter: (_, row) => row.allocations?.[0]?.route?.length ?? 0,
    },

    {
      field: "distance",
      headerName: "Distance",
      width: 120,

      renderCell: ({ row }) => <Typography>{row.total_distance} km</Typography>,
    },

    {
      field: "weight",
      headerName: "Weight",
      width: 120,

      renderCell: ({ row }) => (
        <Typography>{Number(row.total_weight).toLocaleString()} kg</Typography>
      ),
    },

    {
      field: "quotedBid",
      headerName: "Quoted Value",
      width: 140,

      renderCell: ({ row }) => (
        <Typography sx={{ fontWeight: 600 }}>
          ₹{Number(row.bid_value).toLocaleString("en-IN")}
        </Typography>
      ),
    },

    {
      field: "finalisedBid",
      headerName: "Finalised Bid",
      width: 150,

      renderCell: ({ row }) => (
        <Typography sx={{ fontWeight: 700, color: "success.main" }}>
          ₹
          {Number(row.finalised_bid?.finalised_bid ?? 0).toLocaleString(
            "en-IN",
          )}
        </Typography>
      ),
    },

    {
      field: "carrier",
      headerName: "Finalised Carrier",
      width: 160,

      renderCell: ({ row }) => (
        <Typography sx={{ fontWeight: 600 }}>
          {row.finalised_bid?.finalised_for ?? "-"}
        </Typography>
      ),
    },

    {
      field: "vehicle",
      headerName: "Vehicle",
      width: 130,

      renderCell: ({ row }) => (
        <Typography>{row.vehicle_num ?? "-"}</Typography>
      ),
    },
    {
      field: "dock",
      headerName: "Dock",
      width: 150,

      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.dock_allocation_status ?? "Pending"}
          color={
            row.dock_allocation_status === "Allocated" ? "success" : "warning"
          }
        />
      ),
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,

      renderCell: ({ row }) => (
        <Chip label={row.bid_status} color="success" variant="outlined" />
      ),
    },

    {
      field: "closing",
      headerName: "Bid Closed",
      width: 180,

      renderCell: ({ row }) => (
        <Typography>{formatDate(row.bid_closing_time)}</Typography>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 90,
      sortable: false,
      filterable: false,

      renderCell: ({ row }) => (
        <IconButton color="primary" onClick={() => onView(row)}>
          <VisibilityOutlinedIcon />
        </IconButton>
      ),
    },
  ];
}
