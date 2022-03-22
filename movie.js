const mapElementToOption = (movie) => `<option value="${movie.id}">${movie.title}</option>`;

const mapElementToDiv = (movie) => `<div>
                <div>${movie.title}</div>
                <div>Rating: ${movie.rating}</div>
                <div>${movie.id}</div>
                <button type="button" id="delete-movie" onclick="deleteMovie(${movie.id})">Delete Movie</button>
            </div>`;

const moviesUrl = "https://scientific-thoughtful-asparagus.glitch.me/movies";

function getMovies() {
    fetch(moviesUrl).then(resp => resp.json()).then(function(data){

        const movies = data.map(mapElementToDiv)
        $('#output').html(movies)

        const moviesOption = data.map(mapElementToOption)
        $('#movies-list').html(moviesOption)
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
    const selectedMov = $('#movies-list').val();
    fetch(moviesUrl).then(resp => resp.json()).then(function(data){
        data.forEach(function (movie){
            if (movie.id == selectedMov) {
                $('#edit-movie-title').val(movie.title)
                $('#edit-movie-rating').val(movie.rating)
            }
        });
    });
});


$('#edit-movie-btn').click(function (e){
    e.preventDefault();
    const selectedMov = $('#movies-list').val();
    editMovie(selectedMov)
    clearValue()

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
        $('#movie-title').html(""),
        $('#movie-rating').html("")
}