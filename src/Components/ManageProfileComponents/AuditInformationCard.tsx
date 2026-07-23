"use client";
import React from "react";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import { BusinessProfileFormValues } from "@/types/ManageProfile";
interface AuditInformationCardProps {
  values: Pick<
    BusinessProfileFormValues,
    "createdBy" | "createdOn" | "updatedBy" | "updatedOn"
  >;
}

interface AuditItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const AuditItem = ({ icon, label, value }: AuditItemProps) => (
  <Card
    variant="outlined"
    sx={{
      height: "100%",
      borderRadius: 3,
      transition: ".25s",

      "&:hover": {
        boxShadow: 3,
        transform: "translateY(-2px)",
      },
    }}
  >
    <CardContent>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: 2,
            bgcolor: "#FFF4E5",
            color: "#F68B1F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>

          <Typography sx={{ mt: 0.5, fontWeight: 700 }}>
            {value || "-"}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const AuditInformationCard: React.FC<AuditInformationCardProps> = ({
  values,
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
          <HistoryRoundedIcon color="warning" />

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Audit Information
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <AuditItem
              icon={<PersonRoundedIcon />}
              label="Created By"
              value={values.createdBy}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <AuditItem
              icon={<CalendarTodayRoundedIcon />}
              label="Created On"
              value={values.createdOn}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <AuditItem
              icon={<ManageAccountsRoundedIcon />}
              label="Updated By"
              value={values.updatedBy}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <AuditItem
              icon={<UpdateRoundedIcon />}
              label="Updated On"
              value={values.updatedOn}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AuditInformationCard;
