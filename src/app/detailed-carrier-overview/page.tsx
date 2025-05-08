'use client';
import React from "react";
import { useGetCarrierAssignmentByOrderIdQuery, useGetOrderByIdQuery } from "@/api/apiSlice";
import { Backdrop, CircularProgress, Paper, Typography, Box } from "@mui/material";
import Allocations from "@/Components/Allocations/DetailedOrderOverviewAllocation";
import { useSearchParams } from 'next/navigation';
import moment from "moment";

const OrderDetailedOverview: React.FC = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_ID') || '';
    const from = searchParams.get('from') ?? '';
    const { data: order, isLoading } = useGetOrderByIdQuery({ orderId });
    const { data: getAssignmentDetails, isLoading: isAssignmentLoading, error: isAssignmentError } = useGetCarrierAssignmentByOrderIdQuery(orderId);
    const getAssignmentData = getAssignmentDetails?.data[0]
    console.log("getAssignmentData: ", getAssignmentData)
    const orderData = order?.order;
    const allocatedPackageDetails = order?.allocated_packages_details

    if (isAssignmentError) {
        console.log("Getting while fecting carrier assigment details: ", isAssignmentError)
    }

    return (
        <Box sx={{ p: { xs: 0.2, md: 3 } }}>
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading || isAssignmentLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {orderData && (
                <Paper sx={{ p: 3, mb: 3, }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#F08C24", fontWeight: 'bold' }}>
                        Order Details
                    </Typography>
                    <Box display="flex"
                        flexWrap="wrap"
                        gap={2}
                        mt={{ xs: 0.2, md: 2 }}
                    >
                        <Box flex="1 1 100%" maxWidth={{ sm: "33%" }}>
                            <Typography variant="body1" sx={{ fontSize: { xs: '15px', md: '17px' } }}>Order ID: <strong>{orderData.order_ID}</strong></Typography>
                        </Box>
                        <Box flex="1 1 100%" maxWidth={{ sm: "33%" }}>
                            <Typography variant="body1" sx={{ fontSize: { xs: '15px', md: '17px' } }}>Scenario:  <strong>{orderData.scenario_label}</strong> </Typography>
                        </Box>
                        <Box flex="1 1 100%" maxWidth={{ sm: "33%" }}>
                            <Typography variant="body1" sx={{ fontSize: { xs: '15px', md: '17px' } }}>Created at: <strong>{moment(orderData.created_at).format("DD MMM YYYY")}</strong></Typography>
                        </Box>
                    </Box>
                </Paper>
            )}

            {orderData?.allocations && <Allocations allocations={orderData.allocations} orderId={orderData.order_ID} allocatedPackageDetails={allocatedPackageDetails} from={from} assignmentData={getAssignmentData} />}
        </Box>
    );
};

export default OrderDetailedOverview;
