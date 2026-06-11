/**
 * Lua Control Flow Flattening Implementation
 * Converts structured control flow (if/while/for) into flattened state machine
 */

export class LuaControlFlowFlattener {
    constructor() {
        this.stateCounter = 0;
        this.dispatcher = 'switch';
    }

    /**
     * Flatten control flow in Lua code
     * @param {string} luaCode - Original Lua source code
     * @returns {string} - Flattened Lua code
     */
    flatten(luaCode) {
        const ast = this.parseLua(luaCode);
        const flattenedAst = this.flattenAST(ast);
        return this.generateFlattened(flattenedAst);
    }

    /**
     * Parse Lua code into AST (simplified)
     */
    parseLua(code) {
        // Parse Lua syntax into abstract syntax tree
        // This is simplified - use a proper Lua parser like luaparse in production
        return {
            type: 'Block',
            body: this.tokenizeLua(code)
        };
    }

    /**
     * Tokenize Lua code
     */
    tokenizeLua(code) {
        const lines = code.split('\n');
        const tokens = [];
        let depth = 0;

        for (let line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('--')) continue;

            tokens.push({
                content: trimmed,
                depth: depth,
                type: this.getStatementType(trimmed)
            });

            // Track control flow depth
            if (trimmed.match(/^(if|while|for|function|do)\b/)) depth++;
            if (trimmed.match(/^(end|until)\b/)) depth--;
        }

        return tokens;
    }

    /**
     * Determine statement type
     */
    getStatementType(statement) {
        if (statement.match(/^if\b/)) return 'if';
        if (statement.match(/^while\b/)) return 'while';
        if (statement.match(/^for\b/)) return 'for';
        if (statement.match(/^function\b/)) return 'function';
        if (statement.match(/^do\b/)) return 'do';
        if (statement.match(/^local\b/)) return 'local';
        return 'statement';
    }

    /**
     * Flatten AST into state machine
     */
    flattenAST(ast) {
        const states = [];
        let currentState = 0;

        // Initialize dispatcher state
        states.push({
            id: currentState++,
            type: 'init',
            code: 'local _state = 0'
        });

        // Add main dispatcher loop
        states.push({
            id: currentState++,
            type: 'dispatcher',
            code: 'while true do'
        });

        // Process each statement and create state transitions
        for (let stmt of ast.body) {
            states.push({
                id: currentState,
                type: stmt.type,
                code: stmt.content,
                nextState: currentState + 1
            });
            currentState++;
        }

        // Add exit state
        states.push({
            id: currentState,
            type: 'exit',
            code: 'break'
        });

        return states;
    }

    /**
     * Generate flattened Lua code
     */
    generateFlattened(states) {
        let output = '-- Flattened Control Flow\n';
        output += 'local _state = 0\n\n';
        output += 'while true do\n';
        output += '    if _state == nil then break end\n\n';

        // Generate state dispatcher
        output += '    if false then\n';
        for (let state of states) {
            output += `    elseif _state == ${state.id} then\n`;
            output += `        -- ${state.type}\n`;
            output += `        ${state.code}\n`;
            if (state.nextState !== undefined) {
                output += `        _state = ${state.nextState}\n`;
            } else if (state.type === 'exit') {
                output += `        _state = nil\n`;
            }
        }

        output += '    end\n';
        output += 'end\n';

        return output;
    }

    /**
     * Inject obfuscation techniques
     */
    injectObfuscation(flattenedCode) {
        let obfuscated = flattenedCode;

        // Technique 1: Rename state variable
        const stateVarName = this.generateRandomName();
        obfuscated = obfuscated.replace(/_state/g, stateVarName);

        // Technique 2: XOR state values
        obfuscated = this.xorStateValues(obfuscated);

        // Technique 3: Shuffle state order
        obfuscated = this.shuffleStates(obfuscated);

        // Technique 4: Add dead code
        obfuscated = this.injectDeadCode(obfuscated);

        return obfuscated;
    }

    /**
     * XOR state values for additional obfuscation
     */
    xorStateValues(code) {
        const xorKey = Math.floor(Math.random() * 0xFFFF);
        let output = `-- XOR Key: ${xorKey}\n`;
        output += `local function _xor(val) return val ~ ${xorKey} end\n\n`;
        output += code.replace(/== (\d+)/g, (match, num) => {
            return `== _xor(${parseInt(num) ^ xorKey})`;
        });
        return output;
    }

    /**
     * Shuffle state execution order
     */
    shuffleStates(code) {
        // Extract state blocks and reorder them
        const statePattern = /elseif _state == \d+ then[\s\S]*?(?=elseif|end)/g;
        const states = code.match(statePattern) || [];
        
        // Shuffle array
        for (let i = states.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [states[i], states[j]] = [states[j], states[i]];
        }

        return code.replace(statePattern, () => states.shift());
    }

    /**
     * Inject dead code to confuse deobfuscators
     */
    injectDeadCode(code) {
        const deadCodeSnippets = [
            'local _dead1 = math.random(1, 1000)',
            'if _dead1 > 10000 then _state = -1 end',
            'local _garbage = string.rep("x", 100)',
            'for i=1,100 do _garbage = _garbage .. "x" end'
        ];

        let lines = code.split('\n');
        let output = [];

        for (let line of lines) {
            output.push(line);
            if (Math.random() < 0.15) { // 15% chance to inject dead code
                const snippet = deadCodeSnippets[Math.floor(Math.random() * deadCodeSnippets.length)];
                output.push('    ' + snippet + ' -- dead code');
            }
        }

        return output.join('\n');
    }

    /**
     * Generate random variable name
     */
    generateRandomName() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
        let name = '_';
        for (let i = 0; i < 8; i++) {
            name += chars[Math.floor(Math.random() * chars.length)];
        }
        return name;
    }
}

export default LuaControlFlowFlattener;
