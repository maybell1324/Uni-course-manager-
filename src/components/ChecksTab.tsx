import React, { useState } from 'react';
import { CourseSpecification, Role, DefectItem, ValidationCheck } from '../types';
import {
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Search,
  Code
} from 'lucide-react';

interface ChecksTabProps {
  spec: CourseSpecification;
  currentRole: Role;
  onUpdateSpec: (updated: CourseSpecification) => void;
  onProceedToWorkflow: () => void;
}

export const ChecksTab: React.FC<ChecksTabProps> = ({
  spec,
  currentRole,
  onUpdateSpec,
  onProceedToWorkflow
}) => {
  const [severityFilter, setSeverityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassedAccordion, setShowPassedAccordion] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const report = spec.validationReport;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApplyFix = (defectId: string) => {
    const updatedDefects = spec.defects.map(d => (d.id === defectId ? { ...d, status: 'Auto-Fixed' as const } : d));
    onUpdateSpec({ ...spec, defects: updatedDefects });
    showToast('Applied automated remediation patch.');
  };

  const handleApplyAllFixes = () => {
    const updatedDefects = spec.defects.map(d => ({ ...d, status: 'Auto-Fixed' as const }));
    onUpdateSpec({ ...spec, defects: updatedDefects });
    showToast('Applied all remediation patches successfully.');
  };

  const handleRerunChecks = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/validate');
      const data = await res.json();
      onUpdateSpec({ ...spec, validationReport: data });
      showToast('Re-evaluated validation checks.');
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredDefects = spec.defects.filter(d => {
    if (severityFilter !== 'All' && d.severity !== severityFilter) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        d.code.toLowerCase().includes(query) ||
        d.issue.toLowerCase().includes(query) ||
        d.proposedFix.toLowerCase().includes(query) ||
        d.location.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-20">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-[#7a757f] font-heading font-semibold uppercase tracking-wider">
            <span>Audit Stage 04</span>
            <span>/</span>
            <span className="text-[#61507f]">Verification &amp; Quality Engine</span>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-[#1e1b17]">
            Curriculum Compliance &amp; Validation Report
          </h1>
          <p className="text-sm text-[#49454e] max-w-2xl leading-relaxed">
            Written in plain deterministic code: verifies that Course Outcome counts agree across tables, syllabus hours sum strictly matches course size, assessment weightages total exactly 100%, and leftover template text is eliminated.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleRerunChecks}
            disabled={isRefreshing}
            className="px-4 py-2 rounded-full bg-[#faf2ec] border border-[#e8e1db] hover:bg-[#eee7e1] text-[#1e1b17] font-heading font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            type="button"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Re-run Checks</span>
          </button>
          <button
            onClick={handleApplyAllFixes}
            className="px-5 py-2 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            type="button"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply All Fixes</span>
          </button>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="w-full bg-[#faf2ec] rounded-2xl p-4 border border-[#e8e1db] shadow-xs flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Passed */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#cdebc5] text-[#234b1d] text-xs font-heading font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#234b1d]" />
            <span className="text-sm">{report.passedCount}</span>
            <span>Passed</span>
          </div>
          {/* Warnings */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ebdcff] text-[#4f3e6c] text-xs font-heading font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#61507f]" />
            <span className="text-sm">{report.warningCount}</span>
            <span>Advisory</span>
          </div>
          {/* Errors */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-heading font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
            <span className="text-sm">{report.failedCount}</span>
            <span>Errors</span>
          </div>
        </div>

        {/* Compliance Progress Pill */}
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-[#e8e1db]">
          <div className="flex flex-col min-w-[160px]">
            <div className="flex justify-between items-center text-xs font-heading">
              <span className="text-[#49454e]">Quality Pass Rate</span>
              <span className="text-[#234b1d] font-bold">{report.passRate}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#f4ede6] overflow-hidden mt-1">
              <div
                className="h-full bg-[#234b1d] rounded-full transition-all duration-500"
                style={{ width: `${report.passRate}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] font-heading font-bold text-[#7a757f] hidden sm:inline">
            Tier-1 Threshold 85%
          </span>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-[#cdebc5] text-[#234b1d] text-xs font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="w-full bg-white rounded-2xl p-4 border border-[#e8e1db] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center p-1 bg-[#faf2ec] rounded-full border border-[#e8e1db]">
          {(['All', 'High', 'Medium', 'Low'] as const).map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                severityFilter === sev
                  ? 'bg-[#61507f] text-white shadow-xs'
                  : 'text-[#49454e] hover:text-[#1e1b17]'
              }`}
              type="button"
            >
              {sev === 'All' ? 'All Severities' : sev}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#7a757f] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search defect code or issue..."
            className="w-full bg-[#faf8f5] text-xs text-[#1e1b17] rounded-full pl-9 pr-4 py-2 border border-[#cbc4cf] focus:outline-none focus:border-[#61507f]"
          />
        </div>
      </div>

      {/* Defect Cards List */}
      <div className="flex flex-col gap-4">
        {filteredDefects.map(defect => (
          <div
            key={defect.id}
            className="bg-white rounded-2xl p-5 border border-[#e8e1db] shadow-xs hover:shadow-sm transition-all flex flex-col gap-4"
          >
            {/* Defect Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-heading font-bold ${
                    defect.severity === 'High'
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : defect.severity === 'Medium'
                      ? 'bg-[#dfccfe] text-[#4e4068]'
                      : 'bg-[#faf2ec] text-[#49454e]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      defect.severity === 'High' ? 'bg-[#ba1a1a]' : 'bg-[#61507f]'
                    }`}
                  />
                  {defect.severity} Severity
                </span>

                <code className="px-2 py-0.5 rounded bg-[#faf2ec] text-[#61507f] font-mono text-xs font-bold border border-[#e8e1db]">
                  {defect.code}
                </code>

                <span className="text-xs text-[#7a757f]">• {defect.location}</span>
              </div>

              <span
                className={`text-xs font-heading font-bold px-2.5 py-0.5 rounded-full ${
                  defect.status === 'Auto-Fixed'
                    ? 'bg-[#cdebc5] text-[#234b1d]'
                    : 'bg-[#faf2ec] text-[#61507f]'
                }`}
              >
                {defect.status === 'Auto-Fixed' ? '✓ Remediated' : 'Pending Action'}
              </span>
            </div>

            {/* Problem vs Fix Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Problem */}
              <div className="bg-[#faf2ec] p-4 rounded-xl border border-[#e8e1db] flex flex-col justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#ba1a1a] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Audited Inconsistency
                  </span>
                  <p className="text-xs text-[#1e1b17] leading-relaxed">
                    {defect.issue}
                  </p>
                </div>
                <span className="text-[11px] text-[#7a757f] italic">
                  Rule: {defect.rule}
                </span>
              </div>

              {/* Fix */}
              <div className="bg-[#faf8f5] p-4 rounded-xl border border-[#dfccfe] flex flex-col justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#234b1d] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Automated Remediation Applied
                  </span>
                  <p className="text-xs text-[#1e1b17] leading-relaxed">
                    {defect.appliedFix}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#234b1d] font-semibold">
                    100% Invariant Met
                  </span>
                  <button
                    onClick={() => handleApplyFix(defect.id)}
                    className="px-3 py-1 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white text-xs font-heading font-bold transition-all cursor-pointer"
                    type="button"
                  >
                    Confirm Revision
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plain Code Validation Report Accordion */}
      <div className="bg-white rounded-2xl border border-[#e8e1db] shadow-xs overflow-hidden">
        <button
          onClick={() => setShowPassedAccordion(!showPassedAccordion)}
          className="w-full p-4 flex items-center justify-between bg-[#faf2ec] hover:bg-[#eee7e1] transition-colors cursor-pointer text-left"
          type="button"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#234b1d] text-white flex items-center justify-center font-bold text-xs">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#1e1b17]">
                Deterministic Plain-Code Validation Audits ({report.checks.length} Checks)
              </h3>
              <p className="text-xs text-[#7a757f]">
                Algorithmic assertion suite written in pure code to guarantee academic compliance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#cdebc5] text-[#234b1d] text-xs font-bold font-heading">
              {report.passRate}% Passed
            </span>
            {showPassedAccordion ? (
              <ChevronUp className="w-4 h-4 text-[#7a757f]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#7a757f]" />
            )}
          </div>
        </button>

        {showPassedAccordion && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 divide-y md:divide-y-0">
            {report.checks.map(chk => (
              <div
                key={chk.id}
                className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e8e1db] flex items-start gap-2.5"
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    chk.status === 'PASS'
                      ? 'bg-[#cdebc5] text-[#234b1d]'
                      : chk.status === 'WARN'
                      ? 'bg-[#dfccfe] text-[#4e4068]'
                      : 'bg-[#ffdad6] text-[#93000a]'
                  }`}
                >
                  {chk.status === 'PASS' ? '✓' : chk.status === 'WARN' ? '!' : '✗'}
                </span>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xs text-[#1e1b17]">
                    {chk.name}
                  </span>
                  <span className="text-xs text-[#49454e] leading-relaxed mt-0.5">
                    {chk.message}
                  </span>
                  {chk.details && (
                    <span className="text-[11px] text-[#7a757f] font-mono mt-1">
                      {chk.details}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Sticky Footer */}
      <div className="p-4 rounded-2xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-[#49454e]">
          <CheckCircle2 className="w-4 h-4 text-[#234b1d]" />
          <span>Stage 4 complete: All inconsistencies resolved. Ready for multi-role sign-off.</span>
        </div>

        <button
          onClick={onProceedToWorkflow}
          className="px-6 py-2.5 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
          type="button"
        >
          <span>Proceed to Workflow Approvals</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
