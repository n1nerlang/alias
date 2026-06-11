// Behalf of n1nerlang
// Please don't remove the license here
// I'm sure
// ui.js - Enhanced UI with language support
import { processObfuscation } from './obfuscatorLayers.js';

const input = document.getElementById('input-area');
const output = document.getElementById('output-area');
const obfuscateBtn = document.getElementById('obfuscate-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const languageSelect = document.getElementById('language-select');
const obfuscationLevelSelect = document.getElementById('obfuscation-level');
const statusMessage = document.getElementById('status-message');

// Default language selection
let selectedLanguage = 'javascript';

/**
 * Handle language selection change
 */
if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
        selectedLanguage = e.target.value;
        updateUIForLanguage(selectedLanguage);
        clearOutput();
    });
}

/**
 * Update UI elements based on selected language
 */
function updateUIForLanguage(language) {
    const placeholder = language === 'lua' 
        ? 'Paste your Lua code here...' 
        : 'Paste your JavaScript code here...';
    input.placeholder = placeholder;
    
    // Update obfuscation level descriptions if needed
    if (obfuscationLevelSelect) {
        if (language === 'lua') {
            obfuscationLevelSelect.innerHTML = `
                <option value="light">Light (String + Variable Obfuscation)</option>
                <option value="medium" selected>Medium (+ Control Flow Flattening)</option>
                <option value="strong">Strong (+ XOR + Dead Code + Shuffling)</option>
            `;
        } else {
            obfuscationLevelSelect.innerHTML = `
                <option value="light">Light (String Array Only)</option>
                <option value="medium" selected>Medium (+ Control Flow)</option>
                <option value="strong">Strong (+ Full Identifier Renaming)</option>
            `;
        }
    }
}

/**
 * Main obfuscation handler
 */
obfuscateBtn.addEventListener('click', async () => {
    if (!input.value.trim()) {
        showStatus('error', '❌ Please paste some code first!');
        return;
    }
    
    try {
        showStatus('loading', '⏳ Obfuscating...');
        obfuscateBtn.disabled = true;
        
        // Get selected options
        const level = obfuscationLevelSelect?.value || 'medium';
        
        // Call obfuscation with language and level
        let obfuscatedCode = await processObfuscation(
            input.value,
            selectedLanguage,
            level
        );
        
        output.value = obfuscatedCode;
        showStatus('success', '✅ Obfuscation complete!');
        
    } catch (error) {
        showStatus('error', `❌ Error: ${error.message}`);
        console.error('Obfuscation error:', error);
    } finally {
        obfuscateBtn.disabled = false;
    }
});

/**
 * Copy to clipboard handler
 */
copyBtn.addEventListener('click', () => {
    if (!output.value) {
        showStatus('error', '❌ Nothing to copy!');
        return;
    }
    
    output.select();
    document.execCommand('copy');
    showStatus('success', '✅ Copied to clipboard!');
    
    // Reset message after 2 seconds
    setTimeout(() => showStatus('info', ''), 2000);
});

/**
 * Clear input and output
 */
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        clearInput();
        clearOutput();
        showStatus('info', '');
    });
}

function clearInput() {
    input.value = '';
    input.focus();
}

function clearOutput() {
    output.value = '';
}

/**
 * Display status message
 */
function showStatus(type, message) {
    if (!statusMessage) return;
    
    statusMessage.textContent = message;
    statusMessage.className = `status-message status-${type}`;
    
    if (message) {
        statusMessage.style.display = 'block';
    } else {
        statusMessage.style.display = 'none';
    }
}

/**
 * Keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter / Cmd+Enter to obfuscate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        obfuscateBtn.click();
    }
    
    // Ctrl+Shift+C / Cmd+Shift+C to copy
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        copyBtn.click();
    }
});

/**
 * Initialize UI
 */
document.addEventListener('DOMContentLoaded', () => {
    updateUIForLanguage(selectedLanguage);
    showStatus('info', `Ready to obfuscate ${selectedLanguage}!`);
});

/**
 * Auto-save to localStorage
 */
input.addEventListener('input', () => {
    localStorage.setItem('obfuscator-input', input.value);
});

output.addEventListener('input', () => {
    localStorage.setItem('obfuscator-output', output.value);
});

// Restore from localStorage on page load
window.addEventListener('load', () => {
    const savedInput = localStorage.getItem('obfuscator-input');
    const savedOutput = localStorage.getItem('obfuscator-output');
    
    if (savedInput) input.value = savedInput;
    if (savedOutput) output.value = savedOutput;
});
