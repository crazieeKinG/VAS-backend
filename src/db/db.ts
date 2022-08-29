import Knex from "knex";
import knexConfig from "./knexfile";

// @ts-ignore
import knexStringCase from "knex-stringcase";
import dotenv from "dotenv";

dotenv.config();
const environment = process.env.NODE_ENV as string;
const knex = Knex(knexStringCase(knexConfig[environment]));

export default knex;
