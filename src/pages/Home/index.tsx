import { HandPalm, Play } from 'phosphor-react';
import { createContext, useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { string } from 'zod/lib';
import { differenceInSeconds } from 'date-fns';
import { NewCycleForm } from './Components/NewCycleForm';
import { Countdown } from './Components/Countdown';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

// consigo a tipagem usando a validação do formulário feita com zod
type NewCicleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        }
        return cycle;
      })
    );
  }

  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCicleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    });

  function handleCreateNewCycle(data: NewCicleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]); // state é o estado atual de cycles, antes do set
    setActiveCycleId(newCycle.id);
    reset(); // volta para os valores default
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }
        return cycle;
      })
    );
    setActiveCycleId(null);
  }

  // console.log(formState.errors);  consegue ver os erros

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          <NewCycleForm />
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle}>
            <HandPalm size="24" />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size="24" />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
