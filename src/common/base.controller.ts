import { Response, Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public ok(res: Response): void {
    res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
      const handler = route.func.bind(this);
      const pipeline = middlewares?.length ? [...middlewares, handler] : handler;
      this.router[route.method](route.path, pipeline);

      this.logger.log(`route ${route.path} successfully bound to ${route.method}`);
    }
  }
}
