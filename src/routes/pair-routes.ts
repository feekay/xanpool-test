import { CommonRoutesConfig } from '../common/common.routes.config';
import { PairsController } from '../controllers/pairs-controller';
import express from 'express';

export class PairsRouteConfig extends CommonRoutesConfig {
  private controller: PairsController;
  constructor(app: express.Application, controller: PairsController) {
    super(app, 'PairRoutes');
    this.controller = controller;
  }

  configureRoutes(): express.Application {
    this.app.route(`/latest`).get(this.controller.getPair);
    return this.app;
  }
}
