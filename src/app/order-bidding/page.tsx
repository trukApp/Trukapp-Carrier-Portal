'use client';

import {
    useGetAllBiddingOrdersQuery,
    useGetLocationMasterQuery,
} from '@/api/apiSlice';
import React, { useState } from 'react';
import { CarrierBidOrder } from '@/types/types';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import moment from 'moment';
import {
    Backdrop,
    Box,
    CircularProgress,
    IconButton,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Visibility } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/Store';
import { setOrderID } from '@/Store/authSlice';
import { withAuthComponent } from '@/Components/WithAuthComponent';

const OrderBidding: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId);

    const { data: getAllOrderBidding, isLoading: isFetching } =
        useGetAllBiddingOrdersQuery(carrierIdFromRedux);

    const { data: locationsData } = useGetLocationMasterQuery({});

    const getAllLocations =
        locationsData?.locations && locationsData.locations.length > 0
            ? locationsData.locations
            : [];

    const [loading, setLoading] = useState(false);

    const allOrdersBidding = getAllOrderBidding?.data || [];

    // Get location city name instead of loc_ID
    const getLocationName = (locId: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const found = getAllLocations.find((loc: any) => loc.loc_ID === locId);
        return found ? found.city : locId;
    };

    const handleViewOrder = (orderId: string, id: string) => {
        setLoading(true);
        dispatch(setOrderID(orderId));
        router.push(`/detailed-bid-overview?bid_ID=${id}`);
    };

    const ordersColumns: GridColDef[] = [
        { field: 'order_ID', headerName: 'Order ID', width: 150 },

        { field: 'bid_status', headerName: 'Bid Status', width: 150 },

        {
            field: 'bid_start_time',
            headerName: 'Bid Start Time',
            width: 180,
        },

        {
            field: 'expected_pickup',
            headerName: 'Expected Pickup',
            width: 180,
        },

        {
            field: 'bid_timing',
            headerName: 'Bid End Time',
            width: 180,
        },

        { field: 'start_loc_name', headerName: 'Start Location', width: 180 },
        { field: 'end_loc_name', headerName: 'End Location', width: 180 },

        { field: 'drop_points', headerName: 'Drop Points', width: 240 },

        { field: 'total_weight', headerName: 'Total Weight (kg)', width: 180 },
        { field: 'total_distance', headerName: 'Distance (km)', width: 150 },

        { field: 'order_status', headerName: 'Status', width: 160 },

        {
            field: 'view',
            headerName: 'View',
            width: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton
                    onClick={() => handleViewOrder(params.row.order_ID, params.row.id)}
                    sx={{ color: "#F08C24" }}
                >
                    <Visibility />
                </IconButton>
            ),
        },
    ];

    return (
        <>
            <Backdrop
                open={loading || isFetching}
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box mb={2} mt={3}>
                <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    color="primary"
                >
                    Order Bidding Overview
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    View and manage all your current bid submissions across available
                    orders. Track bid values, timelines, drop points, and order statuses.
                </Typography>
            </Box>

            <DataGrid
                rows={allOrdersBidding.map((order: CarrierBidOrder, index: number) => {
                    const dropPoints =
                        order.package_dest_radius
                            ?.map((p) => `${getLocationName(p.ship_to)}`)
                            .join(', ') || '—';

                    return {
                        id: order.bid_id || index,
                        order_ID: order.order_ID,
                        bid_status: order.bid_status,

                        bid_start_time: moment(order.bid_start_time).format(
                            'DD MMM YYYY, HH:mm'
                        ),

                        expected_pickup: moment(order.bid_start_time)
                            .add(1, 'day')
                            .format('DD MMM YYYY'),

                        bid_timing: moment(order.bid_closing_time).format(
                            'DD MMM YYYY, HH:mm'
                        ),

                        start_loc_name: getLocationName(order.start_loc_ID),
                        end_loc_name: getLocationName(order.end_loc_ID),

                        drop_points: dropPoints,

                        total_weight: order.total_weight,
                        total_distance: order.total_distance,
                        order_status: order.order_status,
                    };
                })}
                columns={ordersColumns}
                autoHeight
                disableRowSelectionOnClick
                pageSizeOptions={[10, 20, 30]}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10 },
                    },
                }}
            />
        </>
    );
};

export default withAuthComponent(OrderBidding);
