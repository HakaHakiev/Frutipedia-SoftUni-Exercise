import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFruits } from "../api/data.js";

const dashboardTemplate = (fruits) => html`
  <h2>Fruits</h2>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${fruits.length == 0
      ? html`<h2>No fruit info yet.</h2>`
      : fruits.map(
          (f) => html` <div class="fruit">
            <img src="${f.imageUrl}" alt="example1" />
            <h3 class="title">${f.name}</h3>
            <p class="description">${f.description}</p>
            <a class="details-btn" href="/details/${f._id}">More Info</a>
          </div>`
        )}
  </section>
`;

export async function dashboardPage(ctx) {
  const events = await getAllFruits();
  console.log(events);
  ctx.render(dashboardTemplate(events));
}
