import { useState, useEffect } from "react"; // Only once, at the top of the file
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useLocation } from "react-router-dom";


// Point to the worker file in the public folder
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'; // Adjust path if necessary

export default function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { previewFile } = location.state || {};

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!previewFile) {
      const timeoutId = setTimeout(() => {
        navigate("/upload");
      }, 1000); // Small delay before redirecting
      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [previewFile, navigate]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError("");
  };

  const onDocumentLoadError = (err) => {
    console.error("PDF load error", err);
    setError("Failed to load PDF.");
    setIsLoading(false);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Review PDF File</h1>

      {error && <div className="mt-4 p-3 bg-red-50 text-red-800 rounded">{error}</div>}

      <div className="flex justify-center mb-4">
        {previewFile ? (
          <div className="border-2 border-gray-300 p-4 w-full">
            <Document
              file={previewFile.url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<p>Loading PDF...</p>}
            >
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </div>
        ) : (
          <p className="text-center text-gray-500">No PDF selected. Redirecting...</p>
        )}
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading PDF...</p>}

      {numPages && !isLoading && (
        <>
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-gray-300 text-gray-700 p-2 rounded-md"
              onClick={goToPrevPage}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button
              className="bg-gray-300 text-gray-700 p-2 rounded-md"
              onClick={goToNextPage}
              disabled={pageNumber === numPages}
            >
              Next
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <button className="bg-blue-600 text-white p-2 rounded-md" onClick={zoomIn}>
              Zoom In
            </button>
            <button className="bg-blue-600 text-white p-2 ml-4 rounded-md" onClick={zoomOut}>
              Zoom Out
            </button>
          </div>
        </>
      )}

      <div className="mt-6 flex justify-center">
        <button
          className="!bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          onClick={() => navigate("/upload")}
        >
          Back to Upload
        </button>
      </div>
    </div>
  );
}
