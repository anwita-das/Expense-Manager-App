export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPassword(password) {
    return password.length >= 6;
}

export function isNonEmptyName(name) {
    return name.trim().length > 0;
}

export function isValidCategoryName(name) {
    const trimmed = name.trim();
    const maxLength = 30;
    const validPattern = /^[A-Za-z0-9 ]+$/;

    return (
        trimmed.length > 0 &&
        trimmed.length <= maxLength &&
        validPattern.test(trimmed)
    );
}

export function isValidAmount(amount) {
    if (!amount) return "Amount is required.";
    const parsed = parseFloat(amount);
    if (isNaN(parsed)) return "Amount must be a number.";
    if (parsed <= 0) return "Amount must be greater than 0.";
    return null;
}

export function isNonEmptyText(text, fieldName = "This field") {
    if (!text || text.trim() === "") return `${fieldName} is required.`;
    return null;
}

export function isValidInterestRate(value) {
    if (value === "" || value === null || value === undefined) return "Interest rate is required.";
    const num = parseFloat(value);
    if (isNaN(num)) return "Interest rate must be a number.";
    if (num < 0) return "Interest rate cannot be negative.";
    return null;
}

export function isValidFrequency(value) {
    const valid = ["monthly", "quarterly", "halfyearly", "yearly"];
    return valid.includes(freq) ? null : "Please select a valid frequency.";
}

export function isNotFutureDate(dateStr) {
    const inputDate = new Date(dateStr);
    const today = new Date();
    // Zero time on today's date to ensure only date comparison
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    return inputDate <= today ? null : "Date cannot be in the future.";
}

export function validateDailyExpenseEntry({ amount, category, paymentMethod, description }) {
    const errors = {};

    const amountError = isValidAmount(amount);
    if (amountError) errors.amount = amountError;

    const categoryError = isNonEmptyText(category, "Category");
    if (categoryError) errors.category = categoryError;

    const methodError = isNonEmptyText(paymentMethod, "Payment method");
    if (methodError) errors.paymentMethod = methodError;

    const descError = isNonEmptyText(description, "Description");
    if (descError) errors.description = descError;

    return errors;
}

export function validateLoanEntry({ amount, category, description }) {
    const errors = {};

    const amountError = isValidAmount(amount);
    if (amountError) errors.amount = amountError;

    const categoryError = isNonEmptyText(category, "Category");
    if (categoryError) errors.category = categoryError;

    const descError = isNonEmptyText(description, "Description");
    if (descError) errors.description = descError;

    return errors;
}

export function validateSavingsEntry({ amount, interestRate, date, frequency, depositMode, description }) {
    const errors = {};

    const amountError = isValidAmount(amount);
    if (amountError) errors.amount = amountError;

    const interestError = isValidInterestRate(interestRate);
    if (interestError) errors.interestRate = interestError;

    const dateError = isNotFutureDate(date);
    if (dateError) errors.date = dateError;

    if (depositMode === "recurring") {
        const frequencyError = isValidFrequency(frequency);
        if (frequencyError) errors.frequency = frequencyError;
    }

    const descError = isNonEmptyText(description, "Description");
    if (descError) errors.description = descError;

    return errors;
}