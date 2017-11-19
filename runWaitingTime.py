import sys
import keras
import numpy as np
print("1")
model = keras.models.load_model('predictTime.h5')

#   alright listen, this file takes 5 inputs: the 4 regular ones
#   The fifth input is the multiplicative combination of: wind, precipitation, and average temperature.

#   EXCEPT THE LAST ONE, the inputs have to be normalized by using the same subtractions/divisions as the last time.
#   Seriously, the fifth input is an absurd value but eh, works.
wind = sys.argv[1]
rain = sys.argv[2]
snow = sys.argv[3]
temp = sys.argv[4]
fifth = float(wind) * float(rain) * float(temp)
#print(rain)
wind = (float(wind) - 5.611351)/1.769023
rain = (float(rain) - 10.863182)/16.26001
snow = (float(snow) - 5.588362)/22.77172
temp = (float(temp) - 20.93757)/10.8577

testData = [wind, rain, snow, temp, fifth]
testData = np.reshape(testData, (1,5))

prediction = model.predict(testData, verbose=0)
print(int(prediction))
sys.stdout.flush()
