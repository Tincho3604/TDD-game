export class Player {
  constructor(x = 80, y = 358) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 54;
    this.speed = 230;
    this.facing = 1;
  }

  update(dt, keys) {
    const direction = Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft'));
    if (direction) this.facing = direction;
    this.x += direction * this.speed * dt;
    // TODO TUYO #1: mantener al jugador dentro de los límites del escenario.

    console.log(`X: ${this.x}, Y: ${this.y}`);
    // TODO TUYO #2: implementar colisiones con obstáculos sólidos.
  }

  draw(ctx) {
    ctx.fillStyle = '#6d28d9';
    ctx.fillRect(this.x + 2, this.y + 22, 26, 32);
    ctx.fillStyle = '#f8bd87';
    ctx.fillRect(this.x + 4, this.y + 2, 22, 24);
    ctx.fillStyle = '#20133d';
    ctx.fillRect(this.x + 4, this.y, 22, 7);
    ctx.fillStyle = '#111827';
    ctx.fillRect(this.x + (this.facing > 0 ? 20 : 8), this.y + 13, 4, 4);
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(this.x + 2, this.y + 51, 10, 5);
    ctx.fillRect(this.x + 18, this.y + 51, 10, 5);
  }
}
