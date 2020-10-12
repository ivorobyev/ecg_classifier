# ecg_classifier

##Загрузка ЭКГ и Модели

```python
from keras.models import load_model
import numpy as np

sample = pd.read_csv('sample.csv')
ecg = np.array(sample)

model = load_model('ecg_classifier.h5')
```
