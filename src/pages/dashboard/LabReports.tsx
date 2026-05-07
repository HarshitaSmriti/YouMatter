import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import type { LabReportSummary, FlaggedItem } from "@/types";

const LabReports = () => {
  const [reports, setReports] = useState<LabReportSummary[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;

    setUploading(true);
    const newReport: LabReportSummary = {
      id: Date.now().toString(),
      user_id: '',
      file_path: '',
      file_name: file.name,
      status: 'processing',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setReports(prev => [newReport, ...prev]);

    // Simulate analysis (replace with edge function + storage)
    setTimeout(() => {
      setReports(prev => prev.map(r =>
        r.id === newReport.id ? {
          ...r,
          status: 'completed' as const,
          summary: "Your basic metabolic panel looks generally healthy. A couple of values are slightly outside the typical range — see the flagged items below for plain-language explanations.",
          flagged_items: [
            { name: "Vitamin D", value: "18 ng/mL", reference_range: "30-100 ng/mL", status: "low" as const, explanation: "Your Vitamin D is below the recommended range. This is very common and can affect energy and mood. Consider talking to your doctor about supplementation." },
            { name: "Cholesterol (LDL)", value: "142 mg/dL", reference_range: "< 130 mg/dL", status: "high" as const, explanation: "Your LDL is slightly elevated. Small lifestyle changes like more fiber and regular exercise can help bring this down." },
          ],
          updated_at: new Date().toISOString(),
        } : r
      ));
    }, 3000);

    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const statusIcon = (item: FlaggedItem) => {
    if (item.status === 'high') return <AlertTriangle className="h-4 w-4 text-warm" />;
    if (item.status === 'low') return <AlertTriangle className="h-4 w-4 text-sky" />;
    return <CheckCircle className="h-4 w-4 text-success" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Lab Reports</h1>
          <p className="text-sm text-muted-foreground font-body">Understand your health in plain language 🩺</p>
        </div>
        <Button onClick={() => fileRef.current?.click()} disabled={uploading} size="sm">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload PDF
        </Button>
        <input ref={fileRef} type="file" accept=".pdf" onChange={handleUpload} className="hidden" />
      </div>

      {reports.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <FileText className="h-12 w-12 text-success-light mx-auto mb-4" />
          <h3 className="font-heading font-semibold mb-2">No lab reports yet</h3>
          <p className="text-sm text-muted-foreground font-body mb-4">Upload a PDF of your lab results and Aasha will explain them in simple terms.</p>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>Upload your first report</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map(r => (
            <div key={r.id} className="glass-card-strong rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-heading font-semibold text-sm">{r.file_name}</h3>
                  <p className="text-xs text-muted-foreground font-body">
                    {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                {r.status === 'processing' && (
                  <span className="ml-auto flex items-center gap-1 text-xs font-body text-primary">
                    <Loader2 className="h-3 w-3 animate-spin" /> Analyzing...
                  </span>
                )}
              </div>

              {r.status === 'completed' && (
                <>
                  <p className="text-sm text-muted-foreground font-body mb-4">{r.summary}</p>
                  {r.flagged_items && r.flagged_items.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-heading text-sm font-semibold">Flagged Items</h4>
                      {r.flagged_items.map((item, i) => (
                        <div key={i} className="bg-muted/50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-1">
                            {statusIcon(item)}
                            <span className="font-body font-semibold text-sm">{item.name}</span>
                            <span className={`text-xs font-body px-2 py-0.5 rounded-full ${
                              item.status === 'high' ? 'bg-warm-light text-warm' :
                              item.status === 'low' ? 'bg-sky-light text-sky' :
                              'bg-success-light text-success'
                            }`}>
                              {item.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground font-body">
                            Your value: <strong>{item.value}</strong> • Reference: {item.reference_range}
                          </p>
                          <p className="text-sm text-foreground font-body mt-2">{item.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabReports;
