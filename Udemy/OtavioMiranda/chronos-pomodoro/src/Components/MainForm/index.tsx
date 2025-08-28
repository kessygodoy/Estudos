import { PlayCircleIcon } from "lucide-react";
import Cycles from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

export function MainForm() {
  return (
    <form className="form" action="">
      <div className="formRow">
        <DefaultInput
          type="text"
          id="input"
          labelText="texto"
          placeholder="Digite algo..."
          disabled
        />
      </div>
      <div className="formRow">
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="formRow">
        <Cycles />
      </div>
      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon />} color="green" />
        {/* <DefaultButton icon={<StopCircleIcon />} color="red" /> */}
      </div>
    </form>
  );
}
