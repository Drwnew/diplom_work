import random

from sympy import symbols, sympify, Eq, latex, solve, expand, simplify, Interval, oo, ccode
PARAM_GENERATE_FROM = -20
PARAM_GENERATE_TO = 20

def find_root_of_quadratic_function(function):
    x, y = symbols('x y')
    solutions = solve(function, y)
    try:
        roots = solve(solutions[0], x)
        return roots
    except IndexError:
        print("No solutions found")
    return None

def solve_quadratic_equation(expression):
    x = symbols('x')
    try:
        roots = solve(expression, x)
        return roots
    except IndexError:
        print("No solutions found")
    return None

def string_to_equation(string):
    left_part, right_part = string.split('=')
    left_part = sympify(left_part)
    right_part = sympify(right_part)
    equation = Eq(left_part, right_part)
    return equation

def solve_monotony_of_quadratic_function(equation):
    roots = find_root_of_quadratic_function(equation)
    x, y = symbols('x y')
    y_equation = solve(equation, y)
    intervals = []
    value = y_equation[0].subs(x, -1_000_000_000)
    if len(roots) == 1:
        height = roots[0]
    else:
        height = (roots[0] + roots[1]) / 2

    if value < 0:
        intervals.append({"is_grow": True, "latex": latex(Interval(-oo, height, left_open=True))})
        intervals.append({"is_grow": False, "latex": latex(Interval(height, +oo, right_open=True))})
    else:
        intervals.append({"is_grow": False, "latex": latex(Interval(-oo, height, left_open=True))})
        intervals.append({"is_grow": True, "latex": latex(Interval(height, +oo, right_open=True))})

    return intervals


def generate_monotony_of_quadratic_function(data):
    pull = []
    data["numVariants"] = int(data["numVariants"])
    data["minAnswer"] = int(data["minAnswer"])
    data["maxAnswer"] = int(data["maxAnswer"])
    data["numTasks"] = int(data["numTasks"])
    for i in range(data["numVariants"] * data["numTasks"]):
        counter = 100
        while counter > 0:
            counter = counter - 1
            equation_string = generate_random_equation(data)
            function = string_to_equation(equation_string)
            roots = find_root_of_quadratic_function(function)
            if roots:
                if len(roots) == 1:
                    top = roots[0]
                else:
                    top = (roots[0] + roots[1]) / 2
                intervals = solve_monotony_of_quadratic_function(function)
                print(function, roots)
                if roots and filter_quadratic_equation(data, [top,]) and not [function, intervals] in pull:
                    pull.append({"function": function, "intervals": intervals})
                    break
    return {"pull": pull, "numVariants": data["numVariants"], "numTasks": data["numTasks"]}


import random
import json
#
# data = {
#     "numVariants": 2,
#     "numTasks": 2,
#     "minAnswer": -100,
#     "maxAnswer": 100,
#     "sqrtInAnswerIsPossible": True,
#     "fractionInAnswerIsPossible": True,
#     "templates": [
#         {
#             "latex_viewing": "y=p_{1}x^{2}+p_{2}x+p_{3}",
#             "python_viewing": "0={}*x^2+{}*x+{}",
#             "count_of_parameters": 3,
#             "checked": True
#         },
#         {
#             "latex_viewing": "y=\\frac{p_{1}}{p_{2}}x^{2}+\\frac{p_{3}b}{p_{4}}x+\\frac{p_{5}}{p_{6}}",
#             "python_viewing": "0=({}*x^2)/{}+({}*x)/{}+{}/{}",
#             "count_of_parameters": 6,
#             "checked": False
#         },
#         {
#             "latex_viewing": "y+p_{1}x^{2}+p_{2}x+p_{3}=p_{4}x^{2}+p_{5}x+p_{6}",
#             "python_viewing": "{}*x^2+{}*x+{}={}*x^2+{}*x+{}",
#             "count_of_parameters": 6,
#             "checked": True
#         }
#     ]
# }

def generate_random_equation(data):
    templates = []
    for template in data['templates']:
        if template['checked']:
            templates.append(template)
    if len(templates) == 0:
        raise Exception("No templates")
    template = random.choice(templates)
    parameters = [random.randint(PARAM_GENERATE_FROM, PARAM_GENERATE_TO) for _ in range(int(template['count_of_parameters']))]
    return template['python_viewing'].format(*parameters)


def filter_quadratic_equation(data, roots):
    is_return_roots = [False, False]
    interval = Interval(int(data["minAnswer"]), int(data["maxAnswer"]))

    for i in range(len(roots)):
        if roots[i].is_integer:
            is_return_roots[i] = True
        if data["fractionInAnswerIsPossible"] and roots[i].is_rational:
            is_return_roots[i] = True
        if data["sqrtInAnswerIsPossible"] and roots[i].is_irrational:
            is_return_roots[i] = True
        if not interval.contains(roots[i]):
            is_return_roots[i] = False
    if is_return_roots[0] and is_return_roots[1] or is_return_roots[0] and len(roots) == 1:
        return True
    else:
        return False


def generate_quadratic_equations(data):
    pull = []
    data["numVariants"] = int(data["numVariants"])
    data["minAnswer"] = int(data["minAnswer"])
    data["maxAnswer"] = int(data["maxAnswer"])
    data["numTasks"] = int(data["numTasks"])
    for i in range(data["numVariants"] * data["numTasks"]):
        counter = 100
        while counter > 0:
            counter = counter - 1
            equation_string = generate_random_equation(data)
            equation = string_to_equation(equation_string)
            roots = solve_quadratic_equation(equation)
            print(equation, roots)
            if roots and filter_quadratic_equation(data, roots) and not [equation, roots] in pull:
                pull.append({"equation": equation, "roots": roots})
                break
    return {"pull": pull, "numVariants": data["numVariants"], "numTasks": data["numTasks"]}
