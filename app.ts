const dec2bin = (dec: number, bits = 8): string =>
{
  const binary: number[] = []

  for (let i = bits - 1; i >= 0; i--)
    binary.push(dec & (1 << i) ? 1 : 0)

  return binary.join('')
}

const bin2dec = (bin: string): number =>
{
  const dec: number[] = []

  for (let i = 0; i < bin.length; i++)
    dec.push(parseInt(bin[i]) * Math.pow(2, bin.length - 1 - i))

  return dec.reduce((acc, curr) => acc + curr)
}

const text2bin = (text: string): string =>
{
  const binary: string[] = []

  for (const char of text)
    binary.push(dec2bin(char.charCodeAt(0)))

  return binary.join(' ')
}

const bin2text = (bin: string): string =>
{
  const text: string[] = []

  for (const code of bin.split(' '))
    text.push(String.fromCharCode(bin2dec(code)))

  return text.join('')
}

const text = 'Goodbye World'

console.log('Binary:', text2bin(text))
console.log('String:', bin2text(text2bin(text)))