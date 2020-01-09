from flask import Flask, request, render_template, json
import ecg_classifier as ec

app = Flask(__name__)

@app.route('/')
def render_form():
    return render_template('index.html')

@app.route('/calc', methods = ['POST'])
def calculate():
    file_ =  request.files['seq'] 
    ecg, pat = ec.get_results(file_, 0.7)
    response = {'ecg' : ecg, 'pat' : pat}
    return json.dumps(response)

if __name__ == '__main__':
    app.run(port=5000,debug=True)