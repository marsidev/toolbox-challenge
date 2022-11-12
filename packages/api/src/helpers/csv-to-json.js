export const csvToJson = (fileName, csv) => {
  // Split the csv file by each row
  const rows = csv.split('\n')

  // Remove the first row (the header) from the rest of lines and split by comma
  const headers = rows.shift().split(',')

  const jsonFile = {
    file: fileName,
    lines: []
  }

  rows.forEach(row => {
    // Split the columns by comma
    const columns = row.split(',')

    // check if the number of columns of the line is the same than the number of header columns
    if (columns.length === headers.length) {
      const [text, number, hex] = columns.slice(-3) // destructuring the last three items of the columns array

      // check if the properties have the correct syntax
      if (typeof text === 'string' && hex.length === 32 && !isNaN(Number(number))) {
        jsonFile.lines.push({
          text,
          number: Number(number),
          hex
        })
      }
    }
  })

  return jsonFile
}
