"use client";

import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  useGetAllProductsQuery,
  useGetLocationMasterQuery,
} from "@/api/apiSlice";
import {
  Allocation,
  Order,
  PackageDetail,
  ProductDetails,
  Location,
  Product,
} from "@/types/DetailedBidTypes";
import moment from "moment";

interface CargoTabProps {
  order: Order;
  allocation?: Allocation;
  allocatedPackageDetails: PackageDetail[];
}

const CargoTab: React.FC<CargoTabProps> = ({
  allocation,
  allocatedPackageDetails,
}) => {
  const { data: locationsData } = useGetLocationMasterQuery({});
  console.log("locationsData:", locationsData);
  const getAllLocations =
    locationsData?.locations.length > 0 ? locationsData?.locations : [];
  const { data: productsData } = useGetAllProductsQuery({});
  const allProductsData = productsData?.products || [];
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
  const getProductDetails = (productID: string) => {
    const productInfo = allProductsData.find(
      (product: ProductDetails) => product.product_ID === productID,
    );
    if (!productInfo) return "Package details not available";
    const details = [productInfo.product_name, productInfo.product_ID].filter(
      Boolean,
    );
    return details.length > 0
      ? details.join("-")
      : "Product details not available";
  };

  return (
    <Grid
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }} color="#F08C24">
        Vehicle ID: {allocation?.vehicle_ID}
      </Typography>

      <Grid container spacing={2}>
        <Grid sx={{ xs: 12, md: 4 }}>
          <Typography variant="body2">
            Total Weight Capacity:{" "}
            <strong> {allocation?.totalWeightCapacity.toFixed(2)}</strong>
          </Typography>
          <Typography variant="body2">
            Total Volume Capacity:{" "}
            <strong> {allocation?.totalVolumeCapacity.toFixed(2)}</strong>
          </Typography>
        </Grid>
        <Grid sx={{ xs: 12, md: 4 }}>
          <Typography variant="body2">
            Occupied Weight:
            <strong> {allocation?.occupiedWeight.toFixed(2)}</strong>
          </Typography>
          <Typography variant="body2">
            Occupied Volume:{" "}
            <strong>
              {allocation?.occupiedVolume
                ? (allocation?.occupiedVolume).toFixed(2)
                : "0.00"}
            </strong>
          </Typography>
        </Grid>

        <Grid sx={{ xs: 12, md: 4 }}>
          <Typography variant="body2">
            Leftover Weight:{" "}
            <strong> {allocation?.leftoverWeight.toFixed(2)}</strong>
          </Typography>
          <Typography variant="body2">
            Leftover Volume:{" "}
            <strong> {allocation?.leftoverVolume.toFixed(2)}</strong>
          </Typography>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Packages:</strong> {allocation?.packages.join(", ")}
        </Typography>
      </Grid>

      {allocatedPackageDetails
        .filter((pkg: PackageDetail) =>
          allocation?.packages.includes(pkg.pack_ID),
        )
        .map((pkg: PackageDetail) => (
          <Grid key={pkg.pac_id}>
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
              <Grid sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
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
                      style={{
                        color: "#F08C24",
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
                        <strong> {getLocationDetails(pkg.ship_from)}</strong>
                      </Typography>
                      <Typography variant="body2">
                        Ship To:{" "}
                        <strong> {getLocationDetails(pkg.ship_to)}</strong>
                      </Typography>
                      <Typography variant="body2">
                        Bill To:{" "}
                        <strong> {getLocationDetails(pkg.bill_to)}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Typography
                      style={{
                        color: "#F08C24",
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
                  <Grid>
                    <Typography
                      style={{
                        color: "#F08C24",
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
                          <strong> {pkg.additional_info?.reference_id}</strong>
                        </Typography>
                      )}

                      {pkg.additional_info?.invoice && (
                        <Typography variant="body2">
                          Invoice:
                          <strong> {pkg.additional_info?.invoice}</strong>
                        </Typography>
                      )}

                      {pkg.additional_info?.department && (
                        <Typography variant="body2">
                          Department:
                          <strong> {pkg.additional_info?.department}</strong>
                        </Typography>
                      )}

                      {pkg.additional_info?.sales_order_number && (
                        <Typography variant="body2">
                          Sales order number:{" "}
                          <strong>
                            {" "}
                            {pkg.additional_info?.sales_order_number}
                          </strong>
                        </Typography>
                      )}

                      {pkg.additional_info?.po_number && (
                        <Typography variant="body2">
                          Po number:{" "}
                          <strong> {pkg.additional_info?.po_number}</strong>
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Typography
                      style={{
                        color: "#F08C24",
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
                          <strong> {pkg.tax_info?.sender_gst}</strong>
                        </Typography>
                      )}

                      {pkg.tax_info?.receiver_gst && (
                        <Typography variant="body2">
                          GSTN of receiver:{" "}
                          <strong> {pkg.tax_info?.receiver_gst}</strong>
                        </Typography>
                      )}

                      {pkg.tax_info?.carrier_gst && (
                        <Typography variant="body2">
                          GSTN of carrier:{" "}
                          <strong> {pkg.tax_info?.carrier_gst}</strong>
                        </Typography>
                      )}
                      {pkg.tax_info?.self_transport && (
                        <Typography variant="body2">
                          Is self transport:{" "}
                          <strong> {pkg.tax_info?.self_transport}</strong>
                        </Typography>
                      )}
                      {pkg.tax_info?.tax_rate && (
                        <Typography variant="body2">
                          Tax rate: <strong> {pkg.tax_info?.tax_rate}</strong>
                        </Typography>
                      )}

                      {pkg.return_label && (
                        <Typography variant="body2">
                          Return Label:
                          <strong> {pkg.return_label ? "Yes" : "No"}</strong>
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: "#F08C24",
                        marginTop: "15px",
                        marginBottom: "5px",
                      }}
                    >
                      Product Details
                    </Typography>
                    <Grid sx={{ mt: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Products:
                      </Typography>
                      {pkg.product_lines.map((prod: Product, index: number) => (
                        <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                          - {getProductDetails(prod.prod_ID)} (Qty:{" "}
                          {prod.quantity})
                        </Typography>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default CargoTab;
