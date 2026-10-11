import {it, expect} from 'vitest';
import {runDemo} from '../src/tdd/DemoRunner.js';

it('informa fallo de la función inicial', () => {
  const r = runDemo('function canAccess(age) { return false; }', 'expect(canAccess(20)).toBe(true);');
  expect(r.kind).toBe('assertion');
  expect(r.passed).toBe(false);
});
