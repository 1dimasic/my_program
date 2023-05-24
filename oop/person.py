class Person:
    def __init__(self, name, job=None, pay=0):
        self.name = name
        self.job = job
        self.pay = pay

    def last_name(self):
        return self.name.split()[-1]

    def give_raise(self, percent):
        self.pay *= (1 + percent)

    def __repr__(self):
        return '[%s: %s... %s => %s]' % (self.__class__.__name__, self.name, self.job, self.pay)


class Manager(Person):
    def __init__(self, name, pay):
        Person.__init__(self, name, 'manager', pay)

    def give_raise(self, percent, bonus=.10):
        Person.give_raise(self, percent + bonus)


if __name__ == '__main__':
    bob = Person('Bob Smith')
    sue = Person('Sue Jones', 'backend', 40000)
    tom = Manager('Tom Jones', 20000)

    for obj in (bob, sue, tom):
        obj.give_raise(0.1)
        print(obj, sep='\n')
