(function () {
    const a = [
        {
            id: 23,
            name: "bob"
        },
        {
            id: 56,
            name: "sue"
        }
    ];

    const b = [23, 26];
    const c = a.filter(x => b.includes(x.id))
    console.log(c);
})();