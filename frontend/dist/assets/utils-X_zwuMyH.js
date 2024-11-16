import{l as a}from"./index-DBZSsRlN.js";var c={exports:{}},f={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=a;function p(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var S=typeof Object.is=="function"?Object.is:p,l=o.useState,d=o.useEffect,v=o.useLayoutEffect,x=o.useDebugValue;function y(t,e){var r=e(),u=l({inst:{value:r,getSnapshot:e}}),n=u[0].inst,i=u[1];return v(function(){n.value=r,n.getSnapshot=e,s(n)&&i({inst:n})},[t,r,e]),d(function(){return s(n)&&i({inst:n}),t(function(){s(n)&&i({inst:n})})},[t]),x(r),r}function s(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!S(t,r)}catch{return!0}}function h(t,e){return e()}var m=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?h:y;f.useSyncExternalStore=o.useSyncExternalStore!==void 0?o.useSyncExternalStore:m;c.exports=f;var E=c.exports;const g=E.useSyncExternalStore;function j(t,e){return typeof t=="function"?t(...e):!!t}export{j as s,g as u};
