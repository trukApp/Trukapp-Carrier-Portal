// // "use client";

// // import React from "react";

// // import {
// //   Avatar,
// //   Box,
// //   Chip,
// //   Divider,
// //   Paper,
// //   Stack,
// //   Typography,
// // } from "@mui/material";

// // // import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// // import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
// // import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
// // import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// // import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

// // export interface ContactInfo {
// //   name: string;
// //   role: string;
// //   company?: string;
// //   phone?: string;
// //   email?: string;
// //   status?: string;
// // }

// // interface ContactCardProps {
// //   contact: ContactInfo;
// // }

// // const getStatusColor = (
// //   status?: string,
// // ): "success" | "warning" | "default" | "error" | "info" => {
// //   switch (status?.toLowerCase()) {
// //     case "active":
// //       return "success";
// //     case "inactive":
// //       return "default";
// //     case "busy":
// //       return "warning";
// //     case "offline":
// //       return "error";
// //     default:
// //       return "info";
// //   }
// // };

// // const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
// //   return (
// //     <Paper
// //       elevation={0}
// //       sx={{
// //         borderRadius: 3,
// //         border: "1px solid #F4D3AA",
// //         overflow: "hidden",
// //         height: "100%",
// //       }}
// //     >
// //       {/* Header */}

// //       <Box
// //         sx={{
// //           background: "linear-gradient(90deg,#FFF8EF 0%,#FFF3E2 100%)",
// //           px: 3,
// //           py: 2,
// //           borderBottom: "1px solid #F4D3AA",
// //         }}
// //       >
// //         <Stack
// //           direction="row"
// //           justifyContent="space-between"
// //           alignItems="center"
// //         >
// //           <Typography fontWeight={700} color="#F68B1F">
// //             {contact.role}
// //           </Typography>

// //           <Chip
// //             label={contact.status ?? "Active"}
// //             size="small"
// //             color={getStatusColor(contact.status)}
// //             variant="outlined"
// //           />
// //         </Stack>
// //       </Box>

// //       {/* Body */}

// //       <Stack spacing={2} p={3}>
// //         <Stack direction="row" spacing={2} alignItems="center">
// //           <Avatar
// //             sx={{
// //               bgcolor: "#F68B1F",
// //               width: 52,
// //               height: 52,
// //             }}
// //           >
// //             <PersonOutlineIcon />
// //           </Avatar>

// //           <Box>
// //             <Typography fontWeight={700} variant="subtitle1">
// //               {contact.name}
// //             </Typography>

// //             <Typography variant="body2" color="text.secondary">
// //               {contact.role}
// //             </Typography>
// //           </Box>
// //         </Stack>

// //         <Divider />

// //         <Stack spacing={2}>
// //           {contact.company && (
// //             <Stack direction="row" spacing={1.5} alignItems="center">
// //               <BusinessOutlinedIcon fontSize="small" color="action" />

// //               <Typography variant="body2">{contact.company}</Typography>
// //             </Stack>
// //           )}

// //           {contact.phone && (
// //             <Stack direction="row" spacing={1.5} alignItems="center">
// //               <PhoneOutlinedIcon fontSize="small" color="action" />

// //               <Typography variant="body2">{contact.phone}</Typography>
// //             </Stack>
// //           )}

// //           {contact.email && (
// //             <Stack direction="row" spacing={1.5} alignItems="center">
// //               <EmailOutlinedIcon fontSize="small" color="action" />

// //               <Typography variant="body2">{contact.email}</Typography>
// //             </Stack>
// //           )}
// //         </Stack>
// //       </Stack>
// //     </Paper>
// //   );
// // };

// // export default ContactCard;

// "use client";

// import React from "react";

// import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";

// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
// import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";

// interface ContactCardProps {
//   title: string;
//   packageId?: string;
//   radius?: string;
//   location: any;
// }

// const ContactCard: React.FC<ContactCardProps> = ({
//   title,
//   packageId,
//   radius,
//   location,
// }) => {
//   if (!location) return null;

//   const fullAddress = [
//     location.address_1,
//     location.address_2,
//     location.city,
//     location.state,
//     location.country,
//     location.pincode,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         border: "1px solid #E6E6E6",
//         borderRadius: 2,
//         overflow: "hidden",
//         height: "100%",
//         transition: "0.2s",

//         "&:hover": {
//           boxShadow: 3,
//         },
//       }}
//     >
//       {/* Header */}

//       <Box
//         sx={{
//           px: 2.5,
//           py: 2,
//           background: "#FAFAFA",
//           borderBottom: "1px solid #ECECEC",
//         }}
//       >
//         <Stack spacing={1}>
//           <Typography variant="h6" fontWeight={700} color="#555">
//             {title}
//           </Typography>

//           {packageId && (
//             <Stack direction="row" spacing={1} alignItems="center">
//               <Inventory2OutlinedIcon fontSize="small" color="warning" />

//               <Typography variant="body2" fontWeight={700}>
//                 {packageId}
//               </Typography>
//             </Stack>
//           )}
//         </Stack>
//       </Box>

//       {/* Body */}

//       <Stack spacing={2} p={3}>
//         {/* Location */}

//         <Box>
//           <Typography fontWeight={700} fontSize={17} mb={0.5}>
//             {location.loc_desc}
//           </Typography>

//           <Typography variant="body2" color="text.secondary">
//             {location.loc_type}
//           </Typography>
//         </Box>

//         <Divider />

//         {/* Contact */}

//         <Stack spacing={2}>
//           <Stack direction="row" spacing={1.5} alignItems="flex-start">
//             <PersonOutlineOutlinedIcon color="warning" fontSize="small" />

//             <Box>
//               <Typography variant="caption" color="text.secondary">
//                 Contact Person
//               </Typography>

