const obj = "1";

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify(obj),
})
  .then((response) => response.json())
  .then((json) => console.log(json));
