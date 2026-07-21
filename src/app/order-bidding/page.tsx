"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useAppSelector } from "@/Store";
import {
  useGetAllBiddingOrdersQuery,
  useGetLocationMasterQuery,
} from "@/api/apiSlice";
import { CarrierBidOrder } from "@/types/types";
import BidFilters from "@/Components/OrderBidding/BidFilters";
import BidTabs from "@/Components/OrderBidding/BidTabs";
import BidTable from "@/Components/OrderBidding/BidTable";

export interface BidFilterState {
  freightRFQ: string;
  orderingParty: string;
  departureLocation: string;
  tenderStatus: string;
  departureDate: Date | null;
}

const initialFilters: BidFilterState = {
  freightRFQ: "",
  orderingParty: "",
  departureLocation: "",
  tenderStatus: "",
  departureDate: null,
};

const OrderBidding = () => {
  const carrierId = useAppSelector((state) => state.auth.carrierId);
  const { data: biddingResponse, isLoading } =
    useGetAllBiddingOrdersQuery(carrierId);
  const { data: locationsData } = useGetLocationMasterQuery({});
  const bids: CarrierBidOrder[] = biddingResponse?.data ?? [];
  const locations = locationsData?.locations ?? [];
  const [filters, setFilters] = useState<BidFilterState>(initialFilters);
  const [tab, setTab] = useState<"all" | "new" | "responded">("all");
  console.log("bids", bids);
  const filteredRows = useMemo(() => {
    return bids.filter((item) => {
      const freightMatch =
        !filters.freightRFQ ||
        item.order_ID?.toLowerCase().includes(filters.freightRFQ.toLowerCase());

      const statusMatch =
        !filters.tenderStatus || item.bid_status === filters.tenderStatus;

      return freightMatch && statusMatch;
    });
  }, [bids, filters]);

  const newCount = bids.filter((x) => x.bid_status === "open").length;
  const respondedCount = bids.filter(
    (x) => x.bid_status === "responded",
  ).length;

  return (
    <Grid sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Freight RFQs
      </Typography>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <BidFilters filters={filters} onChange={setFilters} />
          <Grid sx={{ mt: 3 }} />
          <BidTabs
            value={tab}
            onChange={setTab}
            allCount={bids.length}
            newCount={newCount}
            respondedCount={respondedCount}
          />
          <Grid sx={{ mt: 2 }} />
          <BidTable
            loading={isLoading}
            rows={filteredRows}
            locations={locations}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default OrderBidding;
