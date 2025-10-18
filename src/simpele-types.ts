function makeOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + ((s[(v - 20) % 10] || s[v] || s[0]) as string)
}
function isFinite(number: unknown): boolean {
  return Number.isFinite(number)
}
function isSafeNumber(number: unknown): boolean {
  return Number.isSafeInteger(number)
}

const LESS_THAN_TWENTY = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
]

const TENTHS_LESS_THAN_HUNDRED = [
  'zero',
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
] as const

const TEN = 10
const ONE_HUNDRED = 100
const ONE_THOUSAND = 1000
const ONE_MILLION = 1000000
const ONE_BILLION = 1000000000 //         1.000.000.000 (9)
const ONE_TRILLION = 1000000000000 //     1.000.000.000.000 (12)
const ONE_QUADRILLION = 1000000000000000 // 1.000.000.000.000.000 (15)

export function toWords(input: string | number, asOrdinal: boolean = false): string {
  if (!isFinite(input)) {
    throw new TypeError(
      `Not a finite number: ${input} (${typeof input})`,
    )
  }
  const num = typeof input === 'number' ? Math.trunc(input) : Number.parseInt(input, 10)

  if (!isSafeNumber(num)) {
    throw new RangeError(
      'Input is not a safe number, it’s either too large or too small.',
    )
  }
  const words = generateWords(num)
  return asOrdinal ? `${words}  ${makeOrdinal(num)}` : words
}

function generateWords(num: number, words: Array<string> = []): string {
  let remainder: number
  let word: string

  // We’re done
  if (num === 0) {
    return !words ? 'zero' : words.join(' ').replace(/,$/, '')
  }

  // If negative, prepend “minus”
  if (num < 0) {
    words.push('minus')
    num = Math.abs(num)
  }

  if (num < 20) {
    remainder = 0
    word = LESS_THAN_TWENTY[num] as string
  }
  else if (num < ONE_HUNDRED) {
    remainder = num % TEN
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(num / TEN)] as string
    // In case of remainder, we need to handle it here to be able to add the “-”
    if (remainder) {
      word += `-${LESS_THAN_TWENTY[remainder]}`
      remainder = 0
    }
  }
  else if (num < ONE_THOUSAND) {
    remainder = num % ONE_HUNDRED
    word = `${generateWords(Math.floor(num / ONE_HUNDRED))} hundred`
  }
  else if (num < ONE_MILLION) {
    remainder = num % ONE_THOUSAND
    word = `${generateWords(Math.floor(num / ONE_THOUSAND))} thousand,`
  }
  else if (num < ONE_BILLION) {
    remainder = num % ONE_MILLION
    word = `${generateWords(Math.floor(num / ONE_MILLION))} million,`
  }
  else if (num < ONE_TRILLION) {
    remainder = num % ONE_BILLION
    word = `${generateWords(Math.floor(num / ONE_BILLION))} billion,`
  }
  else if (num < ONE_QUADRILLION) {
    remainder = num % ONE_TRILLION
    word = `${generateWords(Math.floor(num / ONE_TRILLION))} trillion,`
  }
  else {
    remainder = num % ONE_QUADRILLION
    word = `${generateWords(Math.floor(num / ONE_QUADRILLION))
    } quadrillion,`
  }

  words.push(word)
  return generateWords(remainder, words)
}
