export default (env) => {
  let missingEnvs = []
  return {
    bool: (key) => {
      const value = env[key]

      if (value === 'true') return true
      // We allow undefined as false because it is common practice to set certain
      // non-mandatory flags only if change of default behavior is desired.
      //
      // E.g. enforcing dev flags on production environment is extremely annoying.
      if (value === 'false' || value == null) return false

      throw new Error(`Boolean ${key} has non-boolean value: ${value}.`)
    },

    env: (key, notFound) => {
      if (env[key] !== undefined) return env[key]
      if (notFound !== undefined) return notFound
      missingEnvs.push(key)
      return undefined
    },

    getErrors: () => {
      if (missingEnvs.length > 0) {
        throw new Error(`Mandatory envs not specified: ${missingEnvs.join(', ')}.`)
      }
    },
  }
}
