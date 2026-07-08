/*=========================================================
PRODUCTOS - MODAL
=========================================================*/

function initProductFlow() {
    const modal = document.getElementById("productModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");
    const openButtons = document.querySelectorAll(".open-product");
    const closeModal = document.getElementById("closeModal");
    const overlay = document.querySelector(".product-modal-overlay");
    const quantity = document.getElementById("quantity");
    const plusQty = document.getElementById("plusQty");
    const minusQty = document.getElementById("minusQty");
    const buyWhatsapp = document.getElementById("buyWhatsapp");
    if (!modal || !modalImage || !modalTitle || !modalPrice || !modalCategory || !modalDescription) {
        return;
    }

    let currentQuantity = 1;

    openButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modal.classList.add("active");
            modalImage.src = button.dataset.image || "";
            modalTitle.textContent = button.dataset.name || "Producto";
            modalPrice.textContent = button.dataset.price || "";
            modalCategory.textContent = button.dataset.category || "";
            modalDescription.textContent = button.dataset.description || "";
            currentQuantity = 1;
            if (quantity) {
                quantity.textContent = currentQuantity;
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener("click", () => modal.classList.remove("active"));
    }

    if (overlay) {
        overlay.addEventListener("click", () => modal.classList.remove("active"));
    }

    if (plusQty) {
        plusQty.addEventListener("click", () => {
            currentQuantity++;
            if (quantity) {
                quantity.textContent = currentQuantity;
            }
        });
    }

    if (minusQty) {
        minusQty.addEventListener("click", () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                if (quantity) {
                    quantity.textContent = currentQuantity;
                }
            }
        });
    }
if (buyWhatsapp) {

    buyWhatsapp.addEventListener("click", () => {

        const precioTexto = modalPrice.textContent;

        const precio = parseFloat(
            precioTexto
                .replace("$", "")
                .replace("MXN", "")
                .trim()
        );

        const total = precio * currentQuantity;

        const mensaje = `Hola Victoria 👋

Me interesa adquirir el siguiente producto:

🧴 ${modalTitle.textContent}

📦 Cantidad:
${currentQuantity}

💲 Precio:
${precioTexto}

💰 Total:
$${total.toFixed(2)} MXN

¿Podrías compartirme los datos para realizar la transferencia?

Muchas gracias.`;

        window.open(
            "https://wa.me/524433941042?text=" + encodeURIComponent(mensaje),
            "_blank"
        );

    });

}

}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductFlow);
} else {
    initProductFlow();
}