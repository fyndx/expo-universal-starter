import * as React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

// Context for Navigation Menu state
type NavigationMenuContextValue = {
	value: string;
	onValueChange: (value: string) => void;
	onTriggerEnter: (itemValue: string) => void;
	onTriggerLeave: () => void;
	onContentEnter: () => void;
	onContentLeave: () => void;
	orientation: "horizontal" | "vertical";
	dir: "ltr" | "rtl";
};

const NavigationMenuContext =
	React.createContext<NavigationMenuContextValue | null>(null);

const useNavigationMenuContext = () => {
	const context = React.useContext(NavigationMenuContext);
	if (!context) {
		throw new Error(
			"NavigationMenu components must be used within NavigationMenu.Root",
		);
	}
	return context;
};

// Item context for managing individual menu items
type NavigationMenuItemContextValue = {
	value: string;
	triggerRef: React.RefObject<React.ElementRef<typeof Pressable> | null>;
	contentRef: React.RefObject<React.ElementRef<typeof View> | null>;
};

const NavigationMenuItemContext =
	React.createContext<NavigationMenuItemContextValue | null>(null);

const useNavigationMenuItemContext = () => {
	const context = React.useContext(NavigationMenuItemContext);
	if (!context) {
		throw new Error(
			"NavigationMenu item components must be used within NavigationMenu.Item",
		);
	}
	return context;
};

// Styles
const styles = StyleSheet.create((theme) => ({
	root: {
		position: "relative",
		justifyContent: "center",
		width: "100%",
		zIndex: 1,
	},
	list: {
		justifyContent: "center",
		backgroundColor: theme.colors.background,
		padding: theme.padding(1),
		borderRadius: theme.borderRadius.md,
		flexDirection: "row",
		shadowColor: theme.colors.shadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
		variants: {
			orientation: {
				horizontal: {
					flexDirection: "row",
				},
				vertical: {
					flexDirection: "column",
				},
			},
		},
	},
	item: {
		position: "relative",
	},
	trigger: {
		paddingHorizontal: theme.padding(3),
		paddingVertical: theme.padding(2),
		fontWeight: "500",
		lineHeight: 1,
		borderRadius: theme.borderRadius.sm,
		fontSize: 15,
		color: theme.colors.text,
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "space-between",
		gap: theme.padding(1),
		_web: {
			cursor: "pointer",
			userSelect: "none",
			outline: "none",
			_hover: {
				backgroundColor: theme.colors.accent,
			},
			_focus: {
				boxShadow: `0 0 0 2px ${theme.colors.ring}`,
			},
		},
	},
	link: {
		paddingHorizontal: theme.padding(3),
		paddingVertical: theme.padding(2),
		borderRadius: theme.borderRadius.sm,
		fontSize: 15,
		lineHeight: 1,
		color: theme.colors.text,
		backgroundColor: "transparent",
		textDecorationLine: "none",
		_web: {
			cursor: "pointer",
			userSelect: "none",
			outline: "none",
			_hover: {
				backgroundColor: theme.colors.accent,
			},
			_focus: {
				boxShadow: `0 0 0 2px ${theme.colors.ring}`,
			},
		},
	},
	content: {
		position: "absolute",
		top: "100%",
		left: 0,
		width: "100%",
		marginTop: theme.padding(2),
		backgroundColor: theme.colors.background,
		borderRadius: theme.borderRadius.md,
		padding: theme.padding(6),
		shadowColor: theme.colors.shadow,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.15,
		shadowRadius: 20,
		elevation: 10,
		zIndex: 50,
		_web: {
			animationDuration: "250ms",
			animationTimingFunction: "ease",
			transformOrigin: "top center",
		},
		variants: {
			state: {
				open: {
					opacity: 1,
					transform: [{ scale: 1 }],
					_web: {
						animationName: "scaleIn",
					},
				},
				closed: {
					opacity: 0,
					transform: [{ scale: 0.95 }],
					_web: {
						animationName: "scaleOut",
					},
				},
			},
		},
	},
	viewport: {
		position: "absolute",
		display: "flex",
		justifyContent: "center",
		width: "100%",
		top: "100%",
		left: 0,
		_web: {
			perspective: "2000px",
		},
	},
	indicator: {
		alignItems: "flex-end",
		justifyContent: "center",
		height: 10,
		top: "100%",
		overflow: "hidden",
		zIndex: 1,
		_web: {
			transition: "width 250ms ease, transform 250ms ease",
		},
		variants: {
			state: {
				visible: {
					_web: {
						animationName: "fadeIn",
						animationDuration: "200ms",
						animationTimingFunction: "ease",
					},
				},
				hidden: {
					_web: {
						animationName: "fadeOut",
						animationDuration: "200ms",
						animationTimingFunction: "ease",
					},
				},
			},
		},
	},
	arrow: {
		position: "relative",
		top: "70%",
		backgroundColor: theme.colors.background,
		width: 10,
		height: 10,
		borderTopLeftRadius: 2,
		_web: {
			transform: "rotate(45deg)",
		},
	},
	caretDown: {
		position: "relative",
		color: theme.colors.mutedForeground,
		top: 1,
		_web: {
			transition: "transform 250ms ease",
		},
		variants: {
			open: {
				true: {
					_web: {
						transform: "rotate(-180deg)",
					},
				},
				false: {
					_web: {
						transform: "rotate(0deg)",
					},
				},
			},
		},
	},
	listContainer: {
		flexDirection: "column",
		gap: theme.padding(2),
		_web: {
			display: "flex",
		},
		variants: {
			columns: {
				1: {
					_web: {
						gridTemplateColumns: "1fr",
					},
				},
				2: {
					_web: {
						display: "grid",
						gridTemplateColumns: "0.75fr 1fr",
						columnGap: theme.padding(2),
					},
				},
				3: {
					_web: {
						display: "grid",
						gridAutoFlow: "column",
						gridTemplateRows: "repeat(3, 1fr)",
						columnGap: theme.padding(2),
					},
				},
			},
		},
	},
	listItem: {
		padding: theme.padding(3),
		borderRadius: theme.borderRadius.md,
		fontSize: 15,
		lineHeight: 1,
		textDecorationLine: "none",
		_web: {
			cursor: "pointer",
			userSelect: "none",
			outline: "none",
			_hover: {
				backgroundColor: theme.colors.accent,
			},
			_focus: {
				boxShadow: `0 0 0 2px ${theme.colors.ring}`,
			},
		},
	},
	listItemHeading: {
		fontWeight: "500",
		lineHeight: 1.2,
		marginBottom: theme.padding(1),
		color: theme.colors.text,
	},
	listItemText: {
		color: theme.colors.mutedForeground,
		lineHeight: 1.4,
		fontSize: 14,
	},
	callout: {
		justifyContent: "flex-end",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		borderRadius: theme.borderRadius.md,
		padding: theme.padding(6),
		textDecorationLine: "none",
		_web: {
			cursor: "pointer",
			userSelect: "none",
			background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
			outline: "none",
			_focus: {
				boxShadow: `0 0 0 2px ${theme.colors.ring}`,
			},
		},
	},
	calloutHeading: {
		color: theme.colors.onPrimary,
		fontSize: 18,
		fontWeight: "500",
		lineHeight: 1.2,
		marginTop: theme.padding(4),
		marginBottom: theme.padding(2),
	},
	calloutText: {
		color: theme.colors.mutedForeground,
		fontSize: 14,
		lineHeight: 1.3,
	},
}));

