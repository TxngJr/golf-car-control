#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiManager.h>
#include <ArduinoJson.h>
#include <BatteryCheck.h>
#include <TinyGPS++.h>

#define GPS_RX_PIN 16
#define GPS_TX_PIN 17

#define FRONT_LIGHT_PIN 13
#define BACK_LIGHT_PIN 12
#define IS_START_PIN 14
#define LEFT_LIGHT_PIN 27
#define RIGHT_LIGHT_PIN 26
#define CHECK_BATTERY_PIN 25

BatteryCheck battery(CHECK_BATTERY_PIN);
TinyGPSPlus gps;

String serverName = "http://192.168.1.45:5000/car/";
unsigned long previousMillis = 0;

void setup() {
  Serial.begin(115200);
  Serial1.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);
  WiFi.mode(WIFI_STA);
  WiFiManager wm;
  bool res;
  res = wm.autoConnect("EvCarConnect", "");
  if (!res) {
    Serial.println("Failed to connect");
    ESP.restart();
  } else {
    Serial.println("connect success");
  }
  pinMode(FRONT_LIGHT_PIN, OUTPUT);
  pinMode(BACK_LIGHT_PIN, OUTPUT);
  pinMode(LEFT_LIGHT_PIN, OUTPUT);
  pinMode(RIGHT_LIGHT_PIN, OUTPUT);
  pinMode(IS_START_PIN, OUTPUT);
}

void loop() {
  if ((millis() - previousMillis) >= 500) {
    HTTPClient http;

    String serverPath = serverName + "getcar/648fe088444fd58e8d3cac8b";

    http.begin(serverPath.c_str());

    int httpResponseCode = http.GET();

    if (httpResponseCode == HTTP_CODE_OK) {
      String response = http.getString();

      DynamicJsonDocument jsonDoc(1024);
      DeserializationError error = deserializeJson(jsonDoc, response);

      if (error) {
        Serial.print("Failed to parse JSON: ");
        Serial.println(error.c_str());
      } else {
        bool frontLightStatus = jsonDoc["frontLight"];
        bool backLightStatus = jsonDoc["backLight"];
        bool leftLightStatus = jsonDoc["leftLight"];
        bool rightLightStatus = jsonDoc["rightLight"];
        bool isStartStatus = jsonDoc["isStart"];

        digitalWrite(FRONT_LIGHT_PIN, frontLightStatus ? HIGH : LOW);
        digitalWrite(BACK_LIGHT_PIN, backLightStatus ? HIGH : LOW);
        digitalWrite(LEFT_LIGHT_PIN, leftLightStatus ? HIGH : LOW);
        digitalWrite(RIGHT_LIGHT_PIN, rightLightStatus ? HIGH : LOW);
        digitalWrite(IS_START_PIN, isStartStatus ? HIGH : LOW);
      }
    } else {
      Serial.print("Error occurred: ");
      Serial.println(httpResponseCode);
    }
    http.end();

    while (Serial1.available() > 0) {
      if (gps.encode(Serial1.read())) {
        if (gps.location.isUpdated()) {
          const size_t capacity = JSON_OBJECT_SIZE(3);
          DynamicJsonDocument jsonDoc(capacity);
          jsonDoc["battery"] = battery.batteryPercent();
          jsonDoc["latitude"] = gps.location.lat();
          jsonDoc["longitude"] = gps.location.lng();

          String jsonString;
          serializeJson(jsonDoc, jsonString);

          serverPath = serverName + "update/648fe088444fd58e8d3cac8b";
          http.begin(serverPath.c_str());
          http.addHeader("Content-Type", "application/json");

          int httpResponseCode = http.PUT(jsonString);

          if (httpResponseCode == HTTP_CODE_OK) {
            String response = http.getString();
            Serial.println("Data sent successfully");
            Serial.print("Response: ");
            Serial.println(response);
          } else {
            Serial.print("Error occurred while sending data: ");
            Serial.println(httpResponseCode);
          }
          http.end();
        }
      }
    }
    previousMillis = millis();
  }
}