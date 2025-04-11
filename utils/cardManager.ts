import { ImageSourcePropType } from 'react-native';

export interface Card {
  id: string;
  name: string;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: number; // 1-13 (Ace=1, Jack=11, Queen=12, King=13)
  meaning: string;
  image: ImageSourcePropType;
}

// Temporary placeholder images until we have real card assets
export const cardBack = require('@/assets/images/partial-react-logo.png');

// Generate the image require path for a card
function getCardImage(suit: string, value: number): ImageSourcePropType {
  // Using placeholder image for all cards temporarily
  return require('@/assets/images/partial-react-logo.png');
  
  // TODO: Implement real card images
  /*const valueMap: { [key: number]: string } = {
    1: 'ace',
    11: 'jack',
    12: 'queen',
    13: 'king',
  };

  const cardValue = valueMap[value] || value.toString();
  return require(`@/assets/images/cards/${suit}/${cardValue}.png`);*/
}

// Card meanings
const cardMeanings: { [key: string]: string } = {
  'Ace of Hearts': 'New beginnings in love, happiness, and emotional fulfillment',
  '2 of Hearts': 'Partnership, mutual attraction, and shared feelings',
  '3 of Hearts': 'Celebration, friendship, and creative expression',
  '4 of Hearts': 'Stability in relationships, emotional security',
  '5 of Hearts': 'Loss, disappointment, but potential for renewal',
  '6 of Hearts': 'Nostalgia, reunion, healing of relationships',
  '7 of Hearts': 'Daydreams, fantasy, new possibilities in love',
  '8 of Hearts': 'Leaving something behind for something better',
  '9 of Hearts': 'Wishes fulfilled, contentment, emotional satisfaction',
  '10 of Hearts': 'Perfect love, harmony in relationships, happy family life',
  'Jack of Hearts': 'Young person in love, messenger of love',
  'Queen of Hearts': 'Loving, nurturing person, emotional intelligence',
  'King of Hearts': 'Wise and loving counsel, emotional mastery',
  
  'Ace of Diamonds': 'New financial opportunity, manifestation',
  '2 of Diamonds': 'Balance in finances, weighing options',
  '3 of Diamonds': 'Mastery of skills, recognition of talents',
  '4 of Diamonds': 'Financial security, material stability',
  '5 of Diamonds': 'Material loss, but opportunity for growth',
  '6 of Diamonds': 'Generosity, gifts, material comfort',
  '7 of Diamonds': 'Assessment of values, long-term investments',
  '8 of Diamonds': 'Skilled work, attention to detail',
  '9 of Diamonds': 'Material abundance, luxury, self-sufficiency',
  '10 of Diamonds': 'Family wealth, material success, inheritance',
  'Jack of Diamonds': 'Student of wealth, ambitious young person',
  'Queen of Diamonds': 'Financially savvy, practical person',
  'King of Diamonds': 'Financial mastery, business acumen',
  
  'Ace of Clubs': 'New ideas, inspiration, spiritual awakening',
  '2 of Clubs': 'Decisions about direction, partnership in ventures',
  '3 of Clubs': 'Enterprise, trade, adventure',
  '4 of Clubs': 'Community, celebration, completion',
  '5 of Clubs': 'Competition, tests of strength',
  '6 of Clubs': 'Victory after struggle, progress',
  '7 of Clubs': 'Victory through courage, overcoming odds',
  '8 of Clubs': 'Movement, quick developments',
  '9 of Clubs': 'Resilience, strength, preparedness',
  '10 of Clubs': 'Success in business, achievement',
  'Jack of Clubs': 'Energetic youth, bearer of news',
  'Queen of Clubs': 'Warm, social, creative person',
  'King of Clubs': 'Leadership, authority, power',
  
  'Ace of Spades': 'Breakthrough, new perspective, transformation',
  '2 of Spades': 'Difficult choice, stalemate, peace through wisdom',
  '3 of Spades': 'Heartbreak, but growth through pain',
  '4 of Spades': 'Rest, recuperation, contemplation',
  '5 of Spades': 'Defeat, but opportunity for change',
  '6 of Spades': 'Transition, moving forward, healing',
  '7 of Spades': 'Deception, but wisdom through challenge',
  '8 of Spades': 'Restriction, but potential for freedom',
  '9 of Spades': 'Anxiety, but deep wisdom available',
  '10 of Spades': 'Ending, but potential for rebirth',
  'Jack of Spades': 'Vigilant youth, bearer of challenging news',
  'Queen of Spades': 'Perceptive, transformative person',
  'King of Spades': 'Authority, wisdom through experience'
};

// Generate the full deck of cards
export function generateDeck(): Card[] {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const deck: Card[] = [];

  suits.forEach(suit => {
    for (let value = 1; value <= 13; value++) {
      const cardName = `${value === 1 ? 'Ace' : value === 11 ? 'Jack' : value === 12 ? 'Queen' : value === 13 ? 'King' : value} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`;
      
      deck.push({
        id: `${suit}-${value}`,
        name: cardName,
        suit: suit as Card['suit'],
        value,
        meaning: cardMeanings[cardName] || 'Meaning to be discovered',
        image: getCardImage(suit, value)
      });
    }
  });

  return deck;
}

// Get a personalized interpretation based on the card's meaning
export function getPersonalizedMeaning(card: Card): string {
  const prefixes = [
    'Today, this card suggests that you',
    'For you today, this means',
    "This card's energy invites you to",
    'Consider how you might',
    'Reflect on ways you can'
  ];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const meaning = card.meaning.toLowerCase()
    .replace('but', 'and')
    .replace('potential for', 'opportunity for')
    .replace('through', 'by embracing');
    
  return `${prefix} ${meaning}.`;
}