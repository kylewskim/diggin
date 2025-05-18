var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { i as initializeApp, g as getAuth, a as getFirestore, b as getDatabase, q as query, c as collection, w as where, o as orderBy, d as getDocs, e as doc, f as getDoc, s as serverTimestamp, h as addDoc, j as onAuthStateChanged, G as GoogleAuthProvider, k as signInWithCredential, l as setDoc, m as signInWithPopup, n as signOut$1, u as updateDoc, p as limit, r as startAfter, T as Timestamp } from "./index.esm2017-sWKDjtvW.js";
var require_index_001 = __commonJS({
  "assets/index-BweRF8TH.js"(exports) {
    function _mergeNamespaces(n2, m2) {
      for (var i = 0; i < m2.length; i++) {
        const e = m2[i];
        if (typeof e !== "string" && !Array.isArray(e)) {
          for (const k2 in e) {
            if (k2 !== "default" && !(k2 in n2)) {
              const d = Object.getOwnPropertyDescriptor(e, k2);
              if (d) {
                Object.defineProperty(n2, k2, d.get ? d : {
                  enumerable: true,
                  get: () => e[k2]
                });
              }
            }
          }
        }
      }
      return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
    }
    (function polyfill() {
      const relList = document.createElement("link").relList;
      if (relList && relList.supports && relList.supports("modulepreload")) {
        return;
      }
      for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
      }
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "childList") {
            continue;
          }
          for (const node of mutation.addedNodes) {
            if (node.tagName === "LINK" && node.rel === "modulepreload")
              processPreload(node);
          }
        }
      }).observe(document, { childList: true, subtree: true });
      function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity) fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === "use-credentials")
          fetchOpts.credentials = "include";
        else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
        else fetchOpts.credentials = "same-origin";
        return fetchOpts;
      }
      function processPreload(link) {
        if (link.ep)
          return;
        link.ep = true;
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
      }
    })();
    function getDefaultExportFromCjs(x2) {
      return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
    }
    var jsxRuntime = { exports: {} };
    var reactJsxRuntime_production_min = {};
    var react = { exports: {} };
    var react_production_min = {};
    /**
     * @license React
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r$1 = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
    function A$1(a) {
      if (null === a || "object" !== typeof a) return null;
      a = z$1 && a[z$1] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B$1 = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, C$1 = Object.assign, D$1 = {};
    function E$1(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D$1;
      this.updater = e || B$1;
    }
    E$1.prototype.isReactComponent = {};
    E$1.prototype.setState = function(a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E$1.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E$1.prototype;
    function G$1(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D$1;
      this.updater = e || B$1;
    }
    var H$1 = G$1.prototype = new F();
    H$1.constructor = G$1;
    C$1(H$1, E$1.prototype);
    H$1.isPureReactComponent = true;
    var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
    function M$1(a, b, e) {
      var d, c = {}, k2 = null, h = null;
      if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g) c.children = e;
      else if (1 < g) {
        for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
        c.children = f2;
      }
      if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
      return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
    }
    function N$1(a, b) {
      return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O$1(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l$1;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P$1 = /\/+/g;
    function Q$1(a, b) {
      return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
    }
    function R$1(a, b, e, d, c) {
      var k2 = typeof a;
      if ("undefined" === k2 || "boolean" === k2) a = null;
      var h = false;
      if (null === a) h = true;
      else switch (k2) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case l$1:
            case n$1:
              h = true;
          }
      }
      if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
        return a2;
      })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I$1(a)) for (var g = 0; g < a.length; g++) {
        k2 = a[g];
        var f2 = d + Q$1(k2, g);
        h += R$1(k2, b, e, f2, c);
      }
      else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
      else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S$1(a, b, e) {
      if (null == a) return a;
      var d = [], c = 0;
      R$1(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T$1(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
        }, function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
        });
        -1 === a._status && (a._status = 0, a._result = b);
      }
      if (1 === a._status) return a._result.default;
      throw a._result;
    }
    var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
    function X$2() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
      S$1(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      S$1(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return S$1(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    react_production_min.Component = E$1;
    react_production_min.Fragment = p$2;
    react_production_min.Profiler = r$1;
    react_production_min.PureComponent = G$1;
    react_production_min.StrictMode = q$1;
    react_production_min.Suspense = w;
    react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
    react_production_min.act = X$2;
    react_production_min.cloneElement = function(a, b, e) {
      if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
      if (null != b) {
        void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
      }
      var f2 = arguments.length - 2;
      if (1 === f2) d.children = e;
      else if (1 < f2) {
        g = Array(f2);
        for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
        d.children = g;
      }
      return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
    };
    react_production_min.createContext = function(a) {
      a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a.Provider = { $$typeof: t, _context: a };
      return a.Consumer = a;
    };
    react_production_min.createElement = M$1;
    react_production_min.createFactory = function(a) {
      var b = M$1.bind(null, a);
      b.type = a;
      return b;
    };
    react_production_min.createRef = function() {
      return { current: null };
    };
    react_production_min.forwardRef = function(a) {
      return { $$typeof: v$1, render: a };
    };
    react_production_min.isValidElement = O$1;
    react_production_min.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
    };
    react_production_min.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    react_production_min.startTransition = function(a) {
      var b = V$1.transition;
      V$1.transition = {};
      try {
        a();
      } finally {
        V$1.transition = b;
      }
    };
    react_production_min.unstable_act = X$2;
    react_production_min.useCallback = function(a, b) {
      return U$1.current.useCallback(a, b);
    };
    react_production_min.useContext = function(a) {
      return U$1.current.useContext(a);
    };
    react_production_min.useDebugValue = function() {
    };
    react_production_min.useDeferredValue = function(a) {
      return U$1.current.useDeferredValue(a);
    };
    react_production_min.useEffect = function(a, b) {
      return U$1.current.useEffect(a, b);
    };
    react_production_min.useId = function() {
      return U$1.current.useId();
    };
    react_production_min.useImperativeHandle = function(a, b, e) {
      return U$1.current.useImperativeHandle(a, b, e);
    };
    react_production_min.useInsertionEffect = function(a, b) {
      return U$1.current.useInsertionEffect(a, b);
    };
    react_production_min.useLayoutEffect = function(a, b) {
      return U$1.current.useLayoutEffect(a, b);
    };
    react_production_min.useMemo = function(a, b) {
      return U$1.current.useMemo(a, b);
    };
    react_production_min.useReducer = function(a, b, e) {
      return U$1.current.useReducer(a, b, e);
    };
    react_production_min.useRef = function(a) {
      return U$1.current.useRef(a);
    };
    react_production_min.useState = function(a) {
      return U$1.current.useState(a);
    };
    react_production_min.useSyncExternalStore = function(a, b, e) {
      return U$1.current.useSyncExternalStore(a, b, e);
    };
    react_production_min.useTransition = function() {
      return U$1.current.useTransition();
    };
    react_production_min.version = "18.3.1";
    {
      react.exports = react_production_min;
    }
    var reactExports = react.exports;
    const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
    const React$1 = /* @__PURE__ */ _mergeNamespaces({
      __proto__: null,
      default: React
    }, [reactExports]);
    /**
     * @license React
     * react-jsx-runtime.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      void 0 !== g && (e = "" + g);
      void 0 !== a.key && (e = "" + a.key);
      void 0 !== a.ref && (h = a.ref);
      for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    reactJsxRuntime_production_min.Fragment = l;
    reactJsxRuntime_production_min.jsx = q;
    reactJsxRuntime_production_min.jsxs = q;
    {
      jsxRuntime.exports = reactJsxRuntime_production_min;
    }
    var jsxRuntimeExports = jsxRuntime.exports;
    var client = {};
    var reactDom = { exports: {} };
    var reactDom_production_min = {};
    var scheduler = { exports: {} };
    var scheduler_production_min = {};
    /**
     * @license React
     * scheduler.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    (function(exports2) {
      function f2(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k2(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
            var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
            if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
            else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        var l2 = performance;
        exports2.unstable_now = function() {
          return l2.now();
        };
      } else {
        var p2 = Date, q2 = p2.now();
        exports2.unstable_now = function() {
          return p2.now() - q2;
        };
      }
      var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G2(a) {
        for (var b = h(t2); null !== b; ) {
          if (null === b.callback) k2(t2);
          else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
          else break;
          b = h(t2);
        }
      }
      function H2(a) {
        B2 = false;
        G2(a);
        if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
        else {
          var b = h(t2);
          null !== b && K2(H2, b.startTime - a);
        }
      }
      function J2(a, b) {
        A2 = false;
        B2 && (B2 = false, E2(L2), L2 = -1);
        z2 = true;
        var c = y2;
        try {
          G2(b);
          for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
            var d = v2.callback;
            if ("function" === typeof d) {
              v2.callback = null;
              y2 = v2.priorityLevel;
              var e = d(v2.expirationTime <= b);
              b = exports2.unstable_now();
              "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
              G2(b);
            } else k2(r2);
            v2 = h(r2);
          }
          if (null !== v2) var w2 = true;
          else {
            var m2 = h(t2);
            null !== m2 && K2(H2, m2.startTime - b);
            w2 = false;
          }
          return w2;
        } finally {
          v2 = null, y2 = c, z2 = false;
        }
      }
      var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
      function M2() {
        return exports2.unstable_now() - Q2 < P2 ? false : true;
      }
      function R2() {
        if (null !== O2) {
          var a = exports2.unstable_now();
          Q2 = a;
          var b = true;
          try {
            b = O2(true, a);
          } finally {
            b ? S2() : (N2 = false, O2 = null);
          }
        } else N2 = false;
      }
      var S2;
      if ("function" === typeof F2) S2 = function() {
        F2(R2);
      };
      else if ("undefined" !== typeof MessageChannel) {
        var T2 = new MessageChannel(), U2 = T2.port2;
        T2.port1.onmessage = R2;
        S2 = function() {
          U2.postMessage(null);
        };
      } else S2 = function() {
        D2(R2, 0);
      };
      function I2(a) {
        O2 = a;
        N2 || (N2 = true, S2());
      }
      function K2(a, b) {
        L2 = D2(function() {
          a(exports2.unstable_now());
        }, b);
      }
      exports2.unstable_IdlePriority = 5;
      exports2.unstable_ImmediatePriority = 1;
      exports2.unstable_LowPriority = 4;
      exports2.unstable_NormalPriority = 3;
      exports2.unstable_Profiling = null;
      exports2.unstable_UserBlockingPriority = 2;
      exports2.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports2.unstable_continueExecution = function() {
        A2 || z2 || (A2 = true, I2(J2));
      };
      exports2.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports2.unstable_getCurrentPriorityLevel = function() {
        return y2;
      };
      exports2.unstable_getFirstCallbackNode = function() {
        return h(r2);
      };
      exports2.unstable_next = function(a) {
        switch (y2) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y2;
        }
        var c = y2;
        y2 = b;
        try {
          return a();
        } finally {
          y2 = c;
        }
      };
      exports2.unstable_pauseExecution = function() {
      };
      exports2.unstable_requestPaint = function() {
      };
      exports2.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y2;
        y2 = a;
        try {
          return b();
        } finally {
          y2 = c;
        }
      };
      exports2.unstable_scheduleCallback = function(a, b, c) {
        var d = exports2.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
        return a;
      };
      exports2.unstable_shouldYield = M2;
      exports2.unstable_wrapCallback = function(a) {
        var b = y2;
        return function() {
          var c = y2;
          y2 = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y2 = c;
          }
        };
      };
    })(scheduler_production_min);
    {
      scheduler.exports = scheduler_production_min;
    }
    var schedulerExports = scheduler.exports;
    /**
     * @license React
     * react-dom.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var aa = reactExports, ca = schedulerExports;
    function p(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var da = /* @__PURE__ */ new Set(), ea = {};
    function fa(a, b) {
      ha(a, b);
      ha(a + "Capture", b);
    }
    function ha(a, b) {
      ea[a] = b;
      for (a = 0; a < b.length; a++) da.add(b[a]);
    }
    var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
    function oa(a) {
      if (ja.call(ma, a)) return true;
      if (ja.call(la, a)) return false;
      if (ka.test(a)) return ma[a] = true;
      la[a] = true;
      return false;
    }
    function pa(a, b, c, d) {
      if (null !== c && 0 === c.type) return false;
      switch (typeof b) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          if (d) return false;
          if (null !== c) return !c.acceptsBooleans;
          a = a.toLowerCase().slice(0, 5);
          return "data-" !== a && "aria-" !== a;
        default:
          return false;
      }
    }
    function qa(a, b, c, d) {
      if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
      if (d) return false;
      if (null !== c) switch (c.type) {
        case 3:
          return !b;
        case 4:
          return false === b;
        case 5:
          return isNaN(b);
        case 6:
          return isNaN(b) || 1 > b;
      }
      return false;
    }
    function v(a, b, c, d, e, f2, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
      this.attributeName = d;
      this.attributeNamespace = e;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = f2;
      this.removeEmptyString = g;
    }
    var z = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      z[a] = new v(a, 0, false, a, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      z[b] = new v(b, 1, false, a[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      z[a] = new v(a, 2, false, a, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      z[a] = new v(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function(a) {
      z[a] = new v(a, 4, false, a, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      z[a] = new v(a, 6, false, a, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a) {
      z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
    });
    var ra = /[\-:]([a-z])/g;
    function sa(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ra,
        sa
      );
      z[b] = new v(b, 1, false, a, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ra, sa);
      z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ra, sa);
      z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
    });
    z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
    });
    function ta(a, b, c, d) {
      var e = z.hasOwnProperty(b) ? z[b] : null;
      if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
    }
    var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
    var Ia = Symbol.for("react.offscreen");
    var Ja = Symbol.iterator;
    function Ka(a) {
      if (null === a || "object" !== typeof a) return null;
      a = Ja && a[Ja] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var A = Object.assign, La;
    function Ma(a) {
      if (void 0 === La) try {
        throw Error();
      } catch (c) {
        var b = c.stack.trim().match(/\n( *(at )?)/);
        La = b && b[1] || "";
      }
      return "\n" + La + a;
    }
    var Na = false;
    function Oa(a, b) {
      if (!a || Na) return "";
      Na = true;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (b) if (b = function() {
          throw Error();
        }, Object.defineProperty(b.prototype, "props", { set: function() {
          throw Error();
        } }), "object" === typeof Reflect && Reflect.construct) {
          try {
            Reflect.construct(b, []);
          } catch (l2) {
            var d = l2;
          }
          Reflect.construct(a, [], b);
        } else {
          try {
            b.call();
          } catch (l2) {
            d = l2;
          }
          a.call(b.prototype);
        }
        else {
          try {
            throw Error();
          } catch (l2) {
            d = l2;
          }
          a();
        }
      } catch (l2) {
        if (l2 && d && "string" === typeof l2.stack) {
          for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
          for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
            if (1 !== g || 1 !== h) {
              do
                if (g--, h--, 0 > h || e[g] !== f2[h]) {
                  var k2 = "\n" + e[g].replace(" at new ", " at ");
                  a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
                  return k2;
                }
              while (1 <= g && 0 <= h);
            }
            break;
          }
        }
      } finally {
        Na = false, Error.prepareStackTrace = c;
      }
      return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
    }
    function Pa(a) {
      switch (a.tag) {
        case 5:
          return Ma(a.type);
        case 16:
          return Ma("Lazy");
        case 13:
          return Ma("Suspense");
        case 19:
          return Ma("SuspenseList");
        case 0:
        case 2:
        case 15:
          return a = Oa(a.type, false), a;
        case 11:
          return a = Oa(a.type.render, false), a;
        case 1:
          return a = Oa(a.type, true), a;
        default:
          return "";
      }
    }
    function Qa(a) {
      if (null == a) return null;
      if ("function" === typeof a) return a.displayName || a.name || null;
      if ("string" === typeof a) return a;
      switch (a) {
        case ya:
          return "Fragment";
        case wa:
          return "Portal";
        case Aa:
          return "Profiler";
        case za:
          return "StrictMode";
        case Ea:
          return "Suspense";
        case Fa:
          return "SuspenseList";
      }
      if ("object" === typeof a) switch (a.$$typeof) {
        case Ca:
          return (a.displayName || "Context") + ".Consumer";
        case Ba:
          return (a._context.displayName || "Context") + ".Provider";
        case Da:
          var b = a.render;
          a = a.displayName;
          a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          return a;
        case Ga:
          return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
        case Ha:
          b = a._payload;
          a = a._init;
          try {
            return Qa(a(b));
          } catch (c) {
          }
      }
      return null;
    }
    function Ra(a) {
      var b = a.type;
      switch (a.tag) {
        case 24:
          return "Cache";
        case 9:
          return (b.displayName || "Context") + ".Consumer";
        case 10:
          return (b._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 5:
          return b;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Qa(b);
        case 8:
          return b === za ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if ("function" === typeof b) return b.displayName || b.name || null;
          if ("string" === typeof b) return b;
      }
      return null;
    }
    function Sa(a) {
      switch (typeof a) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return a;
        case "object":
          return a;
        default:
          return "";
      }
    }
    function Ta(a) {
      var b = a.type;
      return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
    }
    function Ua(a) {
      var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
      if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
        var e = c.get, f2 = c.set;
        Object.defineProperty(a, b, { configurable: true, get: function() {
          return e.call(this);
        }, set: function(a2) {
          d = "" + a2;
          f2.call(this, a2);
        } });
        Object.defineProperty(a, b, { enumerable: c.enumerable });
        return { getValue: function() {
          return d;
        }, setValue: function(a2) {
          d = "" + a2;
        }, stopTracking: function() {
          a._valueTracker = null;
          delete a[b];
        } };
      }
    }
    function Va(a) {
      a._valueTracker || (a._valueTracker = Ua(a));
    }
    function Wa(a) {
      if (!a) return false;
      var b = a._valueTracker;
      if (!b) return true;
      var c = b.getValue();
      var d = "";
      a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
      a = d;
      return a !== c ? (b.setValue(a), true) : false;
    }
    function Xa(a) {
      a = a || ("undefined" !== typeof document ? document : void 0);
      if ("undefined" === typeof a) return null;
      try {
        return a.activeElement || a.body;
      } catch (b) {
        return a.body;
      }
    }
    function Ya(a, b) {
      var c = b.checked;
      return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
    }
    function Za(a, b) {
      var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
      c = Sa(null != b.value ? b.value : c);
      a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
    }
    function ab(a, b) {
      b = b.checked;
      null != b && ta(a, "checked", b, false);
    }
    function bb(a, b) {
      ab(a, b);
      var c = Sa(b.value), d = b.type;
      if (null != c) if ("number" === d) {
        if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
      } else a.value !== "" + c && (a.value = "" + c);
      else if ("submit" === d || "reset" === d) {
        a.removeAttribute("value");
        return;
      }
      b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
      null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
    }
    function db$1(a, b, c) {
      if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
        var d = b.type;
        if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
        b = "" + a._wrapperState.initialValue;
        c || b === a.value || (a.value = b);
        a.defaultValue = b;
      }
      c = a.name;
      "" !== c && (a.name = "");
      a.defaultChecked = !!a._wrapperState.initialChecked;
      "" !== c && (a.name = c);
    }
    function cb(a, b, c) {
      if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
    }
    var eb = Array.isArray;
    function fb(a, b, c, d) {
      a = a.options;
      if (b) {
        b = {};
        for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
        for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
      } else {
        c = "" + Sa(c);
        b = null;
        for (e = 0; e < a.length; e++) {
          if (a[e].value === c) {
            a[e].selected = true;
            d && (a[e].defaultSelected = true);
            return;
          }
          null !== b || a[e].disabled || (b = a[e]);
        }
        null !== b && (b.selected = true);
      }
    }
    function gb(a, b) {
      if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
      return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
    }
    function hb(a, b) {
      var c = b.value;
      if (null == c) {
        c = b.children;
        b = b.defaultValue;
        if (null != c) {
          if (null != b) throw Error(p(92));
          if (eb(c)) {
            if (1 < c.length) throw Error(p(93));
            c = c[0];
          }
          b = c;
        }
        null == b && (b = "");
        c = b;
      }
      a._wrapperState = { initialValue: Sa(c) };
    }
    function ib(a, b) {
      var c = Sa(b.value), d = Sa(b.defaultValue);
      null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
      null != d && (a.defaultValue = "" + d);
    }
    function jb(a) {
      var b = a.textContent;
      b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
    }
    function kb(a) {
      switch (a) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function lb(a, b) {
      return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
    }
    var mb, nb = function(a) {
      return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
        MSApp.execUnsafeLocalFunction(function() {
          return a(b, c, d, e);
        });
      } : a;
    }(function(a, b) {
      if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
      else {
        mb = mb || document.createElement("div");
        mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
        for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
        for (; b.firstChild; ) a.appendChild(b.firstChild);
      }
    });
    function ob(a, b) {
      if (b) {
        var c = a.firstChild;
        if (c && c === a.lastChild && 3 === c.nodeType) {
          c.nodeValue = b;
          return;
        }
      }
      a.textContent = b;
    }
    var pb = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    }, qb = ["Webkit", "ms", "Moz", "O"];
    Object.keys(pb).forEach(function(a) {
      qb.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        pb[b] = pb[a];
      });
    });
    function rb(a, b, c) {
      return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
    }
    function sb(a, b) {
      a = a.style;
      for (var c in b) if (b.hasOwnProperty(c)) {
        var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
        "float" === c && (c = "cssFloat");
        d ? a.setProperty(c, e) : a[c] = e;
      }
    }
    var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
    function ub(a, b) {
      if (b) {
        if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
        if (null != b.dangerouslySetInnerHTML) {
          if (null != b.children) throw Error(p(60));
          if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
        }
        if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
      }
    }
    function vb(a, b) {
      if (-1 === a.indexOf("-")) return "string" === typeof b.is;
      switch (a) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var wb = null;
    function xb(a) {
      a = a.target || a.srcElement || window;
      a.correspondingUseElement && (a = a.correspondingUseElement);
      return 3 === a.nodeType ? a.parentNode : a;
    }
    var yb = null, zb = null, Ab = null;
    function Bb(a) {
      if (a = Cb(a)) {
        if ("function" !== typeof yb) throw Error(p(280));
        var b = a.stateNode;
        b && (b = Db(b), yb(a.stateNode, a.type, b));
      }
    }
    function Eb(a) {
      zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
    }
    function Fb() {
      if (zb) {
        var a = zb, b = Ab;
        Ab = zb = null;
        Bb(a);
        if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
      }
    }
    function Gb(a, b) {
      return a(b);
    }
    function Hb() {
    }
    var Ib = false;
    function Jb(a, b, c) {
      if (Ib) return a(b, c);
      Ib = true;
      try {
        return Gb(a, b, c);
      } finally {
        if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
      }
    }
    function Kb(a, b) {
      var c = a.stateNode;
      if (null === c) return null;
      var d = Db(c);
      if (null === d) return null;
      c = d[b];
      a: switch (b) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
          a = !d;
          break a;
        default:
          a = false;
      }
      if (a) return null;
      if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
      return c;
    }
    var Lb = false;
    if (ia) try {
      var Mb = {};
      Object.defineProperty(Mb, "passive", { get: function() {
        Lb = true;
      } });
      window.addEventListener("test", Mb, Mb);
      window.removeEventListener("test", Mb, Mb);
    } catch (a) {
      Lb = false;
    }
    function Nb(a, b, c, d, e, f2, g, h, k2) {
      var l2 = Array.prototype.slice.call(arguments, 3);
      try {
        b.apply(c, l2);
      } catch (m2) {
        this.onError(m2);
      }
    }
    var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
      Ob = true;
      Pb = a;
    } };
    function Tb(a, b, c, d, e, f2, g, h, k2) {
      Ob = false;
      Pb = null;
      Nb.apply(Sb, arguments);
    }
    function Ub(a, b, c, d, e, f2, g, h, k2) {
      Tb.apply(this, arguments);
      if (Ob) {
        if (Ob) {
          var l2 = Pb;
          Ob = false;
          Pb = null;
        } else throw Error(p(198));
        Qb || (Qb = true, Rb = l2);
      }
    }
    function Vb(a) {
      var b = a, c = a;
      if (a.alternate) for (; b.return; ) b = b.return;
      else {
        a = b;
        do
          b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
        while (a);
      }
      return 3 === b.tag ? c : null;
    }
    function Wb(a) {
      if (13 === a.tag) {
        var b = a.memoizedState;
        null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
        if (null !== b) return b.dehydrated;
      }
      return null;
    }
    function Xb(a) {
      if (Vb(a) !== a) throw Error(p(188));
    }
    function Yb(a) {
      var b = a.alternate;
      if (!b) {
        b = Vb(a);
        if (null === b) throw Error(p(188));
        return b !== a ? null : a;
      }
      for (var c = a, d = b; ; ) {
        var e = c.return;
        if (null === e) break;
        var f2 = e.alternate;
        if (null === f2) {
          d = e.return;
          if (null !== d) {
            c = d;
            continue;
          }
          break;
        }
        if (e.child === f2.child) {
          for (f2 = e.child; f2; ) {
            if (f2 === c) return Xb(e), a;
            if (f2 === d) return Xb(e), b;
            f2 = f2.sibling;
          }
          throw Error(p(188));
        }
        if (c.return !== d.return) c = e, d = f2;
        else {
          for (var g = false, h = e.child; h; ) {
            if (h === c) {
              g = true;
              c = e;
              d = f2;
              break;
            }
            if (h === d) {
              g = true;
              d = e;
              c = f2;
              break;
            }
            h = h.sibling;
          }
          if (!g) {
            for (h = f2.child; h; ) {
              if (h === c) {
                g = true;
                c = f2;
                d = e;
                break;
              }
              if (h === d) {
                g = true;
                d = f2;
                c = e;
                break;
              }
              h = h.sibling;
            }
            if (!g) throw Error(p(189));
          }
        }
        if (c.alternate !== d) throw Error(p(190));
      }
      if (3 !== c.tag) throw Error(p(188));
      return c.stateNode.current === c ? a : b;
    }
    function Zb(a) {
      a = Yb(a);
      return null !== a ? $b(a) : null;
    }
    function $b(a) {
      if (5 === a.tag || 6 === a.tag) return a;
      for (a = a.child; null !== a; ) {
        var b = $b(a);
        if (null !== b) return b;
        a = a.sibling;
      }
      return null;
    }
    var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
    function mc(a) {
      if (lc && "function" === typeof lc.onCommitFiberRoot) try {
        lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
      } catch (b) {
      }
    }
    var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
    function nc(a) {
      a >>>= 0;
      return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
    }
    var rc = 64, sc = 4194304;
    function tc(a) {
      switch (a & -a) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return a & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return a & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return a;
      }
    }
    function uc(a, b) {
      var c = a.pendingLanes;
      if (0 === c) return 0;
      var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
      if (0 !== g) {
        var h = g & ~e;
        0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
      } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
      if (0 === d) return 0;
      if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
      0 !== (d & 4) && (d |= c & 16);
      b = a.entangledLanes;
      if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
      return d;
    }
    function vc(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 4:
          return b + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return b + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function wc(a, b) {
      for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
        var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
        if (-1 === k2) {
          if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
        } else k2 <= b && (a.expiredLanes |= h);
        f2 &= ~h;
      }
    }
    function xc(a) {
      a = a.pendingLanes & -1073741825;
      return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
    }
    function yc() {
      var a = rc;
      rc <<= 1;
      0 === (rc & 4194240) && (rc = 64);
      return a;
    }
    function zc(a) {
      for (var b = [], c = 0; 31 > c; c++) b.push(a);
      return b;
    }
    function Ac(a, b, c) {
      a.pendingLanes |= b;
      536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
      a = a.eventTimes;
      b = 31 - oc(b);
      a[b] = c;
    }
    function Bc(a, b) {
      var c = a.pendingLanes & ~b;
      a.pendingLanes = b;
      a.suspendedLanes = 0;
      a.pingedLanes = 0;
      a.expiredLanes &= b;
      a.mutableReadLanes &= b;
      a.entangledLanes &= b;
      b = a.entanglements;
      var d = a.eventTimes;
      for (a = a.expirationTimes; 0 < c; ) {
        var e = 31 - oc(c), f2 = 1 << e;
        b[e] = 0;
        d[e] = -1;
        a[e] = -1;
        c &= ~f2;
      }
    }
    function Cc(a, b) {
      var c = a.entangledLanes |= b;
      for (a = a.entanglements; c; ) {
        var d = 31 - oc(c), e = 1 << d;
        e & b | a[d] & b && (a[d] |= b);
        c &= ~e;
      }
    }
    var C = 0;
    function Dc(a) {
      a &= -a;
      return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
    }
    var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Sc(a, b) {
      switch (a) {
        case "focusin":
        case "focusout":
          Lc = null;
          break;
        case "dragenter":
        case "dragleave":
          Mc = null;
          break;
        case "mouseover":
        case "mouseout":
          Nc = null;
          break;
        case "pointerover":
        case "pointerout":
          Oc.delete(b.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Pc.delete(b.pointerId);
      }
    }
    function Tc(a, b, c, d, e, f2) {
      if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
      a.eventSystemFlags |= d;
      b = a.targetContainers;
      null !== e && -1 === b.indexOf(e) && b.push(e);
      return a;
    }
    function Uc(a, b, c, d, e) {
      switch (b) {
        case "focusin":
          return Lc = Tc(Lc, a, b, c, d, e), true;
        case "dragenter":
          return Mc = Tc(Mc, a, b, c, d, e), true;
        case "mouseover":
          return Nc = Tc(Nc, a, b, c, d, e), true;
        case "pointerover":
          var f2 = e.pointerId;
          Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
          return true;
        case "gotpointercapture":
          return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
      }
      return false;
    }
    function Vc(a) {
      var b = Wc(a.target);
      if (null !== b) {
        var c = Vb(b);
        if (null !== c) {
          if (b = c.tag, 13 === b) {
            if (b = Wb(c), null !== b) {
              a.blockedOn = b;
              Ic(a.priority, function() {
                Gc(c);
              });
              return;
            }
          } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
            a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
            return;
          }
        }
      }
      a.blockedOn = null;
    }
    function Xc(a) {
      if (null !== a.blockedOn) return false;
      for (var b = a.targetContainers; 0 < b.length; ) {
        var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
        if (null === c) {
          c = a.nativeEvent;
          var d = new c.constructor(c.type, c);
          wb = d;
          c.target.dispatchEvent(d);
          wb = null;
        } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
        b.shift();
      }
      return true;
    }
    function Zc(a, b, c) {
      Xc(a) && c.delete(b);
    }
    function $c() {
      Jc = false;
      null !== Lc && Xc(Lc) && (Lc = null);
      null !== Mc && Xc(Mc) && (Mc = null);
      null !== Nc && Xc(Nc) && (Nc = null);
      Oc.forEach(Zc);
      Pc.forEach(Zc);
    }
    function ad(a, b) {
      a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
    }
    function bd(a) {
      function b(b2) {
        return ad(b2, a);
      }
      if (0 < Kc.length) {
        ad(Kc[0], a);
        for (var c = 1; c < Kc.length; c++) {
          var d = Kc[c];
          d.blockedOn === a && (d.blockedOn = null);
        }
      }
      null !== Lc && ad(Lc, a);
      null !== Mc && ad(Mc, a);
      null !== Nc && ad(Nc, a);
      Oc.forEach(b);
      Pc.forEach(b);
      for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
      for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
    }
    var cd = ua.ReactCurrentBatchConfig, dd = true;
    function ed(a, b, c, d) {
      var e = C, f2 = cd.transition;
      cd.transition = null;
      try {
        C = 1, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f2;
      }
    }
    function gd(a, b, c, d) {
      var e = C, f2 = cd.transition;
      cd.transition = null;
      try {
        C = 4, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f2;
      }
    }
    function fd(a, b, c, d) {
      if (dd) {
        var e = Yc(a, b, c, d);
        if (null === e) hd(a, b, d, id, c), Sc(a, d);
        else if (Uc(e, a, b, c, d)) d.stopPropagation();
        else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
          for (; null !== e; ) {
            var f2 = Cb(e);
            null !== f2 && Ec(f2);
            f2 = Yc(a, b, c, d);
            null === f2 && hd(a, b, d, id, c);
            if (f2 === e) break;
            e = f2;
          }
          null !== e && d.stopPropagation();
        } else hd(a, b, d, null, c);
      }
    }
    var id = null;
    function Yc(a, b, c, d) {
      id = null;
      a = xb(d);
      a = Wc(a);
      if (null !== a) if (b = Vb(a), null === b) a = null;
      else if (c = b.tag, 13 === c) {
        a = Wb(b);
        if (null !== a) return a;
        a = null;
      } else if (3 === c) {
        if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
        a = null;
      } else b !== a && (a = null);
      id = a;
      return null;
    }
    function jd(a) {
      switch (a) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (ec()) {
            case fc:
              return 1;
            case gc:
              return 4;
            case hc:
            case ic:
              return 16;
            case jc:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var kd = null, ld = null, md = null;
    function nd() {
      if (md) return md;
      var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
      for (a = 0; a < c && b[a] === e[a]; a++) ;
      var g = c - a;
      for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
      return md = e.slice(a, 1 < d ? 1 - d : void 0);
    }
    function od(a) {
      var b = a.keyCode;
      "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
      10 === a && (a = 13);
      return 32 <= a || 13 === a ? a : 0;
    }
    function pd() {
      return true;
    }
    function qd() {
      return false;
    }
    function rd(a) {
      function b(b2, d, e, f2, g) {
        this._reactName = b2;
        this._targetInst = e;
        this.type = d;
        this.nativeEvent = f2;
        this.target = g;
        this.currentTarget = null;
        for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
        this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
        this.isPropagationStopped = qd;
        return this;
      }
      A(b.prototype, { preventDefault: function() {
        this.defaultPrevented = true;
        var a2 = this.nativeEvent;
        a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
      }, stopPropagation: function() {
        var a2 = this.nativeEvent;
        a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
      }, persist: function() {
      }, isPersistent: pd });
      return b;
    }
    var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
      return a.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
      return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    }, movementX: function(a) {
      if ("movementX" in a) return a.movementX;
      a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
      return wd;
    }, movementY: function(a) {
      return "movementY" in a ? a.movementY : xd;
    } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Nd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function Pd(a) {
      var b = this.nativeEvent;
      return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
    }
    function zd() {
      return Pd;
    }
    var Qd = A({}, ud, { key: function(a) {
      if (a.key) {
        var b = Md[a.key] || a.key;
        if ("Unidentified" !== b) return b;
      }
      return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
      return "keypress" === a.type ? od(a) : 0;
    }, keyCode: function(a) {
      return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    }, which: function(a) {
      return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
      deltaX: function(a) {
        return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
      },
      deltaY: function(a) {
        return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
    ia && "documentMode" in document && (be = document.documentMode);
    var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
    function ge(a, b) {
      switch (a) {
        case "keyup":
          return -1 !== $d.indexOf(b.keyCode);
        case "keydown":
          return 229 !== b.keyCode;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function he(a) {
      a = a.detail;
      return "object" === typeof a && "data" in a ? a.data : null;
    }
    var ie = false;
    function je(a, b) {
      switch (a) {
        case "compositionend":
          return he(b);
        case "keypress":
          if (32 !== b.which) return null;
          fe = true;
          return ee;
        case "textInput":
          return a = b.data, a === ee && fe ? null : a;
        default:
          return null;
      }
    }
    function ke(a, b) {
      if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
      switch (a) {
        case "paste":
          return null;
        case "keypress":
          if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
            if (b.char && 1 < b.char.length) return b.char;
            if (b.which) return String.fromCharCode(b.which);
          }
          return null;
        case "compositionend":
          return de && "ko" !== b.locale ? null : b.data;
        default:
          return null;
      }
    }
    var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
    function me(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
    }
    function ne(a, b, c, d) {
      Eb(d);
      b = oe(b, "onChange");
      0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
    }
    var pe = null, qe = null;
    function re(a) {
      se(a, 0);
    }
    function te(a) {
      var b = ue(a);
      if (Wa(b)) return a;
    }
    function ve(a, b) {
      if ("change" === a) return b;
    }
    var we = false;
    if (ia) {
      var xe;
      if (ia) {
        var ye = "oninput" in document;
        if (!ye) {
          var ze = document.createElement("div");
          ze.setAttribute("oninput", "return;");
          ye = "function" === typeof ze.oninput;
        }
        xe = ye;
      } else xe = false;
      we = xe && (!document.documentMode || 9 < document.documentMode);
    }
    function Ae() {
      pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
    }
    function Be(a) {
      if ("value" === a.propertyName && te(qe)) {
        var b = [];
        ne(b, qe, a, xb(a));
        Jb(re, b);
      }
    }
    function Ce(a, b, c) {
      "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
    }
    function De(a) {
      if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
    }
    function Ee(a, b) {
      if ("click" === a) return te(b);
    }
    function Fe(a, b) {
      if ("input" === a || "change" === a) return te(b);
    }
    function Ge(a, b) {
      return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var He = "function" === typeof Object.is ? Object.is : Ge;
    function Ie(a, b) {
      if (He(a, b)) return true;
      if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
      var c = Object.keys(a), d = Object.keys(b);
      if (c.length !== d.length) return false;
      for (d = 0; d < c.length; d++) {
        var e = c[d];
        if (!ja.call(b, e) || !He(a[e], b[e])) return false;
      }
      return true;
    }
    function Je(a) {
      for (; a && a.firstChild; ) a = a.firstChild;
      return a;
    }
    function Ke(a, b) {
      var c = Je(a);
      a = 0;
      for (var d; c; ) {
        if (3 === c.nodeType) {
          d = a + c.textContent.length;
          if (a <= b && d >= b) return { node: c, offset: b - a };
          a = d;
        }
        a: {
          for (; c; ) {
            if (c.nextSibling) {
              c = c.nextSibling;
              break a;
            }
            c = c.parentNode;
          }
          c = void 0;
        }
        c = Je(c);
      }
    }
    function Le(a, b) {
      return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
    }
    function Me() {
      for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
        try {
          var c = "string" === typeof b.contentWindow.location.href;
        } catch (d) {
          c = false;
        }
        if (c) a = b.contentWindow;
        else break;
        b = Xa(a.document);
      }
      return b;
    }
    function Ne(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
    }
    function Oe(a) {
      var b = Me(), c = a.focusedElem, d = a.selectionRange;
      if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
        if (null !== d && Ne(c)) {
          if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
          else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
            a = a.getSelection();
            var e = c.textContent.length, f2 = Math.min(d.start, e);
            d = void 0 === d.end ? f2 : Math.min(d.end, e);
            !a.extend && f2 > d && (e = d, d = f2, f2 = e);
            e = Ke(c, f2);
            var g = Ke(
              c,
              d
            );
            e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
          }
        }
        b = [];
        for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
        "function" === typeof c.focus && c.focus();
        for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
      }
    }
    var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
    function Ue(a, b, c) {
      var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
      Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
    }
    function Ve(a, b) {
      var c = {};
      c[a.toLowerCase()] = b.toLowerCase();
      c["Webkit" + a] = "webkit" + b;
      c["Moz" + a] = "moz" + b;
      return c;
    }
    var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
    ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
    function Ze(a) {
      if (Xe[a]) return Xe[a];
      if (!We[a]) return a;
      var b = We[a], c;
      for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
      return a;
    }
    var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function ff(a, b) {
      df.set(a, b);
      fa(b, [a]);
    }
    for (var gf = 0; gf < ef.length; gf++) {
      var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
      ff(jf, "on" + kf);
    }
    ff($e, "onAnimationEnd");
    ff(af, "onAnimationIteration");
    ff(bf, "onAnimationStart");
    ff("dblclick", "onDoubleClick");
    ff("focusin", "onFocus");
    ff("focusout", "onBlur");
    ff(cf, "onTransitionEnd");
    ha("onMouseEnter", ["mouseout", "mouseover"]);
    ha("onMouseLeave", ["mouseout", "mouseover"]);
    ha("onPointerEnter", ["pointerout", "pointerover"]);
    ha("onPointerLeave", ["pointerout", "pointerover"]);
    fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
    function nf(a, b, c) {
      var d = a.type || "unknown-event";
      a.currentTarget = c;
      Ub(d, b, void 0, a);
      a.currentTarget = null;
    }
    function se(a, b) {
      b = 0 !== (b & 4);
      for (var c = 0; c < a.length; c++) {
        var d = a[c], e = d.event;
        d = d.listeners;
        a: {
          var f2 = void 0;
          if (b) for (var g = d.length - 1; 0 <= g; g--) {
            var h = d[g], k2 = h.instance, l2 = h.currentTarget;
            h = h.listener;
            if (k2 !== f2 && e.isPropagationStopped()) break a;
            nf(e, h, l2);
            f2 = k2;
          }
          else for (g = 0; g < d.length; g++) {
            h = d[g];
            k2 = h.instance;
            l2 = h.currentTarget;
            h = h.listener;
            if (k2 !== f2 && e.isPropagationStopped()) break a;
            nf(e, h, l2);
            f2 = k2;
          }
        }
      }
      if (Qb) throw a = Rb, Qb = false, Rb = null, a;
    }
    function D(a, b) {
      var c = b[of];
      void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
      var d = a + "__bubble";
      c.has(d) || (pf(b, a, 2, false), c.add(d));
    }
    function qf(a, b, c) {
      var d = 0;
      b && (d |= 4);
      pf(c, a, d, b);
    }
    var rf = "_reactListening" + Math.random().toString(36).slice(2);
    function sf(a) {
      if (!a[rf]) {
        a[rf] = true;
        da.forEach(function(b2) {
          "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
        });
        var b = 9 === a.nodeType ? a : a.ownerDocument;
        null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
      }
    }
    function pf(a, b, c, d) {
      switch (jd(b)) {
        case 1:
          var e = ed;
          break;
        case 4:
          e = gd;
          break;
        default:
          e = fd;
      }
      c = e.bind(null, b, c, a);
      e = void 0;
      !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
      d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
    }
    function hd(a, b, c, d, e) {
      var f2 = d;
      if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
        if (null === d) return;
        var g = d.tag;
        if (3 === g || 4 === g) {
          var h = d.stateNode.containerInfo;
          if (h === e || 8 === h.nodeType && h.parentNode === e) break;
          if (4 === g) for (g = d.return; null !== g; ) {
            var k2 = g.tag;
            if (3 === k2 || 4 === k2) {
              if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
            }
            g = g.return;
          }
          for (; null !== h; ) {
            g = Wc(h);
            if (null === g) return;
            k2 = g.tag;
            if (5 === k2 || 6 === k2) {
              d = f2 = g;
              continue a;
            }
            h = h.parentNode;
          }
        }
        d = d.return;
      }
      Jb(function() {
        var d2 = f2, e2 = xb(c), g2 = [];
        a: {
          var h2 = df.get(a);
          if (void 0 !== h2) {
            var k3 = td, n2 = a;
            switch (a) {
              case "keypress":
                if (0 === od(c)) break a;
              case "keydown":
              case "keyup":
                k3 = Rd;
                break;
              case "focusin":
                n2 = "focus";
                k3 = Fd;
                break;
              case "focusout":
                n2 = "blur";
                k3 = Fd;
                break;
              case "beforeblur":
              case "afterblur":
                k3 = Fd;
                break;
              case "click":
                if (2 === c.button) break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                k3 = Bd;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                k3 = Dd;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                k3 = Vd;
                break;
              case $e:
              case af:
              case bf:
                k3 = Hd;
                break;
              case cf:
                k3 = Xd;
                break;
              case "scroll":
                k3 = vd;
                break;
              case "wheel":
                k3 = Zd;
                break;
              case "copy":
              case "cut":
              case "paste":
                k3 = Jd;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                k3 = Td;
            }
            var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
            t2 = [];
            for (var w2 = d2, u2; null !== w2; ) {
              u2 = w2;
              var F2 = u2.stateNode;
              5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
              if (J2) break;
              w2 = w2.return;
            }
            0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
          }
        }
        if (0 === (b & 7)) {
          a: {
            h2 = "mouseover" === a || "pointerover" === a;
            k3 = "mouseout" === a || "pointerout" === a;
            if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
            if (k3 || h2) {
              h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
              if (k3) {
                if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
              } else k3 = null, n2 = d2;
              if (k3 !== n2) {
                t2 = Bd;
                F2 = "onMouseLeave";
                x2 = "onMouseEnter";
                w2 = "mouse";
                if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
                J2 = null == k3 ? h2 : ue(k3);
                u2 = null == n2 ? h2 : ue(n2);
                h2 = new t2(F2, w2 + "leave", k3, c, e2);
                h2.target = J2;
                h2.relatedTarget = u2;
                F2 = null;
                Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
                J2 = F2;
                if (k3 && n2) b: {
                  t2 = k3;
                  x2 = n2;
                  w2 = 0;
                  for (u2 = t2; u2; u2 = vf(u2)) w2++;
                  u2 = 0;
                  for (F2 = x2; F2; F2 = vf(F2)) u2++;
                  for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
                  for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
                  for (; w2--; ) {
                    if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                    t2 = vf(t2);
                    x2 = vf(x2);
                  }
                  t2 = null;
                }
                else t2 = null;
                null !== k3 && wf(g2, h2, k3, t2, false);
                null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
              }
            }
          }
          a: {
            h2 = d2 ? ue(d2) : window;
            k3 = h2.nodeName && h2.nodeName.toLowerCase();
            if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
            else if (me(h2)) if (we) na = Fe;
            else {
              na = De;
              var xa = Ce;
            }
            else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
            if (na && (na = na(a, d2))) {
              ne(g2, na, c, e2);
              break a;
            }
            xa && xa(a, h2, d2);
            "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
          }
          xa = d2 ? ue(d2) : window;
          switch (a) {
            case "focusin":
              if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
              break;
            case "focusout":
              Se = Re = Qe = null;
              break;
            case "mousedown":
              Te = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Te = false;
              Ue(g2, c, e2);
              break;
            case "selectionchange":
              if (Pe) break;
            case "keydown":
            case "keyup":
              Ue(g2, c, e2);
          }
          var $a;
          if (ae) b: {
            switch (a) {
              case "compositionstart":
                var ba = "onCompositionStart";
                break b;
              case "compositionend":
                ba = "onCompositionEnd";
                break b;
              case "compositionupdate":
                ba = "onCompositionUpdate";
                break b;
            }
            ba = void 0;
          }
          else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
          ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
          if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
        }
        se(g2, b);
      });
    }
    function tf(a, b, c) {
      return { instance: a, listener: b, currentTarget: c };
    }
    function oe(a, b) {
      for (var c = b + "Capture", d = []; null !== a; ) {
        var e = a, f2 = e.stateNode;
        5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
        a = a.return;
      }
      return d;
    }
    function vf(a) {
      if (null === a) return null;
      do
        a = a.return;
      while (a && 5 !== a.tag);
      return a ? a : null;
    }
    function wf(a, b, c, d, e) {
      for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
        var h = c, k2 = h.alternate, l2 = h.stateNode;
        if (null !== k2 && k2 === d) break;
        5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
        c = c.return;
      }
      0 !== g.length && a.push({ event: b, listeners: g });
    }
    var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
    function zf(a) {
      return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
    }
    function Af(a, b, c) {
      b = zf(b);
      if (zf(a) !== b && c) throw Error(p(425));
    }
    function Bf() {
    }
    var Cf = null, Df = null;
    function Ef(a, b) {
      return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
    }
    var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
      return Hf.resolve(null).then(a).catch(If);
    } : Ff;
    function If(a) {
      setTimeout(function() {
        throw a;
      });
    }
    function Kf(a, b) {
      var c = b, d = 0;
      do {
        var e = c.nextSibling;
        a.removeChild(c);
        if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
          if (0 === d) {
            a.removeChild(e);
            bd(b);
            return;
          }
          d--;
        } else "$" !== c && "$?" !== c && "$!" !== c || d++;
        c = e;
      } while (c);
      bd(b);
    }
    function Lf(a) {
      for (; null != a; a = a.nextSibling) {
        var b = a.nodeType;
        if (1 === b || 3 === b) break;
        if (8 === b) {
          b = a.data;
          if ("$" === b || "$!" === b || "$?" === b) break;
          if ("/$" === b) return null;
        }
      }
      return a;
    }
    function Mf(a) {
      a = a.previousSibling;
      for (var b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("$" === c || "$!" === c || "$?" === c) {
            if (0 === b) return a;
            b--;
          } else "/$" === c && b++;
        }
        a = a.previousSibling;
      }
      return null;
    }
    var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
    function Wc(a) {
      var b = a[Of];
      if (b) return b;
      for (var c = a.parentNode; c; ) {
        if (b = c[uf] || c[Of]) {
          c = b.alternate;
          if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
            if (c = a[Of]) return c;
            a = Mf(a);
          }
          return b;
        }
        a = c;
        c = a.parentNode;
      }
      return null;
    }
    function Cb(a) {
      a = a[Of] || a[uf];
      return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
    }
    function ue(a) {
      if (5 === a.tag || 6 === a.tag) return a.stateNode;
      throw Error(p(33));
    }
    function Db(a) {
      return a[Pf] || null;
    }
    var Sf = [], Tf = -1;
    function Uf(a) {
      return { current: a };
    }
    function E(a) {
      0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
    }
    function G(a, b) {
      Tf++;
      Sf[Tf] = a.current;
      a.current = b;
    }
    var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
    function Yf(a, b) {
      var c = a.type.contextTypes;
      if (!c) return Vf;
      var d = a.stateNode;
      if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
      var e = {}, f2;
      for (f2 in c) e[f2] = b[f2];
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
      return e;
    }
    function Zf(a) {
      a = a.childContextTypes;
      return null !== a && void 0 !== a;
    }
    function $f() {
      E(Wf);
      E(H);
    }
    function ag(a, b, c) {
      if (H.current !== Vf) throw Error(p(168));
      G(H, b);
      G(Wf, c);
    }
    function bg(a, b, c) {
      var d = a.stateNode;
      b = b.childContextTypes;
      if ("function" !== typeof d.getChildContext) return c;
      d = d.getChildContext();
      for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
      return A({}, c, d);
    }
    function cg(a) {
      a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
      Xf = H.current;
      G(H, a);
      G(Wf, Wf.current);
      return true;
    }
    function dg(a, b, c) {
      var d = a.stateNode;
      if (!d) throw Error(p(169));
      c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
      G(Wf, c);
    }
    var eg = null, fg = false, gg = false;
    function hg(a) {
      null === eg ? eg = [a] : eg.push(a);
    }
    function ig(a) {
      fg = true;
      hg(a);
    }
    function jg() {
      if (!gg && null !== eg) {
        gg = true;
        var a = 0, b = C;
        try {
          var c = eg;
          for (C = 1; a < c.length; a++) {
            var d = c[a];
            do
              d = d(true);
            while (null !== d);
          }
          eg = null;
          fg = false;
        } catch (e) {
          throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
        } finally {
          C = b, gg = false;
        }
      }
      return null;
    }
    var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
    function tg(a, b) {
      kg[lg++] = ng;
      kg[lg++] = mg;
      mg = a;
      ng = b;
    }
    function ug(a, b, c) {
      og[pg++] = rg;
      og[pg++] = sg;
      og[pg++] = qg;
      qg = a;
      var d = rg;
      a = sg;
      var e = 32 - oc(d) - 1;
      d &= ~(1 << e);
      c += 1;
      var f2 = 32 - oc(b) + e;
      if (30 < f2) {
        var g = e - e % 5;
        f2 = (d & (1 << g) - 1).toString(32);
        d >>= g;
        e -= g;
        rg = 1 << 32 - oc(b) + e | c << e | d;
        sg = f2 + a;
      } else rg = 1 << f2 | c << e | d, sg = a;
    }
    function vg(a) {
      null !== a.return && (tg(a, 1), ug(a, 1, 0));
    }
    function wg(a) {
      for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
      for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
    }
    var xg = null, yg = null, I = false, zg = null;
    function Ag(a, b) {
      var c = Bg(5, null, null, 0);
      c.elementType = "DELETED";
      c.stateNode = b;
      c.return = a;
      b = a.deletions;
      null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
    }
    function Cg(a, b) {
      switch (a.tag) {
        case 5:
          var c = a.type;
          b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
          return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
        case 6:
          return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
        case 13:
          return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
        default:
          return false;
      }
    }
    function Dg(a) {
      return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
    }
    function Eg(a) {
      if (I) {
        var b = yg;
        if (b) {
          var c = b;
          if (!Cg(a, b)) {
            if (Dg(a)) throw Error(p(418));
            b = Lf(c.nextSibling);
            var d = xg;
            b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
          }
        } else {
          if (Dg(a)) throw Error(p(418));
          a.flags = a.flags & -4097 | 2;
          I = false;
          xg = a;
        }
      }
    }
    function Fg(a) {
      for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
      xg = a;
    }
    function Gg(a) {
      if (a !== xg) return false;
      if (!I) return Fg(a), I = true, false;
      var b;
      (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
      if (b && (b = yg)) {
        if (Dg(a)) throw Hg(), Error(p(418));
        for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
      }
      Fg(a);
      if (13 === a.tag) {
        a = a.memoizedState;
        a = null !== a ? a.dehydrated : null;
        if (!a) throw Error(p(317));
        a: {
          a = a.nextSibling;
          for (b = 0; a; ) {
            if (8 === a.nodeType) {
              var c = a.data;
              if ("/$" === c) {
                if (0 === b) {
                  yg = Lf(a.nextSibling);
                  break a;
                }
                b--;
              } else "$" !== c && "$!" !== c && "$?" !== c || b++;
            }
            a = a.nextSibling;
          }
          yg = null;
        }
      } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
      return true;
    }
    function Hg() {
      for (var a = yg; a; ) a = Lf(a.nextSibling);
    }
    function Ig() {
      yg = xg = null;
      I = false;
    }
    function Jg(a) {
      null === zg ? zg = [a] : zg.push(a);
    }
    var Kg = ua.ReactCurrentBatchConfig;
    function Lg(a, b, c) {
      a = c.ref;
      if (null !== a && "function" !== typeof a && "object" !== typeof a) {
        if (c._owner) {
          c = c._owner;
          if (c) {
            if (1 !== c.tag) throw Error(p(309));
            var d = c.stateNode;
          }
          if (!d) throw Error(p(147, a));
          var e = d, f2 = "" + a;
          if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
          b = function(a2) {
            var b2 = e.refs;
            null === a2 ? delete b2[f2] : b2[f2] = a2;
          };
          b._stringRef = f2;
          return b;
        }
        if ("string" !== typeof a) throw Error(p(284));
        if (!c._owner) throw Error(p(290, a));
      }
      return a;
    }
    function Mg(a, b) {
      a = Object.prototype.toString.call(b);
      throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
    }
    function Ng(a) {
      var b = a._init;
      return b(a._payload);
    }
    function Og(a) {
      function b(b2, c2) {
        if (a) {
          var d2 = b2.deletions;
          null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
        }
      }
      function c(c2, d2) {
        if (!a) return null;
        for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
        return null;
      }
      function d(a2, b2) {
        for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
        return a2;
      }
      function e(a2, b2) {
        a2 = Pg(a2, b2);
        a2.index = 0;
        a2.sibling = null;
        return a2;
      }
      function f2(b2, c2, d2) {
        b2.index = d2;
        if (!a) return b2.flags |= 1048576, c2;
        d2 = b2.alternate;
        if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
        b2.flags |= 2;
        return c2;
      }
      function g(b2) {
        a && null === b2.alternate && (b2.flags |= 2);
        return b2;
      }
      function h(a2, b2, c2, d2) {
        if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function k2(a2, b2, c2, d2) {
        var f3 = c2.type;
        if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
        if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
        d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
        d2.ref = Lg(a2, b2, c2);
        d2.return = a2;
        return d2;
      }
      function l2(a2, b2, c2, d2) {
        if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2.children || []);
        b2.return = a2;
        return b2;
      }
      function m2(a2, b2, c2, d2, f3) {
        if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function q2(a2, b2, c2) {
        if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
        if ("object" === typeof b2 && null !== b2) {
          switch (b2.$$typeof) {
            case va:
              return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
            case wa:
              return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
            case Ha:
              var d2 = b2._init;
              return q2(a2, d2(b2._payload), c2);
          }
          if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
          Mg(a2, b2);
        }
        return null;
      }
      function r2(a2, b2, c2, d2) {
        var e2 = null !== b2 ? b2.key : null;
        if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
        if ("object" === typeof c2 && null !== c2) {
          switch (c2.$$typeof) {
            case va:
              return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
            case wa:
              return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
            case Ha:
              return e2 = c2._init, r2(
                a2,
                b2,
                e2(c2._payload),
                d2
              );
          }
          if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
          Mg(a2, c2);
        }
        return null;
      }
      function y2(a2, b2, c2, d2, e2) {
        if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
        if ("object" === typeof d2 && null !== d2) {
          switch (d2.$$typeof) {
            case va:
              return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
            case wa:
              return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
            case Ha:
              var f3 = d2._init;
              return y2(a2, b2, c2, f3(d2._payload), e2);
          }
          if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
          Mg(b2, d2);
        }
        return null;
      }
      function n2(e2, g2, h2, k3) {
        for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
          u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
          var n3 = r2(e2, u2, h2[w2], k3);
          if (null === n3) {
            null === u2 && (u2 = x2);
            break;
          }
          a && u2 && null === n3.alternate && b(e2, u2);
          g2 = f2(n3, g2, w2);
          null === m3 ? l3 = n3 : m3.sibling = n3;
          m3 = n3;
          u2 = x2;
        }
        if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
        if (null === u2) {
          for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
          I && tg(e2, w2);
          return l3;
        }
        for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
        a && u2.forEach(function(a2) {
          return b(e2, a2);
        });
        I && tg(e2, w2);
        return l3;
      }
      function t2(e2, g2, h2, k3) {
        var l3 = Ka(h2);
        if ("function" !== typeof l3) throw Error(p(150));
        h2 = l3.call(h2);
        if (null == h2) throw Error(p(151));
        for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
          m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
          var t3 = r2(e2, m3, n3.value, k3);
          if (null === t3) {
            null === m3 && (m3 = x2);
            break;
          }
          a && m3 && null === t3.alternate && b(e2, m3);
          g2 = f2(t3, g2, w2);
          null === u2 ? l3 = t3 : u2.sibling = t3;
          u2 = t3;
          m3 = x2;
        }
        if (n3.done) return c(
          e2,
          m3
        ), I && tg(e2, w2), l3;
        if (null === m3) {
          for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
          I && tg(e2, w2);
          return l3;
        }
        for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
        a && m3.forEach(function(a2) {
          return b(e2, a2);
        });
        I && tg(e2, w2);
        return l3;
      }
      function J2(a2, d2, f3, h2) {
        "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
        if ("object" === typeof f3 && null !== f3) {
          switch (f3.$$typeof) {
            case va:
              a: {
                for (var k3 = f3.key, l3 = d2; null !== l3; ) {
                  if (l3.key === k3) {
                    k3 = f3.type;
                    if (k3 === ya) {
                      if (7 === l3.tag) {
                        c(a2, l3.sibling);
                        d2 = e(l3, f3.props.children);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                    } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                      c(a2, l3.sibling);
                      d2 = e(l3, f3.props);
                      d2.ref = Lg(a2, l3, f3);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                    c(a2, l3);
                    break;
                  } else b(a2, l3);
                  l3 = l3.sibling;
                }
                f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
              }
              return g(a2);
            case wa:
              a: {
                for (l3 = f3.key; null !== d2; ) {
                  if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                    c(a2, d2.sibling);
                    d2 = e(d2, f3.children || []);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  } else {
                    c(a2, d2);
                    break;
                  }
                  else b(a2, d2);
                  d2 = d2.sibling;
                }
                d2 = Sg(f3, a2.mode, h2);
                d2.return = a2;
                a2 = d2;
              }
              return g(a2);
            case Ha:
              return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
          }
          if (eb(f3)) return n2(a2, d2, f3, h2);
          if (Ka(f3)) return t2(a2, d2, f3, h2);
          Mg(a2, f3);
        }
        return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
      }
      return J2;
    }
    var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
    function $g() {
      Zg = Yg = Xg = null;
    }
    function ah(a) {
      var b = Wg.current;
      E(Wg);
      a._currentValue = b;
    }
    function bh(a, b, c) {
      for (; null !== a; ) {
        var d = a.alternate;
        (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
        if (a === c) break;
        a = a.return;
      }
    }
    function ch(a, b) {
      Xg = a;
      Zg = Yg = null;
      a = a.dependencies;
      null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
    }
    function eh(a) {
      var b = a._currentValue;
      if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
        if (null === Xg) throw Error(p(308));
        Yg = a;
        Xg.dependencies = { lanes: 0, firstContext: a };
      } else Yg = Yg.next = a;
      return b;
    }
    var fh = null;
    function gh(a) {
      null === fh ? fh = [a] : fh.push(a);
    }
    function hh(a, b, c, d) {
      var e = b.interleaved;
      null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
      b.interleaved = c;
      return ih(a, d);
    }
    function ih(a, b) {
      a.lanes |= b;
      var c = a.alternate;
      null !== c && (c.lanes |= b);
      c = a;
      for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
      return 3 === c.tag ? c.stateNode : null;
    }
    var jh = false;
    function kh(a) {
      a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
    }
    function lh(a, b) {
      a = a.updateQueue;
      b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
    }
    function mh(a, b) {
      return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
    }
    function nh(a, b, c) {
      var d = a.updateQueue;
      if (null === d) return null;
      d = d.shared;
      if (0 !== (K & 2)) {
        var e = d.pending;
        null === e ? b.next = b : (b.next = e.next, e.next = b);
        d.pending = b;
        return ih(a, c);
      }
      e = d.interleaved;
      null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
      d.interleaved = b;
      return ih(a, c);
    }
    function oh(a, b, c) {
      b = b.updateQueue;
      if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
        var d = b.lanes;
        d &= a.pendingLanes;
        c |= d;
        b.lanes = c;
        Cc(a, c);
      }
    }
    function ph(a, b) {
      var c = a.updateQueue, d = a.alternate;
      if (null !== d && (d = d.updateQueue, c === d)) {
        var e = null, f2 = null;
        c = c.firstBaseUpdate;
        if (null !== c) {
          do {
            var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
            null === f2 ? e = f2 = g : f2 = f2.next = g;
            c = c.next;
          } while (null !== c);
          null === f2 ? e = f2 = b : f2 = f2.next = b;
        } else e = f2 = b;
        c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
        a.updateQueue = c;
        return;
      }
      a = c.lastBaseUpdate;
      null === a ? c.firstBaseUpdate = b : a.next = b;
      c.lastBaseUpdate = b;
    }
    function qh(a, b, c, d) {
      var e = a.updateQueue;
      jh = false;
      var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
      if (null !== h) {
        e.shared.pending = null;
        var k2 = h, l2 = k2.next;
        k2.next = null;
        null === g ? f2 = l2 : g.next = l2;
        g = k2;
        var m2 = a.alternate;
        null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
      }
      if (null !== f2) {
        var q2 = e.baseState;
        g = 0;
        m2 = l2 = k2 = null;
        h = f2;
        do {
          var r2 = h.lane, y2 = h.eventTime;
          if ((d & r2) === r2) {
            null !== m2 && (m2 = m2.next = {
              eventTime: y2,
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            });
            a: {
              var n2 = a, t2 = h;
              r2 = b;
              y2 = c;
              switch (t2.tag) {
                case 1:
                  n2 = t2.payload;
                  if ("function" === typeof n2) {
                    q2 = n2.call(y2, q2, r2);
                    break a;
                  }
                  q2 = n2;
                  break a;
                case 3:
                  n2.flags = n2.flags & -65537 | 128;
                case 0:
                  n2 = t2.payload;
                  r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
                  if (null === r2 || void 0 === r2) break a;
                  q2 = A({}, q2, r2);
                  break a;
                case 2:
                  jh = true;
              }
            }
            null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
          } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
          h = h.next;
          if (null === h) if (h = e.shared.pending, null === h) break;
          else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
        } while (1);
        null === m2 && (k2 = q2);
        e.baseState = k2;
        e.firstBaseUpdate = l2;
        e.lastBaseUpdate = m2;
        b = e.shared.interleaved;
        if (null !== b) {
          e = b;
          do
            g |= e.lane, e = e.next;
          while (e !== b);
        } else null === f2 && (e.shared.lanes = 0);
        rh |= g;
        a.lanes = g;
        a.memoizedState = q2;
      }
    }
    function sh(a, b, c) {
      a = b.effects;
      b.effects = null;
      if (null !== a) for (b = 0; b < a.length; b++) {
        var d = a[b], e = d.callback;
        if (null !== e) {
          d.callback = null;
          d = c;
          if ("function" !== typeof e) throw Error(p(191, e));
          e.call(d);
        }
      }
    }
    var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
    function xh(a) {
      if (a === th) throw Error(p(174));
      return a;
    }
    function yh(a, b) {
      G(wh, b);
      G(vh, a);
      G(uh, th);
      a = b.nodeType;
      switch (a) {
        case 9:
        case 11:
          b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
          break;
        default:
          a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
      }
      E(uh);
      G(uh, b);
    }
    function zh() {
      E(uh);
      E(vh);
      E(wh);
    }
    function Ah(a) {
      xh(wh.current);
      var b = xh(uh.current);
      var c = lb(b, a.type);
      b !== c && (G(vh, a), G(uh, c));
    }
    function Bh(a) {
      vh.current === a && (E(uh), E(vh));
    }
    var L = Uf(0);
    function Ch(a) {
      for (var b = a; null !== b; ) {
        if (13 === b.tag) {
          var c = b.memoizedState;
          if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
        } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
          if (0 !== (b.flags & 128)) return b;
        } else if (null !== b.child) {
          b.child.return = b;
          b = b.child;
          continue;
        }
        if (b === a) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a) return null;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
      return null;
    }
    var Dh = [];
    function Eh() {
      for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
      Dh.length = 0;
    }
    var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
    function P() {
      throw Error(p(321));
    }
    function Mh(a, b) {
      if (null === b) return false;
      for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
      return true;
    }
    function Nh(a, b, c, d, e, f2) {
      Hh = f2;
      M = b;
      b.memoizedState = null;
      b.updateQueue = null;
      b.lanes = 0;
      Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
      a = c(d, e);
      if (Jh) {
        f2 = 0;
        do {
          Jh = false;
          Kh = 0;
          if (25 <= f2) throw Error(p(301));
          f2 += 1;
          O = N = null;
          b.updateQueue = null;
          Fh.current = Qh;
          a = c(d, e);
        } while (Jh);
      }
      Fh.current = Rh;
      b = null !== N && null !== N.next;
      Hh = 0;
      O = N = M = null;
      Ih = false;
      if (b) throw Error(p(300));
      return a;
    }
    function Sh() {
      var a = 0 !== Kh;
      Kh = 0;
      return a;
    }
    function Th() {
      var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      null === O ? M.memoizedState = O = a : O = O.next = a;
      return O;
    }
    function Uh() {
      if (null === N) {
        var a = M.alternate;
        a = null !== a ? a.memoizedState : null;
      } else a = N.next;
      var b = null === O ? M.memoizedState : O.next;
      if (null !== b) O = b, N = a;
      else {
        if (null === a) throw Error(p(310));
        N = a;
        a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
      }
      return O;
    }
    function Vh(a, b) {
      return "function" === typeof b ? b(a) : b;
    }
    function Wh(a) {
      var b = Uh(), c = b.queue;
      if (null === c) throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = N, e = d.baseQueue, f2 = c.pending;
      if (null !== f2) {
        if (null !== e) {
          var g = e.next;
          e.next = f2.next;
          f2.next = g;
        }
        d.baseQueue = e = f2;
        c.pending = null;
      }
      if (null !== e) {
        f2 = e.next;
        d = d.baseState;
        var h = g = null, k2 = null, l2 = f2;
        do {
          var m2 = l2.lane;
          if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
          else {
            var q2 = {
              lane: m2,
              action: l2.action,
              hasEagerState: l2.hasEagerState,
              eagerState: l2.eagerState,
              next: null
            };
            null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
            M.lanes |= m2;
            rh |= m2;
          }
          l2 = l2.next;
        } while (null !== l2 && l2 !== f2);
        null === k2 ? g = d : k2.next = h;
        He(d, b.memoizedState) || (dh = true);
        b.memoizedState = d;
        b.baseState = g;
        b.baseQueue = k2;
        c.lastRenderedState = d;
      }
      a = c.interleaved;
      if (null !== a) {
        e = a;
        do
          f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
        while (e !== a);
      } else null === e && (c.lanes = 0);
      return [b.memoizedState, c.dispatch];
    }
    function Xh(a) {
      var b = Uh(), c = b.queue;
      if (null === c) throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
      if (null !== e) {
        c.pending = null;
        var g = e = e.next;
        do
          f2 = a(f2, g.action), g = g.next;
        while (g !== e);
        He(f2, b.memoizedState) || (dh = true);
        b.memoizedState = f2;
        null === b.baseQueue && (b.baseState = f2);
        c.lastRenderedState = f2;
      }
      return [f2, d];
    }
    function Yh() {
    }
    function Zh(a, b) {
      var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
      f2 && (d.memoizedState = e, dh = true);
      d = d.queue;
      $h(ai.bind(null, c, d, a), [a]);
      if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
        c.flags |= 2048;
        bi(9, ci.bind(null, c, d, e, b), void 0, null);
        if (null === Q) throw Error(p(349));
        0 !== (Hh & 30) || di(c, b, e);
      }
      return e;
    }
    function di(a, b, c) {
      a.flags |= 16384;
      a = { getSnapshot: b, value: c };
      b = M.updateQueue;
      null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
    }
    function ci(a, b, c, d) {
      b.value = c;
      b.getSnapshot = d;
      ei(b) && fi(a);
    }
    function ai(a, b, c) {
      return c(function() {
        ei(b) && fi(a);
      });
    }
    function ei(a) {
      var b = a.getSnapshot;
      a = a.value;
      try {
        var c = b();
        return !He(a, c);
      } catch (d) {
        return true;
      }
    }
    function fi(a) {
      var b = ih(a, 1);
      null !== b && gi(b, a, 1, -1);
    }
    function hi(a) {
      var b = Th();
      "function" === typeof a && (a = a());
      b.memoizedState = b.baseState = a;
      a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
      b.queue = a;
      a = a.dispatch = ii.bind(null, M, a);
      return [b.memoizedState, a];
    }
    function bi(a, b, c, d) {
      a = { tag: a, create: b, destroy: c, deps: d, next: null };
      b = M.updateQueue;
      null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
      return a;
    }
    function ji() {
      return Uh().memoizedState;
    }
    function ki(a, b, c, d) {
      var e = Th();
      M.flags |= a;
      e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
    }
    function li(a, b, c, d) {
      var e = Uh();
      d = void 0 === d ? null : d;
      var f2 = void 0;
      if (null !== N) {
        var g = N.memoizedState;
        f2 = g.destroy;
        if (null !== d && Mh(d, g.deps)) {
          e.memoizedState = bi(b, c, f2, d);
          return;
        }
      }
      M.flags |= a;
      e.memoizedState = bi(1 | b, c, f2, d);
    }
    function mi(a, b) {
      return ki(8390656, 8, a, b);
    }
    function $h(a, b) {
      return li(2048, 8, a, b);
    }
    function ni(a, b) {
      return li(4, 2, a, b);
    }
    function oi(a, b) {
      return li(4, 4, a, b);
    }
    function pi(a, b) {
      if ("function" === typeof b) return a = a(), b(a), function() {
        b(null);
      };
      if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
        b.current = null;
      };
    }
    function qi(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return li(4, 4, pi.bind(null, b, a), c);
    }
    function ri() {
    }
    function si(a, b) {
      var c = Uh();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && Mh(b, d[1])) return d[0];
      c.memoizedState = [a, b];
      return a;
    }
    function ti(a, b) {
      var c = Uh();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && Mh(b, d[1])) return d[0];
      a = a();
      c.memoizedState = [a, b];
      return a;
    }
    function ui(a, b, c) {
      if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
      He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
      return b;
    }
    function vi(a, b) {
      var c = C;
      C = 0 !== c && 4 > c ? c : 4;
      a(true);
      var d = Gh.transition;
      Gh.transition = {};
      try {
        a(false), b();
      } finally {
        C = c, Gh.transition = d;
      }
    }
    function wi() {
      return Uh().memoizedState;
    }
    function xi(a, b, c) {
      var d = yi(a);
      c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
      if (zi(a)) Ai(b, c);
      else if (c = hh(a, b, c, d), null !== c) {
        var e = R();
        gi(c, a, d, e);
        Bi(c, b, d);
      }
    }
    function ii(a, b, c) {
      var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
      if (zi(a)) Ai(b, e);
      else {
        var f2 = a.alternate;
        if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
          var g = b.lastRenderedState, h = f2(g, c);
          e.hasEagerState = true;
          e.eagerState = h;
          if (He(h, g)) {
            var k2 = b.interleaved;
            null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
            b.interleaved = e;
            return;
          }
        } catch (l2) {
        } finally {
        }
        c = hh(a, b, e, d);
        null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
      }
    }
    function zi(a) {
      var b = a.alternate;
      return a === M || null !== b && b === M;
    }
    function Ai(a, b) {
      Jh = Ih = true;
      var c = a.pending;
      null === c ? b.next = b : (b.next = c.next, c.next = b);
      a.pending = b;
    }
    function Bi(a, b, c) {
      if (0 !== (c & 4194240)) {
        var d = b.lanes;
        d &= a.pendingLanes;
        c |= d;
        b.lanes = c;
        Cc(a, c);
      }
    }
    var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
      Th().memoizedState = [a, void 0 === b ? null : b];
      return a;
    }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return ki(
        4194308,
        4,
        pi.bind(null, b, a),
        c
      );
    }, useLayoutEffect: function(a, b) {
      return ki(4194308, 4, a, b);
    }, useInsertionEffect: function(a, b) {
      return ki(4, 2, a, b);
    }, useMemo: function(a, b) {
      var c = Th();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    }, useReducer: function(a, b, c) {
      var d = Th();
      b = void 0 !== c ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
      d.queue = a;
      a = a.dispatch = xi.bind(null, M, a);
      return [d.memoizedState, a];
    }, useRef: function(a) {
      var b = Th();
      a = { current: a };
      return b.memoizedState = a;
    }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
      return Th().memoizedState = a;
    }, useTransition: function() {
      var a = hi(false), b = a[0];
      a = vi.bind(null, a[1]);
      Th().memoizedState = a;
      return [b, a];
    }, useMutableSource: function() {
    }, useSyncExternalStore: function(a, b, c) {
      var d = M, e = Th();
      if (I) {
        if (void 0 === c) throw Error(p(407));
        c = c();
      } else {
        c = b();
        if (null === Q) throw Error(p(349));
        0 !== (Hh & 30) || di(d, b, c);
      }
      e.memoizedState = c;
      var f2 = { value: c, getSnapshot: b };
      e.queue = f2;
      mi(ai.bind(
        null,
        d,
        f2,
        a
      ), [a]);
      d.flags |= 2048;
      bi(9, ci.bind(null, d, f2, c, b), void 0, null);
      return c;
    }, useId: function() {
      var a = Th(), b = Q.identifierPrefix;
      if (I) {
        var c = sg;
        var d = rg;
        c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
        b = ":" + b + "R" + c;
        c = Kh++;
        0 < c && (b += "H" + c.toString(32));
        b += ":";
      } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
      return a.memoizedState = b;
    }, unstable_isNewReconciler: false }, Ph = {
      readContext: eh,
      useCallback: si,
      useContext: eh,
      useEffect: $h,
      useImperativeHandle: qi,
      useInsertionEffect: ni,
      useLayoutEffect: oi,
      useMemo: ti,
      useReducer: Wh,
      useRef: ji,
      useState: function() {
        return Wh(Vh);
      },
      useDebugValue: ri,
      useDeferredValue: function(a) {
        var b = Uh();
        return ui(b, N.memoizedState, a);
      },
      useTransition: function() {
        var a = Wh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      },
      useMutableSource: Yh,
      useSyncExternalStore: Zh,
      useId: wi,
      unstable_isNewReconciler: false
    }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
      return Xh(Vh);
    }, useDebugValue: ri, useDeferredValue: function(a) {
      var b = Uh();
      return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
    }, useTransition: function() {
      var a = Xh(Vh)[0], b = Uh().memoizedState;
      return [a, b];
    }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
    function Ci(a, b) {
      if (a && a.defaultProps) {
        b = A({}, b);
        a = a.defaultProps;
        for (var c in a) void 0 === b[c] && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Di(a, b, c, d) {
      b = a.memoizedState;
      c = c(d, b);
      c = null === c || void 0 === c ? b : A({}, b, c);
      a.memoizedState = c;
      0 === a.lanes && (a.updateQueue.baseState = c);
    }
    var Ei = { isMounted: function(a) {
      return (a = a._reactInternals) ? Vb(a) === a : false;
    }, enqueueSetState: function(a, b, c) {
      a = a._reactInternals;
      var d = R(), e = yi(a), f2 = mh(d, e);
      f2.payload = b;
      void 0 !== c && null !== c && (f2.callback = c);
      b = nh(a, f2, e);
      null !== b && (gi(b, a, e, d), oh(b, a, e));
    }, enqueueReplaceState: function(a, b, c) {
      a = a._reactInternals;
      var d = R(), e = yi(a), f2 = mh(d, e);
      f2.tag = 1;
      f2.payload = b;
      void 0 !== c && null !== c && (f2.callback = c);
      b = nh(a, f2, e);
      null !== b && (gi(b, a, e, d), oh(b, a, e));
    }, enqueueForceUpdate: function(a, b) {
      a = a._reactInternals;
      var c = R(), d = yi(a), e = mh(c, d);
      e.tag = 2;
      void 0 !== b && null !== b && (e.callback = b);
      b = nh(a, e, d);
      null !== b && (gi(b, a, d, c), oh(b, a, d));
    } };
    function Fi(a, b, c, d, e, f2, g) {
      a = a.stateNode;
      return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
    }
    function Gi(a, b, c) {
      var d = false, e = Vf;
      var f2 = b.contextType;
      "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
      b = new b(c, f2);
      a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
      b.updater = Ei;
      a.stateNode = b;
      b._reactInternals = a;
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
      return b;
    }
    function Hi(a, b, c, d) {
      a = b.state;
      "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
      "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
      b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
    }
    function Ii(a, b, c, d) {
      var e = a.stateNode;
      e.props = c;
      e.state = a.memoizedState;
      e.refs = {};
      kh(a);
      var f2 = b.contextType;
      "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
      e.state = a.memoizedState;
      f2 = b.getDerivedStateFromProps;
      "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
      "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
      "function" === typeof e.componentDidMount && (a.flags |= 4194308);
    }
    function Ji(a, b) {
      try {
        var c = "", d = b;
        do
          c += Pa(d), d = d.return;
        while (d);
        var e = c;
      } catch (f2) {
        e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
      }
      return { value: a, source: b, stack: e, digest: null };
    }
    function Ki(a, b, c) {
      return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
    }
    function Li(a, b) {
      try {
        console.error(b.value);
      } catch (c) {
        setTimeout(function() {
          throw c;
        });
      }
    }
    var Mi = "function" === typeof WeakMap ? WeakMap : Map;
    function Ni(a, b, c) {
      c = mh(-1, c);
      c.tag = 3;
      c.payload = { element: null };
      var d = b.value;
      c.callback = function() {
        Oi || (Oi = true, Pi = d);
        Li(a, b);
      };
      return c;
    }
    function Qi(a, b, c) {
      c = mh(-1, c);
      c.tag = 3;
      var d = a.type.getDerivedStateFromError;
      if ("function" === typeof d) {
        var e = b.value;
        c.payload = function() {
          return d(e);
        };
        c.callback = function() {
          Li(a, b);
        };
      }
      var f2 = a.stateNode;
      null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
        Li(a, b);
        "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
        var c2 = b.stack;
        this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
      });
      return c;
    }
    function Si(a, b, c) {
      var d = a.pingCache;
      if (null === d) {
        d = a.pingCache = new Mi();
        var e = /* @__PURE__ */ new Set();
        d.set(b, e);
      } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
      e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
    }
    function Ui(a) {
      do {
        var b;
        if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
        if (b) return a;
        a = a.return;
      } while (null !== a);
      return null;
    }
    function Vi(a, b, c, d, e) {
      if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
      a.flags |= 65536;
      a.lanes = e;
      return a;
    }
    var Wi = ua.ReactCurrentOwner, dh = false;
    function Xi(a, b, c, d) {
      b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
    }
    function Yi(a, b, c, d, e) {
      c = c.render;
      var f2 = b.ref;
      ch(b, e);
      d = Nh(a, b, c, d, f2, e);
      c = Sh();
      if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
      I && c && vg(b);
      b.flags |= 1;
      Xi(a, b, d, e);
      return b.child;
    }
    function $i(a, b, c, d, e) {
      if (null === a) {
        var f2 = c.type;
        if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
        a = Rg(c.type, null, d, b, b.mode, e);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      f2 = a.child;
      if (0 === (a.lanes & e)) {
        var g = f2.memoizedProps;
        c = c.compare;
        c = null !== c ? c : Ie;
        if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
      }
      b.flags |= 1;
      a = Pg(f2, d);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    function bj(a, b, c, d, e) {
      if (null !== a) {
        var f2 = a.memoizedProps;
        if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
        else return b.lanes = a.lanes, Zi(a, b, e);
      }
      return cj(a, b, c, d, e);
    }
    function dj(a, b, c) {
      var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
      if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
      else {
        if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
        b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
        d = null !== f2 ? f2.baseLanes : c;
        G(ej, fj);
        fj |= d;
      }
      else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
      Xi(a, b, e, c);
      return b.child;
    }
    function gj(a, b) {
      var c = b.ref;
      if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
    }
    function cj(a, b, c, d, e) {
      var f2 = Zf(c) ? Xf : H.current;
      f2 = Yf(b, f2);
      ch(b, e);
      c = Nh(a, b, c, d, f2, e);
      d = Sh();
      if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
      I && d && vg(b);
      b.flags |= 1;
      Xi(a, b, c, e);
      return b.child;
    }
    function hj(a, b, c, d, e) {
      if (Zf(c)) {
        var f2 = true;
        cg(b);
      } else f2 = false;
      ch(b, e);
      if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
      else if (null === a) {
        var g = b.stateNode, h = b.memoizedProps;
        g.props = h;
        var k2 = g.context, l2 = c.contextType;
        "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
        var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
        q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
        jh = false;
        var r2 = b.memoizedState;
        g.state = r2;
        qh(b, d, g, e);
        k2 = b.memoizedState;
        h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
      } else {
        g = b.stateNode;
        lh(a, b);
        h = b.memoizedProps;
        l2 = b.type === b.elementType ? h : Ci(b.type, h);
        g.props = l2;
        q2 = b.pendingProps;
        r2 = g.context;
        k2 = c.contextType;
        "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
        var y2 = c.getDerivedStateFromProps;
        (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
        jh = false;
        r2 = b.memoizedState;
        g.state = r2;
        qh(b, d, g, e);
        var n2 = b.memoizedState;
        h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
      }
      return jj(a, b, c, d, f2, e);
    }
    function jj(a, b, c, d, e, f2) {
      gj(a, b);
      var g = 0 !== (b.flags & 128);
      if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
      d = b.stateNode;
      Wi.current = b;
      var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
      b.flags |= 1;
      null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
      b.memoizedState = d.state;
      e && dg(b, c, true);
      return b.child;
    }
    function kj(a) {
      var b = a.stateNode;
      b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
      yh(a, b.containerInfo);
    }
    function lj(a, b, c, d, e) {
      Ig();
      Jg(e);
      b.flags |= 256;
      Xi(a, b, c, d);
      return b.child;
    }
    var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
    function nj(a) {
      return { baseLanes: a, cachePool: null, transitions: null };
    }
    function oj(a, b, c) {
      var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
      (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
      if (h) f2 = true, b.flags &= -129;
      else if (null === a || null !== a.memoizedState) e |= 1;
      G(L, e & 1);
      if (null === a) {
        Eg(b);
        a = b.memoizedState;
        if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
        g = d.children;
        a = d.fallback;
        return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
      }
      e = a.memoizedState;
      if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
      if (f2) {
        f2 = d.fallback;
        g = b.mode;
        e = a.child;
        h = e.sibling;
        var k2 = { mode: "hidden", children: d.children };
        0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
        null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
        f2.return = b;
        d.return = b;
        d.sibling = f2;
        b.child = d;
        d = f2;
        f2 = b.child;
        g = a.child.memoizedState;
        g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
        f2.memoizedState = g;
        f2.childLanes = a.childLanes & ~c;
        b.memoizedState = mj;
        return d;
      }
      f2 = a.child;
      a = f2.sibling;
      d = Pg(f2, { mode: "visible", children: d.children });
      0 === (b.mode & 1) && (d.lanes = c);
      d.return = b;
      d.sibling = null;
      null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
      b.child = d;
      b.memoizedState = null;
      return d;
    }
    function qj(a, b) {
      b = pj({ mode: "visible", children: b }, a.mode, 0, null);
      b.return = a;
      return a.child = b;
    }
    function sj(a, b, c, d) {
      null !== d && Jg(d);
      Ug(b, a.child, null, c);
      a = qj(b, b.pendingProps.children);
      a.flags |= 2;
      b.memoizedState = null;
      return a;
    }
    function rj(a, b, c, d, e, f2, g) {
      if (c) {
        if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
        if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
        f2 = d.fallback;
        e = b.mode;
        d = pj({ mode: "visible", children: d.children }, e, 0, null);
        f2 = Tg(f2, e, g, null);
        f2.flags |= 2;
        d.return = b;
        f2.return = b;
        d.sibling = f2;
        b.child = d;
        0 !== (b.mode & 1) && Ug(b, a.child, null, g);
        b.child.memoizedState = nj(g);
        b.memoizedState = mj;
        return f2;
      }
      if (0 === (b.mode & 1)) return sj(a, b, g, null);
      if ("$!" === e.data) {
        d = e.nextSibling && e.nextSibling.dataset;
        if (d) var h = d.dgst;
        d = h;
        f2 = Error(p(419));
        d = Ki(f2, d, void 0);
        return sj(a, b, g, d);
      }
      h = 0 !== (g & a.childLanes);
      if (dh || h) {
        d = Q;
        if (null !== d) {
          switch (g & -g) {
            case 4:
              e = 2;
              break;
            case 16:
              e = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              e = 32;
              break;
            case 536870912:
              e = 268435456;
              break;
            default:
              e = 0;
          }
          e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
          0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
        }
        tj();
        d = Ki(Error(p(421)));
        return sj(a, b, g, d);
      }
      if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
      a = f2.treeContext;
      yg = Lf(e.nextSibling);
      xg = b;
      I = true;
      zg = null;
      null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
      b = qj(b, d.children);
      b.flags |= 4096;
      return b;
    }
    function vj(a, b, c) {
      a.lanes |= b;
      var d = a.alternate;
      null !== d && (d.lanes |= b);
      bh(a.return, b, c);
    }
    function wj(a, b, c, d, e) {
      var f2 = a.memoizedState;
      null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
    }
    function xj(a, b, c) {
      var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
      Xi(a, b, d.children, c);
      d = L.current;
      if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
      else {
        if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
          if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
          else if (19 === a.tag) vj(a, c, b);
          else if (null !== a.child) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b) break a;
          for (; null === a.sibling; ) {
            if (null === a.return || a.return === b) break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
        d &= 1;
      }
      G(L, d);
      if (0 === (b.mode & 1)) b.memoizedState = null;
      else switch (e) {
        case "forwards":
          c = b.child;
          for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
          c = e;
          null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
          wj(b, false, e, c, f2);
          break;
        case "backwards":
          c = null;
          e = b.child;
          for (b.child = null; null !== e; ) {
            a = e.alternate;
            if (null !== a && null === Ch(a)) {
              b.child = e;
              break;
            }
            a = e.sibling;
            e.sibling = c;
            c = e;
            e = a;
          }
          wj(b, true, c, null, f2);
          break;
        case "together":
          wj(b, false, null, null, void 0);
          break;
        default:
          b.memoizedState = null;
      }
      return b.child;
    }
    function ij(a, b) {
      0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
    }
    function Zi(a, b, c) {
      null !== a && (b.dependencies = a.dependencies);
      rh |= b.lanes;
      if (0 === (c & b.childLanes)) return null;
      if (null !== a && b.child !== a.child) throw Error(p(153));
      if (null !== b.child) {
        a = b.child;
        c = Pg(a, a.pendingProps);
        b.child = c;
        for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
        c.sibling = null;
      }
      return b.child;
    }
    function yj(a, b, c) {
      switch (b.tag) {
        case 3:
          kj(b);
          Ig();
          break;
        case 5:
          Ah(b);
          break;
        case 1:
          Zf(b.type) && cg(b);
          break;
        case 4:
          yh(b, b.stateNode.containerInfo);
          break;
        case 10:
          var d = b.type._context, e = b.memoizedProps.value;
          G(Wg, d._currentValue);
          d._currentValue = e;
          break;
        case 13:
          d = b.memoizedState;
          if (null !== d) {
            if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
            if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
            G(L, L.current & 1);
            a = Zi(a, b, c);
            return null !== a ? a.sibling : null;
          }
          G(L, L.current & 1);
          break;
        case 19:
          d = 0 !== (c & b.childLanes);
          if (0 !== (a.flags & 128)) {
            if (d) return xj(a, b, c);
            b.flags |= 128;
          }
          e = b.memoizedState;
          null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
          G(L, L.current);
          if (d) break;
          else return null;
        case 22:
        case 23:
          return b.lanes = 0, dj(a, b, c);
      }
      return Zi(a, b, c);
    }
    var zj, Aj, Bj, Cj;
    zj = function(a, b) {
      for (var c = b.child; null !== c; ) {
        if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
        else if (4 !== c.tag && null !== c.child) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === b) break;
        for (; null === c.sibling; ) {
          if (null === c.return || c.return === b) return;
          c = c.return;
        }
        c.sibling.return = c.return;
        c = c.sibling;
      }
    };
    Aj = function() {
    };
    Bj = function(a, b, c, d) {
      var e = a.memoizedProps;
      if (e !== d) {
        a = b.stateNode;
        xh(uh.current);
        var f2 = null;
        switch (c) {
          case "input":
            e = Ya(a, e);
            d = Ya(a, d);
            f2 = [];
            break;
          case "select":
            e = A({}, e, { value: void 0 });
            d = A({}, d, { value: void 0 });
            f2 = [];
            break;
          case "textarea":
            e = gb(a, e);
            d = gb(a, d);
            f2 = [];
            break;
          default:
            "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
        }
        ub(c, d);
        var g;
        c = null;
        for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
          var h = e[l2];
          for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
        } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
        for (l2 in d) {
          var k2 = d[l2];
          h = null != e ? e[l2] : void 0;
          if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
            for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
            for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
          } else c || (f2 || (f2 = []), f2.push(
            l2,
            c
          )), c = k2;
          else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
        }
        c && (f2 = f2 || []).push("style", c);
        var l2 = f2;
        if (b.updateQueue = l2) b.flags |= 4;
      }
    };
    Cj = function(a, b, c, d) {
      c !== d && (b.flags |= 4);
    };
    function Dj(a, b) {
      if (!I) switch (a.tailMode) {
        case "hidden":
          b = a.tail;
          for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
          null === c ? a.tail = null : c.sibling = null;
          break;
        case "collapsed":
          c = a.tail;
          for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
          null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
      }
    }
    function S(a) {
      var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
      if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
      else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
      a.subtreeFlags |= d;
      a.childLanes = c;
      return b;
    }
    function Ej(a, b, c) {
      var d = b.pendingProps;
      wg(b);
      switch (b.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return S(b), null;
        case 1:
          return Zf(b.type) && $f(), S(b), null;
        case 3:
          d = b.stateNode;
          zh();
          E(Wf);
          E(H);
          Eh();
          d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
          if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
          Aj(a, b);
          S(b);
          return null;
        case 5:
          Bh(b);
          var e = xh(wh.current);
          c = b.type;
          if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
          else {
            if (!d) {
              if (null === b.stateNode) throw Error(p(166));
              S(b);
              return null;
            }
            a = xh(uh.current);
            if (Gg(b)) {
              d = b.stateNode;
              c = b.type;
              var f2 = b.memoizedProps;
              d[Of] = b;
              d[Pf] = f2;
              a = 0 !== (b.mode & 1);
              switch (c) {
                case "dialog":
                  D("cancel", d);
                  D("close", d);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", d);
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++) D(lf[e], d);
                  break;
                case "source":
                  D("error", d);
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    d
                  );
                  D("load", d);
                  break;
                case "details":
                  D("toggle", d);
                  break;
                case "input":
                  Za(d, f2);
                  D("invalid", d);
                  break;
                case "select":
                  d._wrapperState = { wasMultiple: !!f2.multiple };
                  D("invalid", d);
                  break;
                case "textarea":
                  hb(d, f2), D("invalid", d);
              }
              ub(c, f2);
              e = null;
              for (var g in f2) if (f2.hasOwnProperty(g)) {
                var h = f2[g];
                "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
                  d.textContent,
                  h,
                  a
                ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
              }
              switch (c) {
                case "input":
                  Va(d);
                  db$1(d, f2, true);
                  break;
                case "textarea":
                  Va(d);
                  jb(d);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  "function" === typeof f2.onClick && (d.onclick = Bf);
              }
              d = e;
              b.updateQueue = d;
              null !== d && (b.flags |= 4);
            } else {
              g = 9 === e.nodeType ? e : e.ownerDocument;
              "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
              "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
              a[Of] = b;
              a[Pf] = d;
              zj(a, b, false, false);
              b.stateNode = a;
              a: {
                g = vb(c, d);
                switch (c) {
                  case "dialog":
                    D("cancel", a);
                    D("close", a);
                    e = d;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", a);
                    e = d;
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], a);
                    e = d;
                    break;
                  case "source":
                    D("error", a);
                    e = d;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      a
                    );
                    D("load", a);
                    e = d;
                    break;
                  case "details":
                    D("toggle", a);
                    e = d;
                    break;
                  case "input":
                    Za(a, d);
                    e = Ya(a, d);
                    D("invalid", a);
                    break;
                  case "option":
                    e = d;
                    break;
                  case "select":
                    a._wrapperState = { wasMultiple: !!d.multiple };
                    e = A({}, d, { value: void 0 });
                    D("invalid", a);
                    break;
                  case "textarea":
                    hb(a, d);
                    e = gb(a, d);
                    D("invalid", a);
                    break;
                  default:
                    e = d;
                }
                ub(c, e);
                h = e;
                for (f2 in h) if (h.hasOwnProperty(f2)) {
                  var k2 = h[f2];
                  "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
                }
                switch (c) {
                  case "input":
                    Va(a);
                    db$1(a, d, false);
                    break;
                  case "textarea":
                    Va(a);
                    jb(a);
                    break;
                  case "option":
                    null != d.value && a.setAttribute("value", "" + Sa(d.value));
                    break;
                  case "select":
                    a.multiple = !!d.multiple;
                    f2 = d.value;
                    null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                      a,
                      !!d.multiple,
                      d.defaultValue,
                      true
                    );
                    break;
                  default:
                    "function" === typeof e.onClick && (a.onclick = Bf);
                }
                switch (c) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    d = !!d.autoFocus;
                    break a;
                  case "img":
                    d = true;
                    break a;
                  default:
                    d = false;
                }
              }
              d && (b.flags |= 4);
            }
            null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
          }
          S(b);
          return null;
        case 6:
          if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
          else {
            if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
            c = xh(wh.current);
            xh(uh.current);
            if (Gg(b)) {
              d = b.stateNode;
              c = b.memoizedProps;
              d[Of] = b;
              if (f2 = d.nodeValue !== c) {
                if (a = xg, null !== a) switch (a.tag) {
                  case 3:
                    Af(d.nodeValue, c, 0 !== (a.mode & 1));
                    break;
                  case 5:
                    true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                }
              }
              f2 && (b.flags |= 4);
            } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
          }
          S(b);
          return null;
        case 13:
          E(L);
          d = b.memoizedState;
          if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
            if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
            else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
              if (null === a) {
                if (!f2) throw Error(p(318));
                f2 = b.memoizedState;
                f2 = null !== f2 ? f2.dehydrated : null;
                if (!f2) throw Error(p(317));
                f2[Of] = b;
              } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
              S(b);
              f2 = false;
            } else null !== zg && (Fj(zg), zg = null), f2 = true;
            if (!f2) return b.flags & 65536 ? b : null;
          }
          if (0 !== (b.flags & 128)) return b.lanes = c, b;
          d = null !== d;
          d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
          null !== b.updateQueue && (b.flags |= 4);
          S(b);
          return null;
        case 4:
          return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
        case 10:
          return ah(b.type._context), S(b), null;
        case 17:
          return Zf(b.type) && $f(), S(b), null;
        case 19:
          E(L);
          f2 = b.memoizedState;
          if (null === f2) return S(b), null;
          d = 0 !== (b.flags & 128);
          g = f2.rendering;
          if (null === g) if (d) Dj(f2, false);
          else {
            if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
              g = Ch(a);
              if (null !== g) {
                b.flags |= 128;
                Dj(f2, false);
                d = g.updateQueue;
                null !== d && (b.updateQueue = d, b.flags |= 4);
                b.subtreeFlags = 0;
                d = c;
                for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                G(L, L.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
            null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
          }
          else {
            if (!d) if (a = Ch(g), null !== a) {
              if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
            } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
            f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
          }
          if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
          S(b);
          return null;
        case 22:
        case 23:
          return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(p(156, b.tag));
    }
    function Ij(a, b) {
      wg(b);
      switch (b.tag) {
        case 1:
          return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 3:
          return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
        case 5:
          return Bh(b), null;
        case 13:
          E(L);
          a = b.memoizedState;
          if (null !== a && null !== a.dehydrated) {
            if (null === b.alternate) throw Error(p(340));
            Ig();
          }
          a = b.flags;
          return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 19:
          return E(L), null;
        case 4:
          return zh(), null;
        case 10:
          return ah(b.type._context), null;
        case 22:
        case 23:
          return Hj(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
    function Lj(a, b) {
      var c = a.ref;
      if (null !== c) if ("function" === typeof c) try {
        c(null);
      } catch (d) {
        W(a, b, d);
      }
      else c.current = null;
    }
    function Mj(a, b, c) {
      try {
        c();
      } catch (d) {
        W(a, b, d);
      }
    }
    var Nj = false;
    function Oj(a, b) {
      Cf = dd;
      a = Me();
      if (Ne(a)) {
        if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
        else a: {
          c = (c = a.ownerDocument) && c.defaultView || window;
          var d = c.getSelection && c.getSelection();
          if (d && 0 !== d.rangeCount) {
            c = d.anchorNode;
            var e = d.anchorOffset, f2 = d.focusNode;
            d = d.focusOffset;
            try {
              c.nodeType, f2.nodeType;
            } catch (F2) {
              c = null;
              break a;
            }
            var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
            b: for (; ; ) {
              for (var y2; ; ) {
                q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
                q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
                3 === q2.nodeType && (g += q2.nodeValue.length);
                if (null === (y2 = q2.firstChild)) break;
                r2 = q2;
                q2 = y2;
              }
              for (; ; ) {
                if (q2 === a) break b;
                r2 === c && ++l2 === e && (h = g);
                r2 === f2 && ++m2 === d && (k2 = g);
                if (null !== (y2 = q2.nextSibling)) break;
                q2 = r2;
                r2 = q2.parentNode;
              }
              q2 = y2;
            }
            c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
          } else c = null;
        }
        c = c || { start: 0, end: 0 };
      } else c = null;
      Df = { focusedElem: a, selectionRange: c };
      dd = false;
      for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
      else for (; null !== V; ) {
        b = V;
        try {
          var n2 = b.alternate;
          if (0 !== (b.flags & 1024)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (null !== n2) {
                var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
                x2.__reactInternalSnapshotBeforeUpdate = w2;
              }
              break;
            case 3:
              var u2 = b.stateNode.containerInfo;
              1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(p(163));
          }
        } catch (F2) {
          W(b, b.return, F2);
        }
        a = b.sibling;
        if (null !== a) {
          a.return = b.return;
          V = a;
          break;
        }
        V = b.return;
      }
      n2 = Nj;
      Nj = false;
      return n2;
    }
    function Pj(a, b, c) {
      var d = b.updateQueue;
      d = null !== d ? d.lastEffect : null;
      if (null !== d) {
        var e = d = d.next;
        do {
          if ((e.tag & a) === a) {
            var f2 = e.destroy;
            e.destroy = void 0;
            void 0 !== f2 && Mj(b, c, f2);
          }
          e = e.next;
        } while (e !== d);
      }
    }
    function Qj(a, b) {
      b = b.updateQueue;
      b = null !== b ? b.lastEffect : null;
      if (null !== b) {
        var c = b = b.next;
        do {
          if ((c.tag & a) === a) {
            var d = c.create;
            c.destroy = d();
          }
          c = c.next;
        } while (c !== b);
      }
    }
    function Rj(a) {
      var b = a.ref;
      if (null !== b) {
        var c = a.stateNode;
        switch (a.tag) {
          case 5:
            a = c;
            break;
          default:
            a = c;
        }
        "function" === typeof b ? b(a) : b.current = a;
      }
    }
    function Sj(a) {
      var b = a.alternate;
      null !== b && (a.alternate = null, Sj(b));
      a.child = null;
      a.deletions = null;
      a.sibling = null;
      5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
      a.stateNode = null;
      a.return = null;
      a.dependencies = null;
      a.memoizedProps = null;
      a.memoizedState = null;
      a.pendingProps = null;
      a.stateNode = null;
      a.updateQueue = null;
    }
    function Tj(a) {
      return 5 === a.tag || 3 === a.tag || 4 === a.tag;
    }
    function Uj(a) {
      a: for (; ; ) {
        for (; null === a.sibling; ) {
          if (null === a.return || Tj(a.return)) return null;
          a = a.return;
        }
        a.sibling.return = a.return;
        for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
          if (a.flags & 2) continue a;
          if (null === a.child || 4 === a.tag) continue a;
          else a.child.return = a, a = a.child;
        }
        if (!(a.flags & 2)) return a.stateNode;
      }
    }
    function Vj(a, b, c) {
      var d = a.tag;
      if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
      else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
    }
    function Wj(a, b, c) {
      var d = a.tag;
      if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
      else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
    }
    var X$1 = null, Xj = false;
    function Yj(a, b, c) {
      for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
    }
    function Zj(a, b, c) {
      if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
        lc.onCommitFiberUnmount(kc, c);
      } catch (h) {
      }
      switch (c.tag) {
        case 5:
          U || Lj(c, b);
        case 6:
          var d = X$1, e = Xj;
          X$1 = null;
          Yj(a, b, c);
          X$1 = d;
          Xj = e;
          null !== X$1 && (Xj ? (a = X$1, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X$1.removeChild(c.stateNode));
          break;
        case 18:
          null !== X$1 && (Xj ? (a = X$1, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X$1, c.stateNode));
          break;
        case 4:
          d = X$1;
          e = Xj;
          X$1 = c.stateNode.containerInfo;
          Xj = true;
          Yj(a, b, c);
          X$1 = d;
          Xj = e;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
            e = d = d.next;
            do {
              var f2 = e, g = f2.destroy;
              f2 = f2.tag;
              void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
              e = e.next;
            } while (e !== d);
          }
          Yj(a, b, c);
          break;
        case 1:
          if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
            d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
          } catch (h) {
            W(c, b, h);
          }
          Yj(a, b, c);
          break;
        case 21:
          Yj(a, b, c);
          break;
        case 22:
          c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
          break;
        default:
          Yj(a, b, c);
      }
    }
    function ak(a) {
      var b = a.updateQueue;
      if (null !== b) {
        a.updateQueue = null;
        var c = a.stateNode;
        null === c && (c = a.stateNode = new Kj());
        b.forEach(function(b2) {
          var d = bk.bind(null, a, b2);
          c.has(b2) || (c.add(b2), b2.then(d, d));
        });
      }
    }
    function ck(a, b) {
      var c = b.deletions;
      if (null !== c) for (var d = 0; d < c.length; d++) {
        var e = c[d];
        try {
          var f2 = a, g = b, h = g;
          a: for (; null !== h; ) {
            switch (h.tag) {
              case 5:
                X$1 = h.stateNode;
                Xj = false;
                break a;
              case 3:
                X$1 = h.stateNode.containerInfo;
                Xj = true;
                break a;
              case 4:
                X$1 = h.stateNode.containerInfo;
                Xj = true;
                break a;
            }
            h = h.return;
          }
          if (null === X$1) throw Error(p(160));
          Zj(f2, g, e);
          X$1 = null;
          Xj = false;
          var k2 = e.alternate;
          null !== k2 && (k2.return = null);
          e.return = null;
        } catch (l2) {
          W(e, b, l2);
        }
      }
      if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
    }
    function dk(a, b) {
      var c = a.alternate, d = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ck(b, a);
          ek(a);
          if (d & 4) {
            try {
              Pj(3, a, a.return), Qj(3, a);
            } catch (t2) {
              W(a, a.return, t2);
            }
            try {
              Pj(5, a, a.return);
            } catch (t2) {
              W(a, a.return, t2);
            }
          }
          break;
        case 1:
          ck(b, a);
          ek(a);
          d & 512 && null !== c && Lj(c, c.return);
          break;
        case 5:
          ck(b, a);
          ek(a);
          d & 512 && null !== c && Lj(c, c.return);
          if (a.flags & 32) {
            var e = a.stateNode;
            try {
              ob(e, "");
            } catch (t2) {
              W(a, a.return, t2);
            }
          }
          if (d & 4 && (e = a.stateNode, null != e)) {
            var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
            a.updateQueue = null;
            if (null !== k2) try {
              "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
              vb(h, g);
              var l2 = vb(h, f2);
              for (g = 0; g < k2.length; g += 2) {
                var m2 = k2[g], q2 = k2[g + 1];
                "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
              }
              switch (h) {
                case "input":
                  bb(e, f2);
                  break;
                case "textarea":
                  ib(e, f2);
                  break;
                case "select":
                  var r2 = e._wrapperState.wasMultiple;
                  e._wrapperState.wasMultiple = !!f2.multiple;
                  var y2 = f2.value;
                  null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                    e,
                    !!f2.multiple,
                    f2.defaultValue,
                    true
                  ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
              }
              e[Pf] = f2;
            } catch (t2) {
              W(a, a.return, t2);
            }
          }
          break;
        case 6:
          ck(b, a);
          ek(a);
          if (d & 4) {
            if (null === a.stateNode) throw Error(p(162));
            e = a.stateNode;
            f2 = a.memoizedProps;
            try {
              e.nodeValue = f2;
            } catch (t2) {
              W(a, a.return, t2);
            }
          }
          break;
        case 3:
          ck(b, a);
          ek(a);
          if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
            bd(b.containerInfo);
          } catch (t2) {
            W(a, a.return, t2);
          }
          break;
        case 4:
          ck(b, a);
          ek(a);
          break;
        case 13:
          ck(b, a);
          ek(a);
          e = a.child;
          e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
          d & 4 && ak(a);
          break;
        case 22:
          m2 = null !== c && null !== c.memoizedState;
          a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
          ek(a);
          if (d & 8192) {
            l2 = null !== a.memoizedState;
            if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
              for (q2 = V = m2; null !== V; ) {
                r2 = V;
                y2 = r2.child;
                switch (r2.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Pj(4, r2, r2.return);
                    break;
                  case 1:
                    Lj(r2, r2.return);
                    var n2 = r2.stateNode;
                    if ("function" === typeof n2.componentWillUnmount) {
                      d = r2;
                      c = r2.return;
                      try {
                        b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                      } catch (t2) {
                        W(d, c, t2);
                      }
                    }
                    break;
                  case 5:
                    Lj(r2, r2.return);
                    break;
                  case 22:
                    if (null !== r2.memoizedState) {
                      gk(q2);
                      continue;
                    }
                }
                null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
              }
              m2 = m2.sibling;
            }
            a: for (m2 = null, q2 = a; ; ) {
              if (5 === q2.tag) {
                if (null === m2) {
                  m2 = q2;
                  try {
                    e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
                  } catch (t2) {
                    W(a, a.return, t2);
                  }
                }
              } else if (6 === q2.tag) {
                if (null === m2) try {
                  q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                } catch (t2) {
                  W(a, a.return, t2);
                }
              } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
                q2.child.return = q2;
                q2 = q2.child;
                continue;
              }
              if (q2 === a) break a;
              for (; null === q2.sibling; ) {
                if (null === q2.return || q2.return === a) break a;
                m2 === q2 && (m2 = null);
                q2 = q2.return;
              }
              m2 === q2 && (m2 = null);
              q2.sibling.return = q2.return;
              q2 = q2.sibling;
            }
          }
          break;
        case 19:
          ck(b, a);
          ek(a);
          d & 4 && ak(a);
          break;
        case 21:
          break;
        default:
          ck(
            b,
            a
          ), ek(a);
      }
    }
    function ek(a) {
      var b = a.flags;
      if (b & 2) {
        try {
          a: {
            for (var c = a.return; null !== c; ) {
              if (Tj(c)) {
                var d = c;
                break a;
              }
              c = c.return;
            }
            throw Error(p(160));
          }
          switch (d.tag) {
            case 5:
              var e = d.stateNode;
              d.flags & 32 && (ob(e, ""), d.flags &= -33);
              var f2 = Uj(a);
              Wj(a, f2, e);
              break;
            case 3:
            case 4:
              var g = d.stateNode.containerInfo, h = Uj(a);
              Vj(a, h, g);
              break;
            default:
              throw Error(p(161));
          }
        } catch (k2) {
          W(a, a.return, k2);
        }
        a.flags &= -3;
      }
      b & 4096 && (a.flags &= -4097);
    }
    function hk(a, b, c) {
      V = a;
      ik(a);
    }
    function ik(a, b, c) {
      for (var d = 0 !== (a.mode & 1); null !== V; ) {
        var e = V, f2 = e.child;
        if (22 === e.tag && d) {
          var g = null !== e.memoizedState || Jj;
          if (!g) {
            var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
            h = Jj;
            var l2 = U;
            Jj = g;
            if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
            for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
            V = e;
            Jj = h;
            U = l2;
          }
          kk(a);
        } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
      }
    }
    function kk(a) {
      for (; null !== V; ) {
        var b = V;
        if (0 !== (b.flags & 8772)) {
          var c = b.alternate;
          try {
            if (0 !== (b.flags & 8772)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                U || Qj(5, b);
                break;
              case 1:
                var d = b.stateNode;
                if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                else {
                  var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                  d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                }
                var f2 = b.updateQueue;
                null !== f2 && sh(b, f2, d);
                break;
              case 3:
                var g = b.updateQueue;
                if (null !== g) {
                  c = null;
                  if (null !== b.child) switch (b.child.tag) {
                    case 5:
                      c = b.child.stateNode;
                      break;
                    case 1:
                      c = b.child.stateNode;
                  }
                  sh(b, g, c);
                }
                break;
              case 5:
                var h = b.stateNode;
                if (null === c && b.flags & 4) {
                  c = h;
                  var k2 = b.memoizedProps;
                  switch (b.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      k2.autoFocus && c.focus();
                      break;
                    case "img":
                      k2.src && (c.src = k2.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (null === b.memoizedState) {
                  var l2 = b.alternate;
                  if (null !== l2) {
                    var m2 = l2.memoizedState;
                    if (null !== m2) {
                      var q2 = m2.dehydrated;
                      null !== q2 && bd(q2);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(p(163));
            }
            U || b.flags & 512 && Rj(b);
          } catch (r2) {
            W(b, b.return, r2);
          }
        }
        if (b === a) {
          V = null;
          break;
        }
        c = b.sibling;
        if (null !== c) {
          c.return = b.return;
          V = c;
          break;
        }
        V = b.return;
      }
    }
    function gk(a) {
      for (; null !== V; ) {
        var b = V;
        if (b === a) {
          V = null;
          break;
        }
        var c = b.sibling;
        if (null !== c) {
          c.return = b.return;
          V = c;
          break;
        }
        V = b.return;
      }
    }
    function jk(a) {
      for (; null !== V; ) {
        var b = V;
        try {
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              var c = b.return;
              try {
                Qj(4, b);
              } catch (k2) {
                W(b, c, k2);
              }
              break;
            case 1:
              var d = b.stateNode;
              if ("function" === typeof d.componentDidMount) {
                var e = b.return;
                try {
                  d.componentDidMount();
                } catch (k2) {
                  W(b, e, k2);
                }
              }
              var f2 = b.return;
              try {
                Rj(b);
              } catch (k2) {
                W(b, f2, k2);
              }
              break;
            case 5:
              var g = b.return;
              try {
                Rj(b);
              } catch (k2) {
                W(b, g, k2);
              }
          }
        } catch (k2) {
          W(b, b.return, k2);
        }
        if (b === a) {
          V = null;
          break;
        }
        var h = b.sibling;
        if (null !== h) {
          h.return = b.return;
          V = h;
          break;
        }
        V = b.return;
      }
    }
    var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
    function R() {
      return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
    }
    function yi(a) {
      if (0 === (a.mode & 1)) return 1;
      if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
      if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
      a = C;
      if (0 !== a) return a;
      a = window.event;
      a = void 0 === a ? 16 : jd(a.type);
      return a;
    }
    function gi(a, b, c, d) {
      if (50 < yk) throw yk = 0, zk = null, Error(p(185));
      Ac(a, c, d);
      if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
    }
    function Dk(a, b) {
      var c = a.callbackNode;
      wc(a, b);
      var d = uc(a, a === Q ? Z : 0);
      if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
      else if (b = d & -d, a.callbackPriority !== b) {
        null != c && bc(c);
        if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
          0 === (K & 6) && jg();
        }), c = null;
        else {
          switch (Dc(d)) {
            case 1:
              c = fc;
              break;
            case 4:
              c = gc;
              break;
            case 16:
              c = hc;
              break;
            case 536870912:
              c = jc;
              break;
            default:
              c = hc;
          }
          c = Fk(c, Gk.bind(null, a));
        }
        a.callbackPriority = b;
        a.callbackNode = c;
      }
    }
    function Gk(a, b) {
      Ak = -1;
      Bk = 0;
      if (0 !== (K & 6)) throw Error(p(327));
      var c = a.callbackNode;
      if (Hk() && a.callbackNode !== c) return null;
      var d = uc(a, a === Q ? Z : 0);
      if (0 === d) return null;
      if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
      else {
        b = d;
        var e = K;
        K |= 2;
        var f2 = Jk();
        if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
        do
          try {
            Lk();
            break;
          } catch (h) {
            Mk(a, h);
          }
        while (1);
        $g();
        mk.current = f2;
        K = e;
        null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
      }
      if (0 !== b) {
        2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
        if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
        if (6 === b) Ck(a, d);
        else {
          e = a.current.alternate;
          if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          a.finishedWork = e;
          a.finishedLanes = d;
          switch (b) {
            case 0:
            case 1:
              throw Error(p(345));
            case 2:
              Pk(a, tk, uk);
              break;
            case 3:
              Ck(a, d);
              if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                if (0 !== uc(a, 0)) break;
                e = a.suspendedLanes;
                if ((e & d) !== d) {
                  R();
                  a.pingedLanes |= a.suspendedLanes & e;
                  break;
                }
                a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                break;
              }
              Pk(a, tk, uk);
              break;
            case 4:
              Ck(a, d);
              if ((d & 4194240) === d) break;
              b = a.eventTimes;
              for (e = -1; 0 < d; ) {
                var g = 31 - oc(d);
                f2 = 1 << g;
                g = b[g];
                g > e && (e = g);
                d &= ~f2;
              }
              d = e;
              d = B() - d;
              d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
              if (10 < d) {
                a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                break;
              }
              Pk(a, tk, uk);
              break;
            case 5:
              Pk(a, tk, uk);
              break;
            default:
              throw Error(p(329));
          }
        }
      }
      Dk(a, B());
      return a.callbackNode === c ? Gk.bind(null, a) : null;
    }
    function Nk(a, b) {
      var c = sk;
      a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
      a = Ik(a, b);
      2 !== a && (b = tk, tk = c, null !== b && Fj(b));
      return a;
    }
    function Fj(a) {
      null === tk ? tk = a : tk.push.apply(tk, a);
    }
    function Ok(a) {
      for (var b = a; ; ) {
        if (b.flags & 16384) {
          var c = b.updateQueue;
          if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
            var e = c[d], f2 = e.getSnapshot;
            e = e.value;
            try {
              if (!He(f2(), e)) return false;
            } catch (g) {
              return false;
            }
          }
        }
        c = b.child;
        if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
        else {
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return true;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
      }
      return true;
    }
    function Ck(a, b) {
      b &= ~rk;
      b &= ~qk;
      a.suspendedLanes |= b;
      a.pingedLanes &= ~b;
      for (a = a.expirationTimes; 0 < b; ) {
        var c = 31 - oc(b), d = 1 << c;
        a[c] = -1;
        b &= ~d;
      }
    }
    function Ek(a) {
      if (0 !== (K & 6)) throw Error(p(327));
      Hk();
      var b = uc(a, 0);
      if (0 === (b & 1)) return Dk(a, B()), null;
      var c = Ik(a, b);
      if (0 !== a.tag && 2 === c) {
        var d = xc(a);
        0 !== d && (b = d, c = Nk(a, d));
      }
      if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
      if (6 === c) throw Error(p(345));
      a.finishedWork = a.current.alternate;
      a.finishedLanes = b;
      Pk(a, tk, uk);
      Dk(a, B());
      return null;
    }
    function Qk(a, b) {
      var c = K;
      K |= 1;
      try {
        return a(b);
      } finally {
        K = c, 0 === K && (Gj = B() + 500, fg && jg());
      }
    }
    function Rk(a) {
      null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
      var b = K;
      K |= 1;
      var c = ok.transition, d = C;
      try {
        if (ok.transition = null, C = 1, a) return a();
      } finally {
        C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
      }
    }
    function Hj() {
      fj = ej.current;
      E(ej);
    }
    function Kk(a, b) {
      a.finishedWork = null;
      a.finishedLanes = 0;
      var c = a.timeoutHandle;
      -1 !== c && (a.timeoutHandle = -1, Gf(c));
      if (null !== Y) for (c = Y.return; null !== c; ) {
        var d = c;
        wg(d);
        switch (d.tag) {
          case 1:
            d = d.type.childContextTypes;
            null !== d && void 0 !== d && $f();
            break;
          case 3:
            zh();
            E(Wf);
            E(H);
            Eh();
            break;
          case 5:
            Bh(d);
            break;
          case 4:
            zh();
            break;
          case 13:
            E(L);
            break;
          case 19:
            E(L);
            break;
          case 10:
            ah(d.type._context);
            break;
          case 22:
          case 23:
            Hj();
        }
        c = c.return;
      }
      Q = a;
      Y = a = Pg(a.current, null);
      Z = fj = b;
      T = 0;
      pk = null;
      rk = qk = rh = 0;
      tk = sk = null;
      if (null !== fh) {
        for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
          c.interleaved = null;
          var e = d.next, f2 = c.pending;
          if (null !== f2) {
            var g = f2.next;
            f2.next = e;
            d.next = g;
          }
          c.pending = d;
        }
        fh = null;
      }
      return a;
    }
    function Mk(a, b) {
      do {
        var c = Y;
        try {
          $g();
          Fh.current = Rh;
          if (Ih) {
            for (var d = M.memoizedState; null !== d; ) {
              var e = d.queue;
              null !== e && (e.pending = null);
              d = d.next;
            }
            Ih = false;
          }
          Hh = 0;
          O = N = M = null;
          Jh = false;
          Kh = 0;
          nk.current = null;
          if (null === c || null === c.return) {
            T = 1;
            pk = b;
            Y = null;
            break;
          }
          a: {
            var f2 = a, g = c.return, h = c, k2 = b;
            b = Z;
            h.flags |= 32768;
            if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
              var l2 = k2, m2 = h, q2 = m2.tag;
              if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
                var r2 = m2.alternate;
                r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
              }
              var y2 = Ui(g);
              if (null !== y2) {
                y2.flags &= -257;
                Vi(y2, g, h, f2, b);
                y2.mode & 1 && Si(f2, l2, b);
                b = y2;
                k2 = l2;
                var n2 = b.updateQueue;
                if (null === n2) {
                  var t2 = /* @__PURE__ */ new Set();
                  t2.add(k2);
                  b.updateQueue = t2;
                } else n2.add(k2);
                break a;
              } else {
                if (0 === (b & 1)) {
                  Si(f2, l2, b);
                  tj();
                  break a;
                }
                k2 = Error(p(426));
              }
            } else if (I && h.mode & 1) {
              var J2 = Ui(g);
              if (null !== J2) {
                0 === (J2.flags & 65536) && (J2.flags |= 256);
                Vi(J2, g, h, f2, b);
                Jg(Ji(k2, h));
                break a;
              }
            }
            f2 = k2 = Ji(k2, h);
            4 !== T && (T = 2);
            null === sk ? sk = [f2] : sk.push(f2);
            f2 = g;
            do {
              switch (f2.tag) {
                case 3:
                  f2.flags |= 65536;
                  b &= -b;
                  f2.lanes |= b;
                  var x2 = Ni(f2, k2, b);
                  ph(f2, x2);
                  break a;
                case 1:
                  h = k2;
                  var w2 = f2.type, u2 = f2.stateNode;
                  if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                    f2.flags |= 65536;
                    b &= -b;
                    f2.lanes |= b;
                    var F2 = Qi(f2, h, b);
                    ph(f2, F2);
                    break a;
                  }
              }
              f2 = f2.return;
            } while (null !== f2);
          }
          Sk(c);
        } catch (na) {
          b = na;
          Y === c && null !== c && (Y = c = c.return);
          continue;
        }
        break;
      } while (1);
    }
    function Jk() {
      var a = mk.current;
      mk.current = Rh;
      return null === a ? Rh : a;
    }
    function tj() {
      if (0 === T || 3 === T || 2 === T) T = 4;
      null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
    }
    function Ik(a, b) {
      var c = K;
      K |= 2;
      var d = Jk();
      if (Q !== a || Z !== b) uk = null, Kk(a, b);
      do
        try {
          Tk();
          break;
        } catch (e) {
          Mk(a, e);
        }
      while (1);
      $g();
      K = c;
      mk.current = d;
      if (null !== Y) throw Error(p(261));
      Q = null;
      Z = 0;
      return T;
    }
    function Tk() {
      for (; null !== Y; ) Uk(Y);
    }
    function Lk() {
      for (; null !== Y && !cc(); ) Uk(Y);
    }
    function Uk(a) {
      var b = Vk(a.alternate, a, fj);
      a.memoizedProps = a.pendingProps;
      null === b ? Sk(a) : Y = b;
      nk.current = null;
    }
    function Sk(a) {
      var b = a;
      do {
        var c = b.alternate;
        a = b.return;
        if (0 === (b.flags & 32768)) {
          if (c = Ej(c, b, fj), null !== c) {
            Y = c;
            return;
          }
        } else {
          c = Ij(c, b);
          if (null !== c) {
            c.flags &= 32767;
            Y = c;
            return;
          }
          if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
          else {
            T = 6;
            Y = null;
            return;
          }
        }
        b = b.sibling;
        if (null !== b) {
          Y = b;
          return;
        }
        Y = b = a;
      } while (null !== b);
      0 === T && (T = 5);
    }
    function Pk(a, b, c) {
      var d = C, e = ok.transition;
      try {
        ok.transition = null, C = 1, Wk(a, b, c, d);
      } finally {
        ok.transition = e, C = d;
      }
      return null;
    }
    function Wk(a, b, c, d) {
      do
        Hk();
      while (null !== wk);
      if (0 !== (K & 6)) throw Error(p(327));
      c = a.finishedWork;
      var e = a.finishedLanes;
      if (null === c) return null;
      a.finishedWork = null;
      a.finishedLanes = 0;
      if (c === a.current) throw Error(p(177));
      a.callbackNode = null;
      a.callbackPriority = 0;
      var f2 = c.lanes | c.childLanes;
      Bc(a, f2);
      a === Q && (Y = Q = null, Z = 0);
      0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
        Hk();
        return null;
      }));
      f2 = 0 !== (c.flags & 15990);
      if (0 !== (c.subtreeFlags & 15990) || f2) {
        f2 = ok.transition;
        ok.transition = null;
        var g = C;
        C = 1;
        var h = K;
        K |= 4;
        nk.current = null;
        Oj(a, c);
        dk(c, a);
        Oe(Df);
        dd = !!Cf;
        Df = Cf = null;
        a.current = c;
        hk(c);
        dc();
        K = h;
        C = g;
        ok.transition = f2;
      } else a.current = c;
      vk && (vk = false, wk = a, xk = e);
      f2 = a.pendingLanes;
      0 === f2 && (Ri = null);
      mc(c.stateNode);
      Dk(a, B());
      if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
      if (Oi) throw Oi = false, a = Pi, Pi = null, a;
      0 !== (xk & 1) && 0 !== a.tag && Hk();
      f2 = a.pendingLanes;
      0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
      jg();
      return null;
    }
    function Hk() {
      if (null !== wk) {
        var a = Dc(xk), b = ok.transition, c = C;
        try {
          ok.transition = null;
          C = 16 > a ? 16 : a;
          if (null === wk) var d = false;
          else {
            a = wk;
            wk = null;
            xk = 0;
            if (0 !== (K & 6)) throw Error(p(331));
            var e = K;
            K |= 4;
            for (V = a.current; null !== V; ) {
              var f2 = V, g = f2.child;
              if (0 !== (V.flags & 16)) {
                var h = f2.deletions;
                if (null !== h) {
                  for (var k2 = 0; k2 < h.length; k2++) {
                    var l2 = h[k2];
                    for (V = l2; null !== V; ) {
                      var m2 = V;
                      switch (m2.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Pj(8, m2, f2);
                      }
                      var q2 = m2.child;
                      if (null !== q2) q2.return = m2, V = q2;
                      else for (; null !== V; ) {
                        m2 = V;
                        var r2 = m2.sibling, y2 = m2.return;
                        Sj(m2);
                        if (m2 === l2) {
                          V = null;
                          break;
                        }
                        if (null !== r2) {
                          r2.return = y2;
                          V = r2;
                          break;
                        }
                        V = y2;
                      }
                    }
                  }
                  var n2 = f2.alternate;
                  if (null !== n2) {
                    var t2 = n2.child;
                    if (null !== t2) {
                      n2.child = null;
                      do {
                        var J2 = t2.sibling;
                        t2.sibling = null;
                        t2 = J2;
                      } while (null !== t2);
                    }
                  }
                  V = f2;
                }
              }
              if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
              else b: for (; null !== V; ) {
                f2 = V;
                if (0 !== (f2.flags & 2048)) switch (f2.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Pj(9, f2, f2.return);
                }
                var x2 = f2.sibling;
                if (null !== x2) {
                  x2.return = f2.return;
                  V = x2;
                  break b;
                }
                V = f2.return;
              }
            }
            var w2 = a.current;
            for (V = w2; null !== V; ) {
              g = V;
              var u2 = g.child;
              if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
              else b: for (g = w2; null !== V; ) {
                h = V;
                if (0 !== (h.flags & 2048)) try {
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, h);
                  }
                } catch (na) {
                  W(h, h.return, na);
                }
                if (h === g) {
                  V = null;
                  break b;
                }
                var F2 = h.sibling;
                if (null !== F2) {
                  F2.return = h.return;
                  V = F2;
                  break b;
                }
                V = h.return;
              }
            }
            K = e;
            jg();
            if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
              lc.onPostCommitFiberRoot(kc, a);
            } catch (na) {
            }
            d = true;
          }
          return d;
        } finally {
          C = c, ok.transition = b;
        }
      }
      return false;
    }
    function Xk(a, b, c) {
      b = Ji(c, b);
      b = Ni(a, b, 1);
      a = nh(a, b, 1);
      b = R();
      null !== a && (Ac(a, 1, b), Dk(a, b));
    }
    function W(a, b, c) {
      if (3 === a.tag) Xk(a, a, c);
      else for (; null !== b; ) {
        if (3 === b.tag) {
          Xk(b, a, c);
          break;
        } else if (1 === b.tag) {
          var d = b.stateNode;
          if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
            a = Ji(c, a);
            a = Qi(b, a, 1);
            b = nh(b, a, 1);
            a = R();
            null !== b && (Ac(b, 1, a), Dk(b, a));
            break;
          }
        }
        b = b.return;
      }
    }
    function Ti(a, b, c) {
      var d = a.pingCache;
      null !== d && d.delete(b);
      b = R();
      a.pingedLanes |= a.suspendedLanes & c;
      Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
      Dk(a, b);
    }
    function Yk(a, b) {
      0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
      var c = R();
      a = ih(a, b);
      null !== a && (Ac(a, b, c), Dk(a, c));
    }
    function uj(a) {
      var b = a.memoizedState, c = 0;
      null !== b && (c = b.retryLane);
      Yk(a, c);
    }
    function bk(a, b) {
      var c = 0;
      switch (a.tag) {
        case 13:
          var d = a.stateNode;
          var e = a.memoizedState;
          null !== e && (c = e.retryLane);
          break;
        case 19:
          d = a.stateNode;
          break;
        default:
          throw Error(p(314));
      }
      null !== d && d.delete(b);
      Yk(a, c);
    }
    var Vk;
    Vk = function(a, b, c) {
      if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
      else {
        if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
        dh = 0 !== (a.flags & 131072) ? true : false;
      }
      else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
      b.lanes = 0;
      switch (b.tag) {
        case 2:
          var d = b.type;
          ij(a, b);
          a = b.pendingProps;
          var e = Yf(b, H.current);
          ch(b, c);
          e = Nh(null, b, d, a, e, c);
          var f2 = Sh();
          b.flags |= 1;
          "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
          return b;
        case 16:
          d = b.elementType;
          a: {
            ij(a, b);
            a = b.pendingProps;
            e = d._init;
            d = e(d._payload);
            b.type = d;
            e = b.tag = Zk(d);
            a = Ci(d, a);
            switch (e) {
              case 0:
                b = cj(null, b, d, a, c);
                break a;
              case 1:
                b = hj(null, b, d, a, c);
                break a;
              case 11:
                b = Yi(null, b, d, a, c);
                break a;
              case 14:
                b = $i(null, b, d, Ci(d.type, a), c);
                break a;
            }
            throw Error(p(
              306,
              d,
              ""
            ));
          }
          return b;
        case 0:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
        case 1:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
        case 3:
          a: {
            kj(b);
            if (null === a) throw Error(p(387));
            d = b.pendingProps;
            f2 = b.memoizedState;
            e = f2.element;
            lh(a, b);
            qh(b, d, null, c);
            var g = b.memoizedState;
            d = g.element;
            if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
              e = Ji(Error(p(423)), b);
              b = lj(a, b, d, c, e);
              break a;
            } else if (d !== e) {
              e = Ji(Error(p(424)), b);
              b = lj(a, b, d, c, e);
              break a;
            } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
            else {
              Ig();
              if (d === e) {
                b = Zi(a, b, c);
                break a;
              }
              Xi(a, b, d, c);
            }
            b = b.child;
          }
          return b;
        case 5:
          return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
        case 6:
          return null === a && Eg(b), null;
        case 13:
          return oj(a, b, c);
        case 4:
          return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
        case 11:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
        case 7:
          return Xi(a, b, b.pendingProps, c), b.child;
        case 8:
          return Xi(a, b, b.pendingProps.children, c), b.child;
        case 12:
          return Xi(a, b, b.pendingProps.children, c), b.child;
        case 10:
          a: {
            d = b.type._context;
            e = b.pendingProps;
            f2 = b.memoizedProps;
            g = e.value;
            G(Wg, d._currentValue);
            d._currentValue = g;
            if (null !== f2) if (He(f2.value, g)) {
              if (f2.children === e.children && !Wf.current) {
                b = Zi(a, b, c);
                break a;
              }
            } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
              var h = f2.dependencies;
              if (null !== h) {
                g = f2.child;
                for (var k2 = h.firstContext; null !== k2; ) {
                  if (k2.context === d) {
                    if (1 === f2.tag) {
                      k2 = mh(-1, c & -c);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (null !== l2) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c;
                    k2 = f2.alternate;
                    null !== k2 && (k2.lanes |= c);
                    bh(
                      f2.return,
                      c,
                      b
                    );
                    h.lanes |= c;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
              else if (18 === f2.tag) {
                g = f2.return;
                if (null === g) throw Error(p(341));
                g.lanes |= c;
                h = g.alternate;
                null !== h && (h.lanes |= c);
                bh(g, c, b);
                g = f2.sibling;
              } else g = f2.child;
              if (null !== g) g.return = f2;
              else for (g = f2; null !== g; ) {
                if (g === b) {
                  g = null;
                  break;
                }
                f2 = g.sibling;
                if (null !== f2) {
                  f2.return = g.return;
                  g = f2;
                  break;
                }
                g = g.return;
              }
              f2 = g;
            }
            Xi(a, b, e.children, c);
            b = b.child;
          }
          return b;
        case 9:
          return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
        case 14:
          return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
        case 15:
          return bj(a, b, b.type, b.pendingProps, c);
        case 17:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
        case 19:
          return xj(a, b, c);
        case 22:
          return dj(a, b, c);
      }
      throw Error(p(156, b.tag));
    };
    function Fk(a, b) {
      return ac(a, b);
    }
    function $k(a, b, c, d) {
      this.tag = a;
      this.key = c;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = b;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = d;
      this.subtreeFlags = this.flags = 0;
      this.deletions = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function Bg(a, b, c, d) {
      return new $k(a, b, c, d);
    }
    function aj(a) {
      a = a.prototype;
      return !(!a || !a.isReactComponent);
    }
    function Zk(a) {
      if ("function" === typeof a) return aj(a) ? 1 : 0;
      if (void 0 !== a && null !== a) {
        a = a.$$typeof;
        if (a === Da) return 11;
        if (a === Ga) return 14;
      }
      return 2;
    }
    function Pg(a, b) {
      var c = a.alternate;
      null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
      c.flags = a.flags & 14680064;
      c.childLanes = a.childLanes;
      c.lanes = a.lanes;
      c.child = a.child;
      c.memoizedProps = a.memoizedProps;
      c.memoizedState = a.memoizedState;
      c.updateQueue = a.updateQueue;
      b = a.dependencies;
      c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
      c.sibling = a.sibling;
      c.index = a.index;
      c.ref = a.ref;
      return c;
    }
    function Rg(a, b, c, d, e, f2) {
      var g = 2;
      d = a;
      if ("function" === typeof a) aj(a) && (g = 1);
      else if ("string" === typeof a) g = 5;
      else a: switch (a) {
        case ya:
          return Tg(c.children, e, f2, b);
        case za:
          g = 8;
          e |= 8;
          break;
        case Aa:
          return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
        case Ea:
          return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
        case Fa:
          return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
        case Ia:
          return pj(c, e, f2, b);
        default:
          if ("object" === typeof a && null !== a) switch (a.$$typeof) {
            case Ba:
              g = 10;
              break a;
            case Ca:
              g = 9;
              break a;
            case Da:
              g = 11;
              break a;
            case Ga:
              g = 14;
              break a;
            case Ha:
              g = 16;
              d = null;
              break a;
          }
          throw Error(p(130, null == a ? a : typeof a, ""));
      }
      b = Bg(g, c, b, e);
      b.elementType = a;
      b.type = d;
      b.lanes = f2;
      return b;
    }
    function Tg(a, b, c, d) {
      a = Bg(7, a, d, b);
      a.lanes = c;
      return a;
    }
    function pj(a, b, c, d) {
      a = Bg(22, a, d, b);
      a.elementType = Ia;
      a.lanes = c;
      a.stateNode = { isHidden: false };
      return a;
    }
    function Qg(a, b, c) {
      a = Bg(6, a, null, b);
      a.lanes = c;
      return a;
    }
    function Sg(a, b, c) {
      b = Bg(4, null !== a.children ? a.children : [], a.key, b);
      b.lanes = c;
      b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
      return b;
    }
    function al(a, b, c, d, e) {
      this.tag = b;
      this.containerInfo = a;
      this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.callbackNode = this.pendingContext = this.context = null;
      this.callbackPriority = 0;
      this.eventTimes = zc(0);
      this.expirationTimes = zc(-1);
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = zc(0);
      this.identifierPrefix = d;
      this.onRecoverableError = e;
      this.mutableSourceEagerHydrationData = null;
    }
    function bl(a, b, c, d, e, f2, g, h, k2) {
      a = new al(a, b, c, h, k2);
      1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
      f2 = Bg(3, null, null, b);
      a.current = f2;
      f2.stateNode = a;
      f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
      kh(f2);
      return a;
    }
    function cl(a, b, c) {
      var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
    }
    function dl(a) {
      if (!a) return Vf;
      a = a._reactInternals;
      a: {
        if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
        var b = a;
        do {
          switch (b.tag) {
            case 3:
              b = b.stateNode.context;
              break a;
            case 1:
              if (Zf(b.type)) {
                b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                break a;
              }
          }
          b = b.return;
        } while (null !== b);
        throw Error(p(171));
      }
      if (1 === a.tag) {
        var c = a.type;
        if (Zf(c)) return bg(a, c, b);
      }
      return b;
    }
    function el(a, b, c, d, e, f2, g, h, k2) {
      a = bl(c, d, true, a, e, f2, g, h, k2);
      a.context = dl(null);
      c = a.current;
      d = R();
      e = yi(c);
      f2 = mh(d, e);
      f2.callback = void 0 !== b && null !== b ? b : null;
      nh(c, f2, e);
      a.current.lanes = e;
      Ac(a, e, d);
      Dk(a, d);
      return a;
    }
    function fl(a, b, c, d) {
      var e = b.current, f2 = R(), g = yi(e);
      c = dl(c);
      null === b.context ? b.context = c : b.pendingContext = c;
      b = mh(f2, g);
      b.payload = { element: a };
      d = void 0 === d ? null : d;
      null !== d && (b.callback = d);
      a = nh(e, b, g);
      null !== a && (gi(a, e, g, f2), oh(a, e, g));
      return g;
    }
    function gl(a) {
      a = a.current;
      if (!a.child) return null;
      switch (a.child.tag) {
        case 5:
          return a.child.stateNode;
        default:
          return a.child.stateNode;
      }
    }
    function hl(a, b) {
      a = a.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        var c = a.retryLane;
        a.retryLane = 0 !== c && c < b ? c : b;
      }
    }
    function il(a, b) {
      hl(a, b);
      (a = a.alternate) && hl(a, b);
    }
    function jl() {
      return null;
    }
    var kl = "function" === typeof reportError ? reportError : function(a) {
      console.error(a);
    };
    function ll(a) {
      this._internalRoot = a;
    }
    ml.prototype.render = ll.prototype.render = function(a) {
      var b = this._internalRoot;
      if (null === b) throw Error(p(409));
      fl(a, b, null, null);
    };
    ml.prototype.unmount = ll.prototype.unmount = function() {
      var a = this._internalRoot;
      if (null !== a) {
        this._internalRoot = null;
        var b = a.containerInfo;
        Rk(function() {
          fl(null, a, null, null);
        });
        b[uf] = null;
      }
    };
    function ml(a) {
      this._internalRoot = a;
    }
    ml.prototype.unstable_scheduleHydration = function(a) {
      if (a) {
        var b = Hc();
        a = { blockedOn: null, target: a, priority: b };
        for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
        Qc.splice(c, 0, a);
        0 === c && Vc(a);
      }
    };
    function nl(a) {
      return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
    }
    function ol(a) {
      return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
    }
    function pl() {
    }
    function ql(a, b, c, d, e) {
      if (e) {
        if ("function" === typeof d) {
          var f2 = d;
          d = function() {
            var a2 = gl(g);
            f2.call(a2);
          };
        }
        var g = el(b, d, a, 0, null, false, false, "", pl);
        a._reactRootContainer = g;
        a[uf] = g.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk();
        return g;
      }
      for (; e = a.lastChild; ) a.removeChild(e);
      if ("function" === typeof d) {
        var h = d;
        d = function() {
          var a2 = gl(k2);
          h.call(a2);
        };
      }
      var k2 = bl(a, 0, false, null, null, false, false, "", pl);
      a._reactRootContainer = k2;
      a[uf] = k2.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Rk(function() {
        fl(b, k2, c, d);
      });
      return k2;
    }
    function rl(a, b, c, d, e) {
      var f2 = c._reactRootContainer;
      if (f2) {
        var g = f2;
        if ("function" === typeof e) {
          var h = e;
          e = function() {
            var a2 = gl(g);
            h.call(a2);
          };
        }
        fl(b, g, a, e);
      } else g = ql(c, b, a, e, d);
      return gl(g);
    }
    Ec = function(a) {
      switch (a.tag) {
        case 3:
          var b = a.stateNode;
          if (b.current.memoizedState.isDehydrated) {
            var c = tc(b.pendingLanes);
            0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
          }
          break;
        case 13:
          Rk(function() {
            var b2 = ih(a, 1);
            if (null !== b2) {
              var c2 = R();
              gi(b2, a, 1, c2);
            }
          }), il(a, 1);
      }
    };
    Fc = function(a) {
      if (13 === a.tag) {
        var b = ih(a, 134217728);
        if (null !== b) {
          var c = R();
          gi(b, a, 134217728, c);
        }
        il(a, 134217728);
      }
    };
    Gc = function(a) {
      if (13 === a.tag) {
        var b = yi(a), c = ih(a, b);
        if (null !== c) {
          var d = R();
          gi(c, a, b, d);
        }
        il(a, b);
      }
    };
    Hc = function() {
      return C;
    };
    Ic = function(a, b) {
      var c = C;
      try {
        return C = a, b();
      } finally {
        C = c;
      }
    };
    yb = function(a, b, c) {
      switch (b) {
        case "input":
          bb(a, c);
          b = c.name;
          if ("radio" === c.type && null != b) {
            for (c = a; c.parentNode; ) c = c.parentNode;
            c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
            for (b = 0; b < c.length; b++) {
              var d = c[b];
              if (d !== a && d.form === a.form) {
                var e = Db(d);
                if (!e) throw Error(p(90));
                Wa(d);
                bb(d, e);
              }
            }
          }
          break;
        case "textarea":
          ib(a, c);
          break;
        case "select":
          b = c.value, null != b && fb(a, !!c.multiple, b, false);
      }
    };
    Gb = Qk;
    Hb = Rk;
    var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
    var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
      a = Zb(a);
      return null === a ? null : a.stateNode;
    }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
    if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
      var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!vl.isDisabled && vl.supportsFiber) try {
        kc = vl.inject(ul), lc = vl;
      } catch (a) {
      }
    }
    reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
    reactDom_production_min.createPortal = function(a, b) {
      var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!nl(b)) throw Error(p(200));
      return cl(a, b, null, c);
    };
    reactDom_production_min.createRoot = function(a, b) {
      if (!nl(a)) throw Error(p(299));
      var c = false, d = "", e = kl;
      null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
      b = bl(a, 1, false, null, null, c, false, d, e);
      a[uf] = b.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      return new ll(b);
    };
    reactDom_production_min.findDOMNode = function(a) {
      if (null == a) return null;
      if (1 === a.nodeType) return a;
      var b = a._reactInternals;
      if (void 0 === b) {
        if ("function" === typeof a.render) throw Error(p(188));
        a = Object.keys(a).join(",");
        throw Error(p(268, a));
      }
      a = Zb(b);
      a = null === a ? null : a.stateNode;
      return a;
    };
    reactDom_production_min.flushSync = function(a) {
      return Rk(a);
    };
    reactDom_production_min.hydrate = function(a, b, c) {
      if (!ol(b)) throw Error(p(200));
      return rl(null, a, b, true, c);
    };
    reactDom_production_min.hydrateRoot = function(a, b, c) {
      if (!nl(a)) throw Error(p(405));
      var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
      null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
      b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
      a[uf] = b.current;
      sf(a);
      if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
        c,
        e
      );
      return new ml(b);
    };
    reactDom_production_min.render = function(a, b, c) {
      if (!ol(b)) throw Error(p(200));
      return rl(null, a, b, false, c);
    };
    reactDom_production_min.unmountComponentAtNode = function(a) {
      if (!ol(a)) throw Error(p(40));
      return a._reactRootContainer ? (Rk(function() {
        rl(null, null, a, false, function() {
          a._reactRootContainer = null;
          a[uf] = null;
        });
      }), true) : false;
    };
    reactDom_production_min.unstable_batchedUpdates = Qk;
    reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
      if (!ol(c)) throw Error(p(200));
      if (null == a || void 0 === a._reactInternals) throw Error(p(38));
      return rl(a, b, c, false, d);
    };
    reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    {
      checkDCE();
      reactDom.exports = reactDom_production_min;
    }
    var reactDomExports = reactDom.exports;
    var m = reactDomExports;
    {
      client.createRoot = m.createRoot;
      client.hydrateRoot = m.hydrateRoot;
    }
    /**
     * @remix-run/router v1.23.0
     *
     * Copyright (c) Remix Software Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.md file in the root directory of this source tree.
     *
     * @license MIT
     */
    function _extends$1() {
      _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends$1.apply(this, arguments);
    }
    var Action;
    (function(Action2) {
      Action2["Pop"] = "POP";
      Action2["Push"] = "PUSH";
      Action2["Replace"] = "REPLACE";
    })(Action || (Action = {}));
    function createMemoryHistory(options) {
      if (options === void 0) {
        options = {};
      }
      let {
        initialEntries = ["/"],
        initialIndex,
        v5Compat = false
      } = options;
      let entries;
      entries = initialEntries.map((entry, index2) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index2 === 0 ? "default" : void 0));
      let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
      let action = Action.Pop;
      let listener = null;
      function clampIndex(n2) {
        return Math.min(Math.max(n2, 0), entries.length - 1);
      }
      function getCurrentLocation() {
        return entries[index];
      }
      function createMemoryLocation(to, state, key) {
        if (state === void 0) {
          state = null;
        }
        let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
        warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
        return location;
      }
      function createHref(to) {
        return typeof to === "string" ? to : createPath(to);
      }
      let history = {
        get index() {
          return index;
        },
        get action() {
          return action;
        },
        get location() {
          return getCurrentLocation();
        },
        createHref,
        createURL(to) {
          return new URL(createHref(to), "http://localhost");
        },
        encodeLocation(to) {
          let path = typeof to === "string" ? parsePath(to) : to;
          return {
            pathname: path.pathname || "",
            search: path.search || "",
            hash: path.hash || ""
          };
        },
        push(to, state) {
          action = Action.Push;
          let nextLocation = createMemoryLocation(to, state);
          index += 1;
          entries.splice(index, entries.length, nextLocation);
          if (v5Compat && listener) {
            listener({
              action,
              location: nextLocation,
              delta: 1
            });
          }
        },
        replace(to, state) {
          action = Action.Replace;
          let nextLocation = createMemoryLocation(to, state);
          entries[index] = nextLocation;
          if (v5Compat && listener) {
            listener({
              action,
              location: nextLocation,
              delta: 0
            });
          }
        },
        go(delta) {
          action = Action.Pop;
          let nextIndex = clampIndex(index + delta);
          let nextLocation = entries[nextIndex];
          index = nextIndex;
          if (listener) {
            listener({
              action,
              location: nextLocation,
              delta
            });
          }
        },
        listen(fn) {
          listener = fn;
          return () => {
            listener = null;
          };
        }
      };
      return history;
    }
    function invariant(value, message) {
      if (value === false || value === null || typeof value === "undefined") {
        throw new Error(message);
      }
    }
    function warning(cond, message) {
      if (!cond) {
        if (typeof console !== "undefined") console.warn(message);
        try {
          throw new Error(message);
        } catch (e) {
        }
      }
    }
    function createKey() {
      return Math.random().toString(36).substr(2, 8);
    }
    function createLocation(current, to, state, key) {
      if (state === void 0) {
        state = null;
      }
      let location = _extends$1({
        pathname: typeof current === "string" ? current : current.pathname,
        search: "",
        hash: ""
      }, typeof to === "string" ? parsePath(to) : to, {
        state,
        // TODO: This could be cleaned up.  push/replace should probably just take
        // full Locations now and avoid the need to run through this flow at all
        // But that's a pretty big refactor to the current test suite so going to
        // keep as is for the time being and just let any incoming keys take precedence
        key: to && to.key || key || createKey()
      });
      return location;
    }
    function createPath(_ref) {
      let {
        pathname = "/",
        search = "",
        hash = ""
      } = _ref;
      if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
      if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
      return pathname;
    }
    function parsePath(path) {
      let parsedPath = {};
      if (path) {
        let hashIndex = path.indexOf("#");
        if (hashIndex >= 0) {
          parsedPath.hash = path.substr(hashIndex);
          path = path.substr(0, hashIndex);
        }
        let searchIndex = path.indexOf("?");
        if (searchIndex >= 0) {
          parsedPath.search = path.substr(searchIndex);
          path = path.substr(0, searchIndex);
        }
        if (path) {
          parsedPath.pathname = path;
        }
      }
      return parsedPath;
    }
    var ResultType;
    (function(ResultType2) {
      ResultType2["data"] = "data";
      ResultType2["deferred"] = "deferred";
      ResultType2["redirect"] = "redirect";
      ResultType2["error"] = "error";
    })(ResultType || (ResultType = {}));
    function matchRoutes(routes, locationArg, basename) {
      if (basename === void 0) {
        basename = "/";
      }
      return matchRoutesImpl(routes, locationArg, basename);
    }
    function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
      let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
      let pathname = stripBasename(location.pathname || "/", basename);
      if (pathname == null) {
        return null;
      }
      let branches = flattenRoutes(routes);
      rankRouteBranches(branches);
      let matches = null;
      for (let i = 0; matches == null && i < branches.length; ++i) {
        let decoded = decodePath(pathname);
        matches = matchRouteBranch(branches[i], decoded);
      }
      return matches;
    }
    function flattenRoutes(routes, branches, parentsMeta, parentPath) {
      if (branches === void 0) {
        branches = [];
      }
      if (parentsMeta === void 0) {
        parentsMeta = [];
      }
      if (parentPath === void 0) {
        parentPath = "";
      }
      let flattenRoute = (route, index, relativePath) => {
        let meta = {
          relativePath: relativePath === void 0 ? route.path || "" : relativePath,
          caseSensitive: route.caseSensitive === true,
          childrenIndex: index,
          route
        };
        if (meta.relativePath.startsWith("/")) {
          invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
          meta.relativePath = meta.relativePath.slice(parentPath.length);
        }
        let path = joinPaths([parentPath, meta.relativePath]);
        let routesMeta = parentsMeta.concat(meta);
        if (route.children && route.children.length > 0) {
          invariant(
            // Our types know better, but runtime JS may not!
            // @ts-expect-error
            route.index !== true,
            "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
          );
          flattenRoutes(route.children, branches, routesMeta, path);
        }
        if (route.path == null && !route.index) {
          return;
        }
        branches.push({
          path,
          score: computeScore(path, route.index),
          routesMeta
        });
      };
      routes.forEach((route, index) => {
        var _route$path;
        if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
          flattenRoute(route, index);
        } else {
          for (let exploded of explodeOptionalSegments(route.path)) {
            flattenRoute(route, index, exploded);
          }
        }
      });
      return branches;
    }
    function explodeOptionalSegments(path) {
      let segments = path.split("/");
      if (segments.length === 0) return [];
      let [first, ...rest] = segments;
      let isOptional = first.endsWith("?");
      let required = first.replace(/\?$/, "");
      if (rest.length === 0) {
        return isOptional ? [required, ""] : [required];
      }
      let restExploded = explodeOptionalSegments(rest.join("/"));
      let result = [];
      result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
      if (isOptional) {
        result.push(...restExploded);
      }
      return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
    }
    function rankRouteBranches(branches) {
      branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
    }
    const paramRe = /^:[\w-]+$/;
    const dynamicSegmentValue = 3;
    const indexRouteValue = 2;
    const emptySegmentValue = 1;
    const staticSegmentValue = 10;
    const splatPenalty = -2;
    const isSplat = (s) => s === "*";
    function computeScore(path, index) {
      let segments = path.split("/");
      let initialScore = segments.length;
      if (segments.some(isSplat)) {
        initialScore += splatPenalty;
      }
      if (index) {
        initialScore += indexRouteValue;
      }
      return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
    }
    function compareIndexes(a, b) {
      let siblings = a.length === b.length && a.slice(0, -1).every((n2, i) => n2 === b[i]);
      return siblings ? (
        // If two routes are siblings, we should try to match the earlier sibling
        // first. This allows people to have fine-grained control over the matching
        // behavior by simply putting routes with identical paths in the order they
        // want them tried.
        a[a.length - 1] - b[b.length - 1]
      ) : (
        // Otherwise, it doesn't really make sense to rank non-siblings by index,
        // so they sort equally.
        0
      );
    }
    function matchRouteBranch(branch, pathname, allowPartial) {
      let {
        routesMeta
      } = branch;
      let matchedParams = {};
      let matchedPathname = "/";
      let matches = [];
      for (let i = 0; i < routesMeta.length; ++i) {
        let meta = routesMeta[i];
        let end = i === routesMeta.length - 1;
        let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
        let match = matchPath({
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end
        }, remainingPathname);
        let route = meta.route;
        if (!match) {
          return null;
        }
        Object.assign(matchedParams, match.params);
        matches.push({
          // TODO: Can this as be avoided?
          params: matchedParams,
          pathname: joinPaths([matchedPathname, match.pathname]),
          pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
          route
        });
        if (match.pathnameBase !== "/") {
          matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
        }
      }
      return matches;
    }
    function matchPath(pattern, pathname) {
      if (typeof pattern === "string") {
        pattern = {
          path: pattern,
          caseSensitive: false,
          end: true
        };
      }
      let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
      let match = pathname.match(matcher);
      if (!match) return null;
      let matchedPathname = match[0];
      let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
      let captureGroups = match.slice(1);
      let params = compiledParams.reduce((memo, _ref, index) => {
        let {
          paramName,
          isOptional
        } = _ref;
        if (paramName === "*") {
          let splatValue = captureGroups[index] || "";
          pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
        }
        const value = captureGroups[index];
        if (isOptional && !value) {
          memo[paramName] = void 0;
        } else {
          memo[paramName] = (value || "").replace(/%2F/g, "/");
        }
        return memo;
      }, {});
      return {
        params,
        pathname: matchedPathname,
        pathnameBase,
        pattern
      };
    }
    function compilePath(path, caseSensitive, end) {
      if (caseSensitive === void 0) {
        caseSensitive = false;
      }
      if (end === void 0) {
        end = true;
      }
      warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
      let params = [];
      let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
        params.push({
          paramName,
          isOptional: isOptional != null
        });
        return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
      });
      if (path.endsWith("*")) {
        params.push({
          paramName: "*"
        });
        regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
      } else if (end) {
        regexpSource += "\\/*$";
      } else if (path !== "" && path !== "/") {
        regexpSource += "(?:(?=\\/|$))";
      } else ;
      let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
      return [matcher, params];
    }
    function decodePath(value) {
      try {
        return value.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
      } catch (error) {
        warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
        return value;
      }
    }
    function stripBasename(pathname, basename) {
      if (basename === "/") return pathname;
      if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
        return null;
      }
      let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
      let nextChar = pathname.charAt(startIndex);
      if (nextChar && nextChar !== "/") {
        return null;
      }
      return pathname.slice(startIndex) || "/";
    }
    function resolvePath(to, fromPathname) {
      if (fromPathname === void 0) {
        fromPathname = "/";
      }
      let {
        pathname: toPathname,
        search = "",
        hash = ""
      } = typeof to === "string" ? parsePath(to) : to;
      let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
      return {
        pathname,
        search: normalizeSearch(search),
        hash: normalizeHash(hash)
      };
    }
    function resolvePathname(relativePath, fromPathname) {
      let segments = fromPathname.replace(/\/+$/, "").split("/");
      let relativeSegments = relativePath.split("/");
      relativeSegments.forEach((segment) => {
        if (segment === "..") {
          if (segments.length > 1) segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });
      return segments.length > 1 ? segments.join("/") : "/";
    }
    function getInvalidPathError(char, field, dest, path) {
      return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
    }
    function getPathContributingMatches(matches) {
      return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
    }
    function getResolveToMatches(matches, v7_relativeSplatPath) {
      let pathMatches = getPathContributingMatches(matches);
      if (v7_relativeSplatPath) {
        return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
      }
      return pathMatches.map((match) => match.pathnameBase);
    }
    function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
      if (isPathRelative === void 0) {
        isPathRelative = false;
      }
      let to;
      if (typeof toArg === "string") {
        to = parsePath(toArg);
      } else {
        to = _extends$1({}, toArg);
        invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
        invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
        invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
      }
      let isEmptyPath = toArg === "" || to.pathname === "";
      let toPathname = isEmptyPath ? "/" : to.pathname;
      let from;
      if (toPathname == null) {
        from = locationPathname;
      } else {
        let routePathnameIndex = routePathnames.length - 1;
        if (!isPathRelative && toPathname.startsWith("..")) {
          let toSegments = toPathname.split("/");
          while (toSegments[0] === "..") {
            toSegments.shift();
            routePathnameIndex -= 1;
          }
          to.pathname = toSegments.join("/");
        }
        from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
      }
      let path = resolvePath(to, from);
      let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
      let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
      if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
        path.pathname += "/";
      }
      return path;
    }
    const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
    const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
    const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
    const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
    function isRouteErrorResponse(error) {
      return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
    }
    const validMutationMethodsArr = ["post", "put", "patch", "delete"];
    new Set(validMutationMethodsArr);
    const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
    new Set(validRequestMethodsArr);
    /**
     * React Router v6.30.0
     *
     * Copyright (c) Remix Software Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.md file in the root directory of this source tree.
     *
     * @license MIT
     */
    function _extends() {
      _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
    const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
    const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
    const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
    const RouteContext = /* @__PURE__ */ reactExports.createContext({
      outlet: null,
      matches: [],
      isDataRoute: false
    });
    const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
    function useInRouterContext() {
      return reactExports.useContext(LocationContext) != null;
    }
    function useLocation() {
      !useInRouterContext() ? invariant(false) : void 0;
      return reactExports.useContext(LocationContext).location;
    }
    function useIsomorphicLayoutEffect(cb2) {
      let isStatic = reactExports.useContext(NavigationContext).static;
      if (!isStatic) {
        reactExports.useLayoutEffect(cb2);
      }
    }
    function useNavigate() {
      let {
        isDataRoute
      } = reactExports.useContext(RouteContext);
      return isDataRoute ? useNavigateStable() : useNavigateUnstable();
    }
    function useNavigateUnstable() {
      !useInRouterContext() ? invariant(false) : void 0;
      let dataRouterContext = reactExports.useContext(DataRouterContext);
      let {
        basename,
        future,
        navigator: navigator2
      } = reactExports.useContext(NavigationContext);
      let {
        matches
      } = reactExports.useContext(RouteContext);
      let {
        pathname: locationPathname
      } = useLocation();
      let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
      let activeRef = reactExports.useRef(false);
      useIsomorphicLayoutEffect(() => {
        activeRef.current = true;
      });
      let navigate = reactExports.useCallback(function(to, options) {
        if (options === void 0) {
          options = {};
        }
        if (!activeRef.current) return;
        if (typeof to === "number") {
          navigator2.go(to);
          return;
        }
        let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
        if (dataRouterContext == null && basename !== "/") {
          path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
        }
        (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
      }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
      return navigate;
    }
    function useRoutes(routes, locationArg) {
      return useRoutesImpl(routes, locationArg);
    }
    function useRoutesImpl(routes, locationArg, dataRouterState, future) {
      !useInRouterContext() ? invariant(false) : void 0;
      let {
        navigator: navigator2,
        static: isStatic
      } = reactExports.useContext(NavigationContext);
      let {
        matches: parentMatches
      } = reactExports.useContext(RouteContext);
      let routeMatch = parentMatches[parentMatches.length - 1];
      let parentParams = routeMatch ? routeMatch.params : {};
      routeMatch ? routeMatch.pathname : "/";
      let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
      routeMatch && routeMatch.route;
      let locationFromContext = useLocation();
      let location;
      if (locationArg) {
        var _parsedLocationArg$pa;
        let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
        !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
        location = parsedLocationArg;
      } else {
        location = locationFromContext;
      }
      let pathname = location.pathname || "/";
      let remainingPathname = pathname;
      if (parentPathnameBase !== "/") {
        let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
        let segments = pathname.replace(/^\//, "").split("/");
        remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
      }
      let matches = matchRoutes(routes, {
        pathname: remainingPathname
      });
      let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
        ])
      })), parentMatches, dataRouterState, future);
      if (locationArg && renderedMatches) {
        return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
          value: {
            location: _extends({
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default"
            }, location),
            navigationType: Action.Pop
          }
        }, renderedMatches);
      }
      return renderedMatches;
    }
    function DefaultErrorComponent() {
      let error = useRouteError();
      let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
      let stack = error instanceof Error ? error.stack : null;
      let lightgrey = "rgba(200,200,200, 0.5)";
      let preStyles = {
        padding: "0.5rem",
        backgroundColor: lightgrey
      };
      let devInfo = null;
      return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
        style: {
          fontStyle: "italic"
        }
      }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
        style: preStyles
      }, stack) : null, devInfo);
    }
    const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
    class RenderErrorBoundary extends reactExports.Component {
      constructor(props) {
        super(props);
        this.state = {
          location: props.location,
          revalidation: props.revalidation,
          error: props.error
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      static getDerivedStateFromProps(props, state) {
        if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
          return {
            error: props.error,
            location: props.location,
            revalidation: props.revalidation
          };
        }
        return {
          error: props.error !== void 0 ? props.error : state.error,
          location: state.location,
          revalidation: props.revalidation || state.revalidation
        };
      }
      componentDidCatch(error, errorInfo) {
        console.error("React Router caught the following error during render", error, errorInfo);
      }
      render() {
        return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
          value: this.props.routeContext
        }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
          value: this.state.error,
          children: this.props.component
        })) : this.props.children;
      }
    }
    function RenderedRoute(_ref) {
      let {
        routeContext,
        match,
        children
      } = _ref;
      let dataRouterContext = reactExports.useContext(DataRouterContext);
      if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
        dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
      }
      return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
        value: routeContext
      }, children);
    }
    function _renderMatches(matches, parentMatches, dataRouterState, future) {
      var _dataRouterState;
      if (parentMatches === void 0) {
        parentMatches = [];
      }
      if (dataRouterState === void 0) {
        dataRouterState = null;
      }
      if (future === void 0) {
        future = null;
      }
      if (matches == null) {
        var _future;
        if (!dataRouterState) {
          return null;
        }
        if (dataRouterState.errors) {
          matches = dataRouterState.matches;
        } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
          matches = dataRouterState.matches;
        } else {
          return null;
        }
      }
      let renderedMatches = matches;
      let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
      if (errors != null) {
        let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
        !(errorIndex >= 0) ? invariant(false) : void 0;
        renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
      }
      let renderFallback = false;
      let fallbackIndex = -1;
      if (dataRouterState && future && future.v7_partialHydration) {
        for (let i = 0; i < renderedMatches.length; i++) {
          let match = renderedMatches[i];
          if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
            fallbackIndex = i;
          }
          if (match.route.id) {
            let {
              loaderData,
              errors: errors2
            } = dataRouterState;
            let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
            if (match.route.lazy || needsToRunLoader) {
              renderFallback = true;
              if (fallbackIndex >= 0) {
                renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
              } else {
                renderedMatches = [renderedMatches[0]];
              }
              break;
            }
          }
        }
      }
      return renderedMatches.reduceRight((outlet, match, index) => {
        let error;
        let shouldRenderHydrateFallback = false;
        let errorElement = null;
        let hydrateFallbackElement = null;
        if (dataRouterState) {
          error = errors && match.route.id ? errors[match.route.id] : void 0;
          errorElement = match.route.errorElement || defaultErrorElement;
          if (renderFallback) {
            if (fallbackIndex < 0 && index === 0) {
              warningOnce("route-fallback");
              shouldRenderHydrateFallback = true;
              hydrateFallbackElement = null;
            } else if (fallbackIndex === index) {
              shouldRenderHydrateFallback = true;
              hydrateFallbackElement = match.route.hydrateFallbackElement || null;
            }
          }
        }
        let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
        let getChildren = () => {
          let children;
          if (error) {
            children = errorElement;
          } else if (shouldRenderHydrateFallback) {
            children = hydrateFallbackElement;
          } else if (match.route.Component) {
            children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
          } else if (match.route.element) {
            children = match.route.element;
          } else {
            children = outlet;
          }
          return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          });
        };
        return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: {
            outlet: null,
            matches: matches2,
            isDataRoute: true
          }
        }) : getChildren();
      }, null);
    }
    var DataRouterHook = /* @__PURE__ */ function(DataRouterHook2) {
      DataRouterHook2["UseBlocker"] = "useBlocker";
      DataRouterHook2["UseRevalidator"] = "useRevalidator";
      DataRouterHook2["UseNavigateStable"] = "useNavigate";
      return DataRouterHook2;
    }(DataRouterHook || {});
    var DataRouterStateHook = /* @__PURE__ */ function(DataRouterStateHook2) {
      DataRouterStateHook2["UseBlocker"] = "useBlocker";
      DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
      DataRouterStateHook2["UseActionData"] = "useActionData";
      DataRouterStateHook2["UseRouteError"] = "useRouteError";
      DataRouterStateHook2["UseNavigation"] = "useNavigation";
      DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
      DataRouterStateHook2["UseMatches"] = "useMatches";
      DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
      DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
      DataRouterStateHook2["UseRouteId"] = "useRouteId";
      return DataRouterStateHook2;
    }(DataRouterStateHook || {});
    function useDataRouterContext(hookName) {
      let ctx = reactExports.useContext(DataRouterContext);
      !ctx ? invariant(false) : void 0;
      return ctx;
    }
    function useDataRouterState(hookName) {
      let state = reactExports.useContext(DataRouterStateContext);
      !state ? invariant(false) : void 0;
      return state;
    }
    function useRouteContext(hookName) {
      let route = reactExports.useContext(RouteContext);
      !route ? invariant(false) : void 0;
      return route;
    }
    function useCurrentRouteId(hookName) {
      let route = useRouteContext();
      let thisRoute = route.matches[route.matches.length - 1];
      !thisRoute.route.id ? invariant(false) : void 0;
      return thisRoute.route.id;
    }
    function useRouteError() {
      var _state$errors;
      let error = reactExports.useContext(RouteErrorContext);
      let state = useDataRouterState();
      let routeId = useCurrentRouteId();
      if (error !== void 0) {
        return error;
      }
      return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
    }
    function useNavigateStable() {
      let {
        router
      } = useDataRouterContext(DataRouterHook.UseNavigateStable);
      let id2 = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
      let activeRef = reactExports.useRef(false);
      useIsomorphicLayoutEffect(() => {
        activeRef.current = true;
      });
      let navigate = reactExports.useCallback(function(to, options) {
        if (options === void 0) {
          options = {};
        }
        if (!activeRef.current) return;
        if (typeof to === "number") {
          router.navigate(to);
        } else {
          router.navigate(to, _extends({
            fromRouteId: id2
          }, options));
        }
      }, [router, id2]);
      return navigate;
    }
    const alreadyWarned$1 = {};
    function warningOnce(key, cond, message) {
      if (!alreadyWarned$1[key]) {
        alreadyWarned$1[key] = true;
      }
    }
    function logV6DeprecationWarnings(renderFuture, routerFuture) {
      if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0) ;
      if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && true) ;
    }
    const START_TRANSITION = "startTransition";
    const startTransitionImpl = React$1[START_TRANSITION];
    function MemoryRouter(_ref3) {
      let {
        basename,
        children,
        initialEntries,
        initialIndex,
        future
      } = _ref3;
      let historyRef = reactExports.useRef();
      if (historyRef.current == null) {
        historyRef.current = createMemoryHistory({
          initialEntries,
          initialIndex,
          v5Compat: true
        });
      }
      let history = historyRef.current;
      let [state, setStateImpl] = reactExports.useState({
        action: history.action,
        location: history.location
      });
      let {
        v7_startTransition
      } = future || {};
      let setState = reactExports.useCallback((newState) => {
        v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
      }, [setStateImpl, v7_startTransition]);
      reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
      reactExports.useEffect(() => logV6DeprecationWarnings(future), [future]);
      return /* @__PURE__ */ reactExports.createElement(Router, {
        basename,
        children,
        location: state.location,
        navigationType: state.action,
        navigator: history,
        future
      });
    }
    function Navigate(_ref4) {
      let {
        to,
        replace: replace2,
        state,
        relative
      } = _ref4;
      !useInRouterContext() ? invariant(false) : void 0;
      let {
        future,
        static: isStatic
      } = reactExports.useContext(NavigationContext);
      let {
        matches
      } = reactExports.useContext(RouteContext);
      let {
        pathname: locationPathname
      } = useLocation();
      let navigate = useNavigate();
      let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
      let jsonPath = JSON.stringify(path);
      reactExports.useEffect(() => navigate(JSON.parse(jsonPath), {
        replace: replace2,
        state,
        relative
      }), [navigate, jsonPath, relative, replace2, state]);
      return null;
    }
    function Route(_props) {
      invariant(false);
    }
    function Router(_ref5) {
      let {
        basename: basenameProp = "/",
        children = null,
        location: locationProp,
        navigationType = Action.Pop,
        navigator: navigator2,
        static: staticProp = false,
        future
      } = _ref5;
      !!useInRouterContext() ? invariant(false) : void 0;
      let basename = basenameProp.replace(/^\/*/, "/");
      let navigationContext = reactExports.useMemo(() => ({
        basename,
        navigator: navigator2,
        static: staticProp,
        future: _extends({
          v7_relativeSplatPath: false
        }, future)
      }), [basename, future, navigator2, staticProp]);
      if (typeof locationProp === "string") {
        locationProp = parsePath(locationProp);
      }
      let {
        pathname = "/",
        search = "",
        hash = "",
        state = null,
        key = "default"
      } = locationProp;
      let locationContext = reactExports.useMemo(() => {
        let trailingPathname = stripBasename(pathname, basename);
        if (trailingPathname == null) {
          return null;
        }
        return {
          location: {
            pathname: trailingPathname,
            search,
            hash,
            state,
            key
          },
          navigationType
        };
      }, [basename, pathname, search, hash, state, key, navigationType]);
      if (locationContext == null) {
        return null;
      }
      return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
        value: navigationContext
      }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
        children,
        value: locationContext
      }));
    }
    function Routes(_ref6) {
      let {
        children,
        location
      } = _ref6;
      return useRoutes(createRoutesFromChildren(children), location);
    }
    new Promise(() => {
    });
    function createRoutesFromChildren(children, parentPath) {
      if (parentPath === void 0) {
        parentPath = [];
      }
      let routes = [];
      reactExports.Children.forEach(children, (element, index) => {
        if (!/* @__PURE__ */ reactExports.isValidElement(element)) {
          return;
        }
        let treePath = [...parentPath, index];
        if (element.type === reactExports.Fragment) {
          routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
          return;
        }
        !(element.type === Route) ? invariant(false) : void 0;
        !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
        let route = {
          id: element.props.id || treePath.join("-"),
          caseSensitive: element.props.caseSensitive,
          element: element.props.element,
          Component: element.props.Component,
          index: element.props.index,
          path: element.props.path,
          loader: element.props.loader,
          action: element.props.action,
          errorElement: element.props.errorElement,
          ErrorBoundary: element.props.ErrorBoundary,
          hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
          shouldRevalidate: element.props.shouldRevalidate,
          handle: element.props.handle,
          lazy: element.props.lazy
        };
        if (element.props.children) {
          route.children = createRoutesFromChildren(element.props.children, treePath);
        }
        routes.push(route);
      });
      return routes;
    }
    const cn$1 = (...classes) => {
      return classes.filter(Boolean).join(" ");
    };
    const Button$1 = React.forwardRef(
      (_a, ref) => {
        var _b = _a, {
          variant = "primary",
          size = "md",
          disabled = false,
          isIconOnly = false,
          showTooltip = false,
          leftIcon,
          rightIcon,
          showLeftIcon = false,
          showRightIcon = false,
          tooltip,
          className,
          children
        } = _b, props = __objRest(_b, [
          "variant",
          "size",
          "disabled",
          "isIconOnly",
          "showTooltip",
          "leftIcon",
          "rightIcon",
          "showLeftIcon",
          "showRightIcon",
          "tooltip",
          "className",
          "children"
        ]);
        const baseStyles = cn$1(
          "inline-flex items-center justify-center rounded-lg transition-colors duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-line-primary-light dark:focus-visible:ring-line-primary-dark focus-visible:ring-offset-2",
          "relative group"
        );
        const variantStyles = {
          primary: cn$1(
            "bg-fill-primary-light dark:bg-fill-primary-dark",
            "text-text-inverted-light dark:text-text-inverted-dark",
            "hover:bg-gray-850 dark:hover:bg-gray-100",
            "disabled:bg-fill-disabled-light dark:disabled:bg-fill-disabled-dark",
            "disabled:text-text-disabled-light dark:disabled:text-text-disabled-dark",
            "disabled:cursor-not-allowed"
          ),
          secondary: cn$1(
            "bg-fill-secondary-light dark:bg-fill-secondary-dark",
            "text-text-primary-light dark:text-text-primary-dark",
            "border border-line-secondary-light dark:border-line-secondary-dark",
            "hover:bg-gray-50 dark:hover:bg-gray-800",
            "disabled:text-text-disabled-light dark:disabled:text-text-disabled-dark",
            "disabled:border-line-disabled-light dark:disabled:border-line-disabled-dark",
            "disabled:cursor-not-allowed"
          ),
          tertiary: cn$1(
            "bg-transparent",
            "text-text-primary-light dark:text-text-primary-dark",
            "hover:bg-gray-50 dark:hover:bg-gray-800",
            "disabled:text-text-disabled-light dark:disabled:text-text-disabled-dark",
            "disabled:cursor-not-allowed"
          )
        };
        const sizeStyles2 = {
          sm: isIconOnly ? "w-7 h-7" : cn$1(
            "px-4",
            "h-[32px] min-w-[100px]",
            "text-body-md-md leading-none gap-1.5"
          ),
          md: isIconOnly ? "w-9 h-9" : cn$1(
            "px-4",
            "h-[40px] min-w-[100px]",
            "text-body-md-md leading-none gap-2"
          ),
          lg: isIconOnly ? "w-9 h-9" : cn$1(
            "px-5",
            "h-[48px] min-w-[100px]",
            "text-body-lg-md leading-none gap-2"
          )
        };
        const iconColorStyles = {
          primary: cn$1(
            "[&>svg]:text-icon-inverted-light dark:[&>svg]:text-icon-inverted-dark",
            "disabled:[&>svg]:text-icon-disabled-light dark:disabled:[&>svg]:text-icon-disabled-dark"
          ),
          secondary: cn$1(
            "[&>svg]:text-icon-primary-light dark:[&>svg]:text-icon-primary-dark",
            "disabled:[&>svg]:text-icon-disabled-light dark:disabled:[&>svg]:text-icon-disabled-dark"
          ),
          tertiary: cn$1(
            "[&>svg]:text-icon-primary-light dark:[&>svg]:text-icon-primary-dark",
            "disabled:[&>svg]:text-icon-disabled-light dark:disabled:[&>svg]:text-icon-disabled-dark"
          )
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          __spreadProps(__spreadValues({
            ref,
            type: "button",
            disabled,
            className: cn$1(
              baseStyles,
              variantStyles[variant],
              sizeStyles2[size],
              iconColorStyles[variant],
              isIconOnly && "flex items-center justify-center p-0",
              isIconOnly ? size === "sm" ? "[&_svg]:w-4 [&_svg]:h-4" : size === "md" ? "[&_svg]:w-5 [&_svg]:h-5" : "[&_svg]:w-6 [&_svg]:h-6" : "[&_svg]:w-4 [&_svg]:h-4",
              className
            )
          }, props), {
            children: [
              showLeftIcon && leftIcon && !isIconOnly && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center", children: leftIcon }),
              !isIconOnly && children,
              isIconOnly && leftIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center", children: leftIcon }),
              showRightIcon && rightIcon && !isIconOnly && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center", children: rightIcon }),
              isIconOnly && showTooltip && tooltip && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-fill-dim50-light/50 dark:bg-fill-dim50-dark/50 rounded opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-inverted-light dark:text-text-inverted-dark text-xs font-medium leading-none whitespace-nowrap", children: tooltip }) })
            ]
          })
        );
      }
    );
    Button$1.displayName = "Button";
    const Button = React.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Button$1, __spreadProps(__spreadValues({}, props), { ref }));
      }
    );
    Button.displayName = "Button";
    const firebaseConfig = {
      apiKey: "AIzaSyBrAL5pz0IwE_w3hskBKcKBF4oDZlV_W1k",
      authDomain: "diggin-a08f8.firebaseapp.com",
      projectId: "diggin-a08f8",
      storageBucket: "diggin-a08f8.firebasestorage.app",
      messagingSenderId: "492982442570",
      appId: "1:492982442570:web:d71209728947131f8d64b3",
      databaseURL: "https://diggin-35c8e-default-rtdb.firebaseio.com"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    getDatabase(app);
    const createHole = (userId, name, icon) => __async(exports, null, function* () {
      try {
        const holesCollection = collection(db, "holes");
        const now = serverTimestamp();
        const docRef = yield addDoc(holesCollection, {
          userId,
          name,
          icon,
          createdAt: now,
          updatedAt: now
        });
        return docRef.id;
      } catch (error) {
        console.error("Error creating hole:", error);
        throw error;
      }
    });
    const getHole = (holeId) => __async(exports, null, function* () {
      try {
        const docRef = doc(db, "holes", holeId);
        const docSnap = yield getDoc(docRef);
        if (docSnap.exists()) {
          return __spreadValues({ id: docSnap.id }, docSnap.data());
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error getting hole:", error);
        throw error;
      }
    });
    const getUserHoles = (userId) => __async(exports, null, function* () {
      try {
        const holesQuery = query(
          collection(db, "holes"),
          where("userId", "==", userId),
          orderBy("updatedAt", "desc")
        );
        const querySnapshot = yield getDocs(holesQuery);
        const holes = [];
        querySnapshot.forEach((doc2) => {
          holes.push(__spreadValues({ id: doc2.id }, doc2.data()));
        });
        return holes;
      } catch (error) {
        console.error("Error getting user holes:", error);
        throw error;
      }
    });
    const WEB_CLIENT_ID = "492982442570-28e3lccep11l5a37ib4e8g2t2pnjcf2l.apps.googleusercontent.com";
    const isChromeAvailable = () => {
      return typeof window !== "undefined" && !!window.chrome;
    };
    const isChromeIdentityAvailable = () => {
      var _a;
      return isChromeAvailable() && !!((_a = window.chrome) == null ? void 0 : _a.identity);
    };
    const isChromeRuntimeAvailable = () => {
      var _a;
      return isChromeAvailable() && !!((_a = window.chrome) == null ? void 0 : _a.runtime);
    };
    const signInWithGoogle = () => __async(exports, null, function* () {
      try {
        console.log("Starting Google sign-in with web auth flow");
        if (!isChromeIdentityAvailable() || !isChromeRuntimeAvailable()) {
          throw new Error("Chrome identity 또는 runtime API를 사용할 수 없습니다.");
        }
        const authURL = new URL("https://accounts.google.com/o/oauth2/auth");
        authURL.searchParams.append("client_id", WEB_CLIENT_ID);
        authURL.searchParams.append("response_type", "token id_token");
        authURL.searchParams.append("redirect_uri", `https://${chrome.runtime.id}.chromiumapp.org/`);
        authURL.searchParams.append("scope", "email profile openid");
        const responseUrl = yield new Promise((resolve, reject) => {
          chrome.identity.launchWebAuthFlow(
            { url: authURL.toString(), interactive: true },
            (responseUrl2) => {
              if (chrome.runtime.lastError) {
                console.error("Identity API error:", chrome.runtime.lastError);
                reject(chrome.runtime.lastError);
                return;
              }
              if (!responseUrl2) {
                reject(new Error("인증 응답을 받지 못했습니다."));
                return;
              }
              resolve(responseUrl2);
            }
          );
        });
        const url = new URL(responseUrl);
        const params = new URLSearchParams(url.hash.substring(1));
        const idToken = params.get("id_token");
        if (!idToken) {
          throw new Error("ID 토큰을 찾을 수 없습니다.");
        }
        console.log("Got id_token from Google Auth");
        const credential = GoogleAuthProvider.credential(idToken);
        const userCredential = yield signInWithCredential(auth, credential);
        const user = userCredential.user;
        console.log("Firebase authentication successful");
        yield setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: serverTimestamp()
        }, { merge: true });
        console.log("User document updated in Firestore");
        return user;
      } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
      }
    });
    const onAuthStateChange = (callback) => {
      return onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
        console.log("Auth state changed:", user ? "User logged in" : "No user");
        callback(user);
      }));
    };
    const isExtensionEnvironment$1 = () => {
      var _a, _b;
      return typeof window !== "undefined" && !!((_a = window.chrome) == null ? void 0 : _a.runtime) && !!((_b = window.chrome) == null ? void 0 : _b.identity);
    };
    const LoginPage = () => {
      const navigate = useNavigate();
      const [loading, setLoading] = reactExports.useState(false);
      const [error, setError] = reactExports.useState(null);
      const handleGoogleLogin = () => __async(exports, null, function* () {
        try {
          setLoading(true);
          setError(null);
          let user;
          if (isExtensionEnvironment$1()) {
            console.log("Using Chrome extension auth flow");
            user = yield signInWithGoogle();
          } else {
            console.log("Using web auth flow");
            const provider = new GoogleAuthProvider();
            const result = yield signInWithPopup(auth, provider);
            user = result.user;
          }
          if (!user) {
            throw new Error("No user returned from authentication");
          }
          console.log("로그인 성공:", user);
          yield setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: serverTimestamp()
          }, { merge: true });
          const userHoles = yield getUserHoles(user.uid);
          if (userHoles.length > 0) {
            navigate("/hole-list");
          } else {
            navigate("/main");
          }
        } catch (err) {
          console.error("로그인 실패:", err);
          setError("로그인에 실패했습니다. 다시 시도해주세요.");
        } finally {
          setLoading(false);
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] px-2 pb-2 bg-color-surface-bg inline-flex flex-col justify-between items-center font-pretendard", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex-1 flex flex-col justify-center items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 h-40 bg-gray-200 rounded-[100px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-body-lg-md text-center justify-center leading-snug text-text-primary-light", children: [
            "To start diggin,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "log in with your Google account."
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-sm text-center px-4", children: error })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "primary",
            size: "lg",
            onClick: handleGoogleLogin,
            disabled: loading,
            className: "self-stretch",
            children: loading ? "로그인 중..." : "Log in with Google"
          }
        )
      ] });
    };
    /**
     * @license lucide-react v0.487.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
    const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    const toCamelCase = (string) => string.replace(
      /^([A-Z])|[\s-_]+(\w)/g,
      (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
    );
    const toPascalCase = (string) => {
      const camelCase = toCamelCase(string);
      return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
    };
    const mergeClasses = (...classes) => classes.filter((className, index, array) => {
      return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
    /**
     * @license lucide-react v0.487.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
    var defaultAttributes = {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    };
    /**
     * @license lucide-react v0.487.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
    const Icon = reactExports.forwardRef(
      (_c, ref) => {
        var _d = _c, {
          color = "currentColor",
          size = 24,
          strokeWidth = 2,
          absoluteStrokeWidth,
          className = "",
          children,
          iconNode
        } = _d, rest = __objRest(_d, [
          "color",
          "size",
          "strokeWidth",
          "absoluteStrokeWidth",
          "className",
          "children",
          "iconNode"
        ]);
        return reactExports.createElement(
          "svg",
          __spreadValues(__spreadProps(__spreadValues({
            ref
          }, defaultAttributes), {
            width: size,
            height: size,
            stroke: color,
            strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
            className: mergeClasses("lucide", className)
          }), rest),
          [
            ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
            ...Array.isArray(children) ? children : [children]
          ]
        );
      }
    );
    /**
     * @license lucide-react v0.487.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
    const createLucideIcon = (iconName, iconNode) => {
      const Component = reactExports.forwardRef(
        (_a, ref) => {
          var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
          return reactExports.createElement(Icon, __spreadValues({
            ref,
            iconNode,
            className: mergeClasses(
              `lucide-${toKebabCase(toPascalCase(iconName))}`,
              `lucide-${iconName}`,
              className
            )
          }, props));
        }
      );
      Component.displayName = toPascalCase(iconName);
      return Component;
    };
    /**
     * @license lucide-react v0.487.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
    const __iconNode = [
      ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
      ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
    ];
    const X = createLucideIcon("x", __iconNode);
    function r(e) {
      var t2, f2, n2 = "";
      if ("string" == typeof e || "number" == typeof e) n2 += e;
      else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for (t2 = 0; t2 < o; t2++) e[t2] && (f2 = r(e[t2])) && (n2 && (n2 += " "), n2 += f2);
      } else for (f2 in e) e[f2] && (n2 && (n2 += " "), n2 += f2);
      return n2;
    }
    function clsx() {
      for (var e, t2, f2 = 0, n2 = "", o = arguments.length; f2 < o; f2++) (e = arguments[f2]) && (t2 = r(e)) && (n2 && (n2 += " "), n2 += t2);
      return n2;
    }
    const CLASS_PART_SEPARATOR = "-";
    const createClassGroupUtils = (config) => {
      const classMap = createClassMap(config);
      const {
        conflictingClassGroups,
        conflictingClassGroupModifiers
      } = config;
      const getClassGroupId = (className) => {
        const classParts = className.split(CLASS_PART_SEPARATOR);
        if (classParts[0] === "" && classParts.length !== 1) {
          classParts.shift();
        }
        return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
      };
      const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
        const conflicts = conflictingClassGroups[classGroupId] || [];
        if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
          return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
        }
        return conflicts;
      };
      return {
        getClassGroupId,
        getConflictingClassGroupIds
      };
    };
    const getGroupRecursive = (classParts, classPartObject) => {
      var _a;
      if (classParts.length === 0) {
        return classPartObject.classGroupId;
      }
      const currentClassPart = classParts[0];
      const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
      const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
      if (classGroupFromNextClassPart) {
        return classGroupFromNextClassPart;
      }
      if (classPartObject.validators.length === 0) {
        return void 0;
      }
      const classRest = classParts.join(CLASS_PART_SEPARATOR);
      return (_a = classPartObject.validators.find(({
        validator
      }) => validator(classRest))) == null ? void 0 : _a.classGroupId;
    };
    const arbitraryPropertyRegex = /^\[(.+)\]$/;
    const getGroupIdForArbitraryProperty = (className) => {
      if (arbitraryPropertyRegex.test(className)) {
        const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
        const property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
        if (property) {
          return "arbitrary.." + property;
        }
      }
    };
    const createClassMap = (config) => {
      const {
        theme,
        prefix
      } = config;
      const classMap = {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      };
      const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
      prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
        processClassesRecursively(classGroup, classMap, classGroupId, theme);
      });
      return classMap;
    };
    const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
      classGroup.forEach((classDefinition) => {
        if (typeof classDefinition === "string") {
          const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
          classPartObjectToEdit.classGroupId = classGroupId;
          return;
        }
        if (typeof classDefinition === "function") {
          if (isThemeGetter(classDefinition)) {
            processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
            return;
          }
          classPartObject.validators.push({
            validator: classDefinition,
            classGroupId
          });
          return;
        }
        Object.entries(classDefinition).forEach(([key, classGroup2]) => {
          processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
        });
      });
    };
    const getPart = (classPartObject, path) => {
      let currentClassPartObject = classPartObject;
      path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
        if (!currentClassPartObject.nextPart.has(pathPart)) {
          currentClassPartObject.nextPart.set(pathPart, {
            nextPart: /* @__PURE__ */ new Map(),
            validators: []
          });
        }
        currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
      });
      return currentClassPartObject;
    };
    const isThemeGetter = (func) => func.isThemeGetter;
    const getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
      if (!prefix) {
        return classGroupEntries;
      }
      return classGroupEntries.map(([classGroupId, classGroup]) => {
        const prefixedClassGroup = classGroup.map((classDefinition) => {
          if (typeof classDefinition === "string") {
            return prefix + classDefinition;
          }
          if (typeof classDefinition === "object") {
            return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
          }
          return classDefinition;
        });
        return [classGroupId, prefixedClassGroup];
      });
    };
    const createLruCache = (maxCacheSize) => {
      if (maxCacheSize < 1) {
        return {
          get: () => void 0,
          set: () => {
          }
        };
      }
      let cacheSize = 0;
      let cache = /* @__PURE__ */ new Map();
      let previousCache = /* @__PURE__ */ new Map();
      const update = (key, value) => {
        cache.set(key, value);
        cacheSize++;
        if (cacheSize > maxCacheSize) {
          cacheSize = 0;
          previousCache = cache;
          cache = /* @__PURE__ */ new Map();
        }
      };
      return {
        get(key) {
          let value = cache.get(key);
          if (value !== void 0) {
            return value;
          }
          if ((value = previousCache.get(key)) !== void 0) {
            update(key, value);
            return value;
          }
        },
        set(key, value) {
          if (cache.has(key)) {
            cache.set(key, value);
          } else {
            update(key, value);
          }
        }
      };
    };
    const IMPORTANT_MODIFIER = "!";
    const createParseClassName = (config) => {
      const {
        separator,
        experimentalParseClassName
      } = config;
      const isSeparatorSingleCharacter = separator.length === 1;
      const firstSeparatorCharacter = separator[0];
      const separatorLength = separator.length;
      const parseClassName = (className) => {
        const modifiers = [];
        let bracketDepth = 0;
        let modifierStart = 0;
        let postfixModifierPosition;
        for (let index = 0; index < className.length; index++) {
          let currentCharacter = className[index];
          if (bracketDepth === 0) {
            if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
              modifiers.push(className.slice(modifierStart, index));
              modifierStart = index + separatorLength;
              continue;
            }
            if (currentCharacter === "/") {
              postfixModifierPosition = index;
              continue;
            }
          }
          if (currentCharacter === "[") {
            bracketDepth++;
          } else if (currentCharacter === "]") {
            bracketDepth--;
          }
        }
        const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
        const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
        const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
        const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
        return {
          modifiers,
          hasImportantModifier,
          baseClassName,
          maybePostfixModifierPosition
        };
      };
      if (experimentalParseClassName) {
        return (className) => experimentalParseClassName({
          className,
          parseClassName
        });
      }
      return parseClassName;
    };
    const sortModifiers = (modifiers) => {
      if (modifiers.length <= 1) {
        return modifiers;
      }
      const sortedModifiers = [];
      let unsortedModifiers = [];
      modifiers.forEach((modifier) => {
        const isArbitraryVariant = modifier[0] === "[";
        if (isArbitraryVariant) {
          sortedModifiers.push(...unsortedModifiers.sort(), modifier);
          unsortedModifiers = [];
        } else {
          unsortedModifiers.push(modifier);
        }
      });
      sortedModifiers.push(...unsortedModifiers.sort());
      return sortedModifiers;
    };
    const createConfigUtils = (config) => __spreadValues({
      cache: createLruCache(config.cacheSize),
      parseClassName: createParseClassName(config)
    }, createClassGroupUtils(config));
    const SPLIT_CLASSES_REGEX = /\s+/;
    const mergeClassList = (classList, configUtils) => {
      const {
        parseClassName,
        getClassGroupId,
        getConflictingClassGroupIds
      } = configUtils;
      const classGroupsInConflict = [];
      const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
      let result = "";
      for (let index = classNames.length - 1; index >= 0; index -= 1) {
        const originalClassName = classNames[index];
        const {
          modifiers,
          hasImportantModifier,
          baseClassName,
          maybePostfixModifierPosition
        } = parseClassName(originalClassName);
        let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
        let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
        if (!classGroupId) {
          if (!hasPostfixModifier) {
            result = originalClassName + (result.length > 0 ? " " + result : result);
            continue;
          }
          classGroupId = getClassGroupId(baseClassName);
          if (!classGroupId) {
            result = originalClassName + (result.length > 0 ? " " + result : result);
            continue;
          }
          hasPostfixModifier = false;
        }
        const variantModifier = sortModifiers(modifiers).join(":");
        const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
        const classId = modifierId + classGroupId;
        if (classGroupsInConflict.includes(classId)) {
          continue;
        }
        classGroupsInConflict.push(classId);
        const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
        for (let i = 0; i < conflictGroups.length; ++i) {
          const group = conflictGroups[i];
          classGroupsInConflict.push(modifierId + group);
        }
        result = originalClassName + (result.length > 0 ? " " + result : result);
      }
      return result;
    };
    function twJoin() {
      let index = 0;
      let argument;
      let resolvedValue;
      let string = "";
      while (index < arguments.length) {
        if (argument = arguments[index++]) {
          if (resolvedValue = toValue(argument)) {
            string && (string += " ");
            string += resolvedValue;
          }
        }
      }
      return string;
    }
    const toValue = (mix) => {
      if (typeof mix === "string") {
        return mix;
      }
      let resolvedValue;
      let string = "";
      for (let k2 = 0; k2 < mix.length; k2++) {
        if (mix[k2]) {
          if (resolvedValue = toValue(mix[k2])) {
            string && (string += " ");
            string += resolvedValue;
          }
        }
      }
      return string;
    };
    function createTailwindMerge(createConfigFirst, ...createConfigRest) {
      let configUtils;
      let cacheGet;
      let cacheSet;
      let functionToCall = initTailwindMerge;
      function initTailwindMerge(classList) {
        const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
        configUtils = createConfigUtils(config);
        cacheGet = configUtils.cache.get;
        cacheSet = configUtils.cache.set;
        functionToCall = tailwindMerge;
        return tailwindMerge(classList);
      }
      function tailwindMerge(classList) {
        const cachedResult = cacheGet(classList);
        if (cachedResult) {
          return cachedResult;
        }
        const result = mergeClassList(classList, configUtils);
        cacheSet(classList, result);
        return result;
      }
      return function callTailwindMerge() {
        return functionToCall(twJoin.apply(null, arguments));
      };
    }
    const fromTheme = (key) => {
      const themeGetter = (theme) => theme[key] || [];
      themeGetter.isThemeGetter = true;
      return themeGetter;
    };
    const arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
    const fractionRegex = /^\d+\/\d+$/;
    const stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
    const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
    const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
    const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
    const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
    const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
    const isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
    const isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
    const isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
    const isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
    const isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
    const isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
    const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
    const isTshirtSize = (value) => tshirtUnitRegex.test(value);
    const sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
    const isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
    const isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
    const imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
    const isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
    const isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
    const isAny = () => true;
    const getIsArbitraryValue = (value, label, testValue) => {
      const result = arbitraryValueRegex.exec(value);
      if (result) {
        if (result[1]) {
          return typeof label === "string" ? result[1] === label : label.has(result[1]);
        }
        return testValue(result[2]);
      }
      return false;
    };
    const isLengthOnly = (value) => (
      // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
      // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
      // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
      lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
    );
    const isNever = () => false;
    const isShadow = (value) => shadowRegex.test(value);
    const isImage = (value) => imageRegex.test(value);
    const getDefaultConfig = () => {
      const colors = fromTheme("colors");
      const spacing = fromTheme("spacing");
      const blur = fromTheme("blur");
      const brightness = fromTheme("brightness");
      const borderColor = fromTheme("borderColor");
      const borderRadius = fromTheme("borderRadius");
      const borderSpacing = fromTheme("borderSpacing");
      const borderWidth = fromTheme("borderWidth");
      const contrast = fromTheme("contrast");
      const grayscale = fromTheme("grayscale");
      const hueRotate = fromTheme("hueRotate");
      const invert = fromTheme("invert");
      const gap = fromTheme("gap");
      const gradientColorStops = fromTheme("gradientColorStops");
      const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
      const inset = fromTheme("inset");
      const margin = fromTheme("margin");
      const opacity = fromTheme("opacity");
      const padding = fromTheme("padding");
      const saturate = fromTheme("saturate");
      const scale = fromTheme("scale");
      const sepia = fromTheme("sepia");
      const skew = fromTheme("skew");
      const space = fromTheme("space");
      const translate = fromTheme("translate");
      const getOverscroll = () => ["auto", "contain", "none"];
      const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
      const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
      const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
      const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
      const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
      const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
      const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
      const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
      const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
      const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
      const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
      const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
      return {
        cacheSize: 500,
        separator: ":",
        theme: {
          colors: [isAny],
          spacing: [isLength, isArbitraryLength],
          blur: ["none", "", isTshirtSize, isArbitraryValue],
          brightness: getNumberAndArbitrary(),
          borderColor: [colors],
          borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
          borderSpacing: getSpacingWithArbitrary(),
          borderWidth: getLengthWithEmptyAndArbitrary(),
          contrast: getNumberAndArbitrary(),
          grayscale: getZeroAndEmpty(),
          hueRotate: getNumberAndArbitrary(),
          invert: getZeroAndEmpty(),
          gap: getSpacingWithArbitrary(),
          gradientColorStops: [colors],
          gradientColorStopPositions: [isPercent, isArbitraryLength],
          inset: getSpacingWithAutoAndArbitrary(),
          margin: getSpacingWithAutoAndArbitrary(),
          opacity: getNumberAndArbitrary(),
          padding: getSpacingWithArbitrary(),
          saturate: getNumberAndArbitrary(),
          scale: getNumberAndArbitrary(),
          sepia: getZeroAndEmpty(),
          skew: getNumberAndArbitrary(),
          space: getSpacingWithArbitrary(),
          translate: getSpacingWithArbitrary()
        },
        classGroups: {
          // Layout
          /**
           * Aspect Ratio
           * @see https://tailwindcss.com/docs/aspect-ratio
           */
          aspect: [{
            aspect: ["auto", "square", "video", isArbitraryValue]
          }],
          /**
           * Container
           * @see https://tailwindcss.com/docs/container
           */
          container: ["container"],
          /**
           * Columns
           * @see https://tailwindcss.com/docs/columns
           */
          columns: [{
            columns: [isTshirtSize]
          }],
          /**
           * Break After
           * @see https://tailwindcss.com/docs/break-after
           */
          "break-after": [{
            "break-after": getBreaks()
          }],
          /**
           * Break Before
           * @see https://tailwindcss.com/docs/break-before
           */
          "break-before": [{
            "break-before": getBreaks()
          }],
          /**
           * Break Inside
           * @see https://tailwindcss.com/docs/break-inside
           */
          "break-inside": [{
            "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
          }],
          /**
           * Box Decoration Break
           * @see https://tailwindcss.com/docs/box-decoration-break
           */
          "box-decoration": [{
            "box-decoration": ["slice", "clone"]
          }],
          /**
           * Box Sizing
           * @see https://tailwindcss.com/docs/box-sizing
           */
          box: [{
            box: ["border", "content"]
          }],
          /**
           * Display
           * @see https://tailwindcss.com/docs/display
           */
          display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
          /**
           * Floats
           * @see https://tailwindcss.com/docs/float
           */
          float: [{
            float: ["right", "left", "none", "start", "end"]
          }],
          /**
           * Clear
           * @see https://tailwindcss.com/docs/clear
           */
          clear: [{
            clear: ["left", "right", "both", "none", "start", "end"]
          }],
          /**
           * Isolation
           * @see https://tailwindcss.com/docs/isolation
           */
          isolation: ["isolate", "isolation-auto"],
          /**
           * Object Fit
           * @see https://tailwindcss.com/docs/object-fit
           */
          "object-fit": [{
            object: ["contain", "cover", "fill", "none", "scale-down"]
          }],
          /**
           * Object Position
           * @see https://tailwindcss.com/docs/object-position
           */
          "object-position": [{
            object: [...getPositions(), isArbitraryValue]
          }],
          /**
           * Overflow
           * @see https://tailwindcss.com/docs/overflow
           */
          overflow: [{
            overflow: getOverflow()
          }],
          /**
           * Overflow X
           * @see https://tailwindcss.com/docs/overflow
           */
          "overflow-x": [{
            "overflow-x": getOverflow()
          }],
          /**
           * Overflow Y
           * @see https://tailwindcss.com/docs/overflow
           */
          "overflow-y": [{
            "overflow-y": getOverflow()
          }],
          /**
           * Overscroll Behavior
           * @see https://tailwindcss.com/docs/overscroll-behavior
           */
          overscroll: [{
            overscroll: getOverscroll()
          }],
          /**
           * Overscroll Behavior X
           * @see https://tailwindcss.com/docs/overscroll-behavior
           */
          "overscroll-x": [{
            "overscroll-x": getOverscroll()
          }],
          /**
           * Overscroll Behavior Y
           * @see https://tailwindcss.com/docs/overscroll-behavior
           */
          "overscroll-y": [{
            "overscroll-y": getOverscroll()
          }],
          /**
           * Position
           * @see https://tailwindcss.com/docs/position
           */
          position: ["static", "fixed", "absolute", "relative", "sticky"],
          /**
           * Top / Right / Bottom / Left
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          inset: [{
            inset: [inset]
          }],
          /**
           * Right / Left
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          "inset-x": [{
            "inset-x": [inset]
          }],
          /**
           * Top / Bottom
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          "inset-y": [{
            "inset-y": [inset]
          }],
          /**
           * Start
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          start: [{
            start: [inset]
          }],
          /**
           * End
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          end: [{
            end: [inset]
          }],
          /**
           * Top
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          top: [{
            top: [inset]
          }],
          /**
           * Right
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          right: [{
            right: [inset]
          }],
          /**
           * Bottom
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          bottom: [{
            bottom: [inset]
          }],
          /**
           * Left
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          left: [{
            left: [inset]
          }],
          /**
           * Visibility
           * @see https://tailwindcss.com/docs/visibility
           */
          visibility: ["visible", "invisible", "collapse"],
          /**
           * Z-Index
           * @see https://tailwindcss.com/docs/z-index
           */
          z: [{
            z: ["auto", isInteger, isArbitraryValue]
          }],
          // Flexbox and Grid
          /**
           * Flex Basis
           * @see https://tailwindcss.com/docs/flex-basis
           */
          basis: [{
            basis: getSpacingWithAutoAndArbitrary()
          }],
          /**
           * Flex Direction
           * @see https://tailwindcss.com/docs/flex-direction
           */
          "flex-direction": [{
            flex: ["row", "row-reverse", "col", "col-reverse"]
          }],
          /**
           * Flex Wrap
           * @see https://tailwindcss.com/docs/flex-wrap
           */
          "flex-wrap": [{
            flex: ["wrap", "wrap-reverse", "nowrap"]
          }],
          /**
           * Flex
           * @see https://tailwindcss.com/docs/flex
           */
          flex: [{
            flex: ["1", "auto", "initial", "none", isArbitraryValue]
          }],
          /**
           * Flex Grow
           * @see https://tailwindcss.com/docs/flex-grow
           */
          grow: [{
            grow: getZeroAndEmpty()
          }],
          /**
           * Flex Shrink
           * @see https://tailwindcss.com/docs/flex-shrink
           */
          shrink: [{
            shrink: getZeroAndEmpty()
          }],
          /**
           * Order
           * @see https://tailwindcss.com/docs/order
           */
          order: [{
            order: ["first", "last", "none", isInteger, isArbitraryValue]
          }],
          /**
           * Grid Template Columns
           * @see https://tailwindcss.com/docs/grid-template-columns
           */
          "grid-cols": [{
            "grid-cols": [isAny]
          }],
          /**
           * Grid Column Start / End
           * @see https://tailwindcss.com/docs/grid-column
           */
          "col-start-end": [{
            col: ["auto", {
              span: ["full", isInteger, isArbitraryValue]
            }, isArbitraryValue]
          }],
          /**
           * Grid Column Start
           * @see https://tailwindcss.com/docs/grid-column
           */
          "col-start": [{
            "col-start": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Column End
           * @see https://tailwindcss.com/docs/grid-column
           */
          "col-end": [{
            "col-end": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Template Rows
           * @see https://tailwindcss.com/docs/grid-template-rows
           */
          "grid-rows": [{
            "grid-rows": [isAny]
          }],
          /**
           * Grid Row Start / End
           * @see https://tailwindcss.com/docs/grid-row
           */
          "row-start-end": [{
            row: ["auto", {
              span: [isInteger, isArbitraryValue]
            }, isArbitraryValue]
          }],
          /**
           * Grid Row Start
           * @see https://tailwindcss.com/docs/grid-row
           */
          "row-start": [{
            "row-start": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Row End
           * @see https://tailwindcss.com/docs/grid-row
           */
          "row-end": [{
            "row-end": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Auto Flow
           * @see https://tailwindcss.com/docs/grid-auto-flow
           */
          "grid-flow": [{
            "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
          }],
          /**
           * Grid Auto Columns
           * @see https://tailwindcss.com/docs/grid-auto-columns
           */
          "auto-cols": [{
            "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
          }],
          /**
           * Grid Auto Rows
           * @see https://tailwindcss.com/docs/grid-auto-rows
           */
          "auto-rows": [{
            "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
          }],
          /**
           * Gap
           * @see https://tailwindcss.com/docs/gap
           */
          gap: [{
            gap: [gap]
          }],
          /**
           * Gap X
           * @see https://tailwindcss.com/docs/gap
           */
          "gap-x": [{
            "gap-x": [gap]
          }],
          /**
           * Gap Y
           * @see https://tailwindcss.com/docs/gap
           */
          "gap-y": [{
            "gap-y": [gap]
          }],
          /**
           * Justify Content
           * @see https://tailwindcss.com/docs/justify-content
           */
          "justify-content": [{
            justify: ["normal", ...getAlign()]
          }],
          /**
           * Justify Items
           * @see https://tailwindcss.com/docs/justify-items
           */
          "justify-items": [{
            "justify-items": ["start", "end", "center", "stretch"]
          }],
          /**
           * Justify Self
           * @see https://tailwindcss.com/docs/justify-self
           */
          "justify-self": [{
            "justify-self": ["auto", "start", "end", "center", "stretch"]
          }],
          /**
           * Align Content
           * @see https://tailwindcss.com/docs/align-content
           */
          "align-content": [{
            content: ["normal", ...getAlign(), "baseline"]
          }],
          /**
           * Align Items
           * @see https://tailwindcss.com/docs/align-items
           */
          "align-items": [{
            items: ["start", "end", "center", "baseline", "stretch"]
          }],
          /**
           * Align Self
           * @see https://tailwindcss.com/docs/align-self
           */
          "align-self": [{
            self: ["auto", "start", "end", "center", "stretch", "baseline"]
          }],
          /**
           * Place Content
           * @see https://tailwindcss.com/docs/place-content
           */
          "place-content": [{
            "place-content": [...getAlign(), "baseline"]
          }],
          /**
           * Place Items
           * @see https://tailwindcss.com/docs/place-items
           */
          "place-items": [{
            "place-items": ["start", "end", "center", "baseline", "stretch"]
          }],
          /**
           * Place Self
           * @see https://tailwindcss.com/docs/place-self
           */
          "place-self": [{
            "place-self": ["auto", "start", "end", "center", "stretch"]
          }],
          // Spacing
          /**
           * Padding
           * @see https://tailwindcss.com/docs/padding
           */
          p: [{
            p: [padding]
          }],
          /**
           * Padding X
           * @see https://tailwindcss.com/docs/padding
           */
          px: [{
            px: [padding]
          }],
          /**
           * Padding Y
           * @see https://tailwindcss.com/docs/padding
           */
          py: [{
            py: [padding]
          }],
          /**
           * Padding Start
           * @see https://tailwindcss.com/docs/padding
           */
          ps: [{
            ps: [padding]
          }],
          /**
           * Padding End
           * @see https://tailwindcss.com/docs/padding
           */
          pe: [{
            pe: [padding]
          }],
          /**
           * Padding Top
           * @see https://tailwindcss.com/docs/padding
           */
          pt: [{
            pt: [padding]
          }],
          /**
           * Padding Right
           * @see https://tailwindcss.com/docs/padding
           */
          pr: [{
            pr: [padding]
          }],
          /**
           * Padding Bottom
           * @see https://tailwindcss.com/docs/padding
           */
          pb: [{
            pb: [padding]
          }],
          /**
           * Padding Left
           * @see https://tailwindcss.com/docs/padding
           */
          pl: [{
            pl: [padding]
          }],
          /**
           * Margin
           * @see https://tailwindcss.com/docs/margin
           */
          m: [{
            m: [margin]
          }],
          /**
           * Margin X
           * @see https://tailwindcss.com/docs/margin
           */
          mx: [{
            mx: [margin]
          }],
          /**
           * Margin Y
           * @see https://tailwindcss.com/docs/margin
           */
          my: [{
            my: [margin]
          }],
          /**
           * Margin Start
           * @see https://tailwindcss.com/docs/margin
           */
          ms: [{
            ms: [margin]
          }],
          /**
           * Margin End
           * @see https://tailwindcss.com/docs/margin
           */
          me: [{
            me: [margin]
          }],
          /**
           * Margin Top
           * @see https://tailwindcss.com/docs/margin
           */
          mt: [{
            mt: [margin]
          }],
          /**
           * Margin Right
           * @see https://tailwindcss.com/docs/margin
           */
          mr: [{
            mr: [margin]
          }],
          /**
           * Margin Bottom
           * @see https://tailwindcss.com/docs/margin
           */
          mb: [{
            mb: [margin]
          }],
          /**
           * Margin Left
           * @see https://tailwindcss.com/docs/margin
           */
          ml: [{
            ml: [margin]
          }],
          /**
           * Space Between X
           * @see https://tailwindcss.com/docs/space
           */
          "space-x": [{
            "space-x": [space]
          }],
          /**
           * Space Between X Reverse
           * @see https://tailwindcss.com/docs/space
           */
          "space-x-reverse": ["space-x-reverse"],
          /**
           * Space Between Y
           * @see https://tailwindcss.com/docs/space
           */
          "space-y": [{
            "space-y": [space]
          }],
          /**
           * Space Between Y Reverse
           * @see https://tailwindcss.com/docs/space
           */
          "space-y-reverse": ["space-y-reverse"],
          // Sizing
          /**
           * Width
           * @see https://tailwindcss.com/docs/width
           */
          w: [{
            w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
          }],
          /**
           * Min-Width
           * @see https://tailwindcss.com/docs/min-width
           */
          "min-w": [{
            "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
          }],
          /**
           * Max-Width
           * @see https://tailwindcss.com/docs/max-width
           */
          "max-w": [{
            "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
              screen: [isTshirtSize]
            }, isTshirtSize]
          }],
          /**
           * Height
           * @see https://tailwindcss.com/docs/height
           */
          h: [{
            h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          /**
           * Min-Height
           * @see https://tailwindcss.com/docs/min-height
           */
          "min-h": [{
            "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          /**
           * Max-Height
           * @see https://tailwindcss.com/docs/max-height
           */
          "max-h": [{
            "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          /**
           * Size
           * @see https://tailwindcss.com/docs/size
           */
          size: [{
            size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
          }],
          // Typography
          /**
           * Font Size
           * @see https://tailwindcss.com/docs/font-size
           */
          "font-size": [{
            text: ["base", isTshirtSize, isArbitraryLength]
          }],
          /**
           * Font Smoothing
           * @see https://tailwindcss.com/docs/font-smoothing
           */
          "font-smoothing": ["antialiased", "subpixel-antialiased"],
          /**
           * Font Style
           * @see https://tailwindcss.com/docs/font-style
           */
          "font-style": ["italic", "not-italic"],
          /**
           * Font Weight
           * @see https://tailwindcss.com/docs/font-weight
           */
          "font-weight": [{
            font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
          }],
          /**
           * Font Family
           * @see https://tailwindcss.com/docs/font-family
           */
          "font-family": [{
            font: [isAny]
          }],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-normal": ["normal-nums"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-ordinal": ["ordinal"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-slashed-zero": ["slashed-zero"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-figure": ["lining-nums", "oldstyle-nums"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-spacing": ["proportional-nums", "tabular-nums"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
          /**
           * Letter Spacing
           * @see https://tailwindcss.com/docs/letter-spacing
           */
          tracking: [{
            tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
          }],
          /**
           * Line Clamp
           * @see https://tailwindcss.com/docs/line-clamp
           */
          "line-clamp": [{
            "line-clamp": ["none", isNumber, isArbitraryNumber]
          }],
          /**
           * Line Height
           * @see https://tailwindcss.com/docs/line-height
           */
          leading: [{
            leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
          }],
          /**
           * List Style Image
           * @see https://tailwindcss.com/docs/list-style-image
           */
          "list-image": [{
            "list-image": ["none", isArbitraryValue]
          }],
          /**
           * List Style Type
           * @see https://tailwindcss.com/docs/list-style-type
           */
          "list-style-type": [{
            list: ["none", "disc", "decimal", isArbitraryValue]
          }],
          /**
           * List Style Position
           * @see https://tailwindcss.com/docs/list-style-position
           */
          "list-style-position": [{
            list: ["inside", "outside"]
          }],
          /**
           * Placeholder Color
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/placeholder-color
           */
          "placeholder-color": [{
            placeholder: [colors]
          }],
          /**
           * Placeholder Opacity
           * @see https://tailwindcss.com/docs/placeholder-opacity
           */
          "placeholder-opacity": [{
            "placeholder-opacity": [opacity]
          }],
          /**
           * Text Alignment
           * @see https://tailwindcss.com/docs/text-align
           */
          "text-alignment": [{
            text: ["left", "center", "right", "justify", "start", "end"]
          }],
          /**
           * Text Color
           * @see https://tailwindcss.com/docs/text-color
           */
          "text-color": [{
            text: [colors]
          }],
          /**
           * Text Opacity
           * @see https://tailwindcss.com/docs/text-opacity
           */
          "text-opacity": [{
            "text-opacity": [opacity]
          }],
          /**
           * Text Decoration
           * @see https://tailwindcss.com/docs/text-decoration
           */
          "text-decoration": ["underline", "overline", "line-through", "no-underline"],
          /**
           * Text Decoration Style
           * @see https://tailwindcss.com/docs/text-decoration-style
           */
          "text-decoration-style": [{
            decoration: [...getLineStyles(), "wavy"]
          }],
          /**
           * Text Decoration Thickness
           * @see https://tailwindcss.com/docs/text-decoration-thickness
           */
          "text-decoration-thickness": [{
            decoration: ["auto", "from-font", isLength, isArbitraryLength]
          }],
          /**
           * Text Underline Offset
           * @see https://tailwindcss.com/docs/text-underline-offset
           */
          "underline-offset": [{
            "underline-offset": ["auto", isLength, isArbitraryValue]
          }],
          /**
           * Text Decoration Color
           * @see https://tailwindcss.com/docs/text-decoration-color
           */
          "text-decoration-color": [{
            decoration: [colors]
          }],
          /**
           * Text Transform
           * @see https://tailwindcss.com/docs/text-transform
           */
          "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
          /**
           * Text Overflow
           * @see https://tailwindcss.com/docs/text-overflow
           */
          "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
          /**
           * Text Wrap
           * @see https://tailwindcss.com/docs/text-wrap
           */
          "text-wrap": [{
            text: ["wrap", "nowrap", "balance", "pretty"]
          }],
          /**
           * Text Indent
           * @see https://tailwindcss.com/docs/text-indent
           */
          indent: [{
            indent: getSpacingWithArbitrary()
          }],
          /**
           * Vertical Alignment
           * @see https://tailwindcss.com/docs/vertical-align
           */
          "vertical-align": [{
            align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
          }],
          /**
           * Whitespace
           * @see https://tailwindcss.com/docs/whitespace
           */
          whitespace: [{
            whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
          }],
          /**
           * Word Break
           * @see https://tailwindcss.com/docs/word-break
           */
          break: [{
            break: ["normal", "words", "all", "keep"]
          }],
          /**
           * Hyphens
           * @see https://tailwindcss.com/docs/hyphens
           */
          hyphens: [{
            hyphens: ["none", "manual", "auto"]
          }],
          /**
           * Content
           * @see https://tailwindcss.com/docs/content
           */
          content: [{
            content: ["none", isArbitraryValue]
          }],
          // Backgrounds
          /**
           * Background Attachment
           * @see https://tailwindcss.com/docs/background-attachment
           */
          "bg-attachment": [{
            bg: ["fixed", "local", "scroll"]
          }],
          /**
           * Background Clip
           * @see https://tailwindcss.com/docs/background-clip
           */
          "bg-clip": [{
            "bg-clip": ["border", "padding", "content", "text"]
          }],
          /**
           * Background Opacity
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/background-opacity
           */
          "bg-opacity": [{
            "bg-opacity": [opacity]
          }],
          /**
           * Background Origin
           * @see https://tailwindcss.com/docs/background-origin
           */
          "bg-origin": [{
            "bg-origin": ["border", "padding", "content"]
          }],
          /**
           * Background Position
           * @see https://tailwindcss.com/docs/background-position
           */
          "bg-position": [{
            bg: [...getPositions(), isArbitraryPosition]
          }],
          /**
           * Background Repeat
           * @see https://tailwindcss.com/docs/background-repeat
           */
          "bg-repeat": [{
            bg: ["no-repeat", {
              repeat: ["", "x", "y", "round", "space"]
            }]
          }],
          /**
           * Background Size
           * @see https://tailwindcss.com/docs/background-size
           */
          "bg-size": [{
            bg: ["auto", "cover", "contain", isArbitrarySize]
          }],
          /**
           * Background Image
           * @see https://tailwindcss.com/docs/background-image
           */
          "bg-image": [{
            bg: ["none", {
              "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
            }, isArbitraryImage]
          }],
          /**
           * Background Color
           * @see https://tailwindcss.com/docs/background-color
           */
          "bg-color": [{
            bg: [colors]
          }],
          /**
           * Gradient Color Stops From Position
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-from-pos": [{
            from: [gradientColorStopPositions]
          }],
          /**
           * Gradient Color Stops Via Position
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-via-pos": [{
            via: [gradientColorStopPositions]
          }],
          /**
           * Gradient Color Stops To Position
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-to-pos": [{
            to: [gradientColorStopPositions]
          }],
          /**
           * Gradient Color Stops From
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-from": [{
            from: [gradientColorStops]
          }],
          /**
           * Gradient Color Stops Via
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-via": [{
            via: [gradientColorStops]
          }],
          /**
           * Gradient Color Stops To
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-to": [{
            to: [gradientColorStops]
          }],
          // Borders
          /**
           * Border Radius
           * @see https://tailwindcss.com/docs/border-radius
           */
          rounded: [{
            rounded: [borderRadius]
          }],
          /**
           * Border Radius Start
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-s": [{
            "rounded-s": [borderRadius]
          }],
          /**
           * Border Radius End
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-e": [{
            "rounded-e": [borderRadius]
          }],
          /**
           * Border Radius Top
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-t": [{
            "rounded-t": [borderRadius]
          }],
          /**
           * Border Radius Right
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-r": [{
            "rounded-r": [borderRadius]
          }],
          /**
           * Border Radius Bottom
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-b": [{
            "rounded-b": [borderRadius]
          }],
          /**
           * Border Radius Left
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-l": [{
            "rounded-l": [borderRadius]
          }],
          /**
           * Border Radius Start Start
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-ss": [{
            "rounded-ss": [borderRadius]
          }],
          /**
           * Border Radius Start End
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-se": [{
            "rounded-se": [borderRadius]
          }],
          /**
           * Border Radius End End
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-ee": [{
            "rounded-ee": [borderRadius]
          }],
          /**
           * Border Radius End Start
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-es": [{
            "rounded-es": [borderRadius]
          }],
          /**
           * Border Radius Top Left
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-tl": [{
            "rounded-tl": [borderRadius]
          }],
          /**
           * Border Radius Top Right
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-tr": [{
            "rounded-tr": [borderRadius]
          }],
          /**
           * Border Radius Bottom Right
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-br": [{
            "rounded-br": [borderRadius]
          }],
          /**
           * Border Radius Bottom Left
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-bl": [{
            "rounded-bl": [borderRadius]
          }],
          /**
           * Border Width
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w": [{
            border: [borderWidth]
          }],
          /**
           * Border Width X
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-x": [{
            "border-x": [borderWidth]
          }],
          /**
           * Border Width Y
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-y": [{
            "border-y": [borderWidth]
          }],
          /**
           * Border Width Start
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-s": [{
            "border-s": [borderWidth]
          }],
          /**
           * Border Width End
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-e": [{
            "border-e": [borderWidth]
          }],
          /**
           * Border Width Top
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-t": [{
            "border-t": [borderWidth]
          }],
          /**
           * Border Width Right
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-r": [{
            "border-r": [borderWidth]
          }],
          /**
           * Border Width Bottom
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-b": [{
            "border-b": [borderWidth]
          }],
          /**
           * Border Width Left
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-l": [{
            "border-l": [borderWidth]
          }],
          /**
           * Border Opacity
           * @see https://tailwindcss.com/docs/border-opacity
           */
          "border-opacity": [{
            "border-opacity": [opacity]
          }],
          /**
           * Border Style
           * @see https://tailwindcss.com/docs/border-style
           */
          "border-style": [{
            border: [...getLineStyles(), "hidden"]
          }],
          /**
           * Divide Width X
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-x": [{
            "divide-x": [borderWidth]
          }],
          /**
           * Divide Width X Reverse
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-x-reverse": ["divide-x-reverse"],
          /**
           * Divide Width Y
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-y": [{
            "divide-y": [borderWidth]
          }],
          /**
           * Divide Width Y Reverse
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-y-reverse": ["divide-y-reverse"],
          /**
           * Divide Opacity
           * @see https://tailwindcss.com/docs/divide-opacity
           */
          "divide-opacity": [{
            "divide-opacity": [opacity]
          }],
          /**
           * Divide Style
           * @see https://tailwindcss.com/docs/divide-style
           */
          "divide-style": [{
            divide: getLineStyles()
          }],
          /**
           * Border Color
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color": [{
            border: [borderColor]
          }],
          /**
           * Border Color X
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-x": [{
            "border-x": [borderColor]
          }],
          /**
           * Border Color Y
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-y": [{
            "border-y": [borderColor]
          }],
          /**
           * Border Color S
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-s": [{
            "border-s": [borderColor]
          }],
          /**
           * Border Color E
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-e": [{
            "border-e": [borderColor]
          }],
          /**
           * Border Color Top
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-t": [{
            "border-t": [borderColor]
          }],
          /**
           * Border Color Right
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-r": [{
            "border-r": [borderColor]
          }],
          /**
           * Border Color Bottom
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-b": [{
            "border-b": [borderColor]
          }],
          /**
           * Border Color Left
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-l": [{
            "border-l": [borderColor]
          }],
          /**
           * Divide Color
           * @see https://tailwindcss.com/docs/divide-color
           */
          "divide-color": [{
            divide: [borderColor]
          }],
          /**
           * Outline Style
           * @see https://tailwindcss.com/docs/outline-style
           */
          "outline-style": [{
            outline: ["", ...getLineStyles()]
          }],
          /**
           * Outline Offset
           * @see https://tailwindcss.com/docs/outline-offset
           */
          "outline-offset": [{
            "outline-offset": [isLength, isArbitraryValue]
          }],
          /**
           * Outline Width
           * @see https://tailwindcss.com/docs/outline-width
           */
          "outline-w": [{
            outline: [isLength, isArbitraryLength]
          }],
          /**
           * Outline Color
           * @see https://tailwindcss.com/docs/outline-color
           */
          "outline-color": [{
            outline: [colors]
          }],
          /**
           * Ring Width
           * @see https://tailwindcss.com/docs/ring-width
           */
          "ring-w": [{
            ring: getLengthWithEmptyAndArbitrary()
          }],
          /**
           * Ring Width Inset
           * @see https://tailwindcss.com/docs/ring-width
           */
          "ring-w-inset": ["ring-inset"],
          /**
           * Ring Color
           * @see https://tailwindcss.com/docs/ring-color
           */
          "ring-color": [{
            ring: [colors]
          }],
          /**
           * Ring Opacity
           * @see https://tailwindcss.com/docs/ring-opacity
           */
          "ring-opacity": [{
            "ring-opacity": [opacity]
          }],
          /**
           * Ring Offset Width
           * @see https://tailwindcss.com/docs/ring-offset-width
           */
          "ring-offset-w": [{
            "ring-offset": [isLength, isArbitraryLength]
          }],
          /**
           * Ring Offset Color
           * @see https://tailwindcss.com/docs/ring-offset-color
           */
          "ring-offset-color": [{
            "ring-offset": [colors]
          }],
          // Effects
          /**
           * Box Shadow
           * @see https://tailwindcss.com/docs/box-shadow
           */
          shadow: [{
            shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
          }],
          /**
           * Box Shadow Color
           * @see https://tailwindcss.com/docs/box-shadow-color
           */
          "shadow-color": [{
            shadow: [isAny]
          }],
          /**
           * Opacity
           * @see https://tailwindcss.com/docs/opacity
           */
          opacity: [{
            opacity: [opacity]
          }],
          /**
           * Mix Blend Mode
           * @see https://tailwindcss.com/docs/mix-blend-mode
           */
          "mix-blend": [{
            "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
          }],
          /**
           * Background Blend Mode
           * @see https://tailwindcss.com/docs/background-blend-mode
           */
          "bg-blend": [{
            "bg-blend": getBlendModes()
          }],
          // Filters
          /**
           * Filter
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/filter
           */
          filter: [{
            filter: ["", "none"]
          }],
          /**
           * Blur
           * @see https://tailwindcss.com/docs/blur
           */
          blur: [{
            blur: [blur]
          }],
          /**
           * Brightness
           * @see https://tailwindcss.com/docs/brightness
           */
          brightness: [{
            brightness: [brightness]
          }],
          /**
           * Contrast
           * @see https://tailwindcss.com/docs/contrast
           */
          contrast: [{
            contrast: [contrast]
          }],
          /**
           * Drop Shadow
           * @see https://tailwindcss.com/docs/drop-shadow
           */
          "drop-shadow": [{
            "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
          }],
          /**
           * Grayscale
           * @see https://tailwindcss.com/docs/grayscale
           */
          grayscale: [{
            grayscale: [grayscale]
          }],
          /**
           * Hue Rotate
           * @see https://tailwindcss.com/docs/hue-rotate
           */
          "hue-rotate": [{
            "hue-rotate": [hueRotate]
          }],
          /**
           * Invert
           * @see https://tailwindcss.com/docs/invert
           */
          invert: [{
            invert: [invert]
          }],
          /**
           * Saturate
           * @see https://tailwindcss.com/docs/saturate
           */
          saturate: [{
            saturate: [saturate]
          }],
          /**
           * Sepia
           * @see https://tailwindcss.com/docs/sepia
           */
          sepia: [{
            sepia: [sepia]
          }],
          /**
           * Backdrop Filter
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/backdrop-filter
           */
          "backdrop-filter": [{
            "backdrop-filter": ["", "none"]
          }],
          /**
           * Backdrop Blur
           * @see https://tailwindcss.com/docs/backdrop-blur
           */
          "backdrop-blur": [{
            "backdrop-blur": [blur]
          }],
          /**
           * Backdrop Brightness
           * @see https://tailwindcss.com/docs/backdrop-brightness
           */
          "backdrop-brightness": [{
            "backdrop-brightness": [brightness]
          }],
          /**
           * Backdrop Contrast
           * @see https://tailwindcss.com/docs/backdrop-contrast
           */
          "backdrop-contrast": [{
            "backdrop-contrast": [contrast]
          }],
          /**
           * Backdrop Grayscale
           * @see https://tailwindcss.com/docs/backdrop-grayscale
           */
          "backdrop-grayscale": [{
            "backdrop-grayscale": [grayscale]
          }],
          /**
           * Backdrop Hue Rotate
           * @see https://tailwindcss.com/docs/backdrop-hue-rotate
           */
          "backdrop-hue-rotate": [{
            "backdrop-hue-rotate": [hueRotate]
          }],
          /**
           * Backdrop Invert
           * @see https://tailwindcss.com/docs/backdrop-invert
           */
          "backdrop-invert": [{
            "backdrop-invert": [invert]
          }],
          /**
           * Backdrop Opacity
           * @see https://tailwindcss.com/docs/backdrop-opacity
           */
          "backdrop-opacity": [{
            "backdrop-opacity": [opacity]
          }],
          /**
           * Backdrop Saturate
           * @see https://tailwindcss.com/docs/backdrop-saturate
           */
          "backdrop-saturate": [{
            "backdrop-saturate": [saturate]
          }],
          /**
           * Backdrop Sepia
           * @see https://tailwindcss.com/docs/backdrop-sepia
           */
          "backdrop-sepia": [{
            "backdrop-sepia": [sepia]
          }],
          // Tables
          /**
           * Border Collapse
           * @see https://tailwindcss.com/docs/border-collapse
           */
          "border-collapse": [{
            border: ["collapse", "separate"]
          }],
          /**
           * Border Spacing
           * @see https://tailwindcss.com/docs/border-spacing
           */
          "border-spacing": [{
            "border-spacing": [borderSpacing]
          }],
          /**
           * Border Spacing X
           * @see https://tailwindcss.com/docs/border-spacing
           */
          "border-spacing-x": [{
            "border-spacing-x": [borderSpacing]
          }],
          /**
           * Border Spacing Y
           * @see https://tailwindcss.com/docs/border-spacing
           */
          "border-spacing-y": [{
            "border-spacing-y": [borderSpacing]
          }],
          /**
           * Table Layout
           * @see https://tailwindcss.com/docs/table-layout
           */
          "table-layout": [{
            table: ["auto", "fixed"]
          }],
          /**
           * Caption Side
           * @see https://tailwindcss.com/docs/caption-side
           */
          caption: [{
            caption: ["top", "bottom"]
          }],
          // Transitions and Animation
          /**
           * Tranisition Property
           * @see https://tailwindcss.com/docs/transition-property
           */
          transition: [{
            transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
          }],
          /**
           * Transition Duration
           * @see https://tailwindcss.com/docs/transition-duration
           */
          duration: [{
            duration: getNumberAndArbitrary()
          }],
          /**
           * Transition Timing Function
           * @see https://tailwindcss.com/docs/transition-timing-function
           */
          ease: [{
            ease: ["linear", "in", "out", "in-out", isArbitraryValue]
          }],
          /**
           * Transition Delay
           * @see https://tailwindcss.com/docs/transition-delay
           */
          delay: [{
            delay: getNumberAndArbitrary()
          }],
          /**
           * Animation
           * @see https://tailwindcss.com/docs/animation
           */
          animate: [{
            animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
          }],
          // Transforms
          /**
           * Transform
           * @see https://tailwindcss.com/docs/transform
           */
          transform: [{
            transform: ["", "gpu", "none"]
          }],
          /**
           * Scale
           * @see https://tailwindcss.com/docs/scale
           */
          scale: [{
            scale: [scale]
          }],
          /**
           * Scale X
           * @see https://tailwindcss.com/docs/scale
           */
          "scale-x": [{
            "scale-x": [scale]
          }],
          /**
           * Scale Y
           * @see https://tailwindcss.com/docs/scale
           */
          "scale-y": [{
            "scale-y": [scale]
          }],
          /**
           * Rotate
           * @see https://tailwindcss.com/docs/rotate
           */
          rotate: [{
            rotate: [isInteger, isArbitraryValue]
          }],
          /**
           * Translate X
           * @see https://tailwindcss.com/docs/translate
           */
          "translate-x": [{
            "translate-x": [translate]
          }],
          /**
           * Translate Y
           * @see https://tailwindcss.com/docs/translate
           */
          "translate-y": [{
            "translate-y": [translate]
          }],
          /**
           * Skew X
           * @see https://tailwindcss.com/docs/skew
           */
          "skew-x": [{
            "skew-x": [skew]
          }],
          /**
           * Skew Y
           * @see https://tailwindcss.com/docs/skew
           */
          "skew-y": [{
            "skew-y": [skew]
          }],
          /**
           * Transform Origin
           * @see https://tailwindcss.com/docs/transform-origin
           */
          "transform-origin": [{
            origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
          }],
          // Interactivity
          /**
           * Accent Color
           * @see https://tailwindcss.com/docs/accent-color
           */
          accent: [{
            accent: ["auto", colors]
          }],
          /**
           * Appearance
           * @see https://tailwindcss.com/docs/appearance
           */
          appearance: [{
            appearance: ["none", "auto"]
          }],
          /**
           * Cursor
           * @see https://tailwindcss.com/docs/cursor
           */
          cursor: [{
            cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
          }],
          /**
           * Caret Color
           * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
           */
          "caret-color": [{
            caret: [colors]
          }],
          /**
           * Pointer Events
           * @see https://tailwindcss.com/docs/pointer-events
           */
          "pointer-events": [{
            "pointer-events": ["none", "auto"]
          }],
          /**
           * Resize
           * @see https://tailwindcss.com/docs/resize
           */
          resize: [{
            resize: ["none", "y", "x", ""]
          }],
          /**
           * Scroll Behavior
           * @see https://tailwindcss.com/docs/scroll-behavior
           */
          "scroll-behavior": [{
            scroll: ["auto", "smooth"]
          }],
          /**
           * Scroll Margin
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-m": [{
            "scroll-m": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin X
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mx": [{
            "scroll-mx": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Y
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-my": [{
            "scroll-my": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Start
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-ms": [{
            "scroll-ms": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin End
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-me": [{
            "scroll-me": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Top
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mt": [{
            "scroll-mt": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Right
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mr": [{
            "scroll-mr": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Bottom
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mb": [{
            "scroll-mb": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Left
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-ml": [{
            "scroll-ml": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-p": [{
            "scroll-p": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding X
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-px": [{
            "scroll-px": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Y
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-py": [{
            "scroll-py": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Start
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-ps": [{
            "scroll-ps": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding End
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pe": [{
            "scroll-pe": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Top
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pt": [{
            "scroll-pt": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Right
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pr": [{
            "scroll-pr": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Bottom
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pb": [{
            "scroll-pb": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Left
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pl": [{
            "scroll-pl": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Snap Align
           * @see https://tailwindcss.com/docs/scroll-snap-align
           */
          "snap-align": [{
            snap: ["start", "end", "center", "align-none"]
          }],
          /**
           * Scroll Snap Stop
           * @see https://tailwindcss.com/docs/scroll-snap-stop
           */
          "snap-stop": [{
            snap: ["normal", "always"]
          }],
          /**
           * Scroll Snap Type
           * @see https://tailwindcss.com/docs/scroll-snap-type
           */
          "snap-type": [{
            snap: ["none", "x", "y", "both"]
          }],
          /**
           * Scroll Snap Type Strictness
           * @see https://tailwindcss.com/docs/scroll-snap-type
           */
          "snap-strictness": [{
            snap: ["mandatory", "proximity"]
          }],
          /**
           * Touch Action
           * @see https://tailwindcss.com/docs/touch-action
           */
          touch: [{
            touch: ["auto", "none", "manipulation"]
          }],
          /**
           * Touch Action X
           * @see https://tailwindcss.com/docs/touch-action
           */
          "touch-x": [{
            "touch-pan": ["x", "left", "right"]
          }],
          /**
           * Touch Action Y
           * @see https://tailwindcss.com/docs/touch-action
           */
          "touch-y": [{
            "touch-pan": ["y", "up", "down"]
          }],
          /**
           * Touch Action Pinch Zoom
           * @see https://tailwindcss.com/docs/touch-action
           */
          "touch-pz": ["touch-pinch-zoom"],
          /**
           * User Select
           * @see https://tailwindcss.com/docs/user-select
           */
          select: [{
            select: ["none", "text", "all", "auto"]
          }],
          /**
           * Will Change
           * @see https://tailwindcss.com/docs/will-change
           */
          "will-change": [{
            "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
          }],
          // SVG
          /**
           * Fill
           * @see https://tailwindcss.com/docs/fill
           */
          fill: [{
            fill: [colors, "none"]
          }],
          /**
           * Stroke Width
           * @see https://tailwindcss.com/docs/stroke-width
           */
          "stroke-w": [{
            stroke: [isLength, isArbitraryLength, isArbitraryNumber]
          }],
          /**
           * Stroke
           * @see https://tailwindcss.com/docs/stroke
           */
          stroke: [{
            stroke: [colors, "none"]
          }],
          // Accessibility
          /**
           * Screen Readers
           * @see https://tailwindcss.com/docs/screen-readers
           */
          sr: ["sr-only", "not-sr-only"],
          /**
           * Forced Color Adjust
           * @see https://tailwindcss.com/docs/forced-color-adjust
           */
          "forced-color-adjust": [{
            "forced-color-adjust": ["auto", "none"]
          }]
        },
        conflictingClassGroups: {
          overflow: ["overflow-x", "overflow-y"],
          overscroll: ["overscroll-x", "overscroll-y"],
          inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
          "inset-x": ["right", "left"],
          "inset-y": ["top", "bottom"],
          flex: ["basis", "grow", "shrink"],
          gap: ["gap-x", "gap-y"],
          p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
          px: ["pr", "pl"],
          py: ["pt", "pb"],
          m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
          mx: ["mr", "ml"],
          my: ["mt", "mb"],
          size: ["w", "h"],
          "font-size": ["leading"],
          "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
          "fvn-ordinal": ["fvn-normal"],
          "fvn-slashed-zero": ["fvn-normal"],
          "fvn-figure": ["fvn-normal"],
          "fvn-spacing": ["fvn-normal"],
          "fvn-fraction": ["fvn-normal"],
          "line-clamp": ["display", "overflow"],
          rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
          "rounded-s": ["rounded-ss", "rounded-es"],
          "rounded-e": ["rounded-se", "rounded-ee"],
          "rounded-t": ["rounded-tl", "rounded-tr"],
          "rounded-r": ["rounded-tr", "rounded-br"],
          "rounded-b": ["rounded-br", "rounded-bl"],
          "rounded-l": ["rounded-tl", "rounded-bl"],
          "border-spacing": ["border-spacing-x", "border-spacing-y"],
          "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
          "border-w-x": ["border-w-r", "border-w-l"],
          "border-w-y": ["border-w-t", "border-w-b"],
          "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
          "border-color-x": ["border-color-r", "border-color-l"],
          "border-color-y": ["border-color-t", "border-color-b"],
          "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
          "scroll-mx": ["scroll-mr", "scroll-ml"],
          "scroll-my": ["scroll-mt", "scroll-mb"],
          "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
          "scroll-px": ["scroll-pr", "scroll-pl"],
          "scroll-py": ["scroll-pt", "scroll-pb"],
          touch: ["touch-x", "touch-y", "touch-pz"],
          "touch-x": ["touch"],
          "touch-y": ["touch"],
          "touch-pz": ["touch"]
        },
        conflictingClassGroupModifiers: {
          "font-size": ["leading"]
        }
      };
    };
    const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
    function cn(...inputs) {
      return twMerge(clsx(inputs));
    }
    const sizeStyles = {
      sm: "h-8 text-body-md-rg pl-3 pr-[40px]",
      // 32px height, left: 12px, right: 40px (12px + 28px)
      md: "h-10 text-body-md-rg pl-3 pr-[40px]",
      // 40px height, left: 12px, right: 40px (12px + 28px)
      lg: "h-12 text-body-md-rg pl-3 pr-[44px]"
      // 48px height, left: 12px, right: 44px (16px + 28px)
    };
    const iconPositionStyles = {
      sm: "right-3",
      // 12px from right
      md: "right-3",
      // 12px from right
      lg: "right-4"
      // 16px from right
    };
    const statusStyles = {
      default: "bg-fill-onsurface-light dark:bg-fill-onsurface-dark text-text-primary-light dark:text-text-primary-dark placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark",
      disabled: "bg-fill-disabled-light dark:bg-fill-disabled-dark placeholder:text-text-disabled-light dark:placeholder:text-text-disabled-dark cursor-not-allowed"
    };
    const SingleLineTextField = reactExports.forwardRef(
      (_e, ref) => {
        var _f = _e, { size = "md", className, isDisabled, error, onChange, value, defaultValue } = _f, props = __objRest(_f, ["size", "className", "isDisabled", "error", "onChange", "value", "defaultValue"]);
        const [inputValue, setInputValue] = reactExports.useState(value || defaultValue || "");
        const handleChange = (e) => {
          setInputValue(e.target.value);
          onChange == null ? void 0 : onChange(e);
        };
        const handleClear = () => {
          setInputValue("");
          const event = new Event("input", { bubbles: true });
          const input = ref;
          if (input.current) {
            Object.defineProperty(event, "target", { value: input.current });
            input.current.value = "";
            input.current.dispatchEvent(event);
          }
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            __spreadValues({
              ref,
              type: "text",
              value: inputValue,
              onChange: handleChange,
              className: cn(
                // Base styles
                "w-full rounded-lg outline-none transition-colors",
                // Size styles
                sizeStyles[size],
                // Status styles
                isDisabled ? statusStyles.disabled : statusStyles.default,
                // Error styles
                error && "border-border-error-light dark:border-border-error-dark",
                className
              ),
              disabled: isDisabled
            }, props)
          ),
          inputValue && !isDisabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleClear,
              className: cn(
                "absolute top-1/2 -translate-y-1/2",
                iconPositionStyles[size],
                "text-icon-secondary-light dark:text-icon-secondary-dark",
                "focus:outline-none"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] });
      }
    );
    SingleLineTextField.displayName = "SingleLineTextField";
    const TextField = React.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SingleLineTextField, __spreadProps(__spreadValues({}, props), { ref }));
      }
    );
    TextField.displayName = "TextField";
    const signOut = () => __async(exports, null, function* () {
      try {
        yield signOut$1(auth);
      } catch (error) {
        console.error("Error signing out:", error);
        throw error;
      }
    });
    const LogOutIcon = (_g) => {
      var _h = _g, { className } = _h, props = __objRest(_h, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 16.2002V7.79981C2 6.97632 1.99898 6.29843 2.04395 5.74805C2.08988 5.18599 2.18827 4.6689 2.43555 4.1836L2.58985 3.90821C2.97414 3.2817 3.52513 2.7711 4.1836 2.43555L4.36719 2.34961C4.79892 2.16442 5.2562 2.08414 5.74805 2.04395C6.29843 1.99898 6.97632 2 7.79981 2H9L9.10254 2.00488C9.60667 2.05622 10 2.48232 10 3C10 3.51768 9.60667 3.94379 9.10254 3.99512L9 4H7.79981C6.94342 4 6.36117 4.00035 5.91113 4.03711C5.58253 4.06396 5.37418 4.10762 5.22461 4.16113L5.0918 4.21778C4.76256 4.38555 4.48707 4.64085 4.29492 4.9541L4.21778 5.0918C4.13809 5.2482 4.07293 5.47272 4.03711 5.91113C4.00035 6.36117 4 6.94342 4 7.79981V16.2002C4 17.0566 4.00035 17.6388 4.03711 18.0889C4.07293 18.5273 4.13809 18.7518 4.21778 18.9082L4.29492 19.0459C4.48707 19.3592 4.76256 19.6145 5.0918 19.7822L5.22461 19.8389C5.37418 19.8924 5.58253 19.936 5.91113 19.9629C6.36117 19.9997 6.94342 20 7.79981 20H9L9.10254 20.0049C9.60667 20.0562 10 20.4823 10 21C10 21.5177 9.60667 21.9438 9.10254 21.9951L9 22H7.79981C6.97632 22 6.29843 22.001 5.74805 21.9561C5.2562 21.9159 4.79892 21.8356 4.36719 21.6504L4.1836 21.5645C3.52513 21.2289 2.97414 20.7183 2.58985 20.0918L2.43555 19.8164C2.18827 19.3311 2.08988 18.814 2.04395 18.252C1.99898 17.7016 2 17.0237 2 16.2002ZM15.293 6.29297C15.6591 5.92685 16.2381 5.90426 16.6309 6.22461L16.707 6.29297L21.707 11.293C22.0976 11.6835 22.0976 12.3165 21.707 12.707L16.707 17.707C16.3165 18.0976 15.6835 18.0976 15.293 17.707C14.9024 17.3165 14.9024 16.6835 15.293 16.293L18.5859 13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H18.5859L15.293 7.70703L15.2246 7.63086C14.9043 7.23809 14.9269 6.65909 15.293 6.29297Z", fill: "black" }) });
    };
    const AddIcon = (_i) => {
      var _j = _i, { className } = _j, props = __objRest(_j, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z", fill: "currnetColor" }) });
    };
    const ArchiveIcon = (_k) => {
      var _l = _k, { className } = _l, props = __objRest(_l, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.10561 3.00004C5.13078 3.00006 5.15619 3.00008 5.18187 3.00008H18.8181C18.8438 3.00008 18.8692 3.00006 18.8944 3.00004C19.2405 2.99977 19.5385 2.99953 19.8047 3.05196C20.8866 3.26501 21.7323 4.10227 21.9475 5.17332C22.0005 5.4369 22.0002 5.73195 22 6.07458C21.9999 6.09949 21.9999 6.12465 21.9999 6.15006C21.9999 6.17548 21.9999 6.20064 22 6.22555C22.0002 6.56818 22.0005 6.86323 21.9475 7.1268C21.758 8.06989 21.0797 8.8317 20.1818 9.14573V15.8172C20.1818 16.5417 20.1818 17.1396 20.1416 17.6267C20.0998 18.1325 20.0102 18.5976 19.7854 19.0344C19.4368 19.7118 18.8805 20.2625 18.1963 20.6076C17.7551 20.8302 17.2853 20.9189 16.7743 20.9602C16.2824 21 15.6784 21 14.9466 21H9.05336C8.32159 21 7.71764 21 7.22565 20.9602C6.71466 20.9189 6.24493 20.8302 5.80372 20.6076C5.1195 20.2625 4.56321 19.7118 4.21458 19.0344C3.98978 18.5976 3.90017 18.1325 3.85842 17.6267C3.81823 17.1396 3.81823 16.5417 3.81825 15.8172L3.81825 9.14573C2.92029 8.8317 2.24197 8.06989 2.05248 7.1268C1.99953 6.86324 1.99976 6.56819 2.00004 6.22556C2.00006 6.20065 2.00008 6.17549 2.00008 6.15006C2.00008 6.12464 2.00006 6.09948 2.00004 6.07457C1.99976 5.73194 1.99953 5.43689 2.05248 5.17333C2.26768 4.10227 3.1134 3.26501 4.19527 3.05196C4.4615 2.99953 4.75953 2.99977 5.10561 3.00004ZM5.63641 9.30005V15.78C5.63641 16.5509 5.63712 17.075 5.67055 17.4801C5.70311 17.8747 5.76214 18.0764 5.83458 18.2172C6.0089 18.5559 6.28704 18.8313 6.62915 19.0038C6.77133 19.0755 6.97515 19.134 7.37371 19.1662C7.78288 19.1993 8.31223 19.2 9.09093 19.2H14.9091C15.6878 19.2 16.2171 19.1993 16.6263 19.1662C17.0248 19.134 17.2287 19.0755 17.3708 19.0038C17.713 18.8312 17.9911 18.5559 18.1654 18.2172C18.2379 18.0764 18.2969 17.8747 18.3294 17.4801C18.3629 17.075 18.3636 16.5509 18.3636 15.78V9.30005H5.63641ZM19.1974 7.50006H4.80259C4.78546 7.49866 4.76818 7.49774 4.75078 7.49729C4.62029 7.49396 4.57209 7.48712 4.54998 7.48277C4.18935 7.41175 3.90745 7.13266 3.83571 6.77564C3.82265 6.71062 3.81825 6.61139 3.81825 6.15006C3.81825 5.68874 3.82265 5.58951 3.83571 5.52449C3.90745 5.16747 4.18935 4.88838 4.54998 4.81736C4.61566 4.80443 4.71589 4.80007 5.18187 4.80007H18.8181C19.2841 4.80007 19.3843 4.80443 19.45 4.81736C19.8106 4.88838 20.0926 5.16747 20.1643 5.52449C20.1774 5.58951 20.1818 5.68874 20.1818 6.15006C20.1818 6.61139 20.1774 6.71062 20.1643 6.77564C20.0926 7.13266 19.8106 7.41175 19.45 7.48277C19.4279 7.48712 19.3797 7.49396 19.2492 7.49729C19.2318 7.49774 19.2145 7.49866 19.1974 7.50006ZM9.27275 12.9C9.27275 12.403 9.67976 12 10.1818 12H13.8182C14.3202 12 14.7273 12.403 14.7273 12.9C14.7273 13.3971 14.3202 13.8 13.8182 13.8H10.1818C9.67976 13.8 9.27275 13.3971 9.27275 12.9Z", fill: "currentColor" }) });
    };
    const BackIcon = (_m) => {
      var _n = _m, { className } = _n, props = __objRest(_n, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16.6339 4.33474C17.122 4.78105 17.122 5.50467 16.6339 5.95098L10.0178 12L16.6339 18.049C17.122 18.4953 17.122 19.219 16.6339 19.6653C16.1457 20.1116 15.3543 20.1116 14.8661 19.6653L7.36612 12.8081C6.87796 12.3618 6.87796 11.6382 7.36612 11.1919L14.8661 4.33474C15.3543 3.88842 16.1457 3.88842 16.6339 4.33474Z", fill: "currentColor" }) });
    };
    const CheckIcon = (_o) => {
      var _p = _o, { className } = _p, props = __objRest(_p, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M21.6746 4.33795C22.1085 4.78856 22.1085 5.51913 21.6746 5.96974L9.45234 18.662C9.01843 19.1127 8.31491 19.1127 7.88099 18.662L2.32544 12.8928C1.89152 12.4422 1.89152 11.7116 2.32544 11.261C2.75935 10.8104 3.46287 10.8104 3.89679 11.261L8.66667 16.2144L20.1032 4.33795C20.5371 3.88735 21.2406 3.88735 21.6746 4.33795Z", fill: "currentColor" }) });
    };
    const ChevronRightIcon = (_q) => {
      var _r = _q, { className } = _r, props = __objRest(_r, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z", fill: "currentColor" }) });
    };
    const CloseIcon = (_s) => {
      var _t = _s, { className } = _t, props = __objRest(_t, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z", fill: "currentColor" }) });
    };
    const EditIcon = (_u) => {
      var _v = _u, { className } = _v, props = __objRest(_v, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.793 2.79287C17.0119 1.57393 18.9882 1.57392 20.2072 2.79287C21.4261 4.01183 21.4261 5.98814 20.2072 7.20709L7.64443 19.7698C7.62463 19.7896 7.60501 19.8093 7.58555 19.8288C7.29811 20.1168 7.04467 20.3707 6.73914 20.5579C6.47072 20.7224 6.17809 20.8436 5.87198 20.9171C5.52354 21.0007 5.16479 21.0004 4.7579 21C4.73035 21 4.70258 21 4.67458 21H3.00004C2.44776 21 2.00004 20.5523 2.00004 20V18.3255C2.00004 18.2975 2.00001 18.2697 1.99999 18.2422C1.99961 17.8353 1.99928 17.4765 2.08293 17.1281C2.15642 16.822 2.27763 16.5293 2.44212 16.2609C2.62936 15.9554 2.88326 15.7019 3.17125 15.4145C3.19074 15.395 3.2104 15.3754 3.23019 15.3556L15.793 2.79287ZM18.793 4.20709C18.3551 3.76919 17.6451 3.76919 17.2072 4.20709L4.64441 16.7698C4.26484 17.1494 4.19486 17.2285 4.1474 17.3059C4.09257 17.3954 4.05217 17.4929 4.02767 17.595C4.00647 17.6833 4.00004 17.7887 4.00004 18.3255V19H4.67458C5.21137 19 5.31677 18.9936 5.40509 18.9724C5.50712 18.9479 5.60467 18.9075 5.69414 18.8526C5.77158 18.8052 5.85066 18.7352 6.23022 18.3556L18.793 5.79288C19.2309 5.35497 19.2309 4.64499 18.793 4.20709ZM11 20C11 19.4477 11.4477 19 12 19H21C21.5523 19 22 19.4477 22 20C22 20.5523 21.5523 21 21 21H12C11.4477 21 11 20.5523 11 20Z", fill: "currentColor" }) });
    };
    const FilterIcon = (_w) => {
      var _x = _w, { className } = _x, props = __objRest(_x, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6ZM5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12ZM8 18C8 17.4477 8.44772 17 9 17H15C15.5523 17 16 17.4477 16 18C16 18.5523 15.5523 19 15 19H9C8.44772 19 8 18.5523 8 18Z", fill: "currentColor" }) });
    };
    const HideTabIcon = (_y) => {
      var _z = _y, { className } = _z, props = __objRest(_z, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 12C2 11.4477 2.44772 11 3 11L14.5858 11L10.2929 6.70711C9.90237 6.31658 9.90237 5.68342 10.2929 5.2929C10.6834 4.90237 11.3166 4.90237 11.7071 5.2929L17.7071 11.2929C18.0976 11.6834 18.0976 12.3166 17.7071 12.7071L11.7071 18.7071C11.3166 19.0976 10.6834 19.0976 10.2929 18.7071C9.90237 18.3166 9.90237 17.6834 10.2929 17.2929L14.5858 13L3 13C2.44772 13 2 12.5523 2 12ZM21 22C20.4477 22 20 21.5523 20 21L20 3C20 2.44772 20.4477 2 21 2C21.5523 2 22 2.44772 22 3L22 21C22 21.5523 21.5523 22 21 22Z", fill: "currentColor" }) });
    };
    const HighlightIcon = (_A) => {
      var _B = _A, { className } = _B, props = __objRest(_B, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 2C12.6137 2 13.1111 2.49746 13.1111 3.11111V9.31754L17.881 4.54766C18.3149 4.11374 19.0184 4.11374 19.4523 4.54766C19.8863 4.98158 19.8863 5.68509 19.4523 6.11901L14.6825 10.8889H20.8889C21.5025 10.8889 22 11.3864 22 12C22 12.6137 21.5025 13.1111 20.8889 13.1111H14.6825L19.4523 17.881C19.8863 18.3149 19.8863 19.0184 19.4523 19.4523C19.0184 19.8863 18.3149 19.8863 17.881 19.4523L13.1111 14.6825V20.8889C13.1111 21.5025 12.6137 22 12 22C11.3864 22 10.8889 21.5025 10.8889 20.8889V14.6825L6.11901 19.4523C5.68509 19.8863 4.98158 19.8863 4.54766 19.4523C4.11374 19.0184 4.11374 18.3149 4.54766 17.881L9.31754 13.1111H3.11111C2.49746 13.1111 2 12.6137 2 12C2 11.3864 2.49746 10.8889 3.11111 10.8889H9.31754L4.54766 6.11901C4.11374 5.68509 4.11374 4.98158 4.54766 4.54766C4.98158 4.11374 5.68509 4.11374 6.11901 4.54766L10.8889 9.31754V3.11111C10.8889 2.49746 11.3864 2 12 2Z", fill: "currentColor" }) });
    };
    const HourglassIcon = (_C) => {
      var _D = _C, { className } = _D, props = __objRest(_D, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4 2.83744C4 1.82265 4.82265 1 5.83744 1H18.1626C19.1773 1 20 1.82265 20 2.83744C20 5.7679 18.8359 8.57833 16.7637 10.6505L15.5445 11.8697C15.4805 11.9337 15.4455 11.9688 15.4206 11.9951C15.4188 11.9969 15.4173 11.9985 15.4159 12C15.4173 12.0015 15.4188 12.0031 15.4206 12.0049C15.4455 12.0312 15.4805 12.0663 15.5445 12.1303L16.7637 13.3495C18.8359 15.4217 20 18.2321 20 21.1626C20 22.1774 19.1773 23 18.1626 23H5.83744C4.82265 23 4 22.1773 4 21.1626C4 18.2321 5.16412 15.4217 7.23627 13.3495L8.45545 12.1303L9.16256 12.8374L8.45545 12.1303C8.51952 12.0663 8.55448 12.0312 8.57945 12.0049C8.58115 12.0031 8.58271 12.0015 8.58412 12C8.58271 11.9985 8.58115 11.9969 8.57945 11.9951C8.55448 11.9688 8.51952 11.9337 8.45545 11.8697L7.23626 10.6505C5.16412 8.57833 4 5.7679 4 2.83744ZM6.00146 3C6.04347 5.34119 6.99176 7.57754 8.65048 9.23626L9.86966 10.4555C9.87827 10.4641 9.8871 10.4729 9.89614 10.4819C9.98812 10.5735 10.1003 10.6854 10.1892 10.8046L9.41382 11.3827L10.1892 10.8046C10.718 11.5138 10.718 12.4862 10.1892 13.1954L9.41382 12.6173L10.1892 13.1954C10.1003 13.3146 9.98812 13.4265 9.89613 13.5181C9.8871 13.5271 9.87826 13.5359 9.86966 13.5445L8.65048 14.7637C6.99176 16.4225 6.04347 18.6588 6.00146 21H17.9985C17.9565 18.6588 17.0082 16.4225 15.3495 14.7637L14.1303 13.5445C14.1217 13.5359 14.1129 13.5271 14.1039 13.5181C14.0119 13.4265 13.8997 13.3146 13.8108 13.1954C13.282 12.4862 13.282 11.5138 13.8108 10.8046C13.8997 10.6854 14.0119 10.5735 14.1039 10.4819C14.1129 10.4729 14.1217 10.4641 14.1303 10.4555L15.3495 9.23626C17.0082 7.57754 17.9565 5.34119 17.9985 3H6.00146Z", fill: "currentColor" }) });
    };
    const InfoIcon = (_E) => {
      var _F = _E, { className } = _F, props = __objRest(_F, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM11 8C11 7.44772 11.4477 7 12 7H12.01C12.5623 7 13.01 7.44772 13.01 8C13.01 8.55228 12.5623 9 12.01 9H12C11.4477 9 11 8.55228 11 8ZM12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12C11 11.4477 11.4477 11 12 11Z", fill: "currentColor" }) });
    };
    const LightbulbIcon = (_G) => {
      var _H = _G, { className } = _H, props = __objRest(_H, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5 9.27273C5 5.25611 8.13401 2 12 2C15.866 2 19 5.25611 19 9.27273C19 11.966 17.5909 14.3157 15.5 15.5723V15.6654C15.5 16.0642 15.5 16.4083 15.4813 16.6931C15.4616 16.9929 15.4183 17.2928 15.3002 17.5891C15.0338 18.2574 14.5227 18.7883 13.8795 19.0651C13.5944 19.1879 13.3057 19.2329 13.0171 19.2533C12.743 19.2727 12.4118 19.2727 12.028 19.2727H11.972C11.5882 19.2727 11.257 19.2727 10.9829 19.2533C10.6943 19.2329 10.4056 19.1879 10.1205 19.0651C9.47726 18.7883 8.96624 18.2574 8.69982 17.5891C8.58169 17.2928 8.53837 16.9929 8.51868 16.6931C8.49998 16.4083 8.49999 16.0642 8.5 15.6654L8.5 15.5723C6.40908 14.3157 5 11.966 5 9.27273ZM12 3.81818C9.1005 3.81818 6.75 6.26026 6.75 9.27273C6.75 11.4473 7.97471 13.3264 9.75046 14.2028C10.0556 14.3534 10.25 14.673 10.25 15.024V15.6364C10.25 16.0724 10.2505 16.3539 10.2646 16.5693C10.2782 16.7766 10.3015 16.8555 10.3166 16.8933C10.4054 17.1161 10.5758 17.2931 10.7902 17.3853C10.8266 17.401 10.9025 17.4252 11.102 17.4394C11.3094 17.4541 11.5803 17.4545 12 17.4545C12.4197 17.4545 12.6906 17.4541 12.898 17.4394C13.0975 17.4252 13.1734 17.401 13.2098 17.3853C13.4242 17.2931 13.5946 17.1161 13.6834 16.8933C13.6985 16.8555 13.7218 16.7766 13.7354 16.5693C13.7495 16.3539 13.75 16.0724 13.75 15.6364V15.024C13.75 14.673 13.9444 14.3534 14.2495 14.2028C16.0253 13.3264 17.25 11.4473 17.25 9.27273C17.25 6.26026 14.8995 3.81818 12 3.81818ZM8.9375 21.0909C8.9375 20.5888 9.32925 20.1818 9.8125 20.1818H14.1875C14.6707 20.1818 15.0625 20.5888 15.0625 21.0909C15.0625 21.593 14.6707 22 14.1875 22H9.8125C9.32925 22 8.9375 21.593 8.9375 21.0909Z", fill: "currentColor" }) });
    };
    const LinkIcon = (_I) => {
      var _J = _I, { className } = _J, props = __objRest(_J, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14 3C14 2.44772 14.4477 2 15 2H21C21.5523 2 22 2.44771 22 3L22 9C22 9.55228 21.5523 10 21 10C20.4477 10 20 9.55229 20 9L20 5.41421L13.7071 11.7071C13.3166 12.0976 12.6834 12.0976 12.2929 11.7071C11.9024 11.3166 11.9024 10.6834 12.2929 10.2929L18.5858 4H15C14.4477 4 14 3.55228 14 3ZM7.7587 4L10 4C10.5523 4 11 4.44772 11 5C11 5.55228 10.5523 6 10 6H7.8C6.94342 6 6.36113 6.00078 5.91104 6.03755C5.47262 6.07337 5.24842 6.1383 5.09202 6.21799C4.7157 6.40973 4.40973 6.71569 4.21799 7.09202C4.1383 7.24842 4.07337 7.47262 4.03755 7.91104C4.00078 8.36113 4 8.94342 4 9.8V16.2C4 17.0566 4.00078 17.6389 4.03755 18.089C4.07337 18.5274 4.1383 18.7516 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.24842 19.8617 5.47262 19.9266 5.91104 19.9624C6.36113 19.9992 6.94342 20 7.8 20H14.2C15.0566 20 15.6389 19.9992 16.089 19.9624C16.5274 19.9266 16.7516 19.8617 16.908 19.782C17.2843 19.5903 17.5903 19.2843 17.782 18.908C17.8617 18.7516 17.9266 18.5274 17.9624 18.089C17.9992 17.6389 18 17.0566 18 16.2V14C18 13.4477 18.4477 13 19 13C19.5523 13 20 13.4477 20 14V16.2413C20 17.0463 20 17.7106 19.9558 18.2518C19.9099 18.8139 19.8113 19.3306 19.564 19.816C19.1805 20.5686 18.5686 21.1805 17.816 21.564C17.3306 21.8113 16.8139 21.9099 16.2518 21.9558C15.7106 22 15.0463 22 14.2413 22H7.75868C6.95372 22 6.28936 22 5.74817 21.9558C5.18608 21.9099 4.66937 21.8113 4.18404 21.564C3.43139 21.1805 2.81947 20.5686 2.43597 19.816C2.18868 19.3306 2.09012 18.8139 2.04419 18.2518C1.99998 17.7106 1.99999 17.0463 2 16.2413V9.7587C1.99999 8.95373 1.99998 8.28937 2.04419 7.74817C2.09012 7.18608 2.18868 6.66937 2.43597 6.18404C2.81947 5.43139 3.43139 4.81947 4.18404 4.43597C4.66937 4.18868 5.18608 4.09012 5.74818 4.04419C6.28937 3.99998 6.95373 3.99999 7.7587 4Z", fill: "currentColor" }) });
    };
    const OverflowIcon = (_K) => {
      var _L = _K, { className } = _L, props = __objRest(_L, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM10 19C10 17.8954 10.8954 17 12 17C13.1046 17 14 17.8954 14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19Z", fill: "currentColor" }) });
    };
    const PauseIcon = (_M) => {
      var _N = _M, { className } = _N, props = __objRest(_N, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 4.5C6 3.67157 6.67157 3 7.5 3H9C9.82843 3 10.5 3.67157 10.5 4.5V19.5C10.5 20.3284 9.82843 21 9 21H7.5C6.67157 21 6 20.3284 6 19.5V4.5Z", fill: "currentColor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.5 4.5C13.5 3.67157 14.1716 3 15 3H16.5C17.3284 3 18 3.67157 18 4.5V19.5C18 20.3284 17.3284 21 16.5 21H15C14.1716 21 13.5 20.3284 13.5 19.5V4.5Z", fill: "currentColor" })
      ] });
    };
    const PlayIcon = (_O) => {
      var _P = _O, { className } = _P, props = __objRest(_P, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 4.98963C6 4.01847 6 3.53289 6.20249 3.26522C6.37889 3.03203 6.64852 2.88773 6.9404 2.8703C7.27544 2.8503 7.67946 3.11965 8.48752 3.65835L19.0031 10.6687C19.6708 11.1139 20.0046 11.3364 20.1209 11.6169C20.2227 11.8622 20.2227 12.1378 20.1209 12.3831C20.0046 12.6636 19.6708 12.8862 19.0031 13.3313L8.48752 20.3417C7.67946 20.8804 7.27544 21.1497 6.9404 21.1297C6.64852 21.1123 6.37889 20.968 6.20249 20.7348C6 20.4671 6 19.9815 6 19.0104V4.98963Z", fill: "currentColor" }) });
    };
    const ReorderIcon = (_Q) => {
      var _R = _Q, { className } = _R, props = __objRest(_R, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 8.5C2 7.94772 2.44772 7.5 3 7.5H21C21.5523 7.5 22 7.94772 22 8.5C22 9.05228 21.5523 9.5 21 9.5H3C2.44772 9.5 2 9.05228 2 8.5ZM2 15.5C2 14.9477 2.44772 14.5 3 14.5H21C21.5523 14.5 22 14.9477 22 15.5C22 16.0523 21.5523 16.5 21 16.5H3C2.44772 16.5 2 16.0523 2 15.5Z", fill: "currentColor" }) });
    };
    const SearchIcon = ({ className }) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.5509 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9057 16.3198C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z", fill: "currentColor" }) });
    const SettingIcon = (_S) => {
      var _T = _S, { className } = _T, props = __objRest(_T, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M18 6C16.8954 6 16 6.89543 16 8C16 9.10457 16.8954 10 18 10C19.1046 10 20 9.10457 20 8C20 6.89543 19.1046 6 18 6ZM14.126 7C14.5701 5.27477 16.1362 4 18 4C20.2091 4 22 5.79086 22 8C22 10.2091 20.2091 12 18 12C16.1362 12 14.5701 10.7252 14.126 9L3 9C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7L14.126 7ZM6 14C4.89543 14 4 14.8954 4 16C4 17.1046 4.89543 18 6 18C7.10457 18 8 17.1046 8 16C8 14.8954 7.10457 14 6 14ZM2 16C2 13.7909 3.79086 12 6 12C7.86384 12 9.42994 13.2748 9.87398 15L21 15C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17L9.87398 17C9.42994 18.7252 7.86384 20 6 20C3.79086 20 2 18.2091 2 16Z", fill: "currentColor" }) });
    };
    const SortIcon = (_U) => {
      var _V = _U, { className } = _V, props = __objRest(_V, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.29289 3.29289C6.68342 2.90237 7.31658 2.90237 7.70711 3.29289L11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711C11.3166 9.09763 10.6834 9.09763 10.2929 8.70711L8 6.41421V20C8 20.5523 7.55228 21 7 21C6.44772 21 6 20.5523 6 20V6.41421L3.70711 8.70711C3.31658 9.09763 2.68342 9.09763 2.29289 8.70711C1.90237 8.31658 1.90237 7.68342 2.29289 7.29289L6.29289 3.29289ZM16 17.5858V4C16 3.44772 16.4477 3 17 3C17.5523 3 18 3.44772 18 4V17.5858L20.2929 15.2929C20.6834 14.9024 21.3166 14.9024 21.7071 15.2929C22.0976 15.6834 22.0976 16.3166 21.7071 16.7071L17.7071 20.7071C17.3166 21.0976 16.6834 21.0976 16.2929 20.7071L12.2929 16.7071C11.9024 16.3166 11.9024 15.6834 12.2929 15.2929C12.6834 14.9024 13.3166 14.9024 13.7071 15.2929L16 17.5858Z", fill: "currentColor" }) });
    };
    const StopIcon = (_W) => {
      var _X = _W, { className } = _X, props = __objRest(_X, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "", d: "M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z", fill: "currentColor" }) });
    };
    const TimeIcon = (_Y) => {
      var _Z = _Y, { className } = _Z, props = __objRest(_Z, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 3.81818C7.48131 3.81818 3.81818 7.48131 3.81818 12C3.81818 16.5187 7.48131 20.1818 12 20.1818C16.5187 20.1818 20.1818 16.5187 20.1818 12C20.1818 7.48131 16.5187 3.81818 12 3.81818ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 5.63636C12.5021 5.63636 12.9091 6.04338 12.9091 6.54545V11.4382L16.0429 13.0051C16.492 13.2296 16.674 13.7757 16.4495 14.2247C16.2249 14.6738 15.6789 14.8558 15.2298 14.6313L11.5934 12.8131C11.2855 12.6591 11.0909 12.3443 11.0909 12V6.54545C11.0909 6.04338 11.4979 5.63636 12 5.63636Z", fill: "currentColor" }) });
    };
    const TrashIcon = (__) => {
      var _$ = __, { className } = _$, props = __objRest(_$, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3C16 3.55228 15.5523 4 15 4H9C8.44772 4 8 3.55228 8 3ZM4.99224 5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4.06445L4.70614 16.6254C4.75649 17.3809 4.79816 18.006 4.87287 18.5149C4.95066 19.0447 5.07405 19.5288 5.33109 19.98C5.73123 20.6824 6.33479 21.247 7.06223 21.5996C7.52952 21.826 8.0208 21.917 8.55459 21.9593C9.06728 22 9.69383 22 10.4509 22H13.5491C14.3062 22 14.9327 22 15.4454 21.9593C15.9792 21.917 16.4705 21.826 16.9378 21.5996C17.6652 21.247 18.2688 20.6824 18.6689 19.98C18.926 19.5288 19.0493 19.0447 19.1271 18.5149C19.2018 18.006 19.2435 17.3808 19.2939 16.6253L19.9356 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H19.0078C19.0019 4.99995 18.9961 4.99995 18.9903 5H5.00974C5.00392 4.99995 4.99809 4.99995 4.99224 5ZM17.9311 7H6.06889L6.69907 16.4528C6.75274 17.2578 6.78984 17.8034 6.85166 18.2243C6.9117 18.6333 6.98505 18.8429 7.06888 18.99C7.26895 19.3412 7.57072 19.6235 7.93444 19.7998C8.08684 19.8736 8.30086 19.9329 8.71286 19.9656C9.13703 19.9993 9.68385 20 10.4907 20H13.5093C14.3161 20 14.863 19.9993 15.2871 19.9656C15.6991 19.9329 15.9132 19.8736 16.0656 19.7998C16.4293 19.6235 16.7311 19.3412 16.9311 18.99C17.015 18.8429 17.0883 18.6333 17.1483 18.2243C17.2102 17.8034 17.2473 17.2578 17.3009 16.4528L17.9311 7Z", fill: "currentColor" }) });
    };
    const TripleStarsIcon = (_aa) => {
      var _ba = _aa, { className } = _ba, props = __objRest(_ba, ["className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.18182 2C5.6839 2 6.09091 2.40701 6.09091 2.90909V4.27273H7.45455C7.95662 4.27273 8.36364 4.67974 8.36364 5.18182C8.36364 5.6839 7.95662 6.09091 7.45455 6.09091H6.09091V7.45455C6.09091 7.95662 5.6839 8.36364 5.18182 8.36364C4.67974 8.36364 4.27273 7.95662 4.27273 7.45455V6.09091H2.90909C2.40701 6.09091 2 5.6839 2 5.18182C2 4.67974 2.40701 4.27273 2.90909 4.27273H4.27273V2.90909C4.27273 2.40701 4.67974 2 5.18182 2ZM12.9091 2.90909C13.2852 2.90909 13.6226 3.14075 13.7576 3.49184L15.3341 7.5908C15.6072 8.30084 15.693 8.50545 15.8104 8.67054C15.9282 8.83618 16.0729 8.9809 16.2386 9.09869C16.4036 9.21607 16.6082 9.30189 17.3183 9.57498L21.4173 11.1515C21.7683 11.2865 22 11.6238 22 12C22 12.3762 21.7683 12.7135 21.4173 12.8485L17.3183 14.425C16.6082 14.6981 16.4036 14.7839 16.2386 14.9013C16.0729 15.0191 15.9282 15.1638 15.8104 15.3295C15.693 15.4945 15.6072 15.6992 15.3341 16.4092L13.7576 20.5082C13.6226 20.8592 13.2852 21.0909 12.9091 21.0909C12.5329 21.0909 12.1956 20.8592 12.0606 20.5082L10.4841 16.4092C10.211 15.6992 10.1252 15.4945 10.0078 15.3295C9.88999 15.1638 9.74527 15.0191 9.57963 14.9013C9.41455 14.7839 9.20994 14.6981 8.4999 14.425L4.40093 12.8485C4.04984 12.7135 3.81818 12.3762 3.81818 12C3.81818 11.6238 4.04984 11.2865 4.40093 11.1515L8.49989 9.57498C9.20994 9.30189 9.41454 9.21607 9.57963 9.09869C9.74527 8.9809 9.89 8.83618 10.0078 8.67054C10.1252 8.50545 10.211 8.30084 10.4841 7.5908L12.0606 3.49184C12.1956 3.14075 12.5329 2.90909 12.9091 2.90909ZM12.9091 6.35062L12.1811 8.24349C12.169 8.27483 12.1571 8.30576 12.1454 8.3363C11.924 8.9129 11.7567 9.34846 11.4896 9.72416C11.254 10.0555 10.9645 10.3449 10.6333 10.5805C10.2575 10.8476 9.82199 11.0149 9.24539 11.2363C9.21486 11.248 9.18392 11.2599 9.15258 11.272L7.25971 12L9.15258 12.728C9.18392 12.7401 9.21486 12.752 9.24539 12.7637C9.82199 12.9851 10.2575 13.1524 10.6333 13.4195C10.9645 13.6551 11.254 13.9445 11.4896 14.2758C11.7567 14.6515 11.924 15.0871 12.1454 15.6637C12.1571 15.6942 12.169 15.7252 12.1811 15.7565L12.9091 17.6494L13.6371 15.7565C13.6492 15.7252 13.6611 15.6942 13.6728 15.6637C13.8942 15.0871 14.0615 14.6515 14.3286 14.2758C14.5642 13.9446 14.8536 13.6551 15.1849 13.4195C15.5606 13.1524 15.9962 12.9851 16.5728 12.7637C16.6033 12.752 16.6343 12.7401 16.6656 12.728L18.5585 12L16.6656 11.272C16.6343 11.2599 16.6033 11.248 16.5728 11.2363C15.9962 11.0149 15.5606 10.8476 15.1849 10.5805C14.8536 10.3449 14.5642 10.0555 14.3286 9.72416C14.0615 9.34846 13.8942 8.9129 13.6728 8.3363C13.6611 8.30577 13.6492 8.27483 13.6371 8.24349L12.9091 6.35062ZM5.18182 15.6364C5.6839 15.6364 6.09091 16.0434 6.09091 16.5455V17.9091H7.45455C7.95662 17.9091 8.36364 18.3161 8.36364 18.8182C8.36364 19.3203 7.95662 19.7273 7.45455 19.7273H6.09091V21.0909C6.09091 21.593 5.6839 22 5.18182 22C4.67974 22 4.27273 21.593 4.27273 21.0909V19.7273H2.90909C2.40701 19.7273 2 19.3203 2 18.8182C2 18.3161 2.40701 17.9091 2.90909 17.9091H4.27273V16.5455C4.27273 16.0434 4.67974 15.6364 5.18182 15.6364Z", fill: "currentColor" }) });
    };
    const MainPage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const state = location.state;
      const [holeName, setHoleName] = reactExports.useState("");
      const [loading, setLoading] = reactExports.useState(true);
      const [selectedHole, setSelectedHole] = reactExports.useState(null);
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          try {
            if (state == null ? void 0 : state.holeId) {
              const hole = yield getHole(state.holeId);
              setSelectedHole(hole);
            }
          } catch (err) {
            console.error("Hole 정보 가져오기 실패:", err);
          } finally {
            setLoading(false);
          }
        }));
        return () => unsubscribe();
      }, [navigate, state]);
      const handleHoleNameChange = (e) => {
        setHoleName(e.target.value);
      };
      const handleCreateHole = () => {
        if (holeName.trim()) {
          navigate("/select-icon", { state: { holeName } });
        }
      };
      const handleBackClick = () => {
        navigate("/hole-list");
      };
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] flex items-center justify-center bg-Surface-Main", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-lg-md", children: "로딩 중..." }) });
      }
      if (selectedHole) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] pt-8 bg-Surface-Main inline-flex flex-col justify-start items-start overflow-hidden font-pretendard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex justify-between items-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full text-body-lg-md text-center justify-center text-text-primary-light text-base leading-snug", children: "What do you diggin?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 flex flex-col justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 h-40 bg-gray-200 rounded-[100px]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextField,
              {
                size: "lg",
                isDisabled: false,
                error: false,
                placeholder: "Write a new hole name",
                value: holeName,
                onChange: handleHoleNameChange,
                className: "self-stretch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "primary",
                size: "lg",
                disabled: !holeName.trim(),
                onClick: handleCreateHole,
                className: "self-stretch",
                children: "Create a Hole"
              }
            )
          ] })
        ] }) });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-Surface-Main inline-flex flex-col justify-start items-start overflow-hidden font-pretendard", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch h-[52px] px-3 border-b border-line-tertiary-light dark:border-line-tertiary-dark inline-flex justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded flex justify-start items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "tertiary",
              size: "sm",
              isIconOnly: true,
              onClick: handleBackClick,
              leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {}),
              showLeftIcon: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug", children: "What do you diggin?" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 flex flex-col justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 h-40 bg-gray-200 rounded-[100px]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextField,
              {
                size: "lg",
                isDisabled: false,
                error: false,
                placeholder: "Write a new hole name",
                value: holeName,
                onChange: handleHoleNameChange,
                className: "self-stretch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "primary",
                size: "lg",
                disabled: !holeName.trim(),
                onClick: handleCreateHole,
                className: "self-stretch",
                children: "Create a Hole"
              }
            )
          ] })
        ] })
      ] });
    };
    const IconSelector = React.forwardRef((_ca, ref) => {
      var _da = _ca, { icon, selected = false, className } = _da, props = __objRest(_da, ["icon", "selected", "className"]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        __spreadProps(__spreadValues({
          ref,
          className: cn(
            "group relative flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-[8px] transition-all",
            selected ? "border border-line-primary-light dark:border-line-primary-dark" : "border border-line-tertiary-light dark:border-line-tertiary-dark hover:border-line-secondary-light dark:hover:border-line-secondary-dark",
            className
          )
        }, props), {
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "flex h-[20px] w-[20px] items-center justify-center",
                selected ? "[&>svg]:text-icon-primary-light dark:[&>svg]:text-icon-primary-dark" : "[&>svg]:text-icon-secondary-light dark:[&>svg]:text-icon-secondary-dark group-hover:[&>svg]:text-icon-primary-light dark:group-hover:[&>svg]:text-icon-primary-dark"
              ),
              children: icon
            }
          )
        })
      );
    });
    IconSelector.displayName = "IconSelector";
    const iconCategories = [
      {
        id: "utility",
        name: "Utility",
        icons: [
          { id: "utility-1", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchIcon, {}) },
          { id: "utility-2", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(AddIcon, {}) },
          { id: "utility-3", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(EditIcon, {}) },
          { id: "utility-4", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, {}) },
          { id: "utility-5", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {}) },
          { id: "utility-6", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {}) },
          { id: "utility-7", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {}) },
          { id: "utility-8", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LinkIcon, {}) },
          { id: "utility-9", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingIcon, {}) },
          { id: "utility-10", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterIcon, {}) }
        ]
      },
      {
        id: "media",
        name: "Media",
        icons: [
          { id: "media-1", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PlayIcon, {}) },
          { id: "media-2", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PauseIcon, {}) },
          { id: "media-3", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(StopIcon, {}) },
          { id: "media-4", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveIcon, {}) },
          { id: "media-5", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HideTabIcon, {}) },
          { id: "media-6", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightIcon, {}) },
          { id: "media-7", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, {}) },
          { id: "media-8", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ReorderIcon, {}) },
          { id: "media-9", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowIcon, {}) },
          { id: "media-10", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRightIcon, {}) }
        ]
      },
      {
        id: "other",
        name: "Other",
        icons: [
          { id: "other-1", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TimeIcon, {}) },
          { id: "other-2", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HourglassIcon, {}) },
          { id: "other-3", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LightbulbIcon, {}) },
          { id: "other-4", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TripleStarsIcon, {}) },
          { id: "other-5", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {}) }
        ]
      }
    ];
    const SelectIconPage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const state = location.state;
      const [selectedIcon, setSelectedIcon] = reactExports.useState(null);
      const [selectedIconData, setSelectedIconData] = reactExports.useState(null);
      const [holeName, setHoleName] = reactExports.useState("");
      const [loading, setLoading] = reactExports.useState(true);
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setLoading(false);
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          if (state == null ? void 0 : state.holeName) {
            setHoleName(state.holeName);
          } else {
            navigate("/main", { replace: true });
          }
        });
        return () => unsubscribe();
      }, [state, navigate]);
      const handleIconSelect = (icon) => {
        console.log("Selected icon:", icon);
        setSelectedIcon(icon.id);
        setSelectedIconData(icon);
      };
      const handleBackClick = () => {
        console.log("Going back to previous page");
        navigate(-1);
      };
      const handleSelectClick = () => {
        console.log("Selected icon ID:", selectedIcon);
        console.log("Sending state to create-hole:", { selectedIconId: selectedIcon, holeName });
        navigate("/create-hole", {
          state: {
            selectedIconId: selectedIcon,
            holeName
          },
          replace: true
        });
      };
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark w-80 h-[400px] bg-surface-bg-dark flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-primary-dark", children: "로딩 중..." }) });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark w-80 h-[400px] bg-surface-bg-dark inline-flex flex-col justify-between items-center overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch h-13 px-3 py-3 border-b border-line-tertiary-dark inline-flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "tertiary",
              size: "sm",
              isIconOnly: true,
              onClick: handleBackClick,
              leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {}),
              showLeftIcon: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-lg-md", children: "Select Icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full pl-3 pt-4 flex-1 overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[292px] flex flex-col justify-start items-start gap-6 pb-4 pr-4", children: iconCategories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[292px] flex flex-col justify-start items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-caption-md-md", children: category.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[292px] inline-flex justify-start items-start gap-2 flex-wrap content-start", children: category.icons.map((icon) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconSelector,
            {
              icon: icon.icon,
              selected: selectedIcon === icon.id,
              onClick: () => handleIconSelect(icon)
            },
            icon.id
          )) })
        ] }, category.id)) }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "primary",
            size: "lg",
            disabled: !selectedIcon,
            onClick: handleSelectClick,
            className: "self-stretch",
            children: "Select"
          }
        ) })
      ] });
    };
    const getIconById$3 = (iconId) => {
      console.log("Getting icon by ID:", iconId);
      if (iconId === "utility-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(SearchIcon, {});
      if (iconId === "utility-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(AddIcon, {});
      if (iconId === "utility-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(EditIcon, {});
      if (iconId === "utility-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, {});
      if (iconId === "utility-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {});
      if (iconId === "utility-6") return /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {});
      if (iconId === "utility-7") return /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {});
      if (iconId === "utility-8") return /* @__PURE__ */ jsxRuntimeExports.jsx(LinkIcon, {});
      if (iconId === "utility-9") return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingIcon, {});
      if (iconId === "utility-10") return /* @__PURE__ */ jsxRuntimeExports.jsx(FilterIcon, {});
      if (iconId === "media-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(PlayIcon, {});
      if (iconId === "media-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(PauseIcon, {});
      if (iconId === "media-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(StopIcon, {});
      if (iconId === "media-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveIcon, {});
      if (iconId === "media-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(HideTabIcon, {});
      if (iconId === "media-6") return /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightIcon, {});
      if (iconId === "media-7") return /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, {});
      if (iconId === "media-8") return /* @__PURE__ */ jsxRuntimeExports.jsx(ReorderIcon, {});
      if (iconId === "media-9") return /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowIcon, {});
      if (iconId === "media-10") return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRightIcon, {});
      if (iconId === "other-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(TimeIcon, {});
      if (iconId === "other-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(HourglassIcon, {});
      if (iconId === "other-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(LightbulbIcon, {});
      if (iconId === "other-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(TripleStarsIcon, {});
      if (iconId === "other-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {});
      console.warn("Icon ID not found:", iconId);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {});
    };
    const CreateHolePage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const state = location.state;
      const [holeName, setHoleName] = reactExports.useState((state == null ? void 0 : state.holeName) || "");
      const [icon, setIcon] = reactExports.useState((state == null ? void 0 : state.selectedIconId) || null);
      const [loading, setLoading] = reactExports.useState(true);
      const [creating, setCreating] = reactExports.useState(false);
      const [error, setError] = reactExports.useState(null);
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setLoading(false);
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          if (state == null ? void 0 : state.selectedIconId) {
            setIcon(state.selectedIconId);
          } else {
            navigate("/select-icon", {
              state: { holeName: (state == null ? void 0 : state.holeName) || "" },
              replace: true
            });
          }
          if (state == null ? void 0 : state.holeName) {
            setHoleName(state.holeName);
          }
        });
        return () => unsubscribe();
      }, [state, navigate]);
      const handleHoleNameChange = (e) => {
        setHoleName(e.target.value);
      };
      const handleCreateHole = () => __async(exports, null, function* () {
        if (holeName.trim() && icon && auth.currentUser) {
          try {
            setCreating(true);
            setError(null);
            yield createHole(auth.currentUser.uid, holeName, icon);
            navigate("/hole-list", { replace: true });
          } catch (err) {
            console.error("홀 생성 실패:", err);
            setError("홀 생성에 실패했습니다. 다시 시도해주세요.");
          } finally {
            setCreating(false);
          }
        }
      });
      const handleSelectIcon = () => {
        navigate("/select-icon", { state: { holeName } });
      };
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark w-80 h-[400px] bg-surface-bg-light dark:bg-surface-bg-dark flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-primary-light dark:text-text-primary-dark", children: "로딩 중..." }) });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] pt-8 bg-surface-bg-light dark:bg-surface-bg-dark inline-flex flex-col justify-start items-start overflow-hidden font-pretendard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-lg-md", children: "What do you diggin?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 flex flex-col justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-40 h-40 bg-gray-200 rounded-[100px] flex items-center justify-center cursor-pointer",
            onClick: handleSelectIcon,
            children: icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 flex items-center justify-center", children: getIconById$3(icon) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextField,
            {
              size: "lg",
              isDisabled: creating,
              error: false,
              placeholder: "Write a new hole name",
              value: holeName,
              onChange: handleHoleNameChange,
              className: "self-stretch"
            }
          ),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-sm w-full text-center mb-2", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              size: "lg",
              disabled: !holeName.trim() || !icon || creating,
              onClick: handleCreateHole,
              className: "self-stretch",
              children: creating ? "생성 중..." : "Create a Hole"
            }
          )
        ] })
      ] }) });
    };
    const DBList = React.forwardRef(
      ({ icon: Icon2, name, insightCount = 0, selected = false, onClick, className }, ref) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref,
            className: cn$1(
              "flex items-center justify-between px-3 w-[304px] h-12 cursor-pointer transition-colors rounded-[8px]",
              "bg-fill-secondary-light dark:bg-fill-secondary-dark hover:bg-fill-hover-secondary-light dark:hover:bg-fill-hover-secondary-dark",
              selected ? "bg-fill-selected-secondary-light dark:bg-fill-selected-secondary-dark" : "bg-fill-secondary-light dark:bg-fill-secondary-dark",
              className
            ),
            onClick,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn$1(
                    "flex h-[20px] w-[20px] items-center justify-center",
                    "[&>svg]:text-icon-primary-light dark:[&>svg]:text-icon-primary-dark"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-md-md text-text-primary-light dark:text-text-primary-dark", children: name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-md-md text-text-tertiary-light dark:text-text-tertiary-dark", children: insightCount })
              ] })
            ] })
          }
        );
      }
    );
    DBList.displayName = "DBList";
    const createSession = (holeId, name) => __async(exports, null, function* () {
      try {
        const sessionsCollection = collection(db, "sessions");
        const now = serverTimestamp();
        const docRef = yield addDoc(sessionsCollection, {
          holeId,
          name,
          startTime: now,
          endTime: null,
          isActive: true,
          totalDuration: 0,
          updatedAt: now
        });
        return docRef.id;
      } catch (error) {
        console.error("Error creating session:", error);
        throw error;
      }
    });
    const getSession = (sessionId) => __async(exports, null, function* () {
      try {
        const docRef = doc(db, "sessions", sessionId);
        const docSnap = yield getDoc(docRef);
        if (docSnap.exists()) {
          return __spreadValues({ id: docSnap.id }, docSnap.data());
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error getting session:", error);
        throw error;
      }
    });
    const getHoleSessions = (holeId) => __async(exports, null, function* () {
      try {
        const sessionsQuery = query(
          collection(db, "sessions"),
          where("holeId", "==", holeId),
          orderBy("startTime", "desc")
        );
        const querySnapshot = yield getDocs(sessionsQuery);
        const sessions = [];
        querySnapshot.forEach((doc2) => {
          sessions.push(__spreadValues({ id: doc2.id }, doc2.data()));
        });
        return sessions;
      } catch (error) {
        console.error("Error getting hole sessions:", error);
        throw error;
      }
    });
    const updateSessionDuration = (sessionId, durationInSeconds) => __async(exports, null, function* () {
      try {
        const docRef = doc(db, "sessions", sessionId);
        yield updateDoc(docRef, {
          totalDuration: durationInSeconds,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error("Error updating session duration:", error);
        throw error;
      }
    });
    const updateSessionActiveStatus = (sessionId, isActive) => __async(exports, null, function* () {
      try {
        const docRef = doc(db, "sessions", sessionId);
        if (isActive) {
          yield updateDoc(docRef, {
            isActive: true,
            updatedAt: serverTimestamp()
          });
        } else {
          yield updateDoc(docRef, {
            isActive: false,
            updatedAt: serverTimestamp()
          });
        }
      } catch (error) {
        console.error("Error updating session active status:", error);
        throw error;
      }
    });
    const getIconById$2 = (iconId) => {
      if (iconId === "utility-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(SearchIcon, {});
      if (iconId === "utility-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(AddIcon, {});
      if (iconId === "utility-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(EditIcon, {});
      if (iconId === "utility-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, {});
      if (iconId === "utility-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {});
      if (iconId === "utility-6") return /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {});
      if (iconId === "utility-7") return /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {});
      if (iconId === "utility-8") return /* @__PURE__ */ jsxRuntimeExports.jsx(LinkIcon, {});
      if (iconId === "utility-9") return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingIcon, {});
      if (iconId === "utility-10") return /* @__PURE__ */ jsxRuntimeExports.jsx(FilterIcon, {});
      if (iconId === "media-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(PlayIcon, {});
      if (iconId === "media-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(PauseIcon, {});
      if (iconId === "media-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(StopIcon, {});
      if (iconId === "media-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveIcon, {});
      if (iconId === "media-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(HideTabIcon, {});
      if (iconId === "media-6") return /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightIcon, {});
      if (iconId === "media-7") return /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, {});
      if (iconId === "media-8") return /* @__PURE__ */ jsxRuntimeExports.jsx(ReorderIcon, {});
      if (iconId === "media-9") return /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowIcon, {});
      if (iconId === "media-10") return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRightIcon, {});
      if (iconId === "other-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(TimeIcon, {});
      if (iconId === "other-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(HourglassIcon, {});
      if (iconId === "other-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(LightbulbIcon, {});
      if (iconId === "other-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(TripleStarsIcon, {});
      if (iconId === "other-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {});
      console.warn("Icon ID not found:", iconId);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {});
    };
    const HoleListPage = () => {
      const navigate = useNavigate();
      const [selectedHole, setSelectedHole] = reactExports.useState(null);
      const [holes, setHoles] = reactExports.useState([]);
      const [loading, setLoading] = reactExports.useState(true);
      const [error, setError] = reactExports.useState(null);
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          try {
            const userHoles = yield getUserHoles(user.uid);
            setHoles(userHoles);
            if (userHoles.length === 0) {
              navigate("/main", { replace: true });
            }
          } catch (err) {
            console.error("Hole 목록 가져오기 실패:", err);
            setError("Hole 목록을 불러오는데 실패했습니다.");
          } finally {
            setLoading(false);
          }
        }));
        return () => unsubscribe();
      }, [navigate]);
      const handleHoleSelect = (holeId) => {
        setSelectedHole(holeId);
      };
      const handleLogout = () => __async(exports, null, function* () {
        try {
          yield signOut();
          navigate("/", { replace: true });
        } catch (err) {
          console.error("로그아웃 실패:", err);
        }
      });
      const handleNext = () => __async(exports, null, function* () {
        if (selectedHole) {
          try {
            const sessions = yield getHoleSessions(selectedHole);
            if (sessions.length > 0) {
              navigate("/create-session", { state: { holeId: selectedHole } });
            } else {
              navigate("/empty-session", { state: { holeId: selectedHole } });
            }
          } catch (error2) {
            console.error("세션 목록 가져오기 실패:", error2);
            navigate("/empty-session", { state: { holeId: selectedHole } });
          }
        }
      });
      const handleFilterClick = () => {
        console.log("Filter clicked");
      };
      const handleAddClick = () => {
        navigate("/main");
      };
      const getIconComponent = (iconId) => {
        return () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 relative overflow-hidden flex items-center justify-center", children: getIconById$2(iconId) });
      };
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-primary-light dark:text-text-primary-dark", children: "Loading" }) });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-between items-center overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch h-[52px] pl-5 pr-3 border-b border-color-line-tertiary inline-flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug", children: "Diggin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-[8px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button$1,
              {
                variant: "tertiary",
                size: "sm",
                isIconOnly: true,
                onClick: handleFilterClick,
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterIcon, {}),
                showLeftIcon: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button$1,
              {
                variant: "tertiary",
                size: "sm",
                isIconOnly: true,
                onClick: handleAddClick,
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(AddIcon, {}),
                showLeftIcon: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button$1,
              {
                variant: "tertiary",
                size: "sm",
                isIconOnly: true,
                onClick: handleLogout,
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOutIcon, {}),
                showLeftIcon: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 flex flex-col justify-start items-start gap-2", children: error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-sm text-center px-4 py-8 w-full", children: error }) : holes.length > 0 ? holes.map((hole) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DBList,
          {
            icon: getIconComponent(hole.icon),
            name: hole.name,
            insightCount: 0,
            selected: selectedHole === hole.id,
            onClick: () => handleHoleSelect(hole.id),
            className: "rounded-lg w-full"
          },
          hole.id
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch py-8 flex justify-center items-center w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-secondary-light dark:text-text-secondary-dark", children: "No holes found. Create a new one!" }) }) }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button$1,
          {
            variant: "primary",
            size: "lg",
            disabled: !selectedHole,
            onClick: handleNext,
            className: "self-stretch",
            children: "Next"
          }
        ) })
      ] });
    };
    const EmptySessionPage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const state = location.state;
      const [hole, setHole] = reactExports.useState(null);
      const [loading, setLoading] = reactExports.useState(true);
      const [error, setError] = reactExports.useState(null);
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          if (!(state == null ? void 0 : state.holeId)) {
            navigate("/hole-list", { replace: true });
            return;
          }
          try {
            const holeData = yield getHole(state.holeId);
            if (!holeData) {
              throw new Error("Hole not found");
            }
            setHole(holeData);
          } catch (err) {
            console.error("홀 정보 가져오기 실패:", err);
            setError("홀 정보를 불러오는데 실패했습니다.");
          } finally {
            setLoading(false);
          }
        }));
        return () => unsubscribe();
      }, [navigate, state]);
      const handleBackClick = () => {
        navigate("/hole-list");
      };
      const handleCreateSession = () => {
        navigate("/create-session", { state: { holeId: state.holeId } });
      };
      const handleSeeAllTemplates = () => {
        navigate("/template-list", { state: { holeId: state.holeId } });
      };
      const handleTemplateSelect = (templateId) => {
        console.log("Selected template:", templateId);
      };
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-primary-light dark:text-text-primary-dark", children: "로딩 중..." }) });
      }
      if (error || !hole) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex flex-col items-center justify-center p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 mb-4", children: error || "홀을 찾을 수 없습니다." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: handleBackClick, children: "Back to Holes" })
        ] });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-start items-start overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch h-12 px-3 border-b border-color-line-tertiary inline-flex justify-start items-center gap-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded flex justify-start items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "tertiary",
              size: "sm",
              isIconOnly: true,
              onClick: handleBackClick,
              leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {}),
              showLeftIcon: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug", children: hole.name }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex-1 rounded-2xl flex flex-col justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 flex flex-col justify-center items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "tertiary",
              size: "sm",
              onClick: handleCreateSession,
              leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(AddIcon, {}),
              showLeftIcon: true,
              children: "Create a session"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch p-3 flex flex-col justify-start items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch inline-flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-none", children: "Templates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-center items-center gap-0.5 cursor-pointer",
                  onClick: handleSeeAllTemplates,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-none", children: "See all" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRightIcon, { className: "w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" }) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch inline-flex justify-start items-center gap-3 overflow-x-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "w-36 h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer",
                  onClick: () => handleTemplateSelect("design-thinking"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex flex-col justify-start items-start gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate", children: "🎨 💭" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate", children: "Design Thinking" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden", children: "Empathize, Define, Ideate, Prototype, Test" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "w-36 h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer",
                  onClick: () => handleTemplateSelect("double-diamond"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex flex-col justify-start items-start gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate", children: "💎 💎" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch justify-center text-text-primary-light dark:text-text-primary-dark text-caption-md-md leading-none truncate", children: "Double Diamond" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden", children: "Discover, Define, Develop, Deliver" })
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] });
    };
    const ExtensionList = reactExports.forwardRef(
      ({
        type = "default",
        state = "default",
        label,
        count = 0,
        placeholder = "Write a new session name",
        onSubmit,
        onCancel,
        onChange,
        onClick,
        value = "",
        className
      }, ref) => {
        if (type === "default") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref,
              className: cn$1(
                "w-full h-12 min-w-[240px] px-3 rounded-lg flex justify-between items-center transition-colors",
                state === "hover" ? "bg-fill-hover-secondary-light dark:bg-fill-hover-secondary-dark cursor-pointer" : state === "selected" ? "bg-fill-selected-secondary-light dark:bg-fill-selected-secondary-dark cursor-pointer" : "bg-fill-secondary-light dark:bg-fill-secondary-dark hover:bg-fill-hover-secondary-light dark:hover:bg-fill-hover-secondary-dark cursor-pointer",
                className
              ),
              onClick,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-body-md-md text-text-primary-light dark:text-text-primary-dark leading-none", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-body-md-md text-text-tertiary-light dark:text-text-tertiary-dark leading-none", children: count })
              ] })
            }
          );
        }
        if (type === "add") {
          state === "active" || (value == null ? void 0 : value.length) > 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref,
              className: cn$1(
                "w-full h-12 min-w-[240px] px-3 rounded-lg flex justify-between items-center gap-2",
                "bg-fill-onsurface-light dark:bg-fill-onsurface-dark",
                className
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start items-center flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    className: "bg-transparent text-body-md-md w-full outline-none text-text-primary-light dark:text-text-primary-dark placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark",
                    placeholder,
                    value,
                    onChange
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button$1,
                    {
                      variant: "tertiary",
                      size: "sm",
                      isIconOnly: true,
                      disabled: !value,
                      onClick: () => value && (onSubmit == null ? void 0 : onSubmit(value)),
                      leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button$1,
                    {
                      variant: "tertiary",
                      size: "sm",
                      isIconOnly: true,
                      disabled: false,
                      onClick: onCancel,
                      leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {})
                    }
                  )
                ] })
              ]
            }
          );
        }
        if (type === "manage") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref,
              className: cn$1(
                "w-full h-12 min-w-[240px] pl-3 pr-2.5 rounded-lg flex justify-start items-center gap-4 transition-colors",
                state === "hover" ? "bg-fill-hover-secondary-light dark:bg-fill-hover-secondary-dark cursor-pointer" : state === "selected" ? "bg-fill-selected-secondary-light dark:bg-fill-selected-secondary-dark cursor-pointer" : "bg-fill-secondary-light dark:bg-fill-secondary-dark hover:bg-fill-hover-secondary-light dark:hover:bg-fill-hover-secondary-dark cursor-pointer",
                className
              ),
              onClick,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ReorderIcon, { className: "w-4 h-4 text-icon-secondary-light dark:text-icon-secondary-dark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-body-md-md text-text-primary-light dark:text-text-primary-dark leading-none", children: label })
              ] })
            }
          );
        }
        return null;
      }
    );
    ExtensionList.displayName = "ExtensionList";
    const List = ExtensionList;
    const CreateSessionPage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const state = location.state;
      const [hole, setHole] = reactExports.useState(null);
      const [loading, setLoading] = reactExports.useState(true);
      const [error, setError] = reactExports.useState(null);
      const [sessionName, setSessionName] = reactExports.useState("");
      const [isCreatingMode, setIsCreatingMode] = reactExports.useState(true);
      const [sessions, setSessions] = reactExports.useState([]);
      const [listHoverState, setListHoverState] = reactExports.useState(null);
      const [submitting, setSubmitting] = reactExports.useState(false);
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          if (!(state == null ? void 0 : state.holeId)) {
            navigate("/hole-list", { replace: true });
            return;
          }
          try {
            setLoading(true);
            const holeData = yield getHole(state.holeId);
            if (!holeData) {
              throw new Error("Hole not found");
            }
            setHole(holeData);
            const sessionsList = yield getHoleSessions(state.holeId);
            const sessionItems = sessionsList.map((session) => ({
              id: session.id,
              name: session.name,
              insightCount: 0
              // TODO: insight 수를 가져오는 로직 추가 필요
            }));
            setSessions(sessionItems);
            if (sessionItems.length > 0) {
              setIsCreatingMode(false);
            }
          } catch (err) {
            console.error("홀 정보 가져오기 실패:", err);
            setError("홀 정보를 불러오는데 실패했습니다.");
          } finally {
            setLoading(false);
          }
        }));
        return () => unsubscribe();
      }, [navigate, state]);
      const handleBackClick = () => {
        navigate("/hole-list");
      };
      const handleSessionNameChange = (e) => {
        setSessionName(e.target.value);
      };
      const handleCancelClick = () => {
        setSessionName("");
      };
      const handleSubmitClick = (value) => __async(exports, null, function* () {
        if (value.trim() && !submitting && hole) {
          try {
            setSubmitting(true);
            const sessionId = yield createSession(hole.id, value.trim());
            const newSession = {
              id: sessionId,
              name: value.trim(),
              insightCount: 0
            };
            setSessions((prevSessions) => [...prevSessions, newSession]);
            setSessionName("");
            setIsCreatingMode(false);
          } catch (error2) {
            console.error("세션 생성 실패:", error2);
            alert("세션을 생성하는데 실패했습니다.");
          } finally {
            setSubmitting(false);
          }
        }
      });
      const handleStartDiggin = () => {
        if (sessions.length > 0) {
          const lastSession = sessions[sessions.length - 1];
          navigate("/session", {
            state: {
              holeId: state.holeId,
              sessionId: lastSession.id,
              sessionName: lastSession.name
            }
          });
        }
      };
      const handleAddClick = () => {
        setIsCreatingMode(true);
      };
      const handleListClick = (id2) => {
        setListHoverState((prevState) => prevState === id2 ? null : id2);
      };
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-primary-light dark:text-text-primary-dark", children: "로딩 중..." }) });
      }
      if (error || !hole) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex flex-col items-center justify-center p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 mb-4", children: error || "홀을 찾을 수 없습니다." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: handleBackClick, children: "Back" })
        ] });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-start items-start overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch h-[52px] px-3 border-b border-color-line-tertiary inline-flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded flex justify-start items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "tertiary",
                size: "sm",
                isIconOnly: true,
                onClick: handleBackClick,
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {}),
                showLeftIcon: true
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug", children: hole.name }) })
          ] }),
          !isCreatingMode && sessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "tertiary",
                size: "sm",
                isIconOnly: true,
                onClick: handleAddClick,
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(AddIcon, {}),
                showLeftIcon: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "tertiary",
                size: "sm",
                isIconOnly: true,
                onClick: () => {
                },
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowIcon, {}),
                showLeftIcon: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[348px] rounded-2xl flex flex-col justify-between items-center w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-col justify-start items-start gap-2", children: [
            isCreatingMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              List,
              {
                type: "add",
                state: sessionName ? "active" : "default",
                label: "",
                value: sessionName,
                onChange: handleSessionNameChange,
                onCancel: handleCancelClick,
                onSubmit: handleSubmitClick,
                placeholder: "Write a new session name"
              }
            ) : null,
            sessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              List,
              {
                type: "default",
                state: listHoverState === session.id ? "hover" : "default",
                label: session.name,
                count: session.insightCount,
                onClick: () => handleListClick(session.id)
              },
              session.id
            ))
          ] }) }) }) }),
          !isCreatingMode && sessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              size: "lg",
              onClick: handleStartDiggin,
              className: "self-stretch h-12 min-w-[240px] px-5 rounded-lg flex justify-center items-center",
              children: "Start Diggin"
            }
          ) })
        ] })
      ] });
    };
    const SessionListPage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const state = location.state;
      const [hole, setHole] = reactExports.useState(null);
      const [loading, setLoading] = reactExports.useState(true);
      const [error, setError] = reactExports.useState(null);
      const [sessions, setSessions] = reactExports.useState([]);
      const [selectedSessionId, setSelectedSessionId] = reactExports.useState(null);
      const [listHoverState, setListHoverState] = reactExports.useState(null);
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          if (!(state == null ? void 0 : state.holeId)) {
            navigate("/hole-list", { replace: true });
            return;
          }
          try {
            setLoading(true);
            const holeData = yield getHole(state.holeId);
            if (!holeData) {
              throw new Error("Hole not found");
            }
            setHole(holeData);
            const sessionsList = yield getHoleSessions(state.holeId);
            const sessionItems = sessionsList.map((session) => ({
              id: session.id,
              name: session.name,
              insightCount: 0
              // TODO: insight 수를 가져오는 로직 추가 필요
            }));
            setSessions(sessionItems);
          } catch (err) {
            console.error("홀 정보 가져오기 실패:", err);
            setError("홀 정보를 불러오는데 실패했습니다.");
          } finally {
            setLoading(false);
          }
        }));
        return () => unsubscribe();
      }, [navigate, state]);
      const handleBackClick = () => {
        navigate("/hole-list");
      };
      const handleAddClick = () => {
        navigate("/create-session", { state: { holeId: state.holeId } });
      };
      const handleSessionClick = (id2) => {
        setSelectedSessionId(id2 === selectedSessionId ? null : id2);
        setListHoverState((prevState) => prevState === id2 ? null : id2);
      };
      const handleStartDiggin = () => {
        if (selectedSessionId) {
          const selectedSession = sessions.find((s) => s.id === selectedSessionId);
          if (selectedSession) {
            navigate("/session", {
              state: {
                holeId: state.holeId,
                sessionId: selectedSession.id,
                sessionName: selectedSession.name
              }
            });
          }
        }
      };
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-primary-light dark:text-text-primary-dark", children: "로딩 중..." }) });
      }
      if (error || !hole) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex flex-col items-center justify-center p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 mb-4", children: error || "홀을 찾을 수 없습니다." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: handleBackClick, children: "Back" })
        ] });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-start items-start overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch h-12 px-3 border-b border-line-tertiary-light dark:border-line-tertiary-dark inline-flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded flex justify-start items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "tertiary",
                size: "sm",
                isIconOnly: true,
                onClick: handleBackClick,
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {}),
                showLeftIcon: true
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug", children: hole.name }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "tertiary",
                size: "sm",
                isIconOnly: true,
                onClick: handleAddClick,
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(AddIcon, {}),
                showLeftIcon: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "tertiary",
                size: "sm",
                isIconOnly: true,
                onClick: () => {
                },
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowIcon, {}),
                showLeftIcon: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-80 rounded-2xl flex flex-col justify-between items-center w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 flex-1 inline-flex justify-center items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-2 pt-2 inline-flex flex-col justify-start items-start gap-2 overflow-auto max-h-full", children: sessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            List,
            {
              type: "default",
              state: selectedSessionId === session.id ? "selected" : listHoverState === session.id ? "hover" : "default",
              label: session.name,
              count: session.insightCount,
              onClick: () => handleSessionClick(session.id)
            },
            session.id
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              size: "lg",
              disabled: !selectedSessionId,
              onClick: handleStartDiggin,
              className: "self-stretch h-12 min-w-[240px] px-5 rounded-lg flex justify-center items-center",
              children: "Start Diggin"
            }
          ) })
        ] })
      ] });
    };
    const getSessionEntries = (sessionId, pageSize = 20, lastDoc) => __async(exports, null, function* () {
      try {
        let entriesQuery = query(
          collection(db, "textEntries"),
          where("sessionId", "==", sessionId),
          orderBy("capturedAt", "desc"),
          limit(pageSize + 1)
          // Get one extra to check if there are more
        );
        if (lastDoc) ;
        const querySnapshot = yield getDocs(entriesQuery);
        const entries = [];
        const hasMore = querySnapshot.docs.length > pageSize;
        const docsToProcess = hasMore ? querySnapshot.docs.slice(0, pageSize) : querySnapshot.docs;
        docsToProcess.forEach((doc2) => {
          entries.push(__spreadValues({ id: doc2.id }, doc2.data()));
        });
        const newLastDoc = querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null;
        return {
          entries,
          lastDoc: newLastDoc,
          hasMore
        };
      } catch (error) {
        console.error("Error getting session entries:", error);
        throw error;
      }
    });
    const OnSessionPage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const state = location.state;
      const [hole, setHole] = reactExports.useState(null);
      const [session, setSession] = reactExports.useState(null);
      const [loading, setLoading] = reactExports.useState(true);
      const [error, setError] = reactExports.useState(null);
      const [isActive, setIsActive] = reactExports.useState(true);
      const [displayDuration, setDisplayDuration] = reactExports.useState(0);
      const [insights, setInsights] = reactExports.useState([]);
      const [insightCount, setInsightCount] = reactExports.useState(0);
      const [isFirstStart, setIsFirstStart] = reactExports.useState(true);
      const timerRef = reactExports.useRef(null);
      const savedDurationRef = reactExports.useRef(0);
      const sessionStartTimeRef = reactExports.useRef(/* @__PURE__ */ new Date());
      const sessionIntentionallyEndedRef = reactExports.useRef(false);
      const calculateCurrentDuration = reactExports.useCallback(() => {
        if (!isActive || !sessionStartTimeRef.current) {
          return savedDurationRef.current;
        }
        const currentTime = Date.now();
        const sessionElapsedMs = currentTime - sessionStartTimeRef.current.getTime();
        const sessionElapsedSeconds = Math.floor(sessionElapsedMs / 1e3);
        return savedDurationRef.current + sessionElapsedSeconds;
      }, [isActive]);
      const formatDuration2 = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        const secs = seconds % 60;
        const formattedTime = [
          hours.toString().padStart(2, "0"),
          minutes.toString().padStart(2, "0"),
          secs.toString().padStart(2, "0")
        ].join(":");
        return formattedTime;
      };
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          if (!(state == null ? void 0 : state.holeId) || !(state == null ? void 0 : state.sessionId)) {
            navigate("/hole-list", { replace: true });
            return;
          }
          try {
            setLoading(true);
            const getBackgroundSessionState = () => {
              return new Promise((resolve) => {
                chrome.runtime.sendMessage({
                  type: "GET_SESSION_STATUS",
                  sessionId: state.sessionId
                }, (response) => {
                  console.log("Background session status response:", response);
                  if (response && response.sessionId === state.sessionId) {
                    resolve({
                      isActive: response.isActive,
                      duration: response.duration
                    });
                  } else {
                    resolve(null);
                  }
                });
                setTimeout(() => resolve(null), 1e3);
              });
            };
            const backgroundState = yield getBackgroundSessionState();
            const holeData = yield getHole(state.holeId);
            if (!holeData) {
              throw new Error("Hole not found");
            }
            setHole(holeData);
            const sessionData = yield getSession(state.sessionId);
            if (!sessionData) {
              throw new Error("Session not found");
            }
            setSession(sessionData);
            let initialDuration = 0;
            if (backgroundState && typeof backgroundState.duration === "number") {
              console.log(`Using duration from background: ${backgroundState.duration} seconds`);
              initialDuration = backgroundState.duration;
            }
            if (typeof sessionData.totalDuration === "number") {
              console.log(`Using duration from Firestore: ${sessionData.totalDuration} seconds`);
              initialDuration = Math.max(initialDuration, sessionData.totalDuration);
            }
            console.log(`Setting initial duration to ${initialDuration} seconds`);
            savedDurationRef.current = initialDuration;
            setDisplayDuration(initialDuration);
            const isAlreadyActive = backgroundState ? backgroundState.isActive : false;
            if (!isAlreadyActive) {
              yield updateSessionActiveStatus(state.sessionId, true);
              setIsActive(true);
              sessionStartTimeRef.current = /* @__PURE__ */ new Date();
              chrome.runtime.sendMessage({
                action: "START_SESSION",
                data: {
                  sessionId: state.sessionId,
                  holeId: state.holeId,
                  sessionName: state.sessionName,
                  savedDuration: initialDuration
                }
              }, (response) => {
                if (response && response.success) {
                  console.log("[DIGGIN] OnSessionPage: Session started in background script");
                  setIsFirstStart(false);
                } else {
                  console.error("[DIGGIN] OnSessionPage: Failed to start session in background:", response == null ? void 0 : response.error);
                }
              });
            } else {
              setIsActive(true);
              sessionStartTimeRef.current = /* @__PURE__ */ new Date();
              console.log("Session is already active in background, syncing state");
              chrome.runtime.sendMessage({
                action: "SESSION_CONTINUE",
                data: {
                  sessionId: state.sessionId,
                  holeId: state.holeId,
                  sessionName: state.sessionName,
                  savedDuration: initialDuration
                }
              }, (response) => {
                console.log("[DIGGIN] OnSessionPage: Session continue response:", response);
              });
            }
            const insightData = yield getSessionEntries(state.sessionId);
            setInsights(insightData.entries);
            setInsightCount(insightData.entries.length);
          } catch (err) {
            console.error("데이터 로드 실패:", err);
            setError("세션 정보를 불러오는데 실패했습니다.");
          } finally {
            setLoading(false);
          }
        }));
        return () => unsubscribe();
      }, [navigate, state]);
      const startTimer = reactExports.useCallback(() => {
        if (timerRef.current !== null) {
          console.log("Timer already running, clearing previous timer");
          window.clearInterval(timerRef.current);
        }
        const startingDuration = savedDurationRef.current;
        console.log(`Starting timer with saved duration: ${startingDuration} seconds`);
        setDisplayDuration(startingDuration);
        timerRef.current = window.setInterval(() => {
          setDisplayDuration((prev) => {
            const newDuration = prev + 1;
            if (newDuration % 60 === 0) {
              if (session == null ? void 0 : session.id) {
                updateSessionDuration(session.id, newDuration).catch(console.error);
              }
              savedDurationRef.current = newDuration;
            }
            return newDuration;
          });
        }, 1e3);
        console.log("Timer started with interval ID:", timerRef.current);
      }, [session]);
      const handleBackClick = () => {
        if (session && isActive) {
          updateSessionDuration(session.id, displayDuration).catch(console.error);
        }
        navigate("/session-list", { state: { holeId: state.holeId } });
      };
      const saveCurrentTime = () => __async(exports, null, function* () {
        if (!session) return;
        try {
          const currentDuration = calculateCurrentDuration();
          yield updateSessionDuration(session.id, currentDuration);
          savedDurationRef.current = currentDuration;
        } catch (err) {
          console.error("시간 저장 실패:", err);
        }
      });
      const finishSession = () => __async(exports, null, function* () {
        try {
          sessionIntentionallyEndedRef.current = true;
          console.log("[DIGGIN] OnSessionPage: Session intentionally ended by user (Stop button)");
          setLoading(true);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsActive(false);
          localStorage.removeItem("activeSession");
          localStorage.setItem("sessionEnded", "true");
          setTimeout(() => {
            localStorage.removeItem("sessionEnded");
            console.log("[DIGGIN] OnSessionPage: Cleared sessionEnded flag after timeout");
          }, 6e4);
          const sessionRef = doc(db, "sessions", state.sessionId);
          let finalDuration = savedDurationRef.current;
          if (sessionStartTimeRef.current) {
            const now = /* @__PURE__ */ new Date();
            finalDuration += Math.floor((now.getTime() - sessionStartTimeRef.current.getTime()) / 1e3);
          }
          yield updateDoc(sessionRef, {
            totalDuration: finalDuration,
            isActive: false,
            endedAt: Timestamp.now()
          });
          chrome.runtime.sendMessage({
            action: "END_SESSION",
            data: { sessionId: state.sessionId }
          }, (response) => {
            console.log("[DIGGIN] OnSessionPage: END_SESSION response:", response);
            if (response == null ? void 0 : response.success) {
              console.log("[DIGGIN] OnSessionPage: Session ended with final duration:", response.finalDuration);
            } else {
              console.error("[DIGGIN] OnSessionPage: Error ending session:", response == null ? void 0 : response.error);
            }
          });
          navigate("/finish-session", {
            state: {
              holeId: state.holeId,
              sessionId: state.sessionId,
              sessionName: state.sessionName,
              duration: finalDuration,
              insightCount
            }
          });
        } catch (error2) {
          console.error("[DIGGIN] OnSessionPage: Error finishing session:", error2);
          setError("Failed to finish the session");
        } finally {
          setLoading(false);
        }
      });
      const toggleSession = reactExports.useCallback(() => __async(exports, null, function* () {
        if (!session) return;
        try {
          if (isActive) {
            setIsActive(false);
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            const currentTime = /* @__PURE__ */ new Date();
            const startTime = new Date(sessionStartTimeRef.current);
            const elapsedTime = Math.floor((currentTime.getTime() - startTime.getTime()) / 1e3);
            const totalDuration = savedDurationRef.current + elapsedTime;
            savedDurationRef.current = totalDuration;
            console.log("[DIGGIN] OnSessionPage: Updating Firestore - Setting session inactive, duration:", totalDuration);
            yield updateSessionActiveStatus(session.id, false);
            yield updateSessionDuration(session.id, totalDuration);
            console.log("[DIGGIN] OnSessionPage: Firestore update completed - Session paused");
            console.log("[DIGGIN] OnSessionPage: Sending PAUSE_SESSION to Realtime Database");
            chrome.runtime.sendMessage({
              action: "PAUSE_SESSION",
              data: {
                sessionId: session.id,
                holeId: (hole == null ? void 0 : hole.id) || "",
                sessionName: session.name
              }
            }, (response) => {
              console.log("[DIGGIN] OnSessionPage: Realtime Database pause response:", response);
              if (response && response.savedDuration !== void 0) {
                savedDurationRef.current = response.savedDuration;
                console.log("[DIGGIN] OnSessionPage: Updated savedDuration from Realtime DB:", response.savedDuration);
              }
            });
            chrome.runtime.sendMessage({
              action: "GET_SESSION_STATE"
            }, (response) => {
              var _a;
              console.log("[DIGGIN] OnSessionPage: Realtime DB state after pause:", response ? {
                isActive: response.isActive,
                elapsedTimeInSeconds: (_a = response.data) == null ? void 0 : _a.elapsedTimeInSeconds
              } : "No response");
            });
          } else {
            setIsActive(true);
            sessionStartTimeRef.current = /* @__PURE__ */ new Date();
            if (!timerRef.current) {
              timerRef.current = setInterval(() => {
                const now = /* @__PURE__ */ new Date();
                const startTime = new Date(sessionStartTimeRef.current);
                const elapsedTime = Math.floor((now.getTime() - startTime.getTime()) / 1e3);
                const totalDuration = savedDurationRef.current + elapsedTime;
                setDisplayDuration(totalDuration);
              }, 1e3);
            }
            console.log("[DIGGIN] OnSessionPage: Updating Firestore - Setting session active");
            yield updateSessionActiveStatus(session.id, true);
            console.log("[DIGGIN] OnSessionPage: Firestore update completed - Session resumed");
            console.log("[DIGGIN] OnSessionPage: Sending RESUME_SESSION to Realtime Database");
            chrome.runtime.sendMessage({
              action: "RESUME_SESSION",
              data: {
                sessionId: session.id,
                holeId: (hole == null ? void 0 : hole.id) || "",
                sessionName: session.name,
                savedDuration: savedDurationRef.current
              }
            }, (response) => {
              console.log("[DIGGIN] OnSessionPage: Realtime Database resume response:", response);
            });
            chrome.runtime.sendMessage({
              action: "GET_SESSION_STATE"
            }, (response) => {
              var _a;
              console.log("[DIGGIN] OnSessionPage: Realtime DB state after resume:", response ? {
                isActive: response.isActive,
                elapsedTimeInSeconds: (_a = response.data) == null ? void 0 : _a.elapsedTimeInSeconds
              } : "No response");
            });
          }
        } catch (err) {
          console.error("세션 상태 변경 실패:", err);
          alert("세션 상태를 변경하는데 실패했습니다.");
        }
      }), [isActive, session, saveCurrentTime]);
      reactExports.useCallback(() => __async(exports, null, function* () {
        if (!session) return;
        try {
          setIsActive(false);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          const currentTime = /* @__PURE__ */ new Date();
          let totalDuration = savedDurationRef.current;
          if (isActive && sessionStartTimeRef.current) {
            const startTime = new Date(sessionStartTimeRef.current);
            const elapsedTime = Math.floor((currentTime.getTime() - startTime.getTime()) / 1e3);
            totalDuration += elapsedTime;
          }
          yield updateSessionActiveStatus(session.id, false);
          yield updateSessionDuration(session.id, totalDuration);
          chrome.runtime.sendMessage({
            action: "END_SESSION",
            data: {
              sessionId: session.id,
              holeId: (hole == null ? void 0 : hole.id) || ""
            }
          }, (response) => {
            console.log("[DIGGIN] OnSessionPage: Session stopped response:", response);
            if (response && response.finalDuration !== void 0) {
              const finalDuration = response.finalDuration;
              console.log("[DIGGIN] OnSessionPage: Final session duration:", finalDuration);
            }
          });
          try {
            const port = chrome.runtime.connect({ name: "clipboard" });
            port.postMessage({
              action: "CONNECTION_TEST",
              timestamp: Date.now()
            });
            console.log("[DIGGIN] OnSessionPage: Clipboard connection established before unmount");
          } catch (err) {
            console.error("[DIGGIN] OnSessionPage: Failed to establish clipboard connection:", err);
          }
        } catch (err) {
          console.error("Failed to stop timer:", err);
        }
      }), [isActive, session, navigate]);
      reactExports.useEffect(() => {
        console.log("Session timer effect triggered", {
          hasSession: !!session,
          loading,
          isActive,
          timerRunning: timerRef.current !== null
        });
        if (session && !loading && isActive) {
          console.log("Starting timer from effect");
          startTimer();
        }
        return () => {
          if (timerRef.current !== null) {
            console.log("Clearing timer on unmount from timer effect");
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
        };
      }, [session, loading, isActive, startTimer]);
      reactExports.useEffect(() => {
        const handleVisibilityChange = () => {
          if (document.hidden) {
            if (session && isActive) {
              console.log(`Saving duration on visibility change: ${displayDuration} seconds`);
              updateSessionDuration(session.id, displayDuration).catch(console.error);
              savedDurationRef.current = displayDuration;
            }
          }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
      }, [session, isActive, displayDuration]);
      const handleCopy = reactExports.useCallback((e) => __async(exports, null, function* () {
        var _a;
        console.log("Copy event detected!");
        if (!session || !hole || !auth.currentUser) {
          console.log("Missing required data:", {
            hasSession: !!session,
            hasHole: !!hole,
            hasUser: !!auth.currentUser
          });
          return;
        }
        try {
          let copiedText;
          try {
            copiedText = yield navigator.clipboard.readText();
          } catch (clipboardError) {
            console.log("Failed to read clipboard:", clipboardError);
            copiedText = (_a = e.clipboardData) == null ? void 0 : _a.getData("text/plain");
          }
          if (!copiedText) {
            console.log("No text content found in clipboard");
            return;
          }
          console.log("Copied text:", copiedText);
          const currentUrl = window.location.href;
          let sourceDomain;
          try {
            sourceDomain = new URL(currentUrl).hostname;
          } catch (error2) {
            console.error("Failed to extract domain:", error2);
            sourceDomain = "unknown";
          }
          console.log("Current URL:", currentUrl, "Domain:", sourceDomain);
          console.log("Creating text entry in Firebase with data:", {
            sessionId: session.id,
            content: copiedText,
            sourceUrl: currentUrl,
            sourceDomain
          });
          const entriesCollection = collection(db, "textEntries");
          const docRef = yield addDoc(entriesCollection, {
            sessionId: session.id,
            holeId: hole.id,
            content: copiedText,
            sourceUrl: currentUrl,
            sourceDomain,
            capturedAt: serverTimestamp(),
            isBookmarked: false
          });
          console.log("Text entry successfully saved to Firebase with ID:", docRef.id);
          console.log("Refreshing insights list...");
          const insightData = yield getSessionEntries(session.id);
          setInsights(insightData.entries);
          setInsightCount(insightData.entries.length);
          console.log("Insights list updated:", {
            totalInsights: insightData.entries.length,
            latestInsight: insightData.entries[0]
          });
        } catch (err) {
          console.error("Failed to save copied text:", err);
        }
      }), [session, hole]);
      reactExports.useEffect(() => {
        if (isActive) {
          document.addEventListener("copy", handleCopy);
        }
        return () => {
          document.removeEventListener("copy", handleCopy);
        };
      }, [isActive, handleCopy]);
      reactExports.useEffect(() => {
        console.log("[DIGGIN] OnSessionPage: Component mounted");
        function initSession() {
          return __async(this, null, function* () {
            let sessionId = state == null ? void 0 : state.sessionId;
            let holeId = state == null ? void 0 : state.holeId;
            let sessionName = state == null ? void 0 : state.sessionName;
            if (!sessionId || !holeId) {
              console.log("[DIGGIN] OnSessionPage: Missing state, checking for active session");
              try {
                const activeSession = yield new Promise((resolve) => {
                  chrome.runtime.sendMessage(
                    { action: "CHECK_ACTIVE_SESSION" },
                    (response) => {
                      if ((response == null ? void 0 : response.success) && (response == null ? void 0 : response.hasActiveSession) && (response == null ? void 0 : response.activeSession)) {
                        console.log("[DIGGIN] OnSessionPage: Found active session", response.activeSession);
                        resolve(response.activeSession);
                      } else {
                        console.log("[DIGGIN] OnSessionPage: No active session found");
                        resolve(null);
                      }
                    }
                  );
                  setTimeout(() => resolve(null), 2e3);
                });
                if (activeSession && activeSession.sessionId && activeSession.holeId) {
                  sessionId = activeSession.sessionId;
                  holeId = activeSession.holeId;
                  sessionName = activeSession.sessionName || "";
                  console.log("[DIGGIN] OnSessionPage: Using active session data:", { sessionId, holeId, sessionName });
                } else {
                  console.error("[DIGGIN] OnSessionPage: No session ID found from state or active session");
                  navigate("/");
                  return;
                }
              } catch (error2) {
                console.error("[DIGGIN] OnSessionPage: Error getting active session:", error2);
                navigate("/");
                return;
              }
            }
            chrome.runtime.sendMessage({
              action: "GET_SESSION_STATE"
            }, (response) => {
              console.log("[DIGGIN] OnSessionPage: Current Realtime DB session state:", response ? {
                isActive: response.isActive,
                authenticated: response.authenticated,
                sessionData: response.data
              } : "No response");
            });
            chrome.runtime.sendMessage({
              action: "START_SESSION",
              data: {
                sessionId,
                holeId,
                sessionName
              }
            }, (response) => {
              if (response == null ? void 0 : response.success) {
                console.log("[DIGGIN] OnSessionPage: Session started in Realtime Database successfully");
              } else {
                console.error("[DIGGIN] OnSessionPage: Failed to start session in Realtime Database:", response == null ? void 0 : response.error);
              }
            });
          });
        }
        initSession();
        return () => {
          console.log("[DIGGIN] OnSessionPage: Component unmounting");
          if (sessionIntentionallyEndedRef.current) {
            console.log("[DIGGIN] OnSessionPage: Session was intentionally ended, not sending SESSION_CONTINUE");
            return;
          }
          console.log("[DIGGIN] OnSessionPage: Session was not ended, sending SESSION_CONTINUE");
          if (!session) {
            console.log("[DIGGIN] OnSessionPage: No session data available on unmount");
            if (state == null ? void 0 : state.sessionId) {
              chrome.runtime.sendMessage({
                action: "SESSION_CONTINUE",
                data: {
                  sessionId: state.sessionId,
                  holeId: state.holeId,
                  sessionName: state.sessionName
                }
              }, (response) => {
                console.log("[DIGGIN] OnSessionPage: Session continuation (using state) response:", response);
              });
            }
            return;
          }
          const finalDuration = calculateCurrentDuration();
          console.log("[DIGGIN] OnSessionPage: Final duration on unmount:", finalDuration, "seconds");
          if (session.id) {
            updateSessionDuration(session.id, finalDuration).then(() => {
              console.log("[DIGGIN] OnSessionPage: Duration saved to Firestore on unmount");
            }).catch((error2) => {
              console.error("[DIGGIN] OnSessionPage: Error saving duration to Firestore on unmount:", error2);
            });
          }
          chrome.runtime.sendMessage({
            action: "SESSION_CONTINUE",
            data: {
              sessionId: session.id,
              holeId: (hole == null ? void 0 : hole.id) || (state == null ? void 0 : state.holeId),
              sessionName: session.name || (state == null ? void 0 : state.sessionName),
              savedDuration: finalDuration
            }
          }, (response) => {
            console.log("[DIGGIN] OnSessionPage: Session continuation message response:", response);
          });
          try {
            const port = chrome.runtime.connect({ name: "clipboard" });
            port.postMessage({
              action: "CONNECTION_TEST",
              timestamp: Date.now()
            });
            console.log("[DIGGIN] OnSessionPage: Clipboard connection established before unmount");
          } catch (err) {
            console.error("[DIGGIN] OnSessionPage: Failed to establish clipboard connection:", err);
          }
        };
      }, [calculateCurrentDuration, navigate, state, session, hole]);
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-primary-light dark:text-text-primary-dark", children: "로딩 중..." }) });
      }
      if (error || !hole || !session) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex flex-col items-center justify-center p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 mb-4", children: error || "세션 정보를 찾을 수 없습니다." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: handleBackClick, children: "Back" })
        ] });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-start items-start overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch h-12 px-3 border-b border-line-tertiary-light dark:border-line-tertiary-dark inline-flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded flex justify-start items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "tertiary",
              size: "sm",
              isIconOnly: true,
              onClick: handleBackClick,
              leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {}),
              showLeftIcon: true
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 relative overflow-hidden flex items-center justify-center", children: hole.icon && getIconById$1(hole.icon) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug", children: hole.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded flex justify-start items-center gap-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 py-5 rounded-2xl flex flex-col justify-center items-center gap-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex-1 flex flex-col justify-start items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch text-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium leading-snug", children: session.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 flex flex-col justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 bg-gray-200 rounded-[100px]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex flex-col justify-start items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch px-2 inline-flex justify-start items-start gap-2 flex-wrap content-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-3 py-2 bg-fill-onsurface-light dark:bg-fill-onsurface-dark rounded-lg inline-flex flex-col justify-start items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex justify-center items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 relative flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TimeIcon, { className: "w-3.5 h-3.5 text-icon-secondary-light dark:text-icon-secondary-dark" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-none", children: "Time Spent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-center text-base font-medium leading-snug ${isActive ? "text-text-primary-light dark:text-text-primary-dark" : "text-text-tertiary-light dark:text-text-tertiary-dark"}`, children: formatDuration2(displayDuration) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-3 py-2 bg-fill-onsurface-light dark:bg-fill-onsurface-dark rounded-lg inline-flex flex-col justify-start items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex justify-center items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 relative flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LightbulbIcon, { className: "w-3.5 h-3.5 text-icon-secondary-light dark:text-icon-secondary-dark" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-none", children: "Insights Collected" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-center text-base font-medium leading-snug ${isActive ? "text-text-primary-light dark:text-text-primary-dark" : "text-text-tertiary-light dark:text-text-tertiary-dark"}`, children: insightCount })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex justify-start items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: toggleSession,
                className: "w-12 h-12 p-3 bg-fill-primary-light dark:bg-fill-primary-dark text-icon-inverted-light dark:text-icon-inverted-dark rounded-[20px] flex justify-center items-center gap-2.5",
                children: isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(PauseIcon, { className: "w-6 h-6 text-icon-inverted-light dark:text-icon-inverted-dark" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PlayIcon, { className: "w-6 h-6 text-icon-inverted-light dark:text-icon-inverted-dark" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "w-12 h-12 p-3 bg-fill-onsurface-light dark:bg-fill-onsurface-dark rounded-[20px] flex justify-center items-center",
                onClick: finishSession,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(StopIcon, { className: "w-6 h-6 text-icon-inverted-light dark:text-icon-inverted-dark" })
              }
            )
          ] })
        ] }) })
      ] });
    };
    const getIconById$1 = (iconId) => {
      if (iconId === "utility-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(SearchIcon, {});
      if (iconId === "utility-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(AddIcon, {});
      if (iconId === "utility-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(EditIcon, {});
      if (iconId === "utility-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, {});
      if (iconId === "utility-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {});
      if (iconId === "utility-6") return /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {});
      if (iconId === "utility-7") return /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {});
      if (iconId === "utility-8") return /* @__PURE__ */ jsxRuntimeExports.jsx(LinkIcon, {});
      if (iconId === "utility-9") return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingIcon, {});
      if (iconId === "utility-10") return /* @__PURE__ */ jsxRuntimeExports.jsx(FilterIcon, {});
      if (iconId === "media-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(PlayIcon, {});
      if (iconId === "media-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(PauseIcon, {});
      if (iconId === "media-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(StopIcon, {});
      if (iconId === "media-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveIcon, {});
      if (iconId === "media-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(HideTabIcon, {});
      if (iconId === "media-6") return /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightIcon, {});
      if (iconId === "media-7") return /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, {});
      if (iconId === "media-8") return /* @__PURE__ */ jsxRuntimeExports.jsx(ReorderIcon, {});
      if (iconId === "media-9") return /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowIcon, {});
      if (iconId === "media-10") return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRightIcon, {});
      if (iconId === "other-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(TimeIcon, {});
      if (iconId === "other-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(HourglassIcon, {});
      if (iconId === "other-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(LightbulbIcon, {});
      if (iconId === "other-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(TripleStarsIcon, {});
      if (iconId === "other-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {});
      return /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {});
    };
    const formatDuration = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      const secs = seconds % 60;
      return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        secs.toString().padStart(2, "0")
      ].join(":");
    };
    const getIconById = (iconId) => {
      if (iconId === "utility-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(SearchIcon, {});
      if (iconId === "utility-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(AddIcon, {});
      if (iconId === "utility-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(EditIcon, {});
      if (iconId === "utility-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, {});
      if (iconId === "utility-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {});
      if (iconId === "utility-6") return /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {});
      if (iconId === "utility-7") return /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {});
      if (iconId === "utility-8") return /* @__PURE__ */ jsxRuntimeExports.jsx(LinkIcon, {});
      if (iconId === "utility-9") return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingIcon, {});
      if (iconId === "utility-10") return /* @__PURE__ */ jsxRuntimeExports.jsx(FilterIcon, {});
      if (iconId === "media-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(PlayIcon, {});
      if (iconId === "media-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(PauseIcon, {});
      if (iconId === "media-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(StopIcon, {});
      if (iconId === "media-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveIcon, {});
      if (iconId === "media-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(HideTabIcon, {});
      if (iconId === "media-6") return /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightIcon, {});
      if (iconId === "media-7") return /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, {});
      if (iconId === "media-8") return /* @__PURE__ */ jsxRuntimeExports.jsx(ReorderIcon, {});
      if (iconId === "media-9") return /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowIcon, {});
      if (iconId === "media-10") return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRightIcon, {});
      if (iconId === "other-1") return /* @__PURE__ */ jsxRuntimeExports.jsx(TimeIcon, {});
      if (iconId === "other-2") return /* @__PURE__ */ jsxRuntimeExports.jsx(HourglassIcon, {});
      if (iconId === "other-3") return /* @__PURE__ */ jsxRuntimeExports.jsx(LightbulbIcon, {});
      if (iconId === "other-4") return /* @__PURE__ */ jsxRuntimeExports.jsx(TripleStarsIcon, {});
      if (iconId === "other-5") return /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {});
      return /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {});
    };
    const FinishSessionPage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const state = location.state;
      const [hole, setHole] = reactExports.useState(null);
      const [loading, setLoading] = reactExports.useState(true);
      const [error, setError] = reactExports.useState(null);
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          if (!(state == null ? void 0 : state.holeId) || !(state == null ? void 0 : state.sessionId)) {
            navigate("/hole-list", { replace: true });
            return;
          }
          try {
            setLoading(true);
            const holeData = yield getHole(state.holeId);
            if (!holeData) {
              throw new Error("Hole not found");
            }
            setHole(holeData);
          } catch (err) {
            console.error("홀 정보 가져오기 실패:", err);
            setError("홀 정보를 불러오는데 실패했습니다.");
          } finally {
            setLoading(false);
          }
        }));
        return () => unsubscribe();
      }, [navigate, state]);
      const handleBackClick = () => {
        navigate("/hole-list");
      };
      const handleCheckHoleClick = () => {
        navigate("/hole-list");
      };
      const handleBackToHomeClick = () => {
        navigate("/hole-list");
      };
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-primary-light dark:text-text-primary-dark", children: "로딩 중..." }) });
      }
      if (error || !hole) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex flex-col items-center justify-center p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 mb-4", children: error || "홀을 찾을 수 없습니다." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: handleBackClick, children: "Back" })
        ] });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-start items-center overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch h-12 px-3 inline-flex justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center items-center gap-3 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 relative overflow-hidden flex items-center justify-center", children: hole.icon && getIconById(hole.icon) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug", children: hole.name })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[348px] rounded-2xl flex flex-col justify-between items-center w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch flex-1 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch px-3 py-2 bg-gray-50 rounded-lg flex flex-col justify-start items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-lg-md\n             leading-none", children: state.sessionName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex justify-center items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TimeIcon, { className: "w-3.5 h-3.5 text-icon-secondary-light dark:text-icon-secondary-dark" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-body-md-md leading-none", children: "Time Spent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-md-md leading-none", children: formatDuration(state.duration) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex justify-center items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TripleStarsIcon, { className: "w-3.5 h-3.5 text-icon-secondary-light dark:text-icon-secondary-dark" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-text-secondary-light dark:text-text-secondary-dark text-body-md-md leading-none", children: "Insights Collected" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-body-md-md leading-none", children: state.insightCount })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch px-2 pb-2 flex flex-col justify-start items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "primary",
                size: "lg",
                onClick: handleCheckHoleClick,
                className: "w-[304px] h-12 px-5 rounded-lg flex justify-center items-center",
                children: "Check the hole"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "tertiary",
                size: "lg",
                onClick: handleBackToHomeClick,
                className: "w-[304px] h-12 px-5 rounded-lg flex justify-center items-center",
                children: "Back to home"
              }
            )
          ] })
        ] })
      ] });
    };
    const TEMPLATE_SESSIONS = {
      "design-thinking": [
        "Empathize",
        "Define",
        "Ideate",
        "Prototype",
        "Test"
      ],
      "double-diamond": [
        "Discover",
        "Define",
        "Develop",
        "Deliver"
      ],
      "bm-canvas": [
        "Customer Segments",
        "Value Propositions",
        "Channels",
        "Customer Relationships",
        "Revenue Streams",
        "Key Activities",
        "Key Resources",
        "Key Partners",
        "Cost Structure"
      ],
      "jtbd": [
        "Situations",
        "Motivations",
        "Desired Outcomes",
        "Functional Jobs",
        "Emotional Jobs",
        "Social Jobs"
      ]
    };
    const TemplateListPage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const state = location.state;
      const [hole, setHole] = reactExports.useState(null);
      const [loading, setLoading] = reactExports.useState(true);
      const [error, setError] = reactExports.useState(null);
      const [sessions, setSessions] = reactExports.useState([]);
      const [selectedSessionId, setSelectedSessionId] = reactExports.useState(null);
      const [listHoverState, setListHoverState] = reactExports.useState(null);
      const [selectedTemplateId, setSelectedTemplateId] = reactExports.useState(null);
      const [isCreating, setIsCreating] = reactExports.useState(false);
      reactExports.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => __async(exports, null, function* () {
          if (!user) {
            navigate("/", { replace: true });
            return;
          }
          if (!(state == null ? void 0 : state.holeId)) {
            navigate("/hole-list", { replace: true });
            return;
          }
          try {
            setLoading(true);
            const holeData = yield getHole(state.holeId);
            if (!holeData) {
              throw new Error("Hole not found");
            }
            setHole(holeData);
            const sessionsList = yield getHoleSessions(state.holeId);
            const sessionItems = sessionsList.map((session) => ({
              id: session.id,
              name: session.name,
              insightCount: 0
              // TODO: insight 수를 가져오는 로직 추가 필요
            }));
            setSessions(sessionItems);
          } catch (err) {
            console.error("홀 정보 가져오기 실패:", err);
            setError("홀 정보를 불러오는데 실패했습니다.");
          } finally {
            setLoading(false);
          }
        }));
        return () => unsubscribe();
      }, [navigate, state]);
      const handleBackClick = () => {
        navigate("/empty-session", { state: { holeId: state.holeId } });
      };
      const handleStartDiggin = () => __async(exports, null, function* () {
        if (!selectedTemplateId || !hole) return;
        try {
          setIsCreating(true);
          const sessions2 = TEMPLATE_SESSIONS[selectedTemplateId];
          console.log(sessions2);
          for (const sessionName of sessions2) {
            try {
              yield createSession(hole.id, sessionName);
              console.log(sessionName);
            } catch (err) {
              console.error(`세션 "${sessionName}" 생성 실패:`, err);
              throw err;
            }
          }
          navigate("/session-list", {
            state: {
              holeId: hole.id,
              refresh: true
              // 세션 목록을 새로고침하도록 표시
            }
          });
        } catch (err) {
          console.error("세션 생성 실패:", err);
          setError("세션 생성에 실패했습니다.");
        } finally {
          setIsCreating(false);
        }
      });
      const handleTemplateSelect = (templateId) => {
        setSelectedTemplateId(templateId === selectedTemplateId ? null : templateId);
      };
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-primary-light dark:text-text-primary-dark", children: "로딩 중..." }) });
      }
      if (error || !hole) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black flex flex-col items-center justify-center p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 mb-4", children: error || "홀을 찾을 수 없습니다." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", onClick: handleBackClick, children: "Back" })
        ] });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 h-[400px] bg-white dark:bg-black inline-flex flex-col justify-start items-start overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch h-12 px-3 border-b border-line-tertiary-light dark:border-line-tertiary-dark inline-flex justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded flex justify-start items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "tertiary",
              size: "sm",
              isIconOnly: true,
              onClick: handleBackClick,
              leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {}),
              showLeftIcon: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center justify-center text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-snug", children: hole.name }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-80 rounded-2xl flex flex-col justify-between items-center w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-80 flex-1 inline-flex justify-center items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-3 pt-3 inline-flex flex-col justify-start items-start gap-2 overflow-auto max-h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `w-full h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer ${selectedTemplateId === "design-thinking" ? "bg-gray-50 outline-line-secondary-light" : ""}`,
                onClick: () => handleTemplateSelect("design-thinking"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex flex-col justify-start items-start gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate", children: "🎨 💭" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate", children: "Design Thinking" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-rg self-stretch h-[32px] justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden", children: "Empathize, Define, Ideate, Prototype, Test" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `w-full h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer ${selectedTemplateId === "double-diamond" ? "bg-gray-50 outline-line-secondary-light" : ""}`,
                onClick: () => handleTemplateSelect("double-diamond"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex flex-col justify-start items-start gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate", children: "💎 💎" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch justify-center text-text-primary-light dark:text-text-primary-dark text-caption-md-md leading-none truncate", children: "Double Diamond" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden", children: "Discover, Define, Develop, Deliver" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `w-full h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer ${selectedTemplateId === "bm-canvas" ? "bg-gray-50 outline-line-secondary-light" : ""}`,
                onClick: () => handleTemplateSelect("bm-canvas"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex flex-col justify-start items-start gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate", children: "💼 📋" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch justify-center text-text-primary-light dark:text-text-primary-dark text-caption-md-md leading-none truncate", children: "BM Canvas" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden", children: "Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Activities, Key Resources, Key Partners, Cost Structure" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `w-full h-[100px] p-3 bg-surface-bg-light dark:bg-surface-bg-dark rounded-lg outline outline-1 outline-offset-[-1px] outline-line-tertiary-light dark:outline-line-tertiary-dark inline-flex flex-col justify-start items-start gap-2 cursor-pointer ${selectedTemplateId === "jtbd" ? "bg-gray-50 outline-line-secondary-light" : ""}`,
                onClick: () => handleTemplateSelect("jtbd"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch flex flex-col justify-start items-start gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-md self-stretch justify-center text-text-primary-light dark:text-text-primary-dark leading-none truncate", children: "📎 ✅" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch justify-center text-text-primary-light dark:text-text-primary-dark text-caption-md-md leading-none truncate", children: "JTBD" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-caption-md-rg self-stretch h-8 justify-center text-text-secondary-light dark:text-text-secondary-dark leading-none line-clamp-2 overflow-hidden", children: "Situations, Motivations, Desired Outcomes, Functional Jobs, Emotional Jobs, Social Jobs" })
                ]
              }
            )
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch px-2 pb-2 flex flex-col justify-start items-start gap-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              size: "lg",
              disabled: !selectedTemplateId || isCreating,
              onClick: handleStartDiggin,
              className: "self-stretch h-12 min-w-[240px] px-5 rounded-lg flex justify-center items-center",
              children: isCreating ? "Creating Sessions..." : "Select"
            }
          ) })
        ] })
      ] });
    };
    function isExtensionEnvironment() {
      return typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id;
    }
    function checkActiveSession() {
      return new Promise((resolve, reject) => {
        if (!isExtensionEnvironment()) {
          console.log("Not in extension environment, skipping active session check");
          resolve({ hasActiveSession: false });
          return;
        }
        chrome.runtime.sendMessage({
          action: "CHECK_ACTIVE_SESSION"
        }, (response) => {
          var _a, _b, _c, _d;
          if (chrome.runtime.lastError) {
            console.error("Error checking active session:", chrome.runtime.lastError);
            reject(chrome.runtime.lastError);
            return;
          }
          if (response == null ? void 0 : response.success) {
            resolve({
              hasActiveSession: response.hasActiveSession,
              sessionId: (_a = response.activeSession) == null ? void 0 : _a.sessionId,
              holeId: (_b = response.activeSession) == null ? void 0 : _b.holeId,
              sessionName: (_c = response.activeSession) == null ? void 0 : _c.sessionName,
              elapsedTimeInSeconds: (_d = response.activeSession) == null ? void 0 : _d.elapsedTimeInSeconds
            });
          } else {
            console.error("Failed to check active session:", response == null ? void 0 : response.error);
            resolve({ hasActiveSession: false });
          }
        });
      });
    }
    const App = () => {
      var _a;
      const [user, setUser] = reactExports.useState(null);
      const [loading, setLoading] = reactExports.useState(true);
      const [initialRoute, setInitialRoute] = reactExports.useState("/");
      const [activeSession, setActiveSession] = reactExports.useState(null);
      console.log("App 컴포넌트 렌더링", {
        isExtension: isExtensionEnvironment(),
        hasRuntime: !!((_a = window.chrome) == null ? void 0 : _a.runtime)
      });
      reactExports.useEffect(() => {
        console.log("App useEffect 실행");
        const checkAuth = () => __async(exports, null, function* () {
          console.log("직접 Firebase 인증 상태 확인");
          try {
            const unsubscribe = onAuthStateChange(handleAuthChange);
            const timeoutId = setTimeout(() => {
              console.log("🚨 Auth check timed out after 5 seconds, forcing loading to false");
              setLoading(false);
            }, 5e3);
            return () => {
              unsubscribe();
              clearTimeout(timeoutId);
            };
          } catch (error) {
            console.error("Error checking auth state:", error);
            setLoading(false);
          }
        });
        const handleAuthChange = (currentUser) => __async(exports, null, function* () {
          console.log("Auth state changed:", currentUser ? "Logged in" : "Logged out");
          setUser(currentUser);
          if (currentUser) {
            try {
              console.log("[DIGGIN] App: Checking for active session...");
              const activeSessionResult = yield checkActiveSession();
              if (activeSessionResult.hasActiveSession && activeSessionResult.sessionId) {
                console.log("[DIGGIN] App: Found active session:", activeSessionResult);
                const sessionData = {
                  sessionId: activeSessionResult.sessionId,
                  holeId: activeSessionResult.holeId,
                  sessionName: activeSessionResult.sessionName,
                  elapsedTimeInSeconds: activeSessionResult.elapsedTimeInSeconds
                };
                setActiveSession(sessionData);
                console.log("[DIGGIN] App: Redirecting to active session page with data:", sessionData);
                setInitialRoute("/session");
                setLoading(false);
                return;
              } else {
                console.log("[DIGGIN] App: No active session found");
              }
            } catch (error) {
              console.error("[DIGGIN] App: Error checking active session:", error);
            }
            try {
              console.log("Fetching user holes in handleAuthChange...");
              const userHoles = yield getUserHoles(currentUser.uid);
              console.log("User holes in handleAuthChange:", userHoles);
              if (userHoles.length > 0) {
                console.log("User has holes, navigating to /hole-list");
                setInitialRoute("/hole-list");
              } else {
                console.log("User has no holes, navigating to /main");
                setInitialRoute("/main");
              }
            } catch (error) {
              console.error("Error checking user holes:", error);
              setInitialRoute("/");
            }
          } else {
            console.log("No user, navigating to /");
            setInitialRoute("/");
          }
          console.log("Setting loading to false in handleAuthChange");
          setLoading(false);
        });
        checkAuth();
      }, []);
      console.log("App 렌더링 상태:", { loading, user, initialRoute, activeSession });
      if (loading) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[320px] h-[400px] font-pretendard flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." }) });
      }
      let initialEntryState = null;
      if (initialRoute === "/session" && activeSession) {
        initialEntryState = {
          pathname: "/session",
          state: {
            sessionId: activeSession.sessionId,
            holeId: activeSession.holeId,
            sessionName: activeSession.sessionName || ""
          }
        };
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MemoryRouter, { initialEntries: initialEntryState ? [initialEntryState] : [initialRoute], children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[320px] h-[400px] font-pretendard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: initialRoute, replace: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/main", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(MainPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/hole-list", element: user ? activeSession && activeSession.sessionId && !localStorage.getItem("sessionEnded") ? /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/session", state: {
          sessionId: activeSession.sessionId,
          holeId: activeSession.holeId,
          sessionName: activeSession.sessionName
        }, replace: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(HoleListPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/select-icon", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIconPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/create-hole", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(CreateHolePage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/empty-session", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySessionPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/create-session", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(CreateSessionPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/session-list", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(SessionListPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/session", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(OnSessionPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/finish-session", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(FinishSessionPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/template-list", element: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateListPage, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: user ? initialRoute : "/", replace: true }) })
      ] }) }) });
    };
    client.createRoot(document.getElementById("root")).render(
      /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
    );
  }
});
export default require_index_001();
