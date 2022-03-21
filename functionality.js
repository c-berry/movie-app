// The R in CRUD: Read with a GET request

//LOGS JSON DATA FOR REFERENCE:
// fetch("https://scientific-thoughtful-asparagus.glitch.me/movies").then(resp => resp.json()).then(data => console.log(data));

//RETRIEVES DATA AND CALLS FUNCTION TO OUTPUT ONTO PAGE:
function getMovies(){
    fetch("https://scientific-thoughtful-asparagus.glitch.me/movies").then(resp => resp.json()).then(data => {
        $("#output").html(outputMovies(data));
        }
    )}

//DISPLAYS TITLES AND RATINGS IN HTML FORMAT:
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

//FUNCTION CALLS:
// outputMovies();
// getMovies();

// The C in CRUD: Create with a POST request

//THIS WILL CREATE NEW MOVIE THAT WILL BE ADDED TO JSON DATA:
const movieURL = "https://scientific-thoughtful-asparagus.glitch.me/movies";

const movieToPost = {
    title: "Pulp Fiction",
    rating: 9
}

const postOptions = {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(movieToPost)
};

function getMovie(){
    fetch(movieURL).then(resp => resp.json()).then(data => console.log(data));
}
getMovie();

// fetch(movieURL, postOptions).then(getMovie);

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