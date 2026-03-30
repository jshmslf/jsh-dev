const TOKEN_KEY = "visitor_token";
const EXPIRY_KEY = "visitor_token_expiry";
const EXPIRY_DURATION = 1000 * 60 * 60 * 24 * 180; 

export function getVisitorToken(): string {
    const existing = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);
    const now = Date.now();

    if (existing && expiry && now < parseInt(expiry)) {
        return existing;
    }

    const token = crypto.randomUUID();
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRY_KEY, (now + EXPIRY_DURATION).toString());
    return token;
}