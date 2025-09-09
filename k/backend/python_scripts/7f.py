import gmpy2
import random

small_prime_set = {2}
for i in range(3, 101):
    notPrime = False
    for p in small_prime_set:
        if(i % p == 0):
            notPrime = True
            break
    if not notPrime:
        small_prime_set.add(i)
        
def small_prime_check(num, p_set):
    x = int(num)
    for p in p_set:
        if x % p == 0 and x != p:
            return False
    return True

n = int(input("Until what number should I prove for Oppermann's Conjecture? = "))
count = 0
for i in range(2, n+1):
    x = i * (i - 1); y = i * i; z = i * (i + 1)
    found1 = False; found2 = False
    print(f"For n = {i}, Prime numbers between {x} and {y}:- ")
    for j in range(x, y):
        if gmpy2.is_prime(j):
            found1 = True
            print(f"=> {j}")
            break
    print(f"For n = {i}, Prime numbers between {y} and {z}:- ")
    for k in range(y, z+1):
        if gmpy2.is_prime(k):
            found2 = True
            print(f"=> {k}")
            break
    if found1 and found2:
        count += 1
    print(f"Proved for {count} / {n - 1}")

m = random.randrange(10**49, 10**50) 
print(f"A randomly generated 50 digit number is {m}")
found1 = False; found2 = False
print(f"Finding a prime between {m} * {m-1} = {m*(m-1)} and {m}*{m} = {m*m}:- ")
for j in range(m*(m - 1), m*m):
    if gmpy2.is_prime(j):
        found1 = True
        print(f"=> {j}")
        break
print(f"Finding a prime between {m} * {m} = {m*m} and {m}*{m + 1} = {m*(m+1)}:- ")
for j in range(m*m, m*(m + 1)):
    if gmpy2.is_prime(j):
        found2 = True
        print(f"=> {j}")
        break
if found1 and found2:
    print(f"Oppermann's Conjecture proved for m = {m}")