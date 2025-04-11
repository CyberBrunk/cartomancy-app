# Cartomancy Mobile App - Technical Architecture Document

## 1. System Architecture Overview

### 1.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client Application                          │
│                                                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐    │
│  │ React Native│   │   Redux     │   │ Local Storage/      │    │
│  │ Components  │◄──┤  State      │◄──┤ AsyncStorage        │    │
│  │             │   │  Management │   │                     │    │
│  └─────────────┘   └─────────────┘   └─────────────────────┘    │
│          ▲                 ▲                    ▲                │
│          │                 │                    │                │
│          ▼                 ▼                    ▼                │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐    │
│  │ Navigation  │   │ API Service │   │ Offline Data        │    │
│  │ System      │   │ Layer       │   │ Synchronization     │    │
│  │             │   │             │   │                     │    │
│  └─────────────┘   └─────────────┘   └─────────────────────┘    │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Firebase Services                           │
│                                                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐    │
│  │ Firebase    │   │ Firestore   │   │ Firebase Cloud      │    │
│  │ Auth        │   │ Database    │   │ Storage             │    │
│  │             │   │             │   │                     │    │
│  └─────────────┘   └─────────────┘   └─────────────────────┘    │
│                                                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐    │
│  │ Firebase    │   │ Firebase    │   │ Firebase            │    │
│  │ Cloud       │   │ Analytics   │   │ Crashlytics         │    │
│  │ Functions   │   │             │   │                     │    │
│  └─────────────┘   └─────────────┘   └─────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                           │
│                                                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐    │
│  │ OpenAI API  │   │ App Store/  │   │ Social Media        │    │
│  │ (Chat)      │   │ Google Play │   │ Sharing APIs        │    │
│  │             │   │ Billing     │   │                     │    │
│  └─────────────┘   └─────────────┘   └─────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Key Components and Their Interactions

1. **Client Application**
   - React Native components render the UI and handle user interactions
   - Redux manages application state
   - AsyncStorage handles local data persistence
   - Navigation system manages screen transitions
   - API service layer communicates with backend services
   - Offline data synchronization manages data during connectivity issues

2. **Firebase Services**
   - Firebase Authentication handles user registration and login
   - Firestore Database stores user data, cards, journal entries, and friend connections
   - Firebase Cloud Storage stores images and media
   - Firebase Cloud Functions handle server-side logic like daily card generation
   - Firebase Analytics tracks user behavior and app performance
   - Firebase Crashlytics monitors app stability

3. **External Services**
   - OpenAI API powers the "Katie The Card Lady" chat functionality
   - App Store/Google Play Billing APIs handle subscription and in-app purchases
   - Social Media APIs enable sharing functionality

### 1.3 Data Flow Between Components

1. **User Authentication Flow**
   - User credentials → React Native UI → Firebase Authentication → Firestore (user profile creation)
   - Authentication state stored in Redux and persisted in AsyncStorage

2. **Daily Card Generation Flow**
   - Firebase Cloud Function (scheduled) → Generate cards → Store in Firestore → Push notification
   - Client app → Fetch daily cards → Store in Redux → Render in UI
   - Offline access → AsyncStorage → Redux → UI

3. **Social Interaction Flow**
   - Friend request → Client app → Firebase Cloud Functions → Firestore update → Push notification
   - Compatibility check → Client app → Firebase Cloud Functions → Algorithm processing → Results to Firestore → UI display

4. **Journal Entry Flow**
   - Create entry → Client app → Local storage → Sync to Firestore when online
   - Privacy settings determine visibility in friend feeds

5. **AI Chat Flow**
   - User message → Client app → Firebase Cloud Functions → OpenAI API → Response processing → Client app

## 2. Frontend Architecture

### 2.1 Component Structure

The application follows a hierarchical component structure:

