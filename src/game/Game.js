import { Player } from './Player.js';

export class Game {
  constructor(canvas, onTerminal) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.player = new Player();
    this.keys = new Set();
    this.onTerminal = onTerminal;
    this.terminal = {x: 370, y: 320, width: 80, height: 92};
    this.door = {x: 810, y: 260, width: 76, height: 152};
    this.doorOpen = false;
    this.last = 0;
    this.running = false;
    this.boundKeyDown = e => this.keyDown(e);
    this.boundKeyUp = e => this.keys.delete(e.key.toLowerCase());
    this.boundBlur = () => this.keys.clear();
  }

  start() {
    if (this.running) return;
    this.running = true;
    window.addEventListener('keydown', this.boundKeyDown);
    window.addEventListener('keyup', this.boundKeyUp);
    window.addEventListener('blur', this.boundBlur);
    requestAnimationFrame(t => this.frame(t));
  }

  stop() {
    this.running = false;
    window.removeEventListener('keydown', this.boundKeyDown);
    window.removeEventListener('keyup', this.boundKeyUp);
    window.removeEventListener('blur', this.boundBlur);
  }

  keyDown(e) {
    const key = e.key.toLowerCase();
    if (['arrowleft', 'arrowright', ' '].includes(key)) e.preventDefault();
    this.keys.add(key);
    if (key === 'e' && this.nearTerminal()) this.onTerminal();
  }

  nearTerminal() {
    const center = this.player.x + this.player.width / 2;
    return Math.abs(center - (this.terminal.x + this.terminal.width / 2)) < 105;
  }

  frame(t) {
    if (!this.running) return;
    const dt = this.last ? Math.min((t - this.last) / 1000, .05) : 0;
    this.last = t;
    this.player.update(dt, this.keys);
    this.draw();
    requestAnimationFrame(t2 => this.frame(t2));
  }

  draw() {
    const c = this.ctx;
    c.clearRect(0, 0, 960, 480);
    const bg = c.createLinearGradient(0, 0, 0, 480);
    bg.addColorStop(0, '#101b37');
    bg.addColorStop(1, '#1b2842');
    c.fillStyle = bg;
    c.fillRect(0, 0, 960, 480);
    c.strokeStyle = '#283a58';
    c.lineWidth = 2;
    for (let x = 0; x < 960; x += 80) {
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x, 410);
      c.stroke();
    }
    for (let y = 45; y < 410; y += 80) {
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(960, y);
      c.stroke();
    }
    c.fillStyle = '#334155';
    c.fillRect(0, 412, 960, 68);
    c.fillStyle = '#64748b';
    c.fillRect(0, 410, 960, 5);
    for (let x = 0; x < 960; x += 55) {
      c.fillStyle = '#475569';
      c.fillRect(x, 440, 40, 3);
    }
    this.drawTerminal(c);
    this.drawDoor(c);
    this.player.draw(c);
    c.fillStyle = '#e2e8f0';
    c.font = 'bold 16px monospace';
    c.fillText('LAB 01  //  ACCESO RESTRINGIDO', 24, 37);
    if (this.nearTerminal()) {
      c.fillStyle = '#e0f2fe';
      c.fillRect(352, 269, 115, 31);
      c.fillStyle = '#0f172a';
      c.font = 'bold 13px monospace';
      c.fillText('[E] TERMINAL', 360, 290);
    }
  }

  drawTerminal(c) {
    const t = this.terminal;
    c.fillStyle = '#475569';
    c.fillRect(t.x, t.y, t.width, t.height);
    c.fillStyle = '#020617';
    c.fillRect(t.x + 7, t.y + 8, t.width - 14, 53);
    c.strokeStyle = '#38bdf8';
    c.lineWidth = 3;
    c.strokeRect(t.x + 7, t.y + 8, t.width - 14, 53);
    c.fillStyle = '#7dd3fc';
    c.font = 'bold 16px monospace';
    c.fillText('TDD', t.x + 23, t.y + 41);
    c.fillStyle = '#64748b';
    c.fillRect(t.x + 32, t.y + 61, 16, 31);
  }

  drawDoor(c) {
    const d = this.door;
    c.fillStyle = '#64748b';
    c.fillRect(d.x, d.y, d.width, d.height);
    c.fillStyle = this.doorOpen ? '#0b2c29' : '#1e293b';
    c.fillRect(d.x + 7, d.y + 7, d.width - 14, d.height - 7);
    c.strokeStyle = this.doorOpen ? '#4ade80' : '#fb7185';
    c.lineWidth = 4;
    c.strokeRect(d.x + 7, d.y + 7, d.width - 14, d.height - 7);
    c.fillStyle = this.doorOpen ? '#4ade80' : '#fda4af';
    c.font = 'bold 13px monospace';
    c.fillText(this.doorOpen ? 'OPEN' : 'LOCKED', d.x + 12, d.y - 14);
    if (!this.doorOpen) {
      c.fillStyle = '#f87171';
      c.fillRect(d.x + 53, d.y + 76, 5, 9);
    }
    /* TODO TUYO #4: animar la puerta al completar TDD. */
  }
}
