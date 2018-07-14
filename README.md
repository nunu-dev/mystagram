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
python manage.py migrate
python manage.py makemigrations
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

또한 내부에 Meta 클래스를 생성하고, abstract를 true로 선언함으로써 이는 데이터베이스에 영항을 미치지 않는 추상 모델이된다.

이로써 TimestampedModel은 다른 모델들을 위한 base로 사용된다.

## creating the image model
