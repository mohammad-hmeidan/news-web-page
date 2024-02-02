let url = "https://newsapi.org/v2/top-headlines?";
const apiKey = "c813bf6bed8648fd80265071bb5928e8";
const language = "en";
const pageSize = 8;
let page = 1;
let business = document.querySelector("#business .container-box");
let entertainment = document.querySelector("#entertainment .container-box");
let health = document.querySelector("#health .container-box");
let science = document.querySelector("#science .container-box");
let sport = document.querySelector("#sport .container-box");
let technology = document.querySelector("#technology .container-box");
let pageBusiness = 1;

async function getData(category, page) {
  let newURL =
    url +
    "apiKey=" +
    apiKey +
    "&category=" +
    category +
    "&pageSize=" +
    pageSize +
    "&page=" +
    page +
    "&language=" +
    language;
  const response = await fetch(newURL);
  const newsData = await response.json();
  return newsData;
}

async function addData(section, type, page) {
  let dataFetch = await getData(type, page);
  if (section.classList.contains("container-load")) {
    section.innerHTML = "";
    section.classList.remove("container-load");
  }
  let data = section.innerHTML;
  dataFetch.articles.forEach((e) => {
    data += `
      <div class="box">
        <img src="${e.urlToImage}" alt="Error" loading="lazy"/>
        <div class="content">
        <h3>${e.title}</h3>
        <p>
          ${e.description}
        </p>
        </div>
        <div class="info">
        <a href="${e.url}" target="_blank">Read more</a>
        <i class="fas fa-long-arrow-alt-right"></i>
        </div>
      </div>
    `;
  });
  section.innerHTML = data;
}
addData(business, "business");
addData(entertainment, "entertainment");
addData(health, "health");
addData(science, "science");
addData(sport, "sport");
addData(technology, "technology");

let btn = document.getElementById("top");
btn.onclick = function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

let moreData = (e) => {
  addData(
    e.parentElement.children[1],
    e.parentElement.classList.value,
    e.dataset.nextPage
  );
  e.dataset.nextPage++;
};
