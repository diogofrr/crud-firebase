export default class Client {
  #id: string
  #name: string
  #birthday: Date
  #tel: string
  #email: string

  constructor(name: string, birthday: Date, tel: string, email: string, id: string = '') {
    this.#id = id
    this.#name = name
    this.#birthday = birthday
    this.#tel = tel
    this.#email = email
  }

  static empty() {
    return new Client('', new Date(), '', '')
  }

  get id() {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get birthday() {
    return this.#birthday
  }

  get tel() {
    return this.#tel
  }

  get email() {
    return this.#email
  }
}