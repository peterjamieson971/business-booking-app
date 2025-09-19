export interface PricingModifiers {
  timeOfDay: number;
  serviceComplexity: number;
  distance: number;
  seasonal: number;
  surge: number;
}

export interface ServicePricing {
  base: number;
  premium?: number;
}

export function calculateDynamicPrice(
  basePrice: ServicePricing,
  modifiers: Partial<PricingModifiers> = {},
  tier: 'base' | 'premium' = 'base'
): number {
  const price = tier === 'premium' && basePrice.premium ? basePrice.premium : basePrice.base;

  const {
    timeOfDay = 1.0,      // 1.0 for normal hours, 1.5 for emergency hours
    serviceComplexity = 1.0, // 1.0 for standard, up to 2.0 for complex
    distance = 1.0,       // 1.0 for local, 1.2 for extended travel
    seasonal = 1.0,       // 1.1 for peak season
    surge = 1.0          // 1.0 normal, up to 1.5 for high demand
  } = modifiers;

  return Math.round(price * timeOfDay * serviceComplexity * distance * seasonal * surge);
}

export function getPricingModifiers(
  isEmergency: boolean = false,
  distance: number = 0,
  currentDate: Date = new Date()
): PricingModifiers {
  const hour = currentDate.getHours();
  const month = currentDate.getMonth();

  // Time of day modifier
  const timeOfDay = isEmergency || hour < 8 || hour > 18 ? 1.5 : 1.0;

  // Seasonal modifier (summer months have higher demand)
  const seasonal = month >= 5 && month <= 8 ? 1.1 : 1.0;

  // Distance modifier
  const distanceModifier = distance > 30 ? 1.2 : distance > 15 ? 1.1 : 1.0;

  return {
    timeOfDay,
    serviceComplexity: 1.0,
    distance: distanceModifier,
    seasonal,
    surge: 1.0
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}