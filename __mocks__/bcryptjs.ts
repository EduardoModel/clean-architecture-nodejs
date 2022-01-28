export default {
  s: '',
  hash: '',
  isHashValid: true,
  async compare (s: string, hash: string) : Promise<boolean> {
    return new Promise((resolve) => {
      this.s = s
      this.hash = hash
      resolve(this.isHashValid)
    })
  }
}
