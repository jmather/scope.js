# Scope.js

Explanation to come.

# Usage

See a full flow:

    npm install
    ./bin/build-example.js test
    ./bin/vm.js counter.scope incrementA -v
    ./bin/vm.js counter.scope incrementB -v
    ./bin/vm.js counter.scope incrementA -v
    ./bin/vm.js counter.scope incrementBoth -v

Example output:

    Jacobs-MBP:scope.js jmather$ ./bin/build-example.js test

    Wrote data to /Users/jmather/code/scope.js/examples/test/output/data.json
    Wrote js loadable data to /Users/jmather/code/scope.js/examples/test/output/data.js

    Jacobs-MBP:scope.js jmather$ ./bin/vm.js -v counter.scope incrementA
    Loaded state
    Changes to the data
      counter.a: null -> 1
    Jacobs-MBP:scope.js jmather$ ./bin/vm.js -v counter.scope incrementB
    Loaded state
      counter.a: 1
    Changes to the data
      counter.b: null -> 1
    Jacobs-MBP:scope.js jmather$ ./bin/vm.js -v counter.scope incrementA
    Loaded state
      counter.a: 1
      counter.b: 1
    Changes to the data
      counter.a: 1 -> 2
    Jacobs-MBP:scope.js jmather$ ./bin/vm.js -v counter.scope incrementBoth
    Loaded state
      counter.a: 2
      counter.b: 1
    Changes to the data
      counter.a: 2 -> 3
      counter.b: 1 -> 2


Example command:

    ./bin/build-example.js cards-war

    ./bin/transform.js examples/cards-war/config examples/cards-war/output -p


# QA Metrics

Because I'm a bit of a nerd about knowing the state of things:

## Lines of code

    npm run loc

## Linting

    npm run lint

## Code Complexity

    npm run complexity

or

    npm run complexity-simple

## Tests

    npm test

## Test Coverage

    npm run coverage

## Docs

Not working right now, not sure why. Any ideas?

    npm run docs

# How it works

## Data Compiling

Each transformation currently has three phases: preProcess, process, and postProcess

### preProcess (copy)

This is the step for actually moving data around. Copying raw data to specific areas (like values, or instanceTemplates).

### process (resolve)

This is where you can 'fill in' the information. Currently this is primarily used to go back over all of the types and fill
in their definitions from the definition templates.

### postProcess (validate)

This is used for validation.

### metadata (coming soon)

This will be where you introspect values and try to prime the config with relational data to help things like
predictive caching, and cascading effects.

