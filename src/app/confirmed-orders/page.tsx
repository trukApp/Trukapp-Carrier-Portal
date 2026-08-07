// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useMemo, useState } from "react";
// import { Card, CardContent, Grid, Typography } from "@mui/material";
// import { useSession } from "next-auth/react";
// import {
//   useGetCarrierAssignmentsQuery,
//   useGetLocationMasterQuery,
// } from "@/api/apiSlice";
// import { AssignmentTab, CarrierAssignment } from "@/types/carrierAssignment";
// import { Dayjs } from "dayjs";
// import ConfirmedOrderFilters from "@/Components/ConfirmedOrdersComponents/ConfirmedOrderFilters";
// import ConfirmedOrderTable from "@/Components/ConfirmedOrdersComponents/ConfirmedOrderTable";
// import ConfirmedOrderTabs from "@/Components/ConfirmedOrdersComponents/ConfirmedOrderTabs";
// export interface AssignmentFilterState {
//   freightOrder: string;
//   orderingParty: string;
//   departureLocation: string;
//   assignmentStatus: string;
//   departureDate: Dayjs | null;
// }
// const initialFilters: AssignmentFilterState = {
//   freightOrder: "",
//   orderingParty: "",
//   departureLocation: "",
//   assignmentStatus: "",
//   departureDate: null,
// };

// export default function ConfirmedOrders() {
//   const { data: session } = useSession();
//   const carrierId = session?.user?.id ?? "";
//   const { data: assignments, isLoading: isLoading } =
//     useGetCarrierAssignmentsQuery(carrierId);
//   const carrierAssignments = useMemo(
//     () => assignments?.data ?? [],
//     [assignments],
//   );
//   console.log("assignments: ", assignments);
//   console.log("carrierAssignments: ", carrierAssignments);
//   const { data: locationMaster } = useGetLocationMasterQuery({});
//   const [filters, setFilters] = useState<AssignmentFilterState>(initialFilters);
//   const [tab, setTab] = useState<AssignmentTab>("all");

//   const locationMap = useMemo(() => {
//     return (
//       locationMaster?.locations?.reduce(
//         (acc: Record<string, any>, location: any) => {
//           acc[location.loc_ID] = location;
//           return acc;
//         },
//         {},
//       ) ?? {}
//     );
//   }, [locationMaster]);

//   const filteredRows = useMemo(() => {
//     return (carrierAssignments as CarrierAssignment[]).filter((item) => {
//       const freightMatch =
//         !filters.freightOrder ||
//         item.order_ID
//           .toLowerCase()
//           .includes(filters.freightOrder.toLowerCase());

//       const statusMatch =
//         !filters.assignmentStatus ||
//         item.assignment_status === filters.assignmentStatus;

//       const departureLocation =
//         locationMap[item.start_loc_ID]?.location_name ?? "";

//       const departureMatch =
//         !filters.departureLocation ||
//         departureLocation
//           .toLowerCase()
//           .includes(filters.departureLocation.toLowerCase());

//       const tabMatch = (() => {
//         switch (tab) {
//           case "all":
//             return true;

//           case "pending":
//             return item.order_status.toLowerCase() === "carrier assignment";

//           case "carrier confirmed":
//             return (
//               item.assignment_status.toLowerCase() === "carrier confirmed" &&
//               item.order_status.toLowerCase() !== "finished"
//             );
//           case "carrier rejected":
//             return item.assignment_status.toLowerCase() === "carrier rejected";
//           case "completed":
//             return item.order_status.toLowerCase() === "finished";

//           default:
//             return true;
//         }
//       })();
//       return freightMatch && statusMatch && departureMatch && tabMatch;
//     });
//   }, [carrierAssignments, filters, locationMap, tab]);

//   const pendingCount = useMemo(
//     () =>
//       (carrierAssignments as CarrierAssignment[]).filter(
//         (x) => x.order_status.toLowerCase() === "carrier assignment",
//       ).length,
//     [carrierAssignments],
//   );

//   return (
//     <Grid sx={{ p: 3 }}>
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: 700,
//           mb: 3,
//         }}
//       >
//         Carrier Assignments
//       </Typography>

