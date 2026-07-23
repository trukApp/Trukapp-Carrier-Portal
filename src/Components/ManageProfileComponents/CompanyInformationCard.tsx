"use client";

import React from "react";

import {
  Card,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
// import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
// import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { FormikProps } from "formik";
import { BusinessProfileFormValues } from "@/types/ManageProfile";
interface Props {
  formik: FormikProps<BusinessProfileFormValues>;
}

const CompanyInformationCard: React.FC<Props> = ({ formik }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "#ECECEC",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 700,
            mb: 4,
          }}
        >
          <BusinessRoundedIcon color="warning" />
          Company Information
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />{" "}
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Contact Person"
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
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <PersonRoundedIcon color="action" />
              //     </InputAdornment>
              //   ),
              // }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <EmailRoundedIcon color="action" />
              //     </InputAdornment>
              //   ),
              // }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Contact Number"
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
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <PhoneRoundedIcon color="action" />
              //     </InputAdornment>
              //   ),
              // }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Primary Address"
              name="primaryAddress"
              value={formik.values.primaryAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.primaryAddress &&
                Boolean(formik.errors.primaryAddress)
              }
              helperText={
                formik.touched.primaryAddress && formik.errors.primaryAddress
              }
              // InputProps={{
              //   startAdornment: (
              // <InputAdornment
              //   position="start"
              //   sx={{
              //     alignSelf: "flex-start",
              //     mt: 1.5,
              //   }}
              // >
              //       <LocationOnRoundedIcon color="action" />
              //     </InputAdornment>
              //   ),
              // }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        alignSelf: "flex-start",
                        mt: 1.5,
                      }}
                    >
                      <BusinessRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CompanyInformationCard;
