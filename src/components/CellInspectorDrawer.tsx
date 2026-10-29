import React, { useState, useEffect } from 'react';
import { CourseSpecification, Role, MatrixCell } from '../types';
import { PROGRAM_OUTCOMES, PROGRAM_SPECIFIC_OUTCOMES } from '../data/annexureA';
import {
  X,
  Sparkles,
  Check,
  AlertTriangle,
  BookOpen,
  Info,
  RotateCcw
} from 'lucide-react';

interface CellInspectorDrawerProps {
  coId: string;
  poKey: string;
  cell: MatrixCell;
  spec: CourseSpecification;
  currentRole: Role;
  onClose: () => void;
  onSaveCell: (coId: string, poKey: string, level: 0 | 1 | 2 | 3, reason: string) => Promise<void>;
}

export const CellInspectorDrawer: React.FC<CellInspectorDrawerProps> = ({
  coId,
  poKey,
  cell,
  spec,
  currentRole,
  onClose,
  onSaveCell
}) => {
  const [level, setLevel] = useState<0 | 1 | 2 | 3>(cell.level);
  const [reason, setReason] = useState<string>(cell.reason);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLevel(cell.level);
    setReason(cell.reason);
  }, [coId, poKey, cell]);

  const co = spec.courseOutcomes.find(c => c.id === coId);
  const po = PROGRAM_OUTCOMES.find(p => p.code === poKey) || PROGRAM_SPECIFIC_OUTCOMES.find(p => p.code === poKey);

  const canEdit = currentRole === 'Author' || currentRole === 'Reviewer';

  const handleSave = async () => {
    setIsSaving(true);
    await onSaveCell(coId, poKey, level, reason);
    setIsSaving(false);
  };

  const getWeightLabel = (lvl: number) => {
    switch (lvl) {
      case 3:
        return 'Level 3 — Substantial / High';
      case 2:
        return 'Level 2 — Moderate / Medium';
      case 1:
        return 'Level 1 — Slight / Low';
      default:
        return 'Level 0 — None (No direct mapping)';
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-white border-l border-[#e8e1db] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-[#e8e1db] flex items-start justify-between bg-[#faf8f5]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#61507f]" />
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Target Cell Inspector
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl text-[#1e1b17]">
            {coId} × {poKey}
          </h3>
          <span className="text-xs text-[#61507f] font-semibold">
            {co?.bloomsLevel} • {po?.title}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-[#eee7e1] text-[#7a757f] hover:text-[#1e1b17] transition-colors"
          type="button"
          aria-label="Close inspector"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-5 flex-1">
        {/* CO Context */}
        <div className="p-3.5 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex flex-col gap-1">
          <span className="text-[11px] font-heading font-bold text-[#61507f] uppercase tracking-wider">
            {coId} Outcome Statement ({co?.bloomsLevel})
          </span>
          <p className="text-xs text-[#1e1b17] leading-relaxed">
            &ldquo;{co?.statement}&rdquo;
          </p>
        </div>

        {/* PO Definition Block from Annexure A */}
        <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e8e1db] flex flex-col gap-1">
          <span className="text-[11px] font-heading font-bold text-[#1e1b17] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#61507f]" />
            Annexure A: {poKey} — {po?.title}
          </span>
          <p className="text-xs text-[#49454e] leading-relaxed italic">
            &ldquo;{po?.description}&rdquo;
          </p>
        </div>

        {/* Weight Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Assigned Correlation Weight
            </label>
            <span className="text-xs font-heading font-bold text-[#61507f]">
              {getWeightLabel(level)}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 p-1.5 bg-[#faf2ec] rounded-xl border border-[#e8e1db]">
            {([0, 1, 2, 3] as const).map(lvl => (
              <button
                key={lvl}
                disabled={!canEdit}
                onClick={() => setLevel(lvl)}
                className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer font-heading ${
                  level === lvl
                    ? 'bg-[#61507f] text-white shadow-xs font-bold'
                    : 'text-[#49454e] hover:bg-white'
                } ${!canEdit ? 'cursor-not-allowed opacity-75' : ''}`}
                type="button"
              >
                <div className="text-sm">{lvl === 0 ? '—' : lvl}</div>
                <div className="text-[10px] leading-none opacity-80">
                  {lvl === 0 ? 'None' : lvl === 1 ? 'Slight' : lvl === 2 ? 'Moderate' : 'Strong'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cell Rationale Explanation */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-[#7a757f] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#61507f]" />
              <span>Pedagogical Justification Reason</span>
            </label>
            <span className="text-[11px] font-semibold text-[#234b1d]">
              NBA Required
            </span>
          </div>

          <textarea
            disabled={!canEdit}
            value={reason}
            onChange={e => setReason(e.target.value)}
            rows={4}
            placeholder="Document why this course outcome maps to this program outcome with curriculum evidence..."
            className="w-full p-3 bg-[#faf8f5] border border-[#cbc4cf] focus:border-[#61507f] rounded-xl text-xs text-[#1e1b17] leading-relaxed focus:outline-none resize-none disabled:bg-[#f4ede6]"
          />
        </div>

        {/* Warning Callout if present */}
        {cell.warning && (
          <div className="p-3 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="font-heading font-bold">Accreditation Advisory</span>
              <span>{cell.warning}</span>
            </div>
          </div>
        )}

        {/* Role permission info */}
        {!canEdit && (
          <div className="p-3 rounded-xl bg-[#eee7e1] text-[#49454e] text-xs flex items-center gap-2">
            <Info className="w-4 h-4 text-[#7a757f] shrink-0" />
            <span>Read-only mode for role {currentRole}. Switch to Author or Reviewer to adjust mapping.</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-[#e8e1db] bg-[#faf8f5] flex flex-col gap-2">
        {canEdit && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            type="button"
          >
            <Check className="w-4 h-4" />
            <span>{isSaving ? 'Saving Rationale...' : 'Save Mapping Adjustment'}</span>
          </button>
        )}
        <button
          onClick={onClose}
          className="w-full py-2 rounded-full text-xs font-heading font-semibold text-[#7a757f] hover:bg-[#eee7e1] transition-colors"
          type="button"
        >
          Close Inspector
        </button>
      </div>
    </div>
  );
};
