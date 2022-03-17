import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const TEST = process.env.TEST || false;
export const HOST: string = process.env.HOST || 'localhost';
const parsedPort = parseInt(process.env.PORT || '');
export const PORT = Number.isInteger(parsedPort) ? parsedPort : 3000;
const parseGqlPort = parseInt(process.env.GQL_PORT || '');
export const GQL_PORT = Number.isInteger(parseGqlPort) ? parseGqlPort : 4000;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const CACHED_PAIRS = process.env.CACHED_PAIRS || 'USD-SGD,SGD-USD';
const ttl = parseInt(process.env.CACHE_TTL || '');
export const CACHE_TTL = Number.isInteger(ttl) ? ttl : 60 * 60 * 1000;
