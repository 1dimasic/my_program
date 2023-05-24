l = [5, 3, 2, 1]

for i in range(len(l)):
    j = i - 1
    t = l[i]
    while l[j] > t and j >= 0:
        l[j + 1] = l[j]
        j -= 1
    l[j + 1] = t

print(l)
