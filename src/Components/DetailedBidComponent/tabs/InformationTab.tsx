"use client";

import React from "react";
import { Grid, Stack } from "@mui/material";
import InfoCard from "../InfoCard";
import { Allocation, Order } from "@/types/DetailedBidTypes";

interface InformationTabProps {
  order: Order;
  allocation?: Allocation;
  bidData?: any;
}

const InformationTab: React.FC<InformationTabProps> = ({
  order,
  allocation,
  bidData,
}) => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <InfoCard
            title="General Information"
            items={[
              {
                label: "Order ID",
                value: order?.order_ID,
              },
              {
                label: "Order Status",
                value: order?.order_status,
              },
              {
                label: "Scenario",
                value: order?.scenario_label,
              },
              {
                label: "Bid Status",
                value: bidData?.bid_status,
              },
              {
                label: "Created On",
                value: bidData?.bid_start_time,
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoCard
            title="Shipment Summary"
            items={[
              {
                label: "Distance",
                value: order?.total_distance,
              },
              {
                label: "Weight",
                value: allocation?.occupiedWeight,
              },
              {
                label: "Volume",
                value: allocation?.occupiedVolume,
              },
              {
                label: "Stops",
                value: allocation?.route?.length ?? 0,
              },
              {
                label: "Packages",
                value: allocation?.packageDetails?.length ?? 0,
              },
            ]}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <InfoCard
            title="Route Information"
            items={[
              {
                label: "Source",
                value: allocation?.route?.[0]?.start?.address,
              },
              {
                label: "Destination",
                value:
                  allocation?.route?.[allocation.route.length - 1]?.end
                    ?.address,
              },
              {
                label: "Estimated Distance",
                value: order?.total_distance,
              },
              {
                label: "Estimated Duration",
                value: allocation?.route?.[0]?.duration,
              },
            ]}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default InformationTab;
