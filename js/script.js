const studentListItems = document.querySelectorAll(".student-item"); // Global Scope Needed
const itemsPerPage = 10; // Global Scope Needed
const pageElement = document.querySelector("div.page"); // Global Scope Needed
let resultsFound; // Global Scope Needed
let searchBarInput; // Global Scope Needed
let searchBarButton; // Global Scope Needed

function initializeResultsFound() {
    const studentListUL = document.querySelector("ul.student-list");
    resultsFound = document.createElement("h1");

    resultsFound.innerHTML = "<h1>No Results Found</h1>";
    resultsFound.style.display = "none";

    studentListUL.appendChild(resultsFound);
}

// The list parameter to represent the actual list of students that you’ll pass in as an argument.
// The page parameter to represent the page number that you’ll pass in as an argument.
function showPage(list, page) {
    const startIndex = (page * itemsPerPage) - itemsPerPage;
    const endIndex = page * 10;

    for (let i = 0; i < list.length; i++) {
        const listItem = list[i];

        if (i >= startIndex && i < endIndex) {
            listItem.style.display = "";
        } else {
            listItem.style.display = "none";
        }
    }
}

// Creates links from current list
function appendPageLinks(list) {
    const paginationDivCheck = document.getElementsByClassName("pagination")[0];

    if (paginationDivCheck != "undefined" && paginationDivCheck != null) {
        paginationDivCheck.parentElement.removeChild(paginationDivCheck);
    }

    const paginationDiv = document.createElement("div");
    const paginationUL = document.createElement("ul");
    const numberOfPaginationLinks = list.length / itemsPerPage;

    pageElement.appendChild(paginationDiv);
    paginationDiv.className = "pagination";
    paginationDiv.appendChild(paginationUL);

    for (let i = 0; i < numberOfPaginationLinks; i++) {
        const paginationLI = document.createElement('li');
        const listItemAElement = document.createElement("a");
        const pageNumber = i + 1;

        if (pageNumber === 1) {
            listItemAElement.className = "active";
        }

        listItemAElement.href = "#";
        listItemAElement.textContent = pageNumber;

        paginationLI.appendChild(listItemAElement);
        paginationDiv.appendChild(paginationLI);

        listItemAElement.addEventListener("click", (event) => {
           const targetA = event.target;
           const ul = targetA.parentElement.parentElement;
           const lis = ul.querySelectorAll("li");
           const pageNumber = targetA.textContent;

           for (let i = 0; i < lis.length; i++) {
               const li = lis[i];
               const liA = li.querySelector('a');

               if (liA.className === "active") {
                   liA.className = "";
               }
           }

           targetA.className = "active";
           showPage(studentListItems, pageNumber);
        });
    }
}

// Creates search bar elements
function createSearchBar() {
    const pageHeaderDiv = document.querySelector("div.page-header");
    const studentSearchDiv = document.createElement("div");
    searchBarInput = document.createElement("input"); // Global Scope Needed
    searchBarButton = document.createElement("button"); // Global Scope Needed

    studentSearchDiv.className = "student-search";
    searchBarInput.placeholder = "Search for Students...";
    searchBarButton.textContent = "Search";

    pageHeaderDiv.appendChild(studentSearchDiv);
    studentSearchDiv.appendChild(searchBarInput);
    studentSearchDiv.appendChild(searchBarButton);
}

// Gets text from search bar, show matches, paginates the page
function displayFromSearch() {
    const searchBarCurrentValue = searchBarInput.value;
    const resultList = [];

    for (let i = 0; i < studentListItems.length; i++) {
        const listItem = studentListItems[i];

        if (listItem.textContent.includes(searchBarCurrentValue)) {
            listItem.style.display = "";
            resultList.push(listItem);
        } else {
            listItem.style.display = "none";
        }
    }

    if (resultList.length == 0) {
        resultsFound.style.display = "";
    } else {
        resultsFound.style.display = "none";
        showPage(resultList, 1);
    }

    appendPageLinks(resultList);
}

// Initialization
showPage(studentListItems, 1);
appendPageLinks(studentListItems);
createSearchBar();
initializeResultsFound();

// Search every time a key is unpressed
searchBarInput.addEventListener('keyup', (event) => {
    displayFromSearch(event.target);
});

// Search on button click
searchBarButton.addEventListener('click', (event) => {
    displayFromSearch(event.target);
});
