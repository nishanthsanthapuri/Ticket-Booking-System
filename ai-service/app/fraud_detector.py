from typing import Dict, List

def detect_fraud(signals: Dict) -> Dict:
    risk_score = 0
    reasons: List[str] = []

    # 1️⃣ High quantity booking
    if signals.get("quantity", 1) >= 6:
        risk_score += 30
        reasons.append("High ticket quantity")

    # 2️⃣ Rapid repeat bookings
    if signals.get("bookings_last_5_min", 0) >= 3:
        risk_score += 25
        reasons.append("Multiple bookings in short time")

    # 3️⃣ New user behavior
    if signals.get("account_age_days", 30) < 2:
        risk_score += 15
        reasons.append("Very new account")

    # 4️⃣ Payment retries
    if signals.get("payment_failures", 0) >= 2:
        risk_score += 20
        reasons.append("Multiple payment failures")

    # 5️⃣ Unusual access pattern
    if signals.get("ip_country_mismatch", False):
        risk_score += 20
        reasons.append("IP location mismatch")

    # Cap risk score
    risk_score = min(risk_score, 100)

    # Risk level
    if risk_score >= 70:
        risk_level = "HIGH"
    elif risk_score >= 40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "reasons": reasons
    }
