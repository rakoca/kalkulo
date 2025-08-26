document.getElementById('convert').addEventListener('click', () => {
    let unit_from = document.getElementById('unit-from').value;
    let unit_to = document.getElementById('unit-to').value;
    let value_from = document.getElementById('value-from').value;

    // determine base unit
    base_units = ['g', 'm', 'K', 'J', 'm/s', 'ft', 'oz'];
    unit_from = unit_from.split();
    
});