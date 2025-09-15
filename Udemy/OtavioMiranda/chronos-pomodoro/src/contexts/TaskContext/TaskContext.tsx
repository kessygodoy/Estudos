import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";
import type { TaskActionModel } from "./taskActions";

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};


const initialContextValue = {
    state: initialTaskState,
    dispatch: () => {},
}

// criação do contexto
// Contexto precisa de um valor inicial
export const TaskContext = createContext<TaskContextProps>(initialContextValue);