type RootProps = UnistylesVariants<typeof styles> & {
	children: React.ReactNode;
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	orientation?: "horizontal" | "vertical";
	dir?: "ltr" | "rtl";
	delayDuration?: number;
};

const Root = ({
	children,
	value: valueProp,
	defaultValue = "",
	onValueChange,
	orientation = "horizontal",
	dir = "ltr",
	delayDuration = 200,
	ref,
	...props
}: RootProps & { ref?: React.Ref<View> }) => {
	const [value, setValue] = React.useState(defaultValue);
	const openTimerRef = React.useRef<number>(0);
	const closeTimerRef = React.useRef<number>(0);

	const currentValue = valueProp !== undefined ? valueProp : value;

	const handleValueChange = React.useCallback(
		(newValue: string) => {
			if (valueProp === undefined) {
				setValue(newValue);
			}
			onValueChange?.(newValue);
		},
		[valueProp, onValueChange],
	);

	const startCloseTimer = React.useCallback(() => {
		if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
		closeTimerRef.current = setTimeout(() => handleValueChange(""), 150);
	}, [handleValueChange]);

	const handleDelayedOpen = React.useCallback(
		(itemValue: string) => {
			if (openTimerRef.current) clearTimeout(openTimerRef.current);
			openTimerRef.current = setTimeout(() => {
				if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
				handleValueChange(itemValue);
			}, delayDuration);
		},
		[handleValueChange, delayDuration],
	);

	React.useEffect(() => {
		return () => {
			if (openTimerRef.current) clearTimeout(openTimerRef.current);
			if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
		};
	}, []);

	const contextValue = React.useMemo<NavigationMenuContextValue>(
		() => ({
			value: currentValue,
			onValueChange: handleValueChange,
			onTriggerEnter: handleDelayedOpen,
			onTriggerLeave: startCloseTimer,
			onContentEnter: () => {
				if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
			},
			onContentLeave: startCloseTimer,
			orientation,
			dir,
		}),
		[
			currentValue,
			handleValueChange,
			handleDelayedOpen,
			startCloseTimer,
			orientation,
			dir,
		],
	);

	return (
		<NavigationMenuContext.Provider value={contextValue}>
			<View ref={ref} style={styles.root} {...props}>
				{children}
			</View>
		</NavigationMenuContext.Provider>
	);
};

