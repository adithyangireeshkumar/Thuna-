"use client";

function escapePdfText(text) {
  return text.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function buildPdf(record) {
  const lines = [
    "THUNA Public Portal",
    `FIR Number: ${record.firNumber}`,
    `Case Type: ${record.categoryEn}`,
    `Status: ${record.statusLabelEn}`,
    `Station: ${record.station}`,
    `District: ${record.district}`,
    `Reported At: ${record.reportedAt}`,
    "",
    "Public Summary",
    record.descriptionEn
  ];

  const content = [
    "BT",
    "/F1 12 Tf",
    "50 760 Td",
    ...lines.flatMap((line, index) => [index === 0 ? "" : "0 -18 Td", `(${escapePdfText(line)}) Tj`]).filter(Boolean),
    "ET"
  ].join("\n");

  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
    `4 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj"
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return pdf;
}

export function DownloadFirButton({ record }) {
  function handleDownload() {
    const pdf = buildPdf(record);
    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${record.firNumber.replaceAll("/", "-").toLowerCase()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="interactive-ring flex items-center gap-4 rounded-[24px] bg-police px-6 py-5 text-left text-white transition hover:bg-policeMuted dark:bg-copper dark:hover:bg-[#ad8427]"
    >
      <span className="rounded-2xl bg-white/10 px-3 py-3 text-2xl">📄</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/80">Download FIR (PDF)</p>
        <p className="mt-2 text-lg font-semibold">Public-safe case summary</p>
      </div>
    </button>
  );
}
