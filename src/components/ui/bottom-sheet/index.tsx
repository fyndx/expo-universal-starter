import type { BottomSheetModal as BSModalType } from "@gorhom/bottom-sheet";
import BottomSheet, {
	BottomSheetModalProvider,
	BottomSheetHandle as BSHandle,
	BottomSheetModal as BSModal,
	BottomSheetScrollView as BSScrollView,
	BottomSheetView as BSView,
} from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import type React from "react";
import { forwardRef, Fragment } from "react";
import type { BottomSheetProps, BSHandleProps } from "./types";

const BottomSheetTrigger = Fragment;

type BottomSheetModal = BSModalType;

const BottomSheetModal = forwardRef<
	BSModal,
	BottomSheetProps & { children: React.ReactNode; isOpen?: boolean }
>(({ children, ...rest }: BottomSheetProps, ref) => {
	return (
		<BSModal ref={ref} {...rest}>
			{children}
		</BSModal>
	);
});

const BottomSheetView = cssInterop(BSView, {
	className: "style",
});

const BottomSheetScrollView = cssInterop(BSScrollView, {
	className: "style",
	contentContainerclassName: "contentContainerStyle",
});

const BottomSheetHandle: React.FC<BSHandleProps> = BSHandle;

export {
	BottomSheet,
	BottomSheetHandle,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetScrollView,
	BottomSheetTrigger,
	BottomSheetView,
};
