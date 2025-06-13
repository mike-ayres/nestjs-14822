# Attempting to reproduce the bug from [NestJS issue 14822](https://github.com/nestjs/nest/issues/14822)

> ⚠️ The `main` branch is express-based, and showcases multiple optional segments.
> The `fastify` branch uses fastify instead of express, but only has support for single optional segments. But it has no errors.

This project was uses pnpm.

## Optional route findings (express)
Optional values work when including other optional parts.

The route where the slash comes before the capture group (`sample2/{:exampleParam}'`) requires the request url to also end with a trailing slash.
The route where the slash is _in_ the capture group (`'sample{/:exampleParam}'`) works as I expected, no trailing slash or optional trailing slash. (I haven't tested on a previous NestJS + Express version.)

The sample 3 route with multiple optional segments works, as long as a value exists for the first optional segment before the secone optional segment is hit. E.g., `sample3//lastname` doesn't work but `sample3/first/last` and other variations do, with and without the trailing space.

Sample 4 works the same as 3, but nests the optional segments allowing for both to be empty (`sample4//last` or `sample4//`)

## Express + ?
The error from the nest issue was found when working with optional routes in Express if attempting to use an optional parameter capture using `:example?` instead of `{:example}` will lead to an error similar to below.

> [Nest] 1308807  - 06/13/2025, 6:06:57 PM   ERROR [LegacyRouteConverter] Unsupported route path: "/sample/:exampleParam?". In previous versions, the symbols ?, *, and + were used to denote optional or repeating path parameters. The latest version of "path-to-regexp" now requires the use of named parameters. For example, instead of using a route like /users/* to capture all routes starting with "/users", you should use /users/*path. For more details, refer to the migration guide.

> TypeError: Unexpected ? at 21, expected END: https://git.new/pathToRegexpError
