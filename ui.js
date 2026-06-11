// Behalf of n1nerlang
// Please don't remove the license here
// I'm sure
// ui.js
import { processObfuscation } from './obfuscatorLayers.js';

const input = document.getElementById('input-area');
const output = document.getElementById('output-area');

document.getElementById('obfuscate-btn').addEventListener('click', async () => {
    if (!input.value) return alert("Paste some code first!");
    
    // We call our layer logic here
    output.value = await processObfuscation(input.value);
});

document.getElementById('copy-btn').addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    alert("Copied to clipboard!");
});
