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
      pattern?: RegExp
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
      items: SchemaType[]
      minItems?: number
      maxItems?: number
      uniqueItems?: boolean
    }
  | {
      type: "object"
      properties: Record<string, SchemaType>
      required?: string[]
      additionalProperties?: boolean | SchemaType
    }


interface EndpointData {
    path: string,
    method: string,
    summary: string,
    description: string,
    tags: string[]
}

export type {
    SchemaType,
    ParameterData,
    EndpointData
}