import React from 'react';
import { Role, WorkflowStatus } from '../types';
import { Settings, User, CheckCircle2, AlertCircle, Clock, Check } from 'lucide-react';

interface HeaderProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  workflowStatus: WorkflowStatus;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  workflowStatus,
  onOpenSettings
}) => {
  const getStatusBadge = () => {
    switch (workflowStatus) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cdebc5] text-[#234b1d] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#234b1d]" />
            Approved by HOD
          </span>
        );
      case 'Pending HOD':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfccfe] text-[#4e4068] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#665781]" />
            Pending HOD Approval
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfccfe] text-[#4e4068] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#665781] animate-pulse" />
            Under Committee Review
          </span>
        );
      case 'Returned':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
            Returned for Corrections
          </span>
        );
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8e1db] text-[#1e1b17] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7a757f]" />
            Submitted by Author
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eee7e1] text-[#49454e] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7a757f]" />
            Drafting Phase
          </span>
        );
    }
  };

  const getUserDetails = () => {
    switch (currentRole) {
      case 'Author':
        return { name: 'Prof. Aris Thorne', dept: 'Author • Dept of CS & AI' };
      case 'Reviewer':
        return { name: 'Dr. Rebecca Chen', dept: 'Reviewer • Curriculum Board' };
      case 'HOD':
        return { name: 'Prof. Marcus Vance', dept: 'HOD • Dean of Academics' };
    }
  };

  const user = getUserDetails();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#fff8f3]/95 backdrop-blur-md z-40 border-b border-[#e8e1db] px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#61507f] text-white flex items-center justify-center font-bold text-lg shadow-sm">
          SF
        </div>
        <div className="flex flex-col">
          <span className="font-heading font-bold text-[#61507f] text-lg tracking-tight leading-tight">
            SpecForge
          </span>
          <span className="text-xs text-[#7a757f] leading-none hidden sm:inline">
            University Course Specification Assistant
          </span>
        </div>
      </div>

      {/* Role Persona Switcher & Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center p-1 bg-[#eee7e1] rounded-full border border-[#cbc4cf]/50">
          {(['Author', 'Reviewer', 'HOD'] as Role[]).map(role => (
            <button
              key={role}
              onClick={() => onRoleChange(role)}
              className={`px-3 py-1 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                currentRole === role
                  ? 'bg-[#61507f] text-white shadow-xs'
                  : 'text-[#49454e] hover:text-[#1e1b17] hover:bg-[#e8e1db]'
              }`}
              type="button"
            >
              {role}
            </button>
          ))}
        </div>
        <div className="hidden md:block">{getStatusBadge()}</div>
      </div>

      {/* AI Key Status & User Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ede6] border border-[#e8e1db] text-xs font-semibold text-[#1e1b17]">
          <span className="w-2 h-2 rounded-full bg-[#234b1d] animate-pulse" />
          <span>AI Pair: Ready</span>
        </div>

        <button
          onClick={onOpenSettings}
          className="p-2 rounded-full hover:bg-[#eee7e1] text-[#49454e] hover:text-[#1e1b17] transition-colors cursor-pointer"
          title="AI Provider & Key Settings"
          type="button"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-[#e8e1db]">
          <div className="flex flex-col text-right hidden lg:flex">
            <span className="text-xs font-heading font-bold text-[#1e1b17] leading-tight">
              {user.name}
            </span>
            <span className="text-[11px] text-[#7a757f] leading-none">
              {user.dept}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#dfccfe] text-[#4e4068] flex items-center justify-center font-bold text-xs shadow-xs">
            {currentRole === 'Author' ? 'AT' : currentRole === 'Reviewer' ? 'RC' : 'MV'}
          </div>
        </div>
      </div>
    </header>
  );
};
