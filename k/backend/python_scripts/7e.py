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

n = int(input("Until what number should I prove for Legendre's Conjecture? = "))
count = 0
for i in range(1, n + 1):
    found = False
    p = i ** 2; q = (i + 1) ** 2
    print(f"Primes found between {i}^2 = {p} and {i + 1}^2 = {q} are: ")
    for k in range(p, q + 1):
        if not small_prime_check(k, small_prime_set):
            k += 1
            continue
        if gmpy2.is_prime(k):
            found = True
            print(f"=> {k}")
        k += 1
    if found:
        count += 1
        found = False
    print(f"Assumption proved for {count}/{n}")
print("Now this implies there are at least two primes between prime squares for p(n) ≥ 3 since p(n+1) - p(n) ≥ 2.")
print(f"Going to prove this for upto n = {n}")
q = 3
total_count = 0
for t in range(2, n + 1):
    curr_count = 0
    p = q; q = p + 1
    while not gmpy2.is_prime(q):
        q += 1
    i = p ** 2; j = q ** 2
    print(f"Primes found between p({t}) = {p}^2 = {i} and p({t+1}) {q}^2 = {j} are: ")
    for k in range(i, j + 1):
        if not small_prime_check(k, small_prime_set):
            k += 1
            continue
        if gmpy2.is_prime(k):
            curr_count += 1
            print(f"=> {k}")
            if curr_count == 2:
                break
        k += 1
    if curr_count >= 2:
        total_count += 1
        curr_count = 0
    print(f"Proved for {total_count}/{n - 1}")

m = random.randrange(10**49, 10**50) 
print(f"A randomly generated 50 digit number is {m}")
print(f"Lets see if there is any prime between {m}^2 and {m+1}^2")
found = False
p = m ** 2; q = (m + 1) ** 2
print(f"Primes found between {m}^2 = {p} and {m + 1}^2 = {q} are: ")
for k in range(p, q + 1):
    if not small_prime_check(k, small_prime_set):
        k += 1
        continue
    if gmpy2.is_prime(k):
        found = True
        print(f"=> {k}")
        break
    k += 1
if found:
    print(f"Assumption is True")
    l = k + 1
    while not gmpy2.is_prime(l):
        l += 1
    print(f"Lets prove there are 2 primes between k^2 = {k}^2 and l^2 = {l}^2 where k, l are consecutive primes")
    count = 0
    found = False
    print(f"Primes between {k}^2 = {k**2} and {l}^2 == {l**2}")
    for r in range(k**2, l**2):
        if gmpy2.is_prime(r):
            count += 1
            print(f" => {r}")
        if count == 2:
            found = True
            break
    if found:
        print("Legendre's conjecture proved!")