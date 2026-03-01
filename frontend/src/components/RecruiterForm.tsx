import { FormEvent, useState } from 'react';
import type { RecruiterInput } from '../types';

type Props = {
  onSubmit: (payload: RecruiterInput) => Promise<void>;
  loading: boolean;
};

const initialState: RecruiterInput = {
  recruiterName: '',
  company: '',
  roleTitle: '',
  jobDescription: '',
  tone: 'technical'
};

export default function RecruiterForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<RecruiterInput>(initialState);

  const useSamplePrompt = () => {
    setForm({
      recruiterName: 'Hiring Team',
      company: 'Example Company',
      roleTitle: 'Software Engineer',
      tone: 'technical',
      jobDescription:
        'Looking for a full-stack engineer with strong React and Python skills, experience with cloud deployments, and ability to deliver scalable data-driven products.'
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-heading-row">
        <h2>Tailor for recruiter</h2>
        <button className="ghost-btn" onClick={useSamplePrompt} type="button">
          Load sample
        </button>
      </div>

      <label>
        Recruiter Name
        <input
          required
          value={form.recruiterName}
          onChange={(event) => setForm({ ...form, recruiterName: event.target.value })}
          placeholder="Jordan Lee"
        />
      </label>

      <label>
        Company
        <input
          required
          value={form.company}
          onChange={(event) => setForm({ ...form, company: event.target.value })}
          placeholder="Stripe"
        />
      </label>

      <label>
        Role Title
        <input
          required
          value={form.roleTitle}
          onChange={(event) => setForm({ ...form, roleTitle: event.target.value })}
          placeholder="Senior Full-Stack Engineer"
        />
      </label>

      <label>
        Desired Tone
        <select
          value={form.tone}
          onChange={(event) =>
            setForm({
              ...form,
              tone: event.target.value as RecruiterInput['tone']
            })
          }
        >
          <option value="technical">Technical</option>
          <option value="confident">Confident</option>
          <option value="friendly">Friendly</option>
        </select>
      </label>

      <label className="full-width">
        Job Description / Notes
        <textarea
          required
          rows={8}
          value={form.jobDescription}
          onChange={(event) => setForm({ ...form, jobDescription: event.target.value })}
          placeholder="Paste the job post or recruiter notes here..."
        />
      </label>

      <button className="primary-btn" disabled={loading} type="submit">
        {loading ? 'Generating tailored version...' : 'Generate tailored portfolio'}
      </button>
    </form>
  );
}
