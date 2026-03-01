import type { PortfolioData } from '../types';

type Props = {
  profile: PortfolioData;
};

export default function ProfilePanel({ profile }: Props) {
  return (
    <aside className="panel profile-panel">
      <div className="profile-top">
        <p className="eyebrow">Candidate Snapshot</p>
        <h2>{profile.name}</h2>
        <p className="profile-tagline">{profile.tagline}</p>
      </div>

      <div className="meta-grid">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
        <a href={profile.github} rel="noreferrer" target="_blank">
          GitHub
        </a>
        <p>{profile.location}</p>
      </div>

      <p className="profile-bio">{profile.bio}</p>

      <h3>Top Skills</h3>
      <div className="chip-wrap">
        {profile.coreSkills.slice(0, 14).map((skill) => (
          <span className="chip" key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <h3>Impact Highlights</h3>
      <ul>
        {profile.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
