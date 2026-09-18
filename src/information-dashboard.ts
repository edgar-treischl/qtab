import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('information-dashboard')
export class InformationDashboard extends LitElement {

  @property()
  title = 'Information Dashboard';

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }

    .dashboard {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
  `;

  render() {
    return html`
      <section class="dashboard">
        <h1>${this.title}</h1>

        <p>
          Hello from a Lit Web Component.
        </p>
      </section>
    `;
  }
}
