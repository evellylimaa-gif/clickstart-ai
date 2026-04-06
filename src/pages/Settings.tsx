import { useState, useEffect } from "react";
import { Save, Key, Eye, EyeOff, CheckCircle } from "lucide-react";

const STORAGE_KEY = "anthropic_api_key";

export function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setApiKey(stored);
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem(STORAGE_KEY, apiKey.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg font-bold text-foreground">Configurações</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Gerencie suas chaves de API e preferências</p>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* API Keys Section */}
          <div className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">API Keys</h2>
                <p className="text-xs text-muted-foreground">Configure suas chaves de acesso</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Anthropic API Key
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-ant-api03-..."
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm shrink-0"
                    style={{ backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                  >
                    {saved ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Salvo!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Salvar
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed bg-accent/50 rounded-xl px-4 py-3 border border-primary/5">
                💡 <strong>Alternativa:</strong> defina <code className="bg-muted px-1.5 py-0.5 rounded text-[11px]">VITE_ANTHROPIC_API_KEY</code> como build secret nas configurações do workspace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
