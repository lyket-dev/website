import React, { useState, useCallback } from "react";
import { RingSpinner } from "react-spinners-kit";
import { bulkUploadButtons } from "api";
import CSVReader from "react-csv-reader";
import { notice, alert } from "utils/notifications";

export default function ButtonsImporter({ onFinishImporting }) {
  const [uploading, setUploading] = useState(false);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => {
      if (!["path", "amount"].includes(header)) {
        alert({ message: `Invalid header: ${header}` });
      }

      return header.toLowerCase().replace(/\W/g, "");
    },
  };

  const handleSubmitFile = useCallback(
    async (data, fileInfo) => {
      try {
        setUploading(true);

        const {
          data: { attributes },
        } = await bulkUploadButtons(data);

        await onFinishImporting();

        notice({
          message: `${attributes.successful.length} buttons imported successfully, ${attributes.failed.length} not imported`,
        });

        setUploading(false);
      } catch (error) {
        alert({ message: "Couldn't import buttons" });
        console.error(error);
        setUploading(false);
        throw error;
      }
    },
    [onFinishImporting]
  );

  return (
    <>
      <CSVReader
        accept=".csv"
        onFileLoaded={handleSubmitFile}
        parserOptions={papaparseOptions}
      />
      {uploading && <RingSpinner size={20} color="#201335" />}
    </>
  );
}
