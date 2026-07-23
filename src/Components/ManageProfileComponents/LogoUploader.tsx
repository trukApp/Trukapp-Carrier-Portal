"use client";
import React, { useRef } from "react";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
interface LogoUploaderProps {
  logo: File | null;
  preview: string;
  onChange: (file: File | null) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({
  logo,
  preview,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onChange(file);
    }
  };

  return (
    <Box
      sx={{
        border: "2px dashed",
        borderColor: "#F68B1F",
        borderRadius: 4,
        p: 4,
        bgcolor: "#FFFDF8",
        transition: ".25s",

        "&:hover": {
          bgcolor: "#FFF7ED",
          borderColor: "#E67E22",
        },
      }}
    >
      <Stack spacing={2.5} sx={{ alignItems: "center" }}>
        <Avatar
          src={preview}
          sx={{
            width: 110,
            height: 110,
            bgcolor: "#FFE7CC",
          }}
        >
          {!preview && (
            <PhotoCameraRoundedIcon
              sx={{
                fontSize: 48,
                color: "#F68B1F",
              }}
            />
          )}
        </Avatar>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Company Logo
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            PNG, JPG or SVG
          </Typography>
        </Box>

        <input
          hidden
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

        <Button
          variant="contained"
          startIcon={<CloudUploadRoundedIcon />}
          onClick={() => inputRef.current?.click()}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.25,
            textTransform: "none",
            fontWeight: 700,
            bgcolor: "#F68B1F",

            "&:hover": {
              bgcolor: "#E67E22",
            },
          }}
        >
          {logo ? "Change Logo" : "Upload Logo"}
        </Button>

        {logo && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {logo.name}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default LogoUploader;
