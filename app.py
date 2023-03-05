from flask import Flask

app = Flask(__name__)

# NOTE: This route is needed for the default EB health check route later
@app.route('/')
def home():
    return "ok"

@app.route('/api/do_something')
def do_something():
    return dict(status='ok')


if __name__ == '__main__':
    app.run(debug=True, port=8080)