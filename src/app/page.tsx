"use client"

import React from "react";
import TransportExecution from "@/Components/TransportExecution/TransportExecution";
import { Grid } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector
} from "@/Store";
import { setCarrierId } from "@/Store/authSlice";
import { useSession } from "next-auth/react";

const Home = () => {
  const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId)
  const { data: session } = useSession();
  const dispatch = useAppDispatch()
  const carrierId = session?.user?.id
  if (carrierId) {
      dispatch(setCarrierId(carrierId))
  }
  console.log('carrierIdfromRedux home:', carrierIdFromRedux)
  return (
    <Grid sx={{   padding: '15px' }}>
      <TransportExecution />
    </Grid>
  );
}

export default Home