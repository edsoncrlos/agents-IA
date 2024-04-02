import { Environment } from "./Environment";
import { Item } from "./Environment";

export class Perception {
    private environment;
    startPosx = 0;
    startPosy = 0;
    posx = 0;
    posy = 0;
    content: Item | null = null;

    constructor(environment: Environment) {
        this.environment = environment;
        this.getContent();
    }
    
    private getContent() {
        this.content = this.environment.getContent(this.posx, this.posy);
    }

    private updatePos () {
        const pos = this.environment.getPos();
        this.posx = pos[0];
        this.posy = pos[1];
    }

    public updatePerception() {
        this.updatePos();
        this.getContent();
    }
}