// Carregar sites do localStorage quando a página é carregada
window.onload = function() {
    var sites = JSON.parse(localStorage.getItem("sites")) || [];
    sites.forEach(function(site) {
        adicionarSiteAoDOM(site);
    });
};

function cadastrarSite() {
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;
    var siteDescription = document.getElementById("siteDescription").value;

    // Adiciona "http://" ao início da URL se não começar com um protocolo
    if (siteURL && !siteURL.startsWith("http://") && !siteURL.startsWith("https://")) {
        siteURL = "http://" + siteURL;
    }

    if (siteName && siteURL && siteDescription) {
        var siteInfo = {
            name: siteName,
            url: siteURL,
            description: siteDescription
        };

        // Obter sites do localStorage, adicionar o novo site e armazenar novamente
        var sites = JSON.parse(localStorage.getItem("sites")) || [];
        sites.push(siteInfo);
        localStorage.setItem("sites", JSON.stringify(sites));

        // Adicionar o novo site à lista na página
        adicionarSiteAoDOM(siteInfo);

        // Limpar os campos do formulário após o cadastro
        document.getElementById("siteForm").reset();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function adicionarSiteAoDOM(siteInfo) {
    var sitesList = document.getElementById("sitesList");
    var siteCard = document.createElement("div");
    siteCard.classList.add("site-card");
    siteCard.innerHTML = `
        <div class="site-header">
            <h2>${siteInfo.name}</h2>
            <button class="delete-button" onclick="excluirSite('${siteInfo.name}')">Excluir</button>
        </div>
        <div class="site-body">
            <p>${siteInfo.description}</p>
            <a href="${siteInfo.url}" class="site-link" target="_blank">Visitar Site</a>
        </div>
    `;
    sitesList.appendChild(siteCard);
}

function excluirSite(nome) {
    var sites = JSON.parse(localStorage.getItem("sites")) || [];
    var novosSites = sites.filter(function(site) {
        return site.name !== nome;
    });
    localStorage.setItem("sites", JSON.stringify(novosSites));

    // Remover o card do DOM usando atributo de data
    var cards = document.querySelectorAll(".site-card");
    cards.forEach(function(card) {
        if (card.querySelector("h2").textContent === nome) {
            card.remove();
        }
    });
}
