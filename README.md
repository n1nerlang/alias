# 🛡️ Alias | Advanced Obfuscator
> *A modular, high-entropy obfuscation pipeline for Luau.*

## 🏗️ Pipeline Architecture
| Module | Purpose | Impact |
| :--- | :--- | :--- |
| `header.js` | ASCII Junk Injection | Bypasses basic syntax detectors |
| `minify.js` | Whitespace/Comment Removal | Reduces surface area for analysis |
| `math.js` | Prometheus-Style Junk | Injects randomized math equations |
| `watermark.js`| Expression Injection | Injects persistent, random branding |
| `cff.js` | Control Flow Flattening | Breaks linear execution logic |

## 🚀 Technical Implementation
```javascript
import { addJunkHeader } from './header.js';
// ... other imports

export async function processObfuscation(rawCode) {
    let code = addJunkHeader();
    code = minify(code + rawCode);
    code = obfuscateMath(code);
    code = injectWatermark(code);
    return flattenFlow(code);
}
