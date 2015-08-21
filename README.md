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
    ./bin/vm.js counter.scope increment -v
    ./bin/vm.js counter.scope increment -v
    ./bin/vm.js counter.scope increment -v
    ./bin/vm.js counter.scope decrement -v

Example output:

    $ ./bin/build-example.js test
    executing: /Users/jmather/code/scope.js/bin/transform.js -p -P /Users/jmather/code/scope.js/bin/../examples/test/plugins /Users/jmather/code/scope.js/bin/../examples/test/config /Users/jmather/code/scope.js/bin/../examples/test/output
    Wrote data to /Users/jmather/code/scope.js/bin/../examples/test/output/config.json
    Wrote js loadable data to /Users/jmather/code/scope.js/bin/../examples/test/output/config.js
    Building plugins...
    plugins.js written


    $ ./bin/vm.js counter.scope increment -v
    Loaded state
    Changes to the data
      counter.min0max10: null -> 1
    $ ./bin/vm.js counter.scope increment -v

    Loaded state
      counter.min0max10: 1
    Changes to the data
      counter.min0max10: 1 -> 2

    $ ./bin/vm.js counter.scope increment -v
    Loaded state
      counter.min0max10: 2
    Changes to the data
      counter.min0max10: 2 -> 3

    $ ./bin/vm.js counter.scope decrement -v
    Loaded state
      counter.min0max10: 3
    Changes to the data
      counter.min0max10: 3 -> 2


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

### Phases
Each transformation currently has many phases available:

#### init

This is where any initial priming needs to happen (initial keys for values and entities are created here, for example).

#### copy

This is the step for actually moving data around. Copying raw data to specific areas (like values, or entities).

#### resolve

This is where you can 'fill in' the information. Currently this is primarily used to go back over all of the types and fill
in their definitions from the definition templates.

#### validate

This is used for validation.

#### metadata (coming soon)

This will be where you introspect values and try to prime the config with relational data to help things like
predictive caching, and cascading effects.

### Packaging

Within the output directory, you will see several files:

- config.js

  This is the JavaScript module version of your compiled value config.

- config.json

  This is the JSON version of your compiled value config.

- plugins.js

  This is a wrapper file for the plugins to prevent having to dynamically load them in later.

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

## Types

### Counter

Counters are very basic. They hold an integer value, and can _increment_ and _decrement_.

The default counter config is thus:

    {
      "type": "counter",
      "min": null,
      "max": null,
      "step": 1,
      "default": 0
    }

#### Instructions

##### increment(counterValue, [amount])

Increments the supplied counterValue. Supply an optional amount, or it will use the default _step_.

##### decrement(counterValue, [amount])

Decrement the supplied counterValue. Supply an optional amount, or it will use the default _step_.

### Grid

Grids are any N by N structure which you can place values into.

The default grid config is thus:

    {
      "type": "grid",
      "rows": 1,
      "cols": 1,
      "default": {},
      "nestedGrids": []
    }

Note: The values for grids are stored in COL-ROW pairs. For example, if 1,1 and 1,2 were set
to 'foo' and 'bar' respectively, the value would then look like this:

    {
        "1-1": "foo",
        "1-2": "bar"
    }

#### Instructions

##### place(gridValue, [cell], [data])

Places _date_ into _cell_ of _gridValue_.

If _cell_ is omitted, you will receive a Question exception with all available cells.

If _data_ is comitted, you will receive a Question exception with all available values which can be placed. (COMING EVENTUALLY!)

### Entity & Repository

Entities and repositories give you a way to describe structured data within your application.

Entities are defined by a { "type": "entity" } object which includes one or more other keys,
whose values are either fully or partially rendered Question formats. A simple entity example
looks like the following:

    {
        "type": "entity",
        "thing": { "type": "pick-one", "choices": ["a", "b"] }
    }

This would create an entity which had one property, _thing_, which could be either "A" or "B".

When you create an entity, a repository of the same name is created as a value.

#### Instructions

##### create(entity, listValue)

Creates an object in the repository for _entity_, and places the reference to the object in _listValue_.

### Scope

Scopes are the heart of Scope.js. They provide you with logical groupings of commands you can take on values.

A Scope is made up of one or more Commands, which each have one or more Instructions, which in turn perform operations on values.

For each Command, you can define a series of _when_ expressions which will be evaluated to ensure a given command may be
executed at any given time. All _when_ expressions must return true for the Command to be considered available.

A sample Scope definition for a game of Tic-Tac-Toe could look like the following:

    {
        "type": "scope",
        "choices": {
          "placeX": {
            "when":[
              "turn % 2 == 0"
            ],
            "instructions": [
              { "instruction": "place", "gridValue": "board", "data": "X" },
              { "instruction": "increment", "counterValue": "turn", "amount": 1 }
            ]
          },
          "placeO": {
            "when":[
              "turn % 2 == 1"
            ],
            "instructions": [
              { "instruction": "place", "gridValue": "board", "data": "O" },
              { "instruction": "increment", "counterValue": "turn", "amount": 1 }
            ]
          }
        }
    }

#### Instructions

##### execute(scopeValue, [choice])

Executes a given _choice_ on a _scopeValue_. If _choice_ is not provided, it will throw a Question exception
detailing the commands available.


# Todos

## Test Client

* Fix the Scope panel and sub systems to conform to proper React patterns with regards to Stores and flow of data.

## VM

* Teach it how to perform operations "over time"
    - Will likely require new instructions: incrementOverTime, decrementOverTime, incrementInFuture, decrementInFuture, placeInFuture, removeInFuture, createInFuture, destroyInFuture
    - all values will likely get a 'sideEffects' value to track these
* Many more value types:
    - Expressions: values which are merely named expressions. This should resuse the _wben_ expression system.
    - TimedCounter: Counters that run based off of time (typcially used for things like Energy and Stamina)
    - Collections: Groups of values. Useful for freating in-system taxonomies (object Widget property Foo takes any value in the collectio Bar, for example).
    