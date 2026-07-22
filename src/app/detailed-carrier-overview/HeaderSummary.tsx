"use client";

import React, { useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AltRouteOutlinedIcon from "@mui/icons-material/AltRouteOutlined";
import SummaryCard from "./SummaryCard";
import RouteCard from "./RouteCard";
import { BidHeaderProps } from "@/types/DetailedBidTypes";

const HeaderSummary: React.FC<BidHeaderProps> = ({ order }) => {
  const allocation = order?.allocations?.[0];
  const route = allocation?.route ?? [];
  const departure = route[0];
  const arrival = route[route.length - 1];
  const totalStops = useMemo(() => Math.max(route.length - 1, 0), [route]);
  const totalDistance = useMemo(() => {
    return route.reduce((sum: number, item: any) => {
      const distance = item.distance ?? 0;

      const value =
        typeof distance === "number"
          ? distance
          : parseFloat(String(distance).replace(/[^\d.]/g, ""));

      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }, [route]);
  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {/* <SummaryCard
            title="Distance"
            value={order.total_distance ?? "-"}
            // value={${totalDistance.toLocaleString()} km}
            icon={<StraightenOutlinedIcon />}
          /> */}
          <SummaryCard
            title="Distance"
            value={
              totalDistance != null
                ? `${totalDistance.toLocaleString()} km`
                : "-"
            }
            icon={<StraightenOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Weight"
            value={order.total_weight ?? "-"}
            icon={<ScaleOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Vehicle"
            value={allocation?.vehicle_ID ?? "-"}
            icon={<LocalShippingOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Stops"
            value={totalStops}
            icon={<AltRouteOutlinedIcon />}
          />
        </Grid>
      </Grid>

      {/* Route Overview */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "#000000", mb: 1, fontSize: 20 }}
        >
          Route Overview
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
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
    </Box>
  );
};

export default HeaderSummary;
