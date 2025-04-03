import {Request} from 'express';

export interface WithBody<B> extends Request<unknown, unknown, B> {}

export interface WithParams<P> extends Request<P> {}