type CacheEntry<T> = {
    createdAT: number
    value: T
};
export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
      this.#interval = interval;
      this.#startReapLoop();
  };

  add<T>(key: string, value: T) {
    this.#cache.set(key, { createdAT: Date.now(), value: value });
  };

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.value;
  };

  #reap() {
      for( const [key, value] of this.#cache.entries()) {
        if(value.createdAT <= Date.now() - this.#interval) {
            this.#cache.delete(key);
        };
      };
  };

  #startReapLoop() {
      this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  };

  stopReapLoop() {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
  };
}