```
App
├── Navigation Container
│   ├── Authentication Stack
│   │   ├── Welcome Screen
│   │   ├── Registration Screen
│   │   └── Login Screen
│   ├── Onboarding Stack
│   │   ├── Birth Information Screen
│   │   ├── Sun Cards Reveal Screen
│   │   └── App Tour Screen
│   └── Main Tab Navigator
│       ├── Today Tab (Daily Cards)
│       ├── Connections Tab
│       ├── Reflections Tab (Journal)
│       ├── Planetary Path Tab
│       └── Chat Tab (Katie)
└── Modal Screens
    ├── Card Detail Modal
    ├── Journal Entry Modal
    ├── Friend Detail Modal
    └── Compatibility Modal
```

**Component Organization:**

1. **Atomic Design Pattern**
   - **Atoms**: Basic UI elements (buttons, inputs, icons)
   - **Molecules**: Combinations of atoms (card components, form fields)
   - **Organisms**: Complex UI sections (card carousels, journal entry forms)
   - **Templates**: Screen layouts without specific content
   - **Pages**: Complete screens with real data

2. **Component Types**
   - **Presentational Components**: Focus on UI rendering
   - **Container Components**: Handle data fetching and state management
   - **HOCs (Higher Order Components)**: Add functionality to existing components
   - **Custom Hooks**: Encapsulate and reuse stateful logic

### 2.2 State Management Approach

The application uses Redux for global state management with the following structure:

```
Store
├── Auth Slice
│   ├── User profile
│   ├── Authentication status
│   └── Premium status
├── Cards Slice
│   ├── Sun cards
│   ├── Daily cards
│   ├── Card history
│   └── Card meanings
├── Journal Slice
│   ├── Journal entries
│   ├── Draft entries
│   └── Journal filters
├── Friends Slice
│   ├── Friend list
│   ├── Friend requests
│   ├── Friend activities
│   └── Compatibility data
├── Planetary Slice
│   ├── Planetary positions
│   ├── Planetary cards
│   └── Guidance data
└── Chat Slice
    ├── Conversation history
    ├── Message status
    └── Question count
```

**State Management Implementation:**

1. **Redux Toolkit** for simplified Redux setup and reduced boilerplate
2. **Redux Persist** for persisting state to AsyncStorage
3. **Redux Thunk** for handling asynchronous actions
4. **Selector Pattern** for efficient state access
5. **Normalized State** for optimized data storage and retrieval

### 2.3 Navigation Implementation

The application uses React Navigation with the following structure:

1. **Authentication Stack**: Handles login, registration, and password recovery
2. **Onboarding Stack**: Guides new users through initial setup
3. **Main Tab Navigator**: Implements the 5 main tabs with custom styling
   - Custom tab bar with mystical theme
   - Animation and haptic feedback on tab change
   - Badge indicators for notifications
4. **Modal Stacks**: For detailed views and forms
5. **Deep Linking**: For notifications and sharing

**Navigation Features:**

- Custom transitions between screens
- Gesture-based navigation
- Screen preloading for performance
- Navigation state persistence
- Type-safe navigation with TypeScript

### 2.4 Key Libraries and Dependencies

1. **Core Framework**
   - React Native
   - Expo (managed workflow)
   - TypeScript

2. **State Management**
   - Redux Toolkit
   - Redux Persist
   - Redux Thunk

3. **Navigation**
   - React Navigation
   - React Native Gesture Handler
   - React Native Reanimated

4. **UI Components**
   - React Native Paper
   - React Native Vector Icons
   - React Native Animated
   - React Native Haptic Feedback

5. **Data Management**
   - Firebase JS SDK
   - AsyncStorage
   - Axios

6. **Forms and Validation**
   - Formik
   - Yup

7. **Utilities**
   - date-fns
   - lodash
   - uuid

8. **Testing**
   - Jest
   - React Native Testing Library
   - Detox (E2E testing)

## 3. Backend Architecture

### 3.1 Authentication System

The application uses Firebase Authentication with the following features:

1. **Authentication Methods**
   - Email/Password
   - Google Sign-In
   - Apple Sign-In
   - Facebook Sign-In

2. **Security Features**
   - Multi-factor authentication (optional)
   - Email verification
   - Password recovery
   - Account linking

