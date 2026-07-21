"use client";

import React from "react";

import { Box, Paper, Stack, Typography } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  color?: string;
  backgroundColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  color = "#F68B1F",
  backgroundColor = "#FFF7EF",
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: 3,
        borderRadius: 3,
        border: "1px solid #F4D3AA",
        transition: "all .25s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 18px rgba(246,139,31,.15)",
        },
      }}
    >
      <Stack spacing={2} alignItems="center" justifyContent="center">
        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            backgroundColor,
            color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textTransform: "uppercase",
            letterSpacing: 1,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          fontWeight={700}
          textAlign="center"
          sx={{
            wordBreak: "break-word",
          }}
        >
          {value || "-"}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SummaryCard;
