# Better Validation Pipe

This pipe extends Nest's [built-in validation pipe](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe) and makes it a bit more descriptive.

## Introduction

The default validation pipe is great, but error it returns is just an array of errors:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["email must be an email", "phone should not be empty"]
}
```

This package changes the `message` to be an object with field names as keys:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": [
    {
      "field": ["email"],
      "errors": ["email must be an email"]
    },
    {
      "field": ["phone"],
      "errors": ["phone should not be empty"]
    }
  ]
}
```

It also works for [nested values](https://github.com/typestack/class-validator#validating-nested-objects):

```json
{
  "field": ["nestedObject", "name"],
  "errors": ["name should not be empty"]
}
```

So then, on your frontend, you can show each error next to its relavant field, instead of showing all of them at the end of your form

## Installation

On Yarn:

```shell
yarn add @exonest/better-validation-pipe
```

On NPM:

```shell
npm install @exonest/better-validation-pipe
```

## Usage

Just use it as you would normally use [Nest's built-in validation pipe](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe). You can also pass options to it, just like you would with the built-in one.

## Motivation

This behavior is achievable by passing a custom `exceptionFactory` to the original pipe, but I found myself writing the same exception factory for each one of my projects, so I made this package to do the job.

## GraphQL Validation Filter

This filter is just what I personally use for my GraphQL responses. it catches the validation exceptions and returns them as the following object:

```ts
@ObjectType()
export class UserError {
  @Field(() => [String], { nullable: true })
  field: string[];

  @Field(() => String)
  message: string;
}
```

Additionally, your returned objects should contain a `userErrors` field, for example:

```ts
@ObjectType()
export class PostCreatePayload {
  @Field(() => Post)
  post: Post;

  @Field(() => [UserError])
  userErrors: UserError[];
}
```

To use the filter, add it filter to your main.ts file:

```ts
import { GraphqlValidationFilter } from '@exonest/better-validation';

// ...
app.useGlobalFilters(new GraphqlValidationFilter());
```