3. **Authentication Flow**
   - Registration with email verification
   - Social login with profile merging
   - Token-based authentication
   - Refresh token management
   - Session persistence

4. **User Management**
   - User profile creation and updates
   - Premium status tracking
   - Account deletion and data purging

### 3.2 Database Schema

The application uses Firestore with the following collections:

1. **Users Collection**
```
users/{userId}
├── displayName: string
├── email: string
├── birthDate: timestamp
├── birthTime: string
├── birthLocation: string (optional)
├── createdAt: timestamp
├── lastActive: timestamp
├── isPremium: boolean
├── premiumExpiryDate: timestamp (optional)
├── questionCount: number (daily chat question counter)
├── journalCount: number (monthly journal entry counter)
├── notificationSettings: {
│   ├── dailyCards: boolean
│   ├── friendRequests: boolean
│   ├── journalComments: boolean
│   └── premiumOffers: boolean
│ }
└── deviceTokens: array<string>
```

2. **Sun Cards Collection**
```
users/{userId}/sunCards/{cardId}
├── cardType: string (innerChild, chosenPurpose, highestSelf)
├── cardValue: string (e.g., "aceOfHearts")
├── meaning: string
├── personalSignificance: string
└── createdAt: timestamp
```

3. **Daily Cards Collection**
```
users/{userId}/dailyCards/{date}
├── cards: array<{
│   ├── cardValue: string
│   ├── position: number (1-3)
│   ├── interpretation: string
│   └── affirmation: string
│ }>
├── summary: string
├── createdAt: timestamp
└── isViewed: boolean
```

4. **Journal Entries Collection**
```
users/{userId}/journalEntries/{entryId}
├── title: string
├── content: string
├── mood: string (optional)
├── location: geoPoint (optional)
├── attachedCards: array<string> (optional)
├── attachedImages: array<string> (optional)
├── privacyLevel: string (private, friends, public)
├── createdAt: timestamp
├── updatedAt: timestamp
├── likes: number
└── comments: array<{
    ├── userId: string
    ├── displayName: string
    ├── content: string
    ├── createdAt: timestamp
    └── likes: number
  }>
```

5. **Friends Collection**
```
users/{userId}/friends/{friendId}
├── status: string (pending, accepted, blocked)
├── createdAt: timestamp
├── updatedAt: timestamp
├── compatibility: {
│   ├── score: number
│   ├── details: string (optional, for premium)
│   ├── lastCalculated: timestamp
│   └── isPurchased: boolean
│ }
└── notes: string (optional)
```

6. **Card Meanings Collection**
```
cardMeanings/{cardId}
├── name: string
├── suit: string
├── value: string
├── basicMeaning: string
├── uprightMeaning: string
├── reversedMeaning: string (premium)
├── keywords: array<string>
├── elementalAssociation: string
├── numerology: string
├── historicalContext: string (premium)
└── imageUrl: string
```

### 3.3 API Endpoints

The application uses Firebase Cloud Functions to implement the following API endpoints:

1. **User Management**
   - `createUserProfile`: Creates user profile after registration
   - `updateUserProfile`: Updates user profile information
   - `deleteUserAccount`: Handles account deletion and data cleanup

2. **Card Operations**
   - `generateSunCards`: Calculates and creates Sun Cards based on birth information
   - `generateDailyCards`: Creates daily card readings
   - `getDailyCardHistory`: Retrieves historical daily cards (with premium checks)

3. **Social Features**
   - `sendFriendRequest`: Sends friend request and notification
   - `respondToFriendRequest`: Handles accepting/declining friend requests
   - `calculateCompatibility`: Performs compatibility analysis between users
   - `getFriendActivity`: Retrieves friend activity feed

4. **Journal Operations**
   - `createJournalEntry`: Creates new journal entry with privacy settings
   - `updateJournalEntry`: Updates existing journal entry
   - `deleteJournalEntry`: Removes journal entry
   - `shareJournalEntry`: Handles sharing to friends or social media

