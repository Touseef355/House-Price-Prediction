# House Price Predictor

This is a full stack machine learnig web application predicts the property prices in Bangalore(India).
It is based on following factors:
1. area
2. location
3. bedrooms
4. bathrooms

Built with python, Flask, Scikit-learn, frontend with HTML/CSS/JS

**Live Demo:** [touseef355.github.io/House-Price-Prediction/client/app.html](https://touseef355.github.io/House-Price-Prediction/client/app.html)

---

## Tech Stack

| Layer | Technology |
|---|---|
| ML Model | Python, Scikit-learn, Linear Regression |
| Backend | Flask, REST API, PythonAnywhere |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Deployment | GitHub Pages + PythonAnywhere |

---

## Project Structure

```
House-Price-Prediction/
├── client/
│   ├── app.html        # Structure
│   ├── app.css         # Styles
│   └── app.js          # Logic & API calls
├── server/
│   ├── server.py       # Flask endpoints
│   └── util.py         # Model loading & prediction
├── model/
│   ├── banglore_home_prices_model.pickle
│   └── columns.json
├── house_prices.csv
└── requirements.txt
```

---

## Model Selection

Three algorithms were compared using `GridSearchCV` with 5-fold cross-validation:

| Model | Best Score (R²) |
|---|---|
| **Linear Regression** | **0.854** ✅ |
| Lasso | 0.703 |
| Decision Tree | 0.695 |

Linear Regression gave the best score so it was selected as the final model.

---

## Running Locally

```bash
git clone https://github.com/Touseef355/House-Price-Prediction.git
cd House-Price-Prediction
pip install -r requirements.txt
cd server && python server.py
```

Then open `client/app.html` in your browser and update `SERVER_URL` in `app.js` to `http://127.0.0.1:5000`.

---

## API

| Endpoint | Method | Description |
|---|---|---|
| `/get_location_names` | GET | Returns list of 200+ Bangalore locations |
| `/predict_home_price` | POST | Returns estimated price in Lakhs |

---

## What I Learned

- **Data preprocessing**  cleaning outliers, handling missing values, one-hot encoding 200+ locations
- **Model comparison**  evaluating Linear Regression, Lasso, and Decision Tree with cross-validation
- **Flask REST API**  exposing the model as endpoints, handling CORS between two hosted domains
- **Frontend–backend integration**  `fetch()` with `async/await`, form data, error handling
- **UX design**  currency formatting in 3 formats (Crores, Lakhs, full amount), input validation, loading states. Frontend designed with assistance from **Claude**
- **Deployment**  GitHub Pages for static frontend, PythonAnywhere for Python backend

---

## Future Improvements

- [ ] Show price range (min–max) instead of a single estimate
- [ ] Add Random Forest / XGBoost for potentially higher accuracy
---

## Author

**Touseef Ahmed** · [GitHub](https://github.com/Touseef355) · [LinkedIn](https://linkedin.com/in/touseef355)
