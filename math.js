// math.js

const getRandChar = () => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    return charset.charAt(Math.floor(Math.random() * charset.length));
};

const getRandLabel = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

export function obfuscateMath(code) {
    return code.replace(/\b(\d+)\b/g, (match) => {
        const originalValue = parseInt(match);
        let junkData = "";
        
        // Random repetition: 25 to 40 times
        const iterations = Math.floor(Math.random() * 16) + 25;
        
        for (let i = 0; i < iterations; i++) {
            // Generate a random "nonsense" segment
            let noise = "";
            for(let j = 0; j < 5; j++) noise += getRandChar();
            
            const randA = Math.floor(Math.random() * 999999);
            const label = getRandLabel();
            
            // This mimics that "Goofy" style with symbols and labels
            junkData += `[${label}]${randA}${noise}+${getRandChar()}|`;
        }
        
        // The [G] anchor
        return `${junkData}=[G]${originalValue}`;
    });
}
