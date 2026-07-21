"use client";

import React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
const ManageProfileBusiness = () => {
  const initialValues = {
    companyName: "",
    primaryAddress: "",
    contactPerson: "",
    contactNumber: "",
    email: "",
    cnpId: "",
    locationName: "",
    locationAddress: "",
    businessVisible: false,
    autoAcceptConnections: false,
    createdBy: "",
    createdOn: "",
    updatedBy: "",
    updatedOn: "",
  };
  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    primaryAddress: Yup.string().required("Primary Address is required"),
    contactPerson: Yup.string().required("Contact Person is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid contact number")
      .required("Contact Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    cnpId: Yup.string(),
    locationName: Yup.string(),
    locationAddress: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Business Profile");

      console.log(values);
    },
  });

  const generateCnpId = () => {
    const id = `CNP-${Math.floor(100000 + Math.random() * 900000)}`;

    formik.setFieldValue("cnpId", id);
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f6fa",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              General Data
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Company Name *"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.companyName &&
                    Boolean(formik.errors.companyName)
                  }
                  helperText={
                    formik.touched.companyName && formik.errors.companyName
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Primary Address *"
                  name="primaryAddress"
                  value={formik.values.primaryAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.primaryAddress &&
                    Boolean(formik.errors.primaryAddress)
                  }
                  helperText={
                    formik.touched.primaryAddress &&
                    formik.errors.primaryAddress
                  }
                />
              </Grid>
            </Grid>

            {/* ---------------- Correspondence ---------------- */}

            <Typography variant="h6" fontWeight={700} mt={5} mb={2}>
              Correspondence
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Contact Person *"
                  name="contactPerson"
                  value={formik.values.contactPerson}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.contactPerson &&
                    Boolean(formik.errors.contactPerson)
                  }
                  helperText={
                    formik.touched.contactPerson && formik.errors.contactPerson
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Contact Number *"
                  name="contactNumber"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.contactNumber &&
                    Boolean(formik.errors.contactNumber)
                  }
                  helperText={
                    formik.touched.contactNumber && formik.errors.contactNumber
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Email ID *"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
            </Grid>

            {/* ---------------- Company Branding ---------------- */}

            <Typography variant="h6" fontWeight={700} mt={5} mb={2}>
              Company Branding
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  component="label"
                  variant="outlined"
                  fullWidth
                  sx={{ height: 56 }}
                >
                  Upload Company Logo
                  <input hidden type="file" />
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="CNP ID"
                  name="cnpId"
                  value={formik.values.cnpId}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} mt={1}>
                <Button
                  variant="contained"
                  sx={{ height: 40, width: "25%" }}
                  onClick={generateCnpId}
                >
                  Generate
                </Button>
              </Grid>
            </Grid>

            {/* ---------------- Additional Locations ---------------- */}

            <Typography variant="h6" fontWeight={700} mt={5} mb={2}>
              Additional Locations
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Location Name"
                  name="locationName"
                  value={formik.values.locationName}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Location Address"
                  name="locationAddress"
                  value={formik.values.locationAddress}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} mt={1}>
                <Button variant="contained" sx={{ height: 40, width: "25%" }}>
                  Add
                </Button>
              </Grid>
            </Grid>

            {/* ---------------- Business Settings ---------------- */}

            <Typography variant="h6" fontWeight={700} mt={5} mb={2}>
              Business Settings
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="businessVisible"
                      checked={formik.values.businessVisible}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Visible to Potential Partners"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="autoAcceptConnections"
                      checked={formik.values.autoAcceptConnections}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Auto Accept Connection Requests"
                />
              </Grid>
            </Grid>

            {/* ---------------- Audit Information ---------------- */}

            <Typography variant="h6" fontWeight={700} mt={5} mb={2}>
              Audit Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Created By"
                  name="createdBy"
                  value={formik.values.createdBy}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Created On"
                  name="createdOn"
                  value={formik.values.createdOn}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Updated By"
                  name="updatedBy"
                  value={formik.values.updatedBy}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Updated On"
                  name="updatedOn"
                  value={formik.values.updatedOn}
                  disabled
                />
              </Grid>
            </Grid>

            {/* ---------------- Footer Buttons ---------------- */}

            <Stack direction="row" justifyContent="center" spacing={2} mt={6}>
              <Button variant="outlined" size="large">
                Cancel
              </Button>

              <Button type="submit" variant="contained" size="large">
                Save Changes
              </Button>
            </Stack>
          </CardContent>
        </form>
      </Card>
    </Box>
  );
};

export default ManageProfileBusiness;
