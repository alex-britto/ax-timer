import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountDownButton,
  MinutesAmountInput,
  TaskInput,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  myTask: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(5).max(60),
});

type NewCicleFormDate = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { register, handleSubmit, watch, reset, formState } =
    useForm<NewCicleFormDate>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        myTask: "",
        minutesAmount: 0,
      },
    });

  function handleCreateNewCylce(data: NewCicleFormDate) {
    console.log(data);
    reset();
  }

  function captureErrorMessage() {
    console.log(formState.errors);
  }

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
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
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

        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
