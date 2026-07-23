import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import { useRouter } from 'next/navigation';
import { usePlacingTheBidForOrderMutation } from "@/api/apiSlice";
// import SnackbarAlert from "../ReusableComponents/SnackbarAlerts";
import moment from "moment";
// import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from "yup";
// import { useSelector } from "react-redux";
// import { RootState } from "@/Store";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@/Store";

interface RoutePoint {
  start: {
    address: string;
    latitude: number;
    longitude: number;
  };
  end: {
    address: string;
    latitude: number;
    longitude: number;
  };
  distance: string;
  duration: string;
}

interface Allocation {
  vehicle_ID: string;
  cost: number;
  totalVolumeCapacity: number;
  totalWeightCapacity: number;
  occupiedVolume: number;
  occupiedWeight: number;
  leftoverVolume: number;
  leftoverWeight: number;
  packages: string[];
  route: RoutePoint[];
}
interface AllocationsProps {
  allocations: Allocation[];
  orderId: string;
  allocatedPackageDetails: [];
  from: string;
  bidID: string;
  isCarrirerBidded: CarrierBid[];
  getAllLocations: Location[];
}

interface Product {
  prod_ID: string;
  quantity: number;
  package_info: string;
}
interface AdditionalInformation {
  reference_id: string;
  invoice: string;
  department: string;
  sales_order_number: string;
  po_number: string;
  attachment: string;
}

interface TaxInformation {
  sender_gst: string;
  receiver_gst: string;
  carrier_gst: string;
  self_transport: string;
  tax_rate: string;
}
interface ProductLine {
  prod_ID: string;
  quantity: number;
  package_info: string;
}
interface PackageDetail {
  product_lines: ProductLine[];
  pac_id: string;
  pack_ID: string;
  package_status: string;
  ship_from: string;
  ship_to: string;
  pickup_date_time: string;
  dropoff_date_time: string;
  return_label: boolean;
  product_ID: Product[];
  bill_to: string;
  additional_info: AdditionalInformation;
  tax_info: TaxInformation;
}
export interface ProductDetails {
  product_ID: string;
  product_desc: string;
  product_name: string;
  weight: string;
}

