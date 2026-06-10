const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTI3YzA2M2VlN2ViYWMzNjkxOTUxOWIiLCJpYXQiOjE3ODEwMjA3OTZ9.Hoe5h_TRwTiA6Lt4VDS5jzsCSMMpI5heTJpGbpCdAG4";
const getData = () => {
  fetch("http://localhost:5000/todos/alltodos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
getData();
