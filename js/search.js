const movieTitles = []

fetch(squareEyesAPI)
    .then(function (HTTPresponse) {
        return HTTPresponse.json()
    })
    .then(function (apiResult) {
        const apiArray = apiResult;
        apiArray.forEach(item => {
            movieTitles.push(item.title);
        });
        console.log(movieTitles);
    })