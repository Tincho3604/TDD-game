# TDD Quest — Starter educativo

Juego 2D en JavaScript Vanilla + Canvas + Vite + Vitest. Base creada para que completes los desafíos importantes.

## Ejecutar

Requiere Node.js compatible con Vite (preferentemente Node 20.19+ o 22.12+).

```bash
npm install
npm run dev
```

Abrí la URL indicada por Vite. Movete con **A/D** o flechas, acercate a la terminal y presioná **E**. Para salir del editor, presioná **Escape**.

```bash
npm run test:run
npm run build
```

## Qué funciona

- Canvas con laboratorio, personaje, terminal y puerta.
- Movimiento horizontal, proximidad e interacción.
- Panel de código editable y ejecución **simulada y limitada** de tres implementaciones de ejemplo (`return false`, `return true`, `return age >= 18`).
- Tests base y tareas pendientes de Vitest.

## Qué NO funciona todavía (deliberadamente)

- El editor **no ejecuta JavaScript arbitrario**. No se debe presentar como un runner real.
- El ciclo RED/GREEN/REFACTOR no cambia de fase.
- La puerta no se abre y faltan colisiones.
- No hay sandbox seguro para código no confiable.

## Tus misiones, en orden

1. `Player.js`: límites del escenario (primero escribir tests).
2. `TddEngine.js`: transiciones RED/GREEN/REFACTOR (primero tests).
3. `main.js`: integrar los resultados y abrir la puerta.
4. `Game.js`: animar la puerta y colisiones.
5. `DemoRunner.js`: reemplazar simulación por ejecución real en un sandbox aislado y con límites. Esta es la misión avanzada: no usar `eval` o `new Function` en la ventana principal.

## Consejos para la presentación

Si no completás el runner real, explicá que la demo usa un evaluador didáctico restringido. No confundas esa simulación con ejecución real de pruebas. Priorizá una demo estable y un ciclo TDD auténtico en la lógica del juego.
