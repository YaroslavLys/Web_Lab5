import {
  getInputValues,
  renderCardsList,
  EDIT_BUTTON_PREFIX,
    DELETE_BUTTON_PREFIX,
  clearInputs
} from "./dom_util.js"
import {deleteVase, getallVases, postVase, updateVase} from "./vases.js";

const formFields = document.getElementsByClassName("form-control");
const submitButton = document.getElementById("submit_button");

const searchButton = document.getElementById("search_btn");
const clearSearchButton = document.getElementById("clear_search_btn");
const searchInput = document.getElementById("search_input");
const sortCheckbox = document.getElementById("sort_checkbox");
const countButton = document.getElementById("count_btn");


let vases = [];


const onEditItem = async (e) => {
  const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");

  await updateVase(itemId, getInputValues())

  clearInputs();
  
  refetchallVases();
};

const onDeleteItem = async (e) => {
    const itemId = e.target.id.replace(DELETE_BUTTON_PREFIX, "");
    await deleteVase(itemId)
    refetchallVases();
}


const refetchallVases = () => {
  const allVases = getallVases();
  vases = allVases.sort((card1,card2) =>card2.name.localeCompare(card1.name));
  renderCardsList(vases, onEditItem, onDeleteItem);
};


const validateInput = () => {
  if (Array.from(formFields).filter(x => x.value.trim() === "").length !== 0) {
    alert("Please fill out required fields"); 
    return false;
  }
}


submitButton.addEventListener("click", (event) => {
    event.preventDefault();
  if (!validateInput()) {
    return;
  }
    const { name, description, price, volume } = getInputValues();

    postVase({
        name,
        description,
        price,
        volume
    })
    clearInputs();
    
    refetchallVases()
});


searchButton.addEventListener("click", () => {
  const foundVases = vases.filter(
    (vase) => vase.name.search(searchInput.value) !== -1);
  renderCardsList(foundVases, onEditItem, onDeleteItem);
});

clearSearchButton.addEventListener("click", () => {
  renderCardsList(vases, onEditItem, onDeleteItem);
  searchInput.value = "";
});

sortCheckbox.addEventListener("change", function (e) {
    if (this.checked) {
        const sortedVases = vases.sort(
            (card1, card2) => parseFloat(card1.volume) - parseFloat(card2.volume));
        renderCardsList(sortedVases, onEditItem);
    }
    else {
        refetchallVases();
    }
});


countButton.addEventListener("click", () => {
    let sum = vases.map(o => o.price).reduce((a, c) => { return a + c });
    document.getElementById("total-price").innerText = sum;
    console.log(sum);
})

refetchallVases();  