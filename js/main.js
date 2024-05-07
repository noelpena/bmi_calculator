const UISelectors = {
	measurementType: "input[name=measurement_type]",
	selectedMeasurementType: "input[name=measurement_type]:checked",
	metricHeight: "#metric_height",
	metricWeight: "#metric_weight",
	imperialHeightFeet: "#imperial_height_feet",
	imperialHeightInches: "#imperial_height_inches",
	imperialWeightStone: "#imperial_weight_stone",
	imperialWeightPounds: "#imperial_weight_pounds",
	bmiResult: "#bmi__result",
};

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

// document
// 	.querySelector(UISelectors.measurementType)
// 	.addEventListener("change", function (e) {
// 		console.log(this);
// 	});
