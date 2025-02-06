import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { PostgresError } from 'pg';

interface ErrorResponse {
    statusCode: number;
    errorCode: string;
    message: string;
    details: any;
    timestamp: string;
    debug?: any;
}

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        const postgresError = exception.driverError as PostgresError;
        const environment = process.env.NODE_ENV || 'development';

        // Dispatch error to the appropriate handler based on the error code
        let errorResponse: ErrorResponse = this.handleDatabaseError(postgresError);

        // In development, attach additional debug information
        if (environment === 'development') {
            errorResponse.debug = {
                // Provide the complete exception object and stack trace
                originalError: exception,
                stack: exception.stack,
            };
        }

        response.status(errorResponse.statusCode).json(errorResponse);
    }

    // Centralized error handler to dispatch to specific functions based on error code
    private handleDatabaseError(postgresError: PostgresError): ErrorResponse {
        switch (postgresError?.code) {
            case '23502':
                return this.handleNotNullViolation(postgresError);
            case '23505':
                return this.handleDuplicateKey(postgresError);
            default:
                return this.handleGenericError(postgresError);
        }
    }

    // Handles '23502' error - Not Null Constraint Violation
    private handleNotNullViolation(postgresError: PostgresError): ErrorResponse {
        return {
            statusCode: 400,
            errorCode: 'NOT_NULL_VIOLATION',
            message: 'A required field is missing or null.',
            details: {
                field: postgresError?.column || 'unknown',
            },
            timestamp: new Date().toISOString(),
        };
    }

    // Handles '23505' error - Duplicate Key Violation
    private handleDuplicateKey(postgresError: PostgresError): ErrorResponse {
        const fieldMatch = postgresError?.detail?.match(/Key \((.*?)\)/);
        const field = fieldMatch ? fieldMatch[1] : 'unknown';

        // Extract the conflicting value using a more precise regex pattern.
        const valueMatch = postgresError?.detail?.match(/\)=\((.*?)\)/);
        const value = valueMatch ? valueMatch[1] : 'unknown';

        return {
            statusCode: 400,
            errorCode: 'DUPLICATE_KEY',
            message: 'The provided data conflicts with existing records.',
            details: {
                field,
                value,
            },
            timestamp: new Date().toISOString(),
        };
    }

    // Handles unknown or generic errors
    private handleGenericError(postgresError: PostgresError): ErrorResponse {
        return {
            statusCode: 400,
            errorCode: 'QUERY_FAILED',
            message: 'There was an error with the database query.',
            details: postgresError.message,
            timestamp: new Date().toISOString(),
        };
    }
}
