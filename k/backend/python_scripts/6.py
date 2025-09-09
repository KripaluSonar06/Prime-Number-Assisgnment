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

n = int(input("Enter min p value: "))
m = int(input("Enter max p value: "))
powers = []
for i in range(n, m+1):
    x = 2**i - 1
    if x < 2:
        continue
    if small_prime_check(x, small_prime_set) == False:
        continue
    if MR_Primality_Check(x) == True:
        print(f"2^{i} - 1 = {x} is a prime number\n")
        powers.append(i)
for p in powers:
    x = 2 ** (p - 1) * (2 ** p - 1)
    print(f"Checking p = {p} and number is (2^({p} - 1)) * (2^{p} - 1) = {2 ** (p - 1)} * {(2 ** p - 1)} = {x}\n")
    sum = 0
    curr = 1
    for t in range(0, p):
        print(f"{curr} is a divisor of {x} and {curr} < {x}")
        print(f"=> {sum} + {curr} = {sum + curr}")
        sum += curr;
        curr2 = curr * (2 ** p - 1)
        if curr2 != x:
            print(f"{curr2} is a divisor of {x} and {curr2} < {x}")
            print(f"=> {sum} + {curr2} = {sum + curr2}")
            sum += curr2;
        curr *= 2
    if (sum == x):
        print(f"\n[Proved]\n")
    else:
        print("\n[Disproved]\n")