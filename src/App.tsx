import React, { useState, useEffect } from 'react';
import { CourseSpecification, Role } from './types';
import { Header } from './components/Header';
import { Sidebar, TabId } from './components/Sidebar';
import { UploadTab } from './components/UploadTab';
import { SpecTab } from './components/SpecTab';
import { COPOMapTab } from './components/COPOMapTab';
import { ChecksTab } from './components/ChecksTab';
import { WorkflowTab } from './components/WorkflowTab';
import { ExportTab } from './components/ExportTab';
import { AISettingsModal } from './components/AISettingsModal';
import { UploadCloud, FileText } from 'lucide-react';

export default function App() {
  const [spec, setSpec] = useState<CourseSpecification | null>(null);
  const [currentRole, setCurrentRole] = useState<Role>('Author');
  const [activeTab, setActiveTab] = useState<TabId>('upload');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [modelName, setModelName] = useState('gemini-2.5-flash');
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if server already has an active uploaded session
  useEffect(() => {
    fetch('/api/session')
      .then(res => res.json())
      .then(data => {
        if (data.spec) {
          setSpec(data.spec);
        }
        if (data.role) {
          setCurrentRole(data.role);
        }
      })
      .catch(err => {
        console.warn('Backend not responding or no session yet:', err);
      });
  }, []);

  const handleRoleChange = async (newRole: Role) => {
    setCurrentRole(newRole);
    try {
      await fetch('/api/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
    } catch (err) {
      console.error('Role update error:', err);
    }
  };

  const handleGenerateCorrection = async () => {
    if (!spec) return;
    setIsProcessing(true);
    try {
      const res = await fetch('/api/generate-correction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customApiKey, modelName })
      });
      const data = await res.json();
      if (data.spec) {
        setSpec(data.spec);
      }
      setActiveTab('spec');
    } catch (err) {
      console.error('Correction generation failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = async () => {
    try {
      await fetch('/api/reset', { method: 'POST' });
      setSpec(null);
      setActiveTab('upload');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#1e1b17] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        workflowStatus={spec?.workflowStatus || 'Draft'}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Layout */}
      <div className="flex flex-1 pt-16">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={tab => {
            if (!spec && tab !== 'upload') {
              setActiveTab('upload');
            } else {
              setActiveTab(tab);
            }
          }}
          defectCount={spec ? spec.defects.filter(d => d.status !== 'Auto-Fixed').length : 0}
          regulationCycle={spec?.regulation || 'Awaiting Upload'}
        />

        {/* Center Content Stage */}
        <main className="flex-1 pl-60 p-6 md:p-8 overflow-y-auto">
          {/* Upload Tab (Always accessible) */}
          {activeTab === 'upload' && (
            <UploadTab
              spec={spec}
              onGenerateCorrection={handleGenerateCorrection}
              onProceedToSpec={() => setActiveTab('spec')}
              onUploadSuccess={parsed => {
                setSpec(parsed);
              }}
              isProcessing={isProcessing}
            />
          )}

          {/* If spec not loaded and user clicks other tabs, show friendly prompt */}
          {!spec && activeTab !== 'upload' && (
            <div className="max-w-xl mx-auto my-16 bg-white p-8 rounded-2xl border border-[#e8e1db] shadow-xs text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#faf2ec] text-[#61507f] flex items-center justify-center">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-xl text-[#1e1b17]">
                No Course Specification Loaded
              </h2>
              <p className="text-xs text-[#49454e] max-w-md leading-relaxed">
                Please upload your existing course specification (<code className="font-mono text-[11px] bg-[#faf2ec] px-1 py-0.5 rounded">.docx</code>) and examination blueprint (<code className="font-mono text-[11px] bg-[#faf2ec] px-1 py-0.5 rounded">.doc</code>) to populate the dossier.
              </p>
              <button
                onClick={() => setActiveTab('upload')}
                className="px-6 py-2.5 rounded-full bg-[#61507f] hover:bg-[#7a6899] text-white font-heading font-bold text-xs shadow-xs transition-all cursor-pointer"
                type="button"
              >
                Go to Upload Intake
              </button>
            </div>
          )}

          {/* Active Specification Tabs (Available once documents are uploaded) */}
          {spec && (
            <>
              {activeTab === 'spec' && (
                <SpecTab
                  spec={spec}
                  currentRole={currentRole}
                  onUpdateSpec={setSpec}
                  onProceedToMapping={() => setActiveTab('map')}
                />
              )}

              {activeTab === 'map' && (
                <COPOMapTab
                  spec={spec}
                  currentRole={currentRole}
                  onUpdateSpec={setSpec}
                  onProceedToChecks={() => setActiveTab('checks')}
                />
              )}

              {activeTab === 'checks' && (
                <ChecksTab
                  spec={spec}
                  currentRole={currentRole}
                  onUpdateSpec={setSpec}
                  onProceedToWorkflow={() => setActiveTab('workflow')}
                />
              )}

              {activeTab === 'workflow' && (
                <WorkflowTab
                  spec={spec}
                  currentRole={currentRole}
                  onRoleChange={handleRoleChange}
                  onUpdateSpec={setSpec}
                  onProceedToExport={() => setActiveTab('export')}
                />
              )}

              {activeTab === 'export' && (
                <ExportTab spec={spec} />
              )}
            </>
          )}
        </main>
      </div>

      {/* AI Settings Modal */}
      <AISettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={customApiKey}
        onSaveApiKey={setCustomApiKey}
        modelName={modelName}
        onSaveModelName={setModelName}
      />
    </div>
  );
}
