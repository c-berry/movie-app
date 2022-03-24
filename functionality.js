// The R in CRUD: Read with a GET request

//LOGS JSON DATA FOR REFERENCE:
// fetch("https://scientific-thoughtful-asparagus.glitch.me/movies").then(resp => resp.json()).then(data => console.log(data));

//HOLDS URL FOR FETCH PURPOSES:
// const movieURL = "https://scientific-thoughtful-asparagus.glitch.me/movies";
//
// //DISPLAYS TITLES AND RATINGS IN HTML FORMAT:
// $(document).ready(function (){
//     getMovie();
// });
//
// function outputMovies(data) {
//     html = "";
//     for (var i = 0; i < data.length; i++) {
//         var title = data[i].title;
//         var rating = data[i].rating;
//         html += "<div id='container' class='card-body'>"
//             + "<div>Title: " + title + "</div>"
//             + "<div>Rating: " + rating + "</div>"
//             + '<button type="button" id="delete-movie" onclick="">Delete</button>'
//             + "</div>"
//     }
//     return html;
// }
//
// // The C in CRUD: Create with a POST request
//
// //NEW MOVIE EXAMPLE THAT WILL BE ADDED TO JSON DATA:
// const movieToPost = {
//     title: "",
//     rating: ""
// }
//
// //FORMAT FOR ADDING OBJECT TO JSON:
// const postOptions = {
//     method: 'POST',
//     headers: {
//         'Content-Type' : 'application/json'
//     },
//     body: JSON.stringify(movieToPost)
// };
//
// //RETRIEVES DATA AND CALLS FUNCTION TO OUTPUT ONTO PAGE:
// function getMovie(){
//     fetch(movieURL).then(resp => resp.json()).then(data => {
//         console.log(data);
//         $("#output").html(outputMovies(data));
//         console.log(data);
//     });
// }
// getMovie();

//THIS ADDS THE NEW MOVIE TO THE JSON:
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
// fetch(movieURL + '/1', patchOptions).then(getMovies);

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
// fetch(movieURL + '/2', putOptions).then(getMovies);

// The D in CRUD : Deleting records with DELETE

// let deleteOptions = {
//     method: 'DELETE',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }
// //
// fetch(movieURL + "/5", deleteOptions).then(getMovie);

