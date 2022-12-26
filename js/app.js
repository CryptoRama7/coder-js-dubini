const form = document.querySelector("#form-search");
const divisa = document.querySelector("#divisa");
const criptodivisa = document.querySelector("#criptodivisa");
const formContainer = document.querySelector(".form-side");
const containerAnswer = document.querySelector(".container-answer");

const objBusqueda = {
    divisa: '',
    criptodivisa: ''
}

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptos();
    form.addEventListener('submit', submitForm);
    divisa.addEventListener('change', getValue);
    criptodivisa.addEventListener('change', getValue);
})

function submitForm(e){
    e.preventDefault();
    const {divisa, criptodivisa} = objBusqueda;
    if (divisa === '' || criptodivisa === ''){
        showError("Seleccione ambas divisas...");
        return;
    }
    consultarAPI(divisa, criptodivisa)
}

function consultarAPI(divisa, criptodivisa){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptodivisa}&tsyms=${divisa}`;
    fetch(url)
    .then(resultado => resultado.json())
    .then(resultadoJson => {
        mostrarDatos(resultadoJson.DISPLAY[criptodivisa][divisa])
    })
    .catch(error => console.log(error));
}

function mostrarDatos(data){
    clearHTML();
    const {PRICE, MKTCAP, SUPPLY, TOSYMBOL, FROMSYMBOL} = data;
    const answer = document.createElement('div');
    answer.classList.add('display-info');
    answer.innerHTML = `
        <p class="main-price">Price: <span>${PRICE}</span></p>
        <p>Market Cap: <span>${MKTCAP}</span></p>
        <p>Supply: <span>${SUPPLY}</span></p>
                       `;
    containerAnswer.appendChild(answer); 
    
    let historial = localStorage.getItem("cotizaciones") ? JSON.parse(localStorage.getItem("cotizaciones")) : [];

    let cotizacion = {moneda: TOSYMBOL, criptomoneda: FROMSYMBOL, precio: PRICE};
    let historialJson = JSON.stringify(cotizacion);
    localStorage.setItem("ultimaCotizacion", historialJson);
    historial.push(historialJson);
    let historialCotizaciones = JSON.stringify(historial);
    localStorage.setItem("cotizaciones", historialCotizaciones);
}   

const actualizaciones = document.createElement('div')
actualizaciones.className = ('modal-body')
actualizaciones.innerHTML = `
<p>${historial}</p>
<p>estas son tus cotizaciones hasta el momento</p>
                            `;

function showError(){ 
    Swal.fire({
        icon: 'error',
        title: 'Something went wrong...',
        text: 'Both fields are required',   
      })
}

function getValue(e){
    objBusqueda[e.target.name] = e.target.value;
}

function consultarCriptos () {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(respuestaJson => {
            selectCriptos(respuestaJson.Data);
        })
        .catch(error => console.log(error));
}

function selectCriptos(criptos){
    criptos.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;
        const option = document.createElement("option");
        option.value = Name;
        option.textContent = FullName; 
        criptodivisa.appendChild(option)
    })
}

function clearHTML(){
    containerAnswer.innerHTML = '';
}