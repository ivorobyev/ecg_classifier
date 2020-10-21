# ecg_classifier

*Загрузка ЭКГ и Модели*

```python
from keras.models import load_model
import numpy as np

sample = pd.read_csv('sample.csv')
ecg = np.array(sample)

model = load_model('ecg_classifier.h5')
```
*Пример анализа исследования ЭКГ (скользящее окно)*

```python
!pip install py-ecg-detectors

from keras.models import load_model
import numpy as np
import pandas as pd
from ecgdetectors import Detectors

detectors = Detectors(187)
r_peaks = detectors.two_average_detector(ecg)

sample = pd.read_csv('sample.csv')
ecg = np.array(sample)

model = load_model('ecg_classifier.h5')

results = []
for a in r_peaks:
    if a + 187 > len(ecg):
        break
    res = model.predict(ecg[a:a+187][np.newaxis,:,:])
    results.append(res)

result = np.average(np.array(results), axis = 0)
print(result)
```

В данном случае на выходе получаем словарь в ключах которого находятся кортежи из начала и конца интервала, значения - массив из вероятностей каждой патологии.

{(0, 187): array([[0.10026219, 0.34150958, 0.17208087, 0.08412264, 0.30202466]], dtype=float32)}
