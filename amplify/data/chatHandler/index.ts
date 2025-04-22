import {
  ConversationTurnEvent,
  createExecutableTool,
  handleConversationTurnEvent,
} from '@aws-amplify/backend-ai/conversation/runtime';

import { mastra } from '../../mastra';

const jsonSchema = {
  json: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'message to send to the search API',
      },
    },
    required: ['message'],
  },
} as const;

const getWeather = createExecutableTool(
  'getWeather',
  'Returns the result of a getWeather',
  jsonSchema,
  (input) => {
    const agent = mastra.getAgent('weatherAgent');
    const response = agent.generate(input.message);
    return response;
  }
);

export const handler = async (event: ConversationTurnEvent) => {
  await handleConversationTurnEvent(event, {
    tools: [getWeather],
  });
};
