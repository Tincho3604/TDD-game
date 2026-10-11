export const PHASES=Object.freeze({RED:'RED',GREEN:'GREEN',REFACTOR:'REFACTOR',COMPLETED:'COMPLETED'});
export class TddEngine {
  constructor(){this.phase=PHASES.RED;}
  recordResult(result){
    // TODO TUYO #3: construir la máquina de estados con TDD.
    // RED -> GREEN cuando falla un test válido por el comportamiento esperado.
    // GREEN -> REFACTOR cuando pasan tests del jugador y casos de validación.
    // REFACTOR -> COMPLETED cuando siguen pasando tras revisar/refactorizar.
    // Errores de sintaxis, timeout o tests inválidos NO avanzan.
    return this.phase;
  }
  reset(){this.phase=PHASES.RED;}
}
