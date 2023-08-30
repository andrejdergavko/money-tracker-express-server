import { Container, ContainerModule, interfaces } from 'inversify';

import { TYPES } from './types';
import { App } from './app';

export interface IBootstrapReturn {
  app: App;
  appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

export const boot = bootstrap();
