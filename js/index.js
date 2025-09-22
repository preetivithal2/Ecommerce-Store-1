// modal for bags
        document.querySelectorAll(".view-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const card = this.closest(".product-card");

                // document.getElementById("modalProductName").innerText = card.dataset.name;
                document.getElementById("modalProductImage").src = card.dataset.image;
                document.getElementById("modalProductPrice").innerText = card.dataset.price;
                document.getElementById("modalProductOffer").innerText = card.dataset.offer;
                document.getElementById("modalProductRating").innerText = card.dataset.rating;
                document.getElementById("modalProductDescription").innerText = card.dataset.description;
            });
        });
