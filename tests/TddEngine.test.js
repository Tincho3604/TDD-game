import {describe, it, expect} from 'vitest';
import {TddEngine, PHASES} from '../src/tdd/TddEngine.js';

describe('TddEngine', () => {
  it('empieza en RED', () => {
    expect(new TddEngine().phase).toBe(PHASES.RED);
  });
  it.todo('pasa a GREEN tras un test válido que falla como se esperaba');
  it.todo('permanece en RED ante errores de sintaxis');
  it.todo('pasa a REFACTOR cuando todos los tests y validaciones pasan');
  it.todo('completa el ciclo conservando todos los tests en verde');
});
