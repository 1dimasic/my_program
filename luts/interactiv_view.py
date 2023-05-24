import shelve
from main import *

#field_names = ('name','age','pay','job')

db = shelve.open('class-shelve')
field_names = list(bob.__dict__.keys())
max_f = max(len(f) for f in field_names)

while True:
    key = input ('\nKey?=>')
    if not key: break 
    try:
        record = db[key]
    except:
        print('Ключ не найден: %s!' % key)
    else:
        for field in field_names:
            print(field.ljust(max_f),'=>', getattr(record,field))

db.close()
