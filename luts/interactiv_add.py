import shelve
from main import *

   
field_names = ('name','age','pay','job')
db = shelve.open('class-shelve')

while True:
    key = input ('\nKey?=>')
    if not key: break
    if key in db:
        record = db[key]
    else:
        record = Manager(name='?',age='?')
    for field in field_names:
        currval = getattr(record, field)
        newtext = input('\t[%s]=%s\n\t\tnew?=>' %(field,currval))
        if newtext:
            setattr(record, field, eval(newtext))
    db[key] = record
db.close()

