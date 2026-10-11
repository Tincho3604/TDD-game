import './styles/main.css';
import {Game} from './game/Game.js';
import {Terminal} from './ui/Terminal.js';
import {runDemo} from './tdd/DemoRunner.js';
import {TddEngine} from './tdd/TddEngine.js';

const engine = new TddEngine();
let open = false;

const game = new Game(document.querySelector('#game'), () => openTerminal());

const terminal = new Terminal({
  onClose: closeTerminal,
  onRun: (source, test) => {
    const result = runDemo(source, test);
    terminal.show(result.message, result.passed);
    // TODO: conectar engine.recordResult(result) y actualizar indicadores de fase.
    // TODO: cuando engine.phase === 'COMPLETED', asignar game.doorOpen=true.
  }
});

function openTerminal() {
  if (open) return;
  open = true;
  game.keys.clear();
  game.setInputEnabled(false);
  terminal.open();
}

function closeTerminal() {
  open = false;
  terminal.close();
  game.keys.clear();
  game.setInputEnabled(true);
}

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && open) closeTerminal();
});

game.start();
