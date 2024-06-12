async function fetchProductById(id) {
  try {
    const response = await fetch("./scripts/data.json");
    if (!response.ok) {
      throw new Error("Error while trying to find the file");
    }
    const products = await response.json();
    return products.find((product) => product.id === parseInt(id));
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

async function addProductData() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const product = await fetchProductById(productId);

  if (product) {
    const productDetailsContainer = document.querySelector(".product");

    productDetailsContainer.innerHTML = `
        <div class="container">
          <div class="lado-esquerdo">
            <div class="items">
              <div class="select-image">
                <img
                  src=${product.image}
                  alt="Foto Bolo Principal"
                  height="350"
                />
              </div>
            </div>
          </div>

          <div class="lado-direito">
            <div class="content">
              <h1>${product.name}</h1>
              <p>
                ${product.description}
              </p>
              <div class="select-menus">
                <select name="opcao1" id="opcao1">
                  <option value="" disabled selected>Tamanhos</option>
                  <option value="2kg">Grande - 2Kg</option>
                  <option value="1kg">Médio - 1Kg</option>
                  <option value="500g">Pequeno - 500g</option>
                </select>
              </div>
              <div class="options">
                <span class="preco" id="preco">R$${product.price}</span>
              </div>
            </div>
          </div>
        </div>
    `;

    const preçoMult = document.getElementById('preco');
    const selectMenus = document.querySelectorAll('.select-menus select');

    selectMenus.forEach(select => {
      select.addEventListener('change', () => {
        let novoPreco = parseFloat(product.price);
        const tamanho = document.getElementById('opcao1').value;
        if (tamanho === '2kg') {
          novoPreco *= 4;
        } else if (tamanho === '1kg') {
          novoPreco *= 2;
        } else if (tamanho === '500g') {
        }
        preçoMult.textContent = 'R$' + novoPreco.toFixed(2);
      });
    });
   }
  }
    

document.addEventListener("DOMContentLoaded", addProductData);
