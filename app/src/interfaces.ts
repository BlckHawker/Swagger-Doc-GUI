interface ParameterData {
  in: string;
  type: string;
  required: boolean;
  description: string;
  example: string;
}

interface EndpointData {
    path: string,
    method: string,
    summary: string,
    description: string,
    tags: string[]
}

export type {
    ParameterData,
    EndpointData
}