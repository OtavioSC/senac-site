async function fetchProducts() {
  try {
    const response = await fetch("./scripts/data.json");
    if (!response.ok) {
      throw new Error("A resposta da rede não foi boa");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function addProducts() {
  const products = await fetchProducts();
  const productsContainer = document.querySelector(".products");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");

    productCard.innerHTML = `
      <img
        class="card-image"
        src="${product.image}"
        alt="Imagem"
        width="200"
      />
      <div class="card-content">
        <div>
          <p class="card-title"><a href="produto.html?id=${product.id}">${product.name}</a></p>
          <p class="card-description">${product.description}</p>
        </div>
        <div class="card-buy">
          <span class="card-price">R$${product.price}</span>
        </div>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });
}

document.addEventListener("DOMContentLoaded", addProducts);
