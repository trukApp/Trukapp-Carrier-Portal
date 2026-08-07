/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import FinalisedBidColumns from "./FinalisedBidColumns";
import { ConfirmedOrderTab } from "@/types/ConfirmedOrders";
import AssignmentColumns from "./ConfirmedOrderColumns";
interface Props {
  tab: ConfirmedOrderTab;
  rows: any[];
  loading?: boolean;
  locationMap: Record<string, any>;
}

export default function ConfirmedOrderTable({
  tab,
  rows,
  loading = false,
  locationMap,
}: Props) {
  const router = useRouter();
  console.log("rows: ", rows);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const handleView = useCallback(
    (row: any) => {
      router.push(`/detailed-carrier-overview?order_ID=${row.order_ID}`);
    },
    [router],
  );

  const columns = useMemo(() => {
    if (tab === "assignments") {
      return AssignmentColumns({
        locationMap,
        onView: handleView,
      });
    }
    return FinalisedBidColumns({
      locationMap,
      onView: handleView,
    });
  }, [tab, locationMap, handleView]);
  return (
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
          getRowId={(row) => row.ca_id ?? row.bid_id ?? row.order_ID}
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
              backgroundColor: "#F9FAFB",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #E5E7EB",
            },
          }}
        />

        {!loading && rows.length === 0 && (
          <Box
            sx={{
              py: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No records found.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
