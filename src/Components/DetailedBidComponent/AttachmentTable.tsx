"use client";

import React from "react";

import {
  Chip,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

export interface AttachmentItem {
  id: string;
  fileName: string;
  fileType?: string;
  uploadedBy?: string;
  uploadedOn?: string;
  fileSize?: string;
  url?: string;
}

interface AttachmentTableProps {
  data: AttachmentItem[];
  onPreview?: (attachment: AttachmentItem) => void;
  onDownload?: (attachment: AttachmentItem) => void;
}

const getFileIcon = (type?: string) => {
  switch (type?.toLowerCase()) {
    case "pdf":
      return <PictureAsPdfOutlinedIcon color="error" fontSize="small" />;

    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImageOutlinedIcon color="success" fontSize="small" />;

    case "xls":
    case "xlsx":
    case "csv":
      return <TableChartOutlinedIcon color="success" fontSize="small" />;

    case "doc":
    case "docx":
      return <DescriptionOutlinedIcon color="primary" fontSize="small" />;

    default:
      return <InsertDriveFileOutlinedIcon color="action" fontSize="small" />;
  }
};

const AttachmentTable: React.FC<AttachmentTableProps> = ({
  data,
  onPreview,
  onDownload,
}) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #F4D3AA",
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(90deg,#FFF8EF 0%,#FFF3E2 100%)",
            }}
          >
            <TableCell>
              <Typography fontWeight={700}>File</Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700}>Type</Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700}>Size</Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700}>Uploaded By</Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700}>Uploaded On</Typography>
            </TableCell>

            <TableCell align="center">
              <Typography fontWeight={700}>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length > 0 ? (
            data.map((file) => (
              <TableRow key={file.id} hover>
                <TableCell>
                  <Link underline="hover" href={file.url} target="_blank">
                    {file.fileName}
                  </Link>
                </TableCell>

                <TableCell>
                  <Chip
                    icon={getFileIcon(file.fileType)}
                    label={file.fileType?.toUpperCase() ?? "FILE"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell>{file.fileSize ?? "-"}</TableCell>

                <TableCell>{file.uploadedBy ?? "-"}</TableCell>

                <TableCell>{file.uploadedOn ?? "-"}</TableCell>

                <TableCell align="center">
                  <Tooltip title="Preview">
                    <IconButton
                      color="primary"
                      onClick={() => onPreview?.(file)}
                    >
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton
                      color="secondary"
                      onClick={() => onDownload?.(file)}
                    >
                      <DownloadOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography py={5} color="text.secondary">
                  No attachments available
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttachmentTable;
