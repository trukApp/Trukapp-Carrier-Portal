// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useEffect, useState } from "react";
// import { Box, CircularProgress, Grid } from "@mui/material";
// import { useSearchParams } from "next/navigation";
// import BidHeader from "./BidHeader";
// import BidTabs, { BidTab } from "./BidTabs";
// import {
//   useGetBidByOrderIdQuery,
//   useGetOrderByIdQuery,
//   usePlacingTheBidForOrderMutation,
// } from "@/api/apiSlice";
// import InformationTab from "@/Components/DetailedBidComponent/tabs/InformationTab";
// import CargoTab from "@/Components/DetailedBidComponent/tabs/CargoTab";
// import TourTab from "@/Components/DetailedBidComponent/tabs/TourTab";
// import ContactsTab from "@/Components/DetailedBidComponent/tabs/ContactsTab";
// import AttachmentsTab from "@/Components/DetailedBidComponent/tabs/AttachmentsTab";
// import { useSession } from "next-auth/react";

// const getRemainingTime = (closingTime?: string) => {
//   if (!closingTime) return "N/A";

//   const now = new Date().getTime();
//   const end = new Date(closingTime).getTime();

//   const diff = end - now;

//   if (diff <= 0) return "Bid Closed";

//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//   const parts: string[] = [];

//   if (days) parts.push(`${days}d`);
//   if (hours) parts.push(`${hours}h`);
//   if (minutes) parts.push(`${minutes}m`);
//   parts.push(`${seconds}s`);

//   return parts.join(" ");
// };

// const OrderDetails = () => {
//   const searchParams = useSearchParams();
//   const bid_ID = searchParams.get("bid_ID") ?? "";
//   const { data, isLoading } = useGetOrderByIdQuery({ orderId: bid_ID });
//   const { data: bidData, isLoading: isBidLoading } = useGetBidByOrderIdQuery({
//     orderId: bid_ID,
//   });
//   const [tab, setTab] = useState<BidTab>("information");
//   const bidDataDetails = bidData?.data?.[0];
//   const [remainingTime, setRemainingTime] = useState("");

//   const [openBidDialog, setOpenBidDialog] = useState(false);
//   const [bidAmount, setBidAmount] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [placeBid, { isLoading: placingBid }] =
//     usePlacingTheBidForOrderMutation();
//   const { data: session } = useSession();
//   const carrierId = session?.user?.id;
//   console.log("carrierId: ", carrierId);
//   const existingBid = bidDataDetails?.all_bids?.find(
//     (bid: any) => bid.bid_from === carrierId,
//   );
//   console.log("existingBid: ", existingBid);
//   useEffect(() => {
//     if (!bidDataDetails?.bid_closing_time) return;
//     const updateTimer = () => {
//       setRemainingTime(getRemainingTime(bidDataDetails.bid_closing_time));
//     };
//     updateTimer();
//     const interval = setInterval(updateTimer, 1000);
//     return () => clearInterval(interval);
//   }, [bidDataDetails?.bid_closing_time]);

//   console.log("bidDataDetails", bidDataDetails);
//   const allocatedPackageDetails = data?.allocated_packages_details;
//   if (isLoading || isBidLoading) {
//     return (
//       <Grid
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           py: 8,
//           minHeight: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Grid>
//     );
//   }
//   const order = data?.order;
//   console.log("order", order);
//   const allocation = order?.allocations?.[0];
//   return (
//     <Box sx={{ p: 3 }}>
//       <BidHeader
//         order={order}
//         bidAmount={bidDataDetails?.bid_value}
//         remainingTime={remainingTime}
//         existingBid={existingBid}
//         onPlaceBid={() => setOpenBidDialog(true)}
//       />
//       <BidTabs value={tab} onChange={setTab} />
//       {tab === "information" && (
//         <InformationTab
//           order={order}
//           allocation={allocation}
//           bidData={bidDataDetails}
//         />
//       )}
//       {tab === "cargo" && (
//         <CargoTab
//           order={order}
//           allocation={allocation}
//           allocatedPackageDetails={allocatedPackageDetails}
//         />
//       )}
//       {tab === "tour" && (
//         <TourTab
//           order={order}
//           allocation={allocation}
//           allocatedPackageDetails={allocatedPackageDetails}
//         />
//       )}
//       {tab === "contacts" && (
//         <ContactsTab order={order} allocation={allocation} />
//       )}
//       {tab === "attachments" && <AttachmentsTab order={order} />}
//     </Box>
//   );
// };

// export default OrderDetails;

"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Alert, Box, CircularProgress, Grid, Snackbar } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import BidHeader from "./BidHeader";
import BidTabs, { BidTab } from "./BidTabs";
import {
  useGetBidByOrderIdQuery,
  useGetOrderByIdQuery,
  usePlacingTheBidForOrderMutation,
} from "@/api/apiSlice";

