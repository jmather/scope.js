# Scope.js Modernization Notes

This snapshot is a compatibility repair of the original `scope.js` 1.0.2 source.
It is intended to make the VM and compiler core directly usable from a current
Node.js codebase without first reconstructing the 2020 dependency environment.

## Verified

- Node.js 22 syntax checks pass for the maintained source and tests.
- `npm test` reports 25 passing tests and propagates failures normally.
- The public VM entry point loads without installed runtime dependencies.
- The Tic-Tac-Toe example executes end-to-end through the VM.
- Counter, repository, grid, grid-collection, expression resolution, and
  instruction argument inspection are covered.

## Repairs

- Replaced the swallowed Mocha command (`... || echo ''`) with Node's built-in
  test runner.
- Replaced the small used subsets of Underscore, Immutable.Map, and doT with
  local compatibility implementations.
- Removed `require.main.require(...)` assumptions from the test bootstrap.
- Corrected `InstructionExecutor` construction in the test bootstrap.
- Fixed expression transformation using an undefined `instanceConfig` value.
- Fixed dotted parent namespaces being coerced into comma-separated arrays.
- Made instruction argument inspection handle zero-argument functions, default
  arguments, rest arguments, and single-argument arrow functions.

## Intentionally still legacy

- The React component implementation remains at React 16/React-Bootstrap 0.32 to preserve behavior while replacing only the build system.
- The historical VM CLI still references its old CLI package; the maintained entry point is `lib/vm/index.js`.
- The expression compatibility evaluator preserves the original trusted-config execution model; it is not a sandbox and should not execute untrusted input.

## Browser/tooling pass

The original generated-fixture mechanics have been restored rather than treating generated example files as tests:

- `bin/build-example.js` builds `cards-war`, `test`, or `tictactoe` through the real compiler.
- `bin/transform.js` and example generation no longer require `cli`, jQuery, Underscore, or `pretty-data`.
- Generated plugin loaders use paths relative to their output directory, eliminating the historical `/Users/...` paths.
- All three examples compile and their resulting `config.js` and `plugins.js` modules load successfully.
- The development server now uses Node's built-in HTTP server.
- The source browser build is reduced to `esbuild` plus the existing pinned React UI packages.
- Browserify, Watchify, reactify, Babel, Express, serve-static, and Bootstrap's jQuery-based JavaScript are no longer part of the active build.

The checked-in `www/js/system.js` remains usable as the historical prebuilt bundle. Rebuilding it requires `npm install` followed by `npm run build:web -- <example>`. That final install/build could not be executed in the modernization environment because its npm registry is restricted, so the new esbuild path is syntax-checked and structurally validated but not claimed as browser-executed here.

The dependency-free portions were verified with:

```text
25 tests passed
syntax checks passed
cards-war generated and loaded
test generated and loaded
 tictactoe generated and loaded, including its custom plugin
built-in development server returned index.html and system.js successfully
```
