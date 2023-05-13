### db dump

1. sql 생성

```
mysqldump -u <useranme> -p <dbname> > <save path>
```

2. sql 적용

```
mysql -u <useranme> -p <dbname> < <save path>
```
