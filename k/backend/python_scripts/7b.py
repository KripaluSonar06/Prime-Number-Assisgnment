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

n = int(input("Until what number should I prove for Goldbach's conjecture? = "))
count = 0
for i in range(4, n + 1, 2):
    for j in range (2, i//2 + 1):
        if not small_prime_check(j, small_prime_set):
            continue
        if gmpy2.is_prime(j):
            k = i - j
            if not small_prime_check(k, small_prime_set):
                continue
            if gmpy2.is_prime(k):
                count += 1
                print(f"{j:5d} + {k:5d} = {i:5d} ... [Proved] : {count} / {(n - 4) // 2 + 1}")
                break
print("Randomly generating a 50 digit even number")
m = random.randrange(10**49, 10**50)
if m % 2 == 1:
    m += 1
print(f"Random number = {m}")
for j in range (2, m//2 + 1):
    if not small_prime_check(j, small_prime_set):
        continue
    if gmpy2.is_prime(j):
        k = m - j
        if not small_prime_check(k, small_prime_set):
            continue
        if gmpy2.is_prime(k):
            print(f"{j} + {k} = {m} ... [Proved]")
            break