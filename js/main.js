const UISelectors = {
	measurementType: "input[name=measurement_type]",
	selectedMeasurementType: "input[name=measurement_type]:checked",
	notSelectedMeasurementType: "input[name=measurement_type]:not-checked",
	metricHeight: "#metric_height",
	metricWeight: "#metric_weight",
	imperialHeightFeet: "#imperial_height_feet",
	imperialHeightInches: "#imperial_height_inches",
	imperialWeightPounds: "#imperial_weight_pounds",
	bmiResult: "#bmi__result",

	bmiCategory: ".bmi__results__description #bmi__category",
	bmiRange: ".bmi__results__description #bmi__range",

	bmiInputWrap: ".bmi__input__wrap",
	bmiResultWrapInactive: ".bmi__results__wrap.results_inactive",
	bmiResultWrapActive: ".bmi__results__wrap.results_active",

	metricWrap: ".metric__wrap",
	imperialWrap: ".imperial__wrap",

	metricHeightWrap: ".metric__height__wrap",
	metricWeightWrap: ".metric__weight__wrap",
	imperialHeightWrap: ".imperial__height__wrap",
	imperialWeightWrap: ".imperial__weight__wrap",
};

const radioButtons = document.querySelectorAll(
	'input[name="measurement_type"]'
);

radioButtons.forEach((button) => {
	button.addEventListener("change", (e) => {
		const imperialWrap = document.querySelector(UISelectors.imperialWrap);
		const metricWrap = document.querySelector(UISelectors.metricWrap);
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
		toggleResults();
	});
});

document
	.querySelector(UISelectors.metricWeight)
	.addEventListener("input", calculateBMI);
document
	.querySelector(UISelectors.metricHeight)
	.addEventListener("input", calculateBMI);

document
	.querySelector(UISelectors.imperialHeightFeet)
	.addEventListener("input", calculateBMI_imperial);

document
	.querySelector(UISelectors.imperialHeightInches)
	.addEventListener("input", calculateBMI_imperial);

document
	.querySelector(UISelectors.imperialWeightPounds)
	.addEventListener("input", calculateBMI_imperial);

function calculateBMI() {
	const metricHeight = UISelectors.metricHeight;
	const metricWeight = UISelectors.metricWeight;

	const height = parseFloat(document.querySelector(metricHeight).value);
	const weight = parseFloat(document.querySelector(metricWeight).value);

	const bmiCategory = document.querySelector(UISelectors.bmiCategory);
	const bmiRange = document.querySelector(UISelectors.bmiRange);
	if (height === 0 || weight === 0 || isNaN(height) || isNaN(weight)) {
		toggleResults(false);
		return false;
	}

	const heightInMeters = height / 100;
	const bmi = weight / (heightInMeters * heightInMeters);

	switch (true) {
		case bmi < 18.5:
			bmiCategory.innerHTML = "underweight";
			break;
		case bmi >= 18.5 && bmi < 25:
			bmiCategory.innerHTML = "a healthy weight";
			break;
		case bmi >= 25 && bmi < 30:
			bmiCategory.innerHTML = "overweight";
			break;
		case bmi >= 30:
			bmiCategory.innerHTML = "obese";
			break;
	}

	document.querySelector(UISelectors.bmiResult).innerHTML = bmi.toFixed(1);
	bmiRange.innerHTML = findWeightRange(height, "centimeters");
	toggleResults(true);
}

function calculateBMI_imperial() {
	const weightPounds = parseFloat(
		document.querySelector(UISelectors.imperialWeightPounds).value
	);
	const heightFeet = parseFloat(
		document.querySelector(UISelectors.imperialHeightFeet).value
	);
	const heightInches = parseFloat(
		document.querySelector(UISelectors.imperialHeightInches).value
	);

	const bmiCategory = document.querySelector(UISelectors.bmiCategory);
	const bmiRange = document.querySelector(UISelectors.bmiRange);

	const weight = weightPounds;
	const height = heightFeet * 12 + heightInches;

	if (height === 0 || weight === 0 || isNaN(height) || isNaN(weight)) {
		toggleResults(false);
		return false;
	}

	const bmi = (weight / (height * height)) * 703;

	switch (true) {
		case bmi < 18.5:
			bmiCategory.innerHTML = "underweight";
			break;
		case bmi >= 18.5 && bmi < 25:
			bmiCategory.innerHTML = "a healthy weight";
			break;
		case bmi >= 25 && bmi < 30:
			bmiCategory.innerHTML = "overweight";
			break;
		case bmi >= 30:
			bmiCategory.innerHTML = "obese";
			break;
	}

	bmiRange.innerHTML = findWeightRange(height, "inches");
	document.querySelector(UISelectors.bmiResult).innerHTML = bmi.toFixed(1);
	toggleResults(true);
}

