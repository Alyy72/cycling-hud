import cv2
import requests
import time

HUD_API_URL = "http://localhost:3000/api/hazard"
MIN_AREA = 5000
AREA_GROWTH_THRESHOLD = 1.3

cap = cv2.VideoCapture(0)
ret, prev_frame = cap.read()
if not ret:
    print("Error: Camera not accessible.")
    exit()

prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
prev_gray = cv2.GaussianBlur(prev_gray, (21, 21), 0)

last_area = 0
hazard_active = False

print("📡 Spatial Radar Vision Engine Active... Press 'q' to quit.")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (21, 21), 0)
    frame_delta = cv2.absdiff(prev_gray, gray)
    thresh = cv2.threshold(frame_delta, 25, 255, cv2.THRESH_BINARY)[1]
    thresh = cv2.dilate(thresh, None, iterations=2)
    contours, _ = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    current_max_area = 0
    for contour in contours:
        if cv2.contourArea(contour) < MIN_AREA:
            continue
        current_max_area = max(current_max_area, cv2.contourArea(contour))
        (x, y, w, h) = cv2.boundingRect(contour)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    if last_area > 0 and current_max_area > (last_area * AREA_GROWTH_THRESHOLD):
        if not hazard_active:
            hazard_active = True
            print("🚨 THREAT DETECTED: Object Closing Fast!")
            try:
                requests.post(HUD_API_URL, json={
                    "active": True,
                    "threatLevel": "CRITICAL",
                    "distanceMeters": 4.2,
                    "speedDeltaKmh": 32.0,
                    "direction": "REAR_CENTER"
                })
            except Exception as e:
                pass
    elif current_max_area == 0 and hazard_active:
        hazard_active = False
        print("🟢 Path Clear: Resetting HUD.")
        try:
            requests.post(HUD_API_URL, json={"active": False})
        except Exception as e:
            pass

    last_area = current_max_area
    prev_gray = gray
    cv2.imshow("Spatial Threat Optical Sensor", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
