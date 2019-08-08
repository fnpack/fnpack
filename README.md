# Feature check-list

## Event Sources
    - [ ] Async
        - [x] Expressable in the frontend
        - [ ] Use SNS for event propagation
        - [ ] Connects to code artifacts
        - [ ] Errors via dead letter queue
    - [ ] Sync
        - [x] Expressable in the frontend
        - [ ] Event propagates through code
            - [ ] Middleware propagation
            - [ ] Pipe propagation
        - [ ] Stack trace & Errors
    - [ ] FFI works for arbitrary Event Source

## Static files
    - [ ] pick up and bundle

## Code
    - [ ] Lambdas (JS)
        - [x] Expressable in the frontend
        - [ ] Make work in an inline TS environment
        - [ ] Injection of environment variables
    - [ ] Files
        - [x] Expressable in the frontend
        - [ ] JS
        - [ ] PY
        - [ ] GO
        - [ ] JAVA
        - [ ] Injection of environment variables
        - [ ] Custom exports
    - [ ] Packages / multi-file artifacts
        - [ ] Package using build step (webpack?)
        - [ ] Injection of environment variables
    - [ ] Code can import/resolve other modules within scope

## Permissions
    - [ ] Scope
        - [ ] Nested scopes representable in the frontend
        - [ ] Nested scopes translate to networking
    - [ ] Roles
        - [ ] Scopes map to roles

## Bundles
    - [ ] Collapse scope (co-locate on lambdas)
    - [ ] Wrap user code in runtime bundle
    - [ ] Portable
        - [ ] AWS
        - [ ] Azure
        - [ ] GCP
        - [ ] LOCAL
    - [ ] Import SF apps

## Runtime
    - [ ] Networking graph + resolver
        - [ ] Call ranged code
        - [ ] Receive ranged calls
        - [ ] Call local code
    - [ ] IPC bridge for non-js code packages

## std
    - [ ] Http
        - [ ] content headers for Http
        - [ ] host static files on s3
        - [ ] FFI
    - [ ] Cron
