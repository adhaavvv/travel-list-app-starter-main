import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItem }) {
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!desc.trim()) return;

    const newItem = {
      id: Date.now(),
      description: desc,
      quantity: Number(qty),
      packed: false,
    };

    onAddItem(newItem);

    // Reset form
    setDesc("");
    setQty(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <label>Quantity:</label>
      <select value={qty} onChange={(e) => setQty(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
<li style={item.packed ? { textDecoration: "line-through" } : {}}>

<input
  type="checkbox"
  checked={item.packed}
  onChange={() => onUpdateItem(item.id)}
/>

{item.description} ({item.quantity})

<button onClick={() => onDeleteItem(item.id)}>❌</button>

</li>

  );
}

function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem}/>
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const total = items.length;
  const packed = items.filter((item) => item.packed).length;
  const percentage = total ? Math.round((packed / total) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        You have {total} items in the list. You already packed {packed} ({percentage}%).
      </em>
    </footer>
  );
}

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id) {
  setItems((items) =>
    items.map((item) =>
      item.id === id
        ? { ...item, packed: !item.packed }
        : item
    )
  );
}


  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem}/>
      <Stats items={items} />
    </div>
  );
}
