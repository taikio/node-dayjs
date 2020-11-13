const getHorariosDisponiveisUmaHora = require('../index');
const getHorariosDisponiveis = require('../index');

const todosAgendamentos = [
  { tipo: 'Barba', duracao: 15, horario: '08:00' },
  { tipo: 'Sobrancelhas', duracao: 30, horario: '09:00' }
];

const agendamento = {
  tipo: 'Corte',
  duracao: 30,    
};

const horariosUmaHora = getHorariosDisponiveisUmaHora(agendamento, todosAgendamentos);
const horariosDisponiveis = getHorariosDisponiveis(agendamento, todosAgendamentos);

console.log(horariosUmaHora);
console.log(horariosDisponiveis);