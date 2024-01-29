# React + Django 연동

1. venv라는 이름의 가상환경 생성 : `python3 -m venv venv`
2. 가상환경 실행 : `source venv/bin/activate`
3. 장고 & DRF 설치 : 
    `pip install django`
    
    `pip install djangorestframework`
    
4. brew install
    `brew install mysql`
    → 설치가 잘 안될 경우 : `brew link --overwrite mysql`
    
    `brew install mariadb`
    
    `brew install pkg-config`
    
5. 백엔드 라이브러리 설치 : `pip install -r requirements.txt`
6. 마이그레이션 :
    `python manage.py makemigrations`
   
    `python manage.py migrate`
    
7. 어드민 계정 생성 : `python manage.py createsuperuser`
8. 서버 실행 : `python manage.py runserver`
