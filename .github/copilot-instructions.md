# AI Coding Agent Instructions

## Project Overview
This is a universal React Native app built with Expo Router that runs on iOS, Android, and Web. It uses react-native-unistyles v3 for styling and Better Auth for authentication.

## Key Architecture Patterns

### Styling System (react-native-unistyles v3)
- **Theme Configuration**: Themes are defined in `theme.ts` using @radix-ui/colors, configured in `unistyles.ts`
- **Component Patterns**: All UI components use `StyleSheet.create((theme) => ({...}))` with variant support
- **Variant Implementation**: Use `UnistylesVariants<typeof styles>` for type-safe props after stylesheet definition
- **Theme Access**: Use `useUnistyles()` hook to access theme in components without styles

Example component pattern:
```tsx
const styles = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.primary,
    variants: {
      variant: { primary: {...}, secondary: {...} },
      size: { sm: {...}, lg: {...} }
    }
  }
}));

type Props = UnistylesVariants<typeof styles> & PressableProps;
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
- **Responsive**: Breakpoints defined in `breakpoints.ts`, used in unistyles responsive syntax

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
2. **Styling**: Always use react-native-unistyles v3 syntax with theme access
3. **Variants**: Define variants in stylesheet, extract types with `UnistylesVariants`
4. **Platform Support**: Consider all platforms (iOS/Android/Web) when using native APIs
5. **Authentication**: Use `authClient` hooks for auth state management

### Theme Customization
- **Colors**: Extend theme colors in `theme.ts` using Radix UI color system
- **Spacing**: Use `theme.padding(n)` and `theme.gap(n)` functions for consistent spacing
- **Typography**: Access via `theme.fontSize`, `theme.fontWeight`, etc.
- **Responsive**: Use breakpoint objects `{ xs: value, sm: value }` in styles

### Common Gotchas
- Import unistyles config in app entry: `import "./unistyles"` in `index.ts`
- UnistylesVariants type must be defined AFTER the stylesheet
- Better Auth requires platform-specific plugin setup for native vs web
- Expo Router requires specific file naming conventions for routing
- Web-specific styles use `_web` key with pseudo-selectors like `_hover`

### Build Considerations
- EAS Build configured for preview/production deployments
- Metro configured for CSS support, package exports, and .mjs files
- Babel plugin for unistyles processes imports and enables optimizations
- TypeScript paths configured for `@/*` imports from project root
