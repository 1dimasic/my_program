from tkinter import *
from tkinter.messagebox import showinfo


class MyGui(Frame):
    def __init__(self, parent=None):
        Frame.__init__(self, parent)
        button = Button(self, text='press', command=self.reply)
        button.pack()

    def reply(self, title='popup', message='Button pressed!'):
        showinfo(title, message)


class CustomGui(MyGui):
    def __init__(self):
        MyGui.__init__(self)

    def reply_(self, message):
        MyGui.reply(self, message='Button pressed #2')


"""
        def reply(self):
                showinfo(title='popup', message='Button pressed #2!')
"""


class Person():

    def __init__(self, name, age, pay=0, job=None):
        self.name = name
        self.age = age
        self.pay = pay
        self.job = job

    def last_name(self):
        return self.name.split()[-1]

    def giveraise(self, persent):
        self.pay = self.pay * (1 + persent)

    def __str__(self):
        return ('<%s => %s: %s, %s' % (self.__class__.__name__, self.name, self.job, self.pay))


class Manager(Person):
    def __init__(self, name, age, pay):
        Person.__init__(self, name, age, pay, 'manager')

    def giveraise(self, persent, bonus=.10):
        Person.giveraise(self, persent + bonus)
