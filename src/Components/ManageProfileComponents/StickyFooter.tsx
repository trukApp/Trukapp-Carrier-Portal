"use client";
import React from "react";
import { Box, Button, CircularProgress, Divider, Stack } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface StickyFooterProps {
  loading?: boolean;
  onCancel: () => void;
}

const StickyFooter: React.FC<StickyFooterProps> = ({
  loading = false,
  onCancel,
}) => {
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        mt: 5,
        zIndex: 100,
        bgcolor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Divider />

      <Stack
        direction={{
          xs: "column-reverse",
          sm: "row",
        }}
        spacing={2}
        sx={{
          justifyContent: "flex-end",
          p: 3,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          startIcon={<CloseRoundedIcon />}
          onClick={onCancel}
          disabled={loading}
          sx={{
            minWidth: 170,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            height: 48,
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <SaveRoundedIcon />
            )
          }
          sx={{
            minWidth: 190,
            height: 48,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 700,
            bgcolor: "#F68B1F",

            "&:hover": {
              bgcolor: "#E67E22",
            },

            "&.Mui-disabled": {
              bgcolor: "#F6B76E",
              color: "#fff",
            },
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Stack>
    </Box>
  );
};

export default StickyFooter;
