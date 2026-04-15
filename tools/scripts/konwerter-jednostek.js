document.getElementById('convert').addEventListener('click', () => {
    let unit_from = document.getElementById('unit-from').value;
    let unit_to = document.getElementById('unit-to').value;
    let value_from = document.getElementById('value-from').value;
    let prefix_conversion;

    // determine base unit
    const base_units = ['g', 'm', 'K', 'J', 'ft', 'oz'];
    const prefixes = ['Q', 'R', 'Y', 'Z', 'E', 'P', 'T', 'G', 'M', 'k', 'h', 'da', 'd', 'c', 'm', 'u', 'n', 'p', 'f', 'a', 'a', 'y', 'r']
    const prefixes_values = [10**30, 10**27, 10**24, 10**21, 10**18, 10**15, 10**12, 10**9, 10**6, 10**3, 10**2, 10, 0.1, 0.01, 10**-3, 10**-6, 10**9, 10**-12, 10**-15, 10**-18, 10**-21, 10**-24, 10**-27, 10**-30];
    unit_from = unit_from.split();
    if (unit_from.includes('/')) { alert('Ta jednostka nie jest jeszcze obsługiwana lub nie istnieje.'); }
    else if (unit_from.includes('^')) { alert('Potęgi nie są jeszcze obsługiwane'); }
    else if (unit_from[0] + unit_from[1] == 'da') { alert('deka nie jest jeszcze obsługiwane'); }
    else if (prefixes.includes(unit_from[0])) { // unit has metric prefix which is not 'da'
        prefix_conversion = prefixes_values[prefixes.indexOf(unit_from[0])]
    }
});