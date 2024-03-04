import { ESpanKind, IResourceSpans } from '@opentelemetry/otlp-transformer';

import { faro } from '@grafana/faro-core';
import type { EventAttributes as FaroEventAttributes } from '@grafana/faro-web-sdk';

export function sendFaroEvents(resourceSpans: IResourceSpans[] = []) {
  for (const resourceSpan of resourceSpans) {
    const { scopeSpans } = resourceSpan;

    for (const scopeSpan of scopeSpans) {
      const { scope, spans = [] } = scopeSpan;

      for (const span of spans) {
        if (span.kind !== ESpanKind.SPAN_KIND_CLIENT) {
          continue;
        }

        const faroEventAttributes: FaroEventAttributes = {};

        for (const attribute of span.attributes) {
          faroEventAttributes[attribute.key] = String(Object.values(attribute.value)[0]);
        }

        const index = (scope?.name ?? '').indexOf('-');
        let eventName = 'unknown';

        if (scope?.name) {
          if (index === -1) {
            eventName = scope.name.split('/')[1] ?? scope.name;
          }

          if (index > -1) {
            eventName = scope?.name.substring(index + 1);
          }
        }

        faro.api.pushEvent(`faro.tracing.${eventName}`, faroEventAttributes);
      }
    }
  }
}
