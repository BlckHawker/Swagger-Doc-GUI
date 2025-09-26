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

export type {
    RequestBodyData,
    SchemaType,
    ParameterData,
    EndpointData
}