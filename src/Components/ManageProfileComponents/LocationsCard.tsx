"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { FormikProps } from "formik";
import {
  BusinessLocation,
  BusinessProfileFormValues,
} from "@/types/ManageProfile";

interface LocationsCardProps {
  formik: FormikProps<BusinessProfileFormValues>;
  locations: BusinessLocation[];
  onAddLocation: () => void;
  onEditLocation: (location: BusinessLocation) => void;
  onDeleteLocation: (id: number) => void;
}

const LocationsCard: React.FC<LocationsCardProps> = ({
  formik,
  locations,
  onAddLocation,
  onEditLocation,
  onDeleteLocation,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "#ECECEC",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 4 }}>
          <LocationOnRoundedIcon color="warning" />

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Company Locations
          </Typography>
        </Stack>

        {/* Add Location */}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Location Name"
              name="locationName"
              value={formik.values.locationName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.locationName &&
                Boolean(formik.errors.locationName)
              }
              helperText={
                formik.touched.locationName && formik.errors.locationName
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Location Address"
              name="locationAddress"
              value={formik.values.locationAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.locationAddress &&
                Boolean(formik.errors.locationAddress)
              }
              helperText={
                formik.touched.locationAddress && formik.errors.locationAddress
              }
            />
          </Grid>

          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddLocationAltRoundedIcon />}
              onClick={onAddLocation}
              sx={{
                height: 56,
                textTransform: "none",
                borderRadius: 3,
                bgcolor: "#F68B1F",

                "&:hover": {
                  bgcolor: "#E67E22",
                },
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
          Saved Locations
        </Typography>

        {locations.length === 0 ? (
          <Box
            sx={{
              py: 6,
              borderRadius: 3,
              textAlign: "center",
              bgcolor: "#FAFAFA",
              border: "1px dashed #D9D9D9",
            }}
          >
            <Typography color="text.secondary">
              No locations added yet.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {locations.map((location) => (
              <Grid key={location.id} size={{ xs: 12, md: 6 }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    transition: ".25s",

                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "flex-start" }}
                      >
                        <LocationOnRoundedIcon color="warning" />

                        <Box>
                          <Typography sx={{ fontWeight: 700 }}>
                            {location.locationName}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {location.locationAddress}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1}>
                        <IconButton
                          color="primary"
                          onClick={() => onEditLocation(location)}
                        >
                          <EditRoundedIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => onDeleteLocation(location.id)}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationsCard;
