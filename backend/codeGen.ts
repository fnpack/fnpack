import { PackedMember } from '../core/packedMember';
import { 
    ServerlessFrameworkComponent,
    mergeComponents,
    BaseComponent } from '../fnpack/serverlessFramework/ServerlessFrameworkComponent';

export function gen (members: PackedMember[]): Object {
    const x: ServerlessFrameworkComponent = members
    .reduce((merged: ServerlessFrameworkComponent, next: PackedMember): ServerlessFrameworkComponent => {
        return mergeComponents(merged, next, {});
    }, new BaseComponent());
    return x.getFragment();
}