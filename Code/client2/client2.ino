#include<ESP8266WiFi.h>
#include<ThingSpeak.h>

#define TOTAL_CNT 20
#define CHANNEL_ID 1705106
#define CHANNEL_API_KEY "FOM1BZ7GN5UKMM1X"

WiFiClient client;
char ssid[] = "One Plus 7T";   //Wi-Fi name
char pass[] = "hdyx3100";    //Wi-Fi password

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
  ThingSpeak.begin(client);
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
    ThingSpeak.writeField(CHANNEL_ID, 1, String(mean_RSSI), CHANNEL_API_KEY);
    Serial.print("Published mean = ");
    Serial.println(mean_RSSI);
    delay(20000);
}
