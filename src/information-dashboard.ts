import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class InformationDashboard extends LitElement {

  @property()
  declare title: string;

  constructor() {
    super();
    this.title = 'Information Dashboard';
  }

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }

    .dashboard {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
  `;

  render() {
    return html`
      <section class="dashboard">
        <h1>${this.title}</h1>
        <p>Hello Lit!</p>
      </section>
    `;
  }
}

customElements.define('information-dashboard', InformationDashboard);
