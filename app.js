// ===== estado =====
window.amigos = [];

// ===== helpers =====
function normalizarNombre(texto) {
  return texto.trim().replace(/\s+/g, ' ');
}
function limpiarResultados() {
  const resultado = document.getElementById('resultado');
  if (resultado) resultado.innerHTML = '';
}

// ===== acciones (expuestas a window para que onclick las encuentre) =====
window.agregarAmigo = function () {
  const input = document.getElementById('amigo');
  const lista = document.getElementById('listaAmigos');
  if (!input || !lista) return;

  const valor = normalizarNombre(input.value);
  if (!valor) { alert('Por favor, inserte un nombre.'); return; }

  const yaExiste = window.amigos.some(n => n.toLowerCase() === valor.toLowerCase());
  if (yaExiste) { alert('Ese nombre ya fue agregado.'); input.value=''; input.focus(); return; }

  window.amigos.push(valor);
  renderLista();
  limpiarResultados();
  input.value = '';
  input.focus();
};

function renderLista() {
  const lista = document.getElementById('listaAmigos');
  if (!lista) return;
  lista.innerHTML = '';
  for (let i = 0; i < window.amigos.length; i++) {
    const li = document.createElement('li');
    li.textContent = window.amigos[i];
    lista.appendChild(li);
  }
}

window.sortearAmigo = function () {
  const resultado = document.getElementById('resultado');
  if (window.amigos.length === 0) { alert('No hay nombres para sortear. Agrega al menos uno.'); return; }
  const indice = Math.floor(Math.random() * window.amigos.length);
  const elegido = window.amigos[indice];
  if (resultado) resultado.innerHTML = `<li>🎉 El amigo secreto es: <strong>${elegido}</strong></li>`;
};

// Enter para agregar
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('amigo');
  if (input) input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') window.agregarAmigo();
  });
});
