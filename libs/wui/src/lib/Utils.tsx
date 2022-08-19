export class Utils {
  static getRandomValue = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }

  static bytesToSize(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    if (bytes === 0)
      return 'n/a'

    const i = parseInt(
      Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
      10
    )

    if (i === 0)
      return `${bytes} ${sizes[i]})`

    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }
}
