# AI Coding Agent Instructions

## Project Overview
This is a universal React Native app built with Expo Router that runs on iOS, Android, and Web. It uses react-native-reusables with NativeWind for styling and Better Auth for authentication.

## Key Architecture Patterns

### Styling System (NativeWind + react-native-reusables)
- **Theme Configuration**: Themes are configured using Tailwind CSS configuration in `tailwind.config.js` with CSS custom properties
- **Component Patterns**: UI components use NativeWind's `className` prop with Tailwind utility classes
- **Reusable Components**: Built on top of react-native-reusables which provides unstyled, accessible components
- **Variant Implementation**: Use `cva` (class-variance-authority) for creating variant-based component APIs
- **Theme Access**: Access theme values through CSS custom properties and Tailwind utilities

Example component pattern:
```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { Pressable } from "react-native";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> & PressableProps;
```

### Authentication (Better Auth)
- **Client Setup**: Auth client in `src/lib/auth-client.ts` with platform-specific plugins
- **Expo Integration**: Uses SecureStore for native, web storage for web via conditional plugins
- **Session Management**: Use `authClient.useSession()` hook for session state
- **Auth Flow**: File-based routing with `(auth)` group for sign-in/sign-up screens

### File Structure & Routing
- **App Directory**: `src/app/` contains all routes using Expo Router file-based routing
- **Route Groups**: `(auth)` for authentication screens, `(tabs)` for main app navigation
- **Components**: UI components in `src/components/ui/` follow React.forwardRef pattern with displayName
- **Platform Files**: Use `.ios.tsx`, `.web.ts` extensions for platform-specific implementations

### Universal Design Patterns
- **Platform Checks**: Use `Platform.OS` and `process.env.EXPO_OS` for conditional logic
- **Icons**: IconSymbol component maps SF Symbols (iOS) to Material Icons (other platforms)
- **Navigation**: Tab bar uses platform-specific blur effects via conditional components
- **Responsive**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) and NativeWind's responsive utilities
- **Platform-Specific Styles**: Use `web:` prefix for web-only styles, and conditional rendering for native-specific components

## Development Workflow

### Essential Commands
```bash
npx expo start              # Start development server
npx expo run:ios           # Build and run iOS
npx expo run:android       # Build and run Android
npx expo start --web       # Run web version
npx expo prebuild --clean  # Regenerate native directories
npm run reset-project      # Reset to blank starter
```

### Component Creation Guidelines
1. **UI Components**: Place in `src/components/ui/` with proper TypeScript interfaces
2. **Styling**: Always use NativeWind's `className` prop with Tailwind utility classes
3. **Variants**: Define variants using `cva` (class-variance-authority) for type-safe component APIs
4. **Platform Support**: Consider all platforms (iOS/Android/Web) when using native APIs
5. **Authentication**: Use `authClient` hooks for auth state management

### Theme Customization
- **Colors**: Define theme colors in `tailwind.config.js` using CSS custom properties
- **Spacing**: Use Tailwind's spacing utilities (`p-4`, `m-2`, `gap-3`, etc.)
- **Typography**: Use Tailwind's typography utilities (`text-lg`, `font-semibold`, etc.)
- **Dark Mode**: Toggle between light/dark themes using `className` conditionals and CSS variables

### Common Gotchas
- **NativeWind Setup**: Ensure `global.css` is properly imported in the app entry point
- **Class Name Conflicts**: Use platform-specific prefixes (`web:`, `ios:`, `android:`) for conditional styles
- **Better Auth**: Requires platform-specific plugin setup for native vs web storage
- **Expo Router**: Requires specific file naming conventions for routing
- **Component Imports**: Import UI components from `@/src/components/ui/` using path aliases

### Build Considerations
- **EAS Build**: Configured for preview/production deployments
- **Metro Config**: Configured for CSS support, package exports, and .mjs files
- **NativeWind**: Babel and Metro plugins configured for Tailwind CSS compilation
- **TypeScript**: Path aliases configured for `@/*` imports from project root
