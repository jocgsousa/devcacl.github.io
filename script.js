var modules = JSON.parse(localStorage.getItem('modules')) || [];

function saveModules() {
    localStorage.setItem('modules', JSON.stringify(modules));
}

function addModule() {
    const moduleName = document.getElementById('moduleName').value;
    const segment = document.getElementById('segment').value;
    const screens = parseFloat(document.getElementById('screens').value);
    const hoursPerScreen = parseFloat(document.getElementById('hoursPerScreen').value);
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const backendHours = parseFloat(document.getElementById('backendHours').value);
    const serverHours = parseFloat(document.getElementById('serverHours').value);
    const qaPercentage = parseFloat(document.getElementById('qaPercentage').value);
    const profitMargin = parseFloat(document.getElementById('profitMargin').value);

    const module = {
        moduleName,
        segment,
        screens,
        hoursPerScreen,
        hourlyRate,
        backendHours,
        serverHours,
        qaPercentage,
        profitMargin
    };

    modules.push(module);
    saveModules();
    setTimeout(() => {
        reloadModules();
    }, 300);
}

function displayModules() {
    const modulesContainer = document.getElementById('modules');
    modulesContainer.innerHTML = '';

    modules.forEach((module, index) => {
        const moduleElement = document.createElement('div');
        moduleElement.className = 'module-item';
        moduleElement.innerHTML = `
            <button type="button" onclick="remover(${index})">Remover</button>
            <h3>${module.moduleName} (${module.segment})</h3>
            <p>Número de Telas/Funcionalidades: ${module.screens}</p>
            <p>Horas por Tela/Funcionalidade: ${module.hoursPerScreen}</p>
            <p>Valor por Hora (R$): ${module.hourlyRate}</p>
            <p>Horas de Desenvolvimento Back-end: ${module.backendHours}</p>
            <p>Horas de Configuração do Servidor: ${module.serverHours}</p>
            <p>Percentual de Horas para QA e Testes: ${module.qaPercentage}%</p>
            <p>Margem de Lucro: ${module.profitMargin}%</p>
        `;
        modulesContainer.appendChild(moduleElement);
    });
}

function calculateTotalCost() {
    let totalHours = 0;
    let totalCost = 0;
    let totalWithProfit = 0;

    modules.forEach(module => {
        const totalScreenHours = module.screens * module.hoursPerScreen;
        const totalDevelopmentHours = totalScreenHours + module.backendHours + module.serverHours;
        const qaHours = (totalDevelopmentHours * module.qaPercentage) / 100;
        const totalModuleHours = totalDevelopmentHours + qaHours;
        const moduleCost = totalModuleHours * module.hourlyRate;
        const moduleWithProfit = moduleCost * (1 + module.profitMargin / 100);

        totalHours += totalModuleHours;
        totalCost += moduleCost;
        totalWithProfit += moduleWithProfit;
    });

    const workHoursPerDay = 8;
    const totalDays = totalHours / workHoursPerDay;

    const totalResultContainer = document.getElementById('totalResult');
    totalResultContainer.innerHTML = `
        <h2>Total do Projeto</h2>
        <p>Total de Horas: ${totalHours.toFixed(2)}</p>
        <p>Total de Dias: ${totalDays.toFixed(2)}</p>
        <p>Custo Total (R$): ${totalCost.toFixed(2)}</p>
        <p>Valor Final com Lucro (R$): ${totalWithProfit.toFixed(2)}</p>
    `;
}


function remover(index) {
    const rmodules = JSON.parse(localStorage.getItem('modules')) || [];
    const mod = rmodules[index];
    if (mod) {
        const resultado = confirm(`Você deja remover o modulo: ${mod.moduleName} ?`)
        // Verifica o resultado
        if (resultado) {
            // Se o usuário clicou em "Sim"
            const nmodules = rmodules.filter((m, i) => i !== index);
            console.log(index);
            console.log(nmodules);
            localStorage.setItem('modules', JSON.stringify(nmodules));
            reloadModules();
        } else {
            // Se o usuário clicou em "Não" ou cancelou
        }

    }
}

function reloadModules() {
    modules = JSON.parse(localStorage.getItem('modules')) || [];
    displayModules();
    calculateTotalCost();
}


window.onload = displayModules;

window.onload = setTimeout(() => { calculateTotalCost(), displayModules() }, 300); 


