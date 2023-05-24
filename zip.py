
def pascal_triangle(n):
    row = [1]
    y = [0]
    for x in range(max(n, 0)):
        print(row)
        row = [left + right for left, right in zip(row + y, y + row)]


pascal_triangle(6)
"""
numbers = [12, 3, 7, 15, 8]
diff = [a-b for a, b in zip(numbers, numbers[1:])]


matrix = [[1, 2, 3], [1, 2, 3]]
for i in zip(*matrix):
    print(i)

matrix_T = [list(i) for i in zip(*matrix)]
print(matrix_T)

"""
