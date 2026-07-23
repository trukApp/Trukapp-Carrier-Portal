"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BrandingWatermarkRoundedIcon from "@mui/icons-material/BrandingWatermarkRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { FormikProps } from "formik";
import LogoUploader from "./LogoUploader";
import { BusinessProfileFormValues } from "@/types/ManageProfile";

interface Props {
  formik: FormikProps<BusinessProfileFormValues>;
  logo: File | null;
  preview: string;
  onLogoChange: (file: File | null) => void;
  onGenerateCnp: () => void;
}

const BrandingCard: React.FC<Props> = ({
  formik,
  logo,
  preview,
  onLogoChange,
  onGenerateCnp,
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
          <BrandingWatermarkRoundedIcon color="warning" />

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Company Branding
          </Typography>
        </Stack>

        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          {/* Logo */}

          <Grid size={{ xs: 12, md: 5 }}>
            <LogoUploader
              logo={logo}
              preview={preview}
              onChange={onLogoChange}
            />
          </Grid>

          {/* Right */}

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={4}>
              <Box>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>
                  Company Profile Number
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Generate a unique CNP ID for your organization.
                </Typography>

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={2}
                >
                  {/* <TextField
                    fullWidth
                    label="CNP ID"
                    name="cnpId"
                    value={formik.values.cnpId}
                    InputProps={{
                      readOnly: true,
                    }}
                  /> */}
                  <TextField
                    fullWidth
                    label="CNP ID"
                    name="cnpId"
                    value={formik.values.cnpId}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<AutoAwesomeRoundedIcon />}
                    onClick={onGenerateCnp}
                    sx={{
                      minWidth: 190,
                      borderRadius: 3,
                      bgcolor: "#F68B1F",
                      textTransform: "none",
                      fontWeight: 700,

                      "&:hover": {
                        bgcolor: "#E67E22",
                      },
                    }}
                  >
                    Generate
                  </Button>
                </Stack>
              </Box>

              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#FFF8EF",
                  border: "1px solid",
                  borderColor: "#FFE2BF",
                }}
              >
                <Typography sx={{ fontWeight: 700 }} gutterBottom>
                  Branding Tips
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  • Upload a high-resolution logo.
                  <br />
                  • Use PNG or SVG with transparent background.
                  <br />• Recommended size: 512 × 512 pixels.
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BrandingCard;
