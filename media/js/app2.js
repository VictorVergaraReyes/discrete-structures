class QuineMcCluskey {
    constructor() {
        this.steps = [];
    }

    // Método principal para minimizar
    minimize(minterms, dontCares = [], variableNames = ['A', 'B', 'C', 'D']) {
        this.steps = [];
        const numVars = this.determineNumberOfVariables([...minterms, ...dontCares]);
        
        // Paso 1: Generar la tabla inicial
        const initialTable = this.generateInitialTable([...minterms, ...dontCares], numVars);
        this.steps.push({
            title: "Tabla 1: Minitérminos, binario y número de 1's",
            content: this.formatInitialTable(initialTable)
        });

        // Paso 2: Agrupar por número de 1's
        const grouped = this.groupByOnes(initialTable);
        this.steps.push({
            title: "Tabla 2: Agrupando por número de 1's",
            content: this.formatGroupedTable(grouped)
        });

        // Paso 3: Combinar términos
        const combined = this.combineTerms(grouped);
        this.steps.push({
            title: "Tabla 3: Combinaciones con '-' en elementos diferentes",
            content: this.formatCombinedTable(combined)
        });

        // Paso 4: Continuar combinando hasta obtener implicantes primos
        const primeImplicants = this.findPrimeImplicants(combined);
        this.steps.push({
            title: "Tabla 4: Otras combinaciones",
            content: this.formatPrimeImplicants(primeImplicants)
        });

        // Paso 5: Identificar implicantes primos esenciales
        const essentials = this.findEssentialImplicants(primeImplicants, minterms);
        this.steps.push({
            title: "Tabla 5: Implicantes primos esenciales",
            content: this.formatEssentialImplicants(essentials)
        });

        // Paso 6: Obtener expresión final
        const expression = this.getFinalExpression(essentials, variableNames);
        
        return {
            expression: expression,
            steps: this.steps
        };
    }

    // Determina el número de variables necesario
    determineNumberOfVariables(terms) {
        if (terms.length === 0) return 0;
        const maxTerm = Math.max(...terms);
        return Math.ceil(Math.log2(maxTerm + 1));
    }

    // Genera la tabla inicial con minitérminos, su representación binaria y conteo de 1's
    generateInitialTable(terms, numVars) {
        return terms.map(term => {
            const binary = term.toString(2).padStart(numVars, '0');
            const ones = binary.split('').filter(bit => bit === '1').length;
            return {
                term: term,
                binary: binary,
                ones: ones,
                used: false
            };
        }).sort((a, b) => a.ones - a.ones);
    }

    // Agrupa los términos por número de 1's
    groupByOnes(table) {
        const groups = {};
        table.forEach(item => {
            if (!groups[item.ones]) {
                groups[item.ones] = [];
            }
            groups[item.ones].push(item);
        });
        return groups;
    }

    // Combina términos adyacentes
    combineTerms(groups) {
        const combinedGroups = {};
        const allGroups = Object.keys(groups).map(Number).sort((a, b) => a - b);
        const usedTerms = new Set();

        for (let i = 0; i < allGroups.length - 1; i++) {
            const currentGroup = groups[allGroups[i]];
            const nextGroup = groups[allGroups[i + 1]];
            const newGroup = [];

            currentGroup.forEach(item1 => {
                nextGroup.forEach(item2 => {
                    const diff = this.findDifference(item1.binary, item2.binary);
                    if (diff.count === 1) {
                        item1.used = true;
                        item2.used = true;
                        usedTerms.add(item1.term);
                        usedTerms.add(item2.term);

                        const newBinary = this.mergeBinary(item1.binary, item2.binary, diff.position);
                        newGroup.push({
                            terms: [item1.term, item2.term],
                            binary: newBinary,
                            ones: item1.ones,
                            used: false
                        });
                    }
                });
            });

            if (newGroup.length > 0) {
                combinedGroups[allGroups[i]] = newGroup;
            }
        }

        // Agregar términos no combinados (implicantes primos potenciales)
        const primeImplicants = [];
        Object.values(groups).forEach(group => {
            group.forEach(item => {
                if (!usedTerms.has(item.term)) {
                    primeImplicants.push({
                        terms: [item.term],
                        binary: item.binary,
                        ones: item.ones,
                        used: false
                    });
                }
            });
        });

        return {
            combined: combinedGroups,
            primes: primeImplicants
        };
    }

    // Encuentra la diferencia entre dos términos binarios
    findDifference(bin1, bin2) {
        let count = 0;
        let position = -1;
        for (let i = 0; i < bin1.length; i++) {
            if (bin1[i] !== bin2[i]) {
                count++;
                position = i;
            }
        }
        return { count, position };
    }

    // Combina dos términos binarios
    mergeBinary(bin1, bin2, diffPos) {
        return bin1.substring(0, diffPos) + '-' + bin1.substring(diffPos + 1);
    }

    // Encuentra todos los implicantes primos
    findPrimeImplicants(combinedResult) {
        let allImplicants = [...combinedResult.primes];
        let currentCombined = combinedResult.combined;
        let hasMoreCombinations = true;

        while (hasMoreCombinations) {
            hasMoreCombinations = false;
            const newCombined = {};
            const usedTerms = new Set();
            const groupKeys = Object.keys(currentCombined).map(Number).sort((a, b) => a - b);

            for (let i = 0; i < groupKeys.length - 1; i++) {
                const currentGroup = currentCombined[groupKeys[i]];
                const nextGroup = currentCombined[groupKeys[i + 1]];
                const newGroup = [];

                currentGroup.forEach(item1 => {
                    nextGroup.forEach(item2 => {
                        const diff = this.findDifference(item1.binary, item2.binary);
                        if (diff.count === 1) {
                            item1.used = true;
                            item2.used = true;
                            usedTerms.add(item1.terms.join(','));
                            usedTerms.add(item2.terms.join(','));

                            const newBinary = this.mergeBinary(item1.binary, item2.binary, diff.position);
                            newGroup.push({
                                terms: [...item1.terms, ...item2.terms],
                                binary: newBinary,
                                ones: item1.ones,
                                used: false
                            });
                            hasMoreCombinations = true;
                        }
                    });
                });

                if (newGroup.length > 0) {
                    newCombined[groupKeys[i]] = newGroup;
                }
            }

            // Agregar términos no combinados
            Object.values(currentCombined).forEach(group => {
                group.forEach(item => {
                    if (!usedTerms.has(item.terms.join(',')) && !item.used) {
                        allImplicants.push(item);
                    }
                });
            });

            currentCombined = newCombined;
        }

        // Eliminar duplicados
        const uniqueImplicants = [];
        const seen = new Set();
        allImplicants.forEach(imp => {
            const key = imp.binary;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueImplicants.push(imp);
            }
        });

        return uniqueImplicants;
    }

    // Encuentra los implicantes esenciales
    findEssentialImplicants(primeImplicants, minterms) {
        const coverage = {};
        minterms.forEach(term => {
            coverage[term] = [];
        });

        primeImplicants.forEach(imp => {
            imp.terms.forEach(term => {
                if (coverage[term] !== undefined) {
                    coverage[term].push(imp);
                }
            });
        });

        const essentials = [];
        const coveredTerms = new Set();

        // Encontrar implicantes esenciales
        Object.entries(coverage).forEach(([term, implicants]) => {
            if (implicants.length === 1 && !coveredTerms.has(term)) {
                const essential = implicants[0];
                if (!essentials.some(e => e.binary === essential.binary)) {
                    essentials.push(essential);
                    essential.terms.forEach(t => coveredTerms.add(t));
                }
            }
        });

        // Cubrir términos restantes
        const remainingTerms = minterms.filter(term => !coveredTerms.has(term));
        const remainingImplicants = primeImplicants.filter(imp => 
            !essentials.some(e => e.binary === imp.binary)
        );

        while (remainingTerms.length > 0) {
            // Encontrar el implicante que cubra más términos restantes
            let bestImplicant = null;
            let maxCoverage = 0;

            remainingImplicants.forEach(imp => {
                const coverageCount = imp.terms.filter(t => remainingTerms.includes(t)).length;
                if (coverageCount > maxCoverage) {
                    maxCoverage = coverageCount;
                    bestImplicant = imp;
                }
            });

            if (bestImplicant) {
                essentials.push(bestImplicant);
                bestImplicant.terms.forEach(t => {
                    const index = remainingTerms.indexOf(t);
                    if (index !== -1) {
                        remainingTerms.splice(index, 1);
                    }
                });

                // Eliminar el implicante de la lista de restantes
                const impIndex = remainingImplicants.findIndex(imp => 
                    imp.binary === bestImplicant.binary
                );
                if (impIndex !== -1) {
                    remainingImplicants.splice(impIndex, 1);
                }
            } else {
                break;
            }
        }

        return essentials;
    }

    // Obtiene la expresión booleana final
    getFinalExpression(essentials, variableNames) {
        return essentials.map(imp => {
            return imp.binary.split('').map((bit, index) => {
                if (bit === '0') return variableNames[index] + "'";
                if (bit === '1') return variableNames[index];
                return '';
            }).join('');
        }).join(' + ');
    }

    // Métodos de formato para las tablas
    formatInitialTable(table) {
        let html = '<table class="qmc-table"><tr><th>Minitérmino</th><th>Binario</th><th>Nº de 1\'s</th></tr>';
        table.forEach(item => {
            html += `<tr><td>${item.term}</td><td>${item.binary}</td><td>${item.ones}</td></tr>`;
        });
        html += '</table>';
        return html;
    }

    formatGroupedTable(groups) {
        let html = '<div class="qmc-groups">';
        Object.entries(groups).forEach(([ones, items]) => {
            html += `<div class="qmc-group"><h4>Grupo con ${ones} unos:</h4><table class="qmc-table"><tr><th>Minitérmino</th><th>Binario</th></tr>`;
            items.forEach(item => {
                html += `<tr><td>${item.term}</td><td>${item.binary}</td></tr>`;
            });
            html += '</table></div>';
        });
        html += '</div>';
        return html;
    }

    formatCombinedTable(result) {
        let html = '<div class="qmc-combined">';
        
        // Mostrar términos combinados
        Object.entries(result.combined).forEach(([ones, items]) => {
            html += `<div class="qmc-group"><h4>Combinaciones del grupo ${ones}:</h4><table class="qmc-table"><tr><th>Términos</th><th>Binario</th></tr>`;
            items.forEach(item => {
                html += `<tr><td>${item.terms.join(', ')}</td><td>${item.binary}</td></tr>`;
            });
            html += '</table></div>';
        });
        
        // Mostrar implicantes primos encontrados
        if (result.primes.length > 0) {
            html += '<div class="qmc-primes"><h4>Implicantes primos encontrados:</h4><table class="qmc-table"><tr><th>Términos</th><th>Binario</th></tr>';
            result.primes.forEach(item => {
                html += `<tr><td>${item.terms.join(', ')}</td><td>${item.binary}</td></tr>`;
            });
            html += '</table></div>';
        }
        
        html += '</div>';
        return html;
    }

    formatPrimeImplicants(implicants) {
        let html = '<table class="qmc-table"><tr><th>Implicante primo</th><th>Representación binaria</th><th>Términos cubiertos</th></tr>';
        implicants.forEach(imp => {
            html += `<tr><td>${imp.binary.replace(/-/g, '·')}</td><td>${imp.binary}</td><td>${imp.terms.join(', ')}</td></tr>`;
        });
        html += '</table>';
        return html;
    }

    formatEssentialImplicants(essentials) {
        let html = '<table class="qmc-table"><tr><th>Implicante esencial</th><th>Representación</th><th>Términos cubiertos</th></tr>';
        essentials.forEach(imp => {
            html += `<tr><td>${imp.binary.replace(/-/g, '·')}</td><td>${imp.binary}</td><td>${imp.terms.join(', ')}</td></tr>`;
        });
        html += '</table>';
        return html;
    }
}

