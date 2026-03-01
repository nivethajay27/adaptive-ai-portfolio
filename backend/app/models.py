from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


class RecruiterInput(BaseModel):
    recruiterName: str
    company: str
    roleTitle: str
    jobDescription: str
    tone: Literal["confident", "friendly", "technical"]


class Project(BaseModel):
    name: str
    summary: str
    tech: list[str]
    impact: str
    link: str


class PortfolioData(BaseModel):
    name: str
    tagline: str
    bio: str
    location: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    coreSkills: list[str]
    highlights: list[str]
    projects: list[Project]


class TailorRequest(BaseModel):
    recruiter: RecruiterInput
    basePortfolio: PortfolioData


class TailoredProject(BaseModel):
    name: str
    angle: str
    tech: list[str]
    impact: str
    link: str


class TailoredPortfolio(BaseModel):
    mode: Literal["ai", "fallback"]
    sessionId: Optional[int] = None
    shareId: Optional[str] = None
    headline: str
    tailoredSummary: str
    whyFit: list[str]
    selectedProjects: list[TailoredProject]
    generatedAt: datetime = Field(default_factory=datetime.utcnow)


class HistoryItem(BaseModel):
    sessionId: int
    shareId: str
    recruiterName: str
    company: str
    roleTitle: str
    tone: str
    createdAt: str
    result: TailoredPortfolio
