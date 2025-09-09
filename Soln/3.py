import random
import sys
import sympy

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

# sys.set_int_max_str_digits(100000)
n = int(input("Enter min p value: "))
m = int(input("Enter max p value: "))
prime_count = 0
for i in range(n, m+1):
    x = 2**i - 1
    if small_prime_check(x, small_prime_set) == False:
        continue
    if MR_Primality_Check(x) == True:
        prime_count += 1
        print(f"2^{i} - 1 = {x} is a prime number")
        print(f"Prime count so far = {prime_count}")