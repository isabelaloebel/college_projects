import random
import string
N=5

for i in range(100):
    with open(f"{''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))}.txt", 'w') as f:
        f.write(''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(200))
)