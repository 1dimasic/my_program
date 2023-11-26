def get_max_substring_length(string):
    max_length = 0
    lowercase_string = string.lower()

    for unique_symbol in set(lowercase_string):
        length = 0

        for symbol in lowercase_string:
            if unique_symbol == symbol:
                length += 1

                if length > max_length:
                    max_length = length

            else:
                length = 0

    return max_length


entered_string = input('Введите строку: ')

max_substring_length = get_max_substring_length(entered_string)

print(f'Максимальная длина подстроки из одного и того же символа = {max_substring_length}')
