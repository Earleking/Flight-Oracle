import keras
import sys
import numpy as np
print("3")
sys.stdout.flush()

wind = sys.argv[1]
rain = sys.argv[2]
snow = sys.argv[3]
temp = sys.argv[4]
#print(rain)
wind = (float(wind) - 5.611351)/1.769023
rain = (float(rain) - 10.863182)/16.26001
snow = (float(snow) - 5.588362)/22.77172
temp = (float(temp) - 20.93757)/10.8577

model = keras.models.load_model('delayPrediction.h5')

testData = [wind, rain, snow, temp]
testData = np.reshape(testData, (1,4))

prediction = model.predict(testData, verbose=0)
print(round(float(prediction)*100, 0))

sys.stdout.flush()
#print("It is ", int(prediction*100), "% likely that a flight will be delayed or cancelled in these conditions.")
