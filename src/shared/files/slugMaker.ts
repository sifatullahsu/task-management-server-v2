const slugMaker = (str: string) => {
  return str
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]+/g, '') // Remove non-alphanumeric characters except hyphens
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}

export default slugMaker
