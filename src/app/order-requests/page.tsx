/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState } from "react";
// import {
//   useGetCarrierAssignmentReqQuery,
//   useGetLocationMasterQuery,
// } from "@/api/apiSlice";
// import { Visibility } from "@mui/icons-material";
// import {
//   Backdrop,
//   Box,
//   CircularProgress,
//   Typography,
//   Chip,
//   IconButton,
// } from "@mui/material";
// import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/Store";
// import { withAuthComponent } from "@/Components/WithAuthComponent";
// import moment from "moment";

// interface PackageDestRadius {
//   pack_ID: string;
//   ship_to: string;
//   destination_radius: string;
// }
// interface CarrierAssignment {
//   cas_ID: string;
//   order_ID: string;
//   assignment_status: string;
//   scenario_label: string;
//   assigned_time: string;
//   confirmed_time?: string;
//   allocated_vehicles?: string[]; // or a more specific type if available
//   allocated_packages?: string[]; // or a more specific type if available
//   start_loc_ID: string;
//   end_loc_ID: string;
//   assignment_cost?: {
//     total_distance?: string;
//     cost_criteria_considered?: string;
//     // total_weight?: string;
//   };
//   confirmed_to?: string;
//   created_at: string;
//   updated_at: string;
//   package_dest_radius: PackageDestRadius[];
// }

// const OrderRequests: React.FC = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId);
//   const { data: carrierAssignments, isLoading: carrLoading } =
//     useGetCarrierAssignmentReqQuery(carrierIdFromRedux);

//   const assignments = carrierAssignments?.assignments || [];
//   console.log("Carrier Assignments Data:", assignments);

//   const { data: locationsData } = useGetLocationMasterQuery({});

//   const getAllLocations =
//     locationsData?.locations && locationsData.locations.length > 0
//       ? locationsData.locations
//       : [];

//   const getLocationName = (locId: string) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const found = getAllLocations.find((loc: any) => loc.loc_ID === locId);
//     return found ? found.city : locId;
//   };

//   const handleNavigateToOrder = (orderId: string) => {
//     setLoading(true);
//     router.push(
//       `/detailed-carrier-overview?order_ID=${orderId}&from=${carrierIdFromRedux}`,
//     );
//   };
//   const columns: GridColDef[] = [
//     { field: "id", headerName: "#", width: 70 },
//     { field: "cas_ID", headerName: "Assignment ID", width: 160 },
//     { field: "order_ID", headerName: "Order ID", width: 130 },
//     {
//       field: "assignment_status",
//       headerName: "Status",
//       width: 130,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           color={
//             params.value === "Confirmed"
//               ? "success"
//               : params.value === "Rejected"
//                 ? "error"
//                 : "warning"
//           }
//           size="small"
//         />
//       ),
//     },
//     // { field: 'scenario_label', headerName: 'Scenario', width: 180 },
//     { field: "assigned_time", headerName: "Assigned Time", width: 180 },
//     // { field: 'confirmed_time', headerName: 'Confirmed Time', width: 180 },
//     { field: "start_loc_ID", headerName: "Start Location", width: 150 },
//     { field: "end_loc_ID", headerName: "End Location", width: 150 },
//     { field: "drop_points", headerName: "Drop Points", width: 240 },
//     { field: "total_distance", headerName: "Distance (km)", width: 130 },
//     // { field: 'confirmed_to', headerName: 'Confirmed To', width: 130 },
//     { field: "created_at", headerName: "Created At", width: 210 },
//     // { field: 'updated_at', headerName: 'Updated At', width: 210 },
//     {
//       field: "view",
//       headerName: "View",
//       width: 100,
//       sortable: false,
//       renderCell: (params: GridRenderCellParams) => (
//         <IconButton
//           onClick={() => handleNavigateToOrder(params.row.order_ID)}
//           sx={{ color: "#F08C24" }}
//         >
//           <Visibility />
//         </IconButton>
//       ),
//     },
//   ];

//   const rows = assignments.map((a: CarrierAssignment, idx: number) => {
//     const dropPoints =
//       a.package_dest_radius
//         ?.map((p) => `${getLocationName(p.ship_to)}`)
//         .join(", ") || "—";

