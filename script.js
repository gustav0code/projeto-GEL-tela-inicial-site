// Espera o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // HEADER E MENU
    // -----------------------------
    const searchForm = document.querySelector('.search-form');
    const searchBtn = document.querySelector('#search-btn');
    const cabecalho2 = document.querySelector('.cabecalho .cabecalho-2');

    // Toggle do campo de busca
    searchBtn?.addEventListener('click', () => {
        searchForm?.classList.toggle('active');
    });

    // Função para ativar/desativar header ao scroll
    const toggleHeader = () => {
        searchForm?.classList.remove('active');

        if (window.scrollY > 80) {
            cabecalho2?.classList.add('active');
        } else {
            cabecalho2?.classList.remove('active');
        }
    };

    window.addEventListener('scroll', toggleHeader);
    window.addEventListener('load', toggleHeader);

    // -----------------------------
    // SWIPER SLIDER
    // -----------------------------
    if (document.querySelector(".books-slider")) {
        const swiper = new Swiper(".books-slider", {
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 9500,
                disableOnInteraction: false
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
        });
    }

    // -----------------------------
    // FAVORITOS (REMOVER LIVROS)
    // -----------------------------
    const removerBtns = document.querySelectorAll('.acoes-favorito .remover');

    removerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const livro = btn.closest('.livro');
            if (livro) livro.remove();
        });
    });

});

// Botões de favorito
const favoritosBtns = document.querySelectorAll('.btn-favorito');

favoritosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const icone = btn.querySelector('i');

        // Alterna o coração vazio/cheio
        icone.classList.toggle('far'); // vazio
        icone.classList.toggle('fas'); // cheio

        // Aqui você pode adicionar lógica para salvar no localStorage ou na página de favoritos
        // Exemplo: adicionar o livro à lista de favoritos
        const livro = btn.closest('.livro');
        if (icone.classList.contains('fas')) {
            console.log('Livro favoritado:', livro.querySelector('h4, h2').innerText);
        } else {
            console.log('Livro removido dos favoritos:', livro.querySelector('h4, h2').innerText);
        }
    });
});


// --- SELEÇÃO DE GÊNERO / AUTOR ---
document.querySelectorAll('.dropdown-filter').forEach(drop => {
    const btn = drop.querySelector('.dd-btn span');
    const toggle = drop.querySelector('.dd-toggle');

    drop.querySelectorAll('.dd-options button').forEach(item => {
        item.addEventListener('click', () => {
            btn.textContent = item.dataset.value;   // muda o texto do botão
            toggle.checked = false;                // fecha o dropdown
        });
    });
});


// ----- YEAR PICKER -----
document.querySelectorAll(".year-picker").forEach(picker => {
    const grid = picker.querySelector(".yp-grid");
    const range = picker.querySelector(".yp-range");

    let decadeStart = 2000;

    function renderDecade() {
        range.textContent = `${decadeStart} - ${decadeStart + 9}`;
        grid.innerHTML = "";

        for (let year = decadeStart; year < decadeStart + 10; year++) {
            const btn = document.createElement("button");
            btn.textContent = year;
            btn.addEventListener("click", () => {
                picker.closest(".dropdown-filter")
                      .querySelector(".dd-btn span").textContent = year;
                picker.closest(".dropdown-filter")
                      .querySelector(".dd-toggle").checked = false;
            });
            grid.appendChild(btn);
        }
    }

    picker.querySelector(".yp-prev").onclick = () => {
        decadeStart -= 10;
        renderDecade();
    };

    picker.querySelector(".yp-next").onclick = () => {
        decadeStart += 10;
        renderDecade();
    };

    picker.querySelector(".yp-apply").onclick = () => {
        const val = picker.querySelector(".yp-input").value;
        if (val >= 1500 && val <= 2100) {
            picker.closest(".dropdown-filter")
                  .querySelector(".dd-btn span").textContent = val;
            picker.closest(".dropdown-filter")
                  .querySelector(".dd-toggle").checked = false;
        }
    };

    renderDecade();
});
