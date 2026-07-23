"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import { FormikProps } from "formik";
import { BusinessProfileFormValues } from "@/types/ManageProfile";

interface BusinessSettingsCardProps {
  formik: FormikProps<BusinessProfileFormValues>;
}

interface SettingRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SettingRow = ({
  icon,
  title,
  description,
  checked,
  onChange,
}: SettingRowProps) => (
  <Stack
    direction="row"
    sx={{
      justifyContent: "space-between",
      alignItems: "center",
      py: 2,
    }}
  >
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: "#FFF4E5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F68B1F",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{title}</Typography>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Stack>

    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          color="warning"
        />
      }
      label=""
    />
  </Stack>
);

const BusinessSettingsCard: React.FC<BusinessSettingsCardProps> = ({
  formik,
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
          <SettingsRoundedIcon color="warning" />

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Business Settings
          </Typography>
        </Stack>

        <SettingRow
          icon={<VisibilityRoundedIcon />}
          title="Business Visibility"
          description="Allow your company profile to be visible to partners and customers."
          checked={formik.values.businessVisible}
          onChange={(checked) =>
            formik.setFieldValue("businessVisible", checked)
          }
        />

        <Divider />

        <SettingRow
          icon={<HandshakeRoundedIcon />}
          title="Auto Accept Connections"
          description="Automatically approve incoming business connection requests."
          checked={formik.values.autoAcceptConnections}
          onChange={(checked) =>
            formik.setFieldValue("autoAcceptConnections", checked)
          }
        />
      </CardContent>
    </Card>
  );
};

export default BusinessSettingsCard;
