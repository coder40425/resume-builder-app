import { useState, useRef } from "react";
import { Link, useParams } from "react-router";
import { FileText, Download, ChevronLeft, ZoomIn, ZoomOut, Edit3, Eye } from "lucide-react";
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
  const [zoom, setZoom] = useState(0.75);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit"); // For mobile tabs
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
      <nav className="border-b border-gray-200 bg-white z-10 flex-shrink-0">
        <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              <span className="hidden sm:inline font-semibold text-gray-900 text-sm md:text-base">AI Resume Builder</span>
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link
              to="/templates"
              className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-xs md:text-sm"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              <span>Change Template</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="hidden sm:block px-2 md:px-3 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 flex-shrink-0"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{isDownloading ? "Preparing..." : "Download PDF"}</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile Template Selector */}
        <div className="sm:hidden px-3 pb-3">
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden border-t border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === "edit"
                  ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === "preview"
                  ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Responsive Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Form (Desktop: always visible, Mobile: conditional) */}
        <div className={`lg:w-1/2 overflow-y-auto border-r border-gray-200 bg-gray-50 ${activeTab === "edit" ? "flex-1 lg:flex-none" : "hidden lg:block"}`}>
          <ResumeForm />
        </div>

        {/* Right Panel - Live Preview (Desktop: always visible, Mobile: conditional) */}
        <div className={`lg:w-1/2 overflow-y-auto bg-gray-100 ${activeTab === "preview" ? "flex-1 lg:flex-none" : "hidden lg:block"}`}>
          <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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
                Template: <span className="font-medium text-gray-700">{template?.name}</span>
              </div>
            </div>

            <div className="overflow-auto">
              <div
                className="origin-top transition-transform duration-200"
                style={{ transform: `scale(${zoom})`, width: "fit-content", margin: "0 auto" }}
              >
                <div ref={previewRef}>
                  <ResumePreview templateId={selectedTemplate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
