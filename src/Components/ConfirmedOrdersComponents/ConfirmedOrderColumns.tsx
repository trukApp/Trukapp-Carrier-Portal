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

  if (isNaN(date.getTime())) return value;

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AssignmentColumns({
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
            {row.cas_ID}
          </Typography>
        </Stack>
      ),
    },

    {
      field: "pickup",
      headerName: "Pickup",
      flex: 1.2,

      renderCell: ({ row }) => {
        const location = locationMap[row.start_loc_ID];

        return (
          <Stack spacing={0.3}>
            <Typography sx={{ fontWeight: 600 }}>
              {location?.city ?? "-"}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {location?.state}, {location?.country}
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
        const location = locationMap[row.end_loc_ID];

        return (
          <Stack spacing={0.3}>
            <Typography sx={{ fontWeight: 600 }}>
              {location?.city ?? "-"}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {location?.state}, {location?.country}
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
      width: 110,

      renderCell: ({ row }) => (
        <Typography>
          {row.total_distance ?? row.assignment_cost?.total_distance} km
        </Typography>
      ),
    },

    {
      field: "weight",
      headerName: "Weight",
      width: 120,

      renderCell: ({ row }) => (
        <Typography>
          {Number(row.total_weight ?? 0).toLocaleString()} kg
        </Typography>
      ),
    },

    {
      field: "vehicle",
      headerName: "Vehicle",
      width: 140,

      renderCell: ({ row }) => (
        <Typography>{row.vehicle_num ?? "-"}</Typography>
      ),
    },

    {
      field: "driver",
      headerName: "Driver",
      width: 170,

      renderCell: ({ row }) => (
        <Stack spacing={0.3}>
          <Typography>{row.driver_data?.c_driver_name ?? "-"}</Typography>

          <Typography variant="caption" color="text.secondary">
            {row.driver_data?.c_driver_number ?? ""}
          </Typography>
        </Stack>
      ),
    },

    {
      field: "dock",
      headerName: "Dock",
      width: 150,

      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.dock_allocation_status ?? "-"}
          color={
            row.dock_allocation_status === "Allocated" ? "success" : "warning"
          }
        />
      ),
    },

    {
      field: "status",
      headerName: "Assignment",
      width: 170,

      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.assignment_status}
          color="success"
          variant="outlined"
        />
      ),
    },

    {
      field: "assigned",
      headerName: "Assigned Time",
      width: 180,

      renderCell: ({ row }) => (
        <Typography>{formatDate(row.assigned_time)}</Typography>
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
