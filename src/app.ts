import express, { Express } from 'express';
import { Server } from 'http';

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  useMiddleware(): void {}

  useRoutes(): void {}

  useExaptionFilters(): void {}

  public init(): void {
    this.useMiddleware();
    this.useRoutes();
    this.useExaptionFilters();
    this.server = this.app.listen(this.port);
  }

  public close(): void {
    this.server.close();
  }
}
