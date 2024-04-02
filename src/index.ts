import { Environment } from "./Environment";
import { Perception } from "./Perception";
import { SimpleReflexAgent } from "./SimpleReflexAgent/SimpleReflexAgent";
import { ModelReflexAgent } from "./ModelBasedReflexAgent/ModelReflexAgent";
import { AgentActuor } from "./AgentActuor";

const environment = new Environment();

const perception = new Perception(environment);
const agent = new ModelReflexAgent(new AgentActuor(environment, perception));

let isWork = true;
while(isWork) {
    perception.updatePerception();

    const action = agent.agentFunction(perception);
    isWork = agent.actuor(action);
}

console.log(environment)
