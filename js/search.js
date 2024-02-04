const movieTitles = []

fetch(squareEyesAPI)
    .then(function (HTTPresponse){
        return HTTPresponse.json()
    })
    .then(function(apiResult){
        const apiArray = apiResult;
        apiArray.forEach(item => {
            movieTitles.push(item.title);
        });
    console.log(movieTitles);
    const search = () =>{
        const searchBox = document.getElementById("search-bar").value.toLowerCase();
        const movies = document.getElementById("result-container");

        for(var i=0; i < movieTitles.length; i++){
            let match = movieTitles[i]
        }
    }
    })
