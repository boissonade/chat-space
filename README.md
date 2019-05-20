## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null: false|
|mail|string|null:false|

### Association
- has_many :groups,through:members
- has_many :messages
- has_many :members

## messsageテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|string|
|group_id|integer|null: false,forign_key: true
|user_id|integer|null: false,forign_key: true

### Association
- belongs_to :group
- belongs_to :user

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :user