import { execute } from './backend/executeBundle';
import { resolve } from 'path';

async function x () {
    await execute(resolve(__dirname, './testerino.zip'));
}

x();