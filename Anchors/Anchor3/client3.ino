//Anchor 3

#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

#define TOTAL_CNT 1

WiFiClient client;
char ssid[] = "ideapad330";   //Wi-Fi name
char pass[] = "6i0YHA3r";    //Wi-Fi password

int n, RSSI_val, count, new_count, arr[TOTAL_CNT];
double mu, mean_RSSI;


double get_mean(int RSSI_val_arr[])
{
  mu = 0;
  new_count = 0;
  for(int i = 0; i < TOTAL_CNT; i++)
  {
    if(RSSI_val_arr[i] == 0)
      continue;
    mu += RSSI_val_arr[i];
    new_count++;
  }

  mu = (double) mu/new_count;
  return mu;
}

void postToServer()
{
	//Post mean_rssi
	StaticJsonBuffer<300> JSONbuffer;
	JsonObject& JSONencoder = JSONbuffer.createObject();
	JSONencoder["anchor_num"] = 3;
	JSONencoder["rssi_val"] = mean_RSSI;

	char JSONmessageBuffer[300];
	JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
	Serial.println(JSONmessageBuffer);

	HTTPClient http; //Declare object of class HTTPClient
	http.begin("http://10.1.130.201:5000/queryNode"); //Specify request destination
	http.addHeader("Content-Type", "application/json"); //Specify content-type header
	
	int httpCode = http.POST(JSONmessageBuffer); //Send the request
	String payload = http.getString(); //Get the response payload
	Serial.println(httpCode); //Print HTTP return code
	Serial.println(payload); //Print request response payload
	http.end(); //Close connection

}

void setup()
{   
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  Serial.println("Setup done");

  if (WiFi.status() != WL_CONNECTED)     //if wifi is not connected
  {
    Serial.print("Attempting to connect to SSID : ");
    Serial.println(ssid);

    while (WiFi.status() != WL_CONNECTED)
    {
      WiFi.begin(ssid, pass);
      Serial.print(".");
      delay(5000);
    }
    Serial.print("\nConnnected\n");
  }
}

void loop()
{
    count = TOTAL_CNT;
    while(count--)
    {
      n=WiFi.scanNetworks();
      if(n==0)
        Serial.println("No networks found");
      else
      {
        for(int i=0;i<n;++i)
        {
          if(WiFi.SSID(i)!="xyz")
            continue;
          
          RSSI_val = WiFi.RSSI(i);
          arr[TOTAL_CNT - count] = RSSI_val;
          Serial.print(RSSI_val);
          Serial.print(",");
          
  //        F(x) returns distance at RSSI value x
  //        int distance = F(temp);
  //        Serial.println(distance); 
        }
      }
    }
    Serial.println("\n");
    mean_RSSI = get_mean(arr);
    Serial.println(mean_RSSI);
    
    post_to_server()

    Serial.print("Published mean = ");
    Serial.println(mean_RSSI);
}
