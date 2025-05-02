'use client';
import React from "react";
import { useGetAllCarrierPlacedBidsOrdersQuery, useGetOrderByIdQuery } from "@/api/apiSlice";
import { Backdrop, CircularProgress, Grid, Paper, Typography, Box } from "@mui/material";
import OrderBidOverviewAllocation from "@/Components/Allocations/OrderBidOverviewAllocation";
import { CarrierBidData } from "@/types/types";
import { useSearchParams } from 'next/navigation';
import moment from "moment";
import { useAppSelector } from "@/Store";

const OrderDetailedOverview: React.FC = () => {
    const searchParams = useSearchParams();
    const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId)
    const bidID = searchParams.get('bid_ID') || '';
    const orderId = useAppSelector((state) => state.auth.orderID)
    const from = searchParams.get('from') ?? '';
    const { data: order, isLoading } = useGetOrderByIdQuery({ orderId });
    const { data: getAllBids, isLoading: biddingLoading } = useGetAllCarrierPlacedBidsOrdersQuery(orderId);
    const isCarrirerBidded = getAllBids?.data[0]?.all_bids.filter((eachEahCarrier: CarrierBidData) => {
        return eachEahCarrier?.bid_from === carrierIdFromRedux
    })
    console.log("isCarrirerBidded: ", isCarrirerBidded)
    console.log("getAllBids: ", getAllBids?.data[0])
    const orderData = order?.order;
    const allocatedPackageDetails = order?.allocated_packages_details
    return (
        <Box sx={{ p: { xs: 0.2, md: 3 } }}>
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading || biddingLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {orderData && (
                <Paper sx={{ p: 3, mb: 3, }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#F08C24", fontWeight: 'bold' }}>
                        Order Details
                    </Typography>
                    <Grid container spacing={1} sx={{ mt: { xs: 0.2, md: 2 } }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" sx={{ fontSize: { xs: '15px', md: '17px' } }}>Order ID: <strong>{orderData.order_ID}</strong></Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" sx={{ fontSize: { xs: '15px', md: '17px' } }}>Scenario:  <strong>{orderData.scenario_label}</strong> </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" sx={{ fontSize: { xs: '15px', md: '17px' } }}>Total Cost: <strong>₹{parseFloat(orderData.total_cost).toFixed(2)}</strong></Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" sx={{ fontSize: { xs: '15px', md: '17px' } }}>Created at: <strong>{moment(orderData.created_at).format("DD MMM YYYY")}</strong></Typography>
                        </Grid>
                    </Grid>
                </Paper>
            )}

            {orderData?.allocations && <OrderBidOverviewAllocation allocations={orderData.allocations} orderId={orderData.order_ID} allocatedPackageDetails={allocatedPackageDetails} from={from} bidID={bidID} isCarrirerBidded={isCarrirerBidded} />}
        </Box>
    );
};

export default OrderDetailedOverview;
