"use client";

import React from "react";

import { Box, Paper, Stack, Typography } from "@mui/material";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import moment from "moment";

interface RouteCardProps {
  title: string;
  address: string;
  date?: string;
  type?: "departure" | "arrival";
}

const RouteCard: React.FC<RouteCardProps> = ({
  title,
  address,
  date,
  type = "departure",
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid #F4D3AA",
        p: 3,
        transition: "all .25s ease",
        "&:hover": {
          boxShadow: "0 8px 18px rgba(246,139,31,.15)",
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: type === "departure" ? "#FFF7EF" : "#FFF3E6",
            color: "#F68B1F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <PlaceOutlinedIcon />
        </Box>

        <Stack spacing={1} flex={1}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#F68B1F",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {title}
          </Typography>

          <Typography variant="body1" fontWeight={600}>
            {address || "-"}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeOutlinedIcon
              sx={{
                fontSize: 18,
                color: "#F68B1F",
              }}
            />

            <Typography variant="body2" color="text.secondary">
              {date ? moment(date).format("DD MMM YYYY • hh:mm A") : "-"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RouteCard;
