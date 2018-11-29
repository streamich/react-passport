import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ContextRenderProp from './ContextRenderProp';
import ContextHook from './ContextHook';

storiesOf('React Passport|Demo', module)
  .add('Context render prop', () => <ContextRenderProp />)
  .add('Context hook', () => <ContextHook />)
