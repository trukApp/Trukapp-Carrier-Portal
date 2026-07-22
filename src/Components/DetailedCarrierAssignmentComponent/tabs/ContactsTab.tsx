/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useGetLocationMasterQuery } from "@/api/apiSlice";
import ContactCard from "../ContactCard";
import { Allocation, Order } from "@/types/DetailedBidTypes";

interface ContactsTabProps {
  order: Order;
  allocation?: Allocation;
}

const ContactsTab: React.FC<ContactsTabProps> = ({ order, allocation }) => {
  const { data: locationsData } = useGetLocationMasterQuery({});
  const locations = locationsData?.locations ?? [];
  const locationMap = useMemo(() => {
    return locations.reduce((acc: Record<string, any>, location: any) => {
      acc[location.loc_ID] = location;
      return acc;
    }, {});
  }, [locations]);

  const orderingParty = useMemo(() => {
    if (!order?.start_loc_ID) return null;

    return locationMap[order.start_loc_ID];
  }, [locationMap, order]);

  const shipmentStops = useMemo(() => {
    if (!order?.package_dest_radius) return [];

    return order.package_dest_radius.map((item: any, index: number) => ({
      id: item.pack_ID,
      stopNo: index + 1,
      packageId: item.pack_ID,
      radius: item.destination_radius,
      location: locationMap[item.ship_to],
    }));
  }, [allocation, locationMap]);

  return (
    <Stack spacing={4}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#F68B1F" }}>
        Shipment Contacts
      </Typography>

      <Grid container spacing={3}>
        {/* Ordering Party */}

        {orderingParty && (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <ContactCard title="Ordering Party" location={orderingParty} />
          </Grid>
        )}

        {/* Stops */}

        {shipmentStops.map((stop) => (
          <Grid
            key={stop.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <ContactCard
              title={`Stop ${stop.stopNo}`}
              packageId={stop.packageId}
              radius={stop.radius}
              location={stop.location}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ContactsTab;
