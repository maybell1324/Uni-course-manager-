import React, { useState } from 'react';
import { CourseSpecification, Role } from '../types';
import {
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Send,
  MessageSquare,
  Lock,
  UserCheck
} from 'lucide-react';

interface WorkflowTabProps {
  spec: CourseSpecification;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  onUpdateSpec: (updated: CourseSpecification) => void;
  onProceedToExport: () => void;
}

export const WorkflowTab: React.FC<WorkflowTabProps> = ({
  spec,
  currentRole,
  onRoleChange,
  onUpdateSpec,
  onProceedToExport
}) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const handleAction = async (action: string) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const res = await fetch('/api/workflow/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: currentRole,
          action,
          comment: commentText
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Server rejected workflow action');
      }

      onUpdateSpec(data.spec);
      setServerSuccess(`Action '${action}' executed successfully by ${currentRole}. Status is now '${data.workflowStatus}'.`);
      setCommentText('');
    } catch (err: any) {
      setServerError(err.message || 'Workflow request failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepStatus = (stepName: string) => {
    const statuses = ['Draft', 'Submitted', 'Under Review', 'Pending HOD', 'Approved'];
    const currentIndex = statuses.indexOf(spec.workflowStatus);
    const stepIndex = statuses.indexOf(stepName);

    if (spec.workflowStatus === 'Returned') {
      if (stepName === 'Draft' || stepName === 'Submitted') return 'completed';
      if (stepName === 'Under Review') return 'returned';
      return 'upcoming';
    }

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-20">
      {/* Top Banner & Stepper */}
      <section className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#7a757f]">
                Governance &amp; Approvals
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#61507f]" />
              <span className="text-xs font-heading font-bold text-[#61507f]">
                {spec.courseCode}: {spec.courseTitle}
              </span>
            </div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-[#1e1b17]">
              Multi-Role Curricular Sign-off
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-[#faf8f5] px-4 py-2 rounded-full border border-[#e8e1db] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#61507f] animate-pulse" />
            <span className="font-heading font-bold text-[#1e1b17]">Server-Enforced Role Security:</span>
            <span className="text-[#49454e]">Only verified personas can submit, return, or ratify</span>
          </div>
        </div>

        {/* 5-Step Progression Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {[
            { id: 'Draft', label: '1. Draft', subtitle: 'Import & Cleanse' },
            { id: 'Submitted', label: '2. Submitted', subtitle: 'Author Sign-off' },
            { id: 'Under Review', label: '3. Under Review', subtitle: 'Committee Audit' },
            { id: 'Pending HOD', label: '4. Pending HOD', subtitle: 'Dept Endorsement' },
            { id: 'Approved', label: '5. Approved', subtitle: 'Senate Ratified' }
          ].map(s => {
            const state = getStepStatus(s.id);
            let pillStyle = 'bg-[#faf2ec] text-[#7a757f] border-[#e8e1db]';
            if (state === 'active') {
              pillStyle = 'bg-[#dfccfe] text-[#4e4068] border-[#61507f] ring-2 ring-[#61507f] shadow-xs';
            } else if (state === 'completed') {
              pillStyle = 'bg-[#cdebc5] text-[#234b1d] border-[#cdebc5] font-bold';
            } else if (state === 'returned') {
              pillStyle = 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]';
            }

            return (
              <div
                key={s.id}
                className={`p-3 rounded-xl border flex flex-col justify-between gap-1 transition-all ${pillStyle}`}
              >
                <div className="flex items-center justify-between text-[11px] font-heading font-bold">
                  <span>{s.label}</span>
                  {state === 'completed' && <span>✓</span>}
                  {state === 'active' && <span className="w-2 h-2 rounded-full bg-[#61507f] animate-ping" />}
                  {state === 'returned' && <span>!</span>}
                </div>
                <span className="text-[10px] opacity-80">{s.subtitle}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Two-Column Workflow Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Role Action Terminal (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Persona Selection Header */}
          <div className="bg-white rounded-2xl p-4 border border-[#e8e1db] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#dfccfe] text-[#4e4068] flex items-center justify-center font-bold">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
                  Active Persona
                </span>
                <span className="font-heading font-bold text-sm text-[#1e1b17]">
                  {currentRole === 'Author'
                    ? 'Prof. Aris Thorne (Course Author)'
                    : currentRole === 'Reviewer'
                    ? 'Dr. Rebecca Chen (Curriculum Reviewer)'
                    : 'Prof. Marcus Vance (Head of Department)'}
                </span>
              </div>
            </div>

            <div className="flex items-center p-1 bg-[#faf2ec] rounded-full border border-[#e8e1db]">
              {(['Author', 'Reviewer', 'HOD'] as Role[]).map(role => (
                <button
                  key={role}
                  onClick={() => onRoleChange(role)}
                  className={`px-3 py-1 rounded-full text-xs font-heading font-bold transition-all cursor-pointer ${
                    currentRole === role
                      ? 'bg-[#61507f] text-white shadow-xs'
                      : 'text-[#49454e] hover:text-[#1e1b17]'
                  }`}
                  type="button"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Action Console Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#61507f]" />
                <h3 className="font-heading font-bold text-base text-[#1e1b17]">
                  {currentRole === 'Author'
                    ? 'Author Submission Console'
                    : currentRole === 'Reviewer'
                    ? 'Reviewer Assessment & Decision'
                    : 'HOD Executive Approval'}
                </h3>
              </div>
              <span className="text-xs font-heading font-semibold px-2.5 py-0.5 rounded-full bg-[#faf2ec] text-[#61507f] border border-[#e8e1db]">
                Role: {currentRole}
              </span>
            </div>

            <p className="text-xs text-[#49454e] leading-relaxed">
              {currentRole === 'Author'
                ? 'As Course Author, verify all outcomes, contact hours, and credit balances. When satisfied, submit the dossier for curriculum committee audit.'
                : currentRole === 'Reviewer'
                ? 'Evaluate Bloom’s taxonomy action verbs and contact hour additions. You may either return the document with mandatory feedback annotations or forward it to the HOD.'
                : 'As Head of Department, review verified academic metrics. Your approval seals the specification, clears the DRAFT watermark, and authorizes official university catalog publishing.'}
            </p>

            {/* Comment / Feedback Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-heading font-bold text-[#1e1b17]">
                  {currentRole === 'Reviewer'
                    ? 'Reviewer Notes & Revision Requirements'
                    : currentRole === 'HOD'
                    ? 'HOD Institutional Remarks'
                    : 'Author Submission Notes'}
                </label>
                <span className="text-[11px] text-[#7a757f]">
                  {currentRole === 'Reviewer' ? 'Required if returning' : 'Optional'}
                </span>
              </div>
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                rows={3}
                placeholder={
                  currentRole === 'Reviewer'
                    ? 'Specify required changes if returning, or endorsement notes for HOD...'
                    : 'Enter official sign-off or handover comments...'
                }
                className="w-full p-3 bg-[#faf8f5] border border-[#cbc4cf] focus:border-[#61507f] rounded-xl text-xs text-[#1e1b17] focus:outline-none resize-none"
              />
            </div>

            {/* Action Buttons based on Role */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {currentRole === 'Author' && (
                <button
                  onClick={() => handleAction('submit')}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-5 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  type="button"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Specification for Review</span>
                </button>
              )}

              {currentRole === 'Reviewer' && (
                <>
                  <button
                    onClick={() => handleAction('forward')}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-5 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    type="button"
                  >
                    <span>Forward to HOD for Approval</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction('return')}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-5 rounded-full bg-[#ffdad6] hover:bg-[#ffdad6]/80 text-[#93000a] font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    type="button"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Return with Comment</span>
                  </button>
                </>
              )}

              {currentRole === 'HOD' && (
                <>
                  <button
                    onClick={() => handleAction('approve')}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-5 rounded-full bg-[#234b1d] hover:bg-[#2d6a4f] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    type="button"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve &amp; Ratify Specification</span>
                  </button>
                  <button
                    onClick={() => handleAction('return')}
                    disabled={isSubmitting}
                    className="py-3 px-5 rounded-full bg-[#ffdad6] text-[#93000a] font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    type="button"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Return to Committee</span>
                  </button>
                </>
              )}
            </div>

            {/* Server Feedback Toasts */}
            {serverError && (
              <div className="p-3.5 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs font-semibold flex items-center gap-2 border border-[#ba1a1a]/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}
            {serverSuccess && (
              <div className="p-3.5 rounded-xl bg-[#cdebc5] text-[#234b1d] text-xs font-semibold flex items-center gap-2 border border-[#234b1d]/20">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{serverSuccess}</span>
              </div>
            )}

            {/* Server-Enforced Governance Rules Callout */}
            <div className="mt-2 pt-4 border-t border-[#f4ede6] flex flex-col gap-2">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#7a757f]" />
                Server Permission Invariants
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#49454e]">
                <div className="p-2 rounded-lg bg-[#faf2ec] border border-[#e8e1db]">
                  <strong className="text-[#1e1b17] block">Author:</strong>
                  Edit &amp; Submit only. Cannot forward or approve.
                </div>
                <div className="p-2 rounded-lg bg-[#faf2ec] border border-[#e8e1db]">
                  <strong className="text-[#1e1b17] block">Reviewer:</strong>
                  Comment, Return, or Forward. Cannot approve.
                </div>
                <div className="p-2 rounded-lg bg-[#faf2ec] border border-[#e8e1db]">
                  <strong className="text-[#1e1b17] block">HOD:</strong>
                  Final Institutional Approval. Removes DRAFT watermark.
                </div>
                <div className="p-2 rounded-lg bg-[#faf2ec] border border-[#e8e1db]">
                  <strong className="text-[#1e1b17] block">Return Policy:</strong>
                  Reviewer return requires non-empty feedback comment.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Audit History Stream (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-6 border border-[#e8e1db] shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e1db] mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#61507f]" />
                <h3 className="font-heading font-bold text-sm text-[#1e1b17]">
                  Specification Audit Log
                </h3>
              </div>
              <span className="text-xs font-heading font-bold px-2 py-0.5 rounded-full bg-[#faf2ec] text-[#49454e]">
                {spec.history.length} Events
              </span>
            </div>

            {/* Vertical Stream */}
            <div className="flex flex-col gap-5 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e8e1db]">
              {spec.history.map((record, index) => (
                <div key={record.id || index} className="relative flex flex-col gap-1">
                  <div
                    className={`absolute -left-[19px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                      record.status === 'Approved'
                        ? 'bg-[#234b1d]'
                        : record.status === 'Returned'
                        ? 'bg-[#ba1a1a]'
                        : 'bg-[#61507f]'
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-heading font-bold text-[#1e1b17]">
                      {record.action}
                    </span>
                    <span className="text-[10px] text-[#7a757f]">
                      {record.timestamp}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#61507f] font-semibold">
                    {record.user} • {record.userRoleTitle}
                  </div>
                  {record.comment && (
                    <p className="text-xs text-[#49454e] bg-[#faf2ec] p-2 rounded-lg border border-[#e8e1db] mt-1 leading-relaxed">
                      &ldquo;{record.comment}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Footer */}
      <div className="p-4 rounded-2xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-[#49454e]">
          <CheckCircle2 className="w-4 h-4 text-[#234b1d]" />
          <span>Workflow configured. Proceed to exports to view PDF with watermark status and specforge_output.json.</span>
        </div>

        <button
          onClick={onProceedToExport}
          className="px-6 py-2.5 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
          type="button"
        >
          <span>Proceed to Final Exports</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
