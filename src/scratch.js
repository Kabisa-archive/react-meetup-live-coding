import "babel-polyfill";
import { render, h, Component } from "preact";

const root = document.querySelector("#maji-app");

const TodoItem = ({ name, done, onClick }) => (
  <li onClick={onClick}>{done ? <del>{name}</del> : name}</li>
);

const TodoList = ({ items, onTodoClick }) => (
  <ol>
    {items.map((item, i) => (
      <TodoItem
        key={i}
        {...item}
        onClick={() => {
          onTodoClick(item);
        }}
      />
    ))}
  </ol>
);

const items = [
  { name: "Make todo", done: true },
  { name: "Extract components", done: false },
  { name: "Add add todo", done: false }
];

class TodoListContainer extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      newTodo: ""
    };
  }

  componentWillMount() {
    this.setState({
      items: this.props.items
    });
  }

  addTodo = () => {
    this.setState({
      items: [...this.state.items, { name: this.state.newTodo }],
      newTodo: ""
    });
  };

  updateNewTodo = e => {
    this.setState({
      newTodo: e.target.value
    });
  };

  todoClick = todo => {
    const index = this.state.items.indexOf(todo);
    const newList = [...this.state.items];
    const item = newList[index];

    newList[index] = {
      ...item,
      done: !item.done
    };

    this.setState({ items: newList });
  };

  render(props, { items, newTodo }) {
    return (
      <div>
        <TodoList items={items} onTodoClick={this.todoClick} />
        <input
          type="text"
          placeholder="Your next item done!"
          onInput={this.updateNewTodo}
          value={newTodo}
        />
        <button type="button" onClick={this.addTodo}>
          Add
        </button>
      </div>
    );
  }
}

render(
  <section>
    <p>Hello there</p>
    <p>How are you!?</p>
    <TodoListContainer items={items} />
  </section>,
  root,
  root.firstChild
);

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
