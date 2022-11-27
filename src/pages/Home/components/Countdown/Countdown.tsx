import { useEffect, useContext } from "react";
import { differenceInSeconds } from "date-fns";

import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./styles";

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    handleSecondsPassed,
  } = useContext(CyclesContext);

  const cycleTotalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let myInterval: number;

    if (activeCycle) {
      myInterval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= cycleTotalSeconds) {
          markCurrentCycleAsFinished();
          handleSecondsPassed(cycleTotalSeconds);
          clearInterval(myInterval);
        } else {
          handleSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [
    activeCycle,
    cycleTotalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    handleSecondsPassed,
  ]);

  const currentSeconds = activeCycle
    ? cycleTotalSeconds - amountSecondsPassed
    : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
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
