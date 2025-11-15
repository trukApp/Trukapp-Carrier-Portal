'use client';

import {
    useGetAllBiddingOrdersQuery,
    useGetAllFinalizedBiddingsQuery,
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

interface PackageDestRadius {
    pack_ID: string;
    ship_to: string;
    destination_radius: string;
}

const OrderBidding: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId);

    // Carrier bids
    const { data: getAllOrderBidding, isLoading: isFetching } =
        useGetAllBiddingOrdersQuery(carrierIdFromRedux);

    // Finalized bids
    const { data: getAllFinalizedBidding, isLoading: finalizedBidsFetching } =
        useGetAllFinalizedBiddingsQuery(carrierIdFromRedux);

    // Location master
    const { data: locationsData } = useGetLocationMasterQuery({});

    const getAllLocations =
        locationsData?.locations && locationsData.locations.length > 0
            ? locationsData.locations
            : [];

    const [loading, setLoading] = useState(false);
    const capitalize = (str: string) =>
        str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;


    const allOrdersBidding = getAllOrderBidding?.data || [];
    const finalizedBids = getAllFinalizedBidding?.data || [];
    console.log("All Order Bidding Data:", allOrdersBidding)
    /** Helper — convert loc_ID → city */
    const getLocationName = (locId: string) => {
        const found = getAllLocations.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (loc: any) => loc.loc_ID === locId
        );
        return found ? found.city : locId;
    };

    /** Open detailed bid page */
    const handleViewOrder = (orderId: string, id: string) => {
        setLoading(true);
        dispatch(setOrderID(orderId));
        router.push(`/detailed-bid-overview?bid_ID=${id}`);
    };

    /** ⏳ Shared columns between both tables */
    const sharedBaseColumns: GridColDef[] = [
        { field: 'order_ID', headerName: 'Order ID', width: 150 },
        { field: 'bid_status', headerName: 'Bid Status', width: 150 },
        { field: 'bid_start_time', headerName: 'Bid Start Time', width: 180 },
        { field: 'expected_pickup', headerName: 'Expected Pickup', width: 180 },
        { field: 'bid_timing', headerName: 'Bid End Time', width: 180 },
        { field: 'start_loc_name', headerName: 'Start Location', width: 180 },
        { field: 'end_loc_name', headerName: 'End Location', width: 180 },
        { field: 'drop_points', headerName: 'Drop Points', width: 260 },
        { field: 'total_weight', headerName: 'Total Weight (kg)', width: 160 },
        { field: 'total_distance', headerName: 'Distance (km)', width: 150 },
    ];

    // 🔥 Shared columns WITHOUT drop_points (for finalized bids table)
    const finalizedBaseColumns: GridColDef[] = sharedBaseColumns.filter(
        (col) => col.field !== "drop_points"
    );


    const carrierBidColumns: GridColDef[] = [
        ...sharedBaseColumns,

        // ⭐ Carrier bid amount column
        { field: 'carrier_bid_amount', headerName: 'Carrier Bid Amount', width: 180 },

        {
            field: 'view',
            headerName: 'View',
            width: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton
                    onClick={() =>
                        handleViewOrder(params.row.order_ID, params.row.id)
                    }
                    sx={{ color: '#F08C24' }}
                >
                    <Visibility />
                </IconButton>
            ),
        },
    ];


    /** ➤ FINALIZED BID COLUMNS (includes Carrier Bid + Finalized Amount) */
    // const finalizedBidColumns: GridColDef[] = [
    //     ...sharedBaseColumns,

    //     // ⭐ Carrier bid
    //     // { field: 'carrier_bid_amount', headerName: 'Carrier Bid Amount', width: 180 },

    //     // ⭐ Finalized amount
    //     { field: 'finalized_amount', headerName: 'Finalized Amount', width: 180 },

    //     {
    //         field: 'view',
    //         headerName: 'View',
    //         width: 100,
    //         sortable: false,
    //         renderCell: (params: GridRenderCellParams) => (
    //             <IconButton
    //                 onClick={() =>
    //                     handleViewOrder(params.row.order_ID, params.row.id)
    //                 }
    //                 sx={{ color: '#F08C24' }}
    //             >
    //                 <Visibility />
    //             </IconButton>
    //         ),
    //     },
    // ];
    const finalizedBidColumns: GridColDef[] = [
        ...finalizedBaseColumns,

        { field: 'finalized_amount', headerName: 'Finalized Amount', width: 180 },

        {
            field: 'view',
            headerName: 'View',
            width: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton
                    onClick={() =>
                        handleViewOrder(params.row.order_ID, params.row.id)
                    }
                    sx={{ color: '#F08C24' }}
                >
                    <Visibility />
                </IconButton>
            ),
        },
    ];
    const carrierBidRows = allOrdersBidding.map(
        (order: CarrierBidOrder, index: number) => {
            const dropPoints =
                order.package_dest_radius
                    ?.map((p: PackageDestRadius) => getLocationName(p.ship_to))
                    .join(", ") || "—";

            // ⭐ FIND LOGGED-IN CARRIER'S BID FROM all_bids
            let carrierBidAmount = "Not Quoted";

            if (order.all_bids && Array.isArray(order.all_bids)) {
                const myBid = order.all_bids.find(
                    (b) => b.bid_from === carrierIdFromRedux
                );

                if (myBid) {
                    carrierBidAmount = myBid.bid_amount || "Not Quoted";
                }
            }

            return {
                id: order.bid_id ?? index,

                order_ID: order.order_ID,
                bid_status: capitalize(order.bid_status),

                bid_start_time: moment(order.bid_start_time).format(
                    "DD MMM YYYY, HH:mm"
                ),

                expected_pickup: moment(order.bid_start_time)
                    .add(1, "day")
                    .format("DD MMM YYYY"),

                bid_timing: moment(order.bid_closing_time).format(
                    "DD MMM YYYY, HH:mm"
                ),

                start_loc_name: getLocationName(order.start_loc_ID),
                end_loc_name: getLocationName(order.end_loc_ID),

                drop_points: dropPoints,

                total_weight: order.total_weight,
                total_distance: order.total_distance,
                order_status: order.order_status,

                // ⭐ FINAL CARRIER BID FIELD SHOWN IN TABLE
                carrier_bid_amount: carrierBidAmount,
            };
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalizedBidRows = finalizedBids.map((bid: any, index: number) => {
        const dropPoints =
            bid.package_dest_radius
                ?.map((p: PackageDestRadius) => getLocationName(p.ship_to))
                .join(', ') || '—';

        return {
            id: bid.bid_id ?? index,
            order_ID: bid.order_ID,
            bid_status: capitalize(bid.bid_status),

            bid_start_time: moment(bid.bid_start_time).format(
                'DD MMM YYYY, HH:mm'
            ),

            expected_pickup: moment(bid.bid_start_time)
                .add(1, 'day')
                .format('DD MMM YYYY'),

            bid_timing:
                bid.bid_closing_time?.includes('mins')
                    ? bid.bid_end_time
                    : moment(bid.bid_end_time).format('DD MMM YYYY, HH:mm'),

            start_loc_name: getLocationName(bid.start_loc_ID),
            end_loc_name: getLocationName(bid.end_loc_ID),

            drop_points: dropPoints,

            total_weight: bid.total_weight,
            total_distance: bid.total_distance,
            order_status: bid.order_status,

            // ⭐ Carrier bid amount
            // carrier_bid_amount: bid.bid_value ?? '—',

            // ⭐ Finalized amount
            finalized_amount: bid.finalised_bid?.finalised_bid ?? '—',
        };
    });

    return (
        <>
            <Backdrop
                open={loading || isFetching || finalizedBidsFetching}
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* SECTION 1 — Carrier Bids */}
            <Box mb={3} mt={2}>
                <Typography variant="h5" fontWeight={600} color="primary">
                    Carrier Bid Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Active bids submitted by your carrier.
                </Typography>
            </Box>

            <DataGrid
                rows={carrierBidRows}
                columns={carrierBidColumns}
                autoHeight
                disableRowSelectionOnClick
                pageSizeOptions={[10, 20, 30]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
            />

            {/* SECTION 2 — Finalized Bids */}
            <Box mb={3} mt={5}>
                <Typography variant="h5" fontWeight={600} color="primary">
                    Finalized Bids
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Completed / closed bids with finalized amounts.
                </Typography>
            </Box>

            <DataGrid
                rows={finalizedBidRows}
                columns={finalizedBidColumns}
                autoHeight
                disableRowSelectionOnClick
                pageSizeOptions={[10, 20, 30]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
            />
        </>
    );
};

export default withAuthComponent(OrderBidding);
