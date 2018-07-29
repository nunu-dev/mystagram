# Mystagram

clone the instagram!

## statck

- django
- postgres
- react
- aws(EB)

## virtual envronment

가상환경 접속

```python
pipenv shell
```

## run server

```bash
python manage.py runserver
```

## migrate

장고의 ORM 코드를 변경했을 경우, 변경하사항을 DB 에 알리고 적용시켜야한다 .
이를 위해 아래의 명령어를 입력하면 된다

```bash
python manage.py makemigrations
python manage.py migrate
```

### migate 과 makemigrations 의 차이점과 추가 명령어

- makemigrations: 장고에서 제공하는 모델의 변경사항을 감지하고 기록함 (마이그레이션 파일 생성)
- migrate: 파일과 설정값을 읽어서 변경사항을 DB 에 저장(마이그레이션 적용)
- showmigrations `<app-name>` : 마이그레이션 적용 현황
- sqlmigrate `<app-name>` `<migration-name>`: 지정 마이그레이션의 SQL 내역

즉, makemigrations 는 마이그레이션 파일(초안)을 생성하는 것이며, 해당 마이그레이션 파일을 DB 에 반영하기 위해서는 migrate 명령어가 필요하다.

## Create a super user

어드민 페이지를 사용하기 전에 superuser 를 등록해야한다.
아래의 커맨드를 통해 유저를 생성할 수 있다.

```bash
python manage.py createsuperuser
```

질문을 모두 입력한 후, 유저 생성이 완료되었으면 서버를 실행하자.
이후 브라우저에서 localhost:8000/admin 으로 접속하여
본인이 등록한 user 의 이름으로 로그인한다.

## creating the user modal

models 를 통해서 장고는 variable 을 db 로 변환시킨다.
model 에서 필드는 어떻게 추가 되는 것일까.
데이터베이스의 데이터 형식은 django.db 의 models 에서 제공된다.
필드의 종류에는 CharField, URLField, TextField 등이 있다.

따라서 아래와 같이 필드를 추가할 수 있다.

```python
from django.db import models

name = models.CharField(_("Name of User"), blank=True, max_length=255)
    website= models.URLField(null=True)
    bio = models.TextField(null=True)
    phone = models.CharField(max_length=140, null=True)
    gender = models.CharField(max_length=80, choices=GENDER_CHOICES, null=True)
```

## time stamp

타임스탬프는 쉽게 말해서 날짜이다.

타임스탬프를 사용하면 아래와같은 사항들을 추적할 수 있다.

1.  언제 모델이 생성되었는지
2.  언제 모델이 업데이트 되었는지

아래의 코드를 보자

```python
class TimeStampedModel(model.Model):
    create_at =  models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract=True
```

우리는 2 개의 필드를 만들었는데, create_at 은 모델이 생성되었을때 입력되고,
updated_at 은 모델이 업데이트 될떄마다 자동으로 입력된다.

또한 내부에 Meta 클래스를 생성하고, abstract 를 true 로 선언함으로써 이는 데이터베이스에 영항을 미치지 않는 추상 모델이된다.

이로써 TimestampedModel 은 다른 모델들을 위한 base 로 사용된다.

## creating the image model

위에서 만든 TimeStampedModel 를 상속받는 2 개의 클래스를 만든다.
2 개의 클래스는 각각 이미지와 댓글을 저장하는 모델이 된다.

```python
class Image(TimeStampedModel):

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()

class Comment(TimeStampedModel):

    message = models.TextField()
```

## Explaining Model Relationships

### one to many/ many to one

대응 관계(relation)는 1 대 N 또는 N 대 1 로 정의 되어 질 수 있다.

ex) 한개의 사진에 여러개의 댓글을 다는 경우
한명의 owner 가 여러개의 글을 가지고 있는 경우

아래의 고양이 예제를 살펴보자

```python
from django.db import models
from . import Owner

class Cat(models.Model):
    name = models.CharField(max_length=30)
    breed = models.CharField(max_length=20)
    grumpy = models.BooleanField(default =False)
    owner = models.ForeignKey(Owner,null=True)

jon = Owner.objects.create(
    name="Jon"
    last_name="Doe"
    age=78
)

bunns = Cat.objects.get(id=2)

bunns.owner = jon
jon.save()
```

여기서 bunns 는 고양이이며, jon 을 생성 후 주인으로 등록한다.
이렇게 외래키를 사용하여 데이터베이스의 데이터 간의 관계를 만들 수 있다.

### getting related objects

