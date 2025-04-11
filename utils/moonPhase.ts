import type { format as formatType } from 'date-fns';
import { format as dateFnsFormat } from 'date-fns';

// Moon phase calculation based on lunar cycle
export function getMoonPhase(date: Date = new Date()): string {
  // Moon cycle is approximately 29.53 days
  const LUNAR_CYCLE = 29.53;
  
  // Known new moon date for reference
  const KNOWN_NEW_MOON = new Date('2024-01-11T11:57:00Z');
  
  // Calculate days since known new moon
  const daysSinceNewMoon = (date.getTime() - KNOWN_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);
  
  // Get current phase in cycle (0 to 1)
  const phase = (daysSinceNewMoon % LUNAR_CYCLE) / LUNAR_CYCLE;
  
  // Determine moon phase name
  if (phase < 0.0625 || phase >= 0.9375) return 'New Moon';
  if (phase < 0.1875) return 'Waxing Crescent';
  if (phase < 0.3125) return 'First Quarter';
  if (phase < 0.4375) return 'Waxing Gibbous';
  if (phase < 0.5625) return 'Full Moon';
  if (phase < 0.6875) return 'Waning Gibbous';
  if (phase < 0.8125) return 'Last Quarter';
  return 'Waning Crescent';
}

// Get moon phase with zodiac sign (simplified)
export function getMoonPhaseWithSign(date: Date = new Date()): string {
  const phase = getMoonPhase(date);
  const dayOfYear = Number(format(date, 'D'));
  
  // Simplified zodiac calculation (approximate)
  const zodiacSigns = [
    'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini',
    'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'
  ];
  
  const signIndex = Math.floor((dayOfYear * 12) / 365);
  const sign = zodiacSigns[signIndex];
  
  return `${phase} in ${sign}`;
}