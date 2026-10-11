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
