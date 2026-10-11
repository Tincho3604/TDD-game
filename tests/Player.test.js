import {describe, it, expect} from 'vitest';
import {Player} from '../src/game/Player.js';

describe('Player', () => {
  it('avanza a la derecha', () => {
    const p = new Player(100, 100);
    p.update(.1, new Set(['d']));
    expect(p.x).toBe(123);
  });
  it.todo('no atraviesa el límite izquierdo del escenario');
  it.todo('no atraviesa el límite derecho del escenario');
  it.todo('colisiona con obstáculos sólidos');
});
