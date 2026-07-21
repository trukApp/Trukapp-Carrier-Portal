"use client";

import React, { useMemo } from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AltRouteOutlinedIcon from "@mui/icons-material/AltRouteOutlined";

import SummaryCard from "./SummaryCard";
import RouteCard from "./RouteCard";
import { BidHeaderProps } from "@/types/DetailedBidTypes";

// import { BidHeaderProps } from "./types";

const HeaderSummary: React.FC<BidHeaderProps> = ({ order, bidAmount }) => {
  const allocation = order.allocations?.[0];

  const route = allocation?.route ?? [];

  const departure = route[0];

  const arrival = route[route.length - 1];

  const totalStops = useMemo(() => Math.max(route.length - 1, 0), [route]);

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard
            title="Bid Amount"
            value={bidAmount ? `₹ ${Number(bidAmount).toLocaleString()}` : "-"}
            icon={<PaymentsOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard
            title="Distance"
            value={order.total_distance ?? "-"}
            icon={<StraightenOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard
            title="Weight"
            value={order.total_weight ?? "-"}
            icon={<ScaleOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard
            title="Vehicle"
            value={allocation?.vehicle_ID ?? "-"}
            icon={<LocalShippingOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SummaryCard
            title="Stops"
            value={totalStops}
            icon={<AltRouteOutlinedIcon />}
          />
        </Grid>
      </Grid>

      {/* Route Overview */}

      <Box mt={4}>
        <Typography variant="h6" fontWeight={700} color="#F68B1F" mb={2}>
          Route Overview
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <RouteCard
              type="departure"
              title="Departure"
              address={departure?.start?.address ?? "-"}
              date={order.created_at}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <RouteCard
              type="arrival"
              title="Arrival"
              address={arrival?.end?.address ?? "-"}
              date={order.updated_at}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Route Statistics */}

      <Box
        mt={4}
        p={3}
        sx={{
          borderRadius: 3,
          background: "#FFF7EF",
          border: "1px solid #F4D3AA",
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">
                Route Distance
              </Typography>

              <Typography fontWeight={700} fontSize={18}>
                {departure?.distance ?? "-"}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">
                Estimated Duration
              </Typography>

              <Typography fontWeight={700} fontSize={18}>
                {departure?.duration ?? "-"}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">
                Allocated Vehicle
              </Typography>

              <Typography fontWeight={700} fontSize={18}>
                {allocation?.vehicle_ID ?? "-"}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HeaderSummary;
