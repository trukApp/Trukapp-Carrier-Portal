/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import {
  useGetCarrierAssignmentsQuery,
  useGetLocationMasterQuery,
} from "@/api/apiSlice";
import {
  // AssignmentFilterState,
  AssignmentTab,
  CarrierAssignment,
} from "@/types/carrierAssignment";
import AssignmentFilters from "@/Components/CarrierAssignmentsComponents/AssignmentFilters";
import AssignmentTabs from "@/Components/CarrierAssignmentsComponents/AssignmentTabs";
import AssignmentTable from "@/Components/CarrierAssignmentsComponents/AssignmentTable";
import { Dayjs } from "dayjs";
export interface AssignmentFilterState {
  freightOrder: string;
  orderingParty: string;
  departureLocation: string;
  assignmentStatus: string;
  departureDate: Dayjs | null;
}
const initialFilters: AssignmentFilterState = {
  freightOrder: "",
  orderingParty: "",
  departureLocation: "",
  assignmentStatus: "",
  departureDate: null,
};

export default function CarrierAssignmentsPage() {
  const { data: session } = useSession();
  const carrierId = session?.user?.id ?? "";
  const { data: assignments, isLoading: isLoading } =
    useGetCarrierAssignmentsQuery(carrierId);
  const carrierAssignments = useMemo(
    () => assignments?.data ?? [],
    [assignments],
  );
  console.log("assignments: ", assignments);
  console.log("carrierAssignments: ", carrierAssignments);
  const { data: locationMaster } = useGetLocationMasterQuery({});
  const [filters, setFilters] = useState<AssignmentFilterState>(initialFilters);
  const [tab, setTab] = useState<AssignmentTab>("all");

  const locationMap = useMemo(() => {
    return (
      locationMaster?.locations?.reduce(
        (acc: Record<string, any>, location: any) => {
          acc[location.loc_ID] = location;
          return acc;
        },
        {},
      ) ?? {}
    );
  }, [locationMaster]);

  const filteredRows = useMemo(() => {
    return (carrierAssignments as CarrierAssignment[]).filter((item) => {
      console.log("item: ", item);
      const freightMatch =
        !filters.freightOrder ||
        item.order_ID
          .toLowerCase()
          .includes(filters.freightOrder.toLowerCase());

      const statusMatch =
        !filters.assignmentStatus ||
        item.assignment_status === filters.assignmentStatus;

      const departureLocation =
        locationMap[item.start_loc_ID]?.location_name ?? "";

      const departureMatch =
        !filters.departureLocation ||
        departureLocation
          .toLowerCase()
          .includes(filters.departureLocation.toLowerCase());

      const tabMatch = (() => {
        switch (tab) {
          case "all":
            return true;

          case "pending":
            return item.order_status.toLowerCase() === "carrier assignment";

          case "carrier confirmed":
            return (
              item.assignment_status.toLowerCase() === "carrier confirmed" &&
              item.order_status.toLowerCase() !== "finished"
            );
          case "carrier rejected":
            return item.assignment_status.toLowerCase() === "carrier rejected";
          case "completed":
            return item.order_status.toLowerCase() === "finished";

          default:
            return true;
        }
      })();
      // const tabMatch = (() => {
      //   switch (tab) {
      //     case "all":
      //       return true;

      //     case "pending":
      //       return item.order_status.toLowerCase() === "carrier assignment";

      //     case "confirmed":
      //       return (
      //         item.assignment_status.toLowerCase() === "carrier confirmed" &&
      //         item.order_status.toLowerCase() !== "finished"
      //       );

      //     case "rejected":
      //       return item.assignment_status.toLowerCase() === "carrier rejected";

      //     case "completed":
      //       return item.order_status.toLowerCase() === "finished";

      //     default:
      //       return true;
      //   }
      // })();
      return freightMatch && statusMatch && departureMatch && tabMatch;
    });
  }, [carrierAssignments, filters, locationMap, tab]);

  const pendingCount = useMemo(
    () =>
      (carrierAssignments as CarrierAssignment[]).filter(
        (x) => x.order_status.toLowerCase() === "carrier assignment",
      ).length,
    [carrierAssignments],
  );

  return (
    <Grid sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Carrier Assignments
      </Typography>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <AssignmentFilters filters={filters} onChange={setFilters} />
          <Grid sx={{ mt: 3 }} />
          <AssignmentTabs
            value={tab}
            onChange={setTab}
            // allCount={}
            pendingCount={pendingCount}
          />
          <Grid sx={{ mt: 2 }} />

          <AssignmentTable
            loading={isLoading}
            rows={filteredRows}
            locationMap={locationMap}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
