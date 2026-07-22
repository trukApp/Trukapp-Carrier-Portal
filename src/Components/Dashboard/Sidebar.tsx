"use client";

import { useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  Inventory2,
  Storefront,
  LocalShipping,
  Route,
  Assignment,
  Gavel,
  Warehouse,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const [management, setManagement] = useState(true);
  const [orderManagement, setOrderManagement] = useState(true);
  const [dockappointmentScheduling, setDockappointmentScheduling] =
    useState(true);
  const [freightExecution, setFreightExecution] = useState(true);
  const [freightSettlement, setFreightSettlement] = useState(true);

  const menuStyle = {
    py: 0.8,
    px: 2,
    minHeight: 48,
    color: "#fff",

    "&:hover": {
      background: "transparent",
    },
  };

  const subMenuStyle = {
    pl: 6,
    py: 0.8,
    minHeight: 38,

    "&:hover": {
      background: "#1F2937",
    },
  };

  return (
    <Box
      sx={{
        width: collapsed ? 72 : 285,
        bgcolor: "#111827",
        color: "#fff",
        minHeight: "80vh",
        transition: "all .25s ease",
        borderRight: "1px solid #1F2937",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
        }}
      >
        {!collapsed && (
          <Typography
            sx={{
              color: "#F59E0B",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: ".5px",
            }}
          >
            CONTROL TOWER
          </Typography>
        )}

        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            bgcolor: "#1E293B",
            color: "#fff",
            width: 42,
            height: 42,

            "&:hover": {
              bgcolor: "#334155",
            },
          }}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "#1F2937" }} />

      <List disablePadding>
        {/* Management Network */}

        <ListItemButton
          sx={menuStyle}
          onClick={() => setManagement(!management)}
        >
          <ListItemIcon
            sx={{
              color: "#F59E0B",
              minWidth: 36,
            }}
          >
            <Inventory2 />
          </ListItemIcon>

          {!collapsed && (
            <>
              <ListItemText
                primary="Management Network"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              />

              {management ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </ListItemButton>

        <Collapse in={!collapsed && management}>
          <List disablePadding>
            <ListItemButton
              sx={subMenuStyle}
              onClick={() => router.push("/manage-profile")}
            >
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <Inventory2 fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Manage Business Profile"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>

            <ListItemButton sx={subMenuStyle}>
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <Storefront fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Discover Business Partners"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* order management */}

        <ListItemButton
          sx={menuStyle}
          onClick={() => setOrderManagement(!orderManagement)}
        >
          <ListItemIcon
            sx={{
              color: "#F59E0B",
              minWidth: 36,
            }}
          >
            <Route />
          </ListItemIcon>

          {!collapsed && (
            <>
              <ListItemText
                primary="Freight Order Management"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              />

              {orderManagement ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </ListItemButton>

        <Collapse in={!collapsed && orderManagement}>
          <List disablePadding>
            <ListItemButton
              sx={subMenuStyle}
              onClick={() => router.push("/order-bidding")}
            >
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <Assignment fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Freight Requests for Quotation"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>

            <ListItemButton sx={subMenuStyle}>
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <Route fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Freight Quotations"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>

            <ListItemButton
              sx={subMenuStyle}
              onClick={() => router.push("/order-request")}
            >
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <Gavel fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Freight Orders for Confirmation"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Dock Appointment Scheduling */}

        <ListItemButton
          sx={menuStyle}
          onClick={() =>
            setDockappointmentScheduling(!dockappointmentScheduling)
          }
        >
          <ListItemIcon
            sx={{
              color: "#F59E0B",
              minWidth: 36,
            }}
          >
            <Warehouse />
          </ListItemIcon>

          {!collapsed && (
            <>
              <ListItemText
                primary="Dock Appointment Scheduling"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              />

              {dockappointmentScheduling ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </ListItemButton>

        <Collapse in={!collapsed && dockappointmentScheduling}>
          <List disablePadding>
            <ListItemButton sx={subMenuStyle}>
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <LocalShipping fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Self Book Dock Appointments"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>

            <ListItemButton sx={subMenuStyle}>
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <Warehouse fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Dock Appointment Requests"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Freight Execution */}

        <ListItemButton
          sx={menuStyle}
          onClick={() => setFreightExecution(!freightExecution)}
        >
          <ListItemIcon
            sx={{
              color: "#F59E0B",
              minWidth: 36,
            }}
          >
            <Warehouse />
          </ListItemIcon>

          {!collapsed && (
            <>
              <ListItemText
                primary="Freight Execution"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              />

              {freightExecution ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </ListItemButton>

        <Collapse in={!collapsed && freightExecution}>
          <List disablePadding>
            <ListItemButton sx={subMenuStyle}>
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <LocalShipping fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Self Book Dock Appointments"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>

            <ListItemButton sx={subMenuStyle}>
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <Warehouse fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Dock Appointment Requests"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Freight Settlement */}

        <ListItemButton
          sx={menuStyle}
          onClick={() => setFreightSettlement(!freightSettlement)}
        >
          <ListItemIcon
            sx={{
              color: "#F59E0B",
              minWidth: 36,
            }}
          >
            <Warehouse />
          </ListItemIcon>

          {!collapsed && (
            <>
              <ListItemText
                primary="Freight Settlement"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              />

              {freightSettlement ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </ListItemButton>

        <Collapse in={!collapsed && freightSettlement}>
          <List disablePadding>
            <ListItemButton sx={subMenuStyle}>
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <LocalShipping fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Self Book Dock Appointments"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>

            <ListItemButton sx={subMenuStyle}>
              <ListItemIcon sx={{ color: "#CBD5E1", minWidth: 32 }}>
                <Warehouse fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Dock Appointment Requests"
                sx={{ fontSize: 13 }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