type ListProps = UnistylesVariants<typeof styles> & {
	children: React.ReactNode;
};

const List = ({
	children,
	ref,
	...props
}: ListProps & { ref?: React.Ref<View> }) => {
	const { orientation } = useNavigationMenuContext();

	// Set up variants for the list style
	styles.useVariants({
		orientation,
	});

	return (
		<View ref={ref} style={styles.list} {...props}>
			{children}
		</View>
	);
};

type ItemProps = {
	children: React.ReactNode;
	value?: string;
};

const Item = ({
	children,
	value: valueProp,
	ref,
}: ItemProps & { ref?: React.Ref<View> }) => {
	const autoValue = React.useId();
	const value = valueProp || autoValue;
	const triggerRef = React.useRef(null);
	const contentRef = React.useRef(null);

	const contextValue = React.useMemo<NavigationMenuItemContextValue>(
		() => ({
			value,
			triggerRef,
			contentRef,
		}),
		[value],
	);

	return (
		<NavigationMenuItemContext.Provider value={contextValue}>
			<View ref={ref} style={styles.item}>
				{children}
			</View>
		</NavigationMenuItemContext.Provider>
	);
};

type TriggerProps = {
	children: React.ReactNode;
	onPress?: () => void;
};

const Trigger = ({
	children,
	onPress,
	ref,
	...props
}: TriggerProps & { ref?: React.Ref<React.ElementRef<typeof Pressable>> }) => {
	const {
		value: activeValue,
		onTriggerEnter,
		onTriggerLeave,
		onValueChange,
	} = useNavigationMenuContext();
	const { value, triggerRef } = useNavigationMenuItemContext();
	const isOpen = activeValue === value;

	return (
		<Pressable
			ref={(node) => {
				triggerRef.current = node;
				if (typeof ref === "function") ref(node);
				else if (ref) ref.current = node;
			}}
			style={styles.trigger}
			onPress={() => {
				onValueChange(isOpen ? "" : value);
				onPress?.();
			}}
			onHoverIn={() => onTriggerEnter(value)}
			onHoverOut={onTriggerLeave}
			{...props}
		>
			{children}
		</Pressable>
	);
};

type LinkProps = {
	children: React.ReactNode;
	href?: string;
	onPress?: () => void;
};

const Link = ({
	children,
	href,
	onPress,
	ref,
	...props
}: LinkProps & { ref?: React.Ref<React.ElementRef<typeof Pressable>> }) => {
	const handlePress = () => {
		if (href && Platform.OS === "web") {
			// @ts-ignore - web only
			window.open(href, "_self");
		}
		onPress?.();
	};

	return (
		<Pressable ref={ref} style={styles.link} onPress={handlePress} {...props}>
			{children}
		</Pressable>
	);
};

type ContentProps = UnistylesVariants<typeof styles> & {
	children: React.ReactNode;
};

const Content = ({
	children,
	ref,
	...props
}: ContentProps & { ref?: React.Ref<View> }) => {
	const {
		value: activeValue,
		onContentEnter,
		onContentLeave,
	} = useNavigationMenuContext();
	const { value, contentRef } = useNavigationMenuItemContext();
	const isOpen = activeValue === value;

	styles.useVariants({
		state: isOpen ? "open" : "closed",
	});

	if (!isOpen) return null;

	return (
		<View
			ref={(node) => {
				contentRef.current = node;
				if (typeof ref === "function") ref(node);
				else if (ref) ref.current = node;
			}}
			style={styles.content}
			onPointerEnter={onContentEnter}
			onPointerLeave={onContentLeave}
			{...props}
		>
			{children}
		</View>
	);
};

type IndicatorProps = UnistylesVariants<typeof styles> & {
	children?: React.ReactNode;
};

const Indicator = ({
	children,
	ref,
	...props
}: IndicatorProps & { ref?: React.Ref<View> }) => {
	const { value } = useNavigationMenuContext();
	const isVisible = Boolean(value);

	styles.useVariants({
		state: isVisible ? "visible" : "hidden",
	});

	return (
		<View ref={ref} style={styles.indicator} {...props}>
			{children || <View style={styles.arrow} />}
		</View>
	);
};

type ViewportProps = {
	children?: React.ReactNode;
};

const Viewport = ({
	children,
	ref,
}: ViewportProps & { ref?: React.Ref<View> }) => {
	return (
		<View ref={ref} style={styles.viewport}>
			{children}
		</View>
	);
};

// Helper component for caret icon
type CaretDownProps = UnistylesVariants<typeof styles> & {
	size?: number;
};

