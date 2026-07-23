/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import getAssignmentColumns from "./AssignmentColumns";
import { CarrierAssignment } from "@/types/carrierAssignment";
import { useRouter } from "next/navigation";

interface AssignmentTableProps {
  rows: CarrierAssignment[];
  loading?: boolean;
  locationMap: Record<string, any>;
}

export default function AssignmentTable({
  rows,
  loading = false,
  locationMap,
}: AssignmentTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const router = useRouter();
  const handleView = useCallback((assignment: CarrierAssignment) => {
    router.push(`/detailed-carrier-overview?order_ID=${assignment.order_ID}`);
  }, [router]);

  const columns = useMemo(
    () =>
      getAssignmentColumns({
        locationMap,
        onView: handleView,
      }),
    [locationMap, handleView],
  );

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.ca_id}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20, 50, 100]}
            disableRowSelectionOnClick
            rowHeight={72}
            sx={{
              border: 0,

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F8F9FA",
                fontWeight: 700,
              },

              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 700,
              },

              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
              },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#FFF8F1",
              },

              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #ECECEC",
              },
            }}
          />

          {!loading && rows.length === 0 && (
            <Box
              sx={{
                py: 8,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No Assignments Found
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try changing the filters.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
}
