import theme from '../styles/theme'

export const convertFileSize = num => {
  if (num < 1024) {
    return `${num} B`
  }
  if (num < 1000000) {
    return `${Math.round(num / 1000)} KB`
  }
  return `${(num / 1000000).toFixed(1)} MB`
}

export const getFileType = str => {
  if (str === '') return ''
  let fileType = str.split('/')[1]
  fileType = fileType.includes('+') ? fileType.split('+')[0] : fileType
  fileType = fileType === 'javascript' ? 'js' : fileType
  fileType = fileType === 'vnd.adobe.photoshop' ? 'psd' : fileType
  return fileType.length > 3 ? fileType.slice(0, 2) : fileType
}

export const minimizeFileName = fileName => {
  if (fileName.length < 13) return fileName
  const arr = fileName.split('.')
  const lastItem = arr.length - 1
  let name =
    arr.length > 2
      ? arr.reduce((str, val, i) => {
          if (i !== lastItem) {
            str += val
          }
          return str
        }, '')
      : arr[0]
  name = `${name.slice(0, 8)}***`

  return `${name}${arr.length > 1 ? '.' + arr[lastItem] : ''}`
}

export const shortenEthAddress = address => {
  if (!address) return ''
  const first = address.slice(0, 10)
  const last = address.slice(32, 42)
  const dots = '...'
  return `${first}${dots}${last}`
}

const colorMap = {
  0: theme.colors.c2,
  25: theme.colors.c3,
  50: theme.colors.c4,
  75: theme.colors.c5,
  100: theme.colors.c1,
}

export const getColor = percent => {
  return percent < 25
    ? colorMap[0]
    : percent < 50
      ? colorMap[25]
      : percent < 75
        ? colorMap[50]
        : percent < 100
          ? colorMap[75]
          : colorMap[100]
}
