import random

def isPrime1(num, p_set):
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
        
def increment(half):
    x = int(half)
    x = x+1
    return str(x)

small_prime_set = {2}
for i in range(3, 101):
    notPrime = False
    for p in small_prime_set:
        if(i % p == 0):
            notPrime = True
            break
    if not notPrime:
        small_prime_set.add(i)
        
n = int(input("Enter minimum digits: "))
m = int(input("Enter maximum digits: "))
pm = int(input("After how many prime should the program exit (if found): "))
prime_count = 0
if(n % 2 == 0):
    n += 1
half = "1"
for i in range(1, n // 2):
    half += "0"
found = False
while True:
    for x in range(0, 10):
        palindrome = half + str(x) + half[::-1]
        if not isPrime1(palindrome, small_prime_set):
            continue
        if MR_Primality_Check(palindrome):
            prime_count += 1
            print(f"{palindrome} is a prime number and it has {len(palindrome)} digits")
            print(f"Prime count so far = {prime_count}")
        if prime_count == pm:
            break
    if prime_count == pm:
        break
    half = increment(half)
    if 2 * len(half) + 1 > m:
        break