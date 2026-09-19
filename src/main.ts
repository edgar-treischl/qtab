import './information-dashboard';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root element not found');
}

const main = document.createElement('main');
const dashboard = document.createElement('information-dashboard') as any;
dashboard.title = 'Web Component / LIT';

main.appendChild(dashboard);
app.appendChild(main);