interface MapValue<T> {
  key: string
  value: T
  next: null | MapValue<T>
}

class Bucket<T> {
  value: MapValue<T> | null
  lastValue: MapValue<T> | null
  constructor(key: string, value: T) {
    this.value = { value, key, next: null }
    this.lastValue = this.value
  }

  // не учитываем что ключи могут повторяться 
  add(key: string, value: T): void {
    const newValue = { value, key, next: null }
    if (this.lastValue) {
      this.lastValue.next = newValue
      this.lastValue = newValue
    }
    else {
      this.value = newValue
      this.lastValue = newValue
    }
  }

  get(key: string): T | null {
    let current: MapValue<T> | null = this.value
    while (current !== null) {
      if (key === current.key) {
        return current.value
      }
      current = current.next
    }
    return null
  }

  delete(key: string): boolean {
    let prevValue: MapValue<T> | null = null
    let current: MapValue<T> | null = this.value
    while (current !== null) {
      if (key === current.key) {
        if (prevValue) {
          prevValue.next = current.next
        }
        else {
          this.value = current.next
        }
        if (this.value === null) {
          this.lastValue = null
        }
        return true
      }
      prevValue = current
      current = current.next
    }

    return false
  }

  toString(): string {
    let result = '{'
    let current: MapValue<T> | null = this.value

    while (current !== null) {
      result += `${current.key}: ${current.value}, `

      current = current.next
    }
    result += '}'
    return result
  }
}

export class Map<T> {
  private buckets: Record<string, Bucket<T>> = {}

  private generateHash(str: string): number {
    let hash = 0
    for (const char of str) {
      hash = (hash << 5) - hash + char.charCodeAt(0)
      hash |= 0 // Constrain to 32bit integer
    }
    return hash
  };

  public set(key: string, value: T): void {
    const hash = this.generateHash(key)
    if (this.buckets[hash]) {
      this.buckets[hash].add(key, value)
    }
    else {
      this.buckets[hash] = new Bucket(key, value)
    }
  }

  public delete(key: string): boolean {
    const hash = this.generateHash(key)
    if (!this.buckets[hash]) {
      return false
    }
    return this.buckets[hash].delete(key)
  }

  public get(key: string): T | null {
    const hash = this.generateHash(key)
    if (!this.buckets[hash]) {
      return null
    }
    return this.buckets[hash].get(key)
  }

  public clear(): void {
    this.buckets = {}
  }
}
