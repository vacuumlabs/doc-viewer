// Useful helpers for functional programming
import _ from 'lodash'

const fthrow = (value) => {
  throw value
}
const ftry = async (fn, handlers) => {
  try {
    return await fn()
  } catch (e) {
    return await _.cond([...handlers, [_.stubTrue, fthrow]])(e)
  }
}

const fstry = (fn, handlers) => {
  try {
    return fn()
  } catch (e) {
    return _.cond([...handlers, [_.stubTrue, fthrow]])(e)
  }
}

const flow = (value, ...fns) => {
  for (const fn of fns) {
    if (Array.isArray(fn)) {
      const [f, ...args] = fn
      value = f(value, ...args)
    } else value = fn(value)
  }
  return value
}

const aflow = async (value, ...fns) => {
  for (const fn of fns) {
    if (Array.isArray(fn)) {
      const [f, ...args] = fn
      value = f(await value, ...args)
    } else value = fn(await value)
  }
  return await value
}

function assert(value, cond, msg) {
  if (!cond(value)) throw new Error(msg)
  else return value
}

const notNull = (v) => v != null

const separate = (col, predicate) => {
  const r = _.groupBy(col, (v) => !!predicate(v))
  return [r.true ?? [], r.false ?? []]
}

const mapValues = (fn, ...objs) =>
  Object.fromEntries(
    objs
      .flatMap((o) => Object.keys(o))
      .map((k) => [k, fn(...objs.map((o) => o[k]))]),
  )

const then =
  (f1, f2) =>
  async (...args) =>
    await f2(await f1(...args))

export default {
  assert,
  try: ftry,
  stry: fstry,
  throw: fthrow,

  log: (value) => ((console.log(value), value)), // eslint-disable-line no-console, no-sequences

  empty: _.isEmpty,
  notNull,

  aflow,
  flow,
  then,
  group: (col, by) => Object.entries(_.groupBy(col, by)),
  amap: (...args) => Promise.all(_.map(...args)),
  mapValues,
  separate,
}
