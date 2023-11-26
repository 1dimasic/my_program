import random

m = 49
col = 100_000_000
n = 7


def creat(length, max_value):
    circulation = []
    while len(circulation) < length:
        a = random.randint(1, max_value)
        if a not in circulation:
            circulation.append(a)
    return circulation


def sort_dict(res):
    res_tmp = {}
    sorted_keys = sorted(res, key=res.get)

    for i in sorted_keys[::-1]:
        res_tmp[i] = res[i]

    return res_tmp


def result(iter_num, length, max_value):
    d = {x: 0 for x in range(1, max_value + 1)}
    for x in range(iter_num):
        circulation = creat(length, max_value)
        for y in circulation:
            d[y] += 1
    return sort_dict(d)


for j in range(2):
    print(result(col, n, m))
