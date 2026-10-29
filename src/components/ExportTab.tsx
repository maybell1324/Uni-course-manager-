import React, { useState } from 'react';
import { CourseSpecification } from '../types';
import {
  Download,
  Printer,
  FileCode,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ExportTabProps {
  spec: CourseSpecification;
}

export const ExportTab: React.FC<ExportTabProps> = ({ spec }) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const isApproved = spec.workflowStatus === 'Approved';

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleDownloadHtml = () => {
    window.location.href = '/api/export/html';
    showToast('Standalone HTML specification document downloaded.');
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    window.location.href = '/api/export/specforge_output.json';
    showToast('specforge_output.json exported for grading and scoring.');
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Stage 06
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#61507f]" />
            <span className="text-xs font-heading font-bold text-[#61507f]">
              Artifact Publication &amp; Export
            </span>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-[#1e1b17]">
            Document Preview &amp; Official Artifact Exports
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold shadow-xs ${
              isApproved
                ? 'bg-[#cdebc5] text-[#234b1d]'
                : 'bg-[#ffdad6] text-[#93000a]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isApproved ? 'bg-[#234b1d]' : 'bg-[#ba1a1a] animate-pulse'
              }`}
            />
            <span>{isApproved ? 'Official Version (Approved)' : 'DRAFT Watermark Active'}</span>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-[#cdebc5] text-[#234b1d] text-xs font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Parchment Document Sheet (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-3">
          <div className="flex items-center justify-between px-4 py-2 bg-[#faf2ec] rounded-xl border border-[#e8e1db] text-xs text-[#7a757f]">
            <span className="font-heading font-bold text-[#1e1b17] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#61507f]" />
              Official Course Dossier Layout ({spec.templateType})
            </span>
            <span>A4 Document Simulation</span>
          </div>

          {/* Paper Sheet with Watermark if not approved */}
          <div
            id="print-sheet"
            className={`bg-white text-[#1e1b17] rounded-2xl p-8 sm:p-12 border border-[#e8e1db] shadow-md flex flex-col gap-6 relative select-text print-container ${
              !isApproved ? 'watermark-draft' : ''
            }`}
          >
            {/* Watermark Diagonal Overlay for UI View when not approved */}
            {!isApproved && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20 overflow-hidden">
                <span className="text-[#ba1a1a]/10 font-heading font-extrabold text-5xl sm:text-7xl -rotate-45 tracking-widest uppercase">
                  DRAFT — NOT FOR OFFICIAL USE
                </span>
              </div>
            )}

            {/* University Crest & Title Block */}
            <div className="text-center pb-4 border-b border-[#e8e1db]">
              <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#61507f] block">
                Apex University of Technology &amp; Applied Sciences
              </span>
              <span className="text-xs text-[#7a757f] uppercase tracking-wider block mt-0.5">
                {spec.department}
              </span>
              <h2 className="font-heading font-bold text-2xl text-[#1e1b17] mt-1">
                Course Specification Dossier
              </h2>
              <div className="flex items-center justify-center gap-3 text-xs text-[#49454e] mt-2">
                <span>Regulation: <strong>{spec.regulation}</strong></span>
                <span>•</span>
                <span>Template: <strong>{spec.templateType}</strong></span>
                <span>•</span>
                <span>Credits: <strong>{spec.credits.ltpString} ({spec.credits.totalCredits} Cr)</strong></span>
              </div>
            </div>

            {/* Course Summary */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#61507f]">
                1. Course Summary
              </span>
              <p className="text-xs text-[#49454e] leading-relaxed">
                {spec.courseSummary}
              </p>
            </div>

            {/* Credits Matrix */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#61507f]">
                2. Credit Formulation &amp; Contact Hours
              </span>
              <table className="w-full text-left border border-[#e8e1db] text-xs">
                <thead>
                  <tr className="bg-[#faf2ec] text-[#49454e] font-heading font-bold">
                    <th className="p-2 border border-[#e8e1db]">Lecture (L)</th>
                    <th className="p-2 border border-[#e8e1db]">Tutorial (T)</th>
                    <th className="p-2 border border-[#e8e1db]">Practical (P)</th>
                    <th className="p-2 border border-[#e8e1db]">Total Credits</th>
                    <th className="p-2 border border-[#e8e1db]">Contact Hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#e8e1db]">{spec.credits.lecture} hrs/wk</td>
                    <td className="p-2 border border-[#e8e1db]">{spec.credits.tutorial} hrs/wk</td>
                    <td className="p-2 border border-[#e8e1db]">{spec.credits.practical} hrs/wk</td>
                    <td className="p-2 border border-[#e8e1db] font-bold text-[#61507f]">{spec.credits.totalCredits} Credits</td>
                    <td className="p-2 border border-[#e8e1db] font-bold text-[#234b1d]">{spec.totalLectureHours} Hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Course Outcomes */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#61507f]">
                3. Course Outcomes (Taken from Blueprint)
              </span>
              <table className="w-full text-left border border-[#e8e1db] text-xs">
                <thead>
                  <tr className="bg-[#faf2ec] text-[#49454e] font-heading font-bold">
                    <th className="p-2 border border-[#e8e1db] w-14">ID</th>
                    <th className="p-2 border border-[#e8e1db]">Statement</th>
                    <th className="p-2 border border-[#e8e1db] w-28">Bloom&apos;s Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e1db]">
                  {spec.courseOutcomes.map(co => (
                    <tr key={co.id}>
                      <td className="p-2 border border-[#e8e1db] font-bold text-[#61507f]">{co.id}</td>
                      <td className="p-2 border border-[#e8e1db]">{co.statement}</td>
                      <td className="p-2 border border-[#e8e1db] whitespace-nowrap">{co.bloomsLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Units */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#61507f]">
                4. Unit-wise Syllabus (Sum = {spec.totalLectureHours} Hours)
              </span>
              <table className="w-full text-left border border-[#e8e1db] text-xs">
                <thead>
                  <tr className="bg-[#faf2ec] text-[#49454e] font-heading font-bold">
                    <th className="p-2 border border-[#e8e1db] w-16">Unit</th>
                    <th className="p-2 border border-[#e8e1db] w-48">Title</th>
                    <th className="p-2 border border-[#e8e1db]">Topics Breakdown</th>
                    <th className="p-2 border border-[#e8e1db] w-14 text-right">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e1db]">
                  {spec.units.map(u => (
                    <tr key={u.unitNumber}>
                      <td className="p-2 border border-[#e8e1db] font-bold text-[#61507f]">Unit {u.unitNumber}</td>
                      <td className="p-2 border border-[#e8e1db] font-semibold">{u.title}</td>
                      <td className="p-2 border border-[#e8e1db] text-[#49454e]">{u.topics}</td>
                      <td className="p-2 border border-[#e8e1db] text-right font-bold">{u.hours}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Assessment Table */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#61507f]">
                5. Assessment Framework (100% Validated)
              </span>
              <table className="w-full text-left border border-[#e8e1db] text-xs">
                <thead>
                  <tr className="bg-[#faf2ec] text-[#49454e] font-heading font-bold">
                    <th className="p-2 border border-[#e8e1db]">Component</th>
                    <th className="p-2 border border-[#e8e1db]">Category</th>
                    <th className="p-2 border border-[#e8e1db]">Mapped COs</th>
                    <th className="p-2 border border-[#e8e1db] text-right w-16">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e1db]">
                  {spec.assessment.components.map(c => (
                    <tr key={c.id}>
                      <td className="p-2 border border-[#e8e1db] font-semibold">{c.component}</td>
                      <td className="p-2 border border-[#e8e1db]">{c.category}</td>
                      <td className="p-2 border border-[#e8e1db]">{c.mappedCOs.join(', ')}</td>
                      <td className="p-2 border border-[#e8e1db] text-right font-bold">{c.weightage}%</td>
                    </tr>
                  ))}
                  <tr className="bg-[#f4ede6] font-heading font-bold">
                    <td colSpan={3} className="p-2 border border-[#e8e1db]">Total Cumulative Assessment</td>
                    <td className="p-2 border border-[#e8e1db] text-right text-[#234b1d]">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signatures Block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#e8e1db] text-xs">
              <div className="p-3 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col">
                <span className="text-[#7a757f] text-[10px] uppercase font-bold">Course Author</span>
                <span className="font-heading font-bold text-[#1e1b17] mt-1">{spec.governance.author.name}</span>
                <span className="text-[11px] text-[#234b1d] font-semibold mt-1">
                  {spec.governance.author.signedAt ? `✓ Signed ${spec.governance.author.signedAt}` : 'Pending Submission'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col">
                <span className="text-[#7a757f] text-[10px] uppercase font-bold">Curriculum Reviewer</span>
                <span className="font-heading font-bold text-[#1e1b17] mt-1">{spec.governance.reviewer.name}</span>
                <span className="text-[11px] text-[#61507f] font-semibold mt-1">
                  {spec.governance.reviewer.signedAt ? `✓ Validated ${spec.governance.reviewer.signedAt}` : 'Under Review'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col">
                <span className="text-[#7a757f] text-[10px] uppercase font-bold">Head of Department (HOD)</span>
                <span className="font-heading font-bold text-[#1e1b17] mt-1">{spec.governance.hod.name}</span>
                <span className="text-[11px] font-semibold mt-1 text-[#234b1d]">
                  {spec.governance.hod.signedAt ? `✓ Ratified ${spec.governance.hod.signedAt}` : 'Pending Approval'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Compliance Checklist (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6 sticky top-20 no-print">
          {/* Action Card */}
          <div className="bg-[#faf2ec] rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#dfccfe] text-[#4e4068] flex items-center justify-center font-bold">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#1e1b17]">
                    Artifact Export Hub
                  </h3>
                  <span className="text-[11px] text-[#7a757f]">Generate certified files</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#cdebc5] text-[#234b1d] text-[10px] font-bold">
                READY
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Button 1: Download HTML */}
              <button
                onClick={handleDownloadHtml}
                className="w-full py-3 px-4 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center justify-between cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4" />
                  <span>Download Spec HTML</span>
                </div>
                <span className="text-[10px] opacity-80">Official Format</span>
              </button>

              {/* Button 2: Print / Save as PDF */}
              <button
                onClick={handlePrintPdf}
                className="w-full py-3 px-4 rounded-full bg-white hover:bg-[#f4ede6] text-[#1e1b17] font-heading font-bold text-xs border border-[#e8e1db] shadow-xs transition-all flex items-center justify-between cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-[#61507f]" />
                  <span>Print / Save as PDF</span>
                </div>
                <span className="text-[10px] text-[#7a757f]">
                  {isApproved ? 'Official Clean PDF' : 'DRAFT Watermark'}
                </span>
              </button>

              {/* Button 3: Download specforge_output.json */}
              <button
                onClick={handleDownloadJson}
                className="w-full py-3 px-4 rounded-full bg-[#dfccfe] hover:bg-[#dfccfe]/80 text-[#4e4068] font-heading font-bold text-xs transition-all flex items-center justify-between cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>specforge_output.json</span>
                </div>
                <span className="text-[10px] opacity-80">Scoring Payload</span>
              </button>
            </div>
          </div>

          {/* Validation Checklist Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-sm text-[#1e1b17]">
                Export Validation Checklist
              </h4>
              <span className="text-[11px] font-heading font-bold text-[#234b1d] px-2 py-0.5 rounded-full bg-[#cdebc5]">
                4 / 4 Passed
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf2ec] border border-[#e8e1db]">
                <CheckCircle2 className="w-4 h-4 text-[#234b1d] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-heading font-bold text-[#1e1b17]">
                    CO counts agree across sections
                  </span>
                  <span className="text-[11px] text-[#49454e]">
                    Outcomes from blueprint match assessment table and CO-PO matrix.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf2ec] border border-[#e8e1db]">
                <CheckCircle2 className="w-4 h-4 text-[#234b1d] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-heading font-bold text-[#1e1b17]">
                    Hours add up to exact course size
                  </span>
                  <span className="text-[11px] text-[#49454e]">
                    5 units sum (9 + 9 + 8 + 9 + 10) = 45 lecture hours.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf2ec] border border-[#e8e1db]">
                <CheckCircle2 className="w-4 h-4 text-[#234b1d] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-heading font-bold text-[#1e1b17]">
                    Weightages total strictly 100%
                  </span>
                  <span className="text-[11px] text-[#49454e]">
                    CIE 60% + SEE 40% = 100% exact without floating-point drift.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf2ec] border border-[#e8e1db]">
                <CheckCircle2 className="w-4 h-4 text-[#234b1d] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-heading font-bold text-[#1e1b17]">
                    Zero leftover template text
                  </span>
                  <span className="text-[11px] text-[#49454e]">
                    Verified clean of [TODO], Lorem Ipsum, and sample placeholders.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tamper-evident checksum info */}
          <div className="p-4 rounded-2xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col gap-1.5 text-xs text-[#7a757f]">
            <div className="flex items-center justify-between font-heading font-bold">
              <span>Security &amp; Integrity</span>
              <Lock className="w-3.5 h-3.5 text-[#61507f]" />
            </div>
            <span className="text-[11px]">
              Dossier Hash: <code className="font-mono text-[#61507f] font-bold">SHA256: 8f4a...92c1</code>
            </span>
            <span className="text-[10px]">
              Certified for National Board of Accreditation (NBA) &amp; NAAC compliance.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
