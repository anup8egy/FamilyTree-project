print(len(str(pow(2, 100))))
a = []
for i in range(10):
    for j in range(10):
        for k in range(10):
            if (not i == k or i == j or j == k) and ((i + j + k) == 10):
                a.append(1)
print(sum(a))

