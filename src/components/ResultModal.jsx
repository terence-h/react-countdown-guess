import { forwardRef, useImperativeHandle, useRef } from "react";

// Portal to "teleport" HTML JSX code into a different place in the DOM
import { createPortal } from "react-dom";

// To forward the ref from another component, we must wrap the function using the forwardRef
// Then, provide a second parameter named "ref" to read it
const ResultModal = forwardRef(function ResultModal(
	{ targetTime, remainingTime, onReset },
	ref
) {
	// Another ref is created here to detach the dialog element from any outer components
	const dialog = useRef();

	const userLost = remainingTime <= 0;
	const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
	const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

	// We can use this imperative handle hook to define properties
	// and methods that should be accessible outside of this component
	// However, this shouldn't be used often since we should rather be using props
	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current.showModal();
			},
		};
	});

    // Return a createPortal and using the 2nd parameter to set it's location within the DOM
	return createPortal(
		// "open" attribute will make it visible by default
		// However, the backdrop will not be visible so we must do it programatically
		<dialog ref={dialog} className="result-modal" onClose={onReset}>
			{userLost && <h2>You lost</h2>}
			{!userLost && <h2>Your score: {score}</h2>}
			<p>
				The target time was <strong>{targetTime} seconds.</strong>
			</p>
			<p>
				You stopped the timer with{" "}
				<strong>{formattedRemainingTime} seconds left.</strong>
			</p>
			<form method="dialog" onSubmit={onReset}>
				<button>Close</button>
			</form>
		</dialog>, 
        document.getElementById("modal")
	);
});

export default ResultModal;