import InformationTab from "@/Components/DetailedBidComponent/tabs/InformationTab";
import CargoTab from "@/Components/DetailedBidComponent/tabs/CargoTab";
import TourTab from "@/Components/DetailedBidComponent/tabs/TourTab";
import ContactsTab from "@/Components/DetailedBidComponent/tabs/ContactsTab";
import AttachmentsTab from "@/Components/DetailedBidComponent/tabs/AttachmentsTab";
import BidPlaceDialog from "@/Components/DetailedBidComponent/BidPlaceDialog";
import ConfirmBidDialog from "@/Components/DetailedBidComponent/ConfirmBidDialog";

const getRemainingTime = (closingTime?: string) => {
  if (!closingTime) return "N/A";
  const now = Date.now();
  const end = new Date(closingTime).getTime();
  const diff = end - now;
  if (diff <= 0) return "Bid Closed";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return [
    days && `${days}d`,
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    `${seconds}s`,
  ]
    .filter(Boolean)
    .join(" ");
};

const OrderDetails = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("bid_ID") ?? "";
  const { data: session } = useSession();
  const carrierId = session?.user?.id ?? "";
  const { data, isLoading } = useGetOrderByIdQuery({
    orderId,
  });
  const { data: bidData, isLoading: isBidLoading } = useGetBidByOrderIdQuery({
    orderId,
  });
  const [placeBid, { isLoading: placingBid }] =
    usePlacingTheBidForOrderMutation();
  const [tab, setTab] = useState<BidTab>("information");
  const [remainingTime, setRemainingTime] = useState("");
  const [openBidDialog, setOpenBidDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const bidDataDetails = bidData?.data?.[0];
  const order = data?.order;
  const allocation = order?.allocations?.[0];
  const allocatedPackageDetails = data?.allocated_packages_details;
  useEffect(() => {
    if (!bidDataDetails?.bid_closing_time) return;
    const updateTimer = () => {
      setRemainingTime(getRemainingTime(bidDataDetails.bid_closing_time));
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [bidDataDetails?.bid_closing_time]);
  const existingBid = useMemo(() => {
    if (!carrierId || !bidDataDetails?.all_bids?.length) return null;
    return (
      bidDataDetails.all_bids.find((bid: any) => bid.bid_from === carrierId) ??
      null
    );
  }, [carrierId, bidDataDetails]);
  const lowestBid = useMemo(() => {
    if (!bidDataDetails?.all_bids?.length) return null;
    return Math.min(
      ...bidDataDetails.all_bids.map((bid: any) => Number(bid.bid_amount)),
    );
  }, [bidDataDetails]);

  const handleOpenBidDialog = () => {
    if (existingBid) return;
    setBidAmount("");
    setOpenBidDialog(true);
  };

  const handleCloseBidDialog = () => {
    if (placingBid) return;

    setOpenBidDialog(false);
  };
  const handleOpenConfirmation = () => {
    if (!bidAmount) return;
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmation = () => {
    if (placingBid) return;

    setOpenConfirmDialog(false);
  };
  const handlePlaceBid = async () => {
    if (!bidAmount) return;
    try {
      await placeBid({
        bid_id: bidDataDetails.bid_id,
        order_ID: bidDataDetails.order_ID,
        body: {
          bid_amount: bidAmount,
          bid_from: carrierId,
          bid_placed_at: new Date().toISOString(),
        },
      }).unwrap();
      setOpenConfirmDialog(false);
      setOpenBidDialog(false);
      setSnackbarOpen(true);
      setBidAmount("");
    } catch (error) {
      console.error("Failed to place bid", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  if (isLoading || isBidLoading) {
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
          bidAmount={bidDataDetails?.bid_value}
          remainingTime={remainingTime}
          bidStatus={bidDataDetails?.bid_status}
          existingBid={existingBid}
          lowestBid={lowestBid}
          onPlaceBid={handleOpenBidDialog}
        />
        <BidTabs value={tab} onChange={setTab} />
        {tab === "information" && (
          <InformationTab
            order={order}
            allocation={allocation}
            bidData={bidDataDetails}
          />
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
      <BidPlaceDialog
        open={openBidDialog}
        onClose={handleCloseBidDialog}
        onSubmit={handleOpenConfirmation}
        loading={placingBid}
        orderId={bidDataDetails?.order_ID ?? ""}
        remainingTime={remainingTime}
        targetAmount={bidDataDetails?.bid_value ?? ""}
        lowestBid={lowestBid}
        startLocation={
          // allocation?.start_loc_desc ?? order?.start_loc_desc ?? ""
          allocation?.route[0]?.start?.address ?? "-"
        }
        //  allocation?.route[allocation?.route.length-1]?.end?.address ?? "-"
        endLocation={
          // allocation?.end_loc_desc ?? order?.end_loc_desc ?? ""
          allocation?.route[allocation?.route.length - 1]?.end?.address ?? "-"
        }
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
      />
      <ConfirmBidDialog
        open={openConfirmDialog}
        loading={placingBid}
        orderId={bidDataDetails?.order_ID ?? ""}
        bidAmount={bidAmount}
        onClose={handleCloseConfirmation}
        onConfirm={handlePlaceBid}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Bid placed successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderDetails;
