def get_max_substring_length(string):
    max_length = 0
    lowercase_string = string.lower()

    for symbol in set(lowercase_string):
        for symbols_count in range(len(lowercase_string), 0, -1):
            substring = symbol * symbols_count

            if lowercase_string.count(substring):
                if len(substring) > max_length:
                    max_length = len(substring)

                break

    return max_length


entered_string = input('Введите строку: ')

max_substring_length = get_max_substring_length(entered_string)

print(f'Максимальная длина подстроки из одного и того же символа = {max_substring_length}')
