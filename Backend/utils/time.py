from datetime import datetime
from zoneinfo import ZoneInfo

def time_ago(played_at: str) -> str:
    dt = datetime.fromisoformat(played_at.replace("Z", "+00:00"))
    local_time = dt.astimezone(ZoneInfo("America/Port_of_Spain"))

    now = datetime.now(ZoneInfo("America/Port_of_Spain"))
    diff = now - local_time

    seconds = diff.total_seconds()

    if seconds < 60:
        return "just now"
    elif seconds < 3600:
        minutes = int(seconds // 60)
        return f"{minutes} minute{'s' if minutes > 1 else ''} ago"
    elif seconds < 86400:
        hours = int(seconds // 3600)
        return f"{hours} hour{'s' if hours > 1 else ''} ago"
    else:
        days = int(seconds // 86400)
        return f"{days} day{'s' if days > 1 else ''} ago"