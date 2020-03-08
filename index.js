const store = {
    tipTotal: 0,
    mealCount: 0
};

const generateMealDetails = function() {
    return `
    <section>
    <h2>Enter the Meal Details</h2>
        <form class="meal-details">
            <label for="base-meal-price">Base Meal Price: $</label>
            <input type="number" step="0.01" name="base-meal-price" id="base-meal-price"><br>
            <label for="tax-rate">Tax Rate: %</label>
            <input type="number" step="any" name="tax-rate" id="tax-rate"><br>
            <label for="tip-percentage">Tip Percentage: %</label>
            <input type="number" step="any" name="tip-percentage" id="tip-percentage"><br>
            <button id="submit">Submit</button>
            <button id="cancel">Cancel</button>
        </form>
    </section>`

}

const generateCustomerCharges = function() {
    return `
    <section>
        <h2>Customer Charges</h2>
            <h3>Subtotal: 
                <span id="subtotal"></span>
            </h3>
            <h3>Tip: 
                <span id="tip"></span>
            </h3>
            <h3>Total: 
                <span id="total"></span>
            </h3>
    </section>`
}

const generateEarningsInfo = function() {
    return `
    <section>
        <h2>My Earnings Info</h2>
            <h3>Tip Total: 
                <span id="tip-total"></span>
            </h3>
            <h3>Meal count: 
                <span id="meal-count"></span>
            </h3>
            <h3>Average Tip Per Meal: 
                <span id="average-tip-per-meal"></span>
            </h3>
    </section>`

}

const computeCustomerCharges = function(mealPrice, taxRate, tipPercentage) {
    let subtotal = parseInt(mealPrice) + (parseInt(mealPrice) * (parseInt(taxRate)/100));
    let tip = (parseInt(subtotal) * (parseInt(tipPercentage) / 100));
    let total = parseInt(subtotal) + parseInt(tip);

    store.tipTotal += tip;
    store.mealCount++;

    return `
    <section>
        <h2>Customer Charges</h2>
            <h3>Subtotal: 
                <span id="subtotal">${subtotal.toFixed(2)}</span>
            </h3>
            <h3>Tip: 
                <span id="tip">${tip.toFixed(2)}</span>
            </h3>
            <h3>Total: 
                <span id="total">${total.toFixed(2)}</span>
            </h3>
    </section>
    `
}

const computeEarnings = function() {
    let tipAverage = store.tipTotal / store.mealCount;
    let totalTip = store.tipTotal;
    let meals = store.mealCount;

    return `
    <section class="earnings">
        <h2>My Earnings Info</h2>
            <h3>Tip Total: 
                <span id="tip-total">${totalTip.toFixed(2)}</span>
            </h3>
            <h3>Meal count: 
                <span id="meal-count">${meals}</span>
            </h3>
            <h3>Average Tip Per Meal: 
                <span id="average-tip-per-meal">${tipAverage.toFixed(2)}</span>
            </h3>
    </section>`
}

const handleSubmitButton = function() {
    $('.meal-details').on("click", "#submit", event => {
        event.preventDefault();
        const basePrice = $('#base-meal-price').val()
        const taxRate = $('#tax-rate').val();
        const tip = $('#tip-percentage').val();
        $('.customer-charges').html(computeCustomerCharges(basePrice, taxRate, tip));
        $('.earnings').html(computeEarnings);
        $('#base-meal-price').val('');
        $('#tax-rate').val('');
        $('#tip-percentage').val('');
        
    })
}

const handleCancelButton = function() {
    $('.meal-details').on("click", "#cancel", event => {
        event.preventDefault();
        $('#base-meal-price').val('');
        $('#tax-rate').val('');
        $('#tip-percentage').val('');
    })
}

const handleResetButton = function() {
    $('body').on("click", "#reset", event => {
        event.preventDefault();
        $('.meals').html(generateMealDetails());
        $('.customer-charges').html(generateCustomerCharges());
        $('.earnings').html(generateEarningsInfo());
    })
}

const bindEventListeners = function() {
    handleSubmitButton();
    handleCancelButton();
    handleResetButton();
}

$(bindEventListeners);