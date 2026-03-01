import { useEffect, useState } from 'react';
import HistoryPanel from './components/HistoryPanel';
import ProfilePanel from './components/ProfilePanel';
import RecruiterForm from './components/RecruiterForm';
import TailoredView from './components/TailoredView';
import { API_URL, fetchHistory, fetchSharedResult, tailorPortfolio } from './api';
import { BASE_PORTFOLIO } from './data';
import type { HistoryItem, RecruiterInput, TailoredPortfolio } from './types';

function exportToPdf(result: TailoredPortfolio) {
  const popup = window.open('', '_blank', 'width=960,height=720');
  if (!popup) {
    return;
  }

  const html = `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${result.headline}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 28px; color: #111; line-height: 1.45; }
    h1,h2,h3 { margin: 0 0 10px; }
    ul { margin-top: 6px; }
    .section { margin-top: 18px; }
    .project { border: 1px solid #ddd; border-radius: 10px; padding: 12px; margin-bottom: 10px; }
    .meta { color: #666; font-size: 12px; margin-top: 14px; }
  </style>
</head>
<body>
  <h1>${result.headline}</h1>
  <p>${result.tailoredSummary}</p>
  <div class="section">
    <h3>Why I fit this role</h3>
    <ul>${result.whyFit.map((point) => `<li>${point}</li>`).join('')}</ul>
  </div>
  <div class="section">
    <h3>Selected projects</h3>
    ${result.selectedProjects
      .map(
        (project) => `<div class="project">
          <strong>${project.name}</strong>
          <p>${project.angle}</p>
          <p><b>Impact:</b> ${project.impact}</p>
          <p>${project.tech.join(' • ')}</p>
          <p>${project.link}</p>
        </div>`
      )
      .join('')}
  </div>
  <p class="meta">Generated at: ${new Date(result.generatedAt).toLocaleString()}</p>
</body>
</html>`;

  popup.document.write(html);
  popup.document.close();
  popup.focus();
  popup.print();
}

export default function App() {
  const [result, setResult] = useState<TailoredPortfolio | null>(null);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');
  const [error, setError] = useState<string | null>(null);

  const refreshHistory = async () => {
    setHistoryLoading(true);
    try {
      const items = await fetchHistory();
      setHistory(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch history');
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    refreshHistory();

    const params = new URLSearchParams(window.location.search);
    const shareId = params.get('share');
    if (!shareId) {
      return;
    }

    fetchSharedResult(shareId)
      .then((shared) => setResult(shared))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load shared result'));
  }, []);

  const handleTailor = async (recruiter: RecruiterInput) => {
    setLoading(true);
    setError(null);

    try {
      const data = await tailorPortfolio({ recruiter, basePortfolio: BASE_PORTFOLIO });
      setResult(data);
      await refreshHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyShare = async () => {
    if (!result?.shareId) {
      setError('No share link available for this result yet.');
      return;
    }

    const url = `${window.location.origin}?share=${result.shareId}`;
    await navigator.clipboard.writeText(url);
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setResult(item.result);
    setActiveTab('generator');
  };

  const handleExportPdf = () => {
    if (!result) {
      return;
    }
    exportToPdf(result);
  };

  return (
    <main className="layout">
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <header className="hero">
        <p className="eyebrow">AI Portfolio Builder</p>
        <h1>Adaptive Portfolio for Every Recruiter</h1>
        <p>
          Recruiter-specific narrative, project framing, share links, history tracking, and PDF export in one flow.
        </p>
        <div className="hero-stat-row">
          <article>
            <strong>{history.length}</strong>
            <span>Saved sessions</span>
          </article>
          <article>
            <strong>{result?.mode === 'ai' ? 'AI' : 'Fallback'}</strong>
            <span>Current mode</span>
          </article>
          <article>
            <strong>1-click</strong>
            <span>Share and export</span>
          </article>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      <section className="workspace-grid">
        <div className="left-column">
          <ProfilePanel profile={BASE_PORTFOLIO} />
          <section className="panel workspace-tabs-panel">
            <div className="tab-row">
              <button
                className={`tab-btn ${activeTab === 'generator' ? 'tab-btn-active' : ''}`}
                onClick={() => setActiveTab('generator')}
                type="button"
              >
                Generator
              </button>
              <button
                className={`tab-btn ${activeTab === 'history' ? 'tab-btn-active' : ''}`}
                onClick={() => setActiveTab('history')}
                type="button"
              >
                History ({history.length})
              </button>
            </div>
            {activeTab === 'generator' ? (
              <RecruiterForm loading={loading} onSubmit={handleTailor} />
            ) : (
              <HistoryPanel
                items={history}
                loading={historyLoading}
                onRefresh={refreshHistory}
                onSelect={handleSelectHistory}
              />
            )}
          </section>
        </div>
        <TailoredView onCopyShare={handleCopyShare} onExportPdf={handleExportPdf} result={result} />
      </section>

      <p className="share-hint">Share API base: {API_URL}</p>
    </main>
  );
}
