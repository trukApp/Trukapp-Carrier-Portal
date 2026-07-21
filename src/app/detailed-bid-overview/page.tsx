// "use client";
// import React from "react";
// import {
//   useGetAllCarrierPlacedBidsOrdersQuery,
//   useGetLocationMasterQuery,
//   useGetOrderByIdQuery,
// } from "@/api/apiSlice";
// import {
//   Backdrop,
//   CircularProgress,
//   Grid,
//   Paper,
//   Typography,
//   Box,
// } from "@mui/material";
// import OrderBidOverviewAllocation from "@/Components/Allocations/OrderBidOverviewAllocation";
// import { CarrierBidData } from "@/types/types";
// import { useSearchParams } from "next/navigation";
// import moment from "moment";
// import { useAppSelector } from "@/Store";

// const OrderDetailedOverview: React.FC = () => {
//   const searchParams = useSearchParams();
//   const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId);
//   const bidID = searchParams.get("bid_ID") || "";
//   const orderId = useAppSelector((state) => state.auth.orderID);
//   const from = searchParams.get("from") ?? "";
//   const { data: order, isLoading } = useGetOrderByIdQuery({ orderId });
//   const { data: locationsData } = useGetLocationMasterQuery({});
//   const getAllLocations =
//     locationsData?.locations && locationsData.locations.length > 0
//       ? locationsData.locations
//       : [];

//   console.log("order", order);
//   const { data: getAllBids, isLoading: biddingLoading } =
//     useGetAllCarrierPlacedBidsOrdersQuery(orderId);
//   const allBids = getAllBids?.data?.[0]?.all_bids;
//   const isCarrirerBidded = Array.isArray(allBids)
//     ? allBids.filter(
//         (eachEahCarrier: CarrierBidData) =>
//           eachEahCarrier?.bid_from === carrierIdFromRedux,
//       )
//     : [];

//   const orderData = order?.order;
//   const allocatedPackageDetails = order?.allocated_packages_details;
//   return (
//     <Box sx={{ p: { xs: 0.2, md: 3 } }}>
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={isLoading || biddingLoading}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//       {orderData && (
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{ color: "#F08C24", fontWeight: "bold" }}
//           >
//             Order Details
//           </Typography>
//           <Grid container spacing={1} sx={{ mt: { xs: 0.2, md: 2 } }}>
//             <Grid item xs={12} md={6}>
//               <Typography
//                 variant="body1"
//                 sx={{ fontSize: { xs: "15px", md: "17px" } }}
//               >
//                 Order ID: <strong>{orderData.order_ID}</strong>
//               </Typography>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography
//                 variant="body1"
//                 sx={{ fontSize: { xs: "15px", md: "17px" } }}
//               >
//                 Created at:{" "}
//                 <strong>
//                   {moment(orderData.created_at).format("DD MMM YYYY")}
//                 </strong>
//               </Typography>
//             </Grid>
//           </Grid>
//         </Paper>
//       )}

//       {orderData?.allocations && (
//         <OrderBidOverviewAllocation
//           allocations={orderData.allocations}
//           orderId={orderData.order_ID}
//           allocatedPackageDetails={allocatedPackageDetails}
//           from={from}
//           bidID={bidID}
//           isCarrirerBidded={isCarrirerBidded}
//           getAllLocations={getAllLocations}
//         />
//       )}
//     </Box>
//   );
// };

// export default OrderDetailedOverview;

"use client";

import { useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import BidHeader from "./BidHeader";
import BidTabs, { BidTab } from "./BidTabs";
import { useGetBidByOrderIdQuery, useGetOrderByIdQuery } from "@/api/apiSlice";
import InformationTab from "@/Components/DetailedBidComponent/tabs/InformationTab";
import CargoTab from "@/Components/DetailedBidComponent/tabs/CargoTab";
import TourTab from "@/Components/DetailedBidComponent/tabs/TourTab";
import ContactsTab from "@/Components/DetailedBidComponent/tabs/ContactsTab";
import AttachmentsTab from "@/Components/DetailedBidComponent/tabs/AttachmentsTab";

const OrderDetails = () => {
  const searchParams = useSearchParams();
  const bid_ID = searchParams.get("bid_ID") ?? "";

  const { data, isLoading } = useGetOrderByIdQuery({ orderId: bid_ID });
  const { data: bidData, isLoading: isBidLoading } = useGetBidByOrderIdQuery({
    orderId: bid_ID,
  });
  console.log("data", data);

  const [tab, setTab] = useState<BidTab>("information");
  const bidDataDetails = bidData?.data?.[0];
  console.log("bidDataDetails", bidDataDetails);
  const allocatedPackageDetails = data?.allocated_packages_details;
  if (isLoading || isBidLoading) {
    return (
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  const order = data?.order;
  console.log("order", order);
  const allocation = order?.allocations?.[0];

  return (
    <Box>
      <BidHeader order={order} bidAmount={bidDataDetails?.bid_value} />
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
  );
};

export default OrderDetails;
