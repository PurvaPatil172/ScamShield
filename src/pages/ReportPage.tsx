import React, { useState } from 'react';
import {
  FileText,
  ShieldAlert,
  PhoneCall,
  ExternalLink,
  Plus,
  Trash2,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Info,
} from 'lucide-react';
import { IncidentReport } from '../types';
import { Modal } from '../components/Modal';

interface ReportProps {
  reports: IncidentReport[];
  onAddReport: (report: IncidentReport) => void;
  onDeleteReport: (id: string) => void;
  showToast: (text: string, type?: 'success' | 'warning' | 'info') => void;
}

export const ReportPage: React.FC<ReportProps> = ({
  reports,
  onAddReport,
  onDeleteReport,
  showToast,
}) => {
  const [category, setCategory] = useState('Digital Arrest / Police Extortion');
  const [platform, setPlatform] = useState('WhatsApp');
  const [dateOfIncident, setDateOfIncident] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [shortDescription, setShortDescription] = useState('');
  const [moneyShared, setMoneyShared] = useState<'No' | 'Yes'>('No');
  const [amountLost, setAmountLost] = useState('');
  const [personalInfoShared, setPersonalInfoShared] = useState<'No' | 'Yes'>('No');
  const [infoSharedTypes, setInfoSharedTypes] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');

  // Modals
  const [selectedReportForView, setSelectedReportForView] = useState<IncidentReport | null>(null);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shortDescription.trim()) {
      showToast('Please provide a brief description of the incident.', 'warning');
      return;
    }

    const newReport: IncidentReport = {
      id: `rep-${Date.now()}`,
      timestamp: new Date().toISOString(),
      dateOfIncident,
      scamCategory: category,
      platform,
      shortDescription: shortDescription.trim(),
      moneyShared,
      amountLost: moneyShared === 'Yes' ? amountLost.trim() : undefined,
      personalInfoShared,
      infoSharedTypes:
        personalInfoShared === 'Yes' && infoSharedTypes.trim()
          ? infoSharedTypes.split(',').map((s) => s.trim())
          : undefined,
      evidenceNotes: evidenceNotes.trim() || undefined,
      status: 'Locally Documented',
    };

    onAddReport(newReport);
    showToast('Incident logged in your local documentation records.', 'success');

    // Reset form
    setShortDescription('');
    setMoneyShared('No');
    setAmountLost('');
    setPersonalInfoShared('No');
    setInfoSharedTypes('');
    setEvidenceNotes('');
  };

  const handleExportAll = () => {
    if (reports.length === 0) {
      showToast('No logged reports to export.', 'warning');
      return;
    }

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reports, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `scamshield-incident-reports-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Incident records downloaded as JSON.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
          <FileText className="w-4 h-4 text-[#EF4444]" />
          <span>Incident Documentation & Reporting Guidance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
          Document Incident & Official Reporting
        </h1>
        <p className="text-[#64748B] text-xs sm:text-sm mt-1">
          Preserve crucial incident details, timestamps, and financial loss amounts securely on your device for filing with cybercrime authorities.
        </p>
      </div>

      {/* Official Emergency Filing Notice */}
      <div className="p-6 rounded-3xl bg-red-50/80 border border-red-200 space-y-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-red-100 text-[#EF4444] border border-red-200 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-red-900 text-sm">Official Cybercrime Portals (India)</h3>
            <p className="text-xs text-red-950 leading-relaxed">
              ScamShield is an educational and documentation aid. If you lost funds or suspect identity theft, immediately register an official FIR with the Government of India through these direct channels:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-white border border-red-200 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-red-700 tracking-wider">Toll-Free Helpline</span>
              <div className="text-lg font-extrabold text-[#172033]">Dial 1930</div>
              <p className="text-[11px] text-[#64748B]">Immediate golden-hour bank account freezing</p>
            </div>
            <a
              href="tel:1930"
              className="px-3.5 py-2 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              Call 1930
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-red-200 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#047857] tracking-wider">Official Portal</span>
              <div className="text-sm font-bold text-[#172033] truncate">cybercrime.gov.in</div>
              <p className="text-[11px] text-[#64748B]">File official cyber fraud complaint</p>
            </div>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172033] text-xs font-bold border border-[#E5EAF1] transition-colors flex items-center gap-1"
            >
              <span>Visit Portal</span>
              <ExternalLink className="w-3 h-3 text-[#64748B]" />
            </a>
          </div>
        </div>
      </div>

      {/* Incident Documentation Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5EAF1] space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E5EAF1] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#172033]">Record Incident for Personal Documentation</h2>
            <p className="text-xs text-[#64748B]">All details are stored locally in your browser and never sent to external servers.</p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200">
            Local Private Storage
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label htmlFor="incident-category" className="block text-xs font-bold text-[#172033]">
                Scam Category:
              </label>
              <select
                id="incident-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50/60 border border-[#E5EAF1] text-[#172033] text-xs focus:outline-none focus:border-[#10B981]"
              >
                <option value="Digital Arrest / Police Extortion">Digital Arrest / Police Extortion</option>
                <option value="Bank KYC / Account Freeze">Bank KYC / Account Freeze</option>
                <option value="Telegram / Part-Time Job Scam">Telegram / Part-Time Job Scam</option>
                <option value="Parcel / Customs Delivery Fee">Parcel / Customs Delivery Fee</option>
                <option value="UPI QR Code Payment Trick">UPI QR Code Payment Trick</option>
                <option value="Friend/Family Emergency Spoof">Friend/Family Emergency Spoof</option>
                <option value="Electricity Bill Deactivation">Electricity Bill Deactivation</option>
                <option value="Other / Unclassified">Other / Unclassified</option>
              </select>
            </div>

            {/* Platform */}
            <div className="space-y-1.5">
              <label htmlFor="incident-platform" className="block text-xs font-bold text-[#172033]">
                Channel / Platform:
              </label>
              <select
                id="incident-platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50/60 border border-[#E5EAF1] text-[#172033] text-xs focus:outline-none focus:border-[#10B981]"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="SMS / Text">SMS / Text</option>
                <option value="Phone Call (Voice/Skype)">Phone Call (Voice/Skype)</option>
                <option value="Telegram">Telegram</option>
                <option value="Instagram / Facebook">Instagram / Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Email">Email</option>
                <option value="Web Portal">Web Portal</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label htmlFor="incident-date" className="block text-xs font-bold text-[#172033]">
                Date of Occurrence:
              </label>
              <input
                id="incident-date"
                type="date"
                value={dateOfIncident}
                onChange={(e) => setDateOfIncident(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50/60 border border-[#E5EAF1] text-[#172033] text-xs focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label htmlFor="incident-desc" className="block text-xs font-bold text-[#172033]">
              Brief Description of What Happened: <span className="text-[#EF4444]">*</span>
            </label>
            <textarea
              id="incident-desc"
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="e.g. Received a WhatsApp video call from someone claiming to be a CBI officer alleging a narcotics parcel in my name and demanding ₹20,000 bond."
              className="w-full px-4 py-3 rounded-xl bg-slate-50/60 border border-[#E5EAF1] text-[#172033] placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#10B981] leading-relaxed"
            />
          </div>

          {/* Financial Loss Toggle & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-[#E5EAF1]">
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-[#172033]">
                Was Money Transferred or Lost?
              </span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-[#172033] cursor-pointer">
                  <input
                    type="radio"
                    name="money"
                    checked={moneyShared === 'No'}
                    onChange={() => setMoneyShared('No')}
                    className="text-[#10B981]"
                  />
                  <span>No financial loss</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-red-700 font-bold cursor-pointer">
                  <input
                    type="radio"
                    name="money"
                    checked={moneyShared === 'Yes'}
                    onChange={() => setMoneyShared('Yes')}
                    className="text-[#EF4444]"
                  />
                  <span>Yes, money was sent</span>
                </label>
              </div>
            </div>

            {moneyShared === 'Yes' && (
              <div className="space-y-1.5">
                <label htmlFor="incident-amount" className="block text-xs font-bold text-red-700">
                  Approximate Amount Lost:
                </label>
                <input
                  id="incident-amount"
                  type="text"
                  value={amountLost}
                  onChange={(e) => setAmountLost(e.target.value)}
                  placeholder="e.g. ₹15,000 or $500"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-red-300 text-red-900 text-xs focus:outline-none focus:border-red-500"
                />
              </div>
            )}
          </div>

          {/* Personal Info Shared */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-[#E5EAF1]">
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-[#172033]">
                Were OTPs, Passwords, or IDs Disclosed?
              </span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-[#172033] cursor-pointer">
                  <input
                    type="radio"
                    name="info"
                    checked={personalInfoShared === 'No'}
                    onChange={() => setPersonalInfoShared('No')}
                    className="text-[#10B981]"
                  />
                  <span>No credentials shared</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-amber-800 font-bold cursor-pointer">
                  <input
                    type="radio"
                    name="info"
                    checked={personalInfoShared === 'Yes'}
                    onChange={() => setPersonalInfoShared('Yes')}
                    className="text-[#F59E0B]"
                  />
                  <span>Yes, credentials disclosed</span>
                </label>
              </div>
            </div>

            {personalInfoShared === 'Yes' && (
              <div className="space-y-1.5">
                <label htmlFor="incident-info-types" className="block text-xs font-bold text-amber-800">
                  What Information Was Shared?
                </label>
                <input
                  id="incident-info-types"
                  type="text"
                  value={infoSharedTypes}
                  onChange={(e) => setInfoSharedTypes(e.target.value)}
                  placeholder="e.g. Aadhaar copy, OTP, debit card number"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            )}
          </div>

          {/* Evidence Notes */}
          <div className="space-y-1.5">
            <label htmlFor="incident-evidence" className="block text-xs font-bold text-[#172033]">
              Evidence Notes & Sender Coordinates (Optional):
            </label>
            <input
              id="incident-evidence"
              type="text"
              value={evidenceNotes}
              onChange={(e) => setEvidenceNotes(e.target.value)}
              placeholder="e.g. Sender phone number +91-98XXX, UPI handle victim.pay@sbi, phishing URL: http://xyz..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50/60 border border-[#E5EAF1] text-[#172033] text-xs focus:outline-none focus:border-[#10B981]"
            />
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
            >
              Save Incident to Local Log
            </button>
          </div>
        </form>
      </div>

      {/* Saved Local Reports Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EAF1] space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-[#172033] text-base">Your Documented Incidents</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-[#172033] border border-[#E5EAF1] font-bold">
              {reports.length}
            </span>
          </div>

          {reports.length > 0 && (
            <button
              onClick={handleExportAll}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172033] border border-[#E5EAF1] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Export JSON</span>
            </button>
          )}
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-8 text-[#64748B] text-xs border border-dashed border-[#E5EAF1] rounded-2xl bg-slate-50/50">
            No incidents recorded yet. Use the form above to preserve timestamps and details if you encounter a scam attempt.
          </div>
        ) : (
          <div className="divide-y divide-[#E5EAF1]">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[#172033]">{rep.scamCategory}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-[#64748B] border border-[#E5EAF1]">
                      {rep.platform}
                    </span>
                    <span className="text-[#64748B]">{rep.dateOfIncident}</span>
                    {rep.moneyShared === 'Yes' && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 border border-red-200 font-bold">
                        Loss: {rep.amountLost || 'Yes'}
                      </span>
                    )}
                  </div>
                  <p className="text-[#64748B] line-clamp-1">{rep.shortDescription}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedReportForView(rep)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172033] border border-[#E5EAF1] transition-colors cursor-pointer"
                    title="View details"
                  >
                    <Eye className="w-4 h-4 text-[#64748B]" />
                  </button>
                  <button
                    onClick={() => setReportToDelete(rep.id)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-[#64748B] hover:text-[#EF4444] border border-[#E5EAF1] transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Report Detail Modal */}
      {selectedReportForView && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedReportForView(null)}
          title="Incident Record Details"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1]">
              <div>
                <span className="text-[#64748B] block uppercase font-bold text-[10px]">Category</span>
                <span className="font-bold text-[#172033]">{selectedReportForView.scamCategory}</span>
              </div>
              <div>
                <span className="text-[#64748B] block uppercase font-bold text-[10px]">Platform</span>
                <span className="font-semibold text-[#172033]">{selectedReportForView.platform}</span>
              </div>
              <div>
                <span className="text-[#64748B] block uppercase font-bold text-[10px]">Date of Incident</span>
                <span className="text-[#172033]">{selectedReportForView.dateOfIncident}</span>
              </div>
              <div>
                <span className="text-[#64748B] block uppercase font-bold text-[10px]">Financial Impact</span>
                <span className={selectedReportForView.moneyShared === 'Yes' ? 'text-[#EF4444] font-bold' : 'text-[#047857]'}>
                  {selectedReportForView.moneyShared === 'Yes' ? `Lost: ${selectedReportForView.amountLost}` : 'No funds lost'}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-[#64748B] uppercase text-[10px]">Description</span>
              <p className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1] text-[#172033] leading-relaxed">
                {selectedReportForView.shortDescription}
              </p>
            </div>

            {selectedReportForView.evidenceNotes && (
              <div className="space-y-1">
                <span className="font-bold text-[#64748B] uppercase text-[10px]">Evidence / Sender Coordinates</span>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-[#E5EAF1] text-[#172033] font-mono">
                  {selectedReportForView.evidenceNotes}
                </p>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
              <div className="font-bold text-red-800">Recommended Official Escalation:</div>
              <p>
                File this record with National Cybercrime Reporting Portal at <strong>cybercrime.gov.in</strong> or call <strong>1930</strong>.
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {reportToDelete && (
        <Modal
          isOpen={true}
          onClose={() => setReportToDelete(null)}
          title="Delete Incident Record"
          footer={
            <>
              <button
                onClick={() => setReportToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172033] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteReport(reportToDelete);
                  setReportToDelete(null);
                  showToast('Incident record deleted.', 'info');
                }}
                className="px-4 py-2 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </>
          }
        >
          <p className="text-[#172033] text-sm">
            Are you sure you want to permanently delete this logged incident from your browser storage?
          </p>
        </Modal>
      )}
    </div>
  );
};
