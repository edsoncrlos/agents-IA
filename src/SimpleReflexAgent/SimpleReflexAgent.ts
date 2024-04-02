import { Environment } from "../Environment";
import { Perception } from "../Perception";
import { AgentActuor } from "../AgentActuor";
import { Actions } from "../Actions";

export class SimpleReflexAgent {
    private agentActuor;
    private direction = true;
    private isEmpty = true;
    
    constructor(actuor: AgentActuor) {
        this.agentActuor = actuor;
    }

    public agentFunction(perception: Perception): Actions {
        const n = Environment.n-1;
        const m = Environment.m-1;

        const {
            startPosx,
            startPosy,
            posx,
            posy,
            content } = perception;
        
        //drop
        if (posx == startPosx && posy == startPosy && !this.isEmpty) {
            this.isEmpty = !this.isEmpty;
            return Actions.drop;
        }

        // move item to start point
        if (!this.isEmpty) {
            if (posy > 0) {
                return Actions.up;
            }
            if (posx > 0) {
                return Actions.left;
            }
        }

        // get item
        if (posx != startPosx || posy != startPosy && this.isEmpty) {
            if (content != null) {
                this.isEmpty = !this.isEmpty;
                return Actions.get;
            }
        }

        // explore environment
        if (posx < n && this.direction) {
            return Actions.right;
        } 

        if (posx > 0 && !this.direction) {
            return Actions.left;
        } 

        if (posx == n || posx == 0 && (posx != n && posy != m)) {
            this.direction = !this.direction;
            return Actions.down
        }

        return Actions.NoOp;
    }

    public actuor(action: Actions) {
        return this.agentActuor.actuors(action);
    }
}
