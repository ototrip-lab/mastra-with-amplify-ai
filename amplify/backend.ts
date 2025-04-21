import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { chatHandler } from './data/chatHandler/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
  chatHandler,
});

backend.chatHandler.resources.cfnResources.cfnFunction.runtime = 'nodejs20.x';
