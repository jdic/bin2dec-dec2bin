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
  {
    const charCode = char.charCodeAt(0)

    if (charCode < 127)
    {
      binary.push(dec2bin(charCode) + ' ')
    }

    else
    {
      binary.push(dec2bin(0xC0 | (charCode >> 6))) + ' '
      binary.push(dec2bin(0x80 | (charCode & 0x3F))) + ' '
    }
  }

  return binary.join(' ')
}

const bin2text = (bin: string): string =>
{
  const bytes = bin.split(' ')
  const text: string[] = []

  for (let i = 0; i < bytes.length; i += 8)
  {
    const byte = bin2dec(bytes[i])

    if ((byte & 0x80) === 0)
    {
      text.push(String.fromCharCode(byte))
    }

    else
    {
      const byte2 = bin2dec(bytes[i + 1])
      const charCode = ((byte & 0x1F) << 6) | (byte2 & 0x3F)

      text.push(String.fromCharCode(charCode))
    }
  }

  return text.join('')
}

const text = '¡'

console.log('Binary:', text2bin(text))
console.log('String:', bin2text(text2bin(text)))