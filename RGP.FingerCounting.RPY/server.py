from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import IrPulsesService
import json
import re

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return '<h1>Hello World!</h1>'

        
@app.route('/api/remotes/addButton', methods=['GET', 'OPTIONS'])
def addButton():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
        print('aaaa')
    elif request.method == 'GET':
        response = IrPulsesService.read_pulses()
        return _corsify_actual_response(jsonify(response))
    else:
        raise RuntimeError('Unsupported method')

@app.route('/api/remotes/pushButton', methods=['POST', 'OPTIONS'])
def pushButton():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        remoteData = request.get_json()['Data']
        response = IrPulsesService.send_pulses(remoteData)
        
        return _corsify_actual_response(jsonify(response))
    else:
        raise RuntimeError('Unsupported method')


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')




