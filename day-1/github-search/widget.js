const form = document.getElementById('search-form');
const input = document.getElementById('search-form-input');
const results = document.getElementById('search-results');

class List {
  constructor() {
    this._list = document.createElement('ul');
  }

  createItem(repo) {
    let item = document.createElement('li');
    let itemLink = document.createElement('a');
    let itemImg = document.createElement('img');
    let itemText = document.createElement('span');
    itemLink.href = repo.html_url;
    itemImg.src = repo.owner.avatar_url;
    itemText.innerHTML = repo.name;
    itemLink.appendChild(itemImg);
    itemLink.appendChild(itemText);
    item.appendChild(itemLink);

    this._list.appendChild(item);
  }

  renderList() {
    return this._list;
  }
}

class Search {
  constructor() {
    this._input = document.getElementById('search-form-input');
    this._query = this._input.value;
  }
}

// form.addEventListener('submit', function(event) {
//   event.preventDefault();
//   results.innerHTML = '';
//   let search = new Search();

//   new Ajax(`https://api.github.com/search/repositories?q={${search._query}}`)
//     .then( searchResults => {
//       let repos = searchResults.items;
//       let list = new List();
//       results.appendChild(list.renderList());

//       repos.forEach(function(repo){
//         list.createItem(repo);
//       })
//     })
//     .catch( e => {
//       console.error(e);
//       return 'There was an error with your request!';
//     })
//     .get();
// })

input.addEventListener('input', function() {
  let search = new Search();

  new Ajax(`https://api.github.com/search/repositories?q={${search._query}}`)
    .then( searchResults => {
      let repos = searchResults.items;
      let list = new List();
      results.appendChild(list.renderList());

      repos.forEach(function(repo){
        list.createItem(repo);
      })
    })
    .catch( e => {
      console.error(e);
      return 'There was an error with your request!';
    })
    .get();
})
