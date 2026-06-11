// Import the library from a CDN
import JavaScriptObfuscator from 'https://cdn.skypack.dev/javascript-obfuscator';
import LuaControlFlowFlattener from './luaControlFlowFlattening.js';

export async function processObfuscation(rawCode, language = 'javascript') {
    if (language.toLowerCase() === 'lua') {
        return processLuaObfuscation(rawCode);
    }
    return processJavaScriptObfuscation(rawCode);
}

/**
 * JavaScript Obfuscation - Multi-layer protection
 */
async function processJavaScriptObfuscation(rawCode) {
    // LAYER 1: String Array (Protects hardcoded strings)
    let code = JavaScriptObfuscator.obfuscate(rawCode, {
        stringArray: true,
        stringArrayThreshold: 1,
        stringArrayEncoding: ['base64']
    }).getObfuscatedCode();

    // LAYER 2: Control Flow (Makes the logic flow like a maze)
    code = JavaScriptObfuscator.obfuscate(code, {
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4
    }).getObfuscatedCode();

    // LAYER 3: Identifier Renaming (Scrambles variable names)
    code = JavaScriptObfuscator.obfuscate(code, {
        renameGlobals: true,
        identifierNamesGenerator: 'hexadecimal'
    }).getObfuscatedCode();

    return code;
}

/**
 * Lua Obfuscation - Multi-layer protection with control flow flattening
 */
async function processLuaObfuscation(rawCode) {
    const flattener = new LuaControlFlowFlattener();
    
    // LAYER 1: Control Flow Flattening
    let code = flattener.flatten(rawCode);
    
    // LAYER 2: Inject obfuscation (XOR, shuffling, dead code)
    code = flattener.injectObfuscation(code);
    
    // LAYER 3: String obfuscation
    code = obfuscateLuaStrings(code);
    
    // LAYER 4: Variable name randomization
    code = randomizeVariableNames(code);
    
    return code;
}

/**
 * Hex-encode a JavaScript string in a browser-safe way
 */
function toHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        hex += code.toString(16).padStart(2, '0');
    }
    return hex;
}

/**
 * Obfuscate strings in Lua code
 */
function obfuscateLuaStrings(code) {
    const stringPattern = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g;
    const stringMap = new Map();
    let stringIndex = 0;
    
    let obfuscated = code.replace(stringPattern, (match, doubleQuoted, singleQuoted) => {
        const str = doubleQuoted !== undefined ? doubleQuoted : singleQuoted;
        const decoded = str.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
        const encodedStr = toHex(decoded);
        const varName = `_str${stringIndex++}`;
        stringMap.set(varName, encodedStr);
        return varName;
    });
    
    // Add string decoding function at the beginning
    let output = '-- String Obfuscation\n';
    output += 'local function _dec(hex)\n';
    output += '    local str = ""\n';
    output += '    for i = 1, #hex, 2 do\n';
    output += '        str = str .. string.char(tonumber(hex:sub(i, i+1), 16))\n';
    output += '    end\n';
    output += '    return str\n';
    output += 'end\n\n';
    
    // Define string variables
    for (let [varName, hexStr] of stringMap) {
        output += `local ${varName} = _dec("${hexStr}")\n`;
    }
    
    output += '\n' + obfuscated;
    
    return output;
}

/**
 * Randomize variable and function names in Lua
 */
function randomizeVariableNames(code) {
    const variablePattern = /\b(local\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
    const nameMap = new Map();
    let nameIndex = 0;
    
    const obfuscated = code.replace(variablePattern, (match, local_keyword, varName) => {
        // Skip Lua keywords
        if (isLuaKeyword(varName)) return match;
        
        // Create mapping for consistent renaming
        if (!nameMap.has(varName)) {
            nameMap.set(varName, generateObfuscatedName(nameIndex++));
        }
        
        const newName = nameMap.get(varName);
        return (local_keyword || '') + newName;
    });
    
    return obfuscated;
}

/**
 * Generate obfuscated variable name
 */
function generateObfuscatedName(index) {
    // Use combination of underscores, numbers, and similar-looking characters
    const chars = ['_', 'l', 'I', 'O', '0', '1'];
    let name = '';
    let num = index;
    
    do {
        name = chars[num % chars.length] + name;
        num = Math.floor(num / chars.length);
    } while (num > 0);
    
    return name;
}

/**
 * Check if string is Lua keyword
 */
function isLuaKeyword(word) {
    const keywords = [
        'and', 'break', 'do', 'else', 'elseif', 'end', 'false',
        'for', 'function', 'goto', 'if', 'in', 'local', 'nil',
        'not', 'or', 'repeat', 'return', 'then', 'true', 'until',
        'while', 'print', 'table', 'string', 'math', 'os', 'io',
        'require', 'type', 'tonumber', 'tostring'
    ];
    return keywords.includes(word);
}

export { LuaControlFlowFlattener };
