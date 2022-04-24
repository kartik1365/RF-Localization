#include<ESP8266WiFi.h>
#define TOTAL_CNT 100
int num_values = TOTAL_CNT;
int arr[TOTAL_CNT];
int curr_distance = 40;
double mean = 0;
void setup()
{
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  Serial.println("Setup done");
}

void loop()
{
  Serial.println("Press G and Enter to continue");
  while(true)
  {
    if(Serial.available() > 0)
      if(Serial.read() == 'G')
        break;
  }
  num_values = TOTAL_CNT;
  curr_distance += 10;
  mean = 0;
  Serial.println(mean);
  Serial.println("Calculating...");
  delay(5);

  while(num_values--)
  {
    if(num_values == 0)
    {
      double mean, variance = 0;

      Serial.print("\nDistance = ");
      Serial.println(curr_distance);
      Serial.print("RSSI Values:");
      int total_new = TOTAL_CNT;
      for(int itr = 0; itr<TOTAL_CNT; itr++)
      {
        Serial.print(arr[itr]);
        Serial.print(", ");
        if(arr[itr] == 0)
          total_new--;
        else mean += arr[itr];
      }
      Serial.println();
      mean = mean/total_new;
      for(int itr = 0; itr<TOTAL_CNT; itr++)
      {
        if(arr[itr] == 0)
          continue;
        variance += (arr[itr] - mean)*(arr[itr] - mean);
      }
  
      variance = (double) variance/total_new;
      Serial.print("\n mean : ");
      Serial.println(mean);
      Serial.print("\n Var : ");
      Serial.println(variance);
    }
    
    int n=WiFi.scanNetworks();
    if(n==0)
      Serial.println("No networks found");
    else
    {
      for(int i=0;i<n;++i)
      {
        if(WiFi.SSID(i)!="xyz")
          continue;
        
        int temp = WiFi.RSSI(i);
        while(temp>=0)
          temp = WiFi.RSSI(i);
        arr[TOTAL_CNT - num_values] = temp;
      }
    }
  }
}
