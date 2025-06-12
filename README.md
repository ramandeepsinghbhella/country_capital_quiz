# 🌍 Country Capital Quiz

A full-stack quiz application built with Django (Backend) and React (Frontend) to test your knowledge of world capitals.

---

## 🛠️ Setup Instructions

### 🔁 Clone the Repository

```bash
git clone https://github.com/ramandeepsinghbhella/country_capital_quiz.git
cd country_capital_quiz
git checkout country_capital_quiz
cd backend
python3.12 -m venv env
source env/bin/activate
cd country_capital_quiz
vim .env
   SECRET_KEY='django-secret-key'
pip install -r requirements.txt
python3 manage.py runserver

 cd ../../frontend/country_capital_quiz/
npm install
npm start
