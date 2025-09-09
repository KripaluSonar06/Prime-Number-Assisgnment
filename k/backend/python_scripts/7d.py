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

n = int(input("Until what number should I prove? = "))
count = 0
for i in range(2, n + 1, 2):
    j = 2
    while True:
        if not small_prime_check(j, small_prime_set):
            j += 1
            continue
        if gmpy2.is_prime(j):
            k = i + j
            if not small_prime_check(k, small_prime_set):
                j += 1
                continue
            if gmpy2.is_prime(k):
                count += 1
                print(f"{k} - {j} = {i} ... [Proved] : {count} / {(n - 2) // 2 + 1}")
                break
        j += 1
print("Randomly generating a 50 digit even number")
m = random.randrange(10**49, 10**50)
if m % 2 == 1:
    m += 1
print(f"Random number = {m}")
j = 2
while True:
    if not small_prime_check(j, small_prime_set):
        j += 1
        continue
    if gmpy2.is_prime(j):
        k = m + j
        if not small_prime_check(k, small_prime_set):
            j += 1
            continue
        if gmpy2.is_prime(k):
            count += 1
            print(f"{k} - {j} = {m} ... [Proved]")
            break
    j += 1