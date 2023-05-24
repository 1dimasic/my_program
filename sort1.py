l = [4, 3, 2, 1]

for j in range(len(l) - 1):
    for i in range(len(l) - 1):
        if l[i] > l[i + 1]:
            l[i], l[i + 1] = l[i + 1], l[i]
print(l)
