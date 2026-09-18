import './information-dashboard';
const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
throw new Error('App root element not found');
}

app.innerHTML = `
<main> <information-dashboard title="Production Status" environment="production"> </information-dashboard> </main> `;