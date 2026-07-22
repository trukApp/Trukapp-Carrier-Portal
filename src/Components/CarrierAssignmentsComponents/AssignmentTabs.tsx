"use client";

import React from "react";

import { Badge, Box, Tab, Tabs } from "@mui/material";

import { AssignmentTab } from "@/types/carrierAssignment";

interface Props {
  value: AssignmentTab;
  onChange: (value: AssignmentTab) => void;

  allCount: number;
  pendingCount: number;
  confirmedCount: number;
  rejectedCount: number;
}

export default function AssignmentTabs({
  value,
  onChange,
  allCount,
  pendingCount,
  confirmedCount,
  rejectedCount,
}: Props) {
  const handleChange = (_: React.SyntheticEvent, newValue: AssignmentTab) => {
    onChange(newValue);
  };

  const badgeStyle = {
    "& .MuiBadge-badge": {
      backgroundColor: "#F68B1F",
      color: "#fff",
      fontWeight: 700,
      minWidth: 22,
      height: 22,
      borderRadius: "50%",
      fontSize: 11,
    },
  };

  return (
    <Box
      sx={{
        borderBottom: "1px solid #ECECEC",
        mb: 2,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#F68B1F",
            height: 3,
          },

          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
            color: "#616161",
            minHeight: 54,
            minWidth: 120,
          },

          "& .Mui-selected": {
            color: "#F68B1F !important",
            fontWeight: 700,
          },
        }}
      >
        <Tab
          value="all"
          label={
            <Badge badgeContent={allCount} sx={badgeStyle}>
              All
            </Badge>
          }
        />

        <Tab
          value="pending"
          label={
            <Badge badgeContent={pendingCount} sx={badgeStyle}>
              Pending
            </Badge>
          }
        />

        <Tab
          value="confirmed"
          label={
            <Badge badgeContent={confirmedCount} sx={badgeStyle}>
              Confirmed
            </Badge>
          }
        />

        <Tab
          value="rejected"
          label={
            <Badge badgeContent={rejectedCount} sx={badgeStyle}>
              Rejected
            </Badge>
          }
        />
      </Tabs>
    </Box>
  );
}
