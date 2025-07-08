export function calculateGrowth({ amount, rate, date, frequency }) {
  const now = new Date();
  const start = new Date(date);

  if (isNaN(start)) return amount; // fallback if invalid date

  const years = (now - start) / (1000 * 60 * 60 * 24 * 365.25);

  if (frequency === "onetime" || !frequency) {
    // Compound Interest: A = P * (1 + r)^t
    return +(amount * Math.pow(1 + rate / 100, years)).toFixed(2);
  } else {
    // Map frequencies to number of compounding periods per year
    const frequencyMap = {
      daily: 365,
      weekly: 52,
      monthly: 12,
      quarterly: 4,
      halfyearly: 2,
      yearly: 1,
    };

    const periodsPerYear = frequencyMap[frequency.toLowerCase()];
    if (!periodsPerYear) return amount;

    const totalDays = (now - start) / (1000 * 60 * 60 * 24);
    const n = Math.floor(periodsPerYear * years); // total number of periods
    const i = rate / 100 / periodsPerYear;        // rate per period

    if (i === 0 || n === 0) return amount;

    // SIP Growth Formula
    const fv = amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    return +fv.toFixed(2);
  }
}
