const dados = {
    "insurances": [
        {
            "id": 3322,
            "name": "Amil"
        },
        {
            "id": 3293,
            "name": "Bradesco"
        },
        {
            "id": 99231,
            "name": "Hapvida"
        },
        {
            "id": 1322,
            "name": "CASSI"
        },
        {
            "id": 23111,
            "name": "Sulamérica"
        }
    ],
    "guides": [
        {
            "number": "3210998321",
            "start_date": "2021-04-23T19:18:47.210Z",
            "patient": {
                "id": 9321123,
                "name": "Augusto Ferreira",
                "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
            },
            "insurane_id": 1322,
            "health_insurance": {
                "id": 1322,
                "name": "CASSI",
                "is_deleted": false
            },
            "price": 5567.2
        },
        {
            "number": "287312832",
            "start_date": "2021-04-23T19:18:47.210Z",
            "patient": {
                "id": 93229123,
                "name": "Caio Carneiro",
                "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
            },
            "insurane_id": 1322,
            "health_insurance": {
                "id": 1322,
                "name": "CASSI",
                "is_deleted": false
            },
            "price": 213.3
        },
        {
            "number": "283718273",
            "start_date": "2021-04-22T19:18:47.210Z",
            "patient": {
                "id": 213122388,
                "name": "Luciano José",
                "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
            },
            "insurane_id": 3293,
            "health_insurance": {
                "id": 3293,
                "name": "Bradesco",
                "is_deleted": true
            },
            "price": 88.99
        },
        {
            "number": "009090321938",
            "start_date": "2021-04-20T19:18:47.210Z",
            "patient": {
                "id": 3367263,
                "name": "Felício Santos",
                "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
            },
            "insurane_id": 3293,
            "health_insurance": {
                "id": 3293,
                "name": "Bradesco",
                "is_deleted": true
            },
            "price": 828.99
        },
        {
            "number": "8787128731",
            "start_date": "2021-04-01T19:18:47.210Z",
            "patient": {
                "id": 777882,
                "name": "Fernando Raposo"
            },
            "insurane_id": 3322,
            "health_insurance": {
                "id": 3322,
                "name": "Amil",
                "is_deleted": false
            },
            "price": 772
        },
        {
            "number": "12929321",
            "start_date": "2021-04-02T19:18:47.210Z",
            "patient": {
                "id": 221,
                "name": "Paciente com nome grande pra colocar text ellipsis testando nome com paciente grande"
            },
            "insurane_id": 3322,
            "health_insurance": {
                "id": 3322,
                "name": "Amil",
                "is_deleted": false
            },
            "price": 221
        }
    ]
}

let dadosGuias = dados.guides;
let dadosConvenio = dados.insurances;

let acumulador = [];

function selecionarUsuarios(valor) {
    if (!acumulador.includes(valor)) {
        acumulador.push(valor)
    } else {
        const indice = acumulador.indexOf(valor);
        acumulador.splice(indice, 1);
    }
};

const renderizacaoDeTabela = (guias) => {

    const imprimirGuias = document.querySelector('#minha-tabela');
    let html = '';

    guias.forEach(guia => {
        html += `
        <tr>
        <td><input value="${guia.number}" ${acumulador.includes(parseInt(guia.number)) ? "checked" : "unchecked"} type="checkbox" class="ajustar-checkbox" id="checkbox" onchange="selecionarUsuarios(${guia.number})"></td>
        <td>${new Date(guia.start_date).toLocaleDateString('pt-br')}</td>
        <td>${guia.number}</td>
        <td class="ellipse">
        <img class="imagemPerfil" src="${guia.patient.thumb_url || 'https://via.placeholder.com/150x150.jpg'}">
        ${guia.patient.name}
        </td>
        <td class="text-center ${guia.health_insurance.is_deleted ? "riscar" : ''}">
        ${guia.health_insurance.name}
        </td>
        <td class="text-end">${guia.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
        </tr>
        `
    });

    if (!guias.length) {
        html += '<tr><td colspan="6" style="text-align: center;">Nenhuma guia encontrada!</td></tr>'
    }

    imprimirGuias.innerHTML = html;
};
renderizacaoDeTabela(dadosGuias);

const selecionarConvenio = (convenios) => {

    const imprimirConvenios = document.querySelector('#convenio');
    let html = `<option value="">Selecione</option>`;

    convenios.forEach(convenio => {
        html += `
        <option value="${convenio.id}">${convenio.name}</option>
        `
    });

    imprimirConvenios.innerHTML = html;
};
selecionarConvenio(dadosConvenio);

function filtrar() {
    const buscarGuia = document.querySelector('#pesquisa').value;
    const buscarConvenio = document.querySelector('#convenio').value;
    const buscaNormalizada = buscarGuia.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (!buscaNormalizada && !buscarConvenio) {
        return renderizacaoDeTabela(dadosGuias);
    }

    const guiasFiltradas = dadosGuias.filter(guia => {
        const nomeNormalizado = guia.patient.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const idGuia = guia.insurane_id;
        const numero = guia.number;

        if (acumulador.includes(parseInt(numero))) {
            return true;
        }

        if ((!buscaNormalizada && buscarConvenio) && (idGuia === ~~buscarConvenio)) {
            return true;
        }

        if ((buscaNormalizada && !buscarConvenio) && (nomeNormalizado.includes(buscaNormalizada) || numero.includes(buscaNormalizada))) {
            return true;
        }

        if ((buscaNormalizada && buscarConvenio && idGuia === ~~buscarConvenio) && (nomeNormalizado.includes(buscaNormalizada) || numero.includes(buscaNormalizada))) {
            return true;
        }

        return false;
    });

    renderizacaoDeTabela(guiasFiltradas);
};