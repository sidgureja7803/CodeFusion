# CodeFusion UI Guidelines

This document outlines the UI design standards for the CodeFusion project to ensure a consistent, professional user experience across all components.

## Table of Contents
1. [Design System](#design-system)
2. [Component Usage](#component-usage)
3. [Layout Principles](#layout-principles)
4. [Color Usage](#color-usage)
5. [Typography](#typography)
6. [Animations](#animations)
7. [Dark Mode](#dark-mode)

## Design System

The CodeFusion design system is defined in `src/styles/design-system.css` and provides CSS variables for:
- Colors (primary, gray scale, semantic colors)
- Typography (fonts, sizes, weights)
- Spacing
- Border radius
- Shadows
- Z-index
- Transitions

Always use these variables for consistent styling instead of hardcoded values.

## Component Usage

### Standardized Components
Use the components defined in `src/components/UI/StandardComponents.jsx` for consistent UI elements:

```jsx
import { 
  Button, 
  AnimatedButton,
  Card, 
  AnimatedCard, 
  Input,
  Badge,
  Alert,
  DifficultyBadge,
  Spinner,
  Divider
} from '../components/UI/StandardComponents';

// Example usage
<AnimatedButton variant="primary" onClick={handleClick}>
  Submit
</AnimatedButton>

<DifficultyBadge difficulty="MEDIUM" />
```

### Component Guidelines

1. **Buttons**
   - Use `AnimatedButton` for interactive elements that benefit from motion
   - Choose appropriate variants: primary (main actions), secondary (alternative actions), danger (destructive actions)
   - Include icons for visual clarity where appropriate

2. **Cards**
   - Use `AnimatedCard` for content that should appear with a transition
   - Maintain consistent padding (normal for most cases)
   - Group related information within cards

3. **Forms**
   - Use the standard `Input` component with labels and validation
   - Group related fields visually
   - Provide clear validation messages

4. **Loading States**
   - Use the `Spinner` component for loading states
   - Implement skeleton screens for content loading where appropriate

## Layout Principles

1. **Responsive Design**
   - Use Tailwind's responsive prefixes for different screen sizes
   - Mobile-first approach (design for small screens first)
   - Test layouts across multiple device sizes

2. **Grid System**
   - Use CSS Grid for two-dimensional layouts
   - Use Flexbox for one-dimensional layouts
   - Maintain consistent gutters between elements

3. **Spacing**
   - Use spacing variables (`--cf-space-*`) from the design system
   - Maintain breathing room around components
   - Use consistent spacing for related elements

## Color Usage

1. **Primary Colors**
   - Use primary colors for interactive elements and important UI components
   - Lighter shades for backgrounds, darker for text and actions

2. **Semantic Colors**
   - Use success (green) for positive actions/outcomes
   - Use warning (amber) for cautionary states
   - Use error (red) for errors and destructive actions
   - Use info (blue) for informational states

3. **Difficulty Colors**
   - Easy: Green (#10b981)
   - Medium: Amber (#f59e0b)
   - Hard: Red (#ef4444)

## Typography

1. **Font Families**
   - Sans-serif (`--cf-font-sans`) for general UI text
   - Monospace (`--cf-font-mono`) for code snippets and editor

2. **Font Sizes**
   - Use the defined size scale (`--cf-text-*`)
   - Headings: 2xl-4xl
   - Body text: base-lg
   - UI elements: sm-base
   - Meta text: xs-sm

3. **Font Weights**
   - Headings: medium to bold (500-700)
   - Body: normal to medium (400-500)
   - Buttons: medium (500)

## Animations

1. **Guidelines**
   - Keep animations subtle and quick (150-300ms)
   - Use animations to provide feedback, not for decoration
   - Ensure animations don't interfere with usability
   - Consider users who prefer reduced motion

2. **Common Patterns**
   - Hover effects: scale slightly (1.02x)
   - Click feedback: scale down slightly (0.98x)
   - Page transitions: fade in + slide up
   - Component mounting: fade in + subtle movement

## Dark Mode

1. **Implementation**
   - Use the `dark:` Tailwind prefix for dark mode styling
   - Use CSS variables with dark mode alternatives

2. **Color Adjustments**
   - Background should be dark (gray-900 to gray-800)
   - Text should be light (gray-50 to gray-300)
   - Reduce contrast slightly compared to light mode
   - Maintain color semantics (red still means error, etc.)

3. **Testing**
   - Test all components in both light and dark mode
   - Ensure sufficient contrast in both modes

---

By following these guidelines, we'll maintain a consistent and professional UI across the CodeFusion application. For any questions or suggestions regarding the UI standards, please reach out to the design team.
