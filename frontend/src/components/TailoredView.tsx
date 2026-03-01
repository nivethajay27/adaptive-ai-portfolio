import type { TailoredPortfolio } from '../types';

type Props = {
  result: TailoredPortfolio | null;
  onCopyShare: () => void;
  onExportPdf: () => void;
};

export default function TailoredView({ result, onCopyShare, onExportPdf }: Props) {
  if (!result) {
    return (
      <section className="panel result result-empty">
        <p className="eyebrow">Live Preview</p>
        <h2>Your tailored version will appear here</h2>
        <p>
          Add recruiter context, generate, and this area will transform into a role-specific portfolio
          pitch with selected projects and outreach copy.
        </p>
      </section>
    );
  }

  return (
    <section className="panel result">
      <div className="result-top-row">
        <p className="eyebrow">Generated Portfolio</p>
        <span className={`mode-badge ${result.mode === 'ai' ? 'mode-ai' : 'mode-fallback'}`}>
          {result.mode === 'ai' ? 'AI Generated' : 'Fallback'}
        </span>
      </div>
      <div className="result-actions">
        <button className="ghost-btn" onClick={onCopyShare} type="button">
          Copy Share Link
        </button>
        <button className="ghost-btn" onClick={onExportPdf} type="button">
          Export PDF
        </button>
      </div>
      <h2>{result.headline}</h2>
      <p className="lead-copy">{result.tailoredSummary}</p>

      <h3>Why I fit this role</h3>
      <ul className="fit-list">
        {result.whyFit.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <h3>Selected projects</h3>
      <div className="project-grid">
        {result.selectedProjects.map((project) => (
          <article className="project-card" key={project.name}>
            <h4>{project.name}</h4>
            <p>{project.angle}</p>
            <p>
              <strong>Impact:</strong> {project.impact}
            </p>
            <p className="tags">{project.tech.join(' • ')}</p>
            <a href={project.link} rel="noreferrer" target="_blank">
              Open project
            </a>
          </article>
        ))}
      </div>

      <small>Generated at: {new Date(result.generatedAt).toLocaleString()}</small>
    </section>
  );
}
