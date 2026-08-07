/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Chip, Stack, Typography } from "@mui/material";
import RemainingTime from "./RemainingTime";
import ActionButton from "./ActionButton";
export interface BidColumn {
  id: string;
  label: string;
  minWidth?: number;
  width?: number;
  align?: "left" | "center" | "right";
  render?: (row: any) => React.ReactNode;
}

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTotalDistance = (row: any) => {
  const routes = row.allocations?.[0]?.route ?? [];
  return routes.reduce((total: number, route: any) => {
    const distance = parseFloat(
      String(route.distance ?? "0").replace(" km", ""),
    );
    return total + (isNaN(distance) ? 0 : distance);
  }, 0);
};

export const bidColumns = (
  tab: "all" | "new" | "responded",
  carrierId: string,
): BidColumn[] => {
  const columns: BidColumn[] = [
    {
      id: "rfq",
      label: "Freight RFQ",
      minWidth: 180,
      render: (row) => (
        <Stack spacing={0.5}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {row.order_ID}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {row.order_type || "Standard Shipment"}
          </Typography>
        </Stack>
      ),
    },

    {
      id: "remaining",
      label: "Remaining Time",
      width: 140,
      render: (row) => <RemainingTime bidEndTime={row.bid_closing_time} />,
    },

    {
      id: "departure",
      label: "Departure",
      minWidth: 180,
      render: (row) => (
        <Stack spacing={0.5}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {formatDate(row.expected_pickup ?? row.bid_start_time)}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Pickup
          </Typography>
        </Stack>
      ),
    },

    {
      id: "arrival",
      label: "Arrival",
      minWidth: 180,
      render: (row) => (
        <Stack spacing={0.5}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {formatDate(row.expected_delivery)}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Delivery
          </Typography>
        </Stack>
      ),
    },

    {
      id: "source",
      label: "Departure Location",
      minWidth: 220,
      render: (row) => (
        <Typography
          sx={{
            fontSize: 13,
          }}
        >
          {row.start_loc_ID ?? row.route?.start_loc_ID ?? "-"}
        </Typography>
      ),
    },

    {
      id: "destination",
      label: "Arrival Location",
      minWidth: 220,
      render: (row) => (
        <Typography
          sx={{
            fontSize: 13,
          }}
        >
          {row.end_loc_ID ?? row.route?.end_loc_ID ?? "-"}
        </Typography>
      ),
    },

    {
      id: "stops",
      label: "Stops",
      width: 90,
      align: "center",
      render: (row) => (
        <Chip
          size="small"
          label={row.allocations?.[0]?.route?.length ?? 0}
          sx={{
            bgcolor: "#FFF3E0",
            color: "#F68B1F",
            fontWeight: 700,
          }}
        />
      ),
    },

    {
      id: "weight",
      label: "Weight",
      width: 120,
      align: "center",
      render: (row) => (
        <Typography
          sx={{
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {row.total_weight ? `${row.total_weight} kg` : "-"}
        </Typography>
      ),
    },

    {
      id: "distance",
      label: "Distance",
      width: 120,
      align: "center",
      render: (row) => (
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {getTotalDistance(row)} km
        </Typography>
      ),
    },

    {
      id: "status",
      label: "Status",
      width: 130,
      align: "center",
      render: (row) => (
        <Chip
          size="small"
          label={row.bid_status}
          color={
            row.bid_status === "finalised"
              ? "success"
              : row.bid_status === "open"
                ? "warning"
                : "default"
          }
        />
      ),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 180,
      render: (row) => <ActionButton row={row} />,
    },
  ];

  if (tab === "new") {
    columns.splice(
      columns.length - 1,
      0,

      {
        id: "myBidAmount",
        label: "Your Bid Amount",
        minWidth: 160,
        align: "center",
        render: (row) => {
          const myBid = row.all_bids?.find(
            (bid: any) => bid.bid_from === carrierId,
          );

          return (
            <Typography sx={{ fontWeight: 600 }}>
              {myBid ? `₹${myBid.bid_amount}` : "Not Bided"}
            </Typography>
          );
        },
      },

      {
        id: "myBidTime",
        label: "Bid Placed At",
        minWidth: 180,
        align: "center",
        render: (row) => {
          const myBid = row.all_bids?.find(
            (bid: any) => bid.bid_from === carrierId,
          );

          return (
            <Typography>
              {myBid ? formatDate(myBid.bid_placed_at) : "--"}
            </Typography>
          );
        },
      },
    );
  }
  if (tab === "responded") {
    columns.splice(columns.length - 1, 0, {
      id: "yourBid",
      label: "Your Bid Amount",
      minWidth: 170,
      align: "center",
      render: (row) => {
        const myBid = row.all_bids[0].bid_amount;
        return (
          <Typography sx={{ fontWeight: 600 }}>
            {myBid ? `₹${myBid}` : "-"}
          </Typography>
        );
      },
    });
  }

  /**
   * Extra columns for Responded tab
   */
  if (tab === "responded") {
    columns.splice(
      columns.length - 1,
      0,

      {
        id: "finalisedCarrier",
        label: "Finalised Carrier",
        minWidth: 170,
        align: "center",
        render: (row) => {
          if (row.bid_status !== "finalised") {
            return <Typography color="text.secondary">-</Typography>;
          }

          return (
            <Typography
              sx={{
                fontWeight: 600,
                color: "#2E7D32",
              }}
            >
              {row.finalised_bid?.finalised_for ?? "-"}
            </Typography>
          );
        },
      },

      {
        id: "finalisedBid",
        label: "Finalised Bid",
        minWidth: 150,
        align: "center",
        render: (row) => {
          if (row.bid_status !== "finalised") {
            return <Typography color="text.secondary">-</Typography>;
          }

          return (
            <Typography
              sx={{
                fontWeight: 700,
                color: "#2E7D32",
              }}
            >
              ₹{row.finalised_bid?.finalised_bid ?? "-"}
            </Typography>
          );
        },
      },
    );
  }

  return columns;
};
