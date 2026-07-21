"use client";

import React from "react";

import { Box, Tab, Tabs } from "@mui/material";

export type BidTab =
  | "information"
  | "cargo"
  | "tour"
  | "contacts"
  | "attachments";

interface BidTabsProps {
  value: BidTab;
  onChange: (value: BidTab) => void;
}

const tabValues: BidTab[] = [
  "information",
  "cargo",
  "tour",
  "contacts",
  "attachments",
];

const labels: Record<BidTab, string> = {
  information: "Information",
  cargo: "Cargo",
  tour: "Tour",
  contacts: "Contacts",
  attachments: "Attachments",
};

const BidTabs: React.FC<BidTabsProps> = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 3,
        border: "1px solid #F4D3AA",
        mb: 3,
        overflowX: "auto",
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          minHeight: 64,

          "& .MuiTabs-indicator": {
            height: 4,
            borderRadius: 2,
            backgroundColor: "#F68B1F",
          },

          "& .MuiTab-root": {
            minHeight: 64,
            px: 4,
            fontWeight: 600,
            textTransform: "none",
            color: "#6B7280",
            transition: "all .2s ease",
          },

          "& .Mui-selected": {
            color: "#F68B1F !important",
            fontWeight: 700,
          },
        }}
      >
        {tabValues.map((tab) => (
          <Tab key={tab} value={tab} label={labels[tab]} />
        ))}
      </Tabs>
    </Box>
  );
};

export default BidTabs;
