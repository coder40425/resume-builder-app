import { useState, useRef } from "react";
import { Link, useParams } from "react-router";
import { FileText, Download, ChevronLeft, ZoomIn, ZoomOut } from "lucide-react";
import { ResumeProvider, useResume } from "../store/resumeStore";
import { ResumeForm } from "../components/ResumeForm";
import { ResumePreview } from "../components/ResumePreview";
import { templates } from "../data/templates";

export function BuilderPage() {
  return (
    <ResumeProvider>
      <BuilderContent />
    </ResumeProvider>
  );
}

function BuilderContent() {
  const { templateId } = useParams<{ templateId: string }>();
  const [selectedTemplate, setSelectedTemplate] = useState(templateId || "modern-professional");
  const [zoom, setZoom] = useState(0.8);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { resumeData } = useResume();

  const template = templates.find((t) => t.id === selectedTemplate);

  const handleDownloadPDF = () => {
    const node = previewRef.current;
    if (!node) return;

    setIsDownloading(true);

    // Grab the full rendered HTML of just the resume preview
    const resumeHTML = node.innerHTML;

    // Collect all stylesheets from the current document
    const styleSheets = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch {
          // Cross-origin stylesheets can't be read — use a <link> tag instead
          return sheet.href ? `@import url("${sheet.href}");` : "";
        }
      })
      .join("\n");

    // Open a hidden iframe, write the resume into it, then trigger print
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      setIsDownloading(false);
      document.body.removeChild(iframe);
      return;
    }

    const safeName =
      resumeData.personalInfo.fullName?.trim().replace(/\s+/g, "_") || "Resume";

    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${safeName}_Resume</title>
          <style>
            ${styleSheets}

            /* ── Print-specific overrides ── */
            @page {
              size: A4 portrait;
              margin: 0;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            html, body {
              margin: 0;
              padding: 0;
              background: white;
            }

            /* Remove any scale transform that was applied for the preview zoom */
            body > div {
              transform: none !important;
            }
          </style>
        </head>
        <body>
          <div>${resumeHTML}</div>
        </body>
      </html>
    `);
    iframeDoc.close();

    // Wait for fonts and images to load before printing
    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        // Clean up after a short delay so the print dialog has time to open
        setTimeout(() => {
          document.body.removeChild(iframe);
          setIsDownloading(false);
        }, 1000);
      }, 500);
    };
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <nav className="border-b border-gray-200 bg-white z-10">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-gray-900">AI Resume Builder</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/templates"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Change Template</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Preparing..." : "Download PDF"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Form */}
        <div className="w-1/2 overflow-y-auto border-r border-gray-200 bg-gray-50">
          <ResumeForm />
        </div>

        {/* Right Panel - Live Preview */}
        <div className="w-1/2 overflow-y-auto bg-gray-100 p-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Template:{" "}
              <span className="font-medium text-gray-700">{template?.name}</span>
            </div>
          </div>

          <div className="overflow-auto">
            <div
              className="origin-top transition-transform duration-200"
              style={{ transform: `scale(${zoom})`, width: "fit-content" }}
            >
              <div ref={previewRef}>
                <ResumePreview templateId={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
