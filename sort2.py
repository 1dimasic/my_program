l = [1, 3, 5, 8]


def get_max(data):
    maximum = data[0]
    index = 0
    for x in range(len(data)):
        if data[x] > maximum:
            maximum = data[x]
            index = x
    return index


for i in range(len(l)):
    j = get_max(l[:len(l) - i])
    l[len(l) - 1 - i], l[j] = l[j], l[len(l) - 1 - i]

print(l)
