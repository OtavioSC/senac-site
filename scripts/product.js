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
                  <option value="opcao1">Tamanho A</option>
                  <option value="opcao2">Tamanho B</option>
                  <option value="opcao3">Tamanho C</option>
                </select>
                <select name="opcao2" id="opcao2">
                  <option value="" disabled selected>Quantidade</option>
                  <option value="opcao1">Quantidade A</option>
                  <option value="opcao2">Quantidade B</option>
                  <option value="opcao3">Quantidade C</option>
                </select>
              </div>
              <div class="options">
                <span class="preco">${product.price}</span>
              </div>
            </div>
          </div>
        </div>
    `;
  } else {
    console.error("Product not found");
  }
}

document.addEventListener("DOMContentLoaded", addProductData);
