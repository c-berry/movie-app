

const mapElementToOption = (movie) => `<option value="${movie.id}">${movie.Title}</option>`;

const mapElementToDiv = (movie) => `<div id="movies${movie.id}" class="movie-card">
                <div><img src="${movie.Poster}"></div>
                <div class="title content hide">${movie.Title}</div>
                <div class="content hide"><strong>Rating:</strong> ${movie.Rating}</div>
                <div class="content hide"><strong>Year:</strong> ${movie.Year}</div>
                <div class="content hide"><strong>Genre:</strong> ${movie.Genre}</div>
                <div class="content hide"><strong>Director:</strong> ${movie.Director}</div>
                <div class="content hide"><strong>Actors:</strong> ${movie.Actors}</div>
                <div class="content hide"><strong>Plot:</strong> ${movie.Plot}</div>
                <div class="content hide d-none">Poster:</strong> ${movie.Poster}</div>
                <button class="content hide btn-dark" type="button" id="delete-movie" onclick="deleteMovie(${movie.id})">Delete Movie</button>
            </div>`;

const moviesUrl = "https://scientific-thoughtful-asparagus.glitch.me/movies";
// <div className="d-none">${movie.id}</div>

function getMovies() {
    fetch(moviesUrl).then(resp => resp.json()).then(function(data){

        const movies = data.reverse().map(mapElementToDiv);
        $('#output-container').html(movies);

        const moviesOption = data.map(mapElementToOption);
        $('#movies-list').html(moviesOption);
        $('#movies-list').prepend(`<option selected>Open this select menu</option>`);

        data.forEach(function (movie){
            $(`#movies${movie.id}`).click(function (){
                $(this).children().toggleClass('hide');
                // $(this).children('.content ').slideToggle(500)
            });
        });
    }).then(function (){
        setTimeout(function (){
            $('#loading').remove();
            $('#loading-text').remove();
        }, 1000)
        });
}
getMovies();

$('#add-movie-btn').click(function (e){
    e.preventDefault();

    const movieToPost = {
        Title: $('#movie-title').val(),
        Rating: $('#movie-rating').val(),
        Year: $('#movie-year').val(),
        Genre: $('#movie-genre').val(),
        Director: $('#movie-director').val(),
        Actors: $('#movie-actors').val(),
        Poster: $('#movie-poster').val(),
        Plot: $('#movie-plot').val()
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
                $('#edit-movie-title').val(movie.Title)
                $('#edit-movie-rating').val(movie.Rating)
                $('#edit-movie-year').val(movie.Year);
                $('#edit-movie-genre').val(movie.Genre);
                $('#edit-movie-director').val(movie.Director);
                $('#edit-movie-actors').val(movie.Actors);
                $('#edit-movie-poster').val(movie.Poster);
                $('#edit-movie-plot').val(movie.Plot);
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
        Title: $('#edit-movie-title').val(),
        Rating: $('#edit-movie-rating').val(),
        Year: $('#edit-movie-year').val(),
        Genre: $('#edit-movie-genre').val(),
        Director: $('#edit-movie-director').val(),
        Actors: $('#edit-movie-actors').val(),
        Poster: $('#edit-movie-poster').val(),
        Plot: $('#edit-movie-plot').val()

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
    $('#movie-year').val('');
    $('#movie-genre').val('');
    $('#movie-director').val('');
    $('#movie-actors').val('');
    $('#movie-poster').val('');
    $('#movie-plot').val('')
    $('#edit-movie-title').val('');
    $('#edit-movie-rating').val('');
    $('#edit-movie-year').val('');
    $('#edit-movie-genre').val('');
    $('#edit-movie-director').val('');
    $('#edit-movie-actors').val('');
    $('#edit-movie-poster').val('');
    $('#edit-movie-plot').val('');
    $('#api-input').val('')
}

// //API:
function getApiData(API) {
//     $("#api-btn").click(function (e){
//         e.preventDefault();
//         let userInput = $("#api-input").val()
//         console.log(userInput);
        $.get("http://omdbapi.com/?apikey=" + [MOVIE_API] + "&t=" + API, {
        }).done(function (data) {
            console.log(data);
            console.log(data.Ratings[0].Value);
            console.log(data.Plot);
            const movieToPost = {
                Title: data.Title,
                Rating: data.Ratings[0].Value,
                Poster: data.Poster,
                Plot: data.Plot,
                Year: data.Year,
                Genre: data.Genre,
                Director: data.Director,
                Actors: data.Actors
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
            // $("#staticBackdrop").css({
            //     "display": "none",
            //     "z-index": "0"
            // });
            // $("#staticBackdrop2").css({
            //     "display": "none",
            //     "z-index": "0"
            // });
         //SAVE SPOT>
    });
}

$("#api-btn").click(function (e){
    e.preventDefault();
    const userInput = $("#api-input").val()
    getApiData(userInput);
});

$('#search-bar-btn').click(function (e) {
    e.preventDefault();
    const userInput = $("#search-bar").val();
    getApiData(userInput);
    $("#search-bar").val('');
});
$(document).on('keypress',function(e) {
    if(e.which === 13) {
        const userInput = $('#search-bar').val();
        getApiData(userInput);
        $("#search-bar").val('');
    }
});


$('#edit-movie-close').click(function (){
    clearValue();
});
$('#add-movie-close').click(function (){
    clearValue();
});
