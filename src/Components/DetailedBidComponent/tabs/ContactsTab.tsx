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

const ContactsTab: React.FC<ContactsTabProps> = ({ order }) => {
  const { data: locationsData } = useGetLocationMasterQuery({});
  const locationMap = useMemo(() => {
    const locations = locationsData?.locations ?? [];
    return locations.reduce((acc: Record<string, any>, location: any) => {
      acc[location.loc_ID] = location;
      return acc;
    }, {});
  }, [locationsData?.locations]);

  /**
   * Ordering Party
   */
  const orderingParty = useMemo(() => {
    if (!order?.start_loc_ID) return null;

    return locationMap[order.start_loc_ID] ?? null;
  }, [order?.start_loc_ID, locationMap]);

  /**
   * Shipment Stops
   */
  const shipmentStops = useMemo(() => {
    const packageDestinations = Array.isArray(order?.package_dest_radius)
      ? order.package_dest_radius
      : [];

    return packageDestinations.map((item: any, index: number) => ({
      id: item.pack_ID,
      stopNo: index + 1,
      packageId: item.pack_ID,
      location: locationMap[item.ship_to] ?? null,
    }));
  }, [order?.package_dest_radius, locationMap]);

  return (
    <Stack spacing={4}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#F68B1F",
        }}
      >
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

        {/* Shipment Stops */}

        {shipmentStops.map((stop) =>
          stop.location ? (
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
                location={stop.location}
              />
            </Grid>
          ) : null,
        )}
      </Grid>
    </Stack>
  );
};

export default ContactsTab;
