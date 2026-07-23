"use client";
import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TuneIcon from "@mui/icons-material/Tune";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
// import { AssignmentFilterState } from "@/types/carrierAssignment";

export interface AssignmentFilterState {
  freightOrder: string;
  orderingParty: string;
  departureLocation: string;
  assignmentStatus: string;
  departureDate: Dayjs | null;
}
interface Props {
  filters: AssignmentFilterState;
  onChange: React.Dispatch<React.SetStateAction<AssignmentFilterState>>;
}

const initialFilters: AssignmentFilterState = {
  freightOrder: "",
  orderingParty: "",
  departureLocation: "",
  assignmentStatus: "",
  departureDate: null,
};

const assignmentStatuses = [
  { label: "All", value: "" },
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Rejected", value: "Rejected" },
];

export default function AssignmentFilters({ filters, onChange }: Props) {
  const handleChange =
    (field: keyof AssignmentFilterState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleReset = () => {
    onChange(initialFilters);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        mb: 3,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center", mb: 3 },
        }}
        spacing={2}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Filter Carrier Assignments
        </Typography>

        <Button variant="outlined" startIcon={<TuneIcon />}>
          Adapt Filters
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          label="Freight Order"
          value={filters.freightOrder}
          onChange={handleChange("freightOrder")}
        />

        <TextField
          fullWidth
          label="Ordering Party"
          value={filters.orderingParty}
          onChange={handleChange("orderingParty")}
        />

        <DatePicker
          label="Departure Date"
          value={filters.departureDate}
          onChange={(value) =>
            onChange((prev) => ({
              ...prev,
              departureDate: value as Dayjs | null,
            }))
          }
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />

        <TextField
          fullWidth
          label="Departure Location"
          value={filters.departureLocation}
          onChange={handleChange("departureLocation")}
        />

        <TextField
          select
          fullWidth
          label="Assignment Status"
          value={filters.assignmentStatus}
          onChange={handleChange("assignmentStatus")}
        >
          {assignmentStatuses.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "flex-end", mt: 3 }}
      >
        <Button
          variant="outlined"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
        >
          Reset
        </Button>

        <Button variant="contained" startIcon={<SearchIcon />}>
          Search
        </Button>
      </Stack>
    </Paper>
  );
}
