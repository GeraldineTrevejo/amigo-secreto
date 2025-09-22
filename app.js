console.log("app.js cargado");

// ===== estado =====
const amigos = [];

// ===== helpers =====
function normalizarNombre(texto) {
  return texto.trim().replace(/\s+/g, ' ');
}
function limpiarResultados() {
  const resultado = document.getElementById('resultado');
  if (resultado) resultado.innerHTML = '';
}

// ===== acciones =====
function agregarAmigo() {
  const input = document.getElementById('amigo');
  const lista = document.getElementById('listaAmigos');
  if (!input || !lista) return;

  const valor = normalizarNombre(input.value);
  if (!valor) { alert('Por favor, inserte un nombre.'); return; }

  const yaExiste = amigos.some(n => n.toLowerCase() === valor.toLowerCase());
  if (yaExiste) { alert('Ese nombre ya fue agregado.'); input.value=''; input.focus(); return; }

  amigos.push(valor);
  renderLista();
  limpiarResultados();
  input.value = '';
  input.focus();
}

function renderLista() {
  const lista = document.getElementById('listaAmigos');
  if (!lista) return;
  lista.innerHTML = '';
  for (let i = 0; i < amigos.length; i++) {
    const li = document.createElement('li');
    li.textContent = amigos[i];
    lista.appendChild(li);
  }
}

function sortearAmigo() {
  const resultado = document.getElementById('resultado');
  if (amigos.length === 0) { alert('No hay nombres para sortear. Agrega al menos uno.'); return; }
  const indice = Math.floor(Math.random() * amigos.length);
  const elegido = amigos[indice];
  if (resultado) resultado.innerHTML = `<li>🎉 El amigo secreto es: <strong>${elegido}</strong></li>`;
}

// ===== wiring =====
document.addEventListener('DOMContentLoaded', () => {
  const btnAdd = document.getElementById('btn-add');
  const btnDraw = document.getElementById('btn-draw');
  const input = document.getElementById('amigo');

  btnAdd?.addEventListener('click', agregarAmigo);
  btnDraw?.addEventListener('click', sortearAmigo);

  input?.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') agregarAmigo();
  });
});