5. **Chat System**
   - `sendChatMessage`: Processes user message to Katie
   - `generateChatResponse`: Integrates with OpenAI to generate responses
   - `trackQuestionUsage`: Monitors daily question limits

6. **Subscription Management**
   - `verifyPurchase`: Validates in-app purchases
   - `activatePremium`: Enables premium features
   - `checkSubscriptionStatus`: Verifies current subscription status

### 3.4 Cloud Functions for Daily Card Generation

The daily card generation system uses scheduled Cloud Functions:

1. **Scheduled Trigger**
   - Function runs every hour to handle different time zones
   - Identifies users who need new daily cards based on their local midnight

2. **Card Generation Algorithm**
   - Pseudo-random selection with weighting based on user history
   - Ensures variety and avoids recent repetition
   - Considers user's Sun Cards for thematic connections

3. **Interpretation Generation**
   - Contextual interpretations based on card position
   - Personalized elements based on user profile
   - Different depth for free vs. premium users

4. **Notification System**
   - Push notification when new cards are available
   - Customizable notification settings
   - Deep links directly to Today tab

## 4. Data Models

### 4.1 User Model

```typescript
interface User {
  id: string;
  displayName: string;
  email: string;
  birthDate: Date;
  birthTime: string;
  birthLocation?: string;
  createdAt: Date;
  lastActive: Date;
  isPremium: boolean;
  premiumExpiryDate?: Date;
  questionCount: number;
  journalCount: number;
  notificationSettings: {
    dailyCards: boolean;
    friendRequests: boolean;
    journalComments: boolean;
    premiumOffers: boolean;
  };
  deviceTokens: string[];
  sunCards?: SunCard[];
}

interface SunCard {
  id: string;
  userId: string;
  cardType: 'innerChild' | 'chosenPurpose' | 'highestSelf';
  cardValue: string;
  meaning: string;
  personalSignificance: string;
  createdAt: Date;
}
```

### 4.2 Card Model

```typescript
interface Card {
  id: string;
  name: string;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king';
  basicMeaning: string;
  uprightMeaning: string;
  reversedMeaning?: string; // Premium feature
  keywords: string[];
  elementalAssociation: string;
  numerology: string;
  historicalContext?: string; // Premium feature
  imageUrl: string;
}

interface DailyCardSet {
  id: string;
  userId: string;
  date: Date;
  cards: DailyCard[];
  summary: string;
  isViewed: boolean;
  createdAt: Date;
}

interface DailyCard {
  cardValue: string;
  position: number;
  interpretation: string;
  affirmation: string;
}
```

### 4.3 Journal Entry Model

```typescript
interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood?: string;
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
  };
  attachedCards?: string[];
  attachedImages?: string[];
  privacyLevel: 'private' | 'friends' | 'public';
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments?: Comment[];
}

interface Comment {
  id: string;
  userId: string;
  displayName: string;
  content: string;
  createdAt: Date;
  likes: number;
}
```

### 4.4 Friend Connection Model

```typescript
interface FriendConnection {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
  compatibility?: {
    score: number;
    details?: string; // Premium or purchased
    lastCalculated: Date;
    isPurchased: boolean;
  };
  notes?: string;
}
```

## 5. Third-party Integrations

### 5.1 AI Chat Implementation

The "Katie The Card Lady" feature is implemented using OpenAI's API:

1. **Integration Architecture**
   - Client sends user messages to Firebase Cloud Function
   - Function prepares context (user profile, cards, history)
   - OpenAI API call with appropriate parameters
   - Response processing and formatting
   - Return to client with tracking of question limits

2. **Context Management**
   - Maintains conversation history for continuity
   - Includes relevant user data (Sun Cards, recent readings)
   - Manages token limits for efficient API usage

3. **Prompt Engineering**
   - Carefully designed system prompts for consistent character
   - Specialized prompts for different types of questions
   - Fallback mechanisms for unsupported queries

4. **Response Processing**
   - Content filtering for appropriate responses
   - Formatting for mobile display
   - Error handling and graceful degradation

5. **Usage Optimization**
   - Caching common responses
   - Tiered response complexity based on subscription status
   - Batched API calls for efficiency

