/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useMemo } from "react";

// import { Grid, Stack, Typography } from "@mui/material";

// import ContactCard, { ContactInfo } from "../ContactCard";
// import { useGetLocationMasterQuery } from "@/api/apiSlice";
// import { Allocation, Order } from "@/types/DetailedBidTypes";

// interface ContactsTabProps {
//   order: Order;
//   allocation?: Allocation;
// }

// const ContactsTab: React.FC<ContactsTabProps> = ({ order, allocation }) => {
//   const vehicle = allocation?.allocated_vehicles?.[0] ?? {};
//   const { data: locationsData } = useGetLocationMasterQuery({});
//   console.log("locationsData:", locationsData);
//   const getAllLocations =
//     locationsData?.locations.length > 0 ? locationsData?.locations : [];

//   const contacts: ContactInfo[] = useMemo(
//     () => [
//       {
//         role: "Ordering Party",
//         name: order?.ordering_party_name ?? order?.customer_name ?? "-",
//         company: order?.ordering_party_company ?? order?.company_name,
//         phone: order?.ordering_party_phone ?? order?.phone,
//         email: order?.ordering_party_email ?? order?.email,
//         status: "Active",
//       },
//       {
//         role: "Transporter",
//         name: vehicle?.transporter_name ?? allocation?.transporter_name ?? "-",
//         company: vehicle?.transporter_company ?? "-",
//         phone: vehicle?.transporter_phone,
//         email: vehicle?.transporter_email,
//         status: "Active",
//       },
//       {
//         role: "Driver",
//         name: vehicle?.driver_name ?? allocation?.driver_name ?? "-",
//         company: vehicle?.transporter_name,
//         phone: vehicle?.driver_phone,
//         email: vehicle?.driver_email,
//         status: "Busy",
//       },
//       {
//         role: "Consignee",
//         name: order?.consignee_name ?? "-",
//         company: order?.consignee_company,
//         phone: order?.consignee_phone,
//         email: order?.consignee_email,
//         status: "Active",
//       },
//     ],
//     [order, allocation, vehicle],
//   );

//   return (
//     <Stack spacing={3}>
//       <Typography variant="h6" fontWeight={700} color="#F68B1F">
//         Shipment Contacts
//       </Typography>

//       <Grid container spacing={3}>
//         {contacts.map((contact) => (
//           <Grid
//             key={contact.role}
//             size={{
//               xs: 12,
//               sm: 6,
//               lg: 3,
//             }}
//           >
//             <ContactCard contact={contact} />
//           </Grid>
//         ))}
//       </Grid>
//     </Stack>
//   );
// };

// export default ContactsTab;

"use client";

import React, { useMemo } from "react";

import { Grid, Stack, Typography } from "@mui/material";

import { useGetLocationMasterQuery } from "@/api/apiSlice";

import ContactCard from "../ContactCard";

import { Allocation, Order } from "@/types/DetailedBidTypes";

interface ContactsTabProps {
  order: Order;
  allocation?: Allocation;
}

const ContactsTab: React.FC<ContactsTabProps> = ({ order, allocation }) => {
  const { data: locationsData } = useGetLocationMasterQuery({});
  const locations = locationsData?.locations ?? [];
  const locationMap = useMemo(() => {
    return locations.reduce((acc: Record<string, any>, location: any) => {
      acc[location.loc_ID] = location;
      return acc;
    }, {});
  }, [locations]);

  /**
   * Ordering Party
   */
  const orderingParty = useMemo(() => {
    if (!order?.start_loc_ID) return null;

    return locationMap[order.start_loc_ID];
  }, [locationMap, order]);

  /**
   * Shipment Stops
   */
  const shipmentStops = useMemo(() => {
    if (!order?.package_dest_radius) return [];

    return order.package_dest_radius.map((item: any, index: number) => ({
      id: item.pack_ID,
      stopNo: index + 1,
      packageId: item.pack_ID,
      radius: item.destination_radius,
      location: locationMap[item.ship_to],
    }));
  }, [allocation, locationMap]);

  return (
    <Stack spacing={4}>
      <Typography variant="h5" fontWeight={700} color="#F68B1F">
        Shipment Contacts
      </Typography>

      <Grid container spacing={3}>
        {/* Ordering Party */}

        {orderingParty && (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <ContactCard title="Ordering Party" location={orderingParty} />
          </Grid>
        )}

        {/* Stops */}

        {shipmentStops.map((stop) => (
          <Grid
            key={stop.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <ContactCard
              title={`Stop ${stop.stopNo}`}
              packageId={stop.packageId}
              radius={stop.radius}
              location={stop.location}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ContactsTab;
