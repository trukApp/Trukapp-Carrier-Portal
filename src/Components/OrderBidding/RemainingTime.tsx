"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Chip } from "@mui/material";

interface Props {
  bidEndTime: string;
}

const getRemaining = (date: string) => {
  const end = new Date(date).getTime();
  const now = Date.now();

  const diff = end - now;

  if (diff <= 0) {
    return {
      expired: true,
      text: "Expired",
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    expired: false,
    text: days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`,
  };
};

export default function RemainingTime({ bidEndTime }: Props) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((v) => v + 1);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const remaining = useMemo(() => getRemaining(bidEndTime), [bidEndTime]);

  return (
    <Chip
      label={remaining.text}
      size="small"
      sx={{
        bgcolor: remaining.expired ? "#FDECEC" : "#FFF3E0",

        color: remaining.expired ? "#D32F2F" : "#F68B1F",

        fontWeight: 700,

        borderRadius: "8px",

        minWidth: 90,
      }}
    />
  );
}
