type optionItem = {
  label: string
  value: any
}
export type Ioption = {
  prop: string
  label: string
  type: 'input' | 'time' | 'select'
  options?: optionItem[]
}

export {}
