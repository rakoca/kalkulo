document.getElementById('precision2').value = 0;
document.getElementById('take-quantile-1').checked = 'true';
document.getElementById('take-quantile-2').checked = 'true';

document.getElementById('calculate').addEventListener('click', () => {
    let measurements;
    let length;
    let average = 0;
    let precision_next = 0;
    let a;
    let u;
    let t;
    let s = 0;
    let u_fixed;
    let precision = 0;
    let b;

    measurements = document.getElementById('measurements').value;
    measurements = measurements.replaceAll(',', '.').split(';');
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
        if (window.innerWidth <= 640) {
            document.getElementById('take-quantile-1').checked ? a = t * s : a = s;
            console.log('<=640', document.getElementById('take-quantile-2').checked)
        } else {
            document.getElementById('take-quantile-2').checked ? a = t * s : a = s;
            console.log('>640', document.getElementById('take-quantile-1').checked)
        }
        
        b = Math.sqrt((document.getElementById('precision1').value.replace(',', '.') / Math.sqrt(3))**2 + (document.getElementById('precision2').value.replace(',', '.') / Math.sqrt(3))**2);
        u = Math.sqrt(a**2+b**2);
        document.getElementById('average').innerHTML = average.toFixed(precision+1);
        document.getElementById('s').innerHTML = s.toFixed(precision+2);
        document.getElementById('quantile').innerHTML = t.toFixed(precision+2);
        document.getElementById('uncertaintyA').innerHTML = a.toFixed(precision+2);
        document.getElementById('uncertaintyB').innerHTML = b.toFixed(precision+2);
        document.getElementById('uncertainty').innerHTML = u.toFixed(precision + 2);
        u_fixed = Math.ceil(u*10**precision)/10**precision
        if (u_fixed >= 1.2*u) {
            u_fixed = u.toFixed(precision);
        }
        document.getElementById('uncertainty-fixed').innerHTML = u_fixed;
        document.getElementById('result').innerHTML = average.toFixed(precision) + ' &PlusMinus; ' + u_fixed;  
    } else {
        alert('Błąd: wpisz co najmniej dwa pomiary');
    }

});

document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('average').innerHTML = '';
    document.getElementById('s').innerHTML = '';
    document.getElementById('quantile').innerHTML = '';
    document.getElementById('uncertaintyA').innerHTML = '';
    document.getElementById('uncertaintyB').innerHTML = '';
    document.getElementById('uncertainty').innerHTML = '';
    document.getElementById('uncertainty-fixed').innerHTML = '';
    document.getElementById('result').innerHTML = '';  
});