// Get all elements with the class name "math"
const mathElements = document.querySelectorAll('.math');
const overallTotalInput = document.getElementById('overallTotalInput');
const payNowButton = document.getElementById('pay');

// Loop through each math element
mathElements.forEach((mathElement, index) => {
    // Get quantity input, total cost element, and price for each recipe
    const quantityInput = mathElement.querySelector('input[type="number"]');
    const totalCostElement = mathElement.querySelector('#totalCost');
    const price = getPriceByIndex(index); // Function to get the price for each recipe by index

    // Add event listener for input change for each quantity input
    quantityInput.addEventListener('input', () => {
        const quantity = parseFloat(quantityInput.value) || 0;
        const totalCost = price * quantity;

        totalCostElement.textContent = totalCost.toFixed(2);

        calculateOverallTotal(); // Calculate the overall total after updating individual totals
    });
});

// Function to get the price for each recipe by index (Modify this function to suit your needs)
function getPriceByIndex(index) {
    // Define the prices for each recipe based on their index (modify as needed)
    const prices = [125, 150, 200, 300, 300, 350];

    // Return the price based on the index
    return prices[index];
}

// Calculate the overall total cost by summing up individual totals
function calculateOverallTotal() {
    let overallTotal = 0;

    // Loop through each total cost element and sum up the totals
    mathElements.forEach((mathElement) => {
        const totalCostElement = mathElement.querySelector('#totalCost');
        overallTotal += parseFloat(totalCostElement.textContent);
    });

    // Display the overall total cost in the input field with id "overallTotalInput"
    overallTotalInput.value = overallTotal.toFixed(2);

    // Enable or disable Pay Now button based on the overall total
    payNowButton.disabled = !isOverallTotalGreaterThanZero();
}

// Cancel button functionality (Clears the individual total and sets quantity to 0 for its section only)
const cancelButtons = document.querySelectorAll('button#cancel');
cancelButtons.forEach((cancelButton, index) => {
    cancelButton.addEventListener('click', () => {
        const currentSection = mathElements[index];
        const totalCostElement = currentSection.querySelector('#totalCost');
        const quantityInput = currentSection.querySelector('input[type="number"]');

        totalCostElement.textContent = '0';
        quantityInput.value = '0';

        calculateOverallTotal(); // Recalculate overall total after resetting individual totals
    });
});

// Reset button functionality (Clears all individual totals and overall total)
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    mathElements.forEach((mathElement) => {
        const totalCostElement = mathElement.querySelector('#totalCost');
        const quantityInput = mathElement.querySelector('input[type="number"]');
        
        totalCostElement.textContent = '0';
        quantityInput.value = '0';
    });

    overallTotalInput.value = '0';
});

// Function to check if the overall total is greater than 0
function isOverallTotalGreaterThanZero() {
    const overallTotal = parseFloat(overallTotalInput.value) || 0;
    return overallTotal > 0;
}

// Function to handle Pay Now button click
function handlePayNowButtonClick() {
    if (isOverallTotalGreaterThanZero()) {
        alert('Payment processed successfully! Please wait.');

        // Reset all individual totals and overall total to 0
        mathElements.forEach((mathElement) => {
            const totalCostElement = mathElement.querySelector('#totalCost');
            const quantityInput = mathElement.querySelector('input[type="number"]');

            totalCostElement.textContent = '0';
            quantityInput.value = '0';
        });

        overallTotalInput.value = '0';
        
        // Update the Pay Now button state
        payNowButton.disabled = true;
    } else {
        alert('Please add items to your order before proceeding with payment.');
    }
}

// Add click event listener to the Pay Now button
payNowButton.addEventListener('click', handlePayNowButtonClick);

// Call calculateOverallTotal initially to set button state based on the initial total
calculateOverallTotal();