// Uso del algoritmo
const qmc = new QuineMcCluskey();

function minimize() {
    const mintermsInput = document.getElementById('minterms').value;
    const dontCaresInput = document.getElementById('dontcares').value;
    const variablesInput = document.getElementById('variables').value;
    
    const minterms = mintermsInput.split(',').map(Number).filter(n => !isNaN(n));
    const dontCares = dontCaresInput ? dontCaresInput.split(',').map(Number).filter(n => !isNaN(n)) : [];
    const variables = variablesInput ? variablesInput.split(',') : ['A', 'B', 'C', 'D'];
    
    const result = qmc.minimize(minterms, dontCares, variables);
    
    document.getElementById('result').innerHTML = `Expresión minimizada: <strong>${result.expression}</strong>`;
    
    const stepsContainer = document.getElementById('steps');
    stepsContainer.innerHTML = '';
    
    result.steps.forEach(step => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'qmc-step';
        stepDiv.innerHTML = `<h3>${step.title}</h3>${step.content}`;
        stepsContainer.appendChild(stepDiv);
    });
}



function drawCircuit(expression) {
    if (!expression) return "<p>Expresión no disponible</p>";
    
    const container = document.createElement('div');
    container.className = 'circuit';
    
    const terms = expression.split(' + ');
    terms.forEach((term, index) => {
        // Dibujar compuertas AND y NOT para cada término
        const andGate = document.createElement('div');
        andGate.className = 'gate and-gate';
        andGate.textContent = 'AND';
        
        const inputs = document.createElement('div');
        inputs.className = 'inputs';
        
        for (let i = 0; i < term.length; i++) {
            if (term[i] === "'") continue;
            
            const input = document.createElement('div');
            input.className = 'input';
            input.textContent = term[i];
            
            if (term[i+1] === "'") {
                const notGate = document.createElement('div');
                notGate.className = 'not-gate';
                notGate.textContent = 'NOT';
                
                const wrapper = document.createElement('div');
                wrapper.style.display = 'flex';
                wrapper.style.alignItems = 'center';
                wrapper.appendChild(input);
                wrapper.appendChild(notGate);
                inputs.appendChild(wrapper);
                i++; // Saltar el próximo carácter (')
            } else {
                inputs.appendChild(input);
            }
        }
        
        container.appendChild(inputs);
        container.appendChild(andGate);
        
        // Añadir OR entre términos (excepto después del último)
        if (index < terms.length - 1) {
            const orGate = document.createElement('div');
            orGate.className = 'gate or-gate';
            orGate.textContent = 'OR';
            container.appendChild(orGate);
        }
    });
    
    return container;
}



