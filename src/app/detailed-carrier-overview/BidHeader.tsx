"use client";
import { Box } from "@mui/material";
import HeaderTop from "./HeaderTop";
import HeaderSummary from "./HeaderSummary";
import { BidHeaderProps } from "@/types/DetailedBidTypes";

const BidHeader = (props: BidHeaderProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <HeaderTop {...props} />
      <HeaderSummary {...props} />
    </Box>
  );
};

export default BidHeader;
