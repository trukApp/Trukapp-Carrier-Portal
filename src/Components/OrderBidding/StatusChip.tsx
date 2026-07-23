"use client";
import React from "react";
import { Badge, Box, Tab, Tabs } from "@mui/material";
interface Props {
  value: "all" | "new" | "responded";
  onChange: (value: "all" | "new" | "responded") => void;
  allCount: number;
  newCount: number;
  respondedCount: number;
}

export default function BidTabs({
  value,
  onChange,
  allCount,
  newCount,
  respondedCount,
}: Props) {
  const handleChange = (
    _: React.SyntheticEvent,
    newValue: "all" | "new" | "responded",
  ) => {
    onChange(newValue);
  };

  const badgeStyle = {
    "& .MuiBadge-badge": {
      backgroundColor: "#F68B1F",
      color: "#fff",
      fontWeight: 600,
      minWidth: 22,
      height: 22,
      borderRadius: "11px",
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
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#F68B1F",
            height: 3,
          },

          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
            color: "#555",
            minHeight: 52,
          },

          "& .Mui-selected": {
            color: "#F68B1F !important",
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
          value="new"
          label={
            <Badge badgeContent={newCount} sx={badgeStyle}>
              New
            </Badge>
          }
        />

        <Tab
          value="responded"
          label={
            <Badge badgeContent={respondedCount} sx={badgeStyle}>
              Responded
            </Badge>
          }
        />
      </Tabs>
    </Box>
  );
}