function generateTruthTable(expression, variables) {
    const table = document.createElement('table');
    table.className = 'truth-table';
    
    // Crear encabezados
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Columnas para variables de entrada
    variables.forEach(variable => {
        const th = document.createElement('th');
        th.textContent = variable;
        headerRow.appendChild(th);
    });
    
    // Columna para el resultado
    const thResult = document.createElement('th');
    thResult.textContent = 'Salida';
    headerRow.appendChild(thResult);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Cuerpo de la tabla
    const tbody = document.createElement('tbody');
    const varCount = variables.length;
    const totalCombinations = Math.pow(2, varCount);
    
    for (let i = 0; i < totalCombinations; i++) {
        const row = document.createElement('tr');
        const binary = i.toString(2).padStart(varCount, '0');
        
        // Variables de entrada
        for (let j = 0; j < varCount; j++) {
            const td = document.createElement('td');
            td.textContent = binary[j];
            row.appendChild(td);
        }
        
        // Resultado
        const tdResult = document.createElement('td');
        tdResult.textContent = evaluateExpression(expression, binary, variables) ? '1' : '0';
        row.appendChild(tdResult);
        
        tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    return table;
}

// Función para evaluar la expresión
function evaluateExpression(expr, binaryValues, variables) {
    if (!expr) return false;
    
    const terms = expr.split(' + ');
    const varMap = {};
    
    // Mapear variables a valores binarios
    variables.forEach((v, i) => {
        varMap[v] = binaryValues[i];
    });
    
    for (const term of terms) {
        let termResult = true;
        let i = 0;
        
        while (i < term.length) {
            const currentVar = term[i];
            const isNegated = term[i+1] === "'";
            
            if (varMap[currentVar] === undefined) {
                i++;
                continue;
            }
            
            const expectedValue = isNegated ? '0' : '1';
            termResult = termResult && (varMap[currentVar] === expectedValue);
            
            i += isNegated ? 2 : 1;
        }
        
        if (termResult) return true;
    }
    
    return false;
}