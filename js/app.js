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
    const {PRICE, MKTCAP, SUPPLY} = data;
    const answer = document.createElement('div');
    answer.classList.add('display-info');
    answer.innerHTML = `
        <p class="main-price">Precio: <span>${PRICE}</span></p>
        <p>Capitalización de mercado: <span>${MKTCAP}</span></p>
        <p>Supply: <span>${SUPPLY}</span></p>
                       `;
    containerAnswer.appendChild(answer); 
}

function showError(){
    Swal.fire({
        icon: 'error',
        title: 'Algo salió mal...',
        text: 'Ambos campos son obligatorios',
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