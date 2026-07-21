/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";

import {
  Box,
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { bidColumns } from "./BidColumns";

interface Props {
  rows: any[];
  loading: boolean;
  locations?: any[];
}

export default function BidTable({ rows, loading }: Props) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const allSelected = rows.length > 0 && selectedRows.length === rows.length;

  // const handleSelect = (id: string) => {
  //   setSelectedRows((prev) =>
  //     prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
  //   );
  // };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
      return;
    }

    setSelectedRows(rows.map((row) => row.order_ID));
  };

  // const handleAccept = (row: any) => {
  //   console.log("Accept Bid", row);
  // };

  const columns = useMemo(
    () => bidColumns(),
    // selectedRows,
    // handleSelect,
    // handleSelectAll,
    // allSelected,
    // handleAccept,
    [selectedRows, rows],
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 350,
        }}
      >
        <CircularProgress
          sx={{
            color: "#F68B1F",
          }}
        />
      </Box>
    );
  }

  if (!rows.length) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 6,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No Freight Requests Found
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
          Try changing your filters.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #ECECEC",
        overflow: "hidden",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 650,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    backgroundColor: "#FAFAFA",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    borderBottom: "2px solid #ECECEC",
                    minWidth: column.minWidth,
                    width: column.width,
                    color: "#424242",
                  }}
                >
                  {column.id === "select" ? (
                    <Checkbox
                      checked={allSelected}
                      indeterminate={selectedRows.length > 0 && !allSelected}
                      // onChange={handleSelectAll}
                    />
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.order_ID}
                  hover
                  selected={selectedRows.includes(row.order_ID)}
                  sx={{
                    cursor: "pointer",

                    "&:hover": {
                      backgroundColor: "#FFF9F2",
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        verticalAlign: "top",
                        py: 2,
                      }}
                    >
                      {column.render ? column.render(row) : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={(_, newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        sx={{
          borderTop: "1px solid #ECECEC",
          bgcolor: "#FAFAFA",

          "& .MuiTablePagination-toolbar": {
            minHeight: 56,
          },

          "& .MuiTablePagination-selectLabel": {
            fontWeight: 500,
          },

          "& .MuiTablePagination-displayedRows": {
            fontWeight: 500,
          },
        }}
      />
    </Paper>
  );
}
