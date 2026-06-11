// Import the library from a CDN
import JavaScriptObfuscator from 'https://cdn.skypack.dev/javascript-obfuscator';

export async function processObfuscation(rawCode) {
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
