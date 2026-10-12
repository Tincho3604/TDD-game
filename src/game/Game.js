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
    this.securityLights = {
      red: {active: false, x: 830, y: 30},
      green: {active: false, x: 870, y: 30},
      blue: {active: false, x: 910, y: 30}
    };
    this.lightPulse = 0;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.inputEnabled = true;
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

  setInputEnabled(enabled) {
    this.inputEnabled = enabled;
  }

  setSecurityLightState(red, green, blue) {
    this.securityLights.red.active = red;
    this.securityLights.green.active = green;
    this.securityLights.blue.active = blue;
  }

  keyDown(e) {
    if (!this.inputEnabled) return;
    const key = e.key.toLowerCase();
    if (['arrowleft', 'arrowright', ' '].includes(key)) e.preventDefault();
    this.keys.add(key);
    if (key === 'e' && this.nearTerminal()) {
      e.preventDefault();
      this.onTerminal();
    }
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
    this.lightPulse = (this.lightPulse + dt * 3) % (Math.PI * 2);
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
    this.drawSecurityLights(c);
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

  drawSecurityLights(c) {
    const lights = this.securityLights;
    const pulse = Math.sin(this.lightPulse) * 0.3 + 0.7;

    // Dibujar cada luz
    this.drawLight(c, lights.red, '#ef4444', pulse);
    this.drawLight(c, lights.green, '#22c55e', pulse);
    this.drawLight(c, lights.blue, '#3b82f6', pulse);
  }

  drawLight(c, light, color, pulse) {
    // Base de la luz
    c.fillStyle = '#475569';
    c.fillRect(light.x - 15, light.y - 10, 30, 15);

    // Cúpula de la luz
    if (light.active) {
      // Glow effect
      const gradient = c.createRadialGradient(light.x, light.y + 5, 0, light.x, light.y + 5, 25);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color + '80');
      gradient.addColorStop(1, 'transparent');
      c.fillStyle = gradient;
      c.fillRect(light.x - 25, light.y - 15, 50, 40);

      // Luz activa con pulso
      c.fillStyle = color;
      c.globalAlpha = pulse;
      c.beginPath();
      c.arc(light.x, light.y + 5, 12, 0, Math.PI * 2);
      c.fill();
      c.globalAlpha = 1;

      // Brillo
      c.fillStyle = '#ffffff';
      c.globalAlpha = pulse * 0.5;
      c.beginPath();
      c.arc(light.x - 3, light.y + 2, 4, 0, Math.PI * 2);
      c.fill();
      c.globalAlpha = 1;
    } else {
      // Luz apagada
      c.fillStyle = '#1e293b';
      c.beginPath();
      c.arc(light.x, light.y + 5, 12, 0, Math.PI * 2);
      c.fill();

      // Reflection apagado
      c.fillStyle = '#334155';
      c.globalAlpha = 0.3;
      c.beginPath();
      c.arc(light.x - 3, light.y + 2, 4, 0, Math.PI * 2);
      c.fill();
      c.globalAlpha = 1;
    }

    // Marco de la cúpula
    c.strokeStyle = '#64748b';
    c.lineWidth = 2;
    c.beginPath();
    c.arc(light.x, light.y + 5, 12, 0, Math.PI * 2);
    c.stroke();
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
