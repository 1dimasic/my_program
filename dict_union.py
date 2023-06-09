# задача объединение словарей

dict_a = {1: 10, 2: 20}
dict_b = {3: 30, 1: 40}
res = {}

# 1 решение со стандартной функцией update
# при одинаковых ключах идет перезапись значений (могут быть разные типы ключей и значений)

for d in (dict_a, dict_b):
    res.update(d)

# 2 решение
# при одинаковых ключах идет суммирование значений (необходим один тип данный для значений
# поддерживающий +

for key in dict_b:
    if key in dict_a:
        dict_a[key] += dict_b[key]
    else:
        dict_a[key] = dict_b[key]

print(dict_a)
