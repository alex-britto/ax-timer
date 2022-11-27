import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ICycleContext {
  activeCycle: number;
  setActiveCycle: Dispatch<SetStateAction<number>>;
}

//cria contexto e define valores
const CyclesContext = createContext({} as ICycleContext);

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext);
  return (
    <>
      <h1>NewCycleForm: {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(2);
        }}
      >
        Alterar ciclo ativo
      </button>
    </>
  );
}

function Countdown() {
  //puxa valores do contexto
  const { activeCycle } = useContext(CyclesContext);
  return <h1>Countdown: {activeCycle}</h1>;
}

export function Home() {
  //dados do contexto sempre precisam estar no componente pai de quem for utilizar
  const [activeCycle, setActiveCycle] = useState(0);
  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      {/* //o provider torna acessíve "globalmente" os valores passadas na prop */}
      value
      <NewCycleForm />
      <Countdown />
    </CyclesContext.Provider>
  );
}
