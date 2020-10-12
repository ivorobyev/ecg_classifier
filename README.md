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
start_index = 0
end_index = 187
results = {}
while end_index <= len(ecg):
    res = model.predict(ecg[start_index:end_index][np.newaxis,:,:])
    results[(start_index, end_index)] = res
    start_index += 1
    end_index += 1
```

В данном случае на выходе получаем словарь в ключах которого находятся кортежи из начала и конца интервала, значения - массив из вероятностей каждой патологии.

{(0, 187): array([[0.10026219, 0.34150958, 0.17208087, 0.08412264, 0.30202466]], dtype=float32)}