//       <Card
//         sx={{
//           borderRadius: 3,
//           boxShadow: 2,
//         }}
//       >
//         <CardContent>
//           <ConfirmedOrderFilters filters={filters} onChange={setFilters} />
//           <Grid sx={{ mt: 3 }} />
//           <ConfirmedOrderTabs
//             value={tab}
//             onChange={setTab}
//             // allCount={}
//             pendingCount={pendingCount}
//           />
//           <Grid sx={{ mt: 2 }} />

//           <ConfirmedOrderTable
//             loading={isLoading}
//             rows={filteredRows}
//             locationMap={locationMap}
//           />
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";

import {
  useGetCarrierAssignmentsQuery,
  useGetAllFinalizedBiddingsQuery,
  useGetLocationMasterQuery,
  useGetAllConfirmedFinalizedBiddingsQuery,
} from "@/api/apiSlice";

import ConfirmedOrderFilters from "@/Components/ConfirmedOrdersComponents/ConfirmedOrderFilters";
import ConfirmedOrderTabs from "@/Components/ConfirmedOrdersComponents/ConfirmedOrderTabs";
import ConfirmedOrderTable from "@/Components/ConfirmedOrdersComponents/ConfirmedOrderTable";

import { CarrierAssignment } from "@/types/carrierAssignment";
// import { ConfirmedOrderTab } from "./types";
import { ConfirmedOrderTab } from "../../types/ConfirmedOrders";
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

export default function ConfirmedOrders() {
  const { data: session } = useSession();
  const carrierId = session?.user?.id ?? "";
  const [filters, setFilters] = useState<AssignmentFilterState>(initialFilters);
  const [tab, setTab] = useState<ConfirmedOrderTab>("assignments");
  const { data: assignmentResponse, isLoading: assignmentLoading } =
    useGetCarrierAssignmentsQuery(carrierId);

  const { data: finalisedResponse, isLoading: finalisedLoading } =
    useGetAllConfirmedFinalizedBiddingsQuery(carrierId);
  const { data: locationMaster } = useGetLocationMasterQuery({});
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

  /**
   * Assignment Rows
   */

  const assignmentRows = useMemo(() => {
    return (
      (assignmentResponse?.data ?? []).filter(
        (item: CarrierAssignment) =>
          item.assignment_status?.toLowerCase() === "carrier confirmed" &&
          item.order_status?.toLowerCase() === "carrier confirmed" &&
          item.order_status?.toLowerCase() !== "finished",
      ) ?? []
    );
  }, [assignmentResponse]);

  /**
   * Finalised Bid Rows
   */

  const finalisedRows = useMemo(() => {
    return (
      (finalisedResponse?.data ?? []).filter(
        (item: any) =>
          item.bid_status?.toLowerCase() === "finalised" &&
          item.order_status?.toLowerCase() === "bidding finalised" &&
          item.order_status?.toLowerCase() !== "finished",
      ) ?? []
    );
  }, [finalisedResponse]);

  /**
   * Current rows
   */

  const currentRows = useMemo(() => {
    return tab === "assignments" ? assignmentRows : finalisedRows;
  }, [assignmentRows, finalisedRows, tab]);

  /**
   * Loading
   */

  const loading = tab === "assignments" ? assignmentLoading : finalisedLoading;

  /**
   * Apply Filters
   */

  const filteredRows = useMemo(() => {
    return currentRows.filter((item: any) => {
      const freightMatch =
        !filters.freightOrder ||
        item.order_ID
          ?.toLowerCase()
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

      return freightMatch && statusMatch && departureMatch;
    });
  }, [currentRows, filters, locationMap]);
  return (
    <Grid sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Confirmed Orders
      </Typography>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <ConfirmedOrderFilters filters={filters} onChange={setFilters} />

          <Grid sx={{ mt: 3 }} />

          <ConfirmedOrderTabs value={tab} onChange={setTab} />

          <Grid sx={{ mt: 2 }} />

          <ConfirmedOrderTable
            tab={tab}
            loading={loading}
            rows={filteredRows}
            locationMap={locationMap}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
