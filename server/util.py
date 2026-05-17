import pickle
import json
import numpy as np

# Global Variables

__locations = None
__data_columns = None
__model = None

# function to return price across 'total_sqft', 'location', 'bhk', 'bath'
def get_estimated_price(location,sqft,bhk,bath):

    try:
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1
    
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    
    return round(__model.predict([x])[0],2)

    # return __model.predict([X])


def get_location_names():
    return __locations

def load_saved_artifacts():
    print("Loading saved artifacts .... Starts")
    global __data_columns
    global __locations

# Reading dictionary --> columns.json
    with open('./artifacts/columns.json','r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]  # read from 3rd column

# Reading model --> home_prices_mode.pickle
    global __model
    with open('./artifacts/home_prices_model.pickle','rb') as f:
        __model = pickle.load(f)
    print("Loading artifacts..... Done ")


if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())

    print(get_estimated_price('1st Block Jayanagar', 1000, 2, 2))
    print(get_estimated_price('1st Block Jayanagar', 1000, 2, 3))
    print(get_estimated_price('Indira Nagar', 1000, 2, 2))
    print(get_estimated_price('Indira Nagar', 1000, 2, 3))