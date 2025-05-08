import React, { useEffect, useState } from "react";
import { Box, Collapse, IconButton, Paper, Typography, Button, useTheme, useMediaQuery, TextField, Backdrop, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, } from "@mui/material";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDockRequestingToPickOrderMutation, useGetAllProductsQuery, useGetLocationMasterQuery, useGetOrderByIdQuery, usePostCarrierAssigningOrderConfirmMutation, usePostCarrierRejectigOrderMutation, } from "@/api/apiSlice";
import SnackbarAlert from "../ReusableComponents/SnackbarAlerts";
import moment from "moment";
import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { AllocationsProps, Product, ProductDetails, Location, PackageDetails } from "@/types/types";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const Allocations: React.FC<AllocationsProps> = ({ allocations, orderId, allocatedPackageDetails, from, assignmentData, }) => {
    const getMaximumDateAndTimeToRequest = allocatedPackageDetails[0]?.pickup_date_time
    console.log("getMaximumDateAndTimeToRequest: ", getMaximumDateAndTimeToRequest)
    const [openReject, setOpenReject] = useState(false);
    const [requestDockTime, { isLoading: dockRequestLoading }] = useDockRequestingToPickOrderMutation()
    // const { refetch: refetchOrderById } = useGetOrderByIdQuery({ orderId }, { skip: true });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openAcceptCarrier, setOpenAcceptCarrier] = useState(false);
    const [openDockRequest, setOpenDockRequest] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("success");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [postRejectOrderByCarrier, { isLoading: isRejecting }] =
        usePostCarrierRejectigOrderMutation();
    const [postAssignOrderByCarrier, { isLoading: isAssignConfirm }] =
        usePostCarrierAssigningOrderConfirmMutation();
    const { data: productsData } = useGetAllProductsQuery({});
    const allProductsData = productsData?.products || [];
    const { data: locationsData } = useGetLocationMasterQuery({});
    const getAllLocations =
        locationsData?.locations.length > 0 ? locationsData?.locations : [];
    const getLocationDetails = (loc_ID: string) => {
        const location = getAllLocations.find(
            (loc: Location) => loc.loc_ID === loc_ID
        );
        if (!location) return "Location details not available";
        const details = [
            location.address_1,
            location.city,
            location.state,
            location.country,
            location.pincode,
        ].filter(Boolean);
        return details.length > 0
            ? details.join(", ")
            : "Location details not available";
    };

    const {
        data: order,
        refetch: fetchOrderById,
        isFetching,
        error,
    } = useGetOrderByIdQuery({ orderId }, { skip: !orderId });
    // const {
    //     data: getAssignmentDetails,
    //     isLoading: isAssignmentLoading,
    //     error: isAssignmentError,
    // } = useGetCarrierAssignmentByOrderIdQuery(orderId);
    // const costForAssigment = getAssignmentDetails?.data[0]?.assignment_cost?.cost;
    // if (isAssignmentError) {
    //     console.log("assigment error: ", isAssignmentError);
    // }

    const getProductDetails = (productID: string) => {
        const productInfo = allProductsData.find(
            (product: ProductDetails) => product.product_ID === productID
        );
        if (!productInfo) return "Package details not available";
        const details = [productInfo.product_name, productInfo.product_ID].filter(Boolean);
        return details.length > 0 ? details.join("-") : "Product details not available";
    };
    console.log("assignmentData: ", assignmentData);
    const handleToggle = (vehicleId: string) => {
        setExpanded((prev) => ({ ...prev, [vehicleId]: !prev[vehicleId] }));
    };

    useEffect(() => {
        if (orderId) {
            fetchOrderById();
        }
    }, [orderId, fetchOrderById]);

    if (isFetching) return <p>Loading...</p>;
    if (error) return <p>Error fetching order details</p>;

    const handleCloseReject = () => {
        setOpenReject(false);
    };

    const handleYes = () => {
        handleRejectByCarrier();
        handleCloseReject();
    };

    console.log("order: ", order);

    const handleRejectByCarrier = async () => {
        const carrierIdForOrder = from; // from is the carrier id which we are getting via params when comig from order req for carrier page
        try {
            const body = {
                carrier_ID: carrierIdForOrder,
                order_ID: orderId,
            };
            console.log("bodyy:", body);
            const response = await postRejectOrderByCarrier(body).unwrap();
            console.log("Rejection response:", response);
            if (response) {
                setSnackbarMessage(`Order ${orderId} rejected !`);
                setSnackbarSeverity("info");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error rejecting:", error);
            setSnackbarMessage(
                `Unable to reject this order now , try after sometime.`
            );
            setSnackbarSeverity("info");
            setSnackbarOpen(true);
        }
    };

    const initialValuesAccept = {
        vehicleNumAccept: "",
        driverNameAccept: "",
        driverNumberAccept: "",
        driverLicenseAccept: "",
        deviceIdAccept: "",
    };

    const validationSchemaAccept = Yup.object().shape({
        vehicleNumAccept: Yup.string().required("Vehicle Number is required"),
        driverNameAccept: Yup.string().required("Driver Name is required"),
        driverNumberAccept: Yup.string()
            .required("Driver Number is required")
            .matches(/^[0-9]{10}$/, "Driver Number must be 10 digits"),
        driverLicenseAccept: Yup.string().required("Driver License is required"),
        deviceIdAccept: Yup.string().required("Device ID is required"),
    });

    const handleOpenDialog = () => {
        setOpenReject(true);
    };

    const handleSubmitAccept = async (values: typeof initialValuesAccept) => {
        console.log("Submitted Accept Data:", values);
        const carrierIdForOrder = from;
        try {
            const body = {
                carrier_ID: carrierIdForOrder,
                order_ID: orderId,
                vehicle_num: values.vehicleNumAccept,
                driver_data: {
                    c_driver_name: values.driverNameAccept,
                    c_driver_number: values.driverNumberAccept,
                    c_driver_license: values.driverLicenseAccept,
                },
                device_ID: values.deviceIdAccept,
                confirmed_time: Date.now(),
            };
            const response = await postAssignOrderByCarrier(body).unwrap();
            if (response) {
                setSnackbarMessage(
                    `Carrier ${carrierIdForOrder} assigned to Order ${orderId}  successfully!`
                );
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error assigning:", error);
            setSnackbarMessage(
                `Unable to assign this order now , try after sometime.`
            );
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
        setOpenAcceptCarrier(false);
    };


    const handleRequestDockTime = async (values: { assignmentDateTime: Date }) => {
        const date = values.assignmentDateTime;
        const pad = (n: number) => n.toString().padStart(2, "0");

        const formatted =
            `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
            `T${pad(date.getHours())}:${pad(date.getMinutes())}`;

        const requestBody = {
            cas_ID: assignmentData?.cas_ID,
            order_ID: orderId,
            dock_time_requested: formatted
        }
        try {
            console.log("requestBody: ", requestBody)
            await requestDockTime(requestBody).unwrap();

            setOpenDockRequest(false)
        } catch (error) {
            console.log("Getting error while requesting dock: ", error)
        }

        console.log("body: ", requestBody)

    };


    return (
        <Box>
            <Backdrop
                sx={{ color: "#ffffff", zIndex: (theme) => theme.zIndex.drawer + 1, }}
                open={isRejecting || isAssignConfirm || dockRequestLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />

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
                        <Dialog open={openReject} onClose={handleCloseReject}>
                            <DialogTitle sx={{ m: 0, p: 2, position: "relative" }}>
                                Confirm Rejection
                                <IconButton
                                    aria-label="close"
                                    onClick={handleCloseReject}
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
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to reject this order?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseReject} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleYes} color="error" autoFocus>
                                    Yes, Reject
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            open={openAcceptCarrier}
                            onClose={() => setOpenAcceptCarrier(false)}
                            maxWidth="xs"
                            fullWidth
                            PaperProps={{
                                sx: {
                                    backgroundColor: "#f5f5f5",
                                    padding: "10px",
                                    borderRadius: "20px",
                                },
                            }}
                        >
                            <DialogTitle sx={{ m: 0, p: 2, position: "relative" }}>
                                Confirm Carrier Assignment
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
                                            <Box display="flex" flexDirection="column" gap={2}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Vehicle Number"
                                                    name="vehicleNumAccept"
                                                    value={valuesAccept.vehicleNumAccept}
                                                    onChange={handleChangeAccept}
                                                    error={
                                                        touchedAccept.vehicleNumAccept &&
                                                        Boolean(errorsAccept.vehicleNumAccept)
                                                    }
                                                    helperText={
                                                        touchedAccept.vehicleNumAccept &&
                                                        errorsAccept.vehicleNumAccept
                                                    }
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Driver Name"
                                                    size="small"
                                                    name="driverNameAccept"
                                                    value={valuesAccept.driverNameAccept}
                                                    onChange={handleChangeAccept}
                                                    error={
                                                        touchedAccept.driverNameAccept &&
                                                        Boolean(errorsAccept.driverNameAccept)
                                                    }
                                                    helperText={
                                                        touchedAccept.driverNameAccept &&
                                                        errorsAccept.driverNameAccept
                                                    }
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Driver Number"
                                                    size="small"
                                                    name="driverNumberAccept"
                                                    value={valuesAccept.driverNumberAccept}
                                                    onChange={handleChangeAccept}
                                                    error={
                                                        touchedAccept.driverNumberAccept &&
                                                        Boolean(errorsAccept.driverNumberAccept)
                                                    }
                                                    helperText={
                                                        touchedAccept.driverNumberAccept &&
                                                        errorsAccept.driverNumberAccept
                                                    }
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Driver License"
                                                    size="small"
                                                    name="driverLicenseAccept"
                                                    value={valuesAccept.driverLicenseAccept}
                                                    onChange={handleChangeAccept}
                                                    error={
                                                        touchedAccept.driverLicenseAccept &&
                                                        Boolean(errorsAccept.driverLicenseAccept)
                                                    }
                                                    helperText={
                                                        touchedAccept.driverLicenseAccept &&
                                                        errorsAccept.driverLicenseAccept
                                                    }
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Device ID"
                                                    size="small"
                                                    name="deviceIdAccept"
                                                    value={valuesAccept.deviceIdAccept}
                                                    onChange={handleChangeAccept}
                                                    error={
                                                        touchedAccept.deviceIdAccept &&
                                                        Boolean(errorsAccept.deviceIdAccept)
                                                    }
                                                    helperText={
                                                        touchedAccept.deviceIdAccept &&
                                                        errorsAccept.deviceIdAccept
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
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Dialog
                                open={openDockRequest}
                                onClose={() => setOpenAcceptCarrier(false)}
                                maxWidth="xs"
                                fullWidth
                                PaperProps={{
                                    sx: {
                                        backgroundColor: "#f5f5f5",
                                        padding: "10px",
                                        borderRadius: "20px",
                                    },
                                }}
                            >
                                <DialogTitle sx={{ m: 0, p: 2, position: "relative" }}>
                                    Requesting Dock time
                                    <IconButton
                                        aria-label="close"
                                        onClick={() => setOpenDockRequest(false)}
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
                                    initialValues={{ assignmentDateTime: new Date() }}
                                    // validationSchema={validationSchemaAccept}
                                    onSubmit={handleRequestDockTime}
                                >
                                    {({ values, setFieldValue, errors, touched }) => (
                                        <Form>
                                            <DialogContent>
                                                <Box display="flex" flexDirection="column" gap={2}>
                                                    <DateTimePicker
                                                        label="Assignment Date & Time"
                                                        value={values.assignmentDateTime}
                                                        onChange={(value) => setFieldValue('assignmentDateTime', value)}
                                                        minDateTime={new Date()}
                                                        maxDateTime={new Date(getMaximumDateAndTimeToRequest)}
                                                        enableAccessibleFieldDOMStructure={false}
                                                        slots={{ textField: TextField }}
                                                        slotProps={{
                                                            textField: {
                                                                fullWidth: true,
                                                                size: "small",
                                                                error: touched.assignmentDateTime && Boolean(errors.assignmentDateTime),
                                                                helperText:
                                                                    touched.assignmentDateTime && typeof errors.assignmentDateTime === "string"
                                                                        ? errors.assignmentDateTime
                                                                        : "",
                                                            },
                                                        }}
                                                    />



                                                </Box>
                                            </DialogContent>

                                            <DialogActions>
                                                <Button onClick={() => setOpenDockRequest(false)}>Cancel</Button>
                                                <Button variant="contained" type="submit">Submit</Button>
                                            </DialogActions>
                                        </Form>
                                    )}
                                </Formik>

                            </Dialog>
                        </LocalizationProvider >

                        <Paper key={uniqueKey} sx={{ p: 2, mb: 2 }}>
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="space-between"
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
                                        <Typography
                                            variant="subtitle1"
                                            color="#F08C24"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Vehicle: {allocation.vehicle_ID}
                                            {(from === "order-overview" ||
                                                from === "order-bidding") && (
                                                    <> | Cost: ₹{allocation?.cost?.toFixed(2)}</>
                                                )}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#F08C24"
                                            sx={{
                                                fontSize: 11,
                                                backgroundColor: "#FCF0DE",
                                                paddingLeft: 2,
                                                paddingRight: 2,
                                                paddingTop: 0.7,
                                                paddingBottom: 0.3,
                                                borderRadius: 1.5,
                                            }}
                                        >
                                            {order?.order?.order_status}
                                        </Typography>
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
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 1, fontWeight: 600 }}
                                        color="#F08C24"
                                    >
                                        Vehicle ID: {allocation.vehicle_ID}
                                    </Typography>

                                    <Box display="flex" flexWrap="wrap" gap={2}>
                                        <Box flex="1 1 30%">
                                            <Typography variant="body2">
                                                Total Weight Capacity:{" "}
                                                <strong>
                                                    {" "}
                                                    {allocation.totalWeightCapacity.toFixed(2)}
                                                </strong>
                                            </Typography>
                                            <Typography variant="body2">
                                                Total Volume Capacity:{" "}
                                                <strong>
                                                    {" "}
                                                    {allocation.totalVolumeCapacity.toFixed(2)}
                                                </strong>
                                            </Typography>
                                        </Box>
                                        <Box flex="1 1 30%">
                                            <Typography variant="body2">
                                                Occupied Weight:
                                                <strong>{allocation.occupiedWeight.toFixed(2)}</strong>
                                            </Typography>
                                            <Typography variant="body2">
                                                Occupied Volume:{" "}
                                                <strong>
                                                    {allocation.occupiedVolume
                                                        ? (allocation?.occupiedVolume).toFixed(2)
                                                        : "0.00"}
                                                </strong>
                                            </Typography>
                                        </Box>

                                        <Box flex="1 1 30%">
                                            <Typography variant="body2">
                                                Leftover Weight:{" "}
                                                <strong> {allocation.leftoverWeight.toFixed(2)}</strong>
                                            </Typography>
                                            <Typography variant="body2">
                                                Leftover Volume:{" "}
                                                <strong> {allocation.leftoverVolume.toFixed(2)}</strong>
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body2">
                                            <strong>Packages:</strong>{" "}{allocation.packages.join(", ")}
                                        </Typography>
                                    </Box>

                                    {allocatedPackageDetails.filter((pkg: PackageDetails) => allocation.packages.includes(pkg.pack_ID)).map((pkg: PackageDetails) => (
                                        <Box key={pkg.pac_id}>
                                            <Grid
                                                key={pkg.pac_id}
                                                sx={{
                                                    mt: { xs: 1, md: 2 },
                                                    p: 2,
                                                    backgroundColor: "#e9e7e7",
                                                    borderRadius: 1,
                                                }}
                                            >
                                                <Typography variant="subtitle2" gutterBottom>
                                                    <strong>Package ID: {pkg.pack_ID}</strong>
                                                </Typography>

                                                <Typography variant="body2">
                                                    <strong>Status:</strong> {pkg.package_status}
                                                </Typography>
                                                <Grid
                                                    sx={{ overflowX: "auto", whiteSpace: "nowrap" }}
                                                >
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        sx={{
                                                            minWidth: "1000px",
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <Grid style={{ marginLeft: "20px" }}>
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
                                                                            "DD MMM YYYY, hh:mm A"
                                                                        )}
                                                                    </strong>
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    Dropoff Date:
                                                                    <strong>
                                                                        {" "}
                                                                        {moment(pkg.dropoff_date_time).format(
                                                                            "DD MMM YYYY, hh:mm A"
                                                                        )}
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
                                                                Additional Info
                                                            </Typography>
                                                            <Grid>
                                                                {pkg.additional_info?.reference_id && (
                                                                    <Typography variant="body2">
                                                                        Refernce ID:{" "}
                                                                        <strong>
                                                                            {" "}
                                                                            {pkg.additional_info?.reference_id}
                                                                        </strong>
                                                                    </Typography>
                                                                )}

                                                                {pkg.additional_info?.invoice && (
                                                                    <Typography variant="body2">
                                                                        Invoice:
                                                                        <strong>
                                                                            {" "}
                                                                            {pkg.additional_info?.invoice}
                                                                        </strong>
                                                                    </Typography>
                                                                )}

                                                                {pkg.additional_info?.department && (
                                                                    <Typography variant="body2">
                                                                        Department:
                                                                        <strong>
                                                                            {" "}
                                                                            {pkg.additional_info?.department}
                                                                        </strong>
                                                                    </Typography>
                                                                )}

                                                                {pkg.additional_info?.sales_order_number && (
                                                                    <Typography variant="body2">
                                                                        Sales order number:{" "}
                                                                        <strong>{" "}{pkg.additional_info?.sales_order_number}</strong>
                                                                    </Typography>
                                                                )}

                                                                {pkg.additional_info?.po_number && (
                                                                    <Typography variant="body2">
                                                                        Po number:{" "}
                                                                        <strong>
                                                                            {" "}
                                                                            {pkg.additional_info?.po_number}
                                                                        </strong>
                                                                    </Typography>
                                                                )}
                                                                {pkg?.additional_info?.attachment && (
                                                                    <div style={{ display: "flex" }}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            style={{ fontWeight: "bold" }}
                                                                        >
                                                                            Attachment:
                                                                        </Typography>
                                                                        <div
                                                                            style={{
                                                                                position: "relative",
                                                                                width: "50px",
                                                                                height: "45px",
                                                                                marginTop: "5px",
                                                                            }}
                                                                        >
                                                                            <Image
                                                                                src={pkg?.additional_info?.attachment}
                                                                                alt="Attachment"
                                                                                fill
                                                                                sizes="(max-width: 768px) 100vw, 300px"
                                                                                style={{ objectFit: "contain" }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
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
                                                                Tax Info
                                                            </Typography>
                                                            <Grid>
                                                                {pkg.tax_info?.sender_gst && (
                                                                    <Typography variant="body2">
                                                                        GSTN of sender:
                                                                        <strong>
                                                                            {" "}
                                                                            {pkg.tax_info?.sender_gst}
                                                                        </strong>
                                                                    </Typography>
                                                                )}

                                                                {pkg.tax_info?.receiver_gst && (
                                                                    <Typography variant="body2">
                                                                        GSTN of receiver:{" "}
                                                                        <strong>
                                                                            {" "}
                                                                            {pkg.tax_info?.receiver_gst}
                                                                        </strong>
                                                                    </Typography>
                                                                )}

                                                                {pkg.tax_info?.carrier_gst && (
                                                                    <Typography variant="body2">
                                                                        GSTN of carrier:{" "}
                                                                        <strong>
                                                                            {" "}
                                                                            {pkg.tax_info?.carrier_gst}
                                                                        </strong>
                                                                    </Typography>
                                                                )}
                                                                {pkg.tax_info?.self_transport && (
                                                                    <Typography variant="body2">
                                                                        Is self transport:{" "}
                                                                        <strong>
                                                                            {" "}
                                                                            {pkg.tax_info?.self_transport}
                                                                        </strong>
                                                                    </Typography>
                                                                )}
                                                                {pkg.tax_info?.tax_rate && (
                                                                    <Typography variant="body2">
                                                                        Tax rate:{" "}
                                                                        <strong> {pkg.tax_info?.tax_rate}</strong>
                                                                    </Typography>
                                                                )}

                                                                {pkg.return_label && (
                                                                    <Typography variant="body2">
                                                                        Return Label:
                                                                        <strong>
                                                                            {" "}
                                                                            {pkg.return_label ? "Yes" : "No"}
                                                                        </strong>
                                                                    </Typography>
                                                                )}
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
                                                                Product Details
                                                            </Typography>
                                                            <Box sx={{ mt: 1 }}>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{ fontWeight: "bold" }}
                                                                >
                                                                    Products:
                                                                </Typography>
                                                                {pkg.product_ID.map(
                                                                    (prod: Product, index: number) => (
                                                                        <Typography
                                                                            key={index}
                                                                            variant="body2"
                                                                            sx={{ ml: 2 }}
                                                                        >
                                                                            - {getProductDetails(prod.prod_ID)}{" "}
                                                                            (Qty: {prod.quantity})
                                                                        </Typography>
                                                                    )
                                                                )}
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))}
                                    {order?.order?.order_status === "carrier assignment" ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: isMobile ? "center" : "flex-end",
                                                mt: 3,
                                                gap: 3,
                                            }}
                                        >
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => setOpenAcceptCarrier(true)}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleOpenDialog}
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        </Box>
                                    ) : order?.order?.order_status === "open bidding" ? (
                                        <>
                                            <Typography
                                                color="#00000"
                                                style={{
                                                    fontSize: "15px",
                                                    marginTop: "15px",
                                                    marginBottom: "5px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Dock requested successfully
                                            </Typography>
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
                                        </>
                                    ) : assignmentData?.dock_allocation_status === "requested" ? (
                                        <Typography
                                            color="#00000"
                                            style={{
                                                fontSize: "15px",
                                                marginTop: "15px",
                                                marginBottom: "5px",
                                                textAlign: "center",
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Dock requested successfully, waiting for confirmation
                                        </Typography>
                                    ) : assignmentData?.assignment_status && assignmentData?.assignment_status ? (
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
                                                onClick={() => setOpenDockRequest(true)}
                                            >
                                                Request for dock
                                            </Button>
                                        </Box>
                                    ) : null}
                                </Box>
                            </Collapse>
                        </Paper>
                    </>
                );
            })}
        </Box >
    );
};

export default Allocations;
