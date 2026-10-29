import React, { useState } from 'react';
import { CourseSpecification, Role, MatrixCell } from '../types';
import { PROGRAM_OUTCOMES, PROGRAM_SPECIFIC_OUTCOMES } from '../data/annexureA';
import { CellInspectorDrawer } from './CellInspectorDrawer';
import {
  Grid3X3,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Layers
} from 'lucide-react';

interface COPOMapTabProps {
  spec: CourseSpecification;
  currentRole: Role;
  onUpdateSpec: (updated: CourseSpecification) => void;
  onProceedToChecks: () => void;
}

export const COPOMapTab: React.FC<COPOMapTabProps> = ({
  spec,
  currentRole,
  onUpdateSpec,
  onProceedToChecks
}) => {
  const [selectedCell, setSelectedCell] = useState<{ coId: string; poKey: string } | null>({
    coId: 'CO3',
    poKey: 'PO2'
  });

  const columns: { key: string; title: string; desc: string; isPso?: boolean }[] = [
    ...PROGRAM_OUTCOMES.map(p => ({ key: p.code, title: p.code, desc: p.title, isPso: false })),
    ...PROGRAM_SPECIFIC_OUTCOMES.map(p => ({ key: p.code, title: p.code, desc: p.title, isPso: true }))
  ];

  const handleCellClick = (coId: string, poKey: string) => {
    setSelectedCell({ coId, poKey });
  };

  const handleSaveCell = async (coId: string, poKey: string, level: 0 | 1 | 2 | 3, reason: string) => {
    try {
      const res = await fetch('/api/matrix/cell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coId, poKey, level, reason })
      });
      const data = await res.json();
      if (data.success) {
        const updatedMatrix = {
          ...spec.copoMap,
          [coId]: {
            ...spec.copoMap[coId],
            [poKey]: data.cell
          }
        };
        onUpdateSpec({
          ...spec,
          copoMap: updatedMatrix,
          copoAverages: data.averages
        });
      }
    } catch (err) {
      console.error('Failed to save matrix cell:', err);
    }
  };

  const getCellDisplay = (coId: string, colKey: string) => {
    const cell: MatrixCell | undefined = spec.copoMap[coId]?.[colKey];
    const lvl = cell ? cell.level : 0;
    const isSelected = selectedCell?.coId === coId && selectedCell?.poKey === colKey;

    let bgStyle = 'bg-transparent text-[#7a757f] hover:bg-[#faf2ec]';
    if (lvl === 3) {
      bgStyle = 'bg-[#7a6899] text-[#fbf3ff] font-bold shadow-xs';
    } else if (lvl === 2) {
      bgStyle = 'bg-[#dfccfe] text-[#4e4068] font-bold';
    } else if (lvl === 1) {
      bgStyle = 'bg-[#ebdcff] text-[#22123e] font-semibold';
    }

    if (cell?.warning) {
      bgStyle = 'bg-[#ffdad9] text-[#744e4f] font-bold ring-2 ring-[#ba1a1a]';
    }

    return (
      <button
        onClick={() => handleCellClick(coId, colKey)}
        className={`w-8 h-8 rounded-lg text-xs transition-all flex items-center justify-center cursor-pointer relative ${bgStyle} ${
          isSelected ? 'ring-2 ring-[#1e1b17] scale-110 shadow-sm z-10' : ''
        }`}
        type="button"
        title={`${coId} × ${colKey}: ${cell?.reason || 'Click to inspect reason'}`}
      >
        <span>{lvl === 0 ? '—' : lvl}</span>
        {cell?.warning && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ba1a1a]" />
        )}
      </button>
    );
  };

  const currentInspectorCell = selectedCell
    ? spec.copoMap[selectedCell.coId]?.[selectedCell.poKey] || {
        level: 0,
        reason: 'No correlation rationale documented yet.'
      }
    : null;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 pb-20 relative">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Curriculum Alignment Matrix
            </span>
            <span className="w-1 h-1 rounded-full bg-[#7a757f]" />
            <span className="text-xs font-heading font-bold text-[#61507f]">
              {spec.courseCode}: {spec.courseTitle}
            </span>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-[#1e1b17]">
            CO-PO-PSO Attainment Map &amp; Cell Rationale
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={onProceedToChecks}
            className="px-5 py-2.5 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            type="button"
          >
            <span>Proceed to Step 4: Checks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legend & NBA Notice Bar */}
      <div className="w-full bg-white rounded-2xl p-4 border border-[#e8e1db] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-heading font-bold uppercase tracking-wider text-[#7a757f] mr-1">
            Mapping Scale:
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7a6899] text-white font-semibold">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>3 Substantial</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfccfe] text-[#4e4068] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#665781]" />
            <span>2 Moderate</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebdcff] text-[#22123e] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#61507f]" />
            <span>1 Slight</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf2ec] text-[#7a757f] font-semibold border border-[#e8e1db]">
            <span>— None</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#faf8f5] px-4 py-1.5 rounded-full border border-[#e8e1db] text-xs">
          <span className="w-2 h-2 rounded-full bg-[#234b1d] animate-pulse" />
          <span className="font-heading font-bold text-[#234b1d]">NBA Criterion 3.1:</span>
          <span className="text-[#49454e]">100% of cells carry verified pedagogical rationale</span>
        </div>
      </div>

      {/* Matrix Card */}
      <div className="bg-white rounded-2xl border border-[#e8e1db] shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-[#faf2ec] border-b border-[#e8e1db] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-[#61507f]" />
            <h3 className="font-heading font-bold text-sm text-[#1e1b17]">
              Curriculum Attainment Grid (Annexure A Compliant)
            </h3>
          </div>
          <span className="text-xs text-[#7a757f]">
            Click any cell to inspect or edit the pedagogical rationale
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#faf8f5] text-[#49454e] text-xs font-heading font-bold uppercase tracking-wider border-b border-[#e8e1db]">
                <th className="py-3 px-4 text-left min-w-[70px] sticky left-0 bg-[#faf8f5] z-20">
                  CO ID
                </th>
                <th className="py-3 px-3 text-left min-w-[110px]">
                  Bloom&apos;s
                </th>
                {columns.map(col => (
                  <th
                    key={col.key}
                    className={`py-3 px-2 ${col.isPso ? 'bg-[#faf2ec] font-bold text-[#61507f]' : ''}`}
                    title={col.desc}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e1db] text-xs">
              {spec.courseOutcomes.map(co => (
                <tr key={co.id} className="hover:bg-[#faf8f5] transition-colors group">
                  <td className="py-3 px-4 text-left font-heading font-bold text-[#61507f] sticky left-0 bg-white group-hover:bg-[#faf8f5] z-10">
                    {co.id}
                  </td>
                  <td className="py-3 px-3 text-left whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#faf2ec] text-[#49454e] text-[11px] font-bold">
                      {co.bloomsLevel.split(' ')[0]} {co.actionVerb}
                    </span>
                  </td>
                  {columns.map(col => (
                    <td key={col.key} className={`p-1.5 ${col.isPso ? 'bg-[#faf2ec]/50' : ''}`}>
                      {getCellDisplay(co.id, col.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {/* Average Attainment Row */}
            <tfoot>
              <tr className="bg-[#eee7e1] text-xs font-heading font-bold text-[#1e1b17] border-t-2 border-[#cbc4cf]">
                <td className="py-3 px-4 text-left text-[#61507f] sticky left-0 bg-[#eee7e1] z-20">
                  Avg. Attainment
                </td>
                <td className="py-3 px-3 text-left text-[11px] text-[#7a757f]">
                  Target &ge; 1.5
                </td>
                {columns.map(col => {
                  const avg = spec.copoAverages[col.key] || 0;
                  return (
                    <td
                      key={col.key}
                      className={`py-3 px-1.5 ${
                        avg >= 2.0
                          ? 'text-[#234b1d] font-bold'
                          : avg > 0
                          ? 'text-[#61507f]'
                          : 'text-[#7a757f]'
                      }`}
                    >
                      {avg > 0 ? avg.toFixed(1) : '—'}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footnote bar */}
        <div className="px-5 py-2.5 bg-[#faf8f5] border-t border-[#e8e1db] flex items-center justify-between text-xs text-[#7a757f]">
          <span>Scale: 3 = Substantial (High), 2 = Moderate (Medium), 1 = Slight (Low). Old inaccurate map replaced with Annexure A aligned values.</span>
          <span className="text-[#234b1d] font-semibold">15 of 15 Vectors Documented</span>
        </div>
      </div>

      {/* Bento Visualizer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#e8e1db] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Core Engineering Density
            </span>
            <Layers className="w-4 h-4 text-[#61507f]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-bold text-3xl text-[#61507f]">
              84%
            </span>
            <span className="text-xs text-[#49454e]">Substantial Coverage</span>
          </div>
          <p className="text-xs text-[#7a757f] mt-1">
            PO1 to PO5 account for heavy technical alignment across all Course Outcomes.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#e8e1db] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Attainment Vector Average
            </span>
            <TrendingUp className="w-4 h-4 text-[#234b1d]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-bold text-3xl text-[#234b1d]">
              2.42
            </span>
            <span className="text-xs text-[#234b1d] font-semibold">Target &ge; 1.5 Met</span>
          </div>
          <p className="text-xs text-[#7a757f] mt-1">
            Program Specific Outcomes (PSO1-3) score 2.8 average for industry alignment.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#e8e1db] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
              Audit Readiness
            </span>
            <ShieldCheck className="w-4 h-4 text-[#61507f]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-bold text-3xl text-[#1e1b17]">
              5 / 5
            </span>
            <span className="text-xs text-[#234b1d] font-bold">COs Rationalized</span>
          </div>
          <p className="text-xs text-[#7a757f] mt-1">
            Every cell carries verified reasoning explaining why it maps to that Program Outcome.
          </p>
        </div>
      </div>

      {/* Selected Cell Inspector Drawer */}
      {selectedCell && currentInspectorCell && (
        <CellInspectorDrawer
          coId={selectedCell.coId}
          poKey={selectedCell.poKey}
          cell={currentInspectorCell}
          spec={spec}
          currentRole={currentRole}
          onClose={() => setSelectedCell(null)}
          onSaveCell={handleSaveCell}
        />
      )}
    </div>
  );
};
