

const mapElementToOption = (movie) => `<option value="${movie.id}">${movie.title}</option>`;

const mapElementToDiv = (movie) => `<div id="movies${movie.id}" class="movie-card">
                <div><img src="${movie.poster}"></div>
                <div class="content hide">${movie.title}</div>
                <div class="content hide">Rating: ${movie.rating}</div>
                <div class="content hide">Year: ${movie.year}</div>
                <div class="content hide">Genre: ${movie.genre}</div>
                <div class="content hide">Director: ${movie.director}</div>
                <div class="content hide">Plot: ${movie.plot}</div>
                <button class="content hide" type="button" id="delete-movie" onclick="deleteMovie(${movie.id})">Delete Movie</button>
            </div>`;

const moviesUrl = "https://scientific-thoughtful-asparagus.glitch.me/movies";
// <div className="d-none">${movie.id}</div>

function getMovies() {
    fetch(moviesUrl).then(resp => resp.json()).then(function(data){

        const movies = data.map(mapElementToDiv)
        $('#output-container').html(movies)

        const moviesOption = data.map(mapElementToOption)
        $('#movies-list').html(moviesOption)

        data.forEach(function (movie){
            $(`#movies${movie.id}`).click(function (){
                $(this).children().toggleClass('hide')
                // $(this).children('.content ').slideToggle(500)
            })
        })
        // $(this).children('.content ').slideToggle(500)
        // $(".movie-card").click(function (e){
        //     console.log(e);
        //     $(".movie-content").toggleClass('movie-content')
        // });
    });
}
getMovies();

$('#add-movie-btn').click(function (e){
    e.preventDefault();
    const movieToPost = {
        title: $('#movie-title').val(),
        rating: $('#movie-rating').val()
    };
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(movieToPost)
    };
    fetch(moviesUrl, postOptions).then(getMovies);
    clearValue();
});

function deleteMovie(id) {
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(moviesUrl + '/' + id, deleteOptions).then(getMovies);
}

$('#movies-list').change(function (){
    const selectedMovie = $('#movies-list').val();
    fetch(moviesUrl).then(resp => resp.json()).then(function(data){
        data.forEach(function (movie){
            if (parseFloat(movie.id) === parseFloat(selectedMovie)) {
                console.log(movie.id);
                console.log(selectedMovie);
                $('#edit-movie-title').val(movie.title)
                $('#edit-movie-rating').val(movie.rating)
            }
        });
    });
});

$('#edit-movie-btn').click(function (e){
    e.preventDefault();
    const selectedMovie = $('#movies-list').val();
    editMovie(selectedMovie);
    clearValue();
});

function editMovie(id) {
    const movieToPost = {
        title: $('#edit-movie-title').val(),
        rating: $('#edit-movie-rating').val()
    };
    const putOptions = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(movieToPost)
    };
    fetch(moviesUrl + '/' + id, putOptions).then(getMovies);
}



function clearValue () {
    $('#movie-title').val('');
    $('#movie-rating').val('');
    $('#edit-movie-title').val('');
    $('#edit-movie-rating').val('');
}


// //API:
// function getMoviePoster() {
//     $.get("http://omdbapi.com/?apikey=" + [MOVIE_API] + "&t=star+wars", {
//         // APPID: MOVIE_API,
//     }).done(function (data) {
//         console.log(data);
//         console.log(data.Poster)
//     });
// }

// Get the modal
// const modal = document.getElementById("modal-1");
// const modal2 = document.getElementById("modal-2");
//
// // Get the button that opens the modal
// const btn = document.getElementById("modal-btn-1");
// const btn2 = document.getElementById("modal-btn-2");
//
// // Get the <span> element that closes the modal
// const span = document.getElementsByClassName("close")[0];
//
// console.log(span)
//
// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }
// btn2.onclick = function() {
//     modal2.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
// window.onclick = function(event) {
//     if (event.target == modal2) {
//         modal2.style.display = "none";
//     }
// }
