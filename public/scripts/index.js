const burgerNameEl = document.getElementById("burgerName");
const buttonEl = document.getElementById("button");
const devouredEl = document.getElementById("devoured");
const notDevouredEl = document.getElementById("notdevoured");
const background = ["burgerbbbb.jpg", "burger.jpeg", "burgerbb.jpeg"];

/***********************************
  This renders the burgers onto the 
  screen and sorts between devoured 
  and not devoured
 ***********************************/
function renderBurgers() {
  /*******************************
  Clears what was previously there
  *******************************/
  devouredEl.innerHTML = "";
  notDevouredEl.innerHTML = "";

  /*******************************
  A get request for the burgers in 
  the database
  *******************************/
  axios.get("/api/burgers").then(function(response) {
    burgers = response.data;

    /*******************************
    Renders the burgers on the page
   *******************************/
    for (let i = 0; i < burgers.length; i++) {
      burger = burgers[i];
      burgerEl = document.createElement("li");
      burgerEl.innerHTML = burger.name;
      burgerEl.id = burger.id;

      /*******************************
    Sorts between devoured and not 
    devoured, adding event listeners
    to both that send to update or 
    destroy the burger on click
   *******************************/
      if (burger.devoured) {
        devouredEl.append(burgerEl);
        burgerEl.addEventListener("click", () =>
          destroyBurger(event.target.id)
        );
      } else {
        notDevouredEl.append(burgerEl);
        burgerEl.addEventListener("click", () => updateBurger(event.target.id));
      }
    }
  });
}
renderBurgers();

/*******************************
  When a non-devoured burger is 
  clicked it will update to show
  that it is devoured
 *******************************/
function updateBurger(id) {
  console.log(id);
  axios
    .post("/api/update/" + id, {
      name: name
    })
    .then(function(response) {
      console.log(response);
      renderBurgers();
    })
    .catch(function(error) {
      console.log(error);
      renderBurgers();
    });
}

/*******************************
When a devoured burger is clicked
it will destrory the burger and 
delete it from the database
*******************************/
function destroyBurger(id) {
  console.log(id);
  axios
    .post("/api/destroy/" + id, {
      name: name
    })
    .then(function(response) {
      console.log(response);
      renderBurgers();
    })
    .catch(function(error) {
      console.log(error);
      renderBurgers();
    });
}

/*******************************
When the button is clicked it will
add the burger name in the input
field to the databse and rerender
the burgers
 *******************************/
buttonEl.addEventListener("click", () => {
  const name = burgerNameEl.value;
  console.log(name);
  axios
    .post("/api/add", {
      name: name
    })
    .then(function(response) {
      console.log(response);
      renderBurgers();
    })
    .catch(function(error) {
      console.log(error);
      renderBurgers();
    });
});
