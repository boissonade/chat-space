## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null: false|
|mail|string|null:false|

### Association
- has_many :groups,through::members
- has_many :messages
- has_many :members

## messsagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|string|
|group_id|references|null: false,forign_key: true|
|user_id|references|null: false,forign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null: false|

### Association
- has_many :users, through::members
- has_many :group_users
- has_many :messages
