import { useState, useRef } from "react";

export default function Player() {
	// Creating a ref to access the DOM nodes/React elements in the input field.
    // Refs DOES not tell React to re-render the component Therefore, a state is still necessary
	const playerName = useRef();
	const [enteredPlayerName, setEnteredPlayerName] = useState(null);

	function handleClick() {
		// All refs start with .current and then followed by the property.
		// In this case, we are using input so can we access the DOM properties of the input.
		setEnteredPlayerName(playerName.current.value);
	}

  console.log(enteredPlayerName);

	return (
		<section id="player">
			<h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
			<p>
				<input ref={playerName} type="text" />
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
