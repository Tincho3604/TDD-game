const starter = 'function canAccess(age) {\n  return false;\n}';

export class Terminal {
  constructor({onRun, onClose}) {
    this.modal = document.querySelector('#modal');
    this.source = document.querySelector('#source-code');
    this.test = document.querySelector('#test-code');
    this.result = document.querySelector('#result');
    document.querySelector('#close').addEventListener('click', onClose);
    document.querySelector('#run-test').addEventListener('click', () => onRun(this.source.value, this.test.value));
    document.querySelector('#reset-code').addEventListener('click', () => {
      this.source.value = starter;
      this.test.value = 'expect(canAccess(20)).toBe(true);';
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

  show(message, success) {
    this.result.textContent = message;
    this.result.style.color = success ? '#86efac' : '#fda4af';
  }
}
