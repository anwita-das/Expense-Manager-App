from datetime import datetime
from math import pow

def calculate_interest(amount, rate, date, frequency=None):
    if not date or not isinstance(date, datetime):
        return 0

    now = datetime.now()
    start = date

    # Calculate completed months
    total_months = (
        (now.year - start.year) * 12
        + (now.month - start.month)
        - (1 if now.day < start.day else 0)
    )
    years = total_months / 12

    # Case 1: Fixed Deposit
    if not frequency or frequency.lower() in ["onetime", "fixed"]:
        n = 4  # Quarterly compounding
        r = float(rate) / 100
        maturity = float(amount) * pow(1 + r / n, n * years)
        return round(maturity - float(amount), 2)

    # Case 2: Recurring Deposit
    freq_map = {
        "monthly": 1,
        "quarterly": 3,
        "halfyearly": 6,
        "yearly": 12,
    }

    interval = freq_map.get(frequency.lower())
    if not interval:
        return 0

    n = total_months // interval
    if n <= 0:
        return 0

    interest = float(amount) * (n * (n + 1)) / 2 * (float(rate) / (12 * 100))
    return round(interest, 2)