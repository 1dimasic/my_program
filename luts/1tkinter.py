from tkinter import *
from tkinter.messagebox import showinfo, showerror
from person import MyGui, CustomGui
import shelve


"""
#1
def reply(name):
    showinfo(title='Reply', message='Hello %s!' %name)

top=Tk()
top.title('Echo')
#top.iconbitmap('py-blue-trans-out.ico')
Label(top, text='Enter your name:').pack(side=TOP)
ent = Entry(top)
ent.pack(side=TOP)
btn = Button(top, text='Submit', command=(lambda: reply(ent.get())))
btn.pack(side=LEFT)
top.mainloop()

#2
mainwin = Tk()
Label(mainwin, text=__name__).pack()

popup = Toplevel()
Label (popup, text = 'Attach').pack(side=LEFT)
CustomGui(popup).pack(side=RIGHT)
mainwin.mainloop()
"""

#3
shelvename = 'class-shelve'
fieldsnames = ('name', 'age', 'job','pay')

def makeWidgets():
    global entries
    window = Tk()
    window.title('People Shelve')
    form = Frame(window)
    form.pack()
    entries = {}
    for (ix, label) in enumerate (('key',) + fieldsnames):
        lab = Label (form, text = label)
        ent = Entry(form)
        lab.grid(row=ix, column=0)
        ent.grid(row=ix, column=1)
        entries[label] = ent
    Button(window, text='Fetch', command=(lambda:fetchRecord(entries['key'].get()))).pack(side=LEFT)
    Button(window, text='Update', command=(lambda:updateRecord(entries['key'].get()))).pack(side=LEFT)
    Button(window, text='Quit', command=window.quit).pack(side=RIGHT)
    return window

def fetchRecord(_key):
    try:
        record = db[_key]
    except:
        showerror(title='Error', message='No such key!')
    else:
        for field in fieldsnames:
            entries[field].delete(0, END)
            entries[field].insert(0, repr(getattr(record, field)))

def updateRecord(_key):
    if _key in db:
        record = db[_key]
    else:
        from person import Person
        record = Person (name='?', age='?')
    for field in fieldsnames:
        setattr(record, field, eval(entries[field].get()))
    db[_key] = record


db = shelve.open (shelvename)
window = makeWidgets()
window.mainloop()
db.close


        
    
