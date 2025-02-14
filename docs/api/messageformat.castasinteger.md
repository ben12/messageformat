---
title: "castAsInteger"
parent: "messageformat"
grand_parent: API Reference
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->



# castAsInteger() function

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Utility function for custom functions. Cast resolved option values with numerical string representations of integers to their Number equivalents. Any other values are untouched.

**Signature:**

```typescript
export declare function castAsInteger(options: RuntimeOptions, ...names: string[]): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  options | [RuntimeOptions](./messageformat.runtimeoptions.md) | Options object, which may be modified. |
|  names | string\[\] | Names of options that should have integer values. |

**Returns:**

void

