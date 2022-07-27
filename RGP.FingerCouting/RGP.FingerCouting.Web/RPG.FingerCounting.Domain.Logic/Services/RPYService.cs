using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace RPG.FingerCounting.Domain.Logic.Services
{
    public class RPYService
    {
        private static readonly HttpClient _client = new HttpClient();
        //private static readonly string _baseUrl = "http://192.168.0.213:5000/api/remotes";
        private static readonly string _baseUrl = "http://192.168.100.79:5000/api/remotes";
        
        private readonly ILogger<RPYService> _logger;


        public RPYService(ILogger<RPYService> logger)
        {
            _logger = logger;
        }


        public async Task<string> AddButton()
        {
            try
            {

                var response = await _client.GetAsync(_baseUrl + "/addButton");
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    _logger.LogCritical(responseString);
                    return responseString;
                }
                else
                {
                    throw new Exception(response.ReasonPhrase);
                }
            }
            catch (Exception e)
            {
                _logger.LogCritical(e.Message);
                return e.Message;
            }
        }

        public async Task<string> PressButton(List<int> PulsesData)
        {
            try
            {
                var data = JsonConvert.SerializeObject(new
                {
                    Name = "Remote",
                    Data = PulsesData
                });
                var jsonData = new StringContent(data, Encoding.UTF8, "application/json");
                //var body = new Dictionary<string, IEnumerable<int>>
                //{
                //    {"pulsesData", PulsesData},
                  
                //};
                //var content = new FormUrlEncodedContent(body);
                var response = await _client.PostAsync(_baseUrl + "/pushButton", jsonData);
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                  
                    return responseString;
                }
                else
                {
                    throw new Exception(response.ReasonPhrase);
                }

            }
            catch (Exception e)
            {
                _logger.LogCritical(e.Message);
                return e.Message;
            }
        }
    }
    
}
