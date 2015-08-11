# Scope.js

Explanation to come.

# Usage

## In Browser

This will install the required deps, compile the necessary files, and open your browser to localhost:3000

    npm install
    ./bin/build-example.js test
    ./bin/compile-js.sh
    npm start

## In CLI

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

## Usage Details

The VM will now report back more options:

    $ ./bin/build-example.js test
    // snip...

    $ ./bin/vm.js
      Not enough arguments.
      usage: vm.js <scope> <choice>
      Scopes:  counter.scope, entity.scope, grid.scope

    $ ./bin/vm.js entity.scope
      The command you executed requires more information.
      {"name":"choice","type":"pick-one","choices":["doSomething"]}

    $ ./bin/vm.js entity.scope doSomething -v
      Loaded state
      The command you executed requires more information.
      {"name":"thing","type":"pick-one","choices":["a","b"]}

    $ ./bin/vm.js entity.scope doSomething '{"thing": "a"}' -v
      Loaded state
      The command you executed requires more information.
      {"name":"thing","type":"pick-one","choices":["a","b"]}

    $ ./bin/vm.js entity.scope doSomething '{"thing": "a"}' -v
      Loaded state
      Changes to the data
        entity.thing.lastId: null -> 1
        entity.thing.size: null -> 1
        entity.thing: null -> {"1":{"entity":"entity.thing","thing":"a"}}
        entity.things: null -> [{"value":"entity.thing","id":1}]

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

    npm run docs

# How it works

## Data Compiling

Each transformation currently has many phases available:

### init

This is where any initial priming needs to happen (initial keys for values and entities are created here, for example).

### copy

This is the step for actually moving data around. Copying raw data to specific areas (like values, or entities).

### resolve

This is where you can 'fill in' the information. Currently this is primarily used to go back over all of the types and fill
in their definitions from the definition templates.

### validate

This is used for validation.

### metadata (coming soon)

This will be where you introspect values and try to prime the config with relational data to help things like
predictive caching, and cascading effects.

## The VM

The VM is built as follows:

### DataManager

The data manager handles all concerns about storing and maintaining the underlying user that powers the system.

This is the "state" of the system.

Every time you execute an action, the VM creates a copy of this data. If the action is successful (meaning no
exceptions are thrown), then that state is promoted to the new true state of the VM.

### InputManager

This is the gateway for pulling in data from the outside world, used by the Instruction Executioner.

It is primed by the VM via the input passed in from the third parameter, and then used by the Instruction Executioner
when building the arguments to pass to an instruction.

### QuestionManager

The yin to the InputManager's yang - the question manager provides a way to build and throw a list of questions back to
the edge of the VM. This is used to expose options for scope commands.

### TimeManager

This encapsulates time concerns in the system. Evetually this will have a way to map various views of the current time,
such as 'end of current day', 'beginning of week', and similar.

### TypeManager

Acting as the storage location of all the type data for our system.

### ValueManager

This manages all the stateful values in the system. Values are instances of types, backed by a specific configuration.

### InstructionExecutor

This handles reading in plugin instructions, and executing instructions.

We use reflection to introspect the names of the arguments required for an instruction, and then look for the answer like so:

1. Check the instruction object we are executing
2. Ask the input manager
3. Use the question manager to send the list of questions out to the edge of the VM

### Config

Config manages to hide much of the wiring information nicely for these classes above.

All you really need to start a VM is the current _state_, a value _config_, and the _plugins_ to use.

    var VM = require('scope-vm');
    var config = new VM.Config(state, config, plugins);
    var vm = new VM(config);

