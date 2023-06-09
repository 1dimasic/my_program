def is_palindrome_v_2(string):
    forward_index = 0
    reverse_index = len(string) - 1

    while forward_index < len(string) // 2:
        if not string[forward_index].isalpha():
            forward_index += 1
            continue

        if not string[reverse_index].isalpha():
            reverse_index -= 1
            continue

        if string[forward_index].lower() != string[reverse_index].lower():
            return False

        forward_index += 1
        reverse_index -= 1

    return True


# entered_string = input('Введите строку: ')

if is_palindrome_v_2('     пр'):
    print('Введенная строка является палиндромом')
else:
    print('Введенная строка не является палиндромом')
#     ш а    ЛА       Ш
