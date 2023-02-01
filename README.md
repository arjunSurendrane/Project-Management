# Project Management Using GraphQL

## Query

### Create Client

```bash
mutation{
  addClient(name:"test",email:"test@gamil.com",phone:"8945894594"){
    id,
    name,
    email,
    phone
  }
}
```

### Update Client

```python
mutation{
  updateClient(id:"client_id",name:"client_name",email:"emailAddress",phone:"phone no"){
    id,
    name,
    email,
    phone
  }
}

```
