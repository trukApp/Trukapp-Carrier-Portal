/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
interface Props {
  row: any;
}

export default function ActionButton({ row }: Props) {
  const router = useRouter();
  // console.log("row", row);
  const handleViewBid = () => {
    router.push(`/detailed-bid-overview?bid_ID=${row.order_ID}`);
  };

  return (
    <Button
      variant="contained"
      disableElevation
      onClick={handleViewBid}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        borderRadius: 2,
        px: 2,
        whiteSpace: "nowrap",
        backgroundColor: "#F68B1F",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#E67E22",
        },
      }}
    >
      View Bid
    </Button>
  );
}
