"use client";

import React from "react";
import {
  Button,
  Grid,
  // MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TuneIcon from "@mui/icons-material/Tune";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BidFilterState } from "@/app/order-bidding/page";

// import { BidFilterState } from "./index";

interface Props {
  filters: BidFilterState;
  onChange: React.Dispatch<React.SetStateAction<BidFilterState>>;
}

// const tenderStatusOptions = [
//   {
//     label: "All",
//     value: "",
//   },
//   {
//     label: "Open",
//     value: "open",
//   },
//   {
//     label: "Responded",
//     value: "responded",
//   },
//   {
//     label: "Closed",
//     value: "closed",
//   },
// ];

export default function BidFilters({ filters, onChange }: Props) {
  const handleChange =
    (field: keyof BidFilterState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const resetFilters = () => {
    onChange({
      freightRFQ: "",
      orderingParty: "",
      departureLocation: "",
      tenderStatus: "",
      departureDate: null,
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #ECECEC",
        bgcolor: "#FFF",
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Filter Freight Requests
        </Typography>

        <Button
          startIcon={<TuneIcon />}
          variant="outlined"
          sx={{
            borderColor: "#F68B1F",
            color: "#F68B1F",
            ml: 4,
            mb: 4,

            "&:hover": {
              borderColor: "#F68B1F",
              background: "#FFF7EC",
            },
          }}
        >
          Adapt Filters
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {/* Freight RFQ */}

        <Grid sx={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            label="Freight RFQ"
            placeholder="Search RFQ"
            value={filters.freightRFQ}
            onChange={handleChange("freightRFQ")}
          />
        </Grid>

        {/* Ordering Party */}

        <Grid sx={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            label="Ordering Party"
            placeholder="Ordering Party"
            value={filters.orderingParty}
            onChange={handleChange("orderingParty")}
          />
        </Grid>

        {/* Departure Date */}

        <Grid sx={{ xs: 12, md: 3 }}>
          <DatePicker
            label="Departure Date"
            value={filters.departureDate}
            onChange={(value) =>
              onChange((prev) => ({
                ...prev,
                departureDate: value,
              }))
            }
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </Grid>
        {/* Departure Location */}

        <Grid sx={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            label="Departure Location"
            value={filters.departureLocation}
            onChange={handleChange("departureLocation")}
          />
        </Grid>

        {/* Tender Status */}

        {/* <Grid item xs={12} md={3}>
          <TextField
            select
            fullWidth
            label="Tender Status"
            value={filters.tenderStatus}
            onChange={handleChange("tenderStatus")}
          >
            {tenderStatusOptions.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid> */}

        <Grid sx={{ xs: 12, md: 9 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<RestartAltIcon />}
              onClick={resetFilters}
              sx={{
                borderRadius: 2,
                px: 3,
              }}
            >
              Reset
            </Button>

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                bgcolor: "#F68B1F",

                px: 4,

                "&:hover": {
                  bgcolor: "#E67E22",
                },
              }}
            >
              Search
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
