# AI Coding Agent Instructions

## Project Overview
This is a universal React Native app built with Expo Router that runs on iOS, Android, and Web. It uses react-native-reusables with NativeWind for styling and Better Auth for authentication.

## Key Architecture Patterns

### Method Parameters
- **Object Arguments**: Always use object destructuring for method parameters, especially for models and API calls
- **Multiple Parameters**: When a method takes multiple parameters, wrap them in an object for better maintainability
- **Type Safety**: Use TypeScript interfaces to define parameter shapes

Example:
```tsx
// ✅ Good - Object arguments
async fetchUserById({ id }: { id: string }): Promise<void>
async updateUser({ userId, updates }: { userId: string; updates: Partial<User> }): Promise<void>

// ❌ Avoid - Multiple loose parameters
async fetchUserById(id: string): Promise<void>
async updateUser(userId: string, updates: Partial<User>): Promise<void>
```

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

### State Management (Legend State)
- **Observable State**: Use `@legendapp/state` for reactive state management across the app
- **Model Pattern**: Create class-based models that mirror the Expo Router structure in `src/models/` with naming convention matching the route path (e.g., `admin/add-user.model.ts` for `admin/add-user` screen)
- **Model Instance Naming**: Use `$` suffix for model instances used in components (e.g., `userModel$`, `addUserModel$`) to clearly indicate observable state
- **API Integration**: Models handle API calls with observable state for loading, success, and error states. Methods should return `Promise<void>` and update observable status instead of returning boolean values
- **Side Effects**: Models should handle all side effects including toast notifications, navigation, and form resets. Keep containers focused purely on UI interactions
- **Performance**: Legend State provides fine-grained reactivity with minimal re-renders
- **No Hooks**: Avoid using React hooks; use Legend State observables directly for state management

Example model pattern:
```tsx
import { type Observable, observable } from "@legendapp/state";
import { router } from "expo-router";
import { toast } from "~/lib/sonner/sonner";
import type { ApiStatus } from "~/utils/api";

export class ExampleModel {
  obs: Observable<{
    status: ApiStatus;
    data?: YourDataType[];
    error?: ErrorType | null;
  }>;

  constructor() {
    this.obs = observable({
      status: "idle" as ApiStatus,
    });
  }

  async fetchData(): Promise<void> {
    this.obs.set({
      ...this.obs.peek(),
      status: "loading",
    });

    try {
      const response = await apiCall();
      this.obs.set({
        status: "success",
        data: response.data,
      });
      
      // Handle success side effects
      toast.success("Data loaded successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load data";
      this.obs.set({
        status: "error",
        error: errorMessage,
      });
      
      // Handle error side effects
      toast.error(errorMessage);
    }
  }

  async createItem(itemData: ItemData): Promise<void> {
    this.obs.status.set("loading");
    
    try {
      await apiCreateCall(itemData);
      this.obs.status.set("success");
      
      // Handle all side effects in the model
      toast.success("Item created successfully");
      this.resetForm();
      router.back();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create item";
      this.obs.set({
        status: "error",
        error: errorMessage,
      });
      toast.error(errorMessage);
    }
  }
}
```

Example container pattern:
```tsx
Example container pattern:
```tsx
// src/containers/admin/add-user.container.tsx
import { View } from "react-native";
import { observer } from "@legendapp/state/react";
import { addUserModel$ } from "~/models/admin/add-user.model";
import { UserForm } from "~/components/user-form";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

export const AddUserContainer = observer(() => {
  const { status, formData } = addUserModel$.obs.get();

  // Simple event handler - model handles all side effects
  const handleSubmit = async () => {
    await addUserModel$.createUser();
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <View className="flex-1 p-4">
      <UserForm 
        data={formData}
        onSubmit={handleSubmit}
      />
    </View>
  );
});
```
```

### File Structure & Routing
- **App Directory**: `src/app/` contains all routes using Expo Router file-based routing
- **Route Groups**: `(auth)` for authentication screens, `(tabs)` for main app navigation
- **Folder Structure Mirrors Routing**: Containers and models should mirror the Expo Router folder structure:
  - **Containers**: `src/containers/[route-path].container.tsx` (e.g., `admin/add-user.container.tsx` for `admin/add-user` screen)
  - **Models**: `src/models/[route-path].model.ts` (e.g., `admin/add-user.model.ts` for `admin/add-user` screen)
  - **Components**: Feature-specific components can be placed near their containers or in `src/components/` if reusable
- **Reusable Components**: Only truly reusable UI components in `src/components/ui/`
- **Platform Files**: Use `.ios.tsx`, `.web.ts` extensions for platform-specific implementations

### Universal Design Patterns
- **Platform Checks**: Use `Platform.OS` and `process.env.EXPO_OS` for conditional logic
- **Icons**: IconSymbol component maps SF Symbols (iOS) to Material Icons (other platforms)
- **Navigation**: Tab bar uses platform-specific blur effects via conditional components
- **Responsive**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) and NativeWind's responsive utilities
- **Platform-Specific Styles**: Use `web:` prefix for web-only styles, and conditional rendering for native-specific components
- **Native Components**: Always use React Native components (View, Text, Button, etc.) instead of HTML elements (div, span, button)
- **Error Handling**: Use toast notifications for displaying error messages to users

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
1. **Containers**: Create containers in `src/containers/` that mirror the Expo Router structure (e.g., `admin/add-user.container.tsx`)
2. **Models**: Create models in `src/models/` that mirror the Expo Router structure (e.g., `admin/add-user.model.ts`)
3. **Feature Components**: Place feature-specific components near their containers or in `src/components/` if used across multiple features
4. **Reusable UI Components**: Only truly reusable components go in `src/components/ui/` with proper TypeScript interfaces
5. **Styling**: Always use NativeWind's `className` prop with Tailwind utility classes
6. **Variants**: Define variants using `cva` (class-variance-authority) for type-safe component APIs
7. **Platform Support**: Consider all platforms (iOS/Android/Web) when using native APIs
8. **Authentication**: Use `authClient` hooks for auth state management
9. **State Management**: Use Legend State observables for reactive state management
10. **No Hooks**: Avoid using React hooks; use Legend State observables directly
11. **Native Components**: Always use React Native components (View, Text, Button, etc.) instead of HTML elements
12. **Error Handling**: Use toast notifications for error messages
13. **Folder Structure**: Mirror the Expo Router structure in containers and models folders

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
