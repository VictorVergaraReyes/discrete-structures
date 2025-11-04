document.addEventListener('DOMContentLoaded', function() {
    // Mapeo de posiciones en el K-map a minterms (AB columnas, CD filas)
    // Orden: AB (A MSB, B LSB), CD (C MSB, D LSB)
    const cellToMinterm = [
        [0,  1,  3,  2],   // Fila CD=00
        [4,  5,  7,  6],   // Fila CD=01
        [12, 13, 15, 14],  // Fila CD=11
        [8,  9,  11, 10]   // Fila CD=10
    ];

    // Variables para almacenar los minterms seleccionados
    let selectedMinterms = [];

    // Obtener todos los checkboxes y agregar event listeners
    const checkboxes = document.querySelectorAll('.kmap input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const row = parseInt(this.getAttribute('data-row'));
            const col = parseInt(this.getAttribute('data-col'));
            const minterm = cellToMinterm[row][col];
            
            if (this.checked) {
                if (!selectedMinterms.includes(minterm)) {
                    selectedMinterms.push(minterm);
                }
            } else {
                selectedMinterms = selectedMinterms.filter(m => m !== minterm);
            }
        });
    });

    // Botón de reinicio
    document.getElementById('reset').addEventListener('click', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        selectedMinterms = [];
        document.getElementById('result').textContent = 'F = 0';
    });

    // Botón de cálculo
    document.getElementById('calculate').addEventListener('click', function() {
        if (selectedMinterms.length === 0) {
            document.getElementById('result').textContent = 'F = 0';
            return;
        }
        
        if (selectedMinterms.length === 16) {
            document.getElementById('result').textContent = 'F = 1';
            return;
        }
        
        const expression = simplifyKmap(selectedMinterms);
        document.getElementById('result').textContent = 'F = ' + expression;
    });

    // Función principal para simplificar el K-map
    function simplifyKmap(minterms) {
        // Ordenar los minterms
        minterms.sort((a, b) => a - b);
        
        // Paso 1: Encontrar todos los implicantes primos
        let primeImplicants = findPrimeImplicants(minterms);
        
        // Paso 2: Seleccionar los implicantes esenciales
        let essentialImplicants = findEssentialImplicants(primeImplicants, minterms);
        
        // Paso 3: Simplificar la expresión
        return generateExpression(essentialImplicants);
    }

    // Encontrar todos los implicantes primos
    function findPrimeImplicants(minterms) {
        let groups = groupMinterms(minterms);
        let primeImplicants = [];
        
        while (true) {
            let newGroups = {};
            let marked = new Set();
            let hasMerged = false;
            
            // Intentar combinar grupos adyacentes
            for (let i = 0; i < Object.keys(groups).length - 1; i++) {
                let bits1 = Object.keys(groups)[i];
                let group1 = groups[bits1];
                
                for (let j = i + 1; j < Object.keys(groups).length; j++) {
                    let bits2 = Object.keys(groups)[j];
                    let group2 = groups[bits2];
                    
                    // Verificar si los grupos difieren en exactamente un bit
                    let diff = 0;
                    let diffPos = -1;
                    for (let k = 0; k < bits1.length; k++) {
                        if (bits1[k] !== bits2[k]) {
                            diff++;
                            diffPos = k;
                        }
                    }
                    
                    if (diff === 1) {
                        hasMerged = true;
                        // Crear nuevo grupo combinado
                        let newBits = bits1.substring(0, diffPos) + '-' + bits1.substring(diffPos + 1);
                        
                        if (!newGroups[newBits]) {
                            newGroups[newBits] = new Set();
                        }
                        
                        // Combinar minterms de ambos grupos
                        for (let m of group1) {
                            newGroups[newBits].add(m);
                            marked.add(`${bits1}-${m}`);
                        }
                        for (let m of group2) {
                            newGroups[newBits].add(m);
                            marked.add(`${bits2}-${m}`);
                        }
                    }
                }
            }
            
            // Agregar grupos no marcados como implicantes primos
            for (let bits in groups) {
                for (let m of groups[bits]) {
                    if (!marked.has(`${bits}-${m}`)) {
                        primeImplicants.push({
                            bits: bits,
                            minterms: new Set([m]),
                            coveredMinterms: [m]
                        });
                    }
                }
            }
            
            if (!hasMerged) break;
            
            groups = newGroups;
        }
        
        // Agregar los últimos grupos como implicantes primos
        for (let bits in groups) {
            primeImplicants.push({
                bits: bits,
                minterms: groups[bits],
                coveredMinterms: Array.from(groups[bits])
            });
        }
        
        return primeImplicants;
    }

    // Agrupar minterms por número de 1s en su representación binaria
    function groupMinterms(minterms) {
        let groups = {};
        
        for (let m of minterms) {
            let binary = m.toString(2).padStart(4, '0');
            let ones = binary.split('').filter(b => b === '1').length;
            
            if (!groups[ones]) {
                groups[ones] = [];
            }
            
            groups[ones].push({
                minterm: m,
                binary: binary
            });
        }
        
        // Convertir a formato esperado por el algoritmo
        let result = {};
        for (let ones in groups) {
            for (let item of groups[ones]) {
                result[item.binary] = new Set([item.minterm]);
            }
        }
        
        return result;
    }

    // Encontrar implicantes esenciales
    function findEssentialImplicants(primeImplicants, minterms) {
        let essential = [];
        let uncoveredMinterms = new Set(minterms);
        
        // Crear mapa de cobertura
        let coverage = {};
        for (let m of minterms) {
            coverage[m] = [];
        }
        
        for (let pi of primeImplicants) {
            for (let m of pi.coveredMinterms) {
                coverage[m].push(pi);
            }
        }
        
        // Encontrar implicantes esenciales
        while (uncoveredMinterms.size > 0) {
            let essentialFound = false;
            
            // Buscar minterms cubiertos por un solo implicante
            for (let m of Array.from(uncoveredMinterms)) {
                if (coverage[m].length === 1) {
                    let essentialPi = coverage[m][0];
                    essential.push(essentialPi);
                    essentialFound = true;
                    
                    // Eliminar minterms cubiertos por este implicante
                    for (let coveredM of essentialPi.coveredMinterms) {
                        uncoveredMinterms.delete(coveredM);
                        
                        // Eliminar este implicante de otros minterms
                        for (let otherM of coverage[coveredM]) {
                            if (otherM !== essentialPi) {
                                let index = otherM.coveredMinterms.indexOf(coveredM);
                                if (index > -1) {
                                    otherM.coveredMinterms.splice(index, 1);
                                }
                            }
                        }
                    }
                    break;
                }
            }
            
            // Si no hay esenciales, seleccionar el implicante que cubra más minterms
            if (!essentialFound && uncoveredMinterms.size > 0) {
                let maxCoverage = 0;
                let bestPi = null;
                
                for (let pi of primeImplicants) {
                    let currentCoverage = pi.coveredMinterms.filter(m => uncoveredMinterms.has(m)).length;
                    if (currentCoverage > maxCoverage) {
                        maxCoverage = currentCoverage;
                        bestPi = pi;
                    }
                }
                
                if (bestPi) {
                    essential.push(bestPi);
                    for (let m of bestPi.coveredMinterms) {
                        uncoveredMinterms.delete(m);
                    }
                }
            }
        }
        
        return essential;
    }

    // Generar expresión booleana a partir de implicantes
    function generateExpression(implicants) {
    if (implicants.length === 0) return '0';
    
    const getVar = (bit, index) => {
        const vars = ['C', 'D', 'A', 'B']; // A,B columnas; C,D filas
        return bit === '0' ? vars[index] + "'" : bit === '1' ? vars[index] : '';
    };

    let terms = [];
    for (let pi of implicants) {
        let termParts = [];
        const bits = pi.bits;
        
        // Variables de COLUMNAS (A,B)
        termParts.push(getVar(bits[0], 0)); // A
        termParts.push(getVar(bits[1], 1)); // B
        
        // Variables de FILAS (C,D)
        termParts.push(getVar(bits[2], 2)); // C
        termParts.push(getVar(bits[3], 3)); // D
        
        let term = termParts.filter(Boolean).join('');
        if (term) terms.push(term);
    }

    if (terms.length === 0) return '1';
    return terms.join(' + ');
}

    function groupMinterms(minterms) {
        let groups = {};
        
        for (let m of minterms) {
            const a = (m >> 3) & 1;
            const b = (m >> 2) & 1;
            const c = (m >> 1) & 1;
            const d = m & 1;
            const binary = `${a}${b}${c}${d}`;
            const ones = binary.split('1').length - 1;
            
            if (!groups[ones]) groups[ones] = [];
            groups[ones].push({minterm: m, binary: binary});
        }
        
        let result = {};
        for (let ones in groups) {
            for (let item of groups[ones]) {
                result[item.binary] = new Set([item.minterm]);
            }
        }
        return result;
    }
    function groupMinterms(minterms) {
        let groups = {};
        
        for (let m of minterms) {
            // Convertir minterm a binario de 4 bits en orden A,B,C,D
            let a = (m & 8) ? 1 : 0; // A es el bit más significativo (8)
            let b = (m & 4) ? 1 : 0;  // B (4)
            let c = (m & 2) ? 1 : 0;  // C (2)
            let d = (m & 1) ? 1 : 0;  // D es el bit menos significativo (1)
            
            let binary = '' + a + b + c + d;
            let ones = binary.split('').filter(b => b === '1').length;
            
            if (!groups[ones]) {
                groups[ones] = [];
            }
            
            groups[ones].push({
                minterm: m,
                binary: binary
            });
        }
        
        // Convertir a formato esperado por el algoritmo
        let result = {};
        for (let ones in groups) {
            for (let item of groups[ones]) {
                result[item.binary] = new Set([item.minterm]);
            }
        }
        
        return result;
    }
});