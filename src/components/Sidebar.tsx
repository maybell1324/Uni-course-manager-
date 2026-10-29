import React from 'react';
import {
  UploadCloud,
  FileText,
  Grid3X3,
  ShieldCheck,
  GitPullRequest,
  Download
} from 'lucide-react';

export type TabId = 'upload' | 'spec' | 'map' | 'checks' | 'workflow' | 'export';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  defectCount: number;
  regulationCycle: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  defectCount,
  regulationCycle
}) => {
  const navItems: { id: TabId; label: string; step: number; icon: React.ReactNode; badge?: number }[] = [
    { id: 'upload', label: '1. Upload Intake', step: 1, icon: <UploadCloud className="w-4 h-4" /> },
    { id: 'spec', label: '2. Corrected Spec', step: 2, icon: <FileText className="w-4 h-4" /> },
    { id: 'map', label: '3. CO-PO-PSO Map', step: 3, icon: <Grid3X3 className="w-4 h-4" /> },
    {
      id: 'checks',
      label: '4. Checks & Defects',
      step: 4,
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: defectCount > 0 ? defectCount : undefined
    },
    { id: 'workflow', label: '5. Workflow & Roles', step: 5, icon: <GitPullRequest className="w-4 h-4" /> },
    { id: 'export', label: '6. Exports & Dossier', step: 6, icon: <Download className="w-4 h-4" /> }
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-60 bg-[#faf2ec] border-r border-[#e8e1db] z-30 flex flex-col justify-between p-4 shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col gap-1">
        <div className="px-2 py-1 mb-2">
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#7a757f]">
            SpecForge Workflow
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer font-heading text-sm ${
                  isActive
                    ? 'bg-[#7a6899] text-[#fbf3ff] font-bold shadow-xs'
                    : 'text-[#49454e] hover:bg-[#eee7e1] hover:text-[#1e1b17]'
                }`}
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#e8e1db] text-[#49454e]'
                    }`}
                  >
                    {item.step}
                  </span>
                  <span className="flex items-center gap-2">{item.icon}</span>
                  <span className="truncate">{item.label.replace(/^\d\.\s*/, '')}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Regulation cycle badge */}
      <div className="p-3 rounded-xl bg-[#f4ede6] border border-[#e8e1db] flex flex-col gap-1">
        <span className="text-[11px] font-semibold text-[#7a757f] uppercase tracking-wider">
          University Curriculum
        </span>
        <span className="text-xs font-heading font-bold text-[#1e1b17]">
          {regulationCycle}
        </span>
        <span className="text-[10px] text-[#234b1d] font-semibold flex items-center gap-1 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#234b1d]" />
          Tier-1 NBA Compliant
        </span>
      </div>
    </aside>
  );
};
