(function () {
    const countries = [
        {
            name: "England",
            city: [{name: "London", population: 12000}, {name: "Manchester", population: 550}, {
                name: "Liverpool", population: 450}]
        },
        {
            name: "Russia",
            city: [{name: "Moscow", population: 13000}, {name: "Kazan", population: 5000}, {
                name: "Sochi", population: 600}, {name: "Novosibirsk", population: 2500}]
        },
        {
            name: "Germany",
            city: [{name: "Berlin", population: 8000}, {name: "Munich", population: 4000}, {
                name: "Dortmund", population: 1000}]
        }];

let max_cities_count = 0;
let max_cities_count_country = [];
let country_population = {};
let population;

for (let i = 0; i < countries.length; ++i) {
    if (countries[i].city.length > max_cities_count) {
        max_cities_count = countries[i].city.length;
    }
}

for (let i = 0; i < countries.length; ++i) {
    if (countries[i].city.length === max_cities_count) {
        max_cities_count_country.push(countries[i].name)
    }

    population = 0;

    for (let j = 0; j < countries[i].city.length; ++j) {
        population += countries[i].city[j].population;
    }

    country_population[countries[i].name] = population;
}

console.log(max_cities_count_country);
console.log(country_population);
})();