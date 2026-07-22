"use client";

import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

interface ConfirmBidDialogProps {
  open: boolean;
  loading?: boolean;
  orderId: string;
  bidAmount: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmBidDialog: React.FC<ConfirmBidDialogProps> = ({
  open,
  loading = false,
  orderId,
  bidAmount,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: 700 }}>Confirm Bid</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Please confirm your bid before submitting.
          </Typography>

          <Stack spacing={1}>
            <Typography variant="body2">
              <strong>Order ID</strong>
            </Typography>

            <Typography>{orderId}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2">
              <strong>Bid Amount</strong>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "#F68B1F",
                fontWeight: 700,
              }}
            >
              ₹{Number(bidAmount).toLocaleString("en-IN")}
            </Typography>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            Once submitted, your bid will be sent to the shipper and cannot be
            modified unless your application supports bid updates.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
          sx={{
            bgcolor: "#F68B1F",
            "&:hover": {
              bgcolor: "#E67E12",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Confirm Bid"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmBidDialog;