interface Location {
  loc_ID: string;
  address_1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface CarrierBid {
  bid_amount: string;
  bid_from: string;
  bid_placed_at: string;
}

const OrderBidOverviewAllocation: React.FC<AllocationsProps> = ({
  allocations,
  orderId,
  allocatedPackageDetails,
  bidID,
  isCarrirerBidded,
  getAllLocations,
}) => {
  const theme = useTheme();
  const carrierIdFromRedux = useAppSelector((state) => state.auth.carrierId);
  const carrierBids = isCarrirerBidded as CarrierBid[];

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("success");
  const [openAcceptCarrier, setOpenAcceptCarrier] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [placeBid, { isLoading: isAssignConfirm }] =
    usePlacingTheBidForOrderMutation();
  // const { data: productsData } = useGetAllProductsQuery({})
  // const allProductsData = productsData?.products || [];
  // const { data: locationsData } = useGetLocationMasterQuery({});
  // const getAllLocations = locationsData?.locations?.length > 0 ? locationsData?.locations : [];
  const getLocationDetails = (loc_ID: string) => {
    const location = getAllLocations.find(
      (loc: Location) => loc.loc_ID === loc_ID,
    );
    if (!location) return "Location details not available";
    const details = [
      location.address_1,
      location.city,
      location.state,
      location.country,
      location.pincode,
      // location.loc_ID
    ].filter(Boolean);

    return details.length > 0
      ? details.join(", ")
      : "Location details not available";
  };
  const handleToggle = (vehicleId: string) => {
    setExpanded((prev) => ({ ...prev, [vehicleId]: !prev[vehicleId] }));
  };

  const initialValuesAccept = {
    amount: "",
  };

  const validationSchemaAccept = Yup.object().shape({
    amount: Yup.string().required("Amount is required"),
  });

  const handleSubmitAccept = async (values: typeof initialValuesAccept) => {
    const placeBidPayload = {
      bid_id: bidID,
      order_ID: orderId,
      body: {
        bid_amount: values.amount,
        bid_from: carrierIdFromRedux,
        bid_placed_at: new Date().toISOString().slice(0, 19),
      },
    };
    try {
      await placeBid(placeBidPayload).unwrap;
    } catch (error) {
      console.log("Getting Error While Placing the Bid to Order: ", error);
    }

    setOpenAcceptCarrier(false);
  };
  return (
    <Box>
      <Backdrop
        sx={{
          color: "#ffffff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isAssignConfirm}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography
        variant="h6"
        gutterBottom
        color="#F08C24"
        style={{ fontWeight: "bold" }}
      >
        Allocations
      </Typography>

      {allocations.map((allocation) => {
        const uniqueKey = `${allocation.vehicle_ID}_${allocation.route[0].end.address}`;
        return (
          <>
            <Dialog
              open={openAcceptCarrier}
              onClose={() => setOpenAcceptCarrier(false)}
              maxWidth="xs"
              fullWidth
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: "#f5f5f5",
                    p: 2,
                    borderRadius: 2.5,
                  },
                },
              }}
            >
              <DialogTitle sx={{ m: 0, p: 2, position: "relative" }}>
                Place the amount to bid for this order {orderId}
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenAcceptCarrier(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>

              <Formik
                initialValues={initialValuesAccept}
                validationSchema={validationSchemaAccept}
                onSubmit={handleSubmitAccept}
              >
                {({
                  values: valuesAccept,
                  handleChange: handleChangeAccept,
                  errors: errorsAccept,
                  touched: touchedAccept,
                }) => (
                  <Form>
                    <DialogContent>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <TextField
                          fullWidth
                          size="small"
                          label="Amount"
                          name="amount"
                          value={valuesAccept.amount}
                          onChange={handleChangeAccept}
                          error={
                            touchedAccept.amount && Boolean(errorsAccept.amount)
                          }
                          helperText={
                            touchedAccept.amount && errorsAccept.amount
                          }
                        />
                      </Box>
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={() => setOpenAcceptCarrier(false)}>
                        Cancel
                      </Button>
                      <Button variant="contained" type="submit">
                        Submit
                      </Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </Dialog>

            <Paper key={uniqueKey} sx={{ p: 2, mb: 2 }}>
              <Grid
                container
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Grid sx={{ width: "97.5%" }}>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    {carrierBids.length > 0 && (
                      <Typography
                        // sx={{ mt: 3, textAlign: isMobile ? "center" : "right" }}
                        sx={{
                          textAlign: isMobile ? "center" : "right",
                          fontSize: 12,
                          color: "primary.main",
                          backgroundColor: "#FCF0DE",
                          paddingLeft: 2,
                          paddingRight: 2,
                          paddingTop: 0.7,
                          paddingBottom: 0.3,
                          borderRadius: 1.5,
                        }}
                      >
                        You bid for this amount{" "}
                        <Box
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontSize: 13,
                            fontWeight: "bold",
                          }}
                        >
                          {carrierBids[0]?.bid_amount}/-
                        </Box>
                      </Typography>
                    )}
                  </Grid>

                  <Typography variant="body2">
                    Route: <strong>{allocation.route[0].start.address}</strong>{" "}
                    → <strong>{allocation.route[0].end.address}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Distance: <strong>{allocation.route[0].distance}</strong> |
                    Duration: <strong>{allocation.route[0].duration}</strong>
                  </Typography>
                </Grid>
                <Grid sx={{ width: "2.5%" }}>
                  <IconButton onClick={() => handleToggle(uniqueKey)}>
                    {expanded[uniqueKey] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>

              <Collapse in={expanded[uniqueKey]} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    boxShadow: 2,
                  }}
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Box sx={{ display: "flex", flex: "1 1 30%" }}>
                      <Typography variant="body2">
                        Total Weight:
                        <strong>{allocation.occupiedWeight.toFixed(2)}</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ marginLeft: "20px" }}>
                        Total Volume:{" "}
                        <strong>
                          {allocation.occupiedVolume
                            ? (allocation?.occupiedVolume).toFixed(2)
                            : "0.00"}
                        </strong>
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Packages:</strong>{" "}
                      {allocation.packages.join(", ")}
                    </Typography>
                  </Box>

                  {allocatedPackageDetails
                    .filter((pkg: PackageDetail) =>
                      allocation.packages.includes(pkg.pack_ID),
                    )
                    .map((pkg: PackageDetail) => (
                      <Box key={pkg.pac_id}>
                        <Grid
                          key={pkg.pac_id}
                          sx={{
                            mt: { xs: 1, md: 2 },
                            backgroundColor: "#e9e7e7",
                            borderRadius: 1,
                            p: 2,
                          }}
                        >
                          <Typography variant="subtitle2" gutterBottom>
                            <strong>Package ID: {pkg.pack_ID}</strong>
                          </Typography>

                          <Typography variant="body2">
                            <strong>Status:</strong> {pkg.package_status}
                          </Typography>
                          <Grid sx={{ whiteSpace: "nowrap", p: 2 }}>
                            <Grid
                              container
                              spacing={2}
                              sx={{
                                minWidth: "1000px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Grid>
                                <Typography
                                  color="#F08C24"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    marginTop: "15px",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Billing Details
                                </Typography>
                                <Grid>
                                  <Typography variant="body2">
                                    Ship From:{" "}
                                    <strong>
                                      {" "}
                                      {getLocationDetails(pkg.ship_from)}
                                    </strong>
                                  </Typography>
                                  <Typography variant="body2">
                                    Ship To:{" "}
                                    <strong>
                                      {" "}
                                      {getLocationDetails(pkg.ship_to)}
                                    </strong>
                                  </Typography>
                                  <Typography variant="body2">
                                    Bill To:{" "}
                                    <strong>
                                      {" "}
                                      {getLocationDetails(pkg.bill_to)}
                                    </strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid>
                                <Typography
                                  color="#F08C24"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    marginTop: "15px",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Date & Timings
                                </Typography>
                                <Grid>
                                  <Typography variant="body2">
                                    Pickup Date:
                                    <strong>
                                      {" "}
                                      {moment(pkg.pickup_date_time).format(
                                        "DD MMM YYYY, hh:mm A",
                                      )}
                                    </strong>
                                  </Typography>
                                  <Typography variant="body2">
                                    Dropoff Date:
                                    <strong>
                                      {" "}
                                      {moment(pkg.dropoff_date_time).format(
                                        "DD MMM YYYY, hh:mm A",
                                      )}
                                    </strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  {isCarrirerBidded.length > 0 ? null : (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: isMobile ? "center" : "flex-end",
                        mt: 3,
                        gap: 3,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenAcceptCarrier(true)}
                      >
                        Accept
                      </Button>
                    </Box>
                  )}
                </Box>
              </Collapse>
            </Paper>
          </>
        );
      })}
    </Box>
  );
};

export default OrderBidOverviewAllocation;
