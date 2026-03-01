import type { HistoryItem } from '../types';

type Props = {
  items: HistoryItem[];
  loading: boolean;
  onRefresh: () => Promise<void>;
  onSelect: (item: HistoryItem) => void;
};

export default function HistoryPanel({ items, loading, onRefresh, onSelect }: Props) {
  return (
    <section className="history-panel">
      <div className="history-header">
        <h2>Session History</h2>
        <button className="ghost-btn" disabled={loading} onClick={onRefresh} type="button">
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="history-empty">No saved sessions yet. Generate one to start building history.</p>
      ) : (
        <div className="history-list">
          {items.map((item) => (
            <button
              className="history-item"
              key={item.sessionId}
              onClick={() => onSelect(item)}
              type="button"
            >
              <strong>{item.company} - {item.roleTitle}</strong>
              <span>{item.recruiterName}</span>
              <small>{new Date(item.createdAt).toLocaleString()}</small>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
