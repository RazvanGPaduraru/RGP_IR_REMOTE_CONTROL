from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import IrService

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return '<h1>Hello World!</h1>'

@app.route('/api/remotes/createRemote', methods=['POST', 'OPTIONS'])
def createRemote():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        remote_name = request.form.to_dict()['remoteName']
        remote_description = request.form.to_dict()['remoteDescription']
        response = IrService.create_remote(remote_name, remote_description)
        return _corsify_actual_response(jsonify(response))
    else:
        raise RuntimeError('Unsupported method')
        
@app.route('/api/remotes/addButton', methods=['POST', 'OPTIONS'])
def addButton():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        remoteData = request.form.to_dict()['remoteData']
        button = request.form.to_dict()['buttonName']
        response = IrService.add_button(remoteData, button)
        return _corsify_actual_response(jsonify(response))
    else:
        raise RuntimeError('Unsupported method')

@app.route('/api/remotes/pushButton', methods=['POST', 'OPTIONS'])
def pushButton():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        remoteData = request.form.to_dict()['remoteData']
        button = request.form.to_dict()['button']
        response = IrService.emmit_command(remoteData, button)
        
        return _corsify_actual_response(jsonify(response))
    else:
        raise RuntimeError('Unsupported method')

@app.route('/api/remotes/deleteButton', methods=['POST', 'OPTIONS'])
def deleteButton():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        remoteData = request.form.to_dict()['remoteData']
        button = request.form.to_dict()['button']
        response = IrService.delete_button(remoteData, button)
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


