/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";

import { Grid, Stack } from "@mui/material";

import InfoCard from "../InfoCard";
import RouteTable, { RouteItem } from "../RouteTable";
import { PackageDetail } from "@/types/DetailedBidTypes";

interface TourTabProps {
  order: any;
  allocation?: any;
  allocatedPackageDetails: PackageDetail[];
}

const TourTab: React.FC<TourTabProps> = ({ order, allocation }) => {
  const route = allocation?.route ?? [];
  // console.log("allocatedPackageDetails: ", allocatedPackageDetails);
  console.log("order: ", order);

  const routeData: RouteItem[] = useMemo(
    () =>
      route.map((stop: any, index: number) => ({
        sequence: index + 1,
        location:
          stop.location_name ??
          stop.name ??
          stop.start?.name ??
          stop.end?.name ??
          `Stop ${index + 1}`,
        address: stop.address ?? stop.end?.address ?? stop.end?.address ?? "-",
        arrivalTime: stop.arrival_time ?? stop.eta ?? "-",
        departureTime: stop.departure_time ?? stop.etd ?? "-",
        distance: stop.distance ?? "-",
        duration: stop.duration ?? "-",
        status:
          stop.status ??
          (index === 0
            ? "Completed"
            : index === route.length - 1
              ? "Pending"
              : "Current"),
      })),
    [route],
  );

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

  // const getFormattedRouteDuration = (route: any[] = []): string => {
  //   const totalMinutes = route.reduce((sum: number, item: any) => {
  //     const duration = item.duration ?? "";

  //     const hours = Number(duration.match(/(\d+)\s*hour/)?.[1] ?? 0);
  //     const minutes = Number(duration.match(/(\d+)\s*min/)?.[1] ?? 0);

  //     return sum + hours * 60 + minutes;
  //   }, 0);

  //   const days = Math.floor(totalMinutes / (24 * 60));
  //   const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  //   const minutes = totalMinutes % 60;

  //   const parts: string[] = [];

  //   if (days > 0) {
  //     parts.push(`${days} ${days === 1 ? "day" : "days"}`);
  //   }

  //   if (hours > 0) {
  //     parts.push(`${hours} ${hours === 1 ? "hr" : "hrs"}`);
  //   }

  //   if (minutes > 0) {
  //     parts.push(`${minutes} ${minutes === 1 ? "min" : "mins"}`);
  //   }

  //   return parts.length ? parts.join(" ") : "0 min";
  // };
  const getFormattedRouteDuration = (route: any[] = []): string => {
    const totalMinutes = route.reduce((sum: number, item: any) => {
      const duration = String(item.duration ?? "").toLowerCase();

      const days = Number(duration.match(/(\d+)\s*days?/)?.[1] ?? 0);

      const hours = Number(duration.match(/(\d+)\s*hours?/)?.[1] ?? 0);

      const minutes = Number(duration.match(/(\d+)\s*mins?/)?.[1] ?? 0);

      return sum + days * 24 * 60 + hours * 60 + minutes;
    }, 0);

    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;

    const parts: string[] = [];

    if (days > 0) {
      parts.push(`${days} ${days === 1 ? "day" : "days"}`);
    }

    if (hours > 0) {
      parts.push(`${hours} ${hours === 1 ? "hr" : "hrs"}`);
    }

    if (minutes > 0) {
      parts.push(`${minutes} ${minutes === 1 ? "min" : "mins"}`);
    }

    return parts.join(" ");
  };
  return (
    <Stack spacing={3}>
      {/* Summary */}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <InfoCard
            title="Tour Summary"
            items={[
              {
                label: "Stops",
                value: route.length,
              },
              {
                label: "Distance",
                value: `${totalDistance.toLocaleString()} km`,
              },
              {
                label: "Duration",
                value: getFormattedRouteDuration(allocation?.route),
              },
              {
                label: "Scenario",
                value: order?.scenario_label ?? "-",
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <InfoCard
            title="Departure"
            items={[
              {
                label: "Location",
                value: route?.[0]?.start?.address ?? route?.[0]?.address ?? "-",
              },
              {
                label: "Departure Time",
                value: route?.[0]?.departure_time ?? "-",
              },
              // {
              //   label: "Vehicle",
              //   value: allocation?.vehicle_ID ?? "-",
              // },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <InfoCard
            title="Destination"
            items={[
              {
                label: "Location",
                value:
                  route?.[route.length - 1]?.end?.address ??
                  route?.[route.length - 1]?.address ??
                  "-",
              },
              {
                label: "Arrival Time",
                value: route?.[route.length - 1]?.arrival_time ?? "-",
              },
              // {
              //   label: "Status",
              //   value: order?.order_status ?? "-",
              // },
            ]}
          />
        </Grid>
      </Grid>

      {/* Route */}

      <RouteTable data={routeData} />
    </Stack>
  );
};

export default TourTab;