function toggleResults(showResults) {
	const bmiInactiveResults = document.querySelector(
		UISelectors.bmiResultWrapInactive
	);
	const bmiActiveResults = document.querySelector(
		UISelectors.bmiResultWrapActive
	);

	if (showResults) {
		bmiInactiveResults.classList.add("hide");
		bmiActiveResults.classList.remove("hide");
	} else {
		bmiInactiveResults.classList.remove("hide");
		bmiActiveResults.classList.add("hide");
	}
}

// AI Generated Code below
function findWeightRange(value, unit) {
	let closestObj;
	let minDiff = Infinity;

	healthyWeightsArray.forEach((obj) => {
		let diff;
		if (unit === "inches") {
			diff = Math.abs(obj.inches - value);
		} else if (unit === "centimeters") {
			diff = Math.abs(inchesToCentimeters(obj.inches) - value);
		}

		if (diff < minDiff) {
			minDiff = diff;
			closestObj = obj;
		}
	});

	if (unit === "inches") {
		return closestObj.weightRangePounds;
	} else if (unit === "centimeters") {
		return closestObj.weightRangeKg;
	}
}

function inchesToCentimeters(inches) {
	return inches * 2.54;
}

const healthyWeightsArray = [
	{
		inches: 58,
		weightRangePounds: "91-115 lbs",
		centimeters: 147.32,
		weightRangeKg: "41.3-52.16 kg",
	},
	{
		inches: 59,
		weightRangePounds: "94-119 lbs",
		centimeters: 149.86,
		weightRangeKg: "42.6-53.98 kg",
	},
	{
		inches: 60,
		weightRangePounds: "97-123 lbs",
		centimeters: 152.4,
		weightRangeKg: "44.0-55.79 kg",
	},
	{
		inches: 61,
		weightRangePounds: "100-127 lbs",
		centimeters: 154.94,
		weightRangeKg: "45.4-57.61 kg",
	},
	{
		inches: 62,
		weightRangePounds: "104-131 lbs",
		centimeters: 157.48,
		weightRangeKg: "47.2-59.42 kg",
	},
	{
		inches: 63,
		weightRangePounds: "107-135 lbs",
		centimeters: 160.02,
		weightRangeKg: "48.5-61.24 kg",
	},
	{
		inches: 64,
		weightRangePounds: "110-140 lbs",
		centimeters: 162.56,
		weightRangeKg: "49.9-63.50 kg",
	},
	{
		inches: 65,
		weightRangePounds: "114-144 lbs",
		centimeters: 165.1,
		weightRangeKg: "51.7-65.32 kg",
	},
	{
		inches: 66,
		weightRangePounds: "118-148 lbs",
		centimeters: 167.6,
		weightRangeKg: "53.5-67.13 kg",
	},
	{
		inches: 67,
		weightRangePounds: "121-153 lbs",
		centimeters: 170.2,
		weightRangeKg: "54.9-69.40 kg",
	},
	{
		inches: 68,
		weightRangePounds: "125-158 lbs",
		centimeters: 172.7,
		weightRangeKg: "56.7-71.67 kg",
	},
	{
		inches: 69,
		weightRangePounds: "128-162 lbs",
		centimeters: 175.3,
		weightRangeKg: "58.1-73.48 kg",
	},
	{
		inches: 70,
		weightRangePounds: "132-167 lbs",
		centimeters: 177.8,
		weightRangeKg: "59.9-75.75 kg",
	},
	{
		inches: 71,
		weightRangePounds: "136-172 lbs",
		centimeters: 180.3,
		weightRangeKg: "61.7-78.02 kg",
	},
	{
		inches: 72,
		weightRangePounds: "140-177 lbs",
		centimeters: 182.9,
		weightRangeKg: "63.5-80.29 kg",
	},
	{
		inches: 73,
		weightRangePounds: "144-182 lbs",
		centimeters: 185.4,
		weightRangeKg: "65.3-82.55 kg",
	},
	{
		inches: 74,
		weightRangePounds: "148-186 lbs",
		centimeters: 188.0,
		weightRangeKg: "67.1-84.37 kg",
	},
	{
		inches: 75,
		weightRangePounds: "152-192 lbs",
		centimeters: 190.5,
		weightRangeKg: "68.9-87.09 kg",
	},
	{
		inches: 76,
		weightRangePounds: "156-197 lbs",
		centimeters: 193.0,
		weightRangeKg: "70.8-89.36 kg",
	},
];
