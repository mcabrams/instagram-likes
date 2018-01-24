FROM python:3.6.2
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP app.py
WORKDIR /app

# Add dependency files to the FS
ADD requirements.txt /app/

# Install python dependencies
RUN pip install -r /app/requirements.txt

ADD . /app/
