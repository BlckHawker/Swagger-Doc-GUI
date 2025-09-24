# Required Form Components

## Endpoint Definition
- Path (string)
  - `/section/create`
  - `/project/{id}`
- Method (dropdown with autocomplete)
  - GET
  - POST
  - PUT
  - DELETE
  - PATCH
- Summary (string)
- Description (string)
- Tags (string): Separate tags by comma. Case sensitive

## Parameters (repeatable block)
- in (dropdown with autocomplete)
  - path
  - query
- Name (string)
- Type (dropdown with autocomplete)
  - string
  - number
  - boolean
  - array
  - object
- Required (checkbox)
- Description (string)
- Example (string). Verify this parses into the inputted type

## Request Body (optional)
- Required (checkbox)
- Content Type (dropdown with autocomplete)
  - application/json
  - Schema Type
  - Properties (repeatable):
    - Property name (string)
    - Type (dropdown with autocomplete)
        - string
        - number
        - boolean
        - array
        - object
    - Required (checkbox)
    - Description (text input)
    - Example (string). Verify this parses to a proper JSON
  - Examples (optional, repeatable):
    - Example name (string)
      - `existingSection`
      - `maxProjects`
    - Example summary (string)
    - Example value (string). Verify this parses to a proper JSON


## Export
- Generate button
  - Verifies all values are accurate. Gives warnings if not
  - Generates swagger docs as comment in the correct format
  - Docs are copied to clipboard
  - Pop up alert comes up if there was an error or if this was successful