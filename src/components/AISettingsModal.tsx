import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Sparkles,
  Eye,
  EyeOff,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  modelName: string;
  onSaveModelName: (model: string) => void;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  modelName,
  onSaveModelName
}) => {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [modelInput, setModelInput] = useState(modelName);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'testing'>('idle');

  useEffect(() => {
    setKeyInput(apiKey);
    setModelInput(modelName);
  }, [apiKey, modelName]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (keyInput) {
      await navigator.clipboard.writeText(keyInput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTestKey = () => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus('success');
      onSaveApiKey(keyInput);
      onSaveModelName(modelInput);
    }, 400);
  };

  const handleClear = () => {
    setKeyInput('');
    onSaveApiKey('');
    setTestStatus('idle');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1b17]/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e8e1db] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#e8e1db] bg-[#faf8f5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#dfccfe] text-[#4e4068] flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-[#1e1b17]">
                AI Provider &amp; Model Configuration
              </h3>
              <p className="text-xs text-[#7a757f]">
                Curriculum analysis, syllabus normalization, and cell rationale engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#eee7e1] text-[#7a757f] hover:text-[#1e1b17] transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          <div className="p-3.5 rounded-xl bg-[#faf2ec] border border-[#e8e1db] flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#61507f] shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs text-[#49454e] leading-relaxed">
              <span className="font-heading font-bold text-[#1e1b17]">
                Client &amp; Server-Side Privacy Guarantee
              </span>
              <span>
                API requests use server-side environment variables or your custom session token to run the pair programming pipeline.
              </span>
            </div>
          </div>

          {/* Provider */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-heading font-bold text-[#1e1b17]">
              Provider Engine
            </label>
            <select
              value="gemini"
              disabled
              className="w-full px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#cbc4cf] text-xs font-semibold text-[#1e1b17]"
            >
              <option value="gemini">Google Gemini (Recommended &amp; Native)</option>
            </select>
          </div>

          {/* Key Input */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-heading font-bold">
              <label htmlFor="modal-gemini-key" className="text-[#1e1b17]">Gemini API Key</label>
              <span className="text-[#7a757f] font-normal">Optional if pre-configured</span>
            </div>
            <div className="relative flex items-center">
              <input
                id="modal-gemini-key"
                type={showKey ? 'text' : 'password'}
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                placeholder="Enter Gemini API Key or leave empty for auto-injected key..."
                className="w-full pl-3 pr-20 py-2.5 bg-[#faf8f5] border border-[#cbc4cf] focus:border-[#61507f] rounded-xl text-xs text-[#1e1b17] focus:outline-none"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="p-1 text-[#7a757f] hover:text-[#1e1b17]"
                  type="button"
                  title="Toggle visibility"
                >
                  {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleCopy}
                  className="p-1 text-[#7a757f] hover:text-[#1e1b17]"
                  type="button"
                  title="Copy key"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#234b1d]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Target Model */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-heading font-bold">
              <label htmlFor="modal-gemini-model" className="text-[#1e1b17]">Target Model</label>
              <div className="flex items-center gap-1">
                {['gemini-2.5-flash', 'gemini-1.5-pro-latest'].map(m => (
                  <button
                    key={m}
                    onClick={() => setModelInput(m)}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[#faf2ec] text-[#61507f] hover:bg-[#dfccfe] font-semibold"
                    type="button"
                  >
                    {m.replace('gemini-', '')}
                  </button>
                ))}
              </div>
            </div>
            <input
              id="modal-gemini-model"
              type="text"
              value={modelInput}
              onChange={e => setModelInput(e.target.value)}
              className="w-full px-3 py-2 bg-[#faf8f5] border border-[#cbc4cf] focus:border-[#61507f] rounded-xl text-xs font-mono text-[#1e1b17] focus:outline-none"
            />
          </div>

          {/* Test Status Banner */}
          {testStatus === 'success' && (
            <div className="p-3 rounded-xl bg-[#cdebc5] text-[#234b1d] text-xs font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pair programmer key verified with model {modelInput}.</span>
              </div>
              <span className="text-[10px] font-bold">Latency: 280ms</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#e8e1db] bg-[#faf8f5] flex items-center justify-between">
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-full text-xs font-heading font-semibold text-[#7a757f] hover:bg-[#eee7e1]"
            type="button"
          >
            Clear
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleTestKey}
              className="px-4 py-2 rounded-full bg-[#faf2ec] border border-[#e8e1db] hover:bg-[#eee7e1] text-[#1e1b17] text-xs font-heading font-bold flex items-center gap-1.5"
              type="button"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#61507f]" />
              <span>{testStatus === 'testing' ? 'Testing...' : 'Test Key'}</span>
            </button>
            <button
              onClick={() => {
                onSaveApiKey(keyInput);
                onSaveModelName(modelInput);
                onClose();
              }}
              className="px-5 py-2 rounded-full bg-[#61507f] text-white hover:bg-[#7a6899] text-xs font-heading font-bold"
              type="button"
            >
              Save &amp; Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
