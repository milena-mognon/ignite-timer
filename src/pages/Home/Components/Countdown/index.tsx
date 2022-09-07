import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { CyclesContext } from '../..';
import { CountdownContainer, Separator } from './styles';

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CyclesContext);

  const [amountSecondsPasses, setAmountSecondsPassed] = useState(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPasses : 0;

  const minuteAmount = Math.floor(currentSeconds / 60);

  const secondsAmount = currentSeconds % 60; // % operador de resto

  const minutes = String(minuteAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      setAmountSecondsPassed(0);
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`;
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
