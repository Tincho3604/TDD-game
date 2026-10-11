export const accessChallenge = {
  id: 'access-01',
  title: 'Reparar el sistema de acceso',
  description: 'Permitir acceso a mayores o iguales a 18 años.',
  examples: [
    {age: 17, expected: false},
    {age: 18, expected: true},
    {age: 20, expected: true}
  ]
};
// TODO TUYO #5: diseñar validaciones ocultas y casos límite.
