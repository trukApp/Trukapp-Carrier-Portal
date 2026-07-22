/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { Stack, Typography } from "@mui/material";
import AttachmentTable, { AttachmentItem } from "../AttachmentTable";
interface AttachmentsTabProps {
  order: any;
}

const AttachmentsTab: React.FC<AttachmentsTabProps> = ({ order }) => {
  const attachments: AttachmentItem[] = useMemo(() => {
    const files = order?.attachments ?? order?.documents ?? [];
    return files.map((file: any, index: number) => ({
      id: file.id ?? file.document_ID ?? String(index),
      fileName: file.file_name ?? file.name ?? "Attachment",
      fileType: file.file_type ?? file.extension ?? "",
      uploadedBy: file.uploaded_by ?? file.created_by ?? "-",
      uploadedOn: file.uploaded_on ?? file.created_at ?? "-",
      fileSize: file.file_size ?? "-",
      url: file.file_url ?? file.url,
    }));
  }, [order]);

  return (
    <Stack spacing={3}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#F68B1F" }}>
        Attachments
      </Typography>

      <AttachmentTable
        data={attachments}
        onPreview={(file) => {
          if (file.url) {
            window.open(file.url, "_blank", "noopener,noreferrer");
          }
        }}
        onDownload={(file) => {
          if (!file.url) return;
          const link = document.createElement("a");
          link.href = file.url;
          link.download = file.fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      />
    </Stack>
  );
};

export default AttachmentsTab;
