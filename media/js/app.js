document.addEventListener('DOMContentLoaded', function() {
    const inputExp = document.getElementById('exp');
    const outputContainer = document.getElementById('output-container');
    const simplifyBtn = document.getElementById('btn');
    const truthTableInput = document.getElementById('truthTableInput');
    const convertBtn = document.getElementById('convertBtn');
    
    // Event listener para los ejemplos
    document.querySelectorAll('.example-list li').forEach(item => {
        item.addEventListener('click', () => {
            const exp = item.getAttribute('data-exp');
            inputExp.value = exp;
            inputExp.focus();
        });
    });
    
    // Event listener para el botón de conversión de minterms
    convertBtn.addEventListener('click', convertirMinterminos);
    
    // Función para convertir minterms a expresión booleana
    function convertirMinterminos() {
        const input = truthTableInput.value.trim();
        const match = input.match(/^f\s*\(\s*([\d\s,]+)\s*\)$/i);
        
        if (!match) {
            alert("Formato incorrecto. Usa: f(0,1,2,3)");
            return;
        }
        
        const numsStr = match[1].split(',').map(n => n.trim()).filter(n => n !== '');
        const nums = numsStr.map(n => parseInt(n));
        
        if (nums.some(isNaN)) {
            alert("Solo se permiten números dentro de f()");
            return;
        }
        
        // Determinar el número de variables necesarias
        const maxNum = Math.max(...nums);
        const numVars = Math.max(1, Math.ceil(Math.log2(maxNum + 1)));
        
        
        const varNames = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, numVars);
        const minterms = [];
        
        nums.forEach(n => {
            if (n < 0 || n >= Math.pow(2, numVars)) {
                alert(`El minterm ${n} no es válido para ${numVars} variables`);
                return;
            }
            
            const binary = n.toString(2).padStart(numVars, '0');
            let term = '';
            
            for (let i = 0; i < numVars; i++) {
                term += binary[i] === '1' ? varNames[i] : varNames[i] + "'";
            }
            
            minterms.push('(' + term + ')');
        });
        
        if (minterms.length === 0) {
            alert("No se generaron minterms válidos");
            return;
        }
        
        inputExp.value = minterms.join('+');
        inputExp.focus();
    }
    
    // Resto del código original
    simplifyBtn.addEventListener('click', function() {
        const expression = inputExp.value.trim();
        if (!expression || expression === 'ingresa la expresión') {
            showOutput("Por favor ingresa una expresión booleana válida");
            return;
        }

        outputContainer.innerHTML = '<div class="final-result">Simplificando...</div>';
        
        setTimeout(() => {
            try {
                const steps = [];
                const simplified = simplifyBooleanExpression(expression, steps);
                showOutput(simplified, steps);
            } catch (error) {
                showOutput(`Error: ${error.message}`);
            }
        }, 100);
    });

    function showOutput(result, steps = []) {
        let outputHTML = `<div class="final-result">RESULTADO FINAL: ${result}</div>`;
        
        if (steps.length > 0) {
            outputHTML += '<div class="process-title">PROCESO DE SIMPLIFICACIÓN:</div>';
            steps.forEach(step => {
                outputHTML += `<div class="step">${step.expr} - ${step.property}</div>`;
            });
        }
        
        outputContainer.innerHTML = outputHTML;
        outputContainer.scrollTop = outputContainer.scrollHeight;
    }

    function simplifyBooleanExpression(expr, steps) {
        let currentExpr = expr;
        steps.push({expr: currentExpr, property: 'Expresión original'});
        
        currentExpr = applyDoubleNegation(currentExpr, steps);
        currentExpr = removeOuterParentheses(currentExpr, steps);
        currentExpr = applyDeMorgan(currentExpr, steps);
        currentExpr = simplifyMainExpression(currentExpr, steps);
        
        return currentExpr === "" ? "0" : currentExpr;
    }

    function applyDoubleNegation(expr, steps) {
        const newExpr = expr.replace(/([A-Za-z])(''+)/g, function(match, variable, negations) {
            return negations.length % 2 === 0 ? variable : variable + "'";
        });
        
        if (newExpr !== expr) {
            steps.push({expr: newExpr, property: 'Doble negación'});
        }
        return newExpr;
    }

    function removeOuterParentheses(expr, steps) {
        const regex = /^\((.*)\)$/;
        if (regex.test(expr) && !expr.includes('+')) {
            const innerExpr = expr.match(regex)[1];
            const newExpr = innerExpr;
            if (newExpr !== expr) {
                steps.push({expr: newExpr, property: 'Quitar paréntesis'});
                return newExpr;
            }
        }
        return expr;
    }

    function applyDeMorgan(expr, steps) {
        const deMorganRegex = /\(([^()]+)\)'/g;
        if (!deMorganRegex.test(expr)) return expr;
        
        const newExpr = expr.replace(deMorganRegex, function(match, innerExpr) {
            if (innerExpr.includes('+')) {
                return innerExpr.split('+').map(term => {
                    return term.split(/([A-Za-z]'?)/).filter(Boolean).map(t => {
                        if (t.match(/[A-Za-z]'/)) return t[0];
                        if (t.match(/[A-Za-z]/)) return t + "'";
                        return t;
                    }).join('');
                }).join('');
            } else {
                return innerExpr.match(/([A-Za-z]'?)/g).map(term => {
                    if (term.includes("'")) return term[0];
                    return term + "'";
                }).join('+');
            }
        });
        
        if (newExpr !== expr) {
            steps.push({expr: newExpr, property: 'De Morgan'});
        }
        return newExpr;
    }

    function simplifyMainExpression(expr, steps) {
        let currentExpr = expr;
        let previousExpr;
        
        do {
            previousExpr = currentExpr;
            
            currentExpr = applyComplementWithSteps(currentExpr, steps);
            if (currentExpr === '0' || currentExpr === '1') return currentExpr;
            
            currentExpr = applyStrictIdempotency(currentExpr, steps);
            currentExpr = factorizeWithSteps(currentExpr, steps);
            currentExpr = applyNeutralElementsWithSteps(currentExpr, steps);
            currentExpr = applyComplementaryExpansion(currentExpr, steps);
            currentExpr = applyRedundantTermRemoval(currentExpr, steps);
            
        } while (currentExpr !== previousExpr);
        
        return currentExpr;
    }

    function applyComplementaryExpansion(expr, steps) {
        // Caso 1: X + X'Y = X + Y
        const case1Regex = /([A-Za-z]+)\+([A-Za-z]+)'([A-Za-z]+)/g;
        let newExpr = expr.replace(case1Regex, function(match, X, Xprime, Y) {
            if (X === Xprime) {
                return X + '+' + Y;
            }
            return match;
        });
        
        if (newExpr !== expr) {
            steps.push({expr: newExpr, property: 'Expansión con término complementario'});
            return newExpr;
        }
        
        // Caso 2: X(X' + Y) = XY
        const case2Regex = /([A-Za-z]+)\(([A-Za-z]+)'\+([A-Za-z]+)\)/g;
        newExpr = expr.replace(case2Regex, function(match, X, Xprime, Y) {
            if (X === Xprime) {
                return X + Y;
            }
            return match;
        });
        
        if (newExpr !== expr) {
            steps.push({expr: newExpr, property: 'Expansión con término complementario'});
            return newExpr;
        }
        
        return expr;
    }

    function applyRedundantTermRemoval(expr, steps) {
        const terms = expr.split('+');
        if (terms.length >= 3) {
            for (let i = 0; i < terms.length; i++) {
                for (let j = i+1; j < terms.length; j++) {
                    for (let k = 0; k < terms.length; k++) {
                        if (k !== i && k !== j) {
                            const term1 = terms[i];
                            const term2 = terms[j];
                            const term3 = terms[k];
                            
                            const vars1 = term1.match(/[A-Za-z]'?/g) || [];
                            const vars2 = term2.match(/[A-Za-z]'?/g) || [];
                            const vars3 = term3.match(/[A-Za-z]'?/g) || [];
                            
                            if (vars3.length === 2) {
                                if (vars1.includes(vars3[0]) && vars2.includes(vars3[1])) {
                                    const newTerms = terms.filter((_, index) => index !== k);
                                    const newExpr = newTerms.join('+');
                                    steps.push({expr: newExpr, property: 'Término redundante'});
                                    return newExpr;
                                }
                                if (vars1.includes(vars3[1]) && vars2.includes(vars3[0])) {
                                    const newTerms = terms.filter((_, index) => index !== k);
                                    const newExpr = newTerms.join('+');
                                    steps.push({expr: newExpr, property: 'Término redundante'});
                                    return newExpr;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        return expr;
    }

    function applyStrictIdempotency(expr, steps) {
        if (expr.includes('+')) {
            const terms = expr.split('+').map(term => term.trim());
            const uniqueTerms = [];
            const termSet = new Set();
            
            for (let term of terms) {
                if (!termSet.has(term)) {
                    termSet.add(term);
                    uniqueTerms.push(term);
                }
            }
            
            if (uniqueTerms.length !== terms.length) {
                const newExpr = uniqueTerms.join('+');
                steps.push({expr: newExpr, property: 'Idempotencia'});
                return newExpr;
            }
        } else {
            const variables = expr.match(/([A-Za-z]'?)/g) || [];
            const uniqueVars = [];
            const varSet = new Set();
            
            for (let v of variables) {
                if (!varSet.has(v)) {
                    varSet.add(v);
                    uniqueVars.push(v);
                }
            }
            
            if (uniqueVars.length !== variables.length) {
                const newExpr = uniqueVars.join('');
                steps.push({expr: newExpr, property: 'Idempotencia'});
                return newExpr;
            }
        }
        return expr;
    }

    function applyComplementWithSteps(expr, steps) {
        const andComplement = expr.replace(/([A-Za-z]'?)([A-Za-z]'?)/g, (match, v1, v2) => {
            if ((v1 + "'" === v2) || (v2 + "'" === v1)) return '0';
            return match;
        });
        
        if (andComplement !== expr) {
            steps.push({expr: andComplement, property: 'Complemento para el cero'});
            return andComplement;
        }
        
        const orComplement = expr.replace(/([A-Za-z]'?)\+([A-Za-z]'?)/g, (match, v1, v2) => {
            if ((v1 + "'" === v2) || (v2 + "'" === v1)) return '1';
            return match;
        });
        
        if (orComplement !== expr) {
            steps.push({expr: orComplement, property: 'Complemento para el uno'});
            return orComplement;
        }
        
        return expr;
    }

    function factorizeWithSteps(expr, steps) {
        if (!expr.includes('+') || expr.length > 1000) return expr;
        
        const terms = expr.split('+').map(term => term.trim());
        if (terms.length < 2) return expr;
        
        for (let i = 0; i < terms.length; i++) {
            for (let j = i + 1; j < terms.length; j++) {
                const common = findCommonFactor(terms[i], terms[j]);
                if (common) {
                    const newTerms = [...terms];
                    newTerms.splice(j, 1);
                    newTerms.splice(i, 1);
                    
                    const factoredTerm = `${common.factor}(${common.remaining.join('+')})`;
                    newTerms.push(factoredTerm);
                    
                    const factoredExpr = newTerms.join('+');
                    steps.push({expr: factoredExpr, property: 'Factorización'});
                    return factoredExpr;
                }
            }
        }
        return expr;
    }

    function findCommonFactor(term1, term2) {
        const vars1 = term1.match(/([A-Za-z]'?)/g) || [];
        const vars2 = term2.match(/([A-Za-z]'?)/g) || [];
        
        if (vars1.length !== vars2.length) return null;
        
        let diffIndex = -1;
        let commonVars = [];
        
        for (let i = 0; i < vars1.length; i++) {
            if (vars1[i] === vars2[i]) {
                commonVars.push(vars1[i]);
            } else if ((vars1[i] + "'" === vars2[i]) || (vars2[i] + "'" === vars1[i])) {
                if (diffIndex !== -1) return null;
                diffIndex = i;
            } else {
                return null;
            }
        }
        
        if (diffIndex === -1) return null;
        
        return {
            factor: commonVars.join(''),
            remaining: [vars1[diffIndex], vars2[diffIndex]]
        };
    }

    function applyNeutralElementsWithSteps(expr, steps) {
        // Simplificar A(1) → A
        const oneMult = expr.replace(/([A-Za-z'()]+)\(1\)/g, '$1');
        if (oneMult !== expr) {
            steps.push({expr: oneMult, property: 'Elemento neutro'});
            return oneMult;
        }
        
        // Simplificar A+1 → 1
        const oneAdd = expr.replace(/([^+]+)\+1/g, '1').replace(/1\+([^+]+)/g, '1');
        if (oneAdd !== expr) {
            steps.push({expr: oneAdd, property: 'Acotación'});
            return oneAdd;
        }
        
        // Simplificar A(0) → 0
        const zeroMult = expr.replace(/([A-Za-z'()]+)\(0\)/g, '0');
        if (zeroMult !== expr) {
            steps.push({expr: zeroMult, property: 'Elemento neutro'});
            return zeroMult;
        }
        
        // Simplificar A+0 → A
        const zeroAdd = expr.replace(/([^+]+)\+0/g, '$1').replace(/0\+([^+]+)/g, '$1');
        if (zeroAdd !== expr) {
            steps.push({expr: zeroAdd, property: 'Elemento neutro'});
            return zeroAdd;
        }
        
        return expr;
    }
});