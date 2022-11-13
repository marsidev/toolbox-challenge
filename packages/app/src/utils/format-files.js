/**
 * Function to format the filesDataArray to a friendly format to render the table easily.
 *
 * @param {*} filesData
 * @returns An array with the line files data.
 * @example
 * ```js
 * // `filesData` originally has the following format:
 * [
 *   {
 *     file: 'test1.csv',
 *     lines: [{ text: 'abc', number: 123, hex: 'abc123...' }, ...]
 *   },
 *   ...
 * ]
 *
 * // This function will output a format like the following:
 * [
 *   { file: 'test1.csv', text: 'abc', number: 123, hex: 'abc123...' },
 *   ...
 * ]
 * ```
 */
export const formatFilesData = (filesData) => {
  if (!filesData) return null

  return filesData.flatMap(file => {
    const linesWithFilename = file.lines.map(line => ({
      file: file.file,
      ...line
    }))

    return linesWithFilename
  })
}
