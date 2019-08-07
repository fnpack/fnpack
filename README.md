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
        - [ ] Make work in an inline TS environment
        - [ ] Injection of environment variables
    - [ ] Files
        - [ ] JS
        - [ ] PY
        - [ ] GO
        - [ ] JAVA
        - [ ] Injection of environment variables
    - [ ] Packages / multi-file artifacts
        - [ ] Package using build step (webpack?)
        - [ ] Injection of environment variables

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

## std
    - [ ] Http
        - [ ] content headers for Http
        - [ ] host static files on s3
        - [ ] FFI
    - [ ] Cron
