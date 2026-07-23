"use client";
import React from "react";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Location } from "@/types/DetailedBidTypes";
interface ContactCardProps {
  title: string;
  packageId?: string;
  // radius?: string;
  location: Location;
}

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  packageId,
  location,
}) => {
  if (!location) return null;

  const fullAddress = [
    location.address_1,
    location.address_2,
    location.city,
    location.state,
    location.country,
    location.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        height: "100%",
        minHeight: 280,
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          borderColor: "#F68B1F",
        },
      }}
    >
      {/* Header */}

      <Box
        sx={{
          px: 2,
          py: 1.75,
          bgcolor: "#FFF8EF",
          borderBottom: "1px solid #F4D3AA",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: 700, fontSize: 12, color: "#F68B1F" }}
            >
              {title}
            </Typography>

            {packageId && (
              <Typography variant="caption" color="text.secondary">
                Package : {packageId}
              </Typography>
            )}
          </Box>

          <Inventory2OutlinedIcon
            sx={{
              color: "#F68B1F",
            }}
          />
        </Stack>
      </Box>

      {/* Body */}

      <Stack
        spacing={2}
        sx={{
          bgcolor: "#FCFCFC",
          p: 2,
        }}
      >
        {/* Location */}

        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1F2937" }}>
            {location.loc_desc}
          </Typography>

          {/* <Typography fontSize={12} color="text.secondary">
            {location.loc_type || "Location"}
          </Typography> */}
        </Box>

        <Divider />

        {/* Contact + Phone */}

        <Stack direction="row" spacing={2} sx={{ m: 2 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", flex: 1 }}
          >
            <PersonOutlineOutlinedIcon
              sx={{
                color: "#F68B1F",
                fontSize: 18,
              }}
            />

            <Box>
              <Typography sx={{ fontSize: 11 }} color="text.secondary">
                Contact
              </Typography>

              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                {location.contact_name || "-"}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", flex: 1 }}
          >
            <PhoneOutlinedIcon
              sx={{
                color: "#F68B1F",
                fontSize: 18,
              }}
            />

            <Box>
              <Typography sx={{ fontSize: 11 }} color="text.secondary">
                Phone
              </Typography>

              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                {location.contact_phone_number || "-"}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        {/* Email */}

        <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
          <EmailOutlinedIcon
            sx={{
              color: "#F68B1F",
              fontSize: 18,
              mt: 0.2,
            }}
          />

          <Grid sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 11 }} color="text.secondary">
              Email
            </Typography>

            <Typography
              sx={{
                wordBreak: "break-word",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {location.contact_email || "-"}
            </Typography>
          </Grid>
        </Stack>

        {/* Address */}

        <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
          <LocationOnOutlinedIcon
            sx={{
              color: "#F68B1F",
              fontSize: 18,
              mt: 0.2,
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 11 }} color="text.secondary">
              Address
            </Typography>

            <Typography
              color="text.primary"
              sx={{
                lineHeight: 1.5,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {fullAddress || "-"}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ContactCard;
