# Feature check-list

## Event Sources
    - [ ] Async
        - [x] Expressable in the frontend
        - [ ] Use SNS for event propagation
        - [ ] Connects to code artifacts
        - [ ] Errors via dead letter queue
    - [ ] Sync
        - [x] Expressable in the frontend
        - [X] Event propagates through code
            - [X] Middleware propagation
            - [X] Pipe propagation
        - [ ] Stack trace & Errors
    - [-] FFI works for arbitrary Event Source

## Static files
    - [ ] pick up and bundle

## Code
    - [ ] Lambdas (JS)
        - [x] Expressable in the frontend
        - [X] Make work in an inline TS environment
        - [ ] Injection of environment variables
    - [ ] Files
        - [x] Expressable in the frontend
        - [X] JS
        - [ ] PY
        - [ ] GO
        - [ ] JAVA
        - [ ] Injection of environment variables
        - [ ] Custom exports
    - [ ] Packages / multi-file artifacts
        - [X] Package using build step (webpack?)
        - [ ] Injection of environment variables
    - [ ] Code can import/resolve other modules within scope
    - [ ] Call chains in front-end

## Permissions
    - [ ] Scope
        - [ ] Nested scopes representable in the frontend
        - [ ] Nested scopes translate to networking
    - [ ] Roles
        - [ ] Scopes map to roles

## Bundles
    - [ ] Collapse scope (co-locate on lambdas)
    - [X] Wrap user code in runtime bundle
    - [ ] Portable
        - [X] AWS
        - [ ] Azure
        - [ ] GCP
        - [ ] LOCAL
    - [ ] Import SF apps
    - [ ] Multiple members
    - [ ] Named function members
    - [ ] Variables

## Runtime
    - [ ] Networking graph + resolver
        - [ ] Call ranged code
        - [ ] Receive ranged calls
        - [X] Call local code
    - [ ] IPC bridge for non-js code packages

## std
    - [ ] Http
        - [ ] content headers for Http
        - [ ] host static files on s3
        - [X] FFI
    - [X] Cron

## Distribution
    - [ ] Users can install globally
        - [ ] ts-node works