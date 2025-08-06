import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

export function Confetti() {
	return (
		<WithSkiaWeb
			opts={{
				locateFile: (file) => `/canvaskit.wasm`,
			}}
			getComponent={async () => require("./confetti-base")}
		/>
	);
}
