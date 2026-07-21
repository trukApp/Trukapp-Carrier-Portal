"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  path?: string;
}

export default function SectionCard({ title, description, icon, path }: Props) {
  const router = useRouter();

  return (
    <Card
      // onClick={() => router.push(path)}
      onClick={() => {
        console.log("Title:", title);
        console.log("Path:", path);

        if (!path) {
          alert(`Path missing for ${title}`);
          return;
        }

        router.push(path);
      }}
      sx={{
        height: 190,
        borderRadius: 3,
        cursor: "pointer",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 5,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: 55,
            height: 55,
            bgcolor: "#FFF3E0",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F68B1F",
            mb: 2,
          }}
        >
          {icon}
        </Box>

        <Typography fontWeight={700}>{title}</Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            flex: 1,
            color: "#000",
          }}
        >
          {description}
        </Typography>

        <Box display="flex" justifyContent="flex-end">
          <ArrowForwardIcon sx={{ color: "#F68B1F" }} />
        </Box>
      </CardContent>
    </Card>
  );
}