장고는 자동으로 set 이라고 불리는 클래스의 속성을 만든다.
외래키를 가지고 있다면 외래키는 자동으로 주인 객체를 바라보게되며, 주인 모델은 새로운 속성을 갖게 된다. 이름은 cat_set(modelName_set)이된다.
그러나 실제로 cat_set 이라는 속성이 생성되지는 않는다.

코드는 아래와 같다.

```python
jon = Owner.objects.get(pk=1)
jon_cats = jon.cat_set.all()
```

### many to many relationship

예를 들면 많은 유저가 다른 많은 유저를 팔로우 할 수 있다.
이를 N 대 M 관계라고 한다.
장고로 프로그래밍할때 다음과 같이 나타내어질 수 있다.

```python
class Owner(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    following = models.ManyToManyField('self')
    followers = models.ManyToManyField('self')

jon = Owner.objects.get(pk=1)
pedro = Owner.objects.get(pk=2)
jisu = Owner.objects.get(pk=3)

jon.followers.add(jisu, pedro)
```

ManyToManyField 와 add 를 통해서 many To many 관계 작성이 가능하다.

## Registering the Models in the admin

어드민 페이지에 우리가 생성한 모델들을 추가히기 위해 아래의 코드를 admin.py 에 추가한다.

```python
from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    pass
```

이 후, 다시 어드민 페이지에 접속하면 생성한 모델들이 추가 되어있다.

## Customizing the Django Admin

어드민 리스트에 출력되는 내용들을 추가할 때 아래의 코드와 같이 작성한다.

```python
@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):

    list_display = (
        'message',
        'creator',
        'image',
        'create_at',
        'updated_at'
    )
```

만약 특정한 속성값을 클릭했을때 편집으로 넘기기위해서는 아래와 같이 작성한다

```python
@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):

    list_display_links= (
        'location',
    )
```

다음으로, 특정 속성으로 탐색하는 기능을 추가하고 싶으면, 아래의 코드를 작성한다.
이때, 자동으로 서치바가 상단에 생성된다.

```python
@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):

    search_fields = (
        'location',
    )
```

마지막으로 우측에 특정 속성에 대한 필터를 추가하기위해서는 아래의 코드를 작성한다.

```python
@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):

list_filter = (
        'location',
        'creator'
    )
```

## Rest API 의 규칙

- 동사를 사용하지 않는다(동사는 CRUD 에서 발생)
- 명사를 사용한다

```
// bad
${BASE_URL}/getAllDogs

// good
GET -> ${BASE_URL}/dogs
POST -> ${BASE_URL}/dogs
PUT -> ${BASE_URL}/dogs
DELETE -> ${BASE_URL}/dogs

/dogs
GET -> /dogs/kung
POST -> /dogs/kung (error - 이미 생성되었으므로)
PUT -> /dogs/kung (kung이 있는 경우에는 사용할 수 있음)
DELETE -> /dogs/kung (kung이 있는 경우에는 사용할 수 있음)

// 변형
GET -> dogs/search?color=brown

GET /owners/nicolas/dogs -> List of all the dogs that nicolas has.
POST /owners/nicolas/dogs -> Create a dog for Nicolas
PUT /owners/nicolas/dogs -> Update all of Nicolas' dogs
DELETE /owners/nicolas/dogs -> delete

GET -> /dogs/search?color=brown
GET -> /owners/nicolas/dogs/search?color=

versioning
/v1/dogs/search?color=brown
/v2/dogs/search?color=brown
```

## django rest framework

- 장고 rest api 를 만들기 위한 프레임워크
- class, function, 파이썬 패키지등이 api 를 쉽게 만들어줌

아래와 같은 키워드로 설치한다

```bash
pipenv shell
pipenv install djangorestframework
```

config/settings/bash.py 에서 서드파티 앱 리스트를 갱신해준다

```python
THIRD_PARTY_APPS = [
    '...',
    'rest_framework',
    '...',
]
```

## 시리얼라이저(serializer)

- api는 json 과 일을 한다. 프런트에서 json 을 요구한다는 것이다.
- 장고는 json 과 일을 하지 않는다. json 은 자바스크립트 기반이므로 파이썬 기반인 장고와는 다르게 생겼다.
- 따라서 장고 rest framework 가 갖고 있는 시리얼라이저는 json->파이썬, 파이썬->json 으로 변환하는 역할을 한다.

어플리케이션 내에 serializers.py라는 파일을 생성한다.
파일 이름은 장고에 영향을 미치므로 주의하자

