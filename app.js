const edad = document.querySelector('#edad');
const genero = document.querySelector('.genero');
const embarazo = document.querySelector('#embarazo');
const embarazada = document.querySelector('.embarazada');
const semanas = document.querySelector('#semanas');
const inputSemanas = document.querySelector('#semanasC');
const button = document.querySelector('button[type="submit"]');
const zonaFronteriza = document.querySelector('#zona');
const resp = document.querySelector('#resp');
const formulario = document.querySelector('#formulario');

let pVacuna = {
    edad: 0,
    genero: '',
    embarazo: false,
    semanas: 0,
    zonaFronteriza: ''
}
edad.addEventListener('change', function (e) {
    pVacuna.edad = parseInt(e.target.value);
})

genero.addEventListener('click', function (e) {

    if (e.target.value === 'mujer') {
        embarazo.removeAttribute("disabled");
        embarazo.firstChild.nextElementSibling.classList.remove('text-gray-400');
        pVacuna.genero = e.target.value;
    } else {
        embarazo.setAttribute('disabled', "disabled");
        embarazo.firstChild.nextElementSibling.classList.add('text-gray-400');
        pVacuna.genero = e.target.value;
    }
})

embarazada.addEventListener('click', function (e) {
    if (e.target.value === 'si') {
        semanas.removeAttribute('disabled');
        semanas.firstChild.nextElementSibling.classList.remove('text-gray-400');
        pVacuna.embarazo = true;
    } else {
        semanas.setAttribute('disabled', "disabled");
        inputSemanas.value = '';
        pVacuna.semanas = 0;
        pVacuna.embarazo = false;
        semanas.firstChild.nextElementSibling.classList.add('text-gray-400');
    }
})

inputSemanas.addEventListener('change', function (e) {
    pVacuna.semanas = parseInt(e.target.value);
})
zonaFronteriza.addEventListener('change', function (e) {
    pVacuna.zonaFronteriza = e.target.value;
})

button.addEventListener('click', function (e) {
    e.preventDefault();
    const {edad, genero, semanas, embarazo, zonaFronteriza} = pVacuna;
    const texVerde = 'text-lime-600';
    const bgVerde = 'bg-lime-200';
    const texRojo = 'text-red-600';
    const bgRojo = 'bg-red-200';

    if (edad >= 30) {

        resultado(texVerde, bgVerde, 'Si puedo vacunarme');
    } else if (edad >= 18 && edad <= 29) {

        if (genero === 'mujer') {

            if (embarazo && semanas >= 9) {
                resultado(texVerde, bgVerde, 'Si puedo vacunarme');

            } else if (zonaFronteriza === 'fronteriza-norte' && semanas >= 9) {

                resultado(texVerde, bgVerde, 'Si puedo vacunarme');
                return;

            } else if (zonaFronteriza === 'fronteriza-norte' && !embarazo) {

                resultado(texVerde, bgVerde, 'Si puedo vacunarme');
                return;
                
            } else {

                resultado(texRojo, bgRojo, 'No puedo vacunarme');
            }
        } else if (zonaFronteriza === 'fronteriza-norte') {

            resultado(texVerde, bgVerde, 'Si puedo vacunarme');
            return;

        } else {
            resultado(texRojo, bgRojo, 'No puedo vacunarme');
        }
    } else {

        resultado(texRojo, bgRojo , 'No puedo vacunarme');
    }

})

function resultado(clase, bgColor, siPV) {
    limpiarHTML();
    const siPuedoVacunarme = document.createElement('h2');
    // si es verdadero 'text-lime-600 , si es falso 'text-red-600
    siPuedoVacunarme.classList.add('text-5xl','p-4', clase, bgColor);
    siPuedoVacunarme.innerHTML = siPV
    resp.appendChild(siPuedoVacunarme);
    pVacuna = {
        edad: 0,
        genero: '',
        embarazo: false,
        semanas: 0,
        zonaFronteriza: ''
    }
    semanas.setAttribute('disabled', "disabled");
    semanas.firstChild.nextElementSibling.classList.add('text-gray-400');
    embarazo.setAttribute('disabled', "disabled");
    embarazo.firstChild.nextElementSibling.classList.add('text-gray-400');
    formulario.reset();
}
function limpiarHTML() {
    while (resp.firstChild) {
        resp.removeChild(resp.firstChild);
    }
}







