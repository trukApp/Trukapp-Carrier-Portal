"use client";

import React from "react";

import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import moment from "moment";
import { BidHeaderProps } from "@/types/DetailedBidTypes";

// import { BidHeaderProps } from "./types";

interface HeaderTopProps extends BidHeaderProps {
  remainingTime: string;
}

const HeaderTop: React.FC<HeaderTopProps> = ({
  order,
  bidAmount,
  bidStatus,
  remainingTime,
}) => {
  //   const allocation = order.allocations?.[0];
  const allocation = order?.allocations?.[0];

  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: 3,
        border: "1px solid #F4D3AA",
        overflow: "hidden",
        mb: 3,
      }}
    >
      {/* Orange Header */}

      <Box
        sx={{
          background: "linear-gradient(90deg,#F68B1F 0%,#F08C24 100%)",
          color: "#fff",
          px: 4,
          py: 3,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.9,
                letterSpacing: 1,
              }}
            >
              FREIGHT RFQ
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {/* {order.order_ID} */}
              {order?.order_ID ?? "-"}
            </Typography>

            <Typography mt={1} variant="body2">
              Created{" "}
              {/* {moment(order?.created_at).format("DD MMM YYYY • hh:mm A")} */}
              {order?.created_at
                ? moment(order.created_at).format("DD MMM YYYY • hh:mm A")
                : "-"}
            </Typography>
          </Box>

          <Stack
            alignItems={{
              xs: "flex-start",
              md: "flex-end",
            }}
            spacing={1}
          >
            <Chip
              label={bidStatus ?? order?.order_status ?? "-"}
              sx={{
                bgcolor: "#fff",
                color: "#F68B1F",
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            />

            <Typography variant="body2">Remaining Time</Typography>

            <Typography variant="h5" fontWeight={700}>
              {remainingTime}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeaderTop;
