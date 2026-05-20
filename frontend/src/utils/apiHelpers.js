export function buildApiUrl(path) {
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';
    return `${base}${path}`;
}
