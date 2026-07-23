"use client";
import React from "react";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
export interface RouteItem {
  sequence: number;
  location: string;
  address?: string;
  arrivalTime?: string;
  departureTime?: string;
  distance?: string | number;
  duration?: string;
  status?: string;
}
interface RouteTableProps {
  data: RouteItem[];
}

const RouteTable: React.FC<RouteTableProps> = ({ data }) => {
  console.log("routedata: ", data);
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #F4D3AA",
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(90deg,#FFF8EF 0%,#FFF3E2 100%)",
            }}
          >
            <TableCell width={80}>
              <Typography sx={{ fontWeight: 700 }}>Stop</Typography>
            </TableCell>

            <TableCell>
              <Typography sx={{ fontWeight: 700 }}>Location</Typography>
            </TableCell>

            <TableCell>
              <Typography sx={{ fontWeight: 700 }}>Address</Typography>
            </TableCell>

            <TableCell>
              <Typography sx={{ fontWeight: 700 }}>Arrival</Typography>
            </TableCell>

            <TableCell>
              <Typography sx={{ fontWeight: 700 }}>Departure</Typography>
            </TableCell>

            <TableCell align="right">
              <Typography sx={{ fontWeight: 700 }}>Distance</Typography>
            </TableCell>

            <TableCell align="right">
              <Typography sx={{ fontWeight: 700 }}>Duration</Typography>
            </TableCell>

            {/* <TableCell align="center">
              <Typography sx={{fontWeight:700}}>Status</Typography>
            </TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length > 0 ? (
            data.map((route) => (
              <TableRow key={route.sequence} hover>
                <TableCell>
                  <Chip
                    label={route.sequence}
                    size="small"
                    sx={{
                      bgcolor: "#F68B1F",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Typography sx={{ fontWeight: 600 }}>
                    {route.location}
                  </Typography>
                </TableCell>
                <TableCell>{route.address || "-"}</TableCell>
                <TableCell>{route.arrivalTime || "-"}</TableCell>
                <TableCell>{route.departureTime || "-"}</TableCell>
                <TableCell align="right">{route.distance || "-"}</TableCell>
                <TableCell align="right">{route.duration || "-"}</TableCell>
                {/* <TableCell align="center">
                  <Chip
                    label={route.status ?? "Pending"}
                    size="small"
                    color={getStatusColor(route.status)}
                    variant="outlined"
                  />
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Typography sx={{ py: 4 }} color="text.secondary">
                  No route information available
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RouteTable;
