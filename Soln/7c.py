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

n = int(input("Until what number should I prove for Weak Goldbach Problem? = "))
count = 0
for t in range(7, n + 1, 2):
    i = t - 3
    for j in range (2, i//2 + 1):
        if not small_prime_check(j, small_prime_set):
            continue
        if gmpy2.is_prime(j):
            k = i - j
            if not small_prime_check(k, small_prime_set):
                continue
            if gmpy2.is_prime(k):
                count += 1
                print(f"3 + {j:5d} + {k:5d} = {t:5d} ... proved : {count} / {(n - 7) // 2 + 1}")
                break
            
print("Randomly generating a 50 digit even number")
m = random.randrange(10**49, 10**50)
if m % 2 == 0:
    m += 1
print(f"Random number = {m}")
i = m - 3
for j in range (2, i//2 + 1):
    if not small_prime_check(j, small_prime_set):
        continue
    if gmpy2.is_prime(j):
        k = i - j
        if not small_prime_check(k, small_prime_set):
            continue
        if gmpy2.is_prime(k):
            print(f"3 + {j} + {k} = {m} [Proved]")
            break