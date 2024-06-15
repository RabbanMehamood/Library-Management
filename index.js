let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        imageLink,
        author
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("p");
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);


    let imageEl = document.createElement("img");
    imageEl.classList.add("img");
    imageEl.setAttribute("src", imageLink);
    imageEl.setAttribute("width", '150');
    imageEl.setAttribute("height", "250");
    resultItemEl.appendChild(imageEl);

    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);


    let authorEl = document.createElement("p");
    authorEl.textContent = author;
    authorEl.setAttribute("style", "color:red; font-size:30px;");
    resultItemEl.appendChild(authorEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchBook(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchBook);
