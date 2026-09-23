// DOM elements
const form = document.querySelector("#temperature-form");
const temperatureInput = document.querySelector("#temperature-input");
const fromUnitSelect = document.querySelector("#from-unit-select");
const toUnitSelect = document.querySelector("#to-unit-select");
const resultContainer = document.querySelector("#result-container");
const resultElement = document.querySelector("#result-value");
const convertButton = document.querySelector("#convert-btn");

// Enable or disable the Convert button based on form values
const updateConvertButtonState = () => {
    const temperatureValue = temperatureInput.value.trim();
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    const isFormValid =
        temperatureValue !== "" &&
        fromUnit !== "" &&
        toUnit !== "";

    convertButton.disabled = !isFormValid;
};

temperatureInput.addEventListener("input", updateConvertButtonState);
fromUnitSelect.addEventListener("change", updateConvertButtonState);
toUnitSelect.addEventListener("change", updateConvertButtonState);

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const temperatureValue = Number(temperatureInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    const convertedTemperature = convertTemperature(
        temperatureValue,
        fromUnit,
        toUnit
    );

    resultElement.textContent = convertedTemperature;
    resultContainer.classList.remove("hidden");
});

// Convert the input temperature to Celsius first,
// then convert the Celsius value to the target unit
const convertTemperature = (temperature, fromUnit, toUnit) => {
    let celsiusValue;

    // Convert the input temperature to Celsius
    switch (fromUnit) {
        case "fahrenheit":
            celsiusValue = (temperature - 32) * 5 / 9;
            break;

        case "celsius":
            celsiusValue = temperature;
            break;

        case "kelvin":
            celsiusValue = temperature - 273.15;
            break;
    }

    // Convert the Celsius value to the target unit
    switch (toUnit) {
        case "fahrenheit":
            return (celsiusValue * 9 / 5) + 32;

        case "celsius":
            return celsiusValue;

        case "kelvin":
            return celsiusValue + 273.15;
    }
};

