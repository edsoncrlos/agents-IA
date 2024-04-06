import { Environment } from "../Environment";
import { Perception } from "../Perception";
import { AgentActuor } from "../AgentActuor";
import { Actions } from "../Actions";

export class SimpleReflexAgent {
    private agentActuor;
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
        
        const isOdd = posy%2;

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
        if (posx < n && !isOdd) {
            return Actions.right;
        } 

        if (posx > 0 && isOdd) {
            return Actions.left;
        } 

        if (posy < m && (posx != n || posy != m)) {
            return Actions.down
        }

        return Actions.NoOp;
    }

    public actuor(action: Actions) {
        return this.agentActuor.actuors(action);
    }
}
