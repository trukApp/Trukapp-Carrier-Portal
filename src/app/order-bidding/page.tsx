'use client';
import { useGetAllBiddingOrdersQuery } from '@/api/apiSlice';
import React, { useState } from 'react'
import { CarrierBidOrder } from '@/types/types';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import moment from 'moment';
import { Backdrop, CircularProgress, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Visibility } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/Store';
import { setOrderID } from '@/Store/authSlice';

const OrderBidding: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId)
    const { data: getAllOrderBidding, isLoading: isFetching } = useGetAllBiddingOrdersQuery(carrierIdFromRedux);
    const [loading, setLoading] = useState(false)

    const allOrdersBidding = getAllOrderBidding?.data || []

    console.log("getAllOrderBidding: ", allOrdersBidding)
    const handleViewOrder = (orderId: string, id: string) => {
        setLoading(true)
        dispatch(setOrderID(orderId))
        router.push(`/detailed-bid-overview?bid_ID=${id}`);
    };
    const ordersColumns: GridColDef[] = [
        { field: 'order_ID', headerName: 'Order ID', width: 150 },
        { field: 'bid_value', headerName: 'Bid Value (₹)', width: 150 },
        { field: 'bid_timing', headerName: 'Bid Timing', width: 150 },
        {
            field: 'bid_start_time',
            headerName: 'Bid Start Time',
            width: 180,
        },
        { field: 'scenario_label', headerName: 'Scenario', width: 220 },
        { field: 'total_weight', headerName: 'Total Weight (kg)', width: 180 },
        { field: 'total_distance', headerName: 'Distance (km)', width: 150 },
        { field: 'allocated_vehicles', headerName: 'Vehicles', width: 150 },
        { field: 'allocated_packages', headerName: 'Packages', width: 150 },
        { field: 'order_status', headerName: 'Status', width: 180 },
        {
            field: 'view',
            headerName: 'View',
            width: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton onClick={() => handleViewOrder(params.row.order_ID, params.row.id)} sx={{ color: "#F08C24" }}>
                    <Visibility />
                </IconButton>
            ),
        },
    ];


    return (
        <>
            <Backdrop
                open={loading || isFetching}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DataGrid
                rows={allOrdersBidding.map((order: CarrierBidOrder, index: number) => ({
                    id: order.bid_id || index,
                    order_ID: order.order_ID,
                    bid_value: order.bid_value,
                    bid_timing: order.bid_timing,
                    bid_start_time: moment(order.bid_start_time).format('DD MMM YYYY, HH:mm'),
                    scenario_label: order.scenario_label,
                    total_weight: order.total_weight,
                    total_distance: order.total_distance,
                    allocated_vehicles: order.allocated_vehicles?.join(', ') || '—',
                    allocated_packages: order.allocated_packages?.join(', ') || '—',
                    order_status: order.order_status,
                }))}

                columns={ordersColumns}
                autoHeight
                disableRowSelectionOnClick
                pageSizeOptions={[10, 20, 30]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
            />
        </>
    )
}

export default OrderBidding