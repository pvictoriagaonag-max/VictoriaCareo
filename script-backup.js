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
    const checkoutModal = document.getElementById("checkoutModal");
    const openCheckout = document.getElementById("openCheckout");
    const closeCheckout = document.getElementById("closeCheckout");
    const checkoutOverlay = document.querySelector(".checkout-overlay");
    const checkoutImage = document.getElementById("checkoutImage");
    const checkoutTitle = document.getElementById("checkoutTitle");
    const checkoutPrice = document.getElementById("checkoutPrice");
    const checkoutQuantity = document.getElementById("checkoutQuantity");
    const checkoutTotal = document.getElementById("checkoutTotal");
    const paymentModal = document.getElementById("paymentModal");
    const continuePayment = document.getElementById("continuePayment");
    const closePayment = document.getElementById("closePayment");
    const copyClabe = document.getElementById("copyClabe");
    const clabe = document.getElementById("clabe");
    const successModal = document.getElementById("successModal");
    const confirmWhatsapp = document.getElementById("confirmWhatsapp");
    const sendWhatsapp = document.getElementById("sendWhatsapp");

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

 if (openCheckout && checkoutModal) {
    openCheckout.addEventListener("click", () => {
        console.log("Producto seleccionado:", modalTitle.textContent);
        console.log("Precio:", modalPrice.textContent);

      modal.classList.remove("active");
checkoutModal.classList.add("active");

        console.log("CHECKOUT ABIERTO");
            if (checkoutImage) {
                checkoutImage.src = modalImage.src;
            }
            if (checkoutTitle) {
                checkoutTitle.textContent = modalTitle.textContent;
            }
            if (checkoutPrice) {
                checkoutPrice.textContent = modalPrice.textContent;
            }
            if (checkoutQuantity) {
                checkoutQuantity.textContent = currentQuantity;
            }

            const precio = parseFloat(
                (modalPrice.textContent || "")
                    .replace("$", "")
                    .replace("MXN", "")
                    .trim()
            );

            if (!isNaN(precio) && checkoutTotal) {
                checkoutTotal.textContent = "$" + (precio * currentQuantity).toFixed(2) + " MXN";
            } else if (checkoutTotal) {
                checkoutTotal.textContent = modalPrice.textContent;
            }
        });
    }

    if (closeCheckout) {
        closeCheckout.addEventListener("click", () => checkoutModal.classList.remove("active"));
    }

    if (checkoutOverlay && checkoutModal) {
        checkoutOverlay.addEventListener("click", () => checkoutModal.classList.remove("active"));
    }

   if (continuePayment && paymentModal && checkoutModal) {

    continuePayment.onclick = function (e) {

        e.preventDefault();

        checkoutModal.classList.remove("active");

        paymentModal.classList.add("active");

    };

}

    if (closePayment) {
        closePayment.addEventListener("click", () => paymentModal.classList.remove("active"));
    }

    if (copyClabe && clabe) {
        copyClabe.addEventListener("click", () => {
            navigator.clipboard.writeText(clabe.textContent);
            copyClabe.textContent = "¡Copiada!";
            setTimeout(() => {
                copyClabe.textContent = "Copiar";
            }, 2000);
        });
    }

    if (sendWhatsapp && paymentModal && successModal) {
        sendWhatsapp.addEventListener("click", () => {
            paymentModal.classList.remove("active");
            successModal.classList.add("active");

            const nombre = document.getElementById("customerName")?.value || "";
            const telefono = document.getElementById("customerPhone")?.value || "";
            const correo = document.getElementById("customerEmail")?.value || "";

            const mensaje = `Hola Victoria.

Quiero confirmar mi pedido.

━━━━━━━━━━━━━━

Producto:
${checkoutTitle?.textContent || ""}

Cantidad:
${checkoutQuantity?.textContent || ""}

Total:
${checkoutTotal?.textContent || ""}

━━━━━━━━━━━━━━

Nombre:
${nombre}

Teléfono:
${telefono}

Correo:
${correo}

Ya realicé la transferencia.

Adjunto mi comprobante.

Muchas gracias.`;

            window.open(`https://wa.me/524433941042?text=${encodeURIComponent(mensaje)}`, "_blank");
        });
    }

    if (confirmWhatsapp && paymentModal && successModal && checkoutModal) {
        confirmWhatsapp.addEventListener("click", () => {
            const nombre = document.getElementById("customerName")?.value || "";
            const telefono = document.getElementById("customerPhone")?.value || "";
            const correo = document.getElementById("customerEmail")?.value || "";
            const entregaSeleccionada = document.querySelector('input[name="delivery"]:checked');
            const entrega = entregaSeleccionada ? entregaSeleccionada.value : "No especificada";

            const mensaje = `🦶 *NUEVO PEDIDO - VICTORIA CARE*

━━━━━━━━━━━━━━

📦 Producto:
${checkoutTitle?.textContent || ""}

🔢 Cantidad:
${checkoutQuantity?.textContent || ""}

💲 Total:
${checkoutTotal?.textContent || ""}

━━━━━━━━━━━━━━

👤 Cliente:
${nombre}

📞 Teléfono:
${telefono}

📧 Correo:
${correo}

🚚 Entrega:
${entrega}

Ya realicé la transferencia.

Adjunto mi comprobante.

Muchas gracias.`;

            window.open(`https://wa.me/524433941042?text=${encodeURIComponent(mensaje)}`, "_blank");
            successModal.classList.remove("active");
            paymentModal.classList.remove("active");
            checkoutModal.classList.remove("active");
            modal.classList.remove("active");
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductFlow);
} else {
    initProductFlow();
}