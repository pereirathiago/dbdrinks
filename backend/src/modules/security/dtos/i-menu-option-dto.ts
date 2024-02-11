interface IMenuOptionDTO {
  id?: string
  moduleId?: string
  sequence?: string
  label?: string
  route?: string
  icon?: string
  key?: string
  disabled?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IMenuOptionDTO }
