import Vapi from "@vapi-ai/web"

export const vapi = new Vapi("49e6adaf-9c46-4014-a725-c1a9545cf844")
const assistantId = "ee902e59-0ca0-4522-9242-231f41f216db"



export const startAssistant = async(insuranceType) => {
    const assistantOverrides = {
        variableValues: {
            insuranceType
        }
    }
    return await vapi.start(assistantId,assistantOverrides);
};

export const stopAssistant = () => {
  vapi.stop();  
}