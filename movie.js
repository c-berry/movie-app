const mapElementToOption = (movie) => `<option value="${movie.id}">${movie.title}</option>`;
const mapElementToDiv = (movie) => `<div>
                <div>${movie.title}</div>
                <div>Rating: ${movie.rating}</div>
                <div>${movie.id}</div>
                <button type="button" id="delete-movie" onclick="deleteMovie(${movie.id})">Delete Movie</button>
            </div>`;


function getMovies() {
    fetch(`https://scientific-thoughtful-asparagus.glitch.me/movies`).then(resp => resp.json()).then(function(data){

        const movies = data.map(mapElementToDiv)
        $('#output').html(movies)
        const moviesOption = data.map(mapElementToOption)
        $('#movies-list').html(moviesOption)
    });
}
getMovies();

const bookToPost = {
    "title": "",
    "rating": ""
}
$('#add-movie-btn').click(function (e){
    e.preventDefault();
    bookToPost.title = $('#movie-title').val();
    bookToPost.rating = $('#movie-rating').val();
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(bookToPost)
    };
    fetch(`https://scientific-thoughtful-asparagus.glitch.me/movies`, postOptions).then(getMovies);
});


function deleteMovie(id) {
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(`https://scientific-thoughtful-asparagus.glitch.me/movies/${id}`, deleteOptions).then(getMovies);
}



$('#movies-list').change(function (){
    const selectedMov = $('#movies-list').val();
    fetch(`https://scientific-thoughtful-asparagus.glitch.me/movies`).then(resp => resp.json()).then(function(data){
        data.forEach(function (movie){
            if (movie.id == selectedMov) {
                $('#edit-movie-title').val(movie.title)
                $('#edit-movie-rating').val(movie.rating)
            }
        });
    });
});

const bookToPost2 = {
    "title": "",
    "rating": ""
}
$('#edit-movie-btn').click(function (e){
    e.preventDefault();
    bookToPost2.title = $('#edit-movie-title').val();
    bookToPost2.rating = $('#edit-movie-rating').val();
    console.log(bookToPost2)
    const patchOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(bookToPost2)
    };
    fetch(`https://scientific-thoughtful-asparagus.glitch.me/movies`, patchOptions).then(getMovies);
});