const CaretDown = ({ size = 12 }: CaretDownProps) => {
	const { value } = useNavigationMenuContext();
	const { value: itemValue } = useNavigationMenuItemContext();
	const isOpen = value === itemValue;

	styles.useVariants({
		open: isOpen,
	});

	return <Text style={[styles.caretDown, { fontSize: size }]}>▼</Text>;
};

// Helper components for lists
type ListContainerProps = UnistylesVariants<typeof styles> & {
	children: React.ReactNode;
	columns?: 1 | 2 | 3;
};

const ListContainer = ({
	children,
	columns = 1,
	...props
}: ListContainerProps) => {
	styles.useVariants({
		columns,
	});

	return (
		<View style={styles.listContainer} {...props}>
			{children}
		</View>
	);
};

type ListItemProps = {
	children: React.ReactNode;
	title?: string;
	href?: string;
	onPress?: () => void;
};

const ListItem = ({
	children,
	title,
	href,
	onPress,
	ref,
	...props
}: ListItemProps & { ref?: React.Ref<React.ElementRef<typeof Pressable>> }) => {
	const handlePress = () => {
		if (href && Platform.OS === "web") {
			// @ts-ignore - web only
			window.open(href, "_self");
		}
		onPress?.();
	};

	return (
		<Pressable
			ref={ref}
			style={styles.listItem}
			onPress={handlePress}
			{...props}
		>
			{title && <Text style={styles.listItemHeading}>{title}</Text>}
			<Text style={styles.listItemText}>{children}</Text>
		</Pressable>
	);
};

type CalloutProps = {
	children: React.ReactNode;
	title?: string;
	description?: string;
	href?: string;
	onPress?: () => void;
};

const Callout = ({
	children,
	title,
	description,
	href,
	onPress,
	ref,
	...props
}: CalloutProps & { ref?: React.Ref<React.ElementRef<typeof Pressable>> }) => {
	const handlePress = () => {
		if (href && Platform.OS === "web") {
			// @ts-ignore - web only
			window.open(href, "_self");
		}
		onPress?.();
	};

	return (
		<Pressable
			ref={ref}
			style={styles.callout}
			onPress={handlePress}
			{...props}
		>
			{children}
			{title && <Text style={styles.calloutHeading}>{title}</Text>}
			{description && <Text style={styles.calloutText}>{description}</Text>}
		</Pressable>
	);
};

// Add CSS animations for web
// if (Platform.OS === "web") {
// 	const styleSheet = document.createElement("style");
// 	styleSheet.textContent = `
//     @keyframes scaleIn {
//       from {
//         opacity: 0;
//         transform: rotateX(-30deg) scale(0.9);
//       }
//       to {
//         opacity: 1;
//         transform: rotateX(0deg) scale(1);
//       }
//     }

//     @keyframes scaleOut {
//       from {
//         opacity: 1;
//         transform: rotateX(0deg) scale(1);
//       }
//       to {
//         opacity: 0;
//         transform: rotateX(-10deg) scale(0.95);
//       }
//     }

//     @keyframes fadeIn {
//       from { opacity: 0; }
//       to { opacity: 1; }
//     }

//     @keyframes fadeOut {
//       from { opacity: 1; }
//       to { opacity: 0; }
//     }
//   `;
// 	document.head.appendChild(styleSheet);
// }

Root.displayName = "NavigationMenu.Root";
List.displayName = "NavigationMenu.List";
Item.displayName = "NavigationMenu.Item";
Trigger.displayName = "NavigationMenu.Trigger";
Link.displayName = "NavigationMenu.Link";
Content.displayName = "NavigationMenu.Content";
Indicator.displayName = "NavigationMenu.Indicator";
Viewport.displayName = "NavigationMenu.Viewport";
CaretDown.displayName = "NavigationMenu.CaretDown";
ListContainer.displayName = "NavigationMenu.ListContainer";
ListItem.displayName = "NavigationMenu.ListItem";
Callout.displayName = "NavigationMenu.Callout";

export const NavigationMenu = {
	Root,
	List,
	Item,
	Trigger,
	Link,
	Content,
	Indicator,
	Viewport,
	CaretDown,
	ListContainer,
	ListItem,
	Callout,
};

export type {
	CalloutProps as NavigationMenuCalloutProps,
	CaretDownProps as NavigationMenuCaretDownProps,
	ContentProps as NavigationMenuContentProps,
	IndicatorProps as NavigationMenuIndicatorProps,
	ItemProps as NavigationMenuItemProps,
	LinkProps as NavigationMenuLinkProps,
	ListContainerProps as NavigationMenuListContainerProps,
	ListItemProps as NavigationMenuListItemProps,
	ListProps as NavigationMenuListProps,
	RootProps as NavigationMenuRootProps,
	TriggerProps as NavigationMenuTriggerProps,
	ViewportProps as NavigationMenuViewportProps,
};
