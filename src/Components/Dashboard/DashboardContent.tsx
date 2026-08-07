"use client";

import { Grid, Typography } from "@mui/material";

import SectionCard from "./SectionCard";

import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";

const sections = [
  {
    title: "Manage Network",
    cards: [
      {
        title: "Manage Business Profile",
        description: "Create and maintain business information.",
        icon: <BusinessIcon />,
        path: "/manage-profile",
      },
      {
        title: "Discover Business Partners",
        description: "Manage customers, vendors and carriers.",
        icon: <GroupsIcon />,
        path: "/discover-business-partners",
      },
    ],
  },
  {
    title: "Freight Order Management",
    cards: [
      {
        title: "Freight Requests",
        description: "Create freight quotation requests.",
        icon: <DescriptionIcon />,
        path: "/order-bidding",
      },
      {
        title: "Freight Quotations",
        description: "Review carrier quotations.",
        icon: <ReceiptIcon />,
        path: "/order-requests",
      },
      {
        title: "Order Confirmation",
        description: "Confirm freight orders.",
        icon: <LocalShippingIcon />,
        path: "/confirmed-orders",
      },
    ],
  },
  {
    title: "Dock Appointment Scheduling",
    cards: [
      {
        title: "Self Book Dock",
        description: "Book loading and unloading slots.",
        icon: <WarehouseIcon />,
        path: "/self-book-dock",
      },
    ],
  },
];
export default function DashboardContent() {
  return (
    <>
      <Typography variant="h3" sx={{ mb: 5, fontWeight: 700 }}>
        AI Logistics Control Tower
      </Typography>

      {sections.map((section) => (
        <div key={section.title}>
          <Typography
            variant="h5"
            sx={{
              mt: 5,
              mb: 3,
            }}
          >
            {section.title}
          </Typography>

          <Grid container spacing={3}>
            {section.cards.map((card) => {
              return (
                <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={card.title}>
                  <SectionCard
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    path={card.path}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      ))}
    </>
  );
}
