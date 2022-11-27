import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "../../Home";

import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
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
  );
}
