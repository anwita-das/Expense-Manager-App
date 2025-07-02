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