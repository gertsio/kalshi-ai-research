(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const f of o)
      if (f.type === "childList")
        for (const d of f.addedNodes) d.tagName === "LINK" && d.rel === "modulepreload" && r(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const f = {};
    return (
      o.integrity && (f.integrity = o.integrity),
      o.referrerPolicy && (f.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (f.credentials = "omit")
          : (f.credentials = "same-origin"),
      f
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const f = s(o);
    fetch(o.href, f);
  }
})();
var tf = { exports: {} },
  ol = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qy;
function jS() {
  if (Qy) return ol;
  Qy = 1;
  var a = Symbol.for("react.transitional.element"),
    n = Symbol.for("react.fragment");
  function s(r, o, f) {
    var d = null;
    if ((f !== void 0 && (d = "" + f), o.key !== void 0 && (d = "" + o.key), "key" in o)) {
      f = {};
      for (var h in o) h !== "key" && (f[h] = o[h]);
    } else f = o;
    return ((o = f.ref), { $$typeof: a, type: r, key: d, ref: o !== void 0 ? o : null, props: f });
  }
  return ((ol.Fragment = n), (ol.jsx = s), (ol.jsxs = s), ol);
}
var Jy;
function VS() {
  return (Jy || ((Jy = 1), (tf.exports = jS())), tf.exports);
}
var _ = VS(),
  ef = { exports: {} },
  vt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Py;
function US() {
  if (Py) return vt;
  Py = 1;
  var a = Symbol.for("react.transitional.element"),
    n = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    d = Symbol.for("react.context"),
    h = Symbol.for("react.forward_ref"),
    y = Symbol.for("react.suspense"),
    p = Symbol.for("react.memo"),
    g = Symbol.for("react.lazy"),
    b = Symbol.for("react.activity"),
    x = Symbol.iterator;
  function w(T) {
    return T === null || typeof T != "object"
      ? null
      : ((T = (x && T[x]) || T["@@iterator"]), typeof T == "function" ? T : null);
  }
  var M = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    N = Object.assign,
    k = {};
  function j(T, B, W) {
    ((this.props = T), (this.context = B), (this.refs = k), (this.updater = W || M));
  }
  ((j.prototype.isReactComponent = {}),
    (j.prototype.setState = function (T, B) {
      if (typeof T != "object" && typeof T != "function" && T != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, T, B, "setState");
    }),
    (j.prototype.forceUpdate = function (T) {
      this.updater.enqueueForceUpdate(this, T, "forceUpdate");
    }));
  function q() {}
  q.prototype = j.prototype;
  function Z(T, B, W) {
    ((this.props = T), (this.context = B), (this.refs = k), (this.updater = W || M));
  }
  var G = (Z.prototype = new q());
  ((G.constructor = Z), N(G, j.prototype), (G.isPureReactComponent = !0));
  var $ = Array.isArray;
  function ot() {}
  var K = { H: null, A: null, T: null, S: null },
    V = Object.prototype.hasOwnProperty;
  function J(T, B, W) {
    var tt = W.ref;
    return { $$typeof: a, type: T, key: B, ref: tt !== void 0 ? tt : null, props: W };
  }
  function et(T, B) {
    return J(T.type, B, T.props);
  }
  function mt(T) {
    return typeof T == "object" && T !== null && T.$$typeof === a;
  }
  function St(T) {
    var B = { "=": "=0", ":": "=2" };
    return (
      "$" +
      T.replace(/[=:]/g, function (W) {
        return B[W];
      })
    );
  }
  var Qt = /\/+/g;
  function Ht(T, B) {
    return typeof T == "object" && T !== null && T.key != null ? St("" + T.key) : B.toString(36);
  }
  function Vt(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (
          (typeof T.status == "string"
            ? T.then(ot, ot)
            : ((T.status = "pending"),
              T.then(
                function (B) {
                  T.status === "pending" && ((T.status = "fulfilled"), (T.value = B));
                },
                function (B) {
                  T.status === "pending" && ((T.status = "rejected"), (T.reason = B));
                },
              )),
          T.status)
        ) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function O(T, B, W, tt, nt) {
    var ct = typeof T;
    (ct === "undefined" || ct === "boolean") && (T = null);
    var At = !1;
    if (T === null) At = !0;
    else
      switch (ct) {
        case "bigint":
        case "string":
        case "number":
          At = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case a:
            case n:
              At = !0;
              break;
            case g:
              return ((At = T._init), O(At(T._payload), B, W, tt, nt));
          }
      }
    if (At)
      return (
        (nt = nt(T)),
        (At = tt === "" ? "." + Ht(T, 0) : tt),
        $(nt)
          ? ((W = ""),
            At != null && (W = At.replace(Qt, "$&/") + "/"),
            O(nt, B, W, "", function (un) {
              return un;
            }))
          : nt != null &&
            (mt(nt) &&
              (nt = et(
                nt,
                W +
                  (nt.key == null || (T && T.key === nt.key) ? "" : ("" + nt.key).replace(Qt, "$&/") + "/") +
                  At,
              )),
            B.push(nt)),
        1
      );
    At = 0;
    var Ft = tt === "" ? "." : tt + ":";
    if ($(T))
      for (var bt = 0; bt < T.length; bt++)
        ((tt = T[bt]), (ct = Ft + Ht(tt, bt)), (At += O(tt, B, W, ct, nt)));
    else if (((bt = w(T)), typeof bt == "function"))
      for (T = bt.call(T), bt = 0; !(tt = T.next()).done; )
        ((tt = tt.value), (ct = Ft + Ht(tt, bt++)), (At += O(tt, B, W, ct, nt)));
    else if (ct === "object") {
      if (typeof T.then == "function") return O(Vt(T), B, W, tt, nt);
      throw (
        (B = String(T)),
        Error(
          "Objects are not valid as a React child (found: " +
            (B === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : B) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return At;
  }
  function X(T, B, W) {
    if (T == null) return T;
    var tt = [],
      nt = 0;
    return (
      O(T, tt, "", "", function (ct) {
        return B.call(W, ct, nt++);
      }),
      tt
    );
  }
  function P(T) {
    if (T._status === -1) {
      var B = T._result;
      ((B = B()),
        B.then(
          function (W) {
            (T._status === 0 || T._status === -1) && ((T._status = 1), (T._result = W));
          },
          function (W) {
            (T._status === 0 || T._status === -1) && ((T._status = 2), (T._result = W));
          },
        ),
        T._status === -1 && ((T._status = 0), (T._result = B)));
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var pt =
      typeof reportError == "function"
        ? reportError
        : function (T) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var B = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof T == "object" && T !== null && typeof T.message == "string"
                    ? String(T.message)
                    : String(T),
                error: T,
              });
              if (!window.dispatchEvent(B)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", T);
              return;
            }
            console.error(T);
          },
    Q = {
      map: X,
      forEach: function (T, B, W) {
        X(
          T,
          function () {
            B.apply(this, arguments);
          },
          W,
        );
      },
      count: function (T) {
        var B = 0;
        return (
          X(T, function () {
            B++;
          }),
          B
        );
      },
      toArray: function (T) {
        return (
          X(T, function (B) {
            return B;
          }) || []
        );
      },
      only: function (T) {
        if (!mt(T)) throw Error("React.Children.only expected to receive a single React element child.");
        return T;
      },
    };
  return (
    (vt.Activity = b),
    (vt.Children = Q),
    (vt.Component = j),
    (vt.Fragment = s),
    (vt.Profiler = o),
    (vt.PureComponent = Z),
    (vt.StrictMode = r),
    (vt.Suspense = y),
    (vt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K),
    (vt.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (T) {
        return K.H.useMemoCache(T);
      },
    }),
    (vt.cache = function (T) {
      return function () {
        return T.apply(null, arguments);
      };
    }),
    (vt.cacheSignal = function () {
      return null;
    }),
    (vt.cloneElement = function (T, B, W) {
      if (T == null) throw Error("The argument must be a React element, but you passed " + T + ".");
      var tt = N({}, T.props),
        nt = T.key;
      if (B != null)
        for (ct in (B.key !== void 0 && (nt = "" + B.key), B))
          !V.call(B, ct) ||
            ct === "key" ||
            ct === "__self" ||
            ct === "__source" ||
            (ct === "ref" && B.ref === void 0) ||
            (tt[ct] = B[ct]);
      var ct = arguments.length - 2;
      if (ct === 1) tt.children = W;
      else if (1 < ct) {
        for (var At = Array(ct), Ft = 0; Ft < ct; Ft++) At[Ft] = arguments[Ft + 2];
        tt.children = At;
      }
      return J(T.type, nt, tt);
    }),
    (vt.createContext = function (T) {
      return (
        (T = {
          $$typeof: d,
          _currentValue: T,
          _currentValue2: T,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (T.Provider = T),
        (T.Consumer = { $$typeof: f, _context: T }),
        T
      );
    }),
    (vt.createElement = function (T, B, W) {
      var tt,
        nt = {},
        ct = null;
      if (B != null)
        for (tt in (B.key !== void 0 && (ct = "" + B.key), B))
          V.call(B, tt) && tt !== "key" && tt !== "__self" && tt !== "__source" && (nt[tt] = B[tt]);
      var At = arguments.length - 2;
      if (At === 1) nt.children = W;
      else if (1 < At) {
        for (var Ft = Array(At), bt = 0; bt < At; bt++) Ft[bt] = arguments[bt + 2];
        nt.children = Ft;
      }
      if (T && T.defaultProps) for (tt in ((At = T.defaultProps), At)) nt[tt] === void 0 && (nt[tt] = At[tt]);
      return J(T, ct, nt);
    }),
    (vt.createRef = function () {
      return { current: null };
    }),
    (vt.forwardRef = function (T) {
      return { $$typeof: h, render: T };
    }),
    (vt.isValidElement = mt),
    (vt.lazy = function (T) {
      return { $$typeof: g, _payload: { _status: -1, _result: T }, _init: P };
    }),
    (vt.memo = function (T, B) {
      return { $$typeof: p, type: T, compare: B === void 0 ? null : B };
    }),
    (vt.startTransition = function (T) {
      var B = K.T,
        W = {};
      K.T = W;
      try {
        var tt = T(),
          nt = K.S;
        (nt !== null && nt(W, tt),
          typeof tt == "object" && tt !== null && typeof tt.then == "function" && tt.then(ot, pt));
      } catch (ct) {
        pt(ct);
      } finally {
        (B !== null && W.types !== null && (B.types = W.types), (K.T = B));
      }
    }),
    (vt.unstable_useCacheRefresh = function () {
      return K.H.useCacheRefresh();
    }),
    (vt.use = function (T) {
      return K.H.use(T);
    }),
    (vt.useActionState = function (T, B, W) {
      return K.H.useActionState(T, B, W);
    }),
    (vt.useCallback = function (T, B) {
      return K.H.useCallback(T, B);
    }),
    (vt.useContext = function (T) {
      return K.H.useContext(T);
    }),
    (vt.useDebugValue = function () {}),
    (vt.useDeferredValue = function (T, B) {
      return K.H.useDeferredValue(T, B);
    }),
    (vt.useEffect = function (T, B) {
      return K.H.useEffect(T, B);
    }),
    (vt.useEffectEvent = function (T) {
      return K.H.useEffectEvent(T);
    }),
    (vt.useId = function () {
      return K.H.useId();
    }),
    (vt.useImperativeHandle = function (T, B, W) {
      return K.H.useImperativeHandle(T, B, W);
    }),
    (vt.useInsertionEffect = function (T, B) {
      return K.H.useInsertionEffect(T, B);
    }),
    (vt.useLayoutEffect = function (T, B) {
      return K.H.useLayoutEffect(T, B);
    }),
    (vt.useMemo = function (T, B) {
      return K.H.useMemo(T, B);
    }),
    (vt.useOptimistic = function (T, B) {
      return K.H.useOptimistic(T, B);
    }),
    (vt.useReducer = function (T, B, W) {
      return K.H.useReducer(T, B, W);
    }),
    (vt.useRef = function (T) {
      return K.H.useRef(T);
    }),
    (vt.useState = function (T) {
      return K.H.useState(T);
    }),
    (vt.useSyncExternalStore = function (T, B, W) {
      return K.H.useSyncExternalStore(T, B, W);
    }),
    (vt.useTransition = function () {
      return K.H.useTransition();
    }),
    (vt.version = "19.2.5"),
    vt
  );
}
var Fy;
function fd() {
  return (Fy || ((Fy = 1), (ef.exports = US())), ef.exports);
}
var F = fd(),
  nf = { exports: {} },
  ul = {},
  af = { exports: {} },
  sf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wy;
function BS() {
  return (
    Wy ||
      ((Wy = 1),
      (function (a) {
        function n(O, X) {
          var P = O.length;
          O.push(X);
          t: for (; 0 < P; ) {
            var pt = (P - 1) >>> 1,
              Q = O[pt];
            if (0 < o(Q, X)) ((O[pt] = X), (O[P] = Q), (P = pt));
            else break t;
          }
        }
        function s(O) {
          return O.length === 0 ? null : O[0];
        }
        function r(O) {
          if (O.length === 0) return null;
          var X = O[0],
            P = O.pop();
          if (P !== X) {
            O[0] = P;
            t: for (var pt = 0, Q = O.length, T = Q >>> 1; pt < T; ) {
              var B = 2 * (pt + 1) - 1,
                W = O[B],
                tt = B + 1,
                nt = O[tt];
              if (0 > o(W, P))
                tt < Q && 0 > o(nt, W)
                  ? ((O[pt] = nt), (O[tt] = P), (pt = tt))
                  : ((O[pt] = W), (O[B] = P), (pt = B));
              else if (tt < Q && 0 > o(nt, P)) ((O[pt] = nt), (O[tt] = P), (pt = tt));
              else break t;
            }
          }
          return X;
        }
        function o(O, X) {
          var P = O.sortIndex - X.sortIndex;
          return P !== 0 ? P : O.id - X.id;
        }
        if (
          ((a.unstable_now = void 0), typeof performance == "object" && typeof performance.now == "function")
        ) {
          var f = performance;
          a.unstable_now = function () {
            return f.now();
          };
        } else {
          var d = Date,
            h = d.now();
          a.unstable_now = function () {
            return d.now() - h;
          };
        }
        var y = [],
          p = [],
          g = 1,
          b = null,
          x = 3,
          w = !1,
          M = !1,
          N = !1,
          k = !1,
          j = typeof setTimeout == "function" ? setTimeout : null,
          q = typeof clearTimeout == "function" ? clearTimeout : null,
          Z = typeof setImmediate < "u" ? setImmediate : null;
        function G(O) {
          for (var X = s(p); X !== null; ) {
            if (X.callback === null) r(p);
            else if (X.startTime <= O) (r(p), (X.sortIndex = X.expirationTime), n(y, X));
            else break;
            X = s(p);
          }
        }
        function $(O) {
          if (((N = !1), G(O), !M))
            if (s(y) !== null) ((M = !0), ot || ((ot = !0), St()));
            else {
              var X = s(p);
              X !== null && Vt($, X.startTime - O);
            }
        }
        var ot = !1,
          K = -1,
          V = 5,
          J = -1;
        function et() {
          return k ? !0 : !(a.unstable_now() - J < V);
        }
        function mt() {
          if (((k = !1), ot)) {
            var O = a.unstable_now();
            J = O;
            var X = !0;
            try {
              t: {
                ((M = !1), N && ((N = !1), q(K), (K = -1)), (w = !0));
                var P = x;
                try {
                  e: {
                    for (G(O), b = s(y); b !== null && !(b.expirationTime > O && et()); ) {
                      var pt = b.callback;
                      if (typeof pt == "function") {
                        ((b.callback = null), (x = b.priorityLevel));
                        var Q = pt(b.expirationTime <= O);
                        if (((O = a.unstable_now()), typeof Q == "function")) {
                          ((b.callback = Q), G(O), (X = !0));
                          break e;
                        }
                        (b === s(y) && r(y), G(O));
                      } else r(y);
                      b = s(y);
                    }
                    if (b !== null) X = !0;
                    else {
                      var T = s(p);
                      (T !== null && Vt($, T.startTime - O), (X = !1));
                    }
                  }
                  break t;
                } finally {
                  ((b = null), (x = P), (w = !1));
                }
                X = void 0;
              }
            } finally {
              X ? St() : (ot = !1);
            }
          }
        }
        var St;
        if (typeof Z == "function")
          St = function () {
            Z(mt);
          };
        else if (typeof MessageChannel < "u") {
          var Qt = new MessageChannel(),
            Ht = Qt.port2;
          ((Qt.port1.onmessage = mt),
            (St = function () {
              Ht.postMessage(null);
            }));
        } else
          St = function () {
            j(mt, 0);
          };
        function Vt(O, X) {
          K = j(function () {
            O(a.unstable_now());
          }, X);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (O) {
            O.callback = null;
          }),
          (a.unstable_forceFrameRate = function (O) {
            0 > O || 125 < O
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (V = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (a.unstable_next = function (O) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = x;
            }
            var P = x;
            x = X;
            try {
              return O();
            } finally {
              x = P;
            }
          }),
          (a.unstable_requestPaint = function () {
            k = !0;
          }),
          (a.unstable_runWithPriority = function (O, X) {
            switch (O) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                O = 3;
            }
            var P = x;
            x = O;
            try {
              return X();
            } finally {
              x = P;
            }
          }),
          (a.unstable_scheduleCallback = function (O, X, P) {
            var pt = a.unstable_now();
            switch (
              (typeof P == "object" && P !== null
                ? ((P = P.delay), (P = typeof P == "number" && 0 < P ? pt + P : pt))
                : (P = pt),
              O)
            ) {
              case 1:
                var Q = -1;
                break;
              case 2:
                Q = 250;
                break;
              case 5:
                Q = 1073741823;
                break;
              case 4:
                Q = 1e4;
                break;
              default:
                Q = 5e3;
            }
            return (
              (Q = P + Q),
              (O = {
                id: g++,
                callback: X,
                priorityLevel: O,
                startTime: P,
                expirationTime: Q,
                sortIndex: -1,
              }),
              P > pt
                ? ((O.sortIndex = P),
                  n(p, O),
                  s(y) === null && O === s(p) && (N ? (q(K), (K = -1)) : (N = !0), Vt($, P - pt)))
                : ((O.sortIndex = Q), n(y, O), M || w || ((M = !0), ot || ((ot = !0), St()))),
              O
            );
          }),
          (a.unstable_shouldYield = et),
          (a.unstable_wrapCallback = function (O) {
            var X = x;
            return function () {
              var P = x;
              x = X;
              try {
                return O.apply(this, arguments);
              } finally {
                x = P;
              }
            };
          }));
      })(sf)),
    sf
  );
}
var $y;
function LS() {
  return ($y || (($y = 1), (af.exports = BS())), af.exports);
}
var lf = { exports: {} },
  _e = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Iy;
function HS() {
  if (Iy) return _e;
  Iy = 1;
  var a = fd();
  function n(y) {
    var p = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++) p += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return (
      "Minified React error #" +
      y +
      "; visit " +
      p +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s() {}
  var r = {
      d: {
        f: s,
        r: function () {
          throw Error(n(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    o = Symbol.for("react.portal");
  function f(y, p, g) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: o, key: b == null ? null : "" + b, children: y, containerInfo: p, implementation: g };
  }
  var d = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(y, p) {
    if (y === "font") return "";
    if (typeof p == "string") return p === "use-credentials" ? p : "";
  }
  return (
    (_e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (_e.createPortal = function (y, p) {
      var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)) throw Error(n(299));
      return f(y, p, null, g);
    }),
    (_e.flushSync = function (y) {
      var p = d.T,
        g = r.p;
      try {
        if (((d.T = null), (r.p = 2), y)) return y();
      } finally {
        ((d.T = p), (r.p = g), r.d.f());
      }
    }),
    (_e.preconnect = function (y, p) {
      typeof y == "string" &&
        (p
          ? ((p = p.crossOrigin), (p = typeof p == "string" ? (p === "use-credentials" ? p : "") : void 0))
          : (p = null),
        r.d.C(y, p));
    }),
    (_e.prefetchDNS = function (y) {
      typeof y == "string" && r.d.D(y);
    }),
    (_e.preinit = function (y, p) {
      if (typeof y == "string" && p && typeof p.as == "string") {
        var g = p.as,
          b = h(g, p.crossOrigin),
          x = typeof p.integrity == "string" ? p.integrity : void 0,
          w = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
        g === "style"
          ? r.d.S(y, typeof p.precedence == "string" ? p.precedence : void 0, {
              crossOrigin: b,
              integrity: x,
              fetchPriority: w,
            })
          : g === "script" &&
            r.d.X(y, {
              crossOrigin: b,
              integrity: x,
              fetchPriority: w,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
      }
    }),
    (_e.preinitModule = function (y, p) {
      if (typeof y == "string")
        if (typeof p == "object" && p !== null) {
          if (p.as == null || p.as === "script") {
            var g = h(p.as, p.crossOrigin);
            r.d.M(y, {
              crossOrigin: g,
              integrity: typeof p.integrity == "string" ? p.integrity : void 0,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
          }
        } else p == null && r.d.M(y);
    }),
    (_e.preload = function (y, p) {
      if (typeof y == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
        var g = p.as,
          b = h(g, p.crossOrigin);
        r.d.L(y, g, {
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          type: typeof p.type == "string" ? p.type : void 0,
          fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
          referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
          imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
          media: typeof p.media == "string" ? p.media : void 0,
        });
      }
    }),
    (_e.preloadModule = function (y, p) {
      if (typeof y == "string")
        if (p) {
          var g = h(p.as, p.crossOrigin);
          r.d.m(y, {
            as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
            crossOrigin: g,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          });
        } else r.d.m(y);
    }),
    (_e.requestFormReset = function (y) {
      r.d.r(y);
    }),
    (_e.unstable_batchedUpdates = function (y, p) {
      return y(p);
    }),
    (_e.useFormState = function (y, p, g) {
      return d.H.useFormState(y, p, g);
    }),
    (_e.useFormStatus = function () {
      return d.H.useHostTransitionStatus();
    }),
    (_e.version = "19.2.5"),
    _e
  );
}
var tg;
function ZS() {
  if (tg) return lf.exports;
  tg = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (n) {
        console.error(n);
      }
  }
  return (a(), (lf.exports = HS()), lf.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var eg;
function GS() {
  if (eg) return ul;
  eg = 1;
  var a = LS(),
    n = fd(),
    s = ZS();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++) e += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      e +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function f(t) {
    var e = t,
      i = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do ((e = t), (e.flags & 4098) !== 0 && (i = e.return), (t = e.return));
      while (t);
    }
    return e.tag === 3 ? i : null;
  }
  function d(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function y(t) {
    if (f(t) !== t) throw Error(r(188));
  }
  function p(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = f(t)), e === null)) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var i = t, l = e; ; ) {
      var u = i.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (((l = u.return), l !== null)) {
          i = l;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === i) return (y(u), t);
          if (c === l) return (y(u), e);
          c = c.sibling;
        }
        throw Error(r(188));
      }
      if (i.return !== l.return) ((i = u), (l = c));
      else {
        for (var m = !1, v = u.child; v; ) {
          if (v === i) {
            ((m = !0), (i = u), (l = c));
            break;
          }
          if (v === l) {
            ((m = !0), (l = u), (i = c));
            break;
          }
          v = v.sibling;
        }
        if (!m) {
          for (v = c.child; v; ) {
            if (v === i) {
              ((m = !0), (i = c), (l = u));
              break;
            }
            if (v === l) {
              ((m = !0), (l = c), (i = u));
              break;
            }
            v = v.sibling;
          }
          if (!m) throw Error(r(189));
        }
      }
      if (i.alternate !== l) throw Error(r(190));
    }
    if (i.tag !== 3) throw Error(r(188));
    return i.stateNode.current === i ? t : e;
  }
  function g(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = g(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var b = Object.assign,
    x = Symbol.for("react.element"),
    w = Symbol.for("react.transitional.element"),
    M = Symbol.for("react.portal"),
    N = Symbol.for("react.fragment"),
    k = Symbol.for("react.strict_mode"),
    j = Symbol.for("react.profiler"),
    q = Symbol.for("react.consumer"),
    Z = Symbol.for("react.context"),
    G = Symbol.for("react.forward_ref"),
    $ = Symbol.for("react.suspense"),
    ot = Symbol.for("react.suspense_list"),
    K = Symbol.for("react.memo"),
    V = Symbol.for("react.lazy"),
    J = Symbol.for("react.activity"),
    et = Symbol.for("react.memo_cache_sentinel"),
    mt = Symbol.iterator;
  function St(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (mt && t[mt]) || t["@@iterator"]), typeof t == "function" ? t : null);
  }
  var Qt = Symbol.for("react.client.reference");
  function Ht(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.$$typeof === Qt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case N:
        return "Fragment";
      case j:
        return "Profiler";
      case k:
        return "StrictMode";
      case $:
        return "Suspense";
      case ot:
        return "SuspenseList";
      case J:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case M:
          return "Portal";
        case Z:
          return t.displayName || "Context";
        case q:
          return (t._context.displayName || "Context") + ".Consumer";
        case G:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ""), (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case K:
          return ((e = t.displayName || null), e !== null ? e : Ht(t.type) || "Memo");
        case V:
          ((e = t._payload), (t = t._init));
          try {
            return Ht(t(e));
          } catch {}
      }
    return null;
  }
  var Vt = Array.isArray,
    O = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    P = { pending: !1, data: null, method: null, action: null },
    pt = [],
    Q = -1;
  function T(t) {
    return { current: t };
  }
  function B(t) {
    0 > Q || ((t.current = pt[Q]), (pt[Q] = null), Q--);
  }
  function W(t, e) {
    (Q++, (pt[Q] = t.current), (t.current = e));
  }
  var tt = T(null),
    nt = T(null),
    ct = T(null),
    At = T(null);
  function Ft(t, e) {
    switch ((W(ct, e), W(nt, t), W(tt, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? yy(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = yy(e)), (t = gy(e, t)));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (B(tt), W(tt, t));
  }
  function bt() {
    (B(tt), B(nt), B(ct));
  }
  function un(t) {
    t.memoizedState !== null && W(At, t);
    var e = tt.current,
      i = gy(e, t.type);
    e !== i && (W(nt, t), W(tt, i));
  }
  function Je(t) {
    (nt.current === t && (B(tt), B(nt)), At.current === t && (B(At), (il._currentValue = P)));
  }
  var ye, wn;
  function Ee(t) {
    if (ye === void 0)
      try {
        throw Error();
      } catch (i) {
        var e = i.stack.trim().match(/\n( *(at )?)/);
        ((ye = (e && e[1]) || ""),
          (wn =
            -1 <
            i.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < i.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      ye +
      t +
      wn
    );
  }
  var ps = !1;
  function mi(t, e) {
    if (!t || ps) return "";
    ps = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var H = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(H.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(H, []);
                } catch (z) {
                  var R = z;
                }
                Reflect.construct(t, [], H);
              } else {
                try {
                  H.call();
                } catch (z) {
                  R = z;
                }
                t.call(H.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (z) {
                R = z;
              }
              (H = t()) && typeof H.catch == "function" && H.catch(function () {});
            }
          } catch (z) {
            if (z && R && typeof z.stack == "string") return [z.stack, R.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, "name");
      u &&
        u.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var c = l.DetermineComponentFrameRoot(),
        m = c[0],
        v = c[1];
      if (m && v) {
        var S = m.split(`
`),
          D = v.split(`
`);
        for (u = l = 0; l < S.length && !S[l].includes("DetermineComponentFrameRoot"); ) l++;
        for (; u < D.length && !D[u].includes("DetermineComponentFrameRoot"); ) u++;
        if (l === S.length || u === D.length)
          for (l = S.length - 1, u = D.length - 1; 1 <= l && 0 <= u && S[l] !== D[u]; ) u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (S[l] !== D[u]) {
            if (l !== 1 || u !== 1)
              do
                if ((l--, u--, 0 > u || S[l] !== D[u])) {
                  var U =
                    `
` + S[l].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      U.includes("<anonymous>") &&
                      (U = U.replace("<anonymous>", t.displayName)),
                    U
                  );
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      ((ps = !1), (Error.prepareStackTrace = i));
    }
    return (i = t ? t.displayName || t.name : "") ? Ee(i) : "";
  }
  function ja(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ee(t.type);
      case 16:
        return Ee("Lazy");
      case 13:
        return t.child !== e && e !== null ? Ee("Suspense Fallback") : Ee("Suspense");
      case 19:
        return Ee("SuspenseList");
      case 0:
      case 15:
        return mi(t.type, !1);
      case 11:
        return mi(t.type.render, !1);
      case 1:
        return mi(t.type, !0);
      case 31:
        return Ee("Activity");
      default:
        return "";
    }
  }
  function Qd(t) {
    try {
      var e = "",
        i = null;
      do ((e += ja(t, i)), (i = t), (t = t.return));
      while (t);
      return e;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  var Lo = Object.prototype.hasOwnProperty,
    Ho = a.unstable_scheduleCallback,
    Zo = a.unstable_cancelCallback,
    hx = a.unstable_shouldYield,
    mx = a.unstable_requestPaint,
    Ue = a.unstable_now,
    px = a.unstable_getCurrentPriorityLevel,
    Jd = a.unstable_ImmediatePriority,
    Pd = a.unstable_UserBlockingPriority,
    kl = a.unstable_NormalPriority,
    yx = a.unstable_LowPriority,
    Fd = a.unstable_IdlePriority,
    gx = a.log,
    vx = a.unstable_setDisableYieldValue,
    ys = null,
    Be = null;
  function Wn(t) {
    if ((typeof gx == "function" && vx(t), Be && typeof Be.setStrictMode == "function"))
      try {
        Be.setStrictMode(ys, t);
      } catch {}
  }
  var Le = Math.clz32 ? Math.clz32 : Sx,
    bx = Math.log,
    xx = Math.LN2;
  function Sx(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((bx(t) / xx) | 0)) | 0);
  }
  var Nl = 256,
    jl = 262144,
    Vl = 4194304;
  function Va(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
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
        return 64;
      case 128:
        return 128;
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Ul(t, e, i) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var u = 0,
      c = t.suspendedLanes,
      m = t.pingedLanes;
    t = t.warmLanes;
    var v = l & 134217727;
    return (
      v !== 0
        ? ((l = v & ~c),
          l !== 0
            ? (u = Va(l))
            : ((m &= v), m !== 0 ? (u = Va(m)) : i || ((i = v & ~t), i !== 0 && (u = Va(i)))))
        : ((v = l & ~c),
          v !== 0 ? (u = Va(v)) : m !== 0 ? (u = Va(m)) : i || ((i = l & ~t), i !== 0 && (u = Va(i)))),
      u === 0
        ? 0
        : e !== 0 &&
            e !== u &&
            (e & c) === 0 &&
            ((c = u & -u), (i = e & -e), c >= i || (c === 32 && (i & 4194048) !== 0))
          ? e
          : u
    );
  }
  function gs(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Tx(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
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
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Wd() {
    var t = Vl;
    return ((Vl <<= 1), (Vl & 62914560) === 0 && (Vl = 4194304), t);
  }
  function Go(t) {
    for (var e = [], i = 0; 31 > i; i++) e.push(t);
    return e;
  }
  function vs(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function Ax(t, e, i, l, u, c) {
    var m = t.pendingLanes;
    ((t.pendingLanes = i),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= i),
      (t.entangledLanes &= i),
      (t.errorRecoveryDisabledLanes &= i),
      (t.shellSuspendCounter = 0));
    var v = t.entanglements,
      S = t.expirationTimes,
      D = t.hiddenUpdates;
    for (i = m & ~i; 0 < i; ) {
      var U = 31 - Le(i),
        H = 1 << U;
      ((v[U] = 0), (S[U] = -1));
      var R = D[U];
      if (R !== null)
        for (D[U] = null, U = 0; U < R.length; U++) {
          var z = R[U];
          z !== null && (z.lane &= -536870913);
        }
      i &= ~H;
    }
    (l !== 0 && $d(t, l, 0), c !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= c & ~(m & ~e)));
  }
  function $d(t, e, i) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var l = 31 - Le(e);
    ((t.entangledLanes |= e), (t.entanglements[l] = t.entanglements[l] | 1073741824 | (i & 261930)));
  }
  function Id(t, e) {
    var i = (t.entangledLanes |= e);
    for (t = t.entanglements; i; ) {
      var l = 31 - Le(i),
        u = 1 << l;
      ((u & e) | (t[l] & e) && (t[l] |= e), (i &= ~u));
    }
  }
  function th(t, e) {
    var i = e & -e;
    return ((i = (i & 42) !== 0 ? 1 : qo(i)), (i & (t.suspendedLanes | e)) !== 0 ? 0 : i);
  }
  function qo(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Yo(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function eh() {
    var t = X.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Hy(t.type));
  }
  function nh(t, e) {
    var i = X.p;
    try {
      return ((X.p = t), e());
    } finally {
      X.p = i;
    }
  }
  var $n = Math.random().toString(36).slice(2),
    ge = "__reactFiber$" + $n,
    De = "__reactProps$" + $n,
    pi = "__reactContainer$" + $n,
    Xo = "__reactEvents$" + $n,
    _x = "__reactListeners$" + $n,
    Ex = "__reactHandles$" + $n,
    ah = "__reactResources$" + $n,
    bs = "__reactMarker$" + $n;
  function Ko(t) {
    (delete t[ge], delete t[De], delete t[Xo], delete t[_x], delete t[Ex]);
  }
  function yi(t) {
    var e = t[ge];
    if (e) return e;
    for (var i = t.parentNode; i; ) {
      if ((e = i[pi] || i[ge])) {
        if (((i = e.alternate), e.child !== null || (i !== null && i.child !== null)))
          for (t = _y(t); t !== null; ) {
            if ((i = t[ge])) return i;
            t = _y(t);
          }
        return e;
      }
      ((t = i), (i = t.parentNode));
    }
    return null;
  }
  function gi(t) {
    if ((t = t[ge] || t[pi])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function xs(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function vi(t) {
    var e = t[ah];
    return (e || (e = t[ah] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function me(t) {
    t[bs] = !0;
  }
  var ih = new Set(),
    sh = {};
  function Ua(t, e) {
    (bi(t, e), bi(t + "Capture", e));
  }
  function bi(t, e) {
    for (sh[t] = e, t = 0; t < e.length; t++) ih.add(e[t]);
  }
  var wx = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    lh = {},
    rh = {};
  function Mx(t) {
    return Lo.call(rh, t) ? !0 : Lo.call(lh, t) ? !1 : wx.test(t) ? (rh[t] = !0) : ((lh[t] = !0), !1);
  }
  function Bl(t, e, i) {
    if (Mx(e))
      if (i === null) t.removeAttribute(e);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var l = e.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + i);
      }
  }
  function Ll(t, e, i) {
    if (i === null) t.removeAttribute(e);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + i);
    }
  }
  function Mn(t, e, i, l) {
    if (l === null) t.removeAttribute(i);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(i);
          return;
      }
      t.setAttributeNS(e, i, "" + l);
    }
  }
  function Pe(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function oh(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Cx(t, e, i) {
    var l = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (!t.hasOwnProperty(e) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var u = l.get,
        c = l.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (m) {
            ((i = "" + m), c.call(this, m));
          },
        }),
        Object.defineProperty(t, e, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return i;
          },
          setValue: function (m) {
            i = "" + m;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function Qo(t) {
    if (!t._valueTracker) {
      var e = oh(t) ? "checked" : "value";
      t._valueTracker = Cx(t, e, "" + t[e]);
    }
  }
  function uh(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var i = e.getValue(),
      l = "";
    return (
      t && (l = oh(t) ? (t.checked ? "true" : "false") : t.value),
      (t = l),
      t !== i ? (e.setValue(t), !0) : !1
    );
  }
  function Hl(t) {
    if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Dx = /[\n"\\]/g;
  function Fe(t) {
    return t.replace(Dx, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function Jo(t, e, i, l, u, c, m, v) {
    ((t.name = ""),
      m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean"
        ? (t.type = m)
        : t.removeAttribute("type"),
      e != null
        ? m === "number"
          ? ((e === 0 && t.value === "") || t.value != e) && (t.value = "" + Pe(e))
          : t.value !== "" + Pe(e) && (t.value = "" + Pe(e))
        : (m !== "submit" && m !== "reset") || t.removeAttribute("value"),
      e != null ? Po(t, m, Pe(e)) : i != null ? Po(t, m, Pe(i)) : l != null && t.removeAttribute("value"),
      u == null && c != null && (t.defaultChecked = !!c),
      u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"),
      v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean"
        ? (t.name = "" + Pe(v))
        : t.removeAttribute("name"));
  }
  function ch(t, e, i, l, u, c, m, v) {
    if (
      (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.type = c),
      e != null || i != null)
    ) {
      if (!((c !== "submit" && c !== "reset") || e != null)) {
        Qo(t);
        return;
      }
      ((i = i != null ? "" + Pe(i) : ""),
        (e = e != null ? "" + Pe(e) : i),
        v || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((l = l ?? u),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (t.checked = v ? t.checked : !!l),
      (t.defaultChecked = !!l),
      m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (t.name = m),
      Qo(t));
  }
  function Po(t, e, i) {
    (e === "number" && Hl(t.ownerDocument) === t) || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function xi(t, e, i, l) {
    if (((t = t.options), e)) {
      e = {};
      for (var u = 0; u < i.length; u++) e["$" + i[u]] = !0;
      for (i = 0; i < t.length; i++)
        ((u = e.hasOwnProperty("$" + t[i].value)),
          t[i].selected !== u && (t[i].selected = u),
          u && l && (t[i].defaultSelected = !0));
    } else {
      for (i = "" + Pe(i), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === i) {
          ((t[u].selected = !0), l && (t[u].defaultSelected = !0));
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function fh(t, e, i) {
    if (e != null && ((e = "" + Pe(e)), e !== t.value && (t.value = e), i == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = i != null ? "" + Pe(i) : "";
  }
  function dh(t, e, i, l) {
    if (e == null) {
      if (l != null) {
        if (i != null) throw Error(r(92));
        if (Vt(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        i = l;
      }
      (i == null && (i = ""), (e = i));
    }
    ((i = Pe(e)),
      (t.defaultValue = i),
      (l = t.textContent),
      l === i && l !== "" && l !== null && (t.value = l),
      Qo(t));
  }
  function Si(t, e) {
    if (e) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Rx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function hh(t, e, i) {
    var l = e.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === ""
      ? l
        ? t.setProperty(e, "")
        : e === "float"
          ? (t.cssFloat = "")
          : (t[e] = "")
      : l
        ? t.setProperty(e, i)
        : typeof i != "number" || i === 0 || Rx.has(e)
          ? e === "float"
            ? (t.cssFloat = i)
            : (t[e] = ("" + i).trim())
          : (t[e] = i + "px");
  }
  function mh(t, e, i) {
    if (e != null && typeof e != "object") throw Error(r(62));
    if (((t = t.style), i != null)) {
      for (var l in i)
        !i.hasOwnProperty(l) ||
          (e != null && e.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? (t.cssFloat = "") : (t[l] = ""));
      for (var u in e) ((l = e[u]), e.hasOwnProperty(u) && i[u] !== l && hh(t, u, l));
    } else for (var c in e) e.hasOwnProperty(c) && hh(t, c, e[c]);
  }
  function Fo(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Ox = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    zx =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Zl(t) {
    return zx.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Cn() {}
  var Wo = null;
  function $o(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Ti = null,
    Ai = null;
  function ph(t) {
    var e = gi(t);
    if (e && (t = e.stateNode)) {
      var i = t[De] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case "input":
          if (
            (Jo(t, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name),
            (e = i.name),
            i.type === "radio" && e != null)
          ) {
            for (i = t; i.parentNode; ) i = i.parentNode;
            for (
              i = i.querySelectorAll('input[name="' + Fe("" + e) + '"][type="radio"]'), e = 0;
              e < i.length;
              e++
            ) {
              var l = i[e];
              if (l !== t && l.form === t.form) {
                var u = l[De] || null;
                if (!u) throw Error(r(90));
                Jo(l, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name);
              }
            }
            for (e = 0; e < i.length; e++) ((l = i[e]), l.form === t.form && uh(l));
          }
          break t;
        case "textarea":
          fh(t, i.value, i.defaultValue);
          break t;
        case "select":
          ((e = i.value), e != null && xi(t, !!i.multiple, e, !1));
      }
    }
  }
  var Io = !1;
  function yh(t, e, i) {
    if (Io) return t(e, i);
    Io = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (
        ((Io = !1),
        (Ti !== null || Ai !== null) && (Cr(), Ti && ((e = Ti), (t = Ai), (Ai = Ti = null), ph(e), t)))
      )
        for (e = 0; e < t.length; e++) ph(t[e]);
    }
  }
  function Ss(t, e) {
    var i = t.stateNode;
    if (i === null) return null;
    var l = i[De] || null;
    if (l === null) return null;
    i = l[e];
    t: switch (e) {
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
        ((l = !l.disabled) ||
          ((t = t.type), (l = !(t === "button" || t === "input" || t === "select" || t === "textarea"))),
          (t = !l));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (i && typeof i != "function") throw Error(r(231, e, typeof i));
    return i;
  }
  var Dn = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    tu = !1;
  if (Dn)
    try {
      var Ts = {};
      (Object.defineProperty(Ts, "passive", {
        get: function () {
          tu = !0;
        },
      }),
        window.addEventListener("test", Ts, Ts),
        window.removeEventListener("test", Ts, Ts));
    } catch {
      tu = !1;
    }
  var In = null,
    eu = null,
    Gl = null;
  function gh() {
    if (Gl) return Gl;
    var t,
      e = eu,
      i = e.length,
      l,
      u = "value" in In ? In.value : In.textContent,
      c = u.length;
    for (t = 0; t < i && e[t] === u[t]; t++);
    var m = i - t;
    for (l = 1; l <= m && e[i - l] === u[c - l]; l++);
    return (Gl = u.slice(t, 1 < l ? 1 - l : void 0));
  }
  function ql(t) {
    var e = t.keyCode;
    return (
      "charCode" in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Yl() {
    return !0;
  }
  function vh() {
    return !1;
  }
  function Re(t) {
    function e(i, l, u, c, m) {
      ((this._reactName = i),
        (this._targetInst = u),
        (this.type = l),
        (this.nativeEvent = c),
        (this.target = m),
        (this.currentTarget = null));
      for (var v in t) t.hasOwnProperty(v) && ((i = t[v]), (this[v] = i ? i(c) : c[v]));
      return (
        (this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1)
          ? Yl
          : vh),
        (this.isPropagationStopped = vh),
        this
      );
    }
    return (
      b(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var i = this.nativeEvent;
          i &&
            (i.preventDefault
              ? i.preventDefault()
              : typeof i.returnValue != "unknown" && (i.returnValue = !1),
            (this.isDefaultPrevented = Yl));
        },
        stopPropagation: function () {
          var i = this.nativeEvent;
          i &&
            (i.stopPropagation
              ? i.stopPropagation()
              : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0),
            (this.isPropagationStopped = Yl));
        },
        persist: function () {},
        isPersistent: Yl,
      }),
      e
    );
  }
  var Ba = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Xl = Re(Ba),
    As = b({}, Ba, { view: 0, detail: 0 }),
    kx = Re(As),
    nu,
    au,
    _s,
    Kl = b({}, As, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: su,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== _s &&
              (_s && t.type === "mousemove"
                ? ((nu = t.screenX - _s.screenX), (au = t.screenY - _s.screenY))
                : (au = nu = 0),
              (_s = t)),
            nu);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : au;
      },
    }),
    bh = Re(Kl),
    Nx = b({}, Kl, { dataTransfer: 0 }),
    jx = Re(Nx),
    Vx = b({}, As, { relatedTarget: 0 }),
    iu = Re(Vx),
    Ux = b({}, Ba, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Bx = Re(Ux),
    Lx = b({}, Ba, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Hx = Re(Lx),
    Zx = b({}, Ba, { data: 0 }),
    xh = Re(Zx),
    Gx = {
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
      MozPrintableKey: "Unidentified",
    },
    qx = {
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
      224: "Meta",
    },
    Yx = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Xx(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Yx[t]) ? !!e[t] : !1;
  }
  function su() {
    return Xx;
  }
  var Kx = b({}, As, {
      key: function (t) {
        if (t.key) {
          var e = Gx[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress"
          ? ((t = ql(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? qx[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: su,
      charCode: function (t) {
        return t.type === "keypress" ? ql(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress" ? ql(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
    }),
    Qx = Re(Kx),
    Jx = b({}, Kl, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Sh = Re(Jx),
    Px = b({}, As, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: su,
    }),
    Fx = Re(Px),
    Wx = b({}, Ba, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    $x = Re(Wx),
    Ix = b({}, Kl, {
      deltaX: function (t) {
        return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    t1 = Re(Ix),
    e1 = b({}, Ba, { newState: 0, oldState: 0 }),
    n1 = Re(e1),
    a1 = [9, 13, 27, 32],
    lu = Dn && "CompositionEvent" in window,
    Es = null;
  Dn && "documentMode" in document && (Es = document.documentMode);
  var i1 = Dn && "TextEvent" in window && !Es,
    Th = Dn && (!lu || (Es && 8 < Es && 11 >= Es)),
    Ah = " ",
    _h = !1;
  function Eh(t, e) {
    switch (t) {
      case "keyup":
        return a1.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function wh(t) {
    return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
  }
  var _i = !1;
  function s1(t, e) {
    switch (t) {
      case "compositionend":
        return wh(e);
      case "keypress":
        return e.which !== 32 ? null : ((_h = !0), Ah);
      case "textInput":
        return ((t = e.data), t === Ah && _h ? null : t);
      default:
        return null;
    }
  }
  function l1(t, e) {
    if (_i)
      return t === "compositionend" || (!lu && Eh(t, e))
        ? ((t = gh()), (Gl = eu = In = null), (_i = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Th && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var r1 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Mh(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!r1[t.type] : e === "textarea";
  }
  function Ch(t, e, i, l) {
    (Ti ? (Ai ? Ai.push(l) : (Ai = [l])) : (Ti = l),
      (e = jr(e, "onChange")),
      0 < e.length && ((i = new Xl("onChange", "change", null, i, l)), t.push({ event: i, listeners: e })));
  }
  var ws = null,
    Ms = null;
  function o1(t) {
    cy(t, 0);
  }
  function Ql(t) {
    var e = xs(t);
    if (uh(e)) return t;
  }
  function Dh(t, e) {
    if (t === "change") return e;
  }
  var Rh = !1;
  if (Dn) {
    var ru;
    if (Dn) {
      var ou = "oninput" in document;
      if (!ou) {
        var Oh = document.createElement("div");
        (Oh.setAttribute("oninput", "return;"), (ou = typeof Oh.oninput == "function"));
      }
      ru = ou;
    } else ru = !1;
    Rh = ru && (!document.documentMode || 9 < document.documentMode);
  }
  function zh() {
    ws && (ws.detachEvent("onpropertychange", kh), (Ms = ws = null));
  }
  function kh(t) {
    if (t.propertyName === "value" && Ql(Ms)) {
      var e = [];
      (Ch(e, Ms, t, $o(t)), yh(o1, e));
    }
  }
  function u1(t, e, i) {
    t === "focusin"
      ? (zh(), (ws = e), (Ms = i), ws.attachEvent("onpropertychange", kh))
      : t === "focusout" && zh();
  }
  function c1(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown") return Ql(Ms);
  }
  function f1(t, e) {
    if (t === "click") return Ql(e);
  }
  function d1(t, e) {
    if (t === "input" || t === "change") return Ql(e);
  }
  function h1(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var He = typeof Object.is == "function" ? Object.is : h1;
  function Cs(t, e) {
    if (He(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null) return !1;
    var i = Object.keys(t),
      l = Object.keys(e);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var u = i[l];
      if (!Lo.call(e, u) || !He(t[u], e[u])) return !1;
    }
    return !0;
  }
  function Nh(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function jh(t, e) {
    var i = Nh(t);
    t = 0;
    for (var l; i; ) {
      if (i.nodeType === 3) {
        if (((l = t + i.textContent.length), t <= e && l >= e)) return { node: i, offset: e - t };
        t = l;
      }
      t: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break t;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = Nh(i);
    }
  }
  function Vh(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? Vh(t, e.parentNode)
            : "contains" in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function Uh(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Hl(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var i = typeof e.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) t = e.contentWindow;
      else break;
      e = Hl(t.document);
    }
    return e;
  }
  function uu(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        e === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var m1 = Dn && "documentMode" in document && 11 >= document.documentMode,
    Ei = null,
    cu = null,
    Ds = null,
    fu = !1;
  function Bh(t, e, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    fu ||
      Ei == null ||
      Ei !== Hl(l) ||
      ((l = Ei),
      "selectionStart" in l && uu(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (Ds && Cs(Ds, l)) ||
        ((Ds = l),
        (l = jr(cu, "onSelect")),
        0 < l.length &&
          ((e = new Xl("onSelect", "select", null, e, i)),
          t.push({ event: e, listeners: l }),
          (e.target = Ei))));
  }
  function La(t, e) {
    var i = {};
    return (
      (i[t.toLowerCase()] = e.toLowerCase()),
      (i["Webkit" + t] = "webkit" + e),
      (i["Moz" + t] = "moz" + e),
      i
    );
  }
  var wi = {
      animationend: La("Animation", "AnimationEnd"),
      animationiteration: La("Animation", "AnimationIteration"),
      animationstart: La("Animation", "AnimationStart"),
      transitionrun: La("Transition", "TransitionRun"),
      transitionstart: La("Transition", "TransitionStart"),
      transitioncancel: La("Transition", "TransitionCancel"),
      transitionend: La("Transition", "TransitionEnd"),
    },
    du = {},
    Lh = {};
  Dn &&
    ((Lh = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete wi.animationend.animation,
      delete wi.animationiteration.animation,
      delete wi.animationstart.animation),
    "TransitionEvent" in window || delete wi.transitionend.transition);
  function Ha(t) {
    if (du[t]) return du[t];
    if (!wi[t]) return t;
    var e = wi[t],
      i;
    for (i in e) if (e.hasOwnProperty(i) && i in Lh) return (du[t] = e[i]);
    return t;
  }
  var Hh = Ha("animationend"),
    Zh = Ha("animationiteration"),
    Gh = Ha("animationstart"),
    p1 = Ha("transitionrun"),
    y1 = Ha("transitionstart"),
    g1 = Ha("transitioncancel"),
    qh = Ha("transitionend"),
    Yh = new Map(),
    hu =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  hu.push("scrollEnd");
  function cn(t, e) {
    (Yh.set(t, e), Ua(e, [t]));
  }
  var Jl =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var e = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" && t !== null && typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    We = [],
    Mi = 0,
    mu = 0;
  function Pl() {
    for (var t = Mi, e = (mu = Mi = 0); e < t; ) {
      var i = We[e];
      We[e++] = null;
      var l = We[e];
      We[e++] = null;
      var u = We[e];
      We[e++] = null;
      var c = We[e];
      if (((We[e++] = null), l !== null && u !== null)) {
        var m = l.pending;
        (m === null ? (u.next = u) : ((u.next = m.next), (m.next = u)), (l.pending = u));
      }
      c !== 0 && Xh(i, u, c);
    }
  }
  function Fl(t, e, i, l) {
    ((We[Mi++] = t),
      (We[Mi++] = e),
      (We[Mi++] = i),
      (We[Mi++] = l),
      (mu |= l),
      (t.lanes |= l),
      (t = t.alternate),
      t !== null && (t.lanes |= l));
  }
  function pu(t, e, i, l) {
    return (Fl(t, e, i, l), Wl(t));
  }
  function Za(t, e) {
    return (Fl(t, null, null, e), Wl(t));
  }
  function Xh(t, e, i) {
    t.lanes |= i;
    var l = t.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, c = t.return; c !== null; )
      ((c.childLanes |= i),
        (l = c.alternate),
        l !== null && (l.childLanes |= i),
        c.tag === 22 && ((t = c.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = c),
        (c = c.return));
    return t.tag === 3
      ? ((c = t.stateNode),
        u &&
          e !== null &&
          ((u = 31 - Le(i)),
          (t = c.hiddenUpdates),
          (l = t[u]),
          l === null ? (t[u] = [e]) : l.push(e),
          (e.lane = i | 536870912)),
        c)
      : null;
  }
  function Wl(t) {
    if (50 < Ws) throw ((Ws = 0), (_c = null), Error(r(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ci = {};
  function v1(t, e, i, l) {
    ((this.tag = t),
      (this.key = i),
      (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Ze(t, e, i, l) {
    return new v1(t, e, i, l);
  }
  function yu(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Rn(t, e) {
    var i = t.alternate;
    return (
      i === null
        ? ((i = Ze(t.tag, e, t.key, t.mode)),
          (i.elementType = t.elementType),
          (i.type = t.type),
          (i.stateNode = t.stateNode),
          (i.alternate = t),
          (t.alternate = i))
        : ((i.pendingProps = e),
          (i.type = t.type),
          (i.flags = 0),
          (i.subtreeFlags = 0),
          (i.deletions = null)),
      (i.flags = t.flags & 65011712),
      (i.childLanes = t.childLanes),
      (i.lanes = t.lanes),
      (i.child = t.child),
      (i.memoizedProps = t.memoizedProps),
      (i.memoizedState = t.memoizedState),
      (i.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (i.sibling = t.sibling),
      (i.index = t.index),
      (i.ref = t.ref),
      (i.refCleanup = t.refCleanup),
      i
    );
  }
  function Kh(t, e) {
    t.flags &= 65011714;
    var i = t.alternate;
    return (
      i === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = i.childLanes),
          (t.lanes = i.lanes),
          (t.child = i.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = i.memoizedProps),
          (t.memoizedState = i.memoizedState),
          (t.updateQueue = i.updateQueue),
          (t.type = i.type),
          (e = i.dependencies),
          (t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function $l(t, e, i, l, u, c) {
    var m = 0;
    if (((l = t), typeof t == "function")) yu(t) && (m = 1);
    else if (typeof t == "string")
      m = AS(t, i, tt.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case J:
          return ((t = Ze(31, i, e, u)), (t.elementType = J), (t.lanes = c), t);
        case N:
          return Ga(i.children, u, c, e);
        case k:
          ((m = 8), (u |= 24));
          break;
        case j:
          return ((t = Ze(12, i, e, u | 2)), (t.elementType = j), (t.lanes = c), t);
        case $:
          return ((t = Ze(13, i, e, u)), (t.elementType = $), (t.lanes = c), t);
        case ot:
          return ((t = Ze(19, i, e, u)), (t.elementType = ot), (t.lanes = c), t);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case Z:
                m = 10;
                break t;
              case q:
                m = 9;
                break t;
              case G:
                m = 11;
                break t;
              case K:
                m = 14;
                break t;
              case V:
                ((m = 16), (l = null));
                break t;
            }
          ((m = 29), (i = Error(r(130, t === null ? "null" : typeof t, ""))), (l = null));
      }
    return ((e = Ze(m, i, e, u)), (e.elementType = t), (e.type = l), (e.lanes = c), e);
  }
  function Ga(t, e, i, l) {
    return ((t = Ze(7, t, l, e)), (t.lanes = i), t);
  }
  function gu(t, e, i) {
    return ((t = Ze(6, t, null, e)), (t.lanes = i), t);
  }
  function Qh(t) {
    var e = Ze(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function vu(t, e, i) {
    return (
      (e = Ze(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = i),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Jh = new WeakMap();
  function $e(t, e) {
    if (typeof t == "object" && t !== null) {
      var i = Jh.get(t);
      return i !== void 0 ? i : ((e = { value: t, source: e, stack: Qd(e) }), Jh.set(t, e), e);
    }
    return { value: t, source: e, stack: Qd(e) };
  }
  var Di = [],
    Ri = 0,
    Il = null,
    Rs = 0,
    Ie = [],
    tn = 0,
    ta = null,
    gn = 1,
    vn = "";
  function On(t, e) {
    ((Di[Ri++] = Rs), (Di[Ri++] = Il), (Il = t), (Rs = e));
  }
  function Ph(t, e, i) {
    ((Ie[tn++] = gn), (Ie[tn++] = vn), (Ie[tn++] = ta), (ta = t));
    var l = gn;
    t = vn;
    var u = 32 - Le(l) - 1;
    ((l &= ~(1 << u)), (i += 1));
    var c = 32 - Le(e) + u;
    if (30 < c) {
      var m = u - (u % 5);
      ((c = (l & ((1 << m) - 1)).toString(32)),
        (l >>= m),
        (u -= m),
        (gn = (1 << (32 - Le(e) + u)) | (i << u) | l),
        (vn = c + t));
    } else ((gn = (1 << c) | (i << u) | l), (vn = t));
  }
  function bu(t) {
    t.return !== null && (On(t, 1), Ph(t, 1, 0));
  }
  function xu(t) {
    for (; t === Il; ) ((Il = Di[--Ri]), (Di[Ri] = null), (Rs = Di[--Ri]), (Di[Ri] = null));
    for (; t === ta; )
      ((ta = Ie[--tn]), (Ie[tn] = null), (vn = Ie[--tn]), (Ie[tn] = null), (gn = Ie[--tn]), (Ie[tn] = null));
  }
  function Fh(t, e) {
    ((Ie[tn++] = gn), (Ie[tn++] = vn), (Ie[tn++] = ta), (gn = e.id), (vn = e.overflow), (ta = t));
  }
  var ve = null,
    Jt = null,
    Rt = !1,
    ea = null,
    en = !1,
    Su = Error(r(519));
  function na(t) {
    var e = Error(
      r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""),
    );
    throw (Os($e(e, t)), Su);
  }
  function Wh(t) {
    var e = t.stateNode,
      i = t.type,
      l = t.memoizedProps;
    switch (((e[ge] = t), (e[De] = l), i)) {
      case "dialog":
        (Mt("cancel", e), Mt("close", e));
        break;
      case "iframe":
      case "object":
      case "embed":
        Mt("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Is.length; i++) Mt(Is[i], e);
        break;
      case "source":
        Mt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        (Mt("error", e), Mt("load", e));
        break;
      case "details":
        Mt("toggle", e);
        break;
      case "input":
        (Mt("invalid", e), ch(e, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
        break;
      case "select":
        Mt("invalid", e);
        break;
      case "textarea":
        (Mt("invalid", e), dh(e, l.value, l.defaultValue, l.children));
    }
    ((i = l.children),
      (typeof i != "string" && typeof i != "number" && typeof i != "bigint") ||
      e.textContent === "" + i ||
      l.suppressHydrationWarning === !0 ||
      my(e.textContent, i)
        ? (l.popover != null && (Mt("beforetoggle", e), Mt("toggle", e)),
          l.onScroll != null && Mt("scroll", e),
          l.onScrollEnd != null && Mt("scrollend", e),
          l.onClick != null && (e.onclick = Cn),
          (e = !0))
        : (e = !1),
      e || na(t, !0));
  }
  function $h(t) {
    for (ve = t.return; ve; )
      switch (ve.tag) {
        case 5:
        case 31:
        case 13:
          en = !1;
          return;
        case 27:
        case 3:
          en = !0;
          return;
        default:
          ve = ve.return;
      }
  }
  function Oi(t) {
    if (t !== ve) return !1;
    if (!Rt) return ($h(t), (Rt = !0), !1);
    var e = t.tag,
      i;
    if (
      ((i = e !== 3 && e !== 27) &&
        ((i = e === 5) &&
          ((i = t.type), (i = !(i !== "form" && i !== "button") || Lc(t.type, t.memoizedProps))),
        (i = !i)),
      i && Jt && na(t),
      $h(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(r(317));
      Jt = Ay(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(r(317));
      Jt = Ay(t);
    } else
      e === 27
        ? ((e = Jt), ya(t.type) ? ((t = Yc), (Yc = null), (Jt = t)) : (Jt = e))
        : (Jt = ve ? an(t.stateNode.nextSibling) : null);
    return !0;
  }
  function qa() {
    ((Jt = ve = null), (Rt = !1));
  }
  function Tu() {
    var t = ea;
    return (t !== null && (Ne === null ? (Ne = t) : Ne.push.apply(Ne, t), (ea = null)), t);
  }
  function Os(t) {
    ea === null ? (ea = [t]) : ea.push(t);
  }
  var Au = T(null),
    Ya = null,
    zn = null;
  function aa(t, e, i) {
    (W(Au, e._currentValue), (e._currentValue = i));
  }
  function kn(t) {
    ((t._currentValue = Au.current), B(Au));
  }
  function _u(t, e, i) {
    for (; t !== null; ) {
      var l = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), l !== null && (l.childLanes |= e))
          : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e),
        t === i)
      )
        break;
      t = t.return;
    }
  }
  function Eu(t, e, i, l) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var m = u.child;
        c = c.firstContext;
        t: for (; c !== null; ) {
          var v = c;
          c = u;
          for (var S = 0; S < e.length; S++)
            if (v.context === e[S]) {
              ((c.lanes |= i),
                (v = c.alternate),
                v !== null && (v.lanes |= i),
                _u(c.return, i, t),
                l || (m = null));
              break t;
            }
          c = v.next;
        }
      } else if (u.tag === 18) {
        if (((m = u.return), m === null)) throw Error(r(341));
        ((m.lanes |= i), (c = m.alternate), c !== null && (c.lanes |= i), _u(m, i, t), (m = null));
      } else m = u.child;
      if (m !== null) m.return = u;
      else
        for (m = u; m !== null; ) {
          if (m === t) {
            m = null;
            break;
          }
          if (((u = m.sibling), u !== null)) {
            ((u.return = m.return), (m = u));
            break;
          }
          m = m.return;
        }
      u = m;
    }
  }
  function zi(t, e, i, l) {
    t = null;
    for (var u = e, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var m = u.alternate;
        if (m === null) throw Error(r(387));
        if (((m = m.memoizedProps), m !== null)) {
          var v = u.type;
          He(u.pendingProps.value, m.value) || (t !== null ? t.push(v) : (t = [v]));
        }
      } else if (u === At.current) {
        if (((m = u.alternate), m === null)) throw Error(r(387));
        m.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(il) : (t = [il]));
      }
      u = u.return;
    }
    (t !== null && Eu(e, t, i, l), (e.flags |= 262144));
  }
  function tr(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!He(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Xa(t) {
    ((Ya = t), (zn = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function be(t) {
    return Ih(Ya, t);
  }
  function er(t, e) {
    return (Ya === null && Xa(t), Ih(t, e));
  }
  function Ih(t, e) {
    var i = e._currentValue;
    if (((e = { context: e, memoizedValue: i, next: null }), zn === null)) {
      if (t === null) throw Error(r(308));
      ((zn = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else zn = zn.next = e;
    return i;
  }
  var b1 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (i, l) {
                  t.push(l);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (i) {
                  return i();
                }));
            };
          },
    x1 = a.unstable_scheduleCallback,
    S1 = a.unstable_NormalPriority,
    ie = {
      $$typeof: Z,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function wu() {
    return { controller: new b1(), data: new Map(), refCount: 0 };
  }
  function zs(t) {
    (t.refCount--,
      t.refCount === 0 &&
        x1(S1, function () {
          t.controller.abort();
        }));
  }
  var ks = null,
    Mu = 0,
    ki = 0,
    Ni = null;
  function T1(t, e) {
    if (ks === null) {
      var i = (ks = []);
      ((Mu = 0),
        (ki = Rc()),
        (Ni = {
          status: "pending",
          value: void 0,
          then: function (l) {
            i.push(l);
          },
        }));
    }
    return (Mu++, e.then(tm, tm), e);
  }
  function tm() {
    if (--Mu === 0 && ks !== null) {
      Ni !== null && (Ni.status = "fulfilled");
      var t = ks;
      ((ks = null), (ki = 0), (Ni = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function A1(t, e) {
    var i = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          i.push(u);
        },
      };
    return (
      t.then(
        function () {
          ((l.status = "fulfilled"), (l.value = e));
          for (var u = 0; u < i.length; u++) (0, i[u])(e);
        },
        function (u) {
          for (l.status = "rejected", l.reason = u, u = 0; u < i.length; u++) (0, i[u])(void 0);
        },
      ),
      l
    );
  }
  var em = O.S;
  O.S = function (t, e) {
    ((Bp = Ue()),
      typeof e == "object" && e !== null && typeof e.then == "function" && T1(t, e),
      em !== null && em(t, e));
  };
  var Ka = T(null);
  function Cu() {
    var t = Ka.current;
    return t !== null ? t : Kt.pooledCache;
  }
  function nr(t, e) {
    e === null ? W(Ka, Ka.current) : W(Ka, e.pool);
  }
  function nm() {
    var t = Cu();
    return t === null ? null : { parent: ie._currentValue, pool: t };
  }
  var ji = Error(r(460)),
    Du = Error(r(474)),
    ar = Error(r(542)),
    ir = { then: function () {} };
  function am(t) {
    return ((t = t.status), t === "fulfilled" || t === "rejected");
  }
  function im(t, e, i) {
    switch (((i = t[i]), i === void 0 ? t.push(e) : i !== e && (e.then(Cn, Cn), (e = i)), e.status)) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw ((t = e.reason), lm(t), t);
      default:
        if (typeof e.status == "string") e.then(Cn, Cn);
        else {
          if (((t = Kt), t !== null && 100 < t.shellSuspendCounter)) throw Error(r(482));
          ((t = e),
            (t.status = "pending"),
            t.then(
              function (l) {
                if (e.status === "pending") {
                  var u = e;
                  ((u.status = "fulfilled"), (u.value = l));
                }
              },
              function (l) {
                if (e.status === "pending") {
                  var u = e;
                  ((u.status = "rejected"), (u.reason = l));
                }
              },
            ));
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw ((t = e.reason), lm(t), t);
        }
        throw ((Ja = e), ji);
    }
  }
  function Qa(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? ((Ja = i), ji) : i;
    }
  }
  var Ja = null;
  function sm() {
    if (Ja === null) throw Error(r(459));
    var t = Ja;
    return ((Ja = null), t);
  }
  function lm(t) {
    if (t === ji || t === ar) throw Error(r(483));
  }
  var Vi = null,
    Ns = 0;
  function sr(t) {
    var e = Ns;
    return ((Ns += 1), Vi === null && (Vi = []), im(Vi, t, e));
  }
  function js(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function lr(t, e) {
    throw e.$$typeof === x
      ? Error(r(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(r(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t)));
  }
  function rm(t) {
    function e(E, A) {
      if (t) {
        var C = E.deletions;
        C === null ? ((E.deletions = [A]), (E.flags |= 16)) : C.push(A);
      }
    }
    function i(E, A) {
      if (!t) return null;
      for (; A !== null; ) (e(E, A), (A = A.sibling));
      return null;
    }
    function l(E) {
      for (var A = new Map(); E !== null; )
        (E.key !== null ? A.set(E.key, E) : A.set(E.index, E), (E = E.sibling));
      return A;
    }
    function u(E, A) {
      return ((E = Rn(E, A)), (E.index = 0), (E.sibling = null), E);
    }
    function c(E, A, C) {
      return (
        (E.index = C),
        t
          ? ((C = E.alternate),
            C !== null ? ((C = C.index), C < A ? ((E.flags |= 67108866), A) : C) : ((E.flags |= 67108866), A))
          : ((E.flags |= 1048576), A)
      );
    }
    function m(E) {
      return (t && E.alternate === null && (E.flags |= 67108866), E);
    }
    function v(E, A, C, L) {
      return A === null || A.tag !== 6
        ? ((A = gu(C, E.mode, L)), (A.return = E), A)
        : ((A = u(A, C)), (A.return = E), A);
    }
    function S(E, A, C, L) {
      var dt = C.type;
      return dt === N
        ? U(E, A, C.props.children, L, C.key)
        : A !== null &&
            (A.elementType === dt ||
              (typeof dt == "object" && dt !== null && dt.$$typeof === V && Qa(dt) === A.type))
          ? ((A = u(A, C.props)), js(A, C), (A.return = E), A)
          : ((A = $l(C.type, C.key, C.props, null, E.mode, L)), js(A, C), (A.return = E), A);
    }
    function D(E, A, C, L) {
      return A === null ||
        A.tag !== 4 ||
        A.stateNode.containerInfo !== C.containerInfo ||
        A.stateNode.implementation !== C.implementation
        ? ((A = vu(C, E.mode, L)), (A.return = E), A)
        : ((A = u(A, C.children || [])), (A.return = E), A);
    }
    function U(E, A, C, L, dt) {
      return A === null || A.tag !== 7
        ? ((A = Ga(C, E.mode, L, dt)), (A.return = E), A)
        : ((A = u(A, C)), (A.return = E), A);
    }
    function H(E, A, C) {
      if ((typeof A == "string" && A !== "") || typeof A == "number" || typeof A == "bigint")
        return ((A = gu("" + A, E.mode, C)), (A.return = E), A);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case w:
            return ((C = $l(A.type, A.key, A.props, null, E.mode, C)), js(C, A), (C.return = E), C);
          case M:
            return ((A = vu(A, E.mode, C)), (A.return = E), A);
          case V:
            return ((A = Qa(A)), H(E, A, C));
        }
        if (Vt(A) || St(A)) return ((A = Ga(A, E.mode, C, null)), (A.return = E), A);
        if (typeof A.then == "function") return H(E, sr(A), C);
        if (A.$$typeof === Z) return H(E, er(E, A), C);
        lr(E, A);
      }
      return null;
    }
    function R(E, A, C, L) {
      var dt = A !== null ? A.key : null;
      if ((typeof C == "string" && C !== "") || typeof C == "number" || typeof C == "bigint")
        return dt !== null ? null : v(E, A, "" + C, L);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case w:
            return C.key === dt ? S(E, A, C, L) : null;
          case M:
            return C.key === dt ? D(E, A, C, L) : null;
          case V:
            return ((C = Qa(C)), R(E, A, C, L));
        }
        if (Vt(C) || St(C)) return dt !== null ? null : U(E, A, C, L, null);
        if (typeof C.then == "function") return R(E, A, sr(C), L);
        if (C.$$typeof === Z) return R(E, A, er(E, C), L);
        lr(E, C);
      }
      return null;
    }
    function z(E, A, C, L, dt) {
      if ((typeof L == "string" && L !== "") || typeof L == "number" || typeof L == "bigint")
        return ((E = E.get(C) || null), v(A, E, "" + L, dt));
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case w:
            return ((E = E.get(L.key === null ? C : L.key) || null), S(A, E, L, dt));
          case M:
            return ((E = E.get(L.key === null ? C : L.key) || null), D(A, E, L, dt));
          case V:
            return ((L = Qa(L)), z(E, A, C, L, dt));
        }
        if (Vt(L) || St(L)) return ((E = E.get(C) || null), U(A, E, L, dt, null));
        if (typeof L.then == "function") return z(E, A, C, sr(L), dt);
        if (L.$$typeof === Z) return z(E, A, C, er(A, L), dt);
        lr(A, L);
      }
      return null;
    }
    function at(E, A, C, L) {
      for (var dt = null, Nt = null, ut = A, Tt = (A = 0), Dt = null; ut !== null && Tt < C.length; Tt++) {
        ut.index > Tt ? ((Dt = ut), (ut = null)) : (Dt = ut.sibling);
        var jt = R(E, ut, C[Tt], L);
        if (jt === null) {
          ut === null && (ut = Dt);
          break;
        }
        (t && ut && jt.alternate === null && e(E, ut),
          (A = c(jt, A, Tt)),
          Nt === null ? (dt = jt) : (Nt.sibling = jt),
          (Nt = jt),
          (ut = Dt));
      }
      if (Tt === C.length) return (i(E, ut), Rt && On(E, Tt), dt);
      if (ut === null) {
        for (; Tt < C.length; Tt++)
          ((ut = H(E, C[Tt], L)),
            ut !== null && ((A = c(ut, A, Tt)), Nt === null ? (dt = ut) : (Nt.sibling = ut), (Nt = ut)));
        return (Rt && On(E, Tt), dt);
      }
      for (ut = l(ut); Tt < C.length; Tt++)
        ((Dt = z(ut, E, Tt, C[Tt], L)),
          Dt !== null &&
            (t && Dt.alternate !== null && ut.delete(Dt.key === null ? Tt : Dt.key),
            (A = c(Dt, A, Tt)),
            Nt === null ? (dt = Dt) : (Nt.sibling = Dt),
            (Nt = Dt)));
      return (
        t &&
          ut.forEach(function (Sa) {
            return e(E, Sa);
          }),
        Rt && On(E, Tt),
        dt
      );
    }
    function ht(E, A, C, L) {
      if (C == null) throw Error(r(151));
      for (
        var dt = null, Nt = null, ut = A, Tt = (A = 0), Dt = null, jt = C.next();
        ut !== null && !jt.done;
        Tt++, jt = C.next()
      ) {
        ut.index > Tt ? ((Dt = ut), (ut = null)) : (Dt = ut.sibling);
        var Sa = R(E, ut, jt.value, L);
        if (Sa === null) {
          ut === null && (ut = Dt);
          break;
        }
        (t && ut && Sa.alternate === null && e(E, ut),
          (A = c(Sa, A, Tt)),
          Nt === null ? (dt = Sa) : (Nt.sibling = Sa),
          (Nt = Sa),
          (ut = Dt));
      }
      if (jt.done) return (i(E, ut), Rt && On(E, Tt), dt);
      if (ut === null) {
        for (; !jt.done; Tt++, jt = C.next())
          ((jt = H(E, jt.value, L)),
            jt !== null && ((A = c(jt, A, Tt)), Nt === null ? (dt = jt) : (Nt.sibling = jt), (Nt = jt)));
        return (Rt && On(E, Tt), dt);
      }
      for (ut = l(ut); !jt.done; Tt++, jt = C.next())
        ((jt = z(ut, E, Tt, jt.value, L)),
          jt !== null &&
            (t && jt.alternate !== null && ut.delete(jt.key === null ? Tt : jt.key),
            (A = c(jt, A, Tt)),
            Nt === null ? (dt = jt) : (Nt.sibling = jt),
            (Nt = jt)));
      return (
        t &&
          ut.forEach(function (NS) {
            return e(E, NS);
          }),
        Rt && On(E, Tt),
        dt
      );
    }
    function qt(E, A, C, L) {
      if (
        (typeof C == "object" && C !== null && C.type === N && C.key === null && (C = C.props.children),
        typeof C == "object" && C !== null)
      ) {
        switch (C.$$typeof) {
          case w:
            t: {
              for (var dt = C.key; A !== null; ) {
                if (A.key === dt) {
                  if (((dt = C.type), dt === N)) {
                    if (A.tag === 7) {
                      (i(E, A.sibling), (L = u(A, C.props.children)), (L.return = E), (E = L));
                      break t;
                    }
                  } else if (
                    A.elementType === dt ||
                    (typeof dt == "object" && dt !== null && dt.$$typeof === V && Qa(dt) === A.type)
                  ) {
                    (i(E, A.sibling), (L = u(A, C.props)), js(L, C), (L.return = E), (E = L));
                    break t;
                  }
                  i(E, A);
                  break;
                } else e(E, A);
                A = A.sibling;
              }
              C.type === N
                ? ((L = Ga(C.props.children, E.mode, L, C.key)), (L.return = E), (E = L))
                : ((L = $l(C.type, C.key, C.props, null, E.mode, L)), js(L, C), (L.return = E), (E = L));
            }
            return m(E);
          case M:
            t: {
              for (dt = C.key; A !== null; ) {
                if (A.key === dt)
                  if (
                    A.tag === 4 &&
                    A.stateNode.containerInfo === C.containerInfo &&
                    A.stateNode.implementation === C.implementation
                  ) {
                    (i(E, A.sibling), (L = u(A, C.children || [])), (L.return = E), (E = L));
                    break t;
                  } else {
                    i(E, A);
                    break;
                  }
                else e(E, A);
                A = A.sibling;
              }
              ((L = vu(C, E.mode, L)), (L.return = E), (E = L));
            }
            return m(E);
          case V:
            return ((C = Qa(C)), qt(E, A, C, L));
        }
        if (Vt(C)) return at(E, A, C, L);
        if (St(C)) {
          if (((dt = St(C)), typeof dt != "function")) throw Error(r(150));
          return ((C = dt.call(C)), ht(E, A, C, L));
        }
        if (typeof C.then == "function") return qt(E, A, sr(C), L);
        if (C.$$typeof === Z) return qt(E, A, er(E, C), L);
        lr(E, C);
      }
      return (typeof C == "string" && C !== "") || typeof C == "number" || typeof C == "bigint"
        ? ((C = "" + C),
          A !== null && A.tag === 6
            ? (i(E, A.sibling), (L = u(A, C)), (L.return = E), (E = L))
            : (i(E, A), (L = gu(C, E.mode, L)), (L.return = E), (E = L)),
          m(E))
        : i(E, A);
    }
    return function (E, A, C, L) {
      try {
        Ns = 0;
        var dt = qt(E, A, C, L);
        return ((Vi = null), dt);
      } catch (ut) {
        if (ut === ji || ut === ar) throw ut;
        var Nt = Ze(29, ut, null, E.mode);
        return ((Nt.lanes = L), (Nt.return = E), Nt);
      } finally {
      }
    };
  }
  var Pa = rm(!0),
    om = rm(!1),
    ia = !1;
  function Ru(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Ou(t, e) {
    ((t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function sa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function la(t, e, i) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (Ut & 2) !== 0)) {
      var u = l.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (l.pending = e),
        (e = Wl(t)),
        Xh(t, null, i),
        e
      );
    }
    return (Fl(t, l, e, i), Wl(t));
  }
  function Vs(t, e, i) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (i & 4194048) !== 0))) {
      var l = e.lanes;
      ((l &= t.pendingLanes), (i |= l), (e.lanes = i), Id(t, i));
    }
  }
  function zu(t, e) {
    var i = t.updateQueue,
      l = t.alternate;
    if (l !== null && ((l = l.updateQueue), i === l)) {
      var u = null,
        c = null;
      if (((i = i.firstBaseUpdate), i !== null)) {
        do {
          var m = { lane: i.lane, tag: i.tag, payload: i.payload, callback: null, next: null };
          (c === null ? (u = c = m) : (c = c.next = m), (i = i.next));
        } while (i !== null);
        c === null ? (u = c = e) : (c = c.next = e);
      } else u = c = e;
      ((i = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (t.updateQueue = i));
      return;
    }
    ((t = i.lastBaseUpdate), t === null ? (i.firstBaseUpdate = e) : (t.next = e), (i.lastBaseUpdate = e));
  }
  var ku = !1;
  function Us() {
    if (ku) {
      var t = Ni;
      if (t !== null) throw t;
    }
  }
  function Bs(t, e, i, l) {
    ku = !1;
    var u = t.updateQueue;
    ia = !1;
    var c = u.firstBaseUpdate,
      m = u.lastBaseUpdate,
      v = u.shared.pending;
    if (v !== null) {
      u.shared.pending = null;
      var S = v,
        D = S.next;
      ((S.next = null), m === null ? (c = D) : (m.next = D), (m = S));
      var U = t.alternate;
      U !== null &&
        ((U = U.updateQueue),
        (v = U.lastBaseUpdate),
        v !== m && (v === null ? (U.firstBaseUpdate = D) : (v.next = D), (U.lastBaseUpdate = S)));
    }
    if (c !== null) {
      var H = u.baseState;
      ((m = 0), (U = D = S = null), (v = c));
      do {
        var R = v.lane & -536870913,
          z = R !== v.lane;
        if (z ? (Ct & R) === R : (l & R) === R) {
          (R !== 0 && R === ki && (ku = !0),
            U !== null &&
              (U = U.next = { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          t: {
            var at = t,
              ht = v;
            R = e;
            var qt = i;
            switch (ht.tag) {
              case 1:
                if (((at = ht.payload), typeof at == "function")) {
                  H = at.call(qt, H, R);
                  break t;
                }
                H = at;
                break t;
              case 3:
                at.flags = (at.flags & -65537) | 128;
              case 0:
                if (((at = ht.payload), (R = typeof at == "function" ? at.call(qt, H, R) : at), R == null))
                  break t;
                H = b({}, H, R);
                break t;
              case 2:
                ia = !0;
            }
          }
          ((R = v.callback),
            R !== null &&
              ((t.flags |= 64),
              z && (t.flags |= 8192),
              (z = u.callbacks),
              z === null ? (u.callbacks = [R]) : z.push(R)));
        } else
          ((z = { lane: R, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            U === null ? ((D = U = z), (S = H)) : (U = U.next = z),
            (m |= R));
        if (((v = v.next), v === null)) {
          if (((v = u.shared.pending), v === null)) break;
          ((z = v), (v = z.next), (z.next = null), (u.lastBaseUpdate = z), (u.shared.pending = null));
        }
      } while (!0);
      (U === null && (S = H),
        (u.baseState = S),
        (u.firstBaseUpdate = D),
        (u.lastBaseUpdate = U),
        c === null && (u.shared.lanes = 0),
        (fa |= m),
        (t.lanes = m),
        (t.memoizedState = H));
    }
  }
  function um(t, e) {
    if (typeof t != "function") throw Error(r(191, t));
    t.call(e);
  }
  function cm(t, e) {
    var i = t.callbacks;
    if (i !== null) for (t.callbacks = null, t = 0; t < i.length; t++) um(i[t], e);
  }
  var Ui = T(null),
    rr = T(0);
  function fm(t, e) {
    ((t = Gn), W(rr, t), W(Ui, e), (Gn = t | e.baseLanes));
  }
  function Nu() {
    (W(rr, Gn), W(Ui, Ui.current));
  }
  function ju() {
    ((Gn = rr.current), B(Ui), B(rr));
  }
  var Ge = T(null),
    nn = null;
  function ra(t) {
    var e = t.alternate;
    (W(ee, ee.current & 1),
      W(Ge, t),
      nn === null && (e === null || Ui.current !== null || e.memoizedState !== null) && (nn = t));
  }
  function Vu(t) {
    (W(ee, ee.current), W(Ge, t), nn === null && (nn = t));
  }
  function dm(t) {
    t.tag === 22 ? (W(ee, ee.current), W(Ge, t), nn === null && (nn = t)) : oa();
  }
  function oa() {
    (W(ee, ee.current), W(Ge, Ge.current));
  }
  function qe(t) {
    (B(Ge), nn === t && (nn = null), B(ee));
  }
  var ee = T(0);
  function or(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var i = e.memoizedState;
        if (i !== null && ((i = i.dehydrated), i === null || Gc(i) || qc(i))) return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === "forwards" ||
          e.memoizedProps.revealOrder === "backwards" ||
          e.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          e.memoizedProps.revealOrder === "together")
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        ((e.child.return = e), (e = e.child));
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
    return null;
  }
  var Nn = 0,
    xt = null,
    Zt = null,
    se = null,
    ur = !1,
    Bi = !1,
    Fa = !1,
    cr = 0,
    Ls = 0,
    Li = null,
    _1 = 0;
  function $t() {
    throw Error(r(321));
  }
  function Uu(t, e) {
    if (e === null) return !1;
    for (var i = 0; i < e.length && i < t.length; i++) if (!He(t[i], e[i])) return !1;
    return !0;
  }
  function Bu(t, e, i, l, u, c) {
    return (
      (Nn = c),
      (xt = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (O.H = t === null || t.memoizedState === null ? Pm : Iu),
      (Fa = !1),
      (c = i(l, u)),
      (Fa = !1),
      Bi && (c = mm(e, i, l, u)),
      hm(t),
      c
    );
  }
  function hm(t) {
    O.H = Gs;
    var e = Zt !== null && Zt.next !== null;
    if (((Nn = 0), (se = Zt = xt = null), (ur = !1), (Ls = 0), (Li = null), e)) throw Error(r(300));
    t === null || le || ((t = t.dependencies), t !== null && tr(t) && (le = !0));
  }
  function mm(t, e, i, l) {
    xt = t;
    var u = 0;
    do {
      if ((Bi && (Li = null), (Ls = 0), (Bi = !1), 25 <= u)) throw Error(r(301));
      if (((u += 1), (se = Zt = null), t.updateQueue != null)) {
        var c = t.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((O.H = Fm), (c = e(i, l)));
    } while (Bi);
    return c;
  }
  function E1() {
    var t = O.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == "function" ? Hs(e) : e),
      (t = t.useState()[0]),
      (Zt !== null ? Zt.memoizedState : null) !== t && (xt.flags |= 1024),
      e
    );
  }
  function Lu() {
    var t = cr !== 0;
    return ((cr = 0), t);
  }
  function Hu(t, e, i) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~i));
  }
  function Zu(t) {
    if (ur) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      ur = !1;
    }
    ((Nn = 0), (se = Zt = xt = null), (Bi = !1), (Ls = cr = 0), (Li = null));
  }
  function we() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (se === null ? (xt.memoizedState = se = t) : (se = se.next = t), se);
  }
  function ne() {
    if (Zt === null) {
      var t = xt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Zt.next;
    var e = se === null ? xt.memoizedState : se.next;
    if (e !== null) ((se = e), (Zt = t));
    else {
      if (t === null) throw xt.alternate === null ? Error(r(467)) : Error(r(310));
      ((Zt = t),
        (t = {
          memoizedState: Zt.memoizedState,
          baseState: Zt.baseState,
          baseQueue: Zt.baseQueue,
          queue: Zt.queue,
          next: null,
        }),
        se === null ? (xt.memoizedState = se = t) : (se = se.next = t));
    }
    return se;
  }
  function fr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Hs(t) {
    var e = Ls;
    return (
      (Ls += 1),
      Li === null && (Li = []),
      (t = im(Li, t, e)),
      (e = xt),
      (se === null ? e.memoizedState : se.next) === null &&
        ((e = e.alternate), (O.H = e === null || e.memoizedState === null ? Pm : Iu)),
      t
    );
  }
  function dr(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Hs(t);
      if (t.$$typeof === Z) return be(t);
    }
    throw Error(r(438, String(t)));
  }
  function Gu(t) {
    var e = null,
      i = xt.updateQueue;
    if ((i !== null && (e = i.memoCache), e == null)) {
      var l = xt.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (e = {
              data: l.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      i === null && ((i = fr()), (xt.updateQueue = i)),
      (i.memoCache = e),
      (i = e.data[e.index]),
      i === void 0)
    )
      for (i = e.data[e.index] = Array(t), l = 0; l < t; l++) i[l] = et;
    return (e.index++, i);
  }
  function jn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function hr(t) {
    var e = ne();
    return qu(e, Zt, t);
  }
  function qu(t, e, i) {
    var l = t.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = i;
    var u = t.baseQueue,
      c = l.pending;
    if (c !== null) {
      if (u !== null) {
        var m = u.next;
        ((u.next = c.next), (c.next = m));
      }
      ((e.baseQueue = u = c), (l.pending = null));
    }
    if (((c = t.baseState), u === null)) t.memoizedState = c;
    else {
      e = u.next;
      var v = (m = null),
        S = null,
        D = e,
        U = !1;
      do {
        var H = D.lane & -536870913;
        if (H !== D.lane ? (Ct & H) === H : (Nn & H) === H) {
          var R = D.revertLane;
          if (R === 0)
            (S !== null &&
              (S = S.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: D.action,
                  hasEagerState: D.hasEagerState,
                  eagerState: D.eagerState,
                  next: null,
                }),
              H === ki && (U = !0));
          else if ((Nn & R) === R) {
            ((D = D.next), R === ki && (U = !0));
            continue;
          } else
            ((H = {
              lane: 0,
              revertLane: D.revertLane,
              gesture: null,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null,
            }),
              S === null ? ((v = S = H), (m = c)) : (S = S.next = H),
              (xt.lanes |= R),
              (fa |= R));
          ((H = D.action), Fa && i(c, H), (c = D.hasEagerState ? D.eagerState : i(c, H)));
        } else
          ((R = {
            lane: H,
            revertLane: D.revertLane,
            gesture: D.gesture,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null,
          }),
            S === null ? ((v = S = R), (m = c)) : (S = S.next = R),
            (xt.lanes |= H),
            (fa |= H));
        D = D.next;
      } while (D !== null && D !== e);
      if (
        (S === null ? (m = c) : (S.next = v),
        !He(c, t.memoizedState) && ((le = !0), U && ((i = Ni), i !== null)))
      )
        throw i;
      ((t.memoizedState = c), (t.baseState = m), (t.baseQueue = S), (l.lastRenderedState = c));
    }
    return (u === null && (l.lanes = 0), [t.memoizedState, l.dispatch]);
  }
  function Yu(t) {
    var e = ne(),
      i = e.queue;
    if (i === null) throw Error(r(311));
    i.lastRenderedReducer = t;
    var l = i.dispatch,
      u = i.pending,
      c = e.memoizedState;
    if (u !== null) {
      i.pending = null;
      var m = (u = u.next);
      do ((c = t(c, m.action)), (m = m.next));
      while (m !== u);
      (He(c, e.memoizedState) || (le = !0),
        (e.memoizedState = c),
        e.baseQueue === null && (e.baseState = c),
        (i.lastRenderedState = c));
    }
    return [c, l];
  }
  function pm(t, e, i) {
    var l = xt,
      u = ne(),
      c = Rt;
    if (c) {
      if (i === void 0) throw Error(r(407));
      i = i();
    } else i = e();
    var m = !He((Zt || u).memoizedState, i);
    if (
      (m && ((u.memoizedState = i), (le = !0)),
      (u = u.queue),
      Qu(vm.bind(null, l, u, t), [t]),
      u.getSnapshot !== e || m || (se !== null && se.memoizedState.tag & 1))
    ) {
      if (((l.flags |= 2048), Hi(9, { destroy: void 0 }, gm.bind(null, l, u, i, e), null), Kt === null))
        throw Error(r(349));
      c || (Nn & 127) !== 0 || ym(l, e, i);
    }
    return i;
  }
  function ym(t, e, i) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: i }),
      (e = xt.updateQueue),
      e === null
        ? ((e = fr()), (xt.updateQueue = e), (e.stores = [t]))
        : ((i = e.stores), i === null ? (e.stores = [t]) : i.push(t)));
  }
  function gm(t, e, i, l) {
    ((e.value = i), (e.getSnapshot = l), bm(e) && xm(t));
  }
  function vm(t, e, i) {
    return i(function () {
      bm(e) && xm(t);
    });
  }
  function bm(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var i = e();
      return !He(t, i);
    } catch {
      return !0;
    }
  }
  function xm(t) {
    var e = Za(t, 2);
    e !== null && je(e, t, 2);
  }
  function Xu(t) {
    var e = we();
    if (typeof t == "function") {
      var i = t;
      if (((t = i()), Fa)) {
        Wn(!0);
        try {
          i();
        } finally {
          Wn(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: jn, lastRenderedState: t }),
      e
    );
  }
  function Sm(t, e, i, l) {
    return ((t.baseState = i), qu(t, Zt, typeof l == "function" ? l : jn));
  }
  function w1(t, e, i, l, u) {
    if (yr(t)) throw Error(r(485));
    if (((t = e.action), t !== null)) {
      var c = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (m) {
          c.listeners.push(m);
        },
      };
      (O.T !== null ? i(!0) : (c.isTransition = !1),
        l(c),
        (i = e.pending),
        i === null ? ((c.next = e.pending = c), Tm(e, c)) : ((c.next = i.next), (e.pending = i.next = c)));
    }
  }
  function Tm(t, e) {
    var i = e.action,
      l = e.payload,
      u = t.state;
    if (e.isTransition) {
      var c = O.T,
        m = {};
      O.T = m;
      try {
        var v = i(u, l),
          S = O.S;
        (S !== null && S(m, v), Am(t, e, v));
      } catch (D) {
        Ku(t, e, D);
      } finally {
        (c !== null && m.types !== null && (c.types = m.types), (O.T = c));
      }
    } else
      try {
        ((c = i(u, l)), Am(t, e, c));
      } catch (D) {
        Ku(t, e, D);
      }
  }
  function Am(t, e, i) {
    i !== null && typeof i == "object" && typeof i.then == "function"
      ? i.then(
          function (l) {
            _m(t, e, l);
          },
          function (l) {
            return Ku(t, e, l);
          },
        )
      : _m(t, e, i);
  }
  function _m(t, e, i) {
    ((e.status = "fulfilled"),
      (e.value = i),
      Em(e),
      (t.state = i),
      (e = t.pending),
      e !== null && ((i = e.next), i === e ? (t.pending = null) : ((i = i.next), (e.next = i), Tm(t, i))));
  }
  function Ku(t, e, i) {
    var l = t.pending;
    if (((t.pending = null), l !== null)) {
      l = l.next;
      do ((e.status = "rejected"), (e.reason = i), Em(e), (e = e.next));
      while (e !== l);
    }
    t.action = null;
  }
  function Em(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function wm(t, e) {
    return e;
  }
  function Mm(t, e) {
    if (Rt) {
      var i = Kt.formState;
      if (i !== null) {
        t: {
          var l = xt;
          if (Rt) {
            if (Jt) {
              e: {
                for (var u = Jt, c = en; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break e;
                  }
                  if (((u = an(u.nextSibling)), u === null)) {
                    u = null;
                    break e;
                  }
                }
                ((c = u.data), (u = c === "F!" || c === "F" ? u : null));
              }
              if (u) {
                ((Jt = an(u.nextSibling)), (l = u.data === "F!"));
                break t;
              }
            }
            na(l);
          }
          l = !1;
        }
        l && (e = i[0]);
      }
    }
    return (
      (i = we()),
      (i.memoizedState = i.baseState = e),
      (l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: wm, lastRenderedState: e }),
      (i.queue = l),
      (i = Km.bind(null, xt, l)),
      (l.dispatch = i),
      (l = Xu(!1)),
      (c = $u.bind(null, xt, !1, l.queue)),
      (l = we()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (l.queue = u),
      (i = w1.bind(null, xt, u, c, i)),
      (u.dispatch = i),
      (l.memoizedState = t),
      [e, i, !1]
    );
  }
  function Cm(t) {
    var e = ne();
    return Dm(e, Zt, t);
  }
  function Dm(t, e, i) {
    if (
      ((e = qu(t, e, wm)[0]),
      (t = hr(jn)[0]),
      typeof e == "object" && e !== null && typeof e.then == "function")
    )
      try {
        var l = Hs(e);
      } catch (m) {
        throw m === ji ? ar : m;
      }
    else l = e;
    e = ne();
    var u = e.queue,
      c = u.dispatch;
    return (
      i !== e.memoizedState && ((xt.flags |= 2048), Hi(9, { destroy: void 0 }, M1.bind(null, u, i), null)),
      [l, c, t]
    );
  }
  function M1(t, e) {
    t.action = e;
  }
  function Rm(t) {
    var e = ne(),
      i = Zt;
    if (i !== null) return Dm(e, i, t);
    (ne(), (e = e.memoizedState), (i = ne()));
    var l = i.queue.dispatch;
    return ((i.memoizedState = t), [e, l, !1]);
  }
  function Hi(t, e, i, l) {
    return (
      (t = { tag: t, create: i, deps: l, inst: e, next: null }),
      (e = xt.updateQueue),
      e === null && ((e = fr()), (xt.updateQueue = e)),
      (i = e.lastEffect),
      i === null
        ? (e.lastEffect = t.next = t)
        : ((l = i.next), (i.next = t), (t.next = l), (e.lastEffect = t)),
      t
    );
  }
  function Om() {
    return ne().memoizedState;
  }
  function mr(t, e, i, l) {
    var u = we();
    ((xt.flags |= t), (u.memoizedState = Hi(1 | e, { destroy: void 0 }, i, l === void 0 ? null : l)));
  }
  function pr(t, e, i, l) {
    var u = ne();
    l = l === void 0 ? null : l;
    var c = u.memoizedState.inst;
    Zt !== null && l !== null && Uu(l, Zt.memoizedState.deps)
      ? (u.memoizedState = Hi(e, c, i, l))
      : ((xt.flags |= t), (u.memoizedState = Hi(1 | e, c, i, l)));
  }
  function zm(t, e) {
    mr(8390656, 8, t, e);
  }
  function Qu(t, e) {
    pr(2048, 8, t, e);
  }
  function C1(t) {
    xt.flags |= 4;
    var e = xt.updateQueue;
    if (e === null) ((e = fr()), (xt.updateQueue = e), (e.events = [t]));
    else {
      var i = e.events;
      i === null ? (e.events = [t]) : i.push(t);
    }
  }
  function km(t) {
    var e = ne().memoizedState;
    return (
      C1({ ref: e, nextImpl: t }),
      function () {
        if ((Ut & 2) !== 0) throw Error(r(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function Nm(t, e) {
    return pr(4, 2, t, e);
  }
  function jm(t, e) {
    return pr(4, 4, t, e);
  }
  function Vm(t, e) {
    if (typeof e == "function") {
      t = t();
      var i = e(t);
      return function () {
        typeof i == "function" ? i() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function Um(t, e, i) {
    ((i = i != null ? i.concat([t]) : null), pr(4, 4, Vm.bind(null, e, t), i));
  }
  function Ju() {}
  function Bm(t, e) {
    var i = ne();
    e = e === void 0 ? null : e;
    var l = i.memoizedState;
    return e !== null && Uu(e, l[1]) ? l[0] : ((i.memoizedState = [t, e]), t);
  }
  function Lm(t, e) {
    var i = ne();
    e = e === void 0 ? null : e;
    var l = i.memoizedState;
    if (e !== null && Uu(e, l[1])) return l[0];
    if (((l = t()), Fa)) {
      Wn(!0);
      try {
        t();
      } finally {
        Wn(!1);
      }
    }
    return ((i.memoizedState = [l, e]), l);
  }
  function Pu(t, e, i) {
    return i === void 0 || ((Nn & 1073741824) !== 0 && (Ct & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = i), (t = Hp()), (xt.lanes |= t), (fa |= t), i);
  }
  function Hm(t, e, i, l) {
    return He(i, e)
      ? i
      : Ui.current !== null
        ? ((t = Pu(t, i, l)), He(t, e) || (le = !0), t)
        : (Nn & 42) === 0 || ((Nn & 1073741824) !== 0 && (Ct & 261930) === 0)
          ? ((le = !0), (t.memoizedState = i))
          : ((t = Hp()), (xt.lanes |= t), (fa |= t), e);
  }
  function Zm(t, e, i, l, u) {
    var c = X.p;
    X.p = c !== 0 && 8 > c ? c : 8;
    var m = O.T,
      v = {};
    ((O.T = v), $u(t, !1, e, i));
    try {
      var S = u(),
        D = O.S;
      if ((D !== null && D(v, S), S !== null && typeof S == "object" && typeof S.then == "function")) {
        var U = A1(S, l);
        Zs(t, e, U, Ke(t));
      } else Zs(t, e, l, Ke(t));
    } catch (H) {
      Zs(t, e, { then: function () {}, status: "rejected", reason: H }, Ke());
    } finally {
      ((X.p = c), m !== null && v.types !== null && (m.types = v.types), (O.T = m));
    }
  }
  function D1() {}
  function Fu(t, e, i, l) {
    if (t.tag !== 5) throw Error(r(476));
    var u = Gm(t).queue;
    Zm(
      t,
      u,
      e,
      P,
      i === null
        ? D1
        : function () {
            return (qm(t), i(l));
          },
    );
  }
  function Gm(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: P,
      baseState: P,
      baseQueue: null,
      queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: jn, lastRenderedState: P },
      next: null,
    };
    var i = {};
    return (
      (e.next = {
        memoizedState: i,
        baseState: i,
        baseQueue: null,
        queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: jn, lastRenderedState: i },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function qm(t) {
    var e = Gm(t);
    (e.next === null && (e = t.alternate.memoizedState), Zs(t, e.next.queue, {}, Ke()));
  }
  function Wu() {
    return be(il);
  }
  function Ym() {
    return ne().memoizedState;
  }
  function Xm() {
    return ne().memoizedState;
  }
  function R1(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var i = Ke();
          t = sa(i);
          var l = la(e, t, i);
          (l !== null && (je(l, e, i), Vs(l, e, i)), (e = { cache: wu() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function O1(t, e, i) {
    var l = Ke();
    ((i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      yr(t) ? Qm(e, i) : ((i = pu(t, e, i, l)), i !== null && (je(i, t, l), Jm(i, e, l))));
  }
  function Km(t, e, i) {
    var l = Ke();
    Zs(t, e, i, l);
  }
  function Zs(t, e, i, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (yr(t)) Qm(e, u);
    else {
      var c = t.alternate;
      if (t.lanes === 0 && (c === null || c.lanes === 0) && ((c = e.lastRenderedReducer), c !== null))
        try {
          var m = e.lastRenderedState,
            v = c(m, i);
          if (((u.hasEagerState = !0), (u.eagerState = v), He(v, m)))
            return (Fl(t, e, u, 0), Kt === null && Pl(), !1);
        } catch {
        } finally {
        }
      if (((i = pu(t, e, u, l)), i !== null)) return (je(i, t, l), Jm(i, e, l), !0);
    }
    return !1;
  }
  function $u(t, e, i, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: Rc(),
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      yr(t))
    ) {
      if (e) throw Error(r(479));
    } else ((e = pu(t, i, l, 2)), e !== null && je(e, t, 2));
  }
  function yr(t) {
    var e = t.alternate;
    return t === xt || (e !== null && e === xt);
  }
  function Qm(t, e) {
    Bi = ur = !0;
    var i = t.pending;
    (i === null ? (e.next = e) : ((e.next = i.next), (i.next = e)), (t.pending = e));
  }
  function Jm(t, e, i) {
    if ((i & 4194048) !== 0) {
      var l = e.lanes;
      ((l &= t.pendingLanes), (i |= l), (e.lanes = i), Id(t, i));
    }
  }
  var Gs = {
    readContext: be,
    use: dr,
    useCallback: $t,
    useContext: $t,
    useEffect: $t,
    useImperativeHandle: $t,
    useLayoutEffect: $t,
    useInsertionEffect: $t,
    useMemo: $t,
    useReducer: $t,
    useRef: $t,
    useState: $t,
    useDebugValue: $t,
    useDeferredValue: $t,
    useTransition: $t,
    useSyncExternalStore: $t,
    useId: $t,
    useHostTransitionStatus: $t,
    useFormState: $t,
    useActionState: $t,
    useOptimistic: $t,
    useMemoCache: $t,
    useCacheRefresh: $t,
  };
  Gs.useEffectEvent = $t;
  var Pm = {
      readContext: be,
      use: dr,
      useCallback: function (t, e) {
        return ((we().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: be,
      useEffect: zm,
      useImperativeHandle: function (t, e, i) {
        ((i = i != null ? i.concat([t]) : null), mr(4194308, 4, Vm.bind(null, e, t), i));
      },
      useLayoutEffect: function (t, e) {
        return mr(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        mr(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var i = we();
        e = e === void 0 ? null : e;
        var l = t();
        if (Fa) {
          Wn(!0);
          try {
            t();
          } finally {
            Wn(!1);
          }
        }
        return ((i.memoizedState = [l, e]), l);
      },
      useReducer: function (t, e, i) {
        var l = we();
        if (i !== void 0) {
          var u = i(e);
          if (Fa) {
            Wn(!0);
            try {
              i(e);
            } finally {
              Wn(!1);
            }
          }
        } else u = e;
        return (
          (l.memoizedState = l.baseState = u),
          (t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: u }),
          (l.queue = t),
          (t = t.dispatch = O1.bind(null, xt, t)),
          [l.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = we();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = Xu(t);
        var e = t.queue,
          i = Km.bind(null, xt, e);
        return ((e.dispatch = i), [t.memoizedState, i]);
      },
      useDebugValue: Ju,
      useDeferredValue: function (t, e) {
        var i = we();
        return Pu(i, t, e);
      },
      useTransition: function () {
        var t = Xu(!1);
        return ((t = Zm.bind(null, xt, t.queue, !0, !1)), (we().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, i) {
        var l = xt,
          u = we();
        if (Rt) {
          if (i === void 0) throw Error(r(407));
          i = i();
        } else {
          if (((i = e()), Kt === null)) throw Error(r(349));
          (Ct & 127) !== 0 || ym(l, e, i);
        }
        u.memoizedState = i;
        var c = { value: i, getSnapshot: e };
        return (
          (u.queue = c),
          zm(vm.bind(null, l, c, t), [t]),
          (l.flags |= 2048),
          Hi(9, { destroy: void 0 }, gm.bind(null, l, c, i, e), null),
          i
        );
      },
      useId: function () {
        var t = we(),
          e = Kt.identifierPrefix;
        if (Rt) {
          var i = vn,
            l = gn;
          ((i = (l & ~(1 << (32 - Le(l) - 1))).toString(32) + i),
            (e = "_" + e + "R_" + i),
            (i = cr++),
            0 < i && (e += "H" + i.toString(32)),
            (e += "_"));
        } else ((i = _1++), (e = "_" + e + "r_" + i.toString(32) + "_"));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: Wu,
      useFormState: Mm,
      useActionState: Mm,
      useOptimistic: function (t) {
        var e = we();
        e.memoizedState = e.baseState = t;
        var i = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = i), (e = $u.bind(null, xt, !0, i)), (i.dispatch = e), [t, e]);
      },
      useMemoCache: Gu,
      useCacheRefresh: function () {
        return (we().memoizedState = R1.bind(null, xt));
      },
      useEffectEvent: function (t) {
        var e = we(),
          i = { impl: t };
        return (
          (e.memoizedState = i),
          function () {
            if ((Ut & 2) !== 0) throw Error(r(440));
            return i.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Iu = {
      readContext: be,
      use: dr,
      useCallback: Bm,
      useContext: be,
      useEffect: Qu,
      useImperativeHandle: Um,
      useInsertionEffect: Nm,
      useLayoutEffect: jm,
      useMemo: Lm,
      useReducer: hr,
      useRef: Om,
      useState: function () {
        return hr(jn);
      },
      useDebugValue: Ju,
      useDeferredValue: function (t, e) {
        var i = ne();
        return Hm(i, Zt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = hr(jn)[0],
          e = ne().memoizedState;
        return [typeof t == "boolean" ? t : Hs(t), e];
      },
      useSyncExternalStore: pm,
      useId: Ym,
      useHostTransitionStatus: Wu,
      useFormState: Cm,
      useActionState: Cm,
      useOptimistic: function (t, e) {
        var i = ne();
        return Sm(i, Zt, t, e);
      },
      useMemoCache: Gu,
      useCacheRefresh: Xm,
    };
  Iu.useEffectEvent = km;
  var Fm = {
    readContext: be,
    use: dr,
    useCallback: Bm,
    useContext: be,
    useEffect: Qu,
    useImperativeHandle: Um,
    useInsertionEffect: Nm,
    useLayoutEffect: jm,
    useMemo: Lm,
    useReducer: Yu,
    useRef: Om,
    useState: function () {
      return Yu(jn);
    },
    useDebugValue: Ju,
    useDeferredValue: function (t, e) {
      var i = ne();
      return Zt === null ? Pu(i, t, e) : Hm(i, Zt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = Yu(jn)[0],
        e = ne().memoizedState;
      return [typeof t == "boolean" ? t : Hs(t), e];
    },
    useSyncExternalStore: pm,
    useId: Ym,
    useHostTransitionStatus: Wu,
    useFormState: Rm,
    useActionState: Rm,
    useOptimistic: function (t, e) {
      var i = ne();
      return Zt !== null ? Sm(i, Zt, t, e) : ((i.baseState = t), [t, i.queue.dispatch]);
    },
    useMemoCache: Gu,
    useCacheRefresh: Xm,
  };
  Fm.useEffectEvent = km;
  function tc(t, e, i, l) {
    ((e = t.memoizedState),
      (i = i(l, e)),
      (i = i == null ? e : b({}, e, i)),
      (t.memoizedState = i),
      t.lanes === 0 && (t.updateQueue.baseState = i));
  }
  var ec = {
    enqueueSetState: function (t, e, i) {
      t = t._reactInternals;
      var l = Ke(),
        u = sa(l);
      ((u.payload = e),
        i != null && (u.callback = i),
        (e = la(t, u, l)),
        e !== null && (je(e, t, l), Vs(e, t, l)));
    },
    enqueueReplaceState: function (t, e, i) {
      t = t._reactInternals;
      var l = Ke(),
        u = sa(l);
      ((u.tag = 1),
        (u.payload = e),
        i != null && (u.callback = i),
        (e = la(t, u, l)),
        e !== null && (je(e, t, l), Vs(e, t, l)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var i = Ke(),
        l = sa(i);
      ((l.tag = 2),
        e != null && (l.callback = e),
        (e = la(t, l, i)),
        e !== null && (je(e, t, i), Vs(e, t, i)));
    },
  };
  function Wm(t, e, i, l, u, c, m) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(l, c, m)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Cs(i, l) || !Cs(u, c)
          : !0
    );
  }
  function $m(t, e, i, l) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(i, l),
      typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(i, l),
      e.state !== t && ec.enqueueReplaceState(e, e.state, null));
  }
  function Wa(t, e) {
    var i = e;
    if ("ref" in e) {
      i = {};
      for (var l in e) l !== "ref" && (i[l] = e[l]);
    }
    if ((t = t.defaultProps)) {
      i === e && (i = b({}, i));
      for (var u in t) i[u] === void 0 && (i[u] = t[u]);
    }
    return i;
  }
  function Im(t) {
    Jl(t);
  }
  function tp(t) {
    console.error(t);
  }
  function ep(t) {
    Jl(t);
  }
  function gr(t, e) {
    try {
      var i = t.onUncaughtError;
      i(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function np(t, e, i) {
    try {
      var l = t.onCaughtError;
      l(i.value, { componentStack: i.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function nc(t, e, i) {
    return (
      (i = sa(i)),
      (i.tag = 3),
      (i.payload = { element: null }),
      (i.callback = function () {
        gr(t, e);
      }),
      i
    );
  }
  function ap(t) {
    return ((t = sa(t)), (t.tag = 3), t);
  }
  function ip(t, e, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = l.value;
      ((t.payload = function () {
        return u(c);
      }),
        (t.callback = function () {
          np(e, i, l);
        }));
    }
    var m = i.stateNode;
    m !== null &&
      typeof m.componentDidCatch == "function" &&
      (t.callback = function () {
        (np(e, i, l), typeof u != "function" && (da === null ? (da = new Set([this])) : da.add(this)));
        var v = l.stack;
        this.componentDidCatch(l.value, { componentStack: v !== null ? v : "" });
      });
  }
  function z1(t, e, i, l, u) {
    if (((i.flags |= 32768), l !== null && typeof l == "object" && typeof l.then == "function")) {
      if (((e = i.alternate), e !== null && zi(e, i, u, !0), (i = Ge.current), i !== null)) {
        switch (i.tag) {
          case 31:
          case 13:
            return (
              nn === null ? Dr() : i.alternate === null && It === 0 && (It = 3),
              (i.flags &= -257),
              (i.flags |= 65536),
              (i.lanes = u),
              l === ir
                ? (i.flags |= 16384)
                : ((e = i.updateQueue), e === null ? (i.updateQueue = new Set([l])) : e.add(l), Mc(t, l, u)),
              !1
            );
          case 22:
            return (
              (i.flags |= 65536),
              l === ir
                ? (i.flags |= 16384)
                : ((e = i.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
                      (i.updateQueue = e))
                    : ((i = e.retryQueue), i === null ? (e.retryQueue = new Set([l])) : i.add(l)),
                  Mc(t, l, u)),
              !1
            );
        }
        throw Error(r(435, i.tag));
      }
      return (Mc(t, l, u), Dr(), !1);
    }
    if (Rt)
      return (
        (e = Ge.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            l !== Su && ((t = Error(r(422), { cause: l })), Os($e(t, i))))
          : (l !== Su && ((e = Error(r(423), { cause: l })), Os($e(e, i))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (l = $e(l, i)),
            (u = nc(t.stateNode, l, u)),
            zu(t, u),
            It !== 4 && (It = 2)),
        !1
      );
    var c = Error(r(520), { cause: l });
    if (((c = $e(c, i)), Fs === null ? (Fs = [c]) : Fs.push(c), It !== 4 && (It = 2), e === null)) return !0;
    ((l = $e(l, i)), (i = e));
    do {
      switch (i.tag) {
        case 3:
          return (
            (i.flags |= 65536),
            (t = u & -u),
            (i.lanes |= t),
            (t = nc(i.stateNode, l, t)),
            zu(i, t),
            !1
          );
        case 1:
          if (
            ((e = i.type),
            (c = i.stateNode),
            (i.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == "function" ||
                (c !== null && typeof c.componentDidCatch == "function" && (da === null || !da.has(c)))))
          )
            return ((i.flags |= 65536), (u &= -u), (i.lanes |= u), (u = ap(u)), ip(u, t, i, l), zu(i, u), !1);
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var ac = Error(r(461)),
    le = !1;
  function xe(t, e, i, l) {
    e.child = t === null ? om(e, null, i, l) : Pa(e, t.child, i, l);
  }
  function sp(t, e, i, l, u) {
    i = i.render;
    var c = e.ref;
    if ("ref" in l) {
      var m = {};
      for (var v in l) v !== "ref" && (m[v] = l[v]);
    } else m = l;
    return (
      Xa(e),
      (l = Bu(t, e, i, m, c, u)),
      (v = Lu()),
      t !== null && !le
        ? (Hu(t, e, u), Vn(t, e, u))
        : (Rt && v && bu(e), (e.flags |= 1), xe(t, e, l, u), e.child)
    );
  }
  function lp(t, e, i, l, u) {
    if (t === null) {
      var c = i.type;
      return typeof c == "function" && !yu(c) && c.defaultProps === void 0 && i.compare === null
        ? ((e.tag = 15), (e.type = c), rp(t, e, c, l, u))
        : ((t = $l(i.type, null, l, e, e.mode, u)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((c = t.child), !fc(t, u))) {
      var m = c.memoizedProps;
      if (((i = i.compare), (i = i !== null ? i : Cs), i(m, l) && t.ref === e.ref)) return Vn(t, e, u);
    }
    return ((e.flags |= 1), (t = Rn(c, l)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function rp(t, e, i, l, u) {
    if (t !== null) {
      var c = t.memoizedProps;
      if (Cs(c, l) && t.ref === e.ref)
        if (((le = !1), (e.pendingProps = l = c), fc(t, u))) (t.flags & 131072) !== 0 && (le = !0);
        else return ((e.lanes = t.lanes), Vn(t, e, u));
    }
    return ic(t, e, i, l, u);
  }
  function op(t, e, i, l) {
    var u = l.children,
      c = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
      l.mode === "hidden")
    ) {
      if ((e.flags & 128) !== 0) {
        if (((c = c !== null ? c.baseLanes | i : i), t !== null)) {
          for (l = e.child = t.child, u = 0; l !== null; )
            ((u = u | l.lanes | l.childLanes), (l = l.sibling));
          l = u & ~c;
        } else ((l = 0), (e.child = null));
        return up(t, e, c, i, l);
      }
      if ((i & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && nr(e, c !== null ? c.cachePool : null),
          c !== null ? fm(e, c) : Nu(),
          dm(e));
      else return ((l = e.lanes = 536870912), up(t, e, c !== null ? c.baseLanes | i : i, i, l));
    } else
      c !== null
        ? (nr(e, c.cachePool), fm(e, c), oa(), (e.memoizedState = null))
        : (t !== null && nr(e, null), Nu(), oa());
    return (xe(t, e, u, i), e.child);
  }
  function qs(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
      e.sibling
    );
  }
  function up(t, e, i, l, u) {
    var c = Cu();
    return (
      (c = c === null ? null : { parent: ie._currentValue, pool: c }),
      (e.memoizedState = { baseLanes: i, cachePool: c }),
      t !== null && nr(e, null),
      Nu(),
      dm(e),
      t !== null && zi(t, e, l, !0),
      (e.childLanes = u),
      null
    );
  }
  function vr(t, e) {
    return (
      (e = xr({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function cp(t, e, i) {
    return (
      Pa(e, t.child, null, i),
      (t = vr(e, e.pendingProps)),
      (t.flags |= 2),
      qe(e),
      (e.memoizedState = null),
      t
    );
  }
  function k1(t, e, i) {
    var l = e.pendingProps,
      u = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (Rt) {
        if (l.mode === "hidden") return ((t = vr(e, l)), (e.lanes = 536870912), qs(null, t));
        if (
          (Vu(e),
          (t = Jt)
            ? ((t = Ty(t, en)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: ta !== null ? { id: gn, overflow: vn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (i = Qh(t)),
                (i.return = e),
                (e.child = i),
                (ve = e),
                (Jt = null)))
            : (t = null),
          t === null)
        )
          throw na(e);
        return ((e.lanes = 536870912), null);
      }
      return vr(e, l);
    }
    var c = t.memoizedState;
    if (c !== null) {
      var m = c.dehydrated;
      if ((Vu(e), u))
        if (e.flags & 256) ((e.flags &= -257), (e = cp(t, e, i)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(r(558));
      else if ((le || zi(t, e, i, !1), (u = (i & t.childLanes) !== 0), le || u)) {
        if (((l = Kt), l !== null && ((m = th(l, i)), m !== 0 && m !== c.retryLane)))
          throw ((c.retryLane = m), Za(t, m), je(l, t, m), ac);
        (Dr(), (e = cp(t, e, i)));
      } else
        ((t = c.treeContext),
          (Jt = an(m.nextSibling)),
          (ve = e),
          (Rt = !0),
          (ea = null),
          (en = !1),
          t !== null && Fh(e, t),
          (e = vr(e, l)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = Rn(t.child, { mode: l.mode, children: l.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function br(t, e) {
    var i = e.ref;
    if (i === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object") throw Error(r(284));
      (t === null || t.ref !== i) && (e.flags |= 4194816);
    }
  }
  function ic(t, e, i, l, u) {
    return (
      Xa(e),
      (i = Bu(t, e, i, l, void 0, u)),
      (l = Lu()),
      t !== null && !le
        ? (Hu(t, e, u), Vn(t, e, u))
        : (Rt && l && bu(e), (e.flags |= 1), xe(t, e, i, u), e.child)
    );
  }
  function fp(t, e, i, l, u, c) {
    return (
      Xa(e),
      (e.updateQueue = null),
      (i = mm(e, l, i, u)),
      hm(t),
      (l = Lu()),
      t !== null && !le
        ? (Hu(t, e, c), Vn(t, e, c))
        : (Rt && l && bu(e), (e.flags |= 1), xe(t, e, i, c), e.child)
    );
  }
  function dp(t, e, i, l, u) {
    if ((Xa(e), e.stateNode === null)) {
      var c = Ci,
        m = i.contextType;
      (typeof m == "object" && m !== null && (c = be(m)),
        (c = new i(l, c)),
        (e.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = ec),
        (e.stateNode = c),
        (c._reactInternals = e),
        (c = e.stateNode),
        (c.props = l),
        (c.state = e.memoizedState),
        (c.refs = {}),
        Ru(e),
        (m = i.contextType),
        (c.context = typeof m == "object" && m !== null ? be(m) : Ci),
        (c.state = e.memoizedState),
        (m = i.getDerivedStateFromProps),
        typeof m == "function" && (tc(e, i, m, l), (c.state = e.memoizedState)),
        typeof i.getDerivedStateFromProps == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function" ||
          (typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function") ||
          ((m = c.state),
          typeof c.componentWillMount == "function" && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(),
          m !== c.state && ec.enqueueReplaceState(c, c.state, null),
          Bs(e, l, c, u),
          Us(),
          (c.state = e.memoizedState)),
        typeof c.componentDidMount == "function" && (e.flags |= 4194308),
        (l = !0));
    } else if (t === null) {
      c = e.stateNode;
      var v = e.memoizedProps,
        S = Wa(i, v);
      c.props = S;
      var D = c.context,
        U = i.contextType;
      ((m = Ci), typeof U == "object" && U !== null && (m = be(U)));
      var H = i.getDerivedStateFromProps;
      ((U = typeof H == "function" || typeof c.getSnapshotBeforeUpdate == "function"),
        (v = e.pendingProps !== v),
        U ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((v || D !== m) && $m(e, c, l, m)),
        (ia = !1));
      var R = e.memoizedState;
      ((c.state = R),
        Bs(e, l, c, u),
        Us(),
        (D = e.memoizedState),
        v || R !== D || ia
          ? (typeof H == "function" && (tc(e, i, H, l), (D = e.memoizedState)),
            (S = ia || Wm(e, i, S, l, R, D, m))
              ? (U ||
                  (typeof c.UNSAFE_componentWillMount != "function" &&
                    typeof c.componentWillMount != "function") ||
                  (typeof c.componentWillMount == "function" && c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == "function" && (e.flags |= 4194308))
              : (typeof c.componentDidMount == "function" && (e.flags |= 4194308),
                (e.memoizedProps = l),
                (e.memoizedState = D)),
            (c.props = l),
            (c.state = D),
            (c.context = m),
            (l = S))
          : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), (l = !1)));
    } else {
      ((c = e.stateNode),
        Ou(t, e),
        (m = e.memoizedProps),
        (U = Wa(i, m)),
        (c.props = U),
        (H = e.pendingProps),
        (R = c.context),
        (D = i.contextType),
        (S = Ci),
        typeof D == "object" && D !== null && (S = be(D)),
        (v = i.getDerivedStateFromProps),
        (D = typeof v == "function" || typeof c.getSnapshotBeforeUpdate == "function") ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((m !== H || R !== S) && $m(e, c, l, S)),
        (ia = !1),
        (R = e.memoizedState),
        (c.state = R),
        Bs(e, l, c, u),
        Us());
      var z = e.memoizedState;
      m !== H || R !== z || ia || (t !== null && t.dependencies !== null && tr(t.dependencies))
        ? (typeof v == "function" && (tc(e, i, v, l), (z = e.memoizedState)),
          (U = ia || Wm(e, i, U, l, R, z, S) || (t !== null && t.dependencies !== null && tr(t.dependencies)))
            ? (D ||
                (typeof c.UNSAFE_componentWillUpdate != "function" &&
                  typeof c.componentWillUpdate != "function") ||
                (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(l, z, S),
                typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(l, z, S)),
              typeof c.componentDidUpdate == "function" && (e.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024))
            : (typeof c.componentDidUpdate != "function" ||
                (m === t.memoizedProps && R === t.memoizedState) ||
                (e.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != "function" ||
                (m === t.memoizedProps && R === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = l),
              (e.memoizedState = z)),
          (c.props = l),
          (c.state = z),
          (c.context = S),
          (l = U))
        : (typeof c.componentDidUpdate != "function" ||
            (m === t.memoizedProps && R === t.memoizedState) ||
            (e.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != "function" ||
            (m === t.memoizedProps && R === t.memoizedState) ||
            (e.flags |= 1024),
          (l = !1));
    }
    return (
      (c = l),
      br(t, e),
      (l = (e.flags & 128) !== 0),
      c || l
        ? ((c = e.stateNode),
          (i = l && typeof i.getDerivedStateFromError != "function" ? null : c.render()),
          (e.flags |= 1),
          t !== null && l
            ? ((e.child = Pa(e, t.child, null, u)), (e.child = Pa(e, null, i, u)))
            : xe(t, e, i, u),
          (e.memoizedState = c.state),
          (t = e.child))
        : (t = Vn(t, e, u)),
      t
    );
  }
  function hp(t, e, i, l) {
    return (qa(), (e.flags |= 256), xe(t, e, i, l), e.child);
  }
  var sc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function lc(t) {
    return { baseLanes: t, cachePool: nm() };
  }
  function rc(t, e, i) {
    return ((t = t !== null ? t.childLanes & ~i : 0), e && (t |= Xe), t);
  }
  function mp(t, e, i) {
    var l = e.pendingProps,
      u = !1,
      c = (e.flags & 128) !== 0,
      m;
    if (
      ((m = c) || (m = t !== null && t.memoizedState === null ? !1 : (ee.current & 2) !== 0),
      m && ((u = !0), (e.flags &= -129)),
      (m = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (Rt) {
        if (
          (u ? ra(e) : oa(),
          (t = Jt)
            ? ((t = Ty(t, en)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: ta !== null ? { id: gn, overflow: vn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (i = Qh(t)),
                (i.return = e),
                (e.child = i),
                (ve = e),
                (Jt = null)))
            : (t = null),
          t === null)
        )
          throw na(e);
        return (qc(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var v = l.children;
      return (
        (l = l.fallback),
        u
          ? (oa(),
            (u = e.mode),
            (v = xr({ mode: "hidden", children: v }, u)),
            (l = Ga(l, u, i, null)),
            (v.return = e),
            (l.return = e),
            (v.sibling = l),
            (e.child = v),
            (l = e.child),
            (l.memoizedState = lc(i)),
            (l.childLanes = rc(t, m, i)),
            (e.memoizedState = sc),
            qs(null, l))
          : (ra(e), oc(e, v))
      );
    }
    var S = t.memoizedState;
    if (S !== null && ((v = S.dehydrated), v !== null)) {
      if (c)
        e.flags & 256
          ? (ra(e), (e.flags &= -257), (e = uc(t, e, i)))
          : e.memoizedState !== null
            ? (oa(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (oa(),
              (v = l.fallback),
              (u = e.mode),
              (l = xr({ mode: "visible", children: l.children }, u)),
              (v = Ga(v, u, i, null)),
              (v.flags |= 2),
              (l.return = e),
              (v.return = e),
              (l.sibling = v),
              (e.child = l),
              Pa(e, t.child, null, i),
              (l = e.child),
              (l.memoizedState = lc(i)),
              (l.childLanes = rc(t, m, i)),
              (e.memoizedState = sc),
              (e = qs(null, l)));
      else if ((ra(e), qc(v))) {
        if (((m = v.nextSibling && v.nextSibling.dataset), m)) var D = m.dgst;
        ((m = D),
          (l = Error(r(419))),
          (l.stack = ""),
          (l.digest = m),
          Os({ value: l, source: null, stack: null }),
          (e = uc(t, e, i)));
      } else if ((le || zi(t, e, i, !1), (m = (i & t.childLanes) !== 0), le || m)) {
        if (((m = Kt), m !== null && ((l = th(m, i)), l !== 0 && l !== S.retryLane)))
          throw ((S.retryLane = l), Za(t, l), je(m, t, l), ac);
        (Gc(v) || Dr(), (e = uc(t, e, i)));
      } else
        Gc(v)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = S.treeContext),
            (Jt = an(v.nextSibling)),
            (ve = e),
            (Rt = !0),
            (ea = null),
            (en = !1),
            t !== null && Fh(e, t),
            (e = oc(e, l.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (oa(),
        (v = l.fallback),
        (u = e.mode),
        (S = t.child),
        (D = S.sibling),
        (l = Rn(S, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = S.subtreeFlags & 65011712),
        D !== null ? (v = Rn(D, v)) : ((v = Ga(v, u, i, null)), (v.flags |= 2)),
        (v.return = e),
        (l.return = e),
        (l.sibling = v),
        (e.child = l),
        qs(null, l),
        (l = e.child),
        (v = t.child.memoizedState),
        v === null
          ? (v = lc(i))
          : ((u = v.cachePool),
            u !== null
              ? ((S = ie._currentValue), (u = u.parent !== S ? { parent: S, pool: S } : u))
              : (u = nm()),
            (v = { baseLanes: v.baseLanes | i, cachePool: u })),
        (l.memoizedState = v),
        (l.childLanes = rc(t, m, i)),
        (e.memoizedState = sc),
        qs(t.child, l))
      : (ra(e),
        (i = t.child),
        (t = i.sibling),
        (i = Rn(i, { mode: "visible", children: l.children })),
        (i.return = e),
        (i.sibling = null),
        t !== null && ((m = e.deletions), m === null ? ((e.deletions = [t]), (e.flags |= 16)) : m.push(t)),
        (e.child = i),
        (e.memoizedState = null),
        i);
  }
  function oc(t, e) {
    return ((e = xr({ mode: "visible", children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function xr(t, e) {
    return ((t = Ze(22, t, null, e)), (t.lanes = 0), t);
  }
  function uc(t, e, i) {
    return (
      Pa(e, t.child, null, i),
      (t = oc(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function pp(t, e, i) {
    t.lanes |= e;
    var l = t.alternate;
    (l !== null && (l.lanes |= e), _u(t.return, e, i));
  }
  function cc(t, e, i, l, u, c) {
    var m = t.memoizedState;
    m === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: i,
          tailMode: u,
          treeForkCount: c,
        })
      : ((m.isBackwards = e),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = l),
        (m.tail = i),
        (m.tailMode = u),
        (m.treeForkCount = c));
  }
  function yp(t, e, i) {
    var l = e.pendingProps,
      u = l.revealOrder,
      c = l.tail;
    l = l.children;
    var m = ee.current,
      v = (m & 2) !== 0;
    if (
      (v ? ((m = (m & 1) | 2), (e.flags |= 128)) : (m &= 1),
      W(ee, m),
      xe(t, e, l, i),
      (l = Rt ? Rs : 0),
      !v && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && pp(t, i, e);
        else if (t.tag === 19) pp(t, i, e);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (u) {
      case "forwards":
        for (i = e.child, u = null; i !== null; )
          ((t = i.alternate), t !== null && or(t) === null && (u = i), (i = i.sibling));
        ((i = u),
          i === null ? ((u = e.child), (e.child = null)) : ((u = i.sibling), (i.sibling = null)),
          cc(e, !1, u, i, c, l));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && or(t) === null)) {
            e.child = u;
            break;
          }
          ((t = u.sibling), (u.sibling = i), (i = u), (u = t));
        }
        cc(e, !0, i, null, c, l);
        break;
      case "together":
        cc(e, !1, null, null, void 0, l);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Vn(t, e, i) {
    if ((t !== null && (e.dependencies = t.dependencies), (fa |= e.lanes), (i & e.childLanes) === 0))
      if (t !== null) {
        if ((zi(t, e, i, !1), (i & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, i = Rn(t, t.pendingProps), e.child = i, i.return = e; t.sibling !== null; )
        ((t = t.sibling), (i = i.sibling = Rn(t, t.pendingProps)), (i.return = e));
      i.sibling = null;
    }
    return e.child;
  }
  function fc(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && tr(t)));
  }
  function N1(t, e, i) {
    switch (e.tag) {
      case 3:
        (Ft(e, e.stateNode.containerInfo), aa(e, ie, t.memoizedState.cache), qa());
        break;
      case 27:
      case 5:
        un(e);
        break;
      case 4:
        Ft(e, e.stateNode.containerInfo);
        break;
      case 10:
        aa(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), Vu(e), null);
        break;
      case 13:
        var l = e.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (ra(e), (e.flags |= 128), null)
            : (i & e.child.childLanes) !== 0
              ? mp(t, e, i)
              : (ra(e), (t = Vn(t, e, i)), t !== null ? t.sibling : null);
        ra(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (((l = (i & e.childLanes) !== 0), l || (zi(t, e, i, !1), (l = (i & e.childLanes) !== 0)), u)) {
          if (l) return yp(t, e, i);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          W(ee, ee.current),
          l)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), op(t, e, i, e.pendingProps));
      case 24:
        aa(e, ie, t.memoizedState.cache);
    }
    return Vn(t, e, i);
  }
  function gp(t, e, i) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) le = !0;
      else {
        if (!fc(t, i) && (e.flags & 128) === 0) return ((le = !1), N1(t, e, i));
        le = (t.flags & 131072) !== 0;
      }
    else ((le = !1), Rt && (e.flags & 1048576) !== 0 && Ph(e, Rs, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var l = e.pendingProps;
          if (((t = Qa(e.elementType)), (e.type = t), typeof t == "function"))
            yu(t)
              ? ((l = Wa(t, l)), (e.tag = 1), (e = dp(null, e, t, l, i)))
              : ((e.tag = 0), (e = ic(null, e, t, l, i)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === G) {
                ((e.tag = 11), (e = sp(null, e, t, l, i)));
                break t;
              } else if (u === K) {
                ((e.tag = 14), (e = lp(null, e, t, l, i)));
                break t;
              }
            }
            throw ((e = Ht(t) || t), Error(r(306, e, "")));
          }
        }
        return e;
      case 0:
        return ic(t, e, e.type, e.pendingProps, i);
      case 1:
        return ((l = e.type), (u = Wa(l, e.pendingProps)), dp(t, e, l, u, i));
      case 3:
        t: {
          if ((Ft(e, e.stateNode.containerInfo), t === null)) throw Error(r(387));
          l = e.pendingProps;
          var c = e.memoizedState;
          ((u = c.element), Ou(t, e), Bs(e, l, null, i));
          var m = e.memoizedState;
          if (
            ((l = m.cache),
            aa(e, ie, l),
            l !== c.cache && Eu(e, [ie], i, !0),
            Us(),
            (l = m.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: l, isDehydrated: !1, cache: m.cache }),
              (e.updateQueue.baseState = c),
              (e.memoizedState = c),
              e.flags & 256)
            ) {
              e = hp(t, e, l, i);
              break t;
            } else if (l !== u) {
              ((u = $e(Error(r(424)), e)), Os(u), (e = hp(t, e, l, i)));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                Jt = an(t.firstChild),
                  ve = e,
                  Rt = !0,
                  ea = null,
                  en = !0,
                  i = om(e, null, l, i),
                  e.child = i;
                i;
              )
                ((i.flags = (i.flags & -3) | 4096), (i = i.sibling));
            }
          else {
            if ((qa(), l === u)) {
              e = Vn(t, e, i);
              break t;
            }
            xe(t, e, l, i);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          br(t, e),
          t === null
            ? (i = Cy(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = i)
              : Rt ||
                ((i = e.type),
                (t = e.pendingProps),
                (l = Vr(ct.current).createElement(i)),
                (l[ge] = e),
                (l[De] = t),
                Se(l, i, t),
                me(l),
                (e.stateNode = l))
            : (e.memoizedState = Cy(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          un(e),
          t === null &&
            Rt &&
            ((l = e.stateNode = Ey(e.type, e.pendingProps, ct.current)),
            (ve = e),
            (en = !0),
            (u = Jt),
            ya(e.type) ? ((Yc = u), (Jt = an(l.firstChild))) : (Jt = u)),
          xe(t, e, e.pendingProps.children, i),
          br(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            Rt &&
            ((u = l = Jt) &&
              ((l = cS(l, e.type, e.pendingProps, en)),
              l !== null
                ? ((e.stateNode = l), (ve = e), (Jt = an(l.firstChild)), (en = !1), (u = !0))
                : (u = !1)),
            u || na(e)),
          un(e),
          (u = e.type),
          (c = e.pendingProps),
          (m = t !== null ? t.memoizedProps : null),
          (l = c.children),
          Lc(u, c) ? (l = null) : m !== null && Lc(u, m) && (e.flags |= 32),
          e.memoizedState !== null && ((u = Bu(t, e, E1, null, null, i)), (il._currentValue = u)),
          br(t, e),
          xe(t, e, l, i),
          e.child
        );
      case 6:
        return (
          t === null &&
            Rt &&
            ((t = i = Jt) &&
              ((i = fS(i, e.pendingProps, en)),
              i !== null ? ((e.stateNode = i), (ve = e), (Jt = null), (t = !0)) : (t = !1)),
            t || na(e)),
          null
        );
      case 13:
        return mp(t, e, i);
      case 4:
        return (
          Ft(e, e.stateNode.containerInfo),
          (l = e.pendingProps),
          t === null ? (e.child = Pa(e, null, l, i)) : xe(t, e, l, i),
          e.child
        );
      case 11:
        return sp(t, e, e.type, e.pendingProps, i);
      case 7:
        return (xe(t, e, e.pendingProps, i), e.child);
      case 8:
        return (xe(t, e, e.pendingProps.children, i), e.child);
      case 12:
        return (xe(t, e, e.pendingProps.children, i), e.child);
      case 10:
        return ((l = e.pendingProps), aa(e, e.type, l.value), xe(t, e, l.children, i), e.child);
      case 9:
        return (
          (u = e.type._context),
          (l = e.pendingProps.children),
          Xa(e),
          (u = be(u)),
          (l = l(u)),
          (e.flags |= 1),
          xe(t, e, l, i),
          e.child
        );
      case 14:
        return lp(t, e, e.type, e.pendingProps, i);
      case 15:
        return rp(t, e, e.type, e.pendingProps, i);
      case 19:
        return yp(t, e, i);
      case 31:
        return k1(t, e, i);
      case 22:
        return op(t, e, i, e.pendingProps);
      case 24:
        return (
          Xa(e),
          (l = be(ie)),
          t === null
            ? ((u = Cu()),
              u === null &&
                ((u = Kt),
                (c = wu()),
                (u.pooledCache = c),
                c.refCount++,
                c !== null && (u.pooledCacheLanes |= i),
                (u = c)),
              (e.memoizedState = { parent: l, cache: u }),
              Ru(e),
              aa(e, ie, u))
            : ((t.lanes & i) !== 0 && (Ou(t, e), Bs(e, null, null, i), Us()),
              (u = t.memoizedState),
              (c = e.memoizedState),
              u.parent !== l
                ? ((u = { parent: l, cache: l }),
                  (e.memoizedState = u),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u),
                  aa(e, ie, l))
                : ((l = c.cache), aa(e, ie, l), l !== u.cache && Eu(e, [ie], i, !0))),
          xe(t, e, e.pendingProps.children, i),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function Un(t) {
    t.flags |= 4;
  }
  function dc(t, e, i, l, u) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Yp()) t.flags |= 8192;
        else throw ((Ja = ir), Du);
    } else t.flags &= -16777217;
  }
  function vp(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !ky(e)))
      if (Yp()) t.flags |= 8192;
      else throw ((Ja = ir), Du);
  }
  function Sr(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? Wd() : 536870912), (t.lanes |= e), (Yi |= e)));
  }
  function Ys(t, e) {
    if (!Rt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var i = null; e !== null; ) (e.alternate !== null && (i = e), (e = e.sibling));
          i === null ? (t.tail = null) : (i.sibling = null);
          break;
        case "collapsed":
          i = t.tail;
          for (var l = null; i !== null; ) (i.alternate !== null && (l = i), (i = i.sibling));
          l === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function Pt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      i = 0,
      l = 0;
    if (e)
      for (var u = t.child; u !== null; )
        ((i |= u.lanes | u.childLanes),
          (l |= u.subtreeFlags & 65011712),
          (l |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling));
    else
      for (u = t.child; u !== null; )
        ((i |= u.lanes | u.childLanes),
          (l |= u.subtreeFlags),
          (l |= u.flags),
          (u.return = t),
          (u = u.sibling));
    return ((t.subtreeFlags |= l), (t.childLanes = i), e);
  }
  function j1(t, e, i) {
    var l = e.pendingProps;
    switch ((xu(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Pt(e), null);
      case 1:
        return (Pt(e), null);
      case 3:
        return (
          (i = e.stateNode),
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          kn(ie),
          bt(),
          i.pendingContext && ((i.context = i.pendingContext), (i.pendingContext = null)),
          (t === null || t.child === null) &&
            (Oi(e)
              ? Un(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Tu())),
          Pt(e),
          null
        );
      case 26:
        var u = e.type,
          c = e.memoizedState;
        return (
          t === null
            ? (Un(e), c !== null ? (Pt(e), vp(e, c)) : (Pt(e), dc(e, u, null, l, i)))
            : c
              ? c !== t.memoizedState
                ? (Un(e), Pt(e), vp(e, c))
                : (Pt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== l && Un(e), Pt(e), dc(e, u, t, l, i)),
          null
        );
      case 27:
        if ((Je(e), (i = ct.current), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== l && Un(e);
        else {
          if (!l) {
            if (e.stateNode === null) throw Error(r(166));
            return (Pt(e), null);
          }
          ((t = tt.current), Oi(e) ? Wh(e) : ((t = Ey(u, l, i)), (e.stateNode = t), Un(e)));
        }
        return (Pt(e), null);
      case 5:
        if ((Je(e), (u = e.type), t !== null && e.stateNode != null)) t.memoizedProps !== l && Un(e);
        else {
          if (!l) {
            if (e.stateNode === null) throw Error(r(166));
            return (Pt(e), null);
          }
          if (((c = tt.current), Oi(e))) Wh(e);
          else {
            var m = Vr(ct.current);
            switch (c) {
              case 1:
                c = m.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                c = m.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    c = m.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    c = m.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                    break;
                  case "script":
                    ((c = m.createElement("div")),
                      (c.innerHTML = "<script><\/script>"),
                      (c = c.removeChild(c.firstChild)));
                    break;
                  case "select":
                    ((c =
                      typeof l.is == "string"
                        ? m.createElement("select", { is: l.is })
                        : m.createElement("select")),
                      l.multiple ? (c.multiple = !0) : l.size && (c.size = l.size));
                    break;
                  default:
                    c = typeof l.is == "string" ? m.createElement(u, { is: l.is }) : m.createElement(u);
                }
            }
            ((c[ge] = e), (c[De] = l));
            t: for (m = e.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6) c.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                ((m.child.return = m), (m = m.child));
                continue;
              }
              if (m === e) break t;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === e) break t;
                m = m.return;
              }
              ((m.sibling.return = m.return), (m = m.sibling));
            }
            e.stateNode = c;
            t: switch ((Se(c, u, l), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break t;
              case "img":
                l = !0;
                break t;
              default:
                l = !1;
            }
            l && Un(e);
          }
        }
        return (Pt(e), dc(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, i), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== l && Un(e);
        else {
          if (typeof l != "string" && e.stateNode === null) throw Error(r(166));
          if (((t = ct.current), Oi(e))) {
            if (((t = e.stateNode), (i = e.memoizedProps), (l = null), (u = ve), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            ((t[ge] = e),
              (t = !!(
                t.nodeValue === i ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                my(t.nodeValue, i)
              )),
              t || na(e, !0));
          } else ((t = Vr(t).createTextNode(l)), (t[ge] = e), (e.stateNode = t));
        }
        return (Pt(e), null);
      case 31:
        if (((i = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((l = Oi(e)), i !== null)) {
            if (t === null) {
              if (!l) throw Error(r(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(r(557));
              t[ge] = e;
            } else (qa(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Pt(e), (t = !1));
          } else
            ((i = Tu()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i),
              (t = !0));
          if (!t) return e.flags & 256 ? (qe(e), e) : (qe(e), null);
          if ((e.flags & 128) !== 0) throw Error(r(558));
        }
        return (Pt(e), null);
      case 13:
        if (
          ((l = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = Oi(e)), l !== null && l.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(r(318));
              if (((u = e.memoizedState), (u = u !== null ? u.dehydrated : null), !u)) throw Error(r(317));
              u[ge] = e;
            } else (qa(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Pt(e), (u = !1));
          } else
            ((u = Tu()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return e.flags & 256 ? (qe(e), e) : (qe(e), null);
        }
        return (
          qe(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = i), e)
            : ((i = l !== null),
              (t = t !== null && t.memoizedState !== null),
              i &&
                ((l = e.child),
                (u = null),
                l.alternate !== null &&
                  l.alternate.memoizedState !== null &&
                  l.alternate.memoizedState.cachePool !== null &&
                  (u = l.alternate.memoizedState.cachePool.pool),
                (c = null),
                l.memoizedState !== null &&
                  l.memoizedState.cachePool !== null &&
                  (c = l.memoizedState.cachePool.pool),
                c !== u && (l.flags |= 2048)),
              i !== t && i && (e.child.flags |= 8192),
              Sr(e, e.updateQueue),
              Pt(e),
              null)
        );
      case 4:
        return (bt(), t === null && Nc(e.stateNode.containerInfo), Pt(e), null);
      case 10:
        return (kn(e.type), Pt(e), null);
      case 19:
        if ((B(ee), (l = e.memoizedState), l === null)) return (Pt(e), null);
        if (((u = (e.flags & 128) !== 0), (c = l.rendering), c === null))
          if (u) Ys(l, !1);
          else {
            if (It !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((c = or(t)), c !== null)) {
                  for (
                    e.flags |= 128,
                      Ys(l, !1),
                      t = c.updateQueue,
                      e.updateQueue = t,
                      Sr(e, t),
                      e.subtreeFlags = 0,
                      t = i,
                      i = e.child;
                    i !== null;
                  )
                    (Kh(i, t), (i = i.sibling));
                  return (W(ee, (ee.current & 1) | 2), Rt && On(e, l.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            l.tail !== null && Ue() > wr && ((e.flags |= 128), (u = !0), Ys(l, !1), (e.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = or(c)), t !== null)) {
              if (
                ((e.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Sr(e, t),
                Ys(l, !0),
                l.tail === null && l.tailMode === "hidden" && !c.alternate && !Rt)
              )
                return (Pt(e), null);
            } else
              2 * Ue() - l.renderingStartTime > wr &&
                i !== 536870912 &&
                ((e.flags |= 128), (u = !0), Ys(l, !1), (e.lanes = 4194304));
          l.isBackwards
            ? ((c.sibling = e.child), (e.child = c))
            : ((t = l.last), t !== null ? (t.sibling = c) : (e.child = c), (l.last = c));
        }
        return l.tail !== null
          ? ((t = l.tail),
            (l.rendering = t),
            (l.tail = t.sibling),
            (l.renderingStartTime = Ue()),
            (t.sibling = null),
            (i = ee.current),
            W(ee, u ? (i & 1) | 2 : i & 1),
            Rt && On(e, l.treeForkCount),
            t)
          : (Pt(e), null);
      case 22:
      case 23:
        return (
          qe(e),
          ju(),
          (l = e.memoizedState !== null),
          t !== null ? (t.memoizedState !== null) !== l && (e.flags |= 8192) : l && (e.flags |= 8192),
          l
            ? (i & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Pt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Pt(e),
          (i = e.updateQueue),
          i !== null && Sr(e, i.retryQueue),
          (i = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (i = t.memoizedState.cachePool.pool),
          (l = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          l !== i && (e.flags |= 2048),
          t !== null && B(Ka),
          null
        );
      case 24:
        return (
          (i = null),
          t !== null && (i = t.memoizedState.cache),
          e.memoizedState.cache !== i && (e.flags |= 2048),
          kn(ie),
          Pt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function V1(t, e) {
    switch ((xu(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          kn(ie),
          bt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (Je(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((qe(e), e.alternate === null)) throw Error(r(340));
          qa();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((qe(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(r(340));
          qa();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (B(ee), null);
      case 4:
        return (bt(), null);
      case 10:
        return (kn(e.type), null);
      case 22:
      case 23:
        return (
          qe(e),
          ju(),
          t !== null && B(Ka),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (kn(ie), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function bp(t, e) {
    switch ((xu(e), e.tag)) {
      case 3:
        (kn(ie), bt());
        break;
      case 26:
      case 27:
      case 5:
        Je(e);
        break;
      case 4:
        bt();
        break;
      case 31:
        e.memoizedState !== null && qe(e);
        break;
      case 13:
        qe(e);
        break;
      case 19:
        B(ee);
        break;
      case 10:
        kn(e.type);
        break;
      case 22:
      case 23:
        (qe(e), ju(), t !== null && B(Ka));
        break;
      case 24:
        kn(ie);
    }
  }
  function Xs(t, e) {
    try {
      var i = e.updateQueue,
        l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        i = u;
        do {
          if ((i.tag & t) === t) {
            l = void 0;
            var c = i.create,
              m = i.inst;
            ((l = c()), (m.destroy = l));
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (v) {
      Lt(e, e.return, v);
    }
  }
  function ua(t, e, i) {
    try {
      var l = e.updateQueue,
        u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        l = c;
        do {
          if ((l.tag & t) === t) {
            var m = l.inst,
              v = m.destroy;
            if (v !== void 0) {
              ((m.destroy = void 0), (u = e));
              var S = i,
                D = v;
              try {
                D();
              } catch (U) {
                Lt(u, S, U);
              }
            }
          }
          l = l.next;
        } while (l !== c);
      }
    } catch (U) {
      Lt(e, e.return, U);
    }
  }
  function xp(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var i = t.stateNode;
      try {
        cm(e, i);
      } catch (l) {
        Lt(t, t.return, l);
      }
    }
  }
  function Sp(t, e, i) {
    ((i.props = Wa(t.type, t.memoizedProps)), (i.state = t.memoizedState));
    try {
      i.componentWillUnmount();
    } catch (l) {
      Lt(t, e, l);
    }
  }
  function Ks(t, e) {
    try {
      var i = t.ref;
      if (i !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof i == "function" ? (t.refCleanup = i(l)) : (i.current = l);
      }
    } catch (u) {
      Lt(t, e, u);
    }
  }
  function bn(t, e) {
    var i = t.ref,
      l = t.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          Lt(t, e, u);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Lt(t, e, u);
        }
      else i.current = null;
  }
  function Tp(t) {
    var e = t.type,
      i = t.memoizedProps,
      l = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && l.focus();
          break t;
        case "img":
          i.src ? (l.src = i.src) : i.srcSet && (l.srcset = i.srcSet);
      }
    } catch (u) {
      Lt(t, t.return, u);
    }
  }
  function hc(t, e, i) {
    try {
      var l = t.stateNode;
      (iS(l, t.type, i, e), (l[De] = e));
    } catch (u) {
      Lt(t, t.return, u);
    }
  }
  function Ap(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && ya(t.type)) || t.tag === 4;
  }
  function mc(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ap(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if ((t.tag === 27 && ya(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function pc(t, e, i) {
    var l = t.tag;
    if (l === 5 || l === 6)
      ((t = t.stateNode),
        e
          ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, e)
          : ((e = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i),
            e.appendChild(t),
            (i = i._reactRootContainer),
            i != null || e.onclick !== null || (e.onclick = Cn)));
    else if (
      l !== 4 &&
      (l === 27 && ya(t.type) && ((i = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (pc(t, e, i), t = t.sibling; t !== null; ) (pc(t, e, i), (t = t.sibling));
  }
  function Tr(t, e, i) {
    var l = t.tag;
    if (l === 5 || l === 6) ((t = t.stateNode), e ? i.insertBefore(t, e) : i.appendChild(t));
    else if (l !== 4 && (l === 27 && ya(t.type) && (i = t.stateNode), (t = t.child), t !== null))
      for (Tr(t, e, i), t = t.sibling; t !== null; ) (Tr(t, e, i), (t = t.sibling));
  }
  function _p(t) {
    var e = t.stateNode,
      i = t.memoizedProps;
    try {
      for (var l = t.type, u = e.attributes; u.length; ) e.removeAttributeNode(u[0]);
      (Se(e, l, i), (e[ge] = t), (e[De] = i));
    } catch (c) {
      Lt(t, t.return, c);
    }
  }
  var Bn = !1,
    re = !1,
    yc = !1,
    Ep = typeof WeakSet == "function" ? WeakSet : Set,
    pe = null;
  function U1(t, e) {
    if (((t = t.containerInfo), (Uc = qr), (t = Uh(t)), uu(t))) {
      if ("selectionStart" in t) var i = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          i = ((i = t.ownerDocument) && i.defaultView) || window;
          var l = i.getSelection && i.getSelection();
          if (l && l.rangeCount !== 0) {
            i = l.anchorNode;
            var u = l.anchorOffset,
              c = l.focusNode;
            l = l.focusOffset;
            try {
              (i.nodeType, c.nodeType);
            } catch {
              i = null;
              break t;
            }
            var m = 0,
              v = -1,
              S = -1,
              D = 0,
              U = 0,
              H = t,
              R = null;
            e: for (;;) {
              for (
                var z;
                H !== i || (u !== 0 && H.nodeType !== 3) || (v = m + u),
                  H !== c || (l !== 0 && H.nodeType !== 3) || (S = m + l),
                  H.nodeType === 3 && (m += H.nodeValue.length),
                  (z = H.firstChild) !== null;
              )
                ((R = H), (H = z));
              for (;;) {
                if (H === t) break e;
                if (
                  (R === i && ++D === u && (v = m),
                  R === c && ++U === l && (S = m),
                  (z = H.nextSibling) !== null)
                )
                  break;
                ((H = R), (R = H.parentNode));
              }
              H = z;
            }
            i = v === -1 || S === -1 ? null : { start: v, end: S };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Bc = { focusedElem: t, selectionRange: i }, qr = !1, pe = e; pe !== null; )
      if (((e = pe), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null)) ((t.return = e), (pe = t));
      else
        for (; pe !== null; ) {
          switch (((e = pe), (c = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if ((t & 4) !== 0 && ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null))
                for (i = 0; i < t.length; i++) ((u = t[i]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && c !== null) {
                ((t = void 0), (i = e), (u = c.memoizedProps), (c = c.memoizedState), (l = i.stateNode));
                try {
                  var at = Wa(i.type, u);
                  ((t = l.getSnapshotBeforeUpdate(at, c)), (l.__reactInternalSnapshotBeforeUpdate = t));
                } catch (ht) {
                  Lt(i, i.return, ht);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (i = t.nodeType), i === 9)) Zc(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Zc(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), (pe = t));
            break;
          }
          pe = e.return;
        }
  }
  function wp(t, e, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        (Hn(t, i), l & 4 && Xs(5, i));
        break;
      case 1:
        if ((Hn(t, i), l & 4))
          if (((t = i.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (m) {
              Lt(i, i.return, m);
            }
          else {
            var u = Wa(i.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (m) {
              Lt(i, i.return, m);
            }
          }
        (l & 64 && xp(i), l & 512 && Ks(i, i.return));
        break;
      case 3:
        if ((Hn(t, i), l & 64 && ((t = i.updateQueue), t !== null))) {
          if (((e = null), i.child !== null))
            switch (i.child.tag) {
              case 27:
              case 5:
                e = i.child.stateNode;
                break;
              case 1:
                e = i.child.stateNode;
            }
          try {
            cm(t, e);
          } catch (m) {
            Lt(i, i.return, m);
          }
        }
        break;
      case 27:
        e === null && l & 4 && _p(i);
      case 26:
      case 5:
        (Hn(t, i), e === null && l & 4 && Tp(i), l & 512 && Ks(i, i.return));
        break;
      case 12:
        Hn(t, i);
        break;
      case 31:
        (Hn(t, i), l & 4 && Dp(t, i));
        break;
      case 13:
        (Hn(t, i),
          l & 4 && Rp(t, i),
          l & 64 &&
            ((t = i.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((i = K1.bind(null, i)), dS(t, i)))));
        break;
      case 22:
        if (((l = i.memoizedState !== null || Bn), !l)) {
          ((e = (e !== null && e.memoizedState !== null) || re), (u = Bn));
          var c = re;
          ((Bn = l), (re = e) && !c ? Zn(t, i, (i.subtreeFlags & 8772) !== 0) : Hn(t, i), (Bn = u), (re = c));
        }
        break;
      case 30:
        break;
      default:
        Hn(t, i);
    }
  }
  function Mp(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), Mp(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && Ko(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var Wt = null,
    Oe = !1;
  function Ln(t, e, i) {
    for (i = i.child; i !== null; ) (Cp(t, e, i), (i = i.sibling));
  }
  function Cp(t, e, i) {
    if (Be && typeof Be.onCommitFiberUnmount == "function")
      try {
        Be.onCommitFiberUnmount(ys, i);
      } catch {}
    switch (i.tag) {
      case 26:
        (re || bn(i, e),
          Ln(t, e, i),
          i.memoizedState
            ? i.memoizedState.count--
            : i.stateNode && ((i = i.stateNode), i.parentNode.removeChild(i)));
        break;
      case 27:
        re || bn(i, e);
        var l = Wt,
          u = Oe;
        (ya(i.type) && ((Wt = i.stateNode), (Oe = !1)), Ln(t, e, i), el(i.stateNode), (Wt = l), (Oe = u));
        break;
      case 5:
        re || bn(i, e);
      case 6:
        if (((l = Wt), (u = Oe), (Wt = null), Ln(t, e, i), (Wt = l), (Oe = u), Wt !== null))
          if (Oe)
            try {
              (Wt.nodeType === 9 ? Wt.body : Wt.nodeName === "HTML" ? Wt.ownerDocument.body : Wt).removeChild(
                i.stateNode,
              );
            } catch (c) {
              Lt(i, e, c);
            }
          else
            try {
              Wt.removeChild(i.stateNode);
            } catch (c) {
              Lt(i, e, c);
            }
        break;
      case 18:
        Wt !== null &&
          (Oe
            ? ((t = Wt),
              xy(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, i.stateNode),
              $i(t))
            : xy(Wt, i.stateNode));
        break;
      case 4:
        ((l = Wt), (u = Oe), (Wt = i.stateNode.containerInfo), (Oe = !0), Ln(t, e, i), (Wt = l), (Oe = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ua(2, i, e), re || ua(4, i, e), Ln(t, e, i));
        break;
      case 1:
        (re || (bn(i, e), (l = i.stateNode), typeof l.componentWillUnmount == "function" && Sp(i, e, l)),
          Ln(t, e, i));
        break;
      case 21:
        Ln(t, e, i);
        break;
      case 22:
        ((re = (l = re) || i.memoizedState !== null), Ln(t, e, i), (re = l));
        break;
      default:
        Ln(t, e, i);
    }
  }
  function Dp(t, e) {
    if (e.memoizedState === null && ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
      t = t.dehydrated;
      try {
        $i(t);
      } catch (i) {
        Lt(e, e.return, i);
      }
    }
  }
  function Rp(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        $i(t);
      } catch (i) {
        Lt(e, e.return, i);
      }
  }
  function B1(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new Ep()), e);
      case 22:
        return ((t = t.stateNode), (e = t._retryCache), e === null && (e = t._retryCache = new Ep()), e);
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Ar(t, e) {
    var i = B1(t);
    e.forEach(function (l) {
      if (!i.has(l)) {
        i.add(l);
        var u = Q1.bind(null, t, l);
        l.then(u, u);
      }
    });
  }
  function ze(t, e) {
    var i = e.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var u = i[l],
          c = t,
          m = e,
          v = m;
        t: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (ya(v.type)) {
                ((Wt = v.stateNode), (Oe = !1));
                break t;
              }
              break;
            case 5:
              ((Wt = v.stateNode), (Oe = !1));
              break t;
            case 3:
            case 4:
              ((Wt = v.stateNode.containerInfo), (Oe = !0));
              break t;
          }
          v = v.return;
        }
        if (Wt === null) throw Error(r(160));
        (Cp(c, m, u),
          (Wt = null),
          (Oe = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (Op(e, t), (e = e.sibling));
  }
  var fn = null;
  function Op(t, e) {
    var i = t.alternate,
      l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ze(e, t), ke(t), l & 4 && (ua(3, t, t.return), Xs(3, t), ua(5, t, t.return)));
        break;
      case 1:
        (ze(e, t),
          ke(t),
          l & 512 && (re || i === null || bn(i, i.return)),
          l & 64 &&
            Bn &&
            ((t = t.updateQueue),
            t !== null &&
              ((l = t.callbacks),
              l !== null &&
                ((i = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = i === null ? l : i.concat(l))))));
        break;
      case 26:
        var u = fn;
        if ((ze(e, t), ke(t), l & 512 && (re || i === null || bn(i, i.return)), l & 4)) {
          var c = i !== null ? i.memoizedState : null;
          if (((l = t.memoizedState), i === null))
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  ((l = t.type), (i = t.memoizedProps), (u = u.ownerDocument || u));
                  e: switch (l) {
                    case "title":
                      ((c = u.getElementsByTagName("title")[0]),
                        (!c ||
                          c[bs] ||
                          c[ge] ||
                          c.namespaceURI === "http://www.w3.org/2000/svg" ||
                          c.hasAttribute("itemprop")) &&
                          ((c = u.createElement(l)), u.head.insertBefore(c, u.querySelector("head > title"))),
                        Se(c, l, i),
                        (c[ge] = t),
                        me(c),
                        (l = c));
                      break t;
                    case "link":
                      var m = Oy("link", "href", u).get(l + (i.href || ""));
                      if (m) {
                        for (var v = 0; v < m.length; v++)
                          if (
                            ((c = m[v]),
                            c.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) &&
                              c.getAttribute("rel") === (i.rel == null ? null : i.rel) &&
                              c.getAttribute("title") === (i.title == null ? null : i.title) &&
                              c.getAttribute("crossorigin") ===
                                (i.crossOrigin == null ? null : i.crossOrigin))
                          ) {
                            m.splice(v, 1);
                            break e;
                          }
                      }
                      ((c = u.createElement(l)), Se(c, l, i), u.head.appendChild(c));
                      break;
                    case "meta":
                      if ((m = Oy("meta", "content", u).get(l + (i.content || "")))) {
                        for (v = 0; v < m.length; v++)
                          if (
                            ((c = m[v]),
                            c.getAttribute("content") === (i.content == null ? null : "" + i.content) &&
                              c.getAttribute("name") === (i.name == null ? null : i.name) &&
                              c.getAttribute("property") === (i.property == null ? null : i.property) &&
                              c.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) &&
                              c.getAttribute("charset") === (i.charSet == null ? null : i.charSet))
                          ) {
                            m.splice(v, 1);
                            break e;
                          }
                      }
                      ((c = u.createElement(l)), Se(c, l, i), u.head.appendChild(c));
                      break;
                    default:
                      throw Error(r(468, l));
                  }
                  ((c[ge] = t), me(c), (l = c));
                }
                t.stateNode = l;
              } else zy(u, t.type, t.stateNode);
            else t.stateNode = Ry(u, l, t.memoizedProps);
          else
            c !== l
              ? (c === null
                  ? i.stateNode !== null && ((i = i.stateNode), i.parentNode.removeChild(i))
                  : c.count--,
                l === null ? zy(u, t.type, t.stateNode) : Ry(u, l, t.memoizedProps))
              : l === null && t.stateNode !== null && hc(t, t.memoizedProps, i.memoizedProps);
        }
        break;
      case 27:
        (ze(e, t),
          ke(t),
          l & 512 && (re || i === null || bn(i, i.return)),
          i !== null && l & 4 && hc(t, t.memoizedProps, i.memoizedProps));
        break;
      case 5:
        if ((ze(e, t), ke(t), l & 512 && (re || i === null || bn(i, i.return)), t.flags & 32)) {
          u = t.stateNode;
          try {
            Si(u, "");
          } catch (at) {
            Lt(t, t.return, at);
          }
        }
        (l & 4 && t.stateNode != null && ((u = t.memoizedProps), hc(t, u, i !== null ? i.memoizedProps : u)),
          l & 1024 && (yc = !0));
        break;
      case 6:
        if ((ze(e, t), ke(t), l & 4)) {
          if (t.stateNode === null) throw Error(r(162));
          ((l = t.memoizedProps), (i = t.stateNode));
          try {
            i.nodeValue = l;
          } catch (at) {
            Lt(t, t.return, at);
          }
        }
        break;
      case 3:
        if (
          ((Lr = null),
          (u = fn),
          (fn = Ur(e.containerInfo)),
          ze(e, t),
          (fn = u),
          ke(t),
          l & 4 && i !== null && i.memoizedState.isDehydrated)
        )
          try {
            $i(e.containerInfo);
          } catch (at) {
            Lt(t, t.return, at);
          }
        yc && ((yc = !1), zp(t));
        break;
      case 4:
        ((l = fn), (fn = Ur(t.stateNode.containerInfo)), ze(e, t), ke(t), (fn = l));
        break;
      case 12:
        (ze(e, t), ke(t));
        break;
      case 31:
        (ze(e, t), ke(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Ar(t, l))));
        break;
      case 13:
        (ze(e, t),
          ke(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (i !== null && i.memoizedState !== null) &&
            (Er = Ue()),
          l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Ar(t, l))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var S = i !== null && i.memoizedState !== null,
          D = Bn,
          U = re;
        if (((Bn = D || u), (re = U || S), ze(e, t), (re = U), (Bn = D), ke(t), l & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (i === null || S || Bn || re || $a(t)),
              i = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (i === null) {
                S = i = e;
                try {
                  if (((c = S.stateNode), u))
                    ((m = c.style),
                      typeof m.setProperty == "function"
                        ? m.setProperty("display", "none", "important")
                        : (m.display = "none"));
                  else {
                    v = S.stateNode;
                    var H = S.memoizedProps.style,
                      R = H != null && H.hasOwnProperty("display") ? H.display : null;
                    v.style.display = R == null || typeof R == "boolean" ? "" : ("" + R).trim();
                  }
                } catch (at) {
                  Lt(S, S.return, at);
                }
              }
            } else if (e.tag === 6) {
              if (i === null) {
                S = e;
                try {
                  S.stateNode.nodeValue = u ? "" : S.memoizedProps;
                } catch (at) {
                  Lt(S, S.return, at);
                }
              }
            } else if (e.tag === 18) {
              if (i === null) {
                S = e;
                try {
                  var z = S.stateNode;
                  u ? Sy(z, !0) : Sy(S.stateNode, !1);
                } catch (at) {
                  Lt(S, S.return, at);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) || e.memoizedState === null || e === t) &&
              e.child !== null
            ) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              (i === e && (i = null), (e = e.return));
            }
            (i === e && (i = null), (e.sibling.return = e.return), (e = e.sibling));
          }
        l & 4 &&
          ((l = t.updateQueue),
          l !== null && ((i = l.retryQueue), i !== null && ((l.retryQueue = null), Ar(t, i))));
        break;
      case 19:
        (ze(e, t), ke(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Ar(t, l))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (ze(e, t), ke(t));
    }
  }
  function ke(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var i, l = t.return; l !== null; ) {
          if (Ap(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(r(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode,
              c = mc(t);
            Tr(t, c, u);
            break;
          case 5:
            var m = i.stateNode;
            i.flags & 32 && (Si(m, ""), (i.flags &= -33));
            var v = mc(t);
            Tr(t, v, m);
            break;
          case 3:
          case 4:
            var S = i.stateNode.containerInfo,
              D = mc(t);
            pc(t, D, S);
            break;
          default:
            throw Error(r(161));
        }
      } catch (U) {
        Lt(t, t.return, U);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function zp(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (zp(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function Hn(t, e) {
    if (e.subtreeFlags & 8772) for (e = e.child; e !== null; ) (wp(t, e.alternate, e), (e = e.sibling));
  }
  function $a(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (ua(4, e, e.return), $a(e));
          break;
        case 1:
          bn(e, e.return);
          var i = e.stateNode;
          (typeof i.componentWillUnmount == "function" && Sp(e, e.return, i), $a(e));
          break;
        case 27:
          el(e.stateNode);
        case 26:
        case 5:
          (bn(e, e.return), $a(e));
          break;
        case 22:
          e.memoizedState === null && $a(e);
          break;
        case 30:
          $a(e);
          break;
        default:
          $a(e);
      }
      t = t.sibling;
    }
  }
  function Zn(t, e, i) {
    for (i = i && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var l = e.alternate,
        u = t,
        c = e,
        m = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (Zn(u, c, i), Xs(4, c));
          break;
        case 1:
          if ((Zn(u, c, i), (l = c), (u = l.stateNode), typeof u.componentDidMount == "function"))
            try {
              u.componentDidMount();
            } catch (D) {
              Lt(l, l.return, D);
            }
          if (((l = c), (u = l.updateQueue), u !== null)) {
            var v = l.stateNode;
            try {
              var S = u.shared.hiddenCallbacks;
              if (S !== null) for (u.shared.hiddenCallbacks = null, u = 0; u < S.length; u++) um(S[u], v);
            } catch (D) {
              Lt(l, l.return, D);
            }
          }
          (i && m & 64 && xp(c), Ks(c, c.return));
          break;
        case 27:
          _p(c);
        case 26:
        case 5:
          (Zn(u, c, i), i && l === null && m & 4 && Tp(c), Ks(c, c.return));
          break;
        case 12:
          Zn(u, c, i);
          break;
        case 31:
          (Zn(u, c, i), i && m & 4 && Dp(u, c));
          break;
        case 13:
          (Zn(u, c, i), i && m & 4 && Rp(u, c));
          break;
        case 22:
          (c.memoizedState === null && Zn(u, c, i), Ks(c, c.return));
          break;
        case 30:
          break;
        default:
          Zn(u, c, i);
      }
      e = e.sibling;
    }
  }
  function gc(t, e) {
    var i = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (i = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool),
      t !== i && (t != null && t.refCount++, i != null && zs(i)));
  }
  function vc(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && zs(t)));
  }
  function dn(t, e, i, l) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (kp(t, e, i, l), (e = e.sibling));
  }
  function kp(t, e, i, l) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (dn(t, e, i, l), u & 2048 && Xs(9, e));
        break;
      case 1:
        dn(t, e, i, l);
        break;
      case 3:
        (dn(t, e, i, l),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && zs(t))));
        break;
      case 12:
        if (u & 2048) {
          (dn(t, e, i, l), (t = e.stateNode));
          try {
            var c = e.memoizedProps,
              m = c.id,
              v = c.onPostCommit;
            typeof v == "function" &&
              v(m, e.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
          } catch (S) {
            Lt(e, e.return, S);
          }
        } else dn(t, e, i, l);
        break;
      case 31:
        dn(t, e, i, l);
        break;
      case 13:
        dn(t, e, i, l);
        break;
      case 23:
        break;
      case 22:
        ((c = e.stateNode),
          (m = e.alternate),
          e.memoizedState !== null
            ? c._visibility & 2
              ? dn(t, e, i, l)
              : Qs(t, e)
            : c._visibility & 2
              ? dn(t, e, i, l)
              : ((c._visibility |= 2), Zi(t, e, i, l, (e.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && gc(m, e));
        break;
      case 24:
        (dn(t, e, i, l), u & 2048 && vc(e.alternate, e));
        break;
      default:
        dn(t, e, i, l);
    }
  }
  function Zi(t, e, i, l, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var c = t,
        m = e,
        v = i,
        S = l,
        D = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (Zi(c, m, v, S, u), Xs(8, m));
          break;
        case 23:
          break;
        case 22:
          var U = m.stateNode;
          (m.memoizedState !== null
            ? U._visibility & 2
              ? Zi(c, m, v, S, u)
              : Qs(c, m)
            : ((U._visibility |= 2), Zi(c, m, v, S, u)),
            u && D & 2048 && gc(m.alternate, m));
          break;
        case 24:
          (Zi(c, m, v, S, u), u && D & 2048 && vc(m.alternate, m));
          break;
        default:
          Zi(c, m, v, S, u);
      }
      e = e.sibling;
    }
  }
  function Qs(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var i = t,
          l = e,
          u = l.flags;
        switch (l.tag) {
          case 22:
            (Qs(i, l), u & 2048 && gc(l.alternate, l));
            break;
          case 24:
            (Qs(i, l), u & 2048 && vc(l.alternate, l));
            break;
          default:
            Qs(i, l);
        }
        e = e.sibling;
      }
  }
  var Js = 8192;
  function Gi(t, e, i) {
    if (t.subtreeFlags & Js) for (t = t.child; t !== null; ) (Np(t, e, i), (t = t.sibling));
  }
  function Np(t, e, i) {
    switch (t.tag) {
      case 26:
        (Gi(t, e, i),
          t.flags & Js && t.memoizedState !== null && _S(i, fn, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Gi(t, e, i);
        break;
      case 3:
      case 4:
        var l = fn;
        ((fn = Ur(t.stateNode.containerInfo)), Gi(t, e, i), (fn = l));
        break;
      case 22:
        t.memoizedState === null &&
          ((l = t.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = Js), (Js = 16777216), Gi(t, e, i), (Js = l))
            : Gi(t, e, i));
        break;
      default:
        Gi(t, e, i);
    }
  }
  function jp(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function Ps(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var i = 0; i < e.length; i++) {
          var l = e[i];
          ((pe = l), Up(l, t));
        }
      jp(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Vp(t), (t = t.sibling));
  }
  function Vp(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Ps(t), t.flags & 2048 && ua(9, t, t.return));
        break;
      case 3:
        Ps(t);
        break;
      case 12:
        Ps(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), _r(t))
          : Ps(t);
        break;
      default:
        Ps(t);
    }
  }
  function _r(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var i = 0; i < e.length; i++) {
          var l = e[i];
          ((pe = l), Up(l, t));
        }
      jp(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (ua(8, e, e.return), _r(e));
          break;
        case 22:
          ((i = e.stateNode), i._visibility & 2 && ((i._visibility &= -3), _r(e)));
          break;
        default:
          _r(e);
      }
      t = t.sibling;
    }
  }
  function Up(t, e) {
    for (; pe !== null; ) {
      var i = pe;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ua(8, i, e);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var l = i.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          zs(i.memoizedState.cache);
      }
      if (((l = i.child), l !== null)) ((l.return = i), (pe = l));
      else
        t: for (i = t; pe !== null; ) {
          l = pe;
          var u = l.sibling,
            c = l.return;
          if ((Mp(l), l === i)) {
            pe = null;
            break t;
          }
          if (u !== null) {
            ((u.return = c), (pe = u));
            break t;
          }
          pe = c;
        }
    }
  }
  var L1 = {
      getCacheForType: function (t) {
        var e = be(ie),
          i = e.data.get(t);
        return (i === void 0 && ((i = t()), e.data.set(t, i)), i);
      },
      cacheSignal: function () {
        return be(ie).controller.signal;
      },
    },
    H1 = typeof WeakMap == "function" ? WeakMap : Map,
    Ut = 0,
    Kt = null,
    wt = null,
    Ct = 0,
    Bt = 0,
    Ye = null,
    ca = !1,
    qi = !1,
    bc = !1,
    Gn = 0,
    It = 0,
    fa = 0,
    Ia = 0,
    xc = 0,
    Xe = 0,
    Yi = 0,
    Fs = null,
    Ne = null,
    Sc = !1,
    Er = 0,
    Bp = 0,
    wr = 1 / 0,
    Mr = null,
    da = null,
    fe = 0,
    ha = null,
    Xi = null,
    qn = 0,
    Tc = 0,
    Ac = null,
    Lp = null,
    Ws = 0,
    _c = null;
  function Ke() {
    return (Ut & 2) !== 0 && Ct !== 0 ? Ct & -Ct : O.T !== null ? Rc() : eh();
  }
  function Hp() {
    if (Xe === 0)
      if ((Ct & 536870912) === 0 || Rt) {
        var t = jl;
        ((jl <<= 1), (jl & 3932160) === 0 && (jl = 262144), (Xe = t));
      } else Xe = 536870912;
    return ((t = Ge.current), t !== null && (t.flags |= 32), Xe);
  }
  function je(t, e, i) {
    (((t === Kt && (Bt === 2 || Bt === 9)) || t.cancelPendingCommit !== null) &&
      (Ki(t, 0), ma(t, Ct, Xe, !1)),
      vs(t, i),
      ((Ut & 2) === 0 || t !== Kt) &&
        (t === Kt && ((Ut & 2) === 0 && (Ia |= i), It === 4 && ma(t, Ct, Xe, !1)), xn(t)));
  }
  function Zp(t, e, i) {
    if ((Ut & 6) !== 0) throw Error(r(327));
    var l = (!i && (e & 127) === 0 && (e & t.expiredLanes) === 0) || gs(t, e),
      u = l ? q1(t, e) : wc(t, e, !0),
      c = l;
    do {
      if (u === 0) {
        qi && !l && ma(t, e, 0, !1);
        break;
      } else {
        if (((i = t.current.alternate), c && !Z1(i))) {
          ((u = wc(t, e, !1)), (c = !1));
          continue;
        }
        if (u === 2) {
          if (((c = e), t.errorRecoveryDisabledLanes & c)) var m = 0;
          else ((m = t.pendingLanes & -536870913), (m = m !== 0 ? m : m & 536870912 ? 536870912 : 0));
          if (m !== 0) {
            e = m;
            t: {
              var v = t;
              u = Fs;
              var S = v.current.memoizedState.isDehydrated;
              if ((S && (Ki(v, m).flags |= 256), (m = wc(v, m, !1)), m !== 2)) {
                if (bc && !S) {
                  ((v.errorRecoveryDisabledLanes |= c), (Ia |= c), (u = 4));
                  break t;
                }
                ((c = Ne), (Ne = u), c !== null && (Ne === null ? (Ne = c) : Ne.push.apply(Ne, c)));
              }
              u = m;
            }
            if (((c = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Ki(t, 0), ma(t, e, 0, !0));
          break;
        }
        t: {
          switch (((l = t), (c = u), c)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              ma(l, e, Xe, !ca);
              break t;
            case 2:
              Ne = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && ((u = Er + 300 - Ue()), 10 < u)) {
            if ((ma(l, e, Xe, !ca), Ul(l, 0, !0) !== 0)) break t;
            ((qn = e),
              (l.timeoutHandle = vy(
                Gp.bind(null, l, i, Ne, Mr, Sc, e, Xe, Ia, Yi, ca, c, "Throttled", -0, 0),
                u,
              )));
            break t;
          }
          Gp(l, i, Ne, Mr, Sc, e, Xe, Ia, Yi, ca, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    xn(t);
  }
  function Gp(t, e, i, l, u, c, m, v, S, D, U, H, R, z) {
    if (((t.timeoutHandle = -1), (H = e.subtreeFlags), H & 8192 || (H & 16785408) === 16785408)) {
      ((H = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Cn,
      }),
        Np(e, c, H));
      var at = (c & 62914560) === c ? Er - Ue() : (c & 4194048) === c ? Bp - Ue() : 0;
      if (((at = ES(H, at)), at !== null)) {
        ((qn = c),
          (t.cancelPendingCommit = at(Fp.bind(null, t, e, c, i, l, u, m, v, S, U, H, null, R, z))),
          ma(t, c, m, !D));
        return;
      }
    }
    Fp(t, e, c, i, l, u, m, v, S);
  }
  function Z1(t) {
    for (var e = t; ; ) {
      var i = e.tag;
      if (
        (i === 0 || i === 11 || i === 15) &&
        e.flags & 16384 &&
        ((i = e.updateQueue), i !== null && ((i = i.stores), i !== null))
      )
        for (var l = 0; l < i.length; l++) {
          var u = i[l],
            c = u.getSnapshot;
          u = u.value;
          try {
            if (!He(c(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((i = e.child), e.subtreeFlags & 16384 && i !== null)) ((i.return = e), (e = i));
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    }
    return !0;
  }
  function ma(t, e, i, l) {
    ((e &= ~xc),
      (e &= ~Ia),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      l && (t.warmLanes |= e),
      (l = t.expirationTimes));
    for (var u = e; 0 < u; ) {
      var c = 31 - Le(u),
        m = 1 << c;
      ((l[c] = -1), (u &= ~m));
    }
    i !== 0 && $d(t, i, e);
  }
  function Cr() {
    return (Ut & 6) === 0 ? ($s(0), !1) : !0;
  }
  function Ec() {
    if (wt !== null) {
      if (Bt === 0) var t = wt.return;
      else ((t = wt), (zn = Ya = null), Zu(t), (Vi = null), (Ns = 0), (t = wt));
      for (; t !== null; ) (bp(t.alternate, t), (t = t.return));
      wt = null;
    }
  }
  function Ki(t, e) {
    var i = t.timeoutHandle;
    (i !== -1 && ((t.timeoutHandle = -1), rS(i)),
      (i = t.cancelPendingCommit),
      i !== null && ((t.cancelPendingCommit = null), i()),
      (qn = 0),
      Ec(),
      (Kt = t),
      (wt = i = Rn(t.current, null)),
      (Ct = e),
      (Bt = 0),
      (Ye = null),
      (ca = !1),
      (qi = gs(t, e)),
      (bc = !1),
      (Yi = Xe = xc = Ia = fa = It = 0),
      (Ne = Fs = null),
      (Sc = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var u = 31 - Le(l),
          c = 1 << u;
        ((e |= t[u]), (l &= ~c));
      }
    return ((Gn = e), Pl(), i);
  }
  function qp(t, e) {
    ((xt = null),
      (O.H = Gs),
      e === ji || e === ar
        ? ((e = sm()), (Bt = 3))
        : e === Du
          ? ((e = sm()), (Bt = 4))
          : (Bt = e === ac ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1),
      (Ye = e),
      wt === null && ((It = 1), gr(t, $e(e, t.current))));
  }
  function Yp() {
    var t = Ge.current;
    return t === null
      ? !0
      : (Ct & 4194048) === Ct
        ? nn === null
        : (Ct & 62914560) === Ct || (Ct & 536870912) !== 0
          ? t === nn
          : !1;
  }
  function Xp() {
    var t = O.H;
    return ((O.H = Gs), t === null ? Gs : t);
  }
  function Kp() {
    var t = O.A;
    return ((O.A = L1), t);
  }
  function Dr() {
    ((It = 4),
      ca || ((Ct & 4194048) !== Ct && Ge.current !== null) || (qi = !0),
      ((fa & 134217727) === 0 && (Ia & 134217727) === 0) || Kt === null || ma(Kt, Ct, Xe, !1));
  }
  function wc(t, e, i) {
    var l = Ut;
    Ut |= 2;
    var u = Xp(),
      c = Kp();
    ((Kt !== t || Ct !== e) && ((Mr = null), Ki(t, e)), (e = !1));
    var m = It;
    t: do
      try {
        if (Bt !== 0 && wt !== null) {
          var v = wt,
            S = Ye;
          switch (Bt) {
            case 8:
              (Ec(), (m = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ge.current === null && (e = !0);
              var D = Bt;
              if (((Bt = 0), (Ye = null), Qi(t, v, S, D), i && qi)) {
                m = 0;
                break t;
              }
              break;
            default:
              ((D = Bt), (Bt = 0), (Ye = null), Qi(t, v, S, D));
          }
        }
        (G1(), (m = It));
        break;
      } catch (U) {
        qp(t, U);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (zn = Ya = null),
      (Ut = l),
      (O.H = u),
      (O.A = c),
      wt === null && ((Kt = null), (Ct = 0), Pl()),
      m
    );
  }
  function G1() {
    for (; wt !== null; ) Qp(wt);
  }
  function q1(t, e) {
    var i = Ut;
    Ut |= 2;
    var l = Xp(),
      u = Kp();
    Kt !== t || Ct !== e ? ((Mr = null), (wr = Ue() + 500), Ki(t, e)) : (qi = gs(t, e));
    t: do
      try {
        if (Bt !== 0 && wt !== null) {
          e = wt;
          var c = Ye;
          e: switch (Bt) {
            case 1:
              ((Bt = 0), (Ye = null), Qi(t, e, c, 1));
              break;
            case 2:
            case 9:
              if (am(c)) {
                ((Bt = 0), (Ye = null), Jp(e));
                break;
              }
              ((e = function () {
                ((Bt !== 2 && Bt !== 9) || Kt !== t || (Bt = 7), xn(t));
              }),
                c.then(e, e));
              break t;
            case 3:
              Bt = 7;
              break t;
            case 4:
              Bt = 5;
              break t;
            case 7:
              am(c) ? ((Bt = 0), (Ye = null), Jp(e)) : ((Bt = 0), (Ye = null), Qi(t, e, c, 7));
              break;
            case 5:
              var m = null;
              switch (wt.tag) {
                case 26:
                  m = wt.memoizedState;
                case 5:
                case 27:
                  var v = wt;
                  if (m ? ky(m) : v.stateNode.complete) {
                    ((Bt = 0), (Ye = null));
                    var S = v.sibling;
                    if (S !== null) wt = S;
                    else {
                      var D = v.return;
                      D !== null ? ((wt = D), Rr(D)) : (wt = null);
                    }
                    break e;
                  }
              }
              ((Bt = 0), (Ye = null), Qi(t, e, c, 5));
              break;
            case 6:
              ((Bt = 0), (Ye = null), Qi(t, e, c, 6));
              break;
            case 8:
              (Ec(), (It = 6));
              break t;
            default:
              throw Error(r(462));
          }
        }
        Y1();
        break;
      } catch (U) {
        qp(t, U);
      }
    while (!0);
    return (
      (zn = Ya = null),
      (O.H = l),
      (O.A = u),
      (Ut = i),
      wt !== null ? 0 : ((Kt = null), (Ct = 0), Pl(), It)
    );
  }
  function Y1() {
    for (; wt !== null && !hx(); ) Qp(wt);
  }
  function Qp(t) {
    var e = gp(t.alternate, t, Gn);
    ((t.memoizedProps = t.pendingProps), e === null ? Rr(t) : (wt = e));
  }
  function Jp(t) {
    var e = t,
      i = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = fp(i, e, e.pendingProps, e.type, void 0, Ct);
        break;
      case 11:
        e = fp(i, e, e.pendingProps, e.type.render, e.ref, Ct);
        break;
      case 5:
        Zu(e);
      default:
        (bp(i, e), (e = wt = Kh(e, Gn)), (e = gp(i, e, Gn)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? Rr(t) : (wt = e));
  }
  function Qi(t, e, i, l) {
    ((zn = Ya = null), Zu(e), (Vi = null), (Ns = 0));
    var u = e.return;
    try {
      if (z1(t, u, e, i, Ct)) {
        ((It = 1), gr(t, $e(i, t.current)), (wt = null));
        return;
      }
    } catch (c) {
      if (u !== null) throw ((wt = u), c);
      ((It = 1), gr(t, $e(i, t.current)), (wt = null));
      return;
    }
    e.flags & 32768
      ? (Rt || l === 1
          ? (t = !0)
          : qi || (Ct & 536870912) !== 0
            ? (t = !1)
            : ((ca = t = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = Ge.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
        Pp(e, t))
      : Rr(e);
  }
  function Rr(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Pp(e, ca);
        return;
      }
      t = e.return;
      var i = j1(e.alternate, e, Gn);
      if (i !== null) {
        wt = i;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        wt = e;
        return;
      }
      wt = e = t;
    } while (e !== null);
    It === 0 && (It = 5);
  }
  function Pp(t, e) {
    do {
      var i = V1(t.alternate, t);
      if (i !== null) {
        ((i.flags &= 32767), (wt = i));
        return;
      }
      if (
        ((i = t.return),
        i !== null && ((i.flags |= 32768), (i.subtreeFlags = 0), (i.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        wt = t;
        return;
      }
      wt = t = i;
    } while (t !== null);
    ((It = 6), (wt = null));
  }
  function Fp(t, e, i, l, u, c, m, v, S) {
    t.cancelPendingCommit = null;
    do Or();
    while (fe !== 0);
    if ((Ut & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (
        ((c = e.lanes | e.childLanes),
        (c |= mu),
        Ax(t, i, c, m, v, S),
        t === Kt && ((wt = Kt = null), (Ct = 0)),
        (Xi = e),
        (ha = t),
        (qn = i),
        (Tc = c),
        (Ac = u),
        (Lp = l),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            J1(kl, function () {
              return (ey(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (l = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = O.T), (O.T = null), (u = X.p), (X.p = 2), (m = Ut), (Ut |= 4));
        try {
          U1(t, e, i);
        } finally {
          ((Ut = m), (X.p = u), (O.T = l));
        }
      }
      ((fe = 1), Wp(), $p(), Ip());
    }
  }
  function Wp() {
    if (fe === 1) {
      fe = 0;
      var t = ha,
        e = Xi,
        i = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || i) {
        ((i = O.T), (O.T = null));
        var l = X.p;
        X.p = 2;
        var u = Ut;
        Ut |= 4;
        try {
          Op(e, t);
          var c = Bc,
            m = Uh(t.containerInfo),
            v = c.focusedElem,
            S = c.selectionRange;
          if (m !== v && v && v.ownerDocument && Vh(v.ownerDocument.documentElement, v)) {
            if (S !== null && uu(v)) {
              var D = S.start,
                U = S.end;
              if ((U === void 0 && (U = D), "selectionStart" in v))
                ((v.selectionStart = D), (v.selectionEnd = Math.min(U, v.value.length)));
              else {
                var H = v.ownerDocument || document,
                  R = (H && H.defaultView) || window;
                if (R.getSelection) {
                  var z = R.getSelection(),
                    at = v.textContent.length,
                    ht = Math.min(S.start, at),
                    qt = S.end === void 0 ? ht : Math.min(S.end, at);
                  !z.extend && ht > qt && ((m = qt), (qt = ht), (ht = m));
                  var E = jh(v, ht),
                    A = jh(v, qt);
                  if (
                    E &&
                    A &&
                    (z.rangeCount !== 1 ||
                      z.anchorNode !== E.node ||
                      z.anchorOffset !== E.offset ||
                      z.focusNode !== A.node ||
                      z.focusOffset !== A.offset)
                  ) {
                    var C = H.createRange();
                    (C.setStart(E.node, E.offset),
                      z.removeAllRanges(),
                      ht > qt
                        ? (z.addRange(C), z.extend(A.node, A.offset))
                        : (C.setEnd(A.node, A.offset), z.addRange(C)));
                  }
                }
              }
            }
            for (H = [], z = v; (z = z.parentNode); )
              z.nodeType === 1 && H.push({ element: z, left: z.scrollLeft, top: z.scrollTop });
            for (typeof v.focus == "function" && v.focus(), v = 0; v < H.length; v++) {
              var L = H[v];
              ((L.element.scrollLeft = L.left), (L.element.scrollTop = L.top));
            }
          }
          ((qr = !!Uc), (Bc = Uc = null));
        } finally {
          ((Ut = u), (X.p = l), (O.T = i));
        }
      }
      ((t.current = e), (fe = 2));
    }
  }
  function $p() {
    if (fe === 2) {
      fe = 0;
      var t = ha,
        e = Xi,
        i = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || i) {
        ((i = O.T), (O.T = null));
        var l = X.p;
        X.p = 2;
        var u = Ut;
        Ut |= 4;
        try {
          wp(t, e.alternate, e);
        } finally {
          ((Ut = u), (X.p = l), (O.T = i));
        }
      }
      fe = 3;
    }
  }
  function Ip() {
    if (fe === 4 || fe === 3) {
      ((fe = 0), mx());
      var t = ha,
        e = Xi,
        i = qn,
        l = Lp;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (fe = 5)
        : ((fe = 0), (Xi = ha = null), ty(t, t.pendingLanes));
      var u = t.pendingLanes;
      if ((u === 0 && (da = null), Yo(i), (e = e.stateNode), Be && typeof Be.onCommitFiberRoot == "function"))
        try {
          Be.onCommitFiberRoot(ys, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        ((e = O.T), (u = X.p), (X.p = 2), (O.T = null));
        try {
          for (var c = t.onRecoverableError, m = 0; m < l.length; m++) {
            var v = l[m];
            c(v.value, { componentStack: v.stack });
          }
        } finally {
          ((O.T = e), (X.p = u));
        }
      }
      ((qn & 3) !== 0 && Or(),
        xn(t),
        (u = t.pendingLanes),
        (i & 261930) !== 0 && (u & 42) !== 0 ? (t === _c ? Ws++ : ((Ws = 0), (_c = t))) : (Ws = 0),
        $s(0));
    }
  }
  function ty(t, e) {
    (t.pooledCacheLanes &= e) === 0 && ((e = t.pooledCache), e != null && ((t.pooledCache = null), zs(e)));
  }
  function Or() {
    return (Wp(), $p(), Ip(), ey());
  }
  function ey() {
    if (fe !== 5) return !1;
    var t = ha,
      e = Tc;
    Tc = 0;
    var i = Yo(qn),
      l = O.T,
      u = X.p;
    try {
      ((X.p = 32 > i ? 32 : i), (O.T = null), (i = Ac), (Ac = null));
      var c = ha,
        m = qn;
      if (((fe = 0), (Xi = ha = null), (qn = 0), (Ut & 6) !== 0)) throw Error(r(331));
      var v = Ut;
      if (
        ((Ut |= 4),
        Vp(c.current),
        kp(c, c.current, m, i),
        (Ut = v),
        $s(0, !1),
        Be && typeof Be.onPostCommitFiberRoot == "function")
      )
        try {
          Be.onPostCommitFiberRoot(ys, c);
        } catch {}
      return !0;
    } finally {
      ((X.p = u), (O.T = l), ty(t, e));
    }
  }
  function ny(t, e, i) {
    ((e = $e(i, e)), (e = nc(t.stateNode, e, 2)), (t = la(t, e, 2)), t !== null && (vs(t, 2), xn(t)));
  }
  function Lt(t, e, i) {
    if (t.tag === 3) ny(t, t, i);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          ny(e, t, i);
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" && (da === null || !da.has(l)))
          ) {
            ((t = $e(i, t)), (i = ap(2)), (l = la(e, i, 2)), l !== null && (ip(i, l, e, t), vs(l, 2), xn(l)));
            break;
          }
        }
        e = e.return;
      }
  }
  function Mc(t, e, i) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new H1();
      var u = new Set();
      l.set(e, u);
    } else ((u = l.get(e)), u === void 0 && ((u = new Set()), l.set(e, u)));
    u.has(i) || ((bc = !0), u.add(i), (t = X1.bind(null, t, e, i)), e.then(t, t));
  }
  function X1(t, e, i) {
    var l = t.pingCache;
    (l !== null && l.delete(e),
      (t.pingedLanes |= t.suspendedLanes & i),
      (t.warmLanes &= ~i),
      Kt === t &&
        (Ct & i) === i &&
        (It === 4 || (It === 3 && (Ct & 62914560) === Ct && 300 > Ue() - Er)
          ? (Ut & 2) === 0 && Ki(t, 0)
          : (xc |= i),
        Yi === Ct && (Yi = 0)),
      xn(t));
  }
  function ay(t, e) {
    (e === 0 && (e = Wd()), (t = Za(t, e)), t !== null && (vs(t, e), xn(t)));
  }
  function K1(t) {
    var e = t.memoizedState,
      i = 0;
    (e !== null && (i = e.retryLane), ay(t, i));
  }
  function Q1(t, e) {
    var i = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var l = t.stateNode,
          u = t.memoizedState;
        u !== null && (i = u.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (l !== null && l.delete(e), ay(t, i));
  }
  function J1(t, e) {
    return Ho(t, e);
  }
  var zr = null,
    Ji = null,
    Cc = !1,
    kr = !1,
    Dc = !1,
    pa = 0;
  function xn(t) {
    (t !== Ji && t.next === null && (Ji === null ? (zr = Ji = t) : (Ji = Ji.next = t)),
      (kr = !0),
      Cc || ((Cc = !0), F1()));
  }
  function $s(t, e) {
    if (!Dc && kr) {
      Dc = !0;
      do
        for (var i = !1, l = zr; l !== null; ) {
          if (t !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var m = l.suspendedLanes,
                v = l.pingedLanes;
              ((c = (1 << (31 - Le(42 | t) + 1)) - 1),
                (c &= u & ~(m & ~v)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((i = !0), ry(l, c));
          } else
            ((c = Ct),
              (c = Ul(l, l === Kt ? c : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
              (c & 3) === 0 || gs(l, c) || ((i = !0), ry(l, c)));
          l = l.next;
        }
      while (i);
      Dc = !1;
    }
  }
  function P1() {
    iy();
  }
  function iy() {
    kr = Cc = !1;
    var t = 0;
    pa !== 0 && lS() && (t = pa);
    for (var e = Ue(), i = null, l = zr; l !== null; ) {
      var u = l.next,
        c = sy(l, e);
      (c === 0
        ? ((l.next = null), i === null ? (zr = u) : (i.next = u), u === null && (Ji = i))
        : ((i = l), (t !== 0 || (c & 3) !== 0) && (kr = !0)),
        (l = u));
    }
    ((fe !== 0 && fe !== 5) || $s(t), pa !== 0 && (pa = 0));
  }
  function sy(t, e) {
    for (
      var i = t.suspendedLanes, l = t.pingedLanes, u = t.expirationTimes, c = t.pendingLanes & -62914561;
      0 < c;
    ) {
      var m = 31 - Le(c),
        v = 1 << m,
        S = u[m];
      (S === -1 ? ((v & i) === 0 || (v & l) !== 0) && (u[m] = Tx(v, e)) : S <= e && (t.expiredLanes |= v),
        (c &= ~v));
    }
    if (
      ((e = Kt),
      (i = Ct),
      (i = Ul(t, t === e ? i : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (l = t.callbackNode),
      i === 0 || (t === e && (Bt === 2 || Bt === 9)) || t.cancelPendingCommit !== null)
    )
      return (l !== null && l !== null && Zo(l), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((i & 3) === 0 || gs(t, i)) {
      if (((e = i & -i), e === t.callbackPriority)) return e;
      switch ((l !== null && Zo(l), Yo(i))) {
        case 2:
        case 8:
          i = Pd;
          break;
        case 32:
          i = kl;
          break;
        case 268435456:
          i = Fd;
          break;
        default:
          i = kl;
      }
      return ((l = ly.bind(null, t)), (i = Ho(i, l)), (t.callbackPriority = e), (t.callbackNode = i), e);
    }
    return (l !== null && l !== null && Zo(l), (t.callbackPriority = 2), (t.callbackNode = null), 2);
  }
  function ly(t, e) {
    if (fe !== 0 && fe !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var i = t.callbackNode;
    if (Or() && t.callbackNode !== i) return null;
    var l = Ct;
    return (
      (l = Ul(t, t === Kt ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      l === 0
        ? null
        : (Zp(t, l, e), sy(t, Ue()), t.callbackNode != null && t.callbackNode === i ? ly.bind(null, t) : null)
    );
  }
  function ry(t, e) {
    if (Or()) return null;
    Zp(t, e, !0);
  }
  function F1() {
    oS(function () {
      (Ut & 6) !== 0 ? Ho(Jd, P1) : iy();
    });
  }
  function Rc() {
    if (pa === 0) {
      var t = ki;
      (t === 0 && ((t = Nl), (Nl <<= 1), (Nl & 261888) === 0 && (Nl = 256)), (pa = t));
    }
    return pa;
  }
  function oy(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : Zl("" + t);
  }
  function uy(t, e) {
    var i = e.ownerDocument.createElement("input");
    return (
      (i.name = e.name),
      (i.value = e.value),
      t.id && i.setAttribute("form", t.id),
      e.parentNode.insertBefore(i, e),
      (t = new FormData(t)),
      i.parentNode.removeChild(i),
      t
    );
  }
  function W1(t, e, i, l, u) {
    if (e === "submit" && i && i.stateNode === u) {
      var c = oy((u[De] || null).action),
        m = l.submitter;
      m &&
        ((e = (e = m[De] || null) ? oy(e.formAction) : m.getAttribute("formAction")),
        e !== null && ((c = e), (m = null)));
      var v = new Xl("action", "action", null, l, u);
      t.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (pa !== 0) {
                  var S = m ? uy(u, m) : new FormData(u);
                  Fu(i, { pending: !0, data: S, method: u.method, action: c }, null, S);
                }
              } else
                typeof c == "function" &&
                  (v.preventDefault(),
                  (S = m ? uy(u, m) : new FormData(u)),
                  Fu(i, { pending: !0, data: S, method: u.method, action: c }, c, S));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Oc = 0; Oc < hu.length; Oc++) {
    var zc = hu[Oc],
      $1 = zc.toLowerCase(),
      I1 = zc[0].toUpperCase() + zc.slice(1);
    cn($1, "on" + I1);
  }
  (cn(Hh, "onAnimationEnd"),
    cn(Zh, "onAnimationIteration"),
    cn(Gh, "onAnimationStart"),
    cn("dblclick", "onDoubleClick"),
    cn("focusin", "onFocus"),
    cn("focusout", "onBlur"),
    cn(p1, "onTransitionRun"),
    cn(y1, "onTransitionStart"),
    cn(g1, "onTransitionCancel"),
    cn(qh, "onTransitionEnd"),
    bi("onMouseEnter", ["mouseout", "mouseover"]),
    bi("onMouseLeave", ["mouseout", "mouseover"]),
    bi("onPointerEnter", ["pointerout", "pointerover"]),
    bi("onPointerLeave", ["pointerout", "pointerover"]),
    Ua("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    Ua(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "),
    ),
    Ua("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ua("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    Ua("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
    Ua("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
  var Is =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    tS = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Is));
  function cy(t, e) {
    e = (e & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var l = t[i],
        u = l.event;
      l = l.listeners;
      t: {
        var c = void 0;
        if (e)
          for (var m = l.length - 1; 0 <= m; m--) {
            var v = l[m],
              S = v.instance,
              D = v.currentTarget;
            if (((v = v.listener), S !== c && u.isPropagationStopped())) break t;
            ((c = v), (u.currentTarget = D));
            try {
              c(u);
            } catch (U) {
              Jl(U);
            }
            ((u.currentTarget = null), (c = S));
          }
        else
          for (m = 0; m < l.length; m++) {
            if (
              ((v = l[m]),
              (S = v.instance),
              (D = v.currentTarget),
              (v = v.listener),
              S !== c && u.isPropagationStopped())
            )
              break t;
            ((c = v), (u.currentTarget = D));
            try {
              c(u);
            } catch (U) {
              Jl(U);
            }
            ((u.currentTarget = null), (c = S));
          }
      }
    }
  }
  function Mt(t, e) {
    var i = e[Xo];
    i === void 0 && (i = e[Xo] = new Set());
    var l = t + "__bubble";
    i.has(l) || (fy(e, t, 2, !1), i.add(l));
  }
  function kc(t, e, i) {
    var l = 0;
    (e && (l |= 4), fy(i, t, l, e));
  }
  var Nr = "_reactListening" + Math.random().toString(36).slice(2);
  function Nc(t) {
    if (!t[Nr]) {
      ((t[Nr] = !0),
        ih.forEach(function (i) {
          i !== "selectionchange" && (tS.has(i) || kc(i, !1, t), kc(i, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Nr] || ((e[Nr] = !0), kc("selectionchange", !1, e));
    }
  }
  function fy(t, e, i, l) {
    switch (Hy(e)) {
      case 2:
        var u = CS;
        break;
      case 8:
        u = DS;
        break;
      default:
        u = Pc;
    }
    ((i = u.bind(null, e, i, t)),
      (u = void 0),
      !tu || (e !== "touchstart" && e !== "touchmove" && e !== "wheel") || (u = !0),
      l
        ? u !== void 0
          ? t.addEventListener(e, i, { capture: !0, passive: u })
          : t.addEventListener(e, i, !0)
        : u !== void 0
          ? t.addEventListener(e, i, { passive: u })
          : t.addEventListener(e, i, !1));
  }
  function jc(t, e, i, l, u) {
    var c = l;
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (;;) {
        if (l === null) return;
        var m = l.tag;
        if (m === 3 || m === 4) {
          var v = l.stateNode.containerInfo;
          if (v === u) break;
          if (m === 4)
            for (m = l.return; m !== null; ) {
              var S = m.tag;
              if ((S === 3 || S === 4) && m.stateNode.containerInfo === u) return;
              m = m.return;
            }
          for (; v !== null; ) {
            if (((m = yi(v)), m === null)) return;
            if (((S = m.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              l = c = m;
              continue t;
            }
            v = v.parentNode;
          }
        }
        l = l.return;
      }
    yh(function () {
      var D = c,
        U = $o(i),
        H = [];
      t: {
        var R = Yh.get(t);
        if (R !== void 0) {
          var z = Xl,
            at = t;
          switch (t) {
            case "keypress":
              if (ql(i) === 0) break t;
            case "keydown":
            case "keyup":
              z = Qx;
              break;
            case "focusin":
              ((at = "focus"), (z = iu));
              break;
            case "focusout":
              ((at = "blur"), (z = iu));
              break;
            case "beforeblur":
            case "afterblur":
              z = iu;
              break;
            case "click":
              if (i.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              z = bh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = jx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = Fx;
              break;
            case Hh:
            case Zh:
            case Gh:
              z = Bx;
              break;
            case qh:
              z = $x;
              break;
            case "scroll":
            case "scrollend":
              z = kx;
              break;
            case "wheel":
              z = t1;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = Hx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = Sh;
              break;
            case "toggle":
            case "beforetoggle":
              z = n1;
          }
          var ht = (e & 4) !== 0,
            qt = !ht && (t === "scroll" || t === "scrollend"),
            E = ht ? (R !== null ? R + "Capture" : null) : R;
          ht = [];
          for (var A = D, C; A !== null; ) {
            var L = A;
            if (
              ((C = L.stateNode),
              (L = L.tag),
              (L !== 5 && L !== 26 && L !== 27) ||
                C === null ||
                E === null ||
                ((L = Ss(A, E)), L != null && ht.push(tl(A, L, C))),
              qt)
            )
              break;
            A = A.return;
          }
          0 < ht.length && ((R = new z(R, at, null, i, U)), H.push({ event: R, listeners: ht }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((R = t === "mouseover" || t === "pointerover"),
            (z = t === "mouseout" || t === "pointerout"),
            R && i !== Wo && (at = i.relatedTarget || i.fromElement) && (yi(at) || at[pi]))
          )
            break t;
          if (
            (z || R) &&
            ((R = U.window === U ? U : (R = U.ownerDocument) ? R.defaultView || R.parentWindow : window),
            z
              ? ((at = i.relatedTarget || i.toElement),
                (z = D),
                (at = at ? yi(at) : null),
                at !== null &&
                  ((qt = f(at)), (ht = at.tag), at !== qt || (ht !== 5 && ht !== 27 && ht !== 6)) &&
                  (at = null))
              : ((z = null), (at = D)),
            z !== at)
          ) {
            if (
              ((ht = bh),
              (L = "onMouseLeave"),
              (E = "onMouseEnter"),
              (A = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((ht = Sh), (L = "onPointerLeave"), (E = "onPointerEnter"), (A = "pointer")),
              (qt = z == null ? R : xs(z)),
              (C = at == null ? R : xs(at)),
              (R = new ht(L, A + "leave", z, i, U)),
              (R.target = qt),
              (R.relatedTarget = C),
              (L = null),
              yi(U) === D &&
                ((ht = new ht(E, A + "enter", at, i, U)), (ht.target = C), (ht.relatedTarget = qt), (L = ht)),
              (qt = L),
              z && at)
            )
              e: {
                for (ht = eS, E = z, A = at, C = 0, L = E; L; L = ht(L)) C++;
                L = 0;
                for (var dt = A; dt; dt = ht(dt)) L++;
                for (; 0 < C - L; ) ((E = ht(E)), C--);
                for (; 0 < L - C; ) ((A = ht(A)), L--);
                for (; C--; ) {
                  if (E === A || (A !== null && E === A.alternate)) {
                    ht = E;
                    break e;
                  }
                  ((E = ht(E)), (A = ht(A)));
                }
                ht = null;
              }
            else ht = null;
            (z !== null && dy(H, R, z, ht, !1), at !== null && qt !== null && dy(H, qt, at, ht, !0));
          }
        }
        t: {
          if (
            ((R = D ? xs(D) : window),
            (z = R.nodeName && R.nodeName.toLowerCase()),
            z === "select" || (z === "input" && R.type === "file"))
          )
            var Nt = Dh;
          else if (Mh(R))
            if (Rh) Nt = d1;
            else {
              Nt = c1;
              var ut = u1;
            }
          else
            ((z = R.nodeName),
              !z || z.toLowerCase() !== "input" || (R.type !== "checkbox" && R.type !== "radio")
                ? D && Fo(D.elementType) && (Nt = Dh)
                : (Nt = f1));
          if (Nt && (Nt = Nt(t, D))) {
            Ch(H, Nt, i, U);
            break t;
          }
          (ut && ut(t, R, D),
            t === "focusout" &&
              D &&
              R.type === "number" &&
              D.memoizedProps.value != null &&
              Po(R, "number", R.value));
        }
        switch (((ut = D ? xs(D) : window), t)) {
          case "focusin":
            (Mh(ut) || ut.contentEditable === "true") && ((Ei = ut), (cu = D), (Ds = null));
            break;
          case "focusout":
            Ds = cu = Ei = null;
            break;
          case "mousedown":
            fu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((fu = !1), Bh(H, i, U));
            break;
          case "selectionchange":
            if (m1) break;
          case "keydown":
          case "keyup":
            Bh(H, i, U);
        }
        var Tt;
        if (lu)
          t: {
            switch (t) {
              case "compositionstart":
                var Dt = "onCompositionStart";
                break t;
              case "compositionend":
                Dt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Dt = "onCompositionUpdate";
                break t;
            }
            Dt = void 0;
          }
        else
          _i
            ? Eh(t, i) && (Dt = "onCompositionEnd")
            : t === "keydown" && i.keyCode === 229 && (Dt = "onCompositionStart");
        (Dt &&
          (Th &&
            i.locale !== "ko" &&
            (_i || Dt !== "onCompositionStart"
              ? Dt === "onCompositionEnd" && _i && (Tt = gh())
              : ((In = U), (eu = "value" in In ? In.value : In.textContent), (_i = !0))),
          (ut = jr(D, Dt)),
          0 < ut.length &&
            ((Dt = new xh(Dt, t, null, i, U)),
            H.push({ event: Dt, listeners: ut }),
            Tt ? (Dt.data = Tt) : ((Tt = wh(i)), Tt !== null && (Dt.data = Tt)))),
          (Tt = i1 ? s1(t, i) : l1(t, i)) &&
            ((Dt = jr(D, "onBeforeInput")),
            0 < Dt.length &&
              ((ut = new xh("onBeforeInput", "beforeinput", null, i, U)),
              H.push({ event: ut, listeners: Dt }),
              (ut.data = Tt))),
          W1(H, t, D, i, U));
      }
      cy(H, e);
    });
  }
  function tl(t, e, i) {
    return { instance: t, listener: e, currentTarget: i };
  }
  function jr(t, e) {
    for (var i = e + "Capture", l = []; t !== null; ) {
      var u = t,
        c = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          c === null ||
          ((u = Ss(t, i)),
          u != null && l.unshift(tl(t, u, c)),
          (u = Ss(t, e)),
          u != null && l.push(tl(t, u, c))),
        t.tag === 3)
      )
        return l;
      t = t.return;
    }
    return [];
  }
  function eS(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function dy(t, e, i, l, u) {
    for (var c = e._reactName, m = []; i !== null && i !== l; ) {
      var v = i,
        S = v.alternate,
        D = v.stateNode;
      if (((v = v.tag), S !== null && S === l)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        D === null ||
        ((S = D),
        u
          ? ((D = Ss(i, c)), D != null && m.unshift(tl(i, D, S)))
          : u || ((D = Ss(i, c)), D != null && m.push(tl(i, D, S)))),
        (i = i.return));
    }
    m.length !== 0 && t.push({ event: e, listeners: m });
  }
  var nS = /\r\n?/g,
    aS = /\u0000|\uFFFD/g;
  function hy(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        nS,
        `
`,
      )
      .replace(aS, "");
  }
  function my(t, e) {
    return ((e = hy(e)), hy(t) === e);
  }
  function Gt(t, e, i, l, u, c) {
    switch (i) {
      case "children":
        typeof l == "string"
          ? e === "body" || (e === "textarea" && l === "") || Si(t, l)
          : (typeof l == "number" || typeof l == "bigint") && e !== "body" && Si(t, "" + l);
        break;
      case "className":
        Ll(t, "class", l);
        break;
      case "tabIndex":
        Ll(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ll(t, i, l);
        break;
      case "style":
        mh(t, l, c);
        break;
      case "data":
        if (e !== "object") {
          Ll(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (e !== "a" || i !== "href")) {
          t.removeAttribute(i);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(i);
          break;
        }
        ((l = Zl("" + l)), t.setAttribute(i, l));
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof c == "function" &&
            (i === "formAction"
              ? (e !== "input" && Gt(t, e, "name", u.name, u, null),
                Gt(t, e, "formEncType", u.formEncType, u, null),
                Gt(t, e, "formMethod", u.formMethod, u, null),
                Gt(t, e, "formTarget", u.formTarget, u, null))
              : (Gt(t, e, "encType", u.encType, u, null),
                Gt(t, e, "method", u.method, u, null),
                Gt(t, e, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(i);
          break;
        }
        ((l = Zl("" + l)), t.setAttribute(i, l));
        break;
      case "onClick":
        l != null && (t.onclick = Cn);
        break;
      case "onScroll":
        l != null && Mt("scroll", t);
        break;
      case "onScrollEnd":
        l != null && Mt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(r(61));
          if (((i = l.__html), i != null)) {
            if (u.children != null) throw Error(r(60));
            t.innerHTML = i;
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        ((i = Zl("" + l)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", i));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? t.setAttribute(i, "" + l)
          : t.removeAttribute(i);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(i, "") : t.removeAttribute(i);
        break;
      case "capture":
      case "download":
        l === !0
          ? t.setAttribute(i, "")
          : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol"
            ? t.setAttribute(i, l)
            : t.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l
          ? t.setAttribute(i, l)
          : t.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? t.removeAttribute(i)
          : t.setAttribute(i, l);
        break;
      case "popover":
        (Mt("beforetoggle", t), Mt("toggle", t), Bl(t, "popover", l));
        break;
      case "xlinkActuate":
        Mn(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        Mn(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        Mn(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        Mn(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        Mn(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        Mn(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        Mn(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        Mn(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        Mn(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        Bl(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || (i[0] !== "o" && i[0] !== "O") || (i[1] !== "n" && i[1] !== "N")) &&
          ((i = Ox.get(i) || i), Bl(t, i, l));
    }
  }
  function Vc(t, e, i, l, u, c) {
    switch (i) {
      case "style":
        mh(t, l, c);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(r(61));
          if (((i = l.__html), i != null)) {
            if (u.children != null) throw Error(r(60));
            t.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof l == "string" ? Si(t, l) : (typeof l == "number" || typeof l == "bigint") && Si(t, "" + l);
        break;
      case "onScroll":
        l != null && Mt("scroll", t);
        break;
      case "onScrollEnd":
        l != null && Mt("scrollend", t);
        break;
      case "onClick":
        l != null && (t.onclick = Cn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!sh.hasOwnProperty(i))
          t: {
            if (
              i[0] === "o" &&
              i[1] === "n" &&
              ((u = i.endsWith("Capture")),
              (e = i.slice(2, u ? i.length - 7 : void 0)),
              (c = t[De] || null),
              (c = c != null ? c[i] : null),
              typeof c == "function" && t.removeEventListener(e, c, u),
              typeof l == "function")
            ) {
              (typeof c != "function" &&
                c !== null &&
                (i in t ? (t[i] = null) : t.hasAttribute(i) && t.removeAttribute(i)),
                t.addEventListener(e, l, u));
              break t;
            }
            i in t ? (t[i] = l) : l === !0 ? t.setAttribute(i, "") : Bl(t, i, l);
          }
    }
  }
  function Se(t, e, i) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Mt("error", t), Mt("load", t));
        var l = !1,
          u = !1,
          c;
        for (c in i)
          if (i.hasOwnProperty(c)) {
            var m = i[c];
            if (m != null)
              switch (c) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  Gt(t, e, c, m, i, null);
              }
          }
        (u && Gt(t, e, "srcSet", i.srcSet, i, null), l && Gt(t, e, "src", i.src, i, null));
        return;
      case "input":
        Mt("invalid", t);
        var v = (c = m = u = null),
          S = null,
          D = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var U = i[l];
            if (U != null)
              switch (l) {
                case "name":
                  u = U;
                  break;
                case "type":
                  m = U;
                  break;
                case "checked":
                  S = U;
                  break;
                case "defaultChecked":
                  D = U;
                  break;
                case "value":
                  c = U;
                  break;
                case "defaultValue":
                  v = U;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (U != null) throw Error(r(137, e));
                  break;
                default:
                  Gt(t, e, l, U, i, null);
              }
          }
        ch(t, c, v, S, D, m, u, !1);
        return;
      case "select":
        (Mt("invalid", t), (l = m = c = null));
        for (u in i)
          if (i.hasOwnProperty(u) && ((v = i[u]), v != null))
            switch (u) {
              case "value":
                c = v;
                break;
              case "defaultValue":
                m = v;
                break;
              case "multiple":
                l = v;
              default:
                Gt(t, e, u, v, i, null);
            }
        ((e = c),
          (i = m),
          (t.multiple = !!l),
          e != null ? xi(t, !!l, e, !1) : i != null && xi(t, !!l, i, !0));
        return;
      case "textarea":
        (Mt("invalid", t), (c = u = l = null));
        for (m in i)
          if (i.hasOwnProperty(m) && ((v = i[m]), v != null))
            switch (m) {
              case "value":
                l = v;
                break;
              case "defaultValue":
                u = v;
                break;
              case "children":
                c = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(r(91));
                break;
              default:
                Gt(t, e, m, v, i, null);
            }
        dh(t, l, u, c);
        return;
      case "option":
        for (S in i)
          if (i.hasOwnProperty(S) && ((l = i[S]), l != null))
            switch (S) {
              case "selected":
                t.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Gt(t, e, S, l, i, null);
            }
        return;
      case "dialog":
        (Mt("beforetoggle", t), Mt("toggle", t), Mt("cancel", t), Mt("close", t));
        break;
      case "iframe":
      case "object":
        Mt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Is.length; l++) Mt(Is[l], t);
        break;
      case "image":
        (Mt("error", t), Mt("load", t));
        break;
      case "details":
        Mt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        (Mt("error", t), Mt("load", t));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (D in i)
          if (i.hasOwnProperty(D) && ((l = i[D]), l != null))
            switch (D) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                Gt(t, e, D, l, i, null);
            }
        return;
      default:
        if (Fo(e)) {
          for (U in i) i.hasOwnProperty(U) && ((l = i[U]), l !== void 0 && Vc(t, e, U, l, i, void 0));
          return;
        }
    }
    for (v in i) i.hasOwnProperty(v) && ((l = i[v]), l != null && Gt(t, e, v, l, i, null));
  }
  function iS(t, e, i, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          c = null,
          m = null,
          v = null,
          S = null,
          D = null,
          U = null;
        for (z in i) {
          var H = i[z];
          if (i.hasOwnProperty(z) && H != null)
            switch (z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = H;
              default:
                l.hasOwnProperty(z) || Gt(t, e, z, null, l, H);
            }
        }
        for (var R in l) {
          var z = l[R];
          if (((H = i[R]), l.hasOwnProperty(R) && (z != null || H != null)))
            switch (R) {
              case "type":
                c = z;
                break;
              case "name":
                u = z;
                break;
              case "checked":
                D = z;
                break;
              case "defaultChecked":
                U = z;
                break;
              case "value":
                m = z;
                break;
              case "defaultValue":
                v = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null) throw Error(r(137, e));
                break;
              default:
                z !== H && Gt(t, e, R, z, l, H);
            }
        }
        Jo(t, m, v, S, D, U, c, u);
        return;
      case "select":
        z = m = v = R = null;
        for (c in i)
          if (((S = i[c]), i.hasOwnProperty(c) && S != null))
            switch (c) {
              case "value":
                break;
              case "multiple":
                z = S;
              default:
                l.hasOwnProperty(c) || Gt(t, e, c, null, l, S);
            }
        for (u in l)
          if (((c = l[u]), (S = i[u]), l.hasOwnProperty(u) && (c != null || S != null)))
            switch (u) {
              case "value":
                R = c;
                break;
              case "defaultValue":
                v = c;
                break;
              case "multiple":
                m = c;
              default:
                c !== S && Gt(t, e, u, c, l, S);
            }
        ((e = v),
          (i = m),
          (l = z),
          R != null
            ? xi(t, !!i, R, !1)
            : !!l != !!i && (e != null ? xi(t, !!i, e, !0) : xi(t, !!i, i ? [] : "", !1)));
        return;
      case "textarea":
        z = R = null;
        for (v in i)
          if (((u = i[v]), i.hasOwnProperty(v) && u != null && !l.hasOwnProperty(v)))
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                Gt(t, e, v, null, l, u);
            }
        for (m in l)
          if (((u = l[m]), (c = i[m]), l.hasOwnProperty(m) && (u != null || c != null)))
            switch (m) {
              case "value":
                R = u;
                break;
              case "defaultValue":
                z = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== c && Gt(t, e, m, u, l, c);
            }
        fh(t, R, z);
        return;
      case "option":
        for (var at in i)
          if (((R = i[at]), i.hasOwnProperty(at) && R != null && !l.hasOwnProperty(at)))
            switch (at) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Gt(t, e, at, null, l, R);
            }
        for (S in l)
          if (((R = l[S]), (z = i[S]), l.hasOwnProperty(S) && R !== z && (R != null || z != null)))
            switch (S) {
              case "selected":
                t.selected = R && typeof R != "function" && typeof R != "symbol";
                break;
              default:
                Gt(t, e, S, R, l, z);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ht in i)
          ((R = i[ht]),
            i.hasOwnProperty(ht) && R != null && !l.hasOwnProperty(ht) && Gt(t, e, ht, null, l, R));
        for (D in l)
          if (((R = l[D]), (z = i[D]), l.hasOwnProperty(D) && R !== z && (R != null || z != null)))
            switch (D) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null) throw Error(r(137, e));
                break;
              default:
                Gt(t, e, D, R, l, z);
            }
        return;
      default:
        if (Fo(e)) {
          for (var qt in i)
            ((R = i[qt]),
              i.hasOwnProperty(qt) && R !== void 0 && !l.hasOwnProperty(qt) && Vc(t, e, qt, void 0, l, R));
          for (U in l)
            ((R = l[U]),
              (z = i[U]),
              !l.hasOwnProperty(U) || R === z || (R === void 0 && z === void 0) || Vc(t, e, U, R, l, z));
          return;
        }
    }
    for (var E in i)
      ((R = i[E]), i.hasOwnProperty(E) && R != null && !l.hasOwnProperty(E) && Gt(t, e, E, null, l, R));
    for (H in l)
      ((R = l[H]),
        (z = i[H]),
        !l.hasOwnProperty(H) || R === z || (R == null && z == null) || Gt(t, e, H, R, l, z));
  }
  function py(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function sS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var u = i[l],
          c = u.transferSize,
          m = u.initiatorType,
          v = u.duration;
        if (c && v && py(m)) {
          for (m = 0, v = u.responseEnd, l += 1; l < i.length; l++) {
            var S = i[l],
              D = S.startTime;
            if (D > v) break;
            var U = S.transferSize,
              H = S.initiatorType;
            U && py(H) && ((S = S.responseEnd), (m += U * (S < v ? 1 : (v - D) / (S - D))));
          }
          if ((--l, (e += (8 * (c + m)) / (u.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
  }
  var Uc = null,
    Bc = null;
  function Vr(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function yy(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function gy(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function Lc(t, e) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof e.children == "string" ||
      typeof e.children == "number" ||
      typeof e.children == "bigint" ||
      (typeof e.dangerouslySetInnerHTML == "object" &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Hc = null;
  function lS() {
    var t = window.event;
    return t && t.type === "popstate" ? (t === Hc ? !1 : ((Hc = t), !0)) : ((Hc = null), !1);
  }
  var vy = typeof setTimeout == "function" ? setTimeout : void 0,
    rS = typeof clearTimeout == "function" ? clearTimeout : void 0,
    by = typeof Promise == "function" ? Promise : void 0,
    oS =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof by < "u"
          ? function (t) {
              return by.resolve(null).then(t).catch(uS);
            }
          : vy;
  function uS(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function ya(t) {
    return t === "head";
  }
  function xy(t, e) {
    var i = e,
      l = 0;
    do {
      var u = i.nextSibling;
      if ((t.removeChild(i), u && u.nodeType === 8))
        if (((i = u.data), i === "/$" || i === "/&")) {
          if (l === 0) {
            (t.removeChild(u), $i(e));
            return;
          }
          l--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&") l++;
        else if (i === "html") el(t.ownerDocument.documentElement);
        else if (i === "head") {
          ((i = t.ownerDocument.head), el(i));
          for (var c = i.firstChild; c; ) {
            var m = c.nextSibling,
              v = c.nodeName;
            (c[bs] ||
              v === "SCRIPT" ||
              v === "STYLE" ||
              (v === "LINK" && c.rel.toLowerCase() === "stylesheet") ||
              i.removeChild(c),
              (c = m));
          }
        } else i === "body" && el(t.ownerDocument.body);
      i = u;
    } while (i);
    $i(e);
  }
  function Sy(t, e) {
    var i = t;
    t = 0;
    do {
      var l = i.nextSibling;
      if (
        (i.nodeType === 1
          ? e
            ? ((i._stashedDisplay = i.style.display), (i.style.display = "none"))
            : ((i.style.display = i._stashedDisplay || ""),
              i.getAttribute("style") === "" && i.removeAttribute("style"))
          : i.nodeType === 3 &&
            (e ? ((i._stashedText = i.nodeValue), (i.nodeValue = "")) : (i.nodeValue = i._stashedText || "")),
        l && l.nodeType === 8)
      )
        if (((i = l.data), i === "/$")) {
          if (t === 0) break;
          t--;
        } else (i !== "$" && i !== "$?" && i !== "$~" && i !== "$!") || t++;
      i = l;
    } while (i);
  }
  function Zc(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var i = e;
      switch (((e = e.nextSibling), i.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Zc(i), Ko(i));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(i);
    }
  }
  function cS(t, e, i, l) {
    for (; t.nodeType === 1; ) {
      var u = i;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (l) {
        if (!t[bs])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (((c = t.getAttribute("rel")), c === "stylesheet" && t.hasAttribute("data-precedence")))
                break;
              if (
                c !== u.rel ||
                t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) ||
                t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) ||
                t.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((c = t.getAttribute("src")),
                (c !== (u.src == null ? null : u.src) ||
                  t.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  c &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var c = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === c) return t;
      } else return t;
      if (((t = an(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function fS(t, e, i) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i) ||
        ((t = an(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Ty(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e) ||
        ((t = an(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Gc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function qc(t) {
    return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
  }
  function dS(t, e) {
    var i = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || i.readyState !== "loading") e();
    else {
      var l = function () {
        (e(), i.removeEventListener("DOMContentLoaded", l));
      };
      (i.addEventListener("DOMContentLoaded", l), (t._reactRetry = l));
    }
  }
  function an(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
        )
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Yc = null;
  function Ay(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "/$" || i === "/&") {
          if (e === 0) return an(t.nextSibling);
          e--;
        } else (i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&") || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function _y(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (e === 0) return t;
          e--;
        } else (i !== "/$" && i !== "/&") || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Ey(t, e, i) {
    switch (((e = Vr(i)), t)) {
      case "html":
        if (((t = e.documentElement), !t)) throw Error(r(452));
        return t;
      case "head":
        if (((t = e.head), !t)) throw Error(r(453));
        return t;
      case "body":
        if (((t = e.body), !t)) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function el(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    Ko(t);
  }
  var sn = new Map(),
    wy = new Set();
  function Ur(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Yn = X.d;
  X.d = { f: hS, r: mS, D: pS, C: yS, L: gS, m: vS, X: xS, S: bS, M: SS };
  function hS() {
    var t = Yn.f(),
      e = Cr();
    return t || e;
  }
  function mS(t) {
    var e = gi(t);
    e !== null && e.tag === 5 && e.type === "form" ? qm(e) : Yn.r(t);
  }
  var Pi = typeof document > "u" ? null : document;
  function My(t, e, i) {
    var l = Pi;
    if (l && typeof e == "string" && e) {
      var u = Fe(e);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof i == "string" && (u += '[crossorigin="' + i + '"]'),
        wy.has(u) ||
          (wy.add(u),
          (t = { rel: t, crossOrigin: i, href: e }),
          l.querySelector(u) === null &&
            ((e = l.createElement("link")), Se(e, "link", t), me(e), l.head.appendChild(e))));
    }
  }
  function pS(t) {
    (Yn.D(t), My("dns-prefetch", t, null));
  }
  function yS(t, e) {
    (Yn.C(t, e), My("preconnect", t, e));
  }
  function gS(t, e, i) {
    Yn.L(t, e, i);
    var l = Pi;
    if (l && t && e) {
      var u = 'link[rel="preload"][as="' + Fe(e) + '"]';
      e === "image" && i && i.imageSrcSet
        ? ((u += '[imagesrcset="' + Fe(i.imageSrcSet) + '"]'),
          typeof i.imageSizes == "string" && (u += '[imagesizes="' + Fe(i.imageSizes) + '"]'))
        : (u += '[href="' + Fe(t) + '"]');
      var c = u;
      switch (e) {
        case "style":
          c = Fi(t);
          break;
        case "script":
          c = Wi(t);
      }
      sn.has(c) ||
        ((t = b({ rel: "preload", href: e === "image" && i && i.imageSrcSet ? void 0 : t, as: e }, i)),
        sn.set(c, t),
        l.querySelector(u) !== null ||
          (e === "style" && l.querySelector(nl(c))) ||
          (e === "script" && l.querySelector(al(c))) ||
          ((e = l.createElement("link")), Se(e, "link", t), me(e), l.head.appendChild(e)));
    }
  }
  function vS(t, e) {
    Yn.m(t, e);
    var i = Pi;
    if (i && t) {
      var l = e && typeof e.as == "string" ? e.as : "script",
        u = 'link[rel="modulepreload"][as="' + Fe(l) + '"][href="' + Fe(t) + '"]',
        c = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Wi(t);
      }
      if (
        !sn.has(c) &&
        ((t = b({ rel: "modulepreload", href: t }, e)), sn.set(c, t), i.querySelector(u) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(al(c))) return;
        }
        ((l = i.createElement("link")), Se(l, "link", t), me(l), i.head.appendChild(l));
      }
    }
  }
  function bS(t, e, i) {
    Yn.S(t, e, i);
    var l = Pi;
    if (l && t) {
      var u = vi(l).hoistableStyles,
        c = Fi(t);
      e = e || "default";
      var m = u.get(c);
      if (!m) {
        var v = { loading: 0, preload: null };
        if ((m = l.querySelector(nl(c)))) v.loading = 5;
        else {
          ((t = b({ rel: "stylesheet", href: t, "data-precedence": e }, i)), (i = sn.get(c)) && Xc(t, i));
          var S = (m = l.createElement("link"));
          (me(S),
            Se(S, "link", t),
            (S._p = new Promise(function (D, U) {
              ((S.onload = D), (S.onerror = U));
            })),
            S.addEventListener("load", function () {
              v.loading |= 1;
            }),
            S.addEventListener("error", function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            Br(m, e, l));
        }
        ((m = { type: "stylesheet", instance: m, count: 1, state: v }), u.set(c, m));
      }
    }
  }
  function xS(t, e) {
    Yn.X(t, e);
    var i = Pi;
    if (i && t) {
      var l = vi(i).hoistableScripts,
        u = Wi(t),
        c = l.get(u);
      c ||
        ((c = i.querySelector(al(u))),
        c ||
          ((t = b({ src: t, async: !0 }, e)),
          (e = sn.get(u)) && Kc(t, e),
          (c = i.createElement("script")),
          me(c),
          Se(c, "link", t),
          i.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        l.set(u, c));
    }
  }
  function SS(t, e) {
    Yn.M(t, e);
    var i = Pi;
    if (i && t) {
      var l = vi(i).hoistableScripts,
        u = Wi(t),
        c = l.get(u);
      c ||
        ((c = i.querySelector(al(u))),
        c ||
          ((t = b({ src: t, async: !0, type: "module" }, e)),
          (e = sn.get(u)) && Kc(t, e),
          (c = i.createElement("script")),
          me(c),
          Se(c, "link", t),
          i.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        l.set(u, c));
    }
  }
  function Cy(t, e, i, l) {
    var u = (u = ct.current) ? Ur(u) : null;
    if (!u) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string"
          ? ((e = Fi(i.href)),
            (i = vi(u).hoistableStyles),
            (l = i.get(e)),
            l || ((l = { type: "style", instance: null, count: 0, state: null }), i.set(e, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = Fi(i.href);
          var c = vi(u).hoistableStyles,
            m = c.get(t);
          if (
            (m ||
              ((u = u.ownerDocument || u),
              (m = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
              c.set(t, m),
              (c = u.querySelector(nl(t))) && !c._p && ((m.instance = c), (m.state.loading = 5)),
              sn.has(t) ||
                ((i = {
                  rel: "preload",
                  as: "style",
                  href: i.href,
                  crossOrigin: i.crossOrigin,
                  integrity: i.integrity,
                  media: i.media,
                  hrefLang: i.hrefLang,
                  referrerPolicy: i.referrerPolicy,
                }),
                sn.set(t, i),
                c || TS(u, t, i, m.state))),
            e && l === null)
          )
            throw Error(r(528, ""));
          return m;
        }
        if (e && l !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (e = i.async),
          (i = i.src),
          typeof i == "string" && e && typeof e != "function" && typeof e != "symbol"
            ? ((e = Wi(i)),
              (i = vi(u).hoistableScripts),
              (l = i.get(e)),
              l || ((l = { type: "script", instance: null, count: 0, state: null }), i.set(e, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, t));
    }
  }
  function Fi(t) {
    return 'href="' + Fe(t) + '"';
  }
  function nl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Dy(t) {
    return b({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function TS(t, e, i, l) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]")
      ? (l.loading = 1)
      : ((e = t.createElement("link")),
        (l.preload = e),
        e.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        e.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        Se(e, "link", i),
        me(e),
        t.head.appendChild(e));
  }
  function Wi(t) {
    return '[src="' + Fe(t) + '"]';
  }
  function al(t) {
    return "script[async]" + t;
  }
  function Ry(t, e, i) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case "style":
          var l = t.querySelector('style[data-href~="' + Fe(i.href) + '"]');
          if (l) return ((e.instance = l), me(l), l);
          var u = b({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (t.ownerDocument || t).createElement("style")),
            me(l),
            Se(l, "style", u),
            Br(l, i.precedence, t),
            (e.instance = l)
          );
        case "stylesheet":
          u = Fi(i.href);
          var c = t.querySelector(nl(u));
          if (c) return ((e.state.loading |= 4), (e.instance = c), me(c), c);
          ((l = Dy(i)),
            (u = sn.get(u)) && Xc(l, u),
            (c = (t.ownerDocument || t).createElement("link")),
            me(c));
          var m = c;
          return (
            (m._p = new Promise(function (v, S) {
              ((m.onload = v), (m.onerror = S));
            })),
            Se(c, "link", l),
            (e.state.loading |= 4),
            Br(c, i.precedence, t),
            (e.instance = c)
          );
        case "script":
          return (
            (c = Wi(i.src)),
            (u = t.querySelector(al(c)))
              ? ((e.instance = u), me(u), u)
              : ((l = i),
                (u = sn.get(c)) && ((l = b({}, i)), Kc(l, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement("script")),
                me(u),
                Se(u, "link", l),
                t.head.appendChild(u),
                (e.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" &&
        (e.state.loading & 4) === 0 &&
        ((l = e.instance), (e.state.loading |= 4), Br(l, i.precedence, t));
    return e.instance;
  }
  function Br(t, e, i) {
    for (
      var l = i.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        u = l.length ? l[l.length - 1] : null,
        c = u,
        m = 0;
      m < l.length;
      m++
    ) {
      var v = l[m];
      if (v.dataset.precedence === e) c = v;
      else if (c !== u) break;
    }
    c
      ? c.parentNode.insertBefore(t, c.nextSibling)
      : ((e = i.nodeType === 9 ? i.head : i), e.insertBefore(t, e.firstChild));
  }
  function Xc(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function Kc(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Lr = null;
  function Oy(t, e, i) {
    if (Lr === null) {
      var l = new Map(),
        u = (Lr = new Map());
      u.set(i, l);
    } else ((u = Lr), (l = u.get(i)), l || ((l = new Map()), u.set(i, l)));
    if (l.has(t)) return l;
    for (l.set(t, null), i = i.getElementsByTagName(t), u = 0; u < i.length; u++) {
      var c = i[u];
      if (
        !(c[bs] || c[ge] || (t === "link" && c.getAttribute("rel") === "stylesheet")) &&
        c.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var m = c.getAttribute(e) || "";
        m = t + m;
        var v = l.get(m);
        v ? v.push(c) : l.set(m, [c]);
      }
    }
    return l;
  }
  function zy(t, e, i) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(i, e === "title" ? t.querySelector("head > title") : null));
  }
  function AS(t, e, i) {
    if (i === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "") break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return ((t = e.disabled), typeof e.precedence == "string" && t == null);
          default:
            return !0;
        }
      case "script":
        if (
          e.async &&
          typeof e.async != "function" &&
          typeof e.async != "symbol" &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function ky(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function _S(t, e, i, l) {
    if (
      i.type === "stylesheet" &&
      (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
      (i.state.loading & 4) === 0
    ) {
      if (i.instance === null) {
        var u = Fi(l.href),
          c = e.querySelector(nl(u));
        if (c) {
          ((e = c._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (t.count++, (t = Hr.bind(t)), e.then(t, t)),
            (i.state.loading |= 4),
            (i.instance = c),
            me(c));
          return;
        }
        ((c = e.ownerDocument || e),
          (l = Dy(l)),
          (u = sn.get(u)) && Xc(l, u),
          (c = c.createElement("link")),
          me(c));
        var m = c;
        ((m._p = new Promise(function (v, S) {
          ((m.onload = v), (m.onerror = S));
        })),
          Se(c, "link", l),
          (i.instance = c));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(i, e),
        (e = i.state.preload) &&
          (i.state.loading & 3) === 0 &&
          (t.count++, (i = Hr.bind(t)), e.addEventListener("load", i), e.addEventListener("error", i)));
    }
  }
  var Qc = 0;
  function ES(t, e) {
    return (
      t.stylesheets && t.count === 0 && Gr(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (i) {
            var l = setTimeout(function () {
              if ((t.stylesheets && Gr(t, t.stylesheets), t.unsuspend)) {
                var c = t.unsuspend;
                ((t.unsuspend = null), c());
              }
            }, 6e4 + e);
            0 < t.imgBytes && Qc === 0 && (Qc = 62500 * sS());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Gr(t, t.stylesheets), t.unsuspend))
                ) {
                  var c = t.unsuspend;
                  ((t.unsuspend = null), c());
                }
              },
              (t.imgBytes > Qc ? 50 : 800) + e,
            );
            return (
              (t.unsuspend = i),
              function () {
                ((t.unsuspend = null), clearTimeout(l), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function Hr() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Gr(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Zr = null;
  function Gr(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null && (t.count++, (Zr = new Map()), e.forEach(wS, t), (Zr = null), Hr.call(t)));
  }
  function wS(t, e) {
    if (!(e.state.loading & 4)) {
      var i = Zr.get(t);
      if (i) var l = i.get(null);
      else {
        ((i = new Map()), Zr.set(t, i));
        for (
          var u = t.querySelectorAll("link[data-precedence],style[data-precedence]"), c = 0;
          c < u.length;
          c++
        ) {
          var m = u[c];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") &&
            (i.set(m.dataset.precedence, m), (l = m));
        }
        l && i.set(null, l);
      }
      ((u = e.instance),
        (m = u.getAttribute("data-precedence")),
        (c = i.get(m) || l),
        c === l && i.set(null, u),
        i.set(m, u),
        this.count++,
        (l = Hr.bind(this)),
        u.addEventListener("load", l),
        u.addEventListener("error", l),
        c
          ? c.parentNode.insertBefore(u, c.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var il = {
    $$typeof: Z,
    Provider: null,
    Consumer: null,
    _currentValue: P,
    _currentValue2: P,
    _threadCount: 0,
  };
  function MS(t, e, i, l, u, c, m, v, S) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Go(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Go(0)),
      (this.hiddenUpdates = Go(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = u),
      (this.onCaughtError = c),
      (this.onRecoverableError = m),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map()));
  }
  function Ny(t, e, i, l, u, c, m, v, S, D, U, H) {
    return (
      (t = new MS(t, e, i, m, S, D, U, H, v)),
      (e = 1),
      c === !0 && (e |= 24),
      (c = Ze(3, null, null, e)),
      (t.current = c),
      (c.stateNode = t),
      (e = wu()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (c.memoizedState = { element: l, isDehydrated: i, cache: e }),
      Ru(c),
      t
    );
  }
  function jy(t) {
    return t ? ((t = Ci), t) : Ci;
  }
  function Vy(t, e, i, l, u, c) {
    ((u = jy(u)),
      l.context === null ? (l.context = u) : (l.pendingContext = u),
      (l = sa(e)),
      (l.payload = { element: i }),
      (c = c === void 0 ? null : c),
      c !== null && (l.callback = c),
      (i = la(t, l, e)),
      i !== null && (je(i, t, e), Vs(i, t, e)));
  }
  function Uy(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < e ? i : e;
    }
  }
  function Jc(t, e) {
    (Uy(t, e), (t = t.alternate) && Uy(t, e));
  }
  function By(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Za(t, 67108864);
      (e !== null && je(e, t, 67108864), Jc(t, 67108864));
    }
  }
  function Ly(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ke();
      e = qo(e);
      var i = Za(t, e);
      (i !== null && je(i, t, e), Jc(t, e));
    }
  }
  var qr = !0;
  function CS(t, e, i, l) {
    var u = O.T;
    O.T = null;
    var c = X.p;
    try {
      ((X.p = 2), Pc(t, e, i, l));
    } finally {
      ((X.p = c), (O.T = u));
    }
  }
  function DS(t, e, i, l) {
    var u = O.T;
    O.T = null;
    var c = X.p;
    try {
      ((X.p = 8), Pc(t, e, i, l));
    } finally {
      ((X.p = c), (O.T = u));
    }
  }
  function Pc(t, e, i, l) {
    if (qr) {
      var u = Fc(l);
      if (u === null) (jc(t, e, l, Yr, i), Zy(t, l));
      else if (OS(u, t, e, i, l)) l.stopPropagation();
      else if ((Zy(t, l), e & 4 && -1 < RS.indexOf(t))) {
        for (; u !== null; ) {
          var c = gi(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var m = Va(c.pendingLanes);
                  if (m !== 0) {
                    var v = c;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; m; ) {
                      var S = 1 << (31 - Le(m));
                      ((v.entanglements[1] |= S), (m &= ~S));
                    }
                    (xn(c), (Ut & 6) === 0 && ((wr = Ue() + 500), $s(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = Za(c, 2)), v !== null && je(v, c, 2), Cr(), Jc(c, 2));
            }
          if (((c = Fc(l)), c === null && jc(t, e, l, Yr, i), c === u)) break;
          u = c;
        }
        u !== null && l.stopPropagation();
      } else jc(t, e, l, null, i);
    }
  }
  function Fc(t) {
    return ((t = $o(t)), Wc(t));
  }
  var Yr = null;
  function Wc(t) {
    if (((Yr = null), (t = yi(t)), t !== null)) {
      var e = f(t);
      if (e === null) t = null;
      else {
        var i = e.tag;
        if (i === 13) {
          if (((t = d(e)), t !== null)) return t;
          t = null;
        } else if (i === 31) {
          if (((t = h(e)), t !== null)) return t;
          t = null;
        } else if (i === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((Yr = t), null);
  }
  function Hy(t) {
    switch (t) {
      case "beforetoggle":
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
      case "toggle":
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
        return 2;
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
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (px()) {
          case Jd:
            return 2;
          case Pd:
            return 8;
          case kl:
          case yx:
            return 32;
          case Fd:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var $c = !1,
    ga = null,
    va = null,
    ba = null,
    sl = new Map(),
    ll = new Map(),
    xa = [],
    RS =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Zy(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        ga = null;
        break;
      case "dragenter":
      case "dragleave":
        va = null;
        break;
      case "mouseover":
      case "mouseout":
        ba = null;
        break;
      case "pointerover":
      case "pointerout":
        sl.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ll.delete(e.pointerId);
    }
  }
  function rl(t, e, i, l, u, c) {
    return t === null || t.nativeEvent !== c
      ? ((t = { blockedOn: e, domEventName: i, eventSystemFlags: l, nativeEvent: c, targetContainers: [u] }),
        e !== null && ((e = gi(e)), e !== null && By(e)),
        t)
      : ((t.eventSystemFlags |= l),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function OS(t, e, i, l, u) {
    switch (e) {
      case "focusin":
        return ((ga = rl(ga, t, e, i, l, u)), !0);
      case "dragenter":
        return ((va = rl(va, t, e, i, l, u)), !0);
      case "mouseover":
        return ((ba = rl(ba, t, e, i, l, u)), !0);
      case "pointerover":
        var c = u.pointerId;
        return (sl.set(c, rl(sl.get(c) || null, t, e, i, l, u)), !0);
      case "gotpointercapture":
        return ((c = u.pointerId), ll.set(c, rl(ll.get(c) || null, t, e, i, l, u)), !0);
    }
    return !1;
  }
  function Gy(t) {
    var e = yi(t.target);
    if (e !== null) {
      var i = f(e);
      if (i !== null) {
        if (((e = i.tag), e === 13)) {
          if (((e = d(i)), e !== null)) {
            ((t.blockedOn = e),
              nh(t.priority, function () {
                Ly(i);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = h(i)), e !== null)) {
            ((t.blockedOn = e),
              nh(t.priority, function () {
                Ly(i);
              }));
            return;
          }
        } else if (e === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Xr(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var i = Fc(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var l = new i.constructor(i.type, i);
        ((Wo = l), i.target.dispatchEvent(l), (Wo = null));
      } else return ((e = gi(i)), e !== null && By(e), (t.blockedOn = i), !1);
      e.shift();
    }
    return !0;
  }
  function qy(t, e, i) {
    Xr(t) && i.delete(e);
  }
  function zS() {
    (($c = !1),
      ga !== null && Xr(ga) && (ga = null),
      va !== null && Xr(va) && (va = null),
      ba !== null && Xr(ba) && (ba = null),
      sl.forEach(qy),
      ll.forEach(qy));
  }
  function Kr(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null), $c || (($c = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, zS)));
  }
  var Qr = null;
  function Yy(t) {
    Qr !== t &&
      ((Qr = t),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Qr === t && (Qr = null);
        for (var e = 0; e < t.length; e += 3) {
          var i = t[e],
            l = t[e + 1],
            u = t[e + 2];
          if (typeof l != "function") {
            if (Wc(l || i) === null) continue;
            break;
          }
          var c = gi(i);
          c !== null &&
            (t.splice(e, 3), (e -= 3), Fu(c, { pending: !0, data: u, method: i.method, action: l }, l, u));
        }
      }));
  }
  function $i(t) {
    function e(S) {
      return Kr(S, t);
    }
    (ga !== null && Kr(ga, t),
      va !== null && Kr(va, t),
      ba !== null && Kr(ba, t),
      sl.forEach(e),
      ll.forEach(e));
    for (var i = 0; i < xa.length; i++) {
      var l = xa[i];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < xa.length && ((i = xa[0]), i.blockedOn === null); )
      (Gy(i), i.blockedOn === null && xa.shift());
    if (((i = (t.ownerDocument || t).$$reactFormReplay), i != null))
      for (l = 0; l < i.length; l += 3) {
        var u = i[l],
          c = i[l + 1],
          m = u[De] || null;
        if (typeof c == "function") m || Yy(i);
        else if (m) {
          var v = null;
          if (c && c.hasAttribute("formAction")) {
            if (((u = c), (m = c[De] || null))) v = m.formAction;
            else if (Wc(u) !== null) continue;
          } else v = m.action;
          (typeof v == "function" ? (i[l + 1] = v) : (i.splice(l, 3), (l -= 3)), Yy(i));
        }
      }
  }
  function Xy() {
    function t(c) {
      c.canIntercept &&
        c.info === "react-transition" &&
        c.intercept({
          handler: function () {
            return new Promise(function (m) {
              return (u = m);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function e() {
      (u !== null && (u(), (u = null)), l || setTimeout(i, 20));
    }
    function i() {
      if (!l && !navigation.transition) {
        var c = navigation.currentEntry;
        c &&
          c.url != null &&
          navigation.navigate(c.url, { state: c.getState(), info: "react-transition", history: "replace" });
      }
    }
    if (typeof navigation == "object") {
      var l = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", e),
        navigation.addEventListener("navigateerror", e),
        setTimeout(i, 100),
        function () {
          ((l = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", e),
            navigation.removeEventListener("navigateerror", e),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function Ic(t) {
    this._internalRoot = t;
  }
  ((Jr.prototype.render = Ic.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(r(409));
      var i = e.current,
        l = Ke();
      Vy(i, l, t, e, null, null);
    }),
    (Jr.prototype.unmount = Ic.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (Vy(t.current, 2, null, t, null, null), Cr(), (e[pi] = null));
        }
      }));
  function Jr(t) {
    this._internalRoot = t;
  }
  Jr.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = eh();
      t = { blockedOn: null, target: t, priority: e };
      for (var i = 0; i < xa.length && e !== 0 && e < xa[i].priority; i++);
      (xa.splice(i, 0, t), i === 0 && Gy(t));
    }
  };
  var Ky = n.version;
  if (Ky !== "19.2.5") throw Error(r(527, Ky, "19.2.5"));
  X.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function"
        ? Error(r(188))
        : ((t = Object.keys(t).join(",")), Error(r(268, t)));
    return ((t = p(e)), (t = t !== null ? g(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var kS = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Pr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pr.isDisabled && Pr.supportsFiber)
      try {
        ((ys = Pr.inject(kS)), (Be = Pr));
      } catch {}
  }
  return (
    (ul.createRoot = function (t, e) {
      if (!o(t)) throw Error(r(299));
      var i = !1,
        l = "",
        u = Im,
        c = tp,
        m = ep;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (i = !0),
          e.identifierPrefix !== void 0 && (l = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (c = e.onCaughtError),
          e.onRecoverableError !== void 0 && (m = e.onRecoverableError)),
        (e = Ny(t, 1, !1, null, null, i, l, null, u, c, m, Xy)),
        (t[pi] = e.current),
        Nc(t),
        new Ic(e)
      );
    }),
    (ul.hydrateRoot = function (t, e, i) {
      if (!o(t)) throw Error(r(299));
      var l = !1,
        u = "",
        c = Im,
        m = tp,
        v = ep,
        S = null;
      return (
        i != null &&
          (i.unstable_strictMode === !0 && (l = !0),
          i.identifierPrefix !== void 0 && (u = i.identifierPrefix),
          i.onUncaughtError !== void 0 && (c = i.onUncaughtError),
          i.onCaughtError !== void 0 && (m = i.onCaughtError),
          i.onRecoverableError !== void 0 && (v = i.onRecoverableError),
          i.formState !== void 0 && (S = i.formState)),
        (e = Ny(t, 1, !0, e, i ?? null, l, u, S, c, m, v, Xy)),
        (e.context = jy(null)),
        (i = e.current),
        (l = Ke()),
        (l = qo(l)),
        (u = sa(l)),
        (u.callback = null),
        la(i, u, l),
        (i = l),
        (e.current.lanes = i),
        vs(e, i),
        xn(e),
        (t[pi] = e.current),
        Nc(t),
        new Jr(e)
      );
    }),
    (ul.version = "19.2.5"),
    ul
  );
}
var ng;
function qS() {
  if (ng) return nf.exports;
  ng = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (n) {
        console.error(n);
      }
  }
  return (a(), (nf.exports = GS()), nf.exports);
}
var YS = qS();
const dd = F.createContext({});
function Cl(a) {
  const n = F.useRef(null);
  return (n.current === null && (n.current = a()), n.current);
}
const XS = typeof window < "u",
  Ro = XS ? F.useLayoutEffect : F.useEffect,
  Oo = F.createContext(null);
function hd(a, n) {
  a.indexOf(n) === -1 && a.push(n);
}
function ss(a, n) {
  const s = a.indexOf(n);
  s > -1 && a.splice(s, 1);
}
const En = (a, n, s) => (s > n ? n : s < a ? a : s);
let md = () => {};
const Ca = {},
  Xv = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a),
  Kv = (a) => typeof a == "object" && a !== null,
  Qv = (a) => /^0[^.\s]+$/u.test(a);
function Jv(a) {
  let n;
  return () => (n === void 0 && (n = a()), n);
}
const rn = (a) => a,
  Dl = (...a) => a.reduce((n, s) => (r) => s(n(r))),
  ls = (a, n, s) => {
    const r = n - a;
    return r ? (s - a) / r : 1;
  };
class pd {
  constructor() {
    this.subscriptions = [];
  }
  add(n) {
    return (hd(this.subscriptions, n), () => ss(this.subscriptions, n));
  }
  notify(n, s, r) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1) this.subscriptions[0](n, s, r);
      else
        for (let f = 0; f < o; f++) {
          const d = this.subscriptions[f];
          d && d(n, s, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Ve = (a) => a * 1e3,
  ln = (a) => a / 1e3,
  Pv = (a, n) => (n ? a * (1e3 / n) : 0),
  KS = (a, n, s) => {
    const r = n - a;
    return ((((s - a) % r) + r) % r) + a;
  },
  Fv = (a, n, s) => (((1 - 3 * s + 3 * n) * a + (3 * s - 6 * n)) * a + 3 * n) * a,
  QS = 1e-7,
  JS = 12;
function PS(a, n, s, r, o) {
  let f,
    d,
    h = 0;
  do ((d = n + (s - n) / 2), (f = Fv(d, r, o) - a), f > 0 ? (s = d) : (n = d));
  while (Math.abs(f) > QS && ++h < JS);
  return d;
}
function Rl(a, n, s, r) {
  if (a === n && s === r) return rn;
  const o = (f) => PS(f, 0, 1, a, s);
  return (f) => (f === 0 || f === 1 ? f : Fv(o(f), n, r));
}
const Wv = (a) => (n) => (n <= 0.5 ? a(2 * n) / 2 : (2 - a(2 * (1 - n))) / 2),
  yd = (a) => (n) => 1 - a(1 - n),
  $v = Rl(0.33, 1.53, 0.69, 0.99),
  gd = yd($v),
  Iv = Wv(gd),
  t0 = (a) => (a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * gd(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1)))),
  vd = (a) => 1 - Math.sin(Math.acos(a)),
  e0 = yd(vd),
  n0 = Wv(vd),
  FS = Rl(0.42, 0, 1, 1),
  WS = Rl(0, 0, 0.58, 1),
  a0 = Rl(0.42, 0, 0.58, 1),
  i0 = (a) => Array.isArray(a) && typeof a[0] != "number";
function s0(a, n) {
  return i0(a) ? a[KS(0, a.length, n)] : a;
}
const l0 = (a) => Array.isArray(a) && typeof a[0] == "number",
  $S = {
    linear: rn,
    easeIn: FS,
    easeInOut: a0,
    easeOut: WS,
    circIn: vd,
    circInOut: n0,
    circOut: e0,
    backIn: gd,
    backInOut: Iv,
    backOut: $v,
    anticipate: t0,
  },
  IS = (a) => typeof a == "string",
  ag = (a) => {
    if (l0(a)) {
      md(a.length === 4);
      const [n, s, r, o] = a;
      return Rl(n, s, r, o);
    } else if (IS(a)) return $S[a];
    return a;
  },
  Fr = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"];
function tT(a) {
  let n = new Set(),
    s = new Set(),
    r = !1,
    o = !1;
  const f = new WeakSet();
  let d = { delta: 0, timestamp: 0, isProcessing: !1 };
  function h(p) {
    (f.has(p) && (y.schedule(p), a()), p(d));
  }
  const y = {
    schedule: (p, g = !1, b = !1) => {
      const w = b && r ? n : s;
      return (g && f.add(p), w.add(p), p);
    },
    cancel: (p) => {
      (s.delete(p), f.delete(p));
    },
    process: (p) => {
      if (((d = p), r)) {
        o = !0;
        return;
      }
      r = !0;
      const g = n;
      ((n = s), (s = g), n.forEach(h), n.clear(), (r = !1), o && ((o = !1), y.process(p)));
    },
  };
  return y;
}
const eT = 40;
function r0(a, n) {
  let s = !1,
    r = !0;
  const o = { delta: 0, timestamp: 0, isProcessing: !1 },
    f = () => (s = !0),
    d = Fr.reduce((Z, G) => ((Z[G] = tT(f)), Z), {}),
    {
      setup: h,
      read: y,
      resolveKeyframes: p,
      preUpdate: g,
      update: b,
      preRender: x,
      render: w,
      postRender: M,
    } = d,
    N = () => {
      const Z = Ca.useManualTiming,
        G = Z ? o.timestamp : performance.now();
      ((s = !1),
        Z || (o.delta = r ? 1e3 / 60 : Math.max(Math.min(G - o.timestamp, eT), 1)),
        (o.timestamp = G),
        (o.isProcessing = !0),
        h.process(o),
        y.process(o),
        p.process(o),
        g.process(o),
        b.process(o),
        x.process(o),
        w.process(o),
        M.process(o),
        (o.isProcessing = !1),
        s && n && ((r = !1), a(N)));
    },
    k = () => {
      ((s = !0), (r = !0), o.isProcessing || a(N));
    };
  return {
    schedule: Fr.reduce((Z, G) => {
      const $ = d[G];
      return ((Z[G] = (ot, K = !1, V = !1) => (s || k(), $.schedule(ot, K, V))), Z);
    }, {}),
    cancel: (Z) => {
      for (let G = 0; G < Fr.length; G++) d[Fr[G]].cancel(Z);
    },
    state: o,
    steps: d,
  };
}
const {
  schedule: Xt,
  cancel: Pn,
  state: Te,
  steps: rf,
} = r0(typeof requestAnimationFrame < "u" ? requestAnimationFrame : rn, !0);
let ao;
function nT() {
  ao = void 0;
}
const Me = {
    now: () => (
      ao === void 0 && Me.set(Te.isProcessing || Ca.useManualTiming ? Te.timestamp : performance.now()),
      ao
    ),
    set: (a) => {
      ((ao = a), queueMicrotask(nT));
    },
  },
  o0 = (a) => (n) => typeof n == "string" && n.startsWith(a),
  u0 = o0("--"),
  aT = o0("var(--"),
  bd = (a) => (aT(a) ? iT.test(a.split("/*")[0].trim()) : !1),
  iT = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ig(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const fs = { test: (a) => typeof a == "number", parse: parseFloat, transform: (a) => a },
  Sl = { ...fs, transform: (a) => En(0, 1, a) },
  Wr = { ...fs, default: 1 },
  yl = (a) => Math.round(a * 1e5) / 1e5,
  xd = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function sT(a) {
  return a == null;
}
const lT =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  Sd = (a, n) => (s) =>
    !!(
      (typeof s == "string" && lT.test(s) && s.startsWith(a)) ||
      (n && !sT(s) && Object.prototype.hasOwnProperty.call(s, n))
    ),
  c0 = (a, n, s) => (r) => {
    if (typeof r != "string") return r;
    const [o, f, d, h] = r.match(xd);
    return {
      [a]: parseFloat(o),
      [n]: parseFloat(f),
      [s]: parseFloat(d),
      alpha: h !== void 0 ? parseFloat(h) : 1,
    };
  },
  rT = (a) => En(0, 255, a),
  of = { ...fs, transform: (a) => Math.round(rT(a)) },
  si = {
    test: Sd("rgb", "red"),
    parse: c0("red", "green", "blue"),
    transform: ({ red: a, green: n, blue: s, alpha: r = 1 }) =>
      "rgba(" +
      of.transform(a) +
      ", " +
      of.transform(n) +
      ", " +
      of.transform(s) +
      ", " +
      yl(Sl.transform(r)) +
      ")",
  };
function oT(a) {
  let n = "",
    s = "",
    r = "",
    o = "";
  return (
    a.length > 5
      ? ((n = a.substring(1, 3)), (s = a.substring(3, 5)), (r = a.substring(5, 7)), (o = a.substring(7, 9)))
      : ((n = a.substring(1, 2)),
        (s = a.substring(2, 3)),
        (r = a.substring(3, 4)),
        (o = a.substring(4, 5)),
        (n += n),
        (s += s),
        (r += r),
        (o += o)),
    {
      red: parseInt(n, 16),
      green: parseInt(s, 16),
      blue: parseInt(r, 16),
      alpha: o ? parseInt(o, 16) / 255 : 1,
    }
  );
}
const Mf = { test: Sd("#"), parse: oT, transform: si.transform },
  Ol = (a) => ({
    test: (n) => typeof n == "string" && n.endsWith(a) && n.split(" ").length === 1,
    parse: parseFloat,
    transform: (n) => `${n}${a}`,
  }),
  Kn = Ol("deg"),
  An = Ol("%"),
  st = Ol("px"),
  uT = Ol("vh"),
  cT = Ol("vw"),
  sg = { ...An, parse: (a) => An.parse(a) / 100, transform: (a) => An.transform(a * 100) },
  es = {
    test: Sd("hsl", "hue"),
    parse: c0("hue", "saturation", "lightness"),
    transform: ({ hue: a, saturation: n, lightness: s, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(a) +
      ", " +
      An.transform(yl(n)) +
      ", " +
      An.transform(yl(s)) +
      ", " +
      yl(Sl.transform(r)) +
      ")",
  },
  ue = {
    test: (a) => si.test(a) || Mf.test(a) || es.test(a),
    parse: (a) => (si.test(a) ? si.parse(a) : es.test(a) ? es.parse(a) : Mf.parse(a)),
    transform: (a) =>
      typeof a == "string" ? a : a.hasOwnProperty("red") ? si.transform(a) : es.transform(a),
    getAnimatableNone: (a) => {
      const n = ue.parse(a);
      return ((n.alpha = 0), ue.transform(n));
    },
  },
  fT =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function dT(a) {
  var n, s;
  return (
    isNaN(a) &&
    typeof a == "string" &&
    (((n = a.match(xd)) == null ? void 0 : n.length) || 0) +
      (((s = a.match(fT)) == null ? void 0 : s.length) || 0) >
      0
  );
}
const f0 = "number",
  d0 = "color",
  hT = "var",
  mT = "var(",
  lg = "${}",
  pT =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function rs(a) {
  const n = a.toString(),
    s = [],
    r = { color: [], number: [], var: [] },
    o = [];
  let f = 0;
  const h = n
    .replace(
      pT,
      (y) => (
        ue.test(y)
          ? (r.color.push(f), o.push(d0), s.push(ue.parse(y)))
          : y.startsWith(mT)
            ? (r.var.push(f), o.push(hT), s.push(y))
            : (r.number.push(f), o.push(f0), s.push(parseFloat(y))),
        ++f,
        lg
      ),
    )
    .split(lg);
  return { values: s, split: h, indexes: r, types: o };
}
function yT(a) {
  return rs(a).values;
}
function h0({ split: a, types: n }) {
  const s = a.length;
  return (r) => {
    let o = "";
    for (let f = 0; f < s; f++)
      if (((o += a[f]), r[f] !== void 0)) {
        const d = n[f];
        d === f0 ? (o += yl(r[f])) : d === d0 ? (o += ue.transform(r[f])) : (o += r[f]);
      }
    return o;
  };
}
function gT(a) {
  return h0(rs(a));
}
const vT = (a) => (typeof a == "number" ? 0 : ue.test(a) ? ue.getAnimatableNone(a) : a),
  bT = (a, n) => (typeof a == "number" ? (n != null && n.trim().endsWith("/") ? a : 0) : vT(a));
function xT(a) {
  const n = rs(a);
  return h0(n)(n.values.map((r, o) => bT(r, n.split[o])));
}
const pn = { test: dT, parse: yT, createTransformer: gT, getAnimatableNone: xT };
function uf(a, n, s) {
  return (
    s < 0 && (s += 1),
    s > 1 && (s -= 1),
    s < 1 / 6 ? a + (n - a) * 6 * s : s < 1 / 2 ? n : s < 2 / 3 ? a + (n - a) * (2 / 3 - s) * 6 : a
  );
}
function ST({ hue: a, saturation: n, lightness: s, alpha: r }) {
  ((a /= 360), (n /= 100), (s /= 100));
  let o = 0,
    f = 0,
    d = 0;
  if (!n) o = f = d = s;
  else {
    const h = s < 0.5 ? s * (1 + n) : s + n - s * n,
      y = 2 * s - h;
    ((o = uf(y, h, a + 1 / 3)), (f = uf(y, h, a)), (d = uf(y, h, a - 1 / 3)));
  }
  return { red: Math.round(o * 255), green: Math.round(f * 255), blue: Math.round(d * 255), alpha: r };
}
function fo(a, n) {
  return (s) => (s > 0 ? n : a);
}
const Yt = (a, n, s) => a + (n - a) * s,
  cf = (a, n, s) => {
    const r = a * a,
      o = s * (n * n - r) + r;
    return o < 0 ? 0 : Math.sqrt(o);
  },
  TT = [Mf, si, es],
  AT = (a) => TT.find((n) => n.test(a));
function rg(a) {
  const n = AT(a);
  if (!n) return !1;
  let s = n.parse(a);
  return (n === es && (s = ST(s)), s);
}
const og = (a, n) => {
    const s = rg(a),
      r = rg(n);
    if (!s || !r) return fo(a, n);
    const o = { ...s };
    return (f) => (
      (o.red = cf(s.red, r.red, f)),
      (o.green = cf(s.green, r.green, f)),
      (o.blue = cf(s.blue, r.blue, f)),
      (o.alpha = Yt(s.alpha, r.alpha, f)),
      si.transform(o)
    );
  },
  Cf = new Set(["none", "hidden"]);
function _T(a, n) {
  return Cf.has(a) ? (s) => (s <= 0 ? a : n) : (s) => (s >= 1 ? n : a);
}
function ET(a, n) {
  return (s) => Yt(a, n, s);
}
function Td(a) {
  return typeof a == "number"
    ? ET
    : typeof a == "string"
      ? bd(a)
        ? fo
        : ue.test(a)
          ? og
          : CT
      : Array.isArray(a)
        ? m0
        : typeof a == "object"
          ? ue.test(a)
            ? og
            : wT
          : fo;
}
function m0(a, n) {
  const s = [...a],
    r = s.length,
    o = a.map((f, d) => Td(f)(f, n[d]));
  return (f) => {
    for (let d = 0; d < r; d++) s[d] = o[d](f);
    return s;
  };
}
function wT(a, n) {
  const s = { ...a, ...n },
    r = {};
  for (const o in s) a[o] !== void 0 && n[o] !== void 0 && (r[o] = Td(a[o])(a[o], n[o]));
  return (o) => {
    for (const f in r) s[f] = r[f](o);
    return s;
  };
}
function MT(a, n) {
  const s = [],
    r = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < n.values.length; o++) {
    const f = n.types[o],
      d = a.indexes[f][r[f]],
      h = a.values[d] ?? 0;
    ((s[o] = h), r[f]++);
  }
  return s;
}
const CT = (a, n) => {
  const s = pn.createTransformer(n),
    r = rs(a),
    o = rs(n);
  return r.indexes.var.length === o.indexes.var.length &&
    r.indexes.color.length === o.indexes.color.length &&
    r.indexes.number.length >= o.indexes.number.length
    ? (Cf.has(a) && !o.values.length) || (Cf.has(n) && !r.values.length)
      ? _T(a, n)
      : Dl(m0(MT(r, o), o.values), s)
    : fo(a, n);
};
function p0(a, n, s) {
  return typeof a == "number" && typeof n == "number" && typeof s == "number" ? Yt(a, n, s) : Td(a)(a, n);
}
const DT = (a) => {
    const n = ({ timestamp: s }) => a(s);
    return {
      start: (s = !0) => Xt.update(n, s),
      stop: () => Pn(n),
      now: () => (Te.isProcessing ? Te.timestamp : Me.now()),
    };
  },
  y0 = (a, n, s = 10) => {
    let r = "";
    const o = Math.max(Math.round(n / s), 2);
    for (let f = 0; f < o; f++) r += Math.round(a(f / (o - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${r.substring(0, r.length - 2)})`;
  },
  ho = 2e4;
function Ad(a) {
  let n = 0;
  const s = 50;
  let r = a.next(n);
  for (; !r.done && n < ho; ) ((n += s), (r = a.next(n)));
  return n >= ho ? 1 / 0 : n;
}
function g0(a, n = 100, s) {
  const r = s({ ...a, keyframes: [0, n] }),
    o = Math.min(Ad(r), ho);
  return { type: "keyframes", ease: (f) => r.next(o * f).value / n, duration: ln(o) };
}
const te = {
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  duration: 800,
  bounce: 0.3,
  visualDuration: 0.3,
  restSpeed: { granular: 0.01, default: 2 },
  restDelta: { granular: 0.005, default: 0.5 },
  minDuration: 0.01,
  maxDuration: 10,
  minDamping: 0.05,
  maxDamping: 1,
};
function Df(a, n) {
  return a * Math.sqrt(1 - n * n);
}
const RT = 12;
function OT(a, n, s) {
  let r = s;
  for (let o = 1; o < RT; o++) r = r - a(r) / n(r);
  return r;
}
const ff = 0.001;
function zT({
  duration: a = te.duration,
  bounce: n = te.bounce,
  velocity: s = te.velocity,
  mass: r = te.mass,
}) {
  let o,
    f,
    d = 1 - n;
  ((d = En(te.minDamping, te.maxDamping, d)),
    (a = En(te.minDuration, te.maxDuration, ln(a))),
    d < 1
      ? ((o = (p) => {
          const g = p * d,
            b = g * a,
            x = g - s,
            w = Df(p, d),
            M = Math.exp(-b);
          return ff - (x / w) * M;
        }),
        (f = (p) => {
          const b = p * d * a,
            x = b * s + s,
            w = Math.pow(d, 2) * Math.pow(p, 2) * a,
            M = Math.exp(-b),
            N = Df(Math.pow(p, 2), d);
          return ((-o(p) + ff > 0 ? -1 : 1) * ((x - w) * M)) / N;
        }))
      : ((o = (p) => {
          const g = Math.exp(-p * a),
            b = (p - s) * a + 1;
          return -ff + g * b;
        }),
        (f = (p) => {
          const g = Math.exp(-p * a),
            b = (s - p) * (a * a);
          return g * b;
        })));
  const h = 5 / a,
    y = OT(o, f, h);
  if (((a = Ve(a)), isNaN(y))) return { stiffness: te.stiffness, damping: te.damping, duration: a };
  {
    const p = Math.pow(y, 2) * r;
    return { stiffness: p, damping: d * 2 * Math.sqrt(r * p), duration: a };
  }
}
const kT = ["duration", "bounce"],
  NT = ["stiffness", "damping", "mass"];
function ug(a, n) {
  return n.some((s) => a[s] !== void 0);
}
function jT(a) {
  let n = {
    velocity: te.velocity,
    stiffness: te.stiffness,
    damping: te.damping,
    mass: te.mass,
    isResolvedFromDuration: !1,
    ...a,
  };
  if (!ug(a, NT) && ug(a, kT))
    if (((n.velocity = 0), a.visualDuration)) {
      const s = a.visualDuration,
        r = (2 * Math.PI) / (s * 1.2),
        o = r * r,
        f = 2 * En(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(o);
      n = { ...n, mass: te.mass, stiffness: o, damping: f };
    } else {
      const s = zT({ ...a, velocity: 0 });
      ((n = { ...n, ...s, mass: te.mass }), (n.isResolvedFromDuration = !0));
    }
  return n;
}
function Tl(a = te.visualDuration, n = te.bounce) {
  const s = typeof a != "object" ? { visualDuration: a, keyframes: [0, 1], bounce: n } : a;
  let { restSpeed: r, restDelta: o } = s;
  const f = s.keyframes[0],
    d = s.keyframes[s.keyframes.length - 1],
    h = { done: !1, value: f },
    {
      stiffness: y,
      damping: p,
      mass: g,
      duration: b,
      velocity: x,
      isResolvedFromDuration: w,
    } = jT({ ...s, velocity: -ln(s.velocity || 0) }),
    M = x || 0,
    N = p / (2 * Math.sqrt(y * g)),
    k = d - f,
    j = ln(Math.sqrt(y / g)),
    q = Math.abs(k) < 5;
  (r || (r = q ? te.restSpeed.granular : te.restSpeed.default),
    o || (o = q ? te.restDelta.granular : te.restDelta.default));
  let Z, G, $, ot, K, V;
  if (N < 1)
    (($ = Df(j, N)),
      (ot = (M + N * j * k) / $),
      (Z = (et) => {
        const mt = Math.exp(-N * j * et);
        return d - mt * (ot * Math.sin($ * et) + k * Math.cos($ * et));
      }),
      (K = N * j * ot + k * $),
      (V = N * j * k - ot * $),
      (G = (et) => Math.exp(-N * j * et) * (K * Math.sin($ * et) + V * Math.cos($ * et))));
  else if (N === 1) {
    Z = (mt) => d - Math.exp(-j * mt) * (k + (M + j * k) * mt);
    const et = M + j * k;
    G = (mt) => Math.exp(-j * mt) * (j * et * mt - M);
  } else {
    const et = j * Math.sqrt(N * N - 1);
    Z = (Ht) => {
      const Vt = Math.exp(-N * j * Ht),
        O = Math.min(et * Ht, 300);
      return d - (Vt * ((M + N * j * k) * Math.sinh(O) + et * k * Math.cosh(O))) / et;
    };
    const mt = (M + N * j * k) / et,
      St = N * j * mt - k * et,
      Qt = N * j * k - mt * et;
    G = (Ht) => {
      const Vt = Math.exp(-N * j * Ht),
        O = Math.min(et * Ht, 300);
      return Vt * (St * Math.sinh(O) + Qt * Math.cosh(O));
    };
  }
  const J = {
    calculatedDuration: (w && b) || null,
    velocity: (et) => Ve(G(et)),
    next: (et) => {
      if (!w && N < 1) {
        const St = Math.exp(-N * j * et),
          Qt = Math.sin($ * et),
          Ht = Math.cos($ * et),
          Vt = d - St * (ot * Qt + k * Ht),
          O = Ve(St * (K * Qt + V * Ht));
        return ((h.done = Math.abs(O) <= r && Math.abs(d - Vt) <= o), (h.value = h.done ? d : Vt), h);
      }
      const mt = Z(et);
      if (w) h.done = et >= b;
      else {
        const St = Ve(G(et));
        h.done = Math.abs(St) <= r && Math.abs(d - mt) <= o;
      }
      return ((h.value = h.done ? d : mt), h);
    },
    toString: () => {
      const et = Math.min(Ad(J), ho),
        mt = y0((St) => J.next(et * St).value, et, 30);
      return et + "ms " + mt;
    },
    toTransition: () => {},
  };
  return J;
}
Tl.applyToOptions = (a) => {
  const n = g0(a, 100, Tl);
  return ((a.ease = n.ease), (a.duration = Ve(n.duration)), (a.type = "keyframes"), a);
};
const VT = 5;
function v0(a, n, s) {
  const r = Math.max(n - VT, 0);
  return Pv(s - a(r), n - r);
}
function Rf({
  keyframes: a,
  velocity: n = 0,
  power: s = 0.8,
  timeConstant: r = 325,
  bounceDamping: o = 10,
  bounceStiffness: f = 500,
  modifyTarget: d,
  min: h,
  max: y,
  restDelta: p = 0.5,
  restSpeed: g,
}) {
  const b = a[0],
    x = { done: !1, value: b },
    w = (V) => (h !== void 0 && V < h) || (y !== void 0 && V > y),
    M = (V) => (h === void 0 ? y : y === void 0 || Math.abs(h - V) < Math.abs(y - V) ? h : y);
  let N = s * n;
  const k = b + N,
    j = d === void 0 ? k : d(k);
  j !== k && (N = j - b);
  const q = (V) => -N * Math.exp(-V / r),
    Z = (V) => j + q(V),
    G = (V) => {
      const J = q(V),
        et = Z(V);
      ((x.done = Math.abs(J) <= p), (x.value = x.done ? j : et));
    };
  let $, ot;
  const K = (V) => {
    w(x.value) &&
      (($ = V),
      (ot = Tl({
        keyframes: [x.value, M(x.value)],
        velocity: v0(Z, V, x.value),
        damping: o,
        stiffness: f,
        restDelta: p,
        restSpeed: g,
      })));
  };
  return (
    K(0),
    {
      calculatedDuration: null,
      next: (V) => {
        let J = !1;
        return (
          !ot && $ === void 0 && ((J = !0), G(V), K(V)),
          $ !== void 0 && V >= $ ? ot.next(V - $) : (!J && G(V), x)
        );
      },
    }
  );
}
function UT(a, n, s) {
  const r = [],
    o = s || Ca.mix || p0,
    f = a.length - 1;
  for (let d = 0; d < f; d++) {
    let h = o(a[d], a[d + 1]);
    if (n) {
      const y = Array.isArray(n) ? n[d] || rn : n;
      h = Dl(y, h);
    }
    r.push(h);
  }
  return r;
}
function b0(a, n, { clamp: s = !0, ease: r, mixer: o } = {}) {
  const f = a.length;
  if ((md(f === n.length), f === 1)) return () => n[0];
  if (f === 2 && n[0] === n[1]) return () => n[1];
  const d = a[0] === a[1];
  a[0] > a[f - 1] && ((a = [...a].reverse()), (n = [...n].reverse()));
  const h = UT(n, r, o),
    y = h.length,
    p = (g) => {
      if (d && g < a[0]) return n[0];
      let b = 0;
      if (y > 1) for (; b < a.length - 2 && !(g < a[b + 1]); b++);
      const x = ls(a[b], a[b + 1], g);
      return h[b](x);
    };
  return s ? (g) => p(En(a[0], a[f - 1], g)) : p;
}
function x0(a, n) {
  const s = a[a.length - 1];
  for (let r = 1; r <= n; r++) {
    const o = ls(0, n, r);
    a.push(Yt(s, 1, o));
  }
}
function S0(a) {
  const n = [0];
  return (x0(n, a.length - 1), n);
}
function BT(a, n) {
  return a.map((s) => s * n);
}
function LT(a, n) {
  return a.map(() => n || a0).splice(0, a.length - 1);
}
function gl({ duration: a = 300, keyframes: n, times: s, ease: r = "easeInOut" }) {
  const o = i0(r) ? r.map(ag) : ag(r),
    f = { done: !1, value: n[0] },
    d = BT(s && s.length === n.length ? s : S0(n), a),
    h = b0(d, n, { ease: Array.isArray(o) ? o : LT(n, o) });
  return { calculatedDuration: a, next: (y) => ((f.value = h(y)), (f.done = y >= a), f) };
}
const HT = (a) => a !== null;
function zo(a, { repeat: n, repeatType: s = "loop" }, r, o = 1) {
  const f = a.filter(HT),
    h = o < 0 || (n && s !== "loop" && n % 2 === 1) ? 0 : f.length - 1;
  return !h || r === void 0 ? f[h] : r;
}
const ZT = { decay: Rf, inertia: Rf, tween: gl, keyframes: gl, spring: Tl };
function T0(a) {
  typeof a.type == "string" && (a.type = ZT[a.type]);
}
class _d {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((n) => {
      this.resolve = n;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(n, s) {
    return this.finished.then(n, s);
  }
}
const GT = (a) => a / 100;
class mo extends _d {
  constructor(n) {
    (super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.delayState = { done: !1, value: void 0 }),
      (this.stop = () => {
        var r, o;
        const { motionValue: s } = this.options;
        (s && s.updatedAt !== Me.now() && this.tick(Me.now()),
          (this.isStopped = !0),
          this.state !== "idle" && (this.teardown(), (o = (r = this.options).onStop) == null || o.call(r)));
      }),
      (this.options = n),
      this.initAnimation(),
      this.play(),
      n.autoplay === !1 && this.pause());
  }
  initAnimation() {
    const { options: n } = this;
    T0(n);
    const { type: s = gl, repeat: r = 0, repeatDelay: o = 0, repeatType: f, velocity: d = 0 } = n;
    let { keyframes: h } = n;
    const y = s || gl;
    y !== gl && typeof h[0] != "number" && ((this.mixKeyframes = Dl(GT, p0(h[0], h[1]))), (h = [0, 100]));
    const p = y({ ...n, keyframes: h });
    (f === "mirror" && (this.mirroredGenerator = y({ ...n, keyframes: [...h].reverse(), velocity: -d })),
      p.calculatedDuration === null && (p.calculatedDuration = Ad(p)));
    const { calculatedDuration: g } = p;
    ((this.calculatedDuration = g),
      (this.resolvedDuration = g + o),
      (this.totalDuration = this.resolvedDuration * (r + 1) - o),
      (this.generator = p));
  }
  updateTime(n) {
    const s = Math.round(n - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? (this.currentTime = this.holdTime) : (this.currentTime = s);
  }
  tick(n, s = !1) {
    const {
      generator: r,
      totalDuration: o,
      mixKeyframes: f,
      mirroredGenerator: d,
      resolvedDuration: h,
      calculatedDuration: y,
    } = this;
    if (this.startTime === null) return r.next(0);
    const {
      delay: p = 0,
      keyframes: g,
      repeat: b,
      repeatType: x,
      repeatDelay: w,
      type: M,
      onUpdate: N,
      finalKeyframe: k,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, n))
      : this.speed < 0 && (this.startTime = Math.min(n - o / this.speed, this.startTime)),
      s ? (this.currentTime = n) : this.updateTime(n));
    const j = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1),
      q = this.playbackSpeed >= 0 ? j < 0 : j > o;
    ((this.currentTime = Math.max(j, 0)),
      this.state === "finished" && this.holdTime === null && (this.currentTime = o));
    let Z = this.currentTime,
      G = r;
    if (b) {
      const V = Math.min(this.currentTime, o) / h;
      let J = Math.floor(V),
        et = V % 1;
      (!et && V >= 1 && (et = 1),
        et === 1 && J--,
        (J = Math.min(J, b + 1)),
        !!(J % 2) && (x === "reverse" ? ((et = 1 - et), w && (et -= w / h)) : x === "mirror" && (G = d)),
        (Z = En(0, 1, et) * h));
    }
    let $;
    (q ? ((this.delayState.value = g[0]), ($ = this.delayState)) : ($ = G.next(Z)),
      f && !q && ($.value = f($.value)));
    let { done: ot } = $;
    !q && y !== null && (ot = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const K = this.holdTime === null && (this.state === "finished" || (this.state === "running" && ot));
    return (
      K && M !== Rf && ($.value = zo(g, this.options, k, this.speed)),
      N && N($.value),
      K && this.finish(),
      $
    );
  }
  then(n, s) {
    return this.finished.then(n, s);
  }
  get duration() {
    return ln(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: n = 0 } = this.options || {};
    return this.duration + ln(n);
  }
  get time() {
    return ln(this.currentTime);
  }
  set time(n) {
    ((n = Ve(n)),
      (this.currentTime = n),
      this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0
        ? (this.holdTime = n)
        : this.driver && (this.startTime = this.driver.now() - n / this.playbackSpeed),
      this.driver
        ? this.driver.start(!1)
        : ((this.startTime = 0), (this.state = "paused"), (this.holdTime = n), this.tick(n)));
  }
  getGeneratorVelocity() {
    const n = this.currentTime;
    if (n <= 0) return this.options.velocity || 0;
    if (this.generator.velocity) return this.generator.velocity(n);
    const s = this.generator.next(n).value;
    return v0((r) => this.generator.next(r).value, n, s);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(n) {
    const s = this.playbackSpeed !== n;
    (s && this.driver && this.updateTime(Me.now()),
      (this.playbackSpeed = n),
      s && this.driver && (this.time = ln(this.currentTime)));
  }
  play() {
    var o, f;
    if (this.isStopped) return;
    const { driver: n = DT, startTime: s } = this.options;
    (this.driver || (this.driver = n((d) => this.tick(d))),
      (f = (o = this.options).onPlay) == null || f.call(o));
    const r = this.driver.now();
    (this.state === "finished"
      ? (this.updateFinished(), (this.startTime = r))
      : this.holdTime !== null
        ? (this.startTime = r - this.holdTime)
        : this.startTime || (this.startTime = s ?? r),
      this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    ((this.state = "paused"), this.updateTime(Me.now()), (this.holdTime = this.currentTime));
  }
  complete() {
    (this.state !== "running" && this.play(), (this.state = "finished"), (this.holdTime = null));
  }
  finish() {
    var n, s;
    (this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      (s = (n = this.options).onComplete) == null || s.call(n));
  }
  cancel() {
    var n, s;
    ((this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      (s = (n = this.options).onCancel) == null || s.call(n));
  }
  teardown() {
    ((this.state = "idle"), this.stopDriver(), (this.startTime = this.holdTime = null));
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(n) {
    return ((this.startTime = 0), this.tick(n, !0));
  }
  attachTimeline(n) {
    var s;
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"), (this.options.ease = "linear"), this.initAnimation()),
      (s = this.driver) == null || s.stop(),
      n.observe(this)
    );
  }
}
function qT(a) {
  for (let n = 1; n < a.length; n++) a[n] ?? (a[n] = a[n - 1]);
}
const li = (a) => (a * 180) / Math.PI,
  Of = (a) => {
    const n = li(Math.atan2(a[1], a[0]));
    return zf(n);
  },
  YT = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
    rotate: Of,
    rotateZ: Of,
    skewX: (a) => li(Math.atan(a[1])),
    skewY: (a) => li(Math.atan(a[2])),
    skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2,
  },
  zf = (a) => ((a = a % 360), a < 0 && (a += 360), a),
  cg = Of,
  fg = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]),
  dg = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]),
  XT = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: fg,
    scaleY: dg,
    scale: (a) => (fg(a) + dg(a)) / 2,
    rotateX: (a) => zf(li(Math.atan2(a[6], a[5]))),
    rotateY: (a) => zf(li(Math.atan2(-a[2], a[0]))),
    rotateZ: cg,
    rotate: cg,
    skewX: (a) => li(Math.atan(a[4])),
    skewY: (a) => li(Math.atan(a[1])),
    skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2,
  };
function kf(a) {
  return a.includes("scale") ? 1 : 0;
}
function Nf(a, n) {
  if (!a || a === "none") return kf(n);
  const s = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, o;
  if (s) ((r = XT), (o = s));
  else {
    const h = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    ((r = YT), (o = h));
  }
  if (!o) return kf(n);
  const f = r[n],
    d = o[1].split(",").map(QT);
  return typeof f == "function" ? f(d) : d[f];
}
const KT = (a, n) => {
  const { transform: s = "none" } = getComputedStyle(a);
  return Nf(s, n);
};
function QT(a) {
  return parseFloat(a.trim());
}
const ds = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  hs = new Set([...ds, "pathRotation"]),
  hg = (a) => a === fs || a === st,
  JT = new Set(["x", "y", "z"]),
  PT = ds.filter((a) => !JT.has(a));
function FT(a) {
  const n = [];
  return (
    PT.forEach((s) => {
      const r = a.getValue(s);
      r !== void 0 && (n.push([s, r.get()]), r.set(s.startsWith("scale") ? 1 : 0));
    }),
    n
  );
}
const wa = {
  width: ({ x: a }, { paddingLeft: n = "0", paddingRight: s = "0", boxSizing: r }) => {
    const o = a.max - a.min;
    return r === "border-box" ? o : o - parseFloat(n) - parseFloat(s);
  },
  height: ({ y: a }, { paddingTop: n = "0", paddingBottom: s = "0", boxSizing: r }) => {
    const o = a.max - a.min;
    return r === "border-box" ? o : o - parseFloat(n) - parseFloat(s);
  },
  top: (a, { top: n }) => parseFloat(n),
  left: (a, { left: n }) => parseFloat(n),
  bottom: ({ y: a }, { top: n }) => parseFloat(n) + (a.max - a.min),
  right: ({ x: a }, { left: n }) => parseFloat(n) + (a.max - a.min),
  x: (a, { transform: n }) => Nf(n, "x"),
  y: (a, { transform: n }) => Nf(n, "y"),
};
wa.translateX = wa.x;
wa.translateY = wa.y;
const ri = new Set();
let jf = !1,
  Vf = !1,
  Uf = !1;
function A0() {
  if (Vf) {
    const a = Array.from(ri).filter((r) => r.needsMeasurement),
      n = new Set(a.map((r) => r.element)),
      s = new Map();
    (n.forEach((r) => {
      const o = FT(r);
      o.length && (s.set(r, o), r.render());
    }),
      a.forEach((r) => r.measureInitialState()),
      n.forEach((r) => {
        r.render();
        const o = s.get(r);
        o &&
          o.forEach(([f, d]) => {
            var h;
            (h = r.getValue(f)) == null || h.set(d);
          });
      }),
      a.forEach((r) => r.measureEndState()),
      a.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
      }));
  }
  ((Vf = !1), (jf = !1), ri.forEach((a) => a.complete(Uf)), ri.clear());
}
function _0() {
  ri.forEach((a) => {
    (a.readKeyframes(), a.needsMeasurement && (Vf = !0));
  });
}
function WT() {
  ((Uf = !0), _0(), A0(), (Uf = !1));
}
class Ed {
  constructor(n, s, r, o, f, d = !1) {
    ((this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...n]),
      (this.onComplete = s),
      (this.name = r),
      (this.motionValue = o),
      (this.element = f),
      (this.isAsync = d));
  }
  scheduleResolve() {
    ((this.state = "scheduled"),
      this.isAsync
        ? (ri.add(this), jf || ((jf = !0), Xt.read(_0), Xt.resolveKeyframes(A0)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const { unresolvedKeyframes: n, name: s, element: r, motionValue: o } = this;
    if (n[0] === null) {
      const f = o == null ? void 0 : o.get(),
        d = n[n.length - 1];
      if (f !== void 0) n[0] = f;
      else if (r && s) {
        const h = r.readValue(s, d);
        h != null && (n[0] = h);
      }
      (n[0] === void 0 && (n[0] = d), o && f === void 0 && o.set(n[0]));
    }
    qT(n);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(n = !1) {
    ((this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, n),
      ri.delete(this));
  }
  cancel() {
    this.state === "scheduled" && (ri.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const $T = (a) => a.startsWith("--");
function E0(a, n, s) {
  $T(n) ? a.style.setProperty(n, s) : (a.style[n] = s);
}
const IT = {};
function w0(a, n) {
  const s = Jv(a);
  return () => IT[n] ?? s();
}
const tA = w0(() => window.ScrollTimeline !== void 0, "scrollTimeline"),
  M0 = w0(() => {
    try {
      document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  hl = ([a, n, s, r]) => `cubic-bezier(${a}, ${n}, ${s}, ${r})`,
  mg = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: hl([0, 0.65, 0.55, 1]),
    circOut: hl([0.55, 0, 1, 0.45]),
    backIn: hl([0.31, 0.01, 0.66, -0.59]),
    backOut: hl([0.33, 1.53, 0.69, 0.99]),
  };
function C0(a, n) {
  if (a)
    return typeof a == "function"
      ? M0()
        ? y0(a, n)
        : "ease-out"
      : l0(a)
        ? hl(a)
        : Array.isArray(a)
          ? a.map((s) => C0(s, n) || mg.easeOut)
          : mg[a];
}
function eA(
  a,
  n,
  s,
  {
    delay: r = 0,
    duration: o = 300,
    repeat: f = 0,
    repeatType: d = "loop",
    ease: h = "easeOut",
    times: y,
  } = {},
  p = void 0,
) {
  const g = { [n]: s };
  y && (g.offset = y);
  const b = C0(h, o);
  Array.isArray(b) && (g.easing = b);
  const x = {
    delay: r,
    duration: o,
    easing: Array.isArray(b) ? "linear" : b,
    fill: "both",
    iterations: f + 1,
    direction: d === "reverse" ? "alternate" : "normal",
  };
  return (p && (x.pseudoElement = p), a.animate(g, x));
}
function wd(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function nA({ type: a, ...n }) {
  return wd(a) && M0()
    ? a.applyToOptions(n)
    : (n.duration ?? (n.duration = 300), n.ease ?? (n.ease = "easeOut"), n);
}
class D0 extends _d {
  constructor(n) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), (this.manualStartTime = null), !n))
      return;
    const {
      element: s,
      name: r,
      keyframes: o,
      pseudoElement: f,
      allowFlatten: d = !1,
      finalKeyframe: h,
      onComplete: y,
    } = n;
    ((this.isPseudoElement = !!f),
      (this.allowFlatten = d),
      (this.options = n),
      md(typeof n.type != "string"));
    const p = nA(n);
    ((this.animation = eA(s, r, o, p, f)),
      p.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !f)) {
          const g = zo(o, this.options, h, this.speed);
          (this.updateMotionValue && this.updateMotionValue(g), E0(s, r, g), this.animation.cancel());
        }
        (y == null || y(), this.notifyFinished());
      }));
  }
  play() {
    this.isStopped ||
      ((this.manualStartTime = null),
      this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var n, s;
    (s = (n = this.animation).finish) == null || s.call(n);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: n } = this;
    n === "idle" ||
      n === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    var s, r, o;
    const n = (s = this.options) == null ? void 0 : s.element;
    !this.isPseudoElement &&
      n != null &&
      n.isConnected &&
      ((o = (r = this.animation).commitStyles) == null || o.call(r));
  }
  get duration() {
    var s, r;
    const n =
      ((r = (s = this.animation.effect) == null ? void 0 : s.getComputedTiming) == null
        ? void 0
        : r.call(s).duration) || 0;
    return ln(Number(n));
  }
  get iterationDuration() {
    const { delay: n = 0 } = this.options || {};
    return this.duration + ln(n);
  }
  get time() {
    return ln(Number(this.animation.currentTime) || 0);
  }
  set time(n) {
    const s = this.finishedTime !== null;
    ((this.manualStartTime = null),
      (this.finishedTime = null),
      (this.animation.currentTime = Ve(n)),
      s && this.animation.pause());
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(n) {
    (n < 0 && (this.finishedTime = null), (this.animation.playbackRate = n));
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(n) {
    this.manualStartTime = this.animation.startTime = n;
  }
  attachTimeline({ timeline: n, rangeStart: s, rangeEnd: r, observe: o }) {
    var f;
    return (
      this.allowFlatten && ((f = this.animation.effect) == null || f.updateTiming({ easing: "linear" })),
      (this.animation.onfinish = null),
      n && tA()
        ? ((this.animation.timeline = n),
          s && (this.animation.rangeStart = s),
          r && (this.animation.rangeEnd = r),
          rn)
        : o(this)
    );
  }
}
const R0 = { anticipate: t0, backInOut: Iv, circInOut: n0 };
function aA(a) {
  return a in R0;
}
function iA(a) {
  typeof a.ease == "string" && aA(a.ease) && (a.ease = R0[a.ease]);
}
const df = 10;
class sA extends D0 {
  constructor(n) {
    (iA(n),
      T0(n),
      super(n),
      n.startTime !== void 0 && n.autoplay !== !1 && (this.startTime = n.startTime),
      (this.options = n));
  }
  updateMotionValue(n) {
    const { motionValue: s, onUpdate: r, onComplete: o, element: f, ...d } = this.options;
    if (!s) return;
    if (n !== void 0) {
      s.set(n);
      return;
    }
    const h = new mo({ ...d, autoplay: !1 }),
      y = Math.max(df, Me.now() - this.startTime),
      p = En(0, df, y - df),
      g = h.sample(y).value,
      { name: b } = this.options;
    (f && b && E0(f, b, g), s.setWithVelocity(h.sample(Math.max(0, y - p)).value, g, p), h.stop());
  }
}
const pg = (a, n) =>
  n === "zIndex"
    ? !1
    : !!(
        typeof a == "number" ||
        Array.isArray(a) ||
        (typeof a == "string" && (pn.test(a) || a === "0") && !a.startsWith("url("))
      );
function lA(a) {
  const n = a[0];
  if (a.length === 1) return !0;
  for (let s = 0; s < a.length; s++) if (a[s] !== n) return !0;
}
function rA(a, n, s, r) {
  const o = a[0];
  if (o === null) return !1;
  if (n === "display" || n === "visibility") return !0;
  const f = a[a.length - 1],
    d = pg(o, n),
    h = pg(f, n);
  return !d || !h ? !1 : lA(a) || ((s === "spring" || wd(s)) && r);
}
function Bf(a) {
  ((a.duration = 0), (a.type = "keyframes"));
}
const O0 = new Set(["opacity", "clipPath", "filter", "transform"]),
  oA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function uA(a) {
  for (let n = 0; n < a.length; n++) if (typeof a[n] == "string" && oA.test(a[n])) return !0;
  return !1;
}
const cA = new Set([
    "color",
    "backgroundColor",
    "outlineColor",
    "fill",
    "stroke",
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
  ]),
  fA = Jv(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function dA(a) {
  var b;
  const { motionValue: n, name: s, repeatDelay: r, repeatType: o, damping: f, type: d, keyframes: h } = a;
  if (!(((b = n == null ? void 0 : n.owner) == null ? void 0 : b.current) instanceof HTMLElement)) return !1;
  const { onUpdate: p, transformTemplate: g } = n.owner.getProps();
  return (
    fA() &&
    s &&
    (O0.has(s) || (cA.has(s) && uA(h))) &&
    (s !== "transform" || !g) &&
    !p &&
    !r &&
    o !== "mirror" &&
    f !== 0 &&
    d !== "inertia"
  );
}
const hA = 40;
class mA extends _d {
  constructor({
    autoplay: n = !0,
    delay: s = 0,
    type: r = "keyframes",
    repeat: o = 0,
    repeatDelay: f = 0,
    repeatType: d = "loop",
    keyframes: h,
    name: y,
    motionValue: p,
    element: g,
    ...b
  }) {
    var M;
    (super(),
      (this.stop = () => {
        var N, k;
        (this._animation && (this._animation.stop(), (N = this.stopTimeline) == null || N.call(this)),
          (k = this.keyframeResolver) == null || k.cancel());
      }),
      (this.createdAt = Me.now()));
    const x = {
        autoplay: n,
        delay: s,
        type: r,
        repeat: o,
        repeatDelay: f,
        repeatType: d,
        name: y,
        motionValue: p,
        element: g,
        ...b,
      },
      w = (g == null ? void 0 : g.KeyframeResolver) || Ed;
    ((this.keyframeResolver = new w(h, (N, k, j) => this.onKeyframesResolved(N, k, x, !j), y, p, g)),
      (M = this.keyframeResolver) == null || M.scheduleResolve());
  }
  onKeyframesResolved(n, s, r, o) {
    var j, q;
    this.keyframeResolver = void 0;
    const { name: f, type: d, velocity: h, delay: y, isHandoff: p, onUpdate: g } = r;
    this.resolvedAt = Me.now();
    let b = !0;
    rA(n, f, d, h) ||
      ((b = !1),
      (Ca.instantAnimations || !y) && (g == null || g(zo(n, r, s))),
      (n[0] = n[n.length - 1]),
      Bf(r),
      (r.repeat = 0));
    const w = {
        startTime: o
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > hA
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: s,
        ...r,
        keyframes: n,
      },
      M = b && !p && dA(w),
      N = (q = (j = w.motionValue) == null ? void 0 : j.owner) == null ? void 0 : q.current;
    let k;
    if (M)
      try {
        k = new sA({ ...w, element: N });
      } catch {
        k = new mo(w);
      }
    else k = new mo(w);
    (k.finished
      .then(() => {
        this.notifyFinished();
      })
      .catch(rn),
      this.pendingTimeline &&
        ((this.stopTimeline = k.attachTimeline(this.pendingTimeline)), (this.pendingTimeline = void 0)),
      (this._animation = k));
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(n, s) {
    return this.finished.finally(n).then(() => {});
  }
  get animation() {
    var n;
    return (this._animation || ((n = this.keyframeResolver) == null || n.resume(), WT()), this._animation);
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(n) {
    this.animation.time = n;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(n) {
    this.animation.speed = n;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(n) {
    return (
      this._animation ? (this.stopTimeline = this.animation.attachTimeline(n)) : (this.pendingTimeline = n),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var n;
    (this._animation && this.animation.cancel(), (n = this.keyframeResolver) == null || n.cancel());
  }
}
class pA {
  constructor(n) {
    ((this.stop = () => this.runAll("stop")), (this.animations = n.filter(Boolean)));
  }
  get finished() {
    return Promise.all(this.animations.map((n) => n.finished));
  }
  getAll(n) {
    return this.animations[0][n];
  }
  setAll(n, s) {
    for (let r = 0; r < this.animations.length; r++) this.animations[r][n] = s;
  }
  attachTimeline(n) {
    const s = this.animations.map((r) => r.attachTimeline(n));
    return () => {
      s.forEach((r, o) => {
        (r && r(), this.animations[o].stop());
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(n) {
    this.setAll("time", n);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(n) {
    this.setAll("speed", n);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return yg(this.animations, "duration");
  }
  get iterationDuration() {
    return yg(this.animations, "iterationDuration");
  }
  runAll(n) {
    this.animations.forEach((s) => s[n]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function yg(a, n) {
  let s = 0;
  for (let r = 0; r < a.length; r++) {
    const o = a[r][n];
    o !== null && o > s && (s = o);
  }
  return s;
}
class yA extends pA {
  then(n, s) {
    return this.finished.finally(n).then(() => {});
  }
}
function z0(a, n, s, r = 0, o = 1) {
  const f = Array.from(a)
      .sort((p, g) => p.sortNodePosition(g))
      .indexOf(n),
    d = a.size,
    h = (d - 1) * r;
  return typeof s == "function" ? s(f, d) : o === 1 ? f * r : h - f * r;
}
const gg = 30,
  gA = (a) => !isNaN(parseFloat(a)),
  vl = { current: void 0 };
class vA {
  constructor(n, s = {}) {
    ((this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r) => {
        var f;
        const o = Me.now();
        if (
          (this.updatedAt !== o && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev &&
            ((f = this.events.change) == null || f.notify(this.current), this.dependents))
        )
          for (const d of this.dependents) d.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(n),
      (this.owner = s.owner));
  }
  setCurrent(n) {
    ((this.current = n),
      (this.updatedAt = Me.now()),
      this.canTrackVelocity === null && n !== void 0 && (this.canTrackVelocity = gA(this.current)));
  }
  setPrevFrameValue(n = this.current) {
    ((this.prevFrameValue = n), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(n) {
    return this.on("change", n);
  }
  on(n, s) {
    this.events[n] || (this.events[n] = new pd());
    const r = this.events[n].add(s);
    return n === "change"
      ? () => {
          (r(),
            Xt.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : r;
  }
  clearListeners() {
    for (const n in this.events) this.events[n].clear();
  }
  attach(n, s) {
    ((this.passiveEffect = n), (this.stopPassiveEffect = s));
  }
  set(n) {
    this.passiveEffect ? this.passiveEffect(n, this.updateAndNotify) : this.updateAndNotify(n);
  }
  setWithVelocity(n, s, r) {
    (this.set(s), (this.prev = void 0), (this.prevFrameValue = n), (this.prevUpdatedAt = this.updatedAt - r));
  }
  jump(n, s = !0) {
    (this.updateAndNotify(n),
      (this.prev = n),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      s && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  dirty() {
    var n;
    (n = this.events.change) == null || n.notify(this.current);
  }
  addDependent(n) {
    (this.dependents || (this.dependents = new Set()), this.dependents.add(n));
  }
  removeDependent(n) {
    this.dependents && this.dependents.delete(n);
  }
  get() {
    return (vl.current && vl.current.push(this), this.current);
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const n = Me.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || n - this.updatedAt > gg) return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, gg);
    return Pv(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
  }
  start(n) {
    return (
      this.stop(),
      new Promise((s) => {
        ((this.hasAnimated = !0),
          (this.animation = n(s)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    var n, s;
    ((n = this.dependents) == null || n.clear(),
      (s = this.events.destroy) == null || s.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function Da(a, n) {
  return new vA(a, n);
}
function k0(a, n) {
  if (a != null && a.inherit && n) {
    const { inherit: s, ...r } = a;
    return { ...n, ...r };
  }
  return a;
}
function Md(a, n) {
  const s = (a == null ? void 0 : a[n]) ?? (a == null ? void 0 : a.default) ?? a;
  return s !== a ? k0(s, a) : s;
}
const bA = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  xA = (a) => ({ type: "spring", stiffness: 550, damping: a === 0 ? 2 * Math.sqrt(550) : 30, restSpeed: 10 }),
  SA = { type: "keyframes", duration: 0.8 },
  TA = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  AA = (a, { keyframes: n }) =>
    n.length > 2 ? SA : hs.has(a) ? (a.startsWith("scale") ? xA(n[1]) : bA) : TA,
  _A = new Set([
    "when",
    "delay",
    "delayChildren",
    "staggerChildren",
    "staggerDirection",
    "repeat",
    "repeatType",
    "repeatDelay",
    "from",
    "elapsed",
  ]);
function EA(a) {
  for (const n in a) if (!_A.has(n)) return !0;
  return !1;
}
const Cd =
    (a, n, s, r = {}, o, f) =>
    (d) => {
      const h = Md(r, a) || {},
        y = h.delay || r.delay || 0;
      let { elapsed: p = 0 } = r;
      p = p - Ve(y);
      const g = {
        keyframes: Array.isArray(s) ? s : [null, s],
        ease: "easeOut",
        velocity: n.getVelocity(),
        ...h,
        delay: -p,
        onUpdate: (x) => {
          (n.set(x), h.onUpdate && h.onUpdate(x));
        },
        onComplete: () => {
          (d(), h.onComplete && h.onComplete());
        },
        name: a,
        motionValue: n,
        element: f ? void 0 : o,
      };
      (EA(h) || Object.assign(g, AA(a, g)),
        g.duration && (g.duration = Ve(g.duration)),
        g.repeatDelay && (g.repeatDelay = Ve(g.repeatDelay)),
        g.from !== void 0 && (g.keyframes[0] = g.from));
      let b = !1;
      if (
        ((g.type === !1 || (g.duration === 0 && !g.repeatDelay)) && (Bf(g), g.delay === 0 && (b = !0)),
        (Ca.instantAnimations ||
          Ca.skipAnimations ||
          (o != null && o.shouldSkipAnimations) ||
          h.skipAnimations) &&
          ((b = !0), Bf(g), (g.delay = 0)),
        (g.allowFlatten = !h.type && !h.ease),
        b && !f && n.get() !== void 0)
      ) {
        const x = zo(g.keyframes, h);
        if (x !== void 0) {
          Xt.update(() => {
            (g.onUpdate(x), g.onComplete());
          });
          return;
        }
      }
      return h.isSync ? new mo(g) : new mA(g);
    },
  wA = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function MA(a) {
  const n = wA.exec(a);
  if (!n) return [,];
  const [, s, r, o] = n;
  return [`--${s ?? r}`, o];
}
function N0(a, n, s = 1) {
  const [r, o] = MA(a);
  if (!r) return;
  const f = window.getComputedStyle(n).getPropertyValue(r);
  if (f) {
    const d = f.trim();
    return Xv(d) ? parseFloat(d) : d;
  }
  return bd(o) ? N0(o, n, s + 1) : o;
}
function vg(a) {
  const n = [{}, {}];
  return (
    a == null ||
      a.values.forEach((s, r) => {
        ((n[0][r] = s.get()), (n[1][r] = s.getVelocity()));
      }),
    n
  );
}
function Dd(a, n, s, r) {
  if (typeof n == "function") {
    const [o, f] = vg(r);
    n = n(s !== void 0 ? s : a.custom, o, f);
  }
  if ((typeof n == "string" && (n = a.variants && a.variants[n]), typeof n == "function")) {
    const [o, f] = vg(r);
    n = n(s !== void 0 ? s : a.custom, o, f);
  }
  return n;
}
function oi(a, n, s) {
  const r = a.getProps();
  return Dd(r, n, s !== void 0 ? s : r.custom, a);
}
const j0 = new Set(["width", "height", "top", "left", "right", "bottom", ...ds]),
  Lf = (a) => Array.isArray(a);
function CA(a, n, s) {
  a.hasValue(n) ? a.getValue(n).set(s) : a.addValue(n, Da(s));
}
function DA(a) {
  return Lf(a) ? a[a.length - 1] || 0 : a;
}
function RA(a, n) {
  const s = oi(a, n);
  let { transitionEnd: r = {}, transition: o = {}, ...f } = s || {};
  f = { ...f, ...r };
  for (const d in f) {
    const h = DA(f[d]);
    CA(a, d, h);
  }
}
const he = (a) => !!(a && a.getVelocity);
function OA(a) {
  return !!(he(a) && a.add);
}
function Hf(a, n) {
  const s = a.getValue("willChange");
  if (OA(s)) return s.add(n);
  if (!s && Ca.WillChange) {
    const r = new Ca.WillChange("auto");
    (a.addValue("willChange", r), r.add(n));
  }
}
function Rd(a) {
  return a.replace(/([A-Z])/g, (n) => `-${n.toLowerCase()}`);
}
const zA = "framerAppearId",
  V0 = "data-" + Rd(zA);
function U0(a) {
  return a.props[V0];
}
function kA({ protectedKeys: a, needsAnimating: n }, s) {
  const r = a.hasOwnProperty(s) && n[s] !== !0;
  return ((n[s] = !1), r);
}
function Od(a, n, { delay: s = 0, transitionOverride: r, type: o } = {}) {
  let { transition: f, transitionEnd: d, ...h } = n;
  const y = a.getDefaultTransition();
  f = f ? k0(f, y) : y;
  const p = f == null ? void 0 : f.reduceMotion,
    g = f == null ? void 0 : f.skipAnimations;
  r && (f = r);
  const b = [],
    x = o && a.animationState && a.animationState.getState()[o],
    w = f == null ? void 0 : f.path;
  w && w.animateVisualElement(a, h, f, s, b);
  for (const M in h) {
    const N = a.getValue(M, a.latestValues[M] ?? null),
      k = h[M];
    if (k === void 0 || (x && kA(x, M))) continue;
    const j = { delay: s, ...Md(f || {}, M) };
    g && (j.skipAnimations = !0);
    const q = N.get();
    if (q !== void 0 && !N.isAnimating() && !Array.isArray(k) && k === q && !j.velocity) {
      Xt.update(() => N.set(k));
      continue;
    }
    let Z = !1;
    if (window.MotionHandoffAnimation) {
      const ot = U0(a);
      if (ot) {
        const K = window.MotionHandoffAnimation(ot, M, Xt);
        K !== null && ((j.startTime = K), (Z = !0));
      }
    }
    Hf(a, M);
    const G = p ?? a.shouldReduceMotion;
    N.start(Cd(M, N, k, G && j0.has(M) ? { type: !1 } : j, a, Z));
    const $ = N.animation;
    $ && b.push($);
  }
  if (d) {
    const M = () =>
      Xt.update(() => {
        d && RA(a, d);
      });
    b.length ? Promise.all(b).then(M) : M();
  }
  return b;
}
function Zf(a, n, s = {}) {
  var y;
  const r = oi(a, n, s.type === "exit" ? ((y = a.presenceContext) == null ? void 0 : y.custom) : void 0);
  let { transition: o = a.getDefaultTransition() || {} } = r || {};
  s.transitionOverride && (o = s.transitionOverride);
  const f = r ? () => Promise.all(Od(a, r, s)) : () => Promise.resolve(),
    d =
      a.variantChildren && a.variantChildren.size
        ? (p = 0) => {
            const { delayChildren: g = 0, staggerChildren: b, staggerDirection: x } = o;
            return NA(a, n, p, g, b, x, s);
          }
        : () => Promise.resolve(),
    { when: h } = o;
  if (h) {
    const [p, g] = h === "beforeChildren" ? [f, d] : [d, f];
    return p().then(() => g());
  } else return Promise.all([f(), d(s.delay)]);
}
function NA(a, n, s = 0, r = 0, o = 0, f = 1, d) {
  const h = [];
  for (const y of a.variantChildren)
    (y.notify("AnimationStart", n),
      h.push(
        Zf(y, n, {
          ...d,
          delay: s + (typeof r == "function" ? 0 : r) + z0(a.variantChildren, y, r, o, f),
        }).then(() => y.notify("AnimationComplete", n)),
      ));
  return Promise.all(h);
}
function jA(a, n, s = {}) {
  a.notify("AnimationStart", n);
  let r;
  if (Array.isArray(n)) {
    const o = n.map((f) => Zf(a, f, s));
    r = Promise.all(o);
  } else if (typeof n == "string") r = Zf(a, n, s);
  else {
    const o = typeof n == "function" ? oi(a, n, s.custom) : n;
    r = Promise.all(Od(a, o, s));
  }
  return r.then(() => {
    a.notify("AnimationComplete", n);
  });
}
const VA = { test: (a) => a === "auto", parse: (a) => a },
  B0 = (a) => (n) => n.test(a),
  L0 = [fs, st, An, Kn, cT, uT, VA],
  bg = (a) => L0.find(B0(a));
function UA(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || Qv(a) : !0;
}
const BA = new Set(["brightness", "contrast", "saturate", "opacity"]);
function LA(a) {
  const [n, s] = a.slice(0, -1).split("(");
  if (n === "drop-shadow") return a;
  const [r] = s.match(xd) || [];
  if (!r) return a;
  const o = s.replace(r, "");
  let f = BA.has(n) ? 1 : 0;
  return (r !== s && (f *= 100), n + "(" + f + o + ")");
}
const HA = /\b([a-z-]*)\(.*?\)/gu,
  Gf = {
    ...pn,
    getAnimatableNone: (a) => {
      const n = a.match(HA);
      return n ? n.map(LA).join(" ") : a;
    },
  },
  qf = {
    ...pn,
    getAnimatableNone: (a) => {
      const n = pn.parse(a);
      return pn.createTransformer(a)(
        n.map((r) => (typeof r == "number" ? 0 : typeof r == "object" ? { ...r, alpha: 1 } : r)),
      );
    },
  },
  xg = { ...fs, transform: Math.round },
  ZA = {
    rotate: Kn,
    pathRotation: Kn,
    rotateX: Kn,
    rotateY: Kn,
    rotateZ: Kn,
    scale: Wr,
    scaleX: Wr,
    scaleY: Wr,
    scaleZ: Wr,
    skew: Kn,
    skewX: Kn,
    skewY: Kn,
    distance: st,
    translateX: st,
    translateY: st,
    translateZ: st,
    x: st,
    y: st,
    z: st,
    perspective: st,
    transformPerspective: st,
    opacity: Sl,
    originX: sg,
    originY: sg,
    originZ: st,
  },
  po = {
    borderWidth: st,
    borderTopWidth: st,
    borderRightWidth: st,
    borderBottomWidth: st,
    borderLeftWidth: st,
    borderRadius: st,
    borderTopLeftRadius: st,
    borderTopRightRadius: st,
    borderBottomRightRadius: st,
    borderBottomLeftRadius: st,
    width: st,
    maxWidth: st,
    height: st,
    maxHeight: st,
    top: st,
    right: st,
    bottom: st,
    left: st,
    inset: st,
    insetBlock: st,
    insetBlockStart: st,
    insetBlockEnd: st,
    insetInline: st,
    insetInlineStart: st,
    insetInlineEnd: st,
    padding: st,
    paddingTop: st,
    paddingRight: st,
    paddingBottom: st,
    paddingLeft: st,
    paddingBlock: st,
    paddingBlockStart: st,
    paddingBlockEnd: st,
    paddingInline: st,
    paddingInlineStart: st,
    paddingInlineEnd: st,
    margin: st,
    marginTop: st,
    marginRight: st,
    marginBottom: st,
    marginLeft: st,
    marginBlock: st,
    marginBlockStart: st,
    marginBlockEnd: st,
    marginInline: st,
    marginInlineStart: st,
    marginInlineEnd: st,
    fontSize: st,
    backgroundPositionX: st,
    backgroundPositionY: st,
    ...ZA,
    zIndex: xg,
    fillOpacity: Sl,
    strokeOpacity: Sl,
    numOctaves: xg,
  },
  GA = {
    ...po,
    color: ue,
    backgroundColor: ue,
    outlineColor: ue,
    fill: ue,
    stroke: ue,
    borderColor: ue,
    borderTopColor: ue,
    borderRightColor: ue,
    borderBottomColor: ue,
    borderLeftColor: ue,
    filter: Gf,
    WebkitFilter: Gf,
    mask: qf,
    WebkitMask: qf,
  },
  H0 = (a) => GA[a],
  qA = new Set([Gf, qf]);
function Z0(a, n) {
  let s = H0(a);
  return (qA.has(s) || (s = pn), s.getAnimatableNone ? s.getAnimatableNone(n) : void 0);
}
const YA = new Set(["auto", "none", "0"]);
function XA(a, n, s) {
  let r = 0,
    o;
  for (; r < a.length && !o; ) {
    const f = a[r];
    (typeof f == "string" && !YA.has(f) && rs(f).values.length && (o = a[r]), r++);
  }
  if (o && s) for (const f of n) a[f] = Z0(s, o);
}
class KA extends Ed {
  constructor(n, s, r, o, f) {
    super(n, s, r, o, f, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: n, element: s, name: r } = this;
    if (!s || !s.current) return;
    super.readKeyframes();
    for (let g = 0; g < n.length; g++) {
      let b = n[g];
      if (typeof b == "string" && ((b = b.trim()), bd(b))) {
        const x = N0(b, s.current);
        (x !== void 0 && (n[g] = x), g === n.length - 1 && (this.finalKeyframe = b));
      }
    }
    if ((this.resolveNoneKeyframes(), !j0.has(r) || n.length !== 2)) return;
    const [o, f] = n,
      d = bg(o),
      h = bg(f),
      y = ig(o),
      p = ig(f);
    if (y !== p && wa[r]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== h)
      if (hg(d) && hg(h))
        for (let g = 0; g < n.length; g++) {
          const b = n[g];
          typeof b == "string" && (n[g] = parseFloat(b));
        }
      else wa[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: n, name: s } = this,
      r = [];
    for (let o = 0; o < n.length; o++) (n[o] === null || UA(n[o])) && r.push(o);
    r.length && XA(n, r, s);
  }
  measureInitialState() {
    const { element: n, unresolvedKeyframes: s, name: r } = this;
    if (!n || !n.current) return;
    (r === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = wa[r](n.measureViewportBox(), window.getComputedStyle(n.current))),
      (s[0] = this.measuredOrigin));
    const o = s[s.length - 1];
    o !== void 0 && n.getValue(r, o).jump(o, !1);
  }
  measureEndState() {
    var h;
    const { element: n, name: s, unresolvedKeyframes: r } = this;
    if (!n || !n.current) return;
    const o = n.getValue(s);
    o && o.jump(this.measuredOrigin, !1);
    const f = r.length - 1,
      d = r[f];
    ((r[f] = wa[s](n.measureViewportBox(), window.getComputedStyle(n.current))),
      d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d),
      (h = this.removedTransforms) != null &&
        h.length &&
        this.removedTransforms.forEach(([y, p]) => {
          n.getValue(y).set(p);
        }),
      this.resolveNoneKeyframes());
  }
}
const zd = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius",
];
function kd(a, n, s) {
  if (a == null) return [];
  if (a instanceof EventTarget) return [a];
  if (typeof a == "string") {
    let r = document;
    n && (r = n.current);
    const o = (s == null ? void 0 : s[a]) ?? r.querySelectorAll(a);
    return o ? Array.from(o) : [];
  }
  return Array.from(a).filter((r) => r != null);
}
const Yf = (a, n) => (n && typeof a == "number" ? n.transform(a) : a);
function io(a) {
  return Kv(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: Nd } = r0(queueMicrotask, !1),
  mn = { x: !1, y: !1 };
function G0() {
  return mn.x || mn.y;
}
function QA(a) {
  return a === "x" || a === "y"
    ? mn[a]
      ? null
      : ((mn[a] = !0),
        () => {
          mn[a] = !1;
        })
    : mn.x || mn.y
      ? null
      : ((mn.x = mn.y = !0),
        () => {
          mn.x = mn.y = !1;
        });
}
function q0(a, n) {
  const s = kd(a),
    r = new AbortController(),
    o = { passive: !0, ...n, signal: r.signal };
  return [s, o, () => r.abort()];
}
function JA(a) {
  return !(a.pointerType === "touch" || G0());
}
function PA(a, n, s = {}) {
  const [r, o, f] = q0(a, s);
  return (
    r.forEach((d) => {
      let h = !1,
        y = !1,
        p;
      const g = () => {
          d.removeEventListener("pointerleave", M);
        },
        b = (k) => {
          (p && (p(k), (p = void 0)), g());
        },
        x = (k) => {
          ((h = !1),
            window.removeEventListener("pointerup", x),
            window.removeEventListener("pointercancel", x),
            y && ((y = !1), b(k)));
        },
        w = () => {
          ((h = !0),
            window.addEventListener("pointerup", x, o),
            window.addEventListener("pointercancel", x, o));
        },
        M = (k) => {
          if (k.pointerType !== "touch") {
            if (h) {
              y = !0;
              return;
            }
            b(k);
          }
        },
        N = (k) => {
          if (!JA(k)) return;
          y = !1;
          const j = n(d, k);
          typeof j == "function" && ((p = j), d.addEventListener("pointerleave", M, o));
        };
      (d.addEventListener("pointerenter", N, o), d.addEventListener("pointerdown", w, o));
    }),
    f
  );
}
const Y0 = (a, n) => (n ? (a === n ? !0 : Y0(a, n.parentElement)) : !1),
  jd = (a) => (a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1),
  FA = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function WA(a) {
  return FA.has(a.tagName) || a.isContentEditable === !0;
}
const $A = new Set(["INPUT", "SELECT", "TEXTAREA"]);
function IA(a) {
  return $A.has(a.tagName) || a.isContentEditable === !0;
}
const so = new WeakSet();
function Sg(a) {
  return (n) => {
    n.key === "Enter" && a(n);
  };
}
function hf(a, n) {
  a.dispatchEvent(new PointerEvent("pointer" + n, { isPrimary: !0, bubbles: !0 }));
}
const t_ = (a, n) => {
  const s = a.currentTarget;
  if (!s) return;
  const r = Sg(() => {
    if (so.has(s)) return;
    hf(s, "down");
    const o = Sg(() => {
        hf(s, "up");
      }),
      f = () => hf(s, "cancel");
    (s.addEventListener("keyup", o, n), s.addEventListener("blur", f, n));
  });
  (s.addEventListener("keydown", r, n),
    s.addEventListener("blur", () => s.removeEventListener("keydown", r), n));
};
function Tg(a) {
  return jd(a) && !G0();
}
const Ag = new WeakSet();
function e_(a, n, s = {}) {
  const [r, o, f] = q0(a, s),
    d = (h) => {
      const y = h.currentTarget;
      if (!Tg(h) || Ag.has(h)) return;
      (so.add(y), s.stopPropagation && Ag.add(h));
      const p = n(y, h),
        g = { ...o, capture: !0 },
        b = (M, N) => {
          (window.removeEventListener("pointerup", x, g),
            window.removeEventListener("pointercancel", w, g),
            so.has(y) && so.delete(y),
            Tg(M) && typeof p == "function" && p(M, { success: N }));
        },
        x = (M) => {
          b(M, y === window || y === document || s.useGlobalTarget || Y0(y, M.target));
        },
        w = (M) => {
          b(M, !1);
        };
      (window.addEventListener("pointerup", x, g), window.addEventListener("pointercancel", w, g));
    };
  return (
    r.forEach((h) => {
      ((s.useGlobalTarget ? window : h).addEventListener("pointerdown", d, o),
        io(h) &&
          (h.addEventListener("focus", (p) => t_(p, o)),
          !WA(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0)));
    }),
    f
  );
}
function ko(a) {
  return Kv(a) && "ownerSVGElement" in a;
}
const lo = new WeakMap();
let _a;
const X0 = (a, n, s) => (r, o) =>
    o && o[0] ? o[0][a + "Size"] : ko(r) && "getBBox" in r ? r.getBBox()[n] : r[s],
  n_ = X0("inline", "width", "offsetWidth"),
  a_ = X0("block", "height", "offsetHeight");
function i_({ target: a, borderBoxSize: n }) {
  var s;
  (s = lo.get(a)) == null ||
    s.forEach((r) => {
      r(a, {
        get width() {
          return n_(a, n);
        },
        get height() {
          return a_(a, n);
        },
      });
    });
}
function s_(a) {
  a.forEach(i_);
}
function l_() {
  typeof ResizeObserver > "u" || (_a = new ResizeObserver(s_));
}
function r_(a, n) {
  _a || l_();
  const s = kd(a);
  return (
    s.forEach((r) => {
      let o = lo.get(r);
      (o || ((o = new Set()), lo.set(r, o)), o.add(n), _a == null || _a.observe(r));
    }),
    () => {
      s.forEach((r) => {
        const o = lo.get(r);
        (o == null || o.delete(n), (o != null && o.size) || _a == null || _a.unobserve(r));
      });
    }
  );
}
const ro = new Set();
let ns;
function o_() {
  ((ns = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      },
    };
    ro.forEach((n) => n(a));
  }),
    window.addEventListener("resize", ns));
}
function u_(a) {
  return (
    ro.add(a),
    ns || o_(),
    () => {
      (ro.delete(a),
        !ro.size && typeof ns == "function" && (window.removeEventListener("resize", ns), (ns = void 0)));
    }
  );
}
function _g(a, n) {
  return typeof a == "function" ? u_(a) : r_(a, n);
}
function K0(a) {
  return ko(a) && a.tagName === "svg";
}
function c_(...a) {
  const n = !Array.isArray(a[0]),
    s = n ? 0 : -1,
    r = a[0 + s],
    o = a[1 + s],
    f = a[2 + s],
    d = a[3 + s],
    h = b0(o, f, d);
  return n ? h(r) : h;
}
const f_ = [...L0, ue, pn],
  d_ = (a) => f_.find(B0(a)),
  Eg = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  as = () => ({ x: Eg(), y: Eg() }),
  wg = () => ({ min: 0, max: 0 }),
  oe = () => ({ x: wg(), y: wg() }),
  Al = new WeakMap();
function No(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function _l(a) {
  return typeof a == "string" || Array.isArray(a);
}
const Vd = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
  Ud = ["initial", ...Vd];
function jo(a) {
  return No(a.animate) || Ud.some((n) => _l(a[n]));
}
function Q0(a) {
  return !!(jo(a) || a.variants);
}
function h_(a, n, s) {
  for (const r in n) {
    const o = n[r],
      f = s[r];
    if (he(o)) a.addValue(r, o);
    else if (he(f)) a.addValue(r, Da(o, { owner: a }));
    else if (f !== o)
      if (a.hasValue(r)) {
        const d = a.getValue(r);
        d.liveStyle === !0 ? d.jump(o) : d.hasAnimated || d.set(o);
      } else {
        const d = a.getStaticValue(r);
        a.addValue(r, Da(d !== void 0 ? d : o, { owner: a }));
      }
  }
  for (const r in s) n[r] === void 0 && a.removeValue(r);
  return n;
}
const Xf = { current: null },
  J0 = { current: !1 },
  m_ = typeof window < "u";
function p_() {
  if (((J0.current = !0), !!m_))
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"),
        n = () => (Xf.current = a.matches);
      (a.addEventListener("change", n), n());
    } else Xf.current = !1;
}
const Mg = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
let yo = {};
function P0(a) {
  yo = a;
}
function y_() {
  return yo;
}
class F0 {
  scrapeMotionValuesFromProps(n, s, r) {
    return {};
  }
  constructor(
    {
      parent: n,
      props: s,
      presenceContext: r,
      reducedMotionConfig: o,
      skipAnimations: f,
      blockInitialAnimation: d,
      visualState: h,
    },
    y = {},
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.shouldSkipAnimations = !1),
      (this.values = new Map()),
      (this.KeyframeResolver = Ed),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.hasBeenMounted = !1),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const w = Me.now();
        this.renderScheduledAt < w && ((this.renderScheduledAt = w), Xt.render(this.render, !1, !0));
      }));
    const { latestValues: p, renderState: g } = h;
    ((this.latestValues = p),
      (this.baseTarget = { ...p }),
      (this.initialValues = s.initial ? { ...p } : {}),
      (this.renderState = g),
      (this.parent = n),
      (this.props = s),
      (this.presenceContext = r),
      (this.depth = n ? n.depth + 1 : 0),
      (this.reducedMotionConfig = o),
      (this.skipAnimationsConfig = f),
      (this.options = y),
      (this.blockInitialAnimation = !!d),
      (this.isControllingVariants = jo(s)),
      (this.isVariantNode = Q0(s)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(n && n.current)));
    const { willChange: b, ...x } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const w in x) {
      const M = x[w];
      p[w] !== void 0 && he(M) && M.set(p[w]);
    }
  }
  mount(n) {
    var s, r;
    if (this.hasBeenMounted)
      for (const o in this.initialValues)
        ((s = this.values.get(o)) == null || s.jump(this.initialValues[o]),
          (this.latestValues[o] = this.initialValues[o]));
    ((this.current = n),
      Al.set(n, this),
      this.projection && !this.projection.instance && this.projection.mount(n),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((o, f) => this.bindToMotionValue(f, o)),
      this.reducedMotionConfig === "never"
        ? (this.shouldReduceMotion = !1)
        : this.reducedMotionConfig === "always"
          ? (this.shouldReduceMotion = !0)
          : (J0.current || p_(), (this.shouldReduceMotion = Xf.current)),
      (this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
      (r = this.parent) == null || r.addChild(this),
      this.update(this.props, this.presenceContext),
      (this.hasBeenMounted = !0));
  }
  unmount() {
    var n;
    (this.projection && this.projection.unmount(),
      Pn(this.notifyUpdate),
      Pn(this.render),
      this.valueSubscriptions.forEach((s) => s()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      (n = this.parent) == null || n.removeChild(this));
    for (const s in this.events) this.events[s].clear();
    for (const s in this.features) {
      const r = this.features[s];
      r && (r.unmount(), (r.isMounted = !1));
    }
    this.current = null;
  }
  addChild(n) {
    (this.children.add(n),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(n));
  }
  removeChild(n) {
    (this.children.delete(n), this.enteringChildren && this.enteringChildren.delete(n));
  }
  bindToMotionValue(n, s) {
    if (
      (this.valueSubscriptions.has(n) && this.valueSubscriptions.get(n)(),
      s.accelerate && O0.has(n) && this.current instanceof HTMLElement)
    ) {
      const { factory: d, keyframes: h, times: y, ease: p, duration: g } = s.accelerate,
        b = new D0({ element: this.current, name: n, keyframes: h, times: y, ease: p, duration: Ve(g) }),
        x = d(b);
      this.valueSubscriptions.set(n, () => {
        (x(), b.cancel());
      });
      return;
    }
    const r = hs.has(n);
    r && this.onBindTransform && this.onBindTransform();
    const o = s.on("change", (d) => {
      ((this.latestValues[n] = d),
        this.props.onUpdate && Xt.preRender(this.notifyUpdate),
        r && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender());
    });
    let f;
    (typeof window < "u" && window.MotionCheckAppearSync && (f = window.MotionCheckAppearSync(this, n, s)),
      this.valueSubscriptions.set(n, () => {
        (o(), f && f());
      }));
  }
  sortNodePosition(n) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== n.type
      ? 0
      : this.sortInstanceNodePosition(this.current, n.current);
  }
  updateFeatures() {
    let n = "animation";
    for (n in yo) {
      const s = yo[n];
      if (!s) continue;
      const { isEnabled: r, Feature: o } = s;
      if ((!this.features[n] && o && r(this.props) && (this.features[n] = new o(this)), this.features[n])) {
        const f = this.features[n];
        f.isMounted ? f.update() : (f.mount(), (f.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : oe();
  }
  getStaticValue(n) {
    return this.latestValues[n];
  }
  setStaticValue(n, s) {
    this.latestValues[n] = s;
  }
  update(n, s) {
    ((n.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = n),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = s));
    for (let r = 0; r < Mg.length; r++) {
      const o = Mg[r];
      this.propEventSubscriptions[o] &&
        (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const f = "on" + o,
        d = n[f];
      d && (this.propEventSubscriptions[o] = this.on(o, d));
    }
    ((this.prevMotionValues = h_(
      this,
      this.scrapeMotionValuesFromProps(n, this.prevProps || {}, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue());
  }
  getProps() {
    return this.props;
  }
  getVariant(n) {
    return this.props.variants ? this.props.variants[n] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  addVariantChild(n) {
    const s = this.getClosestVariantNode();
    if (s) return (s.variantChildren && s.variantChildren.add(n), () => s.variantChildren.delete(n));
  }
  addValue(n, s) {
    const r = this.values.get(n);
    s !== r &&
      (r && this.removeValue(n),
      this.bindToMotionValue(n, s),
      this.values.set(n, s),
      (this.latestValues[n] = s.get()));
  }
  removeValue(n) {
    this.values.delete(n);
    const s = this.valueSubscriptions.get(n);
    (s && (s(), this.valueSubscriptions.delete(n)),
      delete this.latestValues[n],
      this.removeValueFromRenderState(n, this.renderState));
  }
  hasValue(n) {
    return this.values.has(n);
  }
  getValue(n, s) {
    if (this.props.values && this.props.values[n]) return this.props.values[n];
    let r = this.values.get(n);
    return (
      r === void 0 &&
        s !== void 0 &&
        ((r = Da(s === null ? void 0 : s, { owner: this })), this.addValue(n, r)),
      r
    );
  }
  readValue(n, s) {
    let r =
      this.latestValues[n] !== void 0 || !this.current
        ? this.latestValues[n]
        : (this.getBaseTargetFromProps(this.props, n) ??
          this.readValueFromInstance(this.current, n, this.options));
    return (
      r != null &&
        (typeof r == "string" && (Xv(r) || Qv(r))
          ? (r = parseFloat(r))
          : !d_(r) && pn.test(s) && (r = Z0(n, s)),
        this.setBaseTarget(n, he(r) ? r.get() : r)),
      he(r) ? r.get() : r
    );
  }
  setBaseTarget(n, s) {
    this.baseTarget[n] = s;
  }
  getBaseTarget(n) {
    var f;
    const { initial: s } = this.props;
    let r;
    if (typeof s == "string" || typeof s == "object") {
      const d = Dd(this.props, s, (f = this.presenceContext) == null ? void 0 : f.custom);
      d && (r = d[n]);
    }
    if (s && r !== void 0) return r;
    const o = this.getBaseTargetFromProps(this.props, n);
    return o !== void 0 && !he(o)
      ? o
      : this.initialValues[n] !== void 0 && r === void 0
        ? void 0
        : this.baseTarget[n];
  }
  on(n, s) {
    return (this.events[n] || (this.events[n] = new pd()), this.events[n].add(s));
  }
  notify(n, ...s) {
    this.events[n] && this.events[n].notify(...s);
  }
  scheduleRenderMicrotask() {
    Nd.render(this.render);
  }
}
class W0 extends F0 {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = KA));
  }
  sortInstanceNodePosition(n, s) {
    return n.compareDocumentPosition(s) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(n, s) {
    const r = n.style;
    return r ? r[s] : void 0;
  }
  removeValueFromRenderState(n, { vars: s, style: r }) {
    (delete s[n], delete r[n]);
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: n } = this.props;
    he(n) &&
      (this.childSubscription = n.on("change", (s) => {
        this.current && (this.current.textContent = `${s}`);
      }));
  }
}
class za {
  constructor(n) {
    ((this.isMounted = !1), (this.node = n));
  }
  update() {}
}
function $0({ top: a, left: n, right: s, bottom: r }) {
  return { x: { min: n, max: s }, y: { min: a, max: r } };
}
function g_({ x: a, y: n }) {
  return { top: n.min, right: a.max, bottom: n.max, left: a.min };
}
function v_(a, n) {
  if (!n) return a;
  const s = n({ x: a.left, y: a.top }),
    r = n({ x: a.right, y: a.bottom });
  return { top: s.y, left: s.x, bottom: r.y, right: r.x };
}
function mf(a) {
  return a === void 0 || a === 1;
}
function Kf({ scale: a, scaleX: n, scaleY: s }) {
  return !mf(a) || !mf(n) || !mf(s);
}
function ai(a) {
  return Kf(a) || I0(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function I0(a) {
  return Cg(a.x) || Cg(a.y);
}
function Cg(a) {
  return a && a !== "0%";
}
function go(a, n, s) {
  const r = a - s,
    o = n * r;
  return s + o;
}
function Dg(a, n, s, r, o) {
  return (o !== void 0 && (a = go(a, o, r)), go(a, s, r) + n);
}
function Qf(a, n = 0, s = 1, r, o) {
  ((a.min = Dg(a.min, n, s, r, o)), (a.max = Dg(a.max, n, s, r, o)));
}
function tb(a, { x: n, y: s }) {
  (Qf(a.x, n.translate, n.scale, n.originPoint), Qf(a.y, s.translate, s.scale, s.originPoint));
}
const Rg = 0.999999999999,
  Og = 1.0000000000001;
function b_(a, n, s, r = !1) {
  var h;
  const o = s.length;
  if (!o) return;
  n.x = n.y = 1;
  let f, d;
  for (let y = 0; y < o; y++) {
    ((f = s[y]), (d = f.projectionDelta));
    const { visualElement: p } = f.options;
    (p && p.props.style && p.props.style.display === "contents") ||
      (r &&
        f.options.layoutScroll &&
        f.scroll &&
        f !== f.root &&
        (Tn(a.x, -f.scroll.offset.x), Tn(a.y, -f.scroll.offset.y)),
      d && ((n.x *= d.x.scale), (n.y *= d.y.scale), tb(a, d)),
      r && ai(f.latestValues) && oo(a, f.latestValues, (h = f.layout) == null ? void 0 : h.layoutBox));
  }
  (n.x < Og && n.x > Rg && (n.x = 1), n.y < Og && n.y > Rg && (n.y = 1));
}
function Tn(a, n) {
  ((a.min += n), (a.max += n));
}
function zg(a, n, s, r, o = 0.5) {
  const f = Yt(a.min, a.max, o);
  Qf(a, n, s, f, r);
}
function kg(a, n) {
  return typeof a == "string" ? (parseFloat(a) / 100) * (n.max - n.min) : a;
}
function oo(a, n, s) {
  const r = s ?? a;
  (zg(a.x, kg(n.x, r.x), n.scaleX, n.scale, n.originX), zg(a.y, kg(n.y, r.y), n.scaleY, n.scale, n.originY));
}
function eb(a, n) {
  return $0(v_(a.getBoundingClientRect(), n));
}
function x_(a, n, s) {
  const r = eb(a, s),
    { scroll: o } = n;
  return (o && (Tn(r.x, o.offset.x), Tn(r.y, o.offset.y)), r);
}
const S_ = { x: "translateX", y: "translateY", z: "translateZ", transformPerspective: "perspective" },
  T_ = ds.length;
function A_(a, n, s) {
  let r = "",
    o = !0;
  for (let d = 0; d < T_; d++) {
    const h = ds[d],
      y = a[h];
    if (y === void 0) continue;
    let p = !0;
    if (typeof y == "number") p = y === (h.startsWith("scale") ? 1 : 0);
    else {
      const g = parseFloat(y);
      p = h.startsWith("scale") ? g === 1 : g === 0;
    }
    if (!p || s) {
      const g = Yf(y, po[h]);
      if (!p) {
        o = !1;
        const b = S_[h] || h;
        r += `${b}(${g}) `;
      }
      s && (n[h] = g);
    }
  }
  const f = a.pathRotation;
  return (
    f && ((o = !1), (r += `rotate(${Yf(f, po.pathRotation)}) `)),
    (r = r.trim()),
    s ? (r = s(n, o ? "" : r)) : o && (r = "none"),
    r
  );
}
function Bd(a, n, s) {
  const { style: r, vars: o, transformOrigin: f } = a;
  let d = !1,
    h = !1;
  for (const y in n) {
    const p = n[y];
    if (hs.has(y)) {
      d = !0;
      continue;
    } else if (u0(y)) {
      o[y] = p;
      continue;
    } else {
      const g = Yf(p, po[y]);
      y.startsWith("origin") ? ((h = !0), (f[y] = g)) : (r[y] = g);
    }
  }
  if (
    (n.transform || (d || s ? (r.transform = A_(n, a.transform, s)) : r.transform && (r.transform = "none")),
    h)
  ) {
    const { originX: y = "50%", originY: p = "50%", originZ: g = 0 } = f;
    r.transformOrigin = `${y} ${p} ${g}`;
  }
}
function nb(a, { style: n, vars: s }, r, o) {
  const f = a.style;
  let d;
  for (d in n) f[d] = n[d];
  o == null || o.applyProjectionStyles(f, r);
  for (d in s) f.setProperty(d, s[d]);
}
function Ng(a, n) {
  return n.max === n.min ? 0 : (a / (n.max - n.min)) * 100;
}
const cl = {
    correct: (a, n) => {
      if (!n.target) return a;
      if (typeof a == "string")
        if (st.test(a)) a = parseFloat(a);
        else return a;
      const s = Ng(a, n.target.x),
        r = Ng(a, n.target.y);
      return `${s}% ${r}%`;
    },
  },
  __ = {
    correct: (a, { treeScale: n, projectionDelta: s }) => {
      const r = a,
        o = pn.parse(a);
      if (o.length > 5) return r;
      const f = pn.createTransformer(a),
        d = typeof o[0] != "number" ? 1 : 0,
        h = s.x.scale * n.x,
        y = s.y.scale * n.y;
      ((o[0 + d] /= h), (o[1 + d] /= y));
      const p = Yt(h, y, 0.5);
      return (
        typeof o[2 + d] == "number" && (o[2 + d] /= p),
        typeof o[3 + d] == "number" && (o[3 + d] /= p),
        f(o)
      );
    },
  },
  Jf = {
    borderRadius: { ...cl, applyTo: [...zd] },
    borderTopLeftRadius: cl,
    borderTopRightRadius: cl,
    borderBottomLeftRadius: cl,
    borderBottomRightRadius: cl,
    boxShadow: __,
  };
function ab(a, { layout: n, layoutId: s }) {
  return hs.has(a) || a.startsWith("origin") || ((n || s !== void 0) && (!!Jf[a] || a === "opacity"));
}
function Ld(a, n, s) {
  var d;
  const r = a.style,
    o = n == null ? void 0 : n.style,
    f = {};
  if (!r) return f;
  for (const h in r)
    (he(r[h]) ||
      (o && he(o[h])) ||
      ab(h, a) ||
      ((d = s == null ? void 0 : s.getValue(h)) == null ? void 0 : d.liveStyle) !== void 0) &&
      (f[h] = r[h]);
  return f;
}
function E_(a) {
  return window.getComputedStyle(a);
}
class ib extends W0 {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = nb));
  }
  readValueFromInstance(n, s) {
    var r;
    if (hs.has(s)) return (r = this.projection) != null && r.isProjecting ? kf(s) : KT(n, s);
    {
      const o = E_(n),
        f = (u0(s) ? o.getPropertyValue(s) : o[s]) || 0;
      return typeof f == "string" ? f.trim() : f;
    }
  }
  measureInstanceViewportBox(n, { transformPagePoint: s }) {
    return eb(n, s);
  }
  build(n, s, r) {
    Bd(n, s, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(n, s, r) {
    return Ld(n, s, r);
  }
}
function w_(a, n) {
  return a in n;
}
class M_ extends F0 {
  constructor() {
    (super(...arguments), (this.type = "object"));
  }
  readValueFromInstance(n, s) {
    if (w_(s, n)) {
      const r = n[s];
      if (typeof r == "string" || typeof r == "number") return r;
    }
  }
  getBaseTargetFromProps() {}
  removeValueFromRenderState(n, s) {
    delete s.output[n];
  }
  measureInstanceViewportBox() {
    return oe();
  }
  build(n, s) {
    Object.assign(n.output, s);
  }
  renderInstance(n, { output: s }) {
    Object.assign(n, s);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const C_ = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  D_ = { offset: "strokeDashoffset", array: "strokeDasharray" };
function R_(a, n, s = 1, r = 0, o = !0) {
  a.pathLength = 1;
  const f = o ? C_ : D_;
  ((a[f.offset] = `${-r}`), (a[f.array] = `${n} ${s}`));
}
const O_ = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
function sb(
  a,
  { attrX: n, attrY: s, attrScale: r, pathLength: o, pathSpacing: f = 1, pathOffset: d = 0, ...h },
  y,
  p,
  g,
) {
  if ((Bd(a, h, p), y)) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  ((a.attrs = a.style), (a.style = {}));
  const { attrs: b, style: x } = a;
  (b.transform && ((x.transform = b.transform), delete b.transform),
    (x.transform || b.transformOrigin) &&
      ((x.transformOrigin = b.transformOrigin ?? "50% 50%"), delete b.transformOrigin),
    x.transform &&
      ((x.transformBox = (g == null ? void 0 : g.transformBox) ?? "fill-box"), delete b.transformBox));
  for (const w of O_) b[w] !== void 0 && ((x[w] = b[w]), delete b[w]);
  (n !== void 0 && (b.x = n),
    s !== void 0 && (b.y = s),
    r !== void 0 && (b.scale = r),
    o !== void 0 && R_(b, o, f, d, !1));
}
const lb = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust",
  ]),
  rb = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function z_(a, n, s, r) {
  nb(a, n, void 0, r);
  for (const o in n.attrs) a.setAttribute(lb.has(o) ? o : Rd(o), n.attrs[o]);
}
function ob(a, n, s) {
  const r = Ld(a, n, s);
  for (const o in a)
    if (he(a[o]) || he(n[o])) {
      const f = ds.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      r[f] = a[o];
    }
  return r;
}
class ub extends W0 {
  constructor() {
    (super(...arguments), (this.type = "svg"), (this.isSVGTag = !1), (this.measureInstanceViewportBox = oe));
  }
  getBaseTargetFromProps(n, s) {
    return n[s];
  }
  readValueFromInstance(n, s) {
    if (hs.has(s)) {
      const r = H0(s);
      return (r && r.default) || 0;
    }
    return ((s = lb.has(s) ? s : Rd(s)), n.getAttribute(s));
  }
  scrapeMotionValuesFromProps(n, s, r) {
    return ob(n, s, r);
  }
  build(n, s, r) {
    sb(n, s, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(n, s, r, o) {
    z_(n, s, r, o);
  }
  mount(n) {
    ((this.isSVGTag = rb(n.tagName)), super.mount(n));
  }
}
const k_ = Ud.length;
function cb(a) {
  if (!a) return;
  if (!a.isControllingVariants) {
    const s = a.parent ? cb(a.parent) || {} : {};
    return (a.props.initial !== void 0 && (s.initial = a.props.initial), s);
  }
  const n = {};
  for (let s = 0; s < k_; s++) {
    const r = Ud[s],
      o = a.props[r];
    (_l(o) || o === !1) && (n[r] = o);
  }
  return n;
}
function fb(a, n) {
  if (!Array.isArray(n)) return !1;
  const s = n.length;
  if (s !== a.length) return !1;
  for (let r = 0; r < s; r++) if (n[r] !== a[r]) return !1;
  return !0;
}
const N_ = [...Vd].reverse(),
  j_ = Vd.length;
function V_(a) {
  return (n) => Promise.all(n.map(({ animation: s, options: r }) => jA(a, s, r)));
}
function U_(a) {
  let n = V_(a),
    s = jg(),
    r = !0,
    o = !1;
  const f = (p) => (g, b) => {
    var w;
    const x = oi(a, b, p === "exit" ? ((w = a.presenceContext) == null ? void 0 : w.custom) : void 0);
    if (x) {
      const { transition: M, transitionEnd: N, ...k } = x;
      g = { ...g, ...k, ...N };
    }
    return g;
  };
  function d(p) {
    n = p(a);
  }
  function h(p) {
    const { props: g } = a,
      b = cb(a.parent) || {},
      x = [],
      w = new Set();
    let M = {},
      N = 1 / 0;
    for (let j = 0; j < j_; j++) {
      const q = N_[j],
        Z = s[q],
        G = g[q] !== void 0 ? g[q] : b[q],
        $ = _l(G),
        ot = q === p ? Z.isActive : null;
      ot === !1 && (N = j);
      let K = G === b[q] && G !== g[q] && $;
      if (
        (K && (r || o) && a.manuallyAnimateOnMount && (K = !1),
        (Z.protectedKeys = { ...M }),
        (!Z.isActive && ot === null) || (!G && !Z.prevProp) || No(G) || typeof G == "boolean")
      )
        continue;
      if (q === "exit" && Z.isActive && ot !== !0) {
        Z.prevResolvedValues && (M = { ...M, ...Z.prevResolvedValues });
        continue;
      }
      const V = B_(Z.prevProp, G);
      let J = V || (q === p && Z.isActive && !K && $) || (j > N && $),
        et = !1;
      const mt = Array.isArray(G) ? G : [G];
      let St = mt.reduce(f(q), {});
      ot === !1 && (St = {});
      const { prevResolvedValues: Qt = {} } = Z,
        Ht = { ...Qt, ...St },
        Vt = (P) => {
          ((J = !0), w.has(P) && ((et = !0), w.delete(P)), (Z.needsAnimating[P] = !0));
          const pt = a.getValue(P);
          pt && (pt.liveStyle = !1);
        };
      for (const P in Ht) {
        const pt = St[P],
          Q = Qt[P];
        if (M.hasOwnProperty(P)) continue;
        let T = !1;
        (Lf(pt) && Lf(Q) ? (T = !fb(pt, Q) || V) : (T = pt !== Q),
          T
            ? pt != null
              ? Vt(P)
              : w.add(P)
            : pt !== void 0 && w.has(P)
              ? Vt(P)
              : (Z.protectedKeys[P] = !0));
      }
      ((Z.prevProp = G),
        (Z.prevResolvedValues = St),
        Z.isActive && (M = { ...M, ...St }),
        (r || o) && a.blockInitialAnimation && (J = !1));
      const O = K && V;
      J &&
        (!O || et) &&
        x.push(
          ...mt.map((P) => {
            const pt = { type: q };
            if (typeof P == "string" && (r || o) && !O && a.manuallyAnimateOnMount && a.parent) {
              const { parent: Q } = a,
                T = oi(Q, P);
              if (Q.enteringChildren && T) {
                const { delayChildren: B } = T.transition || {};
                pt.delay = z0(Q.enteringChildren, a, B);
              }
            }
            return { animation: P, options: pt };
          }),
        );
    }
    if (w.size) {
      const j = {};
      if (typeof g.initial != "boolean") {
        const q = oi(a, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        q && q.transition && (j.transition = q.transition);
      }
      (w.forEach((q) => {
        const Z = a.getBaseTarget(q),
          G = a.getValue(q);
        (G && (G.liveStyle = !0), (j[q] = Z ?? null));
      }),
        x.push({ animation: j }));
    }
    let k = !!x.length;
    return (
      r && (g.initial === !1 || g.initial === g.animate) && !a.manuallyAnimateOnMount && (k = !1),
      (r = !1),
      (o = !1),
      k ? n(x) : Promise.resolve()
    );
  }
  function y(p, g) {
    var x;
    if (s[p].isActive === g) return Promise.resolve();
    ((x = a.variantChildren) == null ||
      x.forEach((w) => {
        var M;
        return (M = w.animationState) == null ? void 0 : M.setActive(p, g);
      }),
      (s[p].isActive = g));
    const b = h(p);
    for (const w in s) s[w].protectedKeys = {};
    return b;
  }
  return {
    animateChanges: h,
    setActive: y,
    setAnimateFunction: d,
    getState: () => s,
    reset: () => {
      ((s = jg()), (o = !0));
    },
  };
}
function B_(a, n) {
  return typeof n == "string" ? n !== a : Array.isArray(n) ? !fb(n, a) : !1;
}
function ti(a = !1) {
  return { isActive: a, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function jg() {
  return {
    animate: ti(!0),
    whileInView: ti(),
    whileHover: ti(),
    whileTap: ti(),
    whileDrag: ti(),
    whileFocus: ti(),
    exit: ti(),
  };
}
function Pf(a, n) {
  ((a.min = n.min), (a.max = n.max));
}
function hn(a, n) {
  (Pf(a.x, n.x), Pf(a.y, n.y));
}
function Vg(a, n) {
  ((a.translate = n.translate), (a.scale = n.scale), (a.originPoint = n.originPoint), (a.origin = n.origin));
}
const db = 1e-4,
  L_ = 1 - db,
  H_ = 1 + db,
  hb = 0.01,
  Z_ = 0 - hb,
  G_ = 0 + hb;
function Ce(a) {
  return a.max - a.min;
}
function q_(a, n, s) {
  return Math.abs(a - n) <= s;
}
function Ug(a, n, s, r = 0.5) {
  ((a.origin = r),
    (a.originPoint = Yt(n.min, n.max, a.origin)),
    (a.scale = Ce(s) / Ce(n)),
    (a.translate = Yt(s.min, s.max, a.origin) - a.originPoint),
    ((a.scale >= L_ && a.scale <= H_) || isNaN(a.scale)) && (a.scale = 1),
    ((a.translate >= Z_ && a.translate <= G_) || isNaN(a.translate)) && (a.translate = 0));
}
function bl(a, n, s, r) {
  (Ug(a.x, n.x, s.x, r ? r.originX : void 0), Ug(a.y, n.y, s.y, r ? r.originY : void 0));
}
function Bg(a, n, s, r = 0) {
  const o = r ? Yt(s.min, s.max, r) : s.min;
  ((a.min = o + n.min), (a.max = a.min + Ce(n)));
}
function Y_(a, n, s, r) {
  (Bg(a.x, n.x, s.x, r == null ? void 0 : r.x), Bg(a.y, n.y, s.y, r == null ? void 0 : r.y));
}
function Lg(a, n, s, r = 0) {
  const o = r ? Yt(s.min, s.max, r) : s.min;
  ((a.min = n.min - o), (a.max = a.min + Ce(n)));
}
function vo(a, n, s, r) {
  (Lg(a.x, n.x, s.x, r == null ? void 0 : r.x), Lg(a.y, n.y, s.y, r == null ? void 0 : r.y));
}
function Hg(a, n, s, r, o) {
  return ((a -= n), (a = go(a, 1 / s, r)), o !== void 0 && (a = go(a, 1 / o, r)), a);
}
function X_(a, n = 0, s = 1, r = 0.5, o, f = a, d = a) {
  if ((An.test(n) && ((n = parseFloat(n)), (n = Yt(d.min, d.max, n / 100) - d.min)), typeof n != "number"))
    return;
  let h = Yt(f.min, f.max, r);
  (a === f && (h -= n), (a.min = Hg(a.min, n, s, h, o)), (a.max = Hg(a.max, n, s, h, o)));
}
function Zg(a, n, [s, r, o], f, d) {
  X_(a, n[s], n[r], n[o], n.scale, f, d);
}
const K_ = ["x", "scaleX", "originX"],
  Q_ = ["y", "scaleY", "originY"];
function Gg(a, n, s, r) {
  (Zg(a.x, n, K_, s ? s.x : void 0, r ? r.x : void 0), Zg(a.y, n, Q_, s ? s.y : void 0, r ? r.y : void 0));
}
function qg(a) {
  return a.translate === 0 && a.scale === 1;
}
function mb(a) {
  return qg(a.x) && qg(a.y);
}
function Yg(a, n) {
  return a.min === n.min && a.max === n.max;
}
function J_(a, n) {
  return Yg(a.x, n.x) && Yg(a.y, n.y);
}
function Xg(a, n) {
  return Math.round(a.min) === Math.round(n.min) && Math.round(a.max) === Math.round(n.max);
}
function pb(a, n) {
  return Xg(a.x, n.x) && Xg(a.y, n.y);
}
function Kg(a) {
  return Ce(a.x) / Ce(a.y);
}
function Qg(a, n) {
  return a.translate === n.translate && a.scale === n.scale && a.originPoint === n.originPoint;
}
function Sn(a) {
  return [a("x"), a("y")];
}
function P_(a, n, s) {
  let r = "";
  const o = a.x.translate / n.x,
    f = a.y.translate / n.y,
    d = (s == null ? void 0 : s.z) || 0;
  if (
    ((o || f || d) && (r = `translate3d(${o}px, ${f}px, ${d}px) `),
    (n.x !== 1 || n.y !== 1) && (r += `scale(${1 / n.x}, ${1 / n.y}) `),
    s)
  ) {
    const {
      transformPerspective: p,
      rotate: g,
      pathRotation: b,
      rotateX: x,
      rotateY: w,
      skewX: M,
      skewY: N,
    } = s;
    (p && (r = `perspective(${p}px) ${r}`),
      g && (r += `rotate(${g}deg) `),
      b && (r += `rotate(${b}deg) `),
      x && (r += `rotateX(${x}deg) `),
      w && (r += `rotateY(${w}deg) `),
      M && (r += `skewX(${M}deg) `),
      N && (r += `skewY(${N}deg) `));
  }
  const h = a.x.scale * n.x,
    y = a.y.scale * n.y;
  return ((h !== 1 || y !== 1) && (r += `scale(${h}, ${y})`), r || "none");
}
const F_ = zd.length,
  Jg = (a) => (typeof a == "string" ? parseFloat(a) : a),
  Pg = (a) => typeof a == "number" || st.test(a);
function W_(a, n, s, r, o, f) {
  o
    ? ((a.opacity = Yt(0, s.opacity ?? 1, $_(r))), (a.opacityExit = Yt(n.opacity ?? 1, 0, I_(r))))
    : f && (a.opacity = Yt(n.opacity ?? 1, s.opacity ?? 1, r));
  for (let d = 0; d < F_; d++) {
    const h = zd[d];
    let y = Fg(n, h),
      p = Fg(s, h);
    if (y === void 0 && p === void 0) continue;
    (y || (y = 0),
      p || (p = 0),
      y === 0 || p === 0 || Pg(y) === Pg(p)
        ? ((a[h] = Math.max(Yt(Jg(y), Jg(p), r), 0)), (An.test(p) || An.test(y)) && (a[h] += "%"))
        : (a[h] = p));
  }
  (n.rotate || s.rotate) && (a.rotate = Yt(n.rotate || 0, s.rotate || 0, r));
}
function Fg(a, n) {
  return a[n] !== void 0 ? a[n] : a.borderRadius;
}
const $_ = yb(0, 0.5, e0),
  I_ = yb(0.5, 0.95, rn);
function yb(a, n, s) {
  return (r) => (r < a ? 0 : r > n ? 1 : s(ls(a, n, r)));
}
function gb(a, n, s) {
  const r = he(a) ? a : Da(a);
  return (r.start(Cd("", r, n, s)), r.animation);
}
function El(a, n, s, r = { passive: !0 }) {
  return (a.addEventListener(n, s, r), () => a.removeEventListener(n, s, r));
}
const tE = (a, n) => a.depth - n.depth;
class eE {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(n) {
    (hd(this.children, n), (this.isDirty = !0));
  }
  remove(n) {
    (ss(this.children, n), (this.isDirty = !0));
  }
  forEach(n) {
    (this.isDirty && this.children.sort(tE), (this.isDirty = !1), this.children.forEach(n));
  }
}
function nE(a, n) {
  const s = Me.now(),
    r = ({ timestamp: o }) => {
      const f = o - s;
      f >= n && (Pn(r), a(f - n));
    };
  return (Xt.setup(r, !0), () => Pn(r));
}
function uo(a) {
  return he(a) ? a.get() : a;
}
class aE {
  constructor() {
    this.members = [];
  }
  add(n) {
    hd(this.members, n);
    for (let s = this.members.length - 1; s >= 0; s--) {
      const r = this.members[s];
      if (r === n || r === this.lead || r === this.prevLead) continue;
      const o = r.instance;
      (!o || o.isConnected === !1) && !r.snapshot && (ss(this.members, r), r.unmount());
    }
    n.scheduleRender();
  }
  remove(n) {
    if ((ss(this.members, n), n === this.prevLead && (this.prevLead = void 0), n === this.lead)) {
      const s = this.members[this.members.length - 1];
      s && this.promote(s);
    }
  }
  relegate(n) {
    var s;
    for (let r = this.members.indexOf(n) - 1; r >= 0; r--) {
      const o = this.members[r];
      if (o.isPresent !== !1 && ((s = o.instance) == null ? void 0 : s.isConnected) !== !1)
        return (this.promote(o), !0);
    }
    return !1;
  }
  promote(n, s) {
    var o;
    const r = this.lead;
    if (n !== r && ((this.prevLead = r), (this.lead = n), n.show(), r)) {
      (r.updateSnapshot(), n.scheduleRender());
      const { layoutDependency: f } = r.options,
        { layoutDependency: d } = n.options;
      ((f === void 0 || f !== d) &&
        ((n.resumeFrom = r),
        s && (r.preserveOpacity = !0),
        r.snapshot &&
          ((n.snapshot = r.snapshot), (n.snapshot.latestValues = r.animationValues || r.latestValues)),
        (o = n.root) != null && o.isUpdating && (n.isLayoutDirty = !0)),
        n.options.crossfade === !1 && r.hide());
    }
  }
  exitAnimationComplete() {
    this.members.forEach((n) => {
      var s, r, o, f, d;
      ((r = (s = n.options).onExitComplete) == null || r.call(s),
        (d = (o = n.resumingFrom) == null ? void 0 : (f = o.options).onExitComplete) == null || d.call(f));
    });
  }
  scheduleRender() {
    this.members.forEach((n) => n.instance && n.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    var n;
    (n = this.lead) != null && n.snapshot && (this.lead.snapshot = void 0);
  }
}
const co = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 },
  pf = ["", "X", "Y", "Z"],
  iE = 1e3;
let sE = 0;
function yf(a, n, s, r) {
  const { latestValues: o } = n;
  o[a] && ((s[a] = o[a]), n.setStaticValue(a, 0), r && (r[a] = 0));
}
function vb(a) {
  if (((a.hasCheckedOptimisedAppear = !0), a.root === a)) return;
  const { visualElement: n } = a.options;
  if (!n) return;
  const s = U0(n);
  if (window.MotionHasOptimisedAnimation(s, "transform")) {
    const { layout: o, layoutId: f } = a.options;
    window.MotionCancelOptimisedAnimation(s, "transform", Xt, !(o || f));
  }
  const { parent: r } = a;
  r && !r.hasCheckedOptimisedAppear && vb(r);
}
function bb({
  attachResizeListener: a,
  defaultParent: n,
  measureScroll: s,
  checkIsScrollRoot: r,
  resetTransform: o,
}) {
  return class {
    constructor(d = {}, h = n == null ? void 0 : n()) {
      ((this.id = sE++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.layoutVersion = 0),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(oE),
            this.nodes.forEach(mE),
            this.nodes.forEach(pE),
            this.nodes.forEach(uE));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.linkedParentVersion = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = d),
        (this.root = h ? h.root || h : this),
        (this.path = h ? [...h.path, h] : []),
        (this.parent = h),
        (this.depth = h ? h.depth + 1 : 0));
      for (let y = 0; y < this.path.length; y++) this.path[y].shouldResetTransform = !0;
      this.root === this && (this.nodes = new eE());
    }
    addEventListener(d, h) {
      return (
        this.eventHandlers.has(d) || this.eventHandlers.set(d, new pd()),
        this.eventHandlers.get(d).add(h)
      );
    }
    notifyListeners(d, ...h) {
      const y = this.eventHandlers.get(d);
      y && y.notify(...h);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    mount(d) {
      if (this.instance) return;
      ((this.isSVG = ko(d) && !K0(d)), (this.instance = d));
      const { layoutId: h, layout: y, visualElement: p } = this.options;
      if (
        (p && !p.current && p.mount(d),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (y || h) && (this.isLayoutDirty = !0),
        a)
      ) {
        let g,
          b = 0;
        const x = () => (this.root.updateBlockedByResize = !1);
        (Xt.read(() => {
          b = window.innerWidth;
        }),
          a(d, () => {
            const w = window.innerWidth;
            w !== b &&
              ((b = w),
              (this.root.updateBlockedByResize = !0),
              g && g(),
              (g = nE(x, 250)),
              co.hasAnimatedSinceResize && ((co.hasAnimatedSinceResize = !1), this.nodes.forEach(Ig)));
          }));
      }
      (h && this.root.registerSharedNode(h, this),
        this.options.animate !== !1 &&
          p &&
          (h || y) &&
          this.addEventListener(
            "didUpdate",
            ({ delta: g, hasLayoutChanged: b, hasRelativeLayoutChanged: x, layout: w }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const M = this.options.transition || p.getDefaultTransition() || xE,
                { onLayoutAnimationStart: N, onLayoutAnimationComplete: k } = p.getProps(),
                j = !this.targetLayout || !pb(this.targetLayout, w),
                q = !b && x;
              if (this.options.layoutRoot || this.resumeFrom || q || (b && (j || !this.currentAnimation))) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom), (this.resumingFrom.resumingFrom = void 0));
                const Z = { ...Md(M, "layout"), onPlay: N, onComplete: k };
                ((p.shouldReduceMotion || this.options.layoutRoot) && ((Z.delay = 0), (Z.type = !1)),
                  this.startAnimation(Z),
                  this.setAnimationOrigin(g, q, Z.path));
              } else
                (b || Ig(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete());
              this.targetLayout = w;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this));
      const d = this.getStack();
      (d && d.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        Pn(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(yE), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && vb(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const b = this.path[g];
        ((b.shouldResetTransform = !0),
          (typeof b.latestValues.x == "string" || typeof b.latestValues.y == "string") &&
            (b.isLayoutDirty = !0),
          b.updateScroll("snapshot"),
          b.options.layoutRoot && b.willUpdate(!1));
      }
      const { layoutId: h, layout: y } = this.options;
      if (h === void 0 && !y) return;
      const p = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = p ? p(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        d && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        const y = this.updateBlockedByResize;
        (this.unblockUpdate(),
          (this.updateBlockedByResize = !1),
          this.clearAllSnapshots(),
          y && this.nodes.forEach(fE),
          this.nodes.forEach(Wg));
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach($g);
        return;
      }
      ((this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(dE),
            this.nodes.forEach(hE),
            this.nodes.forEach(lE),
            this.nodes.forEach(rE))
          : this.nodes.forEach($g),
        this.clearAllSnapshots());
      const h = Me.now();
      ((Te.delta = En(0, 1e3 / 60, h - Te.timestamp)),
        (Te.timestamp = h),
        (Te.isProcessing = !0),
        rf.update.process(Te),
        rf.preRender.process(Te),
        rf.render.process(Te),
        (Te.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), Nd.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(cE), this.sharedNodes.forEach(gE));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), Xt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Xt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !Ce(this.snapshot.measuredBox.x) &&
          !Ce(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let y = 0; y < this.path.length; y++) this.path[y].updateScroll();
      const d = this.layout;
      ((this.layout = this.measure(!1)),
        this.layoutVersion++,
        this.layoutCorrected || (this.layoutCorrected = oe()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: h } = this.options;
      h && h.notify("LayoutMeasure", this.layout.layoutBox, d ? d.layoutBox : void 0);
    }
    updateScroll(d = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === d &&
          (h = !1),
        h && this.instance)
      ) {
        const y = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: d,
          isRoot: y,
          offset: s(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : y,
        };
      }
    }
    resetTransform() {
      if (!o) return;
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        h = this.projectionDelta && !mb(this.projectionDelta),
        y = this.getTransformTemplate(),
        p = y ? y(this.latestValues, "") : void 0,
        g = p !== this.prevTransformTemplateValue;
      d &&
        this.instance &&
        (h || ai(this.latestValues) || g) &&
        (o(this.instance, p), (this.shouldResetTransform = !1), this.scheduleRender());
    }
    measure(d = !0) {
      const h = this.measurePageBox();
      let y = this.removeElementScroll(h);
      return (
        d && (y = this.removeTransform(y)),
        SE(y),
        {
          animationId: this.root.animationId,
          measuredBox: h,
          layoutBox: y,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var p;
      const { visualElement: d } = this.options;
      if (!d) return oe();
      const h = d.measureViewportBox();
      if (!(((p = this.scroll) == null ? void 0 : p.wasRoot) || this.path.some(TE))) {
        const { scroll: g } = this.root;
        g && (Tn(h.x, g.offset.x), Tn(h.y, g.offset.y));
      }
      return h;
    }
    removeElementScroll(d) {
      var y;
      const h = oe();
      if ((hn(h, d), (y = this.scroll) != null && y.wasRoot)) return h;
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p],
          { scroll: b, options: x } = g;
        g !== this.root &&
          b &&
          x.layoutScroll &&
          (b.wasRoot && hn(h, d), Tn(h.x, b.offset.x), Tn(h.y, b.offset.y));
      }
      return h;
    }
    applyTransform(d, h = !1, y) {
      var g, b;
      const p = y || oe();
      hn(p, d);
      for (let x = 0; x < this.path.length; x++) {
        const w = this.path[x];
        (!h &&
          w.options.layoutScroll &&
          w.scroll &&
          w !== w.root &&
          (Tn(p.x, -w.scroll.offset.x), Tn(p.y, -w.scroll.offset.y)),
          ai(w.latestValues) && oo(p, w.latestValues, (g = w.layout) == null ? void 0 : g.layoutBox));
      }
      return (
        ai(this.latestValues) && oo(p, this.latestValues, (b = this.layout) == null ? void 0 : b.layoutBox),
        p
      );
    }
    removeTransform(d) {
      var y;
      const h = oe();
      hn(h, d);
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p];
        if (!ai(g.latestValues)) continue;
        let b;
        (g.instance && (Kf(g.latestValues) && g.updateSnapshot(), (b = oe()), hn(b, g.measurePageBox())),
          Gg(h, g.latestValues, (y = g.snapshot) == null ? void 0 : y.layoutBox, b));
      }
      return (ai(this.latestValues) && Gg(h, this.latestValues), h);
    }
    setTargetDelta(d) {
      ((this.targetDelta = d), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0));
    }
    setOptions(d) {
      this.options = { ...this.options, ...d, crossfade: d.crossfade !== void 0 ? d.crossfade : !0 };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== Te.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      var w;
      const h = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty));
      const y = !!this.resumingFrom || this !== h;
      if (
        !(
          d ||
          (y && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          ((w = this.parent) != null && w.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: g, layoutId: b } = this.options;
      if (!this.layout || !(g || b)) return;
      this.resolvedRelativeTargetAt = Te.timestamp;
      const x = this.getClosestProjectingParent();
      (x &&
        this.linkedParentVersion !== x.layoutVersion &&
        !x.options.layoutRoot &&
        this.removeRelativeTarget(),
        !this.targetDelta &&
          !this.relativeTarget &&
          (this.options.layoutAnchor !== !1 && x && x.layout
            ? this.createRelativeTarget(x, this.layout.layoutBox, x.layout.layoutBox)
            : this.removeRelativeTarget()),
        !(!this.relativeTarget && !this.targetDelta) &&
          (this.target || ((this.target = oe()), (this.targetWithTransforms = oe())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              Y_(
                this.target,
                this.relativeTarget,
                this.relativeParent.target,
                this.options.layoutAnchor || void 0,
              ))
            : this.targetDelta
              ? (this.resumingFrom
                  ? this.applyTransform(this.layout.layoutBox, !1, this.target)
                  : hn(this.target, this.layout.layoutBox),
                tb(this.target, this.targetDelta))
              : hn(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget &&
            ((this.attemptToResolveRelativeTarget = !1),
            this.options.layoutAnchor !== !1 &&
            x &&
            !!x.resumingFrom == !!this.resumingFrom &&
            !x.options.layoutScroll &&
            x.target &&
            this.animationProgress !== 1
              ? this.createRelativeTarget(x, this.target, x.target)
              : (this.relativeParent = this.relativeTarget = void 0))));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Kf(this.parent.latestValues) || I0(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, h, y) {
      ((this.relativeParent = d),
        (this.linkedParentVersion = d.layoutVersion),
        this.forceRelativeParentToResolveTarget(),
        (this.relativeTarget = oe()),
        (this.relativeTargetOrigin = oe()),
        vo(this.relativeTargetOrigin, h, y, this.options.layoutAnchor || void 0),
        hn(this.relativeTarget, this.relativeTargetOrigin));
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var M;
      const d = this.getLead(),
        h = !!this.resumingFrom || this !== d;
      let y = !0;
      if (
        ((this.isProjectionDirty || ((M = this.parent) != null && M.isProjectionDirty)) && (y = !1),
        h && (this.isSharedProjectionDirty || this.isTransformDirty) && (y = !1),
        this.resolvedRelativeTargetAt === Te.timestamp && (y = !1),
        y)
      )
        return;
      const { layout: p, layoutId: g } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(p || g))
      )
        return;
      hn(this.layoutCorrected, this.layout.layoutBox);
      const b = this.treeScale.x,
        x = this.treeScale.y;
      (b_(this.layoutCorrected, this.treeScale, this.path, h),
        d.layout &&
          !d.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((d.target = d.layout.layoutBox), (d.targetWithTransforms = oe())));
      const { target: w } = d;
      if (!w) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (Vg(this.prevProjectionDelta.x, this.projectionDelta.x),
          Vg(this.prevProjectionDelta.y, this.projectionDelta.y)),
        bl(this.projectionDelta, this.layoutCorrected, w, this.latestValues),
        (this.treeScale.x !== b ||
          this.treeScale.y !== x ||
          !Qg(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !Qg(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0), this.scheduleRender(), this.notifyListeners("projectionUpdate", w)));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      var h;
      if (((h = this.options.visualElement) == null || h.scheduleRender(), d)) {
        const y = this.getStack();
        y && y.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = as()),
        (this.projectionDelta = as()),
        (this.projectionDeltaWithTransform = as()));
    }
    setAnimationOrigin(d, h = !1, y) {
      const p = this.snapshot,
        g = p ? p.latestValues : {},
        b = { ...this.latestValues },
        x = as();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !h));
      const w = oe(),
        M = p ? p.source : void 0,
        N = this.layout ? this.layout.source : void 0,
        k = M !== N,
        j = this.getStack(),
        q = !j || j.members.length <= 1,
        Z = !!(k && !q && this.options.crossfade === !0 && !this.path.some(bE));
      this.animationProgress = 0;
      let G;
      const $ = y == null ? void 0 : y.interpolateProjection(d);
      ((this.mixTargetDelta = (ot) => {
        const K = ot / 1e3,
          V = $ == null ? void 0 : $(K);
        (V
          ? ((x.x.translate = V.x),
            (x.x.scale = Yt(d.x.scale, 1, K)),
            (x.x.origin = d.x.origin),
            (x.x.originPoint = d.x.originPoint),
            (x.y.translate = V.y),
            (x.y.scale = Yt(d.y.scale, 1, K)),
            (x.y.origin = d.y.origin),
            (x.y.originPoint = d.y.originPoint))
          : (tv(x.x, d.x, K), tv(x.y, d.y, K)),
          this.setTargetDelta(x),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (vo(
              w,
              this.layout.layoutBox,
              this.relativeParent.layout.layoutBox,
              this.options.layoutAnchor || void 0,
            ),
            vE(this.relativeTarget, this.relativeTargetOrigin, w, K),
            G && J_(this.relativeTarget, G) && (this.isProjectionDirty = !1),
            G || (G = oe()),
            hn(G, this.relativeTarget)),
          k && ((this.animationValues = b), W_(b, g, this.latestValues, K, Z, q)),
          V &&
            V.rotate !== void 0 &&
            (this.animationValues || (this.animationValues = b),
            (this.animationValues.pathRotation = V.rotate)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = K));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(d) {
      var h, y, p;
      (this.notifyListeners("animationStart"),
        (h = this.currentAnimation) == null || h.stop(),
        (p = (y = this.resumingFrom) == null ? void 0 : y.currentAnimation) == null || p.stop(),
        this.pendingAnimation && (Pn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Xt.update(() => {
          ((co.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = Da(0)),
            this.motionValue.jump(0, !1),
            (this.currentAnimation = gb(this.motionValue, [0, 1e3], {
              ...d,
              velocity: 0,
              isSync: !0,
              onUpdate: (g) => {
                (this.mixTargetDelta(g), d.onUpdate && d.onUpdate(g));
              },
              onComplete: () => {
                (d.onComplete && d.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0), (this.resumingFrom.preserveOpacity = void 0));
      const d = this.getStack();
      (d && d.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(iE), this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: h, target: y, layout: p, latestValues: g } = d;
      if (!(!h || !y || !p)) {
        if (
          this !== d &&
          this.layout &&
          p &&
          xb(this.options.animationType, this.layout.layoutBox, p.layoutBox)
        ) {
          y = this.target || oe();
          const b = Ce(this.layout.layoutBox.x);
          ((y.x.min = d.target.x.min), (y.x.max = y.x.min + b));
          const x = Ce(this.layout.layoutBox.y);
          ((y.y.min = d.target.y.min), (y.y.max = y.y.min + x));
        }
        (hn(h, y), oo(h, g), bl(this.projectionDeltaWithTransform, this.layoutCorrected, h, g));
      }
    }
    registerSharedNode(d, h) {
      (this.sharedNodes.has(d) || this.sharedNodes.set(d, new aE()), this.sharedNodes.get(d).add(h));
      const p = h.options.initialPromotionConfig;
      h.promote({
        transition: p ? p.transition : void 0,
        preserveFollowOpacity: p && p.shouldPreserveFollowOpacity ? p.shouldPreserveFollowOpacity(h) : void 0,
      });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : !0;
    }
    getLead() {
      var h;
      const { layoutId: d } = this.options;
      return d ? ((h = this.getStack()) == null ? void 0 : h.lead) || this : this;
    }
    getPrevLead() {
      var h;
      const { layoutId: d } = this.options;
      return d ? ((h = this.getStack()) == null ? void 0 : h.prevLead) : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d) return this.root.sharedNodes.get(d);
    }
    promote({ needsReset: d, transition: h, preserveFollowOpacity: y } = {}) {
      const p = this.getStack();
      (p && p.promote(this, y),
        d && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        h && this.setOptions({ transition: h }));
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d) return;
      let h = !1;
      const { latestValues: y } = d;
      if (((y.z || y.rotate || y.rotateX || y.rotateY || y.rotateZ || y.skewX || y.skewY) && (h = !0), !h))
        return;
      const p = {};
      y.z && yf("z", d, p, this.animationValues);
      for (let g = 0; g < pf.length; g++)
        (yf(`rotate${pf[g]}`, d, p, this.animationValues), yf(`skew${pf[g]}`, d, p, this.animationValues));
      d.render();
      for (const g in p)
        (d.setStaticValue(g, p[g]), this.animationValues && (this.animationValues[g] = p[g]));
      d.scheduleRender();
    }
    applyProjectionStyles(d, h) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        d.visibility = "hidden";
        return;
      }
      const y = this.getTransformTemplate();
      if (this.needsReset) {
        ((this.needsReset = !1),
          (d.visibility = ""),
          (d.opacity = ""),
          (d.pointerEvents = uo(h == null ? void 0 : h.pointerEvents) || ""),
          (d.transform = y ? y(this.latestValues, "") : "none"));
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        (this.options.layoutId &&
          ((d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
          (d.pointerEvents = uo(h == null ? void 0 : h.pointerEvents) || "")),
          this.hasProjected &&
            !ai(this.latestValues) &&
            ((d.transform = y ? y({}, "") : "none"), (this.hasProjected = !1)));
        return;
      }
      d.visibility = "";
      const g = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let b = P_(this.projectionDeltaWithTransform, this.treeScale, g);
      (y && (b = y(g, b)), (d.transform = b));
      const { x, y: w } = this.projectionDelta;
      ((d.transformOrigin = `${x.origin * 100}% ${w.origin * 100}% 0`),
        p.animationValues
          ? (d.opacity =
              p === this
                ? (g.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : g.opacityExit)
          : (d.opacity =
              p === this
                ? g.opacity !== void 0
                  ? g.opacity
                  : ""
                : g.opacityExit !== void 0
                  ? g.opacityExit
                  : 0));
      for (const M in Jf) {
        if (g[M] === void 0) continue;
        const { correct: N, applyTo: k, isCSSVariable: j } = Jf[M],
          q = b === "none" ? g[M] : N(g[M], p);
        if (k) {
          const Z = k.length;
          for (let G = 0; G < Z; G++) d[k[G]] = q;
        } else j ? (this.options.visualElement.renderState.vars[M] = q) : (d[M] = q);
      }
      this.options.layoutId &&
        (d.pointerEvents = p === this ? uo(h == null ? void 0 : h.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((d) => {
        var h;
        return (h = d.currentAnimation) == null ? void 0 : h.stop();
      }),
        this.root.nodes.forEach(Wg),
        this.root.sharedNodes.clear());
    }
  };
}
function lE(a) {
  a.updateLayout();
}
function rE(a) {
  var s;
  const n = ((s = a.resumeFrom) == null ? void 0 : s.snapshot) || a.snapshot;
  if (a.isLead() && a.layout && n && a.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: o } = a.layout,
      { animationType: f } = a.options,
      d = n.source !== a.layout.source;
    if (f === "size")
      Sn((b) => {
        const x = d ? n.measuredBox[b] : n.layoutBox[b],
          w = Ce(x);
        ((x.min = r[b].min), (x.max = x.min + w));
      });
    else if (f === "x" || f === "y") {
      const b = f === "x" ? "y" : "x";
      Pf(d ? n.measuredBox[b] : n.layoutBox[b], r[b]);
    } else
      xb(f, n.layoutBox, r) &&
        Sn((b) => {
          const x = d ? n.measuredBox[b] : n.layoutBox[b],
            w = Ce(r[b]);
          ((x.max = x.min + w),
            a.relativeTarget &&
              !a.currentAnimation &&
              ((a.isProjectionDirty = !0), (a.relativeTarget[b].max = a.relativeTarget[b].min + w)));
        });
    const h = as();
    bl(h, r, n.layoutBox);
    const y = as();
    d ? bl(y, a.applyTransform(o, !0), n.measuredBox) : bl(y, r, n.layoutBox);
    const p = !mb(h);
    let g = !1;
    if (!a.resumeFrom) {
      const b = a.getClosestProjectingParent();
      if (b && !b.resumeFrom) {
        const { snapshot: x, layout: w } = b;
        if (x && w) {
          const M = a.options.layoutAnchor || void 0,
            N = oe();
          vo(N, n.layoutBox, x.layoutBox, M);
          const k = oe();
          (vo(k, r, w.layoutBox, M),
            pb(N, k) || (g = !0),
            b.options.layoutRoot &&
              ((a.relativeTarget = k), (a.relativeTargetOrigin = N), (a.relativeParent = b)));
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: y,
      layoutDelta: h,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: g,
    });
  } else if (a.isLead()) {
    const { onExitComplete: r } = a.options;
    r && r();
  }
  a.options.transition = void 0;
}
function oE(a) {
  a.parent &&
    (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty),
    a.isSharedProjectionDirty ||
      (a.isSharedProjectionDirty = !!(
        a.isProjectionDirty ||
        a.parent.isProjectionDirty ||
        a.parent.isSharedProjectionDirty
      )),
    a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function uE(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function cE(a) {
  a.clearSnapshot();
}
function Wg(a) {
  a.clearMeasurements();
}
function fE(a) {
  ((a.isLayoutDirty = !0), a.updateLayout());
}
function $g(a) {
  a.isLayoutDirty = !1;
}
function dE(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && ((a.snapshot = a.layout), (a.isLayoutDirty = !0));
}
function hE(a) {
  const { visualElement: n } = a.options;
  (n && n.getProps().onBeforeLayoutMeasure && n.notify("BeforeLayoutMeasure"), a.resetTransform());
}
function Ig(a) {
  (a.finishAnimation(), (a.targetDelta = a.relativeTarget = a.target = void 0), (a.isProjectionDirty = !0));
}
function mE(a) {
  a.resolveTargetDelta();
}
function pE(a) {
  a.calcProjection();
}
function yE(a) {
  a.resetSkewAndRotation();
}
function gE(a) {
  a.removeLeadSnapshot();
}
function tv(a, n, s) {
  ((a.translate = Yt(n.translate, 0, s)),
    (a.scale = Yt(n.scale, 1, s)),
    (a.origin = n.origin),
    (a.originPoint = n.originPoint));
}
function ev(a, n, s, r) {
  ((a.min = Yt(n.min, s.min, r)), (a.max = Yt(n.max, s.max, r)));
}
function vE(a, n, s, r) {
  (ev(a.x, n.x, s.x, r), ev(a.y, n.y, s.y, r));
}
function bE(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const xE = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  nv = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a),
  av = nv("applewebkit/") && !nv("chrome/") ? Math.round : rn;
function iv(a) {
  ((a.min = av(a.min)), (a.max = av(a.max)));
}
function SE(a) {
  (iv(a.x), iv(a.y));
}
function xb(a, n, s) {
  return a === "position" || (a === "preserve-aspect" && !q_(Kg(n), Kg(s), 0.2));
}
function TE(a) {
  var n;
  return a !== a.root && ((n = a.scroll) == null ? void 0 : n.wasRoot);
}
const AE = bb({
    attachResizeListener: (a, n) => El(a, "resize", n),
    measureScroll: () => {
      var a, n;
      return {
        x: document.documentElement.scrollLeft || ((a = document.body) == null ? void 0 : a.scrollLeft) || 0,
        y: document.documentElement.scrollTop || ((n = document.body) == null ? void 0 : n.scrollTop) || 0,
      };
    },
    checkIsScrollRoot: () => !0,
  }),
  gf = { current: void 0 },
  Sb = bb({
    measureScroll: (a) => ({ x: a.scrollLeft, y: a.scrollTop }),
    defaultParent: () => {
      if (!gf.current) {
        const a = new AE({});
        (a.mount(window), a.setOptions({ layoutScroll: !0 }), (gf.current = a));
      }
      return gf.current;
    },
    resetTransform: (a, n) => {
      a.style.transform = n !== void 0 ? n : "none";
    },
    checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed",
  }),
  Vo = F.createContext({ transformPagePoint: (a) => a, isStatic: !1, reducedMotion: "never" });
function sv(a, n) {
  if (typeof a == "function") return a(n);
  a != null && (a.current = n);
}
function _E(...a) {
  return (n) => {
    let s = !1;
    const r = a.map((o) => {
      const f = sv(o, n);
      return (!s && typeof f == "function" && (s = !0), f);
    });
    if (s)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const f = r[o];
          typeof f == "function" ? f() : sv(a[o], null);
        }
      };
  };
}
function EE(...a) {
  return F.useCallback(_E(...a), a);
}
class wE extends F.Component {
  getSnapshotBeforeUpdate(n) {
    const s = this.props.childRef.current;
    if (io(s) && n.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const r = s.offsetParent,
        o = (io(r) && r.offsetWidth) || 0,
        f = (io(r) && r.offsetHeight) || 0,
        d = getComputedStyle(s),
        h = this.props.sizeRef.current;
      ((h.height = parseFloat(d.height)),
        (h.width = parseFloat(d.width)),
        (h.top = s.offsetTop),
        (h.left = s.offsetLeft),
        (h.right = o - h.width - h.left),
        (h.bottom = f - h.height - h.top),
        (h.direction = d.direction));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function ME({ children: a, isPresent: n, anchorX: s, anchorY: r, root: o, pop: f }) {
  var x;
  const d = F.useId(),
    h = F.useRef(null),
    y = F.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, direction: "ltr" }),
    { nonce: p } = F.useContext(Vo),
    g = ((x = a.props) == null ? void 0 : x.ref) ?? (a == null ? void 0 : a.ref),
    b = EE(h, g);
  return (
    F.useInsertionEffect(() => {
      const { width: w, height: M, top: N, left: k, right: j, bottom: q, direction: Z } = y.current;
      if (n || f === !1 || !h.current || !w || !M) return;
      const G = Z === "rtl",
        $ = s === "left" ? (G ? `right: ${j}` : `left: ${k}`) : G ? `left: ${k}` : `right: ${j}`,
        ot = r === "bottom" ? `bottom: ${q}` : `top: ${N}`;
      h.current.dataset.motionPopId = d;
      const K = document.createElement("style");
      p && (K.nonce = p);
      const V = o ?? document.head;
      return (
        V.appendChild(K),
        K.sheet &&
          K.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${M}px !important;
            ${$}px !important;
            ${ot}px !important;
          }
        `),
        () => {
          var J;
          ((J = h.current) == null || J.removeAttribute("data-motion-pop-id"),
            V.contains(K) && V.removeChild(K));
        }
      );
    }, [n]),
    _.jsx(wE, {
      isPresent: n,
      childRef: h,
      sizeRef: y,
      pop: f,
      children: f === !1 ? a : F.cloneElement(a, { ref: b }),
    })
  );
}
const CE = ({
  children: a,
  initial: n,
  isPresent: s,
  onExitComplete: r,
  custom: o,
  presenceAffectsLayout: f,
  mode: d,
  anchorX: h,
  anchorY: y,
  root: p,
}) => {
  const g = Cl(DE),
    b = F.useId(),
    x = F.useRef(s),
    w = F.useRef(r);
  Ro(() => {
    ((x.current = s), (w.current = r));
  });
  let M = !0,
    N = F.useMemo(
      () => (
        (M = !1),
        {
          id: b,
          initial: n,
          isPresent: s,
          custom: o,
          onExitComplete: (k) => {
            g.set(k, !0);
            for (const j of g.values()) if (!j) return;
            r && r();
          },
          register: (k) => (
            g.set(k, !1),
            () => {
              var j;
              (g.delete(k), !x.current && !g.size && ((j = w.current) == null || j.call(w)));
            }
          ),
        }
      ),
      [s, g, r],
    );
  return (
    f && M && (N = { ...N }),
    F.useMemo(() => {
      g.forEach((k, j) => g.set(j, !1));
    }, [s]),
    F.useEffect(() => {
      !s && !g.size && r && r();
    }, [s]),
    (a = _.jsx(ME, { pop: d === "popLayout", isPresent: s, anchorX: h, anchorY: y, root: p, children: a })),
    _.jsx(Oo.Provider, { value: N, children: a })
  );
};
function DE() {
  return new Map();
}
function Tb(a = !0) {
  const n = F.useContext(Oo);
  if (n === null) return [!0, null];
  const { isPresent: s, onExitComplete: r, register: o } = n,
    f = F.useId();
  F.useEffect(() => {
    if (a) return o(f);
  }, [a]);
  const d = F.useCallback(() => a && r && r(f), [f, r, a]);
  return !s && r ? [!1, d] : [!0];
}
const $r = (a) => a.key || "";
function lv(a) {
  const n = [];
  return (
    F.Children.forEach(a, (s) => {
      F.isValidElement(s) && n.push(s);
    }),
    n
  );
}
const Ab = ({
    children: a,
    custom: n,
    initial: s = !0,
    onExitComplete: r,
    presenceAffectsLayout: o = !0,
    mode: f = "sync",
    propagate: d = !1,
    anchorX: h = "left",
    anchorY: y = "top",
    root: p,
  }) => {
    const [g, b] = Tb(d),
      x = F.useMemo(() => lv(a), [a]),
      w = d && !g ? [] : x.map($r),
      M = F.useRef(!0),
      N = F.useRef(x),
      k = Cl(() => new Map()),
      j = F.useRef(new Set()),
      [q, Z] = F.useState(x),
      [G, $] = F.useState(x);
    Ro(() => {
      ((M.current = !1), (N.current = x));
      for (let V = 0; V < G.length; V++) {
        const J = $r(G[V]);
        w.includes(J) ? (k.delete(J), j.current.delete(J)) : k.get(J) !== !0 && k.set(J, !1);
      }
    }, [G, w.length, w.join("-")]);
    const ot = [];
    if (x !== q) {
      let V = [...x];
      for (let J = 0; J < G.length; J++) {
        const et = G[J],
          mt = $r(et);
        w.includes(mt) || (V.splice(J, 0, et), ot.push(et));
      }
      return (f === "wait" && ot.length && (V = ot), $(lv(V)), Z(x), null);
    }
    const { forceRender: K } = F.useContext(dd);
    return _.jsx(_.Fragment, {
      children: G.map((V) => {
        const J = $r(V),
          et = d && !g ? !1 : x === G || w.includes(J),
          mt = () => {
            if (j.current.has(J)) return;
            if (k.has(J)) (j.current.add(J), k.set(J, !0));
            else return;
            let St = !0;
            (k.forEach((Qt) => {
              Qt || (St = !1);
            }),
              St && (K == null || K(), $(N.current), d && (b == null || b()), r && r()));
          };
        return _.jsx(
          CE,
          {
            isPresent: et,
            initial: !M.current || s ? void 0 : !1,
            custom: n,
            presenceAffectsLayout: o,
            mode: f,
            root: p,
            onExitComplete: et ? void 0 : mt,
            anchorX: h,
            anchorY: y,
            children: V,
          },
          J,
        );
      }),
    });
  },
  _b = F.createContext({ strict: !1 }),
  rv = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  };
let ov = !1;
function RE() {
  if (ov) return;
  const a = {};
  for (const n in rv) a[n] = { isEnabled: (s) => rv[n].some((r) => !!s[r]) };
  (P0(a), (ov = !0));
}
function Eb() {
  return (RE(), y_());
}
function OE(a) {
  const n = Eb();
  for (const s in a) n[s] = { ...n[s], ...a[s] };
  P0(n);
}
const zE = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport",
]);
function bo(a) {
  return (
    a.startsWith("while") ||
    (a.startsWith("drag") && a !== "draggable") ||
    a.startsWith("layout") ||
    a.startsWith("onTap") ||
    a.startsWith("onPan") ||
    a.startsWith("onLayout") ||
    zE.has(a)
  );
}
let wb = (a) => !bo(a);
function kE(a) {
  typeof a == "function" && (wb = (n) => (n.startsWith("on") ? !bo(n) : a(n)));
}
try {
  kE(require("@emotion/is-prop-valid").default);
} catch {}
function NE(a, n, s) {
  const r = {};
  for (const o in a)
    (o === "values" && typeof a.values == "object") ||
      he(a[o]) ||
      ((wb(o) || (s === !0 && bo(o)) || (!n && !bo(o)) || (a.draggable && o.startsWith("onDrag"))) &&
        (r[o] = a[o]));
  return r;
}
const Uo = F.createContext({});
function jE(a, n) {
  if (jo(a)) {
    const { initial: s, animate: r } = a;
    return { initial: s === !1 || _l(s) ? s : void 0, animate: _l(r) ? r : void 0 };
  }
  return a.inherit !== !1 ? n : {};
}
function VE(a) {
  const { initial: n, animate: s } = jE(a, F.useContext(Uo));
  return F.useMemo(() => ({ initial: n, animate: s }), [uv(n), uv(s)]);
}
function uv(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const Hd = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function Mb(a, n, s) {
  for (const r in n) !he(n[r]) && !ab(r, s) && (a[r] = n[r]);
}
function UE({ transformTemplate: a }, n) {
  return F.useMemo(() => {
    const s = Hd();
    return (Bd(s, n, a), Object.assign({}, s.vars, s.style));
  }, [n]);
}
function BE(a, n) {
  const s = a.style || {},
    r = {};
  return (Mb(r, s, a), Object.assign(r, UE(a, n)), r);
}
function LE(a, n) {
  const s = {},
    r = BE(a, n);
  return (
    a.drag &&
      a.dragListener !== !1 &&
      ((s.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none"),
      (r.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`)),
    a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (s.tabIndex = 0),
    (s.style = r),
    s
  );
}
const Cb = () => ({ ...Hd(), attrs: {} });
function HE(a, n, s, r) {
  const o = F.useMemo(() => {
    const f = Cb();
    return (sb(f, n, rb(r), a.transformTemplate, a.style), { ...f.attrs, style: { ...f.style } });
  }, [n]);
  if (a.style) {
    const f = {};
    (Mb(f, a.style, a), (o.style = { ...f, ...o.style }));
  }
  return o;
}
const ZE = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function Zd(a) {
  return typeof a != "string" || a.includes("-") ? !1 : !!(ZE.indexOf(a) > -1 || /[A-Z]/u.test(a));
}
function GE(a, n, s, { latestValues: r }, o, f = !1, d) {
  const y = ((d ?? Zd(a)) ? HE : LE)(n, r, o, a),
    p = NE(n, typeof a == "string", f),
    g = a !== F.Fragment ? { ...p, ...y, ref: s } : {},
    { children: b } = n,
    x = F.useMemo(() => (he(b) ? b.get() : b), [b]);
  return F.createElement(a, { ...g, children: x });
}
function qE({ scrapeMotionValuesFromProps: a, createRenderState: n }, s, r, o) {
  return { latestValues: YE(s, r, o, a), renderState: n() };
}
function YE(a, n, s, r) {
  const o = {},
    f = r(a, {});
  for (const x in f) o[x] = uo(f[x]);
  let { initial: d, animate: h } = a;
  const y = jo(a),
    p = Q0(a);
  n && p && !y && a.inherit !== !1 && (d === void 0 && (d = n.initial), h === void 0 && (h = n.animate));
  let g = s ? s.initial === !1 : !1;
  g = g || d === !1;
  const b = g ? h : d;
  if (b && typeof b != "boolean" && !No(b)) {
    const x = Array.isArray(b) ? b : [b];
    for (let w = 0; w < x.length; w++) {
      const M = Dd(a, x[w]);
      if (M) {
        const { transitionEnd: N, transition: k, ...j } = M;
        for (const q in j) {
          let Z = j[q];
          if (Array.isArray(Z)) {
            const G = g ? Z.length - 1 : 0;
            Z = Z[G];
          }
          Z !== null && (o[q] = Z);
        }
        for (const q in N) o[q] = N[q];
      }
    }
  }
  return o;
}
const Db = (a) => (n, s) => {
    const r = F.useContext(Uo),
      o = F.useContext(Oo),
      f = () => qE(a, n, r, o);
    return s ? f() : Cl(f);
  },
  XE = Db({ scrapeMotionValuesFromProps: Ld, createRenderState: Hd }),
  KE = Db({ scrapeMotionValuesFromProps: ob, createRenderState: Cb }),
  QE = Symbol.for("motionComponentSymbol");
function JE(a, n, s) {
  const r = F.useRef(s);
  F.useInsertionEffect(() => {
    r.current = s;
  });
  const o = F.useRef(null);
  return F.useCallback(
    (f) => {
      var h;
      (f && ((h = a.onMount) == null || h.call(a, f)), n && (f ? n.mount(f) : n.unmount()));
      const d = r.current;
      if (typeof d == "function")
        if (f) {
          const y = d(f);
          typeof y == "function" && (o.current = y);
        } else o.current ? (o.current(), (o.current = null)) : d(f);
      else d && (d.current = f);
    },
    [n],
  );
}
const Rb = F.createContext({});
function Ii(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
function PE(a, n, s, r, o, f) {
  var Z, G;
  const { visualElement: d } = F.useContext(Uo),
    h = F.useContext(_b),
    y = F.useContext(Oo),
    p = F.useContext(Vo),
    g = p.reducedMotion,
    b = p.skipAnimations,
    x = F.useRef(null),
    w = F.useRef(!1);
  ((r = r || h.renderer),
    !x.current &&
      r &&
      ((x.current = r(a, {
        visualState: n,
        parent: d,
        props: s,
        presenceContext: y,
        blockInitialAnimation: y ? y.initial === !1 : !1,
        reducedMotionConfig: g,
        skipAnimations: b,
        isSVG: f,
      })),
      w.current && x.current && (x.current.manuallyAnimateOnMount = !0)));
  const M = x.current,
    N = F.useContext(Rb);
  M && !M.projection && o && (M.type === "html" || M.type === "svg") && FE(x.current, s, o, N);
  const k = F.useRef(!1);
  F.useInsertionEffect(() => {
    M && k.current && M.update(s, y);
  });
  const j = s[V0],
    q = F.useRef(
      !!j &&
        typeof window < "u" &&
        !((Z = window.MotionHandoffIsComplete) != null && Z.call(window, j)) &&
        ((G = window.MotionHasOptimisedAnimation) == null ? void 0 : G.call(window, j)),
    );
  return (
    Ro(() => {
      ((w.current = !0),
        M &&
          ((k.current = !0),
          (window.MotionIsMounted = !0),
          M.updateFeatures(),
          M.scheduleRenderMicrotask(),
          q.current && M.animationState && M.animationState.animateChanges()));
    }),
    F.useEffect(() => {
      M &&
        (!q.current && M.animationState && M.animationState.animateChanges(),
        q.current &&
          (queueMicrotask(() => {
            var $;
            ($ = window.MotionHandoffMarkAsComplete) == null || $.call(window, j);
          }),
          (q.current = !1)),
        (M.enteringChildren = void 0));
    }),
    M
  );
}
function FE(a, n, s, r) {
  const {
    layoutId: o,
    layout: f,
    drag: d,
    dragConstraints: h,
    layoutScroll: y,
    layoutRoot: p,
    layoutAnchor: g,
    layoutCrossfade: b,
  } = n;
  ((a.projection = new s(a.latestValues, n["data-framer-portal-id"] ? void 0 : Ob(a.parent))),
    a.projection.setOptions({
      layoutId: o,
      layout: f,
      alwaysMeasureLayout: !!d || (h && Ii(h)),
      visualElement: a,
      animationType: typeof f == "string" ? f : "both",
      initialPromotionConfig: r,
      crossfade: b,
      layoutScroll: y,
      layoutRoot: p,
      layoutAnchor: g,
    }));
}
function Ob(a) {
  if (a) return a.options.allowProjection !== !1 ? a.projection : Ob(a.parent);
}
function vf(a, { forwardMotionProps: n = !1, type: s } = {}, r, o) {
  r && OE(r);
  const f = s ? s === "svg" : Zd(a),
    d = f ? KE : XE;
  function h(p, g) {
    let b;
    const x = { ...F.useContext(Vo), ...p, layoutId: WE(p) },
      { isStatic: w } = x,
      M = VE(p),
      N = d(p, w);
    if (!w && typeof window < "u") {
      $E();
      const k = IE(x);
      ((b = k.MeasureLayout), (M.visualElement = PE(a, N, x, o, k.ProjectionNode, f)));
    }
    return _.jsxs(Uo.Provider, {
      value: M,
      children: [
        b && M.visualElement ? _.jsx(b, { visualElement: M.visualElement, ...x }) : null,
        GE(a, p, JE(N, M.visualElement, g), N, w, n, f),
      ],
    });
  }
  h.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const y = F.forwardRef(h);
  return ((y[QE] = a), y);
}
function WE({ layoutId: a }) {
  const n = F.useContext(dd).id;
  return n && a !== void 0 ? n + "-" + a : a;
}
function $E(a, n) {
  F.useContext(_b).strict;
}
function IE(a) {
  const n = Eb(),
    { drag: s, layout: r } = n;
  if (!s && !r) return {};
  const o = { ...s, ...r };
  return {
    MeasureLayout: (s != null && s.isEnabled(a)) || (r != null && r.isEnabled(a)) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode,
  };
}
function t2(a, n) {
  if (typeof Proxy > "u") return vf;
  const s = new Map(),
    r = (f, d) => vf(f, d, a, n),
    o = (f, d) => r(f, d);
  return new Proxy(o, {
    get: (f, d) => (d === "create" ? r : (s.has(d) || s.set(d, vf(d, void 0, a, n)), s.get(d))),
  });
}
const e2 = (a, n) => ((n.isSVG ?? Zd(a)) ? new ub(n) : new ib(n, { allowProjection: a !== F.Fragment }));
class n2 extends za {
  constructor(n) {
    (super(n), n.animationState || (n.animationState = U_(n)));
  }
  updateAnimationControlsSubscription() {
    const { animate: n } = this.node.getProps();
    No(n) && (this.unmountControls = n.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: n } = this.node.getProps(),
      { animate: s } = this.node.prevProps || {};
    n !== s && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var n;
    (this.node.animationState.reset(), (n = this.unmountControls) == null || n.call(this));
  }
}
let a2 = 0;
class i2 extends za {
  constructor() {
    (super(...arguments), (this.id = a2++), (this.isExitComplete = !1));
  }
  update() {
    var f;
    if (!this.node.presenceContext) return;
    const { isPresent: n, onExitComplete: s } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || n === r) return;
    if (n && r === !1) {
      if (this.isExitComplete) {
        const { initial: d, custom: h } = this.node.getProps();
        if (typeof d == "string" || (typeof d == "object" && d !== null && !Array.isArray(d))) {
          const y = oi(this.node, d, h);
          if (y) {
            const { transition: p, transitionEnd: g, ...b } = y;
            for (const x in b) (f = this.node.getValue(x)) == null || f.jump(b[x]);
          }
        }
        (this.node.animationState.reset(), this.node.animationState.animateChanges());
      } else this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const o = this.node.animationState.setActive("exit", !n);
    s &&
      !n &&
      o.then(() => {
        ((this.isExitComplete = !0), s(this.id));
      });
  }
  mount() {
    const { register: n, onExitComplete: s } = this.node.presenceContext || {};
    (s && s(this.id), n && (this.unmount = n(this.id)));
  }
  unmount() {}
}
const s2 = { animation: { Feature: n2 }, exit: { Feature: i2 } };
function zl(a) {
  return { point: { x: a.pageX, y: a.pageY } };
}
const l2 = (a) => (n) => jd(n) && a(n, zl(n));
function xl(a, n, s, r) {
  return El(a, n, l2(s), r);
}
const zb = ({ current: a }) => (a ? a.ownerDocument.defaultView : null),
  cv = (a, n) => Math.abs(a - n);
function r2(a, n) {
  const s = cv(a.x, n.x),
    r = cv(a.y, n.y);
  return Math.sqrt(s ** 2 + r ** 2);
}
const fv = new Set(["auto", "scroll"]);
class kb {
  constructor(
    n,
    s,
    {
      transformPagePoint: r,
      contextWindow: o = window,
      dragSnapToOrigin: f = !1,
      distanceThreshold: d = 3,
      element: h,
    } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.lastRawMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.scrollPositions = new Map()),
      (this.removeScrollListeners = null),
      (this.onElementScroll = (M) => {
        this.handleScroll(M.target);
      }),
      (this.onWindowScroll = () => {
        this.handleScroll(window);
      }),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        this.lastRawMoveEventInfo &&
          (this.lastMoveEventInfo = Ir(this.lastRawMoveEventInfo, this.transformPagePoint));
        const M = bf(this.lastMoveEventInfo, this.history),
          N = this.startEvent !== null,
          k = r2(M.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!N && !k) return;
        const { point: j } = M,
          { timestamp: q } = Te;
        this.history.push({ ...j, timestamp: q });
        const { onStart: Z, onMove: G } = this.handlers;
        (N || (Z && Z(this.lastMoveEvent, M), (this.startEvent = this.lastMoveEvent)),
          G && G(this.lastMoveEvent, M));
      }),
      (this.handlePointerMove = (M, N) => {
        ((this.lastMoveEvent = M),
          (this.lastRawMoveEventInfo = N),
          (this.lastMoveEventInfo = Ir(N, this.transformPagePoint)),
          Xt.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (M, N) => {
        this.end();
        const { onEnd: k, onSessionEnd: j, resumeAnimation: q } = this.handlers;
        if (
          ((this.dragSnapToOrigin || !this.startEvent) && q && q(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const Z = bf(
          M.type === "pointercancel" ? this.lastMoveEventInfo : Ir(N, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && k && k(M, Z), j && j(M, Z));
      }),
      !jd(n))
    )
      return;
    ((this.dragSnapToOrigin = f),
      (this.handlers = s),
      (this.transformPagePoint = r),
      (this.distanceThreshold = d),
      (this.contextWindow = o || window));
    const y = zl(n),
      p = Ir(y, this.transformPagePoint),
      { point: g } = p,
      { timestamp: b } = Te;
    this.history = [{ ...g, timestamp: b }];
    const { onSessionStart: x } = s;
    x && x(n, bf(p, this.history));
    const w = { passive: !0, capture: !0 };
    ((this.removeListeners = Dl(
      xl(this.contextWindow, "pointermove", this.handlePointerMove, w),
      xl(this.contextWindow, "pointerup", this.handlePointerUp, w),
      xl(this.contextWindow, "pointercancel", this.handlePointerUp, w),
    )),
      h && this.startScrollTracking(h));
  }
  startScrollTracking(n) {
    let s = n.parentElement;
    for (; s; ) {
      const r = getComputedStyle(s);
      ((fv.has(r.overflowX) || fv.has(r.overflowY)) &&
        this.scrollPositions.set(s, { x: s.scrollLeft, y: s.scrollTop }),
        (s = s.parentElement));
    }
    (this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }),
      window.addEventListener("scroll", this.onElementScroll, { capture: !0 }),
      window.addEventListener("scroll", this.onWindowScroll),
      (this.removeScrollListeners = () => {
        (window.removeEventListener("scroll", this.onElementScroll, { capture: !0 }),
          window.removeEventListener("scroll", this.onWindowScroll));
      }));
  }
  handleScroll(n) {
    const s = this.scrollPositions.get(n);
    if (!s) return;
    const r = n === window,
      o = r ? { x: window.scrollX, y: window.scrollY } : { x: n.scrollLeft, y: n.scrollTop },
      f = { x: o.x - s.x, y: o.y - s.y };
    (f.x === 0 && f.y === 0) ||
      (r
        ? this.lastMoveEventInfo &&
          ((this.lastMoveEventInfo.point.x += f.x), (this.lastMoveEventInfo.point.y += f.y))
        : this.history.length > 0 && ((this.history[0].x -= f.x), (this.history[0].y -= f.y)),
      this.scrollPositions.set(n, o),
      Xt.update(this.updatePoint, !0));
  }
  updateHandlers(n) {
    this.handlers = n;
  }
  end() {
    (this.removeListeners && this.removeListeners(),
      this.removeScrollListeners && this.removeScrollListeners(),
      this.scrollPositions.clear(),
      Pn(this.updatePoint));
  }
}
function Ir(a, n) {
  return n ? { point: n(a.point) } : a;
}
function dv(a, n) {
  return { x: a.x - n.x, y: a.y - n.y };
}
function bf({ point: a }, n) {
  return { point: a, delta: dv(a, Nb(n)), offset: dv(a, o2(n)), velocity: u2(n, 0.1) };
}
function o2(a) {
  return a[0];
}
function Nb(a) {
  return a[a.length - 1];
}
function u2(a, n) {
  if (a.length < 2) return { x: 0, y: 0 };
  let s = a.length - 1,
    r = null;
  const o = Nb(a);
  for (; s >= 0 && ((r = a[s]), !(o.timestamp - r.timestamp > Ve(n))); ) s--;
  if (!r) return { x: 0, y: 0 };
  r === a[0] && a.length > 2 && o.timestamp - r.timestamp > Ve(n) * 2 && (r = a[1]);
  const f = ln(o.timestamp - r.timestamp);
  if (f === 0) return { x: 0, y: 0 };
  const d = { x: (o.x - r.x) / f, y: (o.y - r.y) / f };
  return (d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d);
}
function c2(a, { min: n, max: s }, r) {
  return (
    n !== void 0 && a < n
      ? (a = r ? Yt(n, a, r.min) : Math.max(a, n))
      : s !== void 0 && a > s && (a = r ? Yt(s, a, r.max) : Math.min(a, s)),
    a
  );
}
function hv(a, n, s) {
  return { min: n !== void 0 ? a.min + n : void 0, max: s !== void 0 ? a.max + s - (a.max - a.min) : void 0 };
}
function f2(a, { top: n, left: s, bottom: r, right: o }) {
  return { x: hv(a.x, s, o), y: hv(a.y, n, r) };
}
function mv(a, n) {
  let s = n.min - a.min,
    r = n.max - a.max;
  return (n.max - n.min < a.max - a.min && ([s, r] = [r, s]), { min: s, max: r });
}
function d2(a, n) {
  return { x: mv(a.x, n.x), y: mv(a.y, n.y) };
}
function h2(a, n) {
  let s = 0.5;
  const r = Ce(a),
    o = Ce(n);
  return (
    o > r ? (s = ls(n.min, n.max - r, a.min)) : r > o && (s = ls(a.min, a.max - o, n.min)),
    En(0, 1, s)
  );
}
function m2(a, n) {
  const s = {};
  return (n.min !== void 0 && (s.min = n.min - a.min), n.max !== void 0 && (s.max = n.max - a.min), s);
}
const Ff = 0.35;
function p2(a = Ff) {
  return (
    a === !1 ? (a = 0) : a === !0 && (a = Ff),
    { x: pv(a, "left", "right"), y: pv(a, "top", "bottom") }
  );
}
function pv(a, n, s) {
  return { min: yv(a, n), max: yv(a, s) };
}
function yv(a, n) {
  return typeof a == "number" ? a : a[n] || 0;
}
const y2 = new WeakMap();
class g2 {
  constructor(n) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = oe()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = n));
  }
  start(n, { snapToCursor: s = !1, distanceThreshold: r } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1) return;
    const f = (b) => {
        (s && this.snapToCursor(zl(b).point), this.stopAnimation());
      },
      d = (b, x) => {
        const { drag: w, dragPropagation: M, onDragStart: N } = this.getProps();
        if (
          w &&
          !M &&
          (this.openDragLock && this.openDragLock(), (this.openDragLock = QA(w)), !this.openDragLock)
        )
          return;
        ((this.latestPointerEvent = b),
          (this.latestPanInfo = x),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          Sn((j) => {
            let q = this.getAxisMotionValue(j).get() || 0;
            if (An.test(q)) {
              const { projection: Z } = this.visualElement;
              if (Z && Z.layout) {
                const G = Z.layout.layoutBox[j];
                G && (q = Ce(G) * (parseFloat(q) / 100));
              }
            }
            this.originPoint[j] = q;
          }),
          N && Xt.update(() => N(b, x), !1, !0),
          Hf(this.visualElement, "transform"));
        const { animationState: k } = this.visualElement;
        k && k.setActive("whileDrag", !0);
      },
      h = (b, x) => {
        ((this.latestPointerEvent = b), (this.latestPanInfo = x));
        const { dragPropagation: w, dragDirectionLock: M, onDirectionLock: N, onDrag: k } = this.getProps();
        if (!w && !this.openDragLock) return;
        const { offset: j } = x;
        if (M && this.currentDirection === null) {
          ((this.currentDirection = b2(j)), this.currentDirection !== null && N && N(this.currentDirection));
          return;
        }
        (this.updateAxis("x", x.point, j),
          this.updateAxis("y", x.point, j),
          this.visualElement.render(),
          k && Xt.update(() => k(b, x), !1, !0));
      },
      y = (b, x) => {
        ((this.latestPointerEvent = b),
          (this.latestPanInfo = x),
          this.stop(b, x),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null));
      },
      p = () => {
        const { dragSnapToOrigin: b } = this.getProps();
        (b || this.constraints) && this.startAnimation({ x: 0, y: 0 });
      },
      { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new kb(
      n,
      { onSessionStart: f, onStart: d, onMove: h, onSessionEnd: y, resumeAnimation: p },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: g,
        distanceThreshold: r,
        contextWindow: zb(this.visualElement),
        element: this.visualElement.current,
      },
    );
  }
  stop(n, s) {
    const r = n || this.latestPointerEvent,
      o = s || this.latestPanInfo,
      f = this.isDragging;
    if ((this.cancel(), !f || !o || !r)) return;
    const { velocity: d } = o;
    this.startAnimation(d);
    const { onDragEnd: h } = this.getProps();
    h && Xt.postRender(() => h(r, o));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: n, animationState: s } = this.visualElement;
    (n && (n.isAnimationBlocked = !1), this.endPanSession());
    const { dragPropagation: r } = this.getProps();
    (!r && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
      s && s.setActive("whileDrag", !1));
  }
  endPanSession() {
    (this.panSession && this.panSession.end(), (this.panSession = void 0));
  }
  updateAxis(n, s, r) {
    const { drag: o } = this.getProps();
    if (!r || !to(n, o, this.currentDirection)) return;
    const f = this.getAxisMotionValue(n);
    let d = this.originPoint[n] + r[n];
    (this.constraints && this.constraints[n] && (d = c2(d, this.constraints[n], this.elastic[n])), f.set(d));
  }
  resolveConstraints() {
    var f;
    const { dragConstraints: n, dragElastic: s } = this.getProps(),
      r =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (f = this.visualElement.projection) == null
            ? void 0
            : f.layout,
      o = this.constraints;
    (n && Ii(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && r
        ? (this.constraints = f2(r.layoutBox, n))
        : (this.constraints = !1),
      (this.elastic = p2(s)),
      o !== this.constraints &&
        !Ii(n) &&
        r &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        Sn((d) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(d) &&
            (this.constraints[d] = m2(r.layoutBox[d], this.constraints[d]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: n, onMeasureDragConstraints: s } = this.getProps();
    if (!n || !Ii(n)) return !1;
    const r = n.current,
      { projection: o } = this.visualElement;
    if (!o || !o.layout) return !1;
    o.root && ((o.root.scroll = void 0), o.root.updateScroll());
    const f = x_(r, o.root, this.visualElement.getTransformPagePoint());
    let d = d2(o.layout.layoutBox, f);
    if (s) {
      const h = s(g_(d));
      ((this.hasMutatedConstraints = !!h), h && (d = $0(h)));
    }
    return d;
  }
  startAnimation(n) {
    const {
        drag: s,
        dragMomentum: r,
        dragElastic: o,
        dragTransition: f,
        dragSnapToOrigin: d,
        onDragTransitionEnd: h,
      } = this.getProps(),
      y = this.constraints || {},
      p = Sn((g) => {
        if (!to(g, s, this.currentDirection)) return;
        let b = (y && y[g]) || {};
        (d === !0 || d === g) && (b = { min: 0, max: 0 });
        const x = o ? 200 : 1e6,
          w = o ? 40 : 1e7,
          M = {
            type: "inertia",
            velocity: r ? n[g] : 0,
            bounceStiffness: x,
            bounceDamping: w,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...f,
            ...b,
          };
        return this.startAxisValueAnimation(g, M);
      });
    return Promise.all(p).then(h);
  }
  startAxisValueAnimation(n, s) {
    const r = this.getAxisMotionValue(n);
    return (Hf(this.visualElement, n), r.start(Cd(n, r, 0, s, this.visualElement, !1)));
  }
  stopAnimation() {
    Sn((n) => this.getAxisMotionValue(n).stop());
  }
  getAxisMotionValue(n) {
    const s = `_drag${n.toUpperCase()}`,
      o = this.visualElement.getProps()[s];
    return o || this.visualElement.getValue(n, this.visualElement.latestValues[n] ?? 0);
  }
  snapToCursor(n) {
    Sn((s) => {
      const { drag: r } = this.getProps();
      if (!to(s, r, this.currentDirection)) return;
      const { projection: o } = this.visualElement,
        f = this.getAxisMotionValue(s);
      if (o && o.layout) {
        const { min: d, max: h } = o.layout.layoutBox[s],
          y = f.get() || 0;
        f.set(n[s] - Yt(d, h, 0.5) + y);
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: n, dragConstraints: s } = this.getProps(),
      { projection: r } = this.visualElement;
    if (!Ii(s) || !r || !this.constraints) return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    Sn((d) => {
      const h = this.getAxisMotionValue(d);
      if (h && this.constraints !== !1) {
        const y = h.get();
        o[d] = h2({ min: y, max: y }, this.constraints[d]);
      }
    });
    const { transformTemplate: f } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = f ? f({}, "") : "none"),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      (this.constraints = !1),
      this.resolveConstraints(),
      Sn((d) => {
        if (!to(d, n, null)) return;
        const h = this.getAxisMotionValue(d),
          { min: y, max: p } = this.constraints[d];
        h.set(Yt(y, p, o[d]));
      }),
      this.visualElement.render());
  }
  addListeners() {
    if (!this.visualElement.current) return;
    y2.set(this.visualElement, this);
    const n = this.visualElement.current,
      s = xl(n, "pointerdown", (p) => {
        const { drag: g, dragListener: b = !0 } = this.getProps(),
          x = p.target,
          w = x !== n && IA(x);
        g && b && !w && this.start(p);
      });
    let r;
    const o = () => {
        const { dragConstraints: p } = this.getProps();
        Ii(p) &&
          p.current &&
          ((this.constraints = this.resolveRefConstraints()),
          r || (r = v2(n, p.current, () => this.scalePositionWithinConstraints())));
      },
      { projection: f } = this.visualElement,
      d = f.addEventListener("measure", o);
    (f && !f.layout && (f.root && f.root.updateScroll(), f.updateLayout()), Xt.read(o));
    const h = El(window, "resize", () => this.scalePositionWithinConstraints()),
      y = f.addEventListener("didUpdate", ({ delta: p, hasLayoutChanged: g }) => {
        this.isDragging &&
          g &&
          (Sn((b) => {
            const x = this.getAxisMotionValue(b);
            x && ((this.originPoint[b] += p[b].translate), x.set(x.get() + p[b].translate));
          }),
          this.visualElement.render());
      });
    return () => {
      (h(), s(), d(), y && y(), r && r());
    };
  }
  getProps() {
    const n = this.visualElement.getProps(),
      {
        drag: s = !1,
        dragDirectionLock: r = !1,
        dragPropagation: o = !1,
        dragConstraints: f = !1,
        dragElastic: d = Ff,
        dragMomentum: h = !0,
      } = n;
    return {
      ...n,
      drag: s,
      dragDirectionLock: r,
      dragPropagation: o,
      dragConstraints: f,
      dragElastic: d,
      dragMomentum: h,
    };
  }
}
function gv(a) {
  let n = !0;
  return () => {
    if (n) {
      n = !1;
      return;
    }
    a();
  };
}
function v2(a, n, s) {
  const r = _g(a, gv(s)),
    o = _g(n, gv(s));
  return () => {
    (r(), o());
  };
}
function to(a, n, s) {
  return (n === !0 || n === a) && (s === null || s === a);
}
function b2(a, n = 10) {
  let s = null;
  return (Math.abs(a.y) > n ? (s = "y") : Math.abs(a.x) > n && (s = "x"), s);
}
class x2 extends za {
  constructor(n) {
    (super(n), (this.removeGroupControls = rn), (this.removeListeners = rn), (this.controls = new g2(n)));
  }
  mount() {
    const { dragControls: n } = this.node.getProps();
    (n && (this.removeGroupControls = n.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || rn));
  }
  update() {
    const { dragControls: n } = this.node.getProps(),
      { dragControls: s } = this.node.prevProps || {};
    n !== s && (this.removeGroupControls(), n && (this.removeGroupControls = n.subscribe(this.controls)));
  }
  unmount() {
    (this.removeGroupControls(),
      this.removeListeners(),
      this.controls.isDragging || this.controls.endPanSession());
  }
}
const xf = (a) => (n, s) => {
  a && Xt.update(() => a(n, s), !1, !0);
};
class S2 extends za {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = rn));
  }
  onPointerDown(n) {
    this.session = new kb(n, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: zb(this.node),
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: n, onPanStart: s, onPan: r, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: xf(n),
      onStart: xf(s),
      onMove: xf(r),
      onEnd: (f, d) => {
        (delete this.session, o && Xt.postRender(() => o(f, d)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = xl(this.node.current, "pointerdown", (n) => this.onPointerDown(n));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
let Sf = !1;
class T2 extends F.Component {
  componentDidMount() {
    const { visualElement: n, layoutGroup: s, switchLayoutGroup: r, layoutId: o } = this.props,
      { projection: f } = n;
    (f &&
      (s.group && s.group.add(f),
      r && r.register && o && r.register(f),
      Sf && f.root.didUpdate(),
      f.addEventListener("animationComplete", () => {
        this.safeToRemove();
      }),
      f.setOptions({
        ...f.options,
        layoutDependency: this.props.layoutDependency,
        onExitComplete: () => this.safeToRemove(),
      })),
      (co.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(n) {
    const { layoutDependency: s, visualElement: r, drag: o, isPresent: f } = this.props,
      { projection: d } = r;
    return (
      d &&
        ((d.isPresent = f),
        n.layoutDependency !== s && d.setOptions({ ...d.options, layoutDependency: s }),
        (Sf = !0),
        o || n.layoutDependency !== s || s === void 0 || n.isPresent !== f
          ? d.willUpdate()
          : this.safeToRemove(),
        n.isPresent !== f &&
          (f
            ? d.promote()
            : d.relegate() ||
              Xt.postRender(() => {
                const h = d.getStack();
                (!h || !h.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { visualElement: n, layoutAnchor: s } = this.props,
      { projection: r } = n;
    r &&
      ((r.options.layoutAnchor = s),
      r.root.didUpdate(),
      Nd.postRender(() => {
        !r.currentAnimation && r.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const { visualElement: n, layoutGroup: s, switchLayoutGroup: r } = this.props,
      { projection: o } = n;
    ((Sf = !0),
      o &&
        (o.scheduleCheckAfterUnmount(),
        s && s.group && s.group.remove(o),
        r && r.deregister && r.deregister(o)));
  }
  safeToRemove() {
    const { safeToRemove: n } = this.props;
    n && n();
  }
  render() {
    return null;
  }
}
function jb(a) {
  const [n, s] = Tb(),
    r = F.useContext(dd);
  return _.jsx(T2, {
    ...a,
    layoutGroup: r,
    switchLayoutGroup: F.useContext(Rb),
    isPresent: n,
    safeToRemove: s,
  });
}
const A2 = { pan: { Feature: S2 }, drag: { Feature: x2, ProjectionNode: Sb, MeasureLayout: jb } };
function vv(a, n, s) {
  const { props: r } = a;
  a.animationState && r.whileHover && a.animationState.setActive("whileHover", s === "Start");
  const o = "onHover" + s,
    f = r[o];
  f && Xt.postRender(() => f(n, zl(n)));
}
class _2 extends za {
  mount() {
    const { current: n } = this.node;
    n && (this.unmount = PA(n, (s, r) => (vv(this.node, r, "Start"), (o) => vv(this.node, o, "End"))));
  }
  unmount() {}
}
class E2 extends za {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let n = !1;
    try {
      n = this.node.current.matches(":focus-visible");
    } catch {
      n = !0;
    }
    !n ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0), (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1), (this.isActive = !1));
  }
  mount() {
    this.unmount = Dl(
      El(this.node.current, "focus", () => this.onFocus()),
      El(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function bv(a, n, s) {
  const { props: r } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled) return;
  a.animationState && r.whileTap && a.animationState.setActive("whileTap", s === "Start");
  const o = "onTap" + (s === "End" ? "" : s),
    f = r[o];
  f && Xt.postRender(() => f(n, zl(n)));
}
class w2 extends za {
  mount() {
    const { current: n } = this.node;
    if (!n) return;
    const { globalTapTarget: s, propagate: r } = this.node.props;
    this.unmount = e_(
      n,
      (o, f) => (bv(this.node, f, "Start"), (d, { success: h }) => bv(this.node, d, h ? "End" : "Cancel")),
      { useGlobalTarget: s, stopPropagation: (r == null ? void 0 : r.tap) === !1 },
    );
  }
  unmount() {}
}
const Wf = new WeakMap(),
  Tf = new WeakMap(),
  M2 = (a) => {
    const n = Wf.get(a.target);
    n && n(a);
  },
  C2 = (a) => {
    a.forEach(M2);
  };
function D2({ root: a, ...n }) {
  const s = a || document;
  Tf.has(s) || Tf.set(s, {});
  const r = Tf.get(s),
    o = JSON.stringify(n);
  return (r[o] || (r[o] = new IntersectionObserver(C2, { root: a, ...n })), r[o]);
}
function R2(a, n, s) {
  const r = D2(n);
  return (
    Wf.set(a, s),
    r.observe(a),
    () => {
      (Wf.delete(a), r.unobserve(a));
    }
  );
}
const O2 = { some: 0, all: 1 };
class z2 extends za {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    var y;
    (y = this.stopObserver) == null || y.call(this);
    const { viewport: n = {} } = this.node.getProps(),
      { root: s, margin: r, amount: o = "some", once: f } = n,
      d = { root: s ? s.current : void 0, rootMargin: r, threshold: typeof o == "number" ? o : O2[o] },
      h = (p) => {
        const { isIntersecting: g } = p;
        if (this.isInView === g || ((this.isInView = g), f && !g && this.hasEnteredView)) return;
        (g && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive("whileInView", g));
        const { onViewportEnter: b, onViewportLeave: x } = this.node.getProps(),
          w = g ? b : x;
        w && w(p);
      };
    this.stopObserver = R2(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: n, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(k2(n, s)) && this.startObserver();
  }
  unmount() {
    var n;
    ((n = this.stopObserver) == null || n.call(this), (this.hasEnteredView = !1), (this.isInView = !1));
  }
}
function k2({ viewport: a = {} }, { viewport: n = {} } = {}) {
  return (s) => a[s] !== n[s];
}
const N2 = { inView: { Feature: z2 }, tap: { Feature: w2 }, focus: { Feature: E2 }, hover: { Feature: _2 } },
  j2 = { layout: { ProjectionNode: Sb, MeasureLayout: jb } },
  V2 = { ...s2, ...N2, ...A2, ...j2 },
  U2 = t2(V2, e2);
function Vb(a) {
  const n = Cl(() => Da(a)),
    { isStatic: s } = F.useContext(Vo);
  if (s) {
    const [, r] = F.useState(a);
    F.useEffect(() => n.on("change", r), []);
  }
  return n;
}
function Ub(a, n) {
  const s = Vb(n()),
    r = () => s.set(n());
  return (
    r(),
    Ro(() => {
      const o = () => Xt.preRender(r, !1, !0),
        f = a.map((d) => d.on("change", o));
      return () => {
        (f.forEach((d) => d()), Pn(r));
      };
    }),
    s
  );
}
function B2(a) {
  ((vl.current = []), a());
  const n = Ub(vl.current, a);
  return ((vl.current = void 0), n);
}
function xv(a, n, s, r) {
  if (typeof a == "function") return B2(a);
  const f = typeof n == "function" ? n : c_(n, s, r),
    d = Array.isArray(a) ? Sv(a, f) : Sv([a], ([y]) => f(y)),
    h = Array.isArray(a) ? void 0 : a.accelerate;
  return (
    h &&
      !h.isTransformed &&
      typeof n != "function" &&
      Array.isArray(s) &&
      (r == null ? void 0 : r.clamp) !== !1 &&
      (d.accelerate = { ...h, times: n, keyframes: s, isTransformed: !0 }),
    d
  );
}
function Sv(a, n) {
  const s = Cl(() => []);
  return Ub(a, () => {
    s.length = 0;
    const r = a.length;
    for (let o = 0; o < r; o++) s[o] = a[o].get();
    return n(s);
  });
}
function Gd(a) {
  return typeof a == "object" && !Array.isArray(a);
}
function Bb(a, n, s, r) {
  return a == null
    ? []
    : typeof a == "string" && Gd(n)
      ? kd(a, s, r)
      : a instanceof NodeList
        ? Array.from(a)
        : Array.isArray(a)
          ? a.filter((o) => o != null)
          : [a];
}
function L2(a, n, s) {
  return a * (n + 1) + s * n;
}
function Tv(a, n, s, r) {
  return typeof n == "number"
    ? n
    : n.startsWith("-") || n.startsWith("+")
      ? Math.max(0, a + parseFloat(n))
      : n === "<"
        ? s
        : n.startsWith("<")
          ? Math.max(0, s + parseFloat(n.slice(1)))
          : (r.get(n) ?? a);
}
function H2(a, n, s) {
  for (let r = 0; r < a.length; r++) {
    const o = a[r];
    o.at > n && o.at < s && (ss(a, o), r--);
  }
}
function Z2(a, n, s, r, o, f) {
  H2(a, o, f);
  for (let d = 0; d < n.length; d++) a.push({ value: n[d], at: Yt(o, f, r[d]), easing: s0(s, d) });
}
function G2(a, n, s = 0) {
  const r = n + 1 + n * s;
  for (let o = 0; o < a.length; o++) a[o] = a[o] / r;
}
function q2(a, n) {
  return a.at === n.at ? (a.value === null ? 1 : n.value === null ? -1 : 0) : a.at - n.at;
}
const Y2 = "easeInOut",
  X2 = 20;
function K2(a, { defaultTransition: n = {}, ...s } = {}, r, o) {
  const f = n.duration || 0.3,
    d = new Map(),
    h = new Map(),
    y = {},
    p = new Map();
  let g = 0,
    b = 0,
    x = 0;
  for (let w = 0; w < a.length; w++) {
    const M = a[w];
    if (typeof M == "string") {
      p.set(M, b);
      continue;
    } else if (!Array.isArray(M)) {
      p.set(M.name, Tv(b, M.at, g, p));
      continue;
    }
    let [N, k, j = {}] = M;
    j.at !== void 0 && (b = Tv(b, j.at, g, p));
    let q = 0;
    const Z = (G, $, ot, K = 0, V = 0) => {
      const J = Q2(G),
        {
          delay: et = 0,
          times: mt = S0(J),
          type: St = n.type || "keyframes",
          repeat: Qt,
          repeatType: Ht,
          repeatDelay: Vt = 0,
          ...O
        } = $;
      let { ease: X = n.ease || "easeOut", duration: P } = $;
      const pt = typeof et == "function" ? et(K, V) : et,
        Q = J.length,
        T = wd(St) ? St : o == null ? void 0 : o[St || "keyframes"];
      if (Q <= 2 && T) {
        let nt = 100;
        if (Q === 2 && F2(J)) {
          const Ft = J[1] - J[0];
          nt = Math.abs(Ft);
        }
        const ct = { ...n, ...O };
        P !== void 0 && (ct.duration = Ve(P));
        const At = g0(ct, nt, T);
        ((X = At.ease), (P = At.duration));
      }
      P ?? (P = f);
      const B = b + pt;
      mt.length === 1 && mt[0] === 0 && (mt[1] = 1);
      const W = mt.length - J.length;
      if ((W > 0 && x0(mt, W), J.length === 1 && J.unshift(null), Qt && Qt < X2)) {
        const nt = P > 0 ? Vt / P : 0;
        P = L2(P, Qt, Vt);
        const ct = [...J],
          At = [...mt];
        X = Array.isArray(X) ? [...X] : [X];
        const Ft = [...X],
          bt = Ht === "reverse" || Ht === "mirror";
        let un = ct,
          Je = Ft;
        bt &&
          ((un = [...ct].reverse()),
          Ht === "reverse" && (Je = [...Ft].reverse().map((ye) => (typeof ye == "function" ? yd(ye) : ye))));
        for (let ye = 0; ye < Qt; ye++) {
          const wn = bt && ye % 2 === 0,
            Ee = wn ? un : ct,
            ps = wn ? Je : Ft,
            mi = (ye + 1) * (1 + nt);
          (nt > 0 && (J.push(J[J.length - 1]), mt.push(mi), X.push("linear")), J.push(...Ee));
          for (let ja = 0; ja < Ee.length; ja++)
            (mt.push(At[ja] + mi), X.push(ja === 0 ? "linear" : s0(ps, ja - 1)));
        }
        G2(mt, Qt, nt);
      }
      const tt = B + P;
      (Z2(ot, J, X, mt, B, tt), (q = Math.max(pt + P, q)), (x = Math.max(tt, x)));
    };
    if (he(N)) {
      const G = Av(N, h);
      Z(k, j, _v("default", G));
    } else {
      const G = Bb(N, k, r, y),
        $ = G.length;
      for (let ot = 0; ot < $; ot++) {
        ((k = k), (j = j));
        const K = G[ot],
          V = Av(K, h);
        for (const J in k) Z(k[J], J2(j, J), _v(J, V), ot, $);
      }
    }
    ((g = b), (b += q));
  }
  return (
    h.forEach((w, M) => {
      for (const N in w) {
        const k = w[N];
        k.sort(q2);
        const j = [],
          q = [],
          Z = [];
        for (let K = 0; K < k.length; K++) {
          const { at: V, value: J, easing: et } = k[K];
          (j.push(J), q.push(ls(0, x, V)), Z.push(et || "easeOut"));
        }
        (q[0] !== 0 && (q.unshift(0), j.unshift(j[0]), Z.unshift(Y2)),
          q[q.length - 1] !== 1 && (q.push(1), j.push(null)),
          d.has(M) || d.set(M, { keyframes: {}, transition: {} }));
        const G = d.get(M);
        G.keyframes[N] = j;
        const { type: $, ...ot } = n;
        G.transition[N] = { ...ot, duration: x, ease: Z, times: q, ...s };
      }
    }),
    d
  );
}
function Av(a, n) {
  return (!n.has(a) && n.set(a, {}), n.get(a));
}
function _v(a, n) {
  return (n[a] || (n[a] = []), n[a]);
}
function Q2(a) {
  return Array.isArray(a) ? a : [a];
}
function J2(a, n) {
  return a && a[n] ? { ...a, ...a[n] } : { ...a };
}
const P2 = (a) => typeof a == "number",
  F2 = (a) => a.every(P2);
function W2(a) {
  const n = {
      presenceContext: null,
      props: {},
      visualState: {
        renderState: { transform: {}, transformOrigin: {}, style: {}, vars: {}, attrs: {} },
        latestValues: {},
      },
    },
    s = ko(a) && !K0(a) ? new ub(n) : new ib(n);
  (s.mount(a), Al.set(a, s));
}
function $2(a) {
  const n = {
      presenceContext: null,
      props: {},
      visualState: { renderState: { output: {} }, latestValues: {} },
    },
    s = new M_(n);
  (s.mount(a), Al.set(a, s));
}
function I2(a, n) {
  return he(a) || typeof a == "number" || (typeof a == "string" && !Gd(n));
}
function Lb(a, n, s, r) {
  const o = [];
  if (I2(a, n)) o.push(gb(a, (Gd(n) && n.default) || n, s && (s.default || s)));
  else {
    if (a == null) return o;
    const f = Bb(a, n, r),
      d = f.length;
    for (let h = 0; h < d; h++) {
      const y = f[h],
        p = y instanceof Element ? W2 : $2;
      Al.has(y) || p(y);
      const g = Al.get(y),
        b = { ...s };
      ("delay" in b && typeof b.delay == "function" && (b.delay = b.delay(h, d)),
        o.push(...Od(g, { ...n, transition: b }, {})));
    }
  }
  return o;
}
function tw(a, n, s) {
  const r = [],
    o = a.map((d) => {
      if (Array.isArray(d) && typeof d[0] == "function") {
        const h = d[0],
          y = Da(0);
        return (
          y.on("change", h),
          d.length === 1 ? [y, [0, 1]] : d.length === 2 ? [y, [0, 1], d[1]] : [y, d[1], d[2]]
        );
      }
      return d;
    });
  return (
    K2(o, n, s, { spring: Tl }).forEach(({ keyframes: d, transition: h }, y) => {
      r.push(...Lb(y, d, h));
    }),
    r
  );
}
function ew(a) {
  return Array.isArray(a) && a.some(Array.isArray);
}
function nw(a = {}) {
  const { scope: n, reduceMotion: s, skipAnimations: r } = a;
  function o(f, d, h) {
    let y = [],
      p;
    const g = {};
    if ((s !== void 0 && (g.reduceMotion = s), r !== void 0 && (g.skipAnimations = r), ew(f))) {
      const { onComplete: x, ...w } = d || {};
      (typeof x == "function" && (p = x), (y = tw(f, { ...g, ...w }, n)));
    } else {
      const { onComplete: x, ...w } = h || {};
      (typeof x == "function" && (p = x), (y = Lb(f, d, { ...g, ...w }, n)));
    }
    const b = new yA(y);
    return (
      p && b.finished.then(p),
      n &&
        (n.animations.push(b),
        b.finished.then(() => {
          ss(n.animations, b);
        })),
      b
    );
  }
  return o;
}
const aw = nw(),
  Ae = U2;
function Hb(a) {
  var n,
    s,
    r = "";
  if (typeof a == "string" || typeof a == "number") r += a;
  else if (typeof a == "object")
    if (Array.isArray(a)) {
      var o = a.length;
      for (n = 0; n < o; n++) a[n] && (s = Hb(a[n])) && (r && (r += " "), (r += s));
    } else for (s in a) a[s] && (r && (r += " "), (r += s));
  return r;
}
function iw() {
  for (var a, n, s = 0, r = "", o = arguments.length; s < o; s++)
    (a = arguments[s]) && (n = Hb(a)) && (r && (r += " "), (r += n));
  return r;
}
const sw = (a, n) => {
    const s = new Array(a.length + n.length);
    for (let r = 0; r < a.length; r++) s[r] = a[r];
    for (let r = 0; r < n.length; r++) s[a.length + r] = n[r];
    return s;
  },
  lw = (a, n) => ({ classGroupId: a, validator: n }),
  Zb = (a = new Map(), n = null, s) => ({ nextPart: a, validators: n, classGroupId: s }),
  xo = "-",
  Ev = [],
  rw = "arbitrary..",
  ow = (a) => {
    const n = cw(a),
      { conflictingClassGroups: s, conflictingClassGroupModifiers: r } = a;
    return {
      getClassGroupId: (d) => {
        if (d.startsWith("[") && d.endsWith("]")) return uw(d);
        const h = d.split(xo),
          y = h[0] === "" && h.length > 1 ? 1 : 0;
        return Gb(h, y, n);
      },
      getConflictingClassGroupIds: (d, h) => {
        if (h) {
          const y = r[d],
            p = s[d];
          return y ? (p ? sw(p, y) : y) : p || Ev;
        }
        return s[d] || Ev;
      },
    };
  },
  Gb = (a, n, s) => {
    if (a.length - n === 0) return s.classGroupId;
    const o = a[n],
      f = s.nextPart.get(o);
    if (f) {
      const p = Gb(a, n + 1, f);
      if (p) return p;
    }
    const d = s.validators;
    if (d === null) return;
    const h = n === 0 ? a.join(xo) : a.slice(n).join(xo),
      y = d.length;
    for (let p = 0; p < y; p++) {
      const g = d[p];
      if (g.validator(h)) return g.classGroupId;
    }
  },
  uw = (a) =>
    a.slice(1, -1).indexOf(":") === -1
      ? void 0
      : (() => {
          const n = a.slice(1, -1),
            s = n.indexOf(":"),
            r = n.slice(0, s);
          return r ? rw + r : void 0;
        })(),
  cw = (a) => {
    const { theme: n, classGroups: s } = a;
    return fw(s, n);
  },
  fw = (a, n) => {
    const s = Zb();
    for (const r in a) {
      const o = a[r];
      qd(o, s, r, n);
    }
    return s;
  },
  qd = (a, n, s, r) => {
    const o = a.length;
    for (let f = 0; f < o; f++) {
      const d = a[f];
      dw(d, n, s, r);
    }
  },
  dw = (a, n, s, r) => {
    if (typeof a == "string") {
      hw(a, n, s);
      return;
    }
    if (typeof a == "function") {
      mw(a, n, s, r);
      return;
    }
    pw(a, n, s, r);
  },
  hw = (a, n, s) => {
    const r = a === "" ? n : qb(n, a);
    r.classGroupId = s;
  },
  mw = (a, n, s, r) => {
    if (yw(a)) {
      qd(a(r), n, s, r);
      return;
    }
    (n.validators === null && (n.validators = []), n.validators.push(lw(s, a)));
  },
  pw = (a, n, s, r) => {
    const o = Object.entries(a),
      f = o.length;
    for (let d = 0; d < f; d++) {
      const [h, y] = o[d];
      qd(y, qb(n, h), s, r);
    }
  },
  qb = (a, n) => {
    let s = a;
    const r = n.split(xo),
      o = r.length;
    for (let f = 0; f < o; f++) {
      const d = r[f];
      let h = s.nextPart.get(d);
      (h || ((h = Zb()), s.nextPart.set(d, h)), (s = h));
    }
    return s;
  },
  yw = (a) => "isThemeGetter" in a && a.isThemeGetter === !0,
  gw = (a) => {
    if (a < 1) return { get: () => {}, set: () => {} };
    let n = 0,
      s = Object.create(null),
      r = Object.create(null);
    const o = (f, d) => {
      ((s[f] = d), n++, n > a && ((n = 0), (r = s), (s = Object.create(null))));
    };
    return {
      get(f) {
        let d = s[f];
        if (d !== void 0) return d;
        if ((d = r[f]) !== void 0) return (o(f, d), d);
      },
      set(f, d) {
        f in s ? (s[f] = d) : o(f, d);
      },
    };
  },
  $f = "!",
  wv = ":",
  vw = [],
  Mv = (a, n, s, r, o) => ({
    modifiers: a,
    hasImportantModifier: n,
    baseClassName: s,
    maybePostfixModifierPosition: r,
    isExternal: o,
  }),
  bw = (a) => {
    const { prefix: n, experimentalParseClassName: s } = a;
    let r = (o) => {
      const f = [];
      let d = 0,
        h = 0,
        y = 0,
        p;
      const g = o.length;
      for (let N = 0; N < g; N++) {
        const k = o[N];
        if (d === 0 && h === 0) {
          if (k === wv) {
            (f.push(o.slice(y, N)), (y = N + 1));
            continue;
          }
          if (k === "/") {
            p = N;
            continue;
          }
        }
        k === "[" ? d++ : k === "]" ? d-- : k === "(" ? h++ : k === ")" && h--;
      }
      const b = f.length === 0 ? o : o.slice(y);
      let x = b,
        w = !1;
      b.endsWith($f) ? ((x = b.slice(0, -1)), (w = !0)) : b.startsWith($f) && ((x = b.slice(1)), (w = !0));
      const M = p && p > y ? p - y : void 0;
      return Mv(f, w, x, M);
    };
    if (n) {
      const o = n + wv,
        f = r;
      r = (d) => (d.startsWith(o) ? f(d.slice(o.length)) : Mv(vw, !1, d, void 0, !0));
    }
    if (s) {
      const o = r;
      r = (f) => s({ className: f, parseClassName: o });
    }
    return r;
  },
  xw = (a) => {
    const n = new Map();
    return (
      a.orderSensitiveModifiers.forEach((s, r) => {
        n.set(s, 1e6 + r);
      }),
      (s) => {
        const r = [];
        let o = [];
        for (let f = 0; f < s.length; f++) {
          const d = s[f],
            h = d[0] === "[",
            y = n.has(d);
          h || y ? (o.length > 0 && (o.sort(), r.push(...o), (o = [])), r.push(d)) : o.push(d);
        }
        return (o.length > 0 && (o.sort(), r.push(...o)), r);
      }
    );
  },
  Sw = (a) => ({ cache: gw(a.cacheSize), parseClassName: bw(a), sortModifiers: xw(a), ...ow(a) }),
  Tw = /\s+/,
  Aw = (a, n) => {
    const { parseClassName: s, getClassGroupId: r, getConflictingClassGroupIds: o, sortModifiers: f } = n,
      d = [],
      h = a.trim().split(Tw);
    let y = "";
    for (let p = h.length - 1; p >= 0; p -= 1) {
      const g = h[p],
        {
          isExternal: b,
          modifiers: x,
          hasImportantModifier: w,
          baseClassName: M,
          maybePostfixModifierPosition: N,
        } = s(g);
      if (b) {
        y = g + (y.length > 0 ? " " + y : y);
        continue;
      }
      let k = !!N,
        j = r(k ? M.substring(0, N) : M);
      if (!j) {
        if (!k) {
          y = g + (y.length > 0 ? " " + y : y);
          continue;
        }
        if (((j = r(M)), !j)) {
          y = g + (y.length > 0 ? " " + y : y);
          continue;
        }
        k = !1;
      }
      const q = x.length === 0 ? "" : x.length === 1 ? x[0] : f(x).join(":"),
        Z = w ? q + $f : q,
        G = Z + j;
      if (d.indexOf(G) > -1) continue;
      d.push(G);
      const $ = o(j, k);
      for (let ot = 0; ot < $.length; ++ot) {
        const K = $[ot];
        d.push(Z + K);
      }
      y = g + (y.length > 0 ? " " + y : y);
    }
    return y;
  },
  _w = (...a) => {
    let n = 0,
      s,
      r,
      o = "";
    for (; n < a.length; ) (s = a[n++]) && (r = Yb(s)) && (o && (o += " "), (o += r));
    return o;
  },
  Yb = (a) => {
    if (typeof a == "string") return a;
    let n,
      s = "";
    for (let r = 0; r < a.length; r++) a[r] && (n = Yb(a[r])) && (s && (s += " "), (s += n));
    return s;
  },
  Ew = (a, ...n) => {
    let s, r, o, f;
    const d = (y) => {
        const p = n.reduce((g, b) => b(g), a());
        return ((s = Sw(p)), (r = s.cache.get), (o = s.cache.set), (f = h), h(y));
      },
      h = (y) => {
        const p = r(y);
        if (p) return p;
        const g = Aw(y, s);
        return (o(y, g), g);
      };
    return ((f = d), (...y) => f(_w(...y)));
  },
  ww = [],
  de = (a) => {
    const n = (s) => s[a] || ww;
    return ((n.isThemeGetter = !0), n);
  },
  Xb = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Kb = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Mw = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Cw = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Dw =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Rw = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Ow = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  zw = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Ta = (a) => Mw.test(a),
  _t = (a) => !!a && !Number.isNaN(Number(a)),
  Aa = (a) => !!a && Number.isInteger(Number(a)),
  Af = (a) => a.endsWith("%") && _t(a.slice(0, -1)),
  Xn = (a) => Cw.test(a),
  Qb = () => !0,
  kw = (a) => Dw.test(a) && !Rw.test(a),
  Yd = () => !1,
  Nw = (a) => Ow.test(a),
  jw = (a) => zw.test(a),
  Vw = (a) => !it(a) && !rt(a),
  Uw = (a) => ka(a, Fb, Yd),
  it = (a) => Xb.test(a),
  ei = (a) => ka(a, Wb, kw),
  Cv = (a) => ka(a, Xw, _t),
  Bw = (a) => ka(a, Ib, Qb),
  Lw = (a) => ka(a, $b, Yd),
  Dv = (a) => ka(a, Jb, Yd),
  Hw = (a) => ka(a, Pb, jw),
  eo = (a) => ka(a, tx, Nw),
  rt = (a) => Kb.test(a),
  fl = (a) => hi(a, Wb),
  Zw = (a) => hi(a, $b),
  Rv = (a) => hi(a, Jb),
  Gw = (a) => hi(a, Fb),
  qw = (a) => hi(a, Pb),
  no = (a) => hi(a, tx, !0),
  Yw = (a) => hi(a, Ib, !0),
  ka = (a, n, s) => {
    const r = Xb.exec(a);
    return r ? (r[1] ? n(r[1]) : s(r[2])) : !1;
  },
  hi = (a, n, s = !1) => {
    const r = Kb.exec(a);
    return r ? (r[1] ? n(r[1]) : s) : !1;
  },
  Jb = (a) => a === "position" || a === "percentage",
  Pb = (a) => a === "image" || a === "url",
  Fb = (a) => a === "length" || a === "size" || a === "bg-size",
  Wb = (a) => a === "length",
  Xw = (a) => a === "number",
  $b = (a) => a === "family-name",
  Ib = (a) => a === "number" || a === "weight",
  tx = (a) => a === "shadow",
  Kw = () => {
    const a = de("color"),
      n = de("font"),
      s = de("text"),
      r = de("font-weight"),
      o = de("tracking"),
      f = de("leading"),
      d = de("breakpoint"),
      h = de("container"),
      y = de("spacing"),
      p = de("radius"),
      g = de("shadow"),
      b = de("inset-shadow"),
      x = de("text-shadow"),
      w = de("drop-shadow"),
      M = de("blur"),
      N = de("perspective"),
      k = de("aspect"),
      j = de("ease"),
      q = de("animate"),
      Z = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
      G = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      $ = () => [...G(), rt, it],
      ot = () => ["auto", "hidden", "clip", "visible", "scroll"],
      K = () => ["auto", "contain", "none"],
      V = () => [rt, it, y],
      J = () => [Ta, "full", "auto", ...V()],
      et = () => [Aa, "none", "subgrid", rt, it],
      mt = () => ["auto", { span: ["full", Aa, rt, it] }, Aa, rt, it],
      St = () => [Aa, "auto", rt, it],
      Qt = () => ["auto", "min", "max", "fr", rt, it],
      Ht = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      Vt = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"],
      O = () => ["auto", ...V()],
      X = () => [Ta, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...V()],
      P = () => [Ta, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...V()],
      pt = () => [Ta, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...V()],
      Q = () => [a, rt, it],
      T = () => [...G(), Rv, Dv, { position: [rt, it] }],
      B = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      W = () => ["auto", "cover", "contain", Gw, Uw, { size: [rt, it] }],
      tt = () => [Af, fl, ei],
      nt = () => ["", "none", "full", p, rt, it],
      ct = () => ["", _t, fl, ei],
      At = () => ["solid", "dashed", "dotted", "double"],
      Ft = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      bt = () => [_t, Af, Rv, Dv],
      un = () => ["", "none", M, rt, it],
      Je = () => ["none", _t, rt, it],
      ye = () => ["none", _t, rt, it],
      wn = () => [_t, rt, it],
      Ee = () => [Ta, "full", ...V()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [Xn],
        breakpoint: [Xn],
        color: [Qb],
        container: [Xn],
        "drop-shadow": [Xn],
        ease: ["in", "out", "in-out"],
        font: [Vw],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [Xn],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
        radius: [Xn],
        shadow: [Xn],
        spacing: ["px", _t],
        text: [Xn],
        "text-shadow": [Xn],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Ta, it, rt, k] }],
        container: ["container"],
        columns: [{ columns: [_t, it, rt, h] }],
        "break-after": [{ "break-after": Z() }],
        "break-before": [{ "break-before": Z() }],
        "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
        "object-position": [{ object: $() }],
        overflow: [{ overflow: ot() }],
        "overflow-x": [{ "overflow-x": ot() }],
        "overflow-y": [{ "overflow-y": ot() }],
        overscroll: [{ overscroll: K() }],
        "overscroll-x": [{ "overscroll-x": K() }],
        "overscroll-y": [{ "overscroll-y": K() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: J() }],
        "inset-x": [{ "inset-x": J() }],
        "inset-y": [{ "inset-y": J() }],
        start: [{ "inset-s": J(), start: J() }],
        end: [{ "inset-e": J(), end: J() }],
        "inset-bs": [{ "inset-bs": J() }],
        "inset-be": [{ "inset-be": J() }],
        top: [{ top: J() }],
        right: [{ right: J() }],
        bottom: [{ bottom: J() }],
        left: [{ left: J() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Aa, "auto", rt, it] }],
        basis: [{ basis: [Ta, "full", "auto", h, ...V()] }],
        "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [_t, Ta, "auto", "initial", "none", it] }],
        grow: [{ grow: ["", _t, rt, it] }],
        shrink: [{ shrink: ["", _t, rt, it] }],
        order: [{ order: [Aa, "first", "last", "none", rt, it] }],
        "grid-cols": [{ "grid-cols": et() }],
        "col-start-end": [{ col: mt() }],
        "col-start": [{ "col-start": St() }],
        "col-end": [{ "col-end": St() }],
        "grid-rows": [{ "grid-rows": et() }],
        "row-start-end": [{ row: mt() }],
        "row-start": [{ "row-start": St() }],
        "row-end": [{ "row-end": St() }],
        "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
        "auto-cols": [{ "auto-cols": Qt() }],
        "auto-rows": [{ "auto-rows": Qt() }],
        gap: [{ gap: V() }],
        "gap-x": [{ "gap-x": V() }],
        "gap-y": [{ "gap-y": V() }],
        "justify-content": [{ justify: [...Ht(), "normal"] }],
        "justify-items": [{ "justify-items": [...Vt(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...Vt()] }],
        "align-content": [{ content: ["normal", ...Ht()] }],
        "align-items": [{ items: [...Vt(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...Vt(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": Ht() }],
        "place-items": [{ "place-items": [...Vt(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...Vt()] }],
        p: [{ p: V() }],
        px: [{ px: V() }],
        py: [{ py: V() }],
        ps: [{ ps: V() }],
        pe: [{ pe: V() }],
        pbs: [{ pbs: V() }],
        pbe: [{ pbe: V() }],
        pt: [{ pt: V() }],
        pr: [{ pr: V() }],
        pb: [{ pb: V() }],
        pl: [{ pl: V() }],
        m: [{ m: O() }],
        mx: [{ mx: O() }],
        my: [{ my: O() }],
        ms: [{ ms: O() }],
        me: [{ me: O() }],
        mbs: [{ mbs: O() }],
        mbe: [{ mbe: O() }],
        mt: [{ mt: O() }],
        mr: [{ mr: O() }],
        mb: [{ mb: O() }],
        ml: [{ ml: O() }],
        "space-x": [{ "space-x": V() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": V() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: X() }],
        "inline-size": [{ inline: ["auto", ...P()] }],
        "min-inline-size": [{ "min-inline": ["auto", ...P()] }],
        "max-inline-size": [{ "max-inline": ["none", ...P()] }],
        "block-size": [{ block: ["auto", ...pt()] }],
        "min-block-size": [{ "min-block": ["auto", ...pt()] }],
        "max-block-size": [{ "max-block": ["none", ...pt()] }],
        w: [{ w: [h, "screen", ...X()] }],
        "min-w": [{ "min-w": [h, "screen", "none", ...X()] }],
        "max-w": [{ "max-w": [h, "screen", "none", "prose", { screen: [d] }, ...X()] }],
        h: [{ h: ["screen", "lh", ...X()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...X()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...X()] }],
        "font-size": [{ text: ["base", s, fl, ei] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [r, Yw, Bw] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              Af,
              it,
            ],
          },
        ],
        "font-family": [{ font: [Zw, Lw, n] }],
        "font-features": [{ "font-features": [it] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [o, rt, it] }],
        "line-clamp": [{ "line-clamp": [_t, "none", rt, Cv] }],
        leading: [{ leading: [f, ...V()] }],
        "list-image": [{ "list-image": ["none", rt, it] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", rt, it] }],
        "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
        "placeholder-color": [{ placeholder: Q() }],
        "text-color": [{ text: Q() }],
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        "text-decoration-style": [{ decoration: [...At(), "wavy"] }],
        "text-decoration-thickness": [{ decoration: [_t, "from-font", "auto", rt, ei] }],
        "text-decoration-color": [{ decoration: Q() }],
        "underline-offset": [{ "underline-offset": [_t, "auto", rt, it] }],
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: V() }],
        "vertical-align": [
          {
            align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", rt, it],
          },
        ],
        whitespace: [{ whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] }],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", rt, it] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: T() }],
        "bg-repeat": [{ bg: B() }],
        "bg-size": [{ bg: W() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [{ to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, Aa, rt, it],
                radial: ["", rt, it],
                conic: [Aa, rt, it],
              },
              qw,
              Hw,
            ],
          },
        ],
        "bg-color": [{ bg: Q() }],
        "gradient-from-pos": [{ from: tt() }],
        "gradient-via-pos": [{ via: tt() }],
        "gradient-to-pos": [{ to: tt() }],
        "gradient-from": [{ from: Q() }],
        "gradient-via": [{ via: Q() }],
        "gradient-to": [{ to: Q() }],
        rounded: [{ rounded: nt() }],
        "rounded-s": [{ "rounded-s": nt() }],
        "rounded-e": [{ "rounded-e": nt() }],
        "rounded-t": [{ "rounded-t": nt() }],
        "rounded-r": [{ "rounded-r": nt() }],
        "rounded-b": [{ "rounded-b": nt() }],
        "rounded-l": [{ "rounded-l": nt() }],
        "rounded-ss": [{ "rounded-ss": nt() }],
        "rounded-se": [{ "rounded-se": nt() }],
        "rounded-ee": [{ "rounded-ee": nt() }],
        "rounded-es": [{ "rounded-es": nt() }],
        "rounded-tl": [{ "rounded-tl": nt() }],
        "rounded-tr": [{ "rounded-tr": nt() }],
        "rounded-br": [{ "rounded-br": nt() }],
        "rounded-bl": [{ "rounded-bl": nt() }],
        "border-w": [{ border: ct() }],
        "border-w-x": [{ "border-x": ct() }],
        "border-w-y": [{ "border-y": ct() }],
        "border-w-s": [{ "border-s": ct() }],
        "border-w-e": [{ "border-e": ct() }],
        "border-w-bs": [{ "border-bs": ct() }],
        "border-w-be": [{ "border-be": ct() }],
        "border-w-t": [{ "border-t": ct() }],
        "border-w-r": [{ "border-r": ct() }],
        "border-w-b": [{ "border-b": ct() }],
        "border-w-l": [{ "border-l": ct() }],
        "divide-x": [{ "divide-x": ct() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": ct() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...At(), "hidden", "none"] }],
        "divide-style": [{ divide: [...At(), "hidden", "none"] }],
        "border-color": [{ border: Q() }],
        "border-color-x": [{ "border-x": Q() }],
        "border-color-y": [{ "border-y": Q() }],
        "border-color-s": [{ "border-s": Q() }],
        "border-color-e": [{ "border-e": Q() }],
        "border-color-bs": [{ "border-bs": Q() }],
        "border-color-be": [{ "border-be": Q() }],
        "border-color-t": [{ "border-t": Q() }],
        "border-color-r": [{ "border-r": Q() }],
        "border-color-b": [{ "border-b": Q() }],
        "border-color-l": [{ "border-l": Q() }],
        "divide-color": [{ divide: Q() }],
        "outline-style": [{ outline: [...At(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [_t, rt, it] }],
        "outline-w": [{ outline: ["", _t, fl, ei] }],
        "outline-color": [{ outline: Q() }],
        shadow: [{ shadow: ["", "none", g, no, eo] }],
        "shadow-color": [{ shadow: Q() }],
        "inset-shadow": [{ "inset-shadow": ["none", b, no, eo] }],
        "inset-shadow-color": [{ "inset-shadow": Q() }],
        "ring-w": [{ ring: ct() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: Q() }],
        "ring-offset-w": [{ "ring-offset": [_t, ei] }],
        "ring-offset-color": [{ "ring-offset": Q() }],
        "inset-ring-w": [{ "inset-ring": ct() }],
        "inset-ring-color": [{ "inset-ring": Q() }],
        "text-shadow": [{ "text-shadow": ["none", x, no, eo] }],
        "text-shadow-color": [{ "text-shadow": Q() }],
        opacity: [{ opacity: [_t, rt, it] }],
        "mix-blend": [{ "mix-blend": [...Ft(), "plus-darker", "plus-lighter"] }],
        "bg-blend": [{ "bg-blend": Ft() }],
        "mask-clip": [
          { "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"] },
          "mask-no-clip",
        ],
        "mask-composite": [{ mask: ["add", "subtract", "intersect", "exclude"] }],
        "mask-image-linear-pos": [{ "mask-linear": [_t] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": bt() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": bt() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": Q() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": Q() }],
        "mask-image-t-from-pos": [{ "mask-t-from": bt() }],
        "mask-image-t-to-pos": [{ "mask-t-to": bt() }],
        "mask-image-t-from-color": [{ "mask-t-from": Q() }],
        "mask-image-t-to-color": [{ "mask-t-to": Q() }],
        "mask-image-r-from-pos": [{ "mask-r-from": bt() }],
        "mask-image-r-to-pos": [{ "mask-r-to": bt() }],
        "mask-image-r-from-color": [{ "mask-r-from": Q() }],
        "mask-image-r-to-color": [{ "mask-r-to": Q() }],
        "mask-image-b-from-pos": [{ "mask-b-from": bt() }],
        "mask-image-b-to-pos": [{ "mask-b-to": bt() }],
        "mask-image-b-from-color": [{ "mask-b-from": Q() }],
        "mask-image-b-to-color": [{ "mask-b-to": Q() }],
        "mask-image-l-from-pos": [{ "mask-l-from": bt() }],
        "mask-image-l-to-pos": [{ "mask-l-to": bt() }],
        "mask-image-l-from-color": [{ "mask-l-from": Q() }],
        "mask-image-l-to-color": [{ "mask-l-to": Q() }],
        "mask-image-x-from-pos": [{ "mask-x-from": bt() }],
        "mask-image-x-to-pos": [{ "mask-x-to": bt() }],
        "mask-image-x-from-color": [{ "mask-x-from": Q() }],
        "mask-image-x-to-color": [{ "mask-x-to": Q() }],
        "mask-image-y-from-pos": [{ "mask-y-from": bt() }],
        "mask-image-y-to-pos": [{ "mask-y-to": bt() }],
        "mask-image-y-from-color": [{ "mask-y-from": Q() }],
        "mask-image-y-to-color": [{ "mask-y-to": Q() }],
        "mask-image-radial": [{ "mask-radial": [rt, it] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": bt() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": bt() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": Q() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": Q() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          { "mask-radial": [{ closest: ["side", "corner"], farthest: ["side", "corner"] }] },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": G() }],
        "mask-image-conic-pos": [{ "mask-conic": [_t] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": bt() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": bt() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": Q() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": Q() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [{ "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"] }],
        "mask-position": [{ mask: T() }],
        "mask-repeat": [{ mask: B() }],
        "mask-size": [{ mask: W() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", rt, it] }],
        filter: [{ filter: ["", "none", rt, it] }],
        blur: [{ blur: un() }],
        brightness: [{ brightness: [_t, rt, it] }],
        contrast: [{ contrast: [_t, rt, it] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", w, no, eo] }],
        "drop-shadow-color": [{ "drop-shadow": Q() }],
        grayscale: [{ grayscale: ["", _t, rt, it] }],
        "hue-rotate": [{ "hue-rotate": [_t, rt, it] }],
        invert: [{ invert: ["", _t, rt, it] }],
        saturate: [{ saturate: [_t, rt, it] }],
        sepia: [{ sepia: ["", _t, rt, it] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", rt, it] }],
        "backdrop-blur": [{ "backdrop-blur": un() }],
        "backdrop-brightness": [{ "backdrop-brightness": [_t, rt, it] }],
        "backdrop-contrast": [{ "backdrop-contrast": [_t, rt, it] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", _t, rt, it] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [_t, rt, it] }],
        "backdrop-invert": [{ "backdrop-invert": ["", _t, rt, it] }],
        "backdrop-opacity": [{ "backdrop-opacity": [_t, rt, it] }],
        "backdrop-saturate": [{ "backdrop-saturate": [_t, rt, it] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", _t, rt, it] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": V() }],
        "border-spacing-x": [{ "border-spacing-x": V() }],
        "border-spacing-y": [{ "border-spacing-y": V() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [{ transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", rt, it] }],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [_t, "initial", rt, it] }],
        ease: [{ ease: ["linear", "initial", j, rt, it] }],
        delay: [{ delay: [_t, rt, it] }],
        animate: [{ animate: ["none", q, rt, it] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [N, rt, it] }],
        "perspective-origin": [{ "perspective-origin": $() }],
        rotate: [{ rotate: Je() }],
        "rotate-x": [{ "rotate-x": Je() }],
        "rotate-y": [{ "rotate-y": Je() }],
        "rotate-z": [{ "rotate-z": Je() }],
        scale: [{ scale: ye() }],
        "scale-x": [{ "scale-x": ye() }],
        "scale-y": [{ "scale-y": ye() }],
        "scale-z": [{ "scale-z": ye() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: wn() }],
        "skew-x": [{ "skew-x": wn() }],
        "skew-y": [{ "skew-y": wn() }],
        transform: [{ transform: [rt, it, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: $() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: Ee() }],
        "translate-x": [{ "translate-x": Ee() }],
        "translate-y": [{ "translate-y": Ee() }],
        "translate-z": [{ "translate-z": Ee() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: Q() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: Q() }],
        "color-scheme": [{ scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"] }],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              rt,
              it,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": V() }],
        "scroll-mx": [{ "scroll-mx": V() }],
        "scroll-my": [{ "scroll-my": V() }],
        "scroll-ms": [{ "scroll-ms": V() }],
        "scroll-me": [{ "scroll-me": V() }],
        "scroll-mbs": [{ "scroll-mbs": V() }],
        "scroll-mbe": [{ "scroll-mbe": V() }],
        "scroll-mt": [{ "scroll-mt": V() }],
        "scroll-mr": [{ "scroll-mr": V() }],
        "scroll-mb": [{ "scroll-mb": V() }],
        "scroll-ml": [{ "scroll-ml": V() }],
        "scroll-p": [{ "scroll-p": V() }],
        "scroll-px": [{ "scroll-px": V() }],
        "scroll-py": [{ "scroll-py": V() }],
        "scroll-ps": [{ "scroll-ps": V() }],
        "scroll-pe": [{ "scroll-pe": V() }],
        "scroll-pbs": [{ "scroll-pbs": V() }],
        "scroll-pbe": [{ "scroll-pbe": V() }],
        "scroll-pt": [{ "scroll-pt": V() }],
        "scroll-pr": [{ "scroll-pr": V() }],
        "scroll-pb": [{ "scroll-pb": V() }],
        "scroll-pl": [{ "scroll-pl": V() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", rt, it] }],
        fill: [{ fill: ["none", ...Q()] }],
        "stroke-w": [{ stroke: [_t, fl, ei, Cv] }],
        stroke: [{ stroke: ["none", ...Q()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "inset-bs",
          "inset-be",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
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
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-bs",
          "border-w-be",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-bs",
          "border-color-be",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mbs",
          "scroll-mbe",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pbs",
          "scroll-pbe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  Qw = Ew(Kw);
function If(...a) {
  return Qw(iw(a));
}
const Jw = {
  initial: { opacity: 0, x: -14, filter: "blur(3px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
};
function Pw({ finding: a }) {
  return a.kind === "source"
    ? _.jsxs("div", {
        className: "flex items-start gap-3",
        children: [
          _.jsx("span", { className: "text-glow mt-0.5 font-mono text-xs", children: "⇲" }),
          _.jsxs("div", {
            className: "min-w-0",
            children: [
              _.jsxs("p", {
                className: "text-secondary-foreground font-mono text-[11px] tracking-widest uppercase",
                children: ["source · relevance ", a.relevance],
              }),
              a.url
                ? _.jsx("a", {
                    href: a.url,
                    target: "_blank",
                    rel: "noreferrer",
                    className:
                      "text-foreground decoration-glow/40 hover:decoration-glow block truncate text-sm underline underline-offset-4",
                    children: a.title,
                  })
                : _.jsx("p", { className: "text-foreground truncate text-sm", children: a.title }),
            ],
          }),
        ],
      })
    : a.kind === "risk"
      ? _.jsxs("div", {
          className: "flex items-start gap-3",
          children: [
            _.jsx("span", { className: "text-signal-amber mt-0.5 font-mono text-xs", children: "⚠" }),
            _.jsxs("div", {
              children: [
                _.jsxs("p", {
                  className: "text-secondary-foreground font-mono text-[11px] tracking-widest uppercase",
                  children: ["settlement risk · ", a.risk.severity],
                }),
                _.jsx("p", { className: "text-foreground/90 text-sm leading-snug", children: a.risk.risk }),
              ],
            }),
          ],
        })
      : _.jsxs("div", {
          className: "flex items-start gap-3",
          children: [
            _.jsx("span", { className: "text-signal-rust mt-0.5 font-mono text-xs", children: "!" }),
            _.jsxs("div", {
              children: [
                _.jsxs("p", {
                  className: "text-secondary-foreground font-mono text-[11px] tracking-widest uppercase",
                  children: [a.warning.kind.replace("_", " "), " warning · ", a.warning.severity],
                }),
                _.jsx("p", {
                  className: "text-foreground/90 text-sm leading-snug",
                  children: a.warning.message,
                }),
              ],
            }),
          ],
        });
}
function Fw({ findings: a, streaming: n }) {
  return _.jsxs("div", {
    className: "space-y-3",
    "data-testid": "live-feed",
    "aria-live": "polite",
    children: [
      _.jsx(Ab, {
        initial: !1,
        children: a.map((s) =>
          _.jsx(
            Ae.div,
            {
              layout: !0,
              ...Jw,
              transition: { duration: 0.35, ease: "easeOut" },
              className: If("hairline bg-desk rounded-lg border p-3"),
              children: _.jsx(Pw, { finding: s }),
            },
            s.key,
          ),
        ),
      }),
      n
        ? _.jsx(Ae.p, {
            className: "text-muted-foreground pl-1 font-mono text-xs",
            animate: { opacity: [0.4, 1, 0.4] },
            transition: { duration: 1.6, repeat: 1 / 0 },
            children: "listening to the desk…",
          })
        : null,
    ],
  });
}
const Ov = {
  h2: "text-foreground mb-3 text-2xl leading-tight font-semibold tracking-tight first:mt-0",
  h3: "text-foreground mt-6 mb-2 text-xl leading-snug font-semibold tracking-tight first:mt-0",
};
function Ww({ source: a, className: n }) {
  const s = Iw(a);
  return _.jsx("div", { className: n, children: s.map((r, o) => $w(r, o)) });
}
function $w(a, n) {
  return a.kind === "h2"
    ? _.jsx("h2", { className: Ov.h2, children: _f(a.text) }, n)
    : a.kind === "h3"
      ? _.jsx("h3", { className: Ov.h3, children: _f(a.text) }, n)
      : _.jsx(
          "p",
          {
            className: "text-foreground mt-3 text-[0.95rem] leading-relaxed first:mt-0",
            children: _f(a.text),
          },
          n,
        );
}
function Iw(a) {
  const n = a.replace(
      /\r\n/g,
      `
`,
    ).split(`
`),
    s = [];
  let r = [];
  const o = () => {
    if (r.length === 0) return;
    const f = r.join(" ").trim();
    (f.length > 0 && s.push({ kind: "paragraph", text: f }), (r = []));
  };
  for (const f of n) {
    const d = f.trim();
    if (d.length === 0) {
      o();
      continue;
    }
    if (d.startsWith("## ")) {
      (o(), s.push({ kind: "h2", text: d.slice(3).trim() }));
      continue;
    }
    if (d.startsWith("### ")) {
      (o(), s.push({ kind: "h3", text: d.slice(4).trim() }));
      continue;
    }
    r.push(d);
  }
  return (o(), s);
}
const tM = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
function _f(a) {
  return a
    .split(tM)
    .filter((s) => s !== "")
    .map((s, r) =>
      s.startsWith("**") && s.endsWith("**")
        ? _.jsx("strong", { className: "font-medium", children: s.slice(2, -2) }, r)
        : s.startsWith("*") && s.endsWith("*")
          ? _.jsx("em", { className: "italic", children: s.slice(1, -1) }, r)
          : s.startsWith("`") && s.endsWith("`")
            ? _.jsx(
                "code",
                {
                  className: "bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.85em]",
                  children: s.slice(1, -1),
                },
                r,
              )
            : _.jsx("span", { children: s }, r),
    );
}
function zv(a) {
  return `${Math.round(a * 100)}%`;
}
function ni({ children: a }) {
  return _.jsx("p", {
    className: "text-paper-ink/50 mb-2 font-mono text-[10px] tracking-[0.25em] uppercase",
    children: a,
  });
}
function eM({ response: a }) {
  const n = a.delta,
    s =
      n.direction === "in_line"
        ? "in line with the market"
        : `${n.probabilityPoints > 0 ? "+" : ""}${Math.round(n.probabilityPoints * 100)} pts vs market`;
  return _.jsxs(Ae.article, {
    "data-testid": "memo-sheet",
    initial: { opacity: 0, y: 32, rotate: -0.6 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    transition: { type: "spring", stiffness: 70, damping: 16, delay: 0.15 },
    className:
      "bg-paper text-paper-ink mx-auto max-w-2xl rounded-sm px-8 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:px-12",
    children: [
      _.jsxs("header", {
        className: "border-paper-ink/20 border-b pb-6",
        children: [
          _.jsxs("p", {
            className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-60",
            children: ["research memo · ", new Date(a.analyzedAt).toUTCString()],
          }),
          _.jsx("h2", {
            className: "font-display mt-3 text-3xl leading-tight font-semibold text-balance",
            children: a.market.title,
          }),
          _.jsx("p", { className: "mt-1 font-mono text-xs opacity-60", children: a.market.ticker }),
        ],
      }),
      _.jsxs("div", {
        className: "border-paper-ink/20 grid grid-cols-3 gap-4 border-b py-6 text-center",
        children: [
          _.jsxs("div", {
            children: [
              _.jsx("p", {
                className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
                children: "market implies",
              }),
              _.jsx("p", {
                className: "font-display text-4xl font-light",
                children: zv(a.kalshi.impliedProbability),
              }),
            ],
          }),
          _.jsxs("div", {
            children: [
              _.jsx("p", {
                className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
                children: "desk estimate",
              }),
              _.jsx("p", {
                className: "font-display text-4xl font-semibold",
                children: zv(a.agentEstimate.probability),
              }),
            ],
          }),
          _.jsxs("div", {
            className: "self-center",
            children: [
              _.jsx("p", {
                className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
                children: "delta",
              }),
              _.jsx("p", { className: "font-mono text-sm font-semibold", children: s }),
              _.jsxs("p", {
                className: "font-mono text-[10px] uppercase opacity-50",
                children: ["confidence ", a.agentEstimate.confidence],
              }),
            ],
          }),
        ],
      }),
      _.jsxs("div", {
        className: "space-y-8 py-8",
        children: [
          _.jsxs("section", {
            children: [_.jsx(ni, { children: "memo" }), _.jsx(Ww, { source: a.finalMemoMarkdown })],
          }),
          _.jsxs("section", {
            children: [
              _.jsx(ni, { children: "thesis" }),
              _.jsx("p", { className: "leading-relaxed", children: a.agentEstimate.thesis }),
            ],
          }),
          _.jsxs("section", {
            children: [
              _.jsx(ni, { children: "evidence" }),
              _.jsx("ul", {
                className: "space-y-3",
                children: a.evidence.map((r, o) =>
                  _.jsxs(
                    "li",
                    {
                      className: "flex gap-3",
                      children: [
                        _.jsx("span", {
                          className: "font-mono text-xs opacity-40",
                          children: String(o + 1).padStart(2, "0"),
                        }),
                        _.jsxs("div", {
                          children: [
                            _.jsx("p", { className: "leading-snug", children: r.claim }),
                            r.sourceUrl
                              ? _.jsx("a", {
                                  href: r.sourceUrl,
                                  target: "_blank",
                                  rel: "noreferrer",
                                  className:
                                    "font-mono text-xs underline underline-offset-2 opacity-70 hover:opacity-100",
                                  children: r.sourceTitle,
                                })
                              : _.jsx("span", {
                                  className: "font-mono text-xs opacity-60",
                                  children: r.sourceTitle,
                                }),
                            _.jsxs("span", {
                              className: "ml-2 font-mono text-[10px] uppercase opacity-40",
                              children: ["rel. ", r.relevance],
                            }),
                          ],
                        }),
                      ],
                    },
                    o,
                  ),
                ),
              }),
            ],
          }),
          _.jsxs("section", {
            children: [
              _.jsx(ni, { children: "counterarguments" }),
              _.jsx("ul", {
                className: "list-disc space-y-1.5 pl-5",
                children: a.counterarguments.map((r, o) =>
                  _.jsx("li", { className: "leading-snug", children: r }, o),
                ),
              }),
            ],
          }),
          _.jsxs("div", {
            className: "grid gap-8 md:grid-cols-2",
            children: [
              _.jsxs("section", {
                children: [
                  _.jsx(ni, { children: "settlement risks" }),
                  _.jsx("ul", {
                    className: "space-y-2",
                    children: a.settlementRisks.map((r, o) =>
                      _.jsxs(
                        "li",
                        {
                          className: "text-sm leading-snug",
                          children: [
                            _.jsxs("span", {
                              className: "font-mono text-[10px] uppercase opacity-50",
                              children: ["[", r.severity, "]"],
                            }),
                            " ",
                            r.risk,
                          ],
                        },
                        o,
                      ),
                    ),
                  }),
                ],
              }),
              _.jsxs("section", {
                children: [
                  _.jsx(ni, { children: "what would change this" }),
                  _.jsx("ul", {
                    className: "space-y-2",
                    children: a.whatWouldChange.map((r, o) =>
                      _.jsx("li", { className: "text-sm leading-snug", children: r }, o),
                    ),
                  }),
                ],
              }),
            ],
          }),
          _.jsxs("section", {
            children: [
              _.jsx(ni, { children: "assumptions" }),
              _.jsx("ul", {
                className: "list-disc space-y-1.5 pl-5",
                children: a.agentEstimate.assumptions.map((r, o) =>
                  _.jsx("li", { className: "text-sm leading-snug", children: r }, o),
                ),
              }),
            ],
          }),
        ],
      }),
      _.jsx("footer", {
        className: "border-paper-ink/20 border-t pt-5",
        children: _.jsx("p", {
          className: "font-mono text-[10px] leading-relaxed opacity-60",
          children: a.disclaimer,
        }),
      }),
    ],
  });
}
const td = 240,
  ed = 150,
  Ef = 84,
  is = 100;
function nd(a, n) {
  const s = (a * Math.PI) / 180;
  return { x: is + n * Math.cos(s), y: is + n * Math.sin(s) };
}
function kv(a, n, s) {
  const r = ed + a * td,
    o = ed + n * td,
    f = nd(r, s),
    d = nd(o, s),
    h = o - r > 180 ? 1 : 0;
  return `M ${f.x} ${f.y} A ${s} ${s} 0 ${h} 1 ${d.x} ${d.y}`;
}
const nM = {
  market_prior: "market prior",
  research_draft: "research estimate",
  skeptic_calibrated: "skeptic-calibrated",
};
function aM({ estimate: a, marketPrior: n }) {
  const s = (a == null ? void 0 : a.probability) ?? n ?? 0,
    r = Vb(0),
    o = xv(r, (h) => `${Math.round(h * 100)}`),
    f = xv(r, (h) => kv(0, Math.max(h, 0.001), Ef));
  F.useEffect(() => {
    const h = aw(r, s, { type: "spring", stiffness: 60, damping: 18 });
    return () => h.stop();
  }, [s, r]);
  const d = n === null ? null : nd(ed + n * td, Ef);
  return _.jsxs("div", {
    className: "relative flex flex-col items-center",
    "data-testid": "probability-dial",
    children: [
      _.jsxs("svg", {
        viewBox: "0 0 200 168",
        className: "w-full max-w-[290px]",
        children: [
          _.jsx("path", {
            d: kv(0, 1, Ef),
            fill: "none",
            stroke: "var(--color-desk-edge)",
            strokeWidth: "8",
            strokeLinecap: "round",
          }),
          _.jsx(Ae.path, {
            d: f,
            fill: "none",
            stroke: "var(--color-glow)",
            strokeWidth: "8",
            strokeLinecap: "round",
            style: { filter: "drop-shadow(0 0 6px rgba(74, 222, 128, 0.55))" },
          }),
          d
            ? _.jsx("circle", {
                cx: d.x,
                cy: d.y,
                r: "4.5",
                fill: "var(--color-ink)",
                stroke: "var(--color-glow-soft)",
                strokeWidth: "2",
                children: _.jsx("title", { children: "Kalshi implied probability" }),
              })
            : null,
          _.jsxs("text", {
            x: is,
            y: is - 4,
            textAnchor: "middle",
            className: "fill-foreground font-mono",
            style: { fontSize: "44px", fontWeight: 600 },
            children: [
              _.jsx(Ae.tspan, { children: o }),
              _.jsx("tspan", { style: { fontSize: "20px" }, dy: "-14", dx: "2", children: "%" }),
            ],
          }),
          _.jsx("text", {
            x: is,
            y: is + 22,
            textAnchor: "middle",
            className: "fill-muted-foreground font-mono",
            style: { fontSize: "9.5px", letterSpacing: "0.2em" },
            children: a ? nM[a.basis].toUpperCase() : "AWAITING SIGNAL",
          }),
        ],
      }),
      a != null && a.confidence
        ? _.jsxs("p", {
            className: "text-muted-foreground -mt-2 font-mono text-[11px] tracking-widest uppercase",
            children: [
              "confidence · ",
              _.jsx("span", { className: "text-glow-soft", children: a.confidence }),
            ],
          })
        : null,
    ],
  });
}
function iM({ status: a }) {
  return a === "completed"
    ? _.jsx("span", { className: "text-glow font-mono text-xs", children: "✓" })
    : a === "skipped"
      ? _.jsx("span", { className: "text-muted-foreground font-mono text-xs", children: "–" })
      : a === "failed"
        ? _.jsx("span", { className: "text-signal-rust font-mono text-xs", children: "✕" })
        : a === "running"
          ? _.jsx(Ae.span, {
              className: "bg-glow block size-2 rounded-full",
              animate: { opacity: [1, 0.25, 1], scale: [1, 0.8, 1] },
              transition: { duration: 1.2, repeat: 1 / 0, ease: "easeInOut" },
            })
          : _.jsx("span", { className: "bg-desk-edge block size-2 rounded-full" });
}
function sM({ stages: a }) {
  return _.jsx("ol", {
    className: "space-y-0",
    "data-testid": "stage-rail",
    children: a.map((n, s) => {
      const r = n.status === "running";
      return _.jsxs(
        "li",
        {
          className: If("hairline border-l-2 py-3 pl-4", r && "border-l-glow"),
          children: [
            _.jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                _.jsxs("span", {
                  className: "text-muted-foreground font-mono text-[10px]",
                  children: ["0", s + 1],
                }),
                _.jsx(iM, { status: n.status }),
                _.jsx("span", {
                  className: If(
                    "font-mono text-xs tracking-wide",
                    r
                      ? "text-foreground"
                      : n.status === "pending"
                        ? "text-muted-foreground/60"
                        : "text-secondary-foreground",
                  ),
                  children: n.displayName.replace(" Agent", ""),
                }),
              ],
            }),
            r
              ? _.jsxs(Ae.p, {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "text-glow-soft/80 mt-1 pl-[52px] font-mono text-[11px] leading-snug",
                  children: [n.headline, "…"],
                })
              : n.summary
                ? _.jsx("p", {
                    className: "text-muted-foreground mt-1 pl-[52px] font-mono text-[11px] leading-snug",
                    children: n.summary,
                  })
                : null,
          ],
        },
        n.role,
      );
    }),
  });
}
function lM({ state: a }) {
  return a.market
    ? _.jsxs(Ae.div, {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "hairline bg-desk rounded-lg border p-4",
        children: [
          _.jsx("p", {
            className: "text-muted-foreground font-mono text-[10px] tracking-widest uppercase",
            children: "under analysis",
          }),
          _.jsx("h2", {
            className: "font-display text-foreground mt-1 text-lg leading-snug font-medium text-balance",
            children: a.market.title,
          }),
          _.jsx("p", {
            className: "text-glow-soft/70 mt-1 font-mono text-[11px]",
            children: a.market.ticker,
          }),
          a.kalshi
            ? _.jsxs("dl", {
                className: "text-muted-foreground mt-3 grid grid-cols-3 gap-2 font-mono text-[11px]",
                children: [
                  _.jsxs("div", {
                    children: [
                      _.jsx("dt", { className: "uppercase opacity-60", children: "bid" }),
                      _.jsx("dd", { className: "text-foreground tabular", children: a.kalshi.yesBid ?? "—" }),
                    ],
                  }),
                  _.jsxs("div", {
                    children: [
                      _.jsx("dt", { className: "uppercase opacity-60", children: "ask" }),
                      _.jsx("dd", { className: "text-foreground tabular", children: a.kalshi.yesAsk ?? "—" }),
                    ],
                  }),
                  _.jsxs("div", {
                    children: [
                      _.jsx("dt", { className: "uppercase opacity-60", children: "volume" }),
                      _.jsx("dd", { className: "text-foreground tabular", children: a.kalshi.volume ?? "—" }),
                    ],
                  }),
                ],
              })
            : null,
        ],
      })
    : _.jsx("div", {
        className: "hairline bg-desk rounded-lg border p-4",
        children: _.jsxs(Ae.p, {
          className: "text-muted-foreground font-mono text-xs",
          animate: { opacity: [0.4, 1, 0.4] },
          transition: { duration: 1.4, repeat: 1 / 0 },
          children: ["resolving ", a.eventInput, "…"],
        }),
      });
}
function rM({ state: a, onReset: n }) {
  var s, r;
  return _.jsxs(Ae.div, {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    className: "border-signal-rust/40 bg-desk mx-auto max-w-xl rounded-lg border p-6 text-center",
    role: "alert",
    children: [
      _.jsxs("p", {
        className: "text-signal-rust font-mono text-xs tracking-widest uppercase",
        children: ["analysis halted · ", (s = a.error) == null ? void 0 : s.code],
      }),
      _.jsx("p", {
        className: "text-foreground mt-3 leading-relaxed",
        children: (r = a.error) == null ? void 0 : r.message,
      }),
      _.jsx("button", {
        type: "button",
        onClick: n,
        className:
          "hairline text-glow-soft hover:border-glow/50 mt-5 rounded-lg border px-5 py-2 font-mono text-sm transition-colors",
        children: "back to the desk",
      }),
    ],
  });
}
function oM({ state: a, onReset: n }) {
  var r;
  const s = a.phase === "streaming";
  return a.phase === "failed"
    ? _.jsx("div", {
        className: "flex h-full items-center justify-center px-6 py-16",
        children: _.jsx(rM, { state: a, onReset: n }),
      })
    : _.jsx("div", {
        className: "mx-auto w-full max-w-6xl px-6 py-8 md:px-10",
        children: _.jsxs("div", {
          className: "grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)_300px]",
          children: [
            _.jsxs("aside", {
              className: "order-2 lg:order-1",
              children: [
                _.jsx("p", {
                  className: "text-muted-foreground mb-3 font-mono text-[10px] tracking-[0.3em] uppercase",
                  children: "research pass",
                }),
                _.jsx(sM, { stages: a.stages }),
              ],
            }),
            _.jsx("section", {
              className: "order-3 min-w-0 lg:order-2",
              children:
                a.phase === "complete" && a.response
                  ? _.jsxs("div", {
                      className: "space-y-8",
                      children: [
                        _.jsx(eM, { response: a.response }),
                        _.jsx("div", {
                          className: "text-center",
                          children: _.jsx("button", {
                            type: "button",
                            onClick: n,
                            className:
                              "hairline text-glow-soft hover:border-glow/50 rounded-lg border px-5 py-2 font-mono text-sm transition-colors",
                            children: "research another event",
                          }),
                        }),
                      ],
                    })
                  : _.jsxs(_.Fragment, {
                      children: [
                        _.jsx("p", {
                          className:
                            "text-muted-foreground mb-3 font-mono text-[10px] tracking-[0.3em] uppercase",
                          children: "live findings",
                        }),
                        _.jsx(Fw, { findings: a.findings, streaming: s }),
                      ],
                    }),
            }),
            _.jsxs("aside", {
              className: "order-1 space-y-6 lg:order-3",
              children: [
                _.jsx(aM, {
                  estimate: a.estimate,
                  marketPrior: ((r = a.kalshi) == null ? void 0 : r.impliedProbability) ?? null,
                }),
                _.jsx(lM, { state: a }),
              ],
            }),
          ],
        }),
      });
}
const uM = [
    {
      ticker: "KXEXAMPLE-26MAY03-DEMO",
      label: "Example economic release",
      blurb: "Validated demo fixture used by the workflow contract tests.",
    },
    {
      ticker: "KXFEDRATE-DEC26",
      label: "Fed rate decision (placeholder)",
      blurb: "Reserved slot for a live demo market.",
    },
    {
      ticker: "KXJOBS-26JUN-PLACEHOLDER",
      label: "Monthly jobs print (placeholder)",
      blurb: "Reserved slot for a live demo market.",
    },
  ],
  ex = /^KX[A-Z0-9-]{3,}$/,
  cM = /(^|\.)kalshi\.com$/i;
function nx(a) {
  const n = a.trim();
  if (n.length === 0) return null;
  const s = fM(n);
  if (s !== null) return { marketInput: s, source: "url" };
  const r = n.toUpperCase();
  return ex.test(r) ? { marketInput: r, source: "ticker" } : null;
}
function fM(a) {
  let n;
  try {
    n = new URL(a);
  } catch {
    return null;
  }
  if (!cM.test(n.hostname)) return null;
  const s = n.pathname.split("/").filter(Boolean),
    r = s.findIndex((f) => f.toLowerCase() === "markets");
  if (r === -1) return null;
  const o = s
    .slice(r + 1)
    .filter((f) => ex.test(f.toUpperCase()))
    .at(-1);
  return (o == null ? void 0 : o.toUpperCase()) ?? null;
}
const dl = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };
function dM({ onSubmit: a }) {
  const [n, s] = F.useState(""),
    [r, o] = F.useState(!1),
    f = nx(n) !== null,
    d = (h) => {
      a(n, h === void 0 ? void 0 : { demoMode: h }) || o(!0);
    };
  return _.jsxs("div", {
    className: "mx-auto w-full max-w-3xl px-6 pb-24",
    children: [
      _.jsx(Ae.p, {
        ...dl,
        transition: { duration: 0.5, delay: 0.05 },
        className: "text-glow-soft mb-6 font-mono text-xs tracking-[0.35em] uppercase",
        children: "ask the desk",
      }),
      _.jsxs(Ae.h1, {
        ...dl,
        transition: { duration: 0.5, delay: 0.15 },
        className:
          "font-display text-foreground text-5xl leading-[1.05] font-light tracking-tight text-balance md:text-7xl",
        children: [
          "How likely is it, ",
          _.jsx("em", { className: "text-glow font-medium italic", children: "really" }),
          "?",
        ],
      }),
      _.jsx(Ae.p, {
        ...dl,
        transition: { duration: 0.5, delay: 0.25 },
        className: "text-muted-foreground mt-6 max-w-xl text-base leading-relaxed",
        children:
          "Paste a Kalshi market ticker or URL. The desk runs a live research pass — market context, settlement rules, public evidence, a skeptic's audit — and shows its work while it thinks.",
      }),
      _.jsxs(Ae.form, {
        ...dl,
        transition: { duration: 0.5, delay: 0.35 },
        className: "mt-10",
        onSubmit: (h) => {
          (h.preventDefault(), d());
        },
        children: [
          _.jsxs("div", {
            className:
              "hairline bg-desk focus-within:border-glow/50 flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
            children: [
              _.jsx("span", { className: "text-glow font-mono text-sm select-none", children: "▸" }),
              _.jsx("input", {
                value: n,
                onChange: (h) => {
                  (s(h.target.value), o(!1));
                },
                placeholder: "KXFEDDECISION-26JUL-H  ·  kalshi.com/markets/…",
                "aria-label": "Kalshi market ticker or URL",
                className:
                  "text-foreground placeholder:text-muted-foreground/50 w-full bg-transparent font-mono text-sm outline-none",
                autoFocus: !0,
              }),
              _.jsx("span", {
                className: "text-glow cursor-blink font-mono text-sm select-none",
                "aria-hidden": !0,
                children: "█",
              }),
            ],
          }),
          r
            ? _.jsx("p", {
                className: "text-signal-rust mt-2 font-mono text-xs",
                children: "That doesn't look like a Kalshi ticker (KX…) or market URL yet.",
              })
            : null,
          _.jsxs("div", {
            className: "mt-4 flex flex-wrap items-center gap-3",
            children: [
              _.jsx("button", {
                type: "submit",
                disabled: !f,
                className:
                  "bg-glow text-primary-foreground hover:bg-glow-soft rounded-lg px-5 py-2 font-mono text-sm font-semibold tracking-wide transition-colors disabled:opacity-40",
                children: "run research",
              }),
              _.jsx("button", {
                type: "button",
                onClick: () => d(!0),
                className:
                  "hairline text-glow-soft hover:border-glow/50 rounded-lg border px-5 py-2 font-mono text-sm tracking-wide transition-colors",
                children: "watch the demo",
              }),
            ],
          }),
        ],
      }),
      _.jsxs(Ae.div, {
        ...dl,
        transition: { duration: 0.5, delay: 0.5 },
        className: "mt-12",
        children: [
          _.jsx("p", {
            className: "text-muted-foreground mb-3 font-mono text-[11px] tracking-widest uppercase",
            children: "or try",
          }),
          _.jsx("div", {
            className: "flex flex-wrap gap-2",
            children: uM.map((h) =>
              _.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    (s(h.ticker), o(!1));
                  },
                  className:
                    "hairline text-secondary-foreground hover:text-glow-soft hover:border-glow/40 rounded-full border px-4 py-1.5 font-mono text-xs transition-colors",
                  title: h.blurb,
                  children: h.label,
                },
                h.ticker,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
const hM = [
    {
      role: "market_data",
      displayName: "Market Data Agent",
      headline: "Resolving the event and its market context",
    },
    {
      role: "settlement_rules",
      displayName: "Settlement Rules Agent",
      headline: "Auditing settlement rules and cutoff wording",
    },
    { role: "research", displayName: "Research Agent", headline: "Searching public evidence" },
    {
      role: "probability_estimator",
      displayName: "Probability Estimator Agent",
      headline: "Converting evidence into a bounded estimate",
    },
    { role: "skeptic", displayName: "Skeptic Agent", headline: "Stress-testing the draft estimate" },
    {
      role: "memo_editor",
      displayName: "Memo Editor Agent",
      headline: "Composing the validated research memo",
    },
  ],
  ad = {
    phase: "idle",
    eventInput: null,
    stages: [],
    market: null,
    kalshi: null,
    estimate: null,
    findings: [],
    evidence: [],
    response: null,
    error: null,
  };
function mM() {
  return hM.map((a) => ({ ...a, status: "pending" }));
}
function pM(a, n) {
  switch (n.type) {
    case "START":
      return { ...ad, phase: "streaming", eventInput: n.eventInput, stages: mM() };
    case "RESET":
      return ad;
    case "TRANSPORT_ERROR":
      return a.phase !== "streaming"
        ? a
        : {
            ...a,
            phase: "failed",
            error: {
              code: "stream_disconnected",
              message: "The analysis stream disconnected before finishing.",
            },
          };
    case "EVENT":
      return yM(a, n.event);
  }
}
function yM(a, n) {
  switch (n.type) {
    case "stage_started":
      return {
        ...a,
        stages: a.stages.map((s) =>
          s.role === n.stage
            ? { ...s, status: "running", displayName: n.displayName, headline: n.headline }
            : s,
        ),
      };
    case "stage_completed":
      return {
        ...a,
        stages: a.stages.map((s) =>
          s.role === n.stage ? { ...s, status: n.status, summary: n.summary } : s,
        ),
      };
    case "market_resolved":
      return { ...a, market: n.market, kalshi: n.kalshi };
    case "estimate_updated":
      return { ...a, estimate: n };
    case "source_found":
      return {
        ...a,
        findings: [
          ...a.findings,
          {
            kind: "source",
            key: `source-${a.findings.length}`,
            title: n.sourceTitle,
            url: n.sourceUrl,
            relevance: n.relevance,
          },
        ],
      };
    case "evidence_added":
      return { ...a, evidence: [...a.evidence, n.evidence] };
    case "settlement_risk_found":
      return {
        ...a,
        findings: [...a.findings, { kind: "risk", key: `risk-${a.findings.length}`, risk: n.risk }],
      };
    case "warning_raised":
      return {
        ...a,
        findings: [
          ...a.findings,
          { kind: "warning", key: `warning-${a.findings.length}`, warning: n.warning },
        ],
      };
    case "final":
      return { ...a, phase: "complete", response: n.response };
    case "error":
      return { ...a, phase: "failed", error: { code: n.code, message: n.message } };
  }
}
var kt;
(function (a) {
  a.assertEqual = (o) => {};
  function n(o) {}
  a.assertIs = n;
  function s(o) {
    throw new Error();
  }
  ((a.assertNever = s),
    (a.arrayToEnum = (o) => {
      const f = {};
      for (const d of o) f[d] = d;
      return f;
    }),
    (a.getValidEnumValues = (o) => {
      const f = a.objectKeys(o).filter((h) => typeof o[o[h]] != "number"),
        d = {};
      for (const h of f) d[h] = o[h];
      return a.objectValues(d);
    }),
    (a.objectValues = (o) =>
      a.objectKeys(o).map(function (f) {
        return o[f];
      })),
    (a.objectKeys =
      typeof Object.keys == "function"
        ? (o) => Object.keys(o)
        : (o) => {
            const f = [];
            for (const d in o) Object.prototype.hasOwnProperty.call(o, d) && f.push(d);
            return f;
          }),
    (a.find = (o, f) => {
      for (const d of o) if (f(d)) return d;
    }),
    (a.isInteger =
      typeof Number.isInteger == "function"
        ? (o) => Number.isInteger(o)
        : (o) => typeof o == "number" && Number.isFinite(o) && Math.floor(o) === o));
  function r(o, f = " | ") {
    return o.map((d) => (typeof d == "string" ? `'${d}'` : d)).join(f);
  }
  ((a.joinValues = r), (a.jsonStringifyReplacer = (o, f) => (typeof f == "bigint" ? f.toString() : f)));
})(kt || (kt = {}));
var Nv;
(function (a) {
  a.mergeShapes = (n, s) => ({ ...n, ...s });
})(Nv || (Nv = {}));
const lt = kt.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  Ea = (a) => {
    switch (typeof a) {
      case "undefined":
        return lt.undefined;
      case "string":
        return lt.string;
      case "number":
        return Number.isNaN(a) ? lt.nan : lt.number;
      case "boolean":
        return lt.boolean;
      case "function":
        return lt.function;
      case "bigint":
        return lt.bigint;
      case "symbol":
        return lt.symbol;
      case "object":
        return Array.isArray(a)
          ? lt.array
          : a === null
            ? lt.null
            : a.then && typeof a.then == "function" && a.catch && typeof a.catch == "function"
              ? lt.promise
              : typeof Map < "u" && a instanceof Map
                ? lt.map
                : typeof Set < "u" && a instanceof Set
                  ? lt.set
                  : typeof Date < "u" && a instanceof Date
                    ? lt.date
                    : lt.object;
      default:
        return lt.unknown;
    }
  },
  Y = kt.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]);
class Fn extends Error {
  get errors() {
    return this.issues;
  }
  constructor(n) {
    (super(),
      (this.issues = []),
      (this.addIssue = (r) => {
        this.issues = [...this.issues, r];
      }),
      (this.addIssues = (r = []) => {
        this.issues = [...this.issues, ...r];
      }));
    const s = new.target.prototype;
    (Object.setPrototypeOf ? Object.setPrototypeOf(this, s) : (this.__proto__ = s),
      (this.name = "ZodError"),
      (this.issues = n));
  }
  format(n) {
    const s =
        n ||
        function (f) {
          return f.message;
        },
      r = { _errors: [] },
      o = (f) => {
        for (const d of f.issues)
          if (d.code === "invalid_union") d.unionErrors.map(o);
          else if (d.code === "invalid_return_type") o(d.returnTypeError);
          else if (d.code === "invalid_arguments") o(d.argumentsError);
          else if (d.path.length === 0) r._errors.push(s(d));
          else {
            let h = r,
              y = 0;
            for (; y < d.path.length; ) {
              const p = d.path[y];
              (y === d.path.length - 1
                ? ((h[p] = h[p] || { _errors: [] }), h[p]._errors.push(s(d)))
                : (h[p] = h[p] || { _errors: [] }),
                (h = h[p]),
                y++);
            }
          }
      };
    return (o(this), r);
  }
  static assert(n) {
    if (!(n instanceof Fn)) throw new Error(`Not a ZodError: ${n}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, kt.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(n = (s) => s.message) {
    const s = {},
      r = [];
    for (const o of this.issues)
      if (o.path.length > 0) {
        const f = o.path[0];
        ((s[f] = s[f] || []), s[f].push(n(o)));
      } else r.push(n(o));
    return { formErrors: r, fieldErrors: s };
  }
  get formErrors() {
    return this.flatten();
  }
}
Fn.create = (a) => new Fn(a);
const id = (a, n) => {
  let s;
  switch (a.code) {
    case Y.invalid_type:
      a.received === lt.undefined ? (s = "Required") : (s = `Expected ${a.expected}, received ${a.received}`);
      break;
    case Y.invalid_literal:
      s = `Invalid literal value, expected ${JSON.stringify(a.expected, kt.jsonStringifyReplacer)}`;
      break;
    case Y.unrecognized_keys:
      s = `Unrecognized key(s) in object: ${kt.joinValues(a.keys, ", ")}`;
      break;
    case Y.invalid_union:
      s = "Invalid input";
      break;
    case Y.invalid_union_discriminator:
      s = `Invalid discriminator value. Expected ${kt.joinValues(a.options)}`;
      break;
    case Y.invalid_enum_value:
      s = `Invalid enum value. Expected ${kt.joinValues(a.options)}, received '${a.received}'`;
      break;
    case Y.invalid_arguments:
      s = "Invalid function arguments";
      break;
    case Y.invalid_return_type:
      s = "Invalid function return type";
      break;
    case Y.invalid_date:
      s = "Invalid date";
      break;
    case Y.invalid_string:
      typeof a.validation == "object"
        ? "includes" in a.validation
          ? ((s = `Invalid input: must include "${a.validation.includes}"`),
            typeof a.validation.position == "number" &&
              (s = `${s} at one or more positions greater than or equal to ${a.validation.position}`))
          : "startsWith" in a.validation
            ? (s = `Invalid input: must start with "${a.validation.startsWith}"`)
            : "endsWith" in a.validation
              ? (s = `Invalid input: must end with "${a.validation.endsWith}"`)
              : kt.assertNever(a.validation)
        : a.validation !== "regex"
          ? (s = `Invalid ${a.validation}`)
          : (s = "Invalid");
      break;
    case Y.too_small:
      a.type === "array"
        ? (s = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "more than"} ${a.minimum} element(s)`)
        : a.type === "string"
          ? (s = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "over"} ${a.minimum} character(s)`)
          : a.type === "number"
            ? (s = `Number must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${a.minimum}`)
            : a.type === "bigint"
              ? (s = `Number must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${a.minimum}`)
              : a.type === "date"
                ? (s = `Date must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(a.minimum))}`)
                : (s = "Invalid input");
      break;
    case Y.too_big:
      a.type === "array"
        ? (s = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "less than"} ${a.maximum} element(s)`)
        : a.type === "string"
          ? (s = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "under"} ${a.maximum} character(s)`)
          : a.type === "number"
            ? (s = `Number must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}`)
            : a.type === "bigint"
              ? (s = `BigInt must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}`)
              : a.type === "date"
                ? (s = `Date must be ${a.exact ? "exactly" : a.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(a.maximum))}`)
                : (s = "Invalid input");
      break;
    case Y.custom:
      s = "Invalid input";
      break;
    case Y.invalid_intersection_types:
      s = "Intersection results could not be merged";
      break;
    case Y.not_multiple_of:
      s = `Number must be a multiple of ${a.multipleOf}`;
      break;
    case Y.not_finite:
      s = "Number must be finite";
      break;
    default:
      ((s = n.defaultError), kt.assertNever(a));
  }
  return { message: s };
};
let gM = id;
function vM() {
  return gM;
}
const bM = (a) => {
  const { data: n, path: s, errorMaps: r, issueData: o } = a,
    f = [...s, ...(o.path || [])],
    d = { ...o, path: f };
  if (o.message !== void 0) return { ...o, path: f, message: o.message };
  let h = "";
  const y = r
    .filter((p) => !!p)
    .slice()
    .reverse();
  for (const p of y) h = p(d, { data: n, defaultError: h }).message;
  return { ...o, path: f, message: h };
};
function I(a, n) {
  const s = vM(),
    r = bM({
      issueData: n,
      data: a.data,
      path: a.path,
      errorMaps: [a.common.contextualErrorMap, a.schemaErrorMap, s, s === id ? void 0 : id].filter(
        (o) => !!o,
      ),
    });
  a.common.issues.push(r);
}
class Qe {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(n, s) {
    const r = [];
    for (const o of s) {
      if (o.status === "aborted") return yt;
      (o.status === "dirty" && n.dirty(), r.push(o.value));
    }
    return { status: n.value, value: r };
  }
  static async mergeObjectAsync(n, s) {
    const r = [];
    for (const o of s) {
      const f = await o.key,
        d = await o.value;
      r.push({ key: f, value: d });
    }
    return Qe.mergeObjectSync(n, r);
  }
  static mergeObjectSync(n, s) {
    const r = {};
    for (const o of s) {
      const { key: f, value: d } = o;
      if (f.status === "aborted" || d.status === "aborted") return yt;
      (f.status === "dirty" && n.dirty(),
        d.status === "dirty" && n.dirty(),
        f.value !== "__proto__" && (typeof d.value < "u" || o.alwaysSet) && (r[f.value] = d.value));
    }
    return { status: n.value, value: r };
  }
}
const yt = Object.freeze({ status: "aborted" }),
  ml = (a) => ({ status: "dirty", value: a }),
  on = (a) => ({ status: "valid", value: a }),
  jv = (a) => a.status === "aborted",
  Vv = (a) => a.status === "dirty",
  os = (a) => a.status === "valid",
  So = (a) => typeof Promise < "u" && a instanceof Promise;
var ft;
(function (a) {
  ((a.errToObj = (n) => (typeof n == "string" ? { message: n } : n || {})),
    (a.toString = (n) => (typeof n == "string" ? n : n == null ? void 0 : n.message)));
})(ft || (ft = {}));
class Ra {
  constructor(n, s, r, o) {
    ((this._cachedPath = []), (this.parent = n), (this.data = s), (this._path = r), (this._key = o));
  }
  get path() {
    return (
      this._cachedPath.length ||
        (Array.isArray(this._key)
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const Uv = (a, n) => {
  if (os(n)) return { success: !0, data: n.value };
  if (!a.common.issues.length) throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const s = new Fn(a.common.issues);
      return ((this._error = s), this._error);
    },
  };
};
function Et(a) {
  if (!a) return {};
  const { errorMap: n, invalid_type_error: s, required_error: r, description: o } = a;
  if (n && (s || r))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  return n
    ? { errorMap: n, description: o }
    : {
        errorMap: (d, h) => {
          const { message: y } = a;
          return d.code === "invalid_enum_value"
            ? { message: y ?? h.defaultError }
            : typeof h.data > "u"
              ? { message: y ?? r ?? h.defaultError }
              : d.code !== "invalid_type"
                ? { message: h.defaultError }
                : { message: y ?? s ?? h.defaultError };
        },
        description: o,
      };
}
class zt {
  get description() {
    return this._def.description;
  }
  _getType(n) {
    return Ea(n.data);
  }
  _getOrReturnCtx(n, s) {
    return (
      s || {
        common: n.parent.common,
        data: n.data,
        parsedType: Ea(n.data),
        schemaErrorMap: this._def.errorMap,
        path: n.path,
        parent: n.parent,
      }
    );
  }
  _processInputParams(n) {
    return {
      status: new Qe(),
      ctx: {
        common: n.parent.common,
        data: n.data,
        parsedType: Ea(n.data),
        schemaErrorMap: this._def.errorMap,
        path: n.path,
        parent: n.parent,
      },
    };
  }
  _parseSync(n) {
    const s = this._parse(n);
    if (So(s)) throw new Error("Synchronous parse encountered promise.");
    return s;
  }
  _parseAsync(n) {
    const s = this._parse(n);
    return Promise.resolve(s);
  }
  parse(n, s) {
    const r = this.safeParse(n, s);
    if (r.success) return r.data;
    throw r.error;
  }
  safeParse(n, s) {
    const r = {
        common: {
          issues: [],
          async: (s == null ? void 0 : s.async) ?? !1,
          contextualErrorMap: s == null ? void 0 : s.errorMap,
        },
        path: (s == null ? void 0 : s.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: n,
        parsedType: Ea(n),
      },
      o = this._parseSync({ data: n, path: r.path, parent: r });
    return Uv(r, o);
  }
  "~validate"(n) {
    var r, o;
    const s = {
      common: { issues: [], async: !!this["~standard"].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: n,
      parsedType: Ea(n),
    };
    if (!this["~standard"].async)
      try {
        const f = this._parseSync({ data: n, path: [], parent: s });
        return os(f) ? { value: f.value } : { issues: s.common.issues };
      } catch (f) {
        ((o = (r = f == null ? void 0 : f.message) == null ? void 0 : r.toLowerCase()) != null &&
          o.includes("encountered") &&
          (this["~standard"].async = !0),
          (s.common = { issues: [], async: !0 }));
      }
    return this._parseAsync({ data: n, path: [], parent: s }).then((f) =>
      os(f) ? { value: f.value } : { issues: s.common.issues },
    );
  }
  async parseAsync(n, s) {
    const r = await this.safeParseAsync(n, s);
    if (r.success) return r.data;
    throw r.error;
  }
  async safeParseAsync(n, s) {
    const r = {
        common: { issues: [], contextualErrorMap: s == null ? void 0 : s.errorMap, async: !0 },
        path: (s == null ? void 0 : s.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: n,
        parsedType: Ea(n),
      },
      o = this._parse({ data: n, path: r.path, parent: r }),
      f = await (So(o) ? o : Promise.resolve(o));
    return Uv(r, f);
  }
  refine(n, s) {
    const r = (o) =>
      typeof s == "string" || typeof s > "u" ? { message: s } : typeof s == "function" ? s(o) : s;
    return this._refinement((o, f) => {
      const d = n(o),
        h = () => f.addIssue({ code: Y.custom, ...r(o) });
      return typeof Promise < "u" && d instanceof Promise
        ? d.then((y) => (y ? !0 : (h(), !1)))
        : d
          ? !0
          : (h(), !1);
    });
  }
  refinement(n, s) {
    return this._refinement((r, o) => (n(r) ? !0 : (o.addIssue(typeof s == "function" ? s(r, o) : s), !1)));
  }
  _refinement(n) {
    return new fi({ schema: this, typeName: gt.ZodEffects, effect: { type: "refinement", refinement: n } });
  }
  superRefine(n) {
    return this._refinement(n);
  }
  constructor(n) {
    ((this.spa = this.safeParseAsync),
      (this._def = n),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this["~standard"] = { version: 1, vendor: "zod", validate: (s) => this["~validate"](s) }));
  }
  optional() {
    return Jn.create(this, this._def);
  }
  nullable() {
    return di.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return _n.create(this);
  }
  promise() {
    return wo.create(this, this._def);
  }
  or(n) {
    return Ao.create([this, n], this._def);
  }
  and(n) {
    return _o.create(this, n, this._def);
  }
  transform(n) {
    return new fi({
      ...Et(this._def),
      schema: this,
      typeName: gt.ZodEffects,
      effect: { type: "transform", transform: n },
    });
  }
  default(n) {
    const s = typeof n == "function" ? n : () => n;
    return new Mo({ ...Et(this._def), innerType: this, defaultValue: s, typeName: gt.ZodDefault });
  }
  brand() {
    return new lx({ typeName: gt.ZodBranded, type: this, ...Et(this._def) });
  }
  catch(n) {
    const s = typeof n == "function" ? n : () => n;
    return new Co({ ...Et(this._def), innerType: this, catchValue: s, typeName: gt.ZodCatch });
  }
  describe(n) {
    const s = this.constructor;
    return new s({ ...this._def, description: n });
  }
  pipe(n) {
    return Kd.create(this, n);
  }
  readonly() {
    return Do.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const xM = /^c[^\s-]{8,}$/i,
  SM = /^[0-9a-z]+$/,
  TM = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  AM = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  _M = /^[a-z0-9_-]{21}$/i,
  EM = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  wM =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  MM = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  CM = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let wf;
const DM =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  RM =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  OM =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  zM =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  kM = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  NM = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  ax =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  jM = new RegExp(`^${ax}$`);
function ix(a) {
  let n = "[0-5]\\d";
  a.precision ? (n = `${n}\\.\\d{${a.precision}}`) : a.precision == null && (n = `${n}(\\.\\d+)?`);
  const s = a.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${n})${s}`;
}
function VM(a) {
  return new RegExp(`^${ix(a)}$`);
}
function UM(a) {
  let n = `${ax}T${ix(a)}`;
  const s = [];
  return (
    s.push(a.local ? "Z?" : "Z"),
    a.offset && s.push("([+-]\\d{2}:?\\d{2})"),
    (n = `${n}(${s.join("|")})`),
    new RegExp(`^${n}$`)
  );
}
function BM(a, n) {
  return !!(((n === "v4" || !n) && DM.test(a)) || ((n === "v6" || !n) && OM.test(a)));
}
function LM(a, n) {
  if (!EM.test(a)) return !1;
  try {
    const [s] = a.split(".");
    if (!s) return !1;
    const r = s
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(s.length + ((4 - (s.length % 4)) % 4), "="),
      o = JSON.parse(atob(r));
    return !(
      typeof o != "object" ||
      o === null ||
      ("typ" in o && (o == null ? void 0 : o.typ) !== "JWT") ||
      !o.alg ||
      (n && o.alg !== n)
    );
  } catch {
    return !1;
  }
}
function HM(a, n) {
  return !!(((n === "v4" || !n) && RM.test(a)) || ((n === "v6" || !n) && zM.test(a)));
}
class Ma extends zt {
  _parse(n) {
    if ((this._def.coerce && (n.data = String(n.data)), this._getType(n) !== lt.string)) {
      const f = this._getOrReturnCtx(n);
      return (I(f, { code: Y.invalid_type, expected: lt.string, received: f.parsedType }), yt);
    }
    const r = new Qe();
    let o;
    for (const f of this._def.checks)
      if (f.kind === "min")
        n.data.length < f.value &&
          ((o = this._getOrReturnCtx(n, o)),
          I(o, {
            code: Y.too_small,
            minimum: f.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: f.message,
          }),
          r.dirty());
      else if (f.kind === "max")
        n.data.length > f.value &&
          ((o = this._getOrReturnCtx(n, o)),
          I(o, {
            code: Y.too_big,
            maximum: f.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: f.message,
          }),
          r.dirty());
      else if (f.kind === "length") {
        const d = n.data.length > f.value,
          h = n.data.length < f.value;
        (d || h) &&
          ((o = this._getOrReturnCtx(n, o)),
          d
            ? I(o, {
                code: Y.too_big,
                maximum: f.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: f.message,
              })
            : h &&
              I(o, {
                code: Y.too_small,
                minimum: f.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: f.message,
              }),
          r.dirty());
      } else if (f.kind === "email")
        MM.test(n.data) ||
          ((o = this._getOrReturnCtx(n, o)),
          I(o, { validation: "email", code: Y.invalid_string, message: f.message }),
          r.dirty());
      else if (f.kind === "emoji")
        (wf || (wf = new RegExp(CM, "u")),
          wf.test(n.data) ||
            ((o = this._getOrReturnCtx(n, o)),
            I(o, { validation: "emoji", code: Y.invalid_string, message: f.message }),
            r.dirty()));
      else if (f.kind === "uuid")
        AM.test(n.data) ||
          ((o = this._getOrReturnCtx(n, o)),
          I(o, { validation: "uuid", code: Y.invalid_string, message: f.message }),
          r.dirty());
      else if (f.kind === "nanoid")
        _M.test(n.data) ||
          ((o = this._getOrReturnCtx(n, o)),
          I(o, { validation: "nanoid", code: Y.invalid_string, message: f.message }),
          r.dirty());
      else if (f.kind === "cuid")
        xM.test(n.data) ||
          ((o = this._getOrReturnCtx(n, o)),
          I(o, { validation: "cuid", code: Y.invalid_string, message: f.message }),
          r.dirty());
      else if (f.kind === "cuid2")
        SM.test(n.data) ||
          ((o = this._getOrReturnCtx(n, o)),
          I(o, { validation: "cuid2", code: Y.invalid_string, message: f.message }),
          r.dirty());
      else if (f.kind === "ulid")
        TM.test(n.data) ||
          ((o = this._getOrReturnCtx(n, o)),
          I(o, { validation: "ulid", code: Y.invalid_string, message: f.message }),
          r.dirty());
      else if (f.kind === "url")
        try {
          new URL(n.data);
        } catch {
          ((o = this._getOrReturnCtx(n, o)),
            I(o, { validation: "url", code: Y.invalid_string, message: f.message }),
            r.dirty());
        }
      else
        f.kind === "regex"
          ? ((f.regex.lastIndex = 0),
            f.regex.test(n.data) ||
              ((o = this._getOrReturnCtx(n, o)),
              I(o, { validation: "regex", code: Y.invalid_string, message: f.message }),
              r.dirty()))
          : f.kind === "trim"
            ? (n.data = n.data.trim())
            : f.kind === "includes"
              ? n.data.includes(f.value, f.position) ||
                ((o = this._getOrReturnCtx(n, o)),
                I(o, {
                  code: Y.invalid_string,
                  validation: { includes: f.value, position: f.position },
                  message: f.message,
                }),
                r.dirty())
              : f.kind === "toLowerCase"
                ? (n.data = n.data.toLowerCase())
                : f.kind === "toUpperCase"
                  ? (n.data = n.data.toUpperCase())
                  : f.kind === "startsWith"
                    ? n.data.startsWith(f.value) ||
                      ((o = this._getOrReturnCtx(n, o)),
                      I(o, {
                        code: Y.invalid_string,
                        validation: { startsWith: f.value },
                        message: f.message,
                      }),
                      r.dirty())
                    : f.kind === "endsWith"
                      ? n.data.endsWith(f.value) ||
                        ((o = this._getOrReturnCtx(n, o)),
                        I(o, {
                          code: Y.invalid_string,
                          validation: { endsWith: f.value },
                          message: f.message,
                        }),
                        r.dirty())
                      : f.kind === "datetime"
                        ? UM(f).test(n.data) ||
                          ((o = this._getOrReturnCtx(n, o)),
                          I(o, { code: Y.invalid_string, validation: "datetime", message: f.message }),
                          r.dirty())
                        : f.kind === "date"
                          ? jM.test(n.data) ||
                            ((o = this._getOrReturnCtx(n, o)),
                            I(o, { code: Y.invalid_string, validation: "date", message: f.message }),
                            r.dirty())
                          : f.kind === "time"
                            ? VM(f).test(n.data) ||
                              ((o = this._getOrReturnCtx(n, o)),
                              I(o, { code: Y.invalid_string, validation: "time", message: f.message }),
                              r.dirty())
                            : f.kind === "duration"
                              ? wM.test(n.data) ||
                                ((o = this._getOrReturnCtx(n, o)),
                                I(o, { validation: "duration", code: Y.invalid_string, message: f.message }),
                                r.dirty())
                              : f.kind === "ip"
                                ? BM(n.data, f.version) ||
                                  ((o = this._getOrReturnCtx(n, o)),
                                  I(o, { validation: "ip", code: Y.invalid_string, message: f.message }),
                                  r.dirty())
                                : f.kind === "jwt"
                                  ? LM(n.data, f.alg) ||
                                    ((o = this._getOrReturnCtx(n, o)),
                                    I(o, { validation: "jwt", code: Y.invalid_string, message: f.message }),
                                    r.dirty())
                                  : f.kind === "cidr"
                                    ? HM(n.data, f.version) ||
                                      ((o = this._getOrReturnCtx(n, o)),
                                      I(o, {
                                        validation: "cidr",
                                        code: Y.invalid_string,
                                        message: f.message,
                                      }),
                                      r.dirty())
                                    : f.kind === "base64"
                                      ? kM.test(n.data) ||
                                        ((o = this._getOrReturnCtx(n, o)),
                                        I(o, {
                                          validation: "base64",
                                          code: Y.invalid_string,
                                          message: f.message,
                                        }),
                                        r.dirty())
                                      : f.kind === "base64url"
                                        ? NM.test(n.data) ||
                                          ((o = this._getOrReturnCtx(n, o)),
                                          I(o, {
                                            validation: "base64url",
                                            code: Y.invalid_string,
                                            message: f.message,
                                          }),
                                          r.dirty())
                                        : kt.assertNever(f);
    return { status: r.value, value: n.data };
  }
  _regex(n, s, r) {
    return this.refinement((o) => n.test(o), { validation: s, code: Y.invalid_string, ...ft.errToObj(r) });
  }
  _addCheck(n) {
    return new Ma({ ...this._def, checks: [...this._def.checks, n] });
  }
  email(n) {
    return this._addCheck({ kind: "email", ...ft.errToObj(n) });
  }
  url(n) {
    return this._addCheck({ kind: "url", ...ft.errToObj(n) });
  }
  emoji(n) {
    return this._addCheck({ kind: "emoji", ...ft.errToObj(n) });
  }
  uuid(n) {
    return this._addCheck({ kind: "uuid", ...ft.errToObj(n) });
  }
  nanoid(n) {
    return this._addCheck({ kind: "nanoid", ...ft.errToObj(n) });
  }
  cuid(n) {
    return this._addCheck({ kind: "cuid", ...ft.errToObj(n) });
  }
  cuid2(n) {
    return this._addCheck({ kind: "cuid2", ...ft.errToObj(n) });
  }
  ulid(n) {
    return this._addCheck({ kind: "ulid", ...ft.errToObj(n) });
  }
  base64(n) {
    return this._addCheck({ kind: "base64", ...ft.errToObj(n) });
  }
  base64url(n) {
    return this._addCheck({ kind: "base64url", ...ft.errToObj(n) });
  }
  jwt(n) {
    return this._addCheck({ kind: "jwt", ...ft.errToObj(n) });
  }
  ip(n) {
    return this._addCheck({ kind: "ip", ...ft.errToObj(n) });
  }
  cidr(n) {
    return this._addCheck({ kind: "cidr", ...ft.errToObj(n) });
  }
  datetime(n) {
    return typeof n == "string"
      ? this._addCheck({ kind: "datetime", precision: null, offset: !1, local: !1, message: n })
      : this._addCheck({
          kind: "datetime",
          precision:
            typeof (n == null ? void 0 : n.precision) > "u" ? null : n == null ? void 0 : n.precision,
          offset: (n == null ? void 0 : n.offset) ?? !1,
          local: (n == null ? void 0 : n.local) ?? !1,
          ...ft.errToObj(n == null ? void 0 : n.message),
        });
  }
  date(n) {
    return this._addCheck({ kind: "date", message: n });
  }
  time(n) {
    return typeof n == "string"
      ? this._addCheck({ kind: "time", precision: null, message: n })
      : this._addCheck({
          kind: "time",
          precision:
            typeof (n == null ? void 0 : n.precision) > "u" ? null : n == null ? void 0 : n.precision,
          ...ft.errToObj(n == null ? void 0 : n.message),
        });
  }
  duration(n) {
    return this._addCheck({ kind: "duration", ...ft.errToObj(n) });
  }
  regex(n, s) {
    return this._addCheck({ kind: "regex", regex: n, ...ft.errToObj(s) });
  }
  includes(n, s) {
    return this._addCheck({
      kind: "includes",
      value: n,
      position: s == null ? void 0 : s.position,
      ...ft.errToObj(s == null ? void 0 : s.message),
    });
  }
  startsWith(n, s) {
    return this._addCheck({ kind: "startsWith", value: n, ...ft.errToObj(s) });
  }
  endsWith(n, s) {
    return this._addCheck({ kind: "endsWith", value: n, ...ft.errToObj(s) });
  }
  min(n, s) {
    return this._addCheck({ kind: "min", value: n, ...ft.errToObj(s) });
  }
  max(n, s) {
    return this._addCheck({ kind: "max", value: n, ...ft.errToObj(s) });
  }
  length(n, s) {
    return this._addCheck({ kind: "length", value: n, ...ft.errToObj(s) });
  }
  nonempty(n) {
    return this.min(1, ft.errToObj(n));
  }
  trim() {
    return new Ma({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
  }
  toLowerCase() {
    return new Ma({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
  }
  toUpperCase() {
    return new Ma({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
  }
  get isDatetime() {
    return !!this._def.checks.find((n) => n.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((n) => n.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((n) => n.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((n) => n.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((n) => n.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((n) => n.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((n) => n.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((n) => n.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((n) => n.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((n) => n.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((n) => n.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((n) => n.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((n) => n.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((n) => n.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((n) => n.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((n) => n.kind === "base64url");
  }
  get minLength() {
    let n = null;
    for (const s of this._def.checks) s.kind === "min" && (n === null || s.value > n) && (n = s.value);
    return n;
  }
  get maxLength() {
    let n = null;
    for (const s of this._def.checks) s.kind === "max" && (n === null || s.value < n) && (n = s.value);
    return n;
  }
}
Ma.create = (a) =>
  new Ma({ checks: [], typeName: gt.ZodString, coerce: (a == null ? void 0 : a.coerce) ?? !1, ...Et(a) });
function ZM(a, n) {
  const s = (a.toString().split(".")[1] || "").length,
    r = (n.toString().split(".")[1] || "").length,
    o = s > r ? s : r,
    f = Number.parseInt(a.toFixed(o).replace(".", "")),
    d = Number.parseInt(n.toFixed(o).replace(".", ""));
  return (f % d) / 10 ** o;
}
class us extends zt {
  constructor() {
    (super(...arguments), (this.min = this.gte), (this.max = this.lte), (this.step = this.multipleOf));
  }
  _parse(n) {
    if ((this._def.coerce && (n.data = Number(n.data)), this._getType(n) !== lt.number)) {
      const f = this._getOrReturnCtx(n);
      return (I(f, { code: Y.invalid_type, expected: lt.number, received: f.parsedType }), yt);
    }
    let r;
    const o = new Qe();
    for (const f of this._def.checks)
      f.kind === "int"
        ? kt.isInteger(n.data) ||
          ((r = this._getOrReturnCtx(n, r)),
          I(r, { code: Y.invalid_type, expected: "integer", received: "float", message: f.message }),
          o.dirty())
        : f.kind === "min"
          ? (f.inclusive ? n.data < f.value : n.data <= f.value) &&
            ((r = this._getOrReturnCtx(n, r)),
            I(r, {
              code: Y.too_small,
              minimum: f.value,
              type: "number",
              inclusive: f.inclusive,
              exact: !1,
              message: f.message,
            }),
            o.dirty())
          : f.kind === "max"
            ? (f.inclusive ? n.data > f.value : n.data >= f.value) &&
              ((r = this._getOrReturnCtx(n, r)),
              I(r, {
                code: Y.too_big,
                maximum: f.value,
                type: "number",
                inclusive: f.inclusive,
                exact: !1,
                message: f.message,
              }),
              o.dirty())
            : f.kind === "multipleOf"
              ? ZM(n.data, f.value) !== 0 &&
                ((r = this._getOrReturnCtx(n, r)),
                I(r, { code: Y.not_multiple_of, multipleOf: f.value, message: f.message }),
                o.dirty())
              : f.kind === "finite"
                ? Number.isFinite(n.data) ||
                  ((r = this._getOrReturnCtx(n, r)),
                  I(r, { code: Y.not_finite, message: f.message }),
                  o.dirty())
                : kt.assertNever(f);
    return { status: o.value, value: n.data };
  }
  gte(n, s) {
    return this.setLimit("min", n, !0, ft.toString(s));
  }
  gt(n, s) {
    return this.setLimit("min", n, !1, ft.toString(s));
  }
  lte(n, s) {
    return this.setLimit("max", n, !0, ft.toString(s));
  }
  lt(n, s) {
    return this.setLimit("max", n, !1, ft.toString(s));
  }
  setLimit(n, s, r, o) {
    return new us({
      ...this._def,
      checks: [...this._def.checks, { kind: n, value: s, inclusive: r, message: ft.toString(o) }],
    });
  }
  _addCheck(n) {
    return new us({ ...this._def, checks: [...this._def.checks, n] });
  }
  int(n) {
    return this._addCheck({ kind: "int", message: ft.toString(n) });
  }
  positive(n) {
    return this._addCheck({ kind: "min", value: 0, inclusive: !1, message: ft.toString(n) });
  }
  negative(n) {
    return this._addCheck({ kind: "max", value: 0, inclusive: !1, message: ft.toString(n) });
  }
  nonpositive(n) {
    return this._addCheck({ kind: "max", value: 0, inclusive: !0, message: ft.toString(n) });
  }
  nonnegative(n) {
    return this._addCheck({ kind: "min", value: 0, inclusive: !0, message: ft.toString(n) });
  }
  multipleOf(n, s) {
    return this._addCheck({ kind: "multipleOf", value: n, message: ft.toString(s) });
  }
  finite(n) {
    return this._addCheck({ kind: "finite", message: ft.toString(n) });
  }
  safe(n) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: ft.toString(n),
    })._addCheck({ kind: "max", inclusive: !0, value: Number.MAX_SAFE_INTEGER, message: ft.toString(n) });
  }
  get minValue() {
    let n = null;
    for (const s of this._def.checks) s.kind === "min" && (n === null || s.value > n) && (n = s.value);
    return n;
  }
  get maxValue() {
    let n = null;
    for (const s of this._def.checks) s.kind === "max" && (n === null || s.value < n) && (n = s.value);
    return n;
  }
  get isInt() {
    return !!this._def.checks.find(
      (n) => n.kind === "int" || (n.kind === "multipleOf" && kt.isInteger(n.value)),
    );
  }
  get isFinite() {
    let n = null,
      s = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf") return !0;
      r.kind === "min"
        ? (s === null || r.value > s) && (s = r.value)
        : r.kind === "max" && (n === null || r.value < n) && (n = r.value);
    }
    return Number.isFinite(s) && Number.isFinite(n);
  }
}
us.create = (a) =>
  new us({ checks: [], typeName: gt.ZodNumber, coerce: (a == null ? void 0 : a.coerce) || !1, ...Et(a) });
class wl extends zt {
  constructor() {
    (super(...arguments), (this.min = this.gte), (this.max = this.lte));
  }
  _parse(n) {
    if (this._def.coerce)
      try {
        n.data = BigInt(n.data);
      } catch {
        return this._getInvalidInput(n);
      }
    if (this._getType(n) !== lt.bigint) return this._getInvalidInput(n);
    let r;
    const o = new Qe();
    for (const f of this._def.checks)
      f.kind === "min"
        ? (f.inclusive ? n.data < f.value : n.data <= f.value) &&
          ((r = this._getOrReturnCtx(n, r)),
          I(r, {
            code: Y.too_small,
            type: "bigint",
            minimum: f.value,
            inclusive: f.inclusive,
            message: f.message,
          }),
          o.dirty())
        : f.kind === "max"
          ? (f.inclusive ? n.data > f.value : n.data >= f.value) &&
            ((r = this._getOrReturnCtx(n, r)),
            I(r, {
              code: Y.too_big,
              type: "bigint",
              maximum: f.value,
              inclusive: f.inclusive,
              message: f.message,
            }),
            o.dirty())
          : f.kind === "multipleOf"
            ? n.data % f.value !== BigInt(0) &&
              ((r = this._getOrReturnCtx(n, r)),
              I(r, { code: Y.not_multiple_of, multipleOf: f.value, message: f.message }),
              o.dirty())
            : kt.assertNever(f);
    return { status: o.value, value: n.data };
  }
  _getInvalidInput(n) {
    const s = this._getOrReturnCtx(n);
    return (I(s, { code: Y.invalid_type, expected: lt.bigint, received: s.parsedType }), yt);
  }
  gte(n, s) {
    return this.setLimit("min", n, !0, ft.toString(s));
  }
  gt(n, s) {
    return this.setLimit("min", n, !1, ft.toString(s));
  }
  lte(n, s) {
    return this.setLimit("max", n, !0, ft.toString(s));
  }
  lt(n, s) {
    return this.setLimit("max", n, !1, ft.toString(s));
  }
  setLimit(n, s, r, o) {
    return new wl({
      ...this._def,
      checks: [...this._def.checks, { kind: n, value: s, inclusive: r, message: ft.toString(o) }],
    });
  }
  _addCheck(n) {
    return new wl({ ...this._def, checks: [...this._def.checks, n] });
  }
  positive(n) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: !1, message: ft.toString(n) });
  }
  negative(n) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: !1, message: ft.toString(n) });
  }
  nonpositive(n) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: !0, message: ft.toString(n) });
  }
  nonnegative(n) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: !0, message: ft.toString(n) });
  }
  multipleOf(n, s) {
    return this._addCheck({ kind: "multipleOf", value: n, message: ft.toString(s) });
  }
  get minValue() {
    let n = null;
    for (const s of this._def.checks) s.kind === "min" && (n === null || s.value > n) && (n = s.value);
    return n;
  }
  get maxValue() {
    let n = null;
    for (const s of this._def.checks) s.kind === "max" && (n === null || s.value < n) && (n = s.value);
    return n;
  }
}
wl.create = (a) =>
  new wl({ checks: [], typeName: gt.ZodBigInt, coerce: (a == null ? void 0 : a.coerce) ?? !1, ...Et(a) });
class sd extends zt {
  _parse(n) {
    if ((this._def.coerce && (n.data = !!n.data), this._getType(n) !== lt.boolean)) {
      const r = this._getOrReturnCtx(n);
      return (I(r, { code: Y.invalid_type, expected: lt.boolean, received: r.parsedType }), yt);
    }
    return on(n.data);
  }
}
sd.create = (a) =>
  new sd({ typeName: gt.ZodBoolean, coerce: (a == null ? void 0 : a.coerce) || !1, ...Et(a) });
class To extends zt {
  _parse(n) {
    if ((this._def.coerce && (n.data = new Date(n.data)), this._getType(n) !== lt.date)) {
      const f = this._getOrReturnCtx(n);
      return (I(f, { code: Y.invalid_type, expected: lt.date, received: f.parsedType }), yt);
    }
    if (Number.isNaN(n.data.getTime())) {
      const f = this._getOrReturnCtx(n);
      return (I(f, { code: Y.invalid_date }), yt);
    }
    const r = new Qe();
    let o;
    for (const f of this._def.checks)
      f.kind === "min"
        ? n.data.getTime() < f.value &&
          ((o = this._getOrReturnCtx(n, o)),
          I(o, {
            code: Y.too_small,
            message: f.message,
            inclusive: !0,
            exact: !1,
            minimum: f.value,
            type: "date",
          }),
          r.dirty())
        : f.kind === "max"
          ? n.data.getTime() > f.value &&
            ((o = this._getOrReturnCtx(n, o)),
            I(o, {
              code: Y.too_big,
              message: f.message,
              inclusive: !0,
              exact: !1,
              maximum: f.value,
              type: "date",
            }),
            r.dirty())
          : kt.assertNever(f);
    return { status: r.value, value: new Date(n.data.getTime()) };
  }
  _addCheck(n) {
    return new To({ ...this._def, checks: [...this._def.checks, n] });
  }
  min(n, s) {
    return this._addCheck({ kind: "min", value: n.getTime(), message: ft.toString(s) });
  }
  max(n, s) {
    return this._addCheck({ kind: "max", value: n.getTime(), message: ft.toString(s) });
  }
  get minDate() {
    let n = null;
    for (const s of this._def.checks) s.kind === "min" && (n === null || s.value > n) && (n = s.value);
    return n != null ? new Date(n) : null;
  }
  get maxDate() {
    let n = null;
    for (const s of this._def.checks) s.kind === "max" && (n === null || s.value < n) && (n = s.value);
    return n != null ? new Date(n) : null;
  }
}
To.create = (a) =>
  new To({ checks: [], coerce: (a == null ? void 0 : a.coerce) || !1, typeName: gt.ZodDate, ...Et(a) });
class Bv extends zt {
  _parse(n) {
    if (this._getType(n) !== lt.symbol) {
      const r = this._getOrReturnCtx(n);
      return (I(r, { code: Y.invalid_type, expected: lt.symbol, received: r.parsedType }), yt);
    }
    return on(n.data);
  }
}
Bv.create = (a) => new Bv({ typeName: gt.ZodSymbol, ...Et(a) });
class ld extends zt {
  _parse(n) {
    if (this._getType(n) !== lt.undefined) {
      const r = this._getOrReturnCtx(n);
      return (I(r, { code: Y.invalid_type, expected: lt.undefined, received: r.parsedType }), yt);
    }
    return on(n.data);
  }
}
ld.create = (a) => new ld({ typeName: gt.ZodUndefined, ...Et(a) });
class rd extends zt {
  _parse(n) {
    if (this._getType(n) !== lt.null) {
      const r = this._getOrReturnCtx(n);
      return (I(r, { code: Y.invalid_type, expected: lt.null, received: r.parsedType }), yt);
    }
    return on(n.data);
  }
}
rd.create = (a) => new rd({ typeName: gt.ZodNull, ...Et(a) });
class Lv extends zt {
  constructor() {
    (super(...arguments), (this._any = !0));
  }
  _parse(n) {
    return on(n.data);
  }
}
Lv.create = (a) => new Lv({ typeName: gt.ZodAny, ...Et(a) });
class Hv extends zt {
  constructor() {
    (super(...arguments), (this._unknown = !0));
  }
  _parse(n) {
    return on(n.data);
  }
}
Hv.create = (a) => new Hv({ typeName: gt.ZodUnknown, ...Et(a) });
class Oa extends zt {
  _parse(n) {
    const s = this._getOrReturnCtx(n);
    return (I(s, { code: Y.invalid_type, expected: lt.never, received: s.parsedType }), yt);
  }
}
Oa.create = (a) => new Oa({ typeName: gt.ZodNever, ...Et(a) });
class Zv extends zt {
  _parse(n) {
    if (this._getType(n) !== lt.undefined) {
      const r = this._getOrReturnCtx(n);
      return (I(r, { code: Y.invalid_type, expected: lt.void, received: r.parsedType }), yt);
    }
    return on(n.data);
  }
}
Zv.create = (a) => new Zv({ typeName: gt.ZodVoid, ...Et(a) });
class _n extends zt {
  _parse(n) {
    const { ctx: s, status: r } = this._processInputParams(n),
      o = this._def;
    if (s.parsedType !== lt.array)
      return (I(s, { code: Y.invalid_type, expected: lt.array, received: s.parsedType }), yt);
    if (o.exactLength !== null) {
      const d = s.data.length > o.exactLength.value,
        h = s.data.length < o.exactLength.value;
      (d || h) &&
        (I(s, {
          code: d ? Y.too_big : Y.too_small,
          minimum: h ? o.exactLength.value : void 0,
          maximum: d ? o.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: o.exactLength.message,
        }),
        r.dirty());
    }
    if (
      (o.minLength !== null &&
        s.data.length < o.minLength.value &&
        (I(s, {
          code: Y.too_small,
          minimum: o.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: o.minLength.message,
        }),
        r.dirty()),
      o.maxLength !== null &&
        s.data.length > o.maxLength.value &&
        (I(s, {
          code: Y.too_big,
          maximum: o.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: o.maxLength.message,
        }),
        r.dirty()),
      s.common.async)
    )
      return Promise.all([...s.data].map((d, h) => o.type._parseAsync(new Ra(s, d, s.path, h)))).then((d) =>
        Qe.mergeArray(r, d),
      );
    const f = [...s.data].map((d, h) => o.type._parseSync(new Ra(s, d, s.path, h)));
    return Qe.mergeArray(r, f);
  }
  get element() {
    return this._def.type;
  }
  min(n, s) {
    return new _n({ ...this._def, minLength: { value: n, message: ft.toString(s) } });
  }
  max(n, s) {
    return new _n({ ...this._def, maxLength: { value: n, message: ft.toString(s) } });
  }
  length(n, s) {
    return new _n({ ...this._def, exactLength: { value: n, message: ft.toString(s) } });
  }
  nonempty(n) {
    return this.min(1, n);
  }
}
_n.create = (a, n) =>
  new _n({ type: a, minLength: null, maxLength: null, exactLength: null, typeName: gt.ZodArray, ...Et(n) });
function ts(a) {
  if (a instanceof ce) {
    const n = {};
    for (const s in a.shape) {
      const r = a.shape[s];
      n[s] = Jn.create(ts(r));
    }
    return new ce({ ...a._def, shape: () => n });
  } else
    return a instanceof _n
      ? new _n({ ...a._def, type: ts(a.element) })
      : a instanceof Jn
        ? Jn.create(ts(a.unwrap()))
        : a instanceof di
          ? di.create(ts(a.unwrap()))
          : a instanceof ui
            ? ui.create(a.items.map((n) => ts(n)))
            : a;
}
class ce extends zt {
  constructor() {
    (super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend));
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const n = this._def.shape(),
      s = kt.objectKeys(n);
    return ((this._cached = { shape: n, keys: s }), this._cached);
  }
  _parse(n) {
    if (this._getType(n) !== lt.object) {
      const p = this._getOrReturnCtx(n);
      return (I(p, { code: Y.invalid_type, expected: lt.object, received: p.parsedType }), yt);
    }
    const { status: r, ctx: o } = this._processInputParams(n),
      { shape: f, keys: d } = this._getCached(),
      h = [];
    if (!(this._def.catchall instanceof Oa && this._def.unknownKeys === "strip"))
      for (const p in o.data) d.includes(p) || h.push(p);
    const y = [];
    for (const p of d) {
      const g = f[p],
        b = o.data[p];
      y.push({
        key: { status: "valid", value: p },
        value: g._parse(new Ra(o, b, o.path, p)),
        alwaysSet: p in o.data,
      });
    }
    if (this._def.catchall instanceof Oa) {
      const p = this._def.unknownKeys;
      if (p === "passthrough")
        for (const g of h)
          y.push({ key: { status: "valid", value: g }, value: { status: "valid", value: o.data[g] } });
      else if (p === "strict") h.length > 0 && (I(o, { code: Y.unrecognized_keys, keys: h }), r.dirty());
      else if (p !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const p = this._def.catchall;
      for (const g of h) {
        const b = o.data[g];
        y.push({
          key: { status: "valid", value: g },
          value: p._parse(new Ra(o, b, o.path, g)),
          alwaysSet: g in o.data,
        });
      }
    }
    return o.common.async
      ? Promise.resolve()
          .then(async () => {
            const p = [];
            for (const g of y) {
              const b = await g.key,
                x = await g.value;
              p.push({ key: b, value: x, alwaysSet: g.alwaysSet });
            }
            return p;
          })
          .then((p) => Qe.mergeObjectSync(r, p))
      : Qe.mergeObjectSync(r, y);
  }
  get shape() {
    return this._def.shape();
  }
  strict(n) {
    return (
      ft.errToObj,
      new ce({
        ...this._def,
        unknownKeys: "strict",
        ...(n !== void 0
          ? {
              errorMap: (s, r) => {
                var f, d;
                const o =
                  ((d = (f = this._def).errorMap) == null ? void 0 : d.call(f, s, r).message) ??
                  r.defaultError;
                return s.code === "unrecognized_keys"
                  ? { message: ft.errToObj(n).message ?? o }
                  : { message: o };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new ce({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new ce({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(n) {
    return new ce({ ...this._def, shape: () => ({ ...this._def.shape(), ...n }) });
  }
  merge(n) {
    return new ce({
      unknownKeys: n._def.unknownKeys,
      catchall: n._def.catchall,
      shape: () => ({ ...this._def.shape(), ...n._def.shape() }),
      typeName: gt.ZodObject,
    });
  }
  setKey(n, s) {
    return this.augment({ [n]: s });
  }
  catchall(n) {
    return new ce({ ...this._def, catchall: n });
  }
  pick(n) {
    const s = {};
    for (const r of kt.objectKeys(n)) n[r] && this.shape[r] && (s[r] = this.shape[r]);
    return new ce({ ...this._def, shape: () => s });
  }
  omit(n) {
    const s = {};
    for (const r of kt.objectKeys(this.shape)) n[r] || (s[r] = this.shape[r]);
    return new ce({ ...this._def, shape: () => s });
  }
  deepPartial() {
    return ts(this);
  }
  partial(n) {
    const s = {};
    for (const r of kt.objectKeys(this.shape)) {
      const o = this.shape[r];
      n && !n[r] ? (s[r] = o) : (s[r] = o.optional());
    }
    return new ce({ ...this._def, shape: () => s });
  }
  required(n) {
    const s = {};
    for (const r of kt.objectKeys(this.shape))
      if (n && !n[r]) s[r] = this.shape[r];
      else {
        let f = this.shape[r];
        for (; f instanceof Jn; ) f = f._def.innerType;
        s[r] = f;
      }
    return new ce({ ...this._def, shape: () => s });
  }
  keyof() {
    return sx(kt.objectKeys(this.shape));
  }
}
ce.create = (a, n) =>
  new ce({ shape: () => a, unknownKeys: "strip", catchall: Oa.create(), typeName: gt.ZodObject, ...Et(n) });
ce.strictCreate = (a, n) =>
  new ce({ shape: () => a, unknownKeys: "strict", catchall: Oa.create(), typeName: gt.ZodObject, ...Et(n) });
ce.lazycreate = (a, n) =>
  new ce({ shape: a, unknownKeys: "strip", catchall: Oa.create(), typeName: gt.ZodObject, ...Et(n) });
class Ao extends zt {
  _parse(n) {
    const { ctx: s } = this._processInputParams(n),
      r = this._def.options;
    function o(f) {
      for (const h of f) if (h.result.status === "valid") return h.result;
      for (const h of f)
        if (h.result.status === "dirty") return (s.common.issues.push(...h.ctx.common.issues), h.result);
      const d = f.map((h) => new Fn(h.ctx.common.issues));
      return (I(s, { code: Y.invalid_union, unionErrors: d }), yt);
    }
    if (s.common.async)
      return Promise.all(
        r.map(async (f) => {
          const d = { ...s, common: { ...s.common, issues: [] }, parent: null };
          return { result: await f._parseAsync({ data: s.data, path: s.path, parent: d }), ctx: d };
        }),
      ).then(o);
    {
      let f;
      const d = [];
      for (const y of r) {
        const p = { ...s, common: { ...s.common, issues: [] }, parent: null },
          g = y._parseSync({ data: s.data, path: s.path, parent: p });
        if (g.status === "valid") return g;
        (g.status === "dirty" && !f && (f = { result: g, ctx: p }),
          p.common.issues.length && d.push(p.common.issues));
      }
      if (f) return (s.common.issues.push(...f.ctx.common.issues), f.result);
      const h = d.map((y) => new Fn(y));
      return (I(s, { code: Y.invalid_union, unionErrors: h }), yt);
    }
  }
  get options() {
    return this._def.options;
  }
}
Ao.create = (a, n) => new Ao({ options: a, typeName: gt.ZodUnion, ...Et(n) });
const Qn = (a) =>
  a instanceof ud
    ? Qn(a.schema)
    : a instanceof fi
      ? Qn(a.innerType())
      : a instanceof Eo
        ? [a.value]
        : a instanceof ci
          ? a.options
          : a instanceof cd
            ? kt.objectValues(a.enum)
            : a instanceof Mo
              ? Qn(a._def.innerType)
              : a instanceof ld
                ? [void 0]
                : a instanceof rd
                  ? [null]
                  : a instanceof Jn
                    ? [void 0, ...Qn(a.unwrap())]
                    : a instanceof di
                      ? [null, ...Qn(a.unwrap())]
                      : a instanceof lx || a instanceof Do
                        ? Qn(a.unwrap())
                        : a instanceof Co
                          ? Qn(a._def.innerType)
                          : [];
class Xd extends zt {
  _parse(n) {
    const { ctx: s } = this._processInputParams(n);
    if (s.parsedType !== lt.object)
      return (I(s, { code: Y.invalid_type, expected: lt.object, received: s.parsedType }), yt);
    const r = this.discriminator,
      o = s.data[r],
      f = this.optionsMap.get(o);
    return f
      ? s.common.async
        ? f._parseAsync({ data: s.data, path: s.path, parent: s })
        : f._parseSync({ data: s.data, path: s.path, parent: s })
      : (I(s, {
          code: Y.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [r],
        }),
        yt);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(n, s, r) {
    const o = new Map();
    for (const f of s) {
      const d = Qn(f.shape[n]);
      if (!d.length)
        throw new Error(
          `A discriminator value for key \`${n}\` could not be extracted from all schema options`,
        );
      for (const h of d) {
        if (o.has(h)) throw new Error(`Discriminator property ${String(n)} has duplicate value ${String(h)}`);
        o.set(h, f);
      }
    }
    return new Xd({
      typeName: gt.ZodDiscriminatedUnion,
      discriminator: n,
      options: s,
      optionsMap: o,
      ...Et(r),
    });
  }
}
function od(a, n) {
  const s = Ea(a),
    r = Ea(n);
  if (a === n) return { valid: !0, data: a };
  if (s === lt.object && r === lt.object) {
    const o = kt.objectKeys(n),
      f = kt.objectKeys(a).filter((h) => o.indexOf(h) !== -1),
      d = { ...a, ...n };
    for (const h of f) {
      const y = od(a[h], n[h]);
      if (!y.valid) return { valid: !1 };
      d[h] = y.data;
    }
    return { valid: !0, data: d };
  } else if (s === lt.array && r === lt.array) {
    if (a.length !== n.length) return { valid: !1 };
    const o = [];
    for (let f = 0; f < a.length; f++) {
      const d = a[f],
        h = n[f],
        y = od(d, h);
      if (!y.valid) return { valid: !1 };
      o.push(y.data);
    }
    return { valid: !0, data: o };
  } else return s === lt.date && r === lt.date && +a == +n ? { valid: !0, data: a } : { valid: !1 };
}
class _o extends zt {
  _parse(n) {
    const { status: s, ctx: r } = this._processInputParams(n),
      o = (f, d) => {
        if (jv(f) || jv(d)) return yt;
        const h = od(f.value, d.value);
        return h.valid
          ? ((Vv(f) || Vv(d)) && s.dirty(), { status: s.value, value: h.data })
          : (I(r, { code: Y.invalid_intersection_types }), yt);
      };
    return r.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseAsync({ data: r.data, path: r.path, parent: r }),
        ]).then(([f, d]) => o(f, d))
      : o(
          this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseSync({ data: r.data, path: r.path, parent: r }),
        );
  }
}
_o.create = (a, n, s) => new _o({ left: a, right: n, typeName: gt.ZodIntersection, ...Et(s) });
class ui extends zt {
  _parse(n) {
    const { status: s, ctx: r } = this._processInputParams(n);
    if (r.parsedType !== lt.array)
      return (I(r, { code: Y.invalid_type, expected: lt.array, received: r.parsedType }), yt);
    if (r.data.length < this._def.items.length)
      return (
        I(r, { code: Y.too_small, minimum: this._def.items.length, inclusive: !0, exact: !1, type: "array" }),
        yt
      );
    !this._def.rest &&
      r.data.length > this._def.items.length &&
      (I(r, { code: Y.too_big, maximum: this._def.items.length, inclusive: !0, exact: !1, type: "array" }),
      s.dirty());
    const f = [...r.data]
      .map((d, h) => {
        const y = this._def.items[h] || this._def.rest;
        return y ? y._parse(new Ra(r, d, r.path, h)) : null;
      })
      .filter((d) => !!d);
    return r.common.async ? Promise.all(f).then((d) => Qe.mergeArray(s, d)) : Qe.mergeArray(s, f);
  }
  get items() {
    return this._def.items;
  }
  rest(n) {
    return new ui({ ...this._def, rest: n });
  }
}
ui.create = (a, n) => {
  if (!Array.isArray(a)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ui({ items: a, typeName: gt.ZodTuple, rest: null, ...Et(n) });
};
class Gv extends zt {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(n) {
    const { status: s, ctx: r } = this._processInputParams(n);
    if (r.parsedType !== lt.map)
      return (I(r, { code: Y.invalid_type, expected: lt.map, received: r.parsedType }), yt);
    const o = this._def.keyType,
      f = this._def.valueType,
      d = [...r.data.entries()].map(([h, y], p) => ({
        key: o._parse(new Ra(r, h, r.path, [p, "key"])),
        value: f._parse(new Ra(r, y, r.path, [p, "value"])),
      }));
    if (r.common.async) {
      const h = new Map();
      return Promise.resolve().then(async () => {
        for (const y of d) {
          const p = await y.key,
            g = await y.value;
          if (p.status === "aborted" || g.status === "aborted") return yt;
          ((p.status === "dirty" || g.status === "dirty") && s.dirty(), h.set(p.value, g.value));
        }
        return { status: s.value, value: h };
      });
    } else {
      const h = new Map();
      for (const y of d) {
        const p = y.key,
          g = y.value;
        if (p.status === "aborted" || g.status === "aborted") return yt;
        ((p.status === "dirty" || g.status === "dirty") && s.dirty(), h.set(p.value, g.value));
      }
      return { status: s.value, value: h };
    }
  }
}
Gv.create = (a, n, s) => new Gv({ valueType: n, keyType: a, typeName: gt.ZodMap, ...Et(s) });
class Ml extends zt {
  _parse(n) {
    const { status: s, ctx: r } = this._processInputParams(n);
    if (r.parsedType !== lt.set)
      return (I(r, { code: Y.invalid_type, expected: lt.set, received: r.parsedType }), yt);
    const o = this._def;
    (o.minSize !== null &&
      r.data.size < o.minSize.value &&
      (I(r, {
        code: Y.too_small,
        minimum: o.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: o.minSize.message,
      }),
      s.dirty()),
      o.maxSize !== null &&
        r.data.size > o.maxSize.value &&
        (I(r, {
          code: Y.too_big,
          maximum: o.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: o.maxSize.message,
        }),
        s.dirty()));
    const f = this._def.valueType;
    function d(y) {
      const p = new Set();
      for (const g of y) {
        if (g.status === "aborted") return yt;
        (g.status === "dirty" && s.dirty(), p.add(g.value));
      }
      return { status: s.value, value: p };
    }
    const h = [...r.data.values()].map((y, p) => f._parse(new Ra(r, y, r.path, p)));
    return r.common.async ? Promise.all(h).then((y) => d(y)) : d(h);
  }
  min(n, s) {
    return new Ml({ ...this._def, minSize: { value: n, message: ft.toString(s) } });
  }
  max(n, s) {
    return new Ml({ ...this._def, maxSize: { value: n, message: ft.toString(s) } });
  }
  size(n, s) {
    return this.min(n, s).max(n, s);
  }
  nonempty(n) {
    return this.min(1, n);
  }
}
Ml.create = (a, n) => new Ml({ valueType: a, minSize: null, maxSize: null, typeName: gt.ZodSet, ...Et(n) });
class ud extends zt {
  get schema() {
    return this._def.getter();
  }
  _parse(n) {
    const { ctx: s } = this._processInputParams(n);
    return this._def.getter()._parse({ data: s.data, path: s.path, parent: s });
  }
}
ud.create = (a, n) => new ud({ getter: a, typeName: gt.ZodLazy, ...Et(n) });
class Eo extends zt {
  _parse(n) {
    if (n.data !== this._def.value) {
      const s = this._getOrReturnCtx(n);
      return (I(s, { received: s.data, code: Y.invalid_literal, expected: this._def.value }), yt);
    }
    return { status: "valid", value: n.data };
  }
  get value() {
    return this._def.value;
  }
}
Eo.create = (a, n) => new Eo({ value: a, typeName: gt.ZodLiteral, ...Et(n) });
function sx(a, n) {
  return new ci({ values: a, typeName: gt.ZodEnum, ...Et(n) });
}
class ci extends zt {
  _parse(n) {
    if (typeof n.data != "string") {
      const s = this._getOrReturnCtx(n),
        r = this._def.values;
      return (I(s, { expected: kt.joinValues(r), received: s.parsedType, code: Y.invalid_type }), yt);
    }
    if ((this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(n.data))) {
      const s = this._getOrReturnCtx(n),
        r = this._def.values;
      return (I(s, { received: s.data, code: Y.invalid_enum_value, options: r }), yt);
    }
    return on(n.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const n = {};
    for (const s of this._def.values) n[s] = s;
    return n;
  }
  get Values() {
    const n = {};
    for (const s of this._def.values) n[s] = s;
    return n;
  }
  get Enum() {
    const n = {};
    for (const s of this._def.values) n[s] = s;
    return n;
  }
  extract(n, s = this._def) {
    return ci.create(n, { ...this._def, ...s });
  }
  exclude(n, s = this._def) {
    return ci.create(
      this.options.filter((r) => !n.includes(r)),
      { ...this._def, ...s },
    );
  }
}
ci.create = sx;
class cd extends zt {
  _parse(n) {
    const s = kt.getValidEnumValues(this._def.values),
      r = this._getOrReturnCtx(n);
    if (r.parsedType !== lt.string && r.parsedType !== lt.number) {
      const o = kt.objectValues(s);
      return (I(r, { expected: kt.joinValues(o), received: r.parsedType, code: Y.invalid_type }), yt);
    }
    if (
      (this._cache || (this._cache = new Set(kt.getValidEnumValues(this._def.values))),
      !this._cache.has(n.data))
    ) {
      const o = kt.objectValues(s);
      return (I(r, { received: r.data, code: Y.invalid_enum_value, options: o }), yt);
    }
    return on(n.data);
  }
  get enum() {
    return this._def.values;
  }
}
cd.create = (a, n) => new cd({ values: a, typeName: gt.ZodNativeEnum, ...Et(n) });
class wo extends zt {
  unwrap() {
    return this._def.type;
  }
  _parse(n) {
    const { ctx: s } = this._processInputParams(n);
    if (s.parsedType !== lt.promise && s.common.async === !1)
      return (I(s, { code: Y.invalid_type, expected: lt.promise, received: s.parsedType }), yt);
    const r = s.parsedType === lt.promise ? s.data : Promise.resolve(s.data);
    return on(
      r.then((o) => this._def.type.parseAsync(o, { path: s.path, errorMap: s.common.contextualErrorMap })),
    );
  }
}
wo.create = (a, n) => new wo({ type: a, typeName: gt.ZodPromise, ...Et(n) });
class fi extends zt {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === gt.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(n) {
    const { status: s, ctx: r } = this._processInputParams(n),
      o = this._def.effect || null,
      f = {
        addIssue: (d) => {
          (I(r, d), d.fatal ? s.abort() : s.dirty());
        },
        get path() {
          return r.path;
        },
      };
    if (((f.addIssue = f.addIssue.bind(f)), o.type === "preprocess")) {
      const d = o.transform(r.data, f);
      if (r.common.async)
        return Promise.resolve(d).then(async (h) => {
          if (s.value === "aborted") return yt;
          const y = await this._def.schema._parseAsync({ data: h, path: r.path, parent: r });
          return y.status === "aborted" ? yt : y.status === "dirty" || s.value === "dirty" ? ml(y.value) : y;
        });
      {
        if (s.value === "aborted") return yt;
        const h = this._def.schema._parseSync({ data: d, path: r.path, parent: r });
        return h.status === "aborted" ? yt : h.status === "dirty" || s.value === "dirty" ? ml(h.value) : h;
      }
    }
    if (o.type === "refinement") {
      const d = (h) => {
        const y = o.refinement(h, f);
        if (r.common.async) return Promise.resolve(y);
        if (y instanceof Promise)
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return h;
      };
      if (r.common.async === !1) {
        const h = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
        return h.status === "aborted"
          ? yt
          : (h.status === "dirty" && s.dirty(), d(h.value), { status: s.value, value: h.value });
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((h) =>
            h.status === "aborted"
              ? yt
              : (h.status === "dirty" && s.dirty(),
                d(h.value).then(() => ({ status: s.value, value: h.value }))),
          );
    }
    if (o.type === "transform")
      if (r.common.async === !1) {
        const d = this._def.schema._parseSync({ data: r.data, path: r.path, parent: r });
        if (!os(d)) return yt;
        const h = o.transform(d.value, f);
        if (h instanceof Promise)
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return { status: s.value, value: h };
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((d) =>
            os(d)
              ? Promise.resolve(o.transform(d.value, f)).then((h) => ({ status: s.value, value: h }))
              : yt,
          );
    kt.assertNever(o);
  }
}
fi.create = (a, n, s) => new fi({ schema: a, typeName: gt.ZodEffects, effect: n, ...Et(s) });
fi.createWithPreprocess = (a, n, s) =>
  new fi({ schema: n, effect: { type: "preprocess", transform: a }, typeName: gt.ZodEffects, ...Et(s) });
class Jn extends zt {
  _parse(n) {
    return this._getType(n) === lt.undefined ? on(void 0) : this._def.innerType._parse(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Jn.create = (a, n) => new Jn({ innerType: a, typeName: gt.ZodOptional, ...Et(n) });
class di extends zt {
  _parse(n) {
    return this._getType(n) === lt.null ? on(null) : this._def.innerType._parse(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
di.create = (a, n) => new di({ innerType: a, typeName: gt.ZodNullable, ...Et(n) });
class Mo extends zt {
  _parse(n) {
    const { ctx: s } = this._processInputParams(n);
    let r = s.data;
    return (
      s.parsedType === lt.undefined && (r = this._def.defaultValue()),
      this._def.innerType._parse({ data: r, path: s.path, parent: s })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Mo.create = (a, n) =>
  new Mo({
    innerType: a,
    typeName: gt.ZodDefault,
    defaultValue: typeof n.default == "function" ? n.default : () => n.default,
    ...Et(n),
  });
class Co extends zt {
  _parse(n) {
    const { ctx: s } = this._processInputParams(n),
      r = { ...s, common: { ...s.common, issues: [] } },
      o = this._def.innerType._parse({ data: r.data, path: r.path, parent: { ...r } });
    return So(o)
      ? o.then((f) => ({
          status: "valid",
          value:
            f.status === "valid"
              ? f.value
              : this._def.catchValue({
                  get error() {
                    return new Fn(r.common.issues);
                  },
                  input: r.data,
                }),
        }))
      : {
          status: "valid",
          value:
            o.status === "valid"
              ? o.value
              : this._def.catchValue({
                  get error() {
                    return new Fn(r.common.issues);
                  },
                  input: r.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Co.create = (a, n) =>
  new Co({
    innerType: a,
    typeName: gt.ZodCatch,
    catchValue: typeof n.catch == "function" ? n.catch : () => n.catch,
    ...Et(n),
  });
class qv extends zt {
  _parse(n) {
    if (this._getType(n) !== lt.nan) {
      const r = this._getOrReturnCtx(n);
      return (I(r, { code: Y.invalid_type, expected: lt.nan, received: r.parsedType }), yt);
    }
    return { status: "valid", value: n.data };
  }
}
qv.create = (a) => new qv({ typeName: gt.ZodNaN, ...Et(a) });
class lx extends zt {
  _parse(n) {
    const { ctx: s } = this._processInputParams(n),
      r = s.data;
    return this._def.type._parse({ data: r, path: s.path, parent: s });
  }
  unwrap() {
    return this._def.type;
  }
}
class Kd extends zt {
  _parse(n) {
    const { status: s, ctx: r } = this._processInputParams(n);
    if (r.common.async)
      return (async () => {
        const f = await this._def.in._parseAsync({ data: r.data, path: r.path, parent: r });
        return f.status === "aborted"
          ? yt
          : f.status === "dirty"
            ? (s.dirty(), ml(f.value))
            : this._def.out._parseAsync({ data: f.value, path: r.path, parent: r });
      })();
    {
      const o = this._def.in._parseSync({ data: r.data, path: r.path, parent: r });
      return o.status === "aborted"
        ? yt
        : o.status === "dirty"
          ? (s.dirty(), { status: "dirty", value: o.value })
          : this._def.out._parseSync({ data: o.value, path: r.path, parent: r });
    }
  }
  static create(n, s) {
    return new Kd({ in: n, out: s, typeName: gt.ZodPipeline });
  }
}
class Do extends zt {
  _parse(n) {
    const s = this._def.innerType._parse(n),
      r = (o) => (os(o) && (o.value = Object.freeze(o.value)), o);
    return So(s) ? s.then((o) => r(o)) : r(s);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Do.create = (a, n) => new Do({ innerType: a, typeName: gt.ZodReadonly, ...Et(n) });
var gt;
(function (a) {
  ((a.ZodString = "ZodString"),
    (a.ZodNumber = "ZodNumber"),
    (a.ZodNaN = "ZodNaN"),
    (a.ZodBigInt = "ZodBigInt"),
    (a.ZodBoolean = "ZodBoolean"),
    (a.ZodDate = "ZodDate"),
    (a.ZodSymbol = "ZodSymbol"),
    (a.ZodUndefined = "ZodUndefined"),
    (a.ZodNull = "ZodNull"),
    (a.ZodAny = "ZodAny"),
    (a.ZodUnknown = "ZodUnknown"),
    (a.ZodNever = "ZodNever"),
    (a.ZodVoid = "ZodVoid"),
    (a.ZodArray = "ZodArray"),
    (a.ZodObject = "ZodObject"),
    (a.ZodUnion = "ZodUnion"),
    (a.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (a.ZodIntersection = "ZodIntersection"),
    (a.ZodTuple = "ZodTuple"),
    (a.ZodRecord = "ZodRecord"),
    (a.ZodMap = "ZodMap"),
    (a.ZodSet = "ZodSet"),
    (a.ZodFunction = "ZodFunction"),
    (a.ZodLazy = "ZodLazy"),
    (a.ZodLiteral = "ZodLiteral"),
    (a.ZodEnum = "ZodEnum"),
    (a.ZodEffects = "ZodEffects"),
    (a.ZodNativeEnum = "ZodNativeEnum"),
    (a.ZodOptional = "ZodOptional"),
    (a.ZodNullable = "ZodNullable"),
    (a.ZodDefault = "ZodDefault"),
    (a.ZodCatch = "ZodCatch"),
    (a.ZodPromise = "ZodPromise"),
    (a.ZodBranded = "ZodBranded"),
    (a.ZodPipeline = "ZodPipeline"),
    (a.ZodReadonly = "ZodReadonly"));
})(gt || (gt = {}));
const Ot = Ma.create,
  cs = us.create,
  rx = sd.create;
Oa.create;
const ii = _n.create,
  ae = ce.create;
Ao.create;
const GM = Xd.create;
_o.create;
ui.create;
const yn = Eo.create,
  Na = ci.create;
wo.create;
Jn.create;
di.create;
const pl = cs().min(0).max(1),
  ms = Na(["low", "medium", "high"]),
  Bo = Na(["market_data", "settlement_rules", "research", "probability_estimator", "skeptic", "memo_editor"]),
  qM =
    /\b(?:you should|we recommend)\s+(?:buy|sell|place|enter|exit)\b|\b(?:recommendation|action|trade):\s*(?:buy|sell|place|enter|exit)\b|\b(?:buy|sell)\s+(?:now|this market|the contract)\b/i;
ae({ marketInput: Ot().trim().min(1), requestedAt: Ot().datetime().optional(), demoMode: rx().optional() });
const ox = ae({
    ticker: Ot().min(1),
    title: Ot().min(1),
    subtitle: Ot().nullish(),
    url: Ot().url().nullish(),
    status: Na(["open", "closed", "settled", "unknown"]),
    closeTime: Ot().datetime({ offset: !0 }).nullish(),
    settlementSource: Ot().min(1).nullish(),
  }),
  ux = ae({
    impliedProbability: pl,
    yesBid: pl.nullish(),
    yesAsk: pl.nullish(),
    spread: pl.nullish(),
    volume: cs().nonnegative().nullish(),
    openInterest: cs().nonnegative().nullish(),
    lastUpdatedAt: Ot().datetime({ offset: !0 }).nullish(),
  }),
  YM = ae({ probability: pl, confidence: ms, thesis: Ot().min(1), assumptions: ii(Ot().min(1)).min(1) }),
  XM = ae({
    probabilityPoints: cs().min(-1).max(1),
    direction: Na(["agent_higher", "agent_lower", "in_line"]),
  }),
  cx = ae({
    claim: Ot().min(1),
    sourceTitle: Ot().min(1),
    sourceUrl: Ot().url().nullish(),
    context: Ot().nullish(),
    sourcePublishedAt: Ot().datetime({ offset: !0 }).nullish(),
    relevance: ms,
  }),
  fx = ae({ risk: Ot().min(1), severity: ms }),
  dx = ae({ kind: Na(["liquidity", "staleness", "data_quality"]), message: Ot().min(1), severity: ms }),
  KM = ae({
    role: Bo,
    displayName: Ot().min(1),
    summary: Ot().min(1),
    status: Na(["completed", "skipped", "failed"]),
  }),
  QM = ae({
    schemaVersion: yn("1.0"),
    analyzedAt: Ot().datetime({ offset: !0 }),
    market: ox,
    kalshi: ux,
    agentEstimate: YM,
    delta: XM,
    evidence: ii(cx),
    counterarguments: ii(Ot().min(1)),
    settlementRisks: ii(fx),
    warnings: ii(dx),
    whatWouldChange: ii(Ot().min(1)).min(1),
    agentTrace: ii(KM),
    finalMemoMarkdown: Ot().min(1),
    developer: ae({ rawJsonInspectionEnabled: rx(), rawJsonLabel: Ot().min(1) }),
    disclaimer: Ot().min(1),
  }).superRefine((a, n) => {
    const s = a.agentEstimate.probability - a.kalshi.impliedProbability;
    Math.abs(a.delta.probabilityPoints - s) > 1e-6 &&
      n.addIssue({
        code: Y.custom,
        path: ["delta", "probabilityPoints"],
        message: "Delta must equal agent estimate minus Kalshi implied probability.",
      });
    const r = s > 0 ? "agent_higher" : s < 0 ? "agent_lower" : "in_line";
    a.delta.direction !== r &&
      n.addIssue({
        code: Y.custom,
        path: ["delta", "direction"],
        message: "Delta direction must match the signed probability delta.",
      });
    const o = new Set(a.agentTrace.map((g) => g.role));
    for (const g of Bo.options)
      o.has(g) ||
        n.addIssue({ code: Y.custom, path: ["agentTrace"], message: `Agent trace must include ${g}.` });
    const f = a.disclaimer.toLowerCase(),
      d = f.includes("research") || f.includes("informational"),
      h = ["not financial advice", "not trading advice", "not advice"].some((g) => f.includes(g)),
      y = ["not a recommendation", "not trade", "place any trade"].some((g) => f.includes(g));
    (d && h && y) ||
      n.addIssue({
        code: Y.custom,
        path: ["disclaimer"],
        message: "Disclaimer must clearly separate research from trading advice.",
      });
    const p = [
      { path: ["agentEstimate", "thesis"], text: a.agentEstimate.thesis },
      { path: ["finalMemoMarkdown"], text: a.finalMemoMarkdown },
      ...a.counterarguments.map((g, b) => ({ path: ["counterarguments", b], text: g })),
      ...a.whatWouldChange.map((g, b) => ({ path: ["whatWouldChange", b], text: g })),
    ];
    for (const g of p)
      qM.test(g.text) &&
        n.addIssue({
          code: Y.custom,
          path: g.path,
          message: "Workflow output must not include direct buy/sell/place-trade recommendation phrasing.",
        });
  }),
  JM = Na(["completed", "skipped", "failed"]),
  PM = ae({ type: yn("stage_started"), stage: Bo, displayName: Ot().min(1), headline: Ot().min(1) }),
  FM = ae({ type: yn("stage_completed"), stage: Bo, summary: Ot().min(1), status: JM }),
  WM = ae({ type: yn("market_resolved"), market: ox, kalshi: ux }),
  $M = ae({
    type: yn("source_found"),
    sourceTitle: Ot().min(1),
    sourceUrl: Ot().url().nullish(),
    publishedAt: Ot().nullish(),
    relevance: ms,
  }),
  IM = ae({ type: yn("evidence_added"), evidence: cx }),
  tC = ae({ type: yn("settlement_risk_found"), risk: fx }),
  eC = ae({ type: yn("warning_raised"), warning: dx }),
  nC = Na(["market_prior", "research_draft", "skeptic_calibrated"]),
  aC = ae({
    type: yn("estimate_updated"),
    probability: cs().min(0).max(1),
    confidence: ms.nullish(),
    basis: nC,
  }),
  iC = ae({ type: yn("final"), response: QM }),
  sC = ae({ type: yn("error"), code: Ot().min(1), message: Ot().min(1), statusCode: cs().int() }),
  Yv = GM("type", [PM, FM, WM, $M, IM, tC, eC, aC, iC, sC]),
  lC = "http://127.0.0.1:8000";
function rC() {
  return lC;
}
const oC = new Set(["final", "error"]);
function uC(a, { demoMode: n, callbacks: s }) {
  const r = new URL("/analyze/stream", rC());
  (r.searchParams.set("input", a), n !== void 0 && r.searchParams.set("demo", String(n)));
  const o = new EventSource(r);
  let f = !1;
  const d = () => {
      f || ((f = !0), o.close());
    },
    h = (y) => {
      if (f) return;
      let p;
      try {
        p = JSON.parse(y.data);
      } catch {
        (d(), s.onTransportError());
        return;
      }
      const g = Yv.safeParse(p);
      if (!g.success) {
        (d(), s.onTransportError());
        return;
      }
      (oC.has(g.data.type) && d(), s.onEvent(g.data));
    };
  for (const y of Yv.options.map((p) => p.shape.type.value)) o.addEventListener(y, h);
  return (
    (o.onerror = () => {
      f || (d(), s.onTransportError());
    }),
    { close: d }
  );
}
function cC() {
  const [a, n] = F.useReducer(pM, ad),
    s = F.useRef(null);
  F.useEffect(
    () => () => {
      var f;
      return (f = s.current) == null ? void 0 : f.close();
    },
    [],
  );
  const r = F.useCallback((f, d) => {
      var g;
      const h = d == null ? void 0 : d.demoMode,
        y = nx(f);
      if (y === null && h !== !0) return !1;
      const p = (y == null ? void 0 : y.marketInput) ?? f.trim();
      return (
        (g = s.current) == null || g.close(),
        n({ type: "START", eventInput: p }),
        (s.current = uC(p, {
          ...(h === void 0 ? {} : { demoMode: h }),
          callbacks: {
            onEvent: (b) => n({ type: "EVENT", event: b }),
            onTransportError: () => n({ type: "TRANSPORT_ERROR" }),
          },
        })),
        !0
      );
    }, []),
    o = F.useCallback(() => {
      var f;
      ((f = s.current) == null || f.close(), (s.current = null), n({ type: "RESET" }));
    }, []);
  return { state: a, submit: r, reset: o };
}
function fC() {
  const { state: a, submit: n, reset: s } = cC(),
    r = a.phase !== "idle";
  return _.jsxs("div", {
    className: "grain desk-glow flex min-h-dvh flex-col",
    children: [
      _.jsxs("header", {
        className: "hairline flex items-baseline justify-between border-b px-6 py-4 md:px-10",
        children: [
          _.jsxs("button", {
            type: "button",
            onClick: s,
            className: "font-display text-foreground text-lg font-semibold tracking-tight",
            children: ["Probable", _.jsx("span", { className: "text-glow", children: "." })],
          }),
          _.jsx("p", {
            className: "text-muted-foreground font-mono text-[11px] tracking-widest uppercase",
            children: "event probability research desk",
          }),
        ],
      }),
      _.jsx("main", {
        className: "flex flex-1 flex-col",
        children: _.jsx(Ab, {
          mode: "wait",
          children: r
            ? _.jsx(
                Ae.div,
                {
                  className: "flex-1",
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.35, ease: "easeOut" },
                  children: _.jsx(oM, { state: a, onReset: s }),
                },
                "analysis",
              )
            : _.jsx(
                Ae.div,
                {
                  className: "flex flex-1 items-center",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0, y: -16 },
                  transition: { duration: 0.3, ease: "easeOut" },
                  children: _.jsx(dM, { onSubmit: n }),
                },
                "prompt",
              ),
        }),
      }),
      _.jsx("footer", {
        className: "hairline border-t px-6 py-3 md:px-10",
        children: _.jsx("p", {
          className: "text-muted-foreground font-mono text-[11px] leading-relaxed",
          children:
            "Research assistance only — not financial advice, not trading advice, and never a recommendation to place any trade.",
        }),
      }),
    ],
  });
}
YS.createRoot(document.getElementById("root")).render(_.jsx(F.StrictMode, { children: _.jsx(fC, {}) }));
