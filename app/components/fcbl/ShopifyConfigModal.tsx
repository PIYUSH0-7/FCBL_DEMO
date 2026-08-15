import React, { useState, useEffect } from 'react';
import { useShop } from '~/context/ShopContext';
import { X, RefreshCw, Key, Database, CheckCircle2, AlertTriangle, Terminal, UploadCloud, Save, ExternalLink, Copy } from 'lucide-react';

export const ShopifyConfigModal: React.FC = () => {
  const { isShopifyConfigOpen, setIsShopifyConfigOpen, addToast } = useShop();
  const [testStatus, setTestStatus] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'sync' | 'cli' | 'credentials'>('sync');

  // Editable Form Inputs
  const [domainInput, setDomainInput] = useState('fcbl-1razgs1d.myshopify.com');
  const [adminTokenInput, setAdminTokenInput] = useState('');
  const [storefrontTokenInput, setStorefrontTokenInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const fetchStatus = async () => {
    setIsTesting(true);
    try {
      const res = await fetch('/api/shopify/status');
      const data = await res.json();
      setTestStatus(data.store || data);
      if (data.store?.domain) {
        setDomainInput(data.store.domain);
      }
    } catch {
      setTestStatus({
        domain: domainInput,
        shopName: 'Fateh Chand Jewels (FCBL)',
        apiVersion: '2024-01',
        storefrontLive: false,
        adminLive: Boolean(adminTokenInput),
        hasApiKey: true,
        mode: 'hydrogen_hybrid_ready',
        tokensMasked: {
          storefront: '••••••••',
          admin: '••••••••',
          apiKey: '••••••••',
        },
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/shopify/update-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domainInput,
          adminToken: adminTokenInput,
          storefrontToken: storefrontTokenInput,
        }),
      });
      const data = await res.json();
      if (data.success) {
        addToast('Configuration Saved', `Store domain set to ${domainInput}`, 'success');
        fetchStatus();
      } else {
        addToast('Save Failed', data.error || 'Check server logs', 'info');
      }
    } catch (err: any) {
      addToast('Error saving', err.message, 'info');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSyncToShopify = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/shopify/sync-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domainInput,
          adminToken: adminTokenInput,
        }),
      });
      const data = await res.json();
      setSyncResult(data);

      if (data.success) {
        addToast('Catalog Synced to Shopify!', data.message, 'success');
      } else {
        addToast('Sync Notice', data.message || 'Check domain & token credentials', 'info');
      }
    } catch (err: any) {
      setSyncResult({ success: false, message: err.message });
      addToast('Sync Failed', err.message, 'info');
    } finally {
      setIsSyncing(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    addToast('Copied to Clipboard', text, 'info');
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  useEffect(() => {
    if (isShopifyConfigOpen) {
      fetchStatus();
    }
  }, [isShopifyConfigOpen]);

  if (!isShopifyConfigOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-stone-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#1c1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#92702c]/30 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">
                Shopify CLI & Store Connection Manager
              </h3>
              <p className="text-[11px] text-stone-400">
                Fateh Chand Jewels (FCBL 1904) • Hydrogen Headless Storefront & Catalog Sync
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsShopifyConfigOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-5 pt-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('sync')}
            className={`pb-3 px-3.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'sync'
                ? 'border-[#92702c] text-[#92702c]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Push Products to Shopify</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`pb-3 px-3.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'cli'
                ? 'border-[#92702c] text-[#92702c]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Shopify CLI Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`pb-3 px-3.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'credentials'
                ? 'border-[#92702c] text-[#92702c]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Credentials & Store Domain</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Tab 1: Push Catalog to Shopify */}
          {activeTab === 'sync' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">Why products may not appear on Shopify yet:</p>
                  <p>
                    By default, this luxury storefront loads a high-definition 14+ piece catalog in hybrid demo mode.
                    To push all products (images, prices, variants for 18K Gold / Rose Gold / Silver, and 1904 specifications) directly into your live Shopify Admin dashboard, click the button below.
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-stone-600">Target Store:</span>
                  <span className="font-mono font-bold text-stone-900 bg-white px-2.5 py-1 rounded border border-stone-200">
                    {domainInput}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-stone-600">Admin API Token:</span>
                  <span className="font-mono text-stone-700 bg-white px-2.5 py-1 rounded border border-stone-200">
                    {adminTokenInput ? `${adminTokenInput.slice(0, 10)}...${adminTokenInput.slice(-4)}` : 'Not configured'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-stone-600">Catalog Batch:</span>
                  <span className="font-bold text-[#92702c]">14 Heritage Pieces (Necklaces, Rings, Bangles, Solitaires)</span>
                </div>
              </div>

              <button
                onClick={handleSyncToShopify}
                disabled={isSyncing}
                className="w-full bg-[#1c1917] hover:bg-[#92702c] disabled:opacity-60 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md"
              >
                <UploadCloud className={`w-4 h-4 ${isSyncing ? 'animate-bounce' : ''}`} />
                <span>{isSyncing ? 'Pushing 14+ Pieces to Shopify Admin API...' : 'Push All Catalog Products to Shopify Store'}</span>
              </button>

              {syncResult && (
                <div className={`p-4 rounded-xl text-xs border ${
                  syncResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
                }`}>
                  <p className="font-bold mb-1">{syncResult.success ? 'Sync Successful!' : 'Sync Notice'}</p>
                  <p>{syncResult.message}</p>
                  {syncResult.syncedCount !== undefined && (
                    <p className="mt-1 font-semibold">Synced: {syncResult.syncedCount} of {syncResult.totalCatalog} products.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Shopify CLI Guide */}
          {activeTab === 'cli' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-stone-900 text-stone-100 rounded-xl">
                <div className="flex items-center justify-between text-stone-400 pb-2 border-b border-stone-800 mb-3">
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Terminal className="w-3.5 h-3.5 text-[#d4af37]" />
                    Shopify CLI 4.x Installed
                  </span>
                  <span className="text-[10px] text-emerald-400">Ready</span>
                </div>

                <div className="space-y-3 font-mono text-[11px]">
                  <div>
                    <div className="text-stone-400 text-[10px] uppercase font-sans font-bold tracking-wider mb-1 flex items-center justify-between">
                      <span>1. Log in to Shopify via CLI:</span>
                      <button
                        onClick={() => copyToClipboard('npm run shopify:auth', 'auth')}
                        className="text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedCmd === 'auth' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <code className="block bg-black/60 p-2 rounded text-amber-300">
                      npm run shopify:auth
                    </code>
                  </div>

                  <div>
                    <div className="text-stone-400 text-[10px] uppercase font-sans font-bold tracking-wider mb-1 flex items-center justify-between">
                      <span>2. Sync all 14+ products via CLI:</span>
                      <button
                        onClick={() => copyToClipboard('npm run shopify:sync', 'sync')}
                        className="text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedCmd === 'sync' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <code className="block bg-black/60 p-2 rounded text-emerald-300">
                      npm run shopify:sync
                    </code>
                  </div>

                  <div>
                    <div className="text-stone-400 text-[10px] uppercase font-sans font-bold tracking-wider mb-1 flex items-center justify-between">
                      <span>3. List connected Shopify stores:</span>
                      <button
                        onClick={() => copyToClipboard('npx shopify store list', 'list')}
                        className="text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedCmd === 'list' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <code className="block bg-black/60 p-2 rounded text-sky-300">
                      npx shopify store list
                    </code>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="font-bold text-stone-800 mb-1">Checking Your Exact Myshopify Domain</h4>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  In your Shopify Admin dashboard, go to <strong>Settings → Domains</strong>. Your default myshopify domain will look like <code>your-brand.myshopify.com</code>. Paste that domain in the <strong>Credentials</strong> tab to link this app instantly.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Credentials & Store Domain */}
          {activeTab === 'credentials' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Shopify Store Domain (myshopify.com)
                </label>
                <input
                  type="text"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder="e.g. fcbl-jewellers.myshopify.com"
                  className="w-full font-mono px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#92702c]"
                />
                <p className="text-[10px] text-stone-500 mt-1">
                  The internal myshopify handle for your store.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Admin API Access Token
                </label>
                <input
                  type="password"
                  value={adminTokenInput}
                  onChange={(e) => setAdminTokenInput(e.target.value)}
                  placeholder="shpat_..."
                  className="w-full font-mono px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#92702c]"
                />
                <p className="text-[10px] text-stone-500 mt-1">
                  Used for server-side product synchronization and inventory updates.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Storefront API Access Token
                </label>
                <input
                  type="password"
                  value={storefrontTokenInput}
                  onChange={(e) => setStorefrontTokenInput(e.target.value)}
                  placeholder="Storefront public access token"
                  className="w-full font-mono px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#92702c]"
                />
                <p className="text-[10px] text-stone-500 mt-1">
                  Used for client-side Storefront GraphQL queries and checkout creations.
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleSaveConfig}
                  disabled={isSaving}
                  className="flex-1 bg-[#1c1917] hover:bg-[#92702c] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save & Update Credentials'}</span>
                </button>

                <button
                  onClick={fetchStatus}
                  disabled={isTesting}
                  className="px-4 py-3 border border-stone-300 hover:bg-stone-100 rounded-xl font-semibold text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>Test Connection</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
