'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, Backdrop, CircularProgress } from '@mui/material';
import { LocalShipping, } from '@mui/icons-material';
// import BuildIcon from '@mui/icons-material/Build';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/Store';


const DockerManagement = () => {
    const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId)
    const router = useRouter();
    console.log("carrierIdFromRedux: ", carrierIdFromRedux)
    const [loading, setLoading] = useState(false);


    const handleNavigation = (path: string) => {
        setLoading(true);
        router.push(path);
    };


    const tiles = [
        {
            title: 'Docker Timings',
            icon: <LocalShipping sx={{ fontSize: { xs: 40, sm: 50, md: 60, lg: 70 } }} />,
            onClick: () => handleNavigation('/order-bidding'),
        },
        // {
        //     title: 'Order requests',
        //     icon: <LocalShipping sx={{ fontSize: { xs: 40, sm: 50, md: 60, lg: 70 } }} />,
        //     onClick: () => handleNavigation('/order-requests'),
        // },
        // {
        //     title: 'Carrier orders',
        //     icon: <LocalShipping sx={{ fontSize: { xs: 40, sm: 50, md: 60, lg: 70 } }} />,
        //     onClick: () => handleNavigation(`/carrier-orders?carrierID=${carrierIdFromRedux}`),
        // },
    ];

    return (
        <>
            <Backdrop
                open={loading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box>
                <Typography variant="h6" sx={{ mt: 1, mb: 1, color: '#F08C24', fontWeight: 'bold' }}>
                    Docker Management
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(4, 1fr)',
                            md: 'repeat(6, 1fr)',
                            lg: 'repeat(8, 1fr)',
                        },
                    }}
                >
                    {tiles.map((tile, index) => (
                        <Card
                            key={index}
                            onClick={tile.onClick}
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                backgroundColor: '#ffffff',
                                boxShadow: 3,
                                borderRadius: 5,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                    backgroundColor: '#FCF0DE',
                                },
                                cursor: 'pointer'
                            }}
                        >
                            {tile.icon}
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                    fontWeight: 'bold',
                                    mt: 1,
                                }}
                            >
                                {tile.title}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Box>
        </>

    );
};

export default DockerManagement;
