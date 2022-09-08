const CompsObj = import.meta.glob('./*/index.vue')
const CompsList: [string?, any?] = []

Object.keys(CompsObj).forEach(keyStr => {
  const key = keyStr.replace(/.\/(\w*)\/\w.*/g, '$1')
  CompsList.push([key, CompsObj[keyStr]])
})

export default CompsList
