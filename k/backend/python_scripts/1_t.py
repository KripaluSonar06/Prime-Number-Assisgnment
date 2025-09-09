import random
import sys
import gmpy2


def small_prime_check(num, p_set):
    x = int(num)
    for p in p_set:
        if x % p == 0 and x != p:
            return False
    return True


def MR_Primality_Check(num):
    x = int(num)
    k = 40
    isPrime = True
    for t in range(0, k):
        div_done = False
        a = random.SystemRandom().randrange(2, x)
        power = x - 1
        while power % 2 == 0:
            power //= 2
            if (pow(a, power, x) == x - 1):
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


small_prime_set = {2}
for i in range(3, 101):
    notPrime = False
    for p in small_prime_set:
        if (i % p == 0):
            notPrime = True
            break
    if not notPrime:
        small_prime_set.add(i)

sys.set_int_max_str_digits(100000)
n = int(input("Enter min n value: "))
m = int(input("Enter max n value: "))
prime_numbers_set = []
for i in range(n, m + 1):
    num = ""
    for x in range(1, i + 1):
        num += str(x)
    for x in range(1, i):
        num += str(i - x)
    print(f"token no. {i - n +1} / {m-n+1}")
    if small_prime_check(num, small_prime_set) == False:
        print(f"for n = {i}, number is not prime\n")
        continue
    if gmpy2.is_prime(int(num)) == True:
        prime_numbers_set.append(i)
        print(f"{num} is prime number where n = {i}\n")
    else:
        print(f"for n = {i}, number is not prime\n")

for p in prime_numbers_set:
    print(f"for n = {p}, there is a prime number")