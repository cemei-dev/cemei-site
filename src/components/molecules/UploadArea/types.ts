export interface UploadAreaTypeProps {
  handleFileChange: (file: File) => void;
  className?: string;
  acceptedFileTypes: string;
  error?: string;
  defaultFileName?: File;
  internalText?: string;
  loading?: boolean;
}
