alert("¡Hola, Bienvenid@ a RamaSwap! Toca enter para continuar");
alert("Escribe el número correspondiente a la criptomoneda que buscas");
let opcion = parseInt(prompt(("1-BTC 2-ETH 3-DOT 4-BNB 5-KDA 6-KSM 7-LINK 8-LTC 9-XMR 10-MATIC")));

const suma = (a, b) => a + b;
const división = (a, b) => a / b;

function Criptos(nombre, precio){
    this.nombre = nombre;
    this.precio = precio;
}

const bitcoin = new Criptos("btc", 20300);
const ethereum = new Criptos("eth", 1150);
const polkadot = new Criptos("dot", 7);
const binance = new Criptos("bnb", 230);
const kadena = new Criptos("kda", 1.5);
const kusama = new Criptos("ksm", 50);
const chainlink = new Criptos("link", 6);
const litecoin = new Criptos("ltc", 51);
const monero = new Criptos("xmr", 133);
const polygon = new Criptos("matic", 0.7);

const fee = x => x * 0.005;
let btcFee = suma (bitcoin.precio, fee(bitcoin.precio));
let ethFee = suma (ethereum.precio, fee(ethereum.precio));
let dotFee = suma (polkadot.precio, fee(polkadot.precio));
let bnbFee = suma (binance, fee(binance.precio));
let kdaFee = suma (kadena.precio, fee(kadena.precio));
let ksmFee = suma (kusama.precio, fee(kusama.precio));
let linkFee = suma (chainlink.precio, fee(chainlink.precio));
let ltcFee = suma (litecoin.precio, fee(litecoin.precio));
let xmrFee = suma (monero.precio, fee(monero.precio));
let maticFee = suma (polygon.precio, fee(polygon.precio));

let usdt = parseInt(prompt("¿Cuántos USDT quieres swapear?"));
let btcNominales = división (usdt, btcFee);
let ethNominales = división (usdt, ethFee);
let dotNominales = división (usdt, dotFee);
let bnbNominales = división (usdt, bnbFee);
let kdaNominales = división (usdt, kdaFee);
let ksmNominales = división (usdt, ksmFee);
let linkNominales = división (usdt, linkFee);
let ltcNominales = división (usdt, ltcFee);
let xmrNominales = división (usdt, xmrFee);
let maticNominales = división (usdt, maticFee);

alert("Toca aceptar para finalizar el swap")

switch (opcion){
    case 1: let btcFinal = `Tienes ${btcNominales} BTC`;
    alert(btcFinal); 
    break;
    case 2: let ethFinal = `Tienes ${ethNominales} ETH`;
    alert(ethFinal); 
    break;
    case 3: let dotFinal = `Tienes ${dotNominales} DOT`;
    alert(dotFinal);
    break; 
    case 4: let bnbFinal = `Tienes ${bnbNominales} BNB`;
    alert(bnbFinal);
    break; 
    case 5: let kdaFinal = `Tienes ${kdaNominales} KDA`;
    alert(kdaFinal);
    break; 
    case 6: let ksmFinal = `Tienes ${ksmNominales} KSM`;
    alert(ksmFinal);
    break; 
    case 7: let linkFinal = `Tienes ${linkNominales} LINK`;
    alert(linkFinal);
    break; 
    case 8: let ltcFinal = `Tienes ${ltcNominales} LTC`;
    alert(ltcFinal);
    break; 
    case 9: let xmrFinal = `Tienes ${xmrNominales} XMR`;
    alert(xmrFinal);
    break; 
    case 10: let maticFinal = `Tienes ${maticNominales} MATIC`;
    alert(maticFinal);
    break; 
}

const productos = [
    { ticket: "BTC", nombre: "Bitcoin", precio: 20300},    
    { ticket: "ETH", nombre: "Ethereum", precio: 1150},
    { ticket: "DOT", nombre: "Polkadot", precio: 7},
    { ticket: "BNB", nombre: "Binance", precio: 230},
    { ticket: "KDA", nombre: "Kadena", precio: 1.5},
    { ticket: "KSM", nombre: "Kusama", precio: 50},
    { ticket: "LINK", nombre: "Chainlink", precio: 6},
    { ticket: "LTC", nombre: "Litecoin", precio: 51},
    { ticket: "XMR", nombre: "Monero", precio: 133},
    { ticket: "MATIC", nombre: "Polygon", precio: 0.7}
];

for(const producto of productos){
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<h3>${producto.ticket}</h3>
                            <p>${producto.nombre}</p>                          
                            <b>$${producto.precio}</b>`;
    document.body.append(contenedor);
}

let btn = document.getElementById("btn");
let formulario = document.getElementById("formulario");

btn.addEventListener("mousedown", () => {
    formulario.className = "violeta"
});

btn.addEventListener(`click`, agregar);

function agregar() {
    alert("Tomamos tu sugerencia, muchas gracias");
}

localStorage.setItem("cryptocurrency", JSON.stringify(opcion));
    