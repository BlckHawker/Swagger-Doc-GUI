import Endpoint from "./component/Endpoint"
import ParameterManager from "./component/ParameterManager";
import './main.css'
import { EndpointData, ParameterData, RequestBodyData, ResponseData, SchemaType } from "./interfaces";
import { SetStateAction, useState } from "react";
import RequestBody from "./component/RequestBody";
import ResponseManager from "./component/ResponseManager";

function App() {
  const debug = true;
  const methodOptions = ["GET", "PUT", "POST", "DELETE", "PATCH"];
  const inOptions = ["path", "query"]
  const [endpoint, setEndpoint] = useState<EndpointData>({
    path: "",
    method: "",
    summary: "",
    description: "",
    tags: []
  })
  const [parameters, setParameters] = useState<ParameterData[]>([]);
  const [requestBody, setRequestBody] = useState<RequestBodyData | null>(null);
  const [responses, setResponses] = useState<ResponseData[]>([]);


  const [endpointErrors, setEndpointErrors] = useState<string[]>([]);
  const [parameterErrors, setParameterErrors] = useState<string[]>([]);
  const [requestBodyErrors, setRequestBodyErrors] = useState<string[]>([]);
  const [responseErrors, setResponseErrors] = useState<string[]>([]);


  return (
    <div className="flex-vertical">
      <Endpoint methodOptions={methodOptions} data={endpoint} onChange={(updated: EndpointData) => setEndpoint(updated)} />
      <ParameterManager parameters={parameters} setParameters={setParameters} inOptions={inOptions} />
      <RequestBody requestBodyData={requestBody} setRequestBodyData={setRequestBody} />
      <ResponseManager responses={responses} setResponses={setResponses} />
      <button onClick={() => validateData()}>Generate</button>

      {debug &&
        <>
          <p>Endpoint</p>
          <pre>{JSON.stringify(endpoint, null, 2)}</pre>
          <p>Parameters</p>
          <pre>{JSON.stringify(parameters, null, 2)}</pre>
          <p>Request Body</p>
          <pre>{JSON.stringify(requestBody, null, 2)}</pre>
          <p>Responses</p>
          <pre>{JSON.stringify(responses, null, 2)}</pre>
        </>
      }
      <>
        {renderErrorList("endpoint", endpointErrors)}
        {renderErrorList("parameters", parameterErrors)}
        {renderErrorList("request body", requestBodyErrors)}
        {renderErrorList("responses", responseErrors)}

      </>
    </div>
  );

  function validateData() {
    validateEndpoint();
    validateParameters();
    validateRequestBodyParameters();
    validateResponses();
  }

  function validateEndpoint() {
    const errors = [];

    if (!endpoint.path.trim()) {
      errors.push("path can't be empty")
    }

    const method = endpoint.method.trim();
    if (!methodOptions.includes(method.toUpperCase())) {
      errors.push(`"${method}" is not a valid method`)
    }
    setEndpointErrors(errors);
  }

  function validateParameters() {

    const errors = [];
    for (let i = 0; i < parameters.length; i++) {
      const parameter = parameters[i];
      const pStr = `in parameter ${i + 1}`
      const inValue = parameter.in.trim();

      if (!inOptions.includes(inValue.toLocaleLowerCase())) {
        errors.push(`"${inValue}" is not a valid in ${pStr}`)

      }

      if (!parameter.name.trim()) {
        errors.push(`name can't be empty ${pStr}`)
      }


    }

    setParameterErrors(errors);
  }

  function validateRequestBodyParameters() {
    const errors: string[] = [];
    console.log(requestBody)
    if (!requestBody) {
      console.log("requestBodyData is falsy")
      setRequestBodyErrors(errors);
      return;
    }

    if (!requestBody["content"]) {
      console.log("requestBodyData content is falsy")

      setRequestBodyErrors(errors);
      return;
    }
    const content = requestBody.content;
    const schema = content[Object.keys(content)[0]]!.schema;

    switch (schema.type) {
      case "object":
        const properties = schema["properties"];

        Object.entries(properties).forEach(([key], index) => {
          index = index + 1
          const propStr = `in property ${index}`;

          if (!key) {
            errors.push(`Cannot have a blank name ${propStr}`);
          }

        });
        break;
    }

    setRequestBodyErrors(errors);
  }

  function validateResponses() {
    const errors:string[] = [];
    const statusCodes: Record<number, number[]> = [];
    for (let i = 0; i < responses.length; i++) {
      const index = i + 1;
      const response = responses[i];
      const statusCode = response.statusCode;

      if (!statusCodes[statusCode]) {
        statusCodes[statusCode] = [index];
      }

      else {
        statusCodes[statusCode].push(index);
      }
    }


    const duplicateStatusCodes: Record<number, number[]> = Object.fromEntries(
      Object.entries(statusCodes).filter(([_, value]) => value.length >= 2)
    ) as Record<number, number[]>;

    Object.entries(duplicateStatusCodes).forEach(([key, value]) => {
      errors.push(`Responses: ${value.join(", ")} cannot have the same status code: ${key}`)
    });

    setResponseErrors(errors)
  }

  function renderErrorList(name: string, errors: string[]) {
    if (errors.length === 0) return null;

    return (
      <>
        <p style={{ color: "red" }}>
          The following errors are in the {name}
        </p>
        <ul>
          {errors.map((err, index) => (
            <li key={index} style={{ color: "red" }}>
              {err}
            </li>
          ))}
        </ul>
      </>
    );
  }







}



export default App;