//     return {
//       id: idx + 1,
//       cas_ID: a.cas_ID,
//       order_ID: a.order_ID,
//       assignment_status: a.assignment_status,
//       scenario_label: a.scenario_label,
//       assigned_time: moment(a.assigned_time).format("DD MMM YYYY, HH:mm"),
//       confirmed_time: a.confirmed_time
//         ? moment(a.confirmed_time).format("DD MMM YYYY, HH:mm")
//         : "—",
//       allocated_vehicles: a.allocated_vehicles || [],
//       allocated_packages: a.allocated_packages || [],
//       start_loc_ID: getLocationName(a.start_loc_ID),
//       end_loc_ID: getLocationName(a.end_loc_ID),
//       total_distance: a.assignment_cost?.total_distance || "N/A",
//       cost_criteria_considered:
//         a.assignment_cost?.cost_criteria_considered || "N/A",
//       confirmed_to: a.confirmed_to || "—",
//       created_at: a.created_at,
//       updated_at: a.updated_at,
//       drop_points: dropPoints,
//     };
//   });

//   return (
//     <>
//       <Backdrop
//         open={carrLoading || loading}
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>

//       <Box p={4}>
//         <Typography variant="h4" gutterBottom fontWeight="bold">
//           📦 Carrier Assignment Requests
//         </Typography>

//         <Box sx={{ height: 650, mt: 3 }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             // pageSize={10}
//             // rowsPerPageOptions={[5, 10, 20]}
//             loading={carrLoading}
//             // disableSelectionOnClick
//             sx={{
//               borderRadius: 2,
//               boxShadow: 3,
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: "#f5f5f5",
//                 fontWeight: "bold",
//               },
//               "& .MuiDataGrid-cell": {
//                 whiteSpace: "normal",
//                 wordBreak: "break-word",
//               },
//             }}
//           />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default withAuthComponent(OrderRequests);

"use client";

import React, { useMemo, useState } from "react";

import { Card, CardContent, Grid, Typography } from "@mui/material";

import { useSession } from "next-auth/react";

import {
  useGetCarrierAssignmentReqQuery,
  useGetLocationMasterQuery,
} from "@/api/apiSlice";
import {
  AssignmentFilterState,
  AssignmentTab,
  CarrierAssignment,
} from "@/types/carrierAssignment";
import AssignmentFilters from "@/Components/CarrierAssignmentsComponents/AssignmentFilters";
import AssignmentTabs from "@/Components/CarrierAssignmentsComponents/AssignmentTabs";
import AssignmentTable from "@/Components/CarrierAssignmentsComponents/AssignmentTable";

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

  const { data: assignments, isLoading } =
    useGetCarrierAssignmentReqQuery(carrierId);
  const carrierAssignments = assignments?.assignments ?? [];
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

  /**
   * Filter assignments
   */

  const filteredRows = useMemo(() => {
    return (carrierAssignments as CarrierAssignment[]).filter((item) => {
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

      const tabMatch =
        tab === "all" ? true : item.assignment_status.toLowerCase() === tab;

      return freightMatch && statusMatch && departureMatch && tabMatch;
    });
  }, [carrierAssignments, filters, locationMap, tab]);

  const pendingCount = useMemo(
    () =>
      (carrierAssignments as CarrierAssignment[]).filter(
        (x) => x.assignment_status.toLowerCase() === "pending",
      ).length,
    [carrierAssignments],
  );

  const confirmedCount = useMemo(
    () =>
      (carrierAssignments as CarrierAssignment[]).filter(
        (x) => x.assignment_status.toLowerCase() === "confirmed",
      ).length,
    [carrierAssignments],
  );

  const rejectedCount = useMemo(
    () =>
      (carrierAssignments as CarrierAssignment[]).filter(
        (x) => x.assignment_status.toLowerCase() === "rejected",
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
            allCount={carrierAssignments.length}
            pendingCount={pendingCount}
            confirmedCount={confirmedCount}
            rejectedCount={rejectedCount}
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
