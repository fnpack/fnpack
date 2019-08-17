
//todo: use a real test framework
import { tests } from './fnpack/serverlessFramework/ServerlessFrameworkComponentTest';

tests.forEach(test => {
    test();
});
