

const mapElementToOption = (movie) => `<option value="${movie.id}">${movie.Title}</option>`;

const mapElementToDiv = (movie) => `<div id="movies${movie.id}" class="movie-card">
                <div><img src="${movie.Poster}"></div>
                <div class="content hide">${movie.Title}</div>
                <div class="content hide">Rating: ${movie.Rating}</div>
                <div class="content hide">Year: ${movie.Year}</div>
                <div class="content hide">Genre: ${movie.Genre}</div>
                <div class="content hide">Director: ${movie.Director}</div>
                <div class="content hide">Plot: ${movie.Plot}</div>
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
            });
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
        Title: $('#movie-title').val(),
        Rating: $('#movie-rating').val()
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
        Rating: $('#edit-movie-rating').val()
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
    $("#api-btn").click(function (e){
        e.preventDefault();
        let userInput = $("#api-input").val()
        console.log(userInput);
        $.get("http://omdbapi.com/?apikey=" + [MOVIE_API] + "&t=" + userInput, {
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
            };
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(movieToPost)
            };
            fetch(moviesUrl, postOptions).then(getMovies);

         //SAVE SPOT>
        });
    });
// }

// getMoviePoster();
//HOW TO INCORPORATE PLUS IF WHITESPACE IN BETWEEN
// star+wars

// //API BEFORE EDITS:
// function getMoviePoster() {
//     $.get("http://omdbapi.com/?apikey=" + [MOVIE_API] + "&t=star+wars", {
//         // APPID: MOVIE_API,
//     }).done(function (data) {
//         console.log(data);
//         console.log(data.Poster)
//     });
// }