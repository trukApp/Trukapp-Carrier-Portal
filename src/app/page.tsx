"use client"

import React from "react";
import TransportExecution from "@/Components/HomeComponents/TransportExecution/TransportExecution";
// import DockerManagement from "../Components/HomeComponents/DockerManagement/DockerManagement";
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
    <Grid sx={{ padding: '15px' }}>
      <TransportExecution />
      {/* <DockerManagement /> */}
    </Grid>
  );
}

export default Home