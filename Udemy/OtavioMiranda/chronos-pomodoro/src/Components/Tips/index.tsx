import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
      const { state } = useTaskContext();
        const nextCycle = getNextCycle(state.currentCycle);
        const nextCycleType = getNextCycleType(nextCycle);
      
    
      //Tips
  const tipsForWhenActiveTask ={
    workTime: <span>Foque por {state.config.workTime}mins</span>,
    shortBreakTime: <span>Descanse por {state.config.shortBreakTime}mins</span>,
    longBreakTime: <span>Descanso longo.</span>,
  }
  const tipsForNoActiveTask ={
    workTime: <span>Próximo cliclo é de {state.config.workTime}mins</span>,
    shortBreakTime: <span>Próximo cliclo é de {state.config.shortBreakTime}mins</span>,
    longBreakTime: <span>Próximo cliclo será longo.</span>,
  }

  return (
    <>
      {state.activeTaskId && tipsForWhenActiveTask[state.activeTaskId.type]}
      {!state.activeTaskId && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
