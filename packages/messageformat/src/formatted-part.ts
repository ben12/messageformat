import type { Meta } from './data-model';
import { Context } from './format-context';
import { isLiteral, isVariable, Literal, Variable } from './pattern';

export type MessageFormatPart = { meta?: Meta; source?: string } & (
  | Intl.DateTimeFormatPart
  | Intl.NumberFormatPart
  | { type: 'literal'; value: string }
  | { type: 'dynamic'; value: unknown; source: string }
  | { type: 'fallback'; value: string; source: string }
  | { type: 'message'; value: ''; meta: Meta }
);

export function formatValueToParts(
  { localeMatcher, locales }: Context,
  value: unknown,
  source: string
): MessageFormatPart[] {
  let res: MessageFormatPart[];
  if (
    typeof value === 'number' ||
    value instanceof Number ||
    value instanceof BigInt
  ) {
    const nf = new Intl.NumberFormat(locales, { localeMatcher });
    res = nf.formatToParts(value as number); // work around incorrect TS signature
  } else if (value instanceof Date) {
    const dtf = new Intl.DateTimeFormat(locales, { localeMatcher });
    res = dtf.formatToParts(value);
  } else if (
    value == null ||
    typeof value === 'boolean' ||
    value instanceof Boolean ||
    value instanceof String
  ) {
    return [{ type: 'dynamic', value: String(value), source }];
  } else {
    // At this point, value is symbol | function | object
    return [{ type: 'dynamic', value, source }];
  }
  for (const fmt of res) fmt.source = source;
  return res;
}

export function argumentSource(arg: Literal | Variable): string {
  if (isVariable(arg)) {
    return (
      '$' +
      arg.var_path
        .map(vp => {
          const str = argumentSource(vp);
          return str[0] === '$' ? `(${str})` : str;
        })
        .join('.')
    );
  }
  return isLiteral(arg) ? String(arg.value) : '???';
}
