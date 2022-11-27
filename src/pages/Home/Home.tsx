import { useContext } from "react";
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { NewCycleForm } from "./components/NewCycleForm/NewCycleForm";
import { CountDown } from "./components/Countdown/Countdown";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  myTask: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(0).max(60),
});

type NewCicleFormDate = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCylce, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCicleFormDate>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      myTask: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset, formState } = newCycleForm;

  function handleCreateNewCycle(data: NewCicleFormDate) {
    createNewCylce(data);
    reset();
    console.log("chamou");
  }

  function captureErrorMessage() {
    console.log(formState.errors);
  }

  const myTask = watch("myTask");
  const isSubmitDisabled = !myTask;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
