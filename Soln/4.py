import random
import gmpy2

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
    
def MR_Primality_Check(num):
    x = int(num)
    if x < 101:
        if small_prime_check(num, small_prime_set):
            return True
        else:
            return False
    k = 40
    isPrime = True
    for t in range(0, k):
        div_done = False
        a = random.SystemRandom().randrange(2, x)
        power = x - 1
        while power % 2 == 0:
            power //= 2
            if(pow(a, power, x) == x - 1):
                div_done = True
                break
        if div_done:
            continue
        elif pow(a, power, x) == x - 1 or pow(a, power, x) == 1:
            continue
        else:
            isPrime = False
            break
    return isPrime

n = int(input("Enter min p value: "))
m = int(input("Enter max p value: "))
primes = []
for i in range(n, m+1):
    x = 2**i - 1
    if small_prime_check(x, small_prime_set) == False:
        continue
    if gmpy2.is_prime(x) == True:
        print(f"2^{i} - 1 = {x} is a prime number")
        primes.append(x)
for p in primes:
    q = p + 1
    while True:
        if small_prime_check(q, small_prime_set) == False:
            q += 1
            continue
        if gmpy2.is_prime(q) == False:
            q += 1
            continue
        else:
            break
    print(f"two consecutive primes are {p} and {q}")
    print(f"Their squares are {p**2} and {q**2} ... Have to find atleast 4 primes between them ...")
    prime_count = 0
    for x in range(p**2, q**2):
        if small_prime_check(x, small_prime_set) == False:
            continue
        if gmpy2.is_prime(x) == True:
            prime_count += 1
            print(f"{x} is a prime number ... {prime_count} prime number(s) found so far")
        if prime_count >= 4:
            print(f"{prime_count} prime numbers found ... PROVED!!!")
            break