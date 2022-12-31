---
sidebar_position: 7
---

# Making API Calls

Due to sockets being unavailable in Pyodide, packages such as `requests` are [currently unsupported](https://pyodide.org/en/stable/project/roadmap.html#write-http-client-in-terms-of-web-apis).

The following methods to make synchronous API calls are made available using the `react_py.http` module. These methods return the request response as a string.

For more info about the `react_py.http` module, see the [API reference docs](../introduction/api-reference#http).

Try it out:

```python
from react_py.http import get
import json

response = get('https://api.github.com/repos/elilambnz/react-py')
data = json.loads(response)

print("*" * 50)
print(f"Repository: {data['full_name']}")
print(f"Owner: {data['owner']['login']}")
print(f"Number of stars: {data['stargazers_count']} ⭐️")
print(f"Number of forks: {data['forks_count']} 🍴")
print(f"Number of watchers: {data['watchers_count']} 👀")
print("*" * 50)
```

## `GET`

```python
from react_py.http import get
import json

response = get('https://reqres.in/api/users/2')
data = json.loads(response)

print(data)
```

## `POST`

```python
from react_py.http import post
import json

response = post('https://reqres.in/api/users', { "name": "morpheus", "job": "leader" })
data = json.loads(response)

print(data)
```

## `PUT`

```python
from react_py.http import put
import json

response = put('https://reqres.in/api/users/2', { "name": "morpheus", "job": "zion resident" })
data = json.loads(response)

print(data)
```

## `DELETE`

```python
from react_py.http import delete
import json

response = delete('https://reqres.in/api/users/2')

if response == "":
  print ('Success')
```
