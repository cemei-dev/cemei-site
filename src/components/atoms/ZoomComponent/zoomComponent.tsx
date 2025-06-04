import { Minus, Plus } from "lucide-react";

interface ZoomComponentProps {
  zoom: number;
  setZoom: (zoom: number) => void;
  iframeRef?: React.RefObject<HTMLIFrameElement>;
}

export default function ZoomComponent({
  zoom,
  setZoom,
  iframeRef
}: ZoomComponentProps) {
  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
    if (iframeRef?.current?.contentWindow) {
      // Try to access the PDF viewer's zoom functionality
      const pdfViewer =
        iframeRef.current.contentWindow.document.querySelector("embed");
      if (pdfViewer) {
        // Different PDF viewers might have different ways to set zoom
        // This is a common approach that works with many PDF viewers
        pdfViewer.setAttribute("zoom", `${newZoom}%`);
      }
    }
  };

  return (
    <div className="flex items-center justify-evenly rounded-3xl bg-intense-purple py-2">
      <div
        onClick={() => handleZoomChange(zoom - 10)}
        className="cursor-pointer rounded-xl p-1 transition-all duration-200 hover:scale-125"
      >
        <Minus strokeWidth={4} className="h-4 w-4 text-white" />
      </div>
      <p className="mt-1 text-xl text-white">{zoom}%</p>
      <div
        onClick={() => handleZoomChange(zoom + 10)}
        className="cursor-pointer rounded-xl p-1 transition-all duration-200 hover:scale-125"
      >
        <Plus strokeWidth={4} className="h-4 w-4 text-white" />
      </div>
    </div>
  );
}
