import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
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
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="red">Cancelado</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">Em Andamento</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>Duração</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="red">Concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
