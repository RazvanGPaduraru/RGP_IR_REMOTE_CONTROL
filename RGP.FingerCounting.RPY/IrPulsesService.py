import RPi.GPIO as GPIO
import math
import os
import sys
from datetime import datetime
from time import sleep




def compile_c_file():
    cmd = 'gcc -o sendPulses sendPulses.c -lm -lpigpio -pthread -lrt'
    os.system(cmd)

def read_pulses():
    print('Read button data ....')
    INPUT_WIRE = 11
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(INPUT_WIRE, GPIO.IN)
    while True:
        value = 1
        while value:
            value = GPIO.input(INPUT_WIRE)

        startTime = datetime.now()

        command = []
        noOfOnes = 0

        previousVal = 0

        while True:
            if value != previousVal:
                now = datetime.now()
                pulseLength = now - startTime
                startTime = now

                command.append((previousVal, pulseLength.microseconds))

            if value:
                noOfOnes = noOfOnes + 1
            else:
                noOfOnes = 0
            if noOfOnes > 10000:
                break

            previousVal = value
            value = GPIO.input(INPUT_WIRE)
        myPulses = []
        for (val, pulse) in command:
            myPulses.append(pulse)
        binaryString = "".join(map(lambda x: "1" if x[1] > 1000 else "0", filter(lambda x: x[0] == 1, command)))
        if len(command) > 20:
               return myPulses
            
def send_pulses(pulses):
 
    
    argc = len(pulses)
    argv = ""
    #if os.path.isfile('sendPulses') == False:
        #compile_c_file();
    compile_c_file()
        
    if argc > 2:
        cmd = 'sudo ./sendPulses '
        for pulse in pulses:
            cmd = cmd + str(pulse) + ' '
        os.system(cmd)
