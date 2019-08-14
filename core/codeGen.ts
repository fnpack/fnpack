import { PackedMember } from '../core/packaging/packedMember';
import { 
    ServerlessFrameworkComponent,
    mergeComponents,
    BaseComponent } from '../fnpack/serverlessFramework/ServerlessFrameworkComponent';

export function gen (members: PackedMember[], serviceName: string): Object {
    return members
        .reduce((merged: ServerlessFrameworkComponent, next: PackedMember): ServerlessFrameworkComponent => {
            return mergeComponents(merged, next, {});
        }, new BaseComponent(serviceName))
        .getFragment();
}