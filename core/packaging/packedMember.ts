import { ServerlessFrameworkComponent,
    mergeComponents,
    FunctionComponent } from '../../fnpack/serverlessFramework/ServerlessFrameworkComponent';

export class PackedMember extends ServerlessFrameworkComponent {
    private functionComponent: ServerlessFrameworkComponent;
    constructor (private stream: ServerlessFrameworkComponent, packPath: string, private name: string) {
        super();
        this.functionComponent = new FunctionComponent(packPath);
    }

    //merge the event stream member into the function
    getFragment(): Object {
        const replacements = {
            '$target': this.name
        }
        return mergeComponents(this.stream, this.functionComponent, replacements).getFragment();
    }
}