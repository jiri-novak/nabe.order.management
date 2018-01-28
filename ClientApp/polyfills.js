/// <reference types="node" />
import 'core-js/client/shim';
import 'reflect-metadata';
require('zone.js/dist/zone');
if (process.env.ENV === 'production') {
    // Production
}
else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
//# sourceMappingURL=polyfills.js.map