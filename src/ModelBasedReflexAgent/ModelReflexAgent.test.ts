import { RealEnvironment, TestEnviroment } from "../Environment";
import { Perception } from "../Perception";
import { ModelReflexAgent } from "./ModelReflexAgent";
import { AgentActuor } from "../AgentActuor";
import { AgentI } from "../AgentI";

let perception: Perception;
let agent: ModelReflexAgent;

function executeAgent(agent: AgentI, perception: Perception) {
    let isWork = true;
    while(isWork) {
        perception.updatePerception();
        const action = agent.agentFunction(perception);
        
        isWork = agent.actuor(action);
    }
}

describe('RealEnvironment', () => {
    const environment = new RealEnvironment();
    perception = new Perception(environment);
    agent = new ModelReflexAgent(new AgentActuor(environment, perception));

    it ('start environment', () => {
        const itens = environment.getItens();
    
        expect(itens).toHaveLength(10);
        expect(itens).not.toBeNull();
    })

    it ('End environment', () => { 
        executeAgent(agent, perception);

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

describe('TestEnvironment', () => {
    let environment: TestEnviroment;

    beforeEach(() => {
        environment = new TestEnviroment();
        perception = new Perception(environment);
        agent = new ModelReflexAgent(new AgentActuor(environment, perception));
    })

    it ('environment1', () => {
        environment.addItem(0, 5, 10);
        environment.addItem(0, 7, 10);
        environment.addItem(1, 8, 20);
        environment.addItem(3, 8, 20);
        environment.addItem(5, 5, 20);
        environment.addItem(7, 0, 20);
        environment.addItem(8, 3, 10);
        environment.addItem(8, 6, 10);
        environment.addItem(9, 0, 10);
        environment.addItem(9, 7, 20);

        executeAgent(agent, perception);

        const itens = environment.getItens();
        const pos = [];
        for (let i = 0; i < itens.length; i++) {
            pos.push(itens[i].posx);
            pos.push(itens[i].posy);
        }
        
        expect(pos).toContain(0);
        expect(pos).not.toContain(10);
        expect(pos).not.toContain(20);
    })
})