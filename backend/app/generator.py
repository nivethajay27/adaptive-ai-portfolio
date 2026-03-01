import json
import logging

from openai import OpenAI

from .config import GROQ_API_KEY, GROQ_BASE_URL, GROQ_MODEL
from .models import TailorRequest, TailoredPortfolio, TailoredProject


SYSTEM_PROMPT = """You rewrite a software engineer portfolio for specific recruiters.
Return strict JSON with keys:
headline (string), tailoredSummary (string), whyFit (array of strings),
selectedProjects (array of objects with name, angle, tech, impact, link).
Keep output concise, specific, and authentic.
"""

logger = logging.getLogger(__name__)


def generate_fallback(payload: TailorRequest) -> TailoredPortfolio:
    recruiter = payload.recruiter
    base = payload.basePortfolio

    picks = base.projects[:2]
    selected = [
        TailoredProject(
            name=project.name,
            angle=(
                f"For {recruiter.company}, this project demonstrates relevant delivery for "
                f"{recruiter.roleTitle.lower()} outcomes with measurable impact."
            ),
            tech=project.tech,
            impact=project.impact,
            link=project.link,
        )
        for project in picks
    ]

    return TailoredPortfolio(
        mode="fallback",
        headline=f"{base.name} | Tailored for {recruiter.company} - {recruiter.roleTitle}",
        tailoredSummary=(
            f"I build production-grade systems that match {recruiter.company}'s hiring priorities. "
            f"My experience in {', '.join(base.coreSkills[:4])} maps directly to {recruiter.roleTitle}."
        ),
        whyFit=[
            f"Aligned with the role focus in the provided description for {recruiter.roleTitle}.",
            f"Track record of shipping measurable outcomes in fast-moving teams.",
            f"Strong overlap with requested stack and execution style in a {recruiter.tone} voice.",
        ],
        selectedProjects=selected,
    )


def generate_with_groq(payload: TailorRequest) -> TailoredPortfolio:
    if not GROQ_API_KEY:
        logger.warning("GROQ_API_KEY is empty. Using fallback generator.")
        return generate_fallback(payload)

    try:
        client = OpenAI(api_key=GROQ_API_KEY, base_url=GROQ_BASE_URL)
        user_prompt = {
            "recruiter": payload.recruiter.model_dump(),
            "basePortfolio": payload.basePortfolio.model_dump(),
        }

        response = client.chat.completions.create(
            model=GROQ_MODEL,
            temperature=0.4,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": (
                        "Rewrite my portfolio for this recruiter and role. Use evidence from my portfolio only."
                        f"\n\nData:\n{json.dumps(user_prompt)}"
                    ),
                },
            ],
        )

        content = response.choices[0].message.content
        if not content:
            return generate_fallback(payload)

        parsed = json.loads(content)

        return TailoredPortfolio(
            mode="ai",
            headline=parsed["headline"],
            tailoredSummary=parsed["tailoredSummary"],
            whyFit=parsed["whyFit"],
            selectedProjects=parsed["selectedProjects"],
        )
    except Exception:
        logger.exception("Groq generation failed. Using fallback generator.")
        return generate_fallback(payload)
