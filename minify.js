export function minify(code) {
    // Simple regex to remove comments and extra spacing
    return code
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1')
        .replace(/\s+/g, ' ')
        .trim();
}
