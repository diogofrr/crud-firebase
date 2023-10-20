export default class User {
  #uid: string
  #name: string
  #profilePicture: string
  #email: string

  constructor(name: string, profilePicture: string, email: string, uid: string = '') {
    this.#uid = uid
    this.#name = name
    this.#profilePicture = profilePicture
    this.#email = email
  }

  get uid() { 
    return this.#uid
  }

  get name() {
    return this.#name
  }

  get profilePicture() {
    return this.#profilePicture
  }

  get email() {
    return this.#email
  }

  set uid(uid) {
    this.#uid = uid
  }

  set name(name) {
    this.#name = name
  }

  set profilePicture(profilePicture) {
    this.#profilePicture = profilePicture
  }

  toJSON() {
    return {
      uid: this.#uid,
      name: this.#name,
      profilePicture: this.#profilePicture,
      email: this.#email
    };
  }
}