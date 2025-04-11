### 3.2 Gestures

#### Tap Gestures
- **Standard Tap**: Primary interaction for buttons and controls
  - Visual feedback: Subtle highlight or glow effect
  - Haptic feedback: Light tap sensation
  - Animation: Slight scale down and up (95% to 100%)

- **Double Tap**: Used for quick actions on cards and journal entries
  - Double tap on card to flip between front and back
  - Double tap on journal entry to expand/collapse
  - Animation: Quick pulse effect with cosmic particles

- **Long Press**: Used for additional options and drag operations
  - Visual feedback: Growing cosmic glow around item
  - Haptic feedback: Medium duration vibration
  - Animation: Scale up slightly (105%) with particle effect
  - Context menu appears with cosmic reveal animation

#### Swipe Gestures
- **Horizontal Swipe**: Used for carousels and card navigation
  - Swipe between daily cards
  - Swipe between planets in the Planetary Path
  - Animation: Content follows finger with slight resistance
  - Edge effect: Cosmic glow when reaching the end of content

- **Vertical Swipe**: Used for scrolling and dismissing
  - Scroll through lists and detailed content
  - Swipe down to dismiss modals
  - Animation: Momentum-based scrolling with cosmic trail
  - Pull-to-refresh: Cosmic spinner animation

- **Multi-directional Swipe**: Used in special interactions
  - Swipe in any direction to explore cosmic map
  - Animation: Content moves with finger, cosmic particles follow

#### Pinch Gestures
- **Pinch to Zoom**: Used for detailed card viewing and cosmic map
  - Zoom in on card details
  - Zoom in/out of planetary visualization
  - Animation: Smooth scaling with cosmic particle effect
  - Haptic feedback at min/max zoom levels

#### Rotation Gestures
- **Two-finger Rotation**: Used for special card interactions
  - Rotate cards to see different perspectives
  - Rotate planetary system to view from different angles
  - Animation: Smooth rotation with cosmic trail effect
  - Haptic feedback at key rotation points (90°, 180°)

### 3.3 Animations and Transitions

#### Card Animations
- **Card Flip**: Transition between front and back of cards
  - Duration: 600ms
  - Easing: Custom ease-in-out with slight bounce
  - Effect: 3D perspective flip with cosmic particle burst at midpoint
  - Sound: Subtle mystical whoosh (optional, respects system settings)

- **Card Deal**: Animation for revealing new cards
  - Duration: 800ms
  - Easing: Custom ease-out with slight overshoot
  - Effect: Cards slide in from off-screen with trail effect
  - Sequence: Cards dealt one after another with 200ms delay

- **Card Glow**: Ambient animation for cards
  - Duration: Continuous, 3-second cycle
  - Effect: Subtle pulsing glow that shifts colors based on card energy
  - Intensity: Varies based on card significance and user interaction

#### Screen Transitions
- **Tab Transition**: Moving between main tabs
  - Duration: 300ms
  - Easing: Standard ease-in-out
  - Effect: Fade combined with slight slide
  - Special Effect: Cosmic particles flow in direction of transition

- **Push/Pop Transition**: Navigation stack transitions
  - Duration: 350ms
  - Easing: Ease-in-out
  - Push Effect: New screen slides in from right with cosmic trail
  - Pop Effect: Current screen slides out to right with fade

- **Modal Transition**: Presenting modal screens
  - Duration: 450ms
  - Easing: Custom spring effect
  - Present Effect: Rise from bottom with cosmic particles
  - Dismiss Effect: Slide down with fade out

#### Micro-Animations
- **Button Feedback**: Visual response to button presses
  - Duration: 200ms
  - Effect: Scale down to 95%, then up to 100% with cosmic glow
  - Particle Effect: Small burst of particles on press

- **Input Focus**: Animation when text fields receive focus
  - Duration: 250ms
  - Effect: Border glow with cosmic energy color
  - Label Animation: Float up and shrink with cosmic trail

- **Toggle States**: Animations for switches and toggles
  - Duration: 300ms
  - Effect: Cosmic slider with day/night theme transition
  - Particle Effect: Small burst when toggled on

#### Special Feature Animations
- **Compatibility Visualization**: Animation for friend compatibility
  - Duration: Initial animation 2s, then continuous subtle movement
  - Effect: Cosmic energy flows between user and friend avatars
  - Intensity: Varies based on compatibility percentage
  - Interaction: Responds to touch with energy ripples

