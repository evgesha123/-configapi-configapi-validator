export declare namespace OpenAPI {
    type Document<T extends {} = {}> = OpenAPIV2.Document<T> | OpenAPIV3.Document<T> | OpenAPIV3_1.Document<T>;
    type Parameter = OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ParameterObject | OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject | OpenAPIV2.ReferenceObject | OpenAPIV2.Parameter;
    type Parameters = (OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ParameterObject)[] | (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[] | (OpenAPIV2.ReferenceObject | OpenAPIV2.Parameter)[];
}
export declare namespace OpenAPIV3_1 {
    type Modify<T, R> = Omit<T, keyof R> & R;
    type PathsWebhooksComponents<T> = {
        webhooks: Record<string, ReferenceObject>;
        components: ComponentsObject;
    };
    export type Document<T extends {} = {}> = Modify<Omit<OpenAPIV3.Document<T>, "components">, {
        info: InfoObject;
        jsonSchemaDialect?: string;
    } & ((Pick<PathsWebhooksComponents<T>, "webhooks"> & Omit<Partial<PathsWebhooksComponents<T>>, "webhooks">) | (Pick<PathsWebhooksComponents<T>, "components"> & Omit<Partial<PathsWebhooksComponents<T>>, "components">))>;
    export type InfoObject = Modify<OpenAPIV3.InfoObject, {
        summary?: string;
        license?: LicenseObject;
    }>;
    export type ContactObject = OpenAPIV3.ContactObject;
    export type LicenseObject = Modify<OpenAPIV3.LicenseObject, {
        identifier?: string;
    }>;
    export type ExternalDocumentationObject = OpenAPIV3.ExternalDocumentationObject;
    export type ParameterObject = OpenAPIV3.ParameterObject;
    export type ParameterBaseObject = OpenAPIV3.ParameterBaseObject;
    export type NonArraySchemaObjectType = OpenAPIV3.NonArraySchemaObjectType | "null";
    export type ArraySchemaObjectType = OpenAPIV3.ArraySchemaObjectType;
    /**
     * There is no way to tell typescript to require items when type is either 'array' or array containing 'array' type
     * 'items' will be always visible as optional
     * Casting schema object to ArraySchemaObject or NonArraySchemaObject will work fine
     */
    export type SchemaObject = ArraySchemaObject | NonArraySchemaObject | MixedSchemaObject;
    export interface ArraySchemaObject extends BaseSchemaObject {
        type: ArraySchemaObjectType;
        items: ReferenceObject | SchemaObject;
    }
    export interface NonArraySchemaObject extends BaseSchemaObject {
        type?: NonArraySchemaObjectType;
    }
    interface MixedSchemaObject extends BaseSchemaObject {
        type?: (ArraySchemaObjectType | NonArraySchemaObjectType)[];
        items?: ReferenceObject | SchemaObject;
    }
    export type BaseSchemaObject = Modify<Omit<OpenAPIV3.BaseSchemaObject, "nullable">, {
        examples?: OpenAPIV3.BaseSchemaObject["example"][];
        exclusiveMinimum?: boolean | number;
        exclusiveMaximum?: boolean | number;
        contentMediaType?: string;
        $schema?: string;
        additionalProperties?: boolean | ReferenceObject | SchemaObject;
        properties?: {
            [name: string]: ReferenceObject | SchemaObject;
        };
        allOf?: (ReferenceObject | SchemaObject)[];
        oneOf?: (ReferenceObject | SchemaObject)[];
        anyOf?: (ReferenceObject | SchemaObject)[];
        not?: ReferenceObject | SchemaObject;
        discriminator?: DiscriminatorObject;
        externalDocs?: ExternalDocumentationObject;
        xml?: XMLObject;
    }>;
    export type DiscriminatorObject = OpenAPIV3.DiscriminatorObject;
    export type XMLObject = OpenAPIV3.XMLObject;
    export type ReferenceObject = Modify<OpenAPIV3.ReferenceObject, {
        summary?: string;
        description?: string;
    }>;
    export type ExampleObject = OpenAPIV3.ExampleObject;
    export type MediaTypeObject = Modify<OpenAPIV3.MediaTypeObject, {
        schema?: SchemaObject | ReferenceObject;
        examples?: Record<string, ReferenceObject | ExampleObject>;
    }>;
    export type ComponentsObject = Modify<OpenAPIV3.ComponentsObject, {
        schemas?: Record<string, SchemaObject>;
        parameters?: Record<string, ReferenceObject | ParameterObject>;
        examples?: Record<string, ReferenceObject | ExampleObject>;
    }>;
    export type ContentObject = Modify<OpenAPIV3.ContentObject, {
        schemas?: Record<string, SchemaObject>;
        parameters?: Record<string, ReferenceObject | ParameterObject>;
        examples?: Record<string, ReferenceObject | ExampleObject>;
    }>;
    export {};
}
export declare namespace OpenAPIV3 {
    interface Document<T extends {} = {}> {
        configapi: string;
        info: InfoObject;
        content: ContentObject;
        components: ComponentsObject;
        externalDocs?: ExternalDocumentationObject;
        "x-express-openapi-additional-middleware"?: (((request: any, response: any, next: any) => Promise<void>) | ((request: any, response: any, next: any) => void))[];
        "x-express-openapi-validation-strict"?: boolean;
    }
    interface InfoObject {
        title: string;
        type: string;
        description?: string;
        termsOfService?: string;
        contact?: ContactObject;
        license?: LicenseObject;
        version: string;
    }
    interface ContactObject {
        name?: string;
        url?: string;
        email?: string;
    }
    interface LicenseObject {
        name: string;
        url?: string;
    }
    type OperationObject<T extends {} = {}> = {
        summary?: string;
        description?: string;
        externalDocs?: ExternalDocumentationObject;
        operationId?: string;
        parameters?: (ReferenceObject | ParameterObject)[];
        deprecated?: boolean;
    } & T;
    interface ExternalDocumentationObject {
        description?: string;
        url: string;
    }
    interface ParameterObject extends ParameterBaseObject {
        name: string;
        in: string;
    }
    interface HeaderObject extends ParameterBaseObject {
    }
    interface ParameterBaseObject {
        description?: string;
        required?: boolean;
        deprecated?: boolean;
        allowEmptyValue?: boolean;
        style?: string;
        explode?: boolean;
        allowReserved?: boolean;
        schema?: ReferenceObject | SchemaObject;
        example?: any;
        examples?: {
            [media: string]: ReferenceObject | ExampleObject;
        };
        content?: {
            [media: string]: MediaTypeObject;
        };
    }
    type NonArraySchemaObjectType = "boolean" | "object" | "number" | "string" | "integer";
    type ArraySchemaObjectType = "array";
    type ContentSchemaObject = ContentIntSchemaObject;
    type ComponentsObjectSchema = ComponentsIntObjectSchema;
    interface ComponentsIntObjectSchema extends BaseSchemaObject {
        type: object;
        properties: {
            [name: string]: ReferenceObject | SchemaObject;
        };
        required: string[];
    }
    interface ContentIntSchemaObject extends BaseSchemaObject {
        type: object;
        properties: {
            [name: string]: ReferenceObject | SchemaObject;
        };
        required: string[];
    }
    type SchemaObject = ArraySchemaObject | NonArraySchemaObject;
    interface ArraySchemaObject extends BaseSchemaObject {
        type: ArraySchemaObjectType;
        items: ReferenceObject | SchemaObject;
    }
    interface NonArraySchemaObject extends BaseSchemaObject {
        type?: NonArraySchemaObjectType;
    }
    interface BaseSchemaObject {
        title?: string;
        description?: string;
        format?: string;
        default?: any;
        multipleOf?: number;
        maximum?: number;
        exclusiveMaximum?: boolean;
        minimum?: number;
        exclusiveMinimum?: boolean;
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        additionalProperties?: boolean | ReferenceObject | SchemaObject;
        maxItems?: number;
        minItems?: number;
        uniqueItems?: boolean;
        maxProperties?: number;
        minProperties?: number;
        required?: string[];
        enum?: any[];
        properties?: {
            [name: string]: ReferenceObject | SchemaObject;
        };
        allOf?: (ReferenceObject | SchemaObject)[];
        oneOf?: (ReferenceObject | SchemaObject)[];
        anyOf?: (ReferenceObject | SchemaObject)[];
        not?: ReferenceObject | SchemaObject;
        nullable?: boolean;
        discriminator?: DiscriminatorObject;
        readOnly?: boolean;
        writeOnly?: boolean;
        xml?: XMLObject;
        externalDocs?: ExternalDocumentationObject;
        example?: any;
        deprecated?: boolean;
    }
    interface DiscriminatorObject {
        propertyName: string;
        mapping?: {
            [value: string]: string;
        };
    }
    interface XMLObject {
        name?: string;
        namespace?: string;
        prefix?: string;
        attribute?: boolean;
        wrapped?: boolean;
    }
    interface ReferenceObject {
        $ref: string;
    }
    interface ExampleObject {
        summary?: string;
        description?: string;
        value?: any;
        externalValue?: string;
    }
    interface MediaTypeObject {
        schema?: ReferenceObject | SchemaObject;
        example?: any;
        examples?: {
            [media: string]: ReferenceObject | ExampleObject;
        };
    }
    interface ContentObject {
        schema: ReferenceObject | ContentSchemaObject;
    }
    interface ComponentsObject {
        schemas: {
            [key: string]: ComponentsObjectSchema;
        };
    }
}
export declare namespace OpenAPIV2 {
    interface Document<T extends {} = {}> {
        basePath?: string;
        definitions?: DefinitionsObject;
        externalDocs?: ExternalDocumentationObject;
        info: InfoObject;
        parameters?: ParametersDefinitionsObject;
        schemes?: string[];
        securityDefinitions?: SecurityDefinitionsObject;
        swagger: string;
        "x-express-openapi-additional-middleware"?: (((request: any, response: any, next: any) => Promise<void>) | ((request: any, response: any, next: any) => void))[];
        "x-express-openapi-validation-strict"?: boolean;
    }
    interface SecuritySchemeObjectBase {
        type: "basic" | "apiKey" | "oauth2";
        description?: string;
    }
    interface SecuritySchemeBasic extends SecuritySchemeObjectBase {
        type: "basic";
    }
    interface SecuritySchemeApiKey extends SecuritySchemeObjectBase {
        type: "apiKey";
        name: string;
        in: string;
    }
    type SecuritySchemeOauth2 = SecuritySchemeOauth2Implicit | SecuritySchemeOauth2AccessCode | SecuritySchemeOauth2Password | SecuritySchemeOauth2Application;
    interface ScopesObject {
        [index: string]: any;
    }
    interface SecuritySchemeOauth2Base extends SecuritySchemeObjectBase {
        type: "oauth2";
        flow: "implicit" | "password" | "application" | "accessCode";
        scopes: ScopesObject;
    }
    interface SecuritySchemeOauth2Implicit extends SecuritySchemeOauth2Base {
        flow: "implicit";
        authorizationUrl: string;
    }
    interface SecuritySchemeOauth2AccessCode extends SecuritySchemeOauth2Base {
        flow: "accessCode";
        authorizationUrl: string;
        tokenUrl: string;
    }
    interface SecuritySchemeOauth2Password extends SecuritySchemeOauth2Base {
        flow: "password";
        tokenUrl: string;
    }
    interface SecuritySchemeOauth2Application extends SecuritySchemeOauth2Base {
        flow: "application";
        tokenUrl: string;
    }
    type SecuritySchemeObject = SecuritySchemeBasic | SecuritySchemeApiKey | SecuritySchemeOauth2;
    interface SecurityDefinitionsObject {
        [index: string]: SecuritySchemeObject;
    }
    interface ReferenceObject {
        $ref: string;
    }
    type Response = ResponseObject | ReferenceObject;
    type Schema = SchemaObject | ReferenceObject;
    interface ResponseObject {
        description: string;
        schema?: Schema;
        headers?: HeadersObject;
        examples?: ExampleObject;
    }
    interface HeadersObject {
        [index: string]: HeaderObject;
    }
    interface HeaderObject extends ItemsObject {
    }
    interface ExampleObject {
        [index: string]: any;
    }
    interface ResponseObject {
        description: string;
        schema?: Schema;
        headers?: HeadersObject;
        examples?: ExampleObject;
    }
    type OperationObject<T extends {} = {}> = {
        summary?: string;
        description?: string;
        externalDocs?: ExternalDocumentationObject;
        operationId?: string;
        parameters?: Parameters;
        schemes?: string[];
        deprecated?: boolean;
    } & T;
    type Parameters = (ReferenceObject | Parameter)[];
    type Parameter = InBodyParameterObject | GeneralParameterObject;
    interface InBodyParameterObject extends ParameterObject {
        schema: Schema;
    }
    interface GeneralParameterObject extends ParameterObject, ItemsObject {
        allowEmptyValue?: boolean;
    }
    interface ParametersDefinitionsObject {
        [index: string]: ParameterObject;
    }
    interface ParameterObject {
        name: string;
        in: string;
        description?: string;
        required?: boolean;
        [index: string]: any;
    }
    type MimeTypes = string[];
    interface DefinitionsObject {
        [index: string]: SchemaObject;
    }
    interface SchemaObject extends IJsonSchema {
        [index: string]: any;
        discriminator?: string;
        readOnly?: boolean;
        xml?: XMLObject;
        externalDocs?: ExternalDocumentationObject;
        example?: any;
        default?: any;
        items?: ItemsObject | ReferenceObject;
        properties?: {
            [name: string]: SchemaObject;
        };
    }
    interface ExternalDocumentationObject {
        [index: string]: any;
        description?: string;
        url: string;
    }
    interface ItemsObject {
        type: string;
        format?: string;
        items?: ItemsObject | ReferenceObject;
        collectionFormat?: string;
        default?: any;
        maximum?: number;
        exclusiveMaximum?: boolean;
        minimum?: number;
        exclusiveMinimum?: boolean;
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        maxItems?: number;
        minItems?: number;
        uniqueItems?: boolean;
        enum?: any[];
        multipleOf?: number;
        $ref?: string;
    }
    interface XMLObject {
        [index: string]: any;
        name?: string;
        namespace?: string;
        prefix?: string;
        attribute?: boolean;
        wrapped?: boolean;
    }
    interface InfoObject {
        title: string;
        description?: string;
        termsOfService?: string;
        contact?: ContactObject;
        license?: LicenseObject;
        version: string;
    }
    interface ContactObject {
        name?: string;
        url?: string;
        email?: string;
    }
    interface LicenseObject {
        name: string;
        url?: string;
    }
}
export interface IJsonSchema {
    id?: string;
    $schema?: string;
    title?: string;
    description?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    additionalItems?: boolean | IJsonSchema;
    items?: IJsonSchema | IJsonSchema[];
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    additionalProperties?: boolean | IJsonSchema;
    definitions?: {
        [name: string]: IJsonSchema;
    };
    properties?: {
        [name: string]: IJsonSchema;
    };
    patternProperties?: {
        [name: string]: IJsonSchema;
    };
    dependencies?: {
        [name: string]: IJsonSchema | string[];
    };
    enum?: any[];
    type?: string | string[];
    allOf?: IJsonSchema[];
    anyOf?: IJsonSchema[];
    oneOf?: IJsonSchema[];
    not?: IJsonSchema;
    $ref?: string;
}
