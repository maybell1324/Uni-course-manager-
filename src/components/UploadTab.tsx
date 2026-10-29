import React, { useState, useRef } from 'react';
import { CourseSpecification } from '../types';
import {
  UploadCloud,
  FileCheck2,
  Sparkles,
  ArrowRight,
  FileText,
  Cpu,
  Layers,
  FileCode,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface UploadTabProps {
  spec: CourseSpecification | null;
  onGenerateCorrection: () => Promise<void>;
  onProceedToSpec: () => void;
  onUploadSuccess: (parsedSpec: CourseSpecification) => void;
  isProcessing: boolean;
}

export const UploadTab: React.FC<UploadTabProps> = ({
  spec,
  onGenerateCorrection,
  onProceedToSpec,
  onUploadSuccess,
  isProcessing
}) => {
  const [specFile, setSpecFile] = useState<File | null>(null);
  const [blueprintFile, setBlueprintFile] = useState<File | null>(null);
  const [pastedSpecText, setPastedSpecText] = useState('');
  const [pastedBlueprintText, setPastedBlueprintText] = useState('');
  const [showPasteSection, setShowPasteSection] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const specInputRef = useRef<HTMLInputElement>(null);
  const blueprintInputRef = useRef<HTMLInputElement>(null);

  const handleSpecUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSpecFile(file);
      await triggerUpload(file, blueprintFile);
    }
  };

  const handleBlueprintUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBlueprintFile(file);
      await triggerUpload(specFile, file);
    }
  };

  const triggerUpload = async (sFile: File | null, bFile: File | null) => {
    if (!sFile && !pastedSpecText.trim()) {
      setUploadError('Please select or paste your existing course specification (.docx).');
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const formData = new FormData();
    if (sFile) {
      formData.append('specFile', sFile);
    } else if (pastedSpecText.trim()) {
      formData.append('specText', pastedSpecText.trim());
      formData.append('specFileName', 'pasted_course_specification.txt');
    }

    if (bFile) {
      formData.append('blueprintFile', bFile);
    } else if (pastedBlueprintText.trim()) {
      formData.append('blueprintText', pastedBlueprintText.trim());
      formData.append('blueprintFileName', 'pasted_blueprint.txt');
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload document');
      }
      onUploadSuccess(data.spec);
      setUploadSuccess(`Successfully ingested and parsed course documents.`);
    } catch (err: any) {
      setUploadError(err.message || 'Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePasteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await triggerUpload(null, null);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-16">
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfccfe] text-[#4e4068] text-xs font-heading font-semibold self-start">
            <span className="w-2 h-2 rounded-full bg-[#61507f] animate-pulse" />
            Document Intake Engine
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1b17] tracking-tight">
            Syllabus Spec Normalizer
          </h1>
          <p className="text-sm md:text-base text-[#49454e] max-w-2xl leading-relaxed">
            Upload your existing messy course specification (<code className="font-mono text-xs bg-[#faf2ec] px-1 py-0.5 rounded">.docx</code>) and question-paper blueprint (<code className="font-mono text-xs bg-[#faf2ec] px-1 py-0.5 rounded">.doc</code>). SpecForge takes outcomes and unit syllabus from the blueprint, harmonizes credits and contact hours into the official university template, and generates a fresh CO-PO-PSO matrix.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#eee7e1] px-4 py-3 rounded-2xl border border-[#e8e1db] self-start md:self-auto shrink-0">
          <Layers className="w-5 h-5 text-[#61507f]" />
          <div className="flex flex-col">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Parsing Target
            </span>
            <span className="text-xs font-heading font-bold text-[#1e1b17]">
              NBA Tier-1 Autonomous Format
            </span>
          </div>
        </div>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={specInputRef}
        type="file"
        accept=".docx,.doc,.pdf,.txt"
        className="hidden"
        onChange={handleSpecUpload}
      />
      <input
        ref={blueprintInputRef}
        type="file"
        accept=".doc,.docx,.pdf,.txt"
        className="hidden"
        onChange={handleBlueprintUpload}
      />

      {/* Two Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Existing Course Spec (.docx) */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-[#1e1b17]">
                    1. Existing Course Spec
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                    Required (.docx)
                  </span>
                </div>
                <p className="text-xs text-[#7a757f] mt-0.5">
                  The messy legacy document containing hours, assessment, and prerequisites
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#faf2ec] flex items-center justify-center text-[#61507f]">
                <FileText className="w-4 h-4" />
              </div>
            </div>

            {/* Upload Box */}
            <div
              onClick={() => specInputRef.current?.click()}
              className="p-5 rounded-xl bg-[#faf2ec] border-2 border-dashed border-[#cbc4cf] hover:border-[#61507f] transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#dfccfe] text-[#4e4068] flex items-center justify-center shrink-0">
                  <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-xs font-heading font-bold text-[#1e1b17] truncate">
                    {specFile ? specFile.name : spec?.rawFiles?.specFileName || 'Select or drop .docx course spec'}
                  </span>
                  <span className="text-[11px] text-[#7a757f]">
                    {specFile ? `${(specFile.size / 1024).toFixed(1)} KB` : 'Click to browse files'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-heading font-semibold text-[#61507f] group-hover:underline shrink-0">
                Browse
              </span>
            </div>

            {/* Parsed Info or upload prompt */}
            {spec ? (
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e8e1db] flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#eee7e1] flex items-center justify-center text-[#61507f] shrink-0 font-bold text-xs">
                  {spec.courseCode.slice(0, 2)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-heading font-bold text-[#1e1b17]">
                    Parsed: {spec.courseCode} — {spec.courseTitle}
                  </span>
                  <span className="text-[11px] text-[#7a757f] truncate">
                    Credits: {spec.credits.ltpString} ({spec.templateType} Template) • {spec.totalLectureHours} Lecture Hours
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#e8e1db] text-xs text-[#7a757f]">
                No document loaded. Drop your course spec file above to begin.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#f4ede6] flex items-center justify-between text-xs text-[#7a757f]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#49454e]">
              <span className={`w-2 h-2 rounded-full ${spec ? 'bg-[#234b1d]' : 'bg-[#7a757f]'}`} />
              {spec ? 'Specification Loaded' : 'Awaiting File'}
            </span>
            <button
              onClick={() => specInputRef.current?.click()}
              className="text-[#61507f] font-semibold hover:underline"
              type="button"
            >
              Choose File
            </button>
          </div>
        </div>

        {/* Card 2: Question-Paper Blueprint (.doc) */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-[#1e1b17]">
                    2. Question-paper Blueprint
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#cdebc5] text-[#234b1d] text-[10px] font-bold">
                    Target Truth (.doc)
                  </span>
                </div>
                <p className="text-xs text-[#7a757f] mt-0.5">
                  Supplies the Course Outcomes and unit-wise syllabus content
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#faf2ec] flex items-center justify-center text-[#61507f]">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>

            {/* Upload Box */}
            <div
              onClick={() => blueprintInputRef.current?.click()}
              className="p-5 rounded-xl bg-[#faf2ec] border-2 border-dashed border-[#cbc4cf] hover:border-[#61507f] transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#cdebc5] text-[#234b1d] flex items-center justify-center shrink-0">
                  <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-xs font-heading font-bold text-[#1e1b17] truncate">
                    {blueprintFile ? blueprintFile.name : spec?.rawFiles?.blueprintFileName || 'Select or drop .doc blueprint'}
                  </span>
                  <span className="text-[11px] text-[#7a757f]">
                    {blueprintFile ? `${(blueprintFile.size / 1024).toFixed(1)} KB` : 'Click to browse files'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-heading font-semibold text-[#61507f] group-hover:underline shrink-0">
                Browse
              </span>
            </div>

            {/* Blueprint extraction features */}
            {spec ? (
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e8e1db] flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#eee7e1] flex items-center justify-center text-[#234b1d] shrink-0 font-bold text-xs">
                  CO
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-heading font-bold text-[#1e1b17]">
                    Extracted {spec.courseOutcomes.length} Course Outcomes &amp; {spec.units.length} Units
                  </span>
                  <span className="text-[11px] text-[#7a757f] truncate">
                    Outcomes mapped with Revised Bloom&apos;s action verbs
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#e8e1db] text-xs text-[#7a757f]">
                Drop blueprint to extract official outcomes and unit syllabus.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#f4ede6] flex items-center justify-between text-xs text-[#7a757f]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#49454e]">
              <span className={`w-2 h-2 rounded-full ${blueprintFile || spec?.rawFiles?.blueprintFileName ? 'bg-[#234b1d]' : 'bg-[#7a757f]'}`} />
              {blueprintFile || spec?.rawFiles?.blueprintFileName ? 'Blueprint Attached' : 'Awaiting File'}
            </span>
            <button
              onClick={() => blueprintInputRef.current?.click()}
              className="text-[#61507f] font-semibold hover:underline"
              type="button"
            >
              Choose File
            </button>
          </div>
        </div>
      </div>

      {/* Manual Paste Text Drawer Toggle */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => setShowPasteSection(!showPasteSection)}
          className="text-xs font-heading font-bold text-[#61507f] hover:underline flex items-center gap-1.5"
          type="button"
        >
          <FileCode className="w-4 h-4" />
          <span>{showPasteSection ? 'Hide Text Input' : 'Or Paste Raw Specification / Blueprint Text'}</span>
        </button>
      </div>

      {/* Paste Drawer */}
      {showPasteSection && (
        <form onSubmit={handlePasteSubmit} className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#e8e1db] pb-3">
            <h3 className="font-heading font-bold text-sm text-[#1e1b17]">
              Paste Document Text Directly
            </h3>
            <span className="text-xs text-[#7a757f]">
              Direct text intake for quick copy-paste from Word or editors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-heading font-bold text-[#1e1b17]">
                Existing Course Specification Text (.docx content)
              </label>
              <textarea
                value={pastedSpecText}
                onChange={e => setPastedSpecText(e.target.value)}
                rows={6}
                placeholder="Paste course title, code, credits (e.g. 3:0:1), summary, hours, and assessment components..."
                className="w-full p-3 bg-[#faf8f5] border border-[#cbc4cf] focus:border-[#61507f] rounded-xl text-xs text-[#1e1b17] focus:outline-none resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-heading font-bold text-[#1e1b17]">
                Question-Paper Blueprint Text (.doc content)
              </label>
              <textarea
                value={pastedBlueprintText}
                onChange={e => setPastedBlueprintText(e.target.value)}
                rows={6}
                placeholder="Paste Course Outcomes (CO1 to CO5) and Unit-wise syllabus (Unit 1 to 5)..."
                className="w-full p-3 bg-[#faf8f5] border border-[#cbc4cf] focus:border-[#61507f] rounded-xl text-xs text-[#1e1b17] focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white text-xs font-heading font-bold transition-all disabled:opacity-50"
            >
              {isUploading ? 'Parsing Text...' : 'Parse Pasted Documents'}
            </button>
          </div>
        </form>
      )}

      {/* Feedback Toasts */}
      {uploadError && (
        <div className="p-4 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs font-semibold flex items-center gap-2 border border-[#ba1a1a]/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
      {uploadSuccess && (
        <div className="p-4 rounded-xl bg-[#cdebc5] text-[#234b1d] text-xs font-semibold flex items-center gap-2 border border-[#234b1d]/20">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Generate Button Center Call-To-Action */}
      <div className="flex flex-col items-center justify-center gap-3 text-center pt-2">
        <button
          onClick={onGenerateCorrection}
          disabled={!spec || isProcessing || isUploading}
          className="group px-8 py-4 rounded-full bg-[#61507f] text-white hover:bg-[#7a6899] active:scale-95 font-heading font-bold text-base md:text-lg transition-all shadow-md hover:shadow-lg flex items-center gap-3 cursor-pointer disabled:opacity-50"
          type="button"
        >
          <Sparkles className={`w-5 h-5 ${isProcessing ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
          <span>{isProcessing ? 'Pair-Programming Normalization...' : 'Generate Corrected Course Spec'}</span>
          <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-xs text-[#7a757f]">
          {spec
            ? 'Ready to normalize. Replaces COs & units with blueprint, balances hours to course size, and creates reasoned CO-PO map.'
            : 'Upload your course specification and blueprint files to unlock normalization.'}
        </span>
      </div>

      {/* Pipeline Progress Stages */}
      {spec && (
        <div className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#dfccfe] text-[#4e4068] flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#1e1b17]">
                  Intelligent Correction Pipeline
                </h3>
                <p className="text-xs text-[#7a757f]">
                  Autonomous verification across university regulations and NBA criteria
                </p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#faf2ec] border border-[#e8e1db] text-xs font-heading font-bold text-[#61507f] self-start sm:self-auto">
              Ready for Review
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-[#cdebc5] text-[#234b1d] flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-[10px] font-semibold text-[#7a757f]">Stage 1</span>
              </div>
              <div>
                <span className="text-xs font-heading font-bold text-[#1e1b17] block">Reading Files</span>
                <span className="text-[11px] text-[#49454e]">Parsed user documents</span>
              </div>
              <div className="h-1 bg-[#cdebc5] rounded-full w-full" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-[#cdebc5] text-[#234b1d] flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-[10px] font-semibold text-[#7a757f]">Stage 2</span>
              </div>
              <div>
                <span className="text-xs font-heading font-bold text-[#1e1b17] block">Selecting Template</span>
                <span className="text-[11px] text-[#49454e]">{spec.templateType} Template</span>
              </div>
              <div className="h-1 bg-[#cdebc5] rounded-full w-full" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-[#cdebc5] text-[#234b1d] flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-[10px] font-semibold text-[#7a757f]">Stage 3</span>
              </div>
              <div>
                <span className="text-xs font-heading font-bold text-[#1e1b17] block">Extracting COs</span>
                <span className="text-[11px] text-[#49454e]">{spec.courseOutcomes.length} Outcomes from Blueprint</span>
              </div>
              <div className="h-1 bg-[#cdebc5] rounded-full w-full" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-[#dfccfe] text-[#4e4068] flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-[10px] font-semibold text-[#7a757f]">Stage 4</span>
              </div>
              <div>
                <span className="text-xs font-heading font-bold text-[#1e1b17] block">Synthesizing Map</span>
                <span className="text-[11px] text-[#49454e]">Annexure A Rationale</span>
              </div>
              <div className="h-1 bg-[#dfccfe] rounded-full w-full" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-[#cdebc5] text-[#234b1d] flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-[10px] font-semibold text-[#7a757f]">Stage 5</span>
              </div>
              <div>
                <span className="text-xs font-heading font-bold text-[#1e1b17] block">Validation Audits</span>
                <span className="text-[11px] text-[#49454e]">Hours &amp; weights verified</span>
              </div>
              <div className="h-1 bg-[#cdebc5] rounded-full w-full" />
            </div>
          </div>

          {/* View Document Button */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#49454e]">
              <span className="w-2 h-2 rounded-full bg-[#234b1d]" />
              <span>Document loaded and analyzed.</span>
            </div>
            <button
              onClick={onProceedToSpec}
              className="px-5 py-2 rounded-full bg-[#faf2ec] hover:bg-[#eee7e1] text-[#61507f] font-heading font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-[#e8e1db]"
              type="button"
            >
              <span>Proceed to Step 2: Spec Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
