// The R in CRUD: Read with a GET request

fetch("https://scientific-thoughtful-asparagus.glitch.me/movies").then(resp => resp.json()).then(data => console.log(data));


function getMovies(){
    fetch("https://scientific-thoughtful-asparagus.glitch.me/movies").then(resp => resp.json()).then(data => {
        $("#output").html(outputMovies(data));
        }
    )}

function outputMovies(data) {
    html = "";
    for (var i = 0; i < data.length; i++) {
        var title = data[i].title;
        var rating = data[i].rating;
        html += "<div id='container' class='card-body'>"
            + "<div>Title: " + title + "</div>"
            + "<div>Rating: " + rating + "</div>"
            + "</div>"
    }
    return html;
}

// outputMovies();
getMovies();

// The C in CRUD: Create with a POST request

// const booksURL = "https://scientific-thoughtful-asparagus.glitch.me/books";
//
// const bookToPost = {
//     title: "Eleanor of Aquitaine",
//     author: {
//         firstName: "Ralph",
//         lastName: "Turner"
//     }
// }
//
// const postOptions = {
//     method: 'POST',
//     headers: {
//         'Content-Type' : 'application/json'
//     },
//     body: JSON.stringify(bookToPost)
// };
//
// function getBooks(){
//     fetch(booksURL).then(resp => resp.json()).then(data => console.log(data));
// }
// getBooks();

// fetch(booksURL, postOptions).then(getBooks);

// The U in CRUD -- PUT and PATCH

// let modification = {
//     title: "Eleanor of Aquitaine: Queen of France, Queen of England"
// }
//
// const patchOptions = {
//     method: 'PATCH',
//     headers: {
//         'Content-Type' : 'application/json'
//     },
//     body: JSON.stringify(modification)
// }
//
// fetch(booksURL + '/1', patchOptions).then(getBooks);

// Change the whole thing with PUT
// modification = {
//     title: "Eleanor of Aquitaine and the Four Kings",
//     author: {
//         firstName: "Amy",
//         lastName: "Kelly"
//     }
// }
//
// const putOptions = {
//     method: 'PUT',
//     headers: {
//         'Content-Type' : 'application/json'
//     },
//     body: JSON.stringify(modification)
// }
//
// fetch(booksURL + '/2', putOptions).then(getBooks);

// The D in CRUD : Deleting records with DELETE

// let deleteOptions = {
//     method: 'DELETE',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }
//
// fetch(booksURL + "/3", deleteOptions).then(getBooks);