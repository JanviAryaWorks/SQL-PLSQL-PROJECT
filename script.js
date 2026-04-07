async function init() {
    const params = new URLSearchParams(window.location.search);
    const catName = params.get('cat');
    const expectedCount = parseInt(params.get('count')) || 10;
    
    if (!catName) return;

    document.getElementById('current-category').innerText = catName.replace('_', ' ');
    const list = document.getElementById('query-list');
    
    let jsonData = [];
    try {
        const response = await fetch(`data/${catName.toLowerCase()}.json`);
        if (response.ok) {
            jsonData = await response.json();
        }
    } catch (e) {
        console.log("JSON file not found yet, generating placeholders...");
    }

    // Har number ke liye card banana (chahe data ho ya na ho)
    for (let i = 1; i <= expectedCount; i++) {
        const item = jsonData[i - 1] || { 
            question: `Question Number ${i} for ${catName}`, 
            query: `-- Query ${i} pending...`, 
            output: `Output ${i} pending...` 
        };

        const div = document.createElement('div');
        div.className = 'query-item';
        div.innerHTML = `<span class="q-number">${i}</span> <span class="q-text">Query Problem ${i}</span>`;
        
        div.onclick = () => {
            document.querySelectorAll('.query-item').forEach(el => el.classList.remove('active'));
            div.classList.add('active');
            
            document.getElementById('welcome-screen').classList.add('hidden');
            document.getElementById('detail-view').classList.remove('hidden');
            document.getElementById('display-question').innerText = item.question;
            document.getElementById('display-query').innerText = item.query;
            document.getElementById('display-output').innerText = item.output;
        };
        list.appendChild(div);
    }
    document.getElementById('query-count').innerText = `${expectedCount} Problems Total`;
}
init();