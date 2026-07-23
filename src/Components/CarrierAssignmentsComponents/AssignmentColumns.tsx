/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Chip, Stack, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import { CarrierAssignment } from "@/types/carrierAssignment";

interface Props {
  locationMap: Record<string, any>;
  onView: (assignment: CarrierAssignment) => void;
}

const AssignmentStatusChip = ({ status }: { status?: string | null }) => {
  const normalized = (status ?? "").toLowerCase();

  let color: "success" | "warning" | "error" | "default" = "default";

  switch (normalized) {
    case "carrier confirmed":
      color = "success";
      break;

    case "pending":
      color = "warning";
      break;

    case "carrier rejected":
      color = "error";
      break;
  }

  return <Chip size="small" color={color} label={status || "Unknown"} />;
};

export default function getAssignmentColumns({
  locationMap,
  onView,
}: Props): GridColDef[] {
  return [
    {
      field: "order_ID",
      headerName: "Freight Order",
      width: 150,

      renderCell: ({ row }) => (
        <Stack spacing={0.5}>
          <Typography sx={{ fontWeight: 700 }} color="primary">
            {row.order_ID}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {row.cas_ID}
          </Typography>
        </Stack>
      ),
    },

    {
      field: "pickup",
      headerName: "Pickup",
      flex: 1.3,

      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <RouteOutlinedIcon fontSize="small" color="primary" />

          <Typography variant="body2">
            {locationMap[row.start_loc_ID]?.city},
            {locationMap[row.start_loc_ID]?.state},
            {locationMap[row.start_loc_ID]?.country}
          </Typography>
        </Stack>
      ),
    },

    {
      field: "destination",
      headerName: "Destination",
      flex: 1.3,

      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <RouteOutlinedIcon fontSize="small" color="error" />

          <Typography variant="body2">
            {locationMap[row.start_loc_ID]?.city},
            {locationMap[row.start_loc_ID]?.state},
            {locationMap[row.start_loc_ID]?.country}
          </Typography>
        </Stack>
      ),
    },

    {
      field: "packages",
      headerName: "Packages",
      width: 110,
      valueGetter: (_, row) => row.allocated_packages?.length ?? 0,
    },

    {
      field: "stops",
      headerName: "Stops",
      width: 100,
      valueGetter: (_, row) => row.allocations?.[0]?.route?.length ?? 0,
    },

    {
      field: "distance",
      headerName: "Distance",
      width: 120,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>{row.assignment_cost?.total_distance} km</Typography>
        </Stack>
      ),
    },

    {
      field: "weight",
      headerName: "Weight",
      width: 130,

      renderCell: ({ row }) => (
        <Typography>{Number(row.total_weight).toLocaleString()} kg</Typography>
      ),
    },

    {
      field: "cost",
      headerName: "Cost",
      width: 140,

      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          {/* <PaidOutlinedIcon color="success" fontSize="small" /> */}
          <Typography sx={{ fontWeight: 700 }}>
            ₹{Number(row.assignment_cost?.cost).toLocaleString()}
          </Typography>
        </Stack>
      ),
    },

    {
      field: "assignment_status",
      headerName: "Assignment",
      width: 150,

      renderCell: ({ row }) => (
        <AssignmentStatusChip status={row.assignment_status} />
      ),
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 120,

      renderCell: ({ row }) => (
        <Button
          variant="contained"
          size="small"
          startIcon={<VisibilityOutlinedIcon />}
          onClick={() => onView(row)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          View
        </Button>
      ),
    },
  ];
}
