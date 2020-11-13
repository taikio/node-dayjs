const dayjs = require("dayjs");
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00'];


module.exports = getHorariosDisponiveisUmaHora = (agendamento, todosAgendamentos) => {
  const horariosDisponiveis = [];

  for ([index, horario] of horarios.entries()){

    /* busca todos os agendamentos para o horario atual, por exemplo o horário das 8:00 */
    const agendamentosHorarioAtual = todosAgendamentos.filter((a) => a.horario === horario);  
  
    if (agendamentosHorarioAtual.length > 0) {
      /* soma o tempo de duração de todos os agendamentos encontrados */
      const tempoTotalHorarios = agendamentosHorarioAtual.map((h) => h.duracao).reduce((total, tempo) => total + tempo, 0);
  
      /* verifica se a duração do agendamento a ser feito ainda cabe naquele horário (período de 1 hora) */
      if ((tempoTotalHorarios + agendamento.duracao) < 60) {
        const [hora, minutos] = horario.split(':');
  
        /* cria uma data com o horário atual, ex. 11/11/2020 08:00 */
        let dataHora = dayjs().hour(hora).minute(minutos);
        
        /* adiciona o tempo total em minutos de todos os agendamentos para indicar a hora exata que o próximo agendamento pode começar */
        dataHora = dataHora.add(tempoTotalHorarios, 'minute');
        
        horariosDisponiveis.push(dataHora.format('HH:mm'));
      }
    } else {
      horariosDisponiveis.push(horario);
    }
  };

  return horariosDisponiveis;
};

module.exports = getHorariosDisponiveis = (agendamento, todosAgendamentos) => {
  const horariosDisponiveis = [];

  // agendamento = 10;
  // novo agendamento = 70;
  for ([index, horario] of horarios.entries()) {
    const agendamentosHorarioAtual = todosAgendamentos.filter((a) => a.horario === horario);
    const agendamentosHorarioAnterior = index > 0
    ? todosAgendamentos.filter((a) => a.horario === horarios[index - 1])
    : [];
    console.log('agendamentos anterior', agendamentosHorarioAnterior);

    if (agendamentosHorarioAtual.length > 0 || agendamentosHorarioAnterior.length > 0) {
      const tempoTotalHorarioAtual = agendamentosHorarioAtual.map((h) => h.duracao).reduce((total, tempo) => total + tempo, 0);
      const tempoTotalHorarioAnterior = agendamentosHorarioAnterior.length > 0
      ? agendamentosHorarioAnterior.map((h) => h.duracao).reduce((total, tempo) => total + tempo, 0)
      : 0;      

      let diff = 0;
      if (tempoTotalHorarioAnterior > 60) {
        diff = tempoTotalHorarioAnterior - 60;
      }
      console.log('total anterior', tempoTotalHorarioAnterior);
      console.log('diff', diff);

      if ((tempoTotalHorarioAtual + diff + agendamento.duracao) < 60) {
        const [hora, minutos] = horario.split(':');
  
        /* cria uma data com o horário atual, ex. 11/11/2020 08:00 */
        let dataHora = dayjs().hour(hora).minute(minutos);
        
        /* adiciona o tempo total em minutos de todos os agendamentos para indicar a hora exata que o próximo agendamento pode começar */
        dataHora = dataHora.add((tempoTotalHorarioAtual + diff), 'minute');
        
        horariosDisponiveis.push(dataHora.format('HH:mm'));
      }

    } else {
      horariosDisponiveis.push(horario);
    }
  }

  return horariosDisponiveis;
}


