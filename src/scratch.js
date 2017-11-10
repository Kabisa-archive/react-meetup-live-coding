import "babel-polyfill";
import { render, h, Component } from "preact";
import style from "./myStyle.scss";

// insert code here ...
const root = document.querySelector("#maji-app");

const TodoItem = ({ name, done, onClick }) => (
  <li class={done && style.done} onClick={onClick}>
    {done ? <del>{name}</del> : name}
  </li>
);

const TodoList = ({ items, onTodoClick }) => (
  <ol>
    {items.map((item, i) => (
      <TodoItem key={i} onClick={() => onTodoClick(item)} {...item} />
    ))}
  </ol>
);

class TodoListContainer extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      newTodo: ""
    };
  }

  componentWillMount() {
    this.setState({ items: this.props.items });
  }

  updateNewTodo = e => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = () => {
    this.setState({
      items: [...this.state.items, { name: this.state.newTodo, done: false }],
      newTodo: ""
    });
  };

  toggleTodo = item => {
    const newItems = this.state.items.map(
      todoItem => (todoItem === item ? { ...item, done: !item.done } : todoItem)
    );
    this.setState({
      items: newItems
    });
  };

  render(props, { items, newTodo }) {
    return (
      <div>
        <TodoList items={items} onTodoClick={this.toggleTodo} />
        <input type="text" value={newTodo} onInput={this.updateNewTodo} />
        <button type="button" onClick={this.addTodo}>
          Add Todo
        </button>
      </div>
    );
  }
}

const items = [
  { name: "Item 1", done: true },
  { name: "Item 2", done: false },
  { name: "Item 3", done: false },
  { name: "Item 4", done: false }
];

render(
  <div>
    <p>hallo</p>
    <TodoListContainer items={items} />
  </div>,
  root,
  root.firstChild
);

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
