import { html } from "../../node_modules/lit-html/lit-html.js";
import { addFruit } from "../api/data.js";

const createTemplate = (onSubmit) => html`
  <section id="create">
    <div class="form">
      <h2>Add Fruit</h2>
      <form class="create-form" @submit=${onSubmit}>
        <input type="text" name="name" id="name" placeholder="Fruit Name" />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image"
        />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
        ></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add Fruit</button>
      </form>
    </div>
  </section>
`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(fruit) {
    fruit.preventDefault();
    const formData = new FormData(fruit.target);

    const newFruit = {
      name: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
      nutrition: formData.get("nutrition"),
    };

    if (Object.values(newFruit).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addFruit(newFruit);
    fruit.target.reset();
    ctx.page.redirect("/dashboard");
  }
}
