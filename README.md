# House Price Predictor

A full-stack machine learning web application that predicts house prices in Bangalore, India, from area, location, bedrooms, and bathrooms.

## Live demo

Frontend: https://touseef355.github.io/House-Price-Prediction/client/app.html

> The frontend is hosted on GitHub Pages. The Flask backend was hosted on PythonAnywhere, so the live prediction works only while that backend is running.

## Tech stack

| Layer | Technology |
|---|---|
| ML model | Python, Scikit-learn, Linear Regression |
| Backend | Flask, REST API |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Deployment | GitHub Pages (frontend), PythonAnywhere (backend) |

## Model selection

Three algorithms were compared with `GridSearchCV` and 5-fold cross-validation:

| Model | Best score (R²) |
|---|---|
| **Linear Regression** | **0.854** |
| Lasso | 0.703 |
| Decision Tree | 0.695 |

Linear Regression gave the best score, so it was selected as the final model.

## Project structure

```
House-Price-Prediction/
├── client/
│   ├── app.html        # Structure
│   ├── app.css         # Styles
│   └── app.js          # Logic and API calls
├── server/
│   ├── server.py       # Flask endpoints
│   └── util.py         # Model loading and prediction
├── model/
│   ├── banglore_home_prices_model.pickle
│   └── columns.json
├── house_prices.csv
└── requirements.txt
```

## API

| Endpoint | Method | Description |
|---|---|---|
| `/get_location_names` | GET | Returns the list of 200+ Bangalore locations |
| `/predict_home_price` | POST | Returns the estimated price in Lakhs |

## Running locally

```bash
git clone https://github.com/Touseef355/House-Price-Prediction.git
cd House-Price-Prediction
pip install -r requirements.txt
cd server && python server.py
```

Then open `client/app.html` in your browser and set `SERVER_URL` in `app.js` to `http://127.0.0.1:5000`.

## What I learned

- **Data preprocessing** — cleaning outliers, handling missing values, and one-hot encoding 200+ locations
- **Model comparison** — evaluating Linear Regression, Lasso, and Decision Tree with cross-validation
- **Flask REST API** — exposing the model as endpoints and handling CORS between two hosted domains
- **Frontend–backend integration** — `fetch()` with `async/await`, form data, and error handling
- **UX design** — currency formatting in three formats (Crores, Lakhs, full amount), input validation, and loading states
- **Deployment** — GitHub Pages for the static frontend and PythonAnywhere for the Python backend

## Future improvements

- Show a price range (min–max) instead of a single estimate
- Add Random Forest / XGBoost for potentially higher accuracy

## Author

**Touseef Ahmed**

- GitHub: https://github.com/Touseef355
- LinkedIn: https://www.linkedin.com/in/touseefahmed-
