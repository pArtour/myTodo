const addBtn = document.querySelector('.add-btn')
const checkALldBtn = document.querySelector('.check-all-btn');
const deleteAllBtn = document.querySelector('.delete-btn');
const input = document.querySelector('.input-text');
const list = document.querySelector('.list');

let items = JSON.parse(localStorage.getItem('items')) || [];

function addItem() {
  if (input.value) {
    const text = input.value;
    const item = {
      text,
      done: false
    }
    items.push(item);

    populateList(items, list);
    localStorage.setItem('items', JSON.stringify(items));
    input.value = '';
  }
}

function populateList(items = [], list) {
  list.innerHTML = items.map((item, index) => {
    return `
      <li>
        <input class="check" data-index="${index}" type="checkbox" name="check-item" id="item-${index}" ${item.done ? 'checked' : ''}>
        <label class="label" for="item-${index}"><span class="item-text">${item.text}</span></label>
        <input class="remove-btn" data-index="${index}" type="button" value="✖">
      </li>
`;
  }).join('');
};

function toggleDone(event) {
  if (event.target.matches('input')) {
    const element = event.target;
    const index = element.dataset.index;
    items[index].done = !items[index].done;
    populateList(items, list);
    localStorage.setItem('items', JSON.stringify(items));
  }
}

function clearList(event) {
  event.preventDefault();
  items = [];
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, list);
};

function checkAllFunc(event) {
  event.preventDefault();
  items.forEach(item => item.done = true);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, list);
}
function removeElem(event) {
  if (event.target.classList.contains('remove-btn')) {
    console.log(event.target);
    
    const index = event.target.dataset.index;
    items.splice(index, 1);
    populateList(items, list);
    localStorage.setItem('items', JSON.stringify(items));
  }
}
list.addEventListener('click', toggleDone);
list.addEventListener('click', removeElem);
addBtn.addEventListener('click', addItem);
deleteAllBtn.addEventListener('click', clearList);
checkALldBtn.addEventListener('click', checkAllFunc);

populateList(items, list);
