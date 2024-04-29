export const getFlagUrlFromCountryCode = (countryCode: string) =>
    `${import.meta.env.VITE_FLAG_API_URL}/${countryCode.toUpperCase()}/flat/64.png`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<F extends (...args: any[]) => void>(fn: F, limit: number): (...args: Parameters<F>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<F>) => {
      clearTimeout(timer as ReturnType<typeof setTimeout>);
      timer = setTimeout(() => fn(...args), limit);
    };
  }