import "babel-polyfill";
import { h, render } from "preact";

const root = document.querySelector("#maji-app");
root.innerHTML = "";
render(
  <section>
    <h1>Hello there</h1>
    <p>This is a html page</p>
    <p>With some paragraphs</p>
    <ul>
      <li>Todo 1</li>
      <li>Todo 2</li>
      <li>Todo 3</li>
    </ul>
  </section>,
  root,
  root.firstChildElement
);

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
