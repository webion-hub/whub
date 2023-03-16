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

    return i === 0
      ? `${bytes} ${sizes[i]})`
      : `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
  }

  static capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static stripHtml(html: string) {
    const temp = document.createElement("div")
    if(!temp)
      return ''

    temp.innerHTML = html
    return temp.textContent || temp.innerText || ""
  }

  static getWidth(width: string | number) {

    const isAString = typeof width === 'string'

    return isAString
      ? width
      : width + 'px'
  }
}
