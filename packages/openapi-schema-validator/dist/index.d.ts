import { ErrorObject } from "ajv";
import { IJsonSchema, OpenAPI } from "openapi-types";
export interface IOpenAPISchemaValidator {
    /**
     * Validate the provided OpenAPI doc against this validator's schema version and
     * return the results.
     */
    validate(doc: OpenAPI.Document): OpenAPISchemaValidatorResult;
}
export interface OpenAPISchemaValidatorArgs {
    version: number | string;
    extensions?: IJsonSchema;
}
export interface OpenAPISchemaValidatorResult {
    errors: ErrorObject[];
}
export default class OpenAPISchemaValidator implements IOpenAPISchemaValidator {
    private validator;
    constructor(args: OpenAPISchemaValidatorArgs);
    validate(openapiDoc: OpenAPI.Document): OpenAPISchemaValidatorResult;
}
