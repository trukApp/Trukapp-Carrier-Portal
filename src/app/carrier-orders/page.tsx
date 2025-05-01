// 'use client';

// import React from 'react';
// import { useSearchParams } from 'next/navigation';
// import { useGetCarrierAssignmentsQuery } from '@/api/apiSlice';

// const CarrierOrdersPage = () => {
//     const searchParams = useSearchParams();
//     const carrierID = searchParams.get('carrierID');
//     const { data: getAllAssignments, isLoading } = useGetCarrierAssignmentsQuery(carrierID);
//     const getAllCarrierAssignments = getAllAssignments?.data
//     console.log("getAllAssignments: ", getAllCarrierAssignments)

//     return (
//         <div>
//             CarrierOrdersPage - Carrier ID: {carrierID}
//         </div>
//     );
// };

// export default CarrierOrdersPage;




'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetCarrierAssignmentsQuery } from '@/api/apiSlice';
import {
    Backdrop,
    Box,
    CircularProgress,
    Typography,
    Chip,
    IconButton,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { withAuthComponent } from '@/Components/WithAuthComponent';
import { useAppSelector } from '@/Store';
import { CarrierAssignment } from '@/types/types';

// Define a strict interface for assignment data
const CarrierOrdersPage: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const carrierId = searchParams.get('carrierID') || '';
    const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId)
    console.log('carrierIdFromRedux orders :', carrierIdFromRedux)
    const [loading, setLoading] = useState(false);

    const { data: assignments, isLoading: isFetching } = useGetCarrierAssignmentsQuery(carrierId);
    const getAllCarrierAssignments: CarrierAssignment[] = assignments?.data || [];

    const handleNavigateToOrder = (orderId: string) => {
        setLoading(true);
        router.push(`/detailed-carrier-overview?order_ID=${orderId}&from=${carrierId}`);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'cas_ID', headerName: 'Assignment ID', width: 160 },
        { field: 'order_ID', headerName: 'Order ID', width: 130 },
        {
            field: 'assignment_status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => {
                const status = params.value;
                let label = '';
                let color: 'success' | 'error' | 'warning' = 'warning';

                switch (status) {
                    case 'carrier confirmed':
                        label = 'Confirmed';
                        color = 'success';
                        break;
                    case 'carrier rejected':
                        label = 'Rejected';
                        color = 'error';
                        break;
                    case 'pending':
                    default:
                        label = 'Pending';
                        color = 'warning';
                        break;
                }

                return <Chip label={label} color={color} size="small" />;
            },
        },

        { field: 'assigned_time', headerName: 'Assigned Time', width: 180 },
        { field: 'confirmed_time', headerName: 'Confirmed Time', width: 180 },
        {
            field: 'driver_name',
            headerName: 'Driver',
            width: 160,
            renderCell: (params) => <Chip label={params.value} size="small" />
        },
        { field: 'vehicle_num', headerName: 'Vehicle Number', width: 160 },
        { field: 'total_distance', headerName: 'Distance (km)', width: 130 },
        { field: 'confirmed_to', headerName: 'Confirmed To', width: 130 },
        {
            field: 'view',
            headerName: 'View',
            width: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton onClick={() => handleNavigateToOrder(params.row.order_ID)} sx={{ color: "#F08C24" }}>
                    <Visibility />
                </IconButton>
            ),
        },
    ];

    const rows = getAllCarrierAssignments.map((item, idx) => ({
        id: idx + 1,
        cas_ID: item.cas_ID,
        order_ID: item.order_ID,
        assignment_status: item.assignment_status,
        assigned_time: item.assigned_time,
        confirmed_time: item.confirmed_time ?? '—',
        driver_name: item.driver_data?.c_driver_name ?? '—',
        vehicle_num: item.vehicle_num ?? '—',
        total_distance: item.assignment_cost?.total_distance ?? 'N/A',
        confirmed_to: item.confirmed_to ?? '—',
    }));

    return (
        <>
            <Backdrop open={isFetching || loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box p={4}>
                <Typography variant="h5" gutterBottom fontWeight="bold" color='primary'>
                    🚚 Carrier Orders
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    Carrier ID: <strong>{carrierId}</strong>
                </Typography>

                <Box sx={{ height: 600, mt: 3 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        loading={isFetching}
                        sx={{
                            borderRadius: 2,
                            boxShadow: 3,
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f5f5f5',
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-cell': {
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                            },
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default withAuthComponent(CarrierOrdersPage);
