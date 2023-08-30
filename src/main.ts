import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';

import { TYPES } from './types';
import { App } from './app';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { ITransactionsController } from './transactions/transactions.controller.interface';
import { TransactionsController } from './transactions/transactions.controller';
import { ITransactionsService } from './transactions/transactions.service.interface';
import { TransactionsService } from './transactions/transactions.service';
import { IExaptionFilter } from './errors/exaption.filter.interface';
import { ExaptionFilter } from './errors/exaption.filter';

export interface IBootstrapReturn {
  app: App;
  appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.Logger).to(LoggerService);
  bind<ITransactionsController>(TYPES.TransactionsController).to(TransactionsController);
  bind<ITransactionsService>(TYPES.TransactionsService).to(TransactionsService);
  bind<IExaptionFilter>(TYPES.ExaptionFilter).to(ExaptionFilter);

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
