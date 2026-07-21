"use client";

import { Box } from "@mui/material";

import HeaderTop from "./HeaderTop";
import HeaderSummary from "./HeaderSummary";
import { BidHeaderProps } from "@/types/DetailedBidTypes";

// import { BidHeaderProps } from "./types";

const BidHeader = (props: BidHeaderProps) => {
  return (
    <Box mb={3}>
      <HeaderTop {...props} />

      <HeaderSummary {...props} />
    </Box>
  );
};

export default BidHeader;
