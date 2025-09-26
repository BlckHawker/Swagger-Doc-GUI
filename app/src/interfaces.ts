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

export type {
    SchemaType,
    ParameterData,
    EndpointData
}