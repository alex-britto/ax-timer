import { useEffect, useState } from "react";
import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";

import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  MinutesAmountInput,
  TaskInput,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  myTask: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(0).max(60),
});

type NewCicleFormDate = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset, formState } =
    useForm<NewCicleFormDate>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        myTask: "",
        minutesAmount: 0,
      },
    });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setAmountSecondsPassed(cycleTotalSeconds);
          clearInterval(myInterval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [activeCycle, cycleTotalSeconds, activeCycleId]);

  function handleCreateNewCylce(data: NewCicleFormDate) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.myTask,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((actualState) => [...actualState, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  }

  function captureErrorMessage() {
    console.log(formState.errors);
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

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

  const myTask = watch("myTask");
  const isSubmitDisabled = !myTask;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCylce)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            autoComplete="off"
            disabled={!!activeCycle}
            {...register("myTask")}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="task">durante</label>
          <MinutesAmountInput
            type="number"
            placeholder="00"
            step={0.1}
            min={0}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
