import { useContext } from 'react';
import { CyclesContext } from '../../context/CyclesContext';
import { HistoryContainer, HistoryList, Status } from './styles';

export function History() {
  const { cycles } = useContext(CyclesContext);
  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <tr>
            <th>Tarefas</th>
            <th>Duração</th>
            <th>Inícios</th>
            <th>Status</th>
          </tr>
          <tbody>
            {cycles.map((cycle) => (
              <tr>
                <td>{cycle.task}</td>
                <td>{cycle.finishedDate?.toDateString()}</td>
                <td>{cycle.startDate.toDateString()}</td>
                <td>
                  <Status statusColor="green">
                    {cycle.interruptedDate?.toDateString()}
                  </Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
