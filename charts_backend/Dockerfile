FROM python:3.6

EXPOSE 5000

WORKDIR /charts_backend

COPY requirements.txt /charts_backend
RUN pip install -r requirements.txt

COPY api/api.py /charts_backend/api.py
CMD python /charts_backend/api.py
