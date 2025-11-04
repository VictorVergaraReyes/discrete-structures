document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calculate').addEventListener('click', function () {
    let minterms = [];

    for (let i = 0; i < 16; i++) {
      let cell = document.getElementById('cell' + String(i).padStart(2, '0'));
      if (cell && cell.checked) {
        minterms.push(i);
      }
    }

    if (minterms.length === 0) {
      document.getElementById('result').innerText = 'No se seleccionó ningún minitérmino.';
      return;
    }

    let result = simplifyMinterms(minterms);
    document.getElementById('result').innerText = 'Expresión Booleana Simplificada: ' + result;
  });

  function simplifyMinterms(minterms) {
    // Mapa de Karnaugh 4x4 (Gray code)
    let kmap = Array(4).fill(null).map(() => Array(4).fill(0));
    let used = Array(4).fill(null).map(() => Array(4).fill(false));

    function binToGray(n) {
      return n ^ (n >> 1);
    }

    // Llenar el K-map con 1 en los minterms
    for (let m of minterms) {
      let A = (m >> 3) & 1;
      let B = (m >> 2) & 1;
      let C = (m >> 1) & 1;
      let D = m & 1;

      let row = binToGray((A << 1) | B);
      let col = binToGray((C << 1) | D);
      kmap[row][col] = 1;
    }

    // Buscar grupos (orden: 8,4,2,1)
    let groups = [];
    let covered = Array(4).fill(null).map(() => Array(4).fill(false));

    const sizes = [8, 4, 2, 1];

    for (let size of sizes) {
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          let factors = getFactors(size);

          for (let [h, w] of factors) {
            if (checkGroup(kmap, covered, r, c, h, w)) {
              groups.push({ r, c, h, w });
              markCovered(covered, r, c, h, w);
            }
          }
        }
      }
    }

    // Generar expresión
    return generateExpression(groups);
  }

  function getFactors(size) {
    let factors = [];
    for (let i = 1; i <= size; i++) {
      if (size % i === 0 && isPowerOfTwo(i) && isPowerOfTwo(size / i)) {
        factors.push([i, size / i]);
      }
    }
    return factors;
  }

  function isPowerOfTwo(x) {
    return x && !(x & (x - 1));
  }

  function checkGroup(kmap, covered, r, c, h, w) {
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        let rr = (r + i) % 4;
        let cc = (c + j) % 4;

        if (kmap[rr][cc] !== 1 || covered[rr][cc]) {
          return false;
        }
      }
    }
    return true;
  }

  function markCovered(covered, r, c, h, w) {
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        let rr = (r + i) % 4;
        let cc = (c + j) % 4;
        covered[rr][cc] = true;
      }
    }
  }

  function generateExpression(groups) {
    let terms = [];

    // Decodificar fila y columna Gray a binario
    function grayToBin(g) {
      return g ^ (g >> 1);
    }

    function decodeRow(row) {
      const grayToBinMap = { 0: 0, 1: 1, 3: 3, 2: 2 };
      let bin = grayToBinMap[row];
      return [(bin >> 1) & 1, bin & 1]; // A, B
    }

    function decodeCol(col) {
      const grayToBinMap = { 0: 0, 1: 1, 3: 3, 2: 2 };
      let bin = grayToBinMap[col];
      return [(bin >> 1) & 1, bin & 1]; // C, D
    }

    for (let { r, c, h, w } of groups) {
      let aBits = [], bBits = [], cBits = [], dBits = [];

      for (let i = 0; i < h; i++) {
        let row = (r + i) % 4;
        let [a, b] = decodeRow(row);
        aBits.push(a);
        bBits.push(b);
      }

      for (let j = 0; j < w; j++) {
        let col = (c + j) % 4;
        let [cc, d] = decodeCol(col);
        cBits.push(cc);
        dBits.push(d);
      }

      function isConstant(bits) {
        return bits.every(v => v === bits[0]) ? bits[0] : null;
      }

      let term = '';

      const a = isConstant(aBits);
      const b = isConstant(bBits);
      const cc = isConstant(cBits);
      const d = isConstant(dBits);

      if (a !== null) term += a ? 'A' : "A'";
      if (b !== null) term += b ? 'B' : "B'";
      if (cc !== null) term += cc ? 'C' : "C'";
      if (d !== null) term += d ? 'D' : "D'";

      if (term === '') term = '1'; // grupo cubre todo (todo es 1)

      terms.push(term);
    }

    return terms.join(' + ');
  }
});
