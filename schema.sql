CREATE TABLE users (
  UserId SERIAL Primary Key,
  name varchar(512),
  authId varchar(50),
  img text
)


CREATE TABLE Parts (
  partid SERIAL PRIMARY KEY,
  model text,
  Name varchar(512),
  Category varchar(50),
  Price Float(2),
  Quantity Int,
  Description text,
  Img text,
  Specials Int
)


CREATE TABLE Orders (
  OrderNum Int,
  UserId Int REFERENCES Users(UserId),
  PartId Int REFERENCES Parts(PartId)
)
