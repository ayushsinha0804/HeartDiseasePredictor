import requests
import json

def test_prediction():
    url = "http://127.0.0.1:8000/predict"
    
    # Sample data for a healthy person (similar to row 302 in original data)
    payload = {
        "age": 57,
        "sex": 0,
        "cp": 1,
        "trestbps": 130,
        "chol": 236,
        "fbs": 0,
        "restecg": 0,
        "thalach": 174,
        "exang": 0,
        "oldpeak": 0.0,
        "slope": 1,
        "ca": 1,
        "thal": 2
    }
    
    print(f"Sending request to {url}...")
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_prediction()
