import { RealEnvironment } from "../Environment";
import { Perception } from "../Perception";
import { SimpleReflexAgent } from "./SimpleReflexAgent";
import { AgentActuor } from "../AgentActuor";

const environment = new RealEnvironment();
const perception = new Perception(environment);
const agent = new SimpleReflexAgent(new AgentActuor(environment, perception));


it ('start environment', () => {
    const itens = environment.getItens();

    expect(itens).toHaveLength(10);
    expect(itens).not.toBeNull();
})

describe('', () => {
    
    
    it ('End environment', () => {
        let isWork = true;
        while(isWork) {
            perception.updatePerception();
            const action = agent.agentFunction(perception);
            
            isWork = agent.actuor(action);
        }    

        const expectedEnvironment = new Array(10);
        for (let i = 0; i < 10; i++) {
            expectedEnvironment[i] = new Array(10).fill(0);    
        }
        expectedEnvironment[0][9] = 1;

        const itens = environment.getItens();
        const pos = [];
        for (let i = 0; i < itens.length; i++) {
            pos.push(itens[i].posx);
            pos.push(itens[i].posy);
        }
        
        expect(pos).toContain(0);
        expect(pos).not.toContain(10);
        expect(pos).not.toContain(20);
        expect(expectedEnvironment).toEqual(environment.environment);
    })
})


