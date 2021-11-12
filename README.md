# Better Validation Pipe

This pipe extends Nest's [built-in validation pipe](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe) and makes it a bit more descriptive.

## Introduction

The default validation pipe is great, but error it returns is just an array of errors:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["email must be an email", "phone cannot be empty"]
}
```

This package changes the `message` to be an object with field names as keys:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": {
    "email": ["email must be an email"],
    "phone": ["phone cannot be empty"]
  }
}
```

So then, on your frontend, you can show each error next to its relavant field, instead of showing all of them at the end of your form

## Installation

On Yarn:

```shell
yarn add @nestray/better-validation-pipe
```

On NPM:

```shell
npm install @nestray/better-validation-pipe
```

## Motivation

This behavior is achievable by passing a custom `exceptionFactory` to the original pipe, but I found myself writing the same exception factory for each one of my projects, so I made this small package.

## Inspiration

This is the same way [Laravel](https://laravel.com/docs/master/validation) returns errors; as an object that contains arrays of errors (strings).
