import { ArgumentsHost, Catch, BadRequestException } from '@nestjs/common';
import { GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(BadRequestException)
export class GraphqlValidationFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === 'graphql') {
      // const gqlHost = GqlArgumentsHost.create(host);
      const response = exception.getResponse() as any;

      if (
        Array.isArray(response.message) &&
        Array.isArray(response.message[0].errors) &&
        typeof response.message[0].field === 'string'
      ) {
        return {
          userErrors: response.message.map((error: any) => ({
            field: error.field.split('.'),
            message: error.errors[0],
          })),
        };
      }
    }
    return exception;
  }
}
