// src/hooks.client.ts
import { isLoading } from '$lib/stores/loadingStore';

export function handle({ event, resolve }) {
  isLoading.set(true);
  return resolve(event).finally(() => {
    isLoading.set(false);
  });
}
