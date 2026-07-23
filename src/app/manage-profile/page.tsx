"use client";
import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  // BusinessLocation,
  BusinessProfileFormValues,
} from "@/types/ManageProfile";
import CompanyInformationCard from "@/Components/ManageProfileComponents/CompanyInformationCard";
import BrandingCard from "@/Components/ManageProfileComponents/BrandingCard";
// import LocationsCard from "@/Components/ManageProfileComponents/LocationsCard";
import BusinessSettingsCard from "@/Components/ManageProfileComponents/BusinessSettingsCard";
import AuditInformationCard from "@/Components/ManageProfileComponents/AuditInformationCard";
import StickyFooter from "@/Components/ManageProfileComponents/StickyFooter";

const validationSchema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
  primaryAddress: Yup.string().required("Primary Address is required"),
  contactPerson: Yup.string().required("Contact Person is required"),
  contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10 digit phone number"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  locationName: Yup.string(),
  locationAddress: Yup.string(),
});

const initialValues: BusinessProfileFormValues = {
  companyName: "",
  primaryAddress: "",
  contactPerson: "",
  contactNumber: "",
  email: "",
  companyLogo: null,
  cnpId: "",
  locationName: "",
  locationAddress: "",
  businessVisible: true,
  autoAcceptConnections: false,
  createdBy: "Admin",
  createdOn: new Date().toLocaleDateString(),
  updatedBy: "Admin",
  updatedOn: new Date().toLocaleDateString(),
  locations: [],
};

const ManageBusinessProfilePage = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const preview = useMemo(() => {
    if (!logo) return "";

    return URL.createObjectURL(logo);
  }, [logo]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const formik = useFormik<BusinessProfileFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // API Call will be added in Part 8C

        console.log(values);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("companyLogo", logo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo]);

  const generateCnpId = () => {
    const id = `CNP-${Math.floor(100000 + Math.random() * 900000)}`;
    formik.setFieldValue("cnpId", id);
  };

  // const addLocation = () => {
  //   if (
  //     !formik.values.locationName.trim() ||
  //     !formik.values.locationAddress.trim()
  //   ) {
  //     return;
  //   }

  //   const newLocation: BusinessLocation = {
  //     id: Date.now(),
  //     locationName: formik.values.locationName,
  //     locationAddress: formik.values.locationAddress,
  //   };
  //   formik.setFieldValue("locations", [
  //     ...formik.values.locations,
  //     newLocation,
  //   ]);
  //   formik.setFieldValue("locationName", "");
  //   formik.setFieldValue("locationAddress", "");
  // };

  // const editLocation = (location: BusinessLocation) => {
  //   formik.setFieldValue("locationName", location.locationName);
  //   formik.setFieldValue("locationAddress", location.locationAddress);
  //   formik.setFieldValue(
  //     "locations",
  //     formik.values.locations.filter((item) => item.id !== location.id),
  //   );
  // };

  // const deleteLocation = (id: number) => {
  //   formik.setFieldValue(
  //     "locations",
  //     formik.values.locations.filter((item) => item.id !== id),
  //   );
  // };
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        {/* Page Header */}

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            mb: 5,
          }}
          spacing={2}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#F68B1F" }}>
              Business Profile
            </Typography>

            <Typography sx={{ mt: 1 }} color="text.secondary">
              Manage your company information, branding, locations and business
              preferences.
            </Typography>
          </Box>

          <Chip
            color="success"
            icon={<CheckCircleRoundedIcon />}
            label="Active"
            sx={{
              px: 1,
              height: 40,
              fontWeight: 600,
              fontSize: 14,
            }}
          />
        </Stack>

        {/* Content */}

        <Stack spacing={4}>
          <CompanyInformationCard formik={formik} />

          <BrandingCard
            formik={formik}
            logo={logo}
            preview={preview}
            onLogoChange={setLogo}
            onGenerateCnp={generateCnpId}
          />

          {/* <LocationsCard
            formik={formik}
            locations={formik.values.locations}
            onAddLocation={addLocation}
            onEditLocation={editLocation}
            onDeleteLocation={deleteLocation}
          /> */}

          <BusinessSettingsCard formik={formik} />

          <AuditInformationCard
            values={{
              createdBy: formik.values.createdBy,
              createdOn: formik.values.createdOn,
              updatedBy: formik.values.updatedBy,
              updatedOn: formik.values.updatedOn,
            }}
          />
        </Stack>

        <StickyFooter loading={loading} onCancel={() => formik.resetForm()} />
      </Box>
    </Container>
  );
};

export default ManageBusinessProfilePage;
