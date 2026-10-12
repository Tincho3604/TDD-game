import './styles/main.css';
import { Game } from './game/Game.js';
import { Terminal } from './ui/Terminal.js';
import { runDemo } from './tdd/DemoRunner.js';
import { TddEngine } from './tdd/TddEngine.js';

const engine = new TddEngine();
let open = false;
let currentLevelIndex = 0;
let levels = [];

async function loadLevels() {
  try {
    const response = await fetch('/src/data/levels.json');
    const data = await response.json();
    levels = data.levels;
    loadLevel(0);
  } catch (error) {
    console.error('Error loading levels:', error);
  }
}

const game = new Game(document.querySelector('#game'), () => openTerminal());

const terminal = new Terminal({
  onClose: closeTerminal,
  onRun: (source, test) => {
    const result = runDemo(source, test);
    terminal.show(result.message, result.passed);
    updateSecurityLights(result.passed);
    // TODO: conectar engine.recordResult(result) y actualizar indicadores de fase.
    // TODO: cuando engine.phase === 'COMPLETED', asignar game.doorOpen=true.
  }
});

function updateSecurityLights(testPassed) {
  // Controlar las luces en el techo del juego
  if (testPassed) {
    game.setSecurityLightState(false, true, false);
  } else {
    game.setSecurityLightState(true, false, false);
  }
}

async function loadLevel(levelIndex) {
  if (levelIndex < 0 || levelIndex >= levels.length) return;
  currentLevelIndex = levelIndex;
  const level = levels[levelIndex];

  // Leer el archivo de test si existe
  const testFilePath = `tests/${level.functionName}.test.js`;
  let testContent = level.exampleTests.join('\n');
  try {
    const response = await fetch(testFilePath);
    if (response.ok) {
      const fullContent = await response.text();
      // Extraer el contenido del primer describe (incluyendo nested describes)
      const describeStart = fullContent.indexOf('describe(');
      if (describeStart !== -1) {
        // Encontrar el primer describe y extraer desde ahí
        testContent = fullContent.substring(describeStart).trim();
        // Quitar sourceMappingURL si existe
        testContent = testContent.replace(/\/\/# sourceMappingURL=[^\n]*/g, '');
      } else {
        testContent = fullContent;
      }
    }
  } catch (error) {
    console.log('No se pudo cargar el archivo de test, usando ejemplo:', error);
  }

  // Actualizar título del laboratorio
  document.querySelector('.subtitle').textContent = `LABORATORIO ${level.id} · ${level.title.toUpperCase()}`;

  // Actualizar descripción en el panel
  const descriptionElement = document.querySelector('#level-description');
  if (descriptionElement) {
    descriptionElement.textContent = level.description;
  }

  // Actualizar labels de los textareas
  document.querySelector('label[for="test-code"]').textContent = `${level.functionName}.test.js`;
  document.querySelector('label[for="source-code"]').textContent = `${level.functionName}.js`;

  // Actualizar contenido de los textareas
  terminal.setSourceCode(level.starterCode);
  terminal.setTestCode(testContent);
  terminal.clearResult();

  // Resetear sirenas a estado inicial (RED)
  updateSecurityLights(false);
}

async function openTerminal() {
  if (open) return;
  open = true;
  game.keys.clear();
  game.setInputEnabled(false);
  await loadLevel(currentLevelIndex);
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

// Cargar niveles y luego iniciar el juego
loadLevels().then(() => {
  game.start();
});
