def f(seq):
    if not seq:
        return [seq]
    else:
        res = []
        for i in range(len(seq)):
            rest = seq[:i] + seq[i+1:]
            for x in f(rest):
                res.append (seq[i:i+1] + x)
        return res

def f1(res):
    res1=[]
    for i in range(len(res)):
        res1.append(str(res[i]))
    return int(''.join(res1))

def f2(res):
    tmp=[]
    for i in res:
        tmp.append(f1(i))
    return tmp

s=[26,135,15,49,3]

s_result = min(f2(f(s)))
    
print (s_result)











    





    
    