//               <Typography fontWeight={600}>
//                 {location.contact_name || "-"}
//               </Typography>
//             </Box>
//           </Stack>

//           <Stack direction="row" spacing={1.5} alignItems="flex-start">
//             <PhoneOutlinedIcon color="warning" fontSize="small" />

//             <Box>
//               <Typography variant="caption" color="text.secondary">
//                 Phone Number
//               </Typography>

//               <Typography fontWeight={600}>
//                 {location.contact_phone_number || "-"}
//               </Typography>
//             </Box>
//           </Stack>

//           <Stack direction="row" spacing={1.5} alignItems="flex-start">
//             <EmailOutlinedIcon color="warning" fontSize="small" />

//             <Box>
//               <Typography variant="caption" color="text.secondary">
//                 Email
//               </Typography>

//               <Typography
//                 fontWeight={600}
//                 sx={{
//                   wordBreak: "break-word",
//                 }}
//               >
//                 {location.contact_email || "-"}
//               </Typography>
//             </Box>
//           </Stack>

//           <Stack direction="row" spacing={1.5} alignItems="flex-start">
//             <LocationOnOutlinedIcon color="warning" fontSize="small" />

//             <Box>
//               <Typography variant="caption" color="text.secondary">
//                 Address
//               </Typography>

//               <Typography
//                 fontWeight={600}
//                 sx={{
//                   lineHeight: 1.6,
//                 }}
//               >
//                 {fullAddress}
//               </Typography>
//             </Box>
//           </Stack>
//         </Stack>

//         {(radius || location.gln_code || location.gst_number) && (
//           <>
//             <Divider />

//             <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
//               {radius && (
//                 <Chip
//                   icon={<MyLocationOutlinedIcon />}
//                   label={`Radius : ${radius}`}
//                   color="warning"
//                   variant="outlined"
//                 />
//               )}

//               {location.gln_code && (
//                 <Chip label={`GLN : ${location.gln_code}`} variant="outlined" />
//               )}

//               {location.gst_number && (
//                 <Chip
//                   label={`GST : ${location.gst_number}`}
//                   variant="outlined"
//                 />
//               )}
//             </Stack>
//           </>
//         )}
//       </Stack>
//     </Paper>
//   );
// };

// export default ContactCard;

"use client";

import React from "react";

import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";

interface ContactCardProps {
  title: string;
  packageId?: string;
  radius?: string;
  location: any;
}

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  packageId,
  radius,
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
            <Typography fontWeight={700} fontSize={12} color="#F68B1F">
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
        p={2}
        sx={{
          bgcolor: "#FCFCFC",
        }}
      >
        {/* Location */}

        <Box>
          <Typography fontSize={17} fontWeight={700} color="#1F2937">
            {location.loc_desc}
          </Typography>

          {/* <Typography fontSize={12} color="text.secondary">
            {location.loc_type || "Location"}
          </Typography> */}
        </Box>

        <Divider />

        {/* Contact + Phone */}

        <Stack direction="row" spacing={2} m={2}>
          <Stack direction="row" spacing={1} alignItems="center" flex={1}>
            <PersonOutlineOutlinedIcon
              sx={{
                color: "#F68B1F",
                fontSize: 18,
              }}
            />

            <Box>
              <Typography fontSize={11} color="text.secondary">
                Contact
              </Typography>

              <Typography fontSize={13} fontWeight={600}>
                {location.contact_name || "-"}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" flex={1}>
            <PhoneOutlinedIcon
              sx={{
                color: "#F68B1F",
                fontSize: 18,
              }}
            />

            <Box>
              <Typography fontSize={11} color="text.secondary">
                Phone
              </Typography>

              <Typography fontSize={13} fontWeight={600}>
                {location.contact_phone_number || "-"}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        {/* Email */}

        <Stack direction="row" spacing={1} alignItems="flex-start">
          <EmailOutlinedIcon
            sx={{
              color: "#F68B1F",
              fontSize: 18,
              mt: 0.2,
            }}
          />

          <Box flex={1}>
            <Typography fontSize={11} color="text.secondary">
              Email
            </Typography>

            <Typography
              fontSize={13}
              fontWeight={500}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {location.contact_email || "-"}
            </Typography>
          </Box>
        </Stack>

        {/* Address */}

        <Stack direction="row" spacing={1} alignItems="flex-start">
          <LocationOnOutlinedIcon
            sx={{
              color: "#F68B1F",
              fontSize: 18,
              mt: 0.2,
            }}
          />

          <Box flex={1}>
            <Typography fontSize={11} color="text.secondary">
              Address
            </Typography>

            <Typography
              fontSize={13}
              fontWeight={500}
              color="text.primary"
              sx={{
                lineHeight: 1.5,
              }}
            >
              {fullAddress || "-"}
            </Typography>
          </Box>
        </Stack>

        {/* {(radius || location.gln_code || location.gst_number) && (
          <>
            <Divider />

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {radius && (
                <Chip
                  size="small"
                  color="warning"
                  icon={<MyLocationOutlinedIcon />}
                  label={`Radius: ${radius}`}
                  sx={{
                    fontWeight: 600,
                  }}
                />
              )}

              {location.gln_code && (
                <Chip
                  size="small"
                  variant="outlined"
                  label={`GLN: ${location.gln_code}`}
                  sx={{
                    fontWeight: 600,
                  }}
                />
              )}

              {location.gst_number && (
                <Chip
                  size="small"
                  variant="outlined"
                  label={`GST: ${location.gst_number}`}
                  sx={{
                    fontWeight: 600,
                  }}
                />
              )}
            </Stack>
          </>
        )} */}
      </Stack>
    </Paper>
  );
};

export default ContactCard;