- **Planetary Orbits**: Animation for Planetary Path
  - Duration: Continuous with varying speeds
  - Effect: Planets orbit with cosmic trails
  - Interaction: Responds to touch by focusing on selected planet
  - Special Effect: Energy lines connect planets to associated cards

- **Katie's Responses**: Animation for AI chat responses
  - Duration: Typing indicator 1-3s before response appears
  - Effect: Message bubbles appear with cosmic glow
  - Special Effect: Mystical particles appear when discussing cards

### 3.4 Loading States and Feedback

#### Loading Indicators
- **Primary Loader**: Main loading state for screen transitions
  - Visual: Orbital spinner with cosmic particles
  - Duration: Minimum 800ms display even for fast loads
  - Animation: Continuous rotation with pulsing glow
  - Placement: Center of screen with subtle background blur

- **Inline Loader**: Used within UI components
  - Visual: Smaller orbital spinner or pulsing cosmic dot
  - Animation: Rotation or pulse with subtle particle effect
  - Placement: Replaces content being loaded or appears adjacent

- **Progress Bar**: Used for longer operations
  - Visual: Cosmic gradient fill with subtle glow
  - Animation: Smooth fill with particle effects along leading edge
  - States: Determinate (when progress known) and indeterminate (continuous flow)

#### Skeleton Screens
- **Card Skeleton**: Placeholder for loading cards
  - Visual: Card outline with cosmic pulse animation
  - Animation: Subtle glow that moves across the skeleton
  - Transition: Smooth fade out as real content loads in

- **List Skeleton**: Placeholder for loading lists
  - Visual: Simplified list items with cosmic pulse
  - Animation: Staggered appearance and pulsing effect
  - Transition: Items fade in one by one as they load

#### Feedback Mechanisms
- **Success Feedback**: Confirmation of completed actions
  - Visual: Cosmic checkmark with particle burst
  - Animation: Quick appear (200ms) with glow effect
  - Haptic: Success pattern (medium tap)
  - Duration: Visible for 2 seconds before fading

- **Error Feedback**: Indication of failed actions
  - Visual: Cosmic alert symbol with pulsing glow
  - Animation: Quick appear with attention-grabbing pulse
  - Haptic: Error pattern (three short taps)
  - Duration: Visible until dismissed or for 3 seconds

- **Toast Notifications**: Non-blocking feedback
  - Visual: Pill-shaped container with cosmic styling
  - Animation: Slide in from top, hover, slide out
  - Duration: Visible for 3 seconds (informational) or until dismissed (actionable)
  - Interaction: Swipe to dismiss, tap to act on actionable toasts

#### Empty States
- **First-time Empty State**: When user has no content yet
  - Visual: Illustrated cosmic scene related to the feature
  - Animation: Subtle continuous animation in illustration
  - Content: Friendly explanation and clear call to action
  - Button: Primary action button with cosmic styling

- **Filtered Empty State**: When filters return no results
  - Visual: Simplified cosmic illustration
  - Animation: Subtle particle effects
  - Content: Explanation of why no results appear
  - Action: Suggestion to modify filters or try different search

## 4. Accessibility Considerations

### 4.1 Color Contrast Requirements

