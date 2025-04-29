"use client"

import React from "react";
import TransportExecution from "@/Components/TransportExecution/TransportExecution";
import { Grid } from '@mui/material';

const Home = () => {
  return (
    <Grid sx={{ marginLeft: { xs: 0, md: '30px' }, marginTop: '30px', padding: '15px' }}>
      <TransportExecution />
    </Grid>
  );
}

export default Home