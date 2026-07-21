"use client";

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F5F5F5",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
