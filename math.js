// math.js

// Helper to generate a random uppercase letter
const getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

export function obfuscateMath(code) {
    return code.replace(/\b(\d+)\b/g, (match) => {
        const val = parseInt(match);
        let output = "";
        
        // Random repetition: 25 to 40 times
        const iterations = Math.floor(Math.random() * (40 - 25 + 1)) + 25;
        
        for (let i = 0; i < iterations; i++) {
            const randA = Math.floor(Math.random() * 900000) + 100000;
            const randB = Math.floor(Math.random() * 900000) + 100000;
            const randOp = Math.floor(Math.random() * 900000);
            const label = getRandomLetter();
            
            output += `[${label}]${randA}+${randB}*${randOp}|`;
        }
        
        // The classic Prometheus ending
        return `${output}=[G]${val}`;
    });
}
