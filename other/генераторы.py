def sq(start, stop):
    for i in range(start, stop + 1):
        yield i ** 2


res = sq(1, 5)
print(list(res))
