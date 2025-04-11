import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';

const STREAK_KEY = 'cartomancy_streak';

interface StreakData {
  currentStreak: number;
  lastVisit: string;
  highestStreak: number;
}

/**
 * Get the current streak data
 * @returns Promise<StreakData>
 */
export async function getStreak(): Promise<StreakData> {
  try {
    const data = await AsyncStorage.getItem(STREAK_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return {
      currentStreak: 0,
      lastVisit: new Date().toISOString(),
      highestStreak: 0
    };
  } catch (error) {
    console.error('Error getting streak:', error);
    return {
      currentStreak: 0,
      lastVisit: new Date().toISOString(),
      highestStreak: 0
    };
  }
}

/**
 * Update the streak for today's visit
 * @returns Promise<StreakData>
 */
export async function updateStreak(): Promise<StreakData> {
  try {
    const streak = await getStreak();
    const lastVisitDate = new Date(streak.lastVisit);
    const today = new Date();

    // If last visit was today, don't update anything
    if (isToday(lastVisitDate)) {
      return streak;
    }

    let newStreak = streak.currentStreak;

    // If last visit was yesterday, increment streak
    if (isYesterday(lastVisitDate)) {
      newStreak += 1;
    } else {
      // If more than 1 day has passed, reset streak
      const daysSinceLastVisit = differenceInDays(today, lastVisitDate);
      if (daysSinceLastVisit > 1) {
        newStreak = 1;
      }
    }

    const updatedStreak: StreakData = {
      currentStreak: newStreak,
      lastVisit: today.toISOString(),
      highestStreak: Math.max(newStreak, streak.highestStreak)
    };

    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));
    return updatedStreak;
  } catch (error) {
    console.error('Error updating streak:', error);
    return {
      currentStreak: 0,
      lastVisit: new Date().toISOString(),
      highestStreak: 0
    };
  }
}