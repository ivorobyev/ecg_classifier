from keras.models import load_model
import pandas as pd
import numpy as np

def load_nn(path):
    return load_model(path)

def get_results(ecg_file, threshold):
    model = load_nn('models/ecg_classifier.h5')
    ecg = pd.read_csv(ecg_file, header = None)
    pat = []
    for ind,a in enumerate(ecg[1]):
        if ind+187 > len(ecg[1]):
            break
        interval = ecg[1][ind:ind+187][:,np.newaxis][np.newaxis,:,:]
        progs = model.predict(interval)
        if max(progs[0]) > threshold:
            pat.append(list(map(lambda x, y: [x,y], ecg[0][ind:ind+187], ecg[1][ind:ind+187])))

    return list(map(lambda x, y: [x,y], ecg[0], ecg[1])), pat
