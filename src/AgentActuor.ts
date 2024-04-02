import { Actions } from "./Actions";
import { Environment } from "./Environment";
import { Perception } from "./Perception";

export class AgentActuor {
    private environment;
    private perception;

    constructor (environment: Environment, perception: Perception) {
        this.environment = environment;
        this.perception = perception;
    }

    public actuors(action: Actions) {
        const posx = this.perception.posx;
        const posy = this.perception.posy;

        if (action == Actions.right) {
            if (posx < Environment.n-1) {
                this.environment.move(posx, posy, posx+1, posy);
            }
        }
        
        if (action == Actions.left) {
            if (posx > 0) {
                this.environment.move(posx, posy, posx-1, posy);
            }
        }
        
        if (action == Actions.up) {
            if (posy > 0) {
                this.environment.move(posx, posy, posx, posy-1);
            }
        }
        
        if (action == Actions.down) {
            if (this.perception.posy < Environment.m-1) {
                this.environment.move(posx, posy, posx, posy+1);
            }
        }

        if (action == Actions.get) {
            this.environment.bindItem(posx, posy);
        }

        if (action == Actions.drop) {
            this.environment.unBindItem();
        }

        if (action == Actions.NoOp) {
            return false;
        }
        return true
    }
}