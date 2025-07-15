# NavigationMenu Component

A web-only React Native navigation menu component built with unistyles v3, inspired by Radix UI's NavigationMenu.

## Features

- **Hover interactions** with configurable delay
- **Keyboard navigation** support
- **Animated transitions** using CSS animations
- **Multiple column layouts** for dropdown content
- **Theme integration** with unistyles
- **Accessibility** attributes
- **Platform-specific** (Web only)

## Basic Usage

```tsx
import { NavigationMenu } from './NavigationMenu.web';
import { View, Text } from 'react-native';

const MyNavigation = () => {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        {/* Dropdown Menu Item */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <Text>Products</Text>
            <NavigationMenu.CaretDown />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.ListContainer columns={2}>
              <NavigationMenu.ListItem 
                title="Component Library" 
                href="/components"
              >
                Pre-built UI components for React Native
              </NavigationMenu.ListItem>
              
              <NavigationMenu.ListItem 
                title="Design System" 
                href="/design"
              >
                Complete design tokens and guidelines
              </NavigationMenu.ListItem>
            </NavigationMenu.ListContainer>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Simple Link */}
        <NavigationMenu.Item>
          <NavigationMenu.Link href="/about">
            <Text>About</Text>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator />
      </NavigationMenu.List>

      {/* Required viewport for positioning */}
      <View style={{ position: 'absolute', top: '100%', left: 0, width: '100%' }}>
        <NavigationMenu.Viewport />
      </View>
    </NavigationMenu.Root>
  );
};
```

## Advanced Example with Callout

```tsx
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>
        <Text>Learn</Text>
        <NavigationMenu.CaretDown />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.ListContainer columns={2}>
          {/* Featured callout */}
          <NavigationMenu.Callout
            href="/getting-started"
            title="Getting Started"
            description="Quick setup guide for your first project"
          >
            <View style={{ 
              width: 40, 
              height: 40, 
              backgroundColor: '#007AFF', 
              borderRadius: 8 
            }} />
          </NavigationMenu.Callout>

          {/* Regular list items */}
          <NavigationMenu.ListItem title="Documentation" href="/docs">
            Complete API reference and guides
          </NavigationMenu.ListItem>
          
          <NavigationMenu.ListItem title="Examples" href="/examples">
            Code samples and use cases
          </NavigationMenu.ListItem>
        </NavigationMenu.ListContainer>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

## Component API

### NavigationMenu.Root

The root container for the navigation menu.

**Props:**
- `value?: string` - Controlled active value
- `defaultValue?: string` - Default active value  
- `onValueChange?: (value: string) => void` - Value change handler
- `orientation?: 'horizontal' | 'vertical'` - Layout orientation
- `dir?: 'ltr' | 'rtl'` - Text direction
- `delayDuration?: number` - Hover delay in ms (default: 200)

### NavigationMenu.List

Container for navigation items with optional indicator.

### NavigationMenu.Item

Wrapper for individual menu items. Auto-generates unique value if not provided.

**Props:**
- `value?: string` - Unique identifier for the item

### NavigationMenu.Trigger

Clickable trigger that opens/closes content on hover/click.

**Props:**
- `onPress?: () => void` - Click handler

### NavigationMenu.Content

Dropdown content that appears when item is active.

### NavigationMenu.Link

Simple navigation link without dropdown content.

**Props:**
- `href?: string` - URL to navigate to
- `onPress?: () => void` - Click handler

### NavigationMenu.ListContainer

Grid container for organizing content in columns.

**Props:**
- `columns?: 1 | 2 | 3` - Number of columns (default: 1)

### NavigationMenu.ListItem

Individual item within dropdown content.

**Props:**
- `title?: string` - Item heading
- `href?: string` - URL to navigate to
- `onPress?: () => void` - Click handler

### NavigationMenu.Callout

Featured content block with gradient background.

**Props:**
- `title?: string` - Callout heading
- `description?: string` - Callout description
- `href?: string` - URL to navigate to
- `onPress?: () => void` - Click handler

### NavigationMenu.CaretDown

Animated caret icon that rotates when menu is open.

**Props:**
- `size?: number` - Icon size (default: 12)

### NavigationMenu.Indicator

Animated indicator that highlights the active item.

### NavigationMenu.Viewport

Required viewport for positioning dropdown content.

## Styling

The component uses unistyles v3 with your theme configuration. Key theme tokens used:

- `theme.colors.background` - Menu background
- `theme.colors.text` - Text color
- `theme.colors.accent` - Hover states
- `theme.colors.primary` - Primary actions
- `theme.colors.ring` - Focus rings
- `theme.padding()` - Spacing function
- `theme.borderRadius` - Border radius values

## Platform Support

This component is **web-only** and will throw an error if used on mobile platforms. Navigation patterns like dropdown menus don't translate well to mobile interfaces.

## Accessibility

- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Hover and focus states

## Notes

- Requires `Platform.OS === 'web'` check before use
- Uses CSS animations for smooth transitions
- Supports RTL text direction
- Integrates with your existing unistyles theme
