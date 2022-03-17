# XANPOOL Assesment

## Stack
- The code is in NodeJS + Typescript.
- The Oracle to read latest data is the suggested Fixer Api.
- Testing using mocha + chai + ts-mockito.
- Caching is done in-memory. For the sake of simplicity any caching server (like Redis) is not integrated.

# Repo Structure
- The source files are under `src` folder.
- The tests are under `test` folder.
- Cache time-to-live and other configs are defined in `config.ts`
- The configs are loaded using {NODE_ENV}.env file

# Code Structure
- All objects are created in `provider.ts`. (For the sake of simplicity on DI framework is used)
- `app.ts` is treated as the main file and does the wiring up of both the GraphQL and Rest server
- `routes` are defined using a route object that registers a `controller` method against a path. routes are under the `/- routes` folder.
- `/controllers` directory has the route controllers/handlers for the Rest APIs.
- `services` are mediators between the interaction layer(rest controllers and GraphQL enpoints) and  data layer. Any bussiness logic also goes in there.
- `repositories` are used as the data layer. They manage any and all data sources.
- The code is mostly loosly-coupled and the moving parts like the oracle and cache are behind interfaces so their implementations can be substituted.
- Law of Demter violations are minimum and global state is mostly avoided to make the code testable.

# Scripts

### Run production
``` npm run start ```

### Run development
``` npm run start:dev ```

### Run tests
``` npm run test ```
``` npm run test-debug ```

### Others
Build:
``` npm run build ```
Linting:
``` npm run lint ```
``` npm run lint-and-fix ```

Formatting:
``` npm run prettier-format ```

### Note on coverage:
Tried integrating coverage with `nyc` but for some reason `ts-mockito` fails under coverage. im debugging what maybe the issue.
