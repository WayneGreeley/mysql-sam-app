# mysql-sam-app
SAM application with mysql 


## commands used to create this project
- sam init
![sam init](/images/sam-init.png "sam init")

- npm install uuid --save
- npm install serverless-mysql --save

- sam build
![sam build](/images/sam-build.png "sam build")

- sam deploy --guided
![sam deploy](/images/sam-deploy.png "sam deploy")

- sam delete --no-prompts

- test put-item
```
 POST: https://<YOUR_ID>.execute-api.us-east-1.amazonaws.com/Prod/
 {
    "id": "1",
    "name": "me"
}
```
```
 POST: https://<YOUR_ID>.execute-api.us-east-1.amazonaws.com/Prod/
{
    "id": "2",
    "name": "you"
}
```

- test get-all-items
```
GET:  https://<YOUR_ID>.execute-api.us-east-1.amazonaws.com/Prod/
```

- test get-by-id
```
GET:  https://<YOUR_ID>.execute-api.us-east-1.amazonaws.com/Prod/1
```


- test get-all-sql-items
```
GET:  https://<YOUR_ID>.execute-api.us-east-1.amazonaws.com/Prod/allsql/
```



SQL to initially seed DB...



use myawesomedatabase;
CREATE TABLE Persons (
  userId INT,
  firstName VARCHAR(60),
  lastName VARCHAR(60)
);

use myawesomedatabase;
SELECT * FROM Persons;


use myawesomedatabase;
insert into Persons (userId, firstName, lastName) values (1, 'foo', 'bar');



