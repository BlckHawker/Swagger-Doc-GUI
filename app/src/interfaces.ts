interface ParameterData {
  in: string;
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: string;
}

type SchemaType =
  | {
      type: "string"
      format?: string
      enum?: string[]
      pattern?: string
      minLength?: number
      maxLength?: number
    }
  | {
      type: "number" | "integer"
      minimum?: number
      maximum?: number
      exclusiveMinimum?: number
      exclusiveMaximum?: number
      multipleOf?: number
    }
  | {
      type: "boolean"
    }
  | {
      type: "array"
      items: string,
      minItems?: number
      maxItems?: number
      uniqueItems?: boolean
    } | { type: "object", 
      properties: Record<string, SchemaType>, 
      required?: string[], 
      additionalProperties?: boolean | SchemaType 
    }


interface EndpointData {
    path: string,
    method: string,
    summary: string,
    description: string,
    tags: string[]
}

interface RequestBodyData {
  description?: string;
  required: boolean;
  content: {
    [mimeType: string]: {
      schema: SchemaType;
      example?: unknown;
      examples?: Record<string, unknown>;
    };
  };
}

interface PropertyData {
  name: string;                // The property name (e.g., "success", "message")
  schema: SchemaType;          // The schema definition for this property
  required?: boolean;          // Whether this property is required
  description?: string;        // Optional explanation for docs
  example?: unknown;           // Example value
  deprecated?: boolean;        // Whether this property is deprecated
  readOnly?: boolean;          // If it can only be returned in responses
  writeOnly?: boolean;         // If it can only be sent in requests
}

export type {
    PropertyData,
    RequestBodyData,
    SchemaType,
    ParameterData,
    EndpointData
}