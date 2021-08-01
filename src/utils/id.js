export function isValid(id) {
  return id && id.match(/^[a-zA-Z0-9-_]*$/)
}

export function generate() {
  return Math.floor((Date.now() + Math.random()) * 1000).toString(36)
}
