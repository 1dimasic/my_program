(function () {
    const array = [2, 4, 5, 7, 1, 46, -25, 0, 4];
    array.sort(function (e1, e2) {
        return e2 - e1;
    });
    console.log(array);
})();

(function () {
    const array = [2, 4, 5, 7, 1, 46, -25, 0, 4];
    console.log(array.slice(0, 5));
})();

(function () {
    const array = [2, 4, 5, 7, 1, 46, -25, 0, 4];
    console.log(array.slice(-5));
})();

(function () {
    const array = [2, 4, 5, 7, 1, 46, -25, 0, 4];

    console.log(array.filter(function (e) {
        return e % 2 === 0;
    }).reduce(function (e1, e2) {
        return e1 + e2;
    }, 0));
})();

(function () {
    const array = [];

    for (let i = 1; i <= 100; ++i) {
        array.push(i);
    }

    console.log(array.filter(function (e) {
        return e % 2 === 0;
    }).map(function (e) {
        return e * e;
    }, 0));
})();