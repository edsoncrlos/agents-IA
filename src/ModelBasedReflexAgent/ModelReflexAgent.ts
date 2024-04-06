import { Actions } from "../Actions";
import { AgentActuor } from "../AgentActuor";
import { Perception } from "../Perception";
import { Environment, Item } from "../Environment";

export class ModelReflexAgent {
    private agentActuor;
    private isEmpty = true;
    private goal = [-1, -1];
    
    //world
    private environment: Array<Array<number>>; 
    private Itens = new Array<Item>();
    
    constructor(actuor: AgentActuor) {
        this.agentActuor = actuor;
        this.environment = new Array(Environment.n);

        for (let i = 0; i < Environment.n; i++) {
            this.environment[i] = new Array(Environment.m).fill(0);    
        }
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
        
        this.environment[posx][posy] = 1;
        const [goalx, goaly] = this.goal;
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

        if (posx != startPosx || posy != startPosy) {
            if (content != null) {
                // save pos item
                this.Itens.push(content);

                // get item
                if (this.isEmpty)  {
                    this.goal = this.getBestPos();
                    this.isEmpty = !this.isEmpty;
                    return Actions.get;
                }
            }
        }

        // move to last verify position
        if (goalx != -1 && goaly != -1) {
            if (posx < goalx) {
                return Actions.right;
            }

            if (posy < goaly) {
                return Actions.down
            }

            if (goalx == posx && goaly == posy) {
                this.goal = [-1, -1];
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

    private isVisited(x: number, y: number) {
        const content = this.environment[x][y];
        return (content != 1);
    }

    private getBestPos() {
        
        for (let i = 0; i < Environment.n; i++) {
            const isOdd = i%2;

            if (!isOdd) {
                for (let j = 0; j < Environment.m; j++) {
                    if (this.isVisited(j, i)) {
                        return [j, i];
                    }
                }
            } else {
                for (let j = Environment.m-1; j >= 0; j--) {
                    if (this.isVisited(j, i)) {
                        return [j, i];
                    }
                }
            }   
        }

        return [-1, -1];
    }

    public actuor(action: Actions) {
        return this.agentActuor.actuors(action);
    }
}
