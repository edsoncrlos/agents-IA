import { Actions } from "../Actions";
import { AgentActuor } from "../AgentActuor";
import { Perception } from "../Perception";
import { Environment, Item } from "../Environment";
import { AgentI } from "../AgentI";

export class UtilityBasedAgent implements AgentI {
    private agentActuor;
    private isEmpty = true;
    
    //world
    private environment: Array<Array<number>>; 
    private itens: Array<Item>;

    private goalx;
    private goaly;
    
    constructor(actuor: AgentActuor, itens: Array<Item>) {
        this.agentActuor = actuor;
        this.environment = new Array(Environment.n);

        for (let i = 0; i < Environment.n; i++) {
            this.environment[i] = new Array(Environment.m).fill(0);    
        }
        this.itens = [...itens];

        this.utility();
        [this.goalx, this.goaly] = this.getPosItem();
    }

    private utility() {
        this.itens = this.itens.filter(x => x.posx != 0 || x.posy != 0)
            .sort((a, b) => (b.score - a.score));
    }

    private getPosItem(): Array<number> {
        if (this.itens.length > 0) {
            const x = this.itens[0].posx;
            const y = this.itens[0].posy;
    
            if (x == 0 && y == 0) {
                this.itens.shift();
                return this.getPosItem();
            }
            return [x, y]
        }
        return [-1, -1];
    }

    public agentFunction(perception: Perception): Actions {
        const {
            startPosx,
            startPosy,
            posx,
            posy,
            content } = perception;
        
        this.environment[posx][posy] = 1;

        //drop
        if (posx == startPosx && posy == startPosy && !this.isEmpty) {
            this.isEmpty = !this.isEmpty;
            [this.goalx, this.goaly] = this.getPosItem();

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
                // get item
                if (this.isEmpty)  {
                    this.isEmpty = !this.isEmpty;
                    return Actions.get;
                }
            }
        }

        // move to goal position
        if (this.goalx != -1 && this.goaly != -1) {
            if (posx < this.goalx) {
                return Actions.right;
            }

            if (posy < this.goaly) {
                return Actions.down
            }
        }

        return Actions.NoOp;
    }

    public actuor(action: Actions) {
        return this.agentActuor.actuors(action);
    }
}
