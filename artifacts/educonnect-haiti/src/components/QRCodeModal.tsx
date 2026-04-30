import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  courseTitle: string;
  courseUrl: string;
  onClose: () => void;
}

export function QRCodeModal({ courseTitle, courseUrl, onClose }: Props) {
  const qrRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const svgEl = qrRef.current?.querySelector("svg");
    if (!svgEl) return;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>QR Code – ${courseTitle}</title>
          <style>
            body {
              margin: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              font-family: Georgia, serif;
              background: white;
            }
            .label {
              font-size: 22px;
              font-weight: bold;
              margin-bottom: 20px;
              text-align: center;
              max-width: 320px;
            }
            .sublabel {
              font-size: 13px;
              color: #555;
              margin-top: 16px;
              text-align: center;
            }
            svg { display: block; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="label">${courseTitle}</div>
          ${svgData}
          <div class="sublabel">Scannez pour accéder au cours</div>
          <script>window.onload = () => { window.print(); window.close(); }<\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadPNG = () => {
    const svgEl = qrRef.current?.querySelector("svg");
    if (!svgEl) return;

    const size = 400;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      const link = document.createElement("a");
      link.download = `qr-${courseTitle.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = url;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-bold text-lg font-serif">QR Code du cours</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center px-6 py-8 gap-4">
          <p className="text-center font-medium text-sm text-muted-foreground max-w-[220px]">
            {courseTitle}
          </p>
          <div
            ref={qrRef}
            className="p-4 bg-white rounded-xl border-2 border-muted shadow-inner"
          >
            <QRCodeSVG
              value={courseUrl}
              size={220}
              bgColor="#ffffff"
              fgColor="#111111"
              level="M"
              includeMargin={false}
            />
          </div>
          <p className="text-xs text-center text-muted-foreground max-w-[240px]">
            Les élèves scannent ce code avec leur téléphone pour ouvrir le cours
            directement, sans taper d'URL.
          </p>
          <div className="text-xs font-mono bg-muted/60 rounded px-3 py-1.5 text-muted-foreground truncate max-w-full">
            {courseUrl}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 pb-5">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleDownloadPNG}
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
          <Button className="flex-1" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
        </div>
      </div>
    </div>
  );
}
