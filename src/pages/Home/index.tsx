import { Play } from 'phosphor-react';
import { useState } from 'react';
import { CountdownContainer, Separator } from './Components/Countdown/styles';
import {
  FormContainer,
  MinutesAmountInput,
  TaskInput,
} from './Components/NewCycleForm/styles';

import {
  HomeContainer,
  BaseCountdownButton,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';

// controlled: é quando mantemos em tempo real a informação  do input do usuário guardada no estado

// uncontrolled:
export function Home() {
  const [task, setTask] = useState('');

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="De um nome para seu projeto"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={!task} type="submit">
          <Play size="24" />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
