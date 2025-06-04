export interface FileAreaTypeProps {
  handleFileChange: (file: File) => void;
  className?: string;
  error?: string;
  defaultFileName?: File;
  internalText?: string;
  loading?: boolean;
  acceptedFileTypes?: string[];
}
