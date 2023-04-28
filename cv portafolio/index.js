import enviroment from "./config.js"

const API = "https://api.github.com/users/pamela2453"

const fetchData = async (url) => {
    try {
        let opcions = {
            "headers":
            {
                "Authorization": `token ${enviroment.TOKEN_GITHUB}`
            }
        }
        let response = await fetch(url, opcions);
        let data = await response.json();
        let repos = await fetch(data.repos_url, opcions);
        let responseRepos = await repos.json();

        console.log(responseRepos);
        dibujarCards(responseRepos);
    } catch (error) {
        console.log(error)
    }
}

fetchData(API)

const container = document.querySelector("#container")

const dibujarCards = (results) => {
    let guardarCards = ""

    results.forEach(element => {
        let card = `
                    <div class=" col-sm-6  col-md-6 col-12 col-lg-6 d-flex justify-content-center">
                    <div class="col-6 mt-5">
                        <div class="card mb-4" style="width: 17rem;  background-color: rgb(107, 125, 182); height: 31.8rem; align-items: center; border: 3px lightsteelblue solid;  outline: 4px solid cornflowerblue;">
                        <h5 class="card-title text-light"> Nombre : ${element.name}</h5>
                        <img pt-5 src=" ${"./img/github.png"}" class="card-img-top border" alt="...">
                            <div class="card-body">
                            <p class="card-text text-dark">${element.full_name}</p>
                                <p class="card-text text-dark mt-2">${element.description}</p>
                                <p class="card-text text-dark mt-2">${element.visibility}</p>
                                <p class="card-text text-dark mt-2">${element.created_at}</p>
                            </div>
                        </div>
                    </div>
                </div>`
        guardarCards += card
    });

    container.innerHTML = guardarCards
}