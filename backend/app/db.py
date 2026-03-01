import json
import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Optional

from .models import HistoryItem, TailorRequest, TailoredPortfolio

DB_PATH = Path(__file__).resolve().parents[1] / 'portfolio.db'


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    with get_connection() as conn:
        conn.execute(
            '''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                salt TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            '''
        )
        conn.execute(
            '''
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                token_hash TEXT NOT NULL UNIQUE,
                expires_at TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
            '''
        )
        conn.execute(
            '''
            CREATE TABLE IF NOT EXISTS tailored_versions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                recruiter_name TEXT NOT NULL,
                company TEXT NOT NULL,
                role_title TEXT NOT NULL,
                tone TEXT NOT NULL,
                created_at TEXT NOT NULL,
                share_id TEXT NOT NULL UNIQUE,
                result_json TEXT NOT NULL,
                job_description TEXT NOT NULL
            )
            '''
        )
        _ensure_tailored_columns(conn)


def _ensure_tailored_columns(conn: sqlite3.Connection) -> None:
    rows = conn.execute("PRAGMA table_info(tailored_versions)").fetchall()
    columns = {row["name"] for row in rows}
    if "job_description" not in columns:
        conn.execute(
            "ALTER TABLE tailored_versions ADD COLUMN job_description TEXT NOT NULL DEFAULT ''"
        )


def save_tailored_version(payload: TailorRequest, result: TailoredPortfolio) -> tuple[int, str]:
    share_id = _build_share_id()
    created_at = datetime.utcnow().isoformat()

    result_payload = result.model_dump(mode='json')
    result_payload['shareId'] = share_id

    with get_connection() as conn:
        cursor = conn.execute(
            '''
            INSERT INTO tailored_versions (
                recruiter_name, company, role_title, tone, created_at, share_id, result_json, job_description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''',
            (
                payload.recruiter.recruiterName,
                payload.recruiter.company,
                payload.recruiter.roleTitle,
                payload.recruiter.tone,
                created_at,
                share_id,
                json.dumps(result_payload),
                payload.recruiter.jobDescription,
            ),
        )
        session_id = int(cursor.lastrowid)
    return session_id, share_id


def get_history(limit: int = 25) -> list[HistoryItem]:
    with get_connection() as conn:
        rows = conn.execute(
            '''
            SELECT id, recruiter_name, company, role_title, tone, created_at, share_id, result_json
            FROM tailored_versions
            ORDER BY id DESC
            LIMIT ?
            ''',
            (limit,),
        ).fetchall()
    return [_row_to_history_item(row) for row in rows]


def get_history_item(session_id: int) -> Optional[HistoryItem]:
    with get_connection() as conn:
        row = conn.execute(
            '''
            SELECT id, recruiter_name, company, role_title, tone, created_at, share_id, result_json
            FROM tailored_versions
            WHERE id = ?
            ''',
            (session_id,),
        ).fetchone()
    if not row:
        return None
    return _row_to_history_item(row)


def get_shared_result(share_id: str) -> Optional[TailoredPortfolio]:
    with get_connection() as conn:
        row = conn.execute(
            '''
            SELECT result_json
            FROM tailored_versions
            WHERE share_id = ?
            ''',
            (share_id,),
        ).fetchone()
    if not row:
        return None
    parsed = json.loads(row['result_json'])
    return TailoredPortfolio.model_validate(parsed)


def _build_share_id() -> str:
    import secrets

    return secrets.token_urlsafe(10)


def _row_to_history_item(row: sqlite3.Row) -> HistoryItem:
    parsed = json.loads(row['result_json'])
    result = TailoredPortfolio.model_validate(parsed)
    result.sessionId = int(row['id'])
    result.shareId = row['share_id']
    return HistoryItem(
        sessionId=int(row['id']),
        shareId=row['share_id'],
        recruiterName=row['recruiter_name'],
        company=row['company'],
        roleTitle=row['role_title'],
        tone=row['tone'],
        createdAt=row['created_at'],
        result=result,
    )
