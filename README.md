# fnPack is a rebrand of the Strat Coordination Language: https://strat.world


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
    - [X] FFI works for arbitrary Event Source

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
        - [ ] RUST
        - [ ] JAVA
        - [ ] Injection of environment variables
        - [X] Custom exports
    - [ ] Packages / multi-file artifacts
        - [X] Package using build step (webpack?)
        - [ ] Injection of environment variables
    - [ ] Code can import/resolve other modules within scope
    - [X] Call chains in front-end

## Permissions
    - [ ] Scope
        - [ ] Nested scopes representable in the frontend
        - [ ] Nested scopes translate to networking
    - [ ] Roles
        - [ ] Scopes map to roles
        - [ ] Role injection (connection to DB, etc.)

## Bundles
    - [X] Collapse scope (co-locate on lambdas)
    - [X] Service name / name bundle
    - [X] Wrap user code in runtime bundle
    - [ ] Portable
        - [ ] Allow setting in frontend
        - [X] AWS
        - [ ] Azure
        - [ ] GCP
        - [X] LOCAL
    - [ ] Import SF apps
    - [X] Multiple members
    - [X] Named function members
    - [ ] Variables
    - [ ] Dependency injection
    - [X] Package into zip file
    - [X] Executable-ish
    - [ ] Include other bundles
        - [ ] Include services
        - [ ] Include sources

## Runtime
    - [ ] Networking graph + resolver
        - [ ] Call ranged code
        - [ ] Receive ranged calls
        - [X] Call local code
    - [ ] IPC bridge for non-js code packages

## Deployment
    - [ ] Logging
    - [ ] Debugging

## std
    - [ ] Http
        - [ ] content headers for Http
        - [ ] host static files on s3
        - [X] FFI
    - [X] Cron

## Distribution
    - [ ] Users can install globally
        - [ ] ts-node works