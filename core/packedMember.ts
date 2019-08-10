import { ServerlessFrameworkComponent,
    mergeComponents,
    FunctionComponent } from '../fnpack/serverlessFramework/ServerlessFrameworkComponent';

export class PackedMember extends ServerlessFrameworkComponent {
    private functionComponent: ServerlessFrameworkComponent;
    constructor (private stream: ServerlessFrameworkComponent, packPath: string) {
        super();
        this.functionComponent = new FunctionComponent(packPath);
    }

    //merge the event stream member into the function
    getFragment(): Object {
        const replacements = {
            //todo: a good name might be the hash of the bundle
            '$target': 'theNameOfTheMember'//the name of the member
        }
        return mergeComponents(this.stream, this.functionComponent, replacements).getFragment();
    }
}