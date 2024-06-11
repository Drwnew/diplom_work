import json

from flask import Flask, request, render_template, send_from_directory, send_file
from sympy import symbols, solve, Eq, sympify, latex

import algorithms
import converter
from algorithms import find_root_of_quadratic_function

app = Flask(__name__, template_folder="../build", static_folder='../build/static')

@app.route('/solve_equation', methods=['POST', 'GET'])
def solve_equation():
    data = request.get_json()
    equation = algorithms.string_to_equation(data['equation'])
    roots = find_root_of_quadratic_function(equation)
    new_roots = []
    for root in roots:
        if not root.is_imaginary:
            new_roots.append(root)
    print(roots)
    latex_roots = []
    for root in new_roots:
        latex_roots.append(latex(root))
    return json.dumps({"roots": latex_roots})

@app.route('/solve_monotony_of_quadratic_function', methods=['POST', 'GET'])
def solve_monotony_of_quadratic_function():
    data = request.get_json()
    equation = data['equation']
    equation = sympify(equation)
    # algorithms.solve_monotony_of_quadratic_function(equation)
    answer = algorithms.solve_monotony_of_quadratic_function(equation)
    return json.dumps({"intervals": answer})

@app.route('/solve_quadratic_equation', methods=['POST', 'GET'])
def solve_quadratic_equation():
    data = request.get_json()
    roots = algorithms.solve_quadratic_equation(algorithms.string_to_equation(data['equation']))
    pull = []
    for root in roots:
        pull.append(latex(root))
    return json.dumps({"roots": pull})

# @app.route('/generate_monotony_of_quadratic_function', methods=['POST', 'GET'])
# def generate_monotony_of_quadratic_function():
#     data = request.get_json()
#     count = data["count"]
#     simplify_equations = algorithms.generate_monotony_of_quadratic_function(count)
#
#     counter = 0
#     new = []
#     for equation in simplify_equations:
#         counter += 1
#         sol = algorithms.solve_monotony_of_quadratic_function(equation)
#         latex_eq = latex(equation)
#         new.append([latex_eq, sol[0], sol[1]])
#
#     doc = converter.add_to_doc(new)
#     return send_file("../" + doc, as_attachment=True, download_name='doc.docx')

@app.route('/generate_monotony_of_quadratic_function', methods=['POST', 'GET'])
def generate_monotony_of_quadratic_function():
    data = request.get_json()
    data = json.loads(data)
    functions = algorithms.generate_monotony_of_quadratic_function(data)
    doc = converter.output_quadratic_functions(functions)
    return send_file("../" + doc, as_attachment=True, download_name='doc.docx')

@app.route('/generate_quadratic_equations', methods=['POST', 'GET'])
def generate_quadratic_equations():
    data = request.get_json()
    data = json.loads(data)
    equations = algorithms.generate_quadratic_equations(data)
    doc = converter.output_quadratic_equations(equations)
    return send_file("../" + doc, as_attachment=True, download_name='doc.docx')

@app.route('/', methods=['GET'])
@app.route('/<path:path>')
def index(path=None):
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=3001)
