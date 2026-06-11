// watermark.js
const messages = [
    "Obfuscated By Alias",
    "Alias v1.0",
    "Security Layer Active",
    "Proprietary Logic"
];

export function injectWatermark(code) {
    // Splits code at every semicolon or newline to insert junk expressions
    const lines = code.split(/([;\n])/);
    let result = "";

    for (let line of lines) {
        result += line;
        // 10% chance to inject a junk message string
        if (Math.random() < 0.1) {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            result += ` ("${msg}"); `;
        }
    }
    return result;
}
