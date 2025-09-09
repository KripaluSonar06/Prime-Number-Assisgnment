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

n = int(input("Until what number should I search for Wieferich prime? = "))
for i in range(2, n + 1):
    if not small_prime_check(i, small_prime_set):
        continue
    if gmpy2.is_prime(i):
        if pow(2, i-1, i*i) == 1:
            print(f"{i} is a Wieferich prime!")
            
# m = random.randrange(10**49, 10**50)
# while True:
#     if not small_prime_check(m, small_prime_set):
#         m += 1
#         continue
#     if gmpy2.is_prime(m):
#         if pow(2, m-1, m*m) == 1:
#             print(f"{m} is a Wieferich prime!")
#             break