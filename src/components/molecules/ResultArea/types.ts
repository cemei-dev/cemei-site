export interface UploadAreaTypeProps {
  handleFileChange: (file: File) => void;
  className?: string;
  acceptedFileTypes: string;
  error?: string;
  defaultFileName?: File;
  internalText?: string;
  loading?: boolean;
  selectedImage: string | File | null;
  setSelectedImage: (image: string | File | null) => void;
  isEdit?: boolean;
}
