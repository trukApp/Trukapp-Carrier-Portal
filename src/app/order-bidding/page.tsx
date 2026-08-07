/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import {
  useGetAllBiddingOrdersQuery,
  useGetLocationMasterQuery,
  useLazyGetAllRespondedBidsForCarrierQuery,
} from "@/api/apiSlice";
import BidFilters from "@/Components/OrderBidding/BidFilters";
import BidTable from "@/Components/OrderBidding/BidTable";
import BidTabs from "@/Components/OrderBidding/BidTabs";
import { CarrierBidOrder, Order } from "@/types/types";

export interface BidFilterState {
  freightRFQ: string;
  orderingParty: string;
  departureLocation: string;
  tenderStatus: string;
  departureDate: Dayjs | null;
}

const initialFilters: BidFilterState = {
  freightRFQ: "",
  orderingParty: "",
  departureLocation: "",
  tenderStatus: "",
  departureDate: null,
};

const OrderBidding = () => {
  const { data: session } = useSession();
  const carrierId = session?.user?.id ?? "";
  const { data: biddingResponse, isLoading } = useGetAllBiddingOrdersQuery(
    carrierId,
    { skip: !carrierId },
  );
  const [
    getRespondedBids,
    { data: respondedResponse, isLoading: respondedLoading },
  ] = useLazyGetAllRespondedBidsForCarrierQuery();
  const { data: locationsData } = useGetLocationMasterQuery({});
  const locations = locationsData?.locations ?? [];
  const [filters, setFilters] = useState<BidFilterState>(initialFilters);
  const [tab, setTab] = useState<"all" | "new" | "responded">("all");
  const [respondedLoaded, setRespondedLoaded] = useState(false);
  // console.log("biddingResponse: ", biddingResponse);
  console.log("respondedResponse: ", respondedResponse);
  useEffect(() => {
    if (tab === "responded" && carrierId && !respondedLoaded) {
      getRespondedBids(carrierId);
      setRespondedLoaded(true);
    }
  }, [tab, carrierId, respondedLoaded, getRespondedBids]);

  const openBids = useMemo<CarrierBidOrder[]>(
    () => biddingResponse?.data ?? [],
    [biddingResponse],
  );

  const respondedBids = useMemo(() => {
    const filtered = (respondedResponse?.data ?? []).filter((order: Order) =>
      order.all_bids?.some((bid: any) => bid.bid_from === carrierId),
    );

    const map = new Map<string, CarrierBidOrder>();

    filtered.forEach((item: any) => {
      map.set(item.order_ID, item);
    });

    return [...map.values()];
  }, [respondedResponse, carrierId]);
  const newBids = useMemo<CarrierBidOrder[]>(() => openBids, [openBids]);
  const displayedRows = useMemo(() => {
    switch (tab) {
      case "new":
        return newBids;
      case "responded":
        return respondedBids;
      default:
        return newBids;
    }
  }, [tab, newBids, respondedBids]);

  const filteredRows = useMemo(() => {
    return displayedRows.filter((item) => {
      const freightMatch =
        !filters.freightRFQ ||
        item.order_ID?.toLowerCase().includes(filters.freightRFQ.toLowerCase());

      const statusMatch =
        !filters.tenderStatus || item.bid_status === filters.tenderStatus;

      return freightMatch && statusMatch;
    });
  }, [displayedRows, filters]);

  const newCount = newBids.length;
  const allCount = newCount;

  return (
    <Grid sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
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
            allCount={allCount}
            newCount={newCount}
          />

          <Grid sx={{ mt: 2 }} />
          <BidTable
            loading={tab === "responded" ? respondedLoading : isLoading}
            rows={filteredRows}
            locations={locations}
            tab={tab}
            carrierId={carrierId}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default OrderBidding;