### 5.2 Analytics

The application uses Firebase Analytics with custom event tracking:

1. **User Analytics**
   - Registration and onboarding completion
   - Feature usage and engagement
   - Session duration and frequency
   - Retention and churn tracking

2. **Content Analytics**
   - Card viewing patterns
   - Journal entry creation and sharing
   - Social interaction frequency
   - Premium content access

3. **Performance Analytics**
   - Screen load times
   - API response times
   - Error rates and types
   - Battery and network usage

4. **Conversion Analytics**
   - Free-to-premium conversion funnel
   - Feature-specific conversion rates
   - Subscription renewal patterns
   - A/B testing results

5. **Custom Dashboards**
   - Executive KPI dashboard
   - User engagement metrics
   - Revenue and conversion tracking
   - Feature popularity analysis

### 5.3 Payment Processing

The compatibility feature and premium subscription use native payment systems:

1. **In-App Purchase Implementation**
   - Integration with StoreKit (iOS) and Billing Library (Android)
   - Server-side receipt validation
   - Subscription management and tracking
   - Restore purchases functionality

2. **Payment Flow**
   - Clear presentation of purchase options
   - Streamlined checkout process
   - Receipt handling and storage
   - Purchase confirmation and feature activation

3. **Subscription Management**
   - Automatic renewal handling
   - Expiration notifications
   - Upgrade/downgrade logic
   - Cancellation processing

4. **Security Measures**
   - Server-side validation of all purchases
   - Secure storage of purchase records
   - Fraud prevention mechanisms
   - Compliance with platform guidelines

## 6. Performance Considerations

### 6.1 Caching Strategy

The application implements a multi-level caching strategy:

1. **Memory Caching**
   - In-memory cache for frequently accessed data
   - LRU (Least Recently Used) eviction policy
   - Size limits to prevent memory issues

2. **Persistent Caching**
   - AsyncStorage for offline data access
   - Structured storage with TTL (Time To Live)
   - Version-tagged cache for easy invalidation

3. **Image Caching**
   - React Native FastImage for efficient image caching
   - Preloading of critical images
   - Progressive loading for large images

4. **API Response Caching**
   - HTTP cache headers for network requests
   - Conditional requests with ETag/If-Modified-Since
   - Background refresh for semi-static data

5. **Cache Synchronization**
   - Timestamp-based synchronization
   - Delta updates for efficient data transfer
   - Conflict resolution strategies

### 6.2 Offline Functionality

The application provides robust offline capabilities:

1. **Offline Data Access**
   - Complete card database stored locally
   - Recent journal entries cached
   - User profile and Sun Cards available offline
   - Daily cards accessible without connection

2. **Offline Actions**
   - Journal entry creation and editing
   - Card reading and interpretation
   - Queuing of social actions for later sync

3. **Synchronization Strategy**
   - Background synchronization when connection restored
   - Conflict resolution with server-wins or merge strategies
   - Bandwidth-aware sync for metered connections

4. **User Experience**
   - Clear offline mode indicators
   - Graceful degradation of network-dependent features
   - Optimistic UI updates with rollback capability

5. **Data Integrity**
   - Transaction-based updates
   - Retry mechanisms for failed operations
   - Data validation before and after sync

### 6.3 Image Optimization

The application optimizes images for performance:

1. **Asset Management**
   - Multiple resolution variants for different devices
   - WebP format for reduced file size
   - SVG for UI elements where appropriate

2. **Loading Strategies**
   - Progressive loading for large images
   - Blur-up technique for smooth transitions
   - Placeholder system during loading

3. **Rendering Optimization**
   - Hardware-accelerated animations
   - Image downsampling for list views
   - Recycling of image components in lists

4. **Storage Efficiency**
   - Compression of user-uploaded images
   - Thumbnail generation for previews
   - Cleanup of unused temporary images

5. **Delivery Optimization**
   - CDN integration for card assets
   - Adaptive quality based on network conditions
   - Preloading of likely-to-be-viewed images