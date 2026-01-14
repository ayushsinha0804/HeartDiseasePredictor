import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report

def train_model():
    # Use local dataset as requested for real-world fidelity
    file_path = 'heart_disease_data.csv'
    
    print(f"Loading local data from {file_path}...")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Could not find local {file_path}")
    
    heart_data = pd.read_csv(file_path)

    # Features and Target
    X = heart_data.drop(columns='target', axis=1)
    Y = heart_data['target']

    # Standardize the data
    print("Standardizing data...")
    scaler = StandardScaler()
    scaler.fit(X)
    X_scaled = scaler.transform(X)

    # Train Test Split
    X_train, X_test, Y_train, Y_test = train_test_split(X_scaled, Y, test_size=0.2, stratify=Y, random_state=3)

    # Model Training - Using Random Forest for better pattern recognition
    print("Training Random Forest model...")
    # Using specific parameters for generalizability
    model = RandomForestClassifier(n_estimators=100, max_depth=7, random_state=3)
    model.fit(X_train, Y_train)

    # Evaluation
    X_train_prediction = model.predict(X_train)
    training_data_accuracy = accuracy_score(X_train_prediction, Y_train)
    print(f'Accuracy on Training data : {training_data_accuracy:.2f}')

    X_test_prediction = model.predict(X_test)
    test_data_accuracy = accuracy_score(X_test_prediction, Y_test)
    print(f'Accuracy on Test data : {test_data_accuracy:.2f}')
    
    print("\nClinical Validation - Classification Report:")
    print(classification_report(Y_test, X_test_prediction))

    # Feature Importance for Clinical Sanity Check
    print("\nClinical Sanity Check - Top Contributing Factors:")
    importances = model.feature_importances_
    indices = np.argsort(importances)[::-1]
    features = heart_data.drop(columns='target').columns
    for f in range(5):
        print(f"{f + 1}. {features[indices[f]]}: {importances[indices[f]]:.4f}")

    # Save Model and Scaler
    print("\nSaving model artifacts...")
    if not os.path.exists('models'):
        os.makedirs('models')
        
    with open('models/heart_model.pkl', 'wb') as f:
        pickle.dump(model, f)
        
    with open('models/scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
        
    print("Enhanced Model and Scaler saved successfully in models/ directory.")

if __name__ == "__main__":
    train_model()
