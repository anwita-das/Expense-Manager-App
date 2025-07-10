export function calculateGrowth({ amount, rate, date, frequency }) {
    const now = new Date();
    const start = new Date(date);
    if (isNaN(start)) return 0;

    // Calculate total completed months
    const totalMonths =
        (now.getFullYear() - start.getFullYear()) * 12 +
        (now.getMonth() - start.getMonth()) -
        (now.getDate() < start.getDate() ? 1 : 0);

    const years = totalMonths / 12;

    // Case 1: Fixed Deposit (FD)
    if (!frequency || frequency === "onetime" || frequency === "fixed") {
        const n = 4; // Quarterly compounding
        const r = rate / 100;
        const maturity = amount * Math.pow(1 + r / n, n * years);
        const profit = maturity - amount;
        return +profit.toFixed(2);
    }

    // Case 2: Recurring Deposit (monthly, quarterly, etc.)
    const freqMap = {
        monthly: 1,
        quarterly: 3,
        halfyearly: 6,
        yearly: 12,
    };

    const interval = freqMap[frequency?.toLowerCase()];
    if (!interval) return 0;

    const n = Math.floor(totalMonths / interval); // Number of deposits
    if (n <= 0) return 0;

    const interest = amount * (n * (n + 1)) / 2 * (rate / (12 * 100));
    return +interest.toFixed(2);
}
