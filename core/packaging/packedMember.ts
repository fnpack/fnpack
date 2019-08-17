import { ServerlessFrameworkComponent,
    mergeComponents,
    FunctionComponent } from '../../fnpack/serverlessFramework/ServerlessFrameworkComponent';

export class PackedMember extends ServerlessFrameworkComponent {
    private functionComponent: ServerlessFrameworkComponent;
    constructor (private streams: ServerlessFrameworkComponent[], packPath: string, private name: string) {
        super();
        this.functionComponent = new FunctionComponent(packPath);
    }

    getFragment(): Object {
        const replacements = {
            '$target': this.name
        }
        return this.streams 
            .reduce((merged, stream) => {
                return mergeComponents(merged, stream, replacements);
            }, this.functionComponent)
            .getFragment();
    }
}