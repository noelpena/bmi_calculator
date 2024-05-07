const UISelectors = {
	measurementType: "input[name=measurement_type]",
	selectedMeasurementType: "input[name=measurement_type]:checked",
	notSelectedMeasurementType: "input[name=measurement_type]:not-checked",
	metricHeight: "#metric_height",
	metricWeight: "#metric_weight",
	imperialHeightFeet: "#imperial_height_feet",
	imperialHeightInches: "#imperial_height_inches",
	imperialWeightStone: "#imperial_weight_stone",
	imperialWeightPounds: "#imperial_weight_pounds",
	bmiResult: "#bmi__result",

	bmiInputWrap: ".bmi__input__wrap",

	metricWrap: ".metric__wrap",
	imperialWrap: ".imperial__wrap",

	metricHeightWrap: ".metric__height__wrap",
	metricWeightWrap: ".metric__weight__wrap",
	imperialHeightWrap: ".imperial__height__wrap",
	imperialWeightWrap: ".imperial__weight__wrap",
};

// document
// 	.querySelector("input[name=measurement_type]:not-checked")
// 	.addEventListener("click", function (e) {
// 		console.log(e);
// 	});

function switch2Imperial() {
	UISelectors.selectedMeasurementType.value = "imperial";
}

function calculateBMI() {
	// check to make sure it's not zero or null
	const measurementType = document.querySelector(UISelectors.measurementType);

	if (measurementType.id === "metric") {
	}

	const height = parseFloat(
		document.querySelector(UISelectors.metricHeight).value
	);
	const weight = parseFloat(
		document.querySelector(UISelectors.metricWeight).value
	);

	const heightInMeters = height / 100;
	const bmi = weight / (heightInMeters * heightInMeters);

	document.querySelector(UISelectors.bmiResult).innerHTML = bmi.toFixed(2);
}

function calculateBMI_imperial() {
	// check to make sure it's not zero or null
	const weightStone = parseFloat(
		document.querySelector(UISelectors.imperialWeightStone).value
	);
	const weightPounds = parseFloat(
		document.querySelector(UISelectors.imperialWeightPounds).value
	);
	const heightFeet = parseFloat(
		document.querySelector(UISelectors.imperialHeightFeet).value
	);
	const heightInches = parseFloat(
		document.querySelector(UISelectors.imperialHeightInches).value
	);

	const weight = weightStone * 14 + weightPounds;
	const height = heightFeet * 12 + heightInches;

	const bmi = (weight / (height * height)) * 703;

	document.querySelector(UISelectors.bmiResult).innerHTML = bmi.toFixed(2);
}
const radioButtons = document.querySelectorAll(
	'input[name="measurement_type"]'
);
radioButtons.forEach((button) => {
	button.addEventListener("change", (e) => {
		console.log(e);
		const imperialWrap = document.querySelector(UISelectors.imperialWrap);
		const metricWrap = document.querySelector(UISelectors.metricWrap);
		console.dir(metricWrap, imperialWrap);
		const bmiInputWrap = document.querySelector(UISelectors.bmiInputWrap);

		if (e.target.id === "metric") {
			metricWrap.classList.remove("hide");
			imperialWrap.classList.add("hide");
			bmiInputWrap.classList.remove("wrap");
		} else {
			metricWrap.classList.add("hide");
			imperialWrap.classList.remove("hide");
			bmiInputWrap.classList.add("wrap");
		}
	});
});
