import flask
from flask_sqlalchemy import SQLAlchemy
from flask import  jsonify
from random import randint

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///chart.sqlite"
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://chartuser:chartusermysql123@db/chart_demo"
db = SQLAlchemy(app)


class Chart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    red = db.Column(db.Integer,  nullable=False)
    blue = db.Column(db.Integer,  nullable=False)
    yellow = db.Column(db.Integer,  nullable=False)
    green = db.Column(db.Integer,  nullable=False)
    purple = db.Column(db.Integer,  nullable=False)
    orange = db.Column(db.Integer,  nullable=False)


@app.route('/charts', methods=['GET'])
def charts():
    db.create_all()
    charts_obj = Chart.query.all()
    charts_list = []
    for obj in charts_obj:
        data_list = []
        data_list.append(obj.red)
        data_list.append(obj.blue)
        data_list.append(obj.yellow)
        data_list.append(obj.green)
        data_list.append(obj.purple)
        data_list.append(obj.orange)
        charts_list.append({
            "pie_chart_data": data_list,
            "bar_chart_data": data_list,
        })
    return jsonify({
        "success": True,
        "charts": charts_list
    })

@app.route('/add_charts', methods=['POST'])
def add_charts():
    db.create_all()
    chart_data = Chart()
    chart_data.red = randint(10, 20)
    chart_data.blue = randint(20, 30)
    chart_data.yellow = randint(30, 40)
    chart_data.green = randint(10, 40)
    chart_data.purple = randint(10, 50)
    chart_data.orange = randint(10, 60)
    db.session.add(chart_data)
    db.session.commit()

    return jsonify({
        "success": True
    })

app.run(host="0.0.0.0", debug=True)

