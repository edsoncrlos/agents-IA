import { Perception } from "./Perception";
import { Actions } from "./Actions";

export interface AgentI {
    agentFunction(perception: Perception): Actions;
    actuor(action: Actions): boolean;
}