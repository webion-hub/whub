let currentUUID = 0;

export class UUIDFactory {
  static getUUIDFromDate = () => {
    const date = new Date()
    const time = date.getTime()
    return time.toString(36)
  }

  static getUUIDFromRandom = (seed: number) => {
    const rndNumber = Math.random() * seed;
    return rndNumber.toString(36).substring(2, 15)
  }

  static generate = (word: string) => {
    const fromDate = this.getUUIDFromDate()
    const fromRandom = this.getUUIDFromRandom(currentUUID)

    const optionalWord = word
      ? `${word}-`
      : ""

    const uniqueSeed =
      optionalWord
      + fromDate
      + "-"
      + fromRandom
      + "-"
      + currentUUID

    currentUUID++;
    return uniqueSeed
  }
}
