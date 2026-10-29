import React, { useState } from 'react';
import { CourseSpecification, Role } from '../types';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Edit3,
  Clock,
  BookOpen,
  ArrowRight,
  FlaskConical,
  GraduationCap,
  Save,
  RotateCcw
} from 'lucide-react';

interface SpecTabProps {
  spec: CourseSpecification;
  currentRole: Role;
  onUpdateSpec: (updated: CourseSpecification) => void;
  onProceedToMapping: () => void;
}

export const SpecTab: React.FC<SpecTabProps> = ({
  spec,
  currentRole,
  onUpdateSpec,
  onProceedToMapping
}) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editSummary, setEditSummary] = useState(spec.courseSummary);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canEdit = currentRole === 'Author';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveSummary = () => {
    const updated = { ...spec, courseSummary: editSummary };
    onUpdateSpec(updated);
    setEditingSection(null);
    showToast('Course summary updated successfully.');
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-20">
      {/* Top Banner Deck */}
      <section className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#61507f] text-white font-heading text-xs font-bold">
                {spec.courseCode}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#dfccfe] text-[#4e4068] font-heading text-xs font-semibold">
                {spec.credits.totalCredits} Credits ({spec.credits.ltpString} L-T-P)
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold ${
                  spec.templateType === 'Integrated'
                    ? 'bg-[#cdebc5] text-[#234b1d]'
                    : 'bg-[#eee7e1] text-[#49454e]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    spec.templateType === 'Integrated' ? 'bg-[#234b1d]' : 'bg-[#7a757f]'
                  }`}
                />
                Detected: {spec.templateType} Template
              </span>
            </div>

            <h1 className="font-heading font-bold text-2xl md:text-3xl text-[#1e1b17] tracking-tight mt-1">
              {spec.courseTitle}
            </h1>
            <p className="text-sm text-[#49454e] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#61507f]" />
              <span>
                {spec.templateType === 'Integrated'
                  ? 'Integrated theory coursework with mandatory weekly laboratory practical sessions.'
                  : 'Non-Laboratory lecture and tutorial module.'}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            <span className="px-3 py-1.5 rounded-full bg-[#faf2ec] border border-[#e8e1db] text-xs font-heading font-bold text-[#61507f]">
              {spec.regulation}
            </span>
            <button
              onClick={onProceedToMapping}
              className="px-4 py-2 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              type="button"
            >
              <span>Next: CO-PO Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Audit Meta Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 bg-[#faf8f5] px-4 py-2.5 rounded-xl border border-[#e8e1db] text-xs text-[#7a757f]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[#234b1d] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Blueprinted Syllabus Synchronized
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-[#61507f] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Inconsistencies Rectified: Hours &amp; Weights
            </span>
            <span>•</span>
            <span>University Regulation 2024</span>
          </div>

          <span className="font-heading font-bold text-[#1e1b17]">
            Official Academic Senate Format
          </span>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-[#cdebc5] text-[#234b1d] text-xs font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: Course Summary */}
      <article className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#eee7e1] text-[#49454e] text-xs font-heading font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="font-heading font-bold text-lg text-[#1e1b17]">
              Course Summary
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dfccfe] text-[#4e4068] text-xs font-heading font-semibold">
              <Sparkles className="w-3 h-3" />
              Aligned with Blueprint &amp; Syllabus
            </span>
          </div>

          {canEdit && editingSection !== 'summary' && (
            <button
              onClick={() => setEditingSection('summary')}
              className="p-1.5 rounded-full hover:bg-[#faf2ec] text-[#7a757f] hover:text-[#1e1b17] transition-colors"
              title="Edit course summary"
              type="button"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>

        {editingSection === 'summary' ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editSummary}
              onChange={e => setEditSummary(e.target.value)}
              rows={4}
              className="w-full p-3 bg-[#faf8f5] border border-[#cbc4cf] rounded-xl text-sm text-[#1e1b17] focus:outline-none focus:border-[#61507f] resize-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingSection(null)}
                className="px-3 py-1 rounded-full text-xs font-heading font-semibold text-[#7a757f] hover:bg-[#faf2ec]"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSummary}
                className="px-4 py-1.5 rounded-full bg-[#61507f] text-white text-xs font-heading font-bold hover:bg-[#7a6899] flex items-center gap-1"
                type="button"
              >
                <Save className="w-3 h-3" />
                Save Summary
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-[#faf2ec] rounded-xl text-sm leading-relaxed text-[#1e1b17]">
            {spec.courseSummary}
          </div>
        )}
      </article>

      {/* SECTION 2: Course Size and Credits */}
      <article className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#eee7e1] text-[#49454e] text-xs font-heading font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="font-heading font-bold text-lg text-[#1e1b17]">
              Course Size &amp; Credits Breakdown
            </h2>
          </div>
          <span className="text-xs font-heading font-semibold text-[#7a757f]">
            Total Contact Hours: {spec.totalLectureHours + (spec.totalPracticalHours || 0)} Hours
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#faf2ec] p-4 rounded-xl flex flex-col gap-1 border border-[#e8e1db]/60">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Lecture (L)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-bold text-2xl text-[#1e1b17]">
                {spec.credits.lecture}
              </span>
              <span className="text-xs text-[#7a757f]">hrs/wk</span>
            </div>
            <span className="text-xs text-[#61507f] font-semibold">
              {spec.totalLectureHours} Lecture Hours Total
            </span>
          </div>

          <div className="bg-[#faf2ec] p-4 rounded-xl flex flex-col gap-1 border border-[#e8e1db]/60">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Tutorial (T)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-bold text-2xl text-[#1e1b17]">
                {spec.credits.tutorial}
              </span>
              <span className="text-xs text-[#7a757f]">hr/wk</span>
            </div>
            <span className="text-xs text-[#7a757f]">
              {spec.credits.tutorial > 0 ? `${spec.credits.tutorial} Credit Weight` : 'None Scheduled'}
            </span>
          </div>

          <div className="bg-[#faf2ec] p-4 rounded-xl flex flex-col gap-1 border border-[#e8e1db]/60">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Practical (P)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-bold text-2xl text-[#1e1b17]">
                {spec.credits.practical}
              </span>
              <span className="text-xs text-[#7a757f]">credit ({spec.credits.practical * 2} hrs/wk)</span>
            </div>
            <span className={`text-xs font-semibold ${spec.credits.practical > 0 ? 'text-[#234b1d]' : 'text-[#7a757f]'}`}>
              {spec.credits.practical > 0 ? 'Integrated Lab Practical' : 'Non-Laboratory'}
            </span>
          </div>

          <div className="bg-[#61507f] p-4 rounded-xl flex flex-col gap-1 text-white shadow-xs">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-white/80">
              Total Credits
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-bold text-2xl text-white">
                {spec.credits.totalCredits.toFixed(1)}
              </span>
              <span className="text-xs text-white/80">Credits</span>
            </div>
            <span className="text-xs text-[#cdebc5] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Exact Formulation Verified
            </span>
          </div>
        </div>
      </article>

      {/* SECTION 3: Course Outcomes (from Blueprint) */}
      <article className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#eee7e1] text-[#49454e] text-xs font-heading font-bold flex items-center justify-center">
              3
            </span>
            <h2 className="font-heading font-bold text-lg text-[#1e1b17]">
              Course Outcomes (CO1 – CO{spec.courseOutcomes.length})
            </h2>
          </div>
          <span className="text-xs text-[#7a757f] flex items-center gap-1">
            <span className="font-semibold text-[#61507f]">Source: Blueprint truth</span> • Revised Bloom&apos;s Taxonomy verbs
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#e8e1db]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#faf2ec] text-[#49454e] text-xs font-heading font-bold uppercase tracking-wider border-b border-[#e8e1db]">
                <th className="py-3 px-4 w-16">CO ID</th>
                <th className="py-3 px-4">Outcome Statement</th>
                <th className="py-3 px-4 w-32">Bloom&apos;s Level</th>
                <th className="py-3 px-4 w-36 text-right">Source Origin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e1db] text-sm text-[#1e1b17]">
              {spec.courseOutcomes.map((co, idx) => (
                <tr key={co.id} className="hover:bg-[#faf8f5] transition-colors">
                  <td className="py-3 px-4 font-heading font-bold text-[#61507f] align-top">
                    {co.id}
                  </td>
                  <td className="py-3 px-4 align-top">
                    <div className="flex flex-col gap-1">
                      <p className="leading-relaxed">{co.statement}</p>
                      {co.wasModified && co.modificationNote && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#61507f]">
                          <Sparkles className="w-3 h-3" />
                          {co.modificationNote}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 align-top whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-heading font-bold ${
                        co.bloomsLevel.startsWith('L5') || co.bloomsLevel.startsWith('L6')
                          ? 'bg-[#dfccfe] text-[#4e4068]'
                          : co.bloomsLevel.startsWith('L4')
                          ? 'bg-[#cdebc5] text-[#234b1d]'
                          : 'bg-[#faf2ec] text-[#1e1b17]'
                      }`}
                    >
                      {co.bloomsLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4 align-top text-right whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#faf2ec] text-[#49454e] text-[11px] font-semibold border border-[#e8e1db]">
                      Blueprint
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      {/* SECTION 4: Course Contents (Unit I to V) */}
      <article className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#eee7e1] text-[#49454e] text-xs font-heading font-bold flex items-center justify-center">
              4
            </span>
            <h2 className="font-heading font-bold text-lg text-[#1e1b17]">
              Course Contents ({spec.totalLectureHours} Total Lecture Hours)
            </h2>
          </div>
          <span className="text-xs text-[#234b1d] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Unit hours sum strictly matches {spec.totalLectureHours}h total
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {spec.units.map(unit => (
            <div
              key={unit.unitNumber}
              className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                unit.wasModified
                  ? 'bg-[#faf8f5] border-[#dfccfe]'
                  : 'bg-[#faf2ec] border-[#e8e1db]'
              }`}
            >
              <div className="flex flex-col gap-1 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-xs text-[#61507f]">
                    UNIT {unit.unitNumber === 1 ? 'I' : unit.unitNumber === 2 ? 'II' : unit.unitNumber === 3 ? 'III' : unit.unitNumber === 4 ? 'IV' : 'V'}
                  </span>
                  <span className="text-[#cbc4cf]">•</span>
                  <h3 className="font-heading font-bold text-sm text-[#1e1b17]">
                    {unit.title}
                  </h3>
                  {unit.wasModified && (
                    <span className="px-2 py-0.5 rounded-full bg-[#dfccfe] text-[#4e4068] text-[10px] font-bold">
                      Rebalanced
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#49454e] leading-relaxed">
                  {unit.topics}
                </p>
                {unit.modificationNote && (
                  <span className="text-[11px] text-[#61507f] font-semibold">
                    Note: {unit.modificationNote}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                <span className="px-3 py-1 rounded-full bg-white border border-[#e8e1db] text-xs font-heading font-bold text-[#1e1b17] shadow-xs">
                  {unit.hours} Hours
                </span>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* SECTION 4B: Laboratory Experiments (if Integrated) */}
      {spec.templateType === 'Integrated' && spec.labExperiments && (
        <article className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#cdebc5] text-[#234b1d] text-xs font-heading font-bold flex items-center justify-center">
                <FlaskConical className="w-3.5 h-3.5" />
              </span>
              <h2 className="font-heading font-bold text-lg text-[#1e1b17]">
                Integrated Practical Component (Weekly Laboratory Sessions)
              </h2>
            </div>
            <span className="text-xs text-[#234b1d] font-bold px-3 py-1 rounded-full bg-[#cdebc5]">
              {spec.totalPracticalHours || 30} Practical Hours
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {spec.labExperiments.map(exp => (
              <div
                key={exp.week}
                className="p-3.5 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-[#dfccfe] text-[#4e4068] flex items-center justify-center font-heading font-bold text-xs shrink-0 mt-0.5">
                  W{exp.week}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-heading font-bold text-[#1e1b17] leading-snug">
                    {exp.title}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-[#7a757f]">
                    <span>Mapped: {exp.mappedCOs.join(', ')}</span>
                    <span>•</span>
                    <span>{exp.hours} Contact Hours</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      {/* SECTION 5: Teaching Methods */}
      <article className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#eee7e1] text-[#49454e] text-xs font-heading font-bold flex items-center justify-center">
            5
          </span>
          <h2 className="font-heading font-bold text-lg text-[#1e1b17]">
            Teaching &amp; Learning Modalities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spec.teachingMethods.map((m, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col gap-1.5">
              <span className="text-xs font-heading font-bold text-[#61507f]">
                {m.title}
              </span>
              <p className="text-xs text-[#49454e] leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* SECTION 6: Assessment Framework (Strictly 100%) */}
      <article className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#eee7e1] text-[#49454e] text-xs font-heading font-bold flex items-center justify-center">
              6
            </span>
            <h2 className="font-heading font-bold text-lg text-[#1e1b17]">
              Assessment Framework (Continuous &amp; Summative)
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cdebc5] text-[#234b1d] text-xs font-heading font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Total: 100% Validated
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#e8e1db]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#faf2ec] text-[#49454e] text-xs font-heading font-bold uppercase tracking-wider border-b border-[#e8e1db]">
                <th className="py-3 px-4">Component</th>
                <th className="py-3 px-4 w-24">Category</th>
                <th className="py-3 px-4">Evaluation Modality</th>
                <th className="py-3 px-4 w-32">Mapped COs</th>
                <th className="py-3 px-4 w-24 text-right">Weightage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e1db] text-sm text-[#1e1b17]">
              {spec.assessment.components.map(comp => (
                <tr key={comp.id} className="hover:bg-[#faf8f5] transition-colors">
                  <td className="py-3 px-4 font-heading font-semibold text-xs">
                    {comp.component}
                    {comp.wasModified && (
                      <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[#dfccfe] text-[#4e4068] text-[10px] font-bold">
                        Normalized
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-[#faf2ec] text-[#49454e] text-[11px] font-semibold border border-[#e8e1db]">
                      {comp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-[#49454e]">
                    {comp.modality}
                  </td>
                  <td className="py-3 px-4 text-xs font-heading font-bold text-[#61507f]">
                    {comp.mappedCOs.join(', ')}
                  </td>
                  <td className="py-3 px-4 text-right font-heading font-bold text-sm text-[#1e1b17]">
                    {comp.weightage}%
                  </td>
                </tr>
              ))}
              <tr className="bg-[#f4ede6] font-heading font-bold text-xs text-[#1e1b17]">
                <td colSpan={4} className="py-3 px-4">
                  CIE Internal: {spec.assessment.cieTotal}% + SEE Semester End: {spec.assessment.seeTotal}%
                </td>
                <td className="py-3 px-4 text-right text-sm text-[#234b1d]">
                  100%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      {/* SECTION 7: Prescribed Textbooks & References */}
      <article className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#eee7e1] text-[#49454e] text-xs font-heading font-bold flex items-center justify-center">
            7
          </span>
          <h2 className="font-heading font-bold text-lg text-[#1e1b17]">
            Prescribed Textbooks &amp; Reference Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spec.textbooks.map((tb, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex items-start gap-3">
              <div className="w-10 h-14 rounded-lg bg-[#61507f] text-white flex items-center justify-center shrink-0 shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#61507f]">
                  [{tb.type} Textbook]
                </span>
                <span className="text-xs font-heading font-bold text-[#1e1b17]">
                  {tb.citation}
                </span>
                <span className="text-xs text-[#49454e]">
                  {tb.details}
                </span>
                {tb.isbn && (
                  <span className="text-[11px] text-[#7a757f] mt-0.5">
                    ISBN: {tb.isbn}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* Sticky Bottom Reviewer Action Footnote */}
      <div className="p-4 rounded-2xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-[#234b1d] shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-heading font-bold text-[#1e1b17]">
              Step 2 Completed: Official Specification Structured
            </span>
            <span className="text-[11px] text-[#49454e]">
              Outcomes, units, and assessment framework are aligned. Ready to inspect CO-PO-PSO matrix.
            </span>
          </div>
        </div>

        <button
          onClick={onProceedToMapping}
          className="px-6 py-2.5 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
          type="button"
        >
          <span>Inspect CO-PO-PSO Map</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
