// Ejecutor didáctico MUY limitado: interpreta únicamente las dos formas
// explícitas del ejemplo. No evalúa JS arbitrario, no usa eval/Function.
// TODO TUYO #6 (avanzado): sustituir por ejecución real aislada de código y tests.
export function runDemo(source, test) {
  alert(test);
  const match = test.match(/^\s*expect\(canAccess\(\s*(\d+)\s*\)\)\.toBe\(\s*(true|false)\s*\);?\s*$/);
  if (!match) return {kind: 'invalid', passed: false, message: 'Formato admitido en esta demo: expect(canAccess(20)).toBe(true);'};
  const age = Number(match[1]);
  const expected = match[2] === 'true';
  let actual;

  if (/function\s+canAccess\s*\(\s*age\s*\)\s*\{\s*return\s+false\s*;?\s*\}/.test(source)) {
    actual = false;
  } else if (/function\s+canAccess\s*\(\s*age\s*\)\s*\{\s*return\s+true\s*;?\s*\}/.test(source)) {
    actual = true;
  } else if (/function\s+canAccess\s*\(\s*age\s*\)\s*\{\s*return\s+age\s*>=\s*18\s*;?\s*\}/.test(source)) {
    actual = age >= 18;
  } else {
    return {
      kind: 'unsupported',
      passed: false,
      message: 'El prototipo todavía no ejecuta JavaScript libre. Tu misión será implementar el runner real.'
    };
  }
  return {
    kind: 'assertion',
    passed: actual === expected,
    message: `${actual === expected ? 'PASS ✓' : 'FAIL ✗'}  canAccess(${age}) devolvió ${actual}; esperado: ${expected}`
  };
}
