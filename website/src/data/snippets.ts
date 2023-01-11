export const snippets = [
  `import math

def jump_search(data, item):
  step = round(math.sqrt(len(data)))
  i = 0
  while i < len(data) and data[i] <= item:
      i += step
  for i in range(i - step, i):
      if data[i] == item:
          return i
  return -1


data = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]
print(jump_search(data, 55))`,
  `import random

def shuffle(data):
  for i in range(len(data) - 1):
      j = random.randrange(i, len(data))
      data[i], data[j] = data[j], data[i]


data = [0, 1, 2, 3, 4, 5]
shuffle(data)
print(data)`,
  `def star(size):
  size //= 2
  for i in range(-size, size + 1):
      for j in range(-size, size + 1):
          if abs(i) == abs(j) or i == 0 or j == 0:
              print('*', end='')
          else:
              print(' ', end='')
      print()


star(7)`,
  `def is_palindrome(sentence):
  sentence = sentence.replace(' ', '')
  for i in range(len(sentence) // 2):
      if sentence[i] != sentence[-i - 1]:
          return False
  return True


print(is_palindrome('taco cat'))
print(is_palindrome('taco the cat'))`,
  `def fizzbuzz(n):
  for i in range(1, n + 1):
      if i % 3 == 0:
          print('fizz', end='')
      if i % 5 == 0:
          print('buzz', end='')
      if i % 3 != 0 and i % 5 != 0:
          print(i, end='')
      print()


fizzbuzz(15)`,
  `def merge(list1, list2):
  result = []
  i, j = 0, 0
  while i < len(list1) and j < len(list2):
      if list1[i] < list2[j]:
          result.append(list1[i])
          i += 1
      else:
          result.append(list2[j])
          j += 1
  result += list1[i:] + list2[j:]
  return result


print(merge([1, 2, 3, 7], [4, 5, 6, 8]))`,
  `def get_change(amount):
  denominations = [1, 2, 5, 10]
  change = [None] * (amount + 1)
  change[0] = ()
  for coin in denominations:
      for i in range(coin, amount + 1):
          known_change = change[i - coin]
          if known_change is not None and change[i] is not None:
              change[i] = min(change[i], known_change + (coin,), key=len)
          elif known_change is not None:
              change[i] = known_change + (coin,)
  return change[amount]


amount = 24
change = get_change(amount)
print('The change to give for \${} is {}'.format(amount, change))`
]
