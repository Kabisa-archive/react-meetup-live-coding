import "babel-polyfill";
import { h, render, Component } from "preact";

const TodoItem = ({ name }) => <li>{name}</li>;

const TodoList = ({ items }) => (
  <ul>{items.map((item, i) => <TodoItem name={item.name} />)}</ul>
);

const root = document.querySelector("#maji-app");
root.innerHTML = "";

const todoItems = [
  { name: "Todo 1", done: true },
  { name: "Todo 2", done: false },
  { name: "Todo 3", done: false }
];

class TodoListContainer extends Component {
  constructor() {
    super();
    this.state = { items: [], newTodo: "" };
  }

  componentWillMount() {
    this.setState({ items: this.props.items });
  }

  render(props, { items, newTodo }) {
    const addTodo = () => {
      this.setState({
        items: this.state.items.concat({ name: this.state.newTodo }),
        newTodo: ""
      });
    };

    const updateNewTodo = e => {
      this.setState({ newTodo: e.target.value });
    };

    return (
      <div>
        <TodoList items={items} />
        <input type="text" value={newTodo} onInput={updateNewTodo} />
        <button type="button" onClick={addTodo}>
          Add new todo
        </button>
      </div>
    );
  }
}

render(
  <section>
    <h1>Hello there</h1>
    <p>This is a html page</p>
    <p>With some paragraphs</p>
    <TodoListContainer items={todoItems} />
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
