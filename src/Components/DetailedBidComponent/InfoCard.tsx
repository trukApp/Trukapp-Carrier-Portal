"use client";

import React from "react";

import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

interface InfoItem {
  label: string;
  value?: React.ReactNode;
}

interface InfoCardProps {
  title: string;
  items: InfoItem[];
  action?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items, action }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #F4D3AA",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          px: 3,
          py: 2,
          background: "linear-gradient(90deg,#FFF8EF 0%,#FFF3E2 100%)",
          borderBottom: "1px solid #F4D3AA",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" fontWeight={700} color="#F68B1F">
            {title}
          </Typography>

          {action}
        </Stack>
      </Box>

      {/* Body */}

      <Stack divider={<Divider />}>
        {items.map((item, index) => (
          <Stack
            key={index}
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            spacing={1}
            sx={{
              px: 3,
              py: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                minWidth: 180,
                fontWeight: 500,
              }}
            >
              {item.label}
            </Typography>

            <Typography
              variant="body2"
              fontWeight={600}
              textAlign={{
                xs: "left",
                sm: "right",
              }}
            >
              {item.value ?? "-"}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default InfoCard;
