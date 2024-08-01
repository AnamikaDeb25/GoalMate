import {logDev} from '../../logs/logDev';

export const logger = store => next => action => {
  logDev('store: ', store);
  logDev('next: ', next);
  logDev('action: ', action);
  next(action);
};
