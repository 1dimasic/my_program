class Index:

    def __init__(self, value=0):
        self.data = value

    def __add__(self, other):
        return Index(self.data + other)

    def __repr__(self):
        return '%s' % self.data

    def __call__(self, *args, **kwargs):
        print('Called:', args, kwargs)


"""
    def __getitem__(self, item):
        print('get[%s]:' % item, end=' ')
        return self.data[item]

    def __iter__(self):
        print('iter=>next:', end='')
        for value in self.data:
            yield value
            print('next: ', end='')

    def __contains__(self, item):
        print('contains: ', end='')
        return item in self.data

    def __getattr__(self, item):
        if item == 'age':
            return 40
        else:
            raise AttributeError(item)

    def __setattr__(self, item, value):
        if item == 'data':
            self.__dict__[item] = value + 10
        else:
            raise AttributeError(item + 'not allowed')
    """

x = Index(5)

print(x(1, 2, 4, x=3, y=6))
