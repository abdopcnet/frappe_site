/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function $s(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Z = {}, kt = [], ze = () => {
}, zr = () => !1, Hn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ms = (e) => e.startsWith("onUpdate:"), _e = Object.assign, Ds = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, yi = Object.prototype.hasOwnProperty, Y = (e, t) => yi.call(e, t), H = Array.isArray, Ht = (e) => Un(e) === "[object Map]", Jr = (e) => Un(e) === "[object Set]", U = (e) => typeof e == "function", le = (e) => typeof e == "string", bt = (e) => typeof e == "symbol", se = (e) => e !== null && typeof e == "object", Xr = (e) => (se(e) || U(e)) && U(e.then) && U(e.catch), Zr = Object.prototype.toString, Un = (e) => Zr.call(e), bi = (e) => Un(e).slice(8, -1), eo = (e) => Un(e) === "[object Object]", Ls = (e) => le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, en = /* @__PURE__ */ $s(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Ei = /-\w/g, Me = Vn(
  (e) => e.replace(Ei, (t) => t.slice(1).toUpperCase())
), Si = /\B([A-Z])/g, Tt = Vn(
  (e) => e.replace(Si, "-$1").toLowerCase()
), Bn = Vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), ns = Vn(
  (e) => e ? `on${Bn(e)}` : ""
), gt = (e, t) => !Object.is(e, t), Rn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, to = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, _s = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let sr;
const jn = () => sr || (sr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Fs(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = le(s) ? wi(s) : Fs(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (le(e) || se(e))
    return e;
}
const Ci = /;(?![^(]*\))/g, Ai = /:([^]+)/, Ri = /\/\*[^]*?\*\//g;
function wi(e) {
  const t = {};
  return e.replace(Ri, "").split(Ci).forEach((n) => {
    if (n) {
      const s = n.split(Ai);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function It(e) {
  let t = "";
  if (le(e))
    t = e;
  else if (H(e))
    for (let n = 0; n < e.length; n++) {
      const s = It(e[n]);
      s && (t += s + " ");
    }
  else if (se(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Pi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ii = /* @__PURE__ */ $s(Pi);
function no(e) {
  return !!e || e === "";
}
const so = (e) => !!(e && e.__v_isRef === !0), oe = (e) => le(e) ? e : e == null ? "" : H(e) || se(e) && (e.toString === Zr || !U(e.toString)) ? so(e) ? oe(e.value) : JSON.stringify(e, ro, 2) : String(e), ro = (e, t) => so(t) ? ro(e, t.value) : Ht(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[ss(s, o) + " =>"] = r, n),
    {}
  )
} : Jr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ss(n))
} : bt(t) ? ss(t) : se(t) && !H(t) && !eo(t) ? String(t) : t, ss = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    bt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ae;
class Ti {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Ae, !t && Ae && (this.index = (Ae.scopes || (Ae.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ae;
      try {
        return Ae = this, t();
      } finally {
        Ae = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ae, Ae = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Ae = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Oi() {
  return Ae;
}
let te;
const rs = /* @__PURE__ */ new WeakSet();
class oo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ae && Ae.active && Ae.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, rs.has(this) && (rs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || lo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, rr(this), co(this);
    const t = te, n = De;
    te = this, De = !0;
    try {
      return this.fn();
    } finally {
      ao(this), te = t, De = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Us(t);
      this.deps = this.depsTail = void 0, rr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? rs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    vs(this) && this.run();
  }
  get dirty() {
    return vs(this);
  }
}
let io = 0, tn, nn;
function lo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = nn, nn = e;
    return;
  }
  e.next = tn, tn = e;
}
function ks() {
  io++;
}
function Hs() {
  if (--io > 0)
    return;
  if (nn) {
    let t = nn;
    for (nn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; tn; ) {
    let t = tn;
    for (tn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function co(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ao(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Us(s), Ni(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function vs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (uo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function uo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === fn) || (e.globalVersion = fn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !vs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = te, s = De;
  te = e, De = !0;
  try {
    co(e);
    const r = e.fn(e._value);
    (t.version === 0 || gt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    te = n, De = s, ao(e), e.flags &= -3;
  }
}
function Us(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      Us(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ni(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let De = !0;
const fo = [];
function rt() {
  fo.push(De), De = !1;
}
function ot() {
  const e = fo.pop();
  De = e === void 0 ? !0 : e;
}
function rr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = te;
    te = void 0;
    try {
      t();
    } finally {
      te = n;
    }
  }
}
let fn = 0;
class xi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Vs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!te || !De || te === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== te)
      n = this.activeLink = new xi(te, this), te.deps ? (n.prevDep = te.depsTail, te.depsTail.nextDep = n, te.depsTail = n) : te.deps = te.depsTail = n, po(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = te.depsTail, n.nextDep = void 0, te.depsTail.nextDep = n, te.depsTail = n, te.deps === n && (te.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, fn++, this.notify(t);
  }
  notify(t) {
    ks();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Hs();
    }
  }
}
function po(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        po(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ys = /* @__PURE__ */ new WeakMap(), Pt = Symbol(
  ""
), bs = Symbol(
  ""
), dn = Symbol(
  ""
);
function pe(e, t, n) {
  if (De && te) {
    let s = ys.get(e);
    s || ys.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Vs()), r.map = s, r.key = n), r.track();
  }
}
function nt(e, t, n, s, r, o) {
  const i = ys.get(e);
  if (!i) {
    fn++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (ks(), t === "clear")
    i.forEach(l);
  else {
    const c = H(e), d = c && Ls(n);
    if (c && n === "length") {
      const a = Number(s);
      i.forEach((p, m) => {
        (m === "length" || m === dn || !bt(m) && m >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(dn)), t) {
        case "add":
          c ? d && l(i.get("length")) : (l(i.get(Pt)), Ht(e) && l(i.get(bs)));
          break;
        case "delete":
          c || (l(i.get(Pt)), Ht(e) && l(i.get(bs)));
          break;
        case "set":
          Ht(e) && l(i.get(Pt));
          break;
      }
  }
  Hs();
}
function $t(e) {
  const t = Q(e);
  return t === e ? t : (pe(t, "iterate", dn), $e(e) ? t : t.map(fe));
}
function Gn(e) {
  return pe(e = Q(e), "iterate", dn), e;
}
const $i = {
  __proto__: null,
  [Symbol.iterator]() {
    return os(this, Symbol.iterator, fe);
  },
  concat(...e) {
    return $t(this).concat(
      ...e.map((t) => H(t) ? $t(t) : t)
    );
  },
  entries() {
    return os(this, "entries", (e) => (e[1] = fe(e[1]), e));
  },
  every(e, t) {
    return Ze(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ze(this, "filter", e, t, (n) => n.map(fe), arguments);
  },
  find(e, t) {
    return Ze(this, "find", e, t, fe, arguments);
  },
  findIndex(e, t) {
    return Ze(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ze(this, "findLast", e, t, fe, arguments);
  },
  findLastIndex(e, t) {
    return Ze(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ze(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return is(this, "includes", e);
  },
  indexOf(...e) {
    return is(this, "indexOf", e);
  },
  join(e) {
    return $t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return is(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ze(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return zt(this, "pop");
  },
  push(...e) {
    return zt(this, "push", e);
  },
  reduce(e, ...t) {
    return or(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return or(this, "reduceRight", e, t);
  },
  shift() {
    return zt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ze(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return zt(this, "splice", e);
  },
  toReversed() {
    return $t(this).toReversed();
  },
  toSorted(e) {
    return $t(this).toSorted(e);
  },
  toSpliced(...e) {
    return $t(this).toSpliced(...e);
  },
  unshift(...e) {
    return zt(this, "unshift", e);
  },
  values() {
    return os(this, "values", fe);
  }
};
function os(e, t, n) {
  const s = Gn(e), r = s[t]();
  return s !== e && !$e(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = n(o.value)), o;
  }), r;
}
const Mi = Array.prototype;
function Ze(e, t, n, s, r, o) {
  const i = Gn(e), l = i !== e && !$e(e), c = i[t];
  if (c !== Mi[t]) {
    const p = c.apply(e, o);
    return l ? fe(p) : p;
  }
  let d = n;
  i !== e && (l ? d = function(p, m) {
    return n.call(this, fe(p), m, e);
  } : n.length > 2 && (d = function(p, m) {
    return n.call(this, p, m, e);
  }));
  const a = c.call(i, d, s);
  return l && r ? r(a) : a;
}
function or(e, t, n, s) {
  const r = Gn(e);
  let o = n;
  return r !== e && ($e(e) ? n.length > 3 && (o = function(i, l, c) {
    return n.call(this, i, l, c, e);
  }) : o = function(i, l, c) {
    return n.call(this, i, fe(l), c, e);
  }), r[t](o, ...s);
}
function is(e, t, n) {
  const s = Q(e);
  pe(s, "iterate", dn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Gs(n[0]) ? (n[0] = Q(n[0]), s[t](...n)) : r;
}
function zt(e, t, n = []) {
  rt(), ks();
  const s = Q(e)[t].apply(e, n);
  return Hs(), ot(), s;
}
const Di = /* @__PURE__ */ $s("__proto__,__v_isRef,__isVue"), ho = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(bt)
);
function Li(e) {
  bt(e) || (e = String(e));
  const t = Q(this);
  return pe(t, "has", e), t.hasOwnProperty(e);
}
class mo {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? qi : yo : o ? vo : _o).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = H(t);
    if (!r) {
      let c;
      if (i && (c = $i[n]))
        return c;
      if (n === "hasOwnProperty")
        return Li;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ge(t) ? t : s
    );
    if ((bt(n) ? ho.has(n) : Di(n)) || (r || pe(t, "get", n), o))
      return l;
    if (ge(l)) {
      const c = i && Ls(n) ? l : l.value;
      return r && se(c) ? Ss(c) : c;
    }
    return se(l) ? r ? Ss(l) : _n(l) : l;
  }
}
class go extends mo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const c = _t(o);
      if (!$e(s) && !_t(s) && (o = Q(o), s = Q(s)), !H(t) && ge(o) && !ge(s))
        return c || (o.value = s), !0;
    }
    const i = H(t) && Ls(n) ? Number(n) < t.length : Y(t, n), l = Reflect.set(
      t,
      n,
      s,
      ge(t) ? t : r
    );
    return t === Q(r) && (i ? gt(s, o) && nt(t, "set", n, s) : nt(t, "add", n, s)), l;
  }
  deleteProperty(t, n) {
    const s = Y(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && nt(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!bt(n) || !ho.has(n)) && pe(t, "has", n), s;
  }
  ownKeys(t) {
    return pe(
      t,
      "iterate",
      H(t) ? "length" : Pt
    ), Reflect.ownKeys(t);
  }
}
class Fi extends mo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const ki = /* @__PURE__ */ new go(), Hi = /* @__PURE__ */ new Fi(), Ui = /* @__PURE__ */ new go(!0);
const Es = (e) => e, Sn = (e) => Reflect.getPrototypeOf(e);
function Vi(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = Q(r), i = Ht(o), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, d = r[e](...s), a = n ? Es : t ? Tn : fe;
    return !t && pe(
      o,
      "iterate",
      c ? bs : Pt
    ), {
      // iterator protocol
      next() {
        const { value: p, done: m } = d.next();
        return m ? { value: p, done: m } : {
          value: l ? [a(p[0]), a(p[1])] : a(p),
          done: m
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Cn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Bi(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = Q(o), l = Q(r);
      e || (gt(r, l) && pe(i, "get", r), pe(i, "get", l));
      const { has: c } = Sn(i), d = t ? Es : e ? Tn : fe;
      if (c.call(i, r))
        return d(o.get(r));
      if (c.call(i, l))
        return d(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && pe(Q(r), "iterate", Pt), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = Q(o), l = Q(r);
      return e || (gt(r, l) && pe(i, "has", r), pe(i, "has", l)), r === l ? o.has(r) : o.has(r) || o.has(l);
    },
    forEach(r, o) {
      const i = this, l = i.__v_raw, c = Q(l), d = t ? Es : e ? Tn : fe;
      return !e && pe(c, "iterate", Pt), l.forEach((a, p) => r.call(o, d(a), d(p), i));
    }
  };
  return _e(
    n,
    e ? {
      add: Cn("add"),
      set: Cn("set"),
      delete: Cn("delete"),
      clear: Cn("clear")
    } : {
      add(r) {
        !t && !$e(r) && !_t(r) && (r = Q(r));
        const o = Q(this);
        return Sn(o).has.call(o, r) || (o.add(r), nt(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !$e(o) && !_t(o) && (o = Q(o));
        const i = Q(this), { has: l, get: c } = Sn(i);
        let d = l.call(i, r);
        d || (r = Q(r), d = l.call(i, r));
        const a = c.call(i, r);
        return i.set(r, o), d ? gt(o, a) && nt(i, "set", r, o) : nt(i, "add", r, o), this;
      },
      delete(r) {
        const o = Q(this), { has: i, get: l } = Sn(o);
        let c = i.call(o, r);
        c || (r = Q(r), c = i.call(o, r)), l && l.call(o, r);
        const d = o.delete(r);
        return c && nt(o, "delete", r, void 0), d;
      },
      clear() {
        const r = Q(this), o = r.size !== 0, i = r.clear();
        return o && nt(
          r,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Vi(r, e, t);
  }), n;
}
function Bs(e, t) {
  const n = Bi(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    Y(n, r) && r in s ? n : s,
    r,
    o
  );
}
const ji = {
  get: /* @__PURE__ */ Bs(!1, !1)
}, Gi = {
  get: /* @__PURE__ */ Bs(!1, !0)
}, Ki = {
  get: /* @__PURE__ */ Bs(!0, !1)
};
const _o = /* @__PURE__ */ new WeakMap(), vo = /* @__PURE__ */ new WeakMap(), yo = /* @__PURE__ */ new WeakMap(), qi = /* @__PURE__ */ new WeakMap();
function Wi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Qi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Wi(bi(e));
}
function _n(e) {
  return _t(e) ? e : js(
    e,
    !1,
    ki,
    ji,
    _o
  );
}
function bo(e) {
  return js(
    e,
    !1,
    Ui,
    Gi,
    vo
  );
}
function Ss(e) {
  return js(
    e,
    !0,
    Hi,
    Ki,
    yo
  );
}
function js(e, t, n, s, r) {
  if (!se(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = Qi(e);
  if (o === 0)
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    o === 2 ? s : n
  );
  return r.set(e, l), l;
}
function Ut(e) {
  return _t(e) ? Ut(e.__v_raw) : !!(e && e.__v_isReactive);
}
function _t(e) {
  return !!(e && e.__v_isReadonly);
}
function $e(e) {
  return !!(e && e.__v_isShallow);
}
function Gs(e) {
  return e ? !!e.__v_raw : !1;
}
function Q(e) {
  const t = e && e.__v_raw;
  return t ? Q(t) : e;
}
function Yi(e) {
  return !Y(e, "__v_skip") && Object.isExtensible(e) && to(e, "__v_skip", !0), e;
}
const fe = (e) => se(e) ? _n(e) : e, Tn = (e) => se(e) ? Ss(e) : e;
function ge(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Re(e) {
  return Eo(e, !1);
}
function zi(e) {
  return Eo(e, !0);
}
function Eo(e, t) {
  return ge(e) ? e : new Ji(e, t);
}
class Ji {
  constructor(t, n) {
    this.dep = new Vs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : Q(t), this._value = n ? t : fe(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || $e(t) || _t(t);
    t = s ? t : Q(t), gt(t, n) && (this._rawValue = t, this._value = s ? t : fe(t), this.dep.trigger());
  }
}
function Vt(e) {
  return ge(e) ? e.value : e;
}
const Xi = {
  get: (e, t, n) => t === "__v_raw" ? e : Vt(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ge(r) && !ge(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function So(e) {
  return Ut(e) ? e : new Proxy(e, Xi);
}
class Zi {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Vs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = fn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    te !== this)
      return lo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return uo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function el(e, t, n = !1) {
  let s, r;
  return U(e) ? s = e : (s = e.get, r = e.set), new Zi(s, r, n);
}
const An = {}, On = /* @__PURE__ */ new WeakMap();
let Rt;
function tl(e, t = !1, n = Rt) {
  if (n) {
    let s = On.get(n);
    s || On.set(n, s = []), s.push(e);
  }
}
function nl(e, t, n = Z) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: l, call: c } = n, d = (x) => r ? x : $e(x) || r === !1 || r === 0 ? st(x, 1) : st(x);
  let a, p, m, g, I = !1, O = !1;
  if (ge(e) ? (p = () => e.value, I = $e(e)) : Ut(e) ? (p = () => d(e), I = !0) : H(e) ? (O = !0, I = e.some((x) => Ut(x) || $e(x)), p = () => e.map((x) => {
    if (ge(x))
      return x.value;
    if (Ut(x))
      return d(x);
    if (U(x))
      return c ? c(x, 2) : x();
  })) : U(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (m) {
      rt();
      try {
        m();
      } finally {
        ot();
      }
    }
    const x = Rt;
    Rt = a;
    try {
      return c ? c(e, 3, [g]) : e(g);
    } finally {
      Rt = x;
    }
  } : p = ze, t && r) {
    const x = p, X = r === !0 ? 1 / 0 : r;
    p = () => st(x(), X);
  }
  const B = Oi(), $ = () => {
    a.stop(), B && B.active && Ds(B.effects, a);
  };
  if (o && t) {
    const x = t;
    t = (...X) => {
      x(...X), $();
    };
  }
  let N = O ? new Array(e.length).fill(An) : An;
  const L = (x) => {
    if (!(!(a.flags & 1) || !a.dirty && !x))
      if (t) {
        const X = a.run();
        if (r || I || (O ? X.some((ue, re) => gt(ue, N[re])) : gt(X, N))) {
          m && m();
          const ue = Rt;
          Rt = a;
          try {
            const re = [
              X,
              // pass undefined as the old value when it's changed for the first time
              N === An ? void 0 : O && N[0] === An ? [] : N,
              g
            ];
            N = X, c ? c(t, 3, re) : (
              // @ts-expect-error
              t(...re)
            );
          } finally {
            Rt = ue;
          }
        }
      } else
        a.run();
  };
  return l && l(L), a = new oo(p), a.scheduler = i ? () => i(L, !1) : L, g = (x) => tl(x, !1, a), m = a.onStop = () => {
    const x = On.get(a);
    if (x) {
      if (c)
        c(x, 4);
      else
        for (const X of x) X();
      On.delete(a);
    }
  }, t ? s ? L(!0) : N = a.run() : i ? i(L.bind(null, !0), !0) : a.run(), $.pause = a.pause.bind(a), $.resume = a.resume.bind(a), $.stop = $, $;
}
function st(e, t = 1 / 0, n) {
  if (t <= 0 || !se(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, ge(e))
    st(e.value, t, n);
  else if (H(e))
    for (let s = 0; s < e.length; s++)
      st(e[s], t, n);
  else if (Jr(e) || Ht(e))
    e.forEach((s) => {
      st(s, t, n);
    });
  else if (eo(e)) {
    for (const s in e)
      st(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && st(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function vn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Kn(r, t, n);
  }
}
function Je(e, t, n, s) {
  if (U(e)) {
    const r = vn(e, t, n, s);
    return r && Xr(r) && r.catch((o) => {
      Kn(o, t, n);
    }), r;
  }
  if (H(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Je(e[o], t, n, s));
    return r;
  }
}
function Kn(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || Z;
  if (t) {
    let l = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, c, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      rt(), vn(o, null, 10, [
        e,
        c,
        d
      ]), ot();
      return;
    }
  }
  sl(e, n, r, s, i);
}
function sl(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const be = [];
let We = -1;
const Bt = [];
let ft = null, Mt = 0;
const Co = /* @__PURE__ */ Promise.resolve();
let Nn = null;
function Ao(e) {
  const t = Nn || Co;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function rl(e) {
  let t = We + 1, n = be.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = be[s], o = pn(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Ks(e) {
  if (!(e.flags & 1)) {
    const t = pn(e), n = be[be.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= pn(n) ? be.push(e) : be.splice(rl(t), 0, e), e.flags |= 1, Ro();
  }
}
function Ro() {
  Nn || (Nn = Co.then(Po));
}
function ol(e) {
  H(e) ? Bt.push(...e) : ft && e.id === -1 ? ft.splice(Mt + 1, 0, e) : e.flags & 1 || (Bt.push(e), e.flags |= 1), Ro();
}
function ir(e, t, n = We + 1) {
  for (; n < be.length; n++) {
    const s = be[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      be.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function wo(e) {
  if (Bt.length) {
    const t = [...new Set(Bt)].sort(
      (n, s) => pn(n) - pn(s)
    );
    if (Bt.length = 0, ft) {
      ft.push(...t);
      return;
    }
    for (ft = t, Mt = 0; Mt < ft.length; Mt++) {
      const n = ft[Mt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    ft = null, Mt = 0;
  }
}
const pn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Po(e) {
  try {
    for (We = 0; We < be.length; We++) {
      const t = be[We];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), vn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; We < be.length; We++) {
      const t = be[We];
      t && (t.flags &= -2);
    }
    We = -1, be.length = 0, wo(), Nn = null, (be.length || Bt.length) && Po();
  }
}
let Ie = null, Io = null;
function xn(e) {
  const t = Ie;
  return Ie = e, Io = e && e.type.__scopeId || null, t;
}
function sn(e, t = Ie, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Dn(-1);
    const o = xn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      xn(o), s._d && Dn(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function ht(e, t) {
  if (Ie === null)
    return e;
  const n = zn(Ie), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, c = Z] = t[r];
    o && (U(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && st(i), s.push({
      dir: o,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function Ct(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[s];
    c && (rt(), Je(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ot());
  }
}
const il = Symbol("_vte"), ll = (e) => e.__isTeleport, cl = Symbol("_leaveCb");
function qs(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, qs(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function To(e, t) {
  return U(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    _e({ name: e.name }, t, { setup: e })
  ) : e;
}
function Oo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const $n = /* @__PURE__ */ new WeakMap();
function rn(e, t, n, s, r = !1) {
  if (H(e)) {
    e.forEach(
      (I, O) => rn(
        I,
        t && (H(t) ? t[O] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (on(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && rn(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? zn(s.component) : s.el, i = r ? null : o, { i: l, r: c } = e, d = t && t.r, a = l.refs === Z ? l.refs = {} : l.refs, p = l.setupState, m = Q(p), g = p === Z ? zr : (I) => Y(m, I);
  if (d != null && d !== c) {
    if (lr(t), le(d))
      a[d] = null, g(d) && (p[d] = null);
    else if (ge(d)) {
      d.value = null;
      const I = t;
      I.k && (a[I.k] = null);
    }
  }
  if (U(c))
    vn(c, l, 12, [i, a]);
  else {
    const I = le(c), O = ge(c);
    if (I || O) {
      const B = () => {
        if (e.f) {
          const $ = I ? g(c) ? p[c] : a[c] : c.value;
          if (r)
            H($) && Ds($, o);
          else if (H($))
            $.includes(o) || $.push(o);
          else if (I)
            a[c] = [o], g(c) && (p[c] = a[c]);
          else {
            const N = [o];
            c.value = N, e.k && (a[e.k] = N);
          }
        } else I ? (a[c] = i, g(c) && (p[c] = i)) : O && (c.value = i, e.k && (a[e.k] = i));
      };
      if (i) {
        const $ = () => {
          B(), $n.delete(e);
        };
        $.id = -1, $n.set(e, $), Pe($, n);
      } else
        lr(e), B();
    }
  }
}
function lr(e) {
  const t = $n.get(e);
  t && (t.flags |= 8, $n.delete(e));
}
jn().requestIdleCallback;
jn().cancelIdleCallback;
const on = (e) => !!e.type.__asyncLoader, No = (e) => e.type.__isKeepAlive;
function al(e, t) {
  xo(e, "a", t);
}
function ul(e, t) {
  xo(e, "da", t);
}
function xo(e, t, n = he) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (qn(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      No(r.parent.vnode) && fl(s, t, n, r), r = r.parent;
  }
}
function fl(e, t, n, s) {
  const r = qn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  $o(() => {
    Ds(s[t], r);
  }, n);
}
function qn(e, t, n = he, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      rt();
      const l = yn(n), c = Je(t, n, e, i);
      return l(), ot(), c;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const it = (e) => (t, n = he) => {
  (!mn || e === "sp") && qn(e, (...s) => t(...s), n);
}, dl = it("bm"), Wn = it("m"), pl = it(
  "bu"
), hl = it("u"), ml = it(
  "bum"
), $o = it("um"), gl = it(
  "sp"
), _l = it("rtg"), vl = it("rtc");
function yl(e, t = he) {
  qn("ec", e, t);
}
const bl = "components";
function Oe(e, t) {
  return Sl(bl, e, !0, t) || e;
}
const El = Symbol.for("v-ndc");
function Sl(e, t, n = !0, s = !1) {
  const r = Ie || he;
  if (r) {
    const o = r.type;
    {
      const l = uc(
        o,
        !1
      );
      if (l && (l === t || l === Me(t) || l === Bn(Me(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      cr(r[e] || o[e], t) || // global registration
      cr(r.appContext[e], t)
    );
    return !i && s ? o : i;
  }
}
function cr(e, t) {
  return e && (e[t] || e[Me(t)] || e[Bn(Me(t))]);
}
function vt(e, t, n, s) {
  let r;
  const o = n, i = H(e);
  if (i || le(e)) {
    const l = i && Ut(e);
    let c = !1, d = !1;
    l && (c = !$e(e), d = _t(e), e = Gn(e)), r = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      r[a] = t(
        c ? d ? Tn(fe(e[a])) : fe(e[a]) : e[a],
        a,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (se(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, c) => t(l, c, void 0, o)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, d = l.length; c < d; c++) {
        const a = l[c];
        r[c] = t(e[a], a, c, o);
      }
    }
  else
    r = [];
  return r;
}
const Cs = (e) => e ? Zo(e) ? zn(e) : Cs(e.parent) : null, ln = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ _e(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Cs(e.parent),
    $root: (e) => Cs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Do(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ks(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ao.bind(e.proxy)),
    $watch: (e) => jl.bind(e)
  })
), ls = (e, t) => e !== Z && !e.__isScriptSetup && Y(e, t), Cl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: l, appContext: c } = e;
    let d;
    if (t[0] !== "$") {
      const g = i[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (ls(s, t))
          return i[t] = 1, s[t];
        if (r !== Z && Y(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && Y(d, t)
        )
          return i[t] = 3, o[t];
        if (n !== Z && Y(n, t))
          return i[t] = 4, n[t];
        As && (i[t] = 0);
      }
    }
    const a = ln[t];
    let p, m;
    if (a)
      return t === "$attrs" && pe(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (p = l.__cssModules) && (p = p[t])
    )
      return p;
    if (n !== Z && Y(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      m = c.config.globalProperties, Y(m, t)
    )
      return m[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return ls(r, t) ? (r[t] = n, !0) : s !== Z && Y(s, t) ? (s[t] = n, !0) : Y(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o, type: i }
  }, l) {
    let c, d;
    return !!(n[l] || e !== Z && l[0] !== "$" && Y(e, l) || ls(t, l) || (c = o[0]) && Y(c, l) || Y(s, l) || Y(ln, l) || Y(r.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Y(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ar(e) {
  return H(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let As = !0;
function Al(e) {
  const t = Do(e), n = e.proxy, s = e.ctx;
  As = !1, t.beforeCreate && ur(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: d,
    // lifecycle
    created: a,
    beforeMount: p,
    mounted: m,
    beforeUpdate: g,
    updated: I,
    activated: O,
    deactivated: B,
    beforeDestroy: $,
    beforeUnmount: N,
    destroyed: L,
    unmounted: x,
    render: X,
    renderTracked: ue,
    renderTriggered: re,
    errorCaptured: He,
    serverPrefetch: lt,
    // public API
    expose: Ue,
    inheritAttrs: ct,
    // assets
    components: Et,
    directives: Ve,
    filters: Qt
  } = t;
  if (d && Rl(d, s, null), i)
    for (const J in i) {
      const q = i[J];
      U(q) && (s[J] = q.bind(n));
    }
  if (r) {
    const J = r.call(n, n);
    se(J) && (e.data = _n(J));
  }
  if (As = !0, o)
    for (const J in o) {
      const q = o[J], Xe = U(q) ? q.bind(n, n) : U(q.get) ? q.get.bind(n, n) : ze, at = !U(q) && U(q.set) ? q.set.bind(n) : ze, Be = me({
        get: Xe,
        set: at
      });
      Object.defineProperty(s, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (Ee) => Be.value = Ee
      });
    }
  if (l)
    for (const J in l)
      Mo(l[J], s, n, J);
  if (c) {
    const J = U(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach((q) => {
      wn(q, J[q]);
    });
  }
  a && ur(a, e, "c");
  function ae(J, q) {
    H(q) ? q.forEach((Xe) => J(Xe.bind(n))) : q && J(q.bind(n));
  }
  if (ae(dl, p), ae(Wn, m), ae(pl, g), ae(hl, I), ae(al, O), ae(ul, B), ae(yl, He), ae(vl, ue), ae(_l, re), ae(ml, N), ae($o, x), ae(gl, lt), H(Ue))
    if (Ue.length) {
      const J = e.exposed || (e.exposed = {});
      Ue.forEach((q) => {
        Object.defineProperty(J, q, {
          get: () => n[q],
          set: (Xe) => n[q] = Xe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  X && e.render === ze && (e.render = X), ct != null && (e.inheritAttrs = ct), Et && (e.components = Et), Ve && (e.directives = Ve), lt && Oo(e);
}
function Rl(e, t, n = ze) {
  H(e) && (e = Rs(e));
  for (const s in e) {
    const r = e[s];
    let o;
    se(r) ? "default" in r ? o = Le(
      r.from || s,
      r.default,
      !0
    ) : o = Le(r.from || s) : o = Le(r), ge(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[s] = o;
  }
}
function ur(e, t, n) {
  Je(
    H(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Mo(e, t, n, s) {
  let r = s.includes(".") ? Qo(n, s) : () => n[s];
  if (le(e)) {
    const o = t[e];
    U(o) && Gt(r, o);
  } else if (U(e))
    Gt(r, e.bind(n));
  else if (se(e))
    if (H(e))
      e.forEach((o) => Mo(o, t, n, s));
    else {
      const o = U(e.handler) ? e.handler.bind(n) : t[e.handler];
      U(o) && Gt(r, o, e);
    }
}
function Do(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let c;
  return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (d) => Mn(c, d, i, !0)
  ), Mn(c, t, i)), se(t) && o.set(t, c), c;
}
function Mn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Mn(e, o, n, !0), r && r.forEach(
    (i) => Mn(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = wl[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const wl = {
  data: fr,
  props: dr,
  emits: dr,
  // objects
  methods: Zt,
  computed: Zt,
  // lifecycle
  beforeCreate: ve,
  created: ve,
  beforeMount: ve,
  mounted: ve,
  beforeUpdate: ve,
  updated: ve,
  beforeDestroy: ve,
  beforeUnmount: ve,
  destroyed: ve,
  unmounted: ve,
  activated: ve,
  deactivated: ve,
  errorCaptured: ve,
  serverPrefetch: ve,
  // assets
  components: Zt,
  directives: Zt,
  // watch
  watch: Il,
  // provide / inject
  provide: fr,
  inject: Pl
};
function fr(e, t) {
  return t ? e ? function() {
    return _e(
      U(e) ? e.call(this, this) : e,
      U(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Pl(e, t) {
  return Zt(Rs(e), Rs(t));
}
function Rs(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Zt(e, t) {
  return e ? _e(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function dr(e, t) {
  return e ? H(e) && H(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : _e(
    /* @__PURE__ */ Object.create(null),
    ar(e),
    ar(t ?? {})
  ) : t;
}
function Il(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = _e(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = ve(e[s], t[s]);
  return n;
}
function Lo() {
  return {
    app: null,
    config: {
      isNativeTag: zr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Tl = 0;
function Ol(e, t) {
  return function(s, r = null) {
    U(s) || (s = _e({}, s)), r != null && !se(r) && (r = null);
    const o = Lo(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = o.app = {
      _uid: Tl++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: dc,
      get config() {
        return o.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return i.has(a) || (a && U(a.install) ? (i.add(a), a.install(d, ...p)) : U(a) && (i.add(a), a(d, ...p))), d;
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), d;
      },
      component(a, p) {
        return p ? (o.components[a] = p, d) : o.components[a];
      },
      directive(a, p) {
        return p ? (o.directives[a] = p, d) : o.directives[a];
      },
      mount(a, p, m) {
        if (!c) {
          const g = d._ceVNode || ne(s, r);
          return g.appContext = o, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(g, a, m), c = !0, d._container = a, a.__vue_app__ = d, zn(g.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (Je(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(a, p) {
        return o.provides[a] = p, d;
      },
      runWithContext(a) {
        const p = jt;
        jt = d;
        try {
          return a();
        } finally {
          jt = p;
        }
      }
    };
    return d;
  };
}
let jt = null;
function wn(e, t) {
  if (he) {
    let n = he.provides;
    const s = he.parent && he.parent.provides;
    s === n && (n = he.provides = Object.create(s)), n[e] = t;
  }
}
function Le(e, t, n = !1) {
  const s = oc();
  if (s || jt) {
    let r = jt ? jt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && U(t) ? t.call(s && s.proxy) : t;
  }
}
const Fo = {}, ko = () => Object.create(Fo), Ho = (e) => Object.getPrototypeOf(e) === Fo;
function Nl(e, t, n, s = !1) {
  const r = {}, o = ko();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Uo(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : bo(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function xl(e, t, n, s) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, l = Q(r), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let m = a[p];
        if (Qn(e.emitsOptions, m))
          continue;
        const g = t[m];
        if (c)
          if (Y(o, m))
            g !== o[m] && (o[m] = g, d = !0);
          else {
            const I = Me(m);
            r[I] = ws(
              c,
              l,
              I,
              g,
              e,
              !1
            );
          }
        else
          g !== o[m] && (o[m] = g, d = !0);
      }
    }
  } else {
    Uo(e, t, r, o) && (d = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !Y(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Tt(p)) === p || !Y(t, a))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[p] = ws(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (o !== l)
      for (const p in o)
        (!t || !Y(t, p)) && (delete o[p], d = !0);
  }
  d && nt(e.attrs, "set", "");
}
function Uo(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (en(c))
        continue;
      const d = t[c];
      let a;
      r && Y(r, a = Me(c)) ? !o || !o.includes(a) ? n[a] = d : (l || (l = {}))[a] = d : Qn(e.emitsOptions, c) || (!(c in s) || d !== s[c]) && (s[c] = d, i = !0);
    }
  if (o) {
    const c = Q(n), d = l || Z;
    for (let a = 0; a < o.length; a++) {
      const p = o[a];
      n[p] = ws(
        r,
        c,
        p,
        d[p],
        e,
        !Y(d, p)
      );
    }
  }
  return i;
}
function ws(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = Y(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && U(c)) {
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const a = yn(r);
          s = d[n] = c.call(
            null,
            t
          ), a();
        }
      } else
        s = c;
      r.ce && r.ce._setProp(n, s);
    }
    i[
      0
      /* shouldCast */
    ] && (o && !l ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Tt(n)) && (s = !0));
  }
  return s;
}
const $l = /* @__PURE__ */ new WeakMap();
function Vo(e, t, n = !1) {
  const s = n ? $l : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, l = [];
  let c = !1;
  if (!U(e)) {
    const a = (p) => {
      c = !0;
      const [m, g] = Vo(p, t, !0);
      _e(i, m), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!o && !c)
    return se(e) && s.set(e, kt), kt;
  if (H(o))
    for (let a = 0; a < o.length; a++) {
      const p = Me(o[a]);
      pr(p) && (i[p] = Z);
    }
  else if (o)
    for (const a in o) {
      const p = Me(a);
      if (pr(p)) {
        const m = o[a], g = i[p] = H(m) || U(m) ? { type: m } : _e({}, m), I = g.type;
        let O = !1, B = !0;
        if (H(I))
          for (let $ = 0; $ < I.length; ++$) {
            const N = I[$], L = U(N) && N.name;
            if (L === "Boolean") {
              O = !0;
              break;
            } else L === "String" && (B = !1);
          }
        else
          O = U(I) && I.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = O, g[
          1
          /* shouldCastTrue */
        ] = B, (O || Y(g, "default")) && l.push(p);
      }
    }
  const d = [i, l];
  return se(e) && s.set(e, d), d;
}
function pr(e) {
  return e[0] !== "$" && !en(e);
}
const Ws = (e) => e === "_" || e === "_ctx" || e === "$stable", Qs = (e) => H(e) ? e.map(Qe) : [Qe(e)], Ml = (e, t, n) => {
  if (t._n)
    return t;
  const s = sn((...r) => Qs(t(...r)), n);
  return s._c = !1, s;
}, Bo = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Ws(r)) continue;
    const o = e[r];
    if (U(o))
      t[r] = Ml(r, o, s);
    else if (o != null) {
      const i = Qs(o);
      t[r] = () => i;
    }
  }
}, jo = (e, t) => {
  const n = Qs(t);
  e.slots.default = () => n;
}, Go = (e, t, n) => {
  for (const s in t)
    (n || !Ws(s)) && (e[s] = t[s]);
}, Dl = (e, t, n) => {
  const s = e.slots = ko();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Go(s, t, n), n && to(s, "_", r, !0)) : Bo(t, s);
  } else t && jo(e, t);
}, Ll = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = Z;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : Go(r, t, n) : (o = !t.$stable, Bo(t, r)), i = t;
  } else t && (jo(e, t), i = { default: 1 });
  if (o)
    for (const l in r)
      !Ws(l) && i[l] == null && delete r[l];
}, Pe = Jl;
function Fl(e) {
  return kl(e);
}
function kl(e, t) {
  const n = jn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: l,
    createComment: c,
    setText: d,
    setElementText: a,
    parentNode: p,
    nextSibling: m,
    setScopeId: g = ze,
    insertStaticContent: I
  } = e, O = (u, f, h, v = null, E = null, _ = null, R = void 0, A = null, C = !!f.dynamicChildren) => {
    if (u === f)
      return;
    u && !Jt(u, f) && (v = y(u), Ee(u, E, _, !0), u = null), f.patchFlag === -2 && (C = !1, f.dynamicChildren = null);
    const { type: S, ref: F, shapeFlag: P } = f;
    switch (S) {
      case Yn:
        B(u, f, h, v);
        break;
      case yt:
        $(u, f, h, v);
        break;
      case as:
        u == null && N(f, h, v, R);
        break;
      case de:
        Et(
          u,
          f,
          h,
          v,
          E,
          _,
          R,
          A,
          C
        );
        break;
      default:
        P & 1 ? X(
          u,
          f,
          h,
          v,
          E,
          _,
          R,
          A,
          C
        ) : P & 6 ? Ve(
          u,
          f,
          h,
          v,
          E,
          _,
          R,
          A,
          C
        ) : (P & 64 || P & 128) && S.process(
          u,
          f,
          h,
          v,
          E,
          _,
          R,
          A,
          C,
          M
        );
    }
    F != null && E ? rn(F, u && u.ref, _, f || u, !f) : F == null && u && u.ref != null && rn(u.ref, null, _, u, !0);
  }, B = (u, f, h, v) => {
    if (u == null)
      s(
        f.el = l(f.children),
        h,
        v
      );
    else {
      const E = f.el = u.el;
      f.children !== u.children && d(E, f.children);
    }
  }, $ = (u, f, h, v) => {
    u == null ? s(
      f.el = c(f.children || ""),
      h,
      v
    ) : f.el = u.el;
  }, N = (u, f, h, v) => {
    [u.el, u.anchor] = I(
      u.children,
      f,
      h,
      v,
      u.el,
      u.anchor
    );
  }, L = ({ el: u, anchor: f }, h, v) => {
    let E;
    for (; u && u !== f; )
      E = m(u), s(u, h, v), u = E;
    s(f, h, v);
  }, x = ({ el: u, anchor: f }) => {
    let h;
    for (; u && u !== f; )
      h = m(u), r(u), u = h;
    r(f);
  }, X = (u, f, h, v, E, _, R, A, C) => {
    f.type === "svg" ? R = "svg" : f.type === "math" && (R = "mathml"), u == null ? ue(
      f,
      h,
      v,
      E,
      _,
      R,
      A,
      C
    ) : lt(
      u,
      f,
      E,
      _,
      R,
      A,
      C
    );
  }, ue = (u, f, h, v, E, _, R, A) => {
    let C, S;
    const { props: F, shapeFlag: P, transition: D, dirs: k } = u;
    if (C = u.el = i(
      u.type,
      _,
      F && F.is,
      F
    ), P & 8 ? a(C, u.children) : P & 16 && He(
      u.children,
      C,
      null,
      v,
      E,
      cs(u, _),
      R,
      A
    ), k && Ct(u, null, v, "created"), re(C, u, u.scopeId, R, v), F) {
      for (const ee in F)
        ee !== "value" && !en(ee) && o(C, ee, null, F[ee], _, v);
      "value" in F && o(C, "value", null, F.value, _), (S = F.onVnodeBeforeMount) && qe(S, v, u);
    }
    k && Ct(u, null, v, "beforeMount");
    const K = Hl(E, D);
    K && D.beforeEnter(C), s(C, f, h), ((S = F && F.onVnodeMounted) || K || k) && Pe(() => {
      S && qe(S, v, u), K && D.enter(C), k && Ct(u, null, v, "mounted");
    }, E);
  }, re = (u, f, h, v, E) => {
    if (h && g(u, h), v)
      for (let _ = 0; _ < v.length; _++)
        g(u, v[_]);
    if (E) {
      let _ = E.subTree;
      if (f === _ || zo(_.type) && (_.ssContent === f || _.ssFallback === f)) {
        const R = E.vnode;
        re(
          u,
          R,
          R.scopeId,
          R.slotScopeIds,
          E.parent
        );
      }
    }
  }, He = (u, f, h, v, E, _, R, A, C = 0) => {
    for (let S = C; S < u.length; S++) {
      const F = u[S] = A ? dt(u[S]) : Qe(u[S]);
      O(
        null,
        F,
        f,
        h,
        v,
        E,
        _,
        R,
        A
      );
    }
  }, lt = (u, f, h, v, E, _, R) => {
    const A = f.el = u.el;
    let { patchFlag: C, dynamicChildren: S, dirs: F } = f;
    C |= u.patchFlag & 16;
    const P = u.props || Z, D = f.props || Z;
    let k;
    if (h && At(h, !1), (k = D.onVnodeBeforeUpdate) && qe(k, h, f, u), F && Ct(f, u, h, "beforeUpdate"), h && At(h, !0), (P.innerHTML && D.innerHTML == null || P.textContent && D.textContent == null) && a(A, ""), S ? Ue(
      u.dynamicChildren,
      S,
      A,
      h,
      v,
      cs(f, E),
      _
    ) : R || q(
      u,
      f,
      A,
      null,
      h,
      v,
      cs(f, E),
      _,
      !1
    ), C > 0) {
      if (C & 16)
        ct(A, P, D, h, E);
      else if (C & 2 && P.class !== D.class && o(A, "class", null, D.class, E), C & 4 && o(A, "style", P.style, D.style, E), C & 8) {
        const K = f.dynamicProps;
        for (let ee = 0; ee < K.length; ee++) {
          const z = K[ee], Se = P[z], Ce = D[z];
          (Ce !== Se || z === "value") && o(A, z, Se, Ce, E, h);
        }
      }
      C & 1 && u.children !== f.children && a(A, f.children);
    } else !R && S == null && ct(A, P, D, h, E);
    ((k = D.onVnodeUpdated) || F) && Pe(() => {
      k && qe(k, h, f, u), F && Ct(f, u, h, "updated");
    }, v);
  }, Ue = (u, f, h, v, E, _, R) => {
    for (let A = 0; A < f.length; A++) {
      const C = u[A], S = f[A], F = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        C.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (C.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Jt(C, S) || // - In the case of a component, it could contain anything.
        C.shapeFlag & 198) ? p(C.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      O(
        C,
        S,
        F,
        null,
        v,
        E,
        _,
        R,
        !0
      );
    }
  }, ct = (u, f, h, v, E) => {
    if (f !== h) {
      if (f !== Z)
        for (const _ in f)
          !en(_) && !(_ in h) && o(
            u,
            _,
            f[_],
            null,
            E,
            v
          );
      for (const _ in h) {
        if (en(_)) continue;
        const R = h[_], A = f[_];
        R !== A && _ !== "value" && o(u, _, A, R, E, v);
      }
      "value" in h && o(u, "value", f.value, h.value, E);
    }
  }, Et = (u, f, h, v, E, _, R, A, C) => {
    const S = f.el = u ? u.el : l(""), F = f.anchor = u ? u.anchor : l("");
    let { patchFlag: P, dynamicChildren: D, slotScopeIds: k } = f;
    k && (A = A ? A.concat(k) : k), u == null ? (s(S, h, v), s(F, h, v), He(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      F,
      E,
      _,
      R,
      A,
      C
    )) : P > 0 && P & 64 && D && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren ? (Ue(
      u.dynamicChildren,
      D,
      h,
      E,
      _,
      R,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || E && f === E.subTree) && Ko(
      u,
      f,
      !0
      /* shallow */
    )) : q(
      u,
      f,
      h,
      F,
      E,
      _,
      R,
      A,
      C
    );
  }, Ve = (u, f, h, v, E, _, R, A, C) => {
    f.slotScopeIds = A, u == null ? f.shapeFlag & 512 ? E.ctx.activate(
      f,
      h,
      v,
      R,
      C
    ) : Qt(
      f,
      h,
      v,
      E,
      _,
      R,
      C
    ) : Ot(u, f, C);
  }, Qt = (u, f, h, v, E, _, R) => {
    const A = u.component = rc(
      u,
      v,
      E
    );
    if (No(u) && (A.ctx.renderer = M), ic(A, !1, R), A.asyncDep) {
      if (E && E.registerDep(A, ae, R), !u.el) {
        const C = A.subTree = ne(yt);
        $(null, C, f, h), u.placeholder = C.el;
      }
    } else
      ae(
        A,
        u,
        f,
        h,
        E,
        _,
        R
      );
  }, Ot = (u, f, h) => {
    const v = f.component = u.component;
    if (Yl(u, f, h))
      if (v.asyncDep && !v.asyncResolved) {
        J(v, f, h);
        return;
      } else
        v.next = f, v.update();
    else
      f.el = u.el, v.vnode = f;
  }, ae = (u, f, h, v, E, _, R) => {
    const A = () => {
      if (u.isMounted) {
        let { next: P, bu: D, u: k, parent: K, vnode: ee } = u;
        {
          const Ge = qo(u);
          if (Ge) {
            P && (P.el = ee.el, J(u, P, R)), Ge.asyncDep.then(() => {
              u.isUnmounted || A();
            });
            return;
          }
        }
        let z = P, Se;
        At(u, !1), P ? (P.el = ee.el, J(u, P, R)) : P = ee, D && Rn(D), (Se = P.props && P.props.onVnodeBeforeUpdate) && qe(Se, K, P, ee), At(u, !0);
        const Ce = mr(u), je = u.subTree;
        u.subTree = Ce, O(
          je,
          Ce,
          // parent may have changed if it's in a teleport
          p(je.el),
          // anchor may have changed if it's in a fragment
          y(je),
          u,
          E,
          _
        ), P.el = Ce.el, z === null && zl(u, Ce.el), k && Pe(k, E), (Se = P.props && P.props.onVnodeUpdated) && Pe(
          () => qe(Se, K, P, ee),
          E
        );
      } else {
        let P;
        const { el: D, props: k } = f, { bm: K, m: ee, parent: z, root: Se, type: Ce } = u, je = on(f);
        At(u, !1), K && Rn(K), !je && (P = k && k.onVnodeBeforeMount) && qe(P, z, f), At(u, !0);
        {
          Se.ce && // @ts-expect-error _def is private
          Se.ce._def.shadowRoot !== !1 && Se.ce._injectChildStyle(Ce);
          const Ge = u.subTree = mr(u);
          O(
            null,
            Ge,
            h,
            v,
            u,
            E,
            _
          ), f.el = Ge.el;
        }
        if (ee && Pe(ee, E), !je && (P = k && k.onVnodeMounted)) {
          const Ge = f;
          Pe(
            () => qe(P, z, Ge),
            E
          );
        }
        (f.shapeFlag & 256 || z && on(z.vnode) && z.vnode.shapeFlag & 256) && u.a && Pe(u.a, E), u.isMounted = !0, f = h = v = null;
      }
    };
    u.scope.on();
    const C = u.effect = new oo(A);
    u.scope.off();
    const S = u.update = C.run.bind(C), F = u.job = C.runIfDirty.bind(C);
    F.i = u, F.id = u.uid, C.scheduler = () => Ks(F), At(u, !0), S();
  }, J = (u, f, h) => {
    f.component = u;
    const v = u.vnode.props;
    u.vnode = f, u.next = null, xl(u, f.props, v, h), Ll(u, f.children, h), rt(), ir(u), ot();
  }, q = (u, f, h, v, E, _, R, A, C = !1) => {
    const S = u && u.children, F = u ? u.shapeFlag : 0, P = f.children, { patchFlag: D, shapeFlag: k } = f;
    if (D > 0) {
      if (D & 128) {
        at(
          S,
          P,
          h,
          v,
          E,
          _,
          R,
          A,
          C
        );
        return;
      } else if (D & 256) {
        Xe(
          S,
          P,
          h,
          v,
          E,
          _,
          R,
          A,
          C
        );
        return;
      }
    }
    k & 8 ? (F & 16 && xe(S, E, _), P !== S && a(h, P)) : F & 16 ? k & 16 ? at(
      S,
      P,
      h,
      v,
      E,
      _,
      R,
      A,
      C
    ) : xe(S, E, _, !0) : (F & 8 && a(h, ""), k & 16 && He(
      P,
      h,
      v,
      E,
      _,
      R,
      A,
      C
    ));
  }, Xe = (u, f, h, v, E, _, R, A, C) => {
    u = u || kt, f = f || kt;
    const S = u.length, F = f.length, P = Math.min(S, F);
    let D;
    for (D = 0; D < P; D++) {
      const k = f[D] = C ? dt(f[D]) : Qe(f[D]);
      O(
        u[D],
        k,
        h,
        null,
        E,
        _,
        R,
        A,
        C
      );
    }
    S > F ? xe(
      u,
      E,
      _,
      !0,
      !1,
      P
    ) : He(
      f,
      h,
      v,
      E,
      _,
      R,
      A,
      C,
      P
    );
  }, at = (u, f, h, v, E, _, R, A, C) => {
    let S = 0;
    const F = f.length;
    let P = u.length - 1, D = F - 1;
    for (; S <= P && S <= D; ) {
      const k = u[S], K = f[S] = C ? dt(f[S]) : Qe(f[S]);
      if (Jt(k, K))
        O(
          k,
          K,
          h,
          null,
          E,
          _,
          R,
          A,
          C
        );
      else
        break;
      S++;
    }
    for (; S <= P && S <= D; ) {
      const k = u[P], K = f[D] = C ? dt(f[D]) : Qe(f[D]);
      if (Jt(k, K))
        O(
          k,
          K,
          h,
          null,
          E,
          _,
          R,
          A,
          C
        );
      else
        break;
      P--, D--;
    }
    if (S > P) {
      if (S <= D) {
        const k = D + 1, K = k < F ? f[k].el : v;
        for (; S <= D; )
          O(
            null,
            f[S] = C ? dt(f[S]) : Qe(f[S]),
            h,
            K,
            E,
            _,
            R,
            A,
            C
          ), S++;
      }
    } else if (S > D)
      for (; S <= P; )
        Ee(u[S], E, _, !0), S++;
    else {
      const k = S, K = S, ee = /* @__PURE__ */ new Map();
      for (S = K; S <= D; S++) {
        const we = f[S] = C ? dt(f[S]) : Qe(f[S]);
        we.key != null && ee.set(we.key, S);
      }
      let z, Se = 0;
      const Ce = D - K + 1;
      let je = !1, Ge = 0;
      const Yt = new Array(Ce);
      for (S = 0; S < Ce; S++) Yt[S] = 0;
      for (S = k; S <= P; S++) {
        const we = u[S];
        if (Se >= Ce) {
          Ee(we, E, _, !0);
          continue;
        }
        let Ke;
        if (we.key != null)
          Ke = ee.get(we.key);
        else
          for (z = K; z <= D; z++)
            if (Yt[z - K] === 0 && Jt(we, f[z])) {
              Ke = z;
              break;
            }
        Ke === void 0 ? Ee(we, E, _, !0) : (Yt[Ke - K] = S + 1, Ke >= Ge ? Ge = Ke : je = !0, O(
          we,
          f[Ke],
          h,
          null,
          E,
          _,
          R,
          A,
          C
        ), Se++);
      }
      const er = je ? Ul(Yt) : kt;
      for (z = er.length - 1, S = Ce - 1; S >= 0; S--) {
        const we = K + S, Ke = f[we], tr = f[we + 1], nr = we + 1 < F ? (
          // #13559, fallback to el placeholder for unresolved async component
          tr.el || tr.placeholder
        ) : v;
        Yt[S] === 0 ? O(
          null,
          Ke,
          h,
          nr,
          E,
          _,
          R,
          A,
          C
        ) : je && (z < 0 || S !== er[z] ? Be(Ke, h, nr, 2) : z--);
      }
    }
  }, Be = (u, f, h, v, E = null) => {
    const { el: _, type: R, transition: A, children: C, shapeFlag: S } = u;
    if (S & 6) {
      Be(u.component.subTree, f, h, v);
      return;
    }
    if (S & 128) {
      u.suspense.move(f, h, v);
      return;
    }
    if (S & 64) {
      R.move(u, f, h, M);
      return;
    }
    if (R === de) {
      s(_, f, h);
      for (let P = 0; P < C.length; P++)
        Be(C[P], f, h, v);
      s(u.anchor, f, h);
      return;
    }
    if (R === as) {
      L(u, f, h);
      return;
    }
    if (v !== 2 && S & 1 && A)
      if (v === 0)
        A.beforeEnter(_), s(_, f, h), Pe(() => A.enter(_), E);
      else {
        const { leave: P, delayLeave: D, afterLeave: k } = A, K = () => {
          u.ctx.isUnmounted ? r(_) : s(_, f, h);
        }, ee = () => {
          _._isLeaving && _[cl](
            !0
            /* cancelled */
          ), P(_, () => {
            K(), k && k();
          });
        };
        D ? D(_, K, ee) : ee();
      }
    else
      s(_, f, h);
  }, Ee = (u, f, h, v = !1, E = !1) => {
    const {
      type: _,
      props: R,
      ref: A,
      children: C,
      dynamicChildren: S,
      shapeFlag: F,
      patchFlag: P,
      dirs: D,
      cacheIndex: k
    } = u;
    if (P === -2 && (E = !1), A != null && (rt(), rn(A, null, h, u, !0), ot()), k != null && (f.renderCache[k] = void 0), F & 256) {
      f.ctx.deactivate(u);
      return;
    }
    const K = F & 1 && D, ee = !on(u);
    let z;
    if (ee && (z = R && R.onVnodeBeforeUnmount) && qe(z, f, u), F & 6)
      St(u.component, h, v);
    else {
      if (F & 128) {
        u.suspense.unmount(h, v);
        return;
      }
      K && Ct(u, null, f, "beforeUnmount"), F & 64 ? u.type.remove(
        u,
        f,
        h,
        M,
        v
      ) : S && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !S.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== de || P > 0 && P & 64) ? xe(
        S,
        f,
        h,
        !1,
        !0
      ) : (_ === de && P & 384 || !E && F & 16) && xe(C, f, h), v && Nt(u);
    }
    (ee && (z = R && R.onVnodeUnmounted) || K) && Pe(() => {
      z && qe(z, f, u), K && Ct(u, null, f, "unmounted");
    }, h);
  }, Nt = (u) => {
    const { type: f, el: h, anchor: v, transition: E } = u;
    if (f === de) {
      xt(h, v);
      return;
    }
    if (f === as) {
      x(u);
      return;
    }
    const _ = () => {
      r(h), E && !E.persisted && E.afterLeave && E.afterLeave();
    };
    if (u.shapeFlag & 1 && E && !E.persisted) {
      const { leave: R, delayLeave: A } = E, C = () => R(h, _);
      A ? A(u.el, _, C) : C();
    } else
      _();
  }, xt = (u, f) => {
    let h;
    for (; u !== f; )
      h = m(u), r(u), u = h;
    r(f);
  }, St = (u, f, h) => {
    const { bum: v, scope: E, job: _, subTree: R, um: A, m: C, a: S } = u;
    hr(C), hr(S), v && Rn(v), E.stop(), _ && (_.flags |= 8, Ee(R, u, f, h)), A && Pe(A, f), Pe(() => {
      u.isUnmounted = !0;
    }, f);
  }, xe = (u, f, h, v = !1, E = !1, _ = 0) => {
    for (let R = _; R < u.length; R++)
      Ee(u[R], f, h, v, E);
  }, y = (u) => {
    if (u.shapeFlag & 6)
      return y(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const f = m(u.anchor || u.el), h = f && f[il];
    return h ? m(h) : f;
  };
  let T = !1;
  const w = (u, f, h) => {
    u == null ? f._vnode && Ee(f._vnode, null, null, !0) : O(
      f._vnode || null,
      u,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = u, T || (T = !0, ir(), wo(), T = !1);
  }, M = {
    p: O,
    um: Ee,
    m: Be,
    r: Nt,
    mt: Qt,
    mc: He,
    pc: q,
    pbc: Ue,
    n: y,
    o: e
  };
  return {
    render: w,
    hydrate: void 0,
    createApp: Ol(w)
  };
}
function cs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function At({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Hl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ko(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (H(s) && H(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[o] = dt(r[o]), l.el = i.el), !n && l.patchFlag !== -2 && Ko(i, l)), l.type === Yn && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === yt && !l.el && (l.el = i.el);
    }
}
function Ul(e) {
  const t = e.slice(), n = [0];
  let s, r, o, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const d = e[s];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[s] = r, n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        l = o + i >> 1, e[n[l]] < d ? o = l + 1 : i = l;
      d < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; )
    n[o] = i, i = t[i];
  return n;
}
function qo(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : qo(t);
}
function hr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Vl = Symbol.for("v-scx"), Bl = () => Le(Vl);
function Gt(e, t, n) {
  return Wo(e, t, n);
}
function Wo(e, t, n = Z) {
  const { immediate: s, deep: r, flush: o, once: i } = n, l = _e({}, n), c = t && s || !t && o !== "post";
  let d;
  if (mn) {
    if (o === "sync") {
      const g = Bl();
      d = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!c) {
      const g = () => {
      };
      return g.stop = ze, g.resume = ze, g.pause = ze, g;
    }
  }
  const a = he;
  l.call = (g, I, O) => Je(g, a, I, O);
  let p = !1;
  o === "post" ? l.scheduler = (g) => {
    Pe(g, a && a.suspense);
  } : o !== "sync" && (p = !0, l.scheduler = (g, I) => {
    I ? g() : Ks(g);
  }), l.augmentJob = (g) => {
    t && (g.flags |= 4), p && (g.flags |= 2, a && (g.id = a.uid, g.i = a));
  };
  const m = nl(e, t, l);
  return mn && (d ? d.push(m) : c && m()), m;
}
function jl(e, t, n) {
  const s = this.proxy, r = le(e) ? e.includes(".") ? Qo(s, e) : () => s[e] : e.bind(s, s);
  let o;
  U(t) ? o = t : (o = t.handler, n = t);
  const i = yn(this), l = Wo(r, o.bind(s), n);
  return i(), l;
}
function Qo(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Gl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Me(t)}Modifiers`] || e[`${Tt(t)}Modifiers`];
function Kl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Z;
  let r = n;
  const o = t.startsWith("update:"), i = o && Gl(s, t.slice(7));
  i && (i.trim && (r = n.map((a) => le(a) ? a.trim() : a)), i.number && (r = n.map(_s)));
  let l, c = s[l = ns(t)] || // also try camelCase event handler (#2249)
  s[l = ns(Me(t))];
  !c && o && (c = s[l = ns(Tt(t))]), c && Je(
    c,
    e,
    6,
    r
  );
  const d = s[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Je(
      d,
      e,
      6,
      r
    );
  }
}
const ql = /* @__PURE__ */ new WeakMap();
function Yo(e, t, n = !1) {
  const s = n ? ql : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, l = !1;
  if (!U(e)) {
    const c = (d) => {
      const a = Yo(d, t, !0);
      a && (l = !0, _e(i, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !l ? (se(e) && s.set(e, null), null) : (H(o) ? o.forEach((c) => i[c] = null) : _e(i, o), se(e) && s.set(e, i), i);
}
function Qn(e, t) {
  return !e || !Hn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, Tt(t)) || Y(e, t));
}
function mr(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [o],
    slots: i,
    attrs: l,
    emit: c,
    render: d,
    renderCache: a,
    props: p,
    data: m,
    setupState: g,
    ctx: I,
    inheritAttrs: O
  } = e, B = xn(e);
  let $, N;
  try {
    if (n.shapeFlag & 4) {
      const x = r || s, X = x;
      $ = Qe(
        d.call(
          X,
          x,
          a,
          p,
          g,
          m,
          I
        )
      ), N = l;
    } else {
      const x = t;
      $ = Qe(
        x.length > 1 ? x(
          p,
          { attrs: l, slots: i, emit: c }
        ) : x(
          p,
          null
        )
      ), N = t.props ? l : Wl(l);
    }
  } catch (x) {
    cn.length = 0, Kn(x, e, 1), $ = ne(yt);
  }
  let L = $;
  if (N && O !== !1) {
    const x = Object.keys(N), { shapeFlag: X } = L;
    x.length && X & 7 && (o && x.some(Ms) && (N = Ql(
      N,
      o
    )), L = Kt(L, N, !1, !0));
  }
  return n.dirs && (L = Kt(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition && qs(L, n.transition), $ = L, xn(B), $;
}
const Wl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Hn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ql = (e, t) => {
  const n = {};
  for (const s in e)
    (!Ms(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Yl(e, t, n) {
  const { props: s, children: r, component: o } = e, { props: i, children: l, patchFlag: c } = t, d = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? gr(s, i, d) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const m = a[p];
        if (i[m] !== s[m] && !Qn(d, m))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? gr(s, i, d) : !0 : !!i;
  return !1;
}
function gr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !Qn(n, o))
      return !0;
  }
  return !1;
}
function zl({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const zo = (e) => e.__isSuspense;
function Jl(e, t) {
  t && t.pendingBranch ? H(e) ? t.effects.push(...e) : t.effects.push(e) : ol(e);
}
const de = Symbol.for("v-fgt"), Yn = Symbol.for("v-txt"), yt = Symbol.for("v-cmt"), as = Symbol.for("v-stc"), cn = [];
let Te = null;
function V(e = !1) {
  cn.push(Te = e ? null : []);
}
function Xl() {
  cn.pop(), Te = cn[cn.length - 1] || null;
}
let hn = 1;
function Dn(e, t = !1) {
  hn += e, e < 0 && Te && t && (Te.hasOnce = !0);
}
function Jo(e) {
  return e.dynamicChildren = hn > 0 ? Te || kt : null, Xl(), hn > 0 && Te && Te.push(e), e;
}
function j(e, t, n, s, r, o) {
  return Jo(
    b(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Ys(e, t, n, s, r) {
  return Jo(
    ne(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Ln(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Jt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Xo = ({ key: e }) => e ?? null, Pn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? le(e) || ge(e) || U(e) ? { i: Ie, r: e, k: t, f: !!n } : e : null);
function b(e, t = null, n = null, s = 0, r = null, o = e === de ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xo(t),
    ref: t && Pn(t),
    scopeId: Io,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Ie
  };
  return l ? (zs(c, n), o & 128 && e.normalize(c)) : n && (c.shapeFlag |= le(n) ? 8 : 16), hn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Te && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Te.push(c), c;
}
const ne = Zl;
function Zl(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === El) && (e = yt), Ln(e)) {
    const l = Kt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && zs(l, n), hn > 0 && !o && Te && (l.shapeFlag & 6 ? Te[Te.indexOf(e)] = l : Te.push(l)), l.patchFlag = -2, l;
  }
  if (fc(e) && (e = e.__vccOpts), t) {
    t = ec(t);
    let { class: l, style: c } = t;
    l && !le(l) && (t.class = It(l)), se(c) && (Gs(c) && !H(c) && (c = _e({}, c)), t.style = Fs(c));
  }
  const i = le(e) ? 1 : zo(e) ? 128 : ll(e) ? 64 : se(e) ? 4 : U(e) ? 2 : 0;
  return b(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function ec(e) {
  return e ? Gs(e) || Ho(e) ? _e({}, e) : e : null;
}
function Kt(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: c } = e, d = t ? tc(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Xo(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? H(o) ? o.concat(Pn(t)) : [o, Pn(t)] : Pn(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== de ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Kt(e.ssContent),
    ssFallback: e.ssFallback && Kt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && qs(
    a,
    c.clone(a)
  ), a;
}
function an(e = " ", t = 0) {
  return ne(Yn, null, e, t);
}
function Dt(e = "", t = !1) {
  return t ? (V(), Ys(yt, null, e)) : ne(yt, null, e);
}
function Qe(e) {
  return e == null || typeof e == "boolean" ? ne(yt) : H(e) ? ne(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ln(e) ? dt(e) : ne(Yn, null, String(e));
}
function dt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Kt(e);
}
function zs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (H(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), zs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Ho(t) ? t._ctx = Ie : r === 3 && Ie && (Ie.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else U(t) ? (t = { default: t, _ctx: Ie }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [an(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function tc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = It([t.class, s.class]));
      else if (r === "style")
        t.style = Fs([t.style, s.style]);
      else if (Hn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(H(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function qe(e, t, n, s = null) {
  Je(e, t, 7, [
    n,
    s
  ]);
}
const nc = Lo();
let sc = 0;
function rc(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || nc, o = {
    uid: sc++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ti(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Vo(s, r),
    emitsOptions: Yo(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Z,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: Z,
    data: Z,
    props: Z,
    attrs: Z,
    slots: Z,
    refs: Z,
    setupState: Z,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Kl.bind(null, o), e.ce && e.ce(o), o;
}
let he = null;
const oc = () => he || Ie;
let Fn, Ps;
{
  const e = jn(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  Fn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => he = n
  ), Ps = t(
    "__VUE_SSR_SETTERS__",
    (n) => mn = n
  );
}
const yn = (e) => {
  const t = he;
  return Fn(e), e.scope.on(), () => {
    e.scope.off(), Fn(t);
  };
}, _r = () => {
  he && he.scope.off(), Fn(null);
};
function Zo(e) {
  return e.vnode.shapeFlag & 4;
}
let mn = !1;
function ic(e, t = !1, n = !1) {
  t && Ps(t);
  const { props: s, children: r } = e.vnode, o = Zo(e);
  Nl(e, s, o, t), Dl(e, r, n || t);
  const i = o ? lc(e, t) : void 0;
  return t && Ps(!1), i;
}
function lc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Cl);
  const { setup: s } = n;
  if (s) {
    rt();
    const r = e.setupContext = s.length > 1 ? ac(e) : null, o = yn(e), i = vn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Xr(i);
    if (ot(), o(), (l || e.sp) && !on(e) && Oo(e), l) {
      if (i.then(_r, _r), t)
        return i.then((c) => {
          vr(e, c);
        }).catch((c) => {
          Kn(c, e, 0);
        });
      e.asyncDep = i;
    } else
      vr(e, i);
  } else
    ei(e);
}
function vr(e, t, n) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : se(t) && (e.setupState = So(t)), ei(e);
}
function ei(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || ze);
  {
    const r = yn(e);
    rt();
    try {
      Al(e);
    } finally {
      ot(), r();
    }
  }
}
const cc = {
  get(e, t) {
    return pe(e, "get", ""), e[t];
  }
};
function ac(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, cc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function zn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(So(Yi(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in ln)
        return ln[n](e);
    },
    has(t, n) {
      return n in t || n in ln;
    }
  })) : e.proxy;
}
function uc(e, t = !0) {
  return U(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function fc(e) {
  return U(e) && "__vccOpts" in e;
}
const me = (e, t) => el(e, t, mn);
function ti(e, t, n) {
  try {
    Dn(-1);
    const s = arguments.length;
    return s === 2 ? se(t) && !H(t) ? Ln(t) ? ne(e, null, [t]) : ne(e, t) : ne(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Ln(n) && (n = [n]), ne(e, t, n));
  } finally {
    Dn(1);
  }
}
const dc = "3.5.22";
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Is;
const yr = typeof window < "u" && window.trustedTypes;
if (yr)
  try {
    Is = /* @__PURE__ */ yr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ni = Is ? (e) => Is.createHTML(e) : (e) => e, pc = "http://www.w3.org/2000/svg", hc = "http://www.w3.org/1998/Math/MathML", tt = typeof document < "u" ? document : null, br = tt && /* @__PURE__ */ tt.createElement("template"), mc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? tt.createElementNS(pc, e) : t === "mathml" ? tt.createElementNS(hc, e) : n ? tt.createElement(e, { is: n }) : tt.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => tt.createTextNode(e),
  createComment: (e) => tt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => tt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, o) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      br.innerHTML = ni(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = br.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, gc = Symbol("_vtc");
function _c(e, t, n) {
  const s = e[gc];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Er = Symbol("_vod"), vc = Symbol("_vsh"), yc = Symbol(""), bc = /(?:^|;)\s*display\s*:/;
function Ec(e, t, n) {
  const s = e.style, r = le(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (le(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && In(s, l, "");
        }
      else
        for (const i in t)
          n[i] == null && In(s, i, "");
    for (const i in n)
      i === "display" && (o = !0), In(s, i, n[i]);
  } else if (r) {
    if (t !== n) {
      const i = s[yc];
      i && (n += ";" + i), s.cssText = n, o = bc.test(n);
    }
  } else t && e.removeAttribute("style");
  Er in e && (e[Er] = o ? s.display : "", e[vc] && (s.display = "none"));
}
const Sr = /\s*!important$/;
function In(e, t, n) {
  if (H(n))
    n.forEach((s) => In(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Sc(e, t);
    Sr.test(n) ? e.setProperty(
      Tt(s),
      n.replace(Sr, ""),
      "important"
    ) : e[s] = n;
  }
}
const Cr = ["Webkit", "Moz", "ms"], us = {};
function Sc(e, t) {
  const n = us[t];
  if (n)
    return n;
  let s = Me(t);
  if (s !== "filter" && s in e)
    return us[t] = s;
  s = Bn(s);
  for (let r = 0; r < Cr.length; r++) {
    const o = Cr[r] + s;
    if (o in e)
      return us[t] = o;
  }
  return t;
}
const Ar = "http://www.w3.org/1999/xlink";
function Rr(e, t, n, s, r, o = Ii(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ar, t.slice(6, t.length)) : e.setAttributeNS(Ar, t, n) : n == null || o && !no(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : bt(n) ? String(n) : n
  );
}
function wr(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? ni(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = no(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function Lt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Cc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Pr = Symbol("_vei");
function Ac(e, t, n, s, r = null) {
  const o = e[Pr] || (e[Pr] = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [l, c] = Rc(t);
    if (s) {
      const d = o[t] = Ic(
        s,
        r
      );
      Lt(e, l, d, c);
    } else i && (Cc(e, l, i, c), o[t] = void 0);
  }
}
const Ir = /(?:Once|Passive|Capture)$/;
function Rc(e) {
  let t;
  if (Ir.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Ir); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Tt(e.slice(2)), t];
}
let fs = 0;
const wc = /* @__PURE__ */ Promise.resolve(), Pc = () => fs || (wc.then(() => fs = 0), fs = Date.now());
function Ic(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Je(
      Tc(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Pc(), n;
}
function Tc(e, t) {
  if (H(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const Tr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Oc = (e, t, n, s, r, o) => {
  const i = r === "svg";
  t === "class" ? _c(e, s, i) : t === "style" ? Ec(e, n, s) : Hn(t) ? Ms(t) || Ac(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Nc(e, t, s, i)) ? (wr(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Rr(e, t, s, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !le(s)) ? wr(e, Me(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Rr(e, t, s, i));
};
function Nc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Tr(t) && U(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Tr(t) && le(n) ? !1 : t in e;
}
const Or = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return H(t) ? (n) => Rn(t, n) : t;
};
function xc(e) {
  e.target.composing = !0;
}
function Nr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const ds = Symbol("_assign"), mt = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[ds] = Or(r);
    const o = s || r.props && r.props.type === "number";
    Lt(e, t ? "change" : "input", (i) => {
      if (i.target.composing) return;
      let l = e.value;
      n && (l = l.trim()), o && (l = _s(l)), e[ds](l);
    }), n && Lt(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Lt(e, "compositionstart", xc), Lt(e, "compositionend", Nr), Lt(e, "change", Nr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: o } }, i) {
    if (e[ds] = Or(i), e.composing) return;
    const l = (o || e.type === "number") && !/^0\d/.test(e.value) ? _s(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c));
  }
}, $c = ["ctrl", "shift", "alt", "meta"], Mc = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => $c.some((n) => e[`${n}Key`] && !t.includes(n))
}, kn = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const l = Mc[t[i]];
      if (l && l(r, t)) return;
    }
    return e(r, ...o);
  }));
}, Dc = /* @__PURE__ */ _e({ patchProp: Oc }, mc);
let xr;
function Lc() {
  return xr || (xr = Fl(Dc));
}
const Fc = ((...e) => {
  const t = Lc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = Hc(s);
    if (!r) return;
    const o = t._component;
    !U(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = n(r, !1, kc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function kc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Hc(e) {
  return le(e) ? document.querySelector(e) : e;
}
function Uc(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(t, n) {
    var s = e.get(t);
    s ? s.push(n) : e.set(t, [n]);
  }, off: function(t, n) {
    var s = e.get(t);
    s && (n ? s.splice(s.indexOf(n) >>> 0, 1) : e.set(t, []));
  }, emit: function(t, n) {
    var s = e.get(t);
    s && s.slice().map(function(r) {
      r(n);
    }), (s = e.get("*")) && s.slice().map(function(r) {
      r(t, n);
    });
  } };
}
const Vc = Uc();
/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const Ft = typeof document < "u";
function si(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Bc(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && si(e.default);
}
const W = Object.assign;
function ps(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = Fe(r) ? r.map(e) : e(r);
  }
  return n;
}
const un = () => {
}, Fe = Array.isArray;
function $r(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
const ri = /#/g, jc = /&/g, Gc = /\//g, Kc = /=/g, qc = /\?/g, oi = /\+/g, Wc = /%5B/g, Qc = /%5D/g, ii = /%5E/g, Yc = /%60/g, li = /%7B/g, zc = /%7C/g, ci = /%7D/g, Jc = /%20/g;
function Js(e) {
  return e == null ? "" : encodeURI("" + e).replace(zc, "|").replace(Wc, "[").replace(Qc, "]");
}
function Xc(e) {
  return Js(e).replace(li, "{").replace(ci, "}").replace(ii, "^");
}
function Ts(e) {
  return Js(e).replace(oi, "%2B").replace(Jc, "+").replace(ri, "%23").replace(jc, "%26").replace(Yc, "`").replace(li, "{").replace(ci, "}").replace(ii, "^");
}
function Zc(e) {
  return Ts(e).replace(Kc, "%3D");
}
function ea(e) {
  return Js(e).replace(ri, "%23").replace(qc, "%3F");
}
function ta(e) {
  return ea(e).replace(Gc, "%2F");
}
function gn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const na = /\/$/, sa = (e) => e.replace(na, "");
function hs(e, t, n = "/") {
  let s, r = {}, o = "", i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return c = l >= 0 && c > l ? -1 : c, c >= 0 && (s = t.slice(0, c), o = t.slice(c, l > 0 ? l : t.length), r = e(o.slice(1))), l >= 0 && (s = s || t.slice(0, l), i = t.slice(l, t.length)), s = la(s ?? t, n), {
    fullPath: s + o + i,
    path: s,
    query: r,
    hash: gn(i)
  };
}
function ra(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Mr(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function oa(e, t, n) {
  const s = t.matched.length - 1, r = n.matched.length - 1;
  return s > -1 && s === r && qt(t.matched[s], n.matched[r]) && ai(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function qt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ai(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!ia(e[n], t[n])) return !1;
  return !0;
}
function ia(e, t) {
  return Fe(e) ? Dr(e, t) : Fe(t) ? Dr(t, e) : e === t;
}
function Dr(e, t) {
  return Fe(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function la(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"), s = e.split("/"), r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1, i, l;
  for (i = 0; i < s.length; i++)
    if (l = s[i], l !== ".")
      if (l === "..")
        o > 1 && o--;
      else break;
  return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}
const ut = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let Os = /* @__PURE__ */ (function(e) {
  return e.pop = "pop", e.push = "push", e;
})({}), ms = /* @__PURE__ */ (function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
})({});
function ca(e) {
  if (!e) if (Ft) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), sa(e);
}
const aa = /^[^#]+#/;
function ua(e, t) {
  return e.replace(aa, "#") + t;
}
function fa(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const Jn = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function da(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"), r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r)
      return;
    t = fa(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Lr(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ns = /* @__PURE__ */ new Map();
function pa(e, t) {
  Ns.set(e, t);
}
function ha(e) {
  const t = Ns.get(e);
  return Ns.delete(e), t;
}
function ma(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function ui(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let ie = /* @__PURE__ */ (function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
})({});
const fi = Symbol("");
ie.MATCHER_NOT_FOUND + "", ie.NAVIGATION_GUARD_REDIRECT + "", ie.NAVIGATION_ABORTED + "", ie.NAVIGATION_CANCELLED + "", ie.NAVIGATION_DUPLICATED + "";
function Wt(e, t) {
  return W(/* @__PURE__ */ new Error(), {
    type: e,
    [fi]: !0
  }, t);
}
function et(e, t) {
  return e instanceof Error && fi in e && (t == null || !!(e.type & t));
}
const ga = [
  "params",
  "query",
  "hash"
];
function _a(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of ga) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function va(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const r = n[s].replace(oi, " "), o = r.indexOf("="), i = gn(o < 0 ? r : r.slice(0, o)), l = o < 0 ? null : gn(r.slice(o + 1));
    if (i in t) {
      let c = t[i];
      Fe(c) || (c = t[i] = [c]), c.push(l);
    } else t[i] = l;
  }
  return t;
}
function Fr(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = Zc(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Fe(s) ? s.map((r) => r && Ts(r)) : [s && Ts(s)]).forEach((r) => {
      r !== void 0 && (t += (t.length ? "&" : "") + n, r != null && (t += "=" + r));
    });
  }
  return t;
}
function ya(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = Fe(s) ? s.map((r) => r == null ? null : "" + r) : s == null ? s : "" + s);
  }
  return t;
}
const ba = Symbol(""), kr = Symbol(""), Xn = Symbol(""), Xs = Symbol(""), xs = Symbol("");
function Xt() {
  let e = [];
  function t(s) {
    return e.push(s), () => {
      const r = e.indexOf(s);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function pt(e, t, n, s, r, o = (i) => i()) {
  const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () => new Promise((l, c) => {
    const d = (m) => {
      m === !1 ? c(Wt(ie.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : m instanceof Error ? c(m) : ma(m) ? c(Wt(ie.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: m
      })) : (i && s.enterCallbacks[r] === i && typeof m == "function" && i.push(m), l());
    }, a = o(() => e.call(s && s.instances[r], t, n, d));
    let p = Promise.resolve(a);
    e.length < 3 && (p = p.then(d)), p.catch((m) => c(m));
  });
}
function gs(e, t, n, s, r = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const l in i.components) {
      let c = i.components[l];
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (si(c)) {
          const d = (c.__vccOpts || c)[t];
          d && o.push(pt(d, n, s, i, l, r));
        } else {
          let d = c();
          o.push(() => d.then((a) => {
            if (!a) throw new Error(`Couldn't resolve component "${l}" at "${i.path}"`);
            const p = Bc(a) ? a.default : a;
            i.mods[l] = a, i.components[l] = p;
            const m = (p.__vccOpts || p)[t];
            return m && pt(m, n, s, i, l, r)();
          }));
        }
    }
  return o;
}
function Ea(e, t) {
  const n = [], s = [], r = [], o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((d) => qt(d, l)) ? s.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((d) => qt(d, c)) || r.push(c));
  }
  return [
    n,
    s,
    r
  ];
}
/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Sa = () => location.protocol + "//" + location.host;
function di(e, t) {
  const { pathname: n, search: s, hash: r } = t, o = e.indexOf("#");
  if (o > -1) {
    let i = r.includes(e.slice(o)) ? e.slice(o).length : 1, l = r.slice(i);
    return l[0] !== "/" && (l = "/" + l), Mr(l, "");
  }
  return Mr(n, e) + s + r;
}
function Ca(e, t, n, s) {
  let r = [], o = [], i = null;
  const l = ({ state: m }) => {
    const g = di(e, location), I = n.value, O = t.value;
    let B = 0;
    if (m) {
      if (n.value = g, t.value = m, i && i === I) {
        i = null;
        return;
      }
      B = O ? m.position - O.position : 0;
    } else s(g);
    r.forEach(($) => {
      $(n.value, I, {
        delta: B,
        type: Os.pop,
        direction: B ? B > 0 ? ms.forward : ms.back : ms.unknown
      });
    });
  };
  function c() {
    i = n.value;
  }
  function d(m) {
    r.push(m);
    const g = () => {
      const I = r.indexOf(m);
      I > -1 && r.splice(I, 1);
    };
    return o.push(g), g;
  }
  function a() {
    if (document.visibilityState === "hidden") {
      const { history: m } = window;
      if (!m.state) return;
      m.replaceState(W({}, m.state, { scroll: Jn() }), "");
    }
  }
  function p() {
    for (const m of o) m();
    o = [], window.removeEventListener("popstate", l), window.removeEventListener("pagehide", a), document.removeEventListener("visibilitychange", a);
  }
  return window.addEventListener("popstate", l), window.addEventListener("pagehide", a), document.addEventListener("visibilitychange", a), {
    pauseListeners: c,
    listen: d,
    destroy: p
  };
}
function Hr(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? Jn() : null
  };
}
function Aa(e) {
  const { history: t, location: n } = window, s = { value: di(e, n) }, r = { value: t.state };
  r.value || o(s.value, {
    back: null,
    current: s.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function o(c, d, a) {
    const p = e.indexOf("#"), m = p > -1 ? (n.host && document.querySelector("base") ? e : e.slice(p)) + c : Sa() + e + c;
    try {
      t[a ? "replaceState" : "pushState"](d, "", m), r.value = d;
    } catch (g) {
      console.error(g), n[a ? "replace" : "assign"](m);
    }
  }
  function i(c, d) {
    o(c, W({}, t.state, Hr(r.value.back, c, r.value.forward, !0), d, { position: r.value.position }), !0), s.value = c;
  }
  function l(c, d) {
    const a = W({}, r.value, t.state, {
      forward: c,
      scroll: Jn()
    });
    o(a.current, a, !0), o(c, W({}, Hr(s.value, c, null), { position: a.position + 1 }, d), !1), s.value = c;
  }
  return {
    location: s,
    state: r,
    push: l,
    replace: i
  };
}
function Ra(e) {
  e = ca(e);
  const t = Aa(e), n = Ca(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = W({
    location: "",
    base: e,
    go: s,
    createHref: ua.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function wa(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Ra(e);
}
let wt = /* @__PURE__ */ (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
})({});
var ce = /* @__PURE__ */ (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
})(ce || {});
const Pa = {
  type: wt.Static,
  value: ""
}, Ia = /[a-zA-Z0-9_]/;
function Ta(e) {
  if (!e) return [[]];
  if (e === "/") return [[Pa]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${d}": ${g}`);
  }
  let n = ce.Static, s = n;
  const r = [];
  let o;
  function i() {
    o && r.push(o), o = [];
  }
  let l = 0, c, d = "", a = "";
  function p() {
    d && (n === ce.Static ? o.push({
      type: wt.Static,
      value: d
    }) : n === ce.Param || n === ce.ParamRegExp || n === ce.ParamRegExpEnd ? (o.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`), o.push({
      type: wt.Param,
      value: d,
      regexp: a,
      repeatable: c === "*" || c === "+",
      optional: c === "*" || c === "?"
    })) : t("Invalid state to consume buffer"), d = "");
  }
  function m() {
    d += c;
  }
  for (; l < e.length; ) {
    if (c = e[l++], c === "\\" && n !== ce.ParamRegExp) {
      s = n, n = ce.EscapeNext;
      continue;
    }
    switch (n) {
      case ce.Static:
        c === "/" ? (d && p(), i()) : c === ":" ? (p(), n = ce.Param) : m();
        break;
      case ce.EscapeNext:
        m(), n = s;
        break;
      case ce.Param:
        c === "(" ? n = ce.ParamRegExp : Ia.test(c) ? m() : (p(), n = ce.Static, c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case ce.ParamRegExp:
        c === ")" ? a[a.length - 1] == "\\" ? a = a.slice(0, -1) + c : n = ce.ParamRegExpEnd : a += c;
        break;
      case ce.ParamRegExpEnd:
        p(), n = ce.Static, c !== "*" && c !== "?" && c !== "+" && l--, a = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === ce.ParamRegExp && t(`Unfinished custom RegExp for param "${d}"`), p(), i(), r;
}
const Ur = "[^/]+?", Oa = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var ye = /* @__PURE__ */ (function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
})(ye || {});
const Na = /[.+*?^${}()[\]/\\]/g;
function xa(e, t) {
  const n = W({}, Oa, t), s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const d of e) {
    const a = d.length ? [] : [ye.Root];
    n.strict && !d.length && (r += "/");
    for (let p = 0; p < d.length; p++) {
      const m = d[p];
      let g = ye.Segment + (n.sensitive ? ye.BonusCaseSensitive : 0);
      if (m.type === wt.Static)
        p || (r += "/"), r += m.value.replace(Na, "\\$&"), g += ye.Static;
      else if (m.type === wt.Param) {
        const { value: I, repeatable: O, optional: B, regexp: $ } = m;
        o.push({
          name: I,
          repeatable: O,
          optional: B
        });
        const N = $ || Ur;
        if (N !== Ur) {
          g += ye.BonusCustomRegExp;
          try {
            `${N}`;
          } catch (x) {
            throw new Error(`Invalid custom RegExp for param "${I}" (${N}): ` + x.message);
          }
        }
        let L = O ? `((?:${N})(?:/(?:${N}))*)` : `(${N})`;
        p || (L = B && d.length < 2 ? `(?:/${L})` : "/" + L), B && (L += "?"), r += L, g += ye.Dynamic, B && (g += ye.BonusOptional), O && (g += ye.BonusRepeatable), N === ".*" && (g += ye.BonusWildcard);
      }
      a.push(g);
    }
    s.push(a);
  }
  if (n.strict && n.end) {
    const d = s.length - 1;
    s[d][s[d].length - 1] += ye.BonusStrict;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && !r.endsWith("/") && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function l(d) {
    const a = d.match(i), p = {};
    if (!a) return null;
    for (let m = 1; m < a.length; m++) {
      const g = a[m] || "", I = o[m - 1];
      p[I.name] = g && I.repeatable ? g.split("/") : g;
    }
    return p;
  }
  function c(d) {
    let a = "", p = !1;
    for (const m of e) {
      (!p || !a.endsWith("/")) && (a += "/"), p = !1;
      for (const g of m) if (g.type === wt.Static) a += g.value;
      else if (g.type === wt.Param) {
        const { value: I, repeatable: O, optional: B } = g, $ = I in d ? d[I] : "";
        if (Fe($) && !O) throw new Error(`Provided param "${I}" is an array but it is not repeatable (* or + modifiers)`);
        const N = Fe($) ? $.join("/") : $;
        if (!N) if (B)
          m.length < 2 && (a.endsWith("/") ? a = a.slice(0, -1) : p = !0);
        else throw new Error(`Missing required param "${I}"`);
        a += N;
      }
    }
    return a || "/";
  }
  return {
    re: i,
    score: s,
    keys: o,
    parse: l,
    stringify: c
  };
}
function $a(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === ye.Static + ye.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === ye.Static + ye.Segment ? 1 : -1 : 0;
}
function pi(e, t) {
  let n = 0;
  const s = e.score, r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = $a(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (Vr(s)) return 1;
    if (Vr(r)) return -1;
  }
  return r.length - s.length;
}
function Vr(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Ma = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function Da(e, t, n) {
  const s = xa(Ta(e.path), n), r = W(s, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function La(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = $r(Ma, t);
  function r(p) {
    return s.get(p);
  }
  function o(p, m, g) {
    const I = !g, O = jr(p);
    O.aliasOf = g && g.record;
    const B = $r(t, p), $ = [O];
    if ("alias" in p) {
      const x = typeof p.alias == "string" ? [p.alias] : p.alias;
      for (const X of x) $.push(jr(W({}, O, {
        components: g ? g.record.components : O.components,
        path: X,
        aliasOf: g ? g.record : O
      })));
    }
    let N, L;
    for (const x of $) {
      const { path: X } = x;
      if (m && X[0] !== "/") {
        const ue = m.record.path, re = ue[ue.length - 1] === "/" ? "" : "/";
        x.path = m.record.path + (X && re + X);
      }
      if (N = Da(x, m, B), g ? g.alias.push(N) : (L = L || N, L !== N && L.alias.push(N), I && p.name && !Gr(N) && i(p.name)), hi(N) && c(N), O.children) {
        const ue = O.children;
        for (let re = 0; re < ue.length; re++) o(ue[re], N, g && g.children[re]);
      }
      g = g || N;
    }
    return L ? () => {
      i(L);
    } : un;
  }
  function i(p) {
    if (ui(p)) {
      const m = s.get(p);
      m && (s.delete(p), n.splice(n.indexOf(m), 1), m.children.forEach(i), m.alias.forEach(i));
    } else {
      const m = n.indexOf(p);
      m > -1 && (n.splice(m, 1), p.record.name && s.delete(p.record.name), p.children.forEach(i), p.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(p) {
    const m = Ha(p, n);
    n.splice(m, 0, p), p.record.name && !Gr(p) && s.set(p.record.name, p);
  }
  function d(p, m) {
    let g, I = {}, O, B;
    if ("name" in p && p.name) {
      if (g = s.get(p.name), !g) throw Wt(ie.MATCHER_NOT_FOUND, { location: p });
      B = g.record.name, I = W(Br(m.params, g.keys.filter((L) => !L.optional).concat(g.parent ? g.parent.keys.filter((L) => L.optional) : []).map((L) => L.name)), p.params && Br(p.params, g.keys.map((L) => L.name))), O = g.stringify(I);
    } else if (p.path != null)
      O = p.path, g = n.find((L) => L.re.test(O)), g && (I = g.parse(O), B = g.record.name);
    else {
      if (g = m.name ? s.get(m.name) : n.find((L) => L.re.test(m.path)), !g) throw Wt(ie.MATCHER_NOT_FOUND, {
        location: p,
        currentLocation: m
      });
      B = g.record.name, I = W({}, m.params, p.params), O = g.stringify(I);
    }
    const $ = [];
    let N = g;
    for (; N; )
      $.unshift(N.record), N = N.parent;
    return {
      name: B,
      path: O,
      params: I,
      matched: $,
      meta: ka($)
    };
  }
  e.forEach((p) => o(p));
  function a() {
    n.length = 0, s.clear();
  }
  return {
    addRoute: o,
    resolve: d,
    removeRoute: i,
    clearRoutes: a,
    getRoutes: l,
    getRecordMatcher: r
  };
}
function Br(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function jr(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Fa(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function Fa(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function Gr(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function ka(e) {
  return e.reduce((t, n) => W(t, n.meta), {});
}
function Ha(e, t) {
  let n = 0, s = t.length;
  for (; n !== s; ) {
    const o = n + s >> 1;
    pi(e, t[o]) < 0 ? s = o : n = o + 1;
  }
  const r = Ua(e);
  return r && (s = t.lastIndexOf(r, s - 1)), s;
}
function Ua(e) {
  let t = e;
  for (; t = t.parent; ) if (hi(t) && pi(e, t) === 0) return t;
}
function hi({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function Kr(e) {
  const t = Le(Xn), n = Le(Xs), s = me(() => {
    const c = Vt(e.to);
    return t.resolve(c);
  }), r = me(() => {
    const { matched: c } = s.value, { length: d } = c, a = c[d - 1], p = n.matched;
    if (!a || !p.length) return -1;
    const m = p.findIndex(qt.bind(null, a));
    if (m > -1) return m;
    const g = qr(c[d - 2]);
    return d > 1 && qr(a) === g && p[p.length - 1].path !== g ? p.findIndex(qt.bind(null, c[d - 2])) : m;
  }), o = me(() => r.value > -1 && Ka(n.params, s.value.params)), i = me(() => r.value > -1 && r.value === n.matched.length - 1 && ai(n.params, s.value.params));
  function l(c = {}) {
    if (Ga(c)) {
      const d = t[Vt(e.replace) ? "replace" : "push"](Vt(e.to)).catch(un);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => d), d;
    }
    return Promise.resolve();
  }
  return {
    route: s,
    href: me(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l
  };
}
function Va(e) {
  return e.length === 1 ? e[0] : e;
}
const Ba = /* @__PURE__ */ To({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink: Kr,
  setup(e, { slots: t }) {
    const n = _n(Kr(e)), { options: s } = Le(Xn), r = me(() => ({
      [Wr(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      [Wr(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const o = t.default && Va(t.default(n));
      return e.custom ? o : ti("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: r.value
      }, o);
    };
  }
}), ja = Ba;
function Ga(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Ka(e, t) {
  for (const n in t) {
    const s = t[n], r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1;
    } else if (!Fe(r) || r.length !== s.length || s.some((o, i) => o !== r[i])) return !1;
  }
  return !0;
}
function qr(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Wr = (e, t, n) => e ?? t ?? n, qa = /* @__PURE__ */ To({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    const s = Le(xs), r = me(() => e.route || s.value), o = Le(kr, 0), i = me(() => {
      let d = Vt(o);
      const { matched: a } = r.value;
      let p;
      for (; (p = a[d]) && !p.components; ) d++;
      return d;
    }), l = me(() => r.value.matched[i.value]);
    wn(kr, me(() => i.value + 1)), wn(ba, l), wn(xs, r);
    const c = Re();
    return Gt(() => [
      c.value,
      l.value,
      e.name
    ], ([d, a, p], [m, g, I]) => {
      a && (a.instances[p] = d, g && g !== a && d && d === m && (a.leaveGuards.size || (a.leaveGuards = g.leaveGuards), a.updateGuards.size || (a.updateGuards = g.updateGuards))), d && a && (!g || !qt(a, g) || !m) && (a.enterCallbacks[p] || []).forEach((O) => O(d));
    }, { flush: "post" }), () => {
      const d = r.value, a = e.name, p = l.value, m = p && p.components[a];
      if (!m) return Qr(n.default, {
        Component: m,
        route: d
      });
      const g = p.props[a], I = g ? g === !0 ? d.params : typeof g == "function" ? g(d) : g : null, B = ti(m, W({}, I, t, {
        onVnodeUnmounted: ($) => {
          $.component.isUnmounted && (p.instances[a] = null);
        },
        ref: c
      }));
      return Qr(n.default, {
        Component: B,
        route: d
      }) || B;
    };
  }
});
function Qr(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Wa = qa;
function Qa(e) {
  const t = La(e.routes, e), n = e.parseQuery || va, s = e.stringifyQuery || Fr, r = e.history, o = Xt(), i = Xt(), l = Xt(), c = zi(ut);
  let d = ut;
  Ft && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const a = ps.bind(null, (y) => "" + y), p = ps.bind(null, ta), m = ps.bind(null, gn);
  function g(y, T) {
    let w, M;
    return ui(y) ? (w = t.getRecordMatcher(y), M = T) : M = y, t.addRoute(M, w);
  }
  function I(y) {
    const T = t.getRecordMatcher(y);
    T && t.removeRoute(T);
  }
  function O() {
    return t.getRoutes().map((y) => y.record);
  }
  function B(y) {
    return !!t.getRecordMatcher(y);
  }
  function $(y, T) {
    if (T = W({}, T || c.value), typeof y == "string") {
      const h = hs(n, y, T.path), v = t.resolve({ path: h.path }, T), E = r.createHref(h.fullPath);
      return W(h, v, {
        params: m(v.params),
        hash: gn(h.hash),
        redirectedFrom: void 0,
        href: E
      });
    }
    let w;
    if (y.path != null)
      w = W({}, y, { path: hs(n, y.path, T.path).path });
    else {
      const h = W({}, y.params);
      for (const v in h) h[v] == null && delete h[v];
      w = W({}, y, { params: p(h) }), T.params = p(T.params);
    }
    const M = t.resolve(w, T), G = y.hash || "";
    M.params = a(m(M.params));
    const u = ra(s, W({}, y, {
      hash: Xc(G),
      path: M.path
    })), f = r.createHref(u);
    return W({
      fullPath: u,
      hash: G,
      query: s === Fr ? ya(y.query) : y.query || {}
    }, M, {
      redirectedFrom: void 0,
      href: f
    });
  }
  function N(y) {
    return typeof y == "string" ? hs(n, y, c.value.path) : W({}, y);
  }
  function L(y, T) {
    if (d !== y) return Wt(ie.NAVIGATION_CANCELLED, {
      from: T,
      to: y
    });
  }
  function x(y) {
    return re(y);
  }
  function X(y) {
    return x(W(N(y), { replace: !0 }));
  }
  function ue(y, T) {
    const w = y.matched[y.matched.length - 1];
    if (w && w.redirect) {
      const { redirect: M } = w;
      let G = typeof M == "function" ? M(y, T) : M;
      return typeof G == "string" && (G = G.includes("?") || G.includes("#") ? G = N(G) : { path: G }, G.params = {}), W({
        query: y.query,
        hash: y.hash,
        params: G.path != null ? {} : y.params
      }, G);
    }
  }
  function re(y, T) {
    const w = d = $(y), M = c.value, G = y.state, u = y.force, f = y.replace === !0, h = ue(w, M);
    if (h) return re(W(N(h), {
      state: typeof h == "object" ? W({}, G, h.state) : G,
      force: u,
      replace: f
    }), T || w);
    const v = w;
    v.redirectedFrom = T;
    let E;
    return !u && oa(s, M, w) && (E = Wt(ie.NAVIGATION_DUPLICATED, {
      to: v,
      from: M
    }), Be(M, M, !0, !1)), (E ? Promise.resolve(E) : Ue(v, M)).catch((_) => et(_) ? et(_, ie.NAVIGATION_GUARD_REDIRECT) ? _ : at(_) : q(_, v, M)).then((_) => {
      if (_) {
        if (et(_, ie.NAVIGATION_GUARD_REDIRECT))
          return re(W({ replace: f }, N(_.to), {
            state: typeof _.to == "object" ? W({}, G, _.to.state) : G,
            force: u
          }), T || v);
      } else _ = Et(v, M, !0, f, G);
      return ct(v, M, _), _;
    });
  }
  function He(y, T) {
    const w = L(y, T);
    return w ? Promise.reject(w) : Promise.resolve();
  }
  function lt(y) {
    const T = xt.values().next().value;
    return T && typeof T.runWithContext == "function" ? T.runWithContext(y) : y();
  }
  function Ue(y, T) {
    let w;
    const [M, G, u] = Ea(y, T);
    w = gs(M.reverse(), "beforeRouteLeave", y, T);
    for (const h of M) h.leaveGuards.forEach((v) => {
      w.push(pt(v, y, T));
    });
    const f = He.bind(null, y, T);
    return w.push(f), xe(w).then(() => {
      w = [];
      for (const h of o.list()) w.push(pt(h, y, T));
      return w.push(f), xe(w);
    }).then(() => {
      w = gs(G, "beforeRouteUpdate", y, T);
      for (const h of G) h.updateGuards.forEach((v) => {
        w.push(pt(v, y, T));
      });
      return w.push(f), xe(w);
    }).then(() => {
      w = [];
      for (const h of u) if (h.beforeEnter) if (Fe(h.beforeEnter)) for (const v of h.beforeEnter) w.push(pt(v, y, T));
      else w.push(pt(h.beforeEnter, y, T));
      return w.push(f), xe(w);
    }).then(() => (y.matched.forEach((h) => h.enterCallbacks = {}), w = gs(u, "beforeRouteEnter", y, T, lt), w.push(f), xe(w))).then(() => {
      w = [];
      for (const h of i.list()) w.push(pt(h, y, T));
      return w.push(f), xe(w);
    }).catch((h) => et(h, ie.NAVIGATION_CANCELLED) ? h : Promise.reject(h));
  }
  function ct(y, T, w) {
    l.list().forEach((M) => lt(() => M(y, T, w)));
  }
  function Et(y, T, w, M, G) {
    const u = L(y, T);
    if (u) return u;
    const f = T === ut, h = Ft ? history.state : {};
    w && (M || f ? r.replace(y.fullPath, W({ scroll: f && h && h.scroll }, G)) : r.push(y.fullPath, G)), c.value = y, Be(y, T, w, f), at();
  }
  let Ve;
  function Qt() {
    Ve || (Ve = r.listen((y, T, w) => {
      if (!St.listening) return;
      const M = $(y), G = ue(M, St.currentRoute.value);
      if (G) {
        re(W(G, {
          replace: !0,
          force: !0
        }), M).catch(un);
        return;
      }
      d = M;
      const u = c.value;
      Ft && pa(Lr(u.fullPath, w.delta), Jn()), Ue(M, u).catch((f) => et(f, ie.NAVIGATION_ABORTED | ie.NAVIGATION_CANCELLED) ? f : et(f, ie.NAVIGATION_GUARD_REDIRECT) ? (re(W(N(f.to), { force: !0 }), M).then((h) => {
        et(h, ie.NAVIGATION_ABORTED | ie.NAVIGATION_DUPLICATED) && !w.delta && w.type === Os.pop && r.go(-1, !1);
      }).catch(un), Promise.reject()) : (w.delta && r.go(-w.delta, !1), q(f, M, u))).then((f) => {
        f = f || Et(M, u, !1), f && (w.delta && !et(f, ie.NAVIGATION_CANCELLED) ? r.go(-w.delta, !1) : w.type === Os.pop && et(f, ie.NAVIGATION_ABORTED | ie.NAVIGATION_DUPLICATED) && r.go(-1, !1)), ct(M, u, f);
      }).catch(un);
    }));
  }
  let Ot = Xt(), ae = Xt(), J;
  function q(y, T, w) {
    at(y);
    const M = ae.list();
    return M.length ? M.forEach((G) => G(y, T, w)) : console.error(y), Promise.reject(y);
  }
  function Xe() {
    return J && c.value !== ut ? Promise.resolve() : new Promise((y, T) => {
      Ot.add([y, T]);
    });
  }
  function at(y) {
    return J || (J = !y, Qt(), Ot.list().forEach(([T, w]) => y ? w(y) : T()), Ot.reset()), y;
  }
  function Be(y, T, w, M) {
    const { scrollBehavior: G } = e;
    if (!Ft || !G) return Promise.resolve();
    const u = !w && ha(Lr(y.fullPath, 0)) || (M || !w) && history.state && history.state.scroll || null;
    return Ao().then(() => G(y, T, u)).then((f) => f && da(f)).catch((f) => q(f, y, T));
  }
  const Ee = (y) => r.go(y);
  let Nt;
  const xt = /* @__PURE__ */ new Set(), St = {
    currentRoute: c,
    listening: !0,
    addRoute: g,
    removeRoute: I,
    clearRoutes: t.clearRoutes,
    hasRoute: B,
    getRoutes: O,
    resolve: $,
    options: e,
    push: x,
    replace: X,
    go: Ee,
    back: () => Ee(-1),
    forward: () => Ee(1),
    beforeEach: o.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: ae.add,
    isReady: Xe,
    install(y) {
      y.component("RouterLink", ja), y.component("RouterView", Wa), y.config.globalProperties.$router = St, Object.defineProperty(y.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Vt(c)
      }), Ft && !Nt && c.value === ut && (Nt = !0, x(r.location).catch((M) => {
      }));
      const T = {};
      for (const M in ut) Object.defineProperty(T, M, {
        get: () => c.value[M],
        enumerable: !0
      });
      y.provide(Xn, St), y.provide(Xs, bo(T)), y.provide(xs, c);
      const w = y.unmount;
      xt.add(y), y.unmount = function() {
        xt.delete(y), xt.size < 1 && (d = ut, Ve && Ve(), Ve = null, c.value = ut, Nt = !1, J = !1), w();
      };
    }
  };
  function xe(y) {
    return y.reduce((T, w) => T.then(() => lt(w)), Promise.resolve());
  }
  return St;
}
function bn() {
  return Le(Xn);
}
function mi(e) {
  return Le(Xs);
}
const Ne = _n({
  items: [],
  total: 0
});
function Ya() {
  const e = localStorage.getItem("frappe_site_cart");
  if (e)
    try {
      const t = JSON.parse(e);
      Ne.items = t.items || [], Zn();
    } catch (t) {
      console.error("Error loading cart:", t);
    }
}
function Zs() {
  localStorage.setItem(
    "frappe_site_cart",
    JSON.stringify({
      items: Ne.items
    })
  );
}
function Zn() {
  Ne.total = Ne.items.reduce((e, t) => e + t.price * t.quantity, 0);
}
function za(e, t = 1) {
  const n = Ne.items.find((s) => s.id === e.name);
  n ? n.quantity += t : Ne.items.push({
    id: e.name,
    name: e.item_name || e.name,
    price: e.price || 0,
    image: e.image || "",
    quantity: t
  }), Zn(), Zs();
}
function gi(e) {
  const t = Ne.items.findIndex((n) => n.id === e);
  t > -1 && (Ne.items.splice(t, 1), Zn(), Zs());
}
function Ja(e, t) {
  const n = Ne.items.find((s) => s.id === e);
  n && (t <= 0 ? gi(e) : (n.quantity = t, Zn(), Zs()));
}
function Xa() {
  Ne.items = [], Ne.total = 0, localStorage.removeItem("frappe_site_cart");
}
function Za() {
  return Ne.items.reduce((e, t) => e + t.quantity, 0);
}
Ya();
const Ye = {
  state: Ne,
  addToCart: za,
  removeFromCart: gi,
  updateQuantity: Ja,
  clearCart: Xa,
  getCartCount: Za
}, eu = {
  name: "Navbar",
  setup() {
    const e = me(() => Ye.getCartCount());
    return {
      brandName: "Sweets",
      menuItems: [
        { id: 1, label: "Home", url: "/" },
        { id: 2, label: "Products", url: "/products" },
        { id: 3, label: "About", url: "/about" },
        { id: 4, label: "Contact", url: "/contact" }
      ],
      cartCount: e
    };
  }
}, ke = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, tu = { class: "navbar" }, nu = { class: "navbar-container" }, su = { class: "navbar-brand" }, ru = { class: "navbar-menu" }, ou = { class: "cart-icon" }, iu = {
  key: 0,
  class: "cart-badge"
};
function lu(e, t, n, s, r, o) {
  const i = Oe("router-link");
  return V(), j("nav", tu, [
    b("div", nu, [
      b("div", su, [
        ne(i, { to: "/" }, {
          default: sn(() => [
            an(oe(e.brandName), 1)
          ]),
          _: 1
        })
      ]),
      b("ul", ru, [
        (V(!0), j(de, null, vt(e.menuItems, (l) => (V(), j("li", {
          key: l.id
        }, [
          ne(i, {
            to: l.url
          }, {
            default: sn(() => [
              an(oe(l.label), 1)
            ]),
            _: 2
          }, 1032, ["to"])
        ]))), 128)),
        b("li", ou, [
          ne(i, { to: "/cart" }, {
            default: sn(() => [
              t[0] || (t[0] = an(" 🛒 ", -1)),
              e.cartCount > 0 ? (V(), j("span", iu, oe(e.cartCount), 1)) : Dt("", !0)
            ]),
            _: 1
          })
        ])
      ])
    ])
  ]);
}
const En = /* @__PURE__ */ ke(eu, [["render", lu], ["__scopeId", "data-v-815f9944"]]), cu = {
  name: "Slideshow",
  data() {
    return {
      slides: [],
      currentSlide: 0,
      autoSlideInterval: null
    };
  },
  mounted() {
    this.loadSlideshow();
  },
  beforeUnmount() {
    this.autoSlideInterval && clearInterval(this.autoSlideInterval);
  },
  methods: {
    async loadSlideshow() {
      try {
        frappe.call({
          method: window.API_MAP?.SLIDESHOW?.GET_SLIDESHOW || "frappe_site.api.slideshow.get_slideshow.get_active_slideshow",
          callback: (e) => {
            e && e.message && (this.slides = e.message.slides || [], this.slides.length > 0 && this.startAutoSlide());
          }
        });
      } catch (e) {
        console.error("Error loading slideshow:", e);
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    },
    goToSlide(e) {
      this.currentSlide = e;
    },
    startAutoSlide() {
      this.autoSlideInterval && clearInterval(this.autoSlideInterval), this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5e3);
    }
  }
}, au = {
  key: 0,
  class: "slideshow-container"
}, uu = { class: "slideshow-wrapper" }, fu = ["src", "alt"], du = {
  key: 0,
  class: "slide-content"
}, pu = { key: 0 }, hu = { key: 1 }, mu = ["href"], gu = { class: "slide-indicators" }, _u = ["onClick"];
function vu(e, t, n, s, r, o) {
  return e.slides.length > 0 ? (V(), j("div", au, [
    b("div", uu, [
      (V(!0), j(de, null, vt(e.slides, (i, l) => (V(), j("div", {
        key: i.id,
        class: It(["slide", { active: l === e.currentSlide }])
      }, [
        b("img", {
          src: i.image,
          alt: i.heading
        }, null, 8, fu),
        i.heading || i.description ? (V(), j("div", du, [
          i.heading ? (V(), j("h2", pu, oe(i.heading), 1)) : Dt("", !0),
          i.description ? (V(), j("p", hu, oe(i.description), 1)) : Dt("", !0),
          i.url ? (V(), j("a", {
            key: 2,
            href: i.url,
            class: "slide-link"
          }, "Shop Now", 8, mu)) : Dt("", !0)
        ])) : Dt("", !0)
      ], 2))), 128))
    ]),
    b("button", {
      class: "slide-prev",
      onClick: t[0] || (t[0] = (...i) => e.prevSlide && e.prevSlide(...i))
    }, "‹"),
    b("button", {
      class: "slide-next",
      onClick: t[1] || (t[1] = (...i) => e.nextSlide && e.nextSlide(...i))
    }, "›"),
    b("div", gu, [
      (V(!0), j(de, null, vt(e.slides, (i, l) => (V(), j("span", {
        key: i.id,
        class: It(["indicator", { active: l === e.currentSlide }]),
        onClick: (c) => e.goToSlide(l)
      }, null, 10, _u))), 128))
    ])
  ])) : Dt("", !0);
}
const yu = /* @__PURE__ */ ke(cu, [["render", vu]]);
function es(e, t = "product") {
  return e ? e.startsWith("http://") || e.startsWith("https://") || e.startsWith("/") ? e : `/${e}` : _i(t);
}
function _i(e) {
  const r = `
    <svg width="${e === "category" ? 200 : 400}" height="${e === "category" ? 150 : 400}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#999" text-anchor="middle" dominant-baseline="middle">${e === "category" ? "Category" : "Product"}</text>
    </svg>
  `.trim().replace(/\s+/g, " ");
  return `data:image/svg+xml;base64,${btoa(r)}`;
}
function ts(e) {
  const t = e.target.dataset.type || "product";
  e.target.src = _i(t);
}
const bu = {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = bn();
    function n() {
      t.push({
        name: "ProductDetail",
        params: { id: e.product.name }
      });
    }
    function s() {
      Ye.addToCart(e.product, 1), console.log("Added to cart:", e.product.item_name);
    }
    function r(o) {
      return o ? `Rs. ${o.toLocaleString()}` : "Price on request";
    }
    return {
      goToDetail: n,
      addToCart: s,
      formatPrice: r,
      getImageUrl: es,
      handleImageError: ts
    };
  }
}, Eu = { class: "product-image" }, Su = ["src", "alt"], Cu = { class: "product-info" }, Au = { class: "product-name" }, Ru = { class: "product-price" };
function wu(e, t, n, s, r, o) {
  return V(), j("div", {
    class: "product-card",
    onClick: t[2] || (t[2] = (...i) => e.goToDetail && e.goToDetail(...i))
  }, [
    b("div", Eu, [
      b("img", {
        src: e.getImageUrl(e.product.image),
        alt: e.product.name,
        onError: t[0] || (t[0] = (...i) => e.handleImageError && e.handleImageError(...i))
      }, null, 40, Su),
      b("button", {
        class: "add-to-cart-btn",
        onClick: t[1] || (t[1] = kn((...i) => e.addToCart && e.addToCart(...i), ["stop"]))
      }, "Add to Cart")
    ]),
    b("div", Cu, [
      b("h3", Au, oe(e.product.item_name || e.product.name), 1),
      b("p", Ru, oe(e.formatPrice(e.product.price)), 1)
    ])
  ]);
}
const Pu = /* @__PURE__ */ ke(bu, [["render", wu], ["__scopeId", "data-v-2a6f8f20"]]), Iu = {
  name: "ProductList",
  components: {
    ProductCard: Pu
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: !1
    }
  }
}, Tu = { class: "product-list" }, Ou = {
  key: 0,
  class: "loading"
}, Nu = {
  key: 1,
  class: "no-products"
}, xu = {
  key: 2,
  class: "products-grid"
};
function $u(e, t, n, s, r, o) {
  const i = Oe("ProductCard");
  return V(), j("div", Tu, [
    e.loading ? (V(), j("div", Ou, "Loading products...")) : e.products.length === 0 ? (V(), j("div", Nu, "No products found")) : (V(), j("div", xu, [
      (V(!0), j(de, null, vt(e.products, (l) => (V(), Ys(i, {
        key: l.name,
        product: l
      }, null, 8, ["product"]))), 128))
    ]))
  ]);
}
const vi = /* @__PURE__ */ ke(Iu, [["render", $u], ["__scopeId", "data-v-6dc492a5"]]), Mu = {
  name: "Home",
  components: {
    Navbar: En,
    Slideshow: yu,
    ProductList: vi
  },
  setup() {
    const e = bn(), t = Re([]), n = Re([]), s = Re(!0);
    function r() {
      frappe.call({
        method: window.API_MAP?.ITEM_GROUP?.GET_MANY_ITEM_GROUPS || "frappe_site.api.item_group.get_many_item_groups.get_many_item_groups",
        args: {
          filters: {},
          limit: 8
        },
        callback: (l) => {
          l && l.message && (t.value = l.message || []);
        }
      });
    }
    function o() {
      s.value = !0, frappe.call({
        method: window.API_MAP?.ITEM?.GET_MANY_ITEMS || "frappe_site.api.item.get_many_items.get_many_items",
        args: {
          filters: {},
          limit: 8,
          order_by: "creation desc"
        },
        callback: (l) => {
          s.value = !1, l && l.message && (n.value = l.message || []);
        }
      });
    }
    function i(l) {
      e.push({
        name: "Products",
        query: { category: l }
      });
    }
    return Wn(() => {
      r(), o();
    }), {
      categories: t,
      featuredProducts: n,
      loadingProducts: s,
      goToProducts: i,
      getImageUrl: es,
      handleImageError: ts
    };
  }
}, Du = { class: "frappe-site-home" }, Lu = { class: "main-content" }, Fu = { class: "categories-section" }, ku = { class: "container" }, Hu = {
  key: 0,
  class: "categories-grid"
}, Uu = ["onClick"], Vu = { class: "category-image" }, Bu = ["src", "alt"], ju = {
  key: 1,
  class: "loading"
}, Gu = { class: "featured-products-section" }, Ku = { class: "container" };
function qu(e, t, n, s, r, o) {
  const i = Oe("Navbar"), l = Oe("Slideshow"), c = Oe("ProductList");
  return V(), j("div", Du, [
    ne(i),
    ne(l),
    b("main", Lu, [
      b("section", Fu, [
        b("div", ku, [
          t[1] || (t[1] = b("h2", { class: "section-title" }, "Our Categories", -1)),
          e.categories.length > 0 ? (V(), j("div", Hu, [
            (V(!0), j(de, null, vt(e.categories, (d) => (V(), j("div", {
              key: d.name,
              class: "category-card",
              onClick: (a) => e.goToProducts(d.name)
            }, [
              b("div", Vu, [
                b("img", {
                  src: e.getImageUrl(d.image, "category"),
                  alt: d.name,
                  "data-type": "category",
                  onError: t[0] || (t[0] = (...a) => e.handleImageError && e.handleImageError(...a))
                }, null, 40, Bu)
              ]),
              b("h3", null, oe(d.name), 1)
            ], 8, Uu))), 128))
          ])) : (V(), j("div", ju, "Loading categories..."))
        ])
      ]),
      b("section", Gu, [
        b("div", Ku, [
          t[2] || (t[2] = b("h2", { class: "section-title" }, "Featured Products", -1)),
          ne(c, {
            products: e.featuredProducts,
            loading: e.loadingProducts
          }, null, 8, ["products", "loading"])
        ])
      ])
    ])
  ]);
}
const Wu = /* @__PURE__ */ ke(Mu, [["render", qu]]), Qu = {
  name: "Products",
  components: {
    Navbar: En,
    ProductList: vi
  },
  setup() {
    const e = mi(), t = Re([]), n = Re([]), s = Re(!0), r = Re(""), o = Re(null);
    function i() {
      frappe.call({
        method: window.API_MAP?.ITEM_GROUP?.GET_MANY_ITEM_GROUPS || "frappe_site.api.item_group.get_many_item_groups.get_many_item_groups",
        args: {
          filters: {},
          limit: 50
        },
        callback: (a) => {
          a && a.message && (n.value = a.message || []);
        }
      });
    }
    function l() {
      s.value = !0;
      const a = {};
      o.value && (a.item_group = o.value), r.value && (a.item_name = ["like", `%${r.value}%`]), frappe.call({
        method: window.API_MAP?.ITEM?.GET_MANY_ITEMS || "frappe_site.api.item.get_many_items.get_many_items",
        args: {
          filters: a,
          limit: 50,
          order_by: "item_name asc"
        },
        callback: (p) => {
          s.value = !1, p && p.message && (t.value = p.message || []);
        }
      });
    }
    function c(a) {
      o.value = a, l();
    }
    function d() {
      l();
    }
    return Wn(() => {
      i(), e.query.category && (o.value = e.query.category), l();
    }), Gt(
      () => e.query.category,
      (a) => {
        a && (o.value = a, l());
      }
    ), {
      products: t,
      categories: n,
      loading: s,
      searchQuery: r,
      selectedCategory: o,
      selectCategory: c,
      handleSearch: d
    };
  }
}, Yu = { class: "products-page" }, zu = { class: "main-content" }, Ju = { class: "container" }, Xu = { class: "products-header" }, Zu = { class: "search-bar" }, ef = { class: "products-layout" }, tf = { class: "filters-sidebar" }, nf = { class: "category-list" }, sf = ["onClick"], rf = { class: "products-content" };
function of(e, t, n, s, r, o) {
  const i = Oe("Navbar"), l = Oe("ProductList");
  return V(), j("div", Yu, [
    ne(i),
    b("main", zu, [
      b("div", Ju, [
        b("div", Xu, [
          t[3] || (t[3] = b("h1", null, "Our Products", -1)),
          b("div", Zu, [
            ht(b("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (c) => e.searchQuery = c),
              type: "text",
              placeholder: "Search products...",
              onInput: t[1] || (t[1] = (...c) => e.handleSearch && e.handleSearch(...c))
            }, null, 544), [
              [mt, e.searchQuery]
            ])
          ])
        ]),
        b("div", ef, [
          b("aside", tf, [
            t[4] || (t[4] = b("h3", null, "Categories", -1)),
            b("ul", nf, [
              b("li", null, [
                b("a", {
                  href: "#",
                  class: It({ active: !e.selectedCategory }),
                  onClick: t[2] || (t[2] = kn((c) => e.selectCategory(null), ["prevent"]))
                }, " All Products ", 2)
              ]),
              (V(!0), j(de, null, vt(e.categories, (c) => (V(), j("li", {
                key: c.name
              }, [
                b("a", {
                  href: "#",
                  class: It({ active: e.selectedCategory === c.name }),
                  onClick: kn((d) => e.selectCategory(c.name), ["prevent"])
                }, oe(c.name), 11, sf)
              ]))), 128))
            ])
          ]),
          b("div", rf, [
            ne(l, {
              products: e.products,
              loading: e.loading
            }, null, 8, ["products", "loading"])
          ])
        ])
      ])
    ])
  ]);
}
const lf = /* @__PURE__ */ ke(Qu, [["render", of], ["__scopeId", "data-v-ba32f108"]]), cf = {
  name: "ProductDetail",
  components: {
    Navbar: En
  },
  setup() {
    const e = mi(), t = bn(), n = Re(null), s = Re(1);
    function r() {
      frappe.call({
        method: window.API_MAP?.ITEM?.GET_ITEM || "frappe_site.api.item.get_item.get_item",
        args: {
          item_code: e.params.id
        },
        callback: (d) => {
          d && d.message && (n.value = d.message);
        }
      });
    }
    function o() {
      s.value++;
    }
    function i() {
      s.value > 1 && s.value--;
    }
    function l() {
      n.value && (Ye.addToCart(n.value, s.value), t.push({ name: "ShoppingCart" }));
    }
    function c(d) {
      return d ? `Rs. ${d.toLocaleString()}` : "Price on request";
    }
    return Wn(() => {
      r();
    }), {
      product: n,
      quantity: s,
      increaseQuantity: o,
      decreaseQuantity: i,
      addToCart: l,
      formatPrice: c,
      getImageUrl: es,
      handleImageError: ts
    };
  }
}, af = { class: "product-detail-page" }, uf = { class: "main-content" }, ff = {
  key: 0,
  class: "container"
}, df = { class: "product-detail" }, pf = { class: "product-image-section" }, hf = ["src", "alt"], mf = { class: "product-info-section" }, gf = { class: "product-price" }, _f = { class: "product-description" }, vf = { class: "product-actions" }, yf = { class: "quantity-selector" }, bf = {
  key: 1,
  class: "loading"
};
function Ef(e, t, n, s, r, o) {
  const i = Oe("Navbar");
  return V(), j("div", af, [
    ne(i),
    b("main", uf, [
      e.product ? (V(), j("div", ff, [
        b("div", df, [
          b("div", pf, [
            b("img", {
              src: e.getImageUrl(e.product.image),
              alt: e.product.item_name,
              onError: t[0] || (t[0] = (...l) => e.handleImageError && e.handleImageError(...l))
            }, null, 40, hf)
          ]),
          b("div", mf, [
            b("h1", null, oe(e.product.item_name || e.product.name), 1),
            b("p", gf, oe(e.formatPrice(e.product.price)), 1),
            b("p", _f, oe(e.product.description || "No description available"), 1),
            b("div", vf, [
              b("div", yf, [
                b("button", {
                  onClick: t[1] || (t[1] = (...l) => e.decreaseQuantity && e.decreaseQuantity(...l))
                }, "-"),
                ht(b("input", {
                  "onUpdate:modelValue": t[2] || (t[2] = (l) => e.quantity = l),
                  type: "number",
                  min: "1"
                }, null, 512), [
                  [
                    mt,
                    e.quantity,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                b("button", {
                  onClick: t[3] || (t[3] = (...l) => e.increaseQuantity && e.increaseQuantity(...l))
                }, "+")
              ]),
              b("button", {
                class: "add-to-cart-btn-large",
                onClick: t[4] || (t[4] = (...l) => e.addToCart && e.addToCart(...l))
              }, "Add to Cart")
            ])
          ])
        ])
      ])) : (V(), j("div", bf, "Loading product..."))
    ])
  ]);
}
const Sf = /* @__PURE__ */ ke(cf, [["render", Ef], ["__scopeId", "data-v-28e5ad6d"]]), Cf = {
  name: "CartItem",
  props: {
    item: {
      type: Object,
      required: !0
    }
  },
  emits: ["update-quantity", "remove"],
  setup(e, { emit: t }) {
    const n = Re(e.item.quantity);
    Gt(
      () => e.item.quantity,
      (c) => {
        n.value = c;
      }
    );
    function s() {
      n.value++, o();
    }
    function r() {
      n.value > 1 && (n.value--, o());
    }
    function o() {
      t("update-quantity", e.item.id, n.value);
    }
    function i() {
      t("remove", e.item.id);
    }
    function l(c) {
      return c ? `Rs. ${c.toLocaleString()}` : "Rs. 0";
    }
    return {
      localQuantity: n,
      increaseQty: s,
      decreaseQty: r,
      updateQty: o,
      remove: i,
      formatPrice: l,
      getImageUrl: es,
      handleImageError: ts
    };
  }
}, Af = { class: "cart-item" }, Rf = ["src", "alt"], wf = { class: "item-info" }, Pf = { class: "item-price" }, If = { class: "item-quantity" }, Tf = { class: "item-total" };
function Of(e, t, n, s, r, o) {
  return V(), j("div", Af, [
    b("img", {
      src: e.getImageUrl(e.item.image),
      alt: e.item.name,
      onError: t[0] || (t[0] = (...i) => e.handleImageError && e.handleImageError(...i))
    }, null, 40, Rf),
    b("div", wf, [
      b("h3", null, oe(e.item.name), 1),
      b("p", Pf, oe(e.formatPrice(e.item.price)), 1)
    ]),
    b("div", If, [
      b("button", {
        onClick: t[1] || (t[1] = (...i) => e.decreaseQty && e.decreaseQty(...i))
      }, "-"),
      ht(b("input", {
        "onUpdate:modelValue": t[2] || (t[2] = (i) => e.localQuantity = i),
        type: "number",
        min: "1",
        onChange: t[3] || (t[3] = (...i) => e.updateQty && e.updateQty(...i))
      }, null, 544), [
        [
          mt,
          e.localQuantity,
          void 0,
          { number: !0 }
        ]
      ]),
      b("button", {
        onClick: t[4] || (t[4] = (...i) => e.increaseQty && e.increaseQty(...i))
      }, "+")
    ]),
    b("div", Tf, oe(e.formatPrice(e.item.price * e.item.quantity)), 1),
    b("button", {
      class: "remove-btn",
      onClick: t[5] || (t[5] = (...i) => e.remove && e.remove(...i))
    }, "×")
  ]);
}
const Nf = /* @__PURE__ */ ke(Cf, [["render", Of], ["__scopeId", "data-v-dd637c45"]]), xf = {
  name: "ShoppingCart",
  components: {
    Navbar: En,
    CartItem: Nf
  },
  setup() {
    const e = bn(), t = me(() => Ye.state.items), n = me(() => Ye.state.total);
    function s(l, c) {
      Ye.updateQuantity(l, c);
    }
    function r(l) {
      Ye.removeFromCart(l);
    }
    function o() {
      e.push({ name: "Checkout" });
    }
    function i(l) {
      return l ? `Rs. ${l.toLocaleString()}` : "Rs. 0";
    }
    return {
      cartItems: t,
      cartTotal: n,
      updateQuantity: s,
      removeItem: r,
      goToCheckout: o,
      formatPrice: i
    };
  }
}, $f = { class: "shopping-cart-page" }, Mf = { class: "main-content" }, Df = { class: "container" }, Lf = {
  key: 0,
  class: "empty-cart"
}, Ff = {
  key: 1,
  class: "cart-content"
}, kf = { class: "cart-items" }, Hf = { class: "cart-summary" }, Uf = { class: "summary-row" }, Vf = { class: "summary-row total" };
function Bf(e, t, n, s, r, o) {
  const i = Oe("Navbar"), l = Oe("router-link"), c = Oe("CartItem");
  return V(), j("div", $f, [
    ne(i),
    b("main", Mf, [
      b("div", Df, [
        t[6] || (t[6] = b("h1", null, "Shopping Cart", -1)),
        e.cartItems.length === 0 ? (V(), j("div", Lf, [
          t[2] || (t[2] = b("p", null, "Your cart is empty", -1)),
          ne(l, {
            to: "/products",
            class: "shop-btn"
          }, {
            default: sn(() => [...t[1] || (t[1] = [
              an("Continue Shopping", -1)
            ])]),
            _: 1
          })
        ])) : (V(), j("div", Ff, [
          b("div", kf, [
            (V(!0), j(de, null, vt(e.cartItems, (d) => (V(), Ys(c, {
              key: d.id,
              item: d,
              onUpdateQuantity: e.updateQuantity,
              onRemove: e.removeItem
            }, null, 8, ["item", "onUpdateQuantity", "onRemove"]))), 128))
          ]),
          b("div", Hf, [
            t[5] || (t[5] = b("h3", null, "Order Summary", -1)),
            b("div", Uf, [
              t[3] || (t[3] = b("span", null, "Subtotal:", -1)),
              b("span", null, oe(e.formatPrice(e.cartTotal)), 1)
            ]),
            b("div", Vf, [
              t[4] || (t[4] = b("span", null, "Total:", -1)),
              b("span", null, oe(e.formatPrice(e.cartTotal)), 1)
            ]),
            b("button", {
              class: "checkout-btn",
              onClick: t[0] || (t[0] = (...d) => e.goToCheckout && e.goToCheckout(...d))
            }, "Proceed to Checkout")
          ])
        ]))
      ])
    ])
  ]);
}
const jf = /* @__PURE__ */ ke(xf, [["render", Bf], ["__scopeId", "data-v-f8358335"]]), Gf = {
  name: "Checkout",
  components: {
    Navbar: En
  },
  setup() {
    const e = bn(), t = Re(!1), n = Re({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: ""
    }), s = me(() => Ye.state.items), r = me(() => Ye.state.total);
    async function o() {
      if (s.value.length === 0) {
        alert("Your cart is empty");
        return;
      }
      t.value = !0;
      try {
        let l = n.value.email;
        await new Promise((c, d) => {
          frappe.call({
            method: window.API_MAP?.CUSTOMER?.CREATE_CUSTOMER || "frappe_site.api.customer.create_customer.create_customer",
            args: {
              customer_data: {
                customer_name: n.value.name,
                customer_type: "Individual",
                customer_group: "Individual",
                email_id: n.value.email,
                mobile_no: n.value.phone,
                address_line1: n.value.address,
                city: n.value.city
              }
            },
            callback: (a) => {
              a && a.message ? (l = a.message.name || n.value.email, c()) : d(a);
            }
          });
        }), await new Promise((c, d) => {
          frappe.call({
            method: window.API_MAP?.SALES_ORDER?.CREATE_SALES_ORDER || "frappe_site.api.sales_order.create_sales_order.create_sales_order",
            args: {
              order_data: {
                customer: l,
                items: s.value.map((a) => ({
                  item_code: a.id,
                  qty: a.quantity,
                  rate: a.price
                }))
              }
            },
            callback: (a) => {
              a && a.message ? c() : d(a);
            }
          });
        }), Ye.clearCart(), alert("Order placed successfully!"), e.push({ name: "Home" });
      } catch (l) {
        console.error("Error placing order:", l), alert("Error placing order. Please try again.");
      } finally {
        t.value = !1;
      }
    }
    function i(l) {
      return l ? `Rs. ${l.toLocaleString()}` : "Rs. 0";
    }
    return {
      customerInfo: n,
      cartItems: s,
      cartTotal: r,
      submitting: t,
      submitOrder: o,
      formatPrice: i
    };
  }
}, Kf = { class: "checkout-page" }, qf = { class: "main-content" }, Wf = { class: "container" }, Qf = { class: "checkout-content" }, Yf = { class: "checkout-form" }, zf = { class: "form-group" }, Jf = { class: "form-group" }, Xf = { class: "form-group" }, Zf = { class: "form-group" }, ed = { class: "form-group" }, td = ["disabled"], nd = { class: "order-summary" }, sd = { class: "summary-items" }, rd = { class: "summary-total" };
function od(e, t, n, s, r, o) {
  const i = Oe("Navbar");
  return V(), j("div", Kf, [
    ne(i),
    b("main", qf, [
      b("div", Wf, [
        t[14] || (t[14] = b("h1", null, "Checkout", -1)),
        b("div", Qf, [
          b("div", Yf, [
            t[11] || (t[11] = b("h2", null, "Customer Information", -1)),
            b("form", {
              onSubmit: t[5] || (t[5] = kn((...l) => e.submitOrder && e.submitOrder(...l), ["prevent"]))
            }, [
              b("div", zf, [
                t[6] || (t[6] = b("label", null, "Full Name *", -1)),
                ht(b("input", {
                  "onUpdate:modelValue": t[0] || (t[0] = (l) => e.customerInfo.name = l),
                  type: "text",
                  required: ""
                }, null, 512), [
                  [mt, e.customerInfo.name]
                ])
              ]),
              b("div", Jf, [
                t[7] || (t[7] = b("label", null, "Email *", -1)),
                ht(b("input", {
                  "onUpdate:modelValue": t[1] || (t[1] = (l) => e.customerInfo.email = l),
                  type: "email",
                  required: ""
                }, null, 512), [
                  [mt, e.customerInfo.email]
                ])
              ]),
              b("div", Xf, [
                t[8] || (t[8] = b("label", null, "Phone *", -1)),
                ht(b("input", {
                  "onUpdate:modelValue": t[2] || (t[2] = (l) => e.customerInfo.phone = l),
                  type: "tel",
                  required: ""
                }, null, 512), [
                  [mt, e.customerInfo.phone]
                ])
              ]),
              b("div", Zf, [
                t[9] || (t[9] = b("label", null, "Address *", -1)),
                ht(b("textarea", {
                  "onUpdate:modelValue": t[3] || (t[3] = (l) => e.customerInfo.address = l),
                  required: ""
                }, null, 512), [
                  [mt, e.customerInfo.address]
                ])
              ]),
              b("div", ed, [
                t[10] || (t[10] = b("label", null, "City *", -1)),
                ht(b("input", {
                  "onUpdate:modelValue": t[4] || (t[4] = (l) => e.customerInfo.city = l),
                  type: "text",
                  required: ""
                }, null, 512), [
                  [mt, e.customerInfo.city]
                ])
              ]),
              b("button", {
                type: "submit",
                class: "submit-btn",
                disabled: e.submitting
              }, oe(e.submitting ? "Processing..." : "Place Order"), 9, td)
            ], 32)
          ]),
          b("div", nd, [
            t[13] || (t[13] = b("h2", null, "Order Summary", -1)),
            b("div", sd, [
              (V(!0), j(de, null, vt(e.cartItems, (l) => (V(), j("div", {
                key: l.id,
                class: "summary-item"
              }, [
                b("span", null, oe(l.name) + " x " + oe(l.quantity), 1),
                b("span", null, oe(e.formatPrice(l.price * l.quantity)), 1)
              ]))), 128))
            ]),
            b("div", rd, [
              t[12] || (t[12] = b("span", null, "Total:", -1)),
              b("span", null, oe(e.formatPrice(e.cartTotal)), 1)
            ])
          ])
        ])
      ])
    ])
  ]);
}
const id = /* @__PURE__ */ ke(Gf, [["render", od], ["__scopeId", "data-v-3eb70b40"]]), ld = [
  {
    path: "/",
    name: "Home",
    component: Wu
  },
  {
    path: "/products",
    name: "Products",
    component: lf
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: Sf,
    props: !0
  },
  {
    path: "/cart",
    name: "ShoppingCart",
    component: jf
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: id
  }
], cd = Qa({
  history: wa(),
  routes: ld
}), ad = {
  name: "App"
}, ud = { class: "frappe-site-app" };
function fd(e, t, n, s, r, o) {
  const i = Oe("router-view");
  return V(), j("div", ud, [
    ne(i)
  ]);
}
const dd = /* @__PURE__ */ ke(ad, [["render", fd], ["__scopeId", "data-v-c61c55c3"]]);
function Yr() {
  const e = document.getElementById("frappe-site-app");
  if (!e) {
    console.warn("Frappe Site app container not found");
    return;
  }
  if (e.__vue_app__) {
    console.warn("Frappe Site app already mounted");
    return;
  }
  const t = Fc(dd);
  t.config.globalProperties.$frappe = frappe, t.config.globalProperties.$call = frappe.call.bind(frappe), t.config.globalProperties.$eventBus = Vc, t.config.globalProperties.__ = frappe._ || ((n) => n), t.use(cd), t.mount(e);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Yr) : setTimeout(Yr, 100);
