/*
ERROR LIST
1 lack of measurements
*/

function error(code) {
    switch (code) {
        case 1:
            alert('Błąd 1: zbyt mała liczba pomiarów');
            return;
    }
}
document.getElementById('precision2').value = 0;

document.getElementById('calculate').addEventListener('click', () => {
    let measurements;
    let length;
    let t;
    let a;
    let b;
    let average = 0;
    let precision = 0;
    let precision_next = 0;
    let s = 0;
    let u;
    let u_fixed;
    let multiplier;

    measurements = document.getElementById('measurements').value;
    measurements = measurements.replace(',', '.').split(';');
    length = measurements.length;

    for (let i = 0; i < length; ++i) {
        average += parseFloat(measurements[i]);
        try {
            precision_next = measurements[i].split('.')[1].length;
            if (precision_next >= precision) {
                precision = precision_next;
            }
        } catch {
            continue;
        }

    }
    average /= length;
    for (let i = 0; i < length; ++i) {
        s += (average - measurements[i]) ** 2;
    }
    if (length > 1) {
        t = jStat.studentt.inv(0.84135, length - 1)
        s = Math.sqrt(s / (length * (length - 1)));
        a = t * s;
        b = Math.sqrt((document.getElementById('precision1').value / Math.sqrt(3))**2 + (document.getElementById('precision2').value / Math.sqrt(3))**2);
        u = Math.sqrt(a**2+b**2);
        document.getElementById('average').innerHTML = average.toFixed(precision+1);
        document.getElementById('s').innerHTML = s.toFixed(precision+2);
        document.getElementById('quantile').innerHTML = t.toFixed(precision+2);
        document.getElementById('uncertaintyA').innerHTML = a.toFixed(precision+2);
        document.getElementById('uncertaintyB').innerHTML = b.toFixed(precision+2);
        document.getElementById('uncertainty').innerHTML = u.toFixed(precision + 2);
        u_fixed = Math.ceil(u*10**precision)/10**precision
        if (u_fixed >= 1.2*u) {
            u_fixed = u;
        }
        document.getElementById('uncertainty-fixed').innerHTML = u_fixed;
        document.getElementById('result').innerHTML = '(' + average.toFixed(precision) + ' &PlusMinus; ' + u_fixed + ')'
    } else {
        error(1);
    }

});