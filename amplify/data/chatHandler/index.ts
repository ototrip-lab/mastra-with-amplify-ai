import {
  ConversationTurnEvent,
  createExecutableTool,
  handleConversationTurnEvent,
} from '@aws-amplify/backend-ai/conversation/runtime';

import { mastra } from './mastra/';

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
// declare as const to allow the input type to be derived from the JSON schema in the tool handler definition.

const getWeather = createExecutableTool(
  'getWeather',
  'Returns the result of a getWeather',
  jsonSchema,
  // input type is derived from the JSON schema
  (input) => {
    // input is guaranteed to be of the type defined in the JSON schema

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
