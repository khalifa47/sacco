from flask import Flask, request, jsonify
import joblib
import pandas as pd

mapping = {
    'all_other': 0,
    'credit_card': 1,
    'debt_consolidation': 2,
    'educational': 3,
    'home_improvement': 4,
    'major_purchase': 5,
    'small_business': 6
}

columns_order = [
    "credit.policy", "purpose", "installment", "log.annual.inc",
    "dti", "fico", "days.with.cr.line", "revol.bal",
    "revol.util", "inq.last.6mths", "delinq.2yrs", "pub.rec"
]

app = Flask(__name__)

model1 = joblib.load('loan_predict.joblib')
model2 = joblib.load('loan_predict_resampled.joblib')


@app.route('/predict_default', methods=['POST'])
def predict_default_probability():
    try:
        data = request.json['data']
        data['purpose'] = mapping[data['purpose']]

        input_df = pd.DataFrame([data], columns=columns_order)

        scaler = joblib.load('scaler.pkl')
        input_df = scaler.transform(input_df)

        prob_default = (0.4 * model1.predict_proba(input_df)
                        [:, 1][0]) + (0.6 * model2.predict_proba(input_df)[:, 1][0])

        return jsonify({'probability_of_default': prob_default})

    except Exception as e:
        return jsonify({'error': str(e)}, 500)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
