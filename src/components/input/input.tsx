import React from "../../react";

const CustomComponent = (props?: any, ...children: any) => {
  const {useState, createElement} = React();
  const [count, setCount] = useState(1);
  const [string, setString] = useState("vatsal"); 
  const apples = createElement("button", { className: "item", onClick: () => setCount(400) }, "Apples");
  const carrots = createElement("button", { className: "item", onClick: () => setString("ridham") }, "Carrots");
  const bananas = createElement("button", { className: "item", onClick :() => {console.log(count, string)} }, "Bananas");

  const list = createElement("ul", { className: "shopping-list" }, apples, carrots, bananas);
  return list;
}

export default CustomComponent
