l = [1, 2, 3, 4, 5, 6, 7, 8]

x = 1
while l:
    if l[len(l) // 2] == x:
        print(f'Найдено в массиве {l} с индексом {len(l) // 2}')
        break
    else:
        if x < l[len(l[:len(l) // 2])]:
            l = l[:len(l) // 2]
        else:
            l = l[len(l) // 2:len(l)]
