import cv2
import time
import os
import HandTrackingModule as htm
import time

wCam, hCam = 640, 480

cap = cv2.VideoCapture(0)
cap.set(3, wCam)
cap.set(4, hCam)
overlayList = []
pTime = 0
detector = htm.handDetector(detectionCon=0.75)
isHand = False
tipIds = [4, 8, 12, 16, 20]
startTime = 0
endTime = 0
currentNumber = -1
now = 99999999

def calculateDecimalValue(a):
    x = 0
    for i in range(4, -1, -1):
        x = x + a[i] * (2 ** (i))
    return x
while True:
    success, img = cap.read()
    img = detector.findHands(img)
    lmList = detector.findPosition(img, draw=False)

    if len(lmList) != 0:
        fingers = []
        isHand = True

        # Thumb
        if lmList[tipIds[0]][1] > lmList[tipIds[0] - 1][1]:
            fingers.append(1)
        else:
            fingers.append(0)
        

        # 4 Fingers
        for id in range(1, 5):
            if lmList[tipIds[id]][2] < lmList[tipIds[id] - 2][2]:
                fingers.append(1)
            else:
                fingers.append(0)


        aux = calculateDecimalValue(fingers)
        if aux != currentNumber:
            currentNumber = aux
            now = time.time()
        
        if time.time() - now >= 1.3 and time.time() - now <= 3:
            print(aux)
            now = time.time()
            #TODO SEND REQUEST HERE TO SERVER WITH THE NUMBER
        

        totalFingers = fingers.count(1)

        cv2.putText(img, str(int(fps)), (10, 70), cv2.FONT_HERSHEY_PLAIN, 3,
                    (255, 0, 255), 3)
        cv2.rectangle(img, (20, 225), (170, 425), (0, 255, 0), cv2.FILLED) 
        cv2.putText(img, str(totalFingers), (45, 375), cv2.FONT_HERSHEY_PLAIN,
                    10, (255, 0, 0), 25)
    else:
        isHand = False
        currentNumber = -1
    

    cTime = time.time()
    fps = 1 / (cTime - pTime)
    pTime = cTime
    cv2.imshow("Image", img)
    cv2.waitKey(1)