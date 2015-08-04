# Scope.js

Explanation to come.

# Usage

See a full flow:

    npm install
    ./bin/build-example.js test
    ./bin/vm.js test.store incrementA -v
    ./bin/vm.js test.store incrementB -v
    ./bin/vm.js test.store incrementA -v
    ./bin/vm.js test.store incrementBoth -v

Example output:

    Jacobs-MBP:scope.js jmather$ ./bin/build-example.js test

    Wrote data to /Users/jmather/code/scope.js/examples/test/output/data.json
    Wrote js loadable data to /Users/jmather/code/scope.js/examples/test/output/data.js

    Jacobs-MBP:scope.js jmather$ ./bin/vm.js -v test.store incrementA
    Loaded state
    Changes to the data
      test.a: null -> 1
    Jacobs-MBP:scope.js jmather$ ./bin/vm.js -v test.store incrementB
    Loaded state
      test.a: 1
    Changes to the data
      test.b: null -> 1
    Jacobs-MBP:scope.js jmather$ ./bin/vm.js -v test.store incrementA
    Loaded state
      test.a: 1
      test.b: 1
    Changes to the data
      test.a: 1 -> 2
    Jacobs-MBP:scope.js jmather$ ./bin/vm.js -v test.store incrementBoth
    Loaded state
      test.a: 2
      test.b: 1
    Changes to the data
      test.a: 2 -> 3
      test.b: 1 -> 2


Example command:

    ./bin/build-example.js -e cards-war

    ./bin/transform.js -c examples/cards-war/config -o examples/cards-war/output -p


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

    npm run docsø

