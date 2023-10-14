from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np

# Loan Default definitions
loan_mapping = {
    'all_other': 0,
    'credit_card': 1,
    'debt_consolidation': 2,
    'educational': 3,
    'home_improvement': 4,
    'major_purchase': 5,
    'small_business': 6
}

loan_columns_order = [
    "credit.policy", "purpose", "installment", "log.annual.inc",
    "dti", "fico", "days.with.cr.line", "revol.bal",
    "revol.util", "inq.last.6mths", "delinq.2yrs", "pub.rec"
]

loan_model1 = joblib.load('./loan_default/loan_predict.joblib')
loan_model2 = joblib.load('./loan_default/loan_predict_resampled.joblib')

# Investment definitions

inv_mapping = {
    'crypto': 0,
    'etf': 1,
    'forex': 2,
    'index': 3,
    'metals': 4,
    'real_estate': 5,
    'stocks': 6
}

inv_model = joblib.load('./investment/nmf_model.joblib')


# Flask app

app = Flask(__name__)


@app.route('/', methods=['GET'])
def hello():
    return 'hello'


@app.route('/predict_default', methods=['POST'])
def predict_default_probability():
    try:
        data = request.json['data']
        if data['purpose'] not in loan_mapping:
            data['purpose'] = "all_other"
        data['purpose'] = loan_mapping[data['purpose']]

        input_df = pd.DataFrame([data], columns=loan_columns_order)

        loan_scaler = joblib.load('./loan_default/scaler.pkl')
        input_df = loan_scaler.transform(input_df)

        prob_default = (0.4 * loan_model1.predict_proba(input_df)
                        [:, 1][0]) + (0.6 * loan_model2.predict_proba(input_df)[:, 1][0])

        return jsonify({'probability_of_default': prob_default})

    except Exception as e:
        return jsonify({'error': str(e)}, 500)


@app.route('/predict_investment', methods=['POST'])
def predict_investment():
    try:
        # user_appetite, user_loan_amount, user_average_loan_risk, user_shares_amount
        data = request.json['data']

        user_input = np.array([data['user_appetite'], data['user_loan_amount'],
                              data['user_average_loan_risk'], data['user_shares_amount']])

        inv_scaler = joblib.load('./investment/scaler_nmf.joblib')
        scaled_input = inv_scaler.transform(user_input.reshape(1, -1))

        predicted_affinities = np.dot(scaled_input, inv_model.components_.T)[0]

        top_indices = np.argsort(predicted_affinities)[
            ::-1]  # Sort in descending order

        label_to_investment_type = {v: k for k, v in inv_mapping.items()}

        # Get the top 3 recommended investment types and their affinities
        top_3_recommendations = [
            (label_to_investment_type[idx], predicted_affinities[idx]) for idx in top_indices[:3]]

        return jsonify({'top3inv': top_3_recommendations})

    except Exception as e:
        return jsonify({'error': str(e)}, 500)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
