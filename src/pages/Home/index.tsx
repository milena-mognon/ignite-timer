import { HandPalm, Play } from 'phosphor-react';
import { useContext } from 'react';

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { NewCycleForm } from './Components/NewCycleForm';
import { Countdown } from './Components/Countdown';
import { CyclesContext } from '../../context/CyclesContext';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

// consigo a tipagem usando a validação do formulário feita com zod
type NewCicleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, formState, reset } = newCycleForm;

  // console.log(formState.errors);  consegue ver os erros

  function handleCreateNewCycle(data: NewCicleFormData) {
    createNewCycle(data);
    reset(); // volta para os valores default
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          {/* Contexto do React Hook Form  */}
          <NewCycleForm />
        </FormProvider>

        <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle}>
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
