const getHorariosDisponiveis = require('../index');

const todosAgendamentos = [
  { tipo: 'Barba', duracao: 70, horario: '08:00' },
  // { tipo: 'Sobrancelhas', duracao: 30, horario: '09:00' }
];

const agendamento = {
  tipo: 'Corte',
  duracao: 30,    
};

const horariosDisponiveis = getHorariosDisponiveis(agendamento, todosAgendamentos);

console.log(horariosDisponiveis);