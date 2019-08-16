import { executeLocal } from './backend/executeBundle';
import { resolve } from 'path';

async function x () {
    await executeLocal(resolve(__dirname, './resolver.zip'));
}

x();