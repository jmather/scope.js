# Scope.js

Explanation to come.

# Usage

See a full flow:

    npm install
    ./bin/build-example.js -e test
    ./bin/vm.js test.store incrementA
    ./bin/vm.js test.store incrementB
    ./bin/vm.js test.store incrementA
    ./bin/vm.js test.store incrementBoth

Example output:

    Jacobs-MBP:scope.js jmather$ ./bin/build-example.js -e test

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
