const starter = 'function canAccess(age) {\n  return false;\n}';

export class Terminal {
  constructor({onRun, onClose}) {
    this.modal = document.querySelector('#modal');
    this.source = document.querySelector('#source-code');
    this.test = document.querySelector('#test-code');
    this.result = document.querySelector('#result');
    this.currentStarterCode = starter;
    this.currentTestCode = 'expect(canAccess(20)).toBe(true);';

    document.querySelector('#close').addEventListener('click', onClose);
    document.querySelector('#run-test').addEventListener('click', () => onRun(this.source.value, this.test.value));
    document.querySelector('#reset-code').addEventListener('click', () => {
      this.source.value = this.currentStarterCode;
      this.test.value = this.currentTestCode;
      this.result.textContent = 'Código restaurado.';
    });

    // Botones de fullscreen/minimize para test code
    document.querySelector('.fullscreen-test').addEventListener('click', () => {
      this.toggleFullscreen('test-code');
    });
    // Botones de fullscreen/minimize para source code
    document.querySelector('.fullscreen-source').addEventListener('click', () => {
      this.toggleFullscreen('source-code');
    });
  }

  toggleFullscreen(textareaId) {
    const container = document.querySelector(`#${textareaId}`).parentElement;
    container.classList.toggle('fullscreen');
    if (container.classList.contains('fullscreen')) {
      // Agregar botón de minimizar visible en fullscreen
      const minimizeBtn = document.createElement('button');
      minimizeBtn.className = 'fullscreen-minimize';
      minimizeBtn.textContent = '− Minimizar';
      minimizeBtn.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 1001; padding: 10px 20px; background: #334155; color: white; border: 1px solid #475569; border-radius: 7px; cursor: pointer;';
      minimizeBtn.onclick = () => {
        container.classList.remove('fullscreen');
        minimizeBtn.remove();
      };
      document.body.appendChild(minimizeBtn);

      // ESC también cierra el fullscreen
      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          container.classList.remove('fullscreen');
          minimizeBtn.remove();
          document.removeEventListener('keydown', escapeHandler);
        }
      };
      document.addEventListener('keydown', escapeHandler);
    }
  }

  toggleMinimize(textareaId) {
    const container = document.querySelector(`#${textareaId}`).parentElement;
    container.classList.toggle('minimized');
  }

  open() {
    this.modal.classList.remove('hidden');
    this.test.focus();
  }

  close() {
    this.modal.classList.add('hidden');
  }

  setSourceCode(code) {
    this.source.value = code;
    this.currentStarterCode = code;
  }

  setTestCode(code) {
    this.test.value = code;
    this.currentTestCode = code;
  }

  clearResult() {
    this.result.textContent = 'Ejecutá el test para ver el resultado.';
    this.result.style.color = '#cbd5e1';
  }

  show(message, success) {
    this.result.textContent = message;
    this.result.style.color = success ? '#86efac' : '#fda4af';
  }
}
