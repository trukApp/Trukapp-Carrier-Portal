"use client";
import { useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import BidHeader from "./BidHeader";
import BidTabs, { BidTab } from "./BidTabs";
import { useGetOrderByIdQuery } from "@/api/apiSlice";
import InformationTab from "@/Components/DetailedCarrierAssignmentComponent/tabs/InformationTab";
import CargoTab from "@/Components/DetailedCarrierAssignmentComponent/tabs/CargoTab";
import TourTab from "@/Components/DetailedCarrierAssignmentComponent/tabs/TourTab";
import ContactsTab from "@/Components/DetailedCarrierAssignmentComponent/tabs/ContactsTab";
import AttachmentsTab from "@/Components/DetailedCarrierAssignmentComponent/tabs/AttachmentsTab";

const OrderDetails = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_ID") ?? "";
  console.log("orderId: ", orderId);
  const { data: session } = useSession();
  const carrierId = session?.user?.id ?? "";
  console.log("carrierId:", carrierId);
  const { data, isLoading } = useGetOrderByIdQuery({
    orderId,
  });
  const [tab, setTab] = useState<BidTab>("information");
  const order = data?.order;
  const allocation = order?.allocations?.[0];
  const allocatedPackageDetails = data?.allocated_packages_details;

  if (isLoading) {
    return (
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <>
      <Box sx={{ p: 3 }}>
        <BidHeader
          order={order}
          onAccept={() => console.log("Accepted")}
          onReject={() => console.log("Rejected")}
        />
        <BidTabs value={tab} onChange={setTab} />
        {tab === "information" && (
          <InformationTab order={order} allocation={allocation} />
        )}
        {tab === "cargo" && (
          <CargoTab
            order={order}
            allocation={allocation}
            allocatedPackageDetails={allocatedPackageDetails}
          />
        )}
        {tab === "tour" && (
          <TourTab
            order={order}
            allocation={allocation}
            allocatedPackageDetails={allocatedPackageDetails}
          />
        )}
        {tab === "contacts" && (
          <ContactsTab order={order} allocation={allocation} />
        )}
        {tab === "attachments" && <AttachmentsTab order={order} />}
      </Box>
    </>
  );
};

export default OrderDetails;