#### Text Contrast
- **Primary Text**: Minimum contrast ratio of 4.5:1 against backgrounds
  - Body text: Space White (#f8f9fa) on Starfield Black (#111827) = 16:1
  - Headings: Deep Purple (#6366f1) on Space White (#f8f9fa) = 4.5:1
  - Secondary text: Ensure minimum 4.5:1 even for less prominent text

- **Interactive Elements**: Minimum contrast ratio of 3:1 against adjacent colors
  - Buttons: Maintain clear distinction between states
  - Form controls: Ensure borders and fills have sufficient contrast
  - Focus states: High-contrast focus indicators (not relying solely on color)

#### Color Combinations
- **Cosmic Palette Accessibility**: Ensure cosmic colors meet contrast requirements
  - Provide alternative high-contrast cosmic palette for accessibility mode
  - Test all gradient combinations for sufficient contrast at endpoints
  - Avoid problematic color combinations (red/green, blue/yellow) for key information

- **Dark Mode Considerations**: Ensure dark mode maintains or improves contrast
  - Increase contrast of subtle elements in dark mode
  - Test cosmic effects and glows for sufficient visibility
  - Provide high-contrast dark mode option with reduced visual effects

#### Non-Text Contrast
- **UI Controls**: Ensure 3:1 contrast for boundaries of active controls
  - Button borders and fills distinct from backgrounds
  - Card boundaries clearly visible against backgrounds
  - Interactive elements distinguishable from decorative elements

- **Informational Graphics**: Ensure cosmic visualizations maintain clarity
  - Compatibility visualizations readable without relying on color alone
  - Planetary path elements distinguishable by shape and position, not just color
  - Card suit symbols identifiable by shape in addition to color

### 4.2 Touch Target Sizes

#### Primary Interactive Elements
- **Buttons**: Minimum touch target size of 44×44 points
  - Primary buttons: 48px height with adequate width for content
  - Icon buttons: 44×44px minimum
  - Padding: Ensure adequate spacing between adjacent touch targets (minimum 8px)

- **Tab Bar Items**: Minimum touch target size of 44×44 points
  - Tab icons: Centered within larger touch area
  - Active indicator: Does not reduce touch target size
  - Equal spacing between tabs to prevent accidental taps

#### Form Controls
- **Text Inputs**: Minimum height of 44 points
  - Text field height: 56px for primary inputs
  - Clear button: 44×44px touch target within input
  - Adequate spacing between adjacent form fields (minimum 16px)

- **Selection Controls**: Minimum touch target size of 44×44 points
  - Checkboxes and radio buttons: Cosmic design with adequate touch area
  - Toggles: 44px height with proportional width
  - Sliders: 44px vertical touch area along track

#### Card Interactions
- **Playing Cards**: Ensure adequate tap areas for card actions
  - Card faces: Entire card is tappable
  - Card actions: Buttons minimum 44×44px
  - Swipe area: Full width of screen for card carousel

- **Small UI Elements**: Expand touch targets beyond visual boundaries
  - Small icons: Invisible touch area extends to 44×44px minimum
  - Links in text: Increased line height and padding to ensure tappable area
  - Close buttons: Minimum 44×44px regardless of visual size

### 4.3 Screen Reader Support

#### Semantic Structure
- **Proper Hierarchy**: Logical heading structure throughout the app
  - Screen titles: H1 level
  - Section headings: H2 level
  - Subsections: H3 and below as appropriate
  - Lists: Properly structured for screen reader navigation

- **Landmark Regions**: Define regions for screen reader navigation
  - Main content area
  - Navigation areas
  - Search functionality
  - Complementary content

#### Text Alternatives
- **Images and Graphics**: Meaningful alt text for all images
  - Card images: Describe card name, suit, and key visual elements
  - Decorative images: Mark as decorative to be skipped by screen readers
  - Complex visualizations: Provide text summaries of key information

- **Icons and Symbols**: Ensure all icons have text labels or descriptions
  - Navigation icons: Clear labels matching tab names
  - Action icons: Descriptive labels explaining function
  - Status icons: Text describing the status they represent

#### Interactive Elements
- **Custom Controls**: Ensure all custom controls are properly accessible
  - ARIA roles: Appropriate roles for custom UI elements
  - States: Communicate selected, expanded, and disabled states
  - Focus management: Logical focus order and visible focus indicators

- **Dynamic Content**: Announce dynamic content changes
  - Card reveals: Announce new cards when revealed
  - Chat messages: Notify when new messages arrive
  - Errors and confirmations: Announce feedback messages

#### Special Considerations
- **Card Readings**: Provide comprehensive text descriptions
  - Card meanings: Full text alternatives to visual card representations
  - Card relationships: Describe spatial relationships between cards
  - Interpretations: Ensure all mystical content is available as text

- **Cosmic Visualizations**: Ensure information is not conveyed by visuals alone
  - Compatibility: Numeric and text descriptions of compatibility
  - Planetary path: Text descriptions of planetary influences
  - Animations: Ensure no critical information is conveyed only through animation

### 4.4 Reduced Motion Options

#### Motion Reduction Settings
- **System Integration**: Respect system-level reduced motion settings
  - iOS: Respect Reduce Motion accessibility setting
  - Android: Respect Remove Animations system setting
  - Automatic detection and application without user configuration

- **App-Specific Controls**: Provide in-app motion control
  - Granular settings: Allow users to customize animation intensity
  - Categories: Separate settings for essential vs. decorative animations
  - Presets: Offer "Minimal," "Moderate," and "Full" animation options

#### Essential vs. Decorative Motion
- **Essential Motion**: Simplified versions of functional animations
  - Navigation: Simple fades instead of complex transitions
  - State changes: Basic transitions without particle effects
  - Progress indicators: Simple spinners without cosmic effects

- **Decorative Motion**: Can be fully disabled
  - Background effects: Static backgrounds instead of animated cosmic scenes
  - Particle effects: Removed entirely in reduced motion mode
  - Ambient animations: Disabled pulsing, glowing, and floating effects

#### Alternative Experiences
- **Static Alternatives**: Non-animated versions of key visual elements
  - Cards: Static images without flip or deal animations
  - Compatibility visualization: Static graphic instead of flowing energy
  - Planetary path: Fixed planetary positions without orbital movement

- **Transition Alternatives**: Gentler transitions for reduced motion
  - Cross-fades: Replace slide transitions with simple fades
  - Instant changes: Option to disable transitions completely
  - Reduced duration: Shorter animation times for necessary transitions

## 5. Responsive Design Approach

### 5.1 Adaptations for Different Screen Sizes

#### Device Categories
- **Small Phones** (320-375pt width)
  - Compact layouts with essential content prioritized
  - Single-column designs throughout
  - Reduced padding and margins (16px standard)
  - Simplified card visualizations
  - Vertically stacked controls

- **Standard Phones** (375-428pt width)
  - Balanced layouts with full feature presentation
  - Single-column with occasional side-by-side elements
  - Standard padding and margins (20px standard)
  - Complete card visualizations
  - Horizontally arranged controls where space permits

- **Large Phones** (428pt+ width)
  - Expanded layouts utilizing additional space
  - Occasional two-column arrangements for related content
  - Generous padding and margins (24px standard)
  - Enhanced card visualizations with additional details
  - Comfortable spacing between interactive elements

- **Tablets** (768pt+ width)
  - Two-column layouts for major sections
  - Side-by-side content where contextually appropriate
  - Master-detail views for appropriate screens
  - Large card visualizations with rich details
  - Expanded cosmic visualizations

#### Layout Adaptations
- **Card Displays**: Adapt card size and arrangement
  - Small screens: Cards fill width with minimal margins
  - Medium screens: Cards with comfortable margins
  - Large screens: Cards maintain optimal size with increased spacing
  - Tablets: Multiple cards visible simultaneously where appropriate

- **Navigation Elements**: Adjust navigation patterns
  - Small screens: Compact tab bar with minimal labels
  - Standard screens: Full tab bar with labels
  - Large screens: Tab bar with labels and subtle additional details
  - Tablets: Consider side navigation for some contexts

- **Content Density**: Adjust information presentation
  - Small screens: Focus on essential information
  - Standard screens: Balance between information and aesthetics
  - Large screens: Include additional contextual information
  - Tablets: Rich information presentation with spatial organization

#### Responsive Components
- **Cards**: Scale appropriately across device sizes
  - Maintain aspect ratio while scaling
  - Ensure text remains readable at all sizes
  - Adjust detail level based on available space

- **Input Controls**: Adapt to available width
  - Full-width inputs on smaller screens
  - Appropriately sized inputs on larger screens
  - Side-by-side fields where appropriate on tablets

- **Modals and Dialogs**: Size appropriately for device
  - Full-screen on small devices
  - Partial screen with margins on standard devices
  - Centered with maximum width on large devices and tablets

### 5.2 Orientation Changes

#### Portrait Orientation
- **Primary Orientation**: Optimized for vertical holding
  - Vertical scrolling for main content
  - Full-width cards and components
  - Bottom tab navigation
  - Stacked content sections

- **Content Priority**: Focus on primary content
  - Minimal supplementary information
  - Progressive disclosure of additional details
  - Vertical navigation through content

#### Landscape Orientation
- **Adapted Layouts**: Reorganized for horizontal space
  - Side-by-side content where appropriate
  - Horizontal scrolling for card carousels
  - Maintained tab navigation (bottom or side)
  - Reduced vertical scrolling where possible

- **Special Experiences**: Enhanced landscape views
  - Expanded card detail view with side-by-side information
  - Immersive planetary path visualization
  - Two-column chat interface with persistent conversation history
  - Side-by-side journal editor and preview

#### Transition Between Orientations
- **Smooth Reflow**: Graceful layout adaptation
  - Maintain user's place in content
  - Smooth animation for layout changes (respecting reduced motion settings)
  - Preserve scroll position and focused elements

- **State Preservation**: Maintain user context during rotation
  - Keep selected cards visible
  - Preserve input field contents and focus
  - Maintain navigation position

#### Orientation-Specific Features
- **Portrait-Optimized**: Features designed for vertical holding
  - Card dealing animations
  - Vertical scrolling journal entries
  - Stacked compatibility visualization

- **Landscape-Enhanced**: Features that leverage horizontal space
  - Side-by-side card comparisons
  - Expanded planetary visualization
  - Timeline view of journal entries
  - Wider keyboard for chat input
