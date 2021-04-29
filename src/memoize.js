export function create(size, maxAge) {
  return {
    maxAge,
    size,
    index: 0,
    values: {},
    keys: [],
  }
}

async function get(cache, key, getValue) {
  const {keys, values, maxAge, size} = cache
  const now = Date.now()

  const add = (key, value) => {
    values[key] = {ts: now, value, index: cache.index}
    if (keys[cache.index] != null) delete values[keys[cache.index]]
    cache.keys[cache.index] = key
    cache.index = (cache.index + 1) % size
  }

  if (!cache.values.hasOwnProperty(key)) add(key, await getValue())

  const {ts, index} = values[key]
  if (now - ts >= maxAge) {
    keys[index] = undefined
    add(key, await getValue())
  }

  return values[key].value
}

export default function memoize(fn, size, maxAge) {
  const cache = create(size, maxAge)
  return async function (...args) {
    const key = JSON.stringify(Array.prototype.slice.call(args))
    const getValue = async function () {
      return await fn(...args)
    }

    return await get(cache, key, getValue)
  }
}